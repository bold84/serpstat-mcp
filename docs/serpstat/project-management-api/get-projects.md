# getProjects | Serpstat Project Management API

Get a list of projects associated with your account.

## Method Details

- **Method Name**: `ProjectProcedure.getProjects`
- **Credits**: 0 credits (no cost)
- **Purpose**: Retrieve information about all your projects including project ID, name, domain, and creation date

## Parameters

### Required Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `id` | int/string | A request id: the response contains the same id | `1` or `"test_request"` |

### Optional Parameters

| Parameter | Type | Description | Default | Value Options |
|-----------|------|-------------|---------|---------------|
| `page` | int | Page number in the projects list | `1` | Number value, e.g., `1`, `5` |
| `size` | int | Number of results per page in the project list | `100` | `20`, `50`, `100`, `200`, `500` |

## Request Format

```json
{
  "id": 1,
  "method": "ProjectProcedure.getProjects",
  "params": {
    "page": 1,
    "size": 20
  }
}
```

## Response Format

### Success Response (200 OK)

```json
{
  "id": "1",
  "result": {
    "data": [
      {
        "project_id": "1075717",
        "project_name": "premierleague.com",
        "domain": "premierleague.com",
        "created_at": "2022-10-06T15:14:04",
        "group": "Default group",
        "type": "owner"
      },
      {
        "project_id": "1068077",
        "project_name": "manutd.com",
        "domain": "manutd.com",
        "created_at": "2022-09-13T09:38:26",
        "group": "Default group",
        "type": "reader"
      }
    ],
    "summary_info": {
      "page": 1,
      "page_total": 1,
      "count": 20,
      "total": 8
    }
  }
}
```

### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string/int | Request id (same as in request) |
| `result` | object | Contains the answer |
| `data` | array | Array with project data |
| `project_id` | string | Your project's ID |
| `project_name` | string | Your project's name |
| `domain` | string | Project's domain name |
| `created_at` | string | Date and time when the project was created |
| `group` | string | Project's group |
| `type` | string | Project's type ("owner" — you are the owner, "reader" — the project's owner is a member of your team) |
| `summary_info` | object | Object with pagination data |
| `page` | int | Current page number |
| `page_total` | int | Number of pages per request |
| `count` | int | Number of responses per request |
| `total` | int | Total amount of projects |

## Examples

### Basic Project List Request

```json
{
  "id": 1,
  "method": "ProjectProcedure.getProjects",
  "params": {
    "page": 1,
    "size": 100
  }
}
```

### Request with Custom ID

```json
{
  "id": "get_projects_2023",
  "method": "ProjectProcedure.getProjects",
  "params": {
    "page": 2,
    "size": 50
  }
}
```

### Request for All Projects (No Pagination)

```json
{
  "id": 1,
  "method": "ProjectProcedure.getProjects",
  "params": {}
}
```

## Pagination

### Available Page Sizes

| Size | Description |
|------|-------------|
| `20` | Small page size for quick browsing |
| `50` | Medium page size for balanced viewing |
| `100` | Default page size (recommended) |
| `200` | Large page size for bulk operations |
| `500` | Maximum page size for comprehensive views |

### Pagination Strategy

1. **First Request**: Start with `page: 1`, `size: 100`
2. **Check Total**: Use `total` field to determine total projects
3. **Calculate Pages**: `page_total = Math.ceil(total / size)`
4. **Iterate**: Loop through pages as needed

```javascript
// Example pagination logic
let currentPage = 1;
let pageSize = 100;
let allProjects = [];

do {
  const response = await getProjects(currentPage, pageSize);
  allProjects = allProjects.concat(response.result.data);
  currentPage++;
} while (currentPage <= response.result.summary_info.page_total);
```

## Project Types

### Owner Projects
- **Type**: `"owner"`
- **Description**: You are the owner of this project
- **Permissions**: Full access to all project features

### Reader Projects
- **Type**: `"reader"`
- **Description**: The project's owner is a member of your team (Team Management)
- **Permissions**: Limited access based on team configuration

## Notes

- **No Credit Cost**: This method does not consume any API credits
- **Default Values**: If `page` and `size` are not specified, defaults are used
- **Response Order**: Projects are typically ordered by creation date (newest first)
- **Team Context**: Reader type projects appear when using Team Management

## Error Handling

| Error Code | Description | Solution |
|------------|-------------|----------|
| `400` | Invalid pagination parameters | Ensure page and size are valid numbers |
| `403` | Insufficient permissions | Verify API token has project list access |
| `500` | Server error | Try again later or contact support |

## Use Cases

### Project Management
- List all projects for management overview
- Monitor project creation dates for planning
- Identify project ownership and team assignments

### Integration Scenarios
- Sync projects with external tools
- Generate project reports
- Automate project-based workflows

### Data Analysis
- Analyze project distribution by creation date
- Track project growth over time
- Categorize projects by type and group