# getLostOutlinks | Serpstat Backlinks API

## Overview

The `SerpstatBacklinksProcedure.getLostOutlinks` method gives you a list of lost external links of a site you analyze. The data set is similar to the [Lost external links report](https://serpstat.com/backlinks/lost-outlinks/).

### Credits Information
- **Credits**: This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

### Important Note
Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

### Use Case
With the `SerpstatBacklinksProcedure.getLostOutlinks` method, check what links your site has lost to find out why they were lost and try to establish these links again.

## API Details

- **Endpoint**: `POST https://api.serpstat.com/v4/#SerpstatBacklinksProcedure.getLostOutlinks`
- **HTTP Method**: POST
- **Authentication**: API Key

## Request Parameters

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | Yes | Should be exact `SerpstatBacklinksProcedure.getLostOutlinks` |
| `params` | object | Yes | Object containing request parameters |

#### params Object

| Parameter | Type | Required | Default | Description | Allowed Values |
|-----------|------|----------|---------|-------------|---------------|
| `query` | string | Yes | | The domain name of the analyzed site | |
| `searchType` | string | Yes | `domain_with_subdomains` | Search modes for analysis | `domain`, `domain_with_subdomains` |
| `sort` | string | No | `lastupdate` | Sorting by field | `url_from`, `anchor`, `link_nofollow`, `links_external`, `link_type`, `url_to`, `lastupdate` |
| `order` | string | No | `desc` | Sorting order | `asc`, `desc` |
| `linkPerDomain` | integer | No | | Number of links per domain |
| `complexFilter` | array[array] | No | | Data filtering using complex conditions. The first-level array represents "OR" conditions, and nested arrays represent "AND" conditions. | |
| `page` | integer | No | `1` | A page number (number value) | `>= 1` |
| `size` | integer | No | `100` | A number of results (number value) | `>= 1`, `<= 1000` |

## Request Example

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getLostOutlinks",
  "params": {
    "query": "serpstat.com",
    "searchType": "domain",
    "sort": "url_from",
    "order": "desc",
    "page": 1,
    "size": 2,
    "linkPerDomain": 1,
    "complexFilter": [
      [
        {
          "field": "url_from",
          "compareType": "notContains",
          "value": ["7654765"]
        },
        {
          "field": "link_nofollow",
          "compareType": "contains",
          "value": ["follow", "nofollow", "ugc", "sponsored"]
        },
        {
          "field": "anchor",
          "compareType": "notContains",
          "value": ["лопспрол"]
        },
        {
          "field": "check",
          "compareType": "lte",
          "value": ["1.1.2030"]
        },
        {
          "field": "links_external",
          "compareType": "between",
          "value": [1, 500]
        }
      ],
      [
        {
          "field": "links_external",
          "compareType": "lte",
          "value": [800]
        }
      ]
    ]
  }
}
```

### cURL Example

```bash
curl --request POST \
--url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getLostOutlinks' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getLostOutlinks",
  "params": {
    "query": "serpstat.com",
    "searchType": "domain",
    "sort": "url_from",
    "order": "desc",
    "page": 1,
    "size": 2,
    "linkPerDomain": 1,
    "complexFilter": [
      [
        {
          "field": "url_from",
          "compareType": "notContains",
          "value": ["7654765"]
        },
        {
          "field": "link_nofollow",
          "compareType": "contains",
          "value": ["follow", "nofollow", "ugc", "sponsored"]
        },
        {
          "field": "anchor",
          "compareType": "notContains",
          "value": ["лопспрол"]
        },
        {
          "field": "check",
          "compareType": "lte",
          "value": ["1.1.2030"]
        },
        {
          "field": "links_external",
          "compareType": "between",
          "value": [1, 500]
        }
      ],
      [
        {
          "field": "links_external",
          "compareType": "lte",
          "value": [800]
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
| `data` | array[object] | Yes | Array of lost outlinks data |
| `summary_info` | object | Yes | Summary information about the results |

##### data Array Items

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url_from` | string | Yes | The source URL where the link was found |
| `url_to` | string | Yes | The target URL that was linked to |
| `link_nofollow` | string | Yes | Link follow type (`follow`, `nofollow`, `ugc`, `sponsored`) |
| `link_type` | string | Yes | Type of link (`href`, etc.) |
| `links_external` | integer | Yes | Number of external links |
| `link_text` | string | Yes | The anchor text of the link |
| `first_seen` | string | Yes | Date when the link was first detected |
| `last_visited` | string | Yes | Date when the link was last visited |
| `date_del` | string | Yes | Date when the link was deleted/lost |

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
        "url_from": "https://serpstat.com/de/blog/author/363077-anastasia-minenok/?page=4",
        "url_to": "https://www.facebook.com/SerpstatGlobal",
        "link_nofollow": "follow",
        "link_type": "href",
        "links_external": 14,
        "link_text": "",
        "first_seen": "2022-09-16",
        "last_visited": "2025-02-04 08:18:00",
        "date_del": "2025-02-04 08:18:00"
      },
      {
        "url_from": "https://serpstat.com/de/blog/author/363077-anastasia-minenok/?page=4",
        "url_to": "https://www.youtube.com/channel/UC8WHYsyidKd8GGDuyhQN3NQ",
        "link_nofollow": "follow",
        "link_type": "href",
        "links_external": 14,
        "link_text": "",
        "first_seen": "2022-09-16",
        "last_visited": "2025-02-04 08:18:00",
        "date_del": "2025-02-04 08:18:00"
      }
    ],
    "summary_info": {
      "left_lines": 972848,
      "page": 1,
      "count": 2,
      "total": 23957,
      "sort": "url_from",
      "order": "desc"
    }
  }
}
```

## Response Fields Description

### Data Fields

| Field | Description |
|-------|-------------|
| `url_from` | The source URL on your site that contained the lost link |
| `url_to` | The target external URL that was linked to but is now lost |
| `link_nofollow` | The follow type of the link (follow, nofollow, ugc, sponsored) |
| `link_type` | The type of link (typically href for standard hyperlinks) |
| `links_external` | Number of external links from the source URL |
| `link_text` | The anchor text that was used for the link (may be empty) |
| `first_seen` | The date when the link was first detected by Serpstat |
| `last_visited` | The date when the link was last successfully visited/crawled |
| `date_del` | The date when the link was detected as deleted/lost |

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

- **url_from**: Sort by source URL
- **anchor**: Sort by anchor text
- **link_nofollow**: Sort by follow type (follow/nofollow)
- **links_external**: Sort by number of external links
- **link_type**: Sort by link type
- **url_to**: Sort by target URL
- **lastupdate**: Sort by last update date/time

## Filter Operations

### Supported Compare Types

- **contains**: Field contains any of the specified values
- **notContains**: Field does not contain any of the specified values
- **lte**: Field is less than or equal to the specified value
- **between**: Field is between the two specified values (inclusive)

### Common Filter Examples

**Filter by link type:**
```json
{
  "field": "link_nofollow",
  "compareType": "contains",
  "value": ["follow", "nofollow"]
}
```

**Filter by date range:**
```json
{
  "field": "date_del",
  "compareType": "between",
  "value": ["2024-01-01", "2024-12-31"]
}
```

**Filter by number of external links:**
```json
{
  "field": "links_external",
  "compareType": "gte",
  "value": [10]
}
```

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
6. **Time Analysis**: Use `first_seen`, `last_visited`, and `date_del` fields to understand the timeline of link loss

## Integration Tips

- Store the `id` field for request/response correlation
- Process results in batches when dealing with large datasets
- Cache results when appropriate to reduce API calls
- Implement retry logic for transient errors
- Use the `summary_info.total` field to estimate the scope of your analysis
- Analyze patterns in `date_del` to identify when link losses occurred
- Compare `last_visited` with `date_del` to understand how recently links were active