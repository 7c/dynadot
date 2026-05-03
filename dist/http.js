"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = exports.HttpClient = void 0;
//#region imports
const https = __importStar(require("https"));
const http = __importStar(require("http"));
const url_1 = require("url");
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
class HttpClient {
    /** Public entry point. Picks fetch when present, otherwise node http(s). */
    async request(opts) {
        if (typeof globalThis.fetch === 'function') {
            return this.fetchImpl(opts);
        }
        return this.nodeImpl(opts);
    }
    /** Pure transport via global fetch. */
    async fetchImpl(opts) {
        const reqHeaders = {};
        if (opts.headers) {
            for (const [k, v] of Object.entries(opts.headers)) {
                if (v !== undefined && v !== null)
                    reqHeaders[k] = String(v);
            }
        }
        const { body, contentType } = this.encodeBody(opts.method, opts.data);
        if (body !== undefined && contentType && !this.hasHeader(reqHeaders, 'content-type')) {
            reqHeaders['Content-Type'] = contentType;
        }
        const fetchFn = globalThis.fetch;
        const res = await fetchFn(opts.url, {
            method: opts.method.toUpperCase(),
            headers: reqHeaders,
            body,
        });
        const text = await res.text();
        const headers = {};
        res.headers.forEach((v, k) => {
            headers[k] = v;
        });
        return {
            data: this.parseBody(headers['content-type'], text),
            status: res.status,
            headers,
        };
    }
    /** Pure transport via node's built-in http / https modules. */
    nodeImpl(opts) {
        return new Promise((resolve, reject) => {
            const url = new url_1.URL(opts.url);
            const lib = url.protocol === 'https:' ? https : http;
            const reqHeaders = {};
            if (opts.headers) {
                for (const [k, v] of Object.entries(opts.headers)) {
                    if (v !== undefined && v !== null) {
                        reqHeaders[k] = String(v);
                    }
                }
            }
            const { body, contentType } = this.encodeBody(opts.method, opts.data);
            if (body !== undefined) {
                if (contentType && !this.hasHeader(reqHeaders, 'content-type')) {
                    reqHeaders['Content-Type'] = contentType;
                }
                reqHeaders['Content-Length'] = String(Buffer.byteLength(body));
            }
            const req = lib.request({
                method: opts.method.toUpperCase(),
                hostname: url.hostname,
                port: url.port || undefined,
                path: url.pathname + url.search,
                headers: reqHeaders,
            }, (res) => {
                const chunks = [];
                res.on('data', (c) => chunks.push(c));
                res.on('end', () => {
                    const text = Buffer.concat(chunks).toString('utf8');
                    const headers = {};
                    for (const [k, v] of Object.entries(res.headers)) {
                        if (typeof v === 'string')
                            headers[k] = v;
                        else if (Array.isArray(v))
                            headers[k] = v.join(', ');
                    }
                    resolve({
                        data: this.parseBody(headers['content-type'], text),
                        status: res.statusCode || 0,
                        headers,
                    });
                });
                res.on('error', reject);
            });
            req.on('error', reject);
            if (body !== undefined)
                req.write(body);
            req.end();
        });
    }
    /** Decides what bytes to send and which Content-Type to default to. */
    encodeBody(method, data) {
        const m = method.toUpperCase();
        if (m === 'GET' || m === 'HEAD')
            return { body: undefined };
        if (data === undefined || data === null)
            return { body: undefined };
        if (typeof data === 'string')
            return { body: data };
        // Empty objects are common in legacy axios calls (`data: {}`); send no body.
        if (typeof data === 'object' && Object.keys(data).length === 0) {
            return { body: undefined };
        }
        return {
            body: JSON.stringify(data),
            contentType: 'application/json',
        };
    }
    /**
     * JSON-parse the response when it is JSON; otherwise return raw text.
     *
     * In addition to the Content-Type sniff, we also peek at the body shape.
     * Dynadot's RESTful v1 server has been observed to return JSON payloads
     * without an `application/json` Content-Type (e.g. `text/plain` or no
     * Content-Type at all), which previously caused `accountInfo()` and
     * friends to receive the raw stringified envelope instead of an object.
     * The shape heuristic only kicks in when the body starts with `{` or `[`
     * (after optional whitespace / BOM), which is unambiguous vs. the XML v3
     * API that always starts with `<`.
     */
    parseBody(contentType, text) {
        if (text.length === 0)
            return text;
        const ctIsJson = !!contentType && /json/i.test(contentType);
        const bodyLooksJson = /^[\s\uFEFF]*[\{\[]/.test(text);
        if (ctIsJson || bodyLooksJson) {
            try {
                return JSON.parse(text);
            }
            catch {
                /* fall through and return raw text */
            }
        }
        return text;
    }
    /** Case-insensitive header presence check. */
    hasHeader(headers, name) {
        const lower = name.toLowerCase();
        return Object.keys(headers).some((k) => k.toLowerCase() === lower);
    }
}
exports.HttpClient = HttpClient;
/** Default singleton — easy to mock in tests via `jest.mock('./http')`. */
exports.httpClient = new HttpClient();
