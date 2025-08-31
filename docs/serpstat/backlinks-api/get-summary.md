# getSummary

## Overview

The `SerpstatBacklinksProcedure.getSummary` method gives you general information about link profile: number of external links, referring IP addresses and subnets, number of referring domains and subdomains, domain authority indicator and types of referring links. The data set is similar to the Overview report.

**Important:** This method is deprecated.

**Credits:** 5 API credits are spent per 1 request

**Note:** Starting June 15, 2025, this method will consume 1 API credit even when no data is available for the requested query. Previously, no credits were consumed for empty results.

### Use case:

- You want to understand what links your competitors have.
- Use `SerpstatBacklinksProcedure.getSummary` to get information about the number of inbound links and referring domains;
- Determine which sites are linking to your competitors to identify potential link opportunities for your client.

## Parameters

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Request / response identifier, prodvided from your side, will be mirrored from request to `id` in response. Example `"id":"123"` |
| method | string | Yes | Should be exact `SerpstatBacklinksProcedure.getSummary` |
| params | object | Yes | |
| &nbsp;&nbsp;├─ query | string | Yes | The domain name of the analyzed site |
| &nbsp;&nbsp;└─ searchType | string | No | Search modes for analysis<br>**Allowed values:** `domain`, `domain_with_subdomains`<br>**Default:** `domain_with_subdomains` |

## Request Example

```json
{
  "id": "123",
  "method": "SerpstatBacklinksProcedure.getSummary",
  "params": {
    "query": "serpstat.com",
    "searchType": "domain"
  }
}
```

## Response Example

```json
{
  "id": "123",
  "result": {
    "data": {
      "referringDomains": 5842,
      "referringSubDomains": 0,
      "referringLinks": 376199,
      "totalIndexed": 0,
      "externalDomains": 3540,
      "noFollowLinks": 240579,
      "doFollowLinks": 135620,
      "referringIps": 4510,
      "referringSubnets": 2854,
      "trustRank": 0,
      "citationRank": 0,
      "domainZoneEdu": 0,
      "domainZoneGov": 0,
      "outlinksTotal": 89260,
      "outlinksUnique": 0,
      "facebookLinks": 0,
      "pinterestLinks": 0,
      "linkedinLinks": 0,
      "vkLinks": 0,
      "typeText": 81760,
      "typeImg": 294217,
      "typeRedirect": 203,
      "typeAlt": 0,
      "referringDomainsDynamics": -8,
      "referringSubDomainsDynamics": 0,
      "referringLinksDynamics": -2658,
      "totalIndexedDynamics": 0,
      "externalDomainsDynamics": 0,
      "noFollowLinksDynamics": -56,
      "doFollowLinksDynamics": -2602,
      "referringIpsDynamics": -11,
      "referringSubnetsDynamics": -6,
      "trustRankDynamics": 0,
      "citationRankDynamics": 0,
      "domainZoneEduDynamics": 0,
      "domainZoneGovDynamics": 0,
      "outlinksTotalDynamics": 0,
      "outlinksUniqueDynamics": 0,
      "facebookLinksDynamics": 0,
      "pinterestLinksDynamics": 0,
      "linkedinLinksDynamics": 0,
      "vkLinksDynamics": 0,
      "typeTextDynamics": -2649,
      "typeImgDynamics": -5,
      "typeRedirectDynamics": -4,
      "typeAltDynamics": 0,
      "threats": 1,
      "threatsDynamics": 1,
      "mainPageLinks": 265,
      "mainPageLinksDynamics": -1,
      "domainRank": 60
    },
    "summary_info": {
      "left_lines": 971486,
      "page": 1,
      "count": null,
      "total": null,
      "sort": null,
      "order": null
    }
  }
}
```

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#SerpstatBacklinksProcedure.getSummary' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "SerpstatBacklinksProcedure.getSummary", "params": { "query": "serpstat.com", "searchType": "domain" } }'
```

## Credit Consumption

- **Current:** 5 API credits per request
- **Starting June 15, 2025:** 1 API credit per request (even when no data is available)

## Response Schema

### Result Object

| Field | Type | Description |
|-------|------|-------------|
| id | string | Request / response identifier provided from your side |
| result | object | Contains the API response data |

### Data Object

| Field | Type | Description |
|-------|------|-------------|
| referringDomains | integer | Number of referring domains |
| referringSubDomains | integer | Number of referring subdomains |
| referringLinks | integer | Total number of referring links |
| totalIndexed | integer | Number of indexed links |
| externalDomains | integer | Number of external domains |
| noFollowLinks | integer | Number of nofollow links |
| doFollowLinks | integer | Number of dofollow links |
| referringIps | integer | Number of unique referring IP addresses |
| referringSubnets | integer | Number of unique referring subnets |
| trustRank | integer | Trust rank score |
| citationRank | integer | Citation rank score |
| domainZoneEdu | integer | Number of links from .edu domains |
| domainZoneGov | integer | Number of links from .gov domains |
| outlinksTotal | integer | Total number of outbound links |
| outlinksUnique | integer | Number of unique outbound links |
| facebookLinks | integer | Number of Facebook links |
| pinterestLinks | integer | Number of Pinterest links |
| linkedinLinks | integer | Number of LinkedIn links |
| vkLinks | integer | Number of VK links |
| typeText | integer | Number of text links |
| typeImg | integer | Number of image links |
| typeRedirect | integer | Number of redirect links |
| typeAlt | integer | Number of links with alt text |
| referringDomainsDynamics | integer | Change in referring domains (negative = decrease) |
| referringSubDomainsDynamics | integer | Change in referring subdomains |
| referringLinksDynamics | integer | Change in referring links |
| totalIndexedDynamics | integer | Change in indexed links |
| externalDomainsDynamics | integer | Change in external domains |
| noFollowLinksDynamics | integer | Change in nofollow links |
| doFollowLinksDynamics | integer | Change in dofollow links |
| referringIpsDynamics | integer | Change in referring IP addresses |
| referringSubnetsDynamics | integer | Change in referring subnets |
| trustRankDynamics | integer | Change in trust rank |
| citationRankDynamics | integer | Change in citation rank |
| domainZoneEduDynamics | integer | Change in .edu domain links |
| domainZoneGovDynamics | integer | Change in .gov domain links |
| outlinksTotalDynamics | integer | Change in total outbound links |
| outlinksUniqueDynamics | integer | Change in unique outbound links |
| facebookLinksDynamics | integer | Change in Facebook links |
| pinterestLinksDynamics | integer | Change in Pinterest links |
| linkedinLinksDynamics | integer | Change in LinkedIn links |
| vkLinksDynamics | integer | Change in VK links |
| typeTextDynamics | integer | Change in text links |
| typeImgDynamics | integer | Change in image links |
| typeRedirectDynamics | integer | Change in redirect links |
| typeAltDynamics | integer | Change in links with alt text |
| threats | integer | Number of threats detected |
| threatsDynamics | integer | Change in threats |
| mainPageLinks | integer | Number of links to main page |
| mainPageLinksDynamics | integer | Change in main page links |
| domainRank | integer | Domain rank score |

### Summary Info Object

| Field | Type | Description |
|-------|------|-------------|
| left_lines | integer | Number of remaining lines/pages |
| page | integer | Current page number |
| count | integer/null | Number of items on current page |
| total | integer/null | Total number of items |
| sort | string/null | Sorting parameter |
| order | string/null | Sort order (asc/desc) |