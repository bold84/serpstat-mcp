# getAnchors

The `SerpstatBacklinksProcedure.getAnchors` method gives you a list of keywords used as anchors for backlinks of a site you analyze. The data set is similar to the [Anchors](https://serpstat.com/backlinks/anchors/) report.

> **Credits**: This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

> **Note**: Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Request

### Security: API Key

### Body

```json
{
  "method": "SerpstatBacklinksProcedure.getAnchors",
  "id": "string",
  "params": {
    "query": "string",
    "searchType": "string",
    "anchor": "string",
    "count": "string",
    "sort": "string",
    "order": "string",
    "page": "integer",
    "size": "integer",
    "complexFilter": "array[array]"
  }
}
```

### Parameters

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| method | string | Yes | Should be exact `SerpstatBacklinksProcedure.getAnchors` | `SerpstatBacklinksProcedure.getAnchors` |
| id | string | Yes | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" | `"123"` |
| params | object | - | - | - |
| query | string | Yes | The domain name of the analyzed site | `facebook.com` |
| searchType | string | Yes | Search modes for analysis | `domain` / `domain_with_subdomains` |
| anchor | string | - | Anchor text | - |
| count | string | - | Number of words in anchor | - |
| sort | string | - | Sorting by field | `total` / `refDomains` / `nofollow` / `anchor` / `lastupdate` |
| order | string | - | Sorting order | `asc` / `desc` |
| page | integer | - | A page number (number value) | `>= 1` |
| size | integer | - | A number of results (number value) | `>= 1` / `<= 1000` |
| complexFilter | array[array] | - | Data filtering using complex conditions. The first-level array represents "OR" conditions, and nested arrays represent "AND" conditions. | - |

### Default Values

- `searchType`: `domain_with_subdomains`
- `sort`: `lastupdate`
- `order`: `desc`
- `page`: `1`
- `size`: `100`

## Responses

### 200 OK

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "anchor": "www.serpstat.com",
        "refDomains": 10,
        "total": 11,
        "noFollow": 1
      },
      {
        "anchor": "serpstat.com/ru",
        "refDomains": 4,
        "total": 6,
        "noFollow": 3
      }
    ],
    "summary_info": {
      "left_lines": 972983,
      "page": 1,
      "count": 2,
      "total": 64,
      "sort": "anchor",
      "order": "DESC"
    }
  }
}
```

### Response Schema

| Field | Type | Description |
|-------|------|-------------|
| id | string | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| result | object | - |
| result.data | array[object] | Array of anchor data |
| result.summary_info | object | Summary information about the results |

### Data Object Schema

| Field | Type | Description |
|-------|------|-------------|
| anchor | string | Anchor text |
| refDomains | integer | Number of referring domains |
| total | integer | Total number of backlinks |
| noFollow | integer | Number of nofollow backlinks |

### Summary Info Object Schema

| Field | Type | Description |
|-------|------|-------------|
| left_lines | integer | Number of remaining lines/items |
| page | integer | Current page number |
| count | integer | Number of items on current page |
| total | integer | Total number of items |
| sort | string | Field used for sorting |
| order | string | Sort order (ASC/DESC) |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getAnchors' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getAnchors",
  "params": {
    "query": "serpstat.com",
    "searchType": "domain_with_subdomains",
    "anchor": "serpstat",
    "count": "1",
    "sort": "anchor",
    "order": "desc",
    "page": 1,
    "size": 2,
    "complexFilter": [
      [
        {
          "field": "anchor",
          "compareType": "contains",
          "value": [
            "serpstat"
          ]
        },
        {
          "field": "total",
          "compareType": "gt",
          "value": [
            1
          ]
        },
        {
          "field": "noFollow",
          "compareType": "gte",
          "value": [
            1
          ]
        },
        {
          "additional_filters": "no_subdomains"
        }
      ]
    ]
  }
}'
```

## Credit Consumption

- **Current**: 1 API credit per result returned
- **Starting June 15, 2025**: 1 API credit even when no data is available for the requested query