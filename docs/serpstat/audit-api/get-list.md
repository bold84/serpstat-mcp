# getList | Serpstat Public API

**POST** https://api.serpstat.com/v4/#AuditSite.getList

This method provides you with a list of audits carried out by project id. This list can be found in the project Audit summary report.

**Credits**: This method doesn't spent API credits.

## Request

### Security: None

### Body

```json
{
  "id": "string",
  "method": "AuditSite.getList",
  "params": {
    "projectId": "integer",
    "limit": "integer",
    "offset": "integer"
  }
}
```

#### Properties

**id** [required]
The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`

**method** [required]
Should be exact AuditSite.

**params** [object]

**projectId** [required]
The unique identifier for an audit site project.

**limit** [integer]
count of returned items in response
Default: `30`

**offset** [integer]
batch number required for pagination
Default: `0`

## Responses

### 200 OK

#### Body

```json
{
  "id": "string",
  "result": [
    {
      "reportId": "integer",
      "date": "string",
      "sdo": "integer",
      "pagesLimit": "integer",
      "pagesScanned": "integer",
      "criticalCount": "integer",
      "nonCriticalCount": "integer",
      "virusesCount": "integer",
      "progress": "integer",
      "stoped": "boolean",
      "hasDetailData": "boolean"
    }
  ]
}
```

#### Properties

**id** [required]
The request identifier provided by the client. It will be echoed as field `id` in the response. Example `"id":"123"`

**result** [array[object]]

**reportId** [required]
The unique identifier for an audit report.

**date** [required]
Date of audit in format `YYYY-MM-DD HH:MM:SS`

**sdo** [required]
Serpstat Domain Optimization Score (SDO score)

**pagesLimit** [required]
scan limit, set in project settings

**pagesScanned** [required]
Total number of checked pages (charged limits)

**criticalCount** [required]
Total number of pages with critical issues

**nonCriticalCount** [required]
Total number of pages with non critical issues

**virusesCount** [required]
Total number of pages with viruses

**progress** [required]
The progress of the audit expressed as a percentage, where 100 indicates a completed audit

**stoped** [required]
stopped flag: 0 - audit ended on its own 1 - audit stopped by user

**hasDetailData** [required]

## Request Sample

### Shell / cURL

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/#AuditSite.getList' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "123",
    "method": "AuditSite.getList",
    "params": {
      "projectId": 1113915,
      "limit": 10,
      "offset": 0
    }
  }'
```

## Response Example

```json
{
  "id": "123",
  "result": [
    {
      "reportId": 10980505,
      "date": "2025-01-06 17:25:34",
      "sdo": 75,
      "pagesLimit": 1000,
      "pagesScanned": 157,
      "criticalCount": 316,
      "nonCriticalCount": 690,
      "virusesCount": 0,
      "progress": 100,
      "stoped": false,
      "hasDetailData": true
    },
    {
      "reportId": 10973646,
      "date": "2024-12-25 09:41:50",
      "sdo": 74,
      "pagesLimit": 1000,
      "pagesScanned": 163,
      "criticalCount": 335,
      "nonCriticalCount": 720,
      "virusesCount": 0,
      "progress": 100,
      "stoped": false,
      "hasDetailData": true
    },
    {
      "reportId": 10973632,
      "date": "2024-12-25 08:58:15",
      "sdo": 74,
      "pagesLimit": 1000,
      "pagesScanned": 163,
      "criticalCount": 335,
      "nonCriticalCount": 572,
      "virusesCount": 0,
      "progress": 100,
      "stoped": false,
      "hasDetailData": true
    },
    {
      "reportId": 10935615,
      "date": "2024-10-28 22:11:46",
      "sdo": 73,
      "pagesLimit": 1000,
      "pagesScanned": 163,
      "criticalCount": 335,
      "nonCriticalCount": 724,
      "virusesCount": 0,
      "progress": 100,
      "stoped": false,
      "hasDetailData": true
    },
    {
      "reportId": 10864232,
      "date": "2024-07-04 13:48:10",
      "sdo": 73,
      "pagesLimit": 1000,
      "pagesScanned": 163,
      "criticalCount": 336,
      "nonCriticalCount": 730,
      "virusesCount": 0,
      "progress": 100,
      "stoped": false,
      "hasDetailData": true
    },
    {
      "reportId": 10840180,
      "date": "2024-05-29 10:12:21",
      "sdo": 73,
      "pagesLimit": 1000,
      "pagesScanned": 163,
      "criticalCount": 336,
      "nonCriticalCount": 730,
      "virusesCount": 0,
      "progress": 100,
      "stoped": false,
      "hasDetailData": true
    },
    {
      "reportId": 10836991,
      "date": "2024-05-24 20:02:36",
      "sdo": 74,
      "pagesLimit": 1000,
      "pagesScanned": 163,
      "criticalCount": 334,
      "nonCriticalCount": 733,
      "virusesCount": 0,
      "progress": 100,
      "stoped": false,
      "hasDetailData": true
    },
    {
      "reportId": 10836930,
      "date": "2024-05-24 15:56:33",
      "sdo": 74,
      "pagesLimit": 1000,
      "pagesScanned": 163,
      "criticalCount": 334,
      "nonCriticalCount": 733,
      "virusesCount": 0,
      "progress": 100,
      "stoped": false,
      "hasDetailData": true
    },
    {
      "reportId": 10836906,
      "date": "2024-05-24 14:28:04",
      "sdo": 74,
      "pagesLimit": 1000,
      "pagesScanned": 163,
      "criticalCount": 334,
      "nonCriticalCount": 733,
      "virusesCount": 0,
      "progress": 100,
      "stoped": false,
      "hasDetailData": true
    },
    {
      "reportId": 10836904,
      "date": "2024-05-24 14:18:36",
      "sdo": 73,
      "pagesLimit": 1000,
      "pagesScanned": 163,
      "criticalCount": 336,
      "nonCriticalCount": 730,
      "virusesCount": 0,
      "progress": 100,
      "stoped": true,
      "hasDetailData": true
    }
  ]
}