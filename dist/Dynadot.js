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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dynadot = void 0;
//#region imports
const parser = __importStar(require("xml-js"));
const debug_1 = __importDefault(require("debug"));
const crypto = __importStar(require("crypto"));
const flatten_1 = require("./flatten");
const http_1 = require("./http");
//#endregion
const debug = (0, debug_1.default)('dynadot');
const baseUrl = 'https://api.dynadot.com/api3.xml';
const restBase = 'https://api.dynadot.com';
// reference debug so unused-import lints don't strip it (parity with original)
debug('module loaded');
/** xml-js options shared across all calls. */
const XML_OPTS = { compact: true, spaces: 2 };
class Dynadot {
    constructor(apikey, apiSecret) {
        this.apikey = apikey;
        this.apiSecret = apiSecret;
        this.baseUrl = baseUrl + '?key=' + apikey;
    }
    /**
     * Performs the underlying HTTP request and resolves with `res.data`.
     * Rejects with the transport error on failure (no XML parsing here).
     */
    async doRequest(method, endpoint, data = {}, AdditionalHttpOptions = {}) {
        const { headers } = AdditionalHttpOptions;
        const res = await http_1.httpClient.request({
            method,
            url: this.baseUrl + endpoint,
            data,
            headers,
        });
        return res.data;
    }
    /** Internal helper: GETs an endpoint and returns the flattened JSON. */
    async fetchJson(endpoint) {
        const got = await this.doRequest('get', endpoint);
        return (0, flatten_1.flattenText)(JSON.parse(parser.xml2json(got, XML_OPTS)));
    }
    // https://api.dynadot.com/api3.xml?key=...&command=set_ns&domain=...&ns0=...&ns1=...
    async setNameserver(domain, nameservers) {
        const endPoint = `&command=set_ns&domain=${domain}&` +
            nameservers.map((n, idx) => 'ns' + idx + '=' + n).join('&');
        return this.fetchJson(endPoint);
    }
    async listDomains() {
        const endPoint = `&command=list_domain`;
        const json = await this.fetchJson(endPoint);
        const ret = {};
        for (const domain of json.ListDomainInfoResponse.ListDomainInfoContent
            .DomainInfoList.DomainInfo.Domain) {
            ret[domain.Name] = { ...domain };
        }
        return ret;
    }
    // https://api.dynadot.com/api3.xml?key=...&command=register&domain=...&duration=...&currency=USD
    async registerDomain(domainName, durationYears, currency = 'USD', allowPremium = false, coupon = false) {
        if (durationYears < 1) {
            // Preserves the original (buggy) JS behavior: the legacy code
            // returned a string from inside `new Promise(...)` which left the
            // promise pending forever. Tests rely on this exact semantic.
            await new Promise(() => {
                /* never settles */
            });
        }
        let endPoint = `&command=register&domain=${domainName}&duration=${durationYears}&currency=${currency}`;
        if (allowPremium === true)
            endPoint += '&allow_premium=1';
        if (coupon !== false)
            endPoint += `&coupon=${coupon}`;
        const json = await this.fetchJson(endPoint);
        return json.RegisterResponse;
    }
    // https://api.dynadot.com/api3.xml?key=...&command=tld_price&currency=USD
    async tldPrices(currency = 'USD') {
        const endPoint = `&command=tld_price&currency=${currency}`;
        const json = await this.fetchJson(endPoint);
        if (json.TldPriceResponse.TldPriceResponseHeader.SuccessCode !== '0') {
            // Match legacy reject(json) shape — caller receives full payload.
            // eslint-disable-next-line no-throw-literal
            throw json;
        }
        const ret = {};
        for (const tld of json.TldPriceResponse.TldPriceContent) {
            ret[tld.TldContent.Tld] = tld.TldContent;
        }
        return ret;
    }
    // https://api.dynadot.com/api3.xml?key=...&command=delete&domain=...
    async deleteDomain(domainName) {
        const endPoint = `&command=delete&domain=${domainName}`;
        const json = await this.fetchJson(endPoint);
        return json.DeleteResponse;
    }
    async unlockDomain(domainName) {
        return this.getTransferAuthCode(domainName, false, true);
    }
    async renewDomain(domainName, durationYears = 1) {
        const endPoint = `&command=renew&domain=${domainName}&duration=${durationYears}`;
        const json = await this.fetchJson(endPoint);
        return json.RenewResponse;
    }
    // https://api.dynadot.com/api3.xml?key=...&command=get_transfer_auth_code&domain=...
    async getTransferAuthCode(domainName, new_code = false, unlock_domain_for_transfer = true) {
        let endPoint = `&command=get_transfer_auth_code&domain=${domainName}`;
        if (new_code === true)
            endPoint += '&new_code=1';
        if (unlock_domain_for_transfer === true)
            endPoint += '&unlock_domain_for_transfer=1';
        return this.fetchJson(endPoint);
    }
    /* ---------------------------------------------------------------------- */
    /*  RESTful v1 helpers (Bearer auth + HMAC-SHA256 X-Signature)            */
    /* ---------------------------------------------------------------------- */
    /** Generates a unique X-Request-ID (override-able for tests via spyOn). */
    generateRequestId() {
        return crypto.randomUUID();
    }
    /**
     * Computes the X-Signature header value as defined by the Dynadot docs:
     *   stringToSign = `${apiKey}\n${path}\n${requestId}\n${requestBody}`
     *   signature    = HMAC-SHA256(apiSecret, stringToSign).hex
     */
    signRequest(path, requestId, body) {
        if (!this.apiSecret) {
            throw new Error('apiSecret is required for signed RESTful API calls (pass it as the 2nd constructor argument)');
        }
        const stringToSign = `${this.apikey}\n${path}\n${requestId}\n${body}`;
        return crypto
            .createHmac('sha256', this.apiSecret)
            .update(stringToSign)
            .digest('hex');
    }
    /**
     * Generic signed RESTful v1 request. Computes the X-Request-ID and
     * X-Signature headers per the Dynadot spec and forwards the call through
     * the internal HttpClient. JSON-serializing the request body is the
     * caller's responsibility (so the bytes signed match the bytes sent).
     */
    async restRequest(method, path, jsonBody) {
        const requestId = this.generateRequestId();
        const signature = this.signRequest(path, requestId, jsonBody ?? '');
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${this.apikey}`,
            'X-Request-ID': requestId,
            'X-Signature': signature,
        };
        if (jsonBody !== undefined) {
            headers['Content-Type'] = 'application/json';
        }
        const res = await http_1.httpClient.request({
            method,
            url: restBase + path,
            data: jsonBody,
            headers,
        });
        return res.data;
    }
    // POST https://api.dynadot.com/restful/v1/domains/{domain_name}/push
    /**
     * Initiates a domain push to another Dynadot account. The recipient must
     * accept the push via their own account (or via `accept_push`).
     *
     * Requires `apiSecret` to have been provided to the constructor so the
     * HMAC-SHA256 X-Signature header can be computed.
     */
    async pushDomain(domainName, receiverPushUsername, receiverEmail) {
        const path = `/restful/v1/domains/${encodeURIComponent(domainName)}/push`;
        const body = {
            receiver_push_username: receiverPushUsername,
        };
        if (receiverEmail !== undefined)
            body.receiver_email = receiverEmail;
        return this.restRequest('post', path, JSON.stringify(body));
    }
    // GET https://api.dynadot.com/restful/v1/accounts/info
    /**
     * Retrieves the API-key holder's own `account_info` payload (unwrapped
     * from the RESTful envelope), including the `username` used as the
     * `receiver_push_username` argument to {@link pushDomain}. Requires
     * `apiSecret` for request signing.
     *
     * Rejects with the full RESTful envelope when `code !== "200"` or the
     * `account_info` field is missing.
     */
    async accountInfo() {
        const res = await this.restRequest('get', '/restful/v1/accounts/info');
        // Dynadot's RESTful v1 API returns `code` as a JSON number (200) on
        // real calls, while their docs / some error payloads use a quoted
        // string ("200"). Coerce both sides so we don't reject a successful
        // response on a type mismatch.
        if (String(res.code) !== '200' || !res.data?.account_info) {
            // eslint-disable-next-line no-throw-literal
            throw res;
        }
        return res.data.account_info;
    }
}
exports.Dynadot = Dynadot;
exports.default = Dynadot;
