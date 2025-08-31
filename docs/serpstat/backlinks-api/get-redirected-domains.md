# getRedirectedDomains | Serpstat Backlinks API

## Overview

The `SerpstatBacklinksProcedure.getRedirectedDomains` method returns a list of domains that redirect to or from the specified domain. The method analyzes redirects (301, 302, and others) within the context of the backlink profile.

### Credits
This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

### Note
Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

---

## Request

### Method
`POST`

### URL
`https://api.serpstat.com/v4/#SerpstatBacklinksProcedure.getRedirectedDomains`

### Authentication
API Key required in the `token` parameter.

### Request Body

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getRedirectedDomains",
  "params": {
    "query": "perfectdomain.com",
    "page": 1,
    "size": 100,
    "sort": "domain_rank",
    "order": "desc",
    "complexFilter": [
      [
        {
          "field": "domain_rank",
          "compareType": "eq",
          "value": [0]
        },
        {
          "field": "domain",
          "compareType": "contains",
          "value": ["4"]
        }
      ]
    ]
  }
}
```

### Parameters

#### Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | Should be exact `SerpstatBacklinksProcedure.getRedirectedDomains` |
| `params.query` | string | The domain name of the analyzed site |

#### Optional Parameters

| Parameter | Type | Description | Allowed Values | Default |
|-----------|------|-------------|----------------|---------|
| `params.sort` | string | Sorting by field | `domain`, `domain_rank` | - |
| `params.order` | string | Sorting order | `asc`, `desc` | - |
| `params.page` | integer | A page number | `>= 1` | `1` |
| `params.size` | integer | A number of results | `>= 1`, `<= 1000` | `100` |
| `params.complexFilter` | array[array] | Data filtering using complex conditions. The first-level array represents "OR" conditions, and nested arrays represent "AND" conditions. | - | - |

---

## Response

### Success Response (200)

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "Domain": "2q4v48vk.nwpcs.com",
        "Domain Rank": 0
      },
      {
        "Domain": "4exqbq.nwpcs.com",
        "Domain Rank": 0
      },
      {
        "Domain": "4qu5.nwpcs.com",
        "Domain Rank": 0
      },
      {
        "Domain": "hssl4czi7.nwpcs.com",
        "Domain Rank": 0
      },
      {
        "Domain": "wid4165m6.nwpcs.com",
        "Domain Rank": 0
      }
    ],
    "summary_info": {
      "left_lines": 972770,
      "page": 1,
      "count": 5,
      "total": 5,
      "sort": "domain_rank",
      "order": "DESC"
    }
  }
}
```

### Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `result.data` | array[object] | Array of redirected domain objects |
| `result.summary_info` | object | Summary information about the results |

#### Data Object Schema

| Field | Type | Description |
|-------|------|-------------|
| `Domain` | string | The domain that has redirects to or from the analyzed site |
| `Domain Rank` | integer | Domain rank of the redirected domain |

#### Summary Info Object Schema

| Field | Type | Description |
|-------|------|-------------|
| `left_lines` | integer | Number of remaining items |
| `page` | integer | Current page number |
| `count` | integer | Number of items returned on this page |
| `total` | integer | Total number of items available |
| `sort` | string | Field used for sorting |
| `order` | string | Sorting order (`ASC` or `DESC`) |

---

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=YOUR_API_KEY#SerpstatBacklinksProcedure.getRedirectedDomains' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getRedirectedDomains",
    "params": {
      "query": "perfectdomain.com",
      "page": 1,
      "size": 100,
      "sort": "domain_rank",
      "order": "desc",
      "complexFilter": [
        [
          {
            "field": "domain_rank",
            "compareType": "eq",
            "value": [0]
          },
          {
            "field": "domain",
            "compareType": "contains",
            "value": ["4"]
          }
        ]
      ]
    }
  }'
```

---

## Additional Notes

- **Credit Consumption**: This method charges 1 API credit per result returned
- **Redirect Analysis**: Identifies domains with 301, 302, and other types of redirects
- **Pagination**: Use `page` and `size` parameters to paginate through results
- **Sorting**: Results can be sorted by `domain` or `domain_rank`
- **Filtering**: Complex filtering allows for advanced queries with AND/OR conditions
- **Backlink Context**: Redirect analysis is performed within the context of the backlink profile