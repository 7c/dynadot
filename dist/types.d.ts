/** HTTP verb. */
export type HttpMethod = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'patch' | 'PATCH' | 'head' | 'HEAD' | 'options' | 'OPTIONS';
/** Loose header bag accepted by the http client (undefined values are dropped). */
export type HttpHeaders = Record<string, string | number | undefined | null>;
/** Options accepted by the internal HttpClient. */
export interface HttpRequestOptions {
    method: HttpMethod;
    url: string;
    /** String bodies are sent verbatim; objects are JSON.stringify-ed. */
    data?: unknown;
    headers?: HttpHeaders;
}
/** Response shape returned by the internal HttpClient. */
export interface HttpResponse<T = unknown> {
    data: T;
    status: number;
    headers: Record<string, string>;
}
/** Subset of HTTP options accepted by `Dynadot.doRequest`. */
export interface AdditionalHttpOptions {
    headers?: HttpHeaders;
}
/** Common Dynadot response header (after _text flattening). */
export interface DynadotResponseHeader {
    SuccessCode: string;
    Status?: string;
    Error?: string;
    [k: string]: unknown;
}
export interface DeleteResponse {
    DeleteHeader: DynadotResponseHeader;
}
export interface RenewResponse {
    RenewHeader: DynadotResponseHeader;
    RenewContent?: {
        Expiration: string;
    };
}
export interface RegisterResponse {
    RegisterHeader: DynadotResponseHeader;
    RegisterContent?: {
        Expiration: string;
    };
}
export interface GetTransferAuthCodeHeader extends DynadotResponseHeader {
    AuthCode?: string;
}
export interface GetTransferAuthCodeResponse {
    GetTransferAuthCodeResponse: {
        GetTransferAuthCodeHeader: GetTransferAuthCodeHeader;
    };
}
/** A single domain entry (post-flatten); always carries a Name field. */
export interface DomainInfo {
    Name: string;
    [k: string]: unknown;
}
/** Output shape of `listDomains`: lookup table keyed by domain name. */
export type DomainsByName = Record<string, DomainInfo>;
export interface TldPriceContent {
    Tld: string;
    [k: string]: unknown;
}
/** Output shape of `tldPrices`: lookup table keyed by TLD. */
export type TldPricesByTld = Record<string, TldPriceContent>;
/** Currency code (USD, EUR, ...). Free-form string to match the upstream API. */
export type Currency = string;
/** Optional coupon code, or `false` to omit (legacy API surface). */
export type Coupon = string | false;
/** JSON body sent to POST /restful/v1/domains/{domain}/push. */
export interface PushDomainRequest {
    receiver_push_username: string;
    receiver_email?: string;
}
/** Standard envelope returned by RESTful v1 endpoints. */
export interface RestfulResponse<TData = unknown> {
    code: string;
    message: string;
    data?: TData;
    error?: {
        description?: string;
    };
}
/** Response shape for POST /restful/v1/domains/{domain}/push. */
export type PushDomainResponse = RestfulResponse;
/** Single contact block returned inside `account_info`. */
export interface AccountContact {
    organization?: string;
    name?: string;
    email?: string;
    phone_number?: string;
    phone_cc?: string;
    fax_number?: string;
    fax_cc?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
}
/**
 * `account_info` payload returned by GET /restful/v1/accounts/info.
 * Only `username` is strictly relied on by the library / examples; the
 * remaining fields are typed for convenience and may be expanded later.
 */
export interface AccountInfo {
    username: string;
    forum_name?: string;
    avatar_url?: string;
    account_contact?: AccountContact;
    customer_since?: number;
    account_lock?: string;
    custom_time_zone?: string;
    default_registrant_contact_id?: number;
    default_admin_contact_id?: number;
    default_technical_contact_id?: number;
    default_billing_contact_id?: number;
    total_spending?: string;
    price_level?: string;
    account_balance?: string;
    balance_list?: Array<{
        currency?: string;
        amount?: string;
    }>;
    [k: string]: unknown;
}
/** Response shape for GET /restful/v1/accounts/info. */
export type AccountInfoResponse = RestfulResponse<{
    account_info: AccountInfo;
}>;
