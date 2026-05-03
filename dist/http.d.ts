import type { HttpRequestOptions, HttpResponse } from './types';
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
export declare class HttpClient {
    /** Public entry point. Picks fetch when present, otherwise node http(s). */
    request<T = unknown>(opts: HttpRequestOptions): Promise<HttpResponse<T>>;
    /** Pure transport via global fetch. */
    private fetchImpl;
    /** Pure transport via node's built-in http / https modules. */
    private nodeImpl;
    /** Decides what bytes to send and which Content-Type to default to. */
    private encodeBody;
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
    private parseBody;
    /** Case-insensitive header presence check. */
    private hasHeader;
}
/** Default singleton — easy to mock in tests via `jest.mock('./http')`. */
export declare const httpClient: HttpClient;
