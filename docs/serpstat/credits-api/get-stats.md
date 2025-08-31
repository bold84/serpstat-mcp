# getStats | Serpstat Public API

**URL:** `https://api.serpstat.com/v4/?token=123#SerpstatLimitsProcedure.getStats`  
**Method:** `POST`

## Description

The `SerpstatLimitsProcedure.getStats` method is for checking the number of available and used API and Serpstat extension credits. Perfect to monitoring your API usage.

**Note:** This method doesn't spent API credits.

## Request

### Security
API Key

### Body

```json
{
  "id": "string",
  "method": "SerpstatLimitsProcedure.getStats"
}
```

### Parameters

#### id (string, required)
Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"`

#### method (string, required)
Should be exact `SerpstatLimitsProcedure.getStats`

**Example:** `SerpstatLimitsProcedure.getStats`

## Responses

### 200 OK

```json
{
  "id": "string",
  "result": {
    "data": {
      "max_lines": "integer",
      "used_lines": "integer",
      "left_lines": "integer",
      "user_info": {
        "user_id": "string",
        "ga_client_Id": "string",
        "plan_id": "string"
      },
      "plugin_limits": {
        "hasApiPlugin": "boolean",
        "delayBetweenRequests": "integer",
        "total": "integer",
        "used": "integer",
        "left": "integer"
      }
    },
    "summary_info": {
      "left_lines": "integer"
    }
  }
}
```

#### id (string)
Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"`

#### result (object, required)
Request object contains all data

##### data (object, required)
###### max_lines (integer)
Maximum number of API lines available

###### used_lines (integer)
Number of API lines already used

###### left_lines (integer)
Number of API lines remaining

###### user_info (object, required)
####### user_id (string)
User identifier

####### ga_client_Id (string)
Google Analytics client identifier

####### plan_id (string)
Plan identifier

###### plugin_limits (object, required)
####### hasApiPlugin (boolean)
Whether API plugin is available

####### delayBetweenRequests (integer)
Delay between requests in seconds

####### total (integer)
Total number of plugin credits

####### used (integer)
Number of plugin credits already used

####### left (integer)
Number of plugin credits remaining

##### summary_info (object, required)
###### left_lines (integer)
Total number of API lines remaining

## Request Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatLimitsProcedure.getStats' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "SerpstatLimitsProcedure.getStats" }'
```

## Response Example

```json
{
  "id": "123",
  "result": {
    "data": {
      "max_lines": 100000,
      "used_lines": 5,
      "left_lines": 999995,
      "user_info": {
        "user_id": "555",
        "ga_client_Id": "12434534.544545",
        "plan_id": "2028"
      },
      "plugin_limits": {
        "hasApiPlugin": true,
        "delayBetweenRequests": 1,
        "total": 10000,
        "used": 10,
        "left": 9990
      }
    },
    "summary_info": {
      "left_lines": 999995
    }
  }
}