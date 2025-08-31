# ID Schema | Serpstat Project Management API

Schema and validation rules for the `id` parameter used in Project Management API methods.

## ID Parameter Overview

The `id` parameter is a required field in all Serpstat API requests. It serves as a unique identifier for the API call and is returned in the response for correlation.

## Schema Definition

### ID Parameter Structure

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | string/int | Yes | Unique request identifier | `1` or `"test_request_123"` |

### Data Type Validation

#### Integer IDs
- **Format**: Numeric values
- **Range**: Any valid integer (positive, negative, or zero)
- **Use Case**: Simple sequential numbering
- **Example**: `1`, `42`, `1000`, `-1`

#### String IDs  
- **Format**: Alphanumeric values with special characters allowed
- **Length**: Typically 1-255 characters (check API limits)
- **Use Case**: Descriptive identifiers for tracking and debugging
- **Example**: `"create_project_2023"`, `"batch_delete_001"`, `"test_request"`

## Implementation Examples

### JavaScript/TypeScript

```javascript
// Integer ID
const request1 = {
  id: 1,
  method: "ProjectProcedure.getProjects",
  params: {}
};

// String ID with descriptive naming
const request2 = {
  id: "get_projects_2023_q4",
  method: "ProjectProcedure.getProjects", 
  params: {
    page: 1,
    size: 100
  }
};

// UUID-style string ID
const request3 = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  method: "ProjectProcedure.createProject",
  params: {
    domain: "example.com",
    projectName: "Test Project"
  }
};
```

### Python

```python
# Integer ID
request1 = {
    "id": 1,
    "method": "ProjectProcedure.getProjects",
    "params": {}
}

# String ID with timestamp
import datetime
timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
request2 = {
    "id": f"create_project_{timestamp}",
    "method": "ProjectProcedure.createProject",
    "params": {
        "domain": "example.com",
        "projectName": "Test Project"
    }
}
```

### cURL

```bash
# Integer ID
curl -X POST https://api.serpstat.com/v4 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{
    "id": 1,
    "method": "ProjectProcedure.getProjects",
    "params": {}
  }'

# String ID
curl -X POST https://api.serpstat.com/v4 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{
    "id": "batch_delete_2023",
    "method": "ProjectProcedure.deleteProject",
    "params": {
      "id": 1075717
    }
  }'
```

## Best Practices

### ID Naming Conventions

#### Sequential Numbers
- **Pros**: Simple, auto-incrementing
- **Cons**: Hard to track purpose
- **Use Case**: Simple scripts, testing
- **Example**: `1`, `2`, `3`, ... `1000`

#### Descriptive Names
- **Pros**: Self-documenting, easy to track
- **Cons**: Longer, requires manual naming
- **Use Case**: Production code, batch operations
- **Example**: `"create_project_2023_q4"`, `"delete_old_projects"`

#### Timestamp-based
- **Pros**: Unique, sortable, includes timing info
- **Cons**: Long strings
- **Use Case**: Logging, debugging, time-sensitive operations
- **Example**: `"20231215_143022_create_project"`

#### UUID/Random
- **Pros**: Guaranteed unique, no collisions
- **Cons**: Not human-readable
- **Use Case**: Distributed systems, high-concurrency scenarios
- **Example**: `"550e8400-e29b-41d4-a716-446655440000"`

### Error Handling for ID Parameters

| Error Type | Description | Solution |
|------------|-------------|----------|
| `400` | Invalid ID format | Ensure ID is valid string or integer |
| `429` | Too many requests with same ID | Use different IDs for concurrent requests |
| `500` | Server error correlating ID | Check API logs for ID-related issues |

## Response Correlation

### ID Matching in Responses

The `id` field in the response will always match the `id` field from the request:

```json
// Request
{
  "id": "test_request_123",
  "method": "ProjectProcedure.getProjects",
  "params": {}
}

// Response
{
  "id": "test_request_123",
  "result": {
    "data": [...],
    "summary_info": {...}
  }
}
```

## Use Cases

### Request Tracking
```javascript
// Map requests to responses for correlation
const requestMap = new Map();

const makeApiCall = async (id, method, params) => {
  const request = { id, method, params };
  requestMap.set(id, { request, startTime: Date.now() });
  
  const response = await apiCall(request);
  const duration = Date.now() - requestMap.get(id).startTime;
  
  console.log(`Request ${id} completed in ${duration}ms`);
  return response;
};
```

### Batch Operations
```javascript
// Process multiple requests with unique IDs
const batchRequests = [
  { id: "batch_1", method: "ProjectProcedure.getProjects", params: { page: 1 } },
  { id: "batch_2", method: "ProjectProcedure.getProjects", params: { page: 2 } },
  { id: "batch_3", method: "ProjectProcedure.getProjects", params: { page: 3 } }
];

const results = await Promise.all(
  batchRequests.map(req => makeApiCall(req.id, req.method, req.params))
);
```

## Notes

- **Required Field**: Every API request must include an `id` parameter
- **Response Correlation**: Use the `id` to match responses with requests
- **Uniqueness**: While not strictly required, unique IDs help with debugging and tracking
- **String vs Integer**: Both types are valid; choose based on your use case
- **Length Limits**: Very long string IDs may be truncated by some systems