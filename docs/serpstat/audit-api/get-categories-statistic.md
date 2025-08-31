# getCategoriesStatistic

**POST** `https://api.serpstat.com/v4/#AuditSite.getCategoriesStatistic`

This method provides statistics grouped by issue categories, allowing you to determine the number of issues related to each specific category present on the site.

> **Credits**: This method doesn't spent API credits.

## Request

### Security
None

### Body

#### id
- **Type**: string
- **Required**: Yes
- **Description**: The request identifier provided by the client. It will be echoed as field `id` in the response. Example "id":"123"

#### method
- **Type**: string
- **Required**: Yes
- **Description**: Should be exact `AuditSite.getCategoriesStatistic`

#### params
- **Type**: object

##### reportId
- **Type**: integer
- **Required**: Yes
- **Description**: The unique identifier for an audit report.

## Responses

### 200 OK

#### Body

##### id
- **Type**: string
- **Required**: Yes
- **Description**: The request identifier provided by the client. It will be echoed as field `id` in the response. Example "id":"123"

##### result
- **Type**: array[object]

##### category
- **Type**: string
- **Description**: Issue category name
- **Allowed values**:
  - pages_status
  - meta_tags
  - headings
  - content
  - multimedia
  - indexation
  - redirects
  - links
  - https
  - hreflang
  - amp
  - markup
  - pagespeed_desktop
  - pagespeed_mobile
  - server_params

##### highCount
- **Type**: integer
- **Required**: Yes
- **Description**: Total number of high priority issues

##### mediumCount
- **Type**: integer
- **Required**: Yes
- **Description**: Total number of medium priority issues

##### lowCount
- **Type**: integer
- **Required**: Yes
- **Description**: Total number of low priority issues

##### informationCount
- **Type**: integer
- **Required**: Yes
- **Description**: Total number of information priority issues

## cURL Example

```bash
curl --request POST \
 --url 'https://api.serpstat.com/v4/#AuditSite.getCategoriesStatistic' \
 --header 'Accept: application/json' \
 --header 'Content-Type: application/json' \
 --data '{ "id": "123", "method": "AuditSite.getCategoriesStatistic", "params": { "reportId": 10973646 } }'
```

## Response Example

```json
{
  "id": "123",
  "result": [
    {
      "category": "pages_status",
      "highCount": 14,
      "mediumCount": 0,
      "lowCount": 0,
      "informationCount": 0
    },
    {
      "category": "meta_tags",
      "highCount": 152,
      "mediumCount": 165,
      "lowCount": 116,
      "informationCount": 1
    },
    {
      "category": "headings",
      "highCount": 93,
      "mediumCount": 0,
      "lowCount": 1,
      "informationCount": 0
    },
    {
      "category": "content",
      "highCount": 70,
      "mediumCount": 0,
      "lowCount": 0,
      "informationCount": 0
    },
    {
      "category": "multimedia",
      "highCount": 0,
      "mediumCount": 0,
      "lowCount": 0,
      "informationCount": 0
    },
    {
      "category": "indexation",
      "highCount": 1,
      "mediumCount": 1,
      "lowCount": 149,
      "informationCount": 0
    },
    {
      "category": "redirects",
      "highCount": 0,
      "mediumCount": 0,
      "lowCount": 0,
      "informationCount": 7
    },
    {
      "category": "links",
      "highCount": 3,
      "mediumCount": 152,
      "lowCount": 0,
      "informationCount": 8
    },
    {
      "category": "server_params",
      "highCount": 2,
      "mediumCount": 0,
      "lowCount": 0,
      "informationCount": 0
    },
    {
      "category": "https",
      "highCount": 0,
      "mediumCount": 1,
      "lowCount": 0,
      "informationCount": 0
    },
    {
      "category": "hreflang",
      "highCount": 0,
      "mediumCount": 0,
      "lowCount": 1,
      "informationCount": 145
    },
    {
      "category": "amp",
      "highCount": 0,
      "mediumCount": 0,
      "lowCount": 0,
      "informationCount": 1
    },
    {
      "category": "markup",
      "highCount": 0,
      "mediumCount": 0,
      "lowCount": 134,
      "informationCount": 296
    },
    {
      "category": "pagespeed_desktop",
      "highCount": 0,
      "mediumCount": 0,
      "lowCount": 0,
      "informationCount": 0
    },
    {
      "category": "pagespeed_mobile",
      "highCount": 0,
      "mediumCount": 0,
      "lowCount": 0,
      "informationCount": 0
    }
  ]
}