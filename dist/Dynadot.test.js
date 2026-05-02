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
//#region imports
const parser = __importStar(require("xml-js"));
const http_1 = require("./http");
//#endregion
jest.mock('./http', () => ({
    HttpClient: jest.fn(),
    httpClient: { request: jest.fn() },
}));
jest.mock('xml-js');
// Cast jest mocks for typing
const mockedRequest = http_1.httpClient.request;
const mockedXml2json = parser.xml2json;
/**
 * Loads the module under test fresh for every test so mocks are honored.
 * The package's HTTP transport (src/http.ts) is mocked so we never hit the
 * network; tests assert the exact options passed to httpClient.request.
 */
const Dynadot_1 = __importDefault(require("./Dynadot"));
const APIKEY = 'TEST_API_KEY';
const BASE = 'https://api.dynadot.com/api3.xml?key=' + APIKEY;
/**
 * Creates a fake XML payload string and configures parser.xml2json to
 * return JSON.stringify of `wrappedJson`. Returns a marker XML response
 * that doRequest's resolved value will be passed into xml2json with.
 */
function primeAxiosAndParser(wrappedJson, fakeXml = '<fake/>') {
    mockedRequest.mockResolvedValueOnce({ data: fakeXml });
    mockedXml2json.mockReturnValueOnce(JSON.stringify(wrappedJson));
}
beforeEach(() => {
    jest.clearAllMocks();
});
// flattenText helper is exercised directly in ./flatten.test.ts
describe('constructor', () => {
    test('stores apikey and constructs baseUrl', () => {
        const d = new Dynadot_1.default(APIKEY);
        expect(d.apikey).toBe(APIKEY);
        expect(d.baseUrl).toBe(BASE);
    });
});
describe('doRequest', () => {
    test('resolves with res.data on axios success (no headers, default data)', async () => {
        mockedRequest.mockResolvedValueOnce({ data: '<ok/>' });
        const d = new Dynadot_1.default(APIKEY);
        const got = await d.doRequest('get', '&command=ping');
        expect(got).toBe('<ok/>');
        expect(mockedRequest).toHaveBeenCalledWith({
            method: 'get',
            url: BASE + '&command=ping',
            data: {},
            headers: undefined,
        });
    });
    test('forwards headers from AdditionalAxiosOptions when provided', async () => {
        mockedRequest.mockResolvedValueOnce({ data: '<ok/>' });
        const d = new Dynadot_1.default(APIKEY);
        const got = await d.doRequest('post', '&command=ping', { foo: 'bar' }, { headers: { 'X-Test': '1' } });
        expect(got).toBe('<ok/>');
        expect(mockedRequest).toHaveBeenCalledWith({
            method: 'post',
            url: BASE + '&command=ping',
            data: { foo: 'bar' },
            headers: { 'X-Test': '1' },
        });
    });
    test('rejects when axios rejects', async () => {
        const boom = new Error('network down');
        mockedRequest.mockRejectedValueOnce(boom);
        const d = new Dynadot_1.default(APIKEY);
        await expect(d.doRequest('get', '&command=ping')).rejects.toBe(boom);
    });
});
describe('setNameserver', () => {
    test('builds the right URL and resolves the parsed response', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            SetNsResponse: { SetNsHeader: { SuccessCode: { _text: '0' } } },
        });
        const got = await d.setNameserver('temp.com', ['ns1.com', 'ns2.com']);
        expect(got).toEqual({ SetNsResponse: { SetNsHeader: { SuccessCode: '0' } } });
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            method: 'get',
            url: BASE +
                '&command=set_ns&domain=temp.com&ns0=ns1.com&ns1=ns2.com',
        }));
    });
    test('handles empty nameserver list', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            SetNsResponse: { SetNsHeader: { SuccessCode: { _text: '0' } } },
        });
        const got = await d.setNameserver('temp.com', []);
        expect(got).toBeDefined();
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE + '&command=set_ns&domain=temp.com&',
        }));
    });
});
describe('listDomains', () => {
    test('aggregates domains keyed by Name', async () => {
        const d = new Dynadot_1.default(APIKEY);
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
        });
        const got = await d.listDomains();
        expect(got).toEqual({
            'one.com': { Name: 'one.com', Expiration: '111' },
            'two.com': { Name: 'two.com', Expiration: '222' },
        });
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({ url: BASE + '&command=list_domain' }));
    });
});
describe('registerDomain', () => {
    test('builds default URL with currency=USD and resolves RegisterResponse', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            RegisterResponse: {
                RegisterHeader: {
                    SuccessCode: { _text: '0' },
                    Status: { _text: 'success' },
                },
            },
        });
        const got = await d.registerDomain('foo.com', 1);
        expect(got).toEqual({
            RegisterHeader: { SuccessCode: '0', Status: 'success' },
        });
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE +
                '&command=register&domain=foo.com&duration=1&currency=USD',
        }));
    });
    test('appends allow_premium when allowPremium=true', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            RegisterResponse: { RegisterHeader: { SuccessCode: { _text: '0' } } },
        });
        await d.registerDomain('foo.com', 2, 'EUR', true);
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE +
                '&command=register&domain=foo.com&duration=2&currency=EUR&allow_premium=1',
        }));
    });
    test('appends coupon when coupon is truthy', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            RegisterResponse: { RegisterHeader: { SuccessCode: { _text: '0' } } },
        });
        await d.registerDomain('foo.com', 1, 'USD', false, 'COUPON123');
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE +
                '&command=register&domain=foo.com&duration=1&currency=USD&coupon=COUPON123',
        }));
    });
    test('appends both allow_premium and coupon when set', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            RegisterResponse: { RegisterHeader: { SuccessCode: { _text: '0' } } },
        });
        await d.registerDomain('foo.com', 5, 'USD', true, 'X');
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE +
                '&command=register&domain=foo.com&duration=5&currency=USD&allow_premium=1&coupon=X',
        }));
    });
    test('when durationYears < 1 the promise never settles (validation branch)', async () => {
        const d = new Dynadot_1.default(APIKEY);
        const sentinel = Symbol('pending');
        const race = await Promise.race([
            d.registerDomain('foo.com', 0),
            new Promise((res) => setTimeout(() => res(sentinel), 30)),
        ]);
        expect(race).toBe(sentinel);
        expect(mockedRequest).not.toHaveBeenCalled();
    });
});
describe('tldPrices', () => {
    test('aggregates TLD prices keyed by Tld on success', async () => {
        const d = new Dynadot_1.default(APIKEY);
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
        });
        const got = await d.tldPrices();
        expect(got).toEqual({
            com: { Tld: 'com', Registration: '10' },
            net: { Tld: 'net', Registration: '12' },
        });
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE + '&command=tld_price&currency=USD',
        }));
    });
    test('honors custom currency parameter', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            TldPriceResponse: {
                TldPriceResponseHeader: { SuccessCode: { _text: '0' } },
                TldPriceContent: [],
            },
        });
        const got = await d.tldPrices('EUR');
        expect(got).toEqual({});
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE + '&command=tld_price&currency=EUR',
        }));
    });
    test('rejects with the parsed json when SuccessCode is not "0"', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            TldPriceResponse: {
                TldPriceResponseHeader: {
                    SuccessCode: { _text: '-1' },
                    Status: { _text: 'error' },
                },
            },
        });
        await expect(d.tldPrices()).rejects.toEqual({
            TldPriceResponse: {
                TldPriceResponseHeader: {
                    SuccessCode: '-1',
                    Status: 'error',
                },
            },
        });
    });
});
describe('deleteDomain', () => {
    test('builds delete URL and resolves DeleteResponse', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            DeleteResponse: {
                DeleteHeader: {
                    SuccessCode: { _text: '0' },
                    Status: { _text: 'success' },
                },
            },
        });
        const got = await d.deleteDomain('foo.com');
        expect(got).toEqual({
            DeleteHeader: { SuccessCode: '0', Status: 'success' },
        });
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE + '&command=delete&domain=foo.com',
        }));
    });
});
describe('renewDomain', () => {
    test('uses default duration of 1', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            RenewResponse: {
                RenewHeader: {
                    SuccessCode: { _text: '0' },
                    Status: { _text: 'success' },
                },
            },
        });
        const got = await d.renewDomain('foo.com');
        expect(got).toEqual({
            RenewHeader: { SuccessCode: '0', Status: 'success' },
        });
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE + '&command=renew&domain=foo.com&duration=1',
        }));
    });
    test('honors explicit duration', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            RenewResponse: { RenewHeader: { SuccessCode: { _text: '0' } } },
        });
        await d.renewDomain('foo.com', 3);
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE + '&command=renew&domain=foo.com&duration=3',
        }));
    });
});
describe('getTransferAuthCode', () => {
    test('default: only unlock_domain_for_transfer is appended', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            GetTransferAuthCodeResponse: {
                GetTransferAuthCodeHeader: {
                    SuccessCode: { _text: '0' },
                    Status: { _text: 'success' },
                    AuthCode: { _text: 'AUTH' },
                },
            },
        });
        const got = await d.getTransferAuthCode('foo.com');
        expect(got).toEqual({
            GetTransferAuthCodeResponse: {
                GetTransferAuthCodeHeader: {
                    SuccessCode: '0',
                    Status: 'success',
                    AuthCode: 'AUTH',
                },
            },
        });
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE +
                '&command=get_transfer_auth_code&domain=foo.com&unlock_domain_for_transfer=1',
        }));
    });
    test('appends new_code=1 when new_code=true', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            GetTransferAuthCodeResponse: {
                GetTransferAuthCodeHeader: { SuccessCode: { _text: '0' } },
            },
        });
        await d.getTransferAuthCode('foo.com', true, true);
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE +
                '&command=get_transfer_auth_code&domain=foo.com&new_code=1&unlock_domain_for_transfer=1',
        }));
    });
    test('omits unlock flag when unlock_domain_for_transfer=false', async () => {
        const d = new Dynadot_1.default(APIKEY);
        primeAxiosAndParser({
            GetTransferAuthCodeResponse: {
                GetTransferAuthCodeHeader: { SuccessCode: { _text: '0' } },
            },
        });
        await d.getTransferAuthCode('foo.com', false, false);
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: BASE +
                '&command=get_transfer_auth_code&domain=foo.com',
        }));
    });
});
describe('unlockDomain', () => {
    test('delegates to getTransferAuthCode with new_code=false, unlock=true', async () => {
        const d = new Dynadot_1.default(APIKEY);
        const spy = jest
            .spyOn(d, 'getTransferAuthCode')
            .mockResolvedValue({ ok: true });
        const got = await d.unlockDomain('foo.com');
        expect(spy).toHaveBeenCalledWith('foo.com', false, true);
        expect(got).toEqual({ ok: true });
    });
});
describe('pushDomain (RESTful v1)', () => {
    const SECRET = 'TEST_API_SECRET';
    const REQ_ID = '00000000-0000-4000-8000-000000000000';
    /** Recompute the signature exactly as the source does. */
    function expectedSignature(path, body) {
        // Imported locally to keep the helper colocated with this describe.
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const crypto = require('crypto');
        const stringToSign = `${APIKEY}\n${path}\n${REQ_ID}\n${body}`;
        return crypto
            .createHmac('sha256', SECRET)
            .update(stringToSign)
            .digest('hex');
    }
    test('stores apiSecret on the instance when provided', () => {
        const d = new Dynadot_1.default(APIKEY, SECRET);
        expect(d.apikey).toBe(APIKEY);
        expect(d.apiSecret).toBe(SECRET);
    });
    test('throws when apiSecret is missing (signature cannot be computed)', async () => {
        const d = new Dynadot_1.default(APIKEY);
        await expect(d.pushDomain('foo.com', 'someuser')).rejects.toThrow(/apiSecret is required/);
        expect(mockedRequest).not.toHaveBeenCalled();
    });
    test('POSTs JSON body with signed headers (no email variant)', async () => {
        const d = new Dynadot_1.default(APIKEY, SECRET);
        jest.spyOn(d, 'generateRequestId').mockReturnValue(REQ_ID);
        mockedRequest.mockResolvedValueOnce({
            data: { code: '200', message: 'Success' },
        });
        const got = await d.pushDomain('foo.com', 'recipient_user');
        const expectedPath = '/restful/v1/domains/foo.com/push';
        const expectedBody = JSON.stringify({
            receiver_push_username: 'recipient_user',
        });
        expect(got).toEqual({ code: '200', message: 'Success' });
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
        });
    });
    test('includes receiver_email in body when provided', async () => {
        const d = new Dynadot_1.default(APIKEY, SECRET);
        jest.spyOn(d, 'generateRequestId').mockReturnValue(REQ_ID);
        mockedRequest.mockResolvedValueOnce({
            data: { code: '200', message: 'Success' },
        });
        await d.pushDomain('foo.com', 'recipient_user', 'a@b.com');
        const expectedPath = '/restful/v1/domains/foo.com/push';
        const expectedBody = JSON.stringify({
            receiver_push_username: 'recipient_user',
            receiver_email: 'a@b.com',
        });
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            method: 'post',
            url: 'https://api.dynadot.com' + expectedPath,
            data: expectedBody,
            headers: expect.objectContaining({
                'X-Request-ID': REQ_ID,
                'X-Signature': expectedSignature(expectedPath, expectedBody),
            }),
        }));
    });
    test('URL-encodes special characters in the domain name', async () => {
        const d = new Dynadot_1.default(APIKEY, SECRET);
        jest.spyOn(d, 'generateRequestId').mockReturnValue(REQ_ID);
        mockedRequest.mockResolvedValueOnce({
            data: { code: '200', message: 'Success' },
        });
        await d.pushDomain('münchen.de', 'recipient');
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            url: 'https://api.dynadot.com/restful/v1/domains/' +
                encodeURIComponent('münchen.de') +
                '/push',
        }));
    });
    test('default generateRequestId returns a UUID string (uses real crypto)', () => {
        const d = new Dynadot_1.default(APIKEY, SECRET);
        const id = d.generateRequestId();
        // RFC 4122 v4 UUID shape (sufficient for unit-test sanity, not strict)
        expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });
});
