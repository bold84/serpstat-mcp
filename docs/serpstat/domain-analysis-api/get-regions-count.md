# getRegionsCount

The `SerpstatDomainProcedure.getRegionsCount` returns an array with information about the number of keys per domain in Serpstat databases. Databases with a number of keys equal to zero are not shown in the response.

## Credits
- 1 credit per one result array member in `data` object in response.

## Note
Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Request

### Security
API Key

### Body

```json
{
  "id": "123",
  "method": "SerpstatDomainProcedure.getRegionsCount",
  "params": {
    "domain": "ebay.com",
    "sort": "db_name",
    "order": "asc"
  }
}
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| domain | string | Yes | Domain name |
| sort | string | No | Field for sorting |
| order | string | No | Sort order (asc — ascending, desc — descending) |

#### Sort Field Options
- `keywords_count`
- `db_name` 
- `country_name_en`
- `google_domain`

#### Sort Order Options
- `asc` (ascending)
- `desc` (descending)

**Default sort:** `keywords_count`  
**Default order:** `desc`

## Responses

### 200 OK

#### Body

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        // Database information object
      }
    ],
    "summary_info": {
      // Summary information object
    }
  }
}
```

#### Response Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| result | object | Yes | Main result object |
| result.data | array[object] | Yes | Array containing database information objects |
| result.summary_info | object | Yes | Summary information object |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatDomainProcedure.getRegionsCount' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatDomainProcedure.getRegionsCount",
    "params": {
      "domain": "ebay.com",
      "sort": "db_name",
      "order": "asc"
    }
  }'