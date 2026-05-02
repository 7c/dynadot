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
//#region imports
const events_1 = require("events");
const https = __importStar(require("https"));
const http = __importStar(require("http"));
const http_1 = require("./http");
//#endregion
jest.mock('https', () => ({ request: jest.fn() }));
jest.mock('http', () => ({ request: jest.fn() }));
const mockedHttpsRequest = https.request;
const mockedHttpRequest = http.request;
/* -------------------------------------------------------------------------- */
/*  Fetch path                                                                */
/* -------------------------------------------------------------------------- */
describe('HttpClient (fetch transport)', () => {
    const realFetch = globalThis.fetch;
    let fetchMock;
    beforeEach(() => {
        fetchMock = jest.fn();
        globalThis.fetch = fetchMock;
    });
    afterAll(() => {
        if (realFetch === undefined) {
            delete globalThis.fetch;
        }
        else {
            ;
            globalThis.fetch = realFetch;
        }
    });
    /** Build a minimal Response-like object for our parser. */
    function fakeResponse(opts) {
        const headers = new Map(Object.entries(opts.headers || {}).map(([k, v]) => [
            k.toLowerCase(),
            v,
        ]));
        return {
            status: opts.status ?? 200,
            text: jest.fn().mockResolvedValue(opts.body ?? ''),
            headers: {
                get: (name) => headers.get(name.toLowerCase()) ?? null,
                forEach: (cb) => {
                    for (const [k, v] of headers)
                        cb(v, k);
                },
            },
        };
    }
    test('GET request: no body, no Content-Type header added', async () => {
        fetchMock.mockResolvedValueOnce(fakeResponse({ body: '<xml/>', headers: { 'content-type': 'text/xml' } }));
        const c = new http_1.HttpClient();
        const res = await c.request({
            method: 'get',
            url: 'https://example.com/api',
        });
        expect(res).toEqual({
            data: '<xml/>',
            status: 200,
            headers: { 'content-type': 'text/xml' },
        });
        expect(fetchMock).toHaveBeenCalledWith('https://example.com/api', {
            method: 'GET',
            headers: {},
            body: undefined,
        });
    });
    test('POST object body: JSON.stringify-ed and Content-Type defaulted', async () => {
        fetchMock.mockResolvedValueOnce(fakeResponse({
            body: '{"code":"200","message":"Success"}',
            headers: { 'content-type': 'application/json' },
        }));
        const c = new http_1.HttpClient();
        const res = await c.request({
            method: 'post',
            url: 'https://example.com/api',
            data: { hello: 'world' },
        });
        expect(res.data).toEqual({ code: '200', message: 'Success' });
        expect(fetchMock).toHaveBeenCalledWith('https://example.com/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hello: 'world' }),
        });
    });
    test('POST string body: sent verbatim, caller-provided Content-Type wins', async () => {
        fetchMock.mockResolvedValueOnce(fakeResponse({ body: 'ok' }));
        const c = new http_1.HttpClient();
        await c.request({
            method: 'post',
            url: 'https://example.com/api',
            data: '{"hand":"crafted"}',
            headers: { 'Content-Type': 'application/vnd.custom+json' },
        });
        expect(fetchMock).toHaveBeenCalledWith('https://example.com/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/vnd.custom+json' },
            body: '{"hand":"crafted"}',
        });
    });
    test('header normalization: drops null/undefined and stringifies numbers', async () => {
        fetchMock.mockResolvedValueOnce(fakeResponse({ body: '' }));
        const c = new http_1.HttpClient();
        await c.request({
            method: 'get',
            url: 'https://example.com/api',
            headers: {
                'X-Keep': 'yes',
                'X-Number': 42,
                'X-Drop-Null': null,
                'X-Drop-Undef': undefined,
            },
        });
        const sentHeaders = fetchMock.mock.calls[0][1].headers;
        expect(sentHeaders).toEqual({ 'X-Keep': 'yes', 'X-Number': '42' });
    });
    test('empty object body for POST is omitted (legacy axios parity)', async () => {
        fetchMock.mockResolvedValueOnce(fakeResponse({ body: '' }));
        const c = new http_1.HttpClient();
        await c.request({
            method: 'post',
            url: 'https://example.com/api',
            data: {},
        });
        expect(fetchMock).toHaveBeenCalledWith('https://example.com/api', {
            method: 'POST',
            headers: {},
            body: undefined,
        });
    });
    test('null/undefined body: no body sent', async () => {
        fetchMock.mockResolvedValueOnce(fakeResponse({ body: '' }));
        const c = new http_1.HttpClient();
        await c.request({
            method: 'post',
            url: 'https://example.com/api',
            data: null,
        });
        expect(fetchMock.mock.calls[0][1].body).toBeUndefined();
    });
    test('JSON parse failure falls back to raw text', async () => {
        fetchMock.mockResolvedValueOnce(fakeResponse({
            body: 'not really json',
            headers: { 'content-type': 'application/json' },
        }));
        const c = new http_1.HttpClient();
        const res = await c.request({
            method: 'get',
            url: 'https://example.com/api',
        });
        expect(res.data).toBe('not really json');
    });
    test('empty body with JSON content-type returns empty string (no parse attempt)', async () => {
        fetchMock.mockResolvedValueOnce(fakeResponse({
            body: '',
            headers: { 'content-type': 'application/json' },
        }));
        const c = new http_1.HttpClient();
        const res = await c.request({
            method: 'get',
            url: 'https://example.com/api',
        });
        expect(res.data).toBe('');
    });
    test('no content-type header: returns raw text', async () => {
        fetchMock.mockResolvedValueOnce(fakeResponse({ body: 'plain' }));
        const c = new http_1.HttpClient();
        const res = await c.request({
            method: 'get',
            url: 'https://example.com/api',
        });
        expect(res.data).toBe('plain');
    });
    test('POST with caller-provided Content-Type header (object body): caller wins', async () => {
        fetchMock.mockResolvedValueOnce(fakeResponse({ body: '' }));
        const c = new http_1.HttpClient();
        await c.request({
            method: 'post',
            url: 'https://example.com/api',
            data: { x: 1 },
            headers: { 'content-type': 'application/x-custom' },
        });
        const sent = fetchMock.mock.calls[0][1].headers;
        expect(sent['content-type']).toBe('application/x-custom');
        expect(sent['Content-Type']).toBeUndefined();
    });
});
/* -------------------------------------------------------------------------- */
/*  Node http(s) fallback path                                                */
/* -------------------------------------------------------------------------- */
describe('HttpClient (node http/https fallback)', () => {
    const realFetch = globalThis.fetch;
    beforeEach(() => {
        // Force the fallback path
        delete globalThis.fetch;
        mockedHttpsRequest.mockReset();
        mockedHttpRequest.mockReset();
    });
    afterAll(() => {
        if (realFetch !== undefined) {
            ;
            globalThis.fetch = realFetch;
        }
    });
    /** Builds a fake `IncomingMessage` and a fake `ClientRequest`. */
    function makeFakeReqRes(opts) {
        const res = new events_1.EventEmitter();
        res.statusCode = opts.status ?? 200;
        res.headers = opts.responseHeaders ?? {};
        const req = new events_1.EventEmitter();
        req.write = jest.fn();
        req.end = jest.fn(() => {
            // Schedule the response data to flow on next tick.
            setImmediate(() => {
                if (opts.body)
                    res.emit('data', Buffer.from(opts.body, 'utf8'));
                res.emit('end');
            });
        });
        return { req, res };
    }
    test('https GET: builds correct request options and parses XML response', async () => {
        const { req, res } = makeFakeReqRes({
            body: '<xml/>',
            responseHeaders: { 'content-type': 'text/xml' },
        });
        const spy = mockedHttpsRequest.mockImplementation((opts, cb) => {
            process.nextTick(() => cb(res));
            return req;
        });
        const c = new http_1.HttpClient();
        const out = await c.request({
            method: 'get',
            url: 'https://example.com:8443/foo?x=1',
            headers: { 'X-Test': 'yes' },
        });
        expect(out).toEqual({
            data: '<xml/>',
            status: 200,
            headers: { 'content-type': 'text/xml' },
        });
        const passedOpts = spy.mock.calls[0][0];
        expect(passedOpts.method).toBe('GET');
        expect(passedOpts.hostname).toBe('example.com');
        expect(passedOpts.port).toBe('8443');
        expect(passedOpts.path).toBe('/foo?x=1');
        expect(passedOpts.headers).toEqual({ 'X-Test': 'yes' });
        expect(req.write).not.toHaveBeenCalled();
        expect(req.end).toHaveBeenCalledTimes(1);
    });
    test('http POST: serializes JSON body, sets Content-Type and Content-Length', async () => {
        const { req, res } = makeFakeReqRes({
            body: '{"ok":true}',
            responseHeaders: { 'content-type': 'application/json' },
        });
        const spy = mockedHttpRequest.mockImplementation((opts, cb) => {
            process.nextTick(() => cb(res));
            return req;
        });
        const c = new http_1.HttpClient();
        const out = await c.request({
            method: 'post',
            url: 'http://example.com/echo',
            data: { hello: 'world' },
        });
        expect(out.data).toEqual({ ok: true });
        const passedOpts = spy.mock.calls[0][0];
        const expectedBody = JSON.stringify({ hello: 'world' });
        expect(passedOpts.headers).toEqual({
            'Content-Type': 'application/json',
            'Content-Length': String(Buffer.byteLength(expectedBody)),
        });
        expect(req.write).toHaveBeenCalledWith(expectedBody);
    });
    test('joins array response headers into a comma-separated string', async () => {
        const { req, res } = makeFakeReqRes({
            body: '',
            responseHeaders: { 'set-cookie': ['a=1', 'b=2'] },
        });
        mockedHttpsRequest.mockImplementation((_o, cb) => {
            process.nextTick(() => cb(res));
            return req;
        });
        const c = new http_1.HttpClient();
        const out = await c.request({
            method: 'get',
            url: 'https://example.com/',
        });
        expect(out.headers['set-cookie']).toBe('a=1, b=2');
    });
    test('rejects when the underlying request emits an error', async () => {
        const req = new events_1.EventEmitter();
        req.write = jest.fn();
        req.end = jest.fn(() => {
            process.nextTick(() => req.emit('error', new Error('boom')));
        });
        mockedHttpsRequest.mockImplementation(() => req);
        const c = new http_1.HttpClient();
        await expect(c.request({ method: 'get', url: 'https://example.com/x' })).rejects.toThrow('boom');
    });
    test('rejects when the response stream emits an error', async () => {
        const res = new events_1.EventEmitter();
        res.statusCode = 200;
        res.headers = {};
        const req = new events_1.EventEmitter();
        req.write = jest.fn();
        req.end = jest.fn(() => {
            process.nextTick(() => res.emit('error', new Error('stream-fail')));
        });
        mockedHttpsRequest.mockImplementation((_o, cb) => {
            process.nextTick(() => cb(res));
            return req;
        });
        const c = new http_1.HttpClient();
        await expect(c.request({ method: 'get', url: 'https://example.com/x' })).rejects.toThrow('stream-fail');
    });
    test('string data POST: sent verbatim with Content-Length but no auto Content-Type', async () => {
        const { req, res } = makeFakeReqRes({ body: '' });
        const spy = mockedHttpsRequest.mockImplementation((_o, cb) => {
            process.nextTick(() => cb(res));
            return req;
        });
        const c = new http_1.HttpClient();
        await c.request({
            method: 'post',
            url: 'https://example.com/api',
            data: 'raw-string-body',
        });
        const passed = spy.mock.calls[0][0];
        expect(passed.headers).toEqual({
            'Content-Length': String(Buffer.byteLength('raw-string-body')),
        });
        expect(req.write).toHaveBeenCalledWith('raw-string-body');
    });
    test('drops null/undefined headers and stringifies values', async () => {
        const { req, res } = makeFakeReqRes({ body: '' });
        const spy = mockedHttpsRequest.mockImplementation((_o, cb) => {
            process.nextTick(() => cb(res));
            return req;
        });
        const c = new http_1.HttpClient();
        await c.request({
            method: 'get',
            url: 'https://example.com/x',
            headers: {
                'X-Keep': 'yes',
                'X-Drop-Null': null,
                'X-Drop-Undef': undefined,
                'X-Number': 7,
            },
        });
        const passed = spy.mock.calls[0][0];
        expect(passed.headers).toEqual({ 'X-Keep': 'yes', 'X-Number': '7' });
    });
    test('omits port when URL has none', async () => {
        const { req, res } = makeFakeReqRes({ body: '' });
        const spy = mockedHttpsRequest.mockImplementation((_o, cb) => {
            process.nextTick(() => cb(res));
            return req;
        });
        const c = new http_1.HttpClient();
        await c.request({ method: 'get', url: 'https://example.com/' });
        const passed = spy.mock.calls[0][0];
        expect(passed.port).toBeUndefined();
    });
    test('falls back to status 0 and ignores undefined header values', async () => {
        const res = new events_1.EventEmitter();
        // intentionally NOT setting statusCode; one undefined header in the bag
        res.headers = { 'x-undef': undefined, 'x-keep': 'present' };
        const req = new events_1.EventEmitter();
        req.write = jest.fn();
        req.end = jest.fn(() => {
            setImmediate(() => res.emit('end'));
        });
        mockedHttpsRequest.mockImplementation((_o, cb) => {
            process.nextTick(() => cb(res));
            return req;
        });
        const c = new http_1.HttpClient();
        const out = await c.request({
            method: 'get',
            url: 'https://example.com/x',
        });
        expect(out.status).toBe(0);
        expect(out.headers).toEqual({ 'x-keep': 'present' });
    });
    test('caller Content-Type wins over auto JSON default (case-insensitive)', async () => {
        const { req, res } = makeFakeReqRes({ body: '' });
        const spy = mockedHttpsRequest.mockImplementation((_o, cb) => {
            process.nextTick(() => cb(res));
            return req;
        });
        const c = new http_1.HttpClient();
        await c.request({
            method: 'post',
            url: 'https://example.com/api',
            data: { x: 1 },
            headers: { 'content-type': 'application/x-custom' },
        });
        const passed = spy.mock.calls[0][0];
        const headers = passed.headers;
        expect(headers['content-type']).toBe('application/x-custom');
        expect(headers['Content-Type']).toBeUndefined();
    });
});
