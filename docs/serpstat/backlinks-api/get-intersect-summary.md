# getIntersectSummary

## Overview

The `SerpstatBacklinksProcedure.getIntersectSummary` method gives you a list of the number of common domains (donors) that refer to the analyzed domain. The data set is similar to the [Links intersect report](https://serpstat.com/backlinks/intersect/).

### Credits
This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

### Note
Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

### Use case
With the `SerpstatBacklinksProcedure.getIntersectSummary`, you can compare the link mass of several domains, and find common and unique donors for each site.

## API Reference

**Method:** `SerpstatBacklinksProcedure.getIntersectSummary`

**Endpoint:** `POST https://api.serpstat.com/v4`

### Request Parameters

#### Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | Should be exact `SerpstatBacklinksProcedure.getIntersectSummary` |
| `params` | object | Object containing request parameters |

#### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | The domain name of the analyzed site |
| `intersect` | array[string] | Yes | Domains to find common donors with |

### Request Body Example

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getIntersectSummary",
  "params": {
    "query": "gepur.com",
    "intersect": [
      "klubok.com",
      "issaplus.com"
    ]
  }
}
```

### cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getIntersectSummary' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getIntersectSummary",
    "params": {
      "query": "gepur.com",
      "intersect": [
        "klubok.com",
        "issaplus.com"
      ]
    }
  }'
```

## Response

### Response Structure

The response contains the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Request / response identifier provided in the request |
| `result` | object | Contains the API response data |

#### Result Object

| Field | Type | Description |
|-------|------|-------------|
| `data` | array[object] | Array of intersect results |
| `summary_info` | object | Pagination and summary information |

#### Data Object

| Field | Type | Description |
|-------|------|-------------|
| `referring_domains_count` | integer | Number of referring domains |
| `domains` | string | Comma-separated list of domains being compared |

#### Summary Info Object

| Field | Type | Description |
|-------|------|-------------|
| `left_lines` | integer | Total number of lines processed |
| `page` | integer | Current page number |
| `count` | integer | Number of items returned on this page |
| `total` | integer | Total number of items (0 for this endpoint) |
| `sort` | string | Current sort field |
| `order` | string | Current sort order |

### Response Example

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "referring_domains_count": 522,
        "domains": "gepur.com"
      },
      {
        "referring_domains_count": 460,
        "domains": "klubok.com"
      },
      {
        "referring_domains_count": 131,
        "domains": "gepur.com, klubok.com"
      },
      {
        "referring_domains_count": 332,
        "domains": "issaplus.com"
      },
      {
        "referring_domains_count": 140,
        "domains": "gepur.com, issaplus.com"
      },
      {
        "referring_domains_count": 180,
        "domains": "klubok.com, issaplus.com"
      },
      {
        "referring_domains_count": 100,
        "domains": "gepur.com, klubok.com, issaplus.com"
      }
    ],
    "summary_info": {
      "left_lines": 972954,
      "page": 1,
      "count": 7,
      "total": 0,
      "sort": "",
      "order": ""
    }
  }
}
```

### Response Field Descriptions

#### Data Array

Each object in the `data` array represents a combination of domains and their referring domains count:

- **Single domain entries**: Show the total referring domains for each domain individually
- **Multiple domain entries**: Show the count of referring domains that link to all specified domains in the combination

#### Summary Info

- **`left_lines`**: Total number of lines processed from the database
- **`page`**: Current page number (always 1 for this endpoint)
- **`count`**: Number of items returned in this response
- **`total`**: Always 0 for this endpoint (no pagination available)
- **`sort`** and **`order`**: Empty strings (no sorting available for this endpoint)

## Implementation Notes

1. **Credit Consumption**: Be aware of the credit consumption changes starting June 15, 2025
2. **Domain Combinations**: The response includes all possible combinations of the specified domains
3. **No Pagination**: This endpoint does not support pagination - all results are returned in a single request
4. **Use Cases**: Ideal for competitor analysis and finding common backlink sources between multiple domains