### Getting Started With Dynadot RESTful API

Source: https://www.dynadot.com/domain/api-document/index

Information on API authentication, URL structure, and supported HTTP methods.

```APIDOC
## Getting Started With Dynadot RESTful API

### Description
The Dynadot API is designed for seamless integration with your systems. It features predictable resource-oriented URLs, supports JSON-encoded request bodies, and returns JSON-encoded and XML-encoded responses. The API adheres to standard HTTP methods, authentication, and response codes. You can use the Dynadot API in both test and live modes, determined by the API key used for authentication.

### API Keys

Before making any API requests, generate your API Key and API Secret from the API section in your account settings:
1. Log in to your Dynadot account.
2. Navigate to **Tools** > **API**.
3. Generate your **API Key** and **API Secret**.

### HTTP Methods

The API uses standard HTTP methods to perform operations on resources:

*   **GET**: Retrieve detailed information about a specified resource.
*   **POST**: Create a new resource.
*   **PUT**: Fully update the specified resource.
*   **DELETE**: Remove the specified resource.

### URL Structure

The base URL for all API requests is: `https://api.dynadot.com/`

The full URL format is: `http://api.dynadot.com/restful/version_code/resource/{resource_identify}/action`

**Note**: Bulk creations, updates, and deletes are not supported. Each request type is limited to one object or action.
```

--------------------------------

### Suggestion Search Domains - Response Example

Source: https://www.dynadot.com/domain/api-document/index

Shows an example of a successful JSON response when requesting domain suggestions. The response contains a list of suggested domain names.

```json
{
  * code: "200",
  * message: "Success",
  * data: {
    * domain_list: [

```

--------------------------------

### Get Site Builder API Request and Response

Source: https://www.dynadot.com/domain/api-document/index

Details the GET_SITE_BUILDER API command, including the request URL, required headers (Accept, Authorization, X-Signature), and example success and error response structures. The success response provides details about a specific site builder instance.

```HTTP
GET https://api.dynadot.com/restful/v1/sitebuilders/{domain_name}
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

```

```JSON
{
  "code": "200",
  "message": "Success",
  "data": {
    "sitebuilder": {
      "domain_name": "example.com",
      "template": "Meridian",
      "plan": "Free",
      "is_published": "true",
      "last_update": 0,
      "expiration": 0,
      "site_url": "https://sitebuilder1.example.com"
    }
  }
}

```

```JSON
{
  "code": "Integer",
  "message": "String",
  "data": {
    "sitebuilder": {
      "domain_name": "String",
      "template": "String",
      "plan": "String",
      "is_published": "String",
      "last_update": "Long",
      "expiration": "Long",
      "site_url": "String"
    }
  }
}

```

--------------------------------

### Search Single Domain - Success Response Example

Source: https://www.dynadot.com/domain/api-document/index

Provides an example of a successful JSON response when searching for a domain. It details the structure, including domain name, availability, premium status, and a list of prices for various terms.

```json
{
  * code: "200",
  * message: "Success",
  * data: {
    * domain_name: "domain1.com",
    * available: "No",
    * premium: "YES",
    * price_list: [
      1. {
         * currency: "USD",
         * unit: "(price/1 year)",
         * transfer: "$203",
         * restore: "$204"
4 items},
      2. {
         * currency: "USD",
         * unit: "(price/2 year)"
2 items},
      3. {
         * currency: "USD",
         * unit: "(price/3 year)"
2 items},
      4. {
         * currency: "USD",
         * unit: "(price/4 year)"
2 items},
      5. {
         * currency: "USD",
         * unit: "(price/5 year)"
2 items},
      6. {
         * currency: "USD",
         * unit: "(price/6 year)"
2 items},
      7. {
         * currency: "USD",
         * unit: "(price/7 year)"
2 items},
      8. {
         * currency: "USD",
         * unit: "(price/8 year)"
2 items},
      9. {
         * currency: "USD",
         * unit: "(price/9 year)"
2 items},
      10. {
         * currency: "USD",
         * unit: "(price/10 year)"
2 items}
10 items]
4 items}

}
```

--------------------------------

### Open Auction Response Structure Example

Source: https://www.dynadot.com/domain/api-document/index

Example JSON response for the 'Get Open Auctions' API request. It illustrates a successful response, containing a 'code', 'message', and a 'data' object with an 'auction_detail_info_list'. Each element in the list provides details for an open auction.

```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "auction_detail_info_list": [
      {
        "auction_id": 1,
        "domain_name_utf": "example.com",
        "current_price": "1000",
        "currency": "USD",
        "bids": 10,
        "end_time_utc": "2021-01-01T00:00:00Z",
        "end_time_stamp": 1609459200,
        "revenue": "1000",
        "revenue_currency": "USD",
        "visitors": 1000,
        "inbound_links": 100,
        "age": 10
      }
    ]
  }
}
```

--------------------------------

### Example String to Sign for HMAC-SHA256

Source: https://www.dynadot.com/domain/api-document/index

Provides a concrete example of how to build the string that will be used for HMAC-SHA256 signature generation, including sample values for API key, path, request ID, and request body.

```text
apiKey = "your_api_key"
fullPathAndQuery = "/v1/some/endpoint?param=value"
xRequestId = "unique-request-id"
requestBody = "{\"key\":\"value\"}"

stringToSign = "your_api_key\n/v1/some/endpoint?param=value\nunique-request-id\n{\"key\":\"value\"}"
```

--------------------------------

### Dynadot Order History Request Example

Source: https://www.dynadot.com/domain/api-document/index

Example of a GET request to retrieve order history from the Dynadot API. This endpoint supports various search parameters to filter orders by domain name, order ID, date range, and payment method.

```HTTP
GET https://api.dynadot.com/restful/v1/orders
```

--------------------------------

### Get Account Info Response Structure Example

Source: https://www.dynadot.com/domain/api-document/index

This example illustrates the success response structure for the GET_INFO command in the Dynadot API. It includes a 'code' indicating success and a 'message'. The 'data' field contains detailed account information, including username, forum name, avatar URL, and contact details.

```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "host": "ns1.example.com",
    "server_id": 12345
  }
}
```

--------------------------------

### Upgrade Sitebuilder Success Response (200)

Source: https://www.dynadot.com/domain/api-document/index

Example of a successful response after upgrading a sitebuilder. Returns the updated sitebuilder object.

```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "sitebuilder": {
      "domain_name": "example.com",
      "template": "Meridian",
      "plan": "Free",
      "is_published": "true",
      "last_update": 0,
      "expiration": 0,
      "site_url": "https://sitebuilder1.example.com"
    }
  }
}
```

--------------------------------

### Create Sitebuilder Success Response (200)

Source: https://www.dynadot.com/domain/api-document/index

Example of a successful response when creating a sitebuilder. Includes status code, message, and the details of the created sitebuilder.

```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "sitebuilder_list": [
      {
        "domain_name": "example.com",
        "template": "Meridian",
        "plan": "Free",
        "is_published": "true",
        "last_update": 0,
        "expiration": 0,
        "site_url": "https://sitebuilder1.example.com"
      }
    ]
  }
}
```

--------------------------------

### API Request Headers Example

Source: https://www.dynadot.com/domain/api-document/index

This example illustrates the common request headers for Dynadot API calls, including Content-Type, Accept, Authorization with a Bearer token, and a required X-Signature for request validation.

```HTTP
Content-Type: application/json
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
```

--------------------------------

### API Request Headers Example

Source: https://www.dynadot.com/domain/api-document/index

Demonstrates common headers used in API requests, including Content-Type for data format, Accept for response format, Authorization for authentication with an API key, X-Request-ID for unique request identification, and X-Signature for security.

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer YOUR_API_KEY
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000
```

--------------------------------

### Get WHOIS Stats API Request Example

Source: https://www.dynadot.com/domain/api-document/index

This snippet demonstrates how to make a GET request to the Dynadot API to retrieve WHOIS statistics for a given domain. It includes the API endpoint, required headers like Accept and Authorization, and illustrates a sample response structure.

```HTTP
GET https://api.dynadot.com/restful/v1/aftermarket/whois_stats
Accept:  application/json
Authorization:  Bearer API_KEY
```

--------------------------------

### Transfer In Domain API Request Example

Source: https://www.dynadot.com/domain/api-document/index

An example of a JSON request body for the TRANSFER_IN command of the Dynadot API. It includes parameters for the domain itself and various contact details.

```JSON
{
  "domain": {
    "duration": 0,
    "auth_code": "String",
    "registrant_contact_id": 0,
    "admin_contact_id": 0,
    "tech_contact_id": 0,
    "billing_contact_id": 0,
    "registrant_contact": {
      "organization": "String",
      "name": "String",
      "email": "String",
      "phone_number": "String",
      "phone_cc": "String",
      "fax_number": "String",
      "fax_cc": "String",
      "address1": "String",
      "address2": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "country": "String"
    },
    "admin_contact": {
      "organization": "String",
      "name": "String",
      "email": "String",
      "phone_number": "String",
      "phone_cc": "String",
      "fax_number": "String",
      "fax_cc": "String",
      "address1": "String",
      "address2": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "country": "String"
    },
    "tech_contact": {
      "organization": "String",
      "name": "String",
      "email": "String",
      "phone_number": "String",
      "phone_cc": "String",
      "fax_number": "String",
      "fax_cc": "String",
      "address1": "String",
      "address2": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "country": "String"
    }
  }
}
```

--------------------------------

### Error Response Example

Source: https://www.dynadot.com/domain/api-document/index

Example of an error response, specifically for too many requests (429).

```APIDOC
## Error Response Example (Too Many Requests)

### Description
This example demonstrates the structure of an error response when the client exceeds the allowed request rate.

### Response Example (429)
```json
{
  "status": {
    "code": 429,
    "message": "Too Many Requests"
  },
  "error": {
    "description": "You have reached the maximum allowed requests within the concurrent limit of your account. Please try again later."
  }
}
```
```

--------------------------------

### Search Single Domain - API Request Example

Source: https://www.dynadot.com/domain/api-document/index

Demonstrates how to construct an API request to search for the availability and pricing of a single domain name. It includes the endpoint, required headers, and a sample response structure.

```http
GET https://api.dynadot.com/restful/v1/domains/{domain_name}/search
Accept:  application/json
Authorization:  Bearer API_KEY
```

--------------------------------

### API Success Response Example

Source: https://www.dynadot.com/domain/api-document/index

This example shows a typical success response from the Dynadot API, indicated by a '200' status code and a 'Success' message, confirming the API operation was completed as expected.

```JSON
{
  "code": "200",
  "message": "Success"
}
```

--------------------------------

### Suggestion Search Domains - API Request Example

Source: https://www.dynadot.com/domain/api-document/index

Outlines the API request for obtaining domain name suggestions. It specifies the endpoint, including the domain name placeholder, and required headers.

```http
GET https://api.dynadot.com/restful/v1/domains/{domain_name}/suggestion_search
Accept:  application/json
Authorization:  Bearer API_KEY
```

--------------------------------

### Closed Auction Response Structure Example

Source: https://www.dynadot.com/domain/api-document/index

Example JSON response for the 'Get Closed Auctions' API request. It shows the structure of a successful response, including a 'code', 'message', and a 'data' object containing a list of 'ClosedAuctionList' items. Each item details a specific closed auction.

```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "ClosedAuctionList": [
      {
        "auction_id": 2,
        "domain": "testdomain1.test",
        "auction_status": "CLOSED_BY_USER",
        "bid_price": "89.99",
        "bids": "1",
        "end_time": "2022/04/04 02:20:34 PST",
        "end_timestamp": "1649064034033",
        "auction_won_status": "won",
        "your_high_bid": "89.99",
        "your_proxy_bid": "1000.0"
      },
      {
        "auction_id": 3,
        "domain": "testdomain2.test",
        "auction_status": "CLOSED_BY_USER",
        "bid_price": "28.99",
        "bids": "1",
        "end_time": "2022/04/05 02:20:34 PST",
        "end_timestamp": "1649150434049",
        "auction_won_status": "won",
        "your_high_bid": "28.99",
        "your_proxy_bid": "1000.0"
      }
    ]
  }
}
```

--------------------------------

### Set Nameserver IP Address Request Example

Source: https://www.dynadot.com/domain/api-document/index

This example shows a PUT request to the Dynadot API to set the IP address for a nameserver. It includes the necessary endpoint, content type, authorization, and the required X-Signature header. The request body contains the list of IP addresses to be set.

```http
PUT https://api.dynadot.com/restful/v1/nameservers/{nameserver}/set_ip
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}
```

--------------------------------

### Dynadot API REGISTER Command Endpoint and Headers

Source: https://www.dynadot.com/domain/api-document/index

This example shows the HTTP POST request to the Dynadot API for domain registration. It includes the production and sandbox endpoints, required headers like Content-Type, Accept, and Authorization, and the custom X-Signature header for security.

```HTTP
POST https://api.dynadot.com/restful/v1/domains/{domain_name}/register
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}
```

--------------------------------

### API Request Body Example (JSON)

Source: https://www.dynadot.com/domain/api-document/index

A sample JSON structure for the request body, typically used in POST or PUT requests. It includes parameters like domainName, showPrice, and currency for domain-related operations.

```json
{
  "domainName": "domain.com",
  "showPrice": "yes",
  "currency": "USD"
}
```

--------------------------------

### Get WHOIS Stats API Response Example (JSON)

Source: https://www.dynadot.com/domain/api-document/index

This JSON structure represents a successful response from the GET_WHOIS_STATS API call. It contains a code, message, and a data object with a list of WHOIS statistics, each including a date and count.

```JSON
{
  "code": "200",
  "message": "Success",
  "data": {
    "stats": [
      {
        "date": "2021-01-01",
        "count": 100
      },
      {
        "date": "2021-01-02",
        "count": 200
      },
      {
        "date": "2021-01-03",
        "count": 300
      }
    ]
  }
}
```

--------------------------------

### Get Expired Closeout Domains API Request Example

Source: https://www.dynadot.com/domain/api-document/index

This snippet shows the API request for fetching expired closeout domains. It includes the endpoint and optional parameters for currency, page number, and page size, along with necessary headers.

```HTTP
GET https://api.dynadot.com/restful/v1/aftermarket/get_expired_closeout_domains
Accept:  application/json
Authorization:  Bearer API_KEY
```

--------------------------------

### Bulk Search Domains - API Request Example

Source: https://www.dynadot.com/domain/api-document/index

Details the API request for performing a bulk search of multiple domain names. It specifies the endpoint and required headers for the request.

```http
GET https://api.dynadot.com/restful/v1/domains/bulk_search
Accept:  application/json
Authorization:  Bearer API_KEY
```

--------------------------------

### GET /restful/v1/aftermarket/auctions/open - Get Open Auctions

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of currently open aftermarket auctions. This endpoint supports filtering by currency and auction types.

```APIDOC
## GET /restful/v1/aftermarket/auctions/open

### Description
Retrieves a list of currently open aftermarket auctions. This endpoint allows filtering by currency and auction types, providing detailed information about each ongoing auction.

### Method
GET

### Endpoint
`https://api.dynadot.com/restful/v1/aftermarket/auctions/open`

### Parameters
#### Query Parameters
- **currency** (String) - Required. The currency of the auctions to retrieve (e.g., USD, EUR). Supported values: `usd, gbp, eur, inr, pln, zar, ltl, cny, cad, jpy, nzd, rub, aud, mxn, brl, idr, ars, cop, dkk, rsd, hkd, chf, aed, myr, ngn, kes, czk, btc, nok`.
- **auction_types** (List) - Optional. A comma-separated list of auction types to filter by. Supported values: `expired, user, portfolio, backorder, registrar, registry, registryexpired, premiumuser`.

### Request Example
```json
{
  "example": "No request body for GET request. Use query parameters for filtering."
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.
- **data** (Object) - Contains the list of open auctions.
  - **auction_detail_info_list** (List) - A list of auction detail objects.
    - **auction_id** (Integer) - The unique identifier for the auction.
    - **domain_name_utf** (String) - The domain name in UTF-8 encoding.
    - **current_price** (String) - The current highest bid price for the auction.
    - **currency** (String) - The currency of the current price.
    - **bids** (Integer) - The number of bids placed on the auction.
    - **end_time_utc** (String) - The end time of the auction in UTC format.
    - **end_time_stamp** (Long) - The Unix timestamp when the auction ends.
    - **revenue** (String) - The revenue generated by the auction so far.
    - **revenue_currency** (String) - The currency of the revenue.
    - **visitors** (Long) - The number of visitors to the auction listing.
    - **inbound_links** (Integer) - The number of inbound links to the domain.
    - **age** (Integer) - The age of the domain in days.
    - **auction_type** (String) - The type of the auction.
    - **bidders** (Integer) - The number of unique bidders.
    - **time_left** (String) - The time remaining until the auction closes.
    - **renewal_price** (String) - The renewal price for the domain if the auction is won.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "auction_detail_info_list": [
      {
        "auction_id": 1,
        "domain_name_utf": "example.com",
        "current_price": "1000",
        "currency": "USD",
        "bids": 10,
        "end_time_utc": "2021-01-01T00:00:00Z",
        "end_time_stamp": 1609459200,
        "revenue": "1000",
        "revenue_currency": "USD",
        "visitors": 1000,
        "inbound_links": 100,
        "age": 10,
        "auction_type": "expired",
        "bidders": 5,
        "time_left": "2 days",
        "renewal_price": "12.99"
      }
    ]
  }
}
```

#### Error Response
- **code** (Integer) - The error code.
- **message** (String) - A description of the error.
- **data** (Object) - Empty or contains error details.
```
```

--------------------------------

### Get Domain Listings

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of domain listings based on specified criteria such as currency, and pagination.

```APIDOC
## GET /restful/v1/aftermarket/listings

### Description
Retrieves a list of domain listings with optional filters.

### Method
GET

### Endpoint
`/restful/v1/aftermarket/listings`

### Parameters
#### Query Parameters
- **currency** (String) - Required - The currency for the search (usd, gbp, eur, etc.).
- **exclude_pending_sale** (Boolean) - Optional - Exclude domains with pending sales.
- **show_other_registrar** (Boolean) - Optional - Show listings from other registrars.
- **count_per_page** (Integer) - Required - Number of results per page.
- **page_index** (Integer) - Required - The page number to retrieve.

### Response
#### Success Response (200)
- **listing_item_list** (List) - List of domain listings.
  - **listing_id** (Integer) - The unique identifier of the listing.
  - **domain** (String) - The domain name.
  - **price** (String) - The price of the domain.
  - **in_bound_links** (Integer) - The number of inbound links.
  - **age** (Integer) - The age of the domain.
  - **is_pending_sale_locked** (Boolean) - Whether the domain is locked for pending sale.

#### Response Example
```json
{
  "listing_item_list": [
    {
      "listing_id": 12345,
      "domain": "example.com",
      "price": "500.00",
      "in_bound_links": 100,
      "age": 5,
      "is_pending_sale_locked": false
    }
  ]
}
```
```

--------------------------------

### API Error Response Example

Source: https://www.dynadot.com/domain/api-document/index

This example demonstrates a generic error response from the Dynadot API, where 'code' represents an Integer error code and 'message' provides a String description of the error encountered during the API request.

```JSON
{
  "code": "Integer",
  "message": "String"
}
```

--------------------------------

### Place Auction Bid - Example Parameters

Source: https://www.dynadot.com/domain/api-document/index

Places a bid on a domain auction. This function requires specifying the currency and bid amount. An optional boolean parameter can be used to indicate if it's a backorder auction. Supported currencies include USD, GBP, EUR, and many others.

```Python
def place_auction_bid(domain_name, currency, bid_amount, is_backorder_auction=False):
    # Implementation details for placing a bid
    pass

# Example usage:
place_auction_bid("example.com", "usd", 100.50, is_backorder_auction=True)
```

--------------------------------

### GET /accounts/info - Get Account Information

Source: https://www.dynadot.com/domain/api-document/index

Retrieves detailed information about the user's Dynadot account, including contact details, balance, and default settings.

```APIDOC
## GET /accounts/info

### Description
Retrieves detailed information about the user's Dynadot account, including contact details, balance, and default settings.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/accounts/info

### Parameters
#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **account_info** (Object) - Contains all account-related information.
  - **username** (String) - The user's account username.
  - **forum_name** (String) - The user's forum nickname.
  - **avatar_url** (String) - URL to the user's avatar.
  - **account_contact** (Object) - Details of the account's primary contact.
    - **organization** (String) - Organization name.
    - **name** (String) - Contact person's name.
    - **email** (String) - Contact email address.
    - **phone_number** (String) - Contact phone number.
    - **phone_cc** (String) - Country code for the phone number.
    - **fax_number** (String) - Contact fax number.
    - **fax_cc** (String) - Country code for the fax number.
    - **address1** (String) - First line of the address.
    - **address2** (String) - Second line of the address.
    - **city** (String) - City.
    - **state** (String) - State or province.
    - **zip** (String) - Postal code.
    - **country** (String) - Country.
  - **customer_since** (Integer) - Timestamp indicating when the account was created.
  - **account_lock** (String) - Status of account lock ('on' or 'off').
  - **custom_time_zone** (String) - User's custom time zone setting.
  - **default_registrant_contact_id** (Integer) - ID of the default registrant contact.
  - **default_admin_contact_id** (Integer) - ID of the default administrative contact.
  - **default_technical_contact_id** (Integer) - ID of the default technical contact.
  - **default_billing_contact_id** (Integer) - ID of the default billing contact.
  - **default_name_server_settings** (Object) - Default nameserver configuration.
    - **type** (String) - Type of nameserver settings (e.g., 'Dynadot Parking').
    - **with_ads** (String) - Indicates if ads are enabled for parking.
    - **forward_to** (String) - URL for domain forwarding.
    - **forward_type** (String) - Type of forwarding (e.g., 'forward').
    - **website_title** (String) - Title for the parked page.
    - **ttl** (String) - Time To Live for DNS records.
    - **email_forwarding** (Object) - Email forwarding settings.
      - **type** (String) - Type of email forwarding.
  - **total_spending** (String) - Total amount spent by the account.
  - **price_level** (String) - The account's current price level.
  - **account_balance** (String) - The current available account balance.
  - **balance_list** (Array) - List of balances in different currencies.
    - **currency** (String) - The currency code (e.g., 'USD').
    - **amount** (String) - The balance amount in the specified currency.

#### Response Example (200)
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "account_info": {
      "username": "username",
      "forum_name": "forumName",
      "avatar_url": "avatarUrl",
      "account_contact": {
        "organization": "Test",
        "name": "Test",
        "email": "test@test.com",
        "phone_number": "1234567890",
        "phone_cc": "1",
        "fax_number": "1234567890",
        "fax_cc": "1",
        "address1": "123 Main St",
        "address2": "",
        "city": "Any-town",
        "state": "CA",
        "zip": "12345",
        "country": "US"
      },
      "customer_since": 123456789,
      "account_lock": "on",
      "custom_time_zone": "customTimeZone",
      "default_registrant_contact_id": 1,
      "default_admin_contact_id": 2,
      "default_technical_contact_id": 3,
      "default_billing_contact_id": 4,
      "default_name_server_settings": {
        "type": "Dynadot Parking",
        "with_ads": "withAds",
        "forward_to": "forwardTo",
        "forward_type": "forwardType",
        "website_title": "websiteTitle",
        "ttl": "ttl",
        "email_forwarding": {
          "type": "forward"
        }
      },
      "total_spending": "totalSpending",
      "price_level": "priceLevel",
      "account_balance": "accountBalance",
      "balance_list": [
        {
          "currency": "currency",
          "amount": "amount"
        }
      ]
    }
  }
}
```

#### Error Response (Non-200)
- **code** (String) - Error code.
- **message** (String) - Error message.
- **data** (Object) - Empty or contains error details.

#### Error Response Example
```json
{
  "code": "Integer",
  "message": "String",
  "data": {}
}
```
```

--------------------------------

### Delete Nameserver Request Example

Source: https://www.dynadot.com/domain/api-document/index

This example shows a DELETE request to the Dynadot API to remove a nameserver. It includes the necessary endpoint, content type, authorization, and the required X-Signature header. This command does not require a request body.

```http
DELETE https://api.dynadot.com/restful/v1/nameservers/{nameserver}
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}
```

--------------------------------

### GET /search

Source: https://www.dynadot.com/domain/api-document/index

Retrieves search results with optional price and currency information. Supports multi-thread and API Sandbox. Requires mandatory paging parameters.

```APIDOC
## GET /search

### Description
This endpoint allows you to perform searches. It supports multi-threading and the API Sandbox environment. To ensure efficient response handling, mandatory paging parameters are required.

### Method
GET

### Endpoint
`/search`

### Parameters
#### Query Parameters
- **show_price** (Boolean) - Optional - If you would like to display the price for available search results.
- **currency** (String) - Optional - The currency of the price result.
- **page** (Integer) - Required - Specifies the current page index, starting from 1.
- **page_size** (Integer) - Required - Defines the number of items returned per page.

### Request Example
`GET /search?show_price=true&currency=USD&page=1&page_size=10`

### Response
#### Success Response (200)
- **search_results** (Array) - A list of search results, each containing domain information and potentially price details.

#### Response Example
```json
{
  "search_results": [
    {
      "domain": "example.com",
      "price": 10.99,
      "currency": "USD"
    },
    {
      "domain": "test.net",
      "price": 12.50,
      "currency": "USD"
    }
  ]
}
```
```

--------------------------------

### Contact Creation - API Request Example

Source: https://www.dynadot.com/domain/api-document/index

This snippet shows the HTTP POST request to the Dynadot API endpoint for creating a contact. It includes the URL, headers, and the JSON request body.

```http
POST https://api.dynadot.com/restful/v1/contacts
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "contact": {
    "organization": "String",
    "name": "String",
    "email": "String",
    "phone_number": "String",
    "phone_cc": "String",
    "fax_number": "String",
    "fax_cc": "String",
    "address1": "String",
    "address2": "String",
    "city": "String",
    "state": "String",
    "zip": "String",
    "country": "String"
  }
}
```

--------------------------------

### Get Nameserver Information

Source: https://www.dynadot.com/domain/api-document/index

Retrieves information about a specific nameserver, including its name and IP list.

```APIDOC
## GET /restful/v1/nameservers/{nameserver}

### Description
Retrieves information about a specific nameserver, including its name and IP list.

### Method
GET

### Endpoint
`/restful/v1/nameservers/{nameserver}`

### Parameters
#### Path Parameters
- **nameserver** (String) - Required - The name or identifier of the nameserver.

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.
- **data** (Object)
  - **server_name** (String) - The name of the nameserver.
  - **ip_list** (List) - A list of IP addresses associated with the nameserver.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "server_name": "ns1.testname.com",
    "ip_list": [
      "1.1.1.1",
      "2.2.2.2"
    ]
  }
}
```
```

--------------------------------

### Renew Domain API Request Example

Source: https://www.dynadot.com/domain/api-document/index

An example of a POST request to renew a domain using the Dynadot API. It includes the API endpoint, content type, and authorization headers, along with the JSON request body specifying renewal details.

```JSON
{
  "duration": 0,
  "year": 0,
  "currency": "String",
  "coupon": "String",
  "no_renew_if_late_renew_fee_needed": false
}
```

--------------------------------

### Set Domain for Sale

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to set your domain(s) for sale with various options such as listing type, price, offer price, installment plans, category, and description.

```APIDOC
## PUT /restful/v1/aftermarkets/domains/{domain_name}/for_sales

### Description
Sets a domain for sale with specified details.

### Method
PUT

### Endpoint
`/restful/v1/aftermarkets/domains/{domain_name}/for_sales`

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The name of the domain to set for sale.

#### Request Body
- **for_sale_type** (String) - Required - The type of listing (buy_now, make_offer, buy_now_and_make_offer).
- **currency** (String) - Required - The currency for the sale.
- **listing_type** (String) - Required - The type of listing.
- **price** (String) - Optional - The price to set the domain for sale at.
- **minimum_offer_price** (String) - Optional - The minimum offer price.
- **installment** (String) - Optional - The installment plan.
- **maximum_installments** (Integer) - Optional - The maximum number of installments.
- **category** (String) - Optional - The category for the domain listing.
- **sub_category** (String) - Optional - The sub-category for the domain listing.
- **description** (String) - Optional - A description for the domain listing.
- **allow_seo_index** (Boolean) - Optional - Whether to allow search engine indexing.

### Request Example
```json
{
  "for_sale_type": "buy_now",
  "currency": "USD",
  "listing_type": "fixed_price",
  "price": "100.00",
  "minimum_offer_price": "50.00",
  "installment": "3x",
  "maximum_installments": 3,
  "category": "technology",
  "sub_category": "ai",
  "description": "A premium domain for AI startups.",
  "allow_seo_index": true
}
```

### Response
#### Success Response (200)
- **code** (Integer) - Success code.
- **message** (String) - Success message.

#### Response Example
```json
{
  "code": 200,
  "message": "Success"
}
```
```

--------------------------------

### Bulk Search Domains - Success Response Example

Source: https://www.dynadot.com/domain/api-document/index

Presents a successful JSON response structure for the bulk domain search API. It includes a list of domain search results, indicating availability or error messages.

```json
{
  * code: "200",
  * message: "Success",
  * data: {
    * domain_result_list: [
      1. {
         * domain_name: "example.com",
         * available: "Yes"
2 items},
      2. {
         * domain_name: "example.net",
         * details_error_message: "busy"
2 items}
2 items]
1 item}

}
```

--------------------------------

### GET /restful/v1/aftermarket/auctions/closed - Get Closed Auctions

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of closed aftermarket auctions. You can filter these auctions based on various criteria.

```APIDOC
## GET /restful/v1/aftermarket/auctions/closed

### Description
Retrieves a list of closed aftermarket auctions. This endpoint allows you to view auctions that have concluded.

### Method
GET

### Endpoint
`https://api.dynadot.com/restful/v1/aftermarket/auctions/closed`

### Parameters
#### Query Parameters
- **None**

### Request Example
```json
{
  "example": "No request body for GET request."
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.
- **data** (Object) - Contains the list of closed auctions.
  - **ClosedAuctionList** (Array) - A list of closed auction objects.
    - **auction_id** (Integer) - The unique identifier for the auction.
    - **domain** (String) - The domain name associated with the auction.
    - **auction_status** (String) - The status of the auction (e.g., CLOSED_BY_USER, COMPLETE).
    - **bid_price** (String) - The final bid price for the auction.
    - **bids** (String) - The total number of bids placed on the auction.
    - **end_time** (String) - The date and time when the auction ended.
    - **end_timestamp** (Long) - The Unix timestamp when the auction ended.
    - **auction_won_status** (String) - Indicates if the current user won the auction.
    - **your_high_bid** (String) - The highest bid placed by the current user.
    - **your_proxy_bid** (String) - The highest proxy bid placed by the current user.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "ClosedAuctionList": [
      {
        "auction_id": 2,
        "domain": "testdomain1.test",
        "auction_status": "CLOSED_BY_USER",
        "bid_price": "89.99",
        "bids": "1",
        "end_time": "2022/04/04 02:20:34 PST",
        "end_timestamp": "1649064034033",
        "auction_won_status": "won",
        "your_high_bid": "89.99",
        "your_proxy_bid": "1000.0"
      },
      {
        "auction_id": 3,
        "domain": "testdomain2.test",
        "auction_status": "CLOSED_BY_USER",
        "bid_price": "28.99",
        "bids": "1",
        "end_time": "2022/04/05 02:20:34 PST",
        "end_timestamp": "1649150434049",
        "auction_won_status": "won",
        "your_high_bid": "28.99",
        "your_proxy_bid": "1000.0"
      }
    ]
  }
}
```

#### Error Response
- **code** (Integer) - The error code.
- **message** (String) - A description of the error.
- **data** (Object) - Empty or contains error details.
```
```

--------------------------------

### GET /aftermarket/listings

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of domain listings. This endpoint allows you to fetch multiple domain listings based on specified criteria, such as currency and time ranges.

```APIDOC
## GET /aftermarket/listings

### Description
Retrieves a list of domain listings. This endpoint allows you to fetch multiple domain listings based on specified criteria, such as currency and time ranges.

### Method
GET

### Endpoint
`/restful/v1/aftermarket/listings`

### Parameters
#### Query Parameters
- **currency** (String) - Optional - The currency for the listings. Supported values: `usd`, `gbp`, `eur`, `inr`, `pln`, `zar`, `ltl`, `cny`, `cad`, `jpy`, `nzd`, `rub`, `aud`, `mxn`, `brl`, `idr`, `ars`, `cop`, `dkk`, `rsd`, `hkd`, `chf`, `aed`, `myr`, `ngn`, `kes`, `czk`, `btc`, `nok`.
- **start_time** (Long) - Optional - The start time for filtering listings by creation date, in milliseconds since epoch.
- **end_time** (Long) - Optional - The end time for filtering listings by creation date, in milliseconds since epoch.

### Request Example
```
GET https://api.dynadot.com/restful/v1/aftermarket/listings?currency=usd&start_time=1678886400000&end_time=1678972800000
Accept: application/json
Authorization: Bearer API_KEY
```

### Response
#### Success Response (200)
- **code** (String) - The response code.
- **message** (String) - The response message.
- **data** (Object) - Contains the list of listing items.
  - **listing_item_list** (Array) - A list of domain listing objects.
    - **listing_id** (Integer) - The unique identifier of the listing.
    - **domain** (String) - The domain name.
    - **price** (String) - The price of the domain.
    - **in_bound_links** (Integer) - The number of inbound links to the domain.
    - **age** (Integer) - The age of the domain.
    - **is_pending_sale_locked** (Boolean) - Whether the domain is locked for pending sale.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "listing_item_list": [
      {
        "listing_id": 1,
        "domain": "example.com",
        "price": "$12.88",
        "in_bound_links": 2,
        "age": 8,
        "is_pending_sale_locked": "No"
      }
    ]
  }
}
```
```

--------------------------------

### Contact Creation - JSON Request Example

Source: https://www.dynadot.com/domain/api-document/index

This snippet demonstrates the JSON request body structure for creating a new contact via the Dynadot API. It includes all required and optional contact details.

```json
{
  "contact": {
    "organization": "String",
    "name": "String",
    "email": "String",
    "phone_number": "String",
    "phone_cc": "String",
    "fax_number": "String",
    "fax_cc": "String",
    "address1": "String",
    "address2": "String",
    "city": "String",
    "state": "String",
    "zip": "String",
    "country": "String"
  }
}
```

--------------------------------

### Get Nameserver (NAMESERVER_GET)

Source: https://www.dynadot.com/domain/api-document/index

Retrieves details for a specific nameserver, including its server name and IP list. This command requires the nameserver identifier in the URL and supports multi-threading, API sandbox, and requires an X-Signature header.

```JSON
GET https://api.dynadot.com/restful/v1/nameservers/{nameserver}
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}
```

--------------------------------

### Bulk Search Domains - Request Parameter Example

Source: https://www.dynadot.com/domain/api-document/index

Shows how to format the `domain_name_list` parameter for the bulk search API. This parameter accepts a comma-separated string of domain names, with a maximum limit depending on the pricing tier.

```plaintext
domain_name_list=example1.com,example2.net,example3.org
```

--------------------------------

### Get Site Builder Information

Source: https://www.dynadot.com/domain/api-document/index

Retrieves details about a specific site builder associated with a domain name.

```APIDOC
## GET /restful/v1/sitebuilders/{domain_name}

### Description
Fetches detailed information for a specific site builder, including its template, plan, publishing status, and URLs.

### Method
GET

### Endpoint
/restful/v1/sitebuilders/{domain_name}

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The domain name for which to retrieve site builder information.

#### Request Headers
- **Authorization** (String) - Required - Bearer token for authentication (e.g., "Bearer API_KEY").
- **X-Signature** (String) - Required - Signature for request verification.
- **Accept** (String) - Optional - Specifies the desired response format (e.g., "application/json").

### Response
#### Success Response (200)
- **code** (String) - "200"
- **message** (String) - "Success"
- **data** (Object)
  - **sitebuilder** (Object)
    - **domain_name** (String) - The domain name associated with the site builder.
    - **template** (String) - The template used for the site builder.
    - **plan** (String) - The plan level of the site builder (e.g., "Free", "Basic").
    - **is_published** (Boolean) - Indicates if the site builder has been published.
    - **last_update** (Long) - Timestamp of the last update.
    - **expiration** (Long) - Timestamp of the site builder's expiration.
    - **site_url** (String) - The URL of the published site builder.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "sitebuilder": {
      "domain_name": "example.com",
      "template": "Meridian",
      "plan": "Free",
      "is_published": true,
      "last_update": 1678886400,
      "expiration": 1709990400,
      "site_url": "https://sitebuilder1.example.com"
    }
  }
}
```
```

--------------------------------

### Successful API Response Example (JSON)

Source: https://www.dynadot.com/domain/api-document/index

This JSON structure represents a successful API request, including a status code, a success message, and an empty data object.

```JSON
{
  "Code": "200",
  "Message": "Success",
  "Data": {}
}
```

--------------------------------

### Configure Folder Contacts

Source: https://www.dynadot.com/domain/api-document/index

This example shows how to set contact information for a folder using the Dynadot API. The request body requires registrant, administrative, technical, and billing contact IDs, along with optional flags for future domain application and synchronization. The response confirms the operation's success.

```JSON
{
  "reg_contact_id": 0,
  "admin_contact_id": 0,
  "tech_contact_id": 0,
  "bill_contact_id": 0,
  "apply_for_future_domain": false,
  "sync_setting_to_existing_domains_in_this_folder": false
}
```

--------------------------------

### Contact Creation - Success Response Example

Source: https://www.dynadot.com/domain/api-document/index

This snippet illustrates a successful response from the Dynadot API after creating a contact. It returns a status code, message, and the newly created contact's ID.

```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "contact_id": 12345
  }
}
```

--------------------------------

### Coupon Data Structure Example

Source: https://www.dynadot.com/domain/api-document/index

This snippet illustrates the structure of a coupon object, detailing discount information, usage restrictions, and validity dates. It is used to represent promotional offers within the Dynadot system.

```json
{
  "code": "code",
  "description": "description",
  "coupon_type": "BUNDLE_COUPONS",
  "discount_type": "SALE",
  "discount_info": {
    "USD": "$0.00",
    "GBP": "0.00",
    "EUR": "0.00",
    "INR": "0.00",
    "CAD": "C$0.00",
    "CNY": "0.00",
    "AUD": "A$0.00",
    "MXN": "Mex$0.00",
    "BRL": "R$0.00",
    "IDR": "Rp0.00"
  },
  "restriction": {
    "price_levels": [
      "RETAIL",
      "BULK",
      "BULK1"
    ],
    "uses_per_account": 1,
    "uses_system_wide": 1,
    "uses_per_ip": 1,
    "items_per_account": 1,
    "items_system_wide": 1,
    "items_per_order": 1,
    "items_per_day": 1,
    "domain_duration_min": 1,
    "domain_duration_max": 1,
    "idn_restriction": "IDN",
    "tlds": [
      "com",
      "net",
      "org"
    ],
    "currencies": [
      "USD",
      "GBP",
      "EUR",
      "INR",
      "CAD",
      "CNY",
      "AUD",
      "MXN",
      "BRL",
      "IDR"
    ]
  },
  "start_date": 0,
  "end_date": 0
}
```

--------------------------------

### GET /domains/pending_accept_pushes

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of pending domain push accept requests. Supports multi-thread and API sandbox. Requires an X-Signature header.

```APIDOC
## GET /domains/pending_accept_pushes

### Description
Retrieves a list of pending domain push accept requests.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/domains/pending_accept_pushes

### Headers
- **Accept**: application/json
- **Authorization**: Bearer API_KEY
- **X-Signature**: {signature}

### Request Example
```json
{
  "domain_name_list": [
    "example.com"
  ]
}
```

### Response
#### Success Response (200)
- **code** (string) - The response code.
- **message** (string) - The response message.
- **data** (object) - The response data.
  - **domain_name_list** (list) - A list of domain names.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "domain_name_list": [
      "example.com"
    ]
  }
}
```
```

--------------------------------

### Contact Data Structure Example - Success

Source: https://www.dynadot.com/domain/api-document/index

This snippet shows the structure of contact data returned upon a successful operation, including contact ID, organization, name, email, and address details.

```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "contact_list": [
      {
         "contact_id": 0,
         "organization": "test org",
         "name": "test name",
         "email": "test@email.com",
         "phone_number": "0123456789",
         "phone_cc": "1",
         "fax_number": "0123456789",
         "fax_cc": "1",
         "address1": "test address1",
         "address2": "test address1",
         "city": "test city",
         "state": "test state",
         "zip": "test zip",
         "country": "test country"
      }
    ]
  }
}
```

--------------------------------

### Bulk Search Domains - Error Response Example

Source: https://www.dynadot.com/domain/api-document/index

Provides a general structure for error responses from the bulk domain search API. This template can be used for handling various error conditions.

```json
{
  * code: "Integer",
  * message: "String",
  * data: {
    * domain_result_list: [
      1. {
         * domain_name: "String",
         * available: "String"
}
]
}

}
```

--------------------------------

### GET /aftermarket/get_expired_closeout_domains

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of expired and closeout domains with their details.

```APIDOC
## GET /aftermarket/get_expired_closeout_domains

### Description
Retrieves a list of expired and closeout domains with their details. This endpoint supports multi-thread and API sandbox calls.

### Method
GET

### Endpoint
`https://api.dynadot.com/restful/v1/aftermarket/get_expired_closeout_domains`

### Parameters
#### Query Parameters
- **currency** (String) - Optional - The currency of return result. Supported values: `usd`, `eur`, `cny`. Defaults to USD.
- **page_num** (Integer) - Optional - The page number to query. Defaults to 1.
- **page_size** (Integer) - Optional - The number of items per page. Defaults to 10.

### Response
#### Success Response (200)
- **closeout_item_list** (Array) - The list of closeout items.
  - **domain_name** (String) - Domain name.
  - **domain_name_utf** (String) - Domain name in UTF-8.
  - **current_price** (String) - Current price.
  - **is_idn** (Boolean) - Indicates if the domain is an IDN.
  - **end_time_stamp** (Long) - End time stamp.
  - **renewal_price** (String) - Renewal price.
  - **expired_revenue** (String) - Expired revenue.
  - **estibot_appraisal** (String) - Estibot appraisal value.
  - **inbound_links** (Integer) - Number of inbound links.
  - **monthly_visitors** (Integer) - Number of monthly visitors.
  - **currency** (String) - Currency of the price.
  - **is_active** (Boolean) - Indicates if the domain is active.
  - **auction_id** (Integer) - Auction ID.
  - **closeout_id** (Integer) - Closeout ID.
  - **age** (Integer) - Age of the domain in days.
  - **current_price_usd** (Long) - Current price in USD.
  - **price_usd** (Long) - Price in USD.
  - **seller_price** (Long) - Seller's price.
  - **registrar_account_id** (String) - Registrar account ID.
  - **order_status** (Integer) - Order status.

### Request Example
```json
{
  "currency": "EUR",
  "page_num": 2,
  "page_size": 20
}
```

### Response Example
```json
{
  "closeout_item_list": [
    {
      "domain_name": "example.com",
      "domain_name_utf": "example.com",
      "current_price": "100.00",
      "is_idn": false,
      "end_time_stamp": 1678886400,
      "renewal_price": "15.00",
      "expired_revenue": "50.00",
      "estibot_appraisal": "120.00",
      "inbound_links": 500,
      "monthly_visitors": 1000,
      "currency": "USD",
      "is_active": true,
      "auction_id": 12345,
      "closeout_id": 67890,
      "age": 365,
      "current_price_usd": 100,
      "price_usd": 110,
      "seller_price": 95,
      "registrar_account_id": "REG123",
      "order_status": 1
    }
  ]
}
```
```

--------------------------------

### Contact Data Structure Example - Type Definitions

Source: https://www.dynadot.com/domain/api-document/index

This snippet outlines the expected data types for contact information when interacting with the Dynadot API, useful for understanding input and output formats.

```json
{
  "code": "Integer",
  "message": "String",
  "data": {
    "contact_list": [
      {
         "contact_id": "Integer",
         "organization": "String",
         "name": "String",
         "email": "String",
         "phone_number": "String",
         "phone_cc": "String",
         "fax_number": "String",
         "fax_cc": "String",
         "address1": "String",
         "address2": "String",
         "city": "String",
         "state": "String",
         "zip": "String",
         "country": "String"
      }
    ]
  }
}
```

--------------------------------

### GET_INFO Command

Source: https://www.dynadot.com/domain/api-document/index

Retrieves account information, including details about account settings, DNS, and contacts. Requires an X-Signature header.

```APIDOC
## GET /restful/v1/account/info

### Description
Retrieves detailed information about the user's account, including account settings, DNS configurations, and contact details. This command supports multi-thread and requires an X-Signature in the header.

### Method
GET

### Endpoint
`/restful/v1/account/info`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **code** (string) - "200"
- **message** (string) - "Success"
- **data** (object) - Contains account information.
  - **account_info** (object) - Details about the account.
    - **username** (string) - The username of the account.
    - **forum_name** (string) - The forum name of the account.
    - **avatar_url** (string) - The avatar URL of the account.
    - **account_contact** (object) - The contact information of the account.
      - **organization** (string) - The organization.
      - **name** (string) - The name of contact owner.
      - **email** (string) - The email address.
      - **phone_number** (string) - The phone number.
      - **phone_cc** (string) - The phone country code.
      - **fax_number** (string) - The fax number.
      - **fax_cc** (string) - The fax country code.
      - **address1** (string) - The address1.
      - **address2** (string) - The address2.
      - **city** (string) - The city.
      - **state** (string) - The state.
      - **zip** (string) - The zip.
      - **country** (string) - The country.
    - **customer_since** (long) - The customer since date of the account.
    - **account_lock** (string) - The account lock status of the account.
    - **custom_time_zone** (string) - The custom time zone of the account.
    - **default_registrant_contact_id** (integer) - The default registrant contact ID.
    - **default_admin_contact_id** (integer) - The default admin contact ID.
    - **default_technical_contact_id** (integer) - The default technical contact ID.
    - **default_billing_contact_id** (integer) - The default billing contact ID.
    - **glue_info** (object) - The default DNS setting of the account.
      - **glue_type** (string) - The type of the nameserver.
      - **nameservers** (array of objects) - The nameservers.
        - **server_name** (string, optional) - The name of the nameserver.
        - **ip_list** (array of strings, optional) - The IP list of the nameserver.
      - **with_ads** (string) - The status of the ads.
      - **forward_to** (string) - The forward to URL.
      - **forward_type** (string) - The forward type.
      - **website_title** (string) - The title of the website.
      - **email_forward_type** (string) - The email forwarding settings.
      - **mail_exchanges** (array of objects) - The mail exchanges.
        - **host** (string, optional) - Mail host.
        - **distance** (string, optional) - Distance (priority).
      - **email_alias_list** (array of objects) - The email alias list.
        - **username** (string, optional) - The user name of the email alias.
        - **to_email** (string, optional) - The target email address.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "account_info": {
      "username": "testuser",
      "forum_name": "Test User",
      "avatar_url": "http://example.com/avatar.png",
      "account_contact": {
        "organization": "Example Corp",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone_number": "1234567890",
        "phone_cc": "1",
        "fax_number": "0987654321",
        "fax_cc": "1",
        "address1": "123 Main St",
        "address2": "Apt 4B",
        "city": "Anytown",
        "state": "CA",
        "zip": "90210",
        "country": "USA"
      },
      "customer_since": 1678886400,
      "account_lock": "false",
      "custom_time_zone": "UTC",
      "default_registrant_contact_id": 1,
      "default_admin_contact_id": 2,
      "default_technical_contact_id": 3,
      "default_billing_contact_id": 4,
      "glue_info": {
        "glue_type": "type_dns",
        "nameservers": [
          {
            "server_name": "ns1.example.com",
            "ip_list": ["192.168.1.1"]
          }
        ],
        "with_ads": "true",
        "forward_to": "http://example.com",
        "forward_type": "forward",
        "website_title": "My Website",
        "email_forward_type": "mtype_forward",
        "mail_exchanges": [],
        "email_alias_list": [
          {
            "username": "info",
            "to_email": "info@example.com"
          }
        ]
      }
    }
  }
}
```
```

--------------------------------

### GET /domains/{domain_name}/dnssec

Source: https://www.dynadot.com/domain/api-document/index

Retrieves the DNSSEC information for a specified domain.

```APIDOC
## GET /domains/{domain_name}/dnssec

### Description
Retrieves the DNSSEC information for a specified domain.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/dnssec

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to retrieve DNSSEC information for.

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **code** (string) - The status code of the response.
- **message** (string) - A message indicating the success of the operation.
- **data** (object) - Contains the DNSSEC information.
  - **dnssec_info_list** (array) - A list of DNSSEC information objects.
    - **key_tag** (integer) - The key tag of the DNSSEC record.
    - **algorithm** (string) - The algorithm of the DNSSEC record.
    - **digest_type** (string) - The digest type of the DNSSEC record.
    - **digest** (string) - The digest of the DNSSEC record.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "dnssec_info_list": [
      {
        "key_tag": 2,
        "algorithm": "RSA/MD5 (1)",
        "digest_type": "SHA-1 (1)",
        "digest": "testDigest"
      }
    ]
  }
}
```
```

--------------------------------

### GET /contacts

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of contacts. This endpoint supports filtering by WHOIS verification status and pagination.

```APIDOC
## GET /contacts

### Description
Retrieves a list of contacts. This endpoint supports filtering by WHOIS verification status and pagination.

### Method
GET

### Endpoint
/contacts

#### Query Parameters
- **whois_verification_status** (String) - Optional - Filter contacts by WHOIS verification status. Supported values: none, verified, verifying, unverified.
- **count_per_page** (Integer) - Optional - Number of contacts to return per page.
- **page_index** (Integer) - Optional - Page index of the contacts to return.

#### Headers
- **Accept**: application/json
- **Authorization**: Bearer API_KEY

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.
- **data** (Object) - Contains the list of contacts.
  - **contact_list** (List) - The list of contacts.
    - **contact_id** (Integer) - The contact ID.
    - **organization** (String) - The organization.
    - **name** (String) - The name of the contact owner.
    - **email** (String) - The email address.
    - **phone_number** (String) - The phone number.
    - **phone_cc** (String) - The phone country code.
    - **fax_number** (String) - The fax number.
    - **fax_cc** (String) - The fax country code.
    - **address1** (String) - The first line of the address.
    - **address2** (String) - The second line of the address.
    - **city** (String) - The city.
    - **state** (String) - The state.
    - **zip** (String) - The zip code.
    - **country** (String) - The country.

#### Response Example (200)
{
  "code": "200",
  "message": "Success",
  "data": {
    "contact_list": [
      {
        "contact_id": 123,
        "organization": "Example Corp",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone_number": "5551234567",
        "phone_cc": "1",
        "fax_number": "5559876543",
        "fax_cc": "1",
        "address1": "123 Main St",
        "address2": "Suite 100",
        "city": "Anytown",
        "state": "CA",
        "zip": "90210",
        "country": "US"
      }
    ]
  }
}
```

--------------------------------

### GET /aftermarket/whois_stats

Source: https://www.dynadot.com/domain/api-document/index

Retrieves WHOIS statistics for a given domain name over a specified date range.

```APIDOC
## GET /aftermarket/whois_stats

### Description
Retrieves WHOIS statistics for a given domain name over a specified date range. This endpoint supports multi-thread and API sandbox calls.

### Method
GET

### Endpoint
`https://api.dynadot.com/restful/v1/aftermarket/whois_stats`

### Parameters
#### Query Parameters
- **domain_name** (String) - Required - The domain name to get whois stats for.
- **date_type** (String) - Required - The date type to get whois stats for. Supported values: `last_7_days`, `last_30_days`, `current_year`, `last_year`

### Request Example
```json
{
  "domain_name": "example.com",
  "date_type": "last_30_days"
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - A message indicating the success or failure of the request.
- **data** (Object) - Contains the WHOIS statistics.
  - **stats** (Array) - A list of WHOIS statistics objects.
    - **date** (String) - The date of the WHOIS stats.
    - **count** (Long) - The count of the WHOIS stats.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "stats": [
      {
        "date": "2021-01-01",
        "count": 100
      },
      {
        "date": "2021-01-02",
        "count": 200
      },
      {
        "date": "2021-01-03",
        "count": 300
      }
    ]
  }
}
```
```

--------------------------------

### GET /api/dynadot_domain_api-document/aftermarket/backorders/requests

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of backorder requests. This endpoint allows you to check the status and cutoff times of your domain backorder requests.

```APIDOC
## GET /api/dynadot_domain_api-document/aftermarket/backorders/requests

### Description
Retrieves a list of backorder requests, including domain name, cutoff time, and status.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/aftermarket/backorders/requests

### Parameters
#### Headers
- **Accept**: application/json
- **Authorization**: Bearer API_KEY

### Response
#### Success Response (200)
- **code** (Integer) - "200"
- **message** (String) - "Success"
- **data** (Object)
  - **backorder_request_list** (Array)
    - **domain_name** (String) - The name of the domain.
    - **cut_off_time** (Long) - The cut-off time of the backorder request, in milliseconds since epoch.
    - **backorder_request_status** (String) - The status of the backorder request.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "backorder_request_list": [
      {
        "domain_name": "testdrop.com",
        "cut_off_time": 1403914140000,
        "backorder_request_status": "Active"
      },
      {
        "domain_name": "testdrop3.com",
        "cut_off_time": 1403914140000,
        "backorder_request_status": "Active"
      }
    ]
  }
}
```
```

--------------------------------

### GET /domains

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of domains associated with the user's account. Supports filtering and sorting of the domain list.

```APIDOC
## GET /domains

### Description
Retrieves a list of domains associated with the user's account. Supports filtering and sorting of the domain list.

### Method
GET

### Endpoint
/domains

### Parameters
#### Query Parameters
- **sort** (String) - Optional - The sort type. Supported values: count_asc, count_desc, name_asc, name_desc
- **count_per_page** (Integer) - Optional - The number of domains to return per page.
- **page_index** (Integer) - Optional - The index of the page to retrieve.
- **status** (String) - Optional - The status of the domains to filter by. Supported values: all, active, deleted_grace, transferaway, expired, moved_pull, deleted_by_cust, deleted_by_admin, moved_push, tag_released, moved_expired_auction, moved_sold, deleted_by_registry, moved_user_auction, transferaway_expired_auction, transferaway_user_auction, transferaway_listing, moved_last_chance_auction, expired_pull, installment_push_back_to_seller, moved_portfolio_auction, moved_registry_auction, installment_reverse_push_back_to_seller, expired_auction.

### Response
#### Success Response (200)
- **page_index** (Integer) - The index of the current page.
- **count_per_page** (Integer) - The number of domains returned per page.
- **sort** (String) - The sort order applied to the results.
- **price_level** (String) - The pricing tier for the domains.
- **currency** (String) - The currency used for pricing.
- **show_multi_year_price** (String) - Indicates if multi-year pricing is shown.
- **tldPriceList** (List) - A list of Top-Level Domain (TLD) prices.
  - **tld** (String) - The TLD identifier (e.g., "com").
  - **usage** (String) - The usage type for the TLD.
  - **priceUnit** (String) - The unit for the pricing (e.g., "Price/1 year").
  - **allYearsRegisterPrice** (List) - Price for registering the domain for multiple years.
  - **allYearsRenewPrice** (List) - Price for renewing the domain for multiple years.
  - **transferPrice** (String) - The price for transferring the domain.
  - **restorePrice** (String) - The price for restoring the domain.
  - **graceFeePrice** (String) - The fee for the grace period.
  - **supportPrivacy** (String) - Indicates if domain privacy is supported.
  - **gracePeriodUnit** (String) - The unit for the grace period (e.g., "Grace Period/days").
  - **renewGracePeriod** (String) - The duration of the renewal grace period.
  - **restorePeriod** (String) - The duration of the restore period.
  - **deleteGracePeriod** (String) - The duration of the delete grace period.
  - **isIdn** (String) - Indicates if the TLD supports Internationalized Domain Names (IDN).
  - **restriction** (String) - Any restrictions associated with the TLD.
  - **onSale** (String) - Indicates if the TLD is currently on sale.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "page_index": 1,
    "count_per_page": 10,
    "sort": "NAME_ASC",
    "price_level": "Bulk",
    "currency": "USD",
    "show_multi_year_price": "Yes",
    "tldPriceList": [
      {
        "tld": "com",
        "usage": "COM",
        "priceUnit": "(Price/1 year)",
        "allYearsRegisterPrice": [],
        "allYearsRenewPrice": [],
        "transferPrice": "--",
        "restorePrice": "--",
        "graceFeePrice": "--",
        "supportPrivacy": "Yes",
        "gracePeriodUnit": "(Grace Period/days)",
        "renewGracePeriod": "0-20 (variable)",
        "restorePeriod": "0-20 (variable)",
        "deleteGracePeriod": "0-20 (variable)",
        "isIdn": "Yes",
        "restriction": "--",
        "onSale": "Yes"
      }
    ]
  }
}
```
```

--------------------------------

### GET /aftermarket/backorder_request_list

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of backorder requests. This endpoint allows you to view your domain backorder requests within a specified time frame.

```APIDOC
## GET /aftermarket/backorder_request_list

### Description
Retrieves a list of backorder requests. This endpoint allows you to view your domain backorder requests within a specified time frame.

### Method
GET

### Endpoint
`/restful/v1/aftermarket/backorder_request_list`

### Parameters
#### Query Parameters
- **start_time** (Long) - Required - The start time of the backorder request, in milliseconds since epoch.
- **end_time** (Long) - Required - The end time of the backorder request, in milliseconds since epoch.

### Request Example
```
GET https://api.dynadot.com/restful/v1/aftermarket/backorder_request_list?start_time=1678886400000&end_time=1678972800000
Accept: application/json
Authorization: Bearer API_KEY
```

### Response
#### Success Response (200)
- **code** (String) - The response code.
- **message** (String) - The response message.
- **data** (Object) - Contains the list of backorder requests.
  - **backorder_request_list** (List) - The list of backorder requests.
    - **domain_name** (String) - The domain name of the backorder request.
    - **cut_off_time** (Long) - The cut-off time for the backorder request.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "backorder_request_list": [
      {
        "domain_name": "example.com",
        "cut_off_time": 1678900000000
      }
    ]
  }
}
```
```

--------------------------------

### GET /restful/v1/aftermarket/auctions/{domain_name}

Source: https://www.dynadot.com/domain/api-document/index

Retrieves detailed information about a specific domain auction, including current bid, time left, and bidder information.

```APIDOC
## GET /restful/v1/aftermarket/auctions/{domain_name}

### Description
Retrieves detailed information about a specific domain auction, including current bid, time left, and bidder information.

### Method
GET

### Endpoint
`/restful/v1/aftermarket/auctions/{domain_name}`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The domain name for which to retrieve auction details.

#### Query Parameters
- **currency** (string) - Optional - The currency to use for the bid prices. Supported values: `usd`, `gbp`, `eur`, `inr`, `pln`, `zar`, `ltl`, `cny`, `cad`, `jpy`, `nzd`, `rub`, `aud`, `mxn`, `brl`, `idr`, `ars`, `cop`, `dkk`, `rsd`, `hkd`, `chf`, `aed`, `myr`, `ngn`, `kes`, `czk`, `btc`, `nok`.

### Request Example
```json
{
  "example": ""
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code of the response. Example: `200`.
- **message** (string) - A message indicating the success of the request. Example: `Success`.
- **data** (object) - Contains the auction item details.
  - **auction_item_details** (object) - Detailed information about the auction item.
    - **auction_id** (integer) - The unique identifier for the auction. Example: `12345`.
    - **domain_name** (string) - The domain name. Example: `example.com`.
    - **utf_name** (string) - The domain name in UTF-8 format. Example: `example.com`.
    - **is_idn** (boolean) - Indicates if the domain is an Internationalized Domain Name (IDN). Example: `false`.
    - **auction_type** (string) - The type of auction. Supported values: `expired`, `user`, `portfolio`, `backorder`, `registrar`, `registry`, `registryexpired`, `premiumuser`. Example: `Registrar`.
    - **current_bid_price** (string) - The current highest bid price for the domain. Example: `150.00`.
    - **accepted_bid_price** (string) - The accepted bid price for the domain. Example: `150.00`.
    - **currency** (string) - The currency of the auction prices. Example: `USD`.
    - **is_high_bidder** (boolean) - Indicates if the current user is the highest bidder. Example: `true`.
    - **bids** (integer) - The total number of bids placed on the domain. Example: `2`.
    - **bidders** (integer) - The number of unique bidders. Example: `2`.
    - **auction_status_id** (integer) - The ID representing the auction's status. Example: `1`.
    - **time_left** (string) - The remaining time for the auction. Example: `1 hour`.
    - **start_time** (string) - The date and time when the auction started (ISO 8601 format). Example: `2023-10-01T12:00:00Z`.
    - **end_time** (string) - The date and time when the auction ends (ISO 8601 format). Example: `2023-10-02T12:00:00Z`.
    - **revenue** (string) - The revenue generated from the auction. Example: `10.00`.
    - **visitors** (integer) - The number of visitors to the domain's auction page. Example: `100`.
    - **links** (string) - A URL related to the auction. Example: `https://example.com/auction/12345`.
    - **age** (integer) - The age of the domain in years. Example: `5`.
    - **estibot_appraisal** (string) - The appraisal value from Estibot. Example: `High`.
    - **auction_ended** (boolean) - Indicates if the auction has concluded. Example: `false`.
    - **customer_bided** (boolean) - Indicates if the current user has placed a bid. Example: `true`.
    - **customer_bid** (string) - The bid amount placed by the current user. Example: `150.00`.
    - **customer_proxy_bid** (string) - The proxy bid amount set by the current user. Example: `160.00`.
    - **is_premium** (boolean) - Indicates if the domain is classified as premium. Example: `true`.
    - **renewal_price** (string) - The renewal price of the domain. Example: `20.00`.
    - **revenue_currency** (string) - The currency of the revenue. Example: `USD`.
    - **start_price** (string) - The initial starting price of the auction. Example: `100.00`.
    - **bid_history** (array) - A list of past bids placed on the domain.
      - **bidder_name** (string) - The name or identifier of the bidder. Example: `Bidder1`.
      - **bid_price** (string) - The price of the bid. Example: `100.00`.
      - **currency** (string) - The currency of the bid. Example: `USD`.
      - **timestamp** (long) - The time the bid was placed (milliseconds since epoch). Example: `1761926603306`.
      - **bid_status** (string) - The status of the bid. Example: `Active`.
      - **is_proxy_auto_bid** (boolean) - Indicates if the bid was an automatic proxy bid. Example: `false`.
    - **auction_status_name** (string) - The name of the auction's status. Example: `Active`.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "auction_item_details": {
      "auction_id": 12345,
      "domain_name": "example.com",
      "utf_name": "example.com",
      "is_idn": false,
      "auction_type": "Registrar",
      "current_bid_price": "150.00",
      "accepted_bid_price": "150.00",
      "currency": "USD",
      "is_high_bidder": true,
      "bids": 2,
      "bidders": 2,
      "auction_status_id": 1,
      "time_left": "1 hour",
      "start_time": "2023-10-01T12:00:00Z",
      "end_time": "2023-10-02T12:00:00Z",
      "revenue": "10.00",
      "visitors": 100,
      "links": "https://example.com/auction/12345",
      "age": 5,
      "estibot_appraisal": "High",
      "auction_ended": false,
      "customer_bided": true,
      "customer_bid": "150.00",
      "customer_proxy_bid": "160.00",
      "is_premium": true,
      "renewal_price": "20.00",
      "revenue_currency": "USD",
      "start_price": "100.00",
      "bid_history": [
        {
          "bidder_name": "Bidder1",
          "bid_price": "100.00",
          "currency": "USD",
          "timestamp": 1761926603306,
          "bid_status": "Active",
          "is_proxy_auto_bid": false
        },
        {
          "bidder_name": "Bidder2",
          "bid_price": "150.00",
          "currency": "USD",
          "timestamp": 1761926602306,
          "bid_status": "Active",
          "is_proxy_auto_bid": false
        }
      ],
      "auction_status_name": "Active"
    }
  }
}
```
```

--------------------------------

### GET /contacts/{contact_id}/get_cn_audit_status

Source: https://www.dynadot.com/domain/api-document/index

Retrieves the Chinese audit status for a specific contact.

```APIDOC
## GET /contacts/{contact_id}/get_cn_audit_status

### Description
Retrieves the Chinese audit status for a specific contact ID.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/contacts/{contact_id}/get_cn_audit_status

### Parameters
#### Path Parameters
- **contact_id** (Integer) - Required - The ID of the contact to retrieve the audit status for.

### Request Example
```json
{
  "accept": "application/json",
  "authorization": "Bearer API_KEY"
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code of the response. "200" indicates success.
- **message** (String) - A message describing the outcome of the request. "Success" for a successful operation.
- **data** (Object) - Contains the audit status information.
  - **audit_status** (String) - The audit status, e.g., "pass".

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "audit_status": "pass"
  }
}
```
```

--------------------------------

### GET /aftermarket/listings/{domain_name}

Source: https://www.dynadot.com/domain/api-document/index

Retrieves details for a specific domain listing. This endpoint is useful for fetching information about a particular domain that is available for sale in the aftermarket.

```APIDOC
## GET /aftermarket/listings/{domain_name}

### Description
Retrieves details for a specific domain listing. This endpoint is useful for fetching information about a particular domain that is available for sale in the aftermarket.

### Method
GET

### Endpoint
`/restful/v1/aftermarket/listings/{domain_name}`

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The name of the domain to retrieve.

#### Query Parameters
- **currency** (String) - Optional - The currency to use for the price display. Supported values: `usd`, `gbp`, `eur`, `inr`, `pln`, `zar`, `ltl`, `cny`, `cad`, `jpy`, `nzd`, `rub`, `aud`, `mxn`, `brl`, `idr`, `ars`, `cop`, `dkk`, `rsd`, `hkd`, `chf`, `aed`, `myr`, `ngn`, `kes`, `czk`, `btc`, `nok`.

### Request Example
```
GET https://api.dynadot.com/restful/v1/aftermarket/listings/example.com
Accept: application/json
Authorization: Bearer API_KEY
```

### Response
#### Success Response (200)
- **code** (String) - The response code.
- **message** (String) - The response message.
- **data** (Object) - Contains the listing item details.
  - **listing_item** (Object) - The details of the domain listing.
    - **listing_id** (Integer) - The unique identifier of the listing.
    - **domain** (String) - The domain name.
    - **price** (String) - The price of the domain.
    - **in_bound_links** (Integer) - The number of inbound links to the domain.
    - **age** (Integer) - The age of the domain.
    - **is_pending_sale_locked** (Boolean) - Whether the domain is locked for pending sale.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "listing_item": {
      "listing_id": 1,
      "domain": "example.com",
      "price": "$19.99",
      "in_bound_links": 3,
      "age": 6,
      "is_pending_sale_locked": "Yes"
    }
  }
}
```
```

--------------------------------

### Dynadot Order History Response Structure

Source: https://www.dynadot.com/domain/api-document/index

Example JSON structure for a successful response from the `order_get_history` command. It includes order details such as order ID, submission date, currency, payment method, total cost, status, and a list of order items, each with its own properties.

```JSON
{
  "code": "200",
  "message": "Success",
  "data": {
    "order_list": [
      {
        "order_id": 123456,
        "submitted_time": 1761926603299,
        "currency": "USD",
        "payment_method": "Account Balance",
        "total_cost": "$8.00",
        "total_paid": "$8.00",
        "status": "Problem",
        "order_item": [
          {
            "type": "Domain Registration",
            "name": "test.com",
            "duration": 1,
            "cost": "2.99",
            "status": "Completed"
          },
          {
            "type": "Domain Renewal",
            "name": "test1.ac",
            "duration": 1,
            "cost": "3.99",
            "status": "Completed"
          },
          {
            "type": "Domain Transfer",
            "name": "test2.de",
            "duration": 1,
            "cost": "4.99",
            "status": "Completed"
          }
        ]
      },
      {
        "order_id": 123457,
        "submitted_time": 1761926603299,
        "currency": "EUR",
        "payment_method": "Paypal",
        "total_cost": "$100.00",
        "total_paid": "$100.00",
        "status": "Submitted",
        "order_item": [
          {
            "type": "Domain Registration",
            "name": "test3.gg",
            "duration": 1,
            "cost": "5.99",
            "status": "Completed"
          },
          {
            "type": "Domain Renewal",
            "name": "test4.uk",
            "duration": 1,
            "cost": "6.99",
            "status": "Completed"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Get Domain Listings (RESTful API)

Source: https://www.dynadot.com/domain/api-document/index

This API retrieves a list of domain listings from Dynadot's aftermarket. You can filter listings by currency and exclude pending sales. Pagination is supported through 'count_per_page' and 'page_index'. The response includes details for each listing, such as domain name, price, and age.

```json
GET https://api.dynadot.com/restful/v1/aftermarket/listings

Parameters:
  * currency String
  * exclude_pending_sale Boolean Optional
  * show_other_registrar Boolean Optional
  * count_per_page Integer
  * page_index Integer

Response Example:
{
  * listing_item_list: [
    {
      * listing_id: Integer,
      * domain: String,
      * price: String,
      * in_bound_links: Integer,
      * age: Integer,
      * is_pending_sale_locked: Boolean
    }
  ]
}
```

--------------------------------

### GET /get_cn_audit_status

Source: https://www.dynadot.com/domain/api-document/index

Retrieves the status of a CN audit. Allows querying for GTLD specific audits.

```APIDOC
## GET /get_cn_audit_status

### Description
Checks the status of a CN audit.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/get_cn_audit_status

### Parameters
#### Query Parameters
- **is_gtld** (Boolean) - Optional - Set to `true` if querying for a CNIC-GTLD audit result.

### Response
#### Success Response (200)
- **audit_status** (String) - The current status of the audit ('processing', 'waiting for cnnic', or 'failed').
- **fail_reason** (String) - If the audit failed, this field will contain the reason.
```

--------------------------------

### GET /domains

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of domains associated with the account. It can return detailed information about each domain, including its status, contact IDs, and DNS settings.

```APIDOC
## GET /domains

### Description
Retrieves a list of domains associated with the account. It can return detailed information about each domain, including its status, contact IDs, and DNS settings.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/domains

### Parameters
#### Query Parameters
- **Accept** (string) - Required - Application type, should be 'application/json'.
- **Authorization** (string) - Required - Bearer token for authentication.

### Request Example
```json
{
  "Accept": "application/json",
  "Authorization": "Bearer API_KEY"
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code of the response.
- **message** (string) - A message indicating the success of the operation.
- **data** (object) - Contains the domain information.
  - **domainInfo** (array) - A list of domain objects.
    - **domainName** (string) - The name of the domain.
    - **expiration** (long) - The expiration timestamp of the domain.
    - **registration** (long) - The registration timestamp of the domain.
    - **glueInfo** (object) - Information related to glue records.
      - **name_server_settings** (object) - Settings for name servers.
        - **type** (string) - The type of name server settings (e.g., 'Dynadot Parking').
        - **with_ads** (string) - Indicates if ads are enabled.
        - **forward_to** (string) - The email address or URL to forward to.
        - **forward_type** (string) - The type of forwarding (e.g., 'forward').
        - **website_title** (string) - The title for the forwarded website.
        - **ttl** (string) - Time To Live for DNS records.
        - **email_forwarding** (object) - Settings for email forwarding.
          - **type** (string) - The type of email forwarding.
    - **registrant_contactId** (integer) - The contact ID for the registrant.
    - **admin_contactId** (integer) - The contact ID for the administrator.
    - **tech_contactId** (integer) - The contact ID for the technical contact.
    - **billing_contactId** (integer) - The contact ID for the billing contact.
    - **locked** (string) - Indicates if the domain is locked.
    - **disabled** (string) - Indicates if the domain is disabled.
    - **udrpLocked** (string) - Indicates if the domain is locked by UDRP.
    - **registrant_unverified** (string) - Indicates if the registrant information is unverified.
    - **hold** (string) - Indicates if the domain is on hold.
    - **privacy** (string) - The privacy status of the domain.
    - **is_for_sale** (string) - Indicates if the domain is for sale.
    - **renew_option** (string) - The domain renewal option.
    - **note** (string) - User-added notes for the domain.
    - **folder_id** (integer) - The ID of the folder the domain belongs to.
    - **folder_name** (string) - The name of the folder.
    - **status** (string) - The current status of the domain.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "domainInfo": [
      {
        "domainName": "domain1",
        "expiration": 0,
        "registration": 0,
        "glueInfo": {
          "name_server_settings": {
            "type": "Dynadot Parking",
            "with_ads": "withAds",
            "forward_to": "forwardTo",
            "forward_type": "forwardType",
            "website_title": "websiteTitle",
            "ttl": "ttl",
            "email_forwarding": {
              "type": "forward"
            }
          }
        },
        "registrant_contactId": 0,
        "admin_contactId": 0,
        "tech_contactId": 0,
        "billing_contactId": 0,
        "locked": "Yes",
        "disabled": "Yes",
        "udrpLocked": "Yes",
        "registrant_unverified": "Yes",
        "hold": "Yes",
        "privacy": "privacy",
        "is_for_sale": "Yes",
        "renew_option": "renew_option",
        "note": "note",
        "folder_id": 0,
        "folder_name": "folder_name",
        "status": "status"
      }
    ]
  }
}
```

#### Error Response (Non-200)
- **code** (string) - The error code.
- **message** (string) - A description of the error.
- **data** (object) - Contains additional error details, potentially an empty object or null.

#### Error Response Example
```json
{
  "code": "401",
  "message": "Unauthorized",
  "data": {}
}
```
```

--------------------------------

### GET /domains/{domain_name}/search

Source: https://www.dynadot.com/domain/api-document/index

Searches for a specific domain name to check its availability, premium status, and pricing details for registration, renewal, transfer, and restore.

```APIDOC
## GET /domains/{domain_name}/search

### Description
Searches for a specific domain name to check its availability, premium status, and pricing details for registration, renewal, transfer, and restore.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/search

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The domain name to search for.

#### Query Parameters
- **is_available** (Boolean) - Optional - Filter by availability.
- **is_premium** (String) - Optional - Filter by premium status (yes, no, unknown).
- **is_show_price** (Boolean) - Optional - Whether to show pricing information.
- **currency** (String) - Optional - The currency for pricing (e.g., USD, GBP, EUR).

### Request Example
```json
{
  "example": ""
}
```

### Response
#### Success Response (200)
- **code** (Integer) - The status code of the response.
- **message** (String) - A message indicating the success or failure of the request.
- **data** (Object) - Contains the domain search results.
  - **domain_name** (String) - The name of the domain.
  - **available** (String) - Indicates if the domain is available ('Yes' or 'No').
  - **premium** (String) - Indicates if the domain is premium ('YES', 'NO', 'UNKNOWN').
  - **price_list** (Array) - A list of pricing objects for different registration terms.
    - **currency** (String) - The currency of the price.
    - **unit** (String) - The registration term (e.g., '(price/1 year)').
    - **transfer** (String) - The price for domain transfer.
    - **restore** (String) - The price for domain restore.

#### Response Example
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "domain_name": "domain1.com",
    "available": "No",
    "premium": "YES",
    "price_list": [
      {
        "currency": "USD",
        "unit": "(price/1 year)",
        "transfer": "$203",
        "restore": "$204"
      },
      {
        "currency": "USD",
        "unit": "(price/2 year)"
      }
    ]
  }
}
```
```

--------------------------------

### GET /domains/bulk_search

Source: https://www.dynadot.com/domain/api-document/index

Performs a bulk search for multiple domain names simultaneously, returning their availability status and any associated error messages.

```APIDOC
## GET /domains/bulk_search

### Description
Performs a bulk search for multiple domain names simultaneously, returning their availability status and any associated error messages.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/domains/bulk_search

### Parameters
#### Query Parameters
- **domain_name_list** (List) - Required - A comma-separated string of domain names to search for. The maximum number of domains depends on the account's pricing tier (Regular: 5, Bulk: 10, Super Bulk: 20).
  *Example: `domain_name_list=example1.com,example2.net,example3.org`*

### Request Example
```json
{
  "example": ""
}
```

### Response
#### Success Response (200)
- **code** (Integer) - The status code of the response.
- **message** (String) - A message indicating the success or failure of the request.
- **data** (Object) - Contains the bulk domain search results.
  - **domain_result_list** (Array) - A list of domain search result objects.
    - **domain_name** (String) - The name of the domain.
    - **available** (String) - Indicates if the domain is available ('Yes' or 'No').
    - **details_error_message** (String) - An error message if the domain could not be processed.

#### Response Example
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "domain_result_list": [
      {
        "domain_name": "example.com",
        "available": "Yes"
      },
      {
        "domain_name": "example.net",
        "details_error_message": "busy"
      }
    ]
  }
}
```
```

--------------------------------

### Get TLD Price Information

Source: https://www.dynadot.com/domain/api-document/index

Retrieves pricing information for various Top-Level Domains (TLDs). This endpoint supports filtering and sorting to customize the results.

```APIDOC
## GET /restful/v1/tld/get_tld_price

### Description
Retrieves pricing information for Top-Level Domains (TLDs), including registration, renewal, transfer, and restoration prices. Supports multi-year pricing and currency conversion.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/tld/get_tld_price

### Parameters
#### Query Parameters
- **currency** (String) - Required - The currency for pricing information (e.g., USD, EUR).
- **page_index** (Integer) - Optional - The page number for paginated results.
- **count_per_page** (Integer) - Optional - The number of results per page.
- **sort** (String) - Optional - The field to sort results by (e.g., name_asc, rank_desc).
- **show_multi_year** (Boolean) - Optional - Whether to include multi-year pricing details.

### Request Example
```json
{
  "currency": "USD",
  "page_index": 1,
  "count_per_page": 20,
  "sort": "name_asc",
  "show_multi_year": true
}
```

### Response
#### Success Response (200)
- **page_index** (Integer) - The current page index.
- **count_per_page** (Integer) - The number of results per page.
- **sort** (String) - The applied sorting order.
- **price_level** (String) - The price level for the TLDs.
- **currency** (String) - The currency used for the prices.
- **show_multi_year_price** (Boolean) - Indicates if multi-year prices are shown.
- **tld_price_list** (List) - A list of TLD pricing details.
  - **tld** (String) - The Top-Level Domain.
  - **usage** (String) - The usage of the TLD.
  - **price_unit** (String) - The unit for pricing.
  - **all_years_register_price** (List) - Registration prices for multiple years.
  - **all_years_renew_price** (List) - Renewal prices for multiple years.
  - **transfer_price** (String) - Price for transferring a domain.
  - **restore_price** (String) - Price for restoring a domain.
  - **grace_fee_price** (String) - Price for grace period fees.
  - **support_privacy** (String) - Whether privacy is supported.
  - **grace_period_unit** (String) - The unit for grace periods.
  - **renew_grace_period** (String) - Duration of the renewal grace period.
  - **restore_period** (String) - Duration of the restore period.
  - **delete_grace_period** (String) - Duration of the delete grace period.
  - **is_idn** (String) - Indicates if the TLD supports IDN.
  - **restriction** (String) - Any restrictions on the TLD.
  - **on_sale** (String) - Indicates if the TLD is on sale.

#### Response Example
```json
{
  "page_index": 1,
  "count_per_page": 1,
  "sort": "name_asc",
  "price_level": "retail",
  "currency": "USD",
  "show_multi_year_price": true,
  "tld_price_list": [
    {
      "tld": ".com",
      "usage": "COM",
      "price_unit": "Y",
      "all_years_register_price": [
        "10.00"
      ],
      "all_years_renew_price": [
        "10.00"
      ],
      "transfer_price": "10.00",
      "restore_price": "10.00",
      "grace_fee_price": "0.00",
      "support_privacy": "Yes",
      "grace_period_unit": "D",
      "renew_grace_period": "30",
      "restore_period": "30",
      "delete_grace_period": "0",
      "is_idn": "false",
      "restriction": "",
      "on_sale": "false"
    }
  ]
}
```
```

--------------------------------

### Get Order Status

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to retrieve the status of a specific order using its order ID.

```APIDOC
## GET /restful/v1/orders/{order_id}

### Description
Retrieves the status of a specific order using its order ID.

### Method
GET

### Endpoint
`/restful/v1/orders/{order_id}`

### Parameters
#### Path Parameters
- **order_id** (Integer) - Required - The ID of the order to query.

#### Response
##### Success Response (200)
- **order_id** (Integer) - The ID of the order.
- **order_status** (String) - The status of the order.
- **order_status_list** (Array of Objects) - A list of order statuses.
  - **type** (String) - Order type.
  - **name** (String) - Order name.
  - **duration** (Integer) - Order duration.
  - **cost** (String) - Order cost.
  - **status** (String) - Order status.

##### Response Example
```json
{
  "order_id": 12345,
  "order_status": "Completed",
  "order_status_list": [
    {
      "type": "Domain Registration",
      "name": "example.com",
      "duration": 1,
      "cost": "10.00",
      "status": "Active"
    }
  ]
}
```
```

--------------------------------

### GET /domains/{domain_name}/records

Source: https://www.dynadot.com/domain/api-document/index

Retrieves the DNS records for a specific domain. Supports multi-thread and API sandbox. Requires an X-Signature header.

```APIDOC
## GET /domains/{domain_name}/records

### Description
Retrieves the DNS records for a specific domain.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/records

### Path Parameters
- **domain_name** (string) - Required - The name of the domain.

### Headers
- **Accept**: application/json
- **Authorization**: Bearer API_KEY
- **X-Signature**: {signature}

### Response
#### Success Response (200)
- **code** (string) - The response code.
- **message** (string) - The response message.
- **data** (object) - The response data.
  - **name_server_settings** (object) - The nameserver settings.
    - **type** (string) - The type of nameserver.
    - **with_ads** (string) - The status of ads.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "name_server_settings": {
      "type": "Dynadot Parking",
      "with_ads": "Yes"
    }
  }
}
```
```

--------------------------------

### GET /domains/{domain_name}/suggestion_search

Source: https://www.dynadot.com/domain/api-document/index

Provides domain name suggestions based on a given domain name and specified Top-Level Domains (TLDs).

```APIDOC
## GET /domains/{domain_name}/suggestion_search

### Description
Provides domain name suggestions based on a given domain name and specified Top-Level Domains (TLDs).

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/suggestion_search

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The base domain name for which to find suggestions.

#### Query Parameters
- **tlds** (String) - Required - A comma-separated list of TLDs to consider for suggestions (e.g., `com,net,org`).
- **max_count** (Integer) - Optional - The maximum number of suggestions to return.

### Request Example
```json
{
  "example": ""
}
```

### Response
#### Success Response (200)
- **code** (Integer) - The status code of the response.
- **message** (String) - A message indicating the success or failure of the request.
- **data** (Object) - Contains the list of domain suggestions.
  - **domain_list** (Array) - A list of suggested domain names.

#### Response Example
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "domain_list": [
      "example.com",
      "example.net"
    ]
  }
}
```
```

--------------------------------

### GET /domains/get_tld_price

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to retrieve pricing information for various Top-Level Domains (TLDs). You can specify currency, pagination, sorting, and whether to include multi-year prices.

```APIDOC
## GET /domains/get_tld_price

### Description
Retrieves pricing information for various Top-Level Domains (TLDs). You can specify currency, pagination, sorting, and whether to include multi-year prices.

### Method
GET

### Endpoint
`https://api.dynadot.com/restful/v1/domains/get_tld_price`

### Parameters
#### Query Parameters
- **currency** (String) - Required - The currency for the pricing information (e.g., 'USD', 'EUR', 'GBP'). Supported values: 'usd', 'gbp', 'eur', 'inr', 'pln', 'zar', 'ltl', 'cny', 'cad', 'jpy', 'nzd', 'rub', 'aud', 'mxn', 'brl', 'idr', 'ars', 'cop', 'dkk', 'rsd', 'hkd', 'chf', 'aed', 'myr', 'ngn', 'kes', 'czk', 'btc', 'nok'.
- **page_index** (Integer) - Optional - The page index for paginating results.
- **count_per_page** (Integer) - Optional - The number of items to return per page.
- **sort** (String) - Optional - The field and direction to sort the results by. Supported values: 'rank_asc', 'rank_desc', 'name_asc', 'name_desc', 'sales_asc', 'sales_desc', 'launch_date_asc', 'launch_date_desc', 'count_asc', 'count_desc', 'registry_asc', 'registry_desc'.
- **show_multi_year** (Boolean) - Optional - Set to true to include multi-year registration and renewal prices.

### Response
#### Success Response (200)
- **page_index** (Integer) - The current page index.
- **count_per_page** (Integer) - The number of items per page.
- **sort** (String) - The sorting applied to the results.
- **price_level** (String) - The pricing tier.
- **currency** (String) - The currency of the prices.
- **show_multi_year_price** (Boolean) - Indicates if multi-year prices are shown.
- **tld_price_list** (Array) - A list of TLD pricing details.
  - **tld** (String) - The Top-Level Domain.
  - **usage** (String) - The usage type (e.g., 'COM').
  - **price_unit** (String) - The unit for the price (e.g., '/ year').
  - **all_years_register_price** (Array) - List of registration prices for different year counts.
  - **all_years_renew_price** (Array) - List of renewal prices for different year counts.
  - **transfer_price** (String) - The price for transferring the domain.
  - **restore_price** (String) - The price for restoring a domain.
  - **grace_fee_price** (String) - The fee for grace period.
  - **support_privacy** (String) - Indicates if privacy protection is supported.
  - **grace_period_unit** (String) - The unit for the grace period.
  - **renew_grace_period** (String) - The duration of the renewal grace period.
  - **restore_period** (String) - The duration of the restore period.
  - **delete_grace_period** (String) - The duration of the delete grace period.
  - **is_idn** (String) - Indicates if the TLD supports Internationalized Domain Names.
  - **restriction** (String) - Any restrictions for the TLD.
  - **on_sale** (String) - Indicates if the TLD is currently on sale.

#### Response Example
```json
{
  "page_index": 1,
  "count_per_page": 10,
  "sort": "NAME_ASC",
  "price_level": "Bulk",
  "currency": "USD",
  "show_multi_year_price": true,
  "tld_price_list": [
    {
      "tld": ".com",
      "usage": "COM",
      "price_unit": "(Price/1 year)",
      "all_years_register_price": ["10.99"],
      "all_years_renew_price": ["12.99"],
      "transfer_price": "10.99",
      "restore_price": "--",
      "grace_fee_price": "--",
      "support_privacy": "Yes",
      "grace_period_unit": "(Grace Period/days)",
      "renew_grace_period": "0-20 (variable)",
      "restore_period": "0-20 (variable)",
      "delete_grace_period": "0-20 (variable)",
      "is_idn": "Yes",
      "restriction": "--",
      "on_sale": "Yes"
    }
  ]
}
```
```

--------------------------------

### POST /aftermarket/listings/{domain_name}/buy_it_now

Source: https://www.dynadot.com/domain/api-document/index

Purchases a domain using the "Buy It Now" option. This endpoint allows for immediate purchase of a domain that is listed with a "Buy It Now" price.

```APIDOC
## POST /aftermarket/listings/{domain_name}/buy_it_now

### Description
Purchases a domain using the "Buy It Now" option. This endpoint allows for immediate purchase of a domain that is listed with a "Buy It Now" price.

### Method
POST

### Endpoint
`/restful/v1/aftermarket/listings/{domain_name}/buy_it_now`

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The name of the domain to purchase.

#### Query Parameters
- **currency** (String) - Optional - The currency to use for the purchase. Supported values: `usd`, `gbp`, `eur`, `inr`, `pln`, `zar`, `ltl`, `cny`, `cad`, `jpy`, `nzd`, `rub`, `aud`, `mxn`, `brl`, `idr`, `ars`, `cop`, `dkk`, `rsd`, `hkd`, `chf`, `aed`, `myr`, `ngn`, `kes`, `czk`, `btc`, `nok`.

#### Request Body
- **currency** (String) - Required - The currency for the purchase.

### Request Example
```json
{
  "currency": "usd"
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code.
- **message** (String) - The response message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### GET /restful/v1/aftermarket/auctions/bids

Source: https://www.dynadot.com/domain/api-document/index

Retrieve a list of auction bids. This endpoint allows users to fetch details about their auction bids, including bid ID, auction details, and status.

```APIDOC
## GET /restful/v1/aftermarket/auctions/bids

### Description
Retrieve a list of auction bids. This endpoint allows users to fetch details about their auction bids, including bid ID, auction details, and status. It supports filtering by currency.

### Method
GET

### Endpoint
`https://api.dynadot.com/restful/v1/aftermarket/auctions/bids`

### Parameters
#### Path Parameters
None

#### Query Parameters
- **currency** (String) - Optional - The currency to filter bids by. Supported values: `usd`, `gbp`, `eur`, `inr`, `pln`, `zar`, `ltl`, `cny`, `cad`, `jpy`, `nzd`, `rub`, `aud`, `mxn`, `brl`, `idr`, `ars`, `cop`, `dkk`, `rsd`, `hkd`, `chf`, `aed`, `myr`, `ngn`, `kes`, `czk`, `btc`, `nok`.

#### Request Body
None

### Request Example
```http
GET https://api.dynadot.com/restful/v1/aftermarket/auctions/bids?currency=USD
```

### Response
#### Success Response (200)
- **code** (String) - The response code, expected to be "200" for success.
- **message** (String) - A success message, typically "Success".
- **data** (Object) - Contains the auction bid details.
  - **auction_bid_details** (List) - A list of auction bid objects.
    - **bid_id** (Integer) - The unique identifier of the bid.
    - **auction_id** (Integer) - The unique identifier of the auction.
    - **account_id** (String) - The account ID of the bidder.
    - **domain** (String) - The domain name.
    - **domain_utf** (String) - The domain name in UTF-8 encoding.
    - **is_idn_domain** (Boolean) - Indicates if the domain is an Internationalized Domain Name (IDN).
    - **auction_type** (String) - The type of auction (e.g., `expired`, `user`, `portfolio`, `backorder`, `registrar`, `registry`, `registryexpired`, `premiumuser`).
    - **current_bid** (String) - The current highest bid amount.
    - **proxy_bid** (String) - The proxy bid amount.
    - **bid_status** (String) - The status of the bid.
    - **is_high_bidder** (Boolean) - Indicates if the current account is the high bidder.
    - **active_bidders** (Integer) - The number of active bidders in the auction.
    - **time_left** (String) - The time remaining in the auction.
    - **end_time** (String) - The end time of the auction.
    - **end_time_stamp** (Long) - The end time of the auction as a Unix timestamp.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "auction_bid_details": [
      {
        "bid_id": 1,
        "auction_id": 101,
        "account_id": "acc123",
        "domain": "example.com",
        "domain_utf": "example.com",
        "is_idn_domain": false,
        "auction_type": "user",
        "current_bid": "50.00",
        "proxy_bid": "100.00",
        "bid_status": "Active",
        "is_high_bidder": true,
        "active_bidders": 5,
        "time_left": "2 days 3 hours",
        "end_time": "2024-07-15T10:00:00Z",
        "end_time_stamp": 1721047200
      }
    ]
  }
}
```
```

--------------------------------

### GET /domains/{domain_name}

Source: https://www.dynadot.com/domain/api-document/index

Retrieves detailed information about a specific domain, including its registration and expiration dates, DNS settings, contact information, and various status flags.

```APIDOC
## GET /domains/{domain_name}

### Description
Retrieves detailed information about a specific domain, including its registration and expiration dates, DNS settings, contact information, and various status flags. Supports multi-thread and API sandbox environments.

### Method
GET

### Endpoint
`/restful/v1/domains/{domain_name}`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to retrieve information for.

#### Headers
- **Accept** (string) - `application/json`
- **Authorization** (string) - `Bearer API_KEY`

### Request Example
```json
{
  "example": "No request body for GET request"
}
```

### Response
#### Success Response (200)
- **code** (string) - The response code, "200" for success.
- **message** (string) - A message indicating the success of the operation.
- **data** (object) - Contains the domain information.
  - **domainInfo** (array) - An array of domain information objects.
    - **domainName** (string) - The name of the domain.
    - **expiration** (long) - The expiration date of the domain.
    - **registration** (long) - The registration date of the domain.
    - **glueInfo** (object) - Information about the glue records.
      - **glue_type** (string) - The type of the nameserver. Supported values: type_null, type_park, type_dns, type_user, type_forward, type_stealth, type_webhost_basic, type_dynasite, type_webhost_advanced, type_free_webhost, type_sitebuilder, type_forsale, type_reseller_storefront, type_park_bot.
      - **nameservers** (list) - A list of nameserver objects.
        - **server_name** (string, Optional) - The name of the nameserver.
        - **ip_list** (list, Optional) - The IP list of the nameserver.
      - **with_ads** (string) - The status of the ads.
      - **forward_to** (string) - The URL to forward to.
      - **forward_type** (string) - The type of forwarding.
      - **website_title** (string) - The title of the website.
      - **email_forward_type** (string) - The email forwarding settings. Supported values: mtype_none, mtype_forward, mtype_mx.
      - **mail_exchanges** (list) - A list of mail exchange records.
        - **host** (string, Optional) - Mail host, only used when forward type is mx.
        - **distance** (string, Optional) - Distance (priority) for MX records.
      - **email_alias_list** (list) - A list of email alias objects.
        - **username** (string, Optional) - The username for the email alias.
        - **to_email** (string, Optional) - The destination email address for the alias.
      - **dns_main_list** (list) - A list of main DNS records.
        - **record_type** (string, Optional) - The type of the DNS record. Supported values: a, cname, forward, aaaa, txt, stealth, mx, email, caa, aname, srv, ns.
        - **record_value1** (string, Optional) - The primary value of the DNS record.
        - **record_value2** (string, Optional) - The secondary value of the DNS record.
      - **dns_sub_list** (list) - A list of sub DNS records.
        - **sub_host** (string, Optional) - The subhost of the DNS record.
        - **record_type** (string, Optional) - The type of the DNS record. Supported values: a, cname, forward, aaaa, txt, stealth, mx, email, caa, aname, srv, ns.
        - **record_value1** (string, Optional) - The primary value of the DNS record.
        - **record_value2** (string, Optional) - The secondary value of the DNS record.
      - **ttl** (string) - The time to live for DNS records.
    - **registrant_contact_id** (integer) - The ID of the registrant contact.
    - **admin_contact_id** (integer) - The ID of the admin contact.
    - **tech_contact_id** (integer) - The ID of the tech contact.
    - **billing_contact_id** (integer) - The ID of the billing contact.
    - **locked** (boolean) - Domain locked status.
    - **disabled** (boolean) - Domain disabled status.
    - **udrp_locked** (boolean) - UDRP locked status.
    - **registrant_unverified** (boolean) - Registrant unverified status.
    - **hold** (boolean) - Client/Registrar Hold Status.
    - **privacy** (string) - Privacy status.
    - **is_for_sale** (boolean) - Is for sale status.
    - **renew_option** (string) - Renew option.
    - **note** (string) - Note associated with the domain.
    - **folder_id** (integer) - The ID of the folder the domain belongs to.
    - **folder_name** (string) - The name of the folder.
    - **status** (string) - The current status of the domain (e.g., active, expired, transferaway).

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "domainInfo": [
      {
        "domainName": "domain1",
        "expiration": 0,
        "registration": 0,
        "glueInfo": {
          "type": "Dynadot Parking",
          "with_ads": "withAds",
          "forward_to": "forwardTo",
          "forward_type": "forwardType",
          "website_title": "websiteTitle",
          "ttl": "ttl",
          "email_forwarding": {
            "email_forward_type": "forward"
          },
          "mail_exchanges": [],
          "email_alias_list": [],
          "dns_main_list": [],
          "dns_sub_list": []
        },
        "registrant_contact_id": 0,
        "admin_contact_id": 0,
        "tech_contact_id": 0,
        "billing_contact_id": 0,
        "locked": true,
        "disabled": true,
        "udrp_locked": true,
        "registrant_unverified": true,
        "hold": true,
        "privacy": "privacy",
        "is_for_sale": true,
        "renew_option": "renew_option",
        "note": "note",
        "folder_id": 0,
        "folder_name": "folder_name",
        "status": "status"
      }
    ]
  }
}
```
```

--------------------------------

### Get Backorder Requests - JSON

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of backorder requests with their details. Requires an API key for authorization. Returns a JSON object containing status and a list of backorder requests.

```JSON
{
  "code": "200",
  "message": "Success",
  "data": {
    "backorder_request_list": [
      {
        "domain_name": "testdrop.com",
        "cut_off_time": 1403914140000,
        "backorder_request_status": "Active"
      },
      {
        "domain_name": "testdrop3.com",
        "cut_off_time": 1403914140000,
        "backorder_request_status": "Active"
      },
      {
        "domain_name": "testdrop4.com",
        "cut_off_time": 1403914140000,
        "backorder_request_status": "Active"
      },
      {
        "domain_name": "testdrop5.com",
        "cut_off_time": 1403914140000,
        "backorder_request_status": "Active"
      }
    ]
  }
}
```

--------------------------------

### API Error Response Example (XML)

Source: https://www.dynadot.com/domain/api-document/index

This XML structure details an API error, specifically the 'Too Many Requests' status code (429), along with a descriptive error message.

```XML
<Response>
  <status>
    <code>429</code>
    <message>Too Many Requests</message>
  </status>
  <error>
    <description>You have reached the maximum allowed requests within the concurrent limit of your account. Please try again later.</description>
  </error>
</Response>
```

--------------------------------

### Search Single Domain - Error Response Example

Source: https://www.dynadot.com/domain/api-document/index

Illustrates a generic error response structure for the domain search API. This structure can be used to handle various error scenarios returned by the API.

```json
{
  * code: "Integer",
  * message: "String",
  * data: {
    * domain_name: "String",
    * available: "String",
    * premium: "String",
    * price_list: [
      1. {
         * currency: "String",
         * unit: "String",
         * transfer: "String",
         * restore: "String"
}
]
}

}
```

--------------------------------

### List All Nameservers

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of all configured nameservers, including their names and IP lists.

```APIDOC
## GET /restful/v1/nameservers

### Description
Retrieves a list of all configured nameservers, including their names and IP lists.

### Method
GET

### Endpoint
`/restful/v1/nameservers`

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.
- **data** (Object)
  - **nameserver_list** (List) - A list of nameserver objects.
    - **server_name** (String) - The name of the nameserver.
    - **ip_list** (List) - A list of IP addresses associated with the nameserver.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "nameserver_list": [
      {
        "server_name": "ns1.testdomain.com",
        "ip_list": [
          "1.1.1.1",
          "2.2.2.2"
        ]
      },
      {
        "server_name": "ns2.testdomain.com",
        "ip_list": [
          "2.2.2.2",
          "3.3.3.3"
        ]
      }
    ]
  }
}
```
```

--------------------------------

### Renew Domain API Success Response Example

Source: https://www.dynadot.com/domain/api-document/index

A successful response from the Dynadot API after renewing a domain. It contains a status code, a success message, and the updated expiration date of the domain.

```JSON
{
  "code": "200",
  "message": "Success",
  "data": {
    "expiration_date": 1761926603275
  }
}
```

--------------------------------

### GET /restful/v1/aftermarket/auctions/closed

Source: https://www.dynadot.com/domain/api-document/index

Retrieve a list of closed domain auctions. This endpoint allows users to query auctions that have ended within a specified time range.

```APIDOC
## GET /restful/v1/aftermarket/auctions/closed

### Description
Retrieve a list of closed domain auctions. This endpoint allows users to query auctions that have ended within a specified time range, filtered by currency.

### Method
GET

### Endpoint
`https://api.dynadot.com/restful/v1/aftermarket/auctions/closed`

### Parameters
#### Path Parameters
None

#### Query Parameters
- **currency** (String) - Optional - The currency to filter closed auctions by. Supported values: `usd`, `gbp`, `eur`, `inr`, `pln`, `zar`, `ltl`, `cny`, `cad`, `jpy`, `nzd`, `rub`, `aud`, `mxn`, `brl`, `idr`, `ars`, `cop`, `dkk`, `rsd`, `hkd`, `chf`, `aed`, `myr`, `ngn`, `kes`, `czk`, `btc`, `nok`.
- **start_time** (Long) - Required - The Unix timestamp indicating the start of the auction's end time.
- **end_time** (Long) - Required - The Unix timestamp indicating the end of the auction's end time.

#### Request Body
None

### Request Example
```http
GET https://api.dynadot.com/restful/v1/aftermarket/auctions/closed?currency=USD&start_time=1704067200&end_time=1704153600
```

### Response
#### Success Response (200)
- **code** (String) - The response code, expected to be "200" for success.
- **message** (String) - A success message, typically "Success".
- **data** (Object) - Contains the list of closed auctions.
  - **closed_auction_list** (List) - A list of closed auction objects.
    - **auction_id** (Integer) - The unique identifier of the auction.
    - **domain** (String) - The domain name of the auction.
    - **auction_status** (String) - The status of the auction (e.g., "Sold", "Not Sold").

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "closed_auction_list": [
      {
        "auction_id": 201,
        "domain": "oldsite.com",
        "auction_status": "Sold"
      }
    ]
  }
}
```
```

--------------------------------

### FOLDER_SET_PARKING Command

Source: https://www.dynadot.com/domain/api-document/index

Allows for setting parking configurations for a folder. Specific details on parameters and request/response structures are not provided in the input.

--------------------------------

### API Error Response Example (JSON)

Source: https://www.dynadot.com/domain/api-document/index

This JSON structure details an API error, specifically the 'Too Many Requests' status code (429), along with a descriptive error message.

```JSON
{
  "code": 429,
  "message": "Too Many Requests",
  "error": {
    "description": "You have reached the maximum allowed requests within the concurrent limit of your account. Please try again later."
  }
}
```

--------------------------------

### Set Folder Parking Configuration (API)

Source: https://www.dynadot.com/domain/api-document/index

Configure parking settings for a domain folder. This includes whether to display ads, apply settings to future domains, and synchronize settings with existing domains in the folder. The request body is sent as JSON.

```JSON
{
  "with_ads": false,
  "apply_for_future_domain": false,
  "sync_setting_to_existing_domains_in_this_folder": false
}
```

--------------------------------

### GET /orders

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a history of orders based on specified search criteria. Supports filtering by domain name, order ID, date range, and payment method.

```APIDOC
## GET /orders

### Description
Retrieves a history of orders placed through Dynadot. This endpoint allows for flexible searching based on various criteria such as domain names, order IDs, specific date ranges, and payment methods.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/orders

### Parameters
#### Query Parameters
- **domain_name_list** (List) - Optional - A list of domain names to filter orders.
- **order_id_list** (List) - Optional - A list of order IDs to filter orders.
- **search_type** (String) - Required - The type of search to perform. Supported values: `date_range`, `domain`, `order_id`.
- **start_time** (Long) - Optional - The start timestamp (13-digit number) for `date_range` or `domain` searches. Must be consistent with `end_time`.
- **end_time** (Long) - Optional - The end timestamp (13-digit number) for `date_range` or `domain` searches. Must be consistent with `start_time`.
- **payment_method** (List) - Optional - A list of payment methods to filter orders. Supported values: `paypal`, `account_balance`, `credit_card`. If not specified, all payment types are included.

### Request Headers
- **Accept**: `application/json`
- **Authorization**: `Bearer API_KEY`
- **X-Signature**: `{signature}`

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - A message indicating the success or failure of the request.
- **data** (Object) - Contains the list of orders matching the search criteria.
  - **order_list** (List) - A list of order objects.
    - **order_id** (Integer) - The unique identifier for the order.
    - **submitted_date** (Long) - The timestamp when the order was submitted.
    - **currency** (String) - The currency used for the order.
    - **total_cost** (String) - The total cost of the order.
    - **total_paid** (String) - The total amount paid for the order.
    - **payment_method** (String) - The method used for payment.
    - **status** (String) - The current status of the order.
    - **order_item_list** (List) - A list of items included in the order.
      - **type** (String) - The type of order item (e.g., Domain Registration, Domain Renewal).
      - **name** (String) - The name of the order item (e.g., domain name).
      - **duration** (Integer) - The duration of the service in years.
      - **cost** (String) - The cost of the individual order item.
      - **status** (String) - The status of the individual order item.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "order_list": [
      {
        "order_id": 123456,
        "submitted_date": 1761926603299,
        "currency": "USD",
        "payment_method": "Account Balance",
        "total_cost": "$8.00",
        "total_paid": "$8.00",
        "status": "Problem",
        "order_item_list": [
          {
            "type": "Domain Registration",
            "name": "test.com",
            "duration": 1,
            "cost": "2.99",
            "status": "Completed"
          },
          {
            "type": "Domain Renewal",
            "name": "test1.ac",
            "duration": 1,
            "cost": "3.99",
            "status": "Completed"
          },
          {
            "type": "Domain Transfer",
            "name": "test2.de",
            "duration": 1,
            "cost": "4.99",
            "status": "Completed"
          }
        ]
      }
    ]
  }
}
```
```

--------------------------------

### Create Site Builder

Source: https://www.dynadot.com/domain/api-document/index

Creates a new site builder for a specified domain. This endpoint allows for setting DNS and other site builder configurations.

```APIDOC
## POST /restful/v1/sitebuilders/{domain_name}

### Description
Creates a new site builder for a specified domain. Allows setting DNS and other configurations.

### Method
POST

### Endpoint
https://api.dynadot.com/restful/v1/sitebuilders/{domain_name}

### Headers
- Content-Type: application/json
- Accept: application/json
- Authorization: Bearer API_KEY
- X-Signature: {signature}

### Path Parameters
- **domain_name** (String) - Required - The name of the domain for which to create a site builder.

### Request Body
- **set_domain_dns** (Boolean) - Optional - Whether to set the domain's DNS to the site builder's DNS.

### Request Example
```json
{
  "set_domain_dns": false
}
```

### Response
#### Success Response (200)
- **code** (String) - "200"
- **message** (String) - "Success"
- **data** (Object)
  - **sitebuilder** (Object)
    - **domain_name** (String) - The name server of the domain.
    - **template** (String) - The template used for the site builder.
    - **plan** (String) - The plan for the site builder (e.g., "Free", "Basic").
    - **is_published** (Boolean) - Indicates if the site builder has been published.
    - **last_update** (Long) - The timestamp of the last update.
    - **expiration** (Long) - The expiration timestamp for the site builder.
    - **site_url** (String) - The URL of the published site builder.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "sitebuilder": {
      "domain_name": "example.com",
      "template": "Meridian",
      "plan": "Free",
      "is_published": "true",
      "last_update": 0,
      "expiration": 0,
      "site_url": "https://sitebuilder1.example.com"
    }
  }
}
```

#### Error Response (Integer)
- **code** (Integer) - The error code.
- **message** (String) - A description of the error.
- **data** (Object)
  - **sitebuilder** (Object)
    - **domain_name** (String)
    - **template** (String)
    - **plan** (String)
    - **is_published** (String)
    - **last_update** (Long)
    - **expiration** (Long)
    - **site_url** (String)
```

--------------------------------

### Get Open Auctions API Request

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of open domain auctions from the Dynadot API. This request supports optional parameters like 'currency' and 'auction_types'. It requires an API key for authorization and returns auction details in JSON format.

```http
GET https://api.dynadot.com/restful/v1/aftermarket/auctions/open
Accept:  application/json
Authorization:  Bearer API_KEY
```

--------------------------------

### DOMAIN_SET_NAMESERVER Command

Source: https://www.dynadot.com/domain/api-document/index

Allows you to set the nameservers for a domain. Supports multi-thread and requires X-Signature.

```APIDOC
## POST /restful/v1/domains/{domain_name}/nameservers

### Description
Sets the nameservers for a specified domain.

### Method
POST

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/nameservers`

### Headers
- Content-Type: application/json
- Accept: application/json
- Authorization: Bearer API_KEY
- X-Signature: {signature}

### Request Body
- **nameserver_list** (List) - Required - The list of nameservers to set for the domain.

### Request Example
```json
{
  "nameserver_list": [
    {
      "host": "ns1.example.com",
      "ns_name": "Example Nameserver"
    },
    {
      "host": "ns2.example.com",
      "ns_name": "Example Nameserver"
    }
  ]
}
```

### Response
#### Success Response (200)
- **code** (String) - '200'
- **message** (String) - 'Success'

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### GET /contacts/{contact_id}

Source: https://www.dynadot.com/domain/api-document/index

Retrieves detailed information about a specific contact using their contact ID. This endpoint is useful for fetching all attributes associated with a particular contact.

```APIDOC
## GET /contacts/{contact_id}

### Description
Retrieves detailed information about a specific contact using their contact ID. This endpoint is useful for fetching all attributes associated with a particular contact.

### Method
GET

### Endpoint
/contacts/{contact_id}

#### Path Parameters
- **contact_id** (Integer) - Required - The unique identifier for the contact.

#### Headers
- **Accept**: application/json
- **Authorization**: Bearer API_KEY

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.
- **data** (Object) - Contains the contact details.
  - **organization** (String) - The organization.
  - **name** (String) - The name of the contact owner.
  - **email** (String) - The email address.
  - **phone_number** (String) - The phone number.
  - **phone_cc** (String) - The phone country code.
  - **fax_number** (String) - The fax number.
  - **fax_cc** (String) - The fax country code.
  - **address1** (String) - The first line of the address.
  - **address2** (String) - The second line of the address.
  - **city** (String) - The city.
  - **state** (String) - The state.
  - **zip** (String) - The zip code.
  - **country** (String) - The country.

#### Response Example (200)
{
  "code": "200",
  "message": "Success",
  "data": {
    "organization": "Test",
    "name": "Test",
    "email": "test@test.com",
    "phone_number": "1234567890",
    "phone_cc": "1",
    "fax_number": "1234567890",
    "fax_cc": "1",
    "address1": "123 Main St",
    "address2": "",
    "city": "Anytown",
    "state": "CA",
    "zip": "12345",
    "country": "US"
  }
}
```

--------------------------------

### List Nameservers (NAMESERVER_LIST)

Source: https://www.dynadot.com/domain/api-document/index

Fetches a list of all configured nameservers, with each entry containing the server name and its associated IP list. This API call supports multi-threading, API sandbox, and requires an X-Signature header.

```JSON
GET https://api.dynadot.com/restful/v1/nameservers
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}
```

--------------------------------

### SET_DEFAULT_NAMESERVERS Command

Source: https://www.dynadot.com/domain/api-document/index

Allows setting default nameservers for the domain. Supports API Sandbox and requires X-Signature.

```APIDOC
## POST /command/set_default_nameservers

### Description
Sets the default nameservers for the domain. This command supports multi-thread operations and the API Sandbox environment. It requires an `X-Signature` header for authentication.

### Method
POST

### Endpoint
/command/set_default_nameservers

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
* **nameservers** (Array) - Required - A list of nameserver hostnames.
  - **hostname** (String) - The hostname of a nameserver.
* **domain_names** (Array) - Required - A list of domain names for which to set the nameservers.
  - **domain_name** (String) - The domain name.

### Request Example
```json
{
  "nameservers": [
    {"hostname": "ns1.example.com"},
    {"hostname": "ns2.example.com"}
  ],
  "domain_names": [
    {"domain_name": "example.com"},
    {"domain_name": "anotherexample.net"}
  ]
}
```

### Response
#### Success Response (200)
- **status** (String) - Indicates the success of the operation (e.g., "success").
- **message** (String) - A confirmation message.

#### Response Example (200)
```json
{
  "status": "success",
  "message": "Default nameservers set successfully for the specified domains."
}
```

#### Error Response (Non-200)
- **status** (String) - Indicates the failure of the operation (e.g., "error").
- **message** (String) - An error message describing the issue.

#### Error Response Example
```json
{
  "status": "error",
  "message": "Invalid domain name provided."
}
```
```

--------------------------------

### POST /restful/v1/folders

Source: https://www.dynadot.com/domain/api-document/index

Creates a new folder to organize domains. Requires a folder name as input.

```APIDOC
## POST /restful/v1/folders

### Description
Creates a new folder to organize domains. Requires a folder name as input.

### Method
POST

### Endpoint
https://api.dynadot.com/restful/v1/folders

### Parameters
#### Request Body
- **folder_name** (String) - Required - The name of the folder that you wish to create.

### Request Example
```json
{
  "folder_name": "String"
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code.
- **message** (String) - The response message.
- **data** (Object) - The data payload.
  - **folder_id** (Integer) - The ID of the folder you created.
  - **folder_name** (String) - The name of the folder you created.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "folder_id": 123,
    "folder_name": "TestFolderName"
  }
}
```
```

--------------------------------

### GET /domains/{domain_name}/transfer_auth_code

Source: https://www.dynadot.com/domain/api-document/index

This endpoint retrieves the transfer authorization code for a specific domain. You can optionally generate a new code and unlock the domain for transfer in the same request.

```APIDOC
## GET /domains/{domain_name}/transfer_auth_code

### Description
Retrieves the transfer authorization code for a specific domain. You can optionally generate a new code and unlock the domain for transfer in the same request.

### Method
GET

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/transfer_auth_code`

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The name of the domain to retrieve the transfer auth code for.

#### Query Parameters
- **new_code** (Boolean) - Optional - Set to true to generate a new authorization code.
- **unlock_domain_for_transfer** (Boolean) - Optional - Set to true to unlock the domain for transfer.

### Response
#### Success Response (200)
- **code** (String) - The status code of the response, '200' for success.
- **message** (String) - A message indicating the result of the operation.
- **data** (Object) - Contains the transfer authorization code.
  - **auth_code** (String) - The transfer authorization code.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "auth_code": "1234567890abcdef"
  }
}
```
```

--------------------------------

### List Site Builders API Request

Source: https://www.dynadot.com/domain/api-document/index

Shows the API request for the LIST_SITE_BUILDER command. It includes the production and sandbox URLs, along with the necessary headers for making the request. This command retrieves a list of all site builders associated with the account.

```HTTP
GET https://api.dynadot.com/restful/v1/sitebuilders
Accept:  application/json

```

--------------------------------

### SET_HOSTING Command

Source: https://www.dynadot.com/domain/api-document/index

Configures the hosting type for a domain, with options for 'Advanced' and 'Basic' hosting.

```APIDOC
## PUT /restful/v1/domains/{domain_name}/hosts

### Description
Sets the hosting type for a domain. Supports 'Advanced' and 'Basic' hosting.

### Method
PUT

### Endpoint
`/restful/v1/domains/{domain_name}/hosts`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to configure.

#### Headers
- **Content-Type**: `application/json`
- **Accept**: `application/json`
- **Authorization**: `Bearer API_KEY`
- **X-Signature**: `{signature}`

#### Request Body
- **hosting_type** (string) - Required - The type of hosting. Supported values: `basic`, `advanced`.
- **is_model_view** (boolean) - Optional - Use `true` only when `hosting_type` is `advanced`.

### Request Example
```json
{
  "hosting_type": "advanced",
  "is_model_view": true
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code, "200" for success.
- **message** (string) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Contact Update - API Request Example

Source: https://www.dynadot.com/domain/api-document/index

This snippet shows the HTTP PUT request to the Dynadot API endpoint for updating a contact. It includes the contact ID in the URL, headers, and the JSON request body.

```http
PUT https://api.dynadot.com/restful/v1/contacts/{contact_id}
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "contact": {
    "organization": "String",
    "name": "String",
    "email": "String",
    "phone_number": "String",
    "phone_cc": "String",
    "fax_number": "String",
    "fax_cc": "String",
    "address1": "String",
    "address2": "String",
    "city": "String",
    "state": "String",
    "zip": "String",
    "country": "String"
  }
}
```

--------------------------------

### Set Domain for Sale API Request (Partial)

Source: https://www.dynadot.com/domain/api-document/index

This snippet shows the beginning of a JSON request to set a domain for sale. It includes the mandatory 'for_sale_type' and optional 'currency' and 'listing_type' parameters.

```JSON
{
  "for_sale_type": "String",
  "currency": "String",
  "listing_type": "String"
}
```

--------------------------------

### Register a New Nameserver

Source: https://www.dynadot.com/domain/api-document/index

Registers a new nameserver with its associated IP address.

```APIDOC
## POST /restful/v1/nameservers/register

### Description
Registers a new nameserver with its associated IP address.

### Method
POST

### Endpoint
`/restful/v1/nameservers/register`

### Parameters
#### Request Body
- **name_server** (Object) - Required - The details of the nameserver to register.
  - **server_name** (String) - Required - The name of the nameserver (e.g., ns1.domain.com).
  - **ip** (String) - Required - The IP address of the nameserver (e.g., 127.0.0.1).

### Request Example
```json
{
  "name_server": {
    "server_name": "ns1.example.com",
    "ip": "192.168.1.100"
  }
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Dynadot API Folder Creation Request (JSON)

Source: https://www.dynadot.com/domain/api-document/index

Demonstrates the JSON request body structure for creating a new domain folder via the Dynadot API. Requires the folder name as a string parameter.

```json
{
  "folder_name": "String"
}
```

--------------------------------

### Set Folder Nameservers

Source: https://www.dynadot.com/domain/api-document/index

This code snippet illustrates setting nameservers for a folder via the Dynadot API. It includes the request body structure with a list of nameservers and flags for applying settings to future domains and synchronizing with existing ones. The response details the success status and a list of configured servers.

```JSON
{
  "folder_nameserver_list": [
    "String"
  ],
  "apply_for_future_domain": false,
  "sync_setting_to_existing_domains_in_this_folder": false
}
```

--------------------------------

### Get Closed Auctions API Request

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of closed domain auctions from the Dynadot API. It requires an API key for authorization and accepts JSON format. The response includes details about each closed auction, such as domain name, status, bid price, and end time.

```http
GET https://api.dynadot.com/restful/v1/aftermarket/auctions/closed
Accept:  application/json
Authorization:  Bearer API_KEY
```

--------------------------------

### Dynadot API Folder Creation Response (JSON)

Source: https://www.dynadot.com/domain/api-document/index

Illustrates the JSON response structure for a successful folder creation operation. It includes a status code, message, and data containing the newly created folder's ID and name.

```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "folder_id": 123,
    "folder_name": "TestFolderName"
  }
}
```

--------------------------------

### Add External Nameserver

Source: https://www.dynadot.com/domain/api-document/index

Adds an external nameserver to your account.

```APIDOC
## POST /restful/v1/nameservers/{nameserver}/add_external

### Description
Adds an external nameserver to your account.

### Method
POST

### Endpoint
`/restful/v1/nameservers/{nameserver}/add_external`

### Parameters
#### Path Parameters
- **nameserver** (String) - Required - The name of the external nameserver to add.

### Request Example
```json
{} 
```

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### NAMESERVER_SET_IP Command

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to set the IP addresses for a given nameserver. It requires an X-Signature header for authentication.

```APIDOC
## PUT /restful/v1/nameservers/{nameserver}/set_ip

### Description
Sets the IP addresses for a specified nameserver. This command supports multi-thread and requires an X-Signature in the header.

### Method
PUT

### Endpoint
`/restful/v1/nameservers/{nameserver}/set_ip`

### Parameters
#### Path Parameters
- **nameserver** (string) - Required - The name of the nameserver to update.

#### Query Parameters
None

#### Request Body
- **ip_list** (array of strings) - Required - A list of IP addresses to set for the nameserver.

### Request Example
```json
{
  "ip_list": [
    "192.168.1.1",
    "192.168.1.2"
  ]
}
```

### Response
#### Success Response (200)
- **code** (string) - "200"
- **message** (string) - "Success"
- **data** (object) - Contains the host and server_id.
  - **host** (string) - The name server host.
  - **server_id** (integer) - The server ID.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "host": "ns1.example.com",
    "server_id": 12345
  }
}
```
```

--------------------------------

### PLACE_AUCTION_BID Command

Source: https://www.dynadot.com/domain/api-document/index

Places a bid on a domain auction. This endpoint allows users to bid on domain names available in auctions, with options to set currency, bid amount, and whether to backorder.

```APIDOC
## PLACE_AUCTION_BID Command

### Description
Places a bid on a domain auction. Supports specifying currency, bid amount, and whether to backorder the domain.

### Method
POST (Implied by command structure, actual endpoint not specified)

### Endpoint
(Endpoint not explicitly provided in the text for this command)

### Parameters
#### Request Parameters
- **currency** (String) - Required - The currency to use for the bid. Supported values: usd, gbp, eur, inr, pln, zar, ltl, cny, cad, jpy, nzd, rub, aud, mxn, brl, idr, ars, cop, dkk, rsd, hkd, chf, aed, myr, ngn, kes, czk, btc, nok.
- **bid_amount** (Double) - Required - The amount to bid.
- **is_backorder_auction** (Boolean) - Optional - Whether to backorder the domain.

#### Result Parameters
- **auction_item_details** (Object) - The auction item details.
  - **auction_id** (Integer) - The auction ID.
  - **domain_name** (String) - The domain name.
  - **utf_domain** (String) - The domain name in UTF-8.
  - **is_idn** (Boolean) - Whether the domain is an IDN.
  - **auction_type** (String) - The type of auction. Supported values: expired, user, portfolio, backorder, registrar, registry, registryexpired, premiumuser.
  - **current_bid_price** (String) - The current bid price.
  - **accepted_bid_price** (String) - The accepted bid price.
  - **currency** (String) - The currency of the auction. Supported values: usd, gbp, eur, inr, pln, zar, ltl, cny, cad, jpy, nzd, rub, aud, mxn, brl, idr, ars, cop, dkk, rsd, hkd, chf, aed, myr, ngn, kes, czk, btc, nok.
  - **is_high_bidder** (Boolean) - Whether the user is the high bidder.
  - **bids** (Integer) - The number of bids.
  - **bidders** (Integer) - The number of bidders.
  - **auction_status_id** (Integer) - The auction status ID.
  - **time_left** (String) - The time left in the auction.
  - **start_time** (String) - The start time of the auction.
  - **start_time_stamp** (Long) - The start time of the auction in milliseconds since the epoch.
  - **end_time** (String) - The end time of the auction.
  - **end_time_stamp** (Long) - The end time of the auction in milliseconds since the epoch.
  - **revenue** (String) - The revenue.
  - **visitors** (Long) - The number of visitors.
  - **links** (String) - The links.
  - **age** (Integer) - The age of the domain.
  - **estibot_appraisal** (String) - The Estibot appraisal.
  - **auction_ended** (Boolean) - Whether the auction has ended.
  - **customer_bided** (Boolean) - Whether the customer bided.
```

--------------------------------

### Folder List API

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of all folders associated with the account, including detailed folder properties and default settings.

```APIDOC
## GET /restful/v1/folders

### Description
Retrieves a list of all folders associated with the account, including detailed folder properties and default settings.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/folders

### Parameters
No parameters are required for this request.

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - The message indicating the success of the operation.
- **data** (Object) - Contains the list of folders and their properties.
  - **folder_list** (List) - The list of folders.
    - **folder_id** (String) - The ID of the folder.
    - **folder_name** (String) - The name of the folder.
    - **default_whois_enable_status** (String) - The default whois enable status.
    - **default_registrant_id** (String) - The default registrant ID.
    - **default_admin_id** (String) - The default admin ID.
    - **default_technical_id** (String) - The default technical ID.
    - **default_billing_id** (String) - The default billing ID.
    - **default_name_server_enable_status** (String) - The default name server enable status.
    - **default_name_server_setting** (Object) - The default name server setting.
      - **glue_type** (String) - The type of the nameserver. Supported values: type_null, type_park, type_dns, type_user, type_forward, type_stealth, type_webhost_basic, type_dynasite, type_webhost_advanced, type_free_webhost, type_sitebuilder, type_forsale, type_reseller_storefront, type_park_bot
      - **nameservers** (List) - The nameservers.
        - **server_name** (String, Optional) - The name of the nameserver.
        - **ip_list** (List, Optional) - The IP list of the nameserver.
      - **with_ads** (String) - The status of the ads.
      - **forward_to** (String) - The forward to address.
      - **forward_type** (String) - The forward type.
      - **website_title** (String) - The title of the website.
      - **email_forward_type** (String) - The email forwarding settings. Supported values: mtype_none, mtype_forward, mtype_mx
      - **mail_exchanges** (List) - The mail exchanges.
        - **host** (String, Optional) - Mail host, only used when forward type is mx.
        - **distance** (String, Optional) - Distance is the highest priority, only used when forward type is mx.
      - **email_alias_list** (List) - The email alias list.
        - **username** (String, Optional) - The user name of the email alias, only used when forward type is forward.
        - **to_email** (String, Optional) - The email address of the email alias, only used when forward type is forward.
      - **dns_main_list** (List) - The dns main list.
        - **record_type** (String, Optional) - The type of the record. Supported values: a, cname, forward, aaaa, txt, stealth, mx, email, caa, aname, srv, ns
        - **record_value1** (String, Optional) - The value of the record.
        - **record_value2** (String, Optional) - The second value of the record.
      - **dns_sub_list** (List) - The dns sub list.
        - **sub_host** (String, Optional) - The subhost of the DNS record.
        - **record_type** (String, Optional) - The record type of the DNS record. Supported values: a, cname, forward, aaaa, txt, stealth, mx, email, caa, aname, srv, ns
        - **record_value1** (String, Optional) - The value of the DNS record.
        - **record_value2** (String, Optional) - The second value of the DNS record.
      - **ttl** (String) - The time to live.
    - **default_renew_option_enable_status** (String) - The default renew option enable status.
    - **default_renew_option** (String) - The default renew option.
    - **default_transfer_lock_enable_status** (String) - The default transfer lock enable status.
    - **default_lock_status** (String) - The default lock status.

#### Response Example
{
  "code": "200",
  "message": "Success",
  "data": {
    "folder_list": [
      {
        "folder_id": "123",
        "folder_name": "My Domains",
        "default_whois_enable_status": "enable",
        "default_registrant_id": "reg_abc",
        "default_admin_id": "admin_def",
        "default_technical_id": "tech_ghi",
        "default_billing_id": "bill_jkl",
        "default_name_server_enable_status": "enable",
        "default_name_server_setting": {
          "glue_type": "type_dns",
          "nameservers": [
            {
              "server_name": "ns1.example.com",
              "ip_list": ["192.168.1.1"]
            }
          ],
          "with_ads": "no",
          "forward_to": "",
          "forward_type": "",
          "website_title": "",
          "email_forward_type": "mtype_none",
          "mail_exchanges": [],
          "email_alias_list": [],
          "dns_main_list": [
            {
              "record_type": "a",
              "record_value1": "1.2.3.4"
            }
          ],
          "dns_sub_list": [],
          "ttl": "3600"
        },
        "default_renew_option_enable_status": "enable",
        "default_renew_option": "auto_renew",
        "default_transfer_lock_enable_status": "enable",
        "default_lock_status": "locked"
      }
    ]
  }
}
```

--------------------------------

### DOMAIN_GET_NAMESERVER Command

Source: https://www.dynadot.com/domain/api-document/index

Retrieves the nameserver information for a domain. Supports multi-thread.

```APIDOC
## GET /restful/v1/domains/{domain_name}/nameservers

### Description
Retrieves the list of nameservers configured for a specified domain.

### Method
GET

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/nameservers`

### Headers
- Accept: application/json
- Authorization: Bearer API_KEY

### Response
#### Success Response (200)
- **code** (String) - '200'
- **message** (String) - 'Success'
- **data** (Object)
  - **name_servers** (List) - The list of nameservers for the domain.
    - **host** (String) - The hostname of the nameserver.
    - **ns_name** (String) - The name associated with the nameserver.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "name_servers": [
      {
        "host": "ns1.example.com",
        "ns_name": "Dynadot Parking"
      },
      {
        "host": "ns2.example.com",
        "ns_name": "Dynadot Parking"
      }
    ]
  }
}
```
```

--------------------------------

### Opt-in Fast Transfer

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to opt-in domains for fast transfer to specified platforms.

```APIDOC
## POST /restful/v1/aftermarket/domains/{domain_name}/opt_in_fast_transfer

### Description
Opt-in a domain for fast transfer to a specified platform.

### Method
POST

### Endpoint
`/restful/v1/aftermarket/domains/{domain_name}/opt_in_fast_transfer`

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The name of the domain to opt-in.

#### Request Body
- **action** (String) - Required - The action to perform (confirm, delete).
- **platform_type** (String) - Required - The type of platform (afternic, sedo).

### Request Example
```json
{
  "action": "confirm",
  "platform_type": "afternic"
}
```

### Response
#### Success Response (200)
- **code** (Integer) - Success code.
- **message** (String) - Success message.

#### Response Example
```json
{
  "code": 200,
  "message": "Success"
}
```
```

--------------------------------

### Opt-in for Fast Transfer (RESTful API)

Source: https://www.dynadot.com/domain/api-document/index

This API enables you to opt-in domains for fast transfer to other platforms. It requires specifying the action ('confirm' or 'delete') and the platform type. Authorization with an API key and request integrity via X-Signature are mandatory. The response confirms the action's success or failure.

```json
POST https://api.dynadot.com/restful/v1/aftermarket/domains/{domain_name}/opt_in_fast_transfer
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  * action: "String",
  * platform_type: "String"
}

Response:
{
  * code: "200",
  * message: "Success"
}
```

--------------------------------

### List Coupons

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of available coupons based on specified criteria. Supports multi-thread and API sandbox.

```APIDOC
## GET /orders/coupons

### Description
Retrieves a list of available coupons. This endpoint supports multi-thread and API sandbox environments.

### Method
GET

### Endpoint
https://api.dynadot.com/restful/v1/orders/coupons

### Parameters
#### Query Parameters
- **coupon_type** (String) - Required - The list of coupon types to get. Supported values: `domain`, `renew`, `transfer`, `restore`, `privacy`, `email_webhost`, `vps_webhost`, `ssl`, `sitebuilder`, `sitebuilder_renew`, `email_webhost_domain_bundle`, `vps_webhost_domain_bundle`, `sitebuilder_domain_bundle`, `order_level_discount`, `domain_registration_match`, `domain_bundle`, `drop_catch`, `logo_builder`, `renew_restore`

### Request Example
```json
{
  "coupon_type": "domain"
}
```

### Response
#### Success Response (200)
- **code** (Integer) - The response status code.
- **message** (String) - The response message.
- **data** (Object) - Contains the list of coupons.
  - **coupons** (List) - The list of coupons.
    - **code** (String) - Coupon code.
    - **description** (String) - Coupon description.
    - **coupon_category** (String) - Coupon category. Supported values: `domain_coupons`, `hosting_ssl_coupons`, `bundle_coupons`, `other`
    - **discount_type** (String) - Discount type. Supported values: `sale`, `dollar_amount_off`, `percentage_off`, `use_renew_price`
    - **discount_info** (Object) - Discount information.
      - **USD** (String) - The discount amount in USD.
      - **GBP** (String) - The discount amount in GBP.
      - **EUR** (String) - The discount amount in EUR.
      - **JPY** (String) - The discount amount in JPY.
      - **CAD** (String) - The discount amount in CAD.
      - **CNY** (String) - The discount amount in CNY.
      - **AUD** (String) - The discount amount in AUD.
      - **MXN** (String) - The discount amount in MXN.
      - **BRL** (String) - The discount amount in BRL.
      - **IDR** (String) - The discount amount in IDR.
      - **percentage** (String) - The discount percentage.
    - **restriction** (Object) - Coupon restriction.
      - **price_levels** (List) - The price levels that the coupon is applicable to.
      - **uses_per_account** (Integer) - The number of times a coupon can be used per account.
      - **uses_system_wide** (Integer) - The number of times a coupon can be used system wide.
      - **uses_per_order** (Integer) - The number of times a coupon can be used per order.
      - **uses_per_day** (Integer) - The number of times a coupon can be used per day.
      - **items_per_account** (Integer) - The number of items a coupon can be used on per account.
      - **items_per_order** (Integer) - The number of items a coupon can be used on per order.
      - **items_per_ip** (Integer) - The number of items a coupon can be used on per IP.
      - **domain_duration_min** (Integer) - The minimum domain duration for the coupon.
      - **domain_duration_max** (Integer) - The maximum domain duration for the coupon.
      - **idn_restriction** (String) - The IDN restriction for the coupon.
    - **tlds** (List) - Supported TLDs for the coupon.
    - **start_date** (Long) - Start date of the coupon validity.
    - **end_date** (Long) - End date of the coupon validity.
    - **currencies** (List) - Supported currencies for the coupon.

#### Response Example
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "coupons": [
      {
        "code": "BULK1",
        "description": "Bulk discount for domains",
        "coupon_category": "domain_coupons",
        "discount_type": "percentage_off",
        "discount_info": {
          "percentage": "10.0%"
        },
        "restriction": {
          "price_levels": ["RETAIL", "BULK", "BULK1"],
          "uses_per_account": 1,
          "uses_system_wide": 1,
          "uses_per_order": 1,
          "uses_per_day": 1,
          "items_per_account": 1,
          "items_per_order": 1,
          "items_per_ip": 1,
          "domain_duration_min": 1,
          "domain_duration_max": 1,
          "idn_restriction": "IDN"
        },
        "tlds": ["com", "net", "org"],
        "start_date": 0,
        "end_date": 0,
        "currencies": ["USD", "GBP", "EUR", "INR", "CAD", "CNY", "AUD", "MXN", "BRL", "IDR"]
      }
    ]
  }
}
```
```

--------------------------------

### Add New Lead

Source: https://www.dynadot.com/domain/api-document/index

Adds a new lead for a domain, typically for "buy now" or "make offer" scenarios.

```APIDOC
## POST /restful/v1/aftermarkets/leads

### Description
Adds a new lead for a domain, enabling potential buyers to express interest.

### Method
POST

### Endpoint
`/restful/v1/aftermarkets/leads`

### Parameters
#### Request Body
- **lead_type** (String) - Required - The type of lead to set. Acceptable values: "buy_now", "make_offer".
- **domain_name** (String) - Required - The domain name to add the lead for. Only one domain per request.
- **price** (String) - Required - The price associated with the lead.
- **buyer_name** (String) - Required - The name of the buyer.
- **buyer_email** (String) - Required - The email address of the buyer.

### Request Example
```json
{
  "lead_type": "buy_now",
  "domain_name": "example.com",
  "price": "100.00",
  "buyer_name": "John Doe",
  "buyer_email": "john.doe@email.com"
}
```

### Response
#### Success Response (200)
- **code** (Integer) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": 200,
  "message": "Success"
}
```
```

--------------------------------

### SET_DNS Command API

Source: https://www.dynadot.com/domain/api-document/index

Sets the DNS records for a domain. Supports multi-thread and API sandbox. Requires an X-Signature header.

```APIDOC
## SET_DNS Command

### Description
Sets the DNS records for a domain. This command allows you to manage main DNS records and sub-records, including setting TTL and whether to add DNS to current settings.

### Method
POST (Assumed, as it modifies data)

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/records (Assumed endpoint based on GET /records)

### Path Parameters
- **domain_name** (string) - Required - The name of the domain.

### Headers
- **Accept**: application/json
- **Authorization**: Bearer API_KEY
- **X-Signature**: {signature}

### Request Body
- **dns_main_list** (list) - Optional - List of main DNS records, max 20.
  - **record_type** (string) - Optional - The type of the record. Supported values: a, cname, forward, aaaa, txt, stealth, mx, email, caa, aname, srv, ns
  - **record_value1** (string) - Optional - The value of the record.
  - **record_value2** (string) - Optional - The second value of the record.
- **sub_list** (list) - Optional - List of sub DNS records, max 100.
  - **sub_host** (string) - Optional - The subhost of the DNS record.
  - **record_type** (string) - Optional - The record type of the DNS record. Supported values: a, cname, forward, aaaa, txt, stealth, mx, email, caa, aname, srv, ns
  - **record_value1** (string) - Optional - The value of the record.
  - **record_value2** (string) - Optional - The second value of the record.
- **ttl** (long) - Optional - Time to live for DNS records, default is 86400.
- **add_dns_to_current_setting** (boolean) - Optional - Add DNS records to current settings, default is false.

### Request Example
```json
{
  "dns_main_list": [
    {
      "record_type": "A",
      "record_value1": "192.168.1.1"
    }
  ],
  "sub_list": [
    {
      "sub_host": "www",
      "record_type": "CNAME",
      "record_value1": "example.com"
    }
  ],
  "ttl": 3600,
  "add_dns_to_current_setting": true
}
```

### Response
#### Success Response (200)
(The provided text does not detail the success response structure for SET_DNS. Typically, it would confirm the update or return new DNS record details.)

#### Response Example
(Not provided in the source text.)
```

--------------------------------

### PUT /restful/v1/accounts/default_nameservers

Source: https://www.dynadot.com/domain/api-document/index

Set the default nameservers for your account. This endpoint allows you to specify a list of nameservers that will be used as the default for your domains.

```APIDOC
## PUT /restful/v1/accounts/default_nameservers

### Description
Sets the default nameservers for your account. You can provide a list of nameserver objects, each with a server name.

### Method
PUT

### Endpoint
/restful/v1/accounts/default_nameservers

### Parameters
#### Request Body
- **nameserver_list** (List) - Required - The list of nameservers you want to set.
  - **server_name** (String) - Required - The name of the nameserver.
  - **ip_list** (List) - Required - The IP list of the nameserver.

### Request Example
```json
{
  "nameserver_list": [
    {
      "server_name": "ns1.example.com",
      "ip_list": ["192.168.1.1"]
    }
  ]
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code, '200' for success.
- **message** (String) - A success message.
- **data** (Object) - Contains the list of nameservers.
  - **name_servers** (List) - The list of nameserver objects.
    - **server_name** (String) - The name of the nameserver.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "name_servers": [
      {
        "server_name": "ns1.example.com"
      },
      {
        "server_name": "ns2.example.com"
      }
    ]
  }
}
```
```

--------------------------------

### Set Folder Parking Configuration

Source: https://www.dynadot.com/domain/api-document/index

Configures the parking settings for a domain folder, including whether to display advertisements.

```APIDOC
## PUT /restful/v1/folders/{folder_name}/parking

### Description
Configures the parking settings for a domain folder. This includes options to display advertisements on the parking page and apply the settings to future or existing domains within the folder.

### Method
PUT

### Endpoint
/restful/v1/folders/{folder_name}/parking

### Parameters
#### Path Parameters
- **folder_name** (string) - Required - The name of the folder to configure.

#### Request Body
- **with_ads** (boolean) - Optional - Determines whether to display advertisements on the parking page. Defaults to 'false'.
- **apply_for_future_domain** (boolean) - Optional - Apply this setting to domains that will be moved to this folder in the future.
- **sync_setting_to_existing_domains_in_this_folder** (boolean) - Optional - Synchronize the settings of all domains in this folder.

### Request Example
```json
{
  "with_ads": true,
  "apply_for_future_domain": true,
  "sync_setting_to_existing_domains_in_this_folder": true
}
```

### Response
#### Success Response (200)
- **code** (string) - The response code, "200" for success.
- **message** (string) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### NAMESERVER_DELETE Command

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to delete a nameserver. It requires an X-Signature header for authentication.

```APIDOC
## DELETE /restful/v1/nameservers/{nameserver}

### Description
Deletes a specified nameserver. This command supports multi-thread and requires an X-Signature in the header.

### Method
DELETE

### Endpoint
`/restful/v1/nameservers/{nameserver}`

### Parameters
#### Path Parameters
- **nameserver** (string) - Required - The name of the nameserver to delete.

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **code** (string) - "200"
- **message** (string) - "Success"

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### POST /domains/{domain_name}/push

Source: https://www.dynadot.com/domain/api-document/index

Initiates a domain push to another Dynadot user.

```APIDOC
## POST /domains/{domain_name}/push

### Description
Initiates a domain push to another Dynadot user. Requires a signature in the header.

### Method
POST

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/push

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to push.

#### Query Parameters
None

#### Request Body
- **receiver_push_username** (string) - Required - The username of the recipient.
- **receiver_email** (string) - Optional - The email address of the recipient.

### Request Example
```json
{
  "receiver_push_username": "recipient_username",
  "receiver_email": "recipient@example.com"
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code of the response.
- **message** (string) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Upgrade Site Builder

Source: https://www.dynadot.com/domain/api-document/index

Upgrades an existing site builder for a specified domain. Allows changing the plan or template.

```APIDOC
## POST /restful/v1/sitebuilders/{domain_name}/upgrade

### Description
Upgrades an existing site builder for a specified domain, allowing for plan or template changes.

### Method
POST

### Endpoint
https://api.dynadot.com/restful/v1/sitebuilders/{domain_name}/upgrade

### Headers
- Content-Type: application/json
- Accept: application/json
- Authorization: Bearer API_KEY
- X-Signature: {signature}

### Path Parameters
- **domain_name** (String) - Required - The name of the domain whose site builder is to be upgraded.

### Request Body
- **set_domain_dns** (Boolean) - Optional - Whether to set the domain's DNS to the site builder's DNS.

### Request Example
```json
{
  "set_domain_dns": false
}
```

### Response
#### Success Response (200)
- **code** (String) - "200"
- **message** (String) - "Success"
- **data** (Object)
  - **sitebuilder** (Object)
    - **domain_name** (String) - The name server of the domain.
    - **template** (String) - The template used for the site builder.
    - **plan** (String) - The plan for the site builder (e.g., "Free", "Basic").
    - **is_published** (Boolean) - Indicates if the site builder has been published.
    - **last_update** (Long) - The timestamp of the last update.
    - **expiration** (Long) - The expiration timestamp for the site builder.
    - **site_url** (String) - The URL of the published site builder.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "sitebuilder": {
      "domain_name": "example.com",
      "template": "Meridian",
      "plan": "Free",
      "is_published": "true",
      "last_update": 0,
      "expiration": 0,
      "site_url": "https://sitebuilder1.example.com"
    }
  }
}
```

#### Error Response (Integer)
- **code** (Integer) - The error code.
- **message** (String) - A description of the error.
- **data** (Object)
  - **sitebuilder** (Object)
    - **domain_name** (String)
    - **template** (String)
    - **plan** (String)
    - **is_published** (String)
    - **last_update** (Long)
    - **expiration** (Long)
    - **site_url** (String)
```

--------------------------------

### Set Folder Hosting

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to set the hosting type for a specific folder. Supported hosting types are 'basic' and 'advanced'.

```APIDOC
## PUT /restful/v1/folders/{folder_name}/hosts

### Description
Sets the hosting type for a specific folder. Supported values are 'basic' and 'advanced'.

### Method
PUT

### Endpoint
`/restful/v1/folders/{folder_name}/hosts`

### Parameters
#### Path Parameters
- **folder_name** (String) - Required - The name of the folder to update.

#### Request Body
- **hosting_type** (String) - Required - The hosting type of the folder. Supported values: "basic", "advanced".
- **apply_for_future_domain** (Boolean) - Optional - Apply this setting to domains that will be moved to this folder in the future.
- **sync_setting_to_existing_domains_in_this_folder** (Boolean) - Optional - Synchronize the settings of all domains in this folder.

### Request Example
```json
{
  "hosting_type": "basic",
  "apply_for_future_domain": false,
  "sync_setting_to_existing_domains_in_this_folder": false
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code, "200" for success.
- **message** (String) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### SET_CONTACTS Command

Source: https://www.dynadot.com/domain/api-document/index

Allows you to set the contact information for a domain. Supports multi-thread and requires X-Signature.

```APIDOC
## PUT /restful/v1/domains/{domain_name}/contacts

### Description
Sets the registrant, admin, technical, and billing contact IDs for a specified domain.

### Method
PUT

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/contacts`

### Headers
- Content-Type: application/json
- Accept: application/json
- Authorization: Bearer API_KEY
- X-Signature: {signature}

### Request Body
- **registrant_contact_id** (Integer) - Required - The contact ID to set as the registered contact.
- **admin_contact_id** (Integer) - Required - The contact ID to set as the admin contact.
- **technical_contact_id** (Integer) - Required - The contact ID to set as the technical contact.
- **billing_contact_id** (Integer) - Required - The contact ID to set as the billing contact.

### Request Example
```json
{
  "registrant_contact_id": 12345,
  "admin_contact_id": 67890,
  "technical_contact_id": 13579,
  "billing_contact_id": 24680
}
```

### Response
#### Success Response (200)
- **code** (String) - '200'
- **message** (String) - 'Success'

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### POST /restful/v1/aftermarket/auctions/bids/{domain_name}

Source: https://www.dynadot.com/domain/api-document/index

Place a bid on an aftermarket auction for a specific domain.

```APIDOC
## POST /restful/v1/aftermarket/auctions/bids/{domain_name}

### Description
Place a bid on an aftermarket auction for a specific domain. This endpoint allows users to submit bids with specified currency and bid amount, and optionally indicate if it's a backorder auction.

### Method
POST

### Endpoint
`https://api.dynadot.com/restful/v1/aftermarket/auctions/bids/{domain_name}`

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The name of the domain for which to place a bid.

#### Query Parameters
None

#### Request Body
- **currency** (String) - Required - The currency for the bid (e.g., "USD", "EUR").
- **bid_amount** (Integer) - Required - The amount to bid.
- **is_backorder_auction** (Boolean) - Optional - `true` if this is a backorder auction, `false` otherwise.

### Request Example
```json
{
  "currency": "USD",
  "bid_amount": 100,
  "is_backorder_auction": false
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code, expected to be "200" for success.
- **message** (String) - A success message, typically "Success".

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### SET_NAMESERVERS Command

Source: https://www.dynadot.com/domain/api-document/index

Allows you to update the nameservers for a specified domain.

```APIDOC
## PUT /restful/v1/domains/{domain_name}/nameservers

### Description
Updates the nameservers for a given domain.

### Method
PUT

### Endpoint
`/restful/v1/domains/{domain_name}/nameservers`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to update.

#### Headers
- **Content-Type**: `application/json`
- **Accept**: `application/json`
- **Authorization**: `Bearer API_KEY`
- **X-Signature**: `{signature}`

#### Request Body
- **nameserver_list** (array of strings) - Required - A list of nameservers.

### Request Example
```json
{
  "nameserver_list": [
    "ns1.example.com",
    "ns2.example.com"
  ]
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code, "200" for success.
- **message** (string) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### POST /api/dynadot_domain_api-document/aftermarket/backorders/requests/{domain_name}

Source: https://www.dynadot.com/domain/api-document/index

Adds a backorder request for a specific domain. This allows you to initiate a backorder for a domain name.

```APIDOC
## POST /api/dynadot_domain_api-document/aftermarket/backorders/requests/{domain_name}

### Description
Adds a backorder request for a specified domain name.

### Method
POST

### Endpoint
https://api.dynadot.com/restful/v1/aftermarket/backorders/requests/{domain_name}

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The name of the domain for which to place a backorder.

#### Headers
- **Content-Type**: application/json
- **Accept**: application/json
- **Authorization**: Bearer API_KEY
- **X-Signature**: {signature}

### Request Body
* The request body can be empty for this endpoint.

### Response
#### Success Response (200)
- **code** (String) - "200"
- **message** (String) - "Success"

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Set Default Hosting API

Source: https://www.dynadot.com/domain/api-document/index

Sets the default hosting type for your account, choosing between 'basic' and 'advanced'.

```APIDOC
## PUT /accounts/default_hosts

### Description
Sets the default hosting type for your account. Supported values are 'basic' and 'advanced'.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/accounts/default_hosts

### Parameters
#### Request Body
- **hosting_type** (string) - Required - The default hosting type to set. Supported values: basic, advanced.

### Request Example
```json
{
  "hosting_type": "basic"
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code of the response.
- **message** (string) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### POST /restful/v1/contacts

Source: https://www.dynadot.com/domain/api-document/index

Creates a new contact with the provided details. It supports multi-thread and API sandbox environments, and requires an X-Signature in the header.

```APIDOC
## POST /restful/v1/contacts

### Description
Creates a new contact with the provided details. It supports multi-thread and API sandbox environments, and requires an X-Signature in the header.

### Method
POST

### Endpoint
https://api.dynadot.com/restful/v1/contacts

### Parameters
#### Request Body
- **contact** (Object) - Required - The contact object containing details.
  - **organization** (String) - Optional - The organization name.
  - **name** (String) - Required - The name of the contact owner.
  - **email** (String) - Required - The email address.
  - **phone_number** (String) - Required - The phone number.
  - **phone_cc** (String) - Required - The phone country code.
  - **fax_number** (String) - Optional - The fax number.
  - **fax_cc** (String) - Optional - The fax country code.
  - **address1** (String) - Required - The first line of the address.
  - **address2** (String) - Optional - The second line of the address.
  - **city** (String) - Required - The city.
  - **state** (String) - Optional - The state.
  - **zip** (String) - Required - The zip code.
  - **country** (String) - Required - The country.

### Request Example
```json
{
  "contact": {
    "organization": "test org",
    "name": "test name",
    "email": "test@email.com",
    "phone_number": "0123456789",
    "phone_cc": "1",
    "fax_number": "0123456789",
    "fax_cc": "1",
    "address1": "test address1",
    "address2": "test address1",
    "city": "test city",
    "state": "test state",
    "zip": "test zip",
    "country": "test country"
  }
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code, "200" for success.
- **message** (String) - The response message, "Success" for success.
- **data** (Object)
  - **contact_id** (Integer) - The ID of the newly created contact.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "contact_id": 12345
  }
}
```
```

--------------------------------

### Domain Pricing API

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of available TLDs (Top-Level Domains) along with their pricing and other details. Supports sorting and filtering.

```APIDOC
## GET /api/domains/pricing

### Description
Retrieves a list of TLDs with pricing information, including registration and renewal costs, grace periods, and sale status.

### Method
GET

### Endpoint
/api/domains/pricing

### Parameters
#### Query Parameters
- **sort** (String) - Optional - The field to sort the results by (e.g., NAME_ASC).
- **price_level** (String) - Optional - Filters results by a specific price level (e.g., Bulk).
- **currency** (String) - Optional - Filters results by currency (e.g., USD).
- **show_multi_year_price** (String) - Optional - Whether to show multi-year pricing ('Yes' or 'No').

### Request Example
```json
{
  "query": {
    "sort": "NAME_ASC",
    "price_level": "Bulk",
    "currency": "USD",
    "show_multi_year_price": "Yes"
  }
}
```

### Response
#### Success Response (200)
- **code** (String) - "200"
- **message** (String) - "Success"
- **data** (Object) - Contains the pricing details.
  - **page_index** (Integer) - The current page number.
  - **count_per_page** (Integer) - The number of items per page.
  - **sort** (String) - The applied sort order.
  - **price_level** (String) - The applied price level.
  - **currency** (String) - The applied currency.
  - **show_multi_year_price** (String) - Indicates if multi-year pricing is shown.
  - **tldPriceList** (Array) - A list of TLD pricing objects.
    - **tld** (String) - The Top-Level Domain.
    - **usage** (String) - The usage category of the TLD.
    - **priceUnit** (String) - The unit for pricing (e.g., "Price/1 year").
    - **allYearsRegisterPrice** (Array) - Pricing for all registration years.
    - **allYearsRenewPrice** (Array) - Pricing for all renewal years.
    - **transferPrice** (String) - Price for domain transfer.
    - **restorePrice** (String) - Price for domain restoration.
    - **graceFeePrice** (String) - Price for grace period fees.
    - **supportPrivacy** (String) - Indicates if privacy protection is supported.
    - **gracePeriodUnit** (String) - Unit for grace period (e.g., "Grace Period/days").
    - **renewGracePeriod** (String) - Duration of the renewal grace period.
    - **restorePeriod** (String) - Duration of the restore period.
    - **deleteGracePeriod** (String) - Duration of the delete grace period.
    - **isIdn** (String) - Indicates if the TLD supports IDNs.
    - **restriction** (String) - Any restrictions on the TLD.
    - **onSale** (String) - Indicates if the TLD is on sale.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "page_index": 1,
    "count_per_page": 10,
    "sort": "NAME_ASC",
    "price_level": "Bulk",
    "currency": "USD",
    "show_multi_year_price": "Yes",
    "tldPriceList": [
      {
        "tld": "com",
        "usage": "COM",
        "priceUnit": "(Price/1 year)",
        "allYearsRegisterPrice": [],
        "allYearsRenewPrice": [],
        "transferPrice": "--",
        "restorePrice": "--",
        "graceFeePrice": "--",
        "supportPrivacy": "Yes",
        "gracePeriodUnit": "(Grace Period/days)",
        "renewGracePeriod": "0-20 (variable)",
        "restorePeriod": "0-20 (variable)",
        "deleteGracePeriod": "0-20 (variable)",
        "isIdn": "Yes",
        "restriction": "--",
        "onSale": "Yes"
      }
    ]
  }
}
```
```

--------------------------------

### Set Domain for Sale (RESTful API)

Source: https://www.dynadot.com/domain/api-document/index

This API allows you to set a domain name for sale on Dynadot's aftermarket. You can specify the listing type, price, category, and other details. It requires an API key for authorization and a signature for request integrity. The response indicates success or failure with a status code and message.

```json
PUT https://api.dynadot.com/restful/v1/aftermarkets/domains/{domain_name}/for_sales
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  * for_sale_type: "String",
  * currency: "String",
  * listing_type: "String",
  * price: "String",
  * minimum_offer_price: "String",
  * installment: "String",
  * maximum_installments: 0,
  * category: "String",
  * sub_category: "String",
  * description: "String",
  * allow_seo_index: false
}

Response:
{
  * code: "200",
  * message: "Success"
}
```

--------------------------------

### API Versioning and Change Log

Source: https://www.dynadot.com/domain/api-document/index

Information about the Dynadot API's versioning system and a history of changes.

```APIDOC
## API Versioning

Our API is currently in version **v2.0.0**.

Version codes follow the Semantic Versioning (SemVer) format: `<Major><Minor><Patch>`

- **Major Version**: Represents significant changes that may break backward compatibility (e.g., v1.0.0 to v2.0.0).
- **Minor Version**: Indicates backward-compatible feature additions (e.g., v1.0.0 to v1.1.0).
- **Patch Version**: Refers to backward-compatible bug fixes or minor improvements (e.g., v1.0.0 to v1.0.1).

## API Change Log History

**v2.0.0 (October 9, 2025)**
### New Features & Key Changes
- **Sandbox Environment**: Now live for safe testing and integration validation.
- **Mandatory X-Signature Header**: Enforced for all sensitive API commands for enhanced security.
- **(Optional) Machine-Readable API Documentation**: Support for structured, machine-readable documentation.
- **Search Access Restricted**: Access to certain search-related endpoints has been restricted.
- **IP Whitelisting Optimized**: Reseller accounts no longer required to enter at least 1 IP for API access (RESTful API only).
### API Documentation Improvements
- Updated version selector on the documentation landing page.
- Unified casing conventions across parameter names.
- Expanded documentation for the `bulk_search` endpoint.
- Added feature to hide/show side navigation.
### Paging Parameters Introduced
- `page` (integer, required): Specifies the current page index, starting from 1.
- `page_size` (integer, required): Defines the number of items returned per page.

**v1.0.0 (March 15, 2025)**
### Overview
- Introduces a RESTful interface with predictable resource-oriented URLs.
- Supports standard HTTP methods and authentication.
- Returns responses in both JSON and XML formats.
- Processes a single object or action per request (bulk updates not supported).
### Core Functionalities
- Domain registration, transfer, and renewal.
- DNS settings management.
- Account order viewing and updating.
- Access to functionalities for aftermarket, site builder, email hosting, and more.
```

--------------------------------

### Set Default Parking API

Source: https://www.dynadot.com/domain/api-document/index

Configures the default parking page settings for your account, with an option to disable ads.

```APIDOC
## PUT /accounts/default_parking

### Description
Sets the default parking page for your account. You can choose whether or not to display third-party ads.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/accounts/default_parking

### Parameters
#### Request Body
- **with_ads** (boolean) - Optional - If false, third-party ads will not be displayed on the parking page.

### Request Example
```json
{
  "with_ads": false
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code of the response.
- **message** (string) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### SET_PARKING Command

Source: https://www.dynadot.com/domain/api-document/index

Enables or disables domain parking, with an option to include or exclude third-party ads.

```APIDOC
## PUT /restful/v1/domains/{domain_name}/parking

### Description
Sets the domain parking status. You can choose to include or exclude third-party ads.

### Method
PUT

### Endpoint
`/restful/v1/domains/{domain_name}/parking`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to park.

#### Headers
- **Content-Type**: `application/json`
- **Accept**: `application/json`
- **Authorization**: `Bearer API_KEY`
- **X-Signature**: `{signature}`

#### Request Body
- **with_ads** (boolean) - Optional - Set to `false` if you do not want third-party ads.

### Request Example
```json
{
  "with_ads": false
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code, "200" for success.
- **message** (string) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Add External Nameserver (NAMESERVER_ADD_EXTERNAL)

Source: https://www.dynadot.com/domain/api-document/index

Adds an external nameserver to your account. This API call is designed for multi-threaded execution and supports the API sandbox environment. It requires an X-Signature header for authentication.

```JSON
POST https://api.dynadot.com/restful/v1/nameservers/{nameserver}/add_external
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
```

--------------------------------

### Set For Sale

Source: https://www.dynadot.com/domain/api-document/index

Sets a domain to be for sale on the marketplace or in an auction.

```APIDOC
## POST /restful/v1/domains/set_for_sale

### Description
Sets a domain to be for sale on the marketplace or in an auction.

### Method
POST

### Endpoint
`/restful/v1/domains/set_for_sale`

### Parameters
#### Request Body
- **for_sale_type** (String) - Required - The type of sale for the domain. Supported values: "not_for_sale", "marketplace", "auction", "portfolio_auction".
- **currency** (String) - Optional - The currency for the sale. Supported values: "usd", "gbp", "eur", "inr", "pln", "zar", "ltl", "cny", "cad", "jpy", "nzd", "rub", "aud", "mxn", "brl", "idr", "ars", "cop", "dkk", "rsd", "hkd", "chf", "aed", "myr", "ngn", "kes", "czk", "btc", "nok".
- **listing_type** (String) - Optional - The type of listing (e.g., fixed price, auction).

### Request Example
```json
{
  "for_sale_type": "marketplace",
  "currency": "usd"
}
```

### Response
#### Success Response (200)
- **code** (Integer) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": 200,
  "message": "Success"
}
```
```

--------------------------------

### FOLDER_SET_DNS Command

Source: https://www.dynadot.com/domain/api-document/index

Configures DNS main-records for a folder. Supports various record types.

```APIDOC
## FOLDER_SET_DNS Command

### Description
Configures DNS main-records for a folder. Supports various record types.

### Method
POST (Implied by command structure, actual endpoint not provided)

### Endpoint
(Endpoint not explicitly provided in text)

### Parameters
#### Request Body (Implied)
- **dns_main_list** (List) - Required - The DNS main-records to configure.
  - **record_type** (String) - Optional - The type of the record. Supported values: a, cname, forward, aaaa, txt, stealth, mx, email, caa, aname, srv, ns.
  - **record_value1** (String) - Optional - The value of the record.
  - **record_value2** (String) - Optional - The second value of the record (used for specific record types like MX).

### Response
(Response structure not detailed in the provided text)
```

--------------------------------

### Domain Registration API

Source: https://www.dynadot.com/domain/api-document/index

Allows for the registration of new domain names with various contact and privacy options.

```APIDOC
## POST /domains/{domain_name}/register

### Description
Registers a new domain name. This endpoint supports multi-thread operations and a sandbox environment. It requires an X-Signature header for authentication.

### Method
POST

### Endpoint
`/domains/{domain_name}/register`

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The domain name to register.

#### Query Parameters
- **currency** (String) - Optional - The currency for the transaction. Supported values: `usd`, `gbp`, `eur`, `inr`, `pln`, `zar`, `ltl`, `cny`, `cad`, `jpy`, `nzd`, `rub`, `aud`, `mxn`, `brl`, `idr`, `ars`, `cop`, `dkk`, `rsd`, `hkd`, `chf`, `aed`, `myr`, `ngn`, `kes`, `czk`, `btc`, `nok`.
- **register_premium** (Boolean) - Optional - Set to `true` if registering a premium domain.
- **coupon_code** (String) - Optional - A coupon code to apply to the order.

#### Request Body
- **domain** (Object) - Required
  - **duration** (Integer) - Required - The registration duration in years.
  - **auth_code** (String) - Optional - The authorization code, used for domain transfers.
  - **registrant_contact_id** (Integer) - Optional - The ID of the pre-defined registrant contact.
  - **admin_contact_id** (Integer) - Optional - The ID of the pre-defined administrative contact.
  - **tech_contact_id** (Integer) - Optional - The ID of the pre-defined technical contact.
  - **billing_contact_id** (Integer) - Optional - The ID of the pre-defined billing contact.
  - **registrant_contact** (Object) - Optional - Details for the registrant contact.
    - **organization** (String) - Required
    - **name** (String) - Required
    - **email** (String) - Required
    - **phone_number** (String) - Required
    - **phone_cc** (String) - Required
    - **fax_number** (String) - Optional
    - **fax_cc** (String) - Optional
    - **address1** (String) - Required
    - **address2** (String) - Optional
    - **city** (String) - Required
    - **state** (String) - Required
    - **zip** (String) - Required
    - **country** (String) - Required
  - **admin_contact** (Object) - Optional - Details for the administrative contact (same structure as registrant_contact).
  - **tech_contact** (Object) - Optional - Details for the technical contact (same structure as registrant_contact).
  - **billing_contact** (Object) - Optional - Details for the billing contact (same structure as registrant_contact).
  - **customer_id** (Integer) - Optional - A customer ID for resellers.
  - **name_server_list** (Array of Strings) - Optional - A list of custom name servers.
  - **privacy** (String) - Required - Privacy setting. Supported values: `off`, `partial`, `full`.

### Request Example
```json
{
  "domain": {
    "duration": 1,
    "registrant_contact": {
      "organization": "Example Corp",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone_number": "1234567890",
      "phone_cc": "1",
      "address1": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zip": "90210",
      "country": "USA"
    },
    "privacy": "full"
  },
  "currency": "usd"
}
```

### Response
#### Success Response (200)
- **domain_name** (String) - The registered domain name.
- **expiration_date** (Long) - The expiration date in Unix timestamp format.

#### Response Example
```json
{
  "domain_name": "example.com",
  "expiration_date": 1678886400
}
```
```

--------------------------------

### Transfer In Domain API Request

Source: https://www.dynadot.com/domain/api-document/index

This snippet demonstrates the structure for initiating a domain transfer into Dynadot. It requires domain details, contact information for registrant, admin, tech, and billing, along with optional customer ID and name server list. The request specifies the domain name in the URL and includes authentication headers.

```JSON
{
  "domain": {
    "duration": 0,
    "auth_code": "String",
    "registrant_contact_id": 0,
    "admin_contact_id": 0,
    "tech_contact_id": 0,
    "billing_contact_id": 0,
    "registrant_contact": {
      "organization": "String",
      "name": "String",
      "email": "String",
      "phone_number": "String",
      "phone_cc": "String",
      "fax_number": "String",
      "fax_cc": "String",
      "address1": "String",
      "address2": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "country": "String"
    },
    "admin_contact": {
      "organization": "String",
      "name": "String",
      "email": "String",
      "phone_number": "String",
      "phone_cc": "String",
      "fax_number": "String",
      "fax_cc": "String",
      "address1": "String",
      "address2": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "country": "String"
    },
    "tech_contact": {
      "organization": "String",
      "name": "String",
      "email": "String",
      "phone_number": "String",
      "phone_cc": "String",
      "fax_number": "String",
      "fax_cc": "String",
      "address1": "String",
      "address2": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "country": "String"
    },
    "billing_contact": {
      "organization": "String",
      "name": "String",
      "email": "String",
      "phone_number": "String",
      "phone_cc": "String",
      "fax_number": "String",
      "fax_cc": "String",
      "address1": "String",
      "address2": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "country": "String"
    },
    "customer_id": 0,
    "name_server_list": [
      "String"
    ],
    "privacy": "String"
  },
  "currency": "String",
  "transfer_premium": false,
  "coupon_code": "String"
}
```

--------------------------------

### List Site Builders

Source: https://www.dynadot.com/domain/api-document/index

Retrieves a list of all site builders associated with the account.

```APIDOC
## GET /restful/v1/sitebuilders

### Description
Retrieves a list of all site builders configured for the user's account, providing a summary of each.

### Method
GET

### Endpoint
/restful/v1/sitebuilders

### Parameters
#### Request Headers
- **Authorization** (String) - Required - Bearer token for authentication (e.g., "Bearer API_KEY").
- **X-Signature** (String) - Required - Signature for request verification.
- **Accept** (String) - Optional - Specifies the desired response format (e.g., "application/json").

### Response
#### Success Response (200)
- **code** (String) - "200"
- **message** (String) - "Success"
- **data** (Object)
  - **sitebuilder_list** (Array) - A list of site builder summary objects.
    - **domain_name** (String) - The domain name associated with the site builder.
    - **template** (String) - The template used for the site builder.
    - **plan** (String) - The plan level of the site builder (e.g., "Free", "Basic").
    - **is_published** (Boolean) - Indicates if the site builder has been published.
    - **last_update** (Long) - Timestamp of the last update.
    - **expiration** (Long) - Timestamp of the site builder's expiration.
    - **site_url** (String) - The URL of the published site builder.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "sitebuilder_list": [
      {
        "domain_name": "example.com",
        "template": "Meridian",
        "plan": "Free",
        "is_published": true,
        "last_update": 1678886400,
        "expiration": 1709990400,
        "site_url": "https://sitebuilder1.example.com"
      },
      {
        "domain_name": "anothersite.net",
        "template": "Skyline",
        "plan": "Pro",
        "is_published": false,
        "last_update": 1678886400,
        "expiration": 1709990400,
        "site_url": "https://sitebuilder2.anothersite.net"
      }
    ]
  }
}
```
```

--------------------------------

### Dynadot API Folder DNS Setting Request Body (JSON)

Source: https://www.dynadot.com/domain/api-document/index

Illustrates the JSON structure for setting DNS records within a folder. It includes a list of DNS records, each with a type and value.

```json
{
  "dns_main_list": [
    {
      "record_type": "String",
      "record_value1": "String",
      "record_value2": "String"
    }
  ]
}
```

--------------------------------

### Dynadot API REGISTER Command Request Body Structure

Source: https://www.dynadot.com/domain/api-document/index

This JSON structure represents the request body for the Dynadot API's REGISTER command. It includes all necessary parameters for domain registration, such as domain details, contact information for registrant, admin, tech, and billing, as well as optional parameters like currency and coupon codes.

```JSON
{
  "domain": {
    "duration": 0,
    "auth_code": "String",
    "registrant_contact_id": 0,
    "admin_contact_id": 0,
    "tech_contact_id": 0,
    "billing_contact_id": 0,
    "registrant_contact": {
      "organization": "String",
      "name": "String",
      "email": "String",
      "phone_number": "String",
      "phone_cc": "String",
      "fax_number": "String",
      "fax_cc": "String",
      "address1": "String",
      "address2": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "country": "String"
    },
    "admin_contact": {
      "organization": "String",
      "name": "String",
      "email": "String",
      "phone_number": "String",
      "phone_cc": "String",
      "fax_number": "String",
      "fax_cc": "String",
      "address1": "String",
      "address2": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "country": "String"
    },
    "tech_contact": {
      "organization": "String",
      "name": "String",
      "email": "String",
      "phone_number": "String",
      "phone_cc": "String",
      "fax_number": "String",
      "fax_cc": "String",
      "address1": "String",
      "address2": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "country": "String"
    },
    "billing_contact": {
      "organization": "String",
      "name": "String",
      "email": "String",
      "phone_number": "String",
      "phone_cc": "String",
      "fax_number": "String",
      "fax_cc": "String",
      "address1": "String",
      "address2": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "country": "String"
    },
    "customer_id": 0,
    "name_server_list": [
      "String"
    ],
    "privacy": "String"
  },
  "currency": "String",
  "register_premium": true,
  "coupon_code": "String"
}
```

--------------------------------

### Set Domain Forwarding Configuration (API)

Source: https://www.dynadot.com/domain/api-document/index

Configure domain forwarding for a folder. This allows setting a destination URL and specifying whether the forwarding is temporary or permanent. The request body is sent as JSON.

```JSON
{
  "forward_url": "String",
  "is_temporary": false,
  "apply_for_future_domain": false,
  "sync_setting_to_existing_domains_in_this_folder": false
}
```

--------------------------------

### PUT /restful/v1/folders/{folder_name}/nameservers

Source: https://www.dynadot.com/domain/api-document/index

Sets the nameservers for a specified folder. This allows you to define the authoritative nameservers for domains within that folder.

```APIDOC
## PUT /restful/v1/folders/{folder_name}/nameservers

### Description
Sets the nameservers for a specified folder. This allows you to define the authoritative nameservers for domains within that folder.

### Method
PUT

### Endpoint
/restful/v1/folders/{folder_name}/nameservers

### Parameters
#### Path Parameters
- **folder_name** (string) - Required - The name of the folder for which to set nameservers.

#### Request Body
- **folder_nameserver_list** (array) - Required - A list of nameserver strings to configure.
- **apply_for_future_domain** (boolean) - Optional - Apply this setting to domains that will be moved to this folder in the future.
- **sync_setting_to_existing_domains_in_this_folder** (boolean) - Optional - Synchronize the settings of all domains in this folder.

### Request Example
```json
{
  "folder_nameserver_list": [
    "ns1.example.com",
    "ns2.example.com"
  ],
  "apply_for_future_domain": false,
  "sync_setting_to_existing_domains_in_this_folder": false
}
```

### Response
#### Success Response (200)
- **code** (string) - The response code, "200" indicates success.
- **message** (string) - A message indicating the result of the operation.
- **data** (object) - Contains the list of configured servers.
  - **servers** (array) - A list of configured server objects.
    - **server_name** (string) - The name of the nameserver.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "servers": [
      {
        "server_name": "ns1.example.com"
      },
      {
        "server_name": "ns2.example.com"
      }
    ]
  }
}
```
```

--------------------------------

### Create Sitebuilder Request Body

Source: https://www.dynadot.com/domain/api-document/index

JSON payload for the create_site_builder API command. Specifies whether to set the domain's DNS to the site builder's DNS. Defaults to false if not provided.

```json
{
  "set_domain_dns": false
}
```

--------------------------------

### SET_DNSSEC Command

Source: https://www.dynadot.com/domain/api-document/index

Configures DNSSEC settings for a domain, including algorithm, flags, and public key.

```APIDOC
## PUT /restful/v1/domains/{domain_name}/dnssec

### Description
Configures the DNSSEC settings for a domain.

### Method
PUT

### Endpoint
`/restful/v1/domains/{domain_name}/dnssec`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to configure.

#### Headers
- **Content-Type**: `application/json`
- **Accept**: `application/json`
- **Authorization**: `Bearer API_KEY`
- **X-Signature**: `{signature}`

#### Request Body
- **key_tag** (integer) - Optional - The key tag for the DNSSEC key pair (0 - 65535).
- **digest_type** (string) - Optional - The type of digest. Supported values: `sha1`, `sha256`, `gost`, `sha384`.
- **digest** (string) - Optional - The digest value corresponding to the selected `digest_type`.
- **algorithm** (string) - Required - The type of algorithm. Supported values: `rsa_md5`, `diffie_hellman`, `dsa_sha1`, `elliptic_curve`, `rsa_sha1`, `dsa_nsec3_sha1`, `rsa_sha1_nsec3_sha1`, `rsa_sha256`, `rsa_sha512`, `gost`, `ecdsa_p256_sha256`, `ecdsa_p384_sha384`, `ed25519`, `ed448`, `indirect`, `private_dns`, `private_oid`.
- **flags** (string) - Optional - The type of flags. Supported values: `zsk`, `ksk`.
- **public_key** (string) - Optional - The public key in Base64 encoding.

### Request Example
```json
{
  "key_tag": 12345,
  "digest_type": "sha256",
  "digest": "exampledigest",
  "algorithm": "rsa_sha256",
  "flags": "ksk",
  "public_key": "BASE64ENCODEDPUBLICKEY"
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code, "200" for success.
- **message** (string) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Register Nameserver (NAMESERVER_REGISTER)

Source: https://www.dynadot.com/domain/api-document/index

Registers a new nameserver with the Dynadot API. This operation requires a JSON payload containing the server name and IP address for the new nameserver. It supports multi-threading, API sandbox, and requires an X-Signature header.

```JSON
POST https://api.dynadot.com/restful/v1/nameservers/register
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "name_server": {
    "server_name": "String",
    "ip": "String"
  }
}
```

--------------------------------

### Domain Transfer Order Structure

Source: https://www.dynadot.com/domain/api-document/index

This JSON structure outlines a domain transfer order, including its ID, submission time, currency, payment method, total cost, total paid, status, and a list of order items.

```JSON
{
  "order_id": "Integer",
  "submitted_time": "Long",
  "currency": "String",
  "payment_method": "String",
  "total_cost": "String",
  "total_paid": "String",
  "status": "String",
  "order_item": [
    {
      "type": "String",
      "name": "String",
      "duration": "Integer",
      "cost": "String",
      "status": "String"
    }
  ]
}
```

--------------------------------

### Add New Lead API Request

Source: https://www.dynadot.com/domain/api-document/index

This snippet illustrates the JSON body for adding a new lead to the Dynadot API. It includes details such as lead type, domain name, price, buyer name, and buyer email.

```JSON
{
  "lead_type": "String",
  "domain_name": "String",
  "price": "String",
  "buyer_name": "String",
  "buyer_email": "String"
}
```

--------------------------------

### Restore Domain API Request

Source: https://www.dynadot.com/domain/api-document/index

This snippet shows the request body for restoring a domain. It is a simpler request focused on providing optional currency and coupon code parameters. The domain name is specified in the URL, and authentication headers are required.

```JSON
{
  "currency": "String",
  "coupon_code": "String"
}
```

--------------------------------

### Set Default Parking - API Request

Source: https://www.dynadot.com/domain/api-document/index

This API request configures the default parking settings for an account, specifically controlling whether third-party ads are displayed on the parking page. It's a PUT request to the /accounts/default_parking endpoint.

```JSON
PUT https://api.dynadot.com/restful/v1/accounts/default_parking
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "with_ads": false

}
```

--------------------------------

### POST /domains/{domain_name}/accept_push

Source: https://www.dynadot.com/domain/api-document/index

Accepts or declines a pending domain push request.

```APIDOC
## POST /domains/{domain_name}/accept_push

### Description
Accepts or declines a pending domain push request. Requires a signature in the header.

### Method
POST

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/accept_push

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain associated with the push request.

#### Query Parameters
None

#### Request Body
- **push_action** (string) - Required - The action to perform. Supported values: `accept`, `decline`.

### Request Example
```json
{
  "push_action": "accept"
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code of the response.
- **message** (string) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Set Default Nameservers API Request (JSON)

Source: https://www.dynadot.com/domain/api-document/index

This snippet demonstrates how to set the default nameservers for an account using the Dynadot API. It requires a list of nameserver strings in the request body and returns a success or error message with associated data.

```JSON
PUT https://api.dynadot.com/restful/v1/accounts/default_nameservers
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "nameserver_list": [
    "ns1.example.com",
    "ns2.example.com"
  ]
}
```

--------------------------------

### Set Email Forwarding Configuration

Source: https://www.dynadot.com/domain/api-document/index

Configures email forwarding settings for a domain folder, specifying how incoming emails should be handled.

```APIDOC
## PUT /restful/v1/folders/{folder_name}/email_forwarding

### Description
Configures email forwarding for a domain folder. You can choose to disable email forwarding, forward emails to another mail host, or use MX records. This endpoint also supports configuring email aliases and mail exchange hosts.

### Method
PUT

### Endpoint
/restful/v1/folders/{folder_name}/email_forwarding

### Parameters
#### Path Parameters
- **folder_name** (string) - Required - The name of the folder to configure.

#### Request Body
- **email_forward_type** (string) - Required - The email forwarding type. Supported values: 'mtype_none', 'mtype_forward', 'mtype_mx'.
- **email_alias_list** (list) - Optional - A list of email aliases to configure. Each alias can have a 'username' and 'to_email'.
  - **username** (string) - Optional - The user name of the email alias (used when 'email_forward_type' is 'mtype_forward').
  - **to_email** (string) - Optional - The email address of the email alias (used when 'email_forward_type' is 'mtype_forward').
- **mail_exchange_list** (list) - Optional - A list of mail exchange hosts to configure. Each entry can have a 'host'.
  - **host** (string) - Optional - The mail host (used when 'email_forward_type' is 'mtype_mx').

### Request Example
```json
{
  "email_forward_type": "mtype_forward",
  "email_alias_list": [
    {
      "username": "info",
      "to_email": "info@example.com"
    }
  ],
  "mail_exchange_list": []
}
```

### Response
#### Success Response (200)
- **code** (string) - The response code, "200" for success.
- **message** (string) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Rate Limiting

Source: https://www.dynadot.com/domain/api-document/index

Information on API rate limits based on account price level and request concurrency.

```APIDOC
## Rate Limiting

### Description
Requests should be sent over HTTPS for security. Only one request can be processed at a time, so please wait for your current request to finish before sending another.

### Rate Limits by Price Level
| Price Level | Thread Count | Rate Limit |
|---|---|---|
| Regular | 1 thread | 60/min (1/sec) |
| Bulk | 5 threads | 600/min (10/sec) |
| Super Bulk | 25 threads | 6000/min (100/sec) |

**Note**: `place_auction_bid` & `get_auction_bid` are currently exempt from the above rate limit.
```

--------------------------------

### POST /api/domains/{domain_name}/transfer_in

Source: https://www.dynadot.com/domain/api-document/index

Initiates the process of transferring a domain into your Dynadot account. Requires domain details, contact information, and authentication.

```APIDOC
## POST /api/domains/{domain_name}/transfer_in

### Description
Initiates the process of transferring a domain into your Dynadot account. Requires domain details, contact information, and authentication.

### Method
POST

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/transfer_in

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The domain name to transfer.

#### Query Parameters
None

#### Request Body
- **domain** (object) - Required - Contains details about the domain transfer.
  - **duration** (integer) - Required - The duration for the domain registration in years.
  - **auth_code** (string) - Required - The authorization code for the domain transfer.
  - **registrant_contact_id** (integer) - Optional - The ID of the registrant contact.
  - **admin_contact_id** (integer) - Optional - The ID of the administrative contact.
  - **tech_contact_id** (integer) - Optional - The ID of the technical contact.
  - **billing_contact_id** (integer) - Optional - The ID of the billing contact.
  - **registrant_contact** (object) - Optional - Details of the registrant contact.
    - **organization** (string) - Optional - The organization name.
    - **name** (string) - Required - The name of the contact owner.
    - **email** (string) - Required - The email address.
    - **phone_number** (string) - Required - The phone number.
    - **phone_cc** (string) - Required - The phone country code.
    - **fax_number** (string) - Optional - The fax number.
    - **fax_cc** (string) - Optional - The fax country code.
    - **address1** (string) - Required - The first line of the address.
    - **address2** (string) - Optional - The second line of the address.
    - **city** (string) - Required - The city.
    - **state** (string) - Required - The state or province.
    - **zip** (string) - Required - The postal code.
    - **country** (string) - Required - The country.
  - **admin_contact** (object) - Optional - Details of the administrative contact (same fields as registrant_contact).
  - **tech_contact** (object) - Optional - Details of the technical contact (same fields as registrant_contact).
  - **billing_contact** (object) - Optional - Details of the billing contact (same fields as registrant_contact).
  - **customer_id** (integer) - Optional - A custom customer ID for resellers.
  - **name_server_list** (array of strings) - Optional - A list of custom name servers.
  - **privacy** (string) - Required - Specifies the privacy setting for the domain. Supported values: `off`, `partial`, `full`.
- **currency** (string) - Optional - The desired currency for the transaction. Supported values: `usd`, `gbp`, `eur`, `inr`, `pln`, `zar`, `ltl`, `cny`, `cad`, `jpy`, `nzd`, `rub`, `aud`, `mxn`, `brl`, `idr`, `ars`, `cop`, `dkk`, `rsd`, `hkd`, `chf`, `aed`, `myr`, `ngn`, `kes`, `czk`, `btc`, `nok`.
- **transfer_premium** (boolean) - Optional - Set to `true` if transferring a premium domain.
- **coupon_code** (string) - Optional - A coupon code to apply to the order.

### Request Example
```json
{
  "domain": {
    "duration": 1,
    "auth_code": "AUTHCODE123",
    "registrant_contact": {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone_number": "1234567890",
      "phone_cc": "1",
      "address1": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zip": "90210",
      "country": "USA"
    },
    "privacy": "full"
  },
  "currency": "usd"
}
```

### Response
#### Success Response (200)
- **code** (integer) - The status code, expected to be 200 for success.
- **message** (string) - A success message.

#### Response Example
```json
{
  "code": 200,
  "message": "Transfer initiated successfully."
}
```
```

--------------------------------

### Set Default Hosting - API Request

Source: https://www.dynadot.com/domain/api-document/index

This API request sets the default hosting type for an account. Supported hosting types are 'basic' and 'advanced'. The request is a PUT request to the /accounts/default_hosts endpoint.

```JSON
PUT https://api.dynadot.com/restful/v1/accounts/default_hosts
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "hosting_type": "String"

}
```

--------------------------------

### PUT /restful/v1/accounts/default_stealth_forwarding

Source: https://www.dynadot.com/domain/api-document/index

Set the default stealth forwarding for your account. This allows you to configure a stealth URL and an optional page title.

```APIDOC
## PUT /restful/v1/accounts/default_stealth_forwarding

### Description
Sets the default stealth forwarding for your account. You can specify a stealth URL and an optional title for the forwarded page.

### Method
PUT

### Endpoint
/restful/v1/accounts/default_stealth_forwarding

### Parameters
#### Request Body
- **stealth_url** (String) - Required - The URL you want to set as the default stealth URL.
- **stealth_title** (String) - Optional - The title of the page that the domain will forward to.

### Request Example
```json
{
  "stealth_url": "http://example.com/stealth",
  "stealth_title": "My Stealth Page"
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code, '200' for success.
- **message** (String) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Dynadot API Authorization and Response Structure

Source: https://www.dynadot.com/domain/api-document/index

Demonstrates the common authorization header and the success and error response structures for API calls. The success response includes detailed pricing information for TLDs, while the error response specifies the type of error encountered.

```JSON
{
  "code": "200",
  "message": "Success",
  "data": {
    "page_index": 1,
    "count_per_page": 10,
    "sort": "NAME_ASC",
    "price_level": "Bulk",
    "currency": "USD",
    "show_multi_year_price": "Yes",
    "tldPriceList": [
      {
        "tld": "com",
        "usage": "COM",
        "priceUnit": "(Price/1 year)",
        "allYearsRegisterPrice": [],
        "allYearsRenewPrice": [],
        "transferPrice": "--",
        "restorePrice": "--",
        "graceFeePrice": "--",
        "supportPrivacy": "Yes",
        "gracePeriodUnit": "(Grace Period/days)",
        "renewGracePeriod": "0-20 (variable)",
        "restorePeriod": "0-20 (variable)",
        "deleteGracePeriod": "0-20 (variable)",
        "isIdn": "Yes",
        "restriction": "--",
        "onSale": "Yes"
      }
    ]
  }
}

```

```JSON
{
  "code": "Integer",
  "message": "String",
  "data": {
    "page_index": "Integer",
    "count_per_page": "Integer",
    "sort": "String",
    "price_level": "String",
    "currency": "String",
    "show_multi_year_price": "String",
    "tldPriceList": [
      {
        "tld": "String",
        "usage": "String",
        "priceUnit": "String",
        "allYearsRegisterPrice": [],
        "allYearsRenewPrice": [],
        "transferPrice": "String",
        "restorePrice": "String",
        "graceFeePrice": "String",
        "supportPrivacy": "String",
        "gracePeriodUnit": "String",
        "renewGracePeriod": "String",
        "restorePeriod": "String",
        "deleteGracePeriod": "String",
        "isIdn": "String",
        "restriction": "String",
        "onSale": "String"
      }
    ]
  }
}

```

--------------------------------

### Set Stealth Forwarding

Source: https://www.dynadot.com/domain/api-document/index

Sets up stealth forwarding for a domain, allowing the domain to forward to a URL without changing the address bar in the user's browser.

```APIDOC
## PUT /restful/v1/domains/{domain_name}/stealth_forwarding

### Description
Sets up stealth forwarding for a domain, allowing the domain to forward to a URL without changing the address bar in the user's browser.

### Method
PUT

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/stealth_forwarding`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to configure stealth forwarding for.

#### Request Body
- **stealth_url** (string) - Required - The URL to which the domain should stealth forward. Must be URL-encoded.
- **stealth_title** (string) - Required - The title of the page for the stealth forward.

### Request Example
```json
{
  "stealth_url": "http://example.com",
  "stealth_title": "Example Domain"
}
```

### Response
#### Success Response (200)
- **code** (integer) - The status code of the response.
- **message** (string) - A message indicating the success or failure of the operation.

#### Response Example
```json
{
  "code": 200,
  "message": "Success"
}
```
```

--------------------------------

### Clear Folder Setting

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to clear specific service settings for a folder. Supported service types include 'forward', 'stealth', 'email_forwarding', 'dns', and 'nameservers'.

```APIDOC
## PUT /restful/v1/folders/{folder_name}/clear_setting

### Description
Clears specific service settings for a folder. Supported service types are 'forward', 'stealth', 'email_forwarding', 'dns', and 'nameservers'.

### Method
PUT

### Endpoint
`/restful/v1/folders/{folder_name}/clear_setting`

### Parameters
#### Path Parameters
- **folder_name** (String) - Required - The name of the folder to update.

#### Request Body
- **service_type** (String) - Required - The service type to clear the setting for. Supported values: "forward", "stealth", "email_forwarding", "dns", "nameservers".

### Request Example
```json
{
  "service_type": "email_forwarding"
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code, "200" for success.
- **message** (String) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Set Default DNS API

Source: https://www.dynadot.com/domain/api-document/index

Configures the default DNS records for your account, including main and sub-records, TTL, and an option to add to current settings.

```APIDOC
## PUT /default_records

### Description
Configures the default DNS records for your account. Allows setting main DNS records, sub-records, TTL, and whether to add to current settings.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/default_records

### Parameters
#### Request Body
- **dns_main_list** (array) - Optional - List of main DNS records, max 20.
  - **record_type** (string) - Optional - The type of the record. Supported values: a, cname, forward, aaaa, txt, stealth, mx, email, caa, aname, srv, ns.
  - **record_value1** (string) - Optional - The value of the record.
  - **record_value2** (string) - Optional - The second value of the record.
- **sub_list** (array) - Optional - List of sub DNS records, max 100.
  - **sub_host** (string) - Optional - The subhost of the DNS record.
  - **record_type** (string) - Optional - The record type of the DNS record. Supported values: a, cname, forward, aaaa, txt, stealth, mx, email, caa, aname, srv, ns.
  - **record_value1** (string) - Optional - The value of the DNS record.
  - **record_value2** (string) - Optional - The second value of the DNS record.
- **ttl** (long) - Optional - Time to live for DNS records, default is 86400.
- **add_dns_to_current_setting** (boolean) - Optional - Add DNS records to current settings, default is false.

### Request Example
```json
{
  "dns_main_list": [
    {
      "record_type": "a",
      "record_value1": "192.168.1.1"
    }
  ],
  "sub_list": [
    {
      "sub_host": "www",
      "record_type": "cname",
      "record_value1": "example.com"
    }
  ],
  "ttl": 3600,
  "add_dns_to_current_setting": true
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code of the response.
- **message** (string) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### API Response Structure

Source: https://www.dynadot.com/domain/api-document/index

Standard response structure for API requests, including code, message, and data.

```APIDOC
## API Response Structure

### Description
This outlines the general structure of responses from the Dynadot Domain API, providing status information and the payload of the request.

### Response Body
- **Code** (string) - The status code of the request.
- **Message** (string) - A brief description of the status.
- **Data** (object) - The main body of the response, containing requested information or an empty object if no data is returned.

### Example Response (Success)
```json
{
  "Code": "200",
  "Message": "Success",
  "Data": {}
}
```
```

--------------------------------

### Domain Transfer In API

Source: https://www.dynadot.com/domain/api-document/index

Initiates a transfer-in for a domain to your Dynadot account. Requires domain details, duration, and optionally authentication code and contact IDs or full contact objects.

```APIDOC
## POST /domains/transfer-in

### Description
Initiates the process of transferring a domain into your Dynadot account. Requires the domain object with duration, and optionally an auth code and contact information.

### Method
POST

### Endpoint
https://api.dynadot.com/restful/v1/domains/transfer-in

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **domain** (Object) - Required - Contains domain transfer details.
  - **duration** (Integer) - Required - The duration of the domain transfer in years.
  - **auth_code** (String) - Optional - The authorization code for the domain transfer.
  - **registrant_contact_id** (Integer) - Optional - The ID of the existing registrant contact.
  - **admin_contact_id** (Integer) - Optional - The ID of the existing administrative contact.
  - **tech_contact_id** (Integer) - Optional - The ID of the existing technical contact.
  - **billing_contact_id** (Integer) - Optional - The ID of the existing billing contact.
  - **registrant_contact** (Object) - Optional - Details for the new registrant contact.
    - **organization** (String) - The organization name.
    - **name** (String) - The contact owner's name.
    - **email** (String) - The contact's email address.
    - **phone_number** (String) - The contact's phone number.
    - **phone_cc** (String) - The contact's phone country code.
    - **fax_number** (String) - The contact's fax number.
    - **fax_cc** (String) - The contact's fax country code.
    - **address1** (String) - The first line of the address.
    - **address2** (String) - The second line of the address.
    - **city** (String) - The city.
    - **state** (String) - The state or province.
    - **zip** (String) - The postal code.
    - **country** (String) - The country.
  - **admin_contact** (Object) - Optional - Details for the new administrative contact (same fields as registrant_contact).
  - **tech_contact** (Object) - Optional - Details for the new technical contact (same fields as registrant_contact).
  - **billing_contact** (Object) - Optional - Details for the new billing contact (same fields as registrant_contact).

### Request Example
```json
{
  "domain": {
    "duration": 1,
    "auth_code": "AUTH12345",
    "registrant_contact": {
      "organization": "Example Corp",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone_number": "1234567890",
      "phone_cc": "1",
      "fax_number": "0987654321",
      "fax_cc": "1",
      "address1": "123 Main St",
      "address2": "Apt 4B",
      "city": "Anytown",
      "state": "CA",
      "zip": "90210",
      "country": "USA"
    }
  }
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code, "200" for success.
- **message** (String) - A success message, typically "Success".
- **data** (Object) - Contains details of the transfer.
  - **domain_name** (String) - The name of the domain being transferred.
  - **expiration_date** (Long) - The expiration date of the domain in Unix timestamp format.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "domain_name": "example.com",
    "expiration_date": 1761926603275
  }
}
```
```

--------------------------------

### Configure Folder DNS Records

Source: https://www.dynadot.com/domain/api-document/index

This snippet demonstrates how to configure DNS records for a specific folder using the Dynadot API. It outlines the request body parameters, including main and sub-record lists, TTL, and options for future domain application and synchronization. The response indicates success or failure with a status code and message.

```JSON
{
  "dns_main_list": [
    {
      "record_type": "String",
      "record_value1": "String",
      "record_value2": "String"
    }
  ],
  "dns_sub_list": [
    {
      "sub_host": "String",
      "record_type": "String",
      "record_value1": "String",
      "record_value2": "String"
    }
  ],
  "ttl": "String",
  "apply_for_future_domain": false,
  "sync_setting_to_existing_domains_in_this_folder": false
}
```

--------------------------------

### Dynadot API Request Headers

Source: https://www.dynadot.com/domain/api-document/index

Standard headers required for making requests to the Dynadot API. Includes content type, authorization with an API key, and a signature for verification. The `Accept` header specifies the desired response format.

```HTTP
Accept: application/json
Authorization: Bearer API_KEY
X-Signature: {signature}
```

--------------------------------

### Domain Search API

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to search for available domains. You can specify the domain name and other search criteria.

```APIDOC
## GET /restful/v1/domains/{domain_name}/search

### Description
Searches for available domains based on the provided domain name.

### Method
GET

### Endpoint
/restful/v1/domains/{domain_name}/search

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The domain name to search for.

#### Query Parameters
- **showPrice** (string) - Optional - Specifies whether to include pricing information in the response. Accepted values: "yes", "no".
- **currency** (string) - Optional - The currency for pricing information. Example: "USD".

### Request Example
```json
{
  "example": "GET /restful/v1/domains/example.com/search?showPrice=yes&currency=USD"
}
```

### Response
#### Success Response (200)
- **data** (object) - Contains search results, including domain availability and pricing if requested.
  - **domain** (string) - The searched domain name.
  - **isAvailable** (boolean) - Indicates if the domain is available.
  - **price** (number) - The price of the domain if available and requested.
  - **currency** (string) - The currency of the price.

#### Response Example
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "domain": "example.com",
    "isAvailable": true,
    "price": 10.99,
    "currency": "USD"
  }
}
```
```

--------------------------------

### Set Stealth Forwarding Configuration

Source: https://www.dynadot.com/domain/api-document/index

Configures stealth forwarding for a domain folder, allowing a domain to forward to another URL while maintaining its original identity.

```APIDOC
## PUT /restful/v1/folders/{folder_name}/stealth_forwarding

### Description
Configures stealth forwarding for a domain folder. This allows a domain to forward to a specified URL and optionally set a title for the forwarded page, while the original domain remains visible in the browser's address bar.

### Method
PUT

### Endpoint
/restful/v1/folders/{folder_name}/stealth_forwarding

### Parameters
#### Path Parameters
- **folder_name** (string) - Required - The name of the folder to configure.

#### Request Body
- **stealth_url** (string) - Required - The URL to which the domain should stealth forward. This URL must be URL-encoded.
- **stealth_title** (string) - Optional - The title of the page that the domain will forward to.
- **apply_for_future_domain** (boolean) - Optional - Apply this setting to domains that will be moved to this folder in the future.
- **sync_setting_to_existing_domains_in_this_folder** (boolean) - Optional - Synchronize the settings of all domains in this folder.

### Request Example
```json
{
  "stealth_url": "http://example.com",
  "stealth_title": "Example Domain",
  "apply_for_future_domain": true,
  "sync_setting_to_existing_domains_in_this_folder": true
}
```

### Response
#### Success Response (200)
- **code** (string) - The response code, "200" for success.
- **message** (string) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### POST /api/domains/{domain_name}/restore

Source: https://www.dynadot.com/domain/api-document/index

Restores a recently expired domain. This operation may incur additional fees.

```APIDOC
## POST /api/domains/{domain_name}/restore

### Description
Restores a recently expired domain. This operation may incur additional fees.

### Method
POST

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/restore

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The domain name to restore.

#### Query Parameters
None

#### Request Body
- **currency** (string) - Optional - The desired currency for the transaction. Supported values: `usd`, `gbp`, `eur`, `inr`, `pln`, `zar`, `ltl`, `cny`, `cad`, `jpy`, `nzd`, `rub`, `aud`, `mxn`, `brl`, `idr`, `ars`, `cop`, `dkk`, `rsd`, `hkd`, `chf`, `aed`, `myr`, `ngn`, `kes`, `czk`, `btc`, `nok`.
- **coupon_code** (string) - Optional - A coupon code to apply to the order.

### Request Example
```json
{
  "currency": "usd",
  "coupon_code": "RESTORE2023"
}
```

### Response
#### Success Response (200)
- **code** (integer) - The status code, expected to be 200 for success.
- **message** (string) - A success message indicating the restore process has started.

#### Response Example
```json
{
  "code": 200,
  "message": "Domain restore initiated."
}
```
```

--------------------------------

### Domain Renewal API

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows for the renewal of a domain for a specified duration and year. It supports optional currency, coupon codes, and a flag to prevent renewal if late fees are required.

```APIDOC
## POST /domains/{domain_name}/renew

### Description
Renews a domain for a specified duration and year. Supports optional currency and coupon codes.

### Method
POST

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/renew

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The name of the domain to renew.

#### Query Parameters
None

#### Request Body
- **duration** (Integer) - Required - The renewal duration in years.
- **year** (Integer) - Required - The year to renew the domain for.
- **currency** (String) - Optional - The desired currency for the purchase (e.g., "usd", "gbp", "eur").
- **coupon** (String) - Optional - A valid coupon code to apply to the renewal.
- **no_renew_if_late_renew_fee_needed** (Boolean) - Optional - If true, the renewal will not proceed if a late renewal fee is required.

### Request Example
```json
{
  "duration": 1,
  "year": 2024,
  "currency": "usd",
  "coupon": "SUMMER20",
  "no_renew_if_late_renew_fee_needed": false
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code, "200" for success.
- **message** (String) - A success message, typically "Success".
- **data** (Object) - Contains details of the renewal.
  - **expiration_date** (Long) - The new expiration date of the domain in Unix timestamp format.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "expiration_date": 1761926603275
  }
}
```
```

--------------------------------

### Domain Auction Details Structure

Source: https://www.dynadot.com/domain/api-document/index

This JSON structure defines the details of a domain auction, including information like auction ID, domain name, current bid price, bid history, and auction status.

```JSON
{
  "code": "Integer",
  "message": "String",
  "data": {
    "auction_item_details": {
      "auction_id": "Integer",
      "domain_name": "String",
      "utf_name": "String",
      "is_idn": "String",
      "auction_type": "String",
      "current_bid_price": "String",
      "accepted_bid_price": "String",
      "currency": "String",
      "is_high_bidder": "String",
      "bids": "Integer",
      "bidders": "Integer",
      "auction_status_id": "Integer",
      "time_left": "String",
      "start_time": "String",
      "end_time": "String",
      "revenue": "String",
      "visitors": "Long",
      "links": "String",
      "age": "Integer",
      "estibot_appraisal": "String",
      "auction_ended": "String",
      "customer_bided": "String",
      "customer_bid": "String",
      "customer_proxy_bid": "String",
      "is_premium": "String",
      "renewal_price": "String",
      "revenue_currency": "String",
      "start_price": "String",
      "bid_history_item_list": [
        {
           "bidder_name": "String",
           "bid_price": "String",
           "currency": "String",
           "timestamp": "Long",
           "bid_status": "String",
           "is_proxy_auto_bid": "String"
        }
      ],
      "auction_status_name": "String"
    }
  }
}
```

--------------------------------

### POST /contacts/{contact_id}/create_cn_audit

Source: https://www.dynadot.com/domain/api-document/index

Initiates a CN audit for a contact. This endpoint supports various contact types and requires specific documentation details based on the type.

```APIDOC
## POST /contacts/{contact_id}/create_cn_audit

### Description
Creates a CN audit for a specified contact. The required parameters depend on whether the contact is an individual or an enterprise.

### Method
POST

### Endpoint
https://api.dynadot.com/restful/v1/contacts/{contact_id}/create_cn_audit

### Parameters
#### Path Parameters
- **contact_id** (Integer) - Required - The ID of the contact for which to create the audit.

#### Request Body
- **contact_type** (String) - Required - Type of contact. Supported values: 'individual', 'enterprise'.
- **individual_id_type** (String) - Required if contact_type is 'individual' - Type of individual ID. Supported values: 'jgz', 'sfz', 'hz', 'gajmtx', 'twjmtx', 'wjlsfz', 'gajzz', 'twjzz', 'qt'.
- **individual_url** (String) - Required if contact_type is 'individual' - URL of the individual's license document (jpg, gif, png, jpeg).
- **individual_license_id** (String) - Required if contact_type is 'individual' - The individual license ID.
- **enterprise_id_type** (String) - Optional if contact_type is 'enterprise' - Type of enterprise ID. Supported values: 'org', 'yyzz', 'tydm', 'bddm', 'jddwfw', 'sydwfr', 'wgczjg', 'shttfr', 'zjcs', 'mbfqy', 'jjhfr', 'lszy', 'wgzhwh', 'wlczjg', 'sfjd', 'jwjg', 'shfwjg', 'mbxxbx', 'yljgzy', 'gzjgzy', 'bjwsxx', 'qttydm', 'qt'.
- **enterprise_license_id** (String) - Optional if contact_type is 'enterprise' - The enterprise license number.
- **enterprise_url** (String) - Optional if contact_type is 'enterprise' - URL of the enterprise's license document (jpg, gif, png, jpeg).

### Request Example
```json
{
  "contact_type": "individual",
  "individual_id_type": "sfz",
  "individual_url": "https://example.com/licenses/individual.jpg",
  "individual_license_id": "1234567890"
}
```

### Response
#### Success Response (200)
- **code** (String) - Indicates success, typically '200'.
- **message** (String) - A success message.
```

--------------------------------

### Authorize Domain Transfer Away API Request

Source: https://www.dynadot.com/domain/api-document/index

This snippet demonstrates the JSON structure for authorizing a domain transfer away. It includes the domain name and a boolean to approve the transfer. This request is sent via POST.

```JSON
{
  "domain_name": "String",
  "approve": false
}
```

--------------------------------

### Set Domain Forwarding Configuration

Source: https://www.dynadot.com/domain/api-document/index

Configures domain forwarding for a folder, allowing temporary or permanent redirection to a specified URL.

```APIDOC
## PUT /restful/v1/folders/{folder_name}/domain_forwarding

### Description
Configures domain forwarding for a specified folder. You can set a destination URL and choose whether the forwarding should be temporary or permanent. The settings can also be applied to future or existing domains within the folder.

### Method
PUT

### Endpoint
/restful/v1/folders/{folder_name}/domain_forwarding

### Parameters
#### Path Parameters
- **folder_name** (string) - Required - The name of the folder to configure.

#### Request Body
- **forward_url** (string) - Required - The URL to which the domain should forward. This URL must be URL-encoded.
- **is_temporary** (boolean) - Optional - The forward status of your domain. Defaults to 'true' for temporary forwarding. Use 'false' for permanent forwarding.
- **apply_for_future_domain** (boolean) - Optional - Apply this setting to domains that will be moved to this folder in the future.
- **sync_setting_to_existing_domains_in_this_folder** (boolean) - Optional - Synchronize the settings of all domains in this folder.

### Request Example
```json
{
  "forward_url": "http://example.com",
  "is_temporary": false,
  "apply_for_future_domain": true,
  "sync_setting_to_existing_domains_in_this_folder": true
}
```

### Response
#### Success Response (200)
- **code** (string) - The response code, "200" for success.
- **message** (string) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### PUT /restful/v1/accounts/default_domain_forwarding

Source: https://www.dynadot.com/domain/api-document/index

Configure default domain forwarding for your account. This allows you to set a URL that your domains will forward to.

```APIDOC
## PUT /restful/v1/accounts/default_domain_forwarding

### Description
Sets the default domain forwarding for your account. You can specify a target URL and whether the forwarding should be temporary.

### Method
PUT

### Endpoint
/restful/v1/accounts/default_domain_forwarding

### Parameters
#### Request Body
- **forward_url** (String) - Required - The URL you want your domain to forward to. This parameter must be URL-encoded.
- **is_temporary** (Boolean) - Optional - If true, the forwarding will be removed after the first request is processed.

### Request Example
```json
{
  "forward_url": "http://example.com/forward",
  "is_temporary": false
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code, '200' for success.
- **message** (String) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### PUT /contacts/{contact_id}/set_lt_setting

Source: https://www.dynadot.com/domain/api-document/index

Sets the Lithuanian (.lt) contact extension settings, including organization code.

```APIDOC
## PUT /contacts/{contact_id}/set_lt_setting

### Description
Updates the contact extension settings specifically for the Lithuanian TLD (.lt). This involves providing the organization code associated with the contact.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/contacts/{contact_id}/set_lt_setting

### Parameters
#### Path Parameters
- **contact_id** (Integer) - Required - The ID of the contact to update.

#### Request Body
- **contact_extension** (Object) - Required - The contact extension details for .lt domains.
  - **organization_code** (String) - Required - The organization code for the contact. This is used for company or legal entity registrations.
  - **tld** (String) - Required - The TLD, which should be "lt".

### Request Example
```json
{
  "contact_extension": {
    "organization_code": "ORG123",
    "tld": "lt"
  }
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code. "200" for success.
- **message** (String) - A success message, e.g., "Success".
- **data** (Object)
  - **account_id** (Integer) - The account ID associated with the contact.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "account_id": 54321
  }
}
```
```

--------------------------------

### Set Email Forwarding Configuration (API)

Source: https://www.dynadot.com/domain/api-document/index

Configure email forwarding for a domain folder. This supports multiple forwarding types, including no forwarding, forwarding to another mail host, or using MX records. Optionally, email aliases or mail exchange lists can be provided. The request body is sent as JSON.

```JSON
{
  "email_forward_type": "String",
  "email_alias_list": [
    {
      "username": "String",
      "to_email": "String"
    }
  ],
  "mail_exchange_list": [
    {
      "host": "String"
    }
  ]
}
```

--------------------------------

### Set Nameserver IP Address (JSON)

Source: https://www.dynadot.com/domain/api-document/index

This snippet demonstrates how to set IP addresses for a nameserver using the Dynadot API. It requires a list of IP addresses in the request body and returns the updated nameserver host and server ID upon success. An X-Signature header is mandatory for this request.

```json
{
  "ip_list": [
    "String"
  ]
}
```

--------------------------------

### Add Backorder Request - API Request

Source: https://www.dynadot.com/domain/api-document/index

Adds a backorder request for a specific domain. This operation supports multi-threading and API sandbox testing, but requires an X-Signature for authentication. The request body is typically empty.

```HTTP
POST https://api.dynadot.com/restful/v1/aftermarket/backorders/requests/{domain_name}
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{}
```

--------------------------------

### HTTP Status Codes

Source: https://www.dynadot.com/domain/api-document/index

Overview of HTTP status codes used by the API, categorized into 2xx, 4xx, and 5xx.

```APIDOC
## HTTP Status Codes

### Description
Status codes are standardized three-digit numbers indicating the outcome of a client's request. Our API adheres to the HTTP/1.1 protocol.

### 2xx (Successful)
Indicates that the command was received and accepted.
- **200**: The request has succeeded.
- **201**: The request has been fulfilled and has resulted in one or more new resources being created.
- **202**: The request has been accepted for processing, but the processing has not been completed.
- **249**: The user has sent too many requests in a given amount of time.

### 4xx (Client Error)
Signals that the client made an error in the request.
- **400**: The server cannot or will not process the request due to a client error.
- **401**: The request has not been applied because it lacks valid authentication credentials.
- **402**: The request has not been applied due to a payment issue.
- **403**: The server understood the request but refuses to fulfill it.
- **404**: The origin server did not find a current representation for the target resource.
- **409**: The request could not be completed due to a conflict with the current state of the resource.

### 5xx (Server Error)
Indicates that the server encountered an error or is unable to fulfill the request.
- **500**: The server encountered an unexpected condition that prevented it from fulfilling the request.
- **501**: The server does not support the functionality required to fulfill the request.
- **502**: The server, while acting as a gateway or proxy, received an invalid response from an inbound server.
- **503**: The server is currently unable to handle the request due to temporary overload or maintenance.
- **504**: The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server.
```

--------------------------------

### SET_RENEW_OPTION Command

Source: https://www.dynadot.com/domain/api-document/index

Allows you to set the renewal option for a domain. Supports multi-thread and requires X-Signature.

```APIDOC
## PUT /restful/v1/domains/{domain_name}/renew_option

### Description
Sets the renewal option for a specified domain.

### Method
PUT

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/renew_option`

### Headers
- Content-Type: application/json
- Accept: application/json
- Authorization: Bearer API_KEY
- X-Signature: {signature}

### Request Body
- **renew_option** (String) - Required - The renewal option. Supported values: `reset`, `auto`, `donot`

### Request Example
```json
{
  "renew_option": "auto"
}
```

### Response
#### Success Response (200)
- **code** (String) - '200'
- **message** (String) - 'Success'

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Set Contact IT Setting (SET_CONTACT_IT_SETTING)

Source: https://www.dynadot.com/domain/api-document/index

Updates the IT settings for a specific contact. This API call requires a contact ID and an extended contact object containing citizenship, document number, and TLD. It supports multi-threading, API sandbox, and requires an X-Signature header.

```JSON
PUT https://api.dynadot.com/restful/v1/contacts/{contact_id}/set_it_setting
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "contact_extension": {
    "country_of_citizenship": "String",
    "codice_doc_number": "String",
    "tld": "String"
  }
}
```

--------------------------------

### Set Stealth Forwarding Configuration (API)

Source: https://www.dynadot.com/domain/api-document/index

Configure stealth forwarding for a domain folder. This method forwards a domain to a specified URL while preserving the original domain in the browser's address bar. It also allows setting a page title. The request body is sent as JSON.

```JSON
{
  "stealth_url": "String",
  "stealth_title": "String",
  "apply_for_future_domain": false,
  "sync_setting_to_existing_domains_in_this_folder": false
}
```

--------------------------------

### Dynadot API Folder Deletion Request (URL)

Source: https://www.dynadot.com/domain/api-document/index

Shows the URL structure for deleting a domain folder using the Dynadot API. The folder name is specified as a path parameter.

```bash
DELETE https://api.dynadot.com/restful/v1/folders/{folder_name}
```

--------------------------------

### HMAC-SHA256 Signature Generation String

Source: https://www.dynadot.com/domain/api-document/index

Illustrates the construction of the string to be signed for HMAC-SHA256 encryption. This involves concatenating the API key, full path and query, X-Request-ID, and request body with newline characters.

```text
apiKey + "\n" + fullPathAndQuery + "\n" + (xRequestId or empty String) + "\n" + (requestBody or empty String)
```

--------------------------------

### DNS Main List Operations

Source: https://www.dynadot.com/domain/api-document/index

Allows listing and filtering DNS records associated with the main domain.

```APIDOC
## GET /dns/main/list

### Description
Lists DNS records for the main domain, with options to filter by record type and value.

### Method
GET

### Endpoint
/dns/main/list

### Parameters
#### Query Parameters
- **record_type** (String) - Optional - The type of the DNS record. Supported values: a, cname, forward, aaaa, txt, stealth, mx, email, caa, aname, srv, ns.
- **record_value1** (String) - Optional - The first value of the record.
- **record_value2** (String) - Optional - The second value of the record.

### Request Example
None

### Response
#### Success Response (200)
- **dns_main_list** (List) - A list of DNS records.
  - **record_type** (String) - The type of the record.
  - **record_value1** (String) - The value of the record.
  - **record_value2** (String) - The second value of the record.
  - **ttl** (String) - The time to live for the record.

#### Response Example
```json
{
  "dns_main_list": [
    {
      "record_type": "A",
      "record_value1": "192.168.1.1",
      "record_value2": "",
      "ttl": "3600"
    },
    {
      "record_type": "CNAME",
      "record_value1": "example.com",
      "record_value2": "",
      "ttl": "7200"
    }
  ]
}
```
```

--------------------------------

### API Response Structure with Coupons

Source: https://www.dynadot.com/domain/api-document/index

This JSON structure represents a typical API response containing a list of coupons. It includes fields for status codes, messages, and a data object that holds an array of coupon details, each with its own set of properties.

```json
{
  "code": "Integer",
  "message": "String",
  "data": {
    "coupons": [
      {
        "code": "String",
        "description": "String",
        "coupon_type": "String",
        "discount_type": "String",
        "discount_info": {
          "Percentage": "String"
        },
        "restriction": {
          "price_levels": [
            "String"
          ],
          "uses_per_account": "Integer",
          "uses_system_wide": "Integer",
          "uses_per_ip": "Integer",
          "items_per_account": "Integer",
          "items_system_wide": "Integer",
          "items_per_order": "Integer",
          "items_per_day": "Integer",
          "domain_duration_min": "Integer",
          "domain_duration_max": "Integer",
          "idn_restriction": "String",
          "tlds": [
            "String"
          ],
          "currencies": [
            "String"
          ]
        },
        "start_date": "Long",
        "end_date": "Long"
      }
    ]
  }
}
```

--------------------------------

### Grace Delete Domain

Source: https://www.dynadot.com/domain/api-document/index

Initiates the grace deletion process for a specified domain. Optionally adds the domain to a waiting list if the grace deletion quota is reached.

```APIDOC
## DELETE /restful/v1/domains/{domain_name}/grace_delete

### Description
Initiates the grace deletion process for a specified domain. Optionally adds the domain to a waiting list if the grace deletion quota is reached.

### Method
DELETE

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/grace_delete`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to be grace deleted.

#### Query Parameters
- **add_to_waiting_list** (boolean) - Optional - If true, adds the domain to the grace delete waiting list if the quota has been reached.

### Request Example
(No request body for this endpoint)

### Response
#### Success Response (200)
- **code** (integer) - The status code of the response.
- **message** (string) - A message indicating the success or failure of the operation.

#### Response Example
```json
{
  "code": 200,
  "message": "Success"
}
```
```

--------------------------------

### Set Default Email Forwarding API Request (JSON)

Source: https://www.dynadot.com/domain/api-document/index

This snippet demonstrates configuring default email forwarding. It supports different forwarding types (none, forward, MX) and allows specifying email aliases or mail exchange records. The API returns a status code and message upon completion.

```JSON
PUT https://api.dynadot.com/restful/v1/accounts/default_email_forwarding
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "email_forward_type": "String",
  "email_alias_list": [
    {
      "username": "String",
      "to_email": "String"
    }
  ],
  "mail_exchange_list": [
    {
      "host": "String",
      "distance": "String"
    }
  ]
}
```

--------------------------------

### Set Domain Folder

Source: https://www.dynadot.com/domain/api-document/index

Assigns a domain to a specified folder. This helps in organizing domains within your Dynadot account.

```APIDOC
## PUT /restful/v1/domains/{domain_name}/folders/{folder_name}

### Description
Assigns a domain to a specified folder. This helps in organizing domains within your Dynadot account.

### Method
PUT

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/folders/{folder_name}`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to assign to a folder.
- **folder_name** (string) - Required - The name of the folder to assign the domain to.

### Request Body
(No request body for this endpoint)

### Response
#### Success Response (200)
- **code** (integer) - The status code of the response.
- **message** (string) - A message indicating the success or failure of the operation.

#### Response Example
```json
{
  "code": 200,
  "message": "Success"
}
```
```

--------------------------------

### POST /domains/{domain_name}/records

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to manage DNS records for a specific domain. You can add or update main DNS records and subdomain records, set the TTL, and control whether DNS settings are added to the current configuration.

```APIDOC
## POST /domains/{domain_name}/records

### Description
Allows you to manage DNS records for a specific domain. You can add or update main DNS records and subdomain records, set the TTL, and control whether DNS settings are added to the current configuration.

### Method
POST

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/records`

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The name of the domain for which to manage records.

#### Request Body
- **dns_main_list** (Array) - Optional - A list of main DNS records.
  - **record_type** (String) - Required - The type of DNS record (e.g., A, CNAME, MX).
  - **record_value1** (String) - Required - The primary value for the DNS record.
  - **record_value2** (String) - Optional - The secondary value for the DNS record (used for certain record types).
- **sub_list** (Array) - Optional - A list of subdomain records.
  - **sub_host** (String) - Required - The subdomain host (e.g., 'www').
  - **record_type** (String) - Required - The type of DNS record.
  - **record_value1** (String) - Required - The primary value for the DNS record.
  - **record_value2** (String) - Optional - The secondary value for the DNS record.
- **ttl** (Integer) - Optional - The Time To Live for the DNS records.
- **add_dns_to_current_setting** (Boolean) - Optional - If true, DNS settings will be added to the current configuration; otherwise, they will replace it.

### Request Example
```json
{
  "dns_main_list": [
    {
      "record_type": "A",
      "record_value1": "192.168.1.1"
    }
  ],
  "sub_list": [
    {
      "sub_host": "mail",
      "record_type": "MX",
      "record_value1": "mail.example.com",
      "record_value2": "10"
    }
  ],
  "ttl": 3600,
  "add_dns_to_current_setting": false
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code of the response, '200' for success.
- **message** (String) - A message indicating the result of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### PUT /restful/v1/folders/{folder_name}/name

Source: https://www.dynadot.com/domain/api-document/index

Renames an existing folder. Requires the current folder name and the new folder name.

```APIDOC
## PUT /restful/v1/folders/{folder_name}/name

### Description
Renames an existing folder. Requires the current folder name and the new folder name.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/folders/{folder_name}/name

### Parameters
#### Path Parameters
- **folder_name** (String) - Required - The current name of the folder.

#### Request Body
- **new_folder_name** (String) - Required - The new name for the folder.

### Request Example
```json
{
  "new_folder_name": "String"
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code.
- **message** (String) - The response message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Set Contact IT Setting

Source: https://www.dynadot.com/domain/api-document/index

Updates the IT settings for a specific contact, including citizenship, document number, and TLD.

```APIDOC
## PUT /restful/v1/contacts/{contact_id}/set_it_setting

### Description
Updates the IT settings for a specific contact, including citizenship, document number, and TLD.

### Method
PUT

### Endpoint
`/restful/v1/contacts/{contact_id}/set_it_setting`

### Parameters
#### Path Parameters
- **contact_id** (Integer) - Required - The ID of the contact to update.

#### Request Body
- **contact_extension** (Object) - Required - The contact extension details.
  - **country_of_citizenship** (String) - Required - The nationality code.
  - **codice_doc_number** (String) - Required - The codice document number.
  - **tld** (String) - Required - The TLD of this contact extension.

### Request Example
```json
{
  "contact_extension": {
    "country_of_citizenship": "US",
    "codice_doc_number": "123456789",
    "tld": "com"
  }
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.
- **data** (Object)
  - **contact_id** (Integer) - The ID of the updated contact.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "contact_id": 12345
  }
}
```
```

--------------------------------

### API Request Headers and Authentication

Source: https://www.dynadot.com/domain/api-document/index

Standard headers and authentication tokens required for interacting with the Dynadot API. Includes Bearer token for authorization and X-Signature for request integrity.

```http
Authorization: Bearer API_KEY
X-Signature: {signature}
```

--------------------------------

### PUT /contacts/{contact_id}/set_lv_setting

Source: https://www.dynadot.com/domain/api-document/index

Sets the Latvian (.lv) contact extension settings, including registration and VAT numbers.

```APIDOC
## PUT /contacts/{contact_id}/set_lv_setting

### Description
Configures the contact extension settings for the Latvian TLD (.lv). This endpoint requires specific identification details such as a registration number and, if applicable, a VAT number for foreign entities.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/contacts/{contact_id}/set_lv_setting

### Parameters
#### Path Parameters
- **contact_id** (Integer) - Required - The ID of the contact to update.

#### Request Body
- **contact_extension** (Object) - Required - The contact extension details for .lv domains.
  - **registration_number** (String) - Required - The Latvian identification number for individuals, or the registration number from the Latvian Register of Enterprises for companies and legal entities.
  - **vat_number** (String) - Optional - The VAT number for foreign legal entities registered within EU countries, including Latvian companies.
  - **tld** (String) - Required - The TLD, which should be "lv".

### Request Example
```json
{
  "contact_extension": {
    "registration_number": "LV123456789",
    "vat_number": "LV12345678901",
    "tld": "lv"
  }
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code. "200" for success.
- **message** (String) - A success message, e.g., "Success".
- **data** (Object)
  - **contact_id** (Integer) - The ID of the updated contact.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "contact_id": 12345
  }
}
```
```

--------------------------------

### PUT /restful/v1/folders/{folder_name}/contacts

Source: https://www.dynadot.com/domain/api-document/index

Sets the contact information for a specified folder. This allows you to associate registrant, administrative, technical, and billing contacts with domains in the folder.

```APIDOC
## PUT /restful/v1/folders/{folder_name}/contacts

### Description
Sets the contact information for a specified folder. This allows you to associate registrant, administrative, technical, and billing contacts with domains in the folder.

### Method
PUT

### Endpoint
/restful/v1/folders/{folder_name}/contacts

### Parameters
#### Path Parameters
- **folder_name** (string) - Required - The name of the folder for which to set contacts.

#### Request Body
- **reg_contact_id** (integer) - Required - The ID of the contact to set as the registrant contact.
- **admin_contact_id** (integer) - Required - The ID of the contact to set as the administrative contact.
- **tech_contact_id** (integer) - Required - The ID of the contact to set as the technical contact.
- **bill_contact_id** (integer) - Required - The ID of the contact to set as the billing contact.
- **apply_for_future_domain** (boolean) - Optional - Apply this setting to domains that will be moved to this folder in the future.
- **sync_setting_to_existing_domains_in_this_folder** (boolean) - Optional - Synchronize the settings of all domains in this folder.

### Request Example
```json
{
  "reg_contact_id": 12345,
  "admin_contact_id": 12346,
  "tech_contact_id": 12347,
  "bill_contact_id": 12348,
  "apply_for_future_domain": false,
  "sync_setting_to_existing_domains_in_this_folder": false
}
```

### Response
#### Success Response (200)
- **code** (string) - The response code, "200" indicates success.
- **message** (string) - A message indicating the result of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### SET_PRIVACY Command

Source: https://www.dynadot.com/domain/api-document/index

Manages the privacy settings for a domain, including privacy level and WHOIS privacy options.

```APIDOC
## PUT /restful/v1/domains/{domain_name}/privacy

### Description
Sets the privacy level and WHOIS privacy option for a domain.

### Method
PUT

### Endpoint
`/restful/v1/domains/{domain_name}/privacy`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to update.

#### Headers
- **Content-Type**: `application/json`
- **Accept**: `application/json`
- **Authorization**: `Bearer API_KEY`
- **X-Signature**: `{signature}`

#### Request Body
- **privacy_level** (string) - Required - The desired privacy status. Supported values: `off`, `partial`, `full`.
- **whois_privacy_option** (boolean) - Required - The WHOIS privacy option.

### Request Example
```json
{
  "privacy_level": "full",
  "whois_privacy_option": true
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code, "200" for success.
- **message** (string) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Set Default Stealth Forwarding API Request (JSON)

Source: https://www.dynadot.com/domain/api-document/index

This snippet illustrates how to set up default stealth forwarding via the Dynadot API. It requires a stealth URL and an optional stealth title for the forwarded page. The response includes a status code and message.

```JSON
PUT https://api.dynadot.com/restful/v1/accounts/default_stealth_forwarding
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "stealth_url": "String",
  "stealth_title": "String"
}
```

--------------------------------

### General API Data Response Structure

Source: https://www.dynadot.com/domain/api-document/index

This is a generic structure for API responses that contain data, including a response code, message, and a data object which may contain a list of orders.

```JSON
{
  "code": "Integer",
  "message": "String",
  "data": {
    "order_list": [
      {
        "order_id": "Integer",
        "submitted_time": "Long",
        "currency": "String",
        "payment_method": "String",
        "total_cost": "String",
        "total_paid": "String",
        "status": "String",
        "order_item": [
          {
            "type": "String",
            "name": "String",
            "duration": "Integer",
            "cost": "String",
            "status": "String"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### DELETE /restful/v1/folders/{folder_name}

Source: https://www.dynadot.com/domain/api-document/index

Deletes a specified folder. The folder name is required as a path parameter.

```APIDOC
## DELETE /restful/v1/folders/{folder_name}

### Description
Deletes a specified folder. The folder name is required as a path parameter.

### Method
DELETE

### Endpoint
https://api.dynadot.com/restful/v1/folders/{folder_name}

### Parameters
#### Path Parameters
- **folder_name** (String) - Required - The name of the folder to delete.

### Response
#### Success Response (200)
- **code** (String) - The response code.
- **message** (String) - The response message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Set Domain Forwarding

Source: https://www.dynadot.com/domain/api-document/index

Configures the HTTP forwarding for a domain to a specified URL. Supports temporary or permanent forwarding.

```APIDOC
## PUT /restful/v1/domains/{domain_name}/domain_forwarding

### Description
Configures the HTTP forwarding for a domain to a specified URL. Supports temporary or permanent forwarding.

### Method
PUT

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/domain_forwarding`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to configure forwarding for.

#### Request Body
- **forward_url** (string) - Required - The URL to which the domain should forward. Must be URL-encoded.
- **is_temporary** (boolean) - Optional - Specifies if the forwarding is temporary (true) or permanent (false). Defaults to true.

### Request Example
```json
{
  "forward_url": "http://example.com",
  "is_temporary": false
}
```

### Response
#### Success Response (200)
- **code** (integer) - The status code of the response.
- **message** (string) - A message indicating the success or failure of the operation.

#### Response Example
```json
{
  "code": 200,
  "message": "Success"
}
```
```

--------------------------------

### PUT /restful/v1/accounts/default_email_forwarding

Source: https://www.dynadot.com/domain/api-document/index

Configure default email forwarding settings for your account. This endpoint supports different forwarding types and alias configurations.

```APIDOC
## PUT /restful/v1/accounts/default_email_forwarding

### Description
Sets the default email forwarding for your account. You can configure forwarding to a specific type (none, forward, or MX) and manage email aliases and mail exchange records.

### Method
PUT

### Endpoint
/restful/v1/accounts/default_email_forwarding

### Parameters
#### Request Body
- **email_forward_type** (String) - Required - The type of email forwarding. Supported values: 'mtype_none', 'mtype_forward', 'mtype_mx'.
- **email_alias_list** (List) - Optional - The list of email aliases to set.
  - **username** (String) - Optional - The username for the email alias (used when type is 'forward').
  - **to_email** (String) - Optional - The destination email address for the alias (used when type is 'forward').
- **mail_exchange_list** (List) - Optional - The list of mail exchange records to set.
  - **host** (String) - Optional - The mail host (used when type is 'mx').
  - **distance** (String) - Optional - The priority distance for the MX record (used when type is 'mx').

### Request Example
```json
{
  "email_forward_type": "mtype_forward",
  "email_alias_list": [
    {
      "username": "info",
      "to_email": "info@example.com"
    }
  ]
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code, '200' for success.
- **message** (String) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Dynadot API Folder Rename Request (JSON)

Source: https://www.dynadot.com/domain/api-document/index

Details the JSON request body for renaming an existing domain folder via the Dynadot API. Requires the new folder name.

```json
{
  "new_folder_name": "String"
}
```

--------------------------------

### GET_DNSSEC Command

Source: https://www.dynadot.com/domain/api-document/index

Retrieves the DNSSEC information for a specified domain.

```APIDOC
## GET /restful/v1/domains/{domain_name}/dnssec

### Description
Retrieves the DNSSEC information for a specified domain.

### Method
GET

### Endpoint
`/restful/v1/domains/{domain_name}/dnssec`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to query.

#### Headers
- **Content-Type**: `application/json`
- **Accept**: `application/json`
- **Authorization**: `Bearer API_KEY`

### Response
#### Success Response (200)
- **dnssec_info_list** (list) - A list containing DNSSEC information.

#### Response Example
```json
{
  "dnssec_info_list": [
    {
      "key_tag": 12345,
      "digest_type": "sha256",
      "digest": "exampledigest",
      "algorithm": "rsa_sha256",
      "flags": "ksk",
      "public_key": "BASE64ENCODEDPUBLICKEY"
    }
  ]
}
```
```

--------------------------------

### Set Default Renewal Option - API Request

Source: https://www.dynadot.com/domain/api-document/index

This API request configures the default domain renewal option for an account. Supported options include 'reset', 'auto', and 'donot'. The request is a PUT request to the /accounts/default_renew_option endpoint.

```JSON
PUT https://api.dynadot.com/restful/v1/accounts/default_renew_option
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "renew_option": "String"

}
```

--------------------------------

### POST /aftermarket/expired_closeouts/{domain_name}/purchase

Source: https://www.dynadot.com/domain/api-document/index

Purchases an expired closeout domain. This endpoint is used to acquire domains that have expired and are available as closeout deals.

```APIDOC
## POST /aftermarket/expired_closeouts/{domain_name}/purchase

### Description
Purchases an expired closeout domain. This endpoint is used to acquire domains that have expired and are available as closeout deals.

### Method
POST

### Endpoint
`/restful/v1/aftermarket/expired_closeouts/{domain_name}/purchase`

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The name of the expired closeout domain to purchase.

#### Query Parameters
- **currency** (String) - Optional - The currency to use for the purchase. Supported values: `usd`, `gbp`, `eur`, `inr`, `pln`, `zar`, `ltl`, `cny`, `cad`, `jpy`, `nzd`, `rub`, `aud`, `mxn`, `brl`, `idr`, `ars`, `cop`, `dkk`, `rsd`, `hkd`, `chf`, `aed`, `myr`, `ngn`, `kes`, `czk`, `btc`, `nok`.

#### Request Body
- **currency** (String) - Required - The currency for the purchase.

### Request Example
```json
{
  "currency": "usd"
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code.
- **message** (String) - The response message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Clear Default Setting

Source: https://www.dynadot.com/domain/api-document/index

Resets the default account settings for a specified service type.

```APIDOC
## PUT /restful/v1/accounts/clear_default_setting

### Description
Resets the default account settings for a specified service type.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/accounts/clear_default_setting

### Parameters
#### Request Body
- **service_type** (String) - Required - The service type for the default account setting you wish to reset. Supported values: forward, stealth, email_forwarding, dns, nameservers

### Request Example
{
  "service_type": "dns"
}

### Response
#### Success Response (200)
- **code** (String) - The status code of the response.
- **message** (String) - The message indicating the success of the operation.

#### Response Example
{
  "code": "200",
  "message": "Success"
}
```

--------------------------------

### Domain Transfer Order Item Structure

Source: https://www.dynadot.com/domain/api-document/index

This JSON structure represents an item within a domain transfer order, detailing its type, name, duration, cost, and status.

```JSON
{
  "type": "String",
  "name": "String",
  "duration": "Integer",
  "cost": "String",
  "status": "String"
}
```

--------------------------------

### PUT /domains/{domain_name}/notes

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to set or update a note for a specific domain. Notes can be used for internal organization or to add important reminders related to the domain.

```APIDOC
## PUT /domains/{domain_name}/notes

### Description
Allows you to set or update a note for a specific domain. Notes can be used for internal organization or to add important reminders related to the domain.

### Method
PUT

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/notes`

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The name of the domain to associate the note with.

#### Request Body
- **note** (String) - Required - The note content for the domain.

### Request Example
```json
{
  "note": "This domain is for the new marketing campaign."
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code of the response, '200' for success.
- **message** (String) - A message indicating the result of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Set Default DNS Records - API Request

Source: https://www.dynadot.com/domain/api-document/index

This API request allows setting default DNS records for an account, including main and sub DNS records. It supports various record types and options to add to current settings. The request is a PUT request to the /default_records endpoint.

```JSON
PUT https://api.dynadot.com/restful/v1/default_records
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "dns_main_list": [
    {
       "record_type": "String",
       "record_value1": "String",
       "record_value2": "String"
    }
  ],
  "sub_list": [
    {
       "sub_host": "String",
       "record_type": "String",
       "record_value1": "String",
       "record_value2": "String"
    }
  ],
  "ttl": 86400,
  "add_dns_to_current_setting": false

}
```

--------------------------------

### PUT /restful/v1/folders/{folder_name}/records

Source: https://www.dynadot.com/domain/api-document/index

Updates the DNS records for a specified folder. This allows for configuration of both main and sub-records, including record type, values, and TTL.

```APIDOC
## PUT /restful/v1/folders/{folder_name}/records

### Description
Updates the DNS records for a specified folder. This allows for configuration of both main and sub-records, including record type, values, and TTL.

### Method
PUT

### Endpoint
/restful/v1/folders/{folder_name}/records

### Parameters
#### Path Parameters
- **folder_name** (string) - Required - The name of the folder for which to update records.

#### Request Body
- **dns_main_list** (array) - Optional - A list of main DNS records to configure.
  - **record_type** (string) - Optional - The type of the DNS record (e.g., A, CNAME, MX).
  - **record_value1** (string) - Optional - The first value of the DNS record.
  - **record_value2** (string) - Optional - The second value of the DNS record.
- **dns_sub_list** (array) - Optional - A list of sub DNS records to configure.
  - **sub_host** (string) - Optional - The subhost of the DNS record.
  - **record_type** (string) - Optional - The record type of the DNS record. Supported values: a, cname, forward, aaaa, txt, stealth, mx, email, caa, aname, srv, ns.
  - **record_value1** (string) - Optional - The value of the DNS record.
  - **record_value2** (string) - Optional - The second value of the DNS record.
- **ttl** (string) - Optional - The TTL (Time To Live) for the DNS records.
- **apply_for_future_domain** (boolean) - Optional - Apply this setting to domains that will be moved to this folder in the future.
- **sync_setting_to_existing_domains_in_this_folder** (boolean) - Optional - Synchronize the settings of all domains in this folder.

### Request Example
```json
{
  "dns_main_list": [
    {
      "record_type": "A",
      "record_value1": "192.168.1.1"
    }
  ],
  "dns_sub_list": [
    {
      "sub_host": "www",
      "record_type": "CNAME",
      "record_value1": "example.com"
    }
  ],
  "ttl": "3600",
  "apply_for_future_domain": false,
  "sync_setting_to_existing_domains_in_this_folder": false
}
```

### Response
#### Success Response (200)
- **code** (string) - The response code, "200" indicates success.
- **message** (string) - A message indicating the result of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### DNS Sub List Operations

Source: https://www.dynadot.com/domain/api-document/index

Allows listing and filtering DNS records associated with subdomains.

```APIDOC
## GET /dns/sub/list

### Description
Lists DNS records for subdomains, with options to filter by subdomain host, record type, and value.

### Method
GET

### Endpoint
/dns/sub/list

### Parameters
#### Query Parameters
- **sub_host** (String) - Optional - The subdomain host.
- **record_type** (String) - Optional - The record type of the DNS record. Supported values: a, cname, forward, aaaa, txt, stealth, mx, email, caa, aname, srv, ns.
- **record_value1** (String) - Optional - The value of the DNS record.
- **record_value2** (String) - Optional - The second value of the DNS record.

### Request Example
None

### Response
#### Success Response (200)
- **dns_sub_list** (List) - A list of DNS records for subdomains.
  - **sub_host** (String) - The subdomain host.
  - **record_type** (String) - The record type.
  - **record_value1** (String) - The value of the record.
  - **record_value2** (String) - The second value of the record.
  - **ttl** (String) - The time to live for the record.

#### Response Example
```json
{
  "dns_sub_list": [
    {
      "sub_host": "www",
      "record_type": "A",
      "record_value1": "192.168.1.2",
      "record_value2": "",
      "ttl": "3600"
    },
    {
      "sub_host": "mail",
      "record_type": "MX",
      "record_value1": "10",
      "record_value2": "mail.example.com",
      "ttl": "7200"
    }
  ]
}
```
```

--------------------------------

### Set Email Forwarding

Source: https://www.dynadot.com/domain/api-document/index

Configures email forwarding for a domain, allowing emails to be forwarded to another address, handled by an MX record, or disabled.

```APIDOC
## PUT /restful/v1/domains/{domain_name}/email_forwarding

### Description
Configures email forwarding for a domain, allowing emails to be forwarded to another address, handled by an MX record, or disabled.

### Method
PUT

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/email_forwarding`

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to configure email forwarding for.

#### Request Body
- **forward_type** (string) - Required - The type of email forwarding. Supported values: "none", "mx", "forward".
- **forward_detail_list** (array) - Optional - Used when `forward_type` is "forward". Contains objects with `username` and `email` for each forwarding rule.
  - **username** (string) - Required - The username for the forwarding rule.
  - **email** (string) - Required - The email address to forward to.
- **mx_record_list** (array) - Optional - Used when `forward_type` is "mx". Contains objects with `host` and `distance` for each MX record.
  - **host** (string) - Required - The domain name of the mail server.
  - **distance** (string) - Required - The priority of the MX record (lower value means higher priority).

### Request Example
```json
{
  "forward_type": "forward",
  "forward_detail_list": [
    {
      "username": "info",
      "email": "info@example.com"
    }
  ]
}
```
```json
{
  "forward_type": "mx",
  "mx_record_list": [
    {
      "host": "mail.example.com",
      "distance": "10"
    }
  ]
}
```

### Response
#### Success Response (200)
- **code** (integer) - The status code of the response.
- **message** (string) - A message indicating the success or failure of the operation.

#### Response Example
```json
{
  "code": 200,
  "message": "Success"
}
```
```

--------------------------------

### GET_TRANSFER_STATUS Command

Source: https://www.dynadot.com/domain/api-document/index

Retrieves the transfer status for a domain. Supports multi-thread.

```APIDOC
## GET /restful/v1/domains/{domain_name}/transfer_status

### Description
Retrieves the transfer status for a specified domain and transfer type.

### Method
GET

### Endpoint
`https://api.dynadot.com/restful/v1/domains/{domain_name}/transfer_status`

### Query Parameters
- **transfer_type** (String) - Required - The type of transfer to get status for. Supported values: `transfer_in`, `transfer_away`

### Headers
- Accept: application/json
- Authorization: Bearer API_KEY

### Response
#### Success Response (200)
- **code** (String) - '200'
- **message** (String) - 'Success'
- **data** (Object)
  - **domain_transfer_status_list** (List) - The list of domain transfer status information.
    - **order_id** (String) - The order ID of the transfer.
    - **transfer_status** (String) - The status of the transfer.
    - **failed_reason** (String) - The reason for failure (if applicable).
    - **expiration_date** (Long) - The expiration time of the transfer.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "domain_transfer_status_list": [
      {
        "order_id": "234",
        "transfer_status": "Pending",
        "failed_reason": null,
        "expiration_date": 1678886400000
      }
    ]
  }
}
```
```

--------------------------------

### Set Default Domain Forwarding API Request (JSON)

Source: https://www.dynadot.com/domain/api-document/index

This snippet shows how to configure default domain forwarding using the Dynadot API. It accepts a forward URL and an optional boolean to indicate if the forwarding is temporary. The API responds with a success or error code and message.

```JSON
PUT https://api.dynadot.com/restful/v1/accounts/default_domain_forwarding
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "forward_url": "String",
  "is_temporary": false
}
```

--------------------------------

### Authorize Transfer Away

Source: https://www.dynadot.com/domain/api-document/index

Authorizes or denies a request to transfer a domain away from Dynadot.

```APIDOC
## POST /restful/v1/orders/{order_id}/authorize_transfer_away

### Description
Authorizes or denies a request to transfer a domain away from Dynadot.

### Method
POST

### Endpoint
`/restful/v1/orders/{order_id}/authorize_transfer_away`

### Parameters
#### Path Parameters
- **order_id** (Integer) - Required - The ID of the order related to the transfer away authorization.

#### Request Body
- **domain_name** (String) - Required - The domain name to authorize transfer away.
- **approve** (Boolean) - Required - Whether to approve the transfer away (true) or deny it (false).

### Request Example
```json
{
  "domain_name": "example.com",
  "approve": false
}
```

### Response
#### Success Response (200)
- **code** (Integer) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": 200,
  "message": "Success"
}
```
```

--------------------------------

### PUT /contacts/{contact_id}/set_eu_setting

Source: https://www.dynadot.com/domain/api-document/index

Sets the EU contact extension settings, including country of citizenship, for a contact.

```APIDOC
## PUT /contacts/{contact_id}/set_eu_setting

### Description
Configures the EU-specific contact extension settings for a given contact ID. This is particularly important for .EU domain registrations and requires specifying the country of citizenship if the contact's address is outside of Europe.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/contacts/{contact_id}/set_eu_setting

### Parameters
#### Path Parameters
- **contact_id** (Integer) - Required - The ID of the contact to update.

#### Request Body
- **contact_extension** (Object) - Required - The contact extension details for EU domains.
  - **country_of_citizenship** (String) - Required - The ISO 3166-1 alpha-2 country code of the contact's citizenship. This is mandatory if the contact's address is outside of Europe. Supported values include Austria (at), Belgium (be), Bulgaria (bg), Czech Republic (cz), Cyprus (cy), Germany (de), Denmark (dk), Spain (es), Estonia (ee), Finland (fi), France (fr), Greece (gr), Croatia (hr), Hungary (hu), Ireland (ie), Italy (it), Lithuania (lt), Luxembourg (lu), Latvia (lv), Malta (mt), Netherlands (nl), Poland (pl), Portugal (pt), Romania (ro), Sweden (se), Slovenia (si), Slovakia (sk), Iceland (is), Liechtenstein (li), Norway (no).
  - **tld** (String) - Required - The TLD for which this contact extension applies.

### Request Example
```json
{
  "contact_extension": {
    "country_of_citizenship": "US",
    "tld": "eu"
  }
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code. "200" for success.
- **message** (String) - A success message, e.g., "Success".
- **data** (Object)
  - **contact_id** (Integer) - The ID of the updated contact.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "contact_id": 12345
  }
}
```
```

--------------------------------

### PUT /domains/{domain_name}/domain_lock

Source: https://www.dynadot.com/domain/api-document/index

Sets the lock status for a domain.

```APIDOC
## PUT /domains/{domain_name}/domain_lock

### Description
Sets the lock status for a domain. Use `true` to lock the domain and `false` to unlock it.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/domain_lock

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain to lock or unlock.

#### Query Parameters
None

#### Request Body
- **lock** (boolean) - Required - Set to `true` to lock the domain, `false` to unlock.

### Request Example
```json
{
  "lock": false
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code of the response.
- **message** (string) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### PUT /domains/{domain_name}/clear_domain_setting

Source: https://www.dynadot.com/domain/api-document/index

Clears specific domain settings for a given service type.

```APIDOC
## PUT /domains/{domain_name}/clear_domain_setting

### Description
Clears specific domain settings for a given service type.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/clear_domain_setting

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain for which to clear settings.

#### Query Parameters
None

#### Request Body
- **service_type** (string) - Required - The service for which to clear domain settings. Supported values: forward, stealth, email_forwarding, dns, nameservers.

### Request Example
```json
{
  "service_type": "dns"
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code of the response.
- **message** (string) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### PUT /restful/v1/contacts/{contact_id}

Source: https://www.dynadot.com/domain/api-document/index

Updates an existing contact identified by `contact_id`. It supports multi-thread and API sandbox environments, and requires an X-Signature in the header.

```APIDOC
## PUT /restful/v1/contacts/{contact_id}

### Description
Updates an existing contact identified by `contact_id`. It supports multi-thread and API sandbox environments, and requires an X-Signature in the header.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/contacts/{contact_id}

### Parameters
#### Path Parameters
- **contact_id** (Integer) - Required - The ID of the contact to update.

#### Request Body
- **contact** (Object) - Required - The contact object containing updated details.
  - **organization** (String) - Optional - The organization name.
  - **name** (String) - Required - The name of the contact owner.
  - **email** (String) - Required - The email address.
  - **phone_number** (String) - Required - The phone number.
  - **phone_cc** (String) - Required - The phone country code.
  - **fax_number** (String) - Optional - The fax number.
  - **fax_cc** (String) - Optional - The fax country code.
  - **address1** (String) - Required - The first line of the address.
  - **address2** (String) - Optional - The second line of the address.
  - **city** (String) - Required - The city.
  - **state** (String) - Optional - The state.
  - **zip** (String) - Required - The zip code.
  - **country** (String) - Required - The country.

### Request Example
```json
{
  "contact": {
    "organization": "updated org",
    "name": "updated name",
    "email": "updated@email.com",
    "phone_number": "9876543210",
    "phone_cc": "1",
    "address1": "updated address1",
    "city": "updated city",
    "zip": "updated zip",
    "country": "updated country"
  }
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code, "200" for success.
- **message** (String) - The response message, "Success" for success.
- **data** (Object)
  - **contact_id** (Integer) - The ID of the updated contact.

#### Response Example
```json
{
  "code": "200",
  "message": "Success",
  "data": {
    "contact_id": 12345
  }
}
```
```

--------------------------------

### Set Default Contacts API

Source: https://www.dynadot.com/domain/api-document/index

Sets the default WHOIS contacts (registrant, admin, technical, billing) for your account.

```APIDOC
## PUT /accounts/default_contacts

### Description
Sets the default WHOIS registrant, admin, technical, and billing contacts for your account.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/accounts/default_contacts

### Parameters
#### Request Body
- **registrant_contact_id** (integer) - Required - The ID of the contact to set as the default WHOIS registrant contact.
- **admin_contact_id** (integer) - Required - The ID of the contact to set as the default WHOIS admin contact.
- **technical_contact_id** (integer) - Required - The ID of the contact to set as the default WHOIS technical contact.
- **billing_contact_id** (integer) - Required - The ID of the contact to set as the default WHOIS billing contact.

### Request Example
```json
{
  "registrant_contact_id": 0,
  "admin_contact_id": 0,
  "technical_contact_id": 0,
  "billing_contact_id": 0
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code of the response.
- **message** (string) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Set Transfer Auth Code API Request

Source: https://www.dynadot.com/domain/api-document/index

This snippet provides the JSON format for setting a transfer authorization code for a domain. It requires both the domain name and the authorization code as string parameters.

```JSON
{
  "domain_name": "String",
  "auth_code": "String"
}
```

--------------------------------

### Update Folder Email Forwarding

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to set or update email forwarding settings for a specific folder. You can configure forwarding aliases and mail exchange records.

```APIDOC
## PUT /restful/v1/folders/{folder_name}/email_forwarding

### Description
Allows you to set or update email forwarding settings for a specific folder, including aliases and mail exchange records.

### Method
PUT

### Endpoint
`/restful/v1/folders/{folder_name}/email_forwarding`

### Parameters
#### Path Parameters
- **folder_name** (String) - Required - The name of the folder to update.

#### Request Body
- **email_forward_type** (String) - Required - The type of email forwarding.
- **email_alias_list** (Array of Objects) - Optional - A list of email aliases.
  - **username** (String) - Required - The username for the alias.
  - **to_email** (String) - Required - The email address to forward to.
- **mail_exchange_list** (Array of Objects) - Optional - A list of mail exchange records.
  - **host** (String) - Required - The hostname of the mail exchange server.
  - **distance** (String) - Optional - The distance priority for the mail exchange record, used when `email_forward_type` is "mx".
- **apply_for_future_domain** (Boolean) - Optional - Apply this setting to domains that will be moved to this folder in the future.
- **sync_setting_to_existing_domains_in_this_folder** (Boolean) - Optional - Synchronize the settings of all domains in this folder.

### Request Example
```json
{
  "email_forward_type": "String",
  "email_alias_list": [
    {
      "username": "String",
      "to_email": "String"
    }
  ],
  "mail_exchange_list": [
    {
      "host": "String",
      "distance": "String"
    }
  ],
  "apply_for_future_domain": false,
  "sync_setting_to_existing_domains_in_this_folder": false
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code, "200" for success.
- **message** (String) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Set Folder Renew Option

Source: https://www.dynadot.com/domain/api-document/index

This endpoint allows you to configure the renewal option for domains within a specific folder. Supported options are 'reset', 'auto', and 'donot'.

```APIDOC
## PUT /restful/v1/folders/{folder_name}/renew_option

### Description
Configures the renewal option for domains within a specific folder. Supported options are 'reset', 'auto', and 'donot'.

### Method
PUT

### Endpoint
`/restful/v1/folders/{folder_name}/renew_option`

### Parameters
#### Path Parameters
- **folder_name** (String) - Required - The name of the folder to update.

#### Request Body
- **renew_option** (String) - Required - The renewal option to configure. Supported values: "reset", "auto", "donot".
- **apply_for_future_domain** (Boolean) - Optional - Apply this setting to domains that will be moved to this folder in the future.
- **sync_setting_to_existing_domains_in_this_folder** (Boolean) - Optional - Synchronize the settings of all domains in this folder.

### Request Example
```json
{
  "renew_option": "auto",
  "apply_for_future_domain": false,
  "sync_setting_to_existing_domains_in_this_folder": false
}
```

### Response
#### Success Response (200)
- **code** (String) - The status code, "200" for success.
- **message** (String) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### PUT /restful/v1/accounts/default_contacts

Source: https://www.dynadot.com/domain/api-document/index

Set default contact information for your account. This endpoint is used to define the default registrant contact details.

```APIDOC
## PUT /restful/v1/accounts/default_contacts

### Description
Sets the default contact information for your account, specifically the registrant contact.

### Method
PUT

### Endpoint
/restful/v1/accounts/default_contacts

### Parameters
#### Request Body
- **registrant_contact_id** (Integer) - Required - The ID of the contact to set as the default registrant contact.

### Request Example
```json
{
  "registrant_contact_id": 12345
}
```

### Response
#### Success Response (200)
- **code** (String) - The response code, '200' for success.
- **message** (String) - A success message.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Set Default Renew Option API

Source: https://www.dynadot.com/domain/api-document/index

Sets the default domain renewal option for your account to 'reset', 'auto', or 'donot'.

```APIDOC
## PUT /accounts/default_renew_option

### Description
Sets the default renewal option for your domains. Supported values are 'reset', 'auto', and 'donot'.

### Method
PUT

### Endpoint
https://api.dynadot.com/restful/v1/accounts/default_renew_option

### Parameters
#### Request Body
- **renew_option** (string) - Required - The renewal option to set. Supported values: reset, auto, donot.

### Request Example
```json
{
  "renew_option": "auto"
}
```

### Response
#### Success Response (200)
- **code** (string) - The status code of the response.
- **message** (string) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Set Transfer Auth Code

Source: https://www.dynadot.com/domain/api-document/index

Sets or updates the authorization code for a domain transfer.

```APIDOC
## POST /restful/v1/orders/{order_id}/update_transfer_auth_code

### Description
Sets or updates the authorization code for a domain transfer.

### Method
POST

### Endpoint
`/restful/v1/orders/{order_id}/update_transfer_auth_code`

### Parameters
#### Path Parameters
- **order_id** (Integer) - Required - The ID of the order associated with the domain transfer.

#### Request Body
- **domain_name** (String) - Required - Your domain name.
- **auth_code** (String) - Required - Your transfer authorization code.

### Request Example
```json
{
  "domain_name": "example.com",
  "auth_code": "AUTHCODE123"
}
```

### Response
#### Success Response (200)
- **code** (Integer) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": 200,
  "message": "Success"
}
```
```

--------------------------------

### Set Default WHOIS Contacts - API Request

Source: https://www.dynadot.com/domain/api-document/index

This API request is used to set the default WHOIS contacts for an account. It requires the IDs for the registrant, admin, technical, and billing contacts. The request is a PUT request to the /accounts/default_contacts endpoint.

```JSON
PUT https://api.dynadot.com/restful/v1/accounts/default_contacts
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}

{
  "registrant_contact_id": 0,
  "admin_contact_id": 0,
  "technical_contact_id": 0,
  "billing_contact_id": 0

}
```

--------------------------------

### Set Default Contacts API Request Structure

Source: https://www.dynadot.com/domain/api-document/index

This outlines the parameters required for the Set Default Contacts command in the Dynadot API. It specifies that a `registrant_contact_id` is a mandatory integer parameter for this operation.

```Text
Request Parameters Expand All
  * registrant_contact_id Integer

```

--------------------------------

### DELETE /api/dynadot_domain_api-document/aftermarket/backorders/requests/{domain_name}

Source: https://www.dynadot.com/domain/api-document/index

Deletes a backorder request for a specific domain. Use this endpoint to cancel an existing backorder request.

```APIDOC
## DELETE /api/dynadot_domain_api-document/aftermarket/backorders/requests/{domain_name}

### Description
Deletes a backorder request for a specified domain name.

### Method
DELETE

### Endpoint
https://api.dynadot.com/restful/v1/aftermarket/backorders/requests/{domain_name}

### Parameters
#### Path Parameters
- **domain_name** (String) - Required - The name of the domain for which to delete the backorder request.

#### Headers
- **Content-Type**: application/json
- **Accept**: application/json
- **Authorization**: Bearer API_KEY
- **X-Signature**: {signature}

### Response
#### Success Response (200)
- **code** (String) - "200"
- **message** (String) - "Success"

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### DELETE /restful/v1/contacts/{contact_id}

Source: https://www.dynadot.com/domain/api-document/index

Deletes a contact identified by `contact_id`. It supports multi-thread and API sandbox environments, and requires an X-Signature in the header.

```APIDOC
## DELETE /restful/v1/contacts/{contact_id}

### Description
Deletes a contact identified by `contact_id`. It supports multi-thread and API sandbox environments, and requires an X-Signature in the header.

### Method
DELETE

### Endpoint
https://api.dynadot.com/restful/v1/contacts/{contact_id}

### Parameters
#### Path Parameters
- **contact_id** (Integer) - Required - The ID of the contact to delete.

### Response
#### Success Response (200)
- **code** (String) - The response code, "200" for success.
- **message** (String) - The response message, "Success" for success.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Delete Backorder Request - API Request

Source: https://www.dynadot.com/domain/api-document/index

Deletes a backorder request for a specific domain. Similar to adding a backorder, this supports multi-threading and sandbox testing, and requires an X-Signature. The request body is empty.

```HTTP
DELETE https://api.dynadot.com/restful/v1/aftermarket/backorders/requests/{domain_name}
Content-Type:  application/json
Accept:  application/json
Authorization:  Bearer API_KEY
X-Signature:  {signature}
```

--------------------------------

### DELETE /domains/{domain_name}/dnssec

Source: https://www.dynadot.com/domain/api-document/index

Clears the DNSSEC records for a specified domain.

```APIDOC
## DELETE /domains/{domain_name}/dnssec

### Description
Clears the DNSSEC records for a specified domain.

### Method
DELETE

### Endpoint
https://api.dynadot.com/restful/v1/domains/{domain_name}/dnssec

### Parameters
#### Path Parameters
- **domain_name** (string) - Required - The name of the domain for which to clear DNSSEC records.

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **code** (string) - The status code of the response.
- **message** (string) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": "200",
  "message": "Success"
}
```
```

--------------------------------

### Cancel Domain Transfer API Request

Source: https://www.dynadot.com/domain/api-document/index

This snippet shows how to construct a JSON request to cancel a domain transfer using the Dynadot API. It requires the domain name and is sent via a POST request to the specified endpoint.

```JSON
{
  "domain_name": "String"
}
```

--------------------------------

### DELETE /contacts/{contact_id}

Source: https://www.dynadot.com/domain/api-document/index

Deletes a contact from your Dynadot account. Requires the contact ID as a path parameter.

```APIDOC
## DELETE /contacts/{contact_id}

### Description
Deletes a contact associated with your Dynadot account.

### Method
DELETE

### Endpoint
https://api.dynadot.com/restful/v1/contacts/{contact_id}

### Parameters
#### Path Parameters
- **contact_id** (Integer) - Required - The ID of the contact to delete.

### Request Example
```json
{
  "message": "Contact deleted successfully"
}
```

### Response
#### Success Response (200)
- **code** (String) - Indicates success, typically '200'.
- **message** (String) - A confirmation message.
- **data** (Object) - Contains the ID of the deleted contact.
  - **contact_id** (Integer) - The ID of the contact that was deleted.
```

--------------------------------

### Cancel Domain Transfer

Source: https://www.dynadot.com/domain/api-document/index

Cancels a domain transfer request. This operation requires the order ID of the transfer.

```APIDOC
## POST /restful/v1/orders/{order_id}/cancel_transfer

### Description
Cancels a domain transfer request.

### Method
POST

### Endpoint
`/restful/v1/orders/{order_id}/cancel_transfer`

### Parameters
#### Path Parameters
- **order_id** (Integer) - Required - The ID of the order for the domain transfer to cancel.

#### Request Body
- **domain_name** (String) - Required - The domain name associated with the transfer.

### Request Example
```json
{
  "domain_name": "example.com"
}
```

### Response
#### Success Response (200)
- **code** (Integer) - The status code of the response.
- **message** (String) - A message indicating the success of the operation.

#### Response Example
```json
{
  "code": 200,
  "message": "Success"
}
```
```
