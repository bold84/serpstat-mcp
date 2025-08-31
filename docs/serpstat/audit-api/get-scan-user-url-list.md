# getScanUserUrlList | Serpstat Public API

**POST** https://api.serpstat.com/v4/#AuditSite.getScanUserUrlList

This method returns a list of URLs audited during the scan, provided the scan type was configured for assigned URLs (imported or manually entered). It allows verification of the pages scanned by the Audit tool.

**Credits**: This method doesn't spent API credits.

## Request

### Security: None

### Body

```json
{
  "id": "string",
  "method": "AuditSite.getScanUserUrlList",
  "params": {
    "projectId": "integer"
  }
}
```

#### Properties

**id** [required]
The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`

**method** [required]
Should be exact `AuditSite.getScanUserUrlList`

**params** [object]

**projectId** [required]
The unique identifier for an audit site project.

## Responses

### 200 OK

#### Body

```json
{
  "id": "string",
  "result": {
    "urls": "array[string]",
    "scanType": "integer",
    "isImported": "boolean"
  }
}
```

#### Properties

**id** [required]
The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`

**result** [object]

**urls** [required]
Array of urls

**scanType** [required]
scan type: 2 - scan url list 3 - scan sitemap list
Allowed values: `2`, `3`

**isImported** [required]
Indicates whether the URL list was imported or entered manually

## Request Sample

### Shell / cURL

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/#AuditSite.getScanUserUrlList' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "AuditSite.getScanUserUrlList",
    "params": {
      "projectId": 1113915
    }
  }'
```

## Response Example

```json
{
  "id": "123",
  "result": {
    "urls": [
      "http://example.com/1",
      "http://example.com/2"
    ],
    "scanType": 2,
    "isImported": false
  }
}