# getAuditStats | Serpstat Public API

**URL:** `https://api.serpstat.com/v4/?token=123#SerpstatLimitsProcedure.getAuditStats`  
**Method:** `POST`

## Description

With the `SerpstatLimitsProcedure.getAuditStats` method, check how many credits you have left.

**Note:** This method doesn't spent API credits.

## Request

### Security
API Key

### Body

```json
{
  "id": "string",
  "method": "SerpstatLimitsProcedure.getAuditStats"
}
```

### Parameters

#### id (string, required)
Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"`

#### method (string, required)
Should be exact `SerpstatLimitsProcedure.getAuditStats`

**Example:** `SerpstatLimitsProcedure.getAuditStats`

## Responses

### 200 OK

```json
{
  "id": "string",
  "result": {
    "data": {
      "hasAuditOnePage": "boolean",
      "hasAuditJsScanPage": "boolean", 
      "hasAuditLimitPage": "boolean",
      "maxAuditLimitPage": "integer",
      "total": "integer",
      "used": "integer",
      "left": "integer"
    }
  }
}
```

#### id (string)
Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"`

#### result (object)
##### data (object)
###### hasAuditOnePage (boolean)
Whether audit one page functionality is available

###### hasAuditJsScanPage (boolean)
Whether audit JavaScript scan page functionality is available

###### hasAuditLimitPage (boolean)
Whether audit limit page functionality is available

###### maxAuditLimitPage (integer)
Maximum audit limit page value

###### total (integer)
Total number of API credits available

###### used (integer)
Number of API credits already used

###### left (integer)
Number of API credits remaining

## Request Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatLimitsProcedure.getAuditStats' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "1", "method": "SerpstatLimitsProcedure.getAuditStats" }'
```

## Response Example

```json
{
  "id": "555",
  "result": {
    "data": {
      "hasAuditOnePage": true,
      "hasAuditJsScanPage": true,
      "hasAuditLimitPage": false,
      "maxAuditLimitPage": 0,
      "total": 100000,
      "used": 1000,
      "left": 99000
    }
  }
}