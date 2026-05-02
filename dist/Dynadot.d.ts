import type { AdditionalHttpOptions, Coupon, Currency, DeleteResponse, DomainsByName, GetTransferAuthCodeResponse, HttpMethod, PushDomainResponse, RegisterResponse, RenewResponse, TldPricesByTld } from './types';
declare class Dynadot {
    apikey: string;
    apiSecret?: string;
    baseUrl: string;
    constructor(apikey: string, apiSecret?: string);
    /**
     * Performs the underlying HTTP request and resolves with `res.data`.
     * Rejects with the transport error on failure (no XML parsing here).
     */
    doRequest(method: HttpMethod, endpoint: string, data?: unknown, AdditionalHttpOptions?: AdditionalHttpOptions): Promise<unknown>;
    /** Internal helper: GETs an endpoint and returns the flattened JSON. */
    private fetchJson;
    setNameserver(domain: string, nameservers: string[]): Promise<unknown>;
    listDomains(): Promise<DomainsByName>;
    registerDomain(domainName: string, durationYears: number, currency?: Currency, allowPremium?: boolean, coupon?: Coupon): Promise<RegisterResponse>;
    tldPrices(currency?: Currency): Promise<TldPricesByTld>;
    deleteDomain(domainName: string): Promise<DeleteResponse>;
    unlockDomain(domainName: string): Promise<GetTransferAuthCodeResponse>;
    renewDomain(domainName: string, durationYears?: number): Promise<RenewResponse>;
    getTransferAuthCode(domainName: string, new_code?: boolean, unlock_domain_for_transfer?: boolean): Promise<GetTransferAuthCodeResponse>;
    /** Generates a unique X-Request-ID (override-able for tests via spyOn). */
    protected generateRequestId(): string;
    /**
     * Computes the X-Signature header value as defined by the Dynadot docs:
     *   stringToSign = `${apiKey}\n${path}\n${requestId}\n${requestBody}`
     *   signature    = HMAC-SHA256(apiSecret, stringToSign).hex
     */
    protected signRequest(path: string, requestId: string, body: string): string;
    /**
     * Initiates a domain push to another Dynadot account. The recipient must
     * accept the push via their own account (or via `accept_push`).
     *
     * Requires `apiSecret` to have been provided to the constructor so the
     * HMAC-SHA256 X-Signature header can be computed.
     */
    pushDomain(domainName: string, receiverPushUsername: string, receiverEmail?: string): Promise<PushDomainResponse>;
}
export default Dynadot;
export { Dynadot };
