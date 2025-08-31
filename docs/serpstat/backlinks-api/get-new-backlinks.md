# getNewBacklinks

The `SerpstatBacklinksProcedure.getNewBacklinks` method gives you a list of active backlinks of a site you analyze. The data set is similar to the [Backlinks report](https://serpstat.com/backlinks/active-links/).

## Credits

This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

## Note

Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Use case

With the `SerpstatBacklinksProcedure.getNewBacklinks` method, check active links leading to a competitor's domain and their domain rank to find out what domains are more preferable to place links to your site on.

## Request

```http
POST https://api.serpstat.com/v4
```

### Body

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getNewBacklinks",
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
          "field": "anchor",
          "compareType": "notContains",
          "value": ["Stat"]
        },
        {
          "field": "check",
          "compareType": "lte",
          "value": ["1.1.2030"]
        }
      ],
      [
        {
          "additional_filters": "no_subdomains"
        },
        {
          "additional_filters": "only_main_page"
        }
      ]
    ]
  }
}
```

### Query Parameters

| Name | Type | Required | Description | Allowed Values | Default |
|------|------|----------|-------------|---------------|---------|
| query | string | Yes | The domain name of the analyzed site | - | - |
| searchType | string | Yes | Search modes for analysis | `domain`, `domain_with_subdomains` | `domain_with_subdomains` |
| sort | string | No | Sorting by field | `url_from`, `anchor`, `link_nofollow`, `links_external`, `link_type`, `url_to`, `check`, `add`, `domain_rank` | `check` |
| order | string | No | Sorting order | `asc`, `desc` | `desc` |
| page | integer | No | A page number (number value) | `>= 1` | `1` |
| size | integer | No | A number of results (number value) | `>= 1`, `<= 1000` | `100` |
| linkPerDomain | integer | No | - | - | - |
| complexFilter | array[array] | No | Data filtering using complex conditions. The first-level array represents "OR" conditions, and nested arrays represent "AND" conditions. | - | - |

### Additional Filters

The `complexFilter` parameter supports additional filters:

- `no_subdomains` - Filter to exclude subdomains
- `only_main_page` - Filter to include only the main page

## Responses

### 200 OK

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "url_from": "https://www.topicalauthority.digital/",
        "url_to": "https://serpstat.com/blog/how-a-web-entity-can-grow-traffic-and-lose-google-core-algorithm-update-at-the-same-time/",
        "nofollow": "follow",
        "link_type": "href",
        "links_ext": 92,
        "link_text": "Read Core Updates for SEO",
        "first_seen": "2023-07-02",
        "last_visited": "2024-11-23 21:32:02",
        "domain_rank": 25
      },
      {
        "url_from": "https://www.schweiz-navigator.de/",
        "url_to": "https://serpstat.com/users/login/",
        "nofollow": "follow",
        "link_type": "redirect",
        "links_ext": 1,
        "link_text": "",
        "first_seen": "2022-07-25",
        "last_visited": "2025-01-30 20:22:03",
        "domain_rank": 18
      }
    ],
    "summary_info": {
      "left_lines": 972844,
      "page": 1,
      "count": 2,
      "total": 62,
      "sort": "url_from",
      "order": "DESC"
    }
  }
}
```

### Response Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| result | object | Yes | - |
| result.data | array[object] | Yes | Array of new backlinks |
| result.summary_info | object | Yes | Summary information about the results |

### Data Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| url_from | string | Yes | The source URL where the backlink was found |
| url_to | string | Yes | The target URL on your site that was linked to |
| nofollow | string | Yes | The link type: `follow`, `nofollow`, `ugc`, or `sponsored` |
| link_type | string | Yes | The type of link: `href`, `redirect`, etc. |
| links_ext | integer | Yes | Number of external links on the source page |
| link_text | string | Yes | The anchor text of the link |
| first_seen | string | Yes | When the backlink was first discovered |
| last_visited | string | Yes | When the backlink was last found |
| domain_rank | integer | Yes | The domain rank of the source domain |

### Summary Info Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| left_lines | integer | Yes | Estimated number of remaining new backlinks |
| page | integer | Yes | Current page number |
| count | integer | Yes | Number of results on this page |
| total | integer | Yes | Total number of results |
| sort | string | Yes | Field used for sorting |
| order | string | Yes | Sorting order (`ASC` or `DESC`) |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getNewBacklinks' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getNewBacklinks",
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
            "field": "anchor",
            "compareType": "notContains",
            "value": ["Stat"]
          },
          {
            "field": "check",
            "compareType": "lte",
            "value": ["1.1.2030"]
          }
        ],
        [
          {
            "additional_filters": "no_subdomains"
          },
          {
            "additional_filters": "only_main_page"
          }
        ]
      ]
    }
  }'