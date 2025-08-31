# getAllRegionsTraffic

The `SerpstatDomainProcedure.getAllRegionsTraffic` method returns an array with information about the amount of traffic by domain in Serpstat databases. Databases with a number of keywords equal to zero are not shown in the response.

**Credits**: 1 credit per one `result` array member in `data` object in response.

**Note**: Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Request

**POST** `https://api.serpstat.com/v4/#SerpstatDomainProcedure.getAllRegionsTraffic`

### Security

API Key

### Body

```json
{
  "id": "166",
  "method": "SerpstatDomainProcedure.getAllRegionsTraffic",
  "params": {
    "domain": "serpstat.com",
    "sort": "region",
    "order": "asc"
  }
}
```

#### Body Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | string | yes | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| method | string | yes | Should be exact `SerpstatDomainProcedure.getAllRegionsTraffic` |
| params | object | yes |  |
| domain | string | yes | Domain name |

#### Optional Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| sort | string | no | Sort by data |
| | | | **Allowed values:**
| | | | - traff
| | | | - region
| | | | - country_name_en
| | | | - google_domain |
| order | string | no | Sort order |
| | | | **Allowed values:**
| | | | - asc
| | | | - desc |

## Responses

### 200 OK

#### Body

```json
{
  "id": "string",
  "result": {
    "data": {
      "data": {
        "property1": {
          "country_name_en": "string",
          "region": "string",
          "traff": 0,
          "google_domain": "string"
        },
        "property2": {
          "country_name_en": "string",
          "region": "string",
          "traff": 0,
          "google_domain": "string"
        }
      }
    },
    "summary_info": {
      "analysed_domain": "string",
      "sort": "string",
      "regions_count": 0,
      "order": "string",
      "total_traff": 0,
      "left_lines": 0
    }
  }
}
```

#### Response Schema

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | string | yes | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| result | object | yes |  |
| data | object | yes |  |
| summary_info | object | yes |  |

#### Data Object

| Name | Type | Description |
|------|------|-------------|
| country_name_en | string | Country name in English |
| region | string | Region name |
| traff | integer | Traffic amount |
| google_domain | string | Google domain |

#### Summary Info Object

| Name | Type | Description |
|------|------|-------------|
| analysed_domain | string | Analyzed domain name |
| sort | string | Sort field used |
| regions_count | integer | Number of regions returned |
| order | string | Sort order used |
| total_traff | integer | Total traffic across all regions |
| left_lines | integer | Number of remaining results |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatDomainProcedure.getAllRegionsTraffic' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "166", "method": "SerpstatDomainProcedure.getAllRegionsTraffic", "params": { "domain": "serpstat.com", "sort": "region", "order": "asc" } }'