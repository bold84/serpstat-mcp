# getSettings

**Endpoint:** `https://api.serpstat.com/v4/#AuditSite.getSettings`  
**Method:** `POST`

## Description
Method returns a list of settings in a specific project.

**Credits:** This method doesn't spent API credits.

## Request

### Security
- **Type:** None

### Body
```json
{
  "id": "string",
  "method": "AuditSite.getSettings",
  "params": {
    "projectId": "integer"
  }
}
```

#### Parameters
- **id** (string, required): The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`
- **method** (string, required): Should be exact `AuditSite.getSettings`
- **params** (object, required):
  - **projectId** (integer, required): The unique identifier for an audit site project.

## Responses

### 200 - OK
```json
{
  "id": "string",
  "result": {
    "mainSettings": {
      "domain": "string",
      "name": "string",
      "subdomainsCheck": "boolean",
      "pagesLimit": "integer",
      "scanSpeed": "integer",
      "autoSpeed": "boolean",
      "scanNoIndex": "boolean",
      "scanWrongCanonical": "boolean",
      "autoUserAgent": "boolean",
      "scanDuration": "integer",
      "folderDepth": "integer",
      "urlDepth": "integer",
      "userAgent": "integer",
      "robotsTxt": "boolean",
      "withImages": "boolean"
    },
    "dontScanKeywordsBlock": {
      "checked": "boolean",
      "keywords": "string"
    },
    "onlyScanKeywordsBlock": {
      "checked": "boolean",
      "keywords": "string"
    },
    "baseAuthBlock": {
      "login": "string",
      "password": "string"
    },
    "mailTriggerSettings": {
      "emails": [
        "string"
      ],
      "interval": "integer",
      "enabled": "boolean",
      "enableExportAfterFinish": "boolean"
    },
    "scheduleSettings": {
      "scheduleRepeatOption": "integer"
    },
    "scanSetting": {
      "type": "integer",
      "list": []
    },
    "errorsSettings": {
      "tiny_title": "integer",
      "long_title": "integer",
      "tiny_desc": "integer",
      "long_desc": "integer",
      "long_url": "integer",
      "large_image_size": "integer",
      "large_page_size": "integer",
      "many_external_links": "integer"
    }
  }
}
```

### Response Parameters
- **id** (string, required): The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`
- **result** (object, required):
  - **mainSettings** (object, required):
    - **domain** (string): The domain name
    - **name** (string): The project name
    - **subdomainsCheck** (boolean): Whether to check subdomains
    - **pagesLimit** (integer): Limit for number of pages to scan
    - **scanSpeed** (integer): Scan speed setting
    - **autoSpeed** (boolean): Enable automatic speed adjustment
    - **scanNoIndex** (boolean): Scan no-index pages
    - **scanWrongCanonical** (boolean): Scan pages with wrong canonical tags
    - **autoUserAgent** (boolean): Use automatic user agent
    - **scanDuration** (integer): Scan duration in hours
    - **folderDepth** (integer): Maximum folder depth
    - **urlDepth** (integer): Maximum URL depth
    - **userAgent** (integer): User agent type
    - **robotsTxt** (boolean): Respect robots.txt
    - **withImages** (boolean): Include images in scan
  - **dontScanKeywordsBlock** (object, required): The Serpstat robot will exclude pages from crawling if the URL contains any of the specified words. This setting applies when the scan type is set to Sitemap too.
    - **checked** (boolean): Whether this block is enabled
    - **keywords** (string): Keywords to exclude from scanning
  - **onlyScanKeywordsBlock** (object, required): The Serpstat robot will crawl pages with the following words in the URL. The setting is relevant for the scan type Sitemap too
    - **checked** (boolean): Whether this block is enabled
    - **keywords** (string): Keywords to include in scanning
  - **baseAuthBlock** (object, required): If the site is restricted access, provide access for verification
    - **login** (string): Login for authentication
    - **password** (string): Password for authentication
  - **mailTriggerSettings** (object, required): Trigger mail settings
    - **emails** (array): List of email addresses for notifications
    - **interval** (integer): Email notification interval
    - **enabled** (boolean): Whether mail notifications are enabled
    - **enableExportAfterFinish** (boolean): Enable export after scan completion
  - **scheduleSettings** (object, required): Scan schedule settings
    - **scheduleRepeatOption** (integer): Schedule repeat option
  - **scanSetting** (object, required): Scan type settings
    - **type** (integer): Scan type
    - **list** (array): List of specific scan items
  - **errorsSettings** (object, required): Advanced error settings
    - **tiny_title** (integer): Maximum title length for tiny title error
    - **long_title** (integer): Maximum title length for long title error
    - **tiny_desc** (integer): Maximum description length for tiny description error
    - **long_desc** (integer): Maximum description length for long description error
    - **long_url** (integer): Maximum URL length for long URL error
    - **large_image_size** (integer): Maximum image size for large image error
    - **large_page_size** (integer): Maximum page size for large page error
    - **many_external_links** (integer): Maximum number of external links for many external links error

## cURL Example
```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/#AuditSite.getSettings' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "AuditSite.getSettings", "params": { "projectId": 1113915 } }'
```

## Response Example
```json
{
  "id": "123",
  "result": {
    "mainSettings": {
      "domain": "qatest01.serpstat.com",
      "name": "qatest01.serpstat.com",
      "subdomainsCheck": true,
      "pagesLimit": 1000,
      "scanSpeed": 1,
      "autoSpeed": false,
      "scanNoIndex": false,
      "scanWrongCanonical": false,
      "autoUserAgent": false,
      "scanDuration": 6,
      "folderDepth": 0,
      "urlDepth": 10,
      "userAgent": 0,
      "robotsTxt": true,
      "withImages": false
    },
    "dontScanKeywordsBlock": {
      "checked": false,
      "keywords": ""
    },
    "onlyScanKeywordsBlock": {
      "checked": false,
      "keywords": "redirects"
    },
    "baseAuthBlock": {
      "login": "",
      "password": ""
    },
    "mailTriggerSettings": {
      "emails": [
        "kox.netpeak@gmail.com"
      ],
      "interval": 7,
      "enabled": false,
      "enableExportAfterFinish": true
    },
    "scheduleSettings": {
      "scheduleRepeatOption": 0
    },
    "scanSetting": {
      "type": 1,
      "list": []
    },
    "errorsSettings": {
      "tiny_title": 10,
      "long_title": 70,
      "tiny_desc": 100,
      "long_desc": 160,
      "long_url": 1024,
      "large_image_size": 100,
      "large_page_size": 2,
      "many_external_links": 500
    }
  }
}