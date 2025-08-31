# getUrlsSerpResultsHistory

The `RtApiSerpResultsProcedure.getUrlsSerpResultsHistory` method returns the ranking history of URLs for project keywords in the required region. The data set is similar to the Rank tracker - SERP history.

**Credits**: This method does not spend API credits.

## Request

**Method**: `POST`  
**URL**: `https://api.serpstat.com/v4/#RtApiSerpResultsProcedure.getUrlsSerpResultsHistory`

### Body

```json
{
  "id": "123",
  "method": "RtApiSerpResultsProcedure.getUrlsSerpResultsHistory",
  "params": {
    "projectId": 1226819,
    "projectRegionId": 372691,
    "page": 1,
    "pageSize": 100,
    "dateFrom": "2025-02-09",
    "dateTo": "2025-02-10",
    "sort": "keyword",
    "order": "desc",
    "keywords": [
      "overwatch",
      "wow name characters"
    ],
    "withTags": true,
    "domain": "https://us.shop.battle.net/ru-ru/product/overwatch"
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | required | Should be exact `RtApiSerpResultsProcedure.getUrlsSerpResultsHistory` |
| `params` | object | required | |
| `projectId` | integer | required | Project ID |
| `projectRegionId` | integer | required | Region ID |
| `page` | integer | required | Page number |
| `pageSize` | integer | | Number of results per page. Possible values: `20`, `50`, `100`, `200`, `500` |
| `dateFrom` | string<date> | | Start date of the period for which the data is required |
| `dateTo` | string<date> | | End date of the period for which the data is required |
| `sort` | string | | Sorting by parameters. `date` — sorting by date, `keyword` — sorting alphabetically |
| `order` | string | | Sorting order. `desc` — descending order, `asc` — ascending order |
| `keywords` | array[string] | | Keywords for which pages and positions are required. The maximum number of keywords that can be filtered is 1000. |
| `withTags` | boolean | | Display tags for the keywords. `true` - show tags for the keywords, `false` - don't show tags for the keywords. |
| `domain` | string | | Domain or page for which the data is required. Data format: `domain.com` — domain, `https://domain.com/` — URL |

### Parameter Defaults

| Parameter | Default Value |
|-----------|---------------|
| `method` | `RtApiSerpResultsProcedure.getUrlsSerpResultsHistory` |
| `page` | `1` |
| `pageSize` | `100` |
| `sort` | `keyword` |
| `order` | `desc` |
| `withTags` | `false` |

### Parameter Allowed Values

| Parameter | Allowed Values |
|-----------|---------------|
| `sort` | `keyword`, `date` |
| `order` | `desc`, `asc` |

### Parameter Match Patterns

| Parameter | Pattern |
|-----------|---------|
| `dateFrom` | `^\d{4}\-(0[1-9]\|1[012])\-(0[1-9]\|[12][0-9]\|3[01])$` |
| `dateTo` | `^\d{4}\-(0[1-9]\|1[012])\-(0[1-9]\|[12][0-9]\|3[01])$` |

## Responses

### 200 OK

```json
{
  "id": "123",
  "result": {
    "data": {
      "projectId": 1226819,
      "projectRegionId": 372691,
      "domain": "https://us.shop.battle.net/ru-ru/product/overwatch",
      "keywords": [
        {
          "keyword": "wow name characters",
          "frequency": 10,
          "expectedUrl": "",
          "history": [
            {
              "date": "2025-02-09",
              "positions": []
            },
            {
              "date": "2025-02-10",
              "positions": []
            }
          ],
          "tags": []
        },
        {
          "keyword": "overwatch",
          "frequency": 6600,
          "expectedUrl": "https://us.shop.battle.net/ru-ru/product/overwatch",
          "history": [
            {
              "date": "2025-02-09",
              "positions": [
                {
                  "position": 5,
                  "url": "https://us.shop.battle.net/ru-ru/product/overwatch"
                }
              ]
            },
            {
              "date": "2025-02-10",
              "positions": [
                {
                  "position": 5,
                  "url": "https://us.shop.battle.net/ru-ru/product/overwatch"
                }
              ]
            }
          ],
          "tags": [
            {
              "id": "742c189d-8822-41d5-b113-7843b4932c6c",
              "value": "over"
            },
            {
              "id": "7b865623-02b2-42c4-bd56-3af9afc62181",
              "value": "games"
            }
          ]
        }
      ]
    },
    "summary_info": {
      "page": 1,
      "page_total": 1,
      "count": 100,
      "total": 2,
      "sort": "keyword",
      "order": "desc"
    },
    "spent_limits": 0
  }
}
```

### Response Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `result` | object | required | Contains the main response data |
| `result.data` | object | required | Includes project-specific information and keyword details |
| `result.summary_info` | object | required | Summary data block |
| `result.spent_limits` | integer | required | The number of API credits consumed by this request. This method does not spend API credits. |

### Response Data Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `data.projectId` | integer | required | Project ID |
| `data.projectRegionId` | integer | required | Region ID |
| `data.domain` | string | required | Domain for which the data is required |
| `data.keywords` | array[object] | required | Array of keyword objects |
| `data.keywords.keyword` | string | required | Keyword text |
| `data.keywords.frequency` | integer | required | Keyword frequency |
| `data.keywords.expectedUrl` | string | required | Expected URL for the keyword |
| `data.keywords.history` | array[object] | required | Historical position data |
| `data.keywords.history.date` | string<date> | required | Date of the position data |
| `data.keywords.history.positions` | array[object] | required | Array of position objects |
| `data.keywords.history.positions.position` | integer | required | Position in search results |
| `data.keywords.history.positions.url` | string | required | URL found at this position |
| `data.keywords.tags` | array[object] | required | Array of tag objects |
| `data.keywords.tags.id` | string | required | Tag ID |
| `data.keywords.tags.value` | string | required | Tag value |
| `summary_info.page` | integer | required | Current page number |
| `summary_info.page_total` | integer | required | Total number of pages |
| `summary_info.count` | integer | required | Number of results on current page |
| `summary_info.total` | integer | required | Total number of results |
| `summary_info.sort` | string | required | Sorting parameter used |
| `summary_info.order` | string | required | Sorting order used |
| `spent_limits` | integer | required | API credits consumed |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#RtApiSerpResultsProcedure.getUrlsSerpResultsHistory' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "RtApiSerpResultsProcedure.getUrlsSerpResultsHistory", "params": { "projectId": 1226819, "projectRegionId": 372691, "page": 1, "pageSize": 100, "dateFrom": "2025-02-09", "dateTo": "2025-02-10", "sort": "keyword", "order": "desc", "keywords": [ "overwatch", "wow name characters" ], "withTags": true, "domain": "https://us.shop.battle.net/ru-ru/product/overwatch" } }'
```

## Response Example

```json
{
  "id": "123",
  "result": {
    "data": {
      "projectId": 1226819,
      "projectRegionId": 372691,
      "domain": "https://us.shop.battle.net/ru-ru/product/overwatch",
      "keywords": [
        {
          "keyword": "wow name characters",
          "frequency": 10,
          "expectedUrl": "",
          "history": [
            {
              "date": "2025-02-09",
              "positions": []
            },
            {
              "date": "2025-02-10",
              "positions": []
            }
          ],
          "tags": []
        },
        {
          "keyword": "overwatch",
          "frequency": 6600,
          "expectedUrl": "https://us.shop.battle.net/ru-ru/product/overwatch",
          "history": [
            {
              "date": "2025-02-09",
              "positions": [
                {
                  "position": 5,
                  "url": "https://us.shop.battle.net/ru-ru/product/overwatch"
                }
              ]
            },
            {
              "date": "2025-02-10",
              "positions": [
                {
                  "position": 5,
                  "url": "https://us.shop.battle.net/ru-ru/product/overwatch"
                }
              ]
            }
          ],
          "tags": [
            {
              "id": "742c189d-8822-41d5-b113-7843b4932c6c",
              "value": "over"
            },
            {
              "id": "7b865623-02b2-42c4-bd56-3af9afc62181",
              "value": "games"
            }
          ]
        }
      ]
    },
    "summary_info": {
      "page": 1,
      "page_total": 1,
      "count": 100,
      "total": 2,
      "sort": "keyword",
      "order": "desc"
    },
    "spent_limits": 0
  }
}