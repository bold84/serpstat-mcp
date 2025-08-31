# Domain Classification API - getTask

## Overview

The `DomainClassification.getTask` method allows obtaining a result of a task.

**Credits**: This method doesn't spend API Credits.

## Endpoint

- **Method**: POST
- **URL**: `https://api.serpstat.com/v4/?token=123#DomainClassification.getTask`
- **API Reference**: https://api.serpstat.com/v4/#DomainClassification.getTask

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
| `method` | string | Yes | Should be exact: `DomainClassification.getTask` |
| `params` | object | Yes | Object containing the parameters |
| `params.task_id` | string | Yes | Task identifier |

### Example Request Body

```json
{
  "id": "133",
  "method": "DomainClassification.getTask",
  "params": {
    "task_id": "833062-3dedd490-4092-4504-b24e-6bb9039e2aab"
  }
}
```

## cURL Example

```bash
curl --request POST \
  --url 'https://api.serpstat.com/v4/?token=123#DomainClassification.getTask' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "133",
    "method": "DomainClassification.getTask",
    "params": {
      "task_id": "833062-3dedd490-4092-4504-b24e-6bb9039e2aab"
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
| `result` | object | Yes | Contains the task result information |
| `result.task_id` | string | Yes | Task identifier |
| `result.data` | array[object] | Yes | Array of domain classification results |
| `result.data[].domain` | string | - | Domain name |
| `result.data[].categories_names` | array[string] | - | Array of category names for the domain |
| `result.data[].categories_confidence` | array[number] | - | Array of confidence scores for each category |
| `result.status` | integer | Yes | Task status |
| `result.created_at` | string | Yes | Task creating date in format: YYYY-MM-DD HH:MM:SS |

### Status Values
- **1**: Task status (allowed values: 1, 2, 3)
- **2**: Task status (allowed values: 1, 2, 3)
- **3**: Task status (allowed values: 1, 2, 3)

### Example Response

```json
{
  "id": "123",
  "result": {
    "task_id": "833062-0e5a4bec-824d-4e90-9138-0bc5a2303155",
    "data": [
      {
        "domain": "facebook.com",
        "categories_names": [
          "/Online Communities/Social Networks"
        ],
        "categories_confidence": [
          0.91368252038956
        ]
      },
      {
        "domain": "serpstat.com",
        "categories_names": [
          "/Internet & Telecom/Web Services/Search Engine Optimization & Marketing",
          "/Internet & Telecom/Web Services/Web Stats & Analytics",
          "/Business & Industrial/Advertising & Marketing/Marketing",
          "/Computers & Electronics/Software/Business & Productivity Software",
          "/Internet & Telecom/Other"
        ],
        "categories_confidence": [
          0.95571535825729,
          0.94931191205978,
          0.35643520951271,
          0.1866105645895,
          0.13548009097576
        ]
      }
    ],
    "status": "2",
    "created_at": "2025-01-21 16:40:12"
  }
}
```

## Usage Notes

1. **No Cost**: This method doesn't consume API credits
2. **Task Status**: 
   - Status 1: Task processing
   - Status 2: Task completed (ready to retrieve results)
   - Status 3: Task error (if any issues occurred)
3. **Data Structure**: Each domain in the response contains:
   - `domain`: The domain name
   - `categories_names`: Array of category classifications
   - `categories_confidence`: Array of confidence scores (0-1) for each category
4. **Confidence Scores**: Higher values indicate higher confidence in the classification
5. **Multiple Categories**: Domains can belong to multiple categories with different confidence levels

## Workflow

1. Use [`addTask`](add-task.md) to submit domains for classification
2. Monitor task status using this endpoint
3. Retrieve results when status is "2" (completed)
4. Process the classification data for your use case

## Related Endpoints

- [`addTask`](add-task.md) - Submit domains for classification
- [`getTaskList`](get-task-list.md) - Get a list of tasks