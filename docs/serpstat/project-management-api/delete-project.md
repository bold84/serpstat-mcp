# deleteProject | Serpstat Project Management API

Delete an existing project from Serpstat.

## Method Details

- **Method Name**: `ProjectProcedure.deleteProject`
- **Credits**: 1 project credit
- **Purpose**: Delete an existing project and all associated data including audit and rank tracking

## Parameters

### Required Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `id` | int | ID of the project in Serpstat | `1075717` |

## Request Format

```json
{
  "id": 1,
  "method": "ProjectProcedure.deleteProject",
  "params": {
    "id": 1075717
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
    "message": "Project deleted successfully"
  }
}
```

### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string/int | Request id |
| `result` | object | Contains the answer |
| `status` | string | Status of the operation ("success" or "error") |
| `message` | string | Description of the operation result |

## Examples

### Basic Project Deletion

```json
{
  "id": 1,
  "method": "ProjectProcedure.deleteProject",
  "params": {
    "id": 1075717
  }
}
```

### Using String ID

```json
{
  "id": "test_delete_123",
  "method": "ProjectProcedure.deleteProject",
  "params": {
    "id": 1075717
  }
}
```

## Important Notes

### Data Deletion
- **Complete Removal**: When you delete a project, all associated data will be permanently removed, including:
  - Audit data and reports
  - Rank tracking history
  - Keyword tracking data
  - All project settings and configurations

### Irreversible Action
- **Permanent Deletion**: This action cannot be undone
- **Data Loss**: All project data will be lost permanently
- **Credit Refund**: 1 project credit will be deducted from your account

### Best Practices
1. **Backup Important Data**: Before deletion, ensure you have exported any important data
2. **Confirm Project ID**: Double-check the project ID to avoid accidental deletion
3. **Team Coordination**: Notify team members if the project is shared
4. **Check Dependencies**: Verify no other processes or integrations depend on this project

## Error Handling

| Error Code | Description | Solution |
|------------|-------------|----------|
| `404` | Project not found | Verify the project ID exists |
| `403` | Insufficient permissions | Ensure your API token has delete permissions |
| `400` | Invalid project ID | Check that the ID is a valid number |
| `409` | Project cannot be deleted | Project may have active processes or dependencies |

## API Rate Limits

- **Rate Limiting**: Be mindful of rate limits when making multiple deletions
- **Credit Consumption**: Each deletion consumes 1 project credit
- **Batch Operations**: Consider batching multiple deletions if needed

## Notes

- Credits for this method will be deducted from your account
- The deletion process may take a few moments to complete
- You cannot recover deleted projects or their data
- Ensure you have the necessary permissions before attempting deletion