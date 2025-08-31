# getDefaultSettings | Serpstat Public API

**POST** https://api.serpstat.com/v4/#AuditSite.getDefaultSettings

This method provides a list of default configuration values for a project.

**Credits**: This method doesn't spent API credits.

## Request

### Security: None

### Body

```json
{
  "id": "string",
  "method": "AuditSite.getDefaultSettings"
}
```

#### Properties

**id** [required]
The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`

**method** [required]
Should be exact `AuditSite.getDefaultSettings`

## Responses

### 200 OK

#### Body

```json
{
  "id": "string",
  "result": {
    "mainSettings": {
      "domain": "",
      "name": "",
      "subdomainsCheck": true,
      "pagesLimit": 5000,
      "scanSpeed": 3,
      "autoSpeed": true,
      "scanNoIndex": false,
      "scanWrongCanonical": true,
      "autoUserAgent": true,
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
      "keywords": ""
    },
    "baseAuthBlock": {
      "login": "",
      "password": ""
    },
    "mailTriggerSettings": {
      "emails": [],
      "interval": 7,
      "enabled": true,
      "enableExportAfterFinish": true
    },
    "scheduleSettings": {
      "scheduleRepeatOption": 3
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
```

#### Properties

**id** [required]
The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`

**result** [object]

**mainSettings** [required]
Main configuration settings

- **domain** [string]: Domain name
- **name** [string]: Project name
- **subdomainsCheck** [boolean]: Check subdomains
- **pagesLimit** [integer]: Page scan limit (default: 5000)
- **scanSpeed** [integer]: Scan speed setting
- **autoSpeed** [boolean]: Enable automatic speed adjustment
- **scanNoIndex** [boolean]: Scan noindex pages
- **scanWrongCanonical** [boolean]: Check for wrong canonical tags
- **autoUserAgent** [boolean]: Use automatic user agent
- **scanDuration** [integer]: Scan duration in hours
- **folderDepth** [integer]: Folder depth limit
- **urlDepth** [integer]: URL depth limit
- **userAgent** [integer]: User agent selection
- **robotsTxt** [boolean]: Respect robots.txt
- **withImages** [boolean]: Include images in scan

**dontScanKeywordsBlock** [required]
Settings for keywords to exclude from scanning

- **checked** [boolean]: Whether exclusion is enabled
- **keywords** [string]: Keywords to exclude

**onlyScanKeywordsBlock** [required]
Settings for keywords to include in scanning

- **checked** [boolean]: Whether inclusion is enabled
- **keywords** [string]: Keywords to include

**baseAuthBlock** [required]
Basic authentication settings

- **login** [string]: Authentication username
- **password** [string]: Authentication password

**mailTriggerSettings** [required]
Email notification settings

- **emails** [array]: List of email addresses
- **interval** [integer]: Notification interval (days)
- **enabled** [boolean]: Enable notifications
- **enableExportAfterFinish** [boolean]: Export after completion

**scheduleSettings** [required]
Scan scheduling settings

- **scheduleRepeatOption** [integer]: Schedule repeat option

**scanSetting** [required]
Scan type settings

- **type** [integer]: Scan type (1 = sitemap, etc.)
- **list** [array]: URL list for scanning

**errorsSettings** [required]
Error threshold settings

- **tiny_title** [integer]: Minimum title length
- **long_title** [integer]: Maximum title length
- **tiny_desc** [integer]: Minimum description length
- **long_desc** [integer]: Maximum description length
- **long_url** [integer]: Maximum URL length
- **large_image_size** [integer]: Large image size threshold
- **large_page_size** [integer]: Large page size threshold
- **many_external_links** [integer]: External links threshold

## Request Sample

### Shell / cURL

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/#AuditSite.getDefaultSettings' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "AuditSite.getDefaultSettings"
  }'
```

## Response Example

```json
{
  "id": "123",
  "result": {
    "mainSettings": {
      "domain": "",
      "name": "",
      "subdomainsCheck": true,
      "pagesLimit": 5000,
      "scanSpeed": 3,
      "autoSpeed": true,
      "scanNoIndex": false,
      "scanWrongCanonical": true,
      "autoUserAgent": true,
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
      "keywords": ""
    },
    "baseAuthBlock": {
      "login": "",
      "password": ""
    },
    "mailTriggerSettings": {
      "emails": [],
      "interval": 7,
      "enabled": true,
      "enableExportAfterFinish": true
    },
    "scheduleSettings": {
      "scheduleRepeatOption": 3
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