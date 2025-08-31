# setSettings

**Endpoint:** `https://api.serpstat.com/v4/#AuditSite.setSettings`  
**Method:** `POST`

## Description
Method saves settings in a suggested project.

**Credits:** This method doesn't spent API credits.

## Request

### Security
- **Type:** None

### Body
```json
{
  "id": "string",
  "method": "AuditSite.setSettings",
  "params": {
    "projectId": "integer",
    "mainSettings": {
      "domain": "string",
      "name": "string",
      "subdomainsCheck": "boolean",
      "pagesLimit": "integer",
      "scanSpeed": "integer",
      "autoSpeed": "boolean",
      "autoUserAgent": "boolean",
      "scanNoIndex": "boolean",
      "scanWrongCanonical": "boolean",
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
      "emails": [],
      "interval": "integer",
      "enabled": "boolean"
    },
    "scheduleSettings": {
      "scheduleRepeatOption": "integer"
    },
    "scanSetting": {
      "type": "integer",
      "list": [],
      "importedFilename": "string"
    }
  }
}
```

#### Parameters
- **id** (string, required): The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`
- **method** (string, required): Should be exact `AuditSite.setSettings`
- **params** (object, required):
  - **projectId** (integer, required): The unique identifier for an audit site project.
  - **mainSettings** (object, required):
    - **domain** (string): The domain name
    - **name** (string): The project name
    - **subdomainsCheck** (boolean): Whether to check subdomains
    - **pagesLimit** (integer): Limit for number of pages to scan
    - **scanSpeed** (integer): Scan speed setting
    - **autoSpeed** (boolean): Enable automatic speed adjustment
    - **autoUserAgent** (boolean): Use automatic user agent
    - **scanNoIndex** (boolean): Scan no-index pages
    - **scanWrongCanonical** (boolean): Scan pages with wrong canonical tags
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
  - **scheduleSettings** (object, required): Scan schedule settings
    - **scheduleRepeatOption** (integer): Schedule repeat option
  - **scanSetting** (object, required): Scan type settings
    - **type** (integer): Scan type
    - **list** (array): List of specific scan items
    - **importedFilename** (string): Filename for imported settings

## Responses

### 200 - OK
```json
{
  "id": "string",
  "result": null
}
```

### Response Parameters
- **id** (string): The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`
- **result** (null): The result is always null when settings are successfully saved

## cURL Example
```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/#AuditSite.setSettings' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "AuditSite.setSettings", "params": { "projectId": 1113915, "mainSettings": { "domain": "qatest01.serpstat.com", "name": "test qatest01.serpstat.com", "subdomainsCheck": true, "pagesLimit": 5321, "scanSpeed": 1, "autoSpeed": true, "autoUserAgent": true, "scanNoIndex": false, "scanWrongCanonical": true, "scanDuration": 0, "folderDepth": 0, "urlDepth": 0, "userAgent": 0, "robotsTxt": true, "withImages": true }, "dontScanKeywordsBlock": { "checked": true, "keywords": "text1" }, "onlyScanKeywordsBlock": { "checked": true, "keywords": "text2" }, "baseAuthBlock": { "login": "222", "password": "444" }, "mailTriggerSettings": { "emails": [], "interval": 1, "enabled": false }, "scheduleSettings": { "scheduleRepeatOption": 3 }, "scanSetting": { "type": 2, "list": [], "importedFilename": "xxx.xxx" } } }'
```

## Response Example
```json
{
  "id": "123",
  "result": null
}