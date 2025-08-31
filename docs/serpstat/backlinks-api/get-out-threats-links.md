# getOutThreatsLinks | Serpstat Backlinks API

## Overview

The `SerpstatBacklinksProcedure.getOutThreatsLinks` method returns a list of links from malicious sites referring to the analyzed domain. The data set is similar to the Malicious sites report.

**Credits:** This method charges 1 API credit per result returned. The total credits consumed equals the number of items in the `data` section of the response.

**Note:** Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

**Use case:** With the `SerpstatBacklinksProcedure.getOutThreatsLinks` method, check which pages have malicious links from the target site to make sure that your site is not among them.

## Request

**Method:** `POST`  
**URL:** `https://api.serpstat.com/v4`  
**Endpoint:** `/#SerpstatBacklinksProcedure.getOutThreatsLinks`

### Authentication

API Key authentication required.

### Request Body

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getOutThreatsLinks",
  "params": {
    "query": "drweb.com",
    "searchType": "domain",
    "sort": "url_from",
    "order": "desc",
    "page": 1,
    "size": 2,
    "linkPerDomain": 1,
    "complexFilter": [
      [
        {
          "field": "platform_type",
          "compareType": "contains",
          "value": ["1"]
        },
        {
          "field": "url_from",
          "compareType": "contains",
          "value": [".com"]
        },
        {
          "field": "url_to",
          "compareType": "contains",
          "value": [".ru"]
        },
        {
          "field": "threat_type",
          "compareType": "contains",
          "value": [9]
        }
      ]
    ]
  }
}
```

### Parameters

#### Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string | The domain name of the analyzed site |
| `searchType` | string | Search modes for analysis |

#### Search Mode Options

| Value | Description |
|-------|-------------|
| `domain` | Domain analysis |
| `domain_with_subdomains` | Domain with subdomains analysis |

**Default:** `domain_with_subdomains`

#### Optional Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sort` | string | `lastupdate` | Sorting by field |
| `order` | string | `desc` | Sorting order |
| `page` | integer | `1` | A page number (number value), >= 1 |
| `size` | integer | `100` | A number of results (number value), >= 1, <= 1000 |
| `linkPerDomain` | integer | - | - |

#### Sort Options

| Value | Description |
|-------|-------------|
| `lastupdate` | Last update time |
| `url_from` | Source URL |
| `url_to` | Target URL |
| `platform_type` | Platform type |
| `threat_type` | Threat type |

#### Order Options

| Value | Description |
|-------|-------------|
| `asc` | Ascending order |
| `desc` | Descending order |

#### complexFilter

Data filtering using complex conditions. The first-level array represents "OR" conditions, and nested arrays represent "AND" conditions.

### cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getOutThreatsLinks' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getOutThreatsLinks",
    "params": {
      "query": "drweb.com",
      "searchType": "domain",
      "sort": "url_from",
      "order": "desc",
      "page": 1,
      "size": 2,
      "linkPerDomain": 1,
      "complexFilter": [
        [
          {
            "field": "platform_type",
            "compareType": "contains",
            "value": ["1"]
          },
          {
            "field": "url_from",
            "compareType": "contains",
            "value": [".com"]
          },
          {
            "field": "url_to",
            "compareType": "contains",
            "value": [".ru"]
          },
          {
            "field": "threat_type",
            "compareType": "contains",
            "value": [9]
          }
        ]
      ]
    }
  }'
```

## Response

### Response Structure

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "domain": "drweb.ru",
        "link_from": "https://www.drweb.com/xperf/user/ drweb/conditions/?lng=en",
        "link_to": "https://www.drweb.ru/user/me_plus_drweb/conditions/",
        "platform_type": ["windows", "linux", "osx"],
        "threat_type": ["threat_type_unspecified"],
        "lastupdate": "2025-02-05"
      }
    ],
    "summary_info": {
      "left_lines": 971511,
      "page": 1,
      "count": 2,
      "total": 2717,
      "sort": "url_from",
      "order": "DESC"
    }
  }
}
```

### Response Fields

#### `data` Array

Each object in the `data` array contains the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `domain` | string | Target domain name |
| `link_from` | string | Source URL of the link |
| `link_to` | string | Target URL of the link |
| `platform_type` | array[string] | Platform types (e.g., windows, linux, osx) |
| `threat_type` | array[string] | Threat types (e.g., threat_type_unspecified) |
| `lastupdate` | string | Last update date in YYYY-MM-DD format |

#### `summary_info` Object

| Field | Type | Description |
|-------|------|-------------|
| `left_lines` | integer | Left credits of lines for your pricing plan |
| `page` | integer | Current page number |
| `count` | integer | Number of results in this page |
| `total` | integer | Total number of results for the request |
| `sort` | string | Field used for sorting |
| `order` | string | Sorting order (asc or desc) |

### Response Example

```json
{
  "id": "123",
  "result": {
    "data": [
      {
        "domain": "drweb.ru",
        "link_from": "https://www.drweb.com/xperf/user/ drweb/conditions/?lng=en",
        "link_to": "https://www.drweb.ru/user/me_plus_drweb/conditions/",
        "platform_type": ["windows", "linux", "osx"],
        "threat_type": ["threat_type_unspecified"],
        "lastupdate": "2025-02-05"
      },
      {
        "domain": "drweb.ru",
        "link_from": "https://www.drweb.com/vxcube?lng=en",
        "link_to": "https://www.drweb.ru/enterprise_security_suite/",
        "platform_type": ["windows", "linux", "osx"],
        "threat_type": ["threat_type_unspecified"],
        "lastupdate": "2025-02-05"
      }
    ],
    "summary_info": {
      "left_lines": 971511,
      "page": 1,
      "count": 2,
      "total": 2717,
      "sort": "url_from",
      "order": "DESC"
    }
  }
}
```

## Best Practices

1. **Credit Management**: Be aware that this method charges 1 API credit per result returned, plus credits for any filtered results.

2. **Filtering**: Use the `complexFilter` parameter to narrow down results and reduce credit consumption.

3. **Pagination**: Use the `page` and `size` parameters to handle large datasets efficiently.

4. **Sorting**: Choose appropriate sort fields based on your analysis needs.

5. **Security Monitoring**: Regularly check for outbound threats to maintain your site's security reputation.