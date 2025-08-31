# addKeywordListFreq

## Method Description

The `SerpstatTaskProcedure.addKeywordListFreq` method sends keywords to volume parsing and returns a unique task key to be used for `SerpstatTaskProcedure.getTaskResult` to get parsing results. Keywords must be transferred as an array.

## Important Notes

⚠️ **NOTE**: This API has separate billing, and credits for this API are not included in any available subscription plan and must be purchased separately. See [details](https://api-docs.serpstat.com/docs/serpstat-public-api/139902435d58c-serp-scraper-api).

✅ **Credits**: this method corresponds to specific limits.

You will find conditions and price details [here](https://data.serpstat.com/api-keyword-volume-checker/).

## API Endpoint

- **Method**: POST
- **URL**: `https://api.serpstat.com/v4/#SerpstatTaskProcedure.addKeywordListFreq`

## Request Parameters

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"` |
| `method` | string | Yes | Should be exact `SerpstatTaskProcedure.addKeywordListFreq` |
| `params` | object | Yes | |
| `keywords` | array[string] | Yes | Keywords to get metrics (max 50000) |
| `regionId` | integer | Yes | Region or city identifier. Reffer to full list of [region ids](https://docs.google.com/spreadsheets/d/1LUDtm-L1qWMVpmWuN-nvDyYFfQtfiXUh5LIHE8sjs0k/edit#gid=75443986) |
| `typeId` | integer | No | Device type identifier |
| `seId` | any | No | Search engine identifier |

### Parameter Details

#### `regionId`
- **Type**: integer
- **Required**: Yes
- **Description**: Region or city identifier. Reffer to full list of [region ids](https://docs.google.com/spreadsheets/d/1LUDtm-L1qWMVpmWuN-nvDyYFfQtfiXUh5LIHE8sjs0k/edit#gid=75443986)
- **Constraints**: `>= 1`

#### `typeId`
- **Type**: integer
- **Required**: No
- **Description**: Device type identifier
- **Constraints**: `>= 1` and `<= 2`
- **Default**: `1`

#### `seId`
- **Type**: any
- **Required**: No
- **Description**: Search engine identifier
- **Allowed value**: `1`
- **Default**: `1`

## Request Example

```json
{
  "id": "123",
  "method": "SerpstatTaskProcedure.addKeywordListFreq",
  "params": {
    "keywords": [
      "iphone",
      "iphone X",
      "iphone 10",
      "iphone 11",
      "iphone 12",
      "iphone 13"
    ],
    "typeId": 1,
    "seId": 1,
    "regionId": 2840
  }
}
```

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatTaskProcedure.addKeywordListFreq' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatTaskProcedure.addKeywordListFreq",
    "params": {
      "keywords": [
        "iphone",
        "iphone X",
        "iphone 10",
        "iphone 11",
        "iphone 12",
        "iphone 13"
      ],
      "typeId": 1,
      "seId": 1,
      "regionId": 2840
    }
  }'
```

## Response

### Status Code: 200 OK

### Response Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"` |
| `result` | object | Yes | |
| `taskId` | string | Yes | Query id to get parsing results with `SerpstatTaskProcedure.getTaskResult` |
| `accepted` | integer | Yes | Total number of keywords set for parsing excluding blocked |
| `duplicates_cleaned` | integer | Yes | The number of duplicated keywords that have been cleared, the credits for them will not be charged. |
| `blocked` | array[object] | Yes | Array with blocked keywords. Credits are not charged. |

### Response Example

```json
{
  "id": "123",
  "result": {
    "taskId": "aa28e2a5-a81c-43c9-b441-50d82e8e182e",
    "accepted": 6,
    "duplicates_cleaned": 0,
    "blocked": []
  }
}
```

## Authentication

This endpoint requires API authentication using a token. The token should be provided in the URL parameter.

## Usage Notes

1. This is an asynchronous API - you receive a `taskId` that you need to use with `getTaskResult` to get the actual parsing results
2. The API has separate billing from regular Serpstat API credits
3. Maximum of 50,000 keywords per request
4. Duplicates are automatically cleaned and not charged
5. Blocked keywords are returned in the response and not charged