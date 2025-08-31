# getTaskResult | Serpstat Public API

The `SerpstatTaskProcedure.getTaskResult` method brings in volume parsing results using `taskId` which was obtained with `SerpstatTaskProcedure.addKeywordListFreq`.

## Credits
This method doesn't spent API credits.

## Method
POST `https://api.serpstat.com/v4/#SerpstatTaskProcedure.getTaskResult`

## Request

### Body

```json
{
  "id": "123",
  "method": "SerpstatTaskProcedure.getTaskResult",
  "params": {
    "taskId": "aa28e2a5-a81c-43c9-b441-50d82e8e182e",
    "page": 1,
    "pageSize": 10
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
- **Description**: Should be exact `SerpstatTaskProcedure.getTaskResult`

#### params
- **Type**: object
- **Required**: Yes

##### taskId
- **Type**: string
- **Required**: Yes
- **Description**: Query id to get parsing results with `SerpstatTaskProcedure.getTaskResult`
- **Example**: `bc0a46cc-357e-4706-a674-1e8166f81fb2`

##### page
- **Type**: integer
- **Description**: Page number
- **Constraint**: `>= 1`
- **Default**: `1`

##### pageSize
- **Type**: integer
- **Description**: Number of results per a page
- **Constraint**: `>= 10`
- **Default**: `100`

## Responses

### 200 OK

#### Body

```json
{
  "id": "123",
  "result": {
    "total": 6,
    "page": 1,
    "pageSize": 10,
    "taskMeta": {
      "typeId": "1",
      "seId": "1",
      "regionId": "2840",
      "match": "exact"
    },
    "keywords": [
      {
        "keyword": "iphone",
        "keyword.raw": "iphone",
        "status": 2,
        "cost": 2.66,
        "searchVolume": 1220000,
        "searchVolumeHistory": [
          {
            "date": "2024-02-01T00:00:00",
            "value": 1000000
          },
          {
            "date": "2024-03-01T00:00:00",
            "value": 1000000
          },
          {
            "date": "2024-04-01T00:00:00",
            "value": 1000000
          },
          {
            "date": "2024-05-01T00:00:00",
            "value": 1220000
          },
          {
            "date": "2024-06-01T00:00:00",
            "value": 1220000
          },
          {
            "date": "2024-07-01T00:00:00",
            "value": 1500000
          },
          {
            "date": "2024-08-01T00:00:00",
            "value": 1500000
          },
          {
            "date": "2024-09-01T00:00:00",
            "value": 1830000
          },
          {
            "date": "2024-10-01T00:00:00",
            "value": 1220000
          },
          {
            "date": "2024-11-01T00:00:00",
            "value": 1220000
          },
          {
            "date": "2024-12-01T00:00:00",
            "value": 1500000
          },
          {
            "date": "2025-01-01T00:00:00",
            "value": 1220000
          }
        ],
        "competition": 100
      },
      {
        "keyword": "iphone X",
        "keyword.raw": "iphone X",
        "status": 2,
        "cost": 0.66,
        "searchVolume": 135000,
        "searchVolumeHistory": [
          {
            "date": "2024-02-01T00:00:00",
            "value": 201000
          },
          {
            "date": "2024-03-01T00:00:00",
            "value": 201000
          },
          {
            "date": "2024-04-01T00:00:00",
            "value": 165000
          },
          {
            "date": "2024-05-01T00:00:00",
            "value": 165000
          },
          {
            "date": "2024-06-01T00:00:00",
            "value": 165000
          },
          {
            "date": "2024-07-01T00:00:00",
            "value": 110000
          },
          {
            "date": "2024-08-01T00:00:00",
            "value": 110000
          },
          {
            "date": "2024-09-01T00:00:00",
            "value": 165000
          },
          {
            "date": "2024-10-01T00:00:00",
            "value": 110000
          },
          {
            "date": "2024-11-01T00:00:00",
            "value": 110000
          },
          {
            "date": "2024-12-01T00:00:00",
            "value": 110000
          },
          {
            "date": "2025-01-01T00:00:00",
            "value": 90500
          }
        ],
        "competition": 89
      },
      {
        "keyword": "iphone 11",
        "keyword.raw": "iphone 11",
        "status": 2,
        "cost": 0.24,
        "searchVolume": 450000,
        "searchVolumeHistory": [
          {
            "date": "2024-02-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-03-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-04-01T00:00:00",
            "value": 450000
          },
          {
            "date": "2024-05-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-06-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-07-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-08-01T00:00:00",
            "value": 450000
          },
          {
            "date": "2024-09-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-10-01T00:00:00",
            "value": 450000
          },
          {
            "date": "2024-11-01T00:00:00",
            "value": 450000
          },
          {
            "date": "2024-12-01T00:00:00",
            "value": 450000
          },
          {
            "date": "2025-01-01T00:00:00",
            "value": 301000
          }
        ],
        "competition": 100
      },
      {
        "keyword": "iphone 10",
        "keyword.raw": "iphone 10",
        "status": 2,
        "cost": 0.11,
        "searchVolume": 110000,
        "searchVolumeHistory": [
          {
            "date": "2024-02-01T00:00:00",
            "value": 110000
          },
          {
            "date": "2024-03-01T00:00:00",
            "value": 110000
          },
          {
            "date": "2024-04-01T00:00:00",
            "value": 90500
          },
          {
            "date": "2024-05-01T00:00:00",
            "value": 90500
          },
          {
            "date": "2024-06-01T00:00:00",
            "value": 110000
          },
          {
            "date": "2024-07-01T00:00:00",
            "value": 110000
          },
          {
            "date": "2024-08-01T00:00:00",
            "value": 90500
          },
          {
            "date": "2024-09-01T00:00:00",
            "value": 135000
          },
          {
            "date": "2024-10-01T00:00:00",
            "value": 110000
          },
          {
            "date": "2024-11-01T00:00:00",
            "value": 110000
          },
          {
            "date": "2024-12-01T00:00:00",
            "value": 110000
          },
          {
            "date": "2025-01-01T00:00:00",
            "value": 90500
          }
        ],
        "competition": 93
      },
      {
        "keyword": "iphone 12",
        "keyword.raw": "iphone 12",
        "status": 2,
        "cost": 0.81,
        "searchVolume": 550000,
        "searchVolumeHistory": [
          {
            "date": "2024-02-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-03-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-04-01T00:00:00",
            "value": 450000
          },
          {
            "date": "2024-05-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-06-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-07-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-08-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-09-01T00:00:00",
            "value": 673000
          },
          {
            "date": "2024-10-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-11-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2024-12-01T00:00:00",
            "value": 550000
          },
          {
            "date": "2025-01-01T00:00:00",
            "value": 368000
          }
        ],
        "competition": 100
      },
      {
        "keyword": "iphone 13",
        "keyword.raw": "iphone 13",
        "status": 2,
        "cost": 0.66,
        "searchVolume": 823000,
        "searchVolumeHistory": [
          {
            "date": "2024-02-01T00:00:00",
            "value": 673000
          },
          {
            "date": "2024-03-01T00:00:00",
            "value": 673000
          },
          {
            "date": "2024-04-01T00:00:00",
            "value": 673000
          },
          {
            "date": "2024-05-01T00:00:00",
            "value": 673000
          },
          {
            "date": "2024-06-01T00:00:00",
            "value": 1000000
          },
          {
            "date": "2024-07-01T00:00:00",
            "value": 823000
          },
          {
            "date": "2024-08-01T00:00:00",
            "value": 673000
          },
          {
            "date": "2024-09-01T00:00:00",
            "value": 1000000
          },
          {
            "date": "2024-10-01T00:00:00",
            "value": 823000
          },
          {
            "date": "2024-11-01T00:00:00",
            "value": 823000
          },
          {
            "date": "2024-12-01T00:00:00",
            "value": 823000
          },
          {
            "date": "2025-01-01T00:00:00",
            "value": 550000
          }
        ],
        "competition": 100
      }
    ]
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

##### total
- **Type**: integer
- **Required**: Yes
- **Description**: Total number of keywords for a task excluding blocked and duplicates

##### page
- **Type**: integer
- **Required**: Yes
- **Description**: Ordinal number of results page

##### pageSize
- **Type**: integer
- **Required**: Yes
- **Description**: Number of results found on a page

##### taskMeta
- **Type**: object

###### typeId
- **Type**: string
- **Description**: The type of the task

###### seId
- **Type**: string
- **Description**: Search engine ID

###### regionId
- **Type**: string
- **Description**: Region/city ID

###### match
- **Type**: string
- **Description**: Match type (exact, broad, phrase)

##### keywords
- **Type**: array[object]

###### keyword
- **Type**: string
- **Description**: The keyword

###### keyword.raw
- **Type**: string
- **Description**: The raw keyword as provided

###### status
- **Type**: integer
- **Description**: The status of the keyword processing

###### cost
- **Type**: number
- **Description**: The cost of processing this keyword

###### searchVolume
- **Type**: integer
- **Description**: Current search volume for the keyword

###### searchVolumeHistory
- **Type**: array[object]
- **Description**: Historical search volume data

###### competition
- **Type**: integer
- **Description**: Competition level for the keyword

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatTaskProcedure.getTaskResult' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatTaskProcedure.getTaskResult",
    "params": {
      "taskId": "aa28e2a5-a81c-43c9-b441-50d82e8e182e",
      "page": 1,
      "pageSize": 10
    }
  }'