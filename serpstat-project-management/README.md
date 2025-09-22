# Serpstat Project Management MCP Server

A Model Context Protocol (MCP) server for the Serpstat Project Management API, providing comprehensive project creation, deletion, and management capabilities.

## Features

This MCP server provides 3 tools for project lifecycle management:

### Project Operations
- **createProject**: Create new Serpstat projects with domain and configuration settings
- **deleteProject**: Remove existing projects and all associated data
- **getProjects**: Retrieve and list all projects with detailed metadata

## Installation

# No installation required! Run directly with npx:
npx serpstat-project-management

# Or install globally if preferred:
npm install -g serpstat-project-management

# Set your API key:
export SERPSTAT_TOKEN="your-api-token"

## Usage

### MCP Configuration
Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "serpstat-project-management": {
      "command": "npx",
      "args": ["serpstat-project-management"],
      "env": {
        "SERPSTAT_TOKEN": "your-api-token"
      }
    }
  }
}
```

### Environment Variables
- `SERPSTAT_TOKEN`: Your Serpstat API token (required)

### Building
```bash
npm run build
```

### Running
```bash
npm start
```

## API Methods

### createProject
Create a new Serpstat project for SEO analysis.

**Parameters:**
- `domain` (required): Domain name without protocol (e.g., "example.com")
- `name` (required): Name for the project
- `group` (optional): Project group name (Default: "Default group")
- `type` (optional): Project type - "owner" or "reader" (Default: "owner")

**Returns:** Created project details including project ID, name, domain, and creation timestamp.

**Credits:** Consumes 1 project credit

### deleteProject
Delete an existing project and all associated data.

**Parameters:**
- `id` (required): ID of the project to delete

**Returns:** Deletion confirmation status.

**Credits:** Consumes 1 project credit

**Warning:** This action cannot be undone and permanently removes all project data including audit history, rank tracking, and configurations.

### getProjects
Retrieve a list of all your Serpstat projects.

**Parameters:**
- `page` (optional): Page number (default: 1)
- `size` (optional): Results per page - 20, 50, 100, 200, 500 (default: 100)

**Returns:** Project list with ID, name, domain, creation date, group, and type information.

**Credits:** No API credits consumed

## API Credits

- **createProject**: Consumes 1 project credit
- **deleteProject**: Consumes 1 project credit  
- **getProjects**: No API credits consumed

## Examples

### Create a New Project
```json
{
  "name": "createProject",
  "arguments": {
    "domain": "example.com",
    "name": "My SEO Project",
    "group": "Marketing Projects",
    "type": "owner"
  }
}
```

### List All Projects
```json
{
  "name": "getProjects",
  "arguments": {
    "page": 1,
    "size": 50
  }
}
```

### Delete a Project
```json
{
  "name": "deleteProject",
  "arguments": {
    "id": 1234567
  }
}
```

## Project Types

### Owner Projects
- **Type**: `"owner"`
- **Description**: You are the owner of this project
- **Permissions**: Full access to all project features

### Reader Projects  
- **Type**: `"reader"`
- **Description**: The project's owner is a member of your team
- **Permissions**: Limited access based on team configuration

## Important Notes

### Documentation vs API Discrepancy
**Important:** The API documentation shows `projectName` as the parameter, but the actual API requires `name`. This implementation uses `name` to match the actual API behavior.

### Project Creation
- **Immediate Availability**: Projects are available for use immediately after creation
- **Domain Validation**: Domains must be valid and accessible
- **Credit Consumption**: 1 project credit is deducted for each creation
- **Project Limits**: Account may have project creation limits

### Project Deletion
- **Permanent Action**: Cannot be undone - all data is permanently lost
- **Complete Removal**: Removes audit data, rank tracking history, and all configurations
- **Credit Consumption**: 1 project credit is deducted for each deletion
- **Backup Important Data**: Export any important data before deletion

### Best Practices
1. **Domain Format**: Use domain without protocol (no `http://` or `https://`)
2. **Unique Names**: Use descriptive project names for easy identification
3. **Group Organization**: Use groups to organize related projects
4. **Confirm Before Deletion**: Double-check project IDs to avoid accidental deletion

## Technical Details

- Built with TypeScript and Zod for type safety
- Uses Model Context Protocol (MCP) for AI assistant integration
- Follows JSON-RPC 2.0 protocol for Serpstat API communication
- Comprehensive input validation with detailed error messages
- Supports pagination for project listing
- ES module support for modern Node.js environments

## Error Handling

The server provides detailed error messages for:
- Invalid domain formats
- Missing required parameters
- Insufficient project credits
- Project not found errors
- Permission issues

## Author

Benjamin Oldenburg

## License

MIT