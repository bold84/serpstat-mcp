# getOutDomains | Serpstat Backlinks API

## Overview

The `SerpstatBacklinksProcedure.getOutDomains` method gives you a list of the domains that are linked to the analyzed site. The data set is similar to the External domains report.

### Credit Consumption

- **Credits**: This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

### Important Note

**Starting June 15, 2025**, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

### Use Case

With the `SerpstatBacklinksProcedure.getOutDomains` method, check what domains are linked to a competitor's domain and link your own domain to these domains.

---

## Request

### Method
```
POST https://api.serpstat.com/v4/#SerpstatBacklinksProcedure.getOutDomains
```

### Request Body

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getOutDomains",
  "params": {
    "query": "serpstat.com",
    "searchType": "domain_with_subdomains",
    "sort": "domain_links",
    "order": "desc",
    "page": 1,
    "size": 2,
    "complexFilter": [
      [
        {
          "field": "domain_to",
          "compareType": "contains",
          "value": [".com"]
        },
        {
          "field": "domain_rank",
          "compareType": "gte",
          "value": [1]
        },
        {
          "field": "domain_links",
          "compareType": "gte",
          "value": [1]
        },
        {
          "additional_filters": "only_subdomains"
        }
      ]
    ]
  }
}
```

### Parameters

| Parameter | Type | Required | Description | Default | Allowed Values |
|-----------|------|----------|-------------|---------|---------------|
| `query` | string | Yes | The domain name of the analyzed site | | |
| `searchType` | string | Yes | Search modes for analysis | `domain_with_subdomains` | `domain`, `domain_with_subdomains` |
| `sort` | string | No | Sorting by field | `domain_rank` | `domain_links`, `domain_to`, `domain_rank` |
| `order` | string | No | Sorting order | | `asc`, `desc` |
| `page` | integer | No | A page number (number value) | `1` | `>= 1` |
| `size` | integer | No | A number of results (number value) | `100` | `>= 1`, `<= 1000` |
| `complexFilter` | array[array] | No | Data filtering using complex conditions. The first-level array represents "OR" conditions, and nested arrays represent "AND" conditions. | | |

### Complex Filter Parameters

The `complexFilter` parameter supports complex filtering conditions:

- **First-level array**: Represents "OR" conditions
- **Nested arrays**: Represent "AND" conditions
- **Additional filters**: Special filters like `only_subdomains`

### cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=YOUR_API_TOKEN#SerpstatBacklinksProcedure.getOutDomains' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getOutDomains",
    "params": {
      "query": "serpstat.com",
      "searchType": "domain_with_subdomains",
      "sort": "domain_links",
      "order": "desc",
      "page": 1,
      "size": 2,
      "complexFilter": [
        [
          {
            "field": "domain_to",
            "compareType": "contains",
            "value": [".com"]
          },
          {
            "field": "domain_rank",
            "compareType": "gte",
            "value": [1]
          },
          {
            "field": "domain_links",
            "compareType": "gte",
            "value": [1]
          },
          {
            "additional_filters": "only_subdomains"
          }
        ]
      ]
    }
  }'
```

---

## Response

### Success Response (200 OK)

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "domain_to": "support.google.com",
        "domain_links": 340,
        "domain_rank": 0
      },
      {
        "domain_to": "chrome.google.com",
        "domain_links": 197,
        "domain_rank": 0
      }
    ],
    "summary_info": {
      "left_lines": 972838,
      "page": 1,
      "count": 2,
      "total": 335,
      "sort": "domain_links",
      "order": "DESC"
    }
  }
}
```

### Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Request/response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `result` | object | The main result object |
| `result.data` | array[object] | Array of domain data objects |
| `result.data.domain_to` | string | The target domain that links to the analyzed site |
| `result.data.domain_links` | integer | Number of links from this domain to the analyzed site |
| `result.data.domain_rank` | integer | Domain rank value |
| `result.summary_info` | object | Pagination and summary information |
| `result.summary_info.left_lines` | integer | Number of remaining results |
| `result.summary_info.page` | integer | Current page number |
| `result.summary_info.count` | integer | Number of items returned in this response |
| `result.summary_info.total` | integer | Total number of available results |
| `result.summary_info.sort` | string | Field used for sorting |
| `result.summary_info.order` | string | Sorting order (ASC/DESC) |

### Response Fields Description

#### Data Array Objects

Each object in the `data` array contains:

- **`domain_to`**: The target domain that contains links pointing to the analyzed domain
- **`domain_links`**: The total number of links from this domain to the analyzed site
- **`domain_rank`**: The domain's rank value (higher values indicate better authority)

#### Summary Information

The `summary_info` object provides pagination details:

- **`left_lines`**: Number of remaining results that can be retrieved
- **`page`**: Current page number in the pagination
- **`count`**: Number of items returned in this specific response
- **`total`**: Total number of available results matching the query
- **`sort`**: The field that was used for sorting the results
- **`order`**: The sorting direction (ASC for ascending, DESC for descending)

---

## Error Handling

The API may return various HTTP status codes. For detailed information about error responses and status codes, please refer to the [Serpstat API Error Codes documentation](https://api-docs.serpstat.com/docs/serpstat-public-api/704g22jqj5lqb-errors-and-response-codes).

---

## Rate Limits

- **Credits**: 1 credit per result returned
- **Pagination**: Maximum 1000 results per request (`size` parameter)
- **Rate Limiting**: Please refer to your Serpstat account dashboard for specific rate limit information

---

## Best Practices

1. **Start with small result sets** when exploring data to understand the structure better
2. **Use appropriate filtering** to reduce the number of results and credit consumption
3. **Monitor pagination** to ensure you retrieve all available data
4. **Consider the credit cost** when working with large numbers of results
5. **Use the `searchType` parameter** appropriately based on whether you need subdomains included

---

## Related Endpoints

- [`getRefDomains`](./get-ref-domains.md) - Get referring domains
- [`getSummary`](./get-summary.md) - Get backlinks summary
- [`getTopPages`](./get-top-pages.md) - Get top pages with backlinks

---

*Last updated: August 31, 2025*