# Serpstat Team Management MCP Server

A Model Context Protocol (MCP) server that provides tools for managing Serpstat team members through the Team Management API.

## Features

This MCP server provides access to the following Serpstat Team Management API endpoints:

1. **add_user** - Invite a new user to join your team by email address
2. **get_list** - Get a list of all users in your team with optional search and pagination
3. **activate_user** - Activate an inactive user in your team
4. **deactivate_user** - Deactivate an active user in your team
5. **remove_user** - Remove a user from your team (optionally merge their projects)

## Installation

### Prerequisites

- Node.js (v18 or higher)
- A valid Serpstat API token

### Setup

1. Install dependencies:
```bash
npm install
```

2. Build the server:
```bash
npm run build
```

3. Configure the MCP server in your settings (see Configuration section)

## Configuration

### MCP Settings Configuration

Add the following configuration to your MCP settings file (`mcp_settings.json`):

```json
{
  "mcpServers": {
    "serpstat-team-management": {
      "command": "node",
      "args": ["/path/to/serpstat-team-management/build/index.js"],
      "env": {
        "SERPSTAT_API_TOKEN": "your-serpstat-api-token"
      },
      "disabled": false,
      "alwaysAllow": [],
      "disabledTools": []
    }
  }
}
```

### Environment Variables

- **SERPSTAT_API_KEY**: Your Serpstat API token (required)
  - Obtain this from your Serpstat profile page: https://serpstat.com/users/profile/

## API Usage

### add_user

Invite a new user to join your team by email address.

**Parameters:**
- `email` (string, required): User's email address to invite

**Example:**
```json
{
  "name": "add_user",
  "arguments": {
    "email": "john.doe@example.com"
  }
}
```

### get_list

Get a list of all users in your team with optional search and pagination.

**Parameters:**
- `search` (string, optional): Search term to filter by email (default: "")
- `page` (number, optional): Page number for pagination (default: 1)
- `size` (number, optional): Number of results per page (1-1000, default: 100)

**Example:**
```json
{
  "name": "get_list",
  "arguments": {
    "search": "john",
    "page": 1,
    "size": 50
  }
}
```

### activate_user

Activate an inactive user in your team.

**Parameters:**
- `user_id` (number, required): User's identifier at Serpstat (obtained from get_list)

**Example:**
```json
{
  "name": "activate_user",
  "arguments": {
    "user_id": 5555
  }
}
```

### deactivate_user

Deactivate an active user in your team.

**Parameters:**
- `user_id` (number, required): User's identifier at Serpstat (obtained from get_list)

**Example:**
```json
{
  "name": "deactivate_user",
  "arguments": {
    "user_id": 5555
  }
}
```

### remove_user

Remove a user from your team (optionally merge their projects).

**Parameters:**
- `user_id` (number, required): User's identifier at Serpstat (obtained from get_list)
- `merge_projects` (boolean, optional): Transfer user's projects to team owner if true, delete if false (default: true)

**Example:**
```json
{
  "name": "remove_user",
  "arguments": {
    "user_id": 5555,
    "merge_projects": true
  }
}
```

## Error Handling

The server implements comprehensive error handling for:

- **Authentication errors**: Invalid or missing API token
- **Network errors**: Connection issues with Serpstat API
- **Validation errors**: Invalid input parameters
- **API errors**: Serpstat API specific errors with detailed messages

All errors are returned with descriptive error messages to help with troubleshooting.

## Rate Limiting

The server respects Serpstat's API rate limits:
- Default rate limit: 1 request per second
- Top-tier rate limit: 10 requests per second
- Maximum results per method: 60,000 rows

## Security Considerations

- API tokens are stored securely via environment variables
- Input validation is performed on all parameters
- Error messages are sanitized to prevent information leakage
- The server follows the principle of least privilege

## Development

### Project Structure

```
serpstat-team-management/
├── src/
│   └── index.ts          # Main server implementation
├── build/
│   └── index.js         # Compiled JavaScript
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

### Building

```bash
npm run build
```

### Testing

The server can be tested by running:

```bash
npm run build
node build/index.js
```

The server should display "Serpstat Team Management MCP server running on stdio" when started successfully.

## Troubleshooting

### Common Issues

1. **"SERPSTAT_API_TOKEN environment variable is required"**
   - Solution: Set the SERPSTAT_API_TOKEN environment variable in your MCP settings

2. **"Network error: Unable to connect to Serpstat API"**
   - Solution: Check your internet connection and verify that the Serpstat API is accessible

3. **"Invalid email format"**
   - Solution: Ensure the email address is properly formatted

4. **"User ID must be positive"**
   - Solution: Use a valid positive user ID obtained from the get_list method

### Getting Help

- Check the Serpstat API documentation: https://serpstat.com/
- Verify your API token is valid and has the necessary permissions
- Ensure your Serpstat account has Team Management API access

## License

This project is licensed under the same terms as the Serpstat API.

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Changelog

### v0.1.0
- Initial release
- Implemented all 5 Team Management API endpoints
- Added comprehensive error handling
- Added input validation using Zod schemas
- Added proper TypeScript types