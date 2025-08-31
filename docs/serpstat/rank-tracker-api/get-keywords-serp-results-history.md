# getKeywordsSerpResultsHistory

The `RtApiSerpResultsProcedure.getKeywordsSerpResultsHistory` method returns Google's top-100 search results for the required region and project keywords. The data set is similar to the Rank tracker - SERP history.

**Credits**: This method does not spend API credits.

## Request

**Method**: `POST`  
**URL**: `https://api.serpstat.com/v4/#RtApiSerpResultsProcedure.getKeywordsSerpResultsHistory`

### Body

```json
{
  "id": "123",
  "method": "RtApiSerpResultsProcedure.getKeywordsSerpResultsHistory",
  "params": {
    "projectId": 1269282,
    "projectRegionId": 393639,
    "page": 1,
    "pageSize": 20,
    "dateFrom": "2025-04-02",
    "dateTo": "2025-05-02",
    "sort": "date",
    "order": "asc",
    "keywords": [
      "walk in clinic tampa"
    ],
    "withTags": true
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | required | Should be exact `RtApiSerpResultsProcedure.getKeywordsSerpResultsHistory` |
| `params` | object | required | The object with parameters {...}, it lists all the following parameters and arrays [...] |
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

### Parameter Defaults

| Parameter | Default Value |
|-----------|---------------|
| `method` | `RtApiSerpResultsProcedure.getKeywordsSerpResultsHistory` |
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
      // Object with data.
    },
    "summary_info": {
      // Summary data block
    },
    "spent_limits": 0
  }
}
```

### Response Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | required | Response id corresponds the request id. |
| `result` | object | required | Contains the answer. |
| `result.data` | object | required | Object with data. |
| `result.summary_info` | object | required | Summary data block |
| `result.spent_limits` | integer | required | This method does not spend API credits. |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#RtApiSerpResultsProcedure.getKeywordsSerpResultsHistory' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "RtApiSerpResultsProcedure.getKeywordsSerpResultsHistory", "params": { "projectId": 1269282, "projectRegionId": 393639, "page": 1, "pageSize": 20, "dateFrom": "2025-04-02", "dateTo": "2025-05-02", "sort": "date", "order": "asc", "keywords": [ "walk in clinic tampa" ], "withTags": true } }'
```

## Response Example

*(Large examples are not rendered by default. Click "Load examples" to view the complete response structure.)*