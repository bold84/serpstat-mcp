# getList | SERP Crawling API

## Overview

The `tasks.getList` method allows getting a list of required tasks with status for the last 7 days.

### Method Details

- **Method**: `tasks.getList`
- **HTTP Method**: POST
- **Endpoint**: `https://serpstat.com/rt/api/v2/#tasks.getList`
- **Authentication**: API Key required
- **Credits**: This method doesn't spend API credits.

### AI Overview Information

Google AI Overview results are currently available within standard Desktop SERP Crawling requests at no additional cost. This allows you to access AI-generated summaries and reference sources as part of your regular SERP data. However, starting August 1, 2025, AI Overview data will become a separate optional parameter `type=regular_aio` with additional pricing. After this date, you will need to specifically enable AI Overview in your API requests and account for the additional costs in your usage billing.

## Request Parameters

### Body Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | Yes | - | The request identifier provided by the client. It will be echoed as field `id` in the response. |
| `method` | string | Yes | - | Should be exact `tasks.getList` |
| `params` | object | Yes | - | Object with parameters |

#### `params` Object

| Parameter | Type | Required | Default | Validation | Description |
|-----------|------|----------|---------|------------|-------------|
| `page` | integer | No | `1` | `>= 1` | Page Number |
| `pageSize` | integer | No | - | `>= 100` and `<= 1000` | Page size |

## Request Example

### JSON Request

```json
{
  "id": "123",
  "method": "tasks.getList",
  "params": {
    "page": 1,
    "pageSize": 1000
  }
}
```

### cURL Example

```bash
curl --request POST \
  --url 'https://serpstat.com/rt/api/v2/?token=YOUR_API_KEY#tasks.getList' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "tasks.getList",
    "params": {
      "page": 1,
      "pageSize": 1000
    }
  }'
```

## Response Schema

### Success Response (200 OK)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | The request identifier provided by the client. It will be echoed as field `id` in the response. |
| `result` | array[object] | Yes | Array of task objects |

#### `result` Array Items

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `task_id` | string | Yes | - | Crawling identifier |
| `se_id` | any | Yes | - | Search engine identifier |
| `country_id` | integer | Yes | `>= 1` and `<= 247` | Country identifier. Refer to full list of [country ids](/docs/serpstat-public-api/oerp7nc8ivqp7-countries) |
| `lang_id` | integer | Yes | `>= 1` and `<= 48` | Language identifier. Refer to full list of [lang ids](/docs/serpstat-public-api/wuoshjguna09o-languages) |
| `region_id` | integer | Yes | `>= 1` | Region or city identifier. Refer to full list of [region ids](https://docs.google.com/spreadsheets/d/1LUDtm-L1qWMVpmWuN-nvDyYFfQtfiXUh5LIHE8sjs0k/edit#gid=75443986) |
| `device_type_id` | integer | Yes | `>= 1` and `<= 2` | Device type identifier |
| `progress` | string | Yes | - | Task execution progress, in percents |
| `keywords_count` | integer | Yes | - | Keywords quantity in the task |
| `created_at` | string | Yes | - | Date and time, when the task was created, in format `YYYY_MM-DD HH:MM:SS` |
| `parsed_at` | string or null | Yes | - | Date and time, when the task was completed, in format `YYYY_MM-DD HH:MM:SS` |

## Response Example

### JSON Response

```json
{
  "id": "123",
  "result": [
    {
      "task_id": "5484945",
      "se_id": "1",
      "country_id": "23",
      "lang_id": "1",
      "region_id": "21176",
      "device_type_id": "1",
      "progress": "100%",
      "keywords_count": "3",
      "created_at": "2025-02-11 13:34:35",
      "parsed_at": "2025-02-11 13:35:07"
    },
    {
      "task_id": "5484966",
      "se_id": "1",
      "country_id": "23",
      "lang_id": "1",
      "region_id": "21176",
      "device_type_id": "1",
      "progress": "0%",
      "keywords_count": "2",
      "created_at": "2025-02-11 16:51:16",
      "parsed_at": null
    }
  ]
}
```

## Usage Notes

1. **Time Range**: This method returns tasks for the last 7 days only.
2. **Pagination**: Use the `page` and `pageSize` parameters to navigate through the results.
3. **No Credit Cost**: This method is free and doesn't consume API credits.
4. **Task Status**: The `progress` field shows the execution status as a percentage (e.g., "100%" for completed, "0%" for not started).
5. **Completion Time**: The `parsed_at` field is null for incomplete tasks and contains the completion timestamp for finished tasks.
6. **Device Types**: Device type identifiers are typically 1 for Desktop and 2 for Mobile.
7. **Search Engines**: The `se_id` parameter refers to search engine identifiers (1 = Google, 2 = Bing, etc.).