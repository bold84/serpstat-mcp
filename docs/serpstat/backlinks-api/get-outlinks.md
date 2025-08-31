# getOutlinks

The `SerpstatBacklinksProcedure.getOutlinks` method gives you a list of external backlinks of a site you analyze. The data set is similar to the [Backlinks report](https://serpstat.com/backlinks/outlinks/).

## Credits

This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

## Note

Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Use case

With the `SerpstatBacklinksProcedure.getOutlinks` method, check the sites connected to the competitor's domain so you could establish a connection with these sites too to promote your site.

## Request

```http
POST https://api.serpstat.com/v4
```

### Body

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getOutlinks",
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

### Query Parameters

| Name | Type | Required | Description | Allowed Values | Default |
|------|------|----------|-------------|---------------|---------|
| query | string | Yes | The domain name of the analyzed site | - | - |
| searchType | string | Yes | Search modes for analysis | `domain`, `domain_with_subdomains` | `domain_with_subdomains` |
| sort | string | No | Sorting by field | `url_from`, `anchor`, `link_nofollow`, `links_external`, `link_type`, `url_to`, `check` | `check` |
| order | string | No | Sorting order | `asc`, `desc` | `desc` |
| page | integer | No | A page number | `>= 1` | `1` |
| size | integer | No | A number of results | `>= 1`, `<= 1000` | `100` |
| linkPerDomain | integer | No | - | - | - |
| complexFilter | array[array] | No | Data filtering using complex conditions. The first-level array represents "OR" conditions, and nested arrays represent "AND" conditions. | - | - |

## Responses

### 200 OK

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "url_from": "https://serpstat.com/blog/author/379380-379380/",
        "url_to": "https://microsoftedge.microsoft.com/addons/detail/serpstat-website-seo-chec/aidfflgbhbapkopbikhgapbcimkpipbf?hl=en",
        "nofollow": "follow",
        "link_type": "href",
        "links_ext": 13,
        "link_text": "Install for Microsoft Edge",
        "first_seen": "2022-09-16",
        "last_visited": "2025-02-04 21:37:16",
        "date_del": null
      },
      {
        "url_from": "https://serpstat.com/blog/author/379380-379380/",
        "url_to": "https://x.com/serpstat",
        "nofollow": "follow",
        "link_type": "href",
        "links_ext": 13,
        "link_text": "",
        "first_seen": "2025-02-04",
        "last_visited": "2025-02-04 21:37:16",
        "date_del": null
      }
    ],
    "summary_info": {
      "left_lines": 971509,
      "page": 1,
      "count": 2,
      "total": 99241,
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
| result.data | array[object] | Yes | Array of outlinks |
| result.summary_info | object | Yes | Summary information about the results |

### Data Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| url_from | string | Yes | The source URL where the backlink was found |
| url_to | string | Yes | The target URL that the site links to |
| nofollow | string | Yes | The link type: `follow`, `nofollow`, `ugc`, or `sponsored` |
| link_type | string | Yes | The type of link: `href`, etc. |
| links_ext | integer | Yes | Number of external links on the source page |
| link_text | string | Yes | The anchor text of the link |
| first_seen | string | Yes | When the backlink was first discovered |
| last_visited | string | Yes | When the backlink was last found |
| date_del | string/null | Yes | When the backlink was deleted (null if still active) |

### Summary Info Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| left_lines | integer | Yes | Estimated number of remaining outlinks |
| page | integer | Yes | Current page number |
| count | integer | Yes | Number of results on this page |
| total | integer | Yes | Total number of results |
| sort | string | Yes | Field used for sorting |
| order | string | Yes | Sorting order (`ASC` or `DESC`) |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getOutlinks' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getOutlinks",
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