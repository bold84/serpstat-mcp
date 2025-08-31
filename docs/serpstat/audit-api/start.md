# start

**Endpoint:** `https://api.serpstat.com/v4/#AuditSite.start`  
**Method:** `POST`

## Description
Method starts the scan process for a suggested project.

## Request

### Security
- **Type:** None

### Body
```json
{
  "id": "string",
  "method": "AuditSite.start",
  "params": {
    "projectId": "integer"
  }
}
```

#### Parameters
- **id** (string, required): The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`
- **method** (string, required): Should be exact `AuditSite.start`
- **params** (object, required):
  - **projectId** (integer, required): The unique identifier for an audit site project.

## Responses

### 200 - OK
```json
{
  "id": "string",
  "result": {
    "scanId": "integer"
  }
}
```

### Response Parameters
- **id** (string): The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`
- **result** (object):
  - **scanId** (integer): The unique identifier for the scan process that has been started.

## cURL Example
```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/#AuditSite.start' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "AuditSite.start", "params": { "projectId": 1113915 } }'
```

## Response Example
```json
{
  "id": "123",
  "result": {
    "scanId": 123456
  }
}