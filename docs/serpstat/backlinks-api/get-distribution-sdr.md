# getDistributionSDR

## Overview

The `SerpstatBacklinksProcedure.getDistributionSDR` method returns an array containing objects with SDR value ranges and the number of domains that are included in these ranges. The data set is similar to the graph SDR distribution in the [Overview report](https://serpstat.com/backlinks/dashboard/).

### Credits
1 credit per request.

### Note
Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

### Use case
Using this method, `SerpstatBacklinksProcedure.getDistributionSDR`, check which SDR range has the most donor domains of the target site to determine the quality of that site's link profile.

## API Reference

**Method:** `SerpstatBacklinksProcedure.getDistributionSDR`

**Endpoint:** `POST https://api.serpstat.com/v4`

### Request Parameters

#### Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| `method` | string | Should be exact `SerpstatBacklinksProcedure.getDistributionSDR` |
| `params` | object | Object containing request parameters |

#### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | The domain name of the analyzed site |
| `searchType` | string | No | Search modes for analysis |

#### SearchType Values

| Value | Description |
|-------|-------------|
| `domain` | Search only the main domain |
| `domain_with_subdomains` | Search the main domain and all subdomains (Default) |

### Request Body Example

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getDistributionSDR",
  "params": {
    "query": "facebook.com",
    "searchType": "domain_with_subdomains"
  }
}
```

### cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getDistributionSDR' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getDistributionSDR",
    "params": {
      "query": "facebook.com",
      "searchType": "domain_with_subdomains"
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
| `data` | array[object] | Array of SDR distribution data |
| `summary_info` | object | Pagination and summary information |

#### Data Object

| Field | Type | Description |
|-------|------|-------------|
| `sdr_range` | string | SDR value range (e.g., "0", "1 - 9", "10 - 19") |
| `domains` | integer | Number of domains in this SDR range |

#### Summary Info Object

| Field | Type | Description |
|-------|------|-------------|
| `sort` | string | Current sort field |
| `order` | string | Current sort order |
| `left_lines` | integer | Total number of lines processed |

### Response Example

```json
{
  "id": "123",
  "result": {
    "summary_info": {
      "sort": "",
      "order": "",
      "left_lines": 972965
    },
    "data": [
      {
        "sdr_range": "0",
        "domains": 11540696
      },
      {
        "sdr_range": "1 - 9",
        "domains": 8138968
      },
      {
        "sdr_range": "10 - 19",
        "domains": 9031076
      },
      {
        "sdr_range": "20 - 29",
        "domains": 3900046
      },
      {
        "sdr_range": "30 - 39",
        "domains": 1091823
      },
      {
        "sdr_range": "40 - 49",
        "domains": 248003
      },
      {
        "sdr_range": "50 - 59",
        "domains": 46573
      },
      {
        "sdr_range": "60 - 69",
        "domains": 7213
      },
      {
        "sdr_range": "70 - 79",
        "domains": 900
      },
      {
        "sdr_range": "80 - 89",
        "domains": 109
      },
      {
        "sdr_range": "90 - 100",
        "domains": 11
      }
    ]
  }
}
```

### Response Field Descriptions

#### Data Array

Each object in the `data` array represents an SDR range and the count of domains that fall within that range:

- **`sdr_range`**: String representing the SDR score range (e.g., "0" for SDR 0, "1 - 9" for SDR scores 1-9)
- **`domains`**: Integer count of domains that have SDR scores within the specified range

#### Summary Info

- **`sort`**: Current sort field (empty string indicates no sorting applied)
- **`order`**: Current sort order (empty string indicates no specific order)
- **`left_lines`**: Total number of database lines processed to generate this distribution

## Implementation Notes

1. **SDR Analysis**: SDR (Spam Detection Rating) helps identify the quality of a website's backlink profile
2. **Credit Consumption**: Be aware of the credit consumption changes starting June 15, 2025
3. **Domain Quality**: Lower SDR ranges (0-9) typically indicate higher quality domains, while higher ranges (70-100) may indicate spam or low-quality domains
4. **Use Cases**: Perfect for competitor analysis and assessing the overall health of backlink profiles
5. **Search Types**: Use `domain_with_subdomains` for comprehensive analysis or `domain` for main domain only