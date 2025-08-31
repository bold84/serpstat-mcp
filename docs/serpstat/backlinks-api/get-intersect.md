# getIntersect | Serpstat Backlinks API

## Overview

The `SerpstatBacklinksProcedure.getIntersect` method gives you a list of backlinks from intersecting donors to the analyzed domain. The data set is similar to the [Links intersect report](https://serpstat.com/backlinks/intersect/).

### Credit Consumption

- **Credits**: This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

### Important Note

Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

### Use Case

With the `SerpstatBacklinksProcedure.getIntersect` method, check what domains are referring to the analyzed domain and its competitors.

---

## Request

### Method
- **POST** `https://api.serpstat.com/v4/#SerpstatBacklinksProcedure.getIntersect`

### Authentication
- **Security**: API Key
- **Header**: `Authorization: Bearer YOUR_API_TOKEN`

### Request Body

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getIntersect",
  "params": {
    "query": "gepur.com",
    "sort": "links_count1",
    "order": "desc",
    "page": 1,
    "size": 2,
    "intersect": [
      "klubok.com",
      "issaplus.com"
    ],
    "complexFilter": [
      [
        {
          "field": "domain_rank",
          "compareType": "gte",
          "value": [
            1
          ]
        },
        {
          "field": "links_count1",
          "compareType": "gte",
          "value": [
            1
          ]
        },
        {
          "field": "links_count2",
          "compareType": "gte",
          "value": [
            1
          ]
        }
      ]
    ]
  }
}
```

### Parameters

#### Required Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `id` | string | Request/response identifier, provided from your side, will be mirrored from request to `id` in response | `"123"` |
| `method` | string | Should be exact `SerpstatBacklinksProcedure.getIntersect` | `"SerpstatBacklinksProcedure.getIntersect"` |
| `params.query` | string | The domain name of the analyzed site | `"facebook.com"` |
| `params.intersect` | array[string] | Domains for comparison | `["klubok.com", "issaplus.com"]` |

#### Optional Parameters

| Parameter | Type | Description | Allowed Values | Default |
|-----------|------|-------------|----------------|---------|
| `params.sort` | string | Sorting by field | `domain_rank`, `links_count1`, `links_count2`, `links_count3` | `"domain_rank"` |
| `params.order` | string | Sorting order | `asc`, `desc` | `"desc"` |
| `params.page` | integer | A page number (number value) | `>= 1` | `1` |
| `params.size` | integer | A number of results (number value) | `>= 1`, `<= 1000` | `100` |
| `params.complexFilter` | array[array] | Data filtering using complex conditions. The first-level array represents "OR" conditions, and nested arrays represent "AND" conditions. | - | - |

---

## Response

### Success Response (200 OK)

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "Domain": "znaxarenko.mybb.ru",
        "SDR": 5,
        "Links count for domain #1 gepur.com": 177,
        "Links count for domain #2 klubok.com": 3,
        "Links count for domain #3 issaplus.com": 0
      },
      {
        "Domain": "speshka.com",
        "SDR": 30,
        "Links count for domain #1 gepur.com": 61,
        "Links count for domain #2 klubok.com": 1,
        "Links count for domain #3 issaplus.com": 92
      }
    ],
    "summary_info": {
      "left_lines": 972852,
      "page": 1,
      "count": 2,
      "total": 233,
      "sort": "links_count1",
      "order": "DESC"
    }
  }
}
```

### Response Schema

#### Top Level

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Request/response identifier, mirrored from request |
| `result` | object | The main result object |

#### Result Object

| Field | Type | Description |
|-------|------|-------------|
| `data` | array[object] | Array of backlink intersection results |
| `summary_info` | object | Pagination and summary information |

#### Data Array Items

| Field | Type | Description |
|-------|------|-------------|
| `Domain` | string | The domain name of the intersecting donor |
| `SDR` | integer | Search Domain Rank (SDR) of the donor domain |
| `Links count for domain #1 [query]` | integer | Number of links from this domain to the first query domain |
| `Links count for domain #2 [intersect[0]]` | integer | Number of links from this domain to the first intersect domain |
| `Links count for domain #3 [intersect[1]]` | integer | Number of links from this domain to the second intersect domain |

#### Summary Info Object

| Field | Type | Description |
|-------|------|-------------|
| `left_lines` | integer | Number of remaining results available |
| `page` | integer | Current page number |
| `count` | integer | Number of items returned on this page |
| `total` | integer | Total number of results available |
| `sort` | string | Field used for sorting |
| `order` | string | Sort order (ASC/DESC) |

---

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getIntersect' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getIntersect",
  "params": {
    "query": "gepur.com",
    "sort": "links_count1",
    "order": "desc",
    "page": 1,
    "size": 2,
    "intersect": [
      "klubok.com",
      "issaplus.com"
    ],
    "complexFilter": [
      [
        {
          "field": "domain_rank",
          "compareType": "gte",
          "value": [
            1
          ]
        },
        {
          "field": "links_count1",
          "compareType": "gte",
          "value": [
            1
          ]
        },
        {
          "field": "links_count2",
          "compareType": "gte",
          "value": [
            1
          ]
        }
      ]
    ]
  }
}'
```

---

## Practical Usage Examples

### Example 1: Basic Intersection Analysis

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getIntersect",
  "params": {
    "query": "example.com",
    "intersect": ["competitor1.com", "competitor2.com"]
  }
}
```

### Example 2: Advanced Filtering

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getIntersect",
  "params": {
    "query": "example.com",
    "intersect": ["competitor1.com", "competitor2.com"],
    "sort": "domain_rank",
    "order": "desc",
    "size": 50,
    "complexFilter": [
      [
        {
          "field": "domain_rank",
          "compareType": "gte",
          "value": [10]
        },
        {
          "field": "links_count1",
          "compareType": "gte",
          "value": [5]
        }
      ]
    ]
  }
}
```

### Example 3: Pagination

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getIntersect",
  "params": {
    "query": "example.com",
    "intersect": ["competitor1.com"],
    "page": 2,
    "size": 100
  }
}
```

---

## Error Handling

The API may return various error responses. Common error codes include:

- **400 Bad Request**: Invalid parameters or malformed request
- **401 Unauthorized**: Invalid or missing API token
- **403 Forbidden**: API token lacks permissions
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server-side error

Always check the response structure and error messages for troubleshooting.

---

## Best Practices

1. **Credit Management**: Be aware that this method charges 1 credit per result returned. Use pagination and filtering to control costs.

2. **Filtering**: Use `complexFilter` to narrow down results and reduce credit consumption.

3. **Pagination**: For large datasets, implement proper pagination to avoid hitting API limits.

4. **Rate Limiting**: Monitor your API usage to avoid rate limit issues.

5. **Error Handling**: Implement proper error handling in your application to gracefully handle API failures.