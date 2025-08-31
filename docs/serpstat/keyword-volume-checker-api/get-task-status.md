# getTaskStatus | Serpstat Public API

The `SerpstatTaskProcedure.getTaskStatus` method helps to obtain a position's check status with `taskId` by `SerpstatTaskProcedure.addKeywordListFreq`.

## Credits
This method doesn't spent API credits.

## Method
POST `https://api.serpstat.com/v4/#SerpstatTaskProcedure.getTaskStatus`

## Request

### Body

```json
{
  "id": "123",
  "method": "SerpstatTaskProcedure.getTaskStatus",
  "params": {
    "taskId": "aa28e2a5-a81c-43c9-b441-50d82e8e182e"
  }
}
```

### Parameters

#### id
- **Type**: string
- **Required**: Yes
- **Description**: The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`

#### method
- **Type**: string
- **Required**: Yes
- **Description**: Should be exact `SerpstatTaskProcedure.getTaskStatus`

#### params
- **Type**: object
- **Required**: Yes

##### taskId
- **Type**: string
- **Required**: Yes
- **Description**: Query id to get parsing results with `SerpstatTaskProcedure.getTaskResult`
- **Example**: `bc0a46cc-357e-4706-a674-1e8166f81fb2`

## Responses

### 200 OK

#### Body

```json
{
  "id": "123",
  "result": {
    "totalKeywords": 6,
    "keywordsStatusCount": [
      {
        "status": 2,
        "count": 6
      }
    ],
    "progress": 100
  }
}
```

### Response Schema

#### id
- **Type**: string
- **Required**: Yes
- **Description**: The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`

#### result
- **Type**: object

##### totalKeywords
- **Type**: integer
- **Required**: Yes
- **Description**: Total number of keywords in a task flagged for position checking

##### keywordsStatusCount
- **Type**: array[object]
- **Description**: Array with statuses

###### status
- **Type**: integer
- **Description**: The status code of the keyword processing

###### count
- **Type**: integer
- **Description**: Number of keywords with this status

##### progress
- **Type**: integer
- **Required**: Yes
- **Description**: Task progress. Total keywords ratio in a task to the number of keywords with 2-4 status (percentage)

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatTaskProcedure.getTaskStatus' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatTaskProcedure.getTaskStatus",
    "params": {
      "taskId": "aa28e2a5-a81c-43c9-b441-50d82e8e182e"
    }
  }'