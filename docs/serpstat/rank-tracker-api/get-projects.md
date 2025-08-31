# getProjects | Serpstat Public API

Use the `RtApiProjectProcedure.getProjects` method to get a list of your projects. The method will save you time on getting information on your project ID, name, date of creation without the need of entering the platform.

**Credits**: This method does not spend API credits.

## Request

### Security: API Key

### Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| method | string | required | Should be exact `RtApiProjectProcedure.getProjects` |
| params | object | required |  |
| page | integer |  | Page number in the projects list |
| &nbsp;&nbsp;&nbsp;&nbsp;Default: |  |  | `1` |
| &nbsp;&nbsp;&nbsp;&nbsp;Example: |  |  | `5` |
| pageSize | integer |  | Number of results per page in the project list |
| &nbsp;&nbsp;&nbsp;&nbsp;Allowed values: |  |  | `20`, `50`, `100`, `500` |
| &nbsp;&nbsp;&nbsp;&nbsp;Default: |  |  | `100` |

## Responses

### 200 OK

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | required | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| result | object | required | Contains the answer. |
| data | array[object] | required | Array with data |
| &nbsp;&nbsp;&nbsp;&nbsp;id | string |  | Project ID |
| &nbsp;&nbsp;&nbsp;&nbsp;projectName | string |  | Project name |
| &nbsp;&nbsp;&nbsp;&nbsp;domain | string |  | Project domain |
| &nbsp;&nbsp;&nbsp;&nbsp;createdAt | string |  | Project creation date |
| &nbsp;&nbsp;&nbsp;&nbsp;group | string |  | Project group |
| &nbsp;&nbsp;&nbsp;&nbsp;type | string |  | Project type |
| &nbsp;&nbsp;&nbsp;&nbsp;status | integer |  | Project status |
| &nbsp;&nbsp;&nbsp;&nbsp;enableTracking | boolean |  | Whether tracking is enabled |
| summary_info | object | required | Object with general data |
| &nbsp;&nbsp;&nbsp;&nbsp;page | integer |  | Current page number |
| &nbsp;&nbsp;&nbsp;&nbsp;page_total | integer |  | Total number of pages |
| &nbsp;&nbsp;&nbsp;&nbsp;count | integer |  | Number of items per page |
| &nbsp;&nbsp;&nbsp;&nbsp;total | integer |  | Total number of items |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#RtApiProjectProcedure.getProjects' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "RtApiProjectProcedure.getProjects", "params": { "page": 1, "pageSize": 20 } }'
```

## Response Example

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "id": "1213108",
        "projectName": "PUMA",
        "domain": "puma.com",
        "createdAt": "2024-01-09 11:10:57",
        "group": "New Client",
        "type": "owner",
        "status": 9,
        "enableTracking": false
      }
    ],
    "summary_info": {
      "page": 1,
      "page_total": 1,
      "count": 20,
      "total": 1
    }
  }
}