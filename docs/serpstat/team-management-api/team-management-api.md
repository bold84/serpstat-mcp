ocs/serpstat/11-team-management-api.md</path>
# Team Management API

v4.0

## API Base URL

Default server: https://api.serpstat.com/v4

## Purpose

Manage your team directly.

## Current Version: 4

https://api.serpstat.com/v4 — Endpoint URL, through which all requests should be processed.

## API Protocol

Our API protocol is [JSON-RPC 2.0](https://www.jsonrpc.org/specification).

## Requests

*   All requests should be sent via **POST** method.
*   All request parameters must be set via POST request body in **JSON** format.
*   Each request should contain a `method` name parameter corresponding to the API method (case-sensitive).

## Authentication

*   Tokens are used for authentication. Create a token on [your profile page](https://serpstat.com/users/profile/).
*   `token` is required for all API requests.
*   Api token is available for almost paid and trial plans that have API feature enabled.

## Pagination

For pagination, use the parameters:

*   `size`: number of results per page (default 100, maximum 1000);
*   `page`: page number (default is 1st page).

Please note: not all methods are supporting pagination.

## Filters

Filters can be applied to each method, most of them are specific for the method you used. `filters` object are optional for most methods.

## Responses

*   All responses are in **JSON** format.
*   All responses have 200 HTTP status, even erroneous ones. In case of error, the response contains an `error` object instead of `result`.

## API Credits (Limits)

When calculating the used credits, your pricing plan's API requests are taken into account, including identical requests and requests for export.

## Request Rates

Most subscription plans are limited to 1 request per second. Top-tier plans allow up to 10 requests per second. For higher rate limits, contact our sales team. Exceeding your rate limit will result in an error response.

## Max Results

The maximum number of results returned by each API method is limited up to 60,000 rows.

## Additional Information

*   [Contact Support](https://serpstat.com/)
*   [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
*   [Terms of Service](https://serpstat.com/users/license-agreement/)