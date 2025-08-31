# getProjectRegions | Serpstat Public API

The `RtApiSearchEngineProcedure.getProjectRegions` method returns the list of project regions and their status.

To get your region please refer to [full regions list](https://docs.google.com/spreadsheets/d/1LUDtm-L1qWMVpmWuN-nvDyYFfQtfiXUh5LIHE8sjs0k/edit?gid=75443986#gid=75443986).

**Credits**: This method does not spend API credits.

## Request

### Security: API Key

### Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| method | string | required | Should be exact `RtApiSearchEngineProcedure.getProjectRegions` |
| params | object | required | The object with parameters {...}, it lists all the following parameters and arrays [...] |
| projectId | integer | required | Project ID |

## Responses

### 200 OK

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Response id corresponds the request id |
| result | object | Contains the answer |
| &nbsp;&nbsp;&nbsp;&nbsp;projectId | integer | Project ID |
| &nbsp;&nbsp;&nbsp;&nbsp;regions | array[object] | Array with regions |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id | integer | Region ID |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;active | boolean | Whether the region is active |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;serpType | string | SERP type |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deviceType | string | Device type |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;searchEngine | string | Search engine |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;region | string | Region name |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;country | string | Country |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;city | string | City |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;langCode | string | Language code |
| spent_limits | integer | This method does not spend API credits. |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#RtApiSearchEngineProcedure.getProjectRegions' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "RtApiSearchEngineProcedure.getProjectRegions", "params": { "projectId": 853932 } }'
```

## Response Example

```json
{
  "id": "string",
  "result": {
    "projectId": 853932,
    "regions": [
      {
        "id": 0,
        "active": true,
        "serpType": "string",
        "deviceType": "string",
        "searchEngine": "string",
        "region": "string",
        "country": "string",
        "city": "string",
        "langCode": "string"
      }
    ],
    "spent_limits": 0
  }
}