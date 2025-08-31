# getBacklinksChangesHistory | Serpstat Backlinks API

## Overview

The `SerpstatBacklinksProcedure.getBacklinksChangesHistory` method returns the history of found and lost backlinks for the analyzed site. The data set is similar to the graphs "Linking page dynamics" and "New and lost backlinks" charts in the [Summary report](https://serpstat.com/backlinks/dashboard/).

**Credits:** 1 credit per request.

**Note:** Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

**Use case:**
- With the `SerpstatBacklinksProcedure.getBacklinksChangesHistory` method, use the history of found and lost inbound links to determine changes in the link weight of your site or your competitors' site to further shape your link building strategy.

## Endpoint Details

- **Method:** `SerpstatBacklinksProcedure.getBacklinksChangesHistory`
- **HTTP Method:** POST
- **Base URL:** `https://api.serpstat.com/v4`
- **API Path:** `/#SerpstatBacklinksProcedure.getBacklinksChangesHistory`

## Request Parameters

### Body Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `id` | string | Yes | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example "id":"123" | `"123"` |
| `method` | string | Yes | Should be exact `SerpstatBacklinksProcedure.getBacklinksChangesHistory` | `"SerpstatBacklinksProcedure.getBacklinksChangesHistory"` |
| `params` | object | Yes | Request parameters object | |
| `params.query` | string | Yes | The domain name of the analyzed site | `"serpstat.com"` |
| `params.searchType` | string | No | Search modes for analysis | `"domain_with_subdomains"` |

**Allowed values for `searchType`:**
- `domain_with_subdomains` (default)
- `domain`

## Response Schema

### Success Response (200)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Request / response identifier, provided from your side, will be mirrored from request to `id` in response. Example "id":"123" |
| `result` | object | Yes | Response result object |
| `result.data` | array[object] | Yes | Array of backlinks change history data |
| `result.summary_info` | object | Yes | Summary information |

### Data Object Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `date` | string | Yes | Date of the record |
| `lost_links` | integer | Yes | Number of lost backlinks |
| `new_links` | integer | Yes | Number of new backlinks |

### Summary Info Object Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `left_lines` | integer | Yes | Left credits of API lines for your pricing plan |
| `page` | integer | Yes | Current page number |
| `count` | integer | Yes | Number of records on current page |
| `total` | integer/null | Yes | Total number of records (null if not available) |
| `sort` | string/null | Yes | Sorted by field (null if not available) |
| `order` | string/null | Yes | Sorted order (null if not available) |

## Example Request

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getBacklinksChangesHistory",
  "params": {
    "query": "serpstat.com",
    "searchType": "domain_with_subdomains"
  }
}
```

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getBacklinksChangesHistory' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "SerpstatBacklinksProcedure.getBacklinksChangesHistory",
    "params": {
      "query": "serpstat.com",
      "searchType": "domain_with_subdomains"
    }
  }'
```

## Example Response

```json
{
  "id": "string",
  "result": {
    "data": [
      {
        "date": "string",
        "lost_links": 0,
        "new_links": 0
      }
    ],
    "summary_info": {
      "left_lines": 0,
      "page": 0,
      "count": 0,
      "total": null,
      "sort": null,
      "order": null
    }
  }
}
```

## Implementation Notes

1. **Credit Consumption:** This method consumes 1 API credit per request regardless of whether data is available or not.

2. **Data Structure:** The response provides historical data about backlink changes, including the date and the number of newly found and lost backlinks for that date.

3. **Search Types:**
   - `domain`: Analyzes only the main domain
   - `domain_with_subdomains`: Analyzes the main domain and all its subdomains (default)

4. **Pagination:** The response includes pagination information in the `summary_info` object, which may contain page numbers, record counts, and total counts when available.

5. **Sorting:** The summary information includes sorting details when sorting is applied to the results.

6. **Historical Analysis:** This method is particularly useful for tracking the evolution of backlink profiles over time, allowing users to identify trends, seasonal patterns, and the impact of link building or competitor activities.