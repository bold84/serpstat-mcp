# Domain Classification API - addTask

## Overview

The `DomainClassification.addTask` method allows sending a list of domains to categorize. You can send up to 1K of domains per request.

**Credits**: This request charges 0.03$ from SERP Crawling wallet for each domain in request.

## Endpoint

- **Method**: POST
- **URL**: `https://api.serpstat.com/v4/?token=123#DomainClassification.addTask`
- **API Reference**: https://api.serpstat.com/v4/#DomainClassification.addTask

## Authentication

- **Security**: API Key
- **Parameter**: `token` (required)
- **Location**: Query parameter

## Request Body

### Content Type
- **Content-Type**: `application/json`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Request/response identifier, provided from your side, will be mirrored from request to response. Example: `"id":"123"` |
| `method` | string | Yes | Should be exact: `DomainClassification.addTask` |
| `params` | object | Yes | Object containing the parameters |
| `params.domains` | array[string] | Yes | An array of domain names |

### Example Request Body

```json
{
  "method": "DomainClassification.addTask",
  "id": "130",
  "params": {
    "domains": [
      "serpstat.com",
      "facebook.com"
    ]
  }
}
```

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#DomainClassification.addTask' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "method": "DomainClassification.addTask",
    "id": "130",
    "params": {
      "domains": [
        "serpstat.com",
        "facebook.com"
      ]
    }
  }'
```

## Response

### Status Code
- **200**: OK

### Response Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Request/response identifier, provided from your side, will be mirrored from request to response. Example: `"id":"123"` |
| `result` | object | Yes | Contains the task information |
| `result.task_id` | string | Yes | Task identifier |
| `result.status` | integer | Yes | Task status |
| `result.created_at` | string | Yes | Task creating date in format: YYYY-MM-DD HH:MM:SS |

### Status Values
- **1**: Task status (allowed values: 1, 2, 3)
- **2**: Task status (allowed values: 1, 2, 3)
- **3**: Task status (allowed values: 1, 2, 3)

### Example Response

```json
{
  "id": "131",
  "result": {
    "task_id": "833062-0e5a4bec-824d-4e90-9138-0bc5a2303155",
    "status": 1,
    "created_at": "2025-01-21 16:40:12"
  }
}
```

## Usage Notes

1. **Domain Limit**: Maximum 1,000 domains per request
2. **Cost**: $0.03 per domain from SERP Crawling wallet
3. **Task Management**: Use the returned `task_id` with other domain classification endpoints to check task status and retrieve results
4. **Response Time**: The task is processed asynchronously, so you'll need to check the task status to get the final classification results

## Related Endpoints

- [`getTask`](get-task.md) - Retrieve task information and status
- [`getTaskList`](get-task-list.md) - Get a list of tasks