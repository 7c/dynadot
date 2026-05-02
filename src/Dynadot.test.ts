//#region imports
import * as parser from 'xml-js'
import { httpClient } from './http'
//#endregion

jest.mock('./http', () => ({
    HttpClient: jest.fn(),
    httpClient: { request: jest.fn() },
}))
jest.mock('xml-js')

// Cast jest mocks for typing
const mockedRequest = httpClient.request as unknown as jest.Mock
const mockedXml2json = parser.xml2json as unknown as jest.Mock

/**
 * Loads the module under test fresh for every test so mocks are honored.
 * The package's HTTP transport (src/http.ts) is mocked so we never hit the
 * network; tests assert the exact options passed to httpClient.request.
 */
import Dynadot from './Dynadot'

const APIKEY = 'TEST_API_KEY'
const BASE = 'https://api.dynadot.com/api3.xml?key=' + APIKEY

/**
 * Creates a fake XML payload string and configures parser.xml2json to
 * return JSON.stringify of `wrappedJson`. Returns a marker XML response
 * that doRequest's resolved value will be passed into xml2json with.
 */
function primeAxiosAndParser(wrappedJson: unknown, fakeXml = '<fake/>') {
    mockedRequest.mockResolvedValueOnce({ data: fakeXml })
    mockedXml2json.mockReturnValueOnce(JSON.stringify(wrappedJson))
}

beforeEach(() => {
    jest.clearAllMocks()
})

// flattenText helper is exercised directly in ./flatten.test.ts

describe('constructor', () => {
    test('stores apikey and constructs baseUrl', () => {
        const d = new Dynadot(APIKEY)
        expect(d.apikey).toBe(APIKEY)
        expect(d.baseUrl).toBe(BASE)
    })
})

describe('doRequest', () => {
    test('resolves with res.data on axios success (no headers, default data)', async () => {
        mockedRequest.mockResolvedValueOnce({ data: '<ok/>' })
        const d = new Dynadot(APIKEY)
        const got = await d.doRequest('get', '&command=ping')
        expect(got).toBe('<ok/>')
        expect(mockedRequest).toHaveBeenCalledWith({
            method: 'get',
            url: BASE + '&command=ping',
            data: {},
            headers: undefined,
        })
    })

    test('forwards headers from AdditionalAxiosOptions when provided', async () => {
        mockedRequest.mockResolvedValueOnce({ data: '<ok/>' })
        const d = new Dynadot(APIKEY)
        const got = await d.doRequest(
            'post',
            '&command=ping',
            { foo: 'bar' },
            { headers: { 'X-Test': '1' } }
        )
        expect(got).toBe('<ok/>')
        expect(mockedRequest).toHaveBeenCalledWith({
            method: 'post',
            url: BASE + '&command=ping',
            data: { foo: 'bar' },
            headers: { 'X-Test': '1' },
        })
    })

    test('rejects when axios rejects', async () => {
        const boom = new Error('network down')
        mockedRequest.mockRejectedValueOnce(boom)
        const d = new Dynadot(APIKEY)
        await expect(d.doRequest('get', '&command=ping')).rejects.toBe(boom)
    })
})

describe('setNameserver', () => {
    test('builds the right URL and resolves the parsed response', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            SetNsResponse: { SetNsHeader: { SuccessCode: { _text: '0' } } },
        })
        const got = await d.setNameserver('temp.com', ['ns1.com', 'ns2.com'])
        expect(got).toEqual({ SetNsResponse: { SetNsHeader: { SuccessCode: '0' } } })
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                method: 'get',
                url:
                    BASE +
                    '&command=set_ns&domain=temp.com&ns0=ns1.com&ns1=ns2.com',
            })
        )
    })

    test('handles empty nameserver list', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            SetNsResponse: { SetNsHeader: { SuccessCode: { _text: '0' } } },
        })
        const got = await d.setNameserver('temp.com', [])
        expect(got).toBeDefined()
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url: BASE + '&command=set_ns&domain=temp.com&',
            })
        )
    })
})

describe('listDomains', () => {
    test('aggregates domains keyed by Name', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            ListDomainInfoResponse: {
                ListDomainInfoContent: {
                    DomainInfoList: {
                        DomainInfo: {
                            Domain: [
                                {
                                    Name: { _text: 'one.com' },
                                    Expiration: { _text: '111' },
                                },
                                {
                                    Name: { _text: 'two.com' },
                                    Expiration: { _text: '222' },
                                },
                            ],
                        },
                    },
                },
            },
        })
        const got = await d.listDomains()
        expect(got).toEqual({
            'one.com': { Name: 'one.com', Expiration: '111' },
            'two.com': { Name: 'two.com', Expiration: '222' },
        })
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({ url: BASE + '&command=list_domain' })
        )
    })
})

describe('registerDomain', () => {
    test('builds default URL with currency=USD and resolves RegisterResponse', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            RegisterResponse: {
                RegisterHeader: {
                    SuccessCode: { _text: '0' },
                    Status: { _text: 'success' },
                },
            },
        })
        const got = await d.registerDomain('foo.com', 1)
        expect(got).toEqual({
            RegisterHeader: { SuccessCode: '0', Status: 'success' },
        })
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url:
                    BASE +
                    '&command=register&domain=foo.com&duration=1&currency=USD',
            })
        )
    })

    test('appends allow_premium when allowPremium=true', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            RegisterResponse: { RegisterHeader: { SuccessCode: { _text: '0' } } },
        })
        await d.registerDomain('foo.com', 2, 'EUR', true)
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url:
                    BASE +
                    '&command=register&domain=foo.com&duration=2&currency=EUR&allow_premium=1',
            })
        )
    })

    test('appends coupon when coupon is truthy', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            RegisterResponse: { RegisterHeader: { SuccessCode: { _text: '0' } } },
        })
        await d.registerDomain('foo.com', 1, 'USD', false, 'COUPON123')
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url:
                    BASE +
                    '&command=register&domain=foo.com&duration=1&currency=USD&coupon=COUPON123',
            })
        )
    })

    test('appends both allow_premium and coupon when set', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            RegisterResponse: { RegisterHeader: { SuccessCode: { _text: '0' } } },
        })
        await d.registerDomain('foo.com', 5, 'USD', true, 'X')
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url:
                    BASE +
                    '&command=register&domain=foo.com&duration=5&currency=USD&allow_premium=1&coupon=X',
            })
        )
    })

    test('when durationYears < 1 the promise never settles (validation branch)', async () => {
        const d = new Dynadot(APIKEY)
        const sentinel = Symbol('pending')
        const race = await Promise.race([
            d.registerDomain('foo.com', 0),
            new Promise((res) => setTimeout(() => res(sentinel), 30)),
        ])
        expect(race).toBe(sentinel)
        expect(mockedRequest).not.toHaveBeenCalled()
    })
})

describe('tldPrices', () => {
    test('aggregates TLD prices keyed by Tld on success', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            TldPriceResponse: {
                TldPriceResponseHeader: { SuccessCode: { _text: '0' } },
                TldPriceContent: [
                    {
                        TldContent: {
                            Tld: { _text: 'com' },
                            Registration: { _text: '10' },
                        },
                    },
                    {
                        TldContent: {
                            Tld: { _text: 'net' },
                            Registration: { _text: '12' },
                        },
                    },
                ],
            },
        })
        const got = await d.tldPrices()
        expect(got).toEqual({
            com: { Tld: 'com', Registration: '10' },
            net: { Tld: 'net', Registration: '12' },
        })
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url: BASE + '&command=tld_price&currency=USD',
            })
        )
    })

    test('honors custom currency parameter', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            TldPriceResponse: {
                TldPriceResponseHeader: { SuccessCode: { _text: '0' } },
                TldPriceContent: [],
            },
        })
        const got = await d.tldPrices('EUR')
        expect(got).toEqual({})
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url: BASE + '&command=tld_price&currency=EUR',
            })
        )
    })

    test('rejects with the parsed json when SuccessCode is not "0"', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            TldPriceResponse: {
                TldPriceResponseHeader: {
                    SuccessCode: { _text: '-1' },
                    Status: { _text: 'error' },
                },
            },
        })
        await expect(d.tldPrices()).rejects.toEqual({
            TldPriceResponse: {
                TldPriceResponseHeader: {
                    SuccessCode: '-1',
                    Status: 'error',
                },
            },
        })
    })
})

describe('deleteDomain', () => {
    test('builds delete URL and resolves DeleteResponse', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            DeleteResponse: {
                DeleteHeader: {
                    SuccessCode: { _text: '0' },
                    Status: { _text: 'success' },
                },
            },
        })
        const got = await d.deleteDomain('foo.com')
        expect(got).toEqual({
            DeleteHeader: { SuccessCode: '0', Status: 'success' },
        })
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url: BASE + '&command=delete&domain=foo.com',
            })
        )
    })
})

describe('renewDomain', () => {
    test('uses default duration of 1', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            RenewResponse: {
                RenewHeader: {
                    SuccessCode: { _text: '0' },
                    Status: { _text: 'success' },
                },
            },
        })
        const got = await d.renewDomain('foo.com')
        expect(got).toEqual({
            RenewHeader: { SuccessCode: '0', Status: 'success' },
        })
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url: BASE + '&command=renew&domain=foo.com&duration=1',
            })
        )
    })

    test('honors explicit duration', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            RenewResponse: { RenewHeader: { SuccessCode: { _text: '0' } } },
        })
        await d.renewDomain('foo.com', 3)
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url: BASE + '&command=renew&domain=foo.com&duration=3',
            })
        )
    })
})

describe('getTransferAuthCode', () => {
    test('default: only unlock_domain_for_transfer is appended', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            GetTransferAuthCodeResponse: {
                GetTransferAuthCodeHeader: {
                    SuccessCode: { _text: '0' },
                    Status: { _text: 'success' },
                    AuthCode: { _text: 'AUTH' },
                },
            },
        })
        const got = await d.getTransferAuthCode('foo.com')
        expect(got).toEqual({
            GetTransferAuthCodeResponse: {
                GetTransferAuthCodeHeader: {
                    SuccessCode: '0',
                    Status: 'success',
                    AuthCode: 'AUTH',
                },
            },
        })
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url:
                    BASE +
                    '&command=get_transfer_auth_code&domain=foo.com&unlock_domain_for_transfer=1',
            })
        )
    })

    test('appends new_code=1 when new_code=true', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            GetTransferAuthCodeResponse: {
                GetTransferAuthCodeHeader: { SuccessCode: { _text: '0' } },
            },
        })
        await d.getTransferAuthCode('foo.com', true, true)
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url:
                    BASE +
                    '&command=get_transfer_auth_code&domain=foo.com&new_code=1&unlock_domain_for_transfer=1',
            })
        )
    })

    test('omits unlock flag when unlock_domain_for_transfer=false', async () => {
        const d = new Dynadot(APIKEY)
        primeAxiosAndParser({
            GetTransferAuthCodeResponse: {
                GetTransferAuthCodeHeader: { SuccessCode: { _text: '0' } },
            },
        })
        await d.getTransferAuthCode('foo.com', false, false)
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url:
                    BASE +
                    '&command=get_transfer_auth_code&domain=foo.com',
            })
        )
    })
})

describe('unlockDomain', () => {
    test('delegates to getTransferAuthCode with new_code=false, unlock=true', async () => {
        const d = new Dynadot(APIKEY)
        const spy = jest
            .spyOn(d, 'getTransferAuthCode')
            .mockResolvedValue({ ok: true } as never)
        const got = await d.unlockDomain('foo.com')
        expect(spy).toHaveBeenCalledWith('foo.com', false, true)
        expect(got).toEqual({ ok: true })
    })
})

describe('pushDomain (RESTful v1)', () => {
    const SECRET = 'TEST_API_SECRET'
    const REQ_ID = '00000000-0000-4000-8000-000000000000'

    /** Recompute the signature exactly as the source does. */
    function expectedSignature(path: string, body: string): string {
        // Imported locally to keep the helper colocated with this describe.
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const crypto = require('crypto') as typeof import('crypto')
        const stringToSign = `${APIKEY}\n${path}\n${REQ_ID}\n${body}`
        return crypto
            .createHmac('sha256', SECRET)
            .update(stringToSign)
            .digest('hex')
    }

    test('stores apiSecret on the instance when provided', () => {
        const d = new Dynadot(APIKEY, SECRET)
        expect(d.apikey).toBe(APIKEY)
        expect(d.apiSecret).toBe(SECRET)
    })

    test('throws when apiSecret is missing (signature cannot be computed)', async () => {
        const d = new Dynadot(APIKEY)
        await expect(
            d.pushDomain('foo.com', 'someuser')
        ).rejects.toThrow(/apiSecret is required/)
        expect(mockedRequest).not.toHaveBeenCalled()
    })

    test('POSTs JSON body with signed headers (no email variant)', async () => {
        const d = new Dynadot(APIKEY, SECRET)
        jest.spyOn(
            d as unknown as { generateRequestId(): string },
            'generateRequestId'
        ).mockReturnValue(REQ_ID)
        mockedRequest.mockResolvedValueOnce({
            data: { code: '200', message: 'Success' },
        })

        const got = await d.pushDomain('foo.com', 'recipient_user')

        const expectedPath = '/restful/v1/domains/foo.com/push'
        const expectedBody = JSON.stringify({
            receiver_push_username: 'recipient_user',
        })
        expect(got).toEqual({ code: '200', message: 'Success' })
        expect(mockedRequest).toHaveBeenCalledWith({
            method: 'post',
            url: 'https://api.dynadot.com' + expectedPath,
            data: expectedBody,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${APIKEY}`,
                'X-Request-ID': REQ_ID,
                'X-Signature': expectedSignature(expectedPath, expectedBody),
            },
        })
    })

    test('includes receiver_email in body when provided', async () => {
        const d = new Dynadot(APIKEY, SECRET)
        jest.spyOn(
            d as unknown as { generateRequestId(): string },
            'generateRequestId'
        ).mockReturnValue(REQ_ID)
        mockedRequest.mockResolvedValueOnce({
            data: { code: '200', message: 'Success' },
        })

        await d.pushDomain('foo.com', 'recipient_user', 'a@b.com')

        const expectedPath = '/restful/v1/domains/foo.com/push'
        const expectedBody = JSON.stringify({
            receiver_push_username: 'recipient_user',
            receiver_email: 'a@b.com',
        })
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                method: 'post',
                url: 'https://api.dynadot.com' + expectedPath,
                data: expectedBody,
                headers: expect.objectContaining({
                    'X-Request-ID': REQ_ID,
                    'X-Signature': expectedSignature(
                        expectedPath,
                        expectedBody
                    ),
                }),
            })
        )
    })

    test('URL-encodes special characters in the domain name', async () => {
        const d = new Dynadot(APIKEY, SECRET)
        jest.spyOn(
            d as unknown as { generateRequestId(): string },
            'generateRequestId'
        ).mockReturnValue(REQ_ID)
        mockedRequest.mockResolvedValueOnce({
            data: { code: '200', message: 'Success' },
        })

        await d.pushDomain('münchen.de', 'recipient')

        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url:
                    'https://api.dynadot.com/restful/v1/domains/' +
                    encodeURIComponent('münchen.de') +
                    '/push',
            })
        )
    })

    test('default generateRequestId returns a UUID string (uses real crypto)', () => {
        const d = new Dynadot(APIKEY, SECRET)
        const id = (
            d as unknown as { generateRequestId(): string }
        ).generateRequestId()
        // RFC 4122 v4 UUID shape (sufficient for unit-test sanity, not strict)
        expect(id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        )
    })
})

describe('accountInfo (RESTful v1)', () => {
    const SECRET = 'TEST_API_SECRET'
    const REQ_ID = '11111111-1111-4111-8111-111111111111'

    /** Recompute the signature for an empty-body GET. */
    function expectedSignature(path: string): string {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const crypto = require('crypto') as typeof import('crypto')
        const stringToSign = `${APIKEY}\n${path}\n${REQ_ID}\n`
        return crypto
            .createHmac('sha256', SECRET)
            .update(stringToSign)
            .digest('hex')
    }

    test('throws when apiSecret is missing (signature cannot be computed)', async () => {
        const d = new Dynadot(APIKEY)
        await expect(d.accountInfo()).rejects.toThrow(/apiSecret is required/)
        expect(mockedRequest).not.toHaveBeenCalled()
    })

    test('GETs /restful/v1/accounts/info with signed headers (no body, no Content-Type)', async () => {
        const d = new Dynadot(APIKEY, SECRET)
        jest.spyOn(
            d as unknown as { generateRequestId(): string },
            'generateRequestId'
        ).mockReturnValue(REQ_ID)
        const accountInfoPayload = {
            username: 'me_user',
            forum_name: 'Me',
            account_balance: '0.00',
        }
        const payload = {
            code: '200',
            message: 'Success',
            data: { account_info: accountInfoPayload },
        }
        mockedRequest.mockResolvedValueOnce({ data: payload })

        const got = await d.accountInfo()

        const expectedPath = '/restful/v1/accounts/info'
        expect(got).toBe(accountInfoPayload)
        expect(got.username).toBe('me_user')
        expect(mockedRequest).toHaveBeenCalledWith({
            method: 'get',
            url: 'https://api.dynadot.com' + expectedPath,
            data: undefined,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${APIKEY}`,
                'X-Request-ID': REQ_ID,
                'X-Signature': expectedSignature(expectedPath),
            },
        })
        // No Content-Type header on a body-less GET
        const sentHeaders = mockedRequest.mock.calls[0][0].headers
        expect(sentHeaders).not.toHaveProperty('Content-Type')
    })

    test('returns the unwrapped account_info object (no envelope leak)', async () => {
        const d = new Dynadot(APIKEY, SECRET)
        jest.spyOn(
            d as unknown as { generateRequestId(): string },
            'generateRequestId'
        ).mockReturnValue(REQ_ID)
        mockedRequest.mockResolvedValueOnce({
            data: {
                code: '200',
                message: 'Success',
                data: { account_info: { username: 'someone' } },
            },
        })
        const got = await d.accountInfo()
        expect(got).toEqual({ username: 'someone' })
        expect(got).not.toHaveProperty('code')
        expect(got).not.toHaveProperty('message')
        expect(got).not.toHaveProperty('data')
    })

    test('rejects with the full envelope when code is not "200"', async () => {
        const d = new Dynadot(APIKEY, SECRET)
        jest.spyOn(
            d as unknown as { generateRequestId(): string },
            'generateRequestId'
        ).mockReturnValue(REQ_ID)
        const errPayload = {
            code: '401',
            message: 'Unauthorized',
            error: { description: 'invalid signature' },
        }
        mockedRequest.mockResolvedValueOnce({ data: errPayload })
        await expect(d.accountInfo()).rejects.toEqual(errPayload)
    })

    test('rejects with the envelope when data.account_info is missing', async () => {
        const d = new Dynadot(APIKEY, SECRET)
        jest.spyOn(
            d as unknown as { generateRequestId(): string },
            'generateRequestId'
        ).mockReturnValue(REQ_ID)
        const malformed = { code: '200', message: 'Success', data: {} }
        mockedRequest.mockResolvedValueOnce({ data: malformed })
        await expect(d.accountInfo()).rejects.toEqual(malformed)
    })
})
