# getReportWithoutDetails

**POST** `https://api.serpstat.com/v4/#AuditSite.getReportWithoutDetails`

This method returns the number of errors/issues, categorized by issue type, found in a specific report. It compares the results with the report identified by compareReportId, if applicable.

### Credits
This method doesn't spent API credits.

## Request

### Security
None

### Body

| Name | Type | Required | Description |
|------|------|---------|-------------|
| id | string | required | The request identifier provided by the client. It will be echoed as field `id` in the response. Example "id":"123" |
| method | string | required | Should be exact `AuditSite.getReportWithoutDetails` |
| params | object |  |  |
| └─ reportId | integer | required | The unique identifier for an audit report. |
| └─ compareReportId | integer |  | Another unique identifier for an audit report from the same project to compare |

### Request Body
```json
{
  "id": "123",
  "method": "AuditSite.getReportWithoutDetails",
  "params": {
    "reportId": 10980505,
    "compareReportId": 10973646
  }
}
```

### Request Sample (Shell/cURL)
```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/#AuditSite.getReportWithoutDetails' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "AuditSite.getReportWithoutDetails", "params": { "reportId": 10980505, "compareReportId": 10973646 } }'
```

## Responses

### 200 OK

| Name | Type | Required | Description |
|------|------|---------|-------------|
| id | string | required | The request identifier provided by the client. It will be echoed as field `id` in the response. Example "id":"123" |
| result | object |  |  |
| └─ categories | array[object] |  |  |

### Response Example
Large examples are not rendered by default.