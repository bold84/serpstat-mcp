# export | Serpstat Public API

**URL:** `https://api.serpstat.com/v4/#AuditSite.export`  
**Method:** `POST`

## Description

Export a complete site audit report in a convenient format. Use this method to download technical SEO data for offline analysis or client reporting.

**Credits:** This method doesn't spent API credits.

## Request

### Security
None

### Body

```json
{
  "id": "string",
  "method": "AuditSite.export",
  "params": {
    "reportId": "integer",
    "exportType": "string"
  }
}
```

### Parameters

#### id (string, required)
The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`

#### method (string, required)
Should be exact `AuditSite.export`

#### params (object)
##### reportId (integer, required)
The unique identifier for an audit report.

##### exportType (string, required)
Type of export file:

**Allowed values:**
- `mgxlsx`
- `mgxlsx_mfiles`
- `puppeter_pdf`

## Responses

### 200 OK

```json
{
  "id": "string",
  "result": "boolean"
}
```

#### id (string, required)
The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`

#### result (boolean, required)
Result of operation

## Request Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/#AuditSite.export' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "AuditSite.export", "params": { "reportId": 10985617, "exportType": "mgxlsx" } }'
```

## Response Example

```json
{
  "id": "123",
  "result": true
}