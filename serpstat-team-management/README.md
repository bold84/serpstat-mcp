# Serpstat Team Management MCP Server

A Model Context Protocol (MCP) server for managing Serpstat team members.

## Installation

# No installation required! Run directly with npx:
npx serpstat-team-management

# Or install globally if preferred:
npm install -g serpstat-team-management

# Set your API key:
export SERPSTAT_API_KEY="your-api-key"

## Configuration

Add to your MCP settings:
```json
{
  "mcpServers": {
    "serpstat-team-management": {
      "command": "npx",
      "args": ["serpstat-team-management"],
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