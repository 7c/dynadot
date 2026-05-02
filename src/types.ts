//#region imports
//#endregion

/** HTTP verb. */
export type HttpMethod =
    | 'get'
    | 'GET'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'delete'
    | 'DELETE'
    | 'patch'
    | 'PATCH'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'

/** Loose header bag accepted by the http client (undefined values are dropped). */
export type HttpHeaders = Record<string, string | number | undefined | null>

/** Options accepted by the internal HttpClient. */
export interface HttpRequestOptions {
    method: HttpMethod
    url: string
    /** String bodies are sent verbatim; objects are JSON.stringify-ed. */
    data?: unknown
    headers?: HttpHeaders
}

/** Response shape returned by the internal HttpClient. */
export interface HttpResponse<T = unknown> {
    data: T
    status: number
    headers: Record<string, string>
}

/** Subset of HTTP options accepted by `Dynadot.doRequest`. */
export interface AdditionalHttpOptions {
    headers?: HttpHeaders
}

/** Common Dynadot response header (after _text flattening). */
export interface DynadotResponseHeader {
    SuccessCode: string
    Status?: string
    Error?: string
    [k: string]: unknown
}

export interface DeleteResponse {
    DeleteHeader: DynadotResponseHeader
}

export interface RenewResponse {
    RenewHeader: DynadotResponseHeader
    RenewContent?: { Expiration: string }
}

export interface RegisterResponse {
    RegisterHeader: DynadotResponseHeader
    RegisterContent?: { Expiration: string }
}

export interface GetTransferAuthCodeHeader extends DynadotResponseHeader {
    AuthCode?: string
}

export interface GetTransferAuthCodeResponse {
    GetTransferAuthCodeResponse: {
        GetTransferAuthCodeHeader: GetTransferAuthCodeHeader
    }
}

/** A single domain entry (post-flatten); always carries a Name field. */
export interface DomainInfo {
    Name: string
    [k: string]: unknown
}

/** Output shape of `listDomains`: lookup table keyed by domain name. */
export type DomainsByName = Record<string, DomainInfo>

export interface TldPriceContent {
    Tld: string
    [k: string]: unknown
}

/** Output shape of `tldPrices`: lookup table keyed by TLD. */
export type TldPricesByTld = Record<string, TldPriceContent>

/** Currency code (USD, EUR, ...). Free-form string to match the upstream API. */
export type Currency = string

/** Optional coupon code, or `false` to omit (legacy API surface). */
export type Coupon = string | false

/* -------------------------------------------------------------------------- */
/*  RESTful v1 API (separate from the legacy XML v3 API above)                */
/* -------------------------------------------------------------------------- */

/** JSON body sent to POST /restful/v1/domains/{domain}/push. */
export interface PushDomainRequest {
    receiver_push_username: string
    receiver_email?: string
}

/** Standard envelope returned by RESTful v1 endpoints. */
export interface RestfulResponse<TData = unknown> {
    code: string
    message: string
    data?: TData
    error?: { description?: string }
}

/** Response shape for POST /restful/v1/domains/{domain}/push. */
export type PushDomainResponse = RestfulResponse
