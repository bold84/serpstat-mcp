# getOutThreats

## Overview

The `SerpstatBacklinksProcedure.getOutThreats` method returns a list of malicious domains referring to the analyzed domain and information on them. The data set is similar to the Malicious sites report.

### Credits
This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

### Note
Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

### Use case
With the `SerpstatBacklinksProcedure.getOutThreats` method, check which resources have malicious links from the target site to make sure that your site is not among them.

## API Reference

### HTTP Request

**POST** `https://api.serpstat.com/v4/#SerpstatBacklinksProcedure.getOutThreats`

### Request Parameters

The endpoint requires a JSON POST request with the following parameters:

#### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | ✓ | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| method | string | ✓ | Should be exact `SerpstatBacklinksProcedure.getOutThreats` |
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
  "method": "SerpstatBacklinksProcedure.getOutThreats",
  "params": {
    "query": "drweb.com",
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
  "method": "SerpstatBacklinksProcedure.getOutThreats",
  "params": {
    "query": "drweb.com",
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
          "value": [".ru"]
        },
        {
          "field": "links_count",
          "compareType": "gte",
          "value": [1]
        },
        {
          "field": "platform_type",
          "compareType": "contains",
          "value": [1]
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
        "domain": "1c-interes.ru",
        "domain_link": "http://www.1c-interes.ru",
        "links_count": 8,
        "platform_type": ["windows", "linux", "osx"],
        "threat_type": ["threat_type_unspecified"],
        "lastupdate": "2025-01-23"
      },
      {
        "domain": "3dnews.ru",
        "domain_link": "http://www.3dnews.ru",
        "links_count": 5,
        "platform_type": ["windows", "linux", "osx"],
        "threat_type": ["threat_type_unspecified"],
        "lastupdate": "2025-01-23"
      }
    ],
    "summary_info": {
      "left_lines": 971544,
      "page": 1,
      "count": 2,
      "total": 222,
      "sort": "check",
      "order": "desc"
    }
  }
}
```

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getOutThreats' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getOutThreats",
    "params": {
      "query": "drweb.com",
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
            "value": [".ru"]
          },
          {
            "field": "links_count",
            "compareType": "gte",
            "value": [1]
          },
          {
            "field": "platform_type",
            "compareType": "contains",
            "value": [1]
          }
        ]
      ]
    }
  }'
```

## Implementation Notes

1. **Credit Consumption**: Be aware that this method charges 1 API credit per result returned, starting June 15, 2025.
2. **Empty Results**: Even when no data is available, 1 API credit will be consumed after the policy change.
3. **Outgoing Threats**: This method helps identify if your site is linking to malicious domains, which can harm your SEO and security reputation.
4. **Platform Types**: The `platform_type` field indicates which operating systems or platforms are affected by threats from each domain.
5. **Sorting**: Use the `sort` and `order` parameters to organize results by relevance, recency, or other criteria.
6. **Risk Assessment**: Use this method to perform regular security audits of your outbound links and ensure you're not associating with malicious sites.
7. **Monitoring**: Regular monitoring with this endpoint can help maintain your site's security posture and SEO quality.