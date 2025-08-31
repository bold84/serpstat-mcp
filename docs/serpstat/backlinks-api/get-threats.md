# getThreats

## Overview

The `SerpstatBacklinksProcedure.getThreats` method returns a list of malicious domains referring to the analyzed domain and information on them. The data set is similar to the Malicious sites report.

### Credits
This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

### Note
Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

### Use case
With the `SerpstatBacklinksProcedure.getThreats` method, find out what malicious websites are referring to your site and remove these backlinks.

## API Reference

### HTTP Request

**POST** `https://api.serpstat.com/v4/#SerpstatBacklinksProcedure.getThreats`

### Request Parameters

The endpoint requires a JSON POST request with the following parameters:

#### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | ✓ | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| method | string | ✓ | Should be exact `SerpstatBacklinksProcedure.getThreats` |
| params | object | ✓ | Request parameters object |

#### Parameters Object

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | ✓ | The domain name of the analyzed site |
| searchType | string | ✓ | Search modes for analysis |
| sort | string | | Sorting by field |
| order | string | | Sorting order |
| complexFilter | array[array] | | Data filtering using complex conditions. The first-level array represents "OR" conditions, and nested arrays represent "AND" conditions. |
| page | integer | | A page number (number value) |
| size | integer | | A number of results (number value) |
| linkPerDomain | integer | | |

#### Allowed Values

**searchType**:
- `domain`
- `domain_with_subdomains` (Default)

**sort**:
- `lastupdate`
- `domain_link`
- `links_count`
- `platform_type`
- `threat_type`

**order**:
- `asc`
- `desc`

**Constraints**:
- `page` >= 1 (Default: 1)
- `size` >= 1 and <= 1000 (Default: 100)

### Response Structure

```json
{
  "id": "string",
  "result": {
    "data": [
      {
        "domain": "string",
        "domain_link": "string",
        "links_count": "integer",
        "platform_type": ["string"],
        "threat_type": ["string"],
        "lastupdate": "string"
      }
    ],
    "summary_info": {
      "left_lines": "integer",
      "page": "integer",
      "count": "integer",
      "total": "integer",
      "sort": "string",
      "order": "string"
    }
  }
}
```

### Response Fields

#### Root Level
| Field | Type | Description |
|-------|------|-------------|
| id | string | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |

#### Result Object
| Field | Type | Description |
|-------|------|-------------|
| data | array[object] | Array of threat data objects |
| summary_info | object | Pagination and summary information |

#### Data Object
| Field | Type | Description |
|-------|------|-------------|
| domain | string | The malicious domain name |
| domain_link | string | The URL of the malicious domain |
| links_count | integer | Number of links from this domain |
| platform_type | array[string] | Platform types affected (windows, linux, osx, etc.) |
| threat_type | array[string] | Types of threats detected |
| lastupdate | string | Last update date of the threat information |

#### Summary Info Object
| Field | Type | Description |
|-------|------|-------------|
| left_lines | integer | Estimated remaining results count |
| page | integer | Current page number |
| count | integer | Number of items on current page |
| total | integer | Total number of results |
| sort | string | Current sorting field |
| order | string | Current sorting order (ASC/DESC) |

## Example Requests

### Basic Request
```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getThreats",
  "params": {
    "query": "kinopoisk.ru",
    "searchType": "domain",
    "sort": "lastupdate",
    "order": "desc",
    "page": 1,
    "size": 2,
    "linkPerDomain": 1
  }
}
```

### Request with Complex Filters
```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getThreats",
  "params": {
    "query": "kinopoisk.ru",
    "searchType": "domain",
    "sort": "lastupdate",
    "order": "desc",
    "page": 1,
    "size": 2,
    "linkPerDomain": 1,
    "complexFilter": [
      [
        {
          "field": "domain_link",
          "compareType": "contains",
          "value": [".com"]
        },
        {
          "field": "links_count",
          "compareType": "gte",
          "value": [1]
        },
        {
          "field": "platform_type",
          "compareType": "contains",
          "value": ["1"]
        }
      ]
    ]
  }
}
```

## Example Response

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "domain": "drweb.com",
        "domain_link": "https://www.drweb.com",
        "links_count": 3,
        "platform_type": ["windows", "linux", "osx"],
        "threat_type": ["threat_type_unspecified"],
        "lastupdate": "2025-01-23"
      },
      {
        "domain": "podcasts.apple.com",
        "domain_link": "https://podcasts.apple.com",
        "links_count": 10,
        "platform_type": ["osx", "windows", "linux"],
        "threat_type": ["threat_type_unspecified"],
        "lastupdate": "2025-01-23"
      }
    ],
    "summary_info": {
      "left_lines": 972756,
      "page": 1,
      "count": 2,
      "total": 2,
      "sort": "check",
      "order": "DESC"
    }
  }
}
```

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getThreats' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getThreats",
    "params": {
      "query": "kinopoisk.ru",
      "searchType": "domain",
      "sort": "lastupdate",
      "order": "desc",
      "page": 1,
      "size": 2,
      "linkPerDomain": 1,
      "complexFilter": [
        [
          {
            "field": "domain_link",
            "compareType": "contains",
            "value": [".com"]
          },
          {
            "field": "links_count",
            "compareType": "gte",
            "value": [1]
          },
          {
            "field": "platform_type",
            "compareType": "contains",
            "value": ["1"]
          }
        ]
      ]
    }
  }'
```

## Implementation Notes

1. **Credit Consumption**: Be aware that this method charges 1 API credit per result returned, starting June 15, 2025.
2. **Empty Results**: Even when no data is available, 1 API credit will be consumed after the policy change.
3. **Malicious Domains**: Use this method to identify potentially harmful backlinks that should be removed for SEO and security reasons.
4. **Platform Types**: The `platform_type` field indicates which operating systems or platforms are affected by threats from each domain.
5. **Sorting**: Use the `sort` and `order` parameters to organize results by relevance, recency, or other criteria.