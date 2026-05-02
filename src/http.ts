//#region imports
import * as https from 'https'
import * as http from 'http'
import { URL } from 'url'
import type { HttpMethod, HttpRequestOptions, HttpResponse } from './types'
//#endregion

/**
 * Tiny dependency-free HTTP client used in place of axios.
 *
 * Strategy:
 *   1. If a global `fetch` is available (Node 18+, Bun, Deno, browser) it is
 *      used as the transport.
 *   2. Otherwise we fall back to Node's built-in `http`/`https` modules.
 *
 * Behavior intentionally mirrors what the codebase relied on from axios:
 *   - response shape: `{ data, status, headers }`
 *   - JSON response bodies are auto-parsed (Content-Type contains `json`)
 *   - other bodies are returned as the raw UTF-8 string (so XML responses
 *     reach the legacy xml-js parser unchanged)
 *   - object request bodies are JSON.stringify-ed and sent with
 *     `Content-Type: application/json` unless the caller already set one
 *   - string request bodies are sent verbatim (caller controls Content-Type)
 *   - GET/HEAD requests never send a body
 */
export class HttpClient {
    /** Public entry point. Picks fetch when present, otherwise node http(s). */
    async request<T = unknown>(
        opts: HttpRequestOptions
    ): Promise<HttpResponse<T>> {
        if (typeof (globalThis as { fetch?: unknown }).fetch === 'function') {
            return this.fetchImpl<T>(opts)
        }
        return this.nodeImpl<T>(opts)
    }

    /** Pure transport via global fetch. */
    private async fetchImpl<T>(
        opts: HttpRequestOptions
    ): Promise<HttpResponse<T>> {
        const reqHeaders: Record<string, string> = {}
        if (opts.headers) {
            for (const [k, v] of Object.entries(opts.headers)) {
                if (v !== undefined && v !== null) reqHeaders[k] = String(v)
            }
        }

        const { body, contentType } = this.encodeBody(opts.method, opts.data)
        if (body !== undefined && contentType && !this.hasHeader(reqHeaders, 'content-type')) {
            reqHeaders['Content-Type'] = contentType
        }

        const fetchFn = (
            globalThis as {
                fetch: (input: string, init?: unknown) => Promise<{
                    status: number
                    text(): Promise<string>
                    headers: { forEach(cb: (v: string, k: string) => void): void }
                }>
            }
        ).fetch
        const res = await fetchFn(opts.url, {
            method: opts.method.toUpperCase(),
            headers: reqHeaders,
            body,
        })
        const text = await res.text()
        const headers: Record<string, string> = {}
        res.headers.forEach((v, k) => {
            headers[k] = v
        })
        return {
            data: this.parseBody<T>(headers['content-type'], text),
            status: res.status,
            headers,
        }
    }

    /** Pure transport via node's built-in http / https modules. */
    private nodeImpl<T>(opts: HttpRequestOptions): Promise<HttpResponse<T>> {
        return new Promise<HttpResponse<T>>((resolve, reject) => {
            const url = new URL(opts.url)
            const lib = url.protocol === 'https:' ? https : http

            const reqHeaders: Record<string, string> = {}
            if (opts.headers) {
                for (const [k, v] of Object.entries(opts.headers)) {
                    if (v !== undefined && v !== null) {
                        reqHeaders[k] = String(v)
                    }
                }
            }

            const { body, contentType } = this.encodeBody(opts.method, opts.data)
            if (body !== undefined) {
                if (contentType && !this.hasHeader(reqHeaders, 'content-type')) {
                    reqHeaders['Content-Type'] = contentType
                }
                reqHeaders['Content-Length'] = String(Buffer.byteLength(body))
            }

            const req = lib.request(
                {
                    method: opts.method.toUpperCase(),
                    hostname: url.hostname,
                    port: url.port || undefined,
                    path: url.pathname + url.search,
                    headers: reqHeaders,
                },
                (res) => {
                    const chunks: Buffer[] = []
                    res.on('data', (c: Buffer) => chunks.push(c))
                    res.on('end', () => {
                        const text = Buffer.concat(chunks).toString('utf8')
                        const headers: Record<string, string> = {}
                        for (const [k, v] of Object.entries(res.headers)) {
                            if (typeof v === 'string') headers[k] = v
                            else if (Array.isArray(v)) headers[k] = v.join(', ')
                        }
                        resolve({
                            data: this.parseBody<T>(headers['content-type'], text),
                            status: res.statusCode || 0,
                            headers,
                        })
                    })
                    res.on('error', reject)
                }
            )
            req.on('error', reject)
            if (body !== undefined) req.write(body)
            req.end()
        })
    }

    /** Decides what bytes to send and which Content-Type to default to. */
    private encodeBody(
        method: HttpMethod,
        data: unknown
    ): { body: string | undefined; contentType?: string } {
        const m = method.toUpperCase()
        if (m === 'GET' || m === 'HEAD') return { body: undefined }
        if (data === undefined || data === null) return { body: undefined }
        if (typeof data === 'string') return { body: data }
        // Empty objects are common in legacy axios calls (`data: {}`); send no body.
        if (typeof data === 'object' && Object.keys(data as object).length === 0) {
            return { body: undefined }
        }
        return {
            body: JSON.stringify(data),
            contentType: 'application/json',
        }
    }

    /** JSON-parse if the response advertises JSON; otherwise return raw text. */
    private parseBody<T>(contentType: string | undefined, text: string): T {
        if (contentType && /json/i.test(contentType) && text.length > 0) {
            try {
                return JSON.parse(text) as T
            } catch {
                /* fall through and return raw text */
            }
        }
        return text as unknown as T
    }

    /** Case-insensitive header presence check. */
    private hasHeader(headers: Record<string, string>, name: string): boolean {
        const lower = name.toLowerCase()
        return Object.keys(headers).some((k) => k.toLowerCase() === lower)
    }
}

/** Default singleton — easy to mock in tests via `jest.mock('./http')`. */
export const httpClient = new HttpClient()
