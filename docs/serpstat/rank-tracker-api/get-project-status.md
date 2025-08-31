# getProjectStatus

The `RtApiSearchEngineProcedure.getProjectStatus` method returns the current status of the position update process (parsing) for the given project and region. If the project is in parsing status, you should wait for its completion to get accurate results.

**Credits**: This method doesn't spent API credits.

## Request

**Method**: `POST`  
**URL**: `https://api.serpstat.com/v4/#RtApiSearchEngineProcedure.getProjectStatus`

### Body

```json
{
  "id": "135",
  "method": "RtApiProjectProcedure.getProjectStatus",
  "params": {
    "projectId": 1257794,
    "regionId": 389715
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | required | Should be exact `RtApiProjectProcedure.getProjectStatus` |
| `params` | object | required | |
| `projectId` | integer | required | Project identifier in numeric representation |
| `regionId` | integer | required | Search region id. [Reference](https://docs.google.com/spreadsheets/d/1LUDtm-L1qWMVpmWuN-nvDyYFfQtfiXUh5LIHE8sjs0k/edit?gid=75443986#gid=75443986) |

## Responses

### 200 OK

```json
{
  "id": "1",
  "result": {
    "projectId": 1257794,
    "regionId": 389715,
    "parsing": false
  }
}
```

### Response Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `result` | object | required | |
| `result.projectId` | integer | required | Number value of project |
| `result.regionId` | integer | required | Number value of region |
| `result.parsing` | boolean | required | Project parsing status: `"true"` - project is currently parsing, `"false"` - all ok, data is ready! |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#RtApiSearchEngineProcedure.getProjectStatus' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "135", "method": "RtApiProjectProcedure.getProjectStatus", "params": { "projectId": 1257794, "regionId": 389715 } }'
```

## Response Example

```json
{
  "id": "1",
  "result": {
    "projectId": 1257794,
    "regionId": 389715,
    "parsing": false
  }
}