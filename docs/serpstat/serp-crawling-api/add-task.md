# addTask | SERP Crawling API

## Overview

The [`tasks.addTask`](https://serpstat.com/rt/api/v2/#tasks.addTask) method allows sending keywords to crawl regular SERP and local results and get a task ID for further queries.

### AI Overview
Google AI Overview results are currently available within standard **Desktop** SERP Crawling requests at no additional cost. This allows you to access AI-generated summaries and reference sources as part of your regular SERP data. However, **starting August 1, 2025, AI Overview data will become a separate optional parameter** `type=regular_aio` with additional pricing. After this date, you will need to specifically enable AI Overview in your API requests and account for the additional costs in your usage billing.

### NOTE
This API has separate billing, and credits for this API are not included in any available subscription plan and must be purchased separately. See [details](https://api-docs.serpstat.com/docs/serpstat-public-api/139902435d58c-serp-scraper-api)

## Endpoint

- **URL**: `https://serpstat.com/rt/api/v2/#tasks.addTask`
- **Method**: `POST`
- **Authentication**: API Key

## Request

### Security

- **API Key** - Required

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"` |
| `method` | string | Yes | Should be exact `tasks.addTask` |
| `params` | object | Yes | Parameters for the task |

#### Params Object

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keywords` | string | Yes | Keywords for parsing divided by commas. |
| `seId` | any | Yes | Search engine identifier |
| `countryId` | integer | Yes | Country identifier. Reffer to full list of [county ids](https://api-docs.serpstat.com/docs/serpstat-public-api/oerp7nc8ivqp7-countries) |
| | | | `>= 1` <= 247 |
| `regionId` | integer | No | Region or city identifier. Reffer to full list of [region ids](https://docs.google.com/spreadsheets/d/1LUDtm-L1qWMVpmWuN-nvDyYFfQtfiXUh5LIHE8sjs0k/edit#gid=75443986) |
| | | | `>= 1` |
| `langId` | integer | No | Language identifier. Reffer to full list of [lang ids](https://api-docs.serpstat.com/docs/serpstat-public-api/wuoshjguna09o-languages) |
| | | | `>= 1` <= 48 |
| | | | **Default:** `1` |
| `typeId` | integer | No | Device type identifier |
| | | | `>= 1` <= 2 |
| | | | **Default:** `1` |
| `type` | string | No | Type of Google results and SERP parsing mode |
| | | | **Allowed values:** `regular`, `local`, `regular_aio` |
| | | | **Default:** `regular` |
| | | | **Example:** `regular_aio` |

### Request Example

```json
{
  "id": "123",
  "method": "tasks.addTask",
  "params": {
    "keywords": "explain the gauss rifle principle,why iphone better than samsung",
    "typeId": 1,
    "seId": 1,
    "countryId": 23,
    "regionId": 21176,
    "langId": 1
  }
}
```

### cURL Example

```bash
curl --request POST \
  --url 'https://serpstat.com/rt/api/v2/?token=123#tasks.addTask' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "tasks.addTask",
    "params": {
      "keywords": "explain the gauss rifle principle,why iphone better than samsung",
      "typeId": 1,
      "seId": 1,
      "countryId": 23,
      "regionId": 21176,
      "langId": 1
    }
  }'
```

## Response

### Success Response (200)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"` |
| `result` | object | Yes | Result object containing task information |
| `result.task_id` | string | Yes | Crawling identifier |
| `result.blocked_keywords` | array[object] | Yes | Keywords with special symbols, which were rejected, credits won't be charged |

### Response Example

```json
{
  "id": "123",
  "result": {
    "task_id": "5484945",
    "blocked_keywords": []
  }
}
```

## Error Handling

The API returns standard HTTP status codes and error messages. Make sure to handle potential errors in your application code.

## Rate Limiting

This API has separate billing and credits must be purchased separately. Monitor your usage and account balance to avoid service interruptions.

## Notes

- AI Overview data will be available as a separate parameter `type=regular_aio` starting August 1, 2025
- Keywords with special symbols that are rejected will appear in `blocked_keywords` array and won't consume credits
- Each keyword consumes credits based on the search engine, country, and other parameters
- Use the returned `task_id` with [`getTaskResult`](https://api-docs.serpstat.com/docs/serpstat-public-api/50bwxkycuia8p-get-task-result) to retrieve parsing results
- This API is separate from other Serpstat APIs and requires separate credit purchase