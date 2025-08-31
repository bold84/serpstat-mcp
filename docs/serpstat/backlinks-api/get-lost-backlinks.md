# getLostBacklinks

The `SerpstatBacklinksProcedure.getLostBacklinks` method gives you a list of lost backlinks of a site you analyze. The data set is similar to the [Lost backlinks report](https://serpstat.com/backlinks/lost-links/).

## Credits

This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

## Note

Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Use case

With the `SerpstatBacklinksProcedure.getLostBacklinks` method, check which backlinks your site has lost to further analyze your backlink profile.

## Request

```http
POST https://api.serpstat.com/v4
```

### Body

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getLostBacklinks",
  "params": {
    "query": "nike.com",
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
        },
        {
          "additional_filters": "no_subdomains"
        },
        {
          "additional_filters": "only_main_page"
        },
        {
          "additional_filters": "last_week"
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
| page | integer | No | A page number (number value) | `>= 1` | `1` |
| size | integer | No | A number of results (number value) | `>= 1`, `<= 1000` | `100` |
| linkPerDomain | integer | No | - | - | - |
| complexFilter | array[array] | No | Data filtering using complex conditions. The first-level array represents "OR" conditions, and nested arrays represent "AND" conditions. | - | - |

### Additional Filters

The `complexFilter` parameter supports additional filters:

- `no_subdomains` - Filter to exclude subdomains
- `only_main_page` - Filter to include only the main page
- `last_week` - Filter to include only recent changes from the last week

## Responses

### 200 OK

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "url_from": "https://yonoo88.tistory.com",
        "url_to": "https://www.nike.com/kr/t/대한민국-스트라이크-엘리트-남성-드라이-핏-adv-축구-반팔-탑-uvYFiaUp/FJ1907-418",
        "nofollow": "follow",
        "link_type": "href",
        "links_ext": 93,
        "link_text": "대한민국 스트라이크 엘리트 남성 나이키 드라이 핏 ADV 축구 반팔 탑 Nike.com에서 대한민국 스트라이크 엘리트 남성 나이키 드라이 핏 ADV 축구 반팔 탑 찾기. 무료 배송 및 반품. www.nike.com",
        "first_seen": "2024-11-02",
        "last_visited": "2025-02-02 07:33:53",
        "date_del": "2025-02-02 07:33:53",
        "domain_rank": 20
      },
      {
        "url_from": "https://www.zamzamshop.ru/",
        "url_to": "https://www.nike.com/",
        "nofollow": "follow",
        "link_type": "href",
        "links_ext": 11,
        "link_text": "",
        "first_seen": "2024-10-23",
        "last_visited": "2025-02-01 03:48:51",
        "date_del": "2025-02-01 03:48:51",
        "domain_rank": 5
      }
    ],
    "summary_info": {
      "left_lines": 972850,
      "page": 1,
      "count": 2,
      "total": 36,
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
| result.data | array[object] | Yes | Array of lost backlinks |
| result.summary_info | object | Yes | Summary information about the results |

### Data Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| url_from | string | Yes | The source URL where the backlink was found |
| url_to | string | Yes | The target URL on your site that was linked to |
| nofollow | string | Yes | The link type: `follow`, `nofollow`, `ugc`, or `sponsored` |
| link_type | string | Yes | The type of link: `href`, `image`, etc. |
| links_ext | integer | Yes | Number of external links on the source page |
| link_text | string | Yes | The anchor text of the link |
| first_seen | string | Yes | When the backlink was first discovered |
| last_visited | string | Yes | When the backlink was last found |
| date_del | string | Yes | When the backlink was deleted/lost |
| domain_rank | integer | Yes | The domain rank of the source domain |

### Summary Info Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| left_lines | integer | Yes | Estimated number of remaining lost backlinks |
| page | integer | Yes | Current page number |
| count | integer | Yes | Number of results on this page |
| total | integer | Yes | Total number of results |
| sort | string | Yes | Field used for sorting |
| order | string | Yes | Sorting order (`ASC` or `DESC`) |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getLostBacklinks' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getLostBacklinks",
    "params": {
      "query": "nike.com",
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
          },
          {
            "additional_filters": "no_subdomains"
          },
          {
            "additional_filters": "only_main_page"
          },
          {
            "additional_filters": "last_week"
          }
        ]
      ]
    }
  }'