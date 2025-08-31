# getTopPages | Serpstat Backlinks API

## Overview

The `SerpstatBacklinksProcedure.getTopPages` method gives you a list of leading pages of the analyzed site by the number of backlinks with referring pages, domains and IPs. The data set is similar to the [Top pages report](https://serpstat.com/backlinks/toppages/).

### Credits Information
- **Credits**: This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

### Important Note
Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

### Use Case
With the `SerpstatBacklinksProcedure.getTopPages` method, check how many backlinks have different pages of the site to analyze it and optimize future promotion.

## API Details

- **Endpoint**: `POST https://api.serpstat.com/v4/#SerpstatBacklinksProcedure.getTopPages`
- **HTTP Method**: POST
- **Authentication**: API Key

## Request Parameters

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | Yes | Should be `SerpstatBacklinksProcedure.getTopPages` |
| `params` | object | Yes | Object containing request parameters |

#### params Object

| Parameter | Type | Required | Default | Description | Allowed Values |
|-----------|------|----------|---------|-------------|---------------|
| `query` | string | Yes | | The domain name of the analyzed site | |
| `searchType` | string | Yes | `domain_with_subdomains` | Search modes for analysis | `domain`, `domain_with_subdomains` |
| `sort` | string | No | `lastupdate` | Sorting by field | `ips`, `count`, `domains`, `url_to`, `lastupdate` |
| `order` | string | No | `desc` | Sorting order | `asc`, `desc` |
| `complexFilter` | array[array] | No | | Data filtering using complex conditions. The first-level array represents "OR" conditions, and nested arrays represent "AND" conditions. | |
| `page` | integer | No | `1` | A page number | `>= 1` |
| `size` | integer | No | `100` | A number of results | `>= 1`, `<= 1000` |

## Request Example

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getTopPages",
  "params": {
    "query": "serpstat.com",
    "searchType": "domain_with_subdomains",
    "page": 1,
    "size": 2,
    "sort": "ips",
    "order": "desc",
    "complexFilter": [
      [
        {
          "field": "url_to",
          "compareType": "contains",
          "value": ["serpstat"]
        },
        {
          "field": "count",
          "compareType": "gte",
          "value": [1]
        },
        {
          "field": "ips",
          "compareType": "gte",
          "value": [1]
        },
        {
          "field": "domains",
          "compareType": "gte",
          "value": [1]
        },
        {
          "additional_filters": "no_subdomains"
        }
      ]
    ]
  }
}
```

### cURL Example

```bash
curl --request POST \
--url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getTopPages' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getTopPages",
  "params": {
    "query": "serpstat.com",
    "searchType": "domain_with_subdomains",
    "page": 1,
    "size": 2,
    "sort": "ips",
    "order": "desc",
    "complexFilter": [
      [
        {
          "field": "url_to",
          "compareType": "contains",
          "value": ["serpstat"]
        },
        {
          "field": "count",
          "compareType": "gte",
          "value": [1]
        },
        {
          "field": "ips",
          "compareType": "gte",
          "value": [1]
        },
        {
          "field": "domains",
          "compareType": "gte",
          "value": [1]
        },
        {
          "additional_filters": "no_subdomains"
        }
      ]
    ]
  }
}'
```

## Response Structure

### Response Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `result` | object | Yes | Object containing the result data |

#### result Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `data` | array[object] | Yes | Array of top pages data |
| `summary_info` | object | Yes | Summary information about the results |

##### data Array Items

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | The URL path of the page |
| `ref_pages` | integer | Yes | Number of referring pages |
| `ref_domains` | integer | Yes | Number of referring domains |
| `ips` | integer | Yes | Number of referring IPs |
| `urlTo` | string | Yes | Full URL of the page |

##### summary_info Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `left_lines` | integer | Yes | Left credits of lines for your pricing plan |
| `page` | integer | Yes | Page number |
| `count` | integer | Yes | Number of results in this page |
| `total` | integer | Yes | Number of results for request |
| `sort` | string | Yes | Sorted by field |
| `order` | string | Yes | Sorted order | `asc`, `desc` |

## Response Example

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "url": "/",
        "ref_pages": 52041,
        "ref_domains": 3265,
        "ips": 3144,
        "urlTo": "https://serpstat.com/"
      },
      {
        "url": "",
        "ref_pages": 39889,
        "ref_domains": 385,
        "ips": 392,
        "urlTo": "https://serpstat.com"
      }
    ],
    "summary_info": {
      "left_lines": 971480,
      "page": 1,
      "count": 2,
      "total": 3608,
      "sort": "ips",
      "order": "DESC"
    }
  }
}
```

## Response Fields Description

### Data Fields

| Field | Description |
|-------|-------------|
| `url` | The URL path of the analyzed page |
| `ref_pages` | Total number of pages referring to this URL |
| `ref_domains` | Total number of unique domains referring to this URL |
| `ips` | Total number of unique IP addresses referring to this URL |
| `urlTo` | The complete URL of the analyzed page |

### Summary Fields

| Field | Description |
|-------|-------------|
| `left_lines` | Remaining API credits/lines available in your current pricing plan |
| `page` | Current page number of results |
| `count` | Number of items returned in this specific page |
| `total` | Total number of results available for the query |
| `sort` | Field used for sorting the results |
| `order` | Sort direction (ascending or descending) |

## Search Modes

- **domain**: Analyzes only the main domain (e.g., example.com)
- **domain_with_subdomains**: Analyzes the main domain and all its subdomains (e.g., example.com, blog.example.com, shop.example.com)

## Sorting Options

- **ips**: Sort by number of unique referring IP addresses
- **count**: Sort by total number of backlinks
- **domains**: Sort by number of referring domains
- **url_to**: Sort by target URL
- **lastupdate**: Sort by last update date/time

## Error Handling

The API may return various HTTP status codes. Common responses include:

- `200 OK`: Successful request
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Invalid or missing API key
- `404 Not Found`: Endpoint not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server-side error

## Rate Limits

- Check your remaining API credits using the `left_lines` field in the response
- Monitor your usage to avoid exceeding your plan limits
- Consider implementing proper error handling for rate limit scenarios

## Best Practices

1. **Pagination**: Use the `page` and `size` parameters to handle large datasets efficiently
2. **Filtering**: Utilize the `complexFilter` parameter to narrow down results to relevant data
3. **Sorting**: Choose appropriate sorting fields based on your analysis needs
4. **Search Type**: Use `domain_with_subdomains` for comprehensive analysis, or `domain` for focused analysis
5. **Credit Management**: Monitor credit consumption, especially when working with large result sets

## Integration Tips

- Store the `id` field for request/response correlation
- Process results in batches when dealing with large datasets
- Cache results when appropriate to reduce API calls
- Implement retry logic for transient errors
- Use the `summary_info.total` field to estimate the scope of your analysis