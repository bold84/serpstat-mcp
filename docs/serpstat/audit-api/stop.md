# stop

**Endpoint:** `https://api.serpstat.com/v4/#AuditSite.stop`  
**Method:** `POST`

## Description
This method stops an active audit session and returns the operation result.

**Credits:** This method doesn't spent API credits.

## Request

### Security
- **Type:** None

### Body
```json
{
  "id": "string",
  "method": "AuditSite.stop",
  "params": {
    "projectId": "integer"
  }
}
```

#### Parameters
- **id** (string, required): The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`
- **method** (string, required): Should be exact `AuditSite.stop`
- **params** (object, required):
  - **projectId** (integer, required): The unique identifier for an audit site project.

## Responses

### 200 - OK
```json
{
  "id": "string",
  "result": "boolean"
}
```

### Response Parameters
- **id** (string): The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`
- **result** (boolean): Result of operation

## cURL Example
```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/#AuditSite.stop' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "AuditSite.stop", "params": { "projectId": 1113915 } }'
```

## Response Example
```json
{
  "id": "123",
  "result": true
}