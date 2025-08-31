# getTopAnchors

The `SerpstatBacklinksProcedure.getTopAnchors` method returns information about the TOP-10 anchors, the number of backlinks with these anchors, and the number of domains on which the referring pages are located. The data set is similar to the "TOP anchor backlinks by popularity" table from the [Overview report](https://serpstat.com/backlinks/dashboard/).

> **Credits**: 1 credit per request.

> **Note**: Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

## Use case:

With the SerpstatBacklinksProcedure.getTopAnchors method, identify the most popular anchors of competitor sites and use the same anchors to promote your site.

## Request

### Security: API Key

### Body

```json
{
  "id": "string",
  "method": "SerpstatBacklinksProcedure.getTopAnchors",
  "params": {
    "query": "string",
    "searchType": "string"
  }
}
```

### Parameters

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|---------|
| id | string | Yes | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" | `"123"` |
| method | string | Yes | should be exact `SerpstatBacklinksProcedure.getTopAnchors` | `SerpstatBacklinksProcedure.getTopAnchors` |
| params | object | Yes | - | - |
| query | string | Yes | The domain name of the analyzed site | `facebook.com` |
| searchType | string | Yes | Search modes for analysis | `domain` / `domain_with_subdomains` |

### Default Values

- `searchType`: `domain_with_subdomains`

## Responses

### 200 OK

```json
{
  "id": "string",
  "result": {
    "data": [
      {
        "anchor": "string",
        "backlinks_count": 0,
        "domains_count": 0
      }
    ],
    "summary_info": {
      "sort": "string",
      "order": "string",
      "left_lines": 0,
      "referring_domains": 0,
      "backlinks": 0,
      "unique_anchors": 0
    }
  }
}
```

### Response Schema

| Field | Type | Description |
|-------|------|-------------|
| id | string | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| result | object | Object, which contains the answer |
| result.data | array[object] | Data object contains info about anchors |
| result.summary_info | object | Contains an object with data about left credits and additional data |

### Data Object Schema

| Field | Type | Description |
|-------|------|-------------|
| anchor | string | Anchor text |
| backlinks_count | integer | Number of backlinks with this anchor |
| domains_count | integer | Number of domains with this anchor |

### Summary Info Object Schema

| Field | Type | Description |
|-------|------|-------------|
| sort | string | Field used for sorting |
| order | string | Sort order |
| left_lines | integer | Number of remaining lines/items |
| referring_domains | integer | Number of referring domains |
| backlinks | integer | Total number of backlinks |
| unique_anchors | integer | Number of unique anchors |

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getTopAnchors' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getTopAnchors",
  "params": {
    "query": "facebook.com",
    "searchType": "domain_with_subdomains"
  }
}'
```

## Credit Consumption

- **Current**: 1 API credit per request
- **Starting June 15, 2025**: 1 API credit even when no data is available for the requested query