# Serpstat MCP Servers

A collection of Model Context Protocol (MCP) servers for interacting with the Serpstat API.

## Projects

### serpstat-domain-analysis
MCP server for Serpstat domain analysis with 15 different analysis methods.

**Features:**
- Domain information and keyword analysis
- Competitor analysis (organic and paid)
- Traffic and performance metrics
- Multi-domain comparison
- Data export capabilities

**Installation:**
```bash
cd serpstat-domain-analysis
npm install
npm run build
export SERPSTAT_API_KEY="your-api-key"
```

**Usage:**
Configure in MCP settings:
```json
{
  "mcpServers": {
    "serpstat-domain-analysis": {
      "command": "node",
      "args": ["/path/to/serpstat-domain-analysis/build/index.js"],
      "env": {
        "SERPSTAT_API_KEY": "your-serpstat-api-key"
      }
    }
  }
}
```

### serpstat-team-management
MCP server for managing Serpstat team members.

**Features:**
- User invitation and management
- Team member activation/deactivation
- User removal with project merging
- Search and pagination support

**Installation:**
```bash
cd serpstat-team-management
npm install
npm run build
export SERPSTAT_API_KEY="your-api-key"
```

**Usage:**
Configure in MCP settings:
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

### serpstat-shared
Shared library providing common functionality for both MCP servers.

**Features:**
- HTTP client with retry logic and error handling
- Comprehensive validation schemas
- TypeScript interfaces and constants
- Credit usage tracking

**Installation:**
```bash
cd serpstat-shared
npm install
npm run build
```

## Requirements

- Node.js 18 or higher
- Valid Serpstat API key
- Model Context Protocol compatible client

## Common Search Engines

- `g_us` - Google United States
- `g_uk` - Google United Kingdom  
- `g_de` - Google Germany
- `bing_us` - Bing United States
- 200+ Google variants supported

## Development

All projects use TypeScript and have been documented with comprehensive JSDoc comments.

Author: Benjamin Oldenburg
Date: 2025-08-31