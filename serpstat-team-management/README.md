# Serpstat Team Management MCP Server

A Model Context Protocol (MCP) server for managing Serpstat team members.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the server:
```bash
npm run build
```

3. Set environment variable:
```bash
export SERPSTAT_API_KEY="your-api-key"
```

## Configuration

Add to your MCP settings:
```json
{
  "mcpServers": {
    "serpstat-team-management": {
      "command": "node",
      "args": ["/path/to/serpstat-team-management/build/index.js"],
      "env": {
        "SERPSTAT_API_KEY": "your-serpstat-api-key"
      }
    }
  }
}
```

## Usage

### add_user
Invite a new user by email.
```json
{
  "name": "add_user",
  "arguments": {
    "email": "user@example.com"
  }
}
```

### get_list
Get team users with optional search and pagination.
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
Activate an inactive user.
```json
{
  "name": "activate_user", 
  "arguments": {
    "user_id": 12345
  }
}
```

### deactivate_user
Deactivate an active user.
```json
{
  "name": "deactivate_user",
  "arguments": {
    "user_id": 12345
  }
}
```

### remove_user
Remove a user (optionally merge projects).
```json
{
  "name": "remove_user",
  "arguments": {
    "user_id": 12345,
    "merge_projects": true
  }
}