//#region imports
import * as parser from 'xml-js'
import debugFactory from 'debug'
import * as crypto from 'crypto'
import { flattenText } from './flatten'
import { httpClient } from './http'
import type {
    AccountInfo,
    AccountInfoResponse,
    AdditionalHttpOptions,
    Coupon,
    Currency,
    DeleteResponse,
    DomainsByName,
    DomainInfo,
    GetTransferAuthCodeResponse,
    HttpMethod,
    PushDomainRequest,
    PushDomainResponse,
    RegisterResponse,
    RenewResponse,
    TldPriceContent,
    TldPricesByTld,
} from './types'
//#endregion

const debug = debugFactory('dynadot')
const baseUrl = 'https://api.dynadot.com/api3.xml'
const restBase = 'https://api.dynadot.com'
// reference debug so unused-import lints don't strip it (parity with original)
debug('module loaded')

/** xml-js options shared across all calls. */
const XML_OPTS = { compact: true, spaces: 2 } as const

class Dynadot {
    public apikey: string
    public apiSecret?: string
    public baseUrl: string

    constructor(apikey: string, apiSecret?: string) {
        this.apikey = apikey
        this.apiSecret = apiSecret
        this.baseUrl = baseUrl + '?key=' + apikey
    }

    /**
     * Performs the underlying HTTP request and resolves with `res.data`.
     * Rejects with the transport error on failure (no XML parsing here).
     */
    async doRequest(
        method: HttpMethod,
        endpoint: string,
        data: unknown = {},
        AdditionalHttpOptions: AdditionalHttpOptions = {}
    ): Promise<unknown> {
        const { headers } = AdditionalHttpOptions
        const res = await httpClient.request({
            method,
            url: this.baseUrl + endpoint,
            data,
            headers,
        })
        return res.data
    }

    /** Internal helper: GETs an endpoint and returns the flattened JSON. */
    private async fetchJson<T = unknown>(endpoint: string): Promise<T> {
        const got = await this.doRequest('get', endpoint)
        return flattenText(
            JSON.parse(parser.xml2json(got as string, XML_OPTS))
        ) as T
    }

    // https://api.dynadot.com/api3.xml?key=...&command=set_ns&domain=...&ns0=...&ns1=...
    async setNameserver(domain: string, nameservers: string[]): Promise<unknown> {
        const endPoint =
            `&command=set_ns&domain=${domain}&` +
            nameservers.map((n, idx) => 'ns' + idx + '=' + n).join('&')
        return this.fetchJson(endPoint)
    }

    async listDomains(): Promise<DomainsByName> {
        const endPoint = `&command=list_domain`
        const json = await this.fetchJson<{
            ListDomainInfoResponse: {
                ListDomainInfoContent: {
                    DomainInfoList: { DomainInfo: { Domain: DomainInfo[] } }
                }
            }
        }>(endPoint)
        const ret: DomainsByName = {}
        for (const domain of json.ListDomainInfoResponse.ListDomainInfoContent
            .DomainInfoList.DomainInfo.Domain) {
            ret[domain.Name] = { ...domain }
        }
        return ret
    }

    // https://api.dynadot.com/api3.xml?key=...&command=register&domain=...&duration=...&currency=USD
    async registerDomain(
        domainName: string,
        durationYears: number,
        currency: Currency = 'USD',
        allowPremium: boolean = false,
        coupon: Coupon = false
    ): Promise<RegisterResponse> {
        if (durationYears < 1) {
            // Preserves the original (buggy) JS behavior: the legacy code
            // returned a string from inside `new Promise(...)` which left the
            // promise pending forever. Tests rely on this exact semantic.
            await new Promise<never>(() => {
                /* never settles */
            })
        }
        let endPoint = `&command=register&domain=${domainName}&duration=${durationYears}&currency=${currency}`
        if (allowPremium === true) endPoint += '&allow_premium=1'
        if (coupon !== false) endPoint += `&coupon=${coupon}`
        const json = await this.fetchJson<{
            RegisterResponse: RegisterResponse
        }>(endPoint)
        return json.RegisterResponse
    }

    // https://api.dynadot.com/api3.xml?key=...&command=tld_price&currency=USD
    async tldPrices(currency: Currency = 'USD'): Promise<TldPricesByTld> {
        const endPoint = `&command=tld_price&currency=${currency}`
        const json = await this.fetchJson<{
            TldPriceResponse: {
                TldPriceResponseHeader: { SuccessCode: string }
                TldPriceContent: Array<{ TldContent: TldPriceContent }>
            }
        }>(endPoint)
        if (json.TldPriceResponse.TldPriceResponseHeader.SuccessCode !== '0') {
            // Match legacy reject(json) shape — caller receives full payload.
            // eslint-disable-next-line no-throw-literal
            throw json
        }
        const ret: TldPricesByTld = {}
        for (const tld of json.TldPriceResponse.TldPriceContent) {
            ret[tld.TldContent.Tld] = tld.TldContent
        }
        return ret
    }

    // https://api.dynadot.com/api3.xml?key=...&command=delete&domain=...
    async deleteDomain(domainName: string): Promise<DeleteResponse> {
        const endPoint = `&command=delete&domain=${domainName}`
        const json = await this.fetchJson<{ DeleteResponse: DeleteResponse }>(
            endPoint
        )
        return json.DeleteResponse
    }

    async unlockDomain(
        domainName: string
    ): Promise<GetTransferAuthCodeResponse> {
        return this.getTransferAuthCode(domainName, false, true)
    }

    async renewDomain(
        domainName: string,
        durationYears: number = 1
    ): Promise<RenewResponse> {
        const endPoint = `&command=renew&domain=${domainName}&duration=${durationYears}`
        const json = await this.fetchJson<{ RenewResponse: RenewResponse }>(
            endPoint
        )
        return json.RenewResponse
    }

    // https://api.dynadot.com/api3.xml?key=...&command=get_transfer_auth_code&domain=...
    async getTransferAuthCode(
        domainName: string,
        new_code: boolean = false,
        unlock_domain_for_transfer: boolean = true
    ): Promise<GetTransferAuthCodeResponse> {
        let endPoint = `&command=get_transfer_auth_code&domain=${domainName}`
        if (new_code === true) endPoint += '&new_code=1'
        if (unlock_domain_for_transfer === true)
            endPoint += '&unlock_domain_for_transfer=1'
        return this.fetchJson<GetTransferAuthCodeResponse>(endPoint)
    }

    /* ---------------------------------------------------------------------- */
    /*  RESTful v1 helpers (Bearer auth + HMAC-SHA256 X-Signature)            */
    /* ---------------------------------------------------------------------- */

    /** Generates a unique X-Request-ID (override-able for tests via spyOn). */
    protected generateRequestId(): string {
        return crypto.randomUUID()
    }

    /**
     * Computes the X-Signature header value as defined by the Dynadot docs:
     *   stringToSign = `${apiKey}\n${path}\n${requestId}\n${requestBody}`
     *   signature    = HMAC-SHA256(apiSecret, stringToSign).hex
     */
    protected signRequest(
        path: string,
        requestId: string,
        body: string
    ): string {
        if (!this.apiSecret) {
            throw new Error(
                'apiSecret is required for signed RESTful API calls (pass it as the 2nd constructor argument)'
            )
        }
        const stringToSign = `${this.apikey}\n${path}\n${requestId}\n${body}`
        return crypto
            .createHmac('sha256', this.apiSecret)
            .update(stringToSign)
            .digest('hex')
    }

    /**
     * Generic signed RESTful v1 request. Computes the X-Request-ID and
     * X-Signature headers per the Dynadot spec and forwards the call through
     * the internal HttpClient. JSON-serializing the request body is the
     * caller's responsibility (so the bytes signed match the bytes sent).
     */
    private async restRequest<T>(
        method: HttpMethod,
        path: string,
        jsonBody?: string
    ): Promise<T> {
        const requestId = this.generateRequestId()
        const signature = this.signRequest(path, requestId, jsonBody ?? '')
        const headers: Record<string, string> = {
            Accept: 'application/json',
            Authorization: `Bearer ${this.apikey}`,
            'X-Request-ID': requestId,
            'X-Signature': signature,
        }
        if (jsonBody !== undefined) {
            headers['Content-Type'] = 'application/json'
        }
        const res = await httpClient.request<T>({
            method,
            url: restBase + path,
            data: jsonBody,
            headers,
        })
        return res.data
    }

    // POST https://api.dynadot.com/restful/v1/domains/{domain_name}/push
    /**
     * Initiates a domain push to another Dynadot account. The recipient must
     * accept the push via their own account (or via `accept_push`).
     *
     * Requires `apiSecret` to have been provided to the constructor so the
     * HMAC-SHA256 X-Signature header can be computed.
     */
    async pushDomain(
        domainName: string,
        receiverPushUsername: string,
        receiverEmail?: string
    ): Promise<PushDomainResponse> {
        const path = `/restful/v1/domains/${encodeURIComponent(domainName)}/push`
        const body: PushDomainRequest = {
            receiver_push_username: receiverPushUsername,
        }
        if (receiverEmail !== undefined) body.receiver_email = receiverEmail
        return this.restRequest<PushDomainResponse>(
            'post',
            path,
            JSON.stringify(body)
        )
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
    async accountInfo(): Promise<AccountInfo> {
        const res = await this.restRequest<AccountInfoResponse>(
            'get',
            '/restful/v1/accounts/info'
        )
        // Dynadot's RESTful v1 API returns `code` as a JSON number (200) on
        // real calls, while their docs / some error payloads use a quoted
        // string ("200"). Coerce both sides so we don't reject a successful
        // response on a type mismatch.
        if (String(res.code) !== '200' || !res.data?.account_info) {
            // eslint-disable-next-line no-throw-literal
            throw res
        }
        return res.data.account_info
    }
}

export default Dynadot
export { Dynadot }
