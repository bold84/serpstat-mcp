# getRefDomains | Serpstat Backlinks API

## Overview

The `SerpstatBacklinksProcedure.getRefDomains` method gives you a list of referring domains of a site you analyze. The data set is similar to the Referring domains report. The data in this report and the Summary report may differ slightly due to the algorithm for quickly calculating summary data.

### Credit Consumption

- **Credits**: This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

### Important Note

**Starting June 15, 2025**, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

### Use Case

With the `SerpstatBacklinksProcedure.getRefDomains` method, check which sites link to your competitors so that you can place links to your site on those same sites.

---

## Request

### Method
```
POST https://api.serpstat.com/v4/#SerpstatBacklinksProcedure.getRefDomains
```

### Request Body

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getRefDomains",
  "params": {
    "query": "serpstat.com",
    "searchType": "domain",
    "order": "desc",
    "page": 1,
    "size": 2,
    "sort": "domain_rank",
    "complexFilter": [
      [
        {
          "field": "domain_from",
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
          "additional_filters": "last_week"
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
| `sort` | string | No | Sorting by field | `check` | `domain_links`, `domain_from`, `domain_rank`, `check` |
| `order` | string | No | Sorting order | | `asc`, `desc` |
| `page` | integer | No | A page number (number value) | `1` | `>= 1` |
| `size` | integer | No | A number of results (number value) | `100` | `>= 1`, `<= 1000` |
| `complexFilter` | array[array] | No | Data filtering using complex conditions. The first-level array represents "OR" conditions, and nested arrays represent "AND" conditions. | | |

### Complex Filter Parameters

The `complexFilter` parameter supports complex filtering conditions:

- **First-level array**: Represents "OR" conditions
- **Nested arrays**: Represent "AND" conditions
- **Additional filters**: Special filters like `last_week`

### cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=YOUR_API_TOKEN#SerpstatBacklinksProcedure.getRefDomains' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getRefDomains",
    "params": {
      "query": "serpstat.com",
      "searchType": "domain",
      "order": "desc",
      "page": 1,
      "size": 2,
      "sort": "domain_rank",
      "complexFilter": [
        [
          {
            "field": "domain_from",
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
            "additional_filters": "last_week"
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
        "domain_from": "elsner.com",
        "ref_pages": 2,
        "domainRank": 47
      },
      {
        "domain_from": "telnyx.com",
        "ref_pages": 3,
        "domainRank": 46
      }
    ],
    "summary_info": {
      "left_lines": 972836,
      "page": 1,
      "count": 2,
      "total": 26,
      "sort": "domain_rank",
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
| `result.data` | array[object] | Array of referring domain data objects |
| `result.data.domain_from` | string | The referring domain that links to the analyzed site |
| `result.data.ref_pages` | integer | Number of pages from this domain that link to the analyzed site |
| `result.data.domainRank` | integer | Domain rank value |
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

- **`domain_from`**: The referring domain that contains links pointing to the analyzed domain
- **`ref_pages`**: The number of unique pages from this domain that link to the analyzed site
- **`domainRank`**: The referring domain's rank value (higher values indicate better authority)

#### Summary Information

The `summary_info` object provides pagination details:

- **`left_lines`**: Number of remaining results that can be retrieved
- **`page`**: Current page number in the pagination
- **`count`**: Number of items returned in this specific response
- **`total`**: Total number of available results matching the query
- **`sort`**: The field that was used for sorting the results
- **`order`**: The sorting direction (ASC for ascending, DESC for descending)

---

## Data Accuracy Note

The data returned by `getRefDomains` may differ slightly from the Summary report data due to the different algorithms used:

- **getRefDomains**: Uses a comprehensive analysis algorithm
- **Summary reports**: Use a faster algorithm for quick calculations

This difference is normal and expected when comparing detailed analysis with summary calculations.

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
5. **Be aware of data differences** between detailed and summary reports
6. **Use the `searchType` parameter** appropriately based on whether you need subdomains included

---

## Related Endpoints

- [`getOutDomains`](./get-out-domains.md) - Get outbound domains
- [`getSummary`](./get-summary.md) - Get backlinks summary
- [`getTopPages`](./get-top-pages.md) - Get top pages with backlinks

---

*Last updated: August 31, 2025*