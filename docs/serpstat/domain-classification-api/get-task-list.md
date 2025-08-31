# Domain Classification API - getTaskList

## Overview

The `DomainClassification.getTaskList` method retrieves a list of tasks along with their statuses.

**Credits**: This method doesn't spend API Credits.

## Endpoint

- **Method**: POST
- **URL**: `https://api.serpstat.com/v4/?token=123#DomainClassification.getTaskList`
- **API Reference**: https://api.serpstat.com/v4/#DomainClassification.getTaskList

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
| `method` | string | Yes | Should be exact: `DomainClassification.getTaskList` |
| `params` | object | Yes | Object containing the parameters |
| `params.page` | integer | Yes | Page number in response |
| `params.size` | integer | Yes | Number of results per page in response |

### Example Request Body

```json
{
  "id": "135",
  "method": "DomainClassification.getTaskList",
  "params": {
    "page": 1,
    "size": 20
  }
}
```

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#DomainClassification.getTaskList' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "135",
    "method": "DomainClassification.getTaskList",
    "params": {
      "page": 1,
      "size": 20
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
| `result` | object | Yes | Contains the task list information |
| `result.data` | array[object] | Yes | Array of task information |
| `result.data[].task_id` | string | - | Task identifier |
| `result.data[].status` | string | - | Task status |
| `result.data[].created_at` | string | - | Task creating date in format: YYYY-MM-DD HH:MM:SS |
| `result.summary_info` | object | Yes | Pagination and summary information |
| `result.summary_info.page` | integer | - | Current page number |
| `result.summary_info.page_total` | integer | - | Total number of pages |
| `result.summary_info.count` | integer | - | Number of results per page |
| `result.summary_info.total` | integer | - | Total number of tasks |

### Example Response

```json
{
  "id": "134",
  "result": {
    "data": [
      {
        "task_id": "833062-0e5a4bec-824d-4e90-9138-0bc5a2303155",
        "status": "2",
        "created_at": "2025-01-21 16:40:12"
      }
    ],
    "summary_info": {
      "page": 1,
      "page_total": 1,
      "count": 20,
      "total": 1
    }
  }
}
```

## Usage Notes

1. **No Cost**: This method doesn't consume API credits
2. **Pagination**: 
   - `page`: Current page number (starts from 1)
   - `size`: Number of results per page (default: 20)
   - `page_total`: Total number of pages available
   - `total`: Total number of tasks across all pages
3. **Task Information**: Each task in the response contains:
   - `task_id`: Unique identifier for the task
   - `status`: Current status of the task
   - `created_at`: When the task was created
4. **Status Values**: 
   - "1": Task processing
   - "2": Task completed (ready to retrieve results)
   - "3": Task error (if any issues occurred)

## Workflow

1. Use [`addTask`](add-task.md) to submit domains for classification
2. Monitor task status using [`getTask`](get-task.md) for specific tasks
3. Use this endpoint to get an overview of all your tasks
4. Check `summary_info` to understand pagination and total task count
5. Use the `task_id` values to retrieve detailed results for completed tasks

## Related Endpoints

- [`addTask`](add-task.md) - Submit domains for classification
- [`getTask`](get-task.md) - Get detailed information for a specific task