# Dynadot API

TypeScript / Node.js wrapper for the [Dynadot API](https://www.dynadot.com/domain/api-commands).

Covers two API surfaces in one client:

- **Legacy XML API v3** (`api.dynadot.com/api3.xml`) — used by `listDomains`, `setNameserver`, `registerDomain`, `tldPrices`, `deleteDomain`, `getTransferAuthCode`, `renewDomain`, `unlockDomain`. XML responses are auto-parsed and `_text` nodes are flattened to plain values.
- **RESTful v1 API** (`api.dynadot.com/restful/v1`) — used by `pushDomain`. Authenticates with `Bearer <apiKey>` plus an HMAC-SHA256 `X-Signature` header derived from your API secret.

## Install

```bash
npm install --save https://github.com/7c/dynadot
```

## Usage

TypeScript / ESM:

```typescript
import Dynadot from '@7c/dynadot'

const d = new Dynadot('<APIKEY>')                   // XML v3 only
const d2 = new Dynadot('<APIKEY>', '<APISECRET>')   // also enables pushDomain (RESTful v1)
```

CommonJS:

```javascript
const Dynadot = require('@7c/dynadot').default
const d = new Dynadot('<APIKEY>')
```

The constructor's second argument (`apiSecret`) is optional and only required by methods that hit the RESTful v1 API (currently `pushDomain`). All legacy XML methods work with just the API key.

# Methods

## listDomains() → `Promise<Record<string, DomainInfo>>`

Retrieves all domains from your Dynadot account and returns them keyed by domain name for fast lookup. Dynadot returns full information for each domain.

```typescript
const allDomains = await d.listDomains()
// {
//   'mydomain.com': { Name: 'mydomain.com', Expiration: '...', ... },
//   'other.net':    { Name: 'other.net',    Expiration: '...', ... },
// }
```

## setNameserver(domain, nameservers) → `Promise<unknown>`

```typescript
await d.setNameserver('temp.com', ['ns1.com', 'ns2.com'])
```

## registerDomain(domainName, durationYears, currency='USD', allowPremium=false, coupon=false) → `Promise<RegisterResponse>`

```typescript
await d.registerDomain('yourdomain.com', 1)
// success
{ RegisterHeader: { SuccessCode: '0', Status: 'success' },
  RegisterContent: { Expiration: '1738627199000' } }

// errors
{ RegisterHeader: { SuccessCode: '1',  Status: 'not_available' } }
{ RegisterHeader: { SuccessCode: '-1', Status: 'error',
                    Error: 'this domain is a premium domain, please use premium option' } }
{ RegisterHeader: { SuccessCode: '5',  Status: 'system_busy' } }
```

> **Note**: passing `durationYears < 1` keeps the returned promise pending forever (legacy quirk preserved from the original JS implementation). Validate your input before calling.

## tldPrices(currency='USD') → `Promise<Record<string, TldPriceContent>>`

Returns a lookup table keyed by TLD.

```typescript
const prices = await d.tldPrices()
// { com: { Tld: 'com', Registration: '...' }, net: { ... }, ... }
```

Rejects with the full parsed payload when `SuccessCode !== '0'`.

## deleteDomain(domainName) → `Promise<DeleteResponse>`

> Only grace-period domains can be deleted via this endpoint. Other or transferred domains cannot.

```typescript
await d.deleteDomain('yourdomain.com')
// success
{ DeleteHeader: { SuccessCode: '0', Status: 'success' } }
{ DeleteHeader: { SuccessCode: '1', Status: 'grace_expired' } }

// errors
{ DeleteHeader: { SuccessCode: '-1', Status: 'error', Error: 'could not find domain in your account' } }
{ DeleteHeader: { SuccessCode: '-1', Status: 'error', Error: 'Please unlock your domain firstly.' } }
{ DeleteHeader: { SuccessCode: '-1', Status: 'error', Error: 'problem with connection to main server' } }
```

## getTransferAuthCode(domainName, new_code=false, unlock_domain_for_transfer=true) → `Promise<GetTransferAuthCodeResponse>`

```typescript
await d.getTransferAuthCode('yourdomain.com')
// success
{ GetTransferAuthCodeResponse: { GetTransferAuthCodeHeader:
  { SuccessCode: '0', Status: 'success', AuthCode: 'e478582Zu663762' } } }

// errors
{ GetTransferAuthCodeResponse: { GetTransferAuthCodeHeader:
  { SuccessCode: '-1', Status: 'error',
    Error: 'need api skip lock agreement for using unlock_domain_for_transfer tag.' } } }
```

## renewDomain(domainName, durationYears=1) → `Promise<RenewResponse>`

```typescript
await d.renewDomain('yourdomain.com')
// success
{ RenewHeader: { SuccessCode: '0', Status: 'success' },
  RenewContent: { Expiration: '1738627199000' } }

// errors
{ RenewHeader: { SuccessCode: '-1', Status: 'error',
                 Error: 'could not find domain in your account' } }
```

## unlockDomain(domainName) → `Promise<GetTransferAuthCodeResponse>`

Convenience wrapper around `getTransferAuthCode(domain, false, true)` since Dynadot has no dedicated unlock endpoint.

```typescript
await d.unlockDomain('yourdomain.com')
// success
{ GetTransferAuthCodeResponse: { GetTransferAuthCodeHeader:
  { SuccessCode: '0', Status: 'success', AuthCode: 'xxxx' } } }

// errors
{ GetTransferAuthCodeResponse: { GetTransferAuthCodeHeader:
  { SuccessCode: '-1', Status: 'error',
    Error: 'could not find domain in your account or domain expired for more than 30 days.' } } }
```

## pushDomain(domainName, receiverPushUsername, receiverEmail?) → `Promise<PushDomainResponse>`

Initiates a domain push from your Dynadot account to another Dynadot user. The recipient still has to accept the push from their own account.

This method uses the **RESTful v1 API** and signs the request with HMAC-SHA256, so the `apiSecret` is required:

```typescript
const d = new Dynadot('<APIKEY>', '<APISECRET>')

// minimal
await d.pushDomain('mydomain.com', 'recipient_username')

// with optional recipient email hint
const result = await d.pushDomain(
    'mydomain.com',
    'recipient_username',
    'recipient@example.com',
)

// success
{ code: '200', message: 'Success' }
```

Throws `Error('apiSecret is required for signed RESTful API calls ...')` if you constructed `Dynadot` without an API secret.

A runnable example using env vars lives at [`src/examples/pushDomain.ts`](src/examples/pushDomain.ts):

```bash
DYNADOT_API_KEY=...           \
DYNADOT_API_SECRET=...        \
DYNADOT_PUSH_DOMAIN=mydomain.com \
DYNADOT_PUSH_RECEIVER_USER=otheruser \
DYNADOT_PUSH_RECEIVER_EMAIL=other@example.com  \
npx ts-node src/examples/pushDomain.ts
```

> **Where do I get `DYNADOT_PUSH_RECEIVER_USER`?** Dynadot has no public lookup endpoint that resolves another account's username from an email or other identifier. The recipient must obtain it themselves from their own account: have them run [`src/examples/whoami.ts`](src/examples/whoami.ts) (see [`accountInfo()`](#accountinfo--promiseaccountinforesponse) below) with their own API key and share the printed username with you.

## accountInfo() → `Promise<AccountInfoResponse>`

Returns the API-key holder's own account info via `GET /restful/v1/accounts/info`. Useful for retrieving your own `username` (the value the sender needs as `receiver_push_username` for `pushDomain`), balance, default contacts, etc.

Like `pushDomain`, this hits the **RESTful v1 API** and requires `apiSecret`:

```typescript
const d = new Dynadot('<APIKEY>', '<APISECRET>')
const info = await d.accountInfo()
// {
//   code: '200',
//   message: 'Success',
//   data: {
//     account_info: {
//       username: 'your_push_username',
//       forum_name: '...',
//       account_balance: '0.00',
//       balance_list: [{ currency: 'USD', amount: '0.00' }],
//       /* ...rest of the account_info payload... */
//     },
//   },
// }
console.log(info.data?.account_info.username)
```

Runnable example at [`src/examples/whoami.ts`](src/examples/whoami.ts):

```bash
DYNADOT_API_KEY=...     \
DYNADOT_API_SECRET=...  \
npx ts-node src/examples/whoami.ts
# -> Your push username is: <username>
#    Share this with the sender as DYNADOT_PUSH_RECEIVER_USER.
```

# TypeScript

The package ships compiled JS plus `.d.ts` declarations in `dist/`. Public types (`DeleteResponse`, `RenewResponse`, `RegisterResponse`, `GetTransferAuthCodeResponse`, `DomainsByName`, `TldPricesByTld`, `PushDomainRequest`, `PushDomainResponse`, `AccountInfo`, `AccountInfoResponse`, etc.) are re-exported from the package root:

```typescript
import Dynadot, { type PushDomainResponse, type DomainsByName } from '@7c/dynadot'
```

# Scripts

```bash
npm run build         # compile src/ to dist/
npm run typecheck     # tsc --noEmit
npm test              # run jest test suite
npm run test:coverage # run with coverage report (enforces 100%)
```
