# getBasicInfo

**POST** `https://api.serpstat.com/v4/#AuditSite.getBasicInfo`

Get essential summary information from the latest site audit for a project, including the Serpstat Domain Optimization Score (SDO), total error count, and the last scan date. See `AuditSite.getReportWithoutDetails` to get report categorized by issue type.

### Credits
This method doesn't spent API credits.

## Request

### Security
None

### Body

| Name | Type | Required | Description |
|------|------|---------|-------------|
| id | string | required | The request identifier provided by the client. It will be echoed as field `id` in the response. Example "id":"123" |
| method | string | required | Should be exact `AuditSite.getBasicInfo` |
| params | object |  |  |
| └─ reportId | integer | required | The unique identifier for an audit report. |

### Request Body
```json
{
  "id": "123",
  "method": "AuditSite.getBasicInfo",
  "params": {
    "reportId": 10973646
  }
}
```

### Request Sample (Shell/cURL)
```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/#AuditSite.getBasicInfo' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{ "id": "123", "method": "AuditSite.getBasicInfo", "params": { "reportId": 10973646 } }'
```

## Responses

### 200 OK

| Name | Type | Required | Description |
|------|------|---------|-------------|
| id | string | required | The request identifier provided by the client. It will be echoed as field `id` in the response. Example "id":"123" |
| result | object |  |  |
| └─ reportId | integer | required | The unique identifier for an audit report. |
| └─ date | string | required | Date of audit in format `YYYY-MM-DD HH:MM:SS` |
| └─ sdo | integer | required | Serpstat Domain Optimization Score (SDO score) |
| └─ highCount | integer | required | Total number of high priority issues |
| └─ mediumCount | integer | required | Total number of medium priority issues |
| └─ lowCount | integer | required | Total number of low priority issues |
| └─ informationCount | integer | required | Total number of information priority issues |
| └─ virusesCount | integer | required | Total number of pages with viruses |
| └─ progress | integer | required | The progress of the audit expressed as a percentage, where 100 indicates a completed audit |
| └─ stoped | integer | required | stopped flag: 0 - audit ended on its own 1 - audit stopped by user. Allowed values: `0`, `1` |
| └─ specialStopReason | integer | required | Audit stopping code |
| └─ checkedPageCount | integer | required | Total number of scanned pages |
| └─ totalCheckedPageCount | integer | required | The total count of scanned URLs, including pages, redirects and images |
| └─ redirectCount | integer | required | Total number of pages where redirect was found |
| └─ captchaDetected | boolean | required | Indicates the occurrence of a captcha during parsing |
| └─ hasDetailData | boolean | required |  |

### Response Example
```json
{
  "id": "123",
  "result": {
    "reportId": 10973646,
    "date": "2024-12-25 09:41:50",
    "sdo": 74,
    "highCount": 335,
    "mediumCount": 319,
    "lowCount": 401,
    "informationCount": 458,
    "virusesCount": 0,
    "progress": 100,
    "stoped": 0,
    "specialStopReason": 0,
    "checkedPageCount": 163,
    "totalCheckedPageCount": 170,
    "redirectCount": 0,
    "captchaDetected": false,
    "hasDetailData": true
  }
}