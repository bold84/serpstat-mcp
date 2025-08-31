# getDistributionTLD | Serpstat Backlinks API

## Overview

The `SerpstatBacklinksProcedure.getDistributionTLD` method returns information about the number of domain backlinks that belong to a specific top-level domain zone. The data set is similar to the Referring TLD map in the [Overview report](https://serpstat.com/backlinks/dashboard/).

**Credits:** 1 credit per request.

**Note:** Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

**Use case:**
- With the `SerpstatBacklinksProcedure.getDistributionTLD` method, determine from what regions users can get to the site based on incoming links.

## Endpoint Details

- **Method:** `SerpstatBacklinksProcedure.getDistributionTLD`
- **HTTP Method:** POST
- **Base URL:** `https://api.serpstat.com/v4`
- **API Path:** `/#SerpstatBacklinksProcedure.getDistributionTLD`

## Request Parameters

### Body Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `id` | string | Yes | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example "id":"123" | `"123"` |
| `method` | string | Yes | Should be exact `SerpstatBacklinksProcedure.getDistributionTLD` | `"SerpstatBacklinksProcedure.getDistributionTLD"` |
| `params` | object | Yes | Request parameters object | |
| `params.query` | string | Yes | The domain name of the analyzed site | `"facebook.com"` |
| `params.lang` | string | No | Language in which the `country_name` field value is returned in the response | `"en"` |
| `params.searchType` | string | No | Search modes for analysis | `"domain_with_subdomains"` |

**Allowed values for `lang`:**
- `en` (default)
- `ru`
- `uk`
- `de`
- `se`

**Allowed values for `searchType`:**
- `domain_with_subdomains` (default)
- `domain`

## Response Schema

### Success Response (200)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| `result` | object | Yes | Response result object |
| `result.data` | array[object] | Yes | Array of TLD distribution data |
| `result.summary_info` | object | Yes | Summary information |
| `result.summary_info.sort` | string | Yes | Sorted by field |
| `result.summary_info.order` | string | Yes | Sorted order |
| `result.summary_info.tld_count` | integer | Yes | Number of top-level domain zones |
| `result.summary_info.domains_count` | integer | Yes | Total number of domains |
| `result.summary_info.biggest_tld_percentage` | number | Yes | Percentage of domain zone links with the most links to the total number of links (>= 0 <= 100) |
| `result.summary_info.left_lines` | integer | Yes | Left credits of API lines for your pricing plan |

### Data Object Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tld` | string | Yes | Top-level domain (e.g., ".com", ".org") |
| `country_name` | string | Yes | Country name (empty if not available) |
| `country_code` | string | Yes | Country code (empty if not available) |
| `percentage` | number | Yes | Percentage of backlinks from this TLD |
| `domains` | integer | Yes | Number of domains from this TLD |

## Example Request

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getDistributionTLD",
  "params": {
    "query": "facebook.com",
    "lang": "en",
    "searchType": "domain_with_subdomains"
  }
}
```

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getDistributionTLD' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getDistributionTLD",
    "params": {
      "query": "facebook.com",
      "lang": "en",
      "searchType": "domain_with_subdomains"
    }
  }'
```

## Example Response

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "tld": ".com",
        "country_name": "",
        "country_code": "",
        "percentage": 59.58,
        "domains": 20154684
      },
      {
        "tld": ".org",
        "country_name": "",
        "country_code": "",
        "percentage": 4.28,
        "domains": 1448281
      },
      {
        "tld": ".de",
        "country_name": "Germany",
        "country_code": "de",
        "percentage": 3.24,
        "domains": 1097699
      },
      {
        "tld": ".uk",
        "country_name": "United Kingdom",
        "country_code": "gb",
        "percentage": 3.02,
        "domains": 1021533
      },
      {
        "tld": ".net",
        "country_name": "",
        "country_code": "",
        "percentage": 2.78,
        "domains": 942087
      },
      {
        "tld": ".fr",
        "country_name": "France",
        "country_code": "fr",
        "percentage": 1.51,
        "domains": 509945
      },
      {
        "tld": ".nl",
        "country_name": "Netherlands",
        "country_code": "nl",
        "percentage": 1.37,
        "domains": 462493
      },
      {
        "tld": ".it",
        "country_name": "Italy",
        "country_code": "it",
        "percentage": 1.33,
        "domains": 451083
      },
      {
        "tld": ".br",
        "country_name": "Brazil",
        "country_code": "br",
        "percentage": 1.22,
        "domains": 413490
      },
      {
        "tld": ".au",
        "country_name": "Australia",
        "country_code": "au",
        "percentage": 1.04,
        "domains": 352175
      }
    ],
    "summary_info": {
      "sort": "percentage",
      "order": "desc",
      "tld_count": 10,
      "domains_count": 26853470,
      "biggest_tld_percentage": 59.58,
      "left_lines": 972961
    }
  }
}
```

## Implementation Notes

1. **Credit Consumption:** This method consumes 1 API credit per request regardless of whether data is available or not.

2. **Language Support:** The `lang` parameter affects the language of the `country_name` field in the response. Supported languages are English (en), Russian (ru), Ukrainian (uk), German (de), and Swedish (se).

3. **Search Types:** 
   - `domain`: Analyzes only the main domain
   - `domain_with_subdomains`: Analyzes the main domain and all its subdomains (default)

4. **Data Structure:** The response provides detailed TLD distribution data including the percentage of backlinks from each TLD, the number of domains, and associated country information when available.

5. **Sorting:** The summary information includes sorting details, typically sorted by percentage in descending order to show the most significant TLDs first.