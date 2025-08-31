# createProject | Serpstat Project Management API

Create a new project in Serpstat.

## Method Details

- **Method Name**: `ProjectProcedure.createProject`
- **Credits**: 1 project credit
- **Purpose**: Create a new project with specified domain and project name for SEO analysis

## Parameters

### Required Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `domain` | string | Domain name for the project (without protocol) | `"example.com"` |
| `projectName` | string | Name for the project | `"My SEO Project"` |

### Optional Parameters

| Parameter | Type | Description | Default | Value Options |
|-----------|------|-------------|---------|---------------|
| `group` | string | Project group name | `"Default group"` | Any string value |
| `type` | string | Project type | `"owner"` | `"owner"`, `"reader"` |

## Request Format

```json
{
  "id": 1,
  "method": "ProjectProcedure.createProject",
  "params": {
    "domain": "example.com",
    "projectName": "My SEO Project",
    "group": "Default group",
    "type": "owner"
  }
}
```

## Response Format

### Success Response (200 OK)

```json
{
  "id": 1,
  "result": {
    "status": "success",
    "project_id": "1075718",
    "project_name": "My SEO Project",
    "domain": "example.com",
    "created_at": "2023-01-15T10:30:00",
    "group": "Default group",
    "type": "owner"
  }
}
```

### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string/int | Request id (same as in request) |
| `result` | object | Contains the answer |
| `status` | string | Status of the operation ("success" or "error") |
| `project_id` | string | Newly created project's ID |
| `project_name` | string | Project's name |
| `domain` | string | Project's domain name |
| `created_at` | string | Date and time when the project was created |
| `group` | string | Project's group |
| `type` | string | Project's type ("owner" or "reader") |

## Examples

### Basic Project Creation

```json
{
  "id": 1,
  "method": "ProjectProcedure.createProject",
  "params": {
    "domain": "example.com",
    "projectName": "My SEO Project"
  }
}
```

### Project Creation with Custom Group

```json
{
  "id": "create_project_2023",
  "method": "ProjectProcedure.createProject",
  "params": {
    "domain": "example.com",
    "projectName": "Marketing Campaign",
    "group": "Marketing Projects"
  }
}
```

### Project Creation with All Parameters

```json
{
  "id": 1,
  "method": "ProjectProcedure.createProject",
  "params": {
    "domain": "example.com",
    "projectName": "Full SEO Analysis",
    "group": "Premium Projects",
    "type": "owner"
  }
}
```

## Important Notes

### Project Creation Process
- **Immediate Availability**: The project is available for use immediately after creation
- **Credit Consumption**: 1 project credit will be deducted from your account
- **Domain Validation**: The domain must be valid and accessible
- **Project Limits**: Account may have project creation limits

### Best Practices
1. **Domain Format**: Use domain without protocol (no `http://` or `https://`)
2. **Unique Names**: Use descriptive but unique project names for easy identification
3. **Group Organization**: Use groups to organize related projects
4. **Naming Conventions**: Follow consistent naming patterns across projects

## Error Handling

| Error Code | Description | Solution |
|------------|-------------|----------|
| `400` | Invalid domain format | Ensure domain is properly formatted |
| `400` | Missing required parameters | Check that domain and projectName are provided |
| `403` | Insufficient credits | Verify you have enough project credits |
| `409` | Project already exists | Use a different domain or project name |
| `500` | Server error | Try again later or contact support |

## API Rate Limits

- **Rate Limiting**: Be mindful of rate limits when creating multiple projects
- **Credit Consumption**: Each creation consumes 1 project credit
- **Batch Operations**: Consider batching multiple creations if needed

## Notes

- Credits for this method will be deducted from your account
- The project creation process is typically immediate
- You can start using the project right after creation for SEO analysis
- Ensure you have sufficient credits before attempting project creation
- Project names must be unique across your account