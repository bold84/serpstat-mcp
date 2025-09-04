# Serpstat MCP Servers

A collection of Model Context Protocol (MCP) servers for interacting with the Serpstat API.

**Available Servers:** 8 MCP servers with 78+ total analysis methods

## Projects

### serpstat-keyword-analysis
MCP server for Serpstat keyword analysis with 12 different analysis methods.

**Features:**
- Keyword research and suggestions
- Competitor analysis for keywords
- Search volume and CPC data
- Keyword difficulty and intent analysis
- Related keywords discovery
- Ad keywords and competitor analysis
- Data export capabilities

**Installation:**
```bash
cd serpstat-keyword-analysis
npm install
npm run build
export SERPSTAT_API_KEY="your-api-key"
```

**Usage:**
Configure in MCP settings:
```json
{
  "mcpServers": {
    "serpstat-keyword-analysis": {
      "command": "node",
      "args": ["/path/to/serpstat-keyword-analysis/build/index.js"],
      "env": {
        "SERPSTAT_API_KEY": "your-serpstat-api-key"
      }
    }
  }
}
```

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

### serpstat-project-management
MCP server for Serpstat project management with 3 different project operations.

**Features:**
- Create new SEO projects with domain and configuration settings
- Delete existing projects and all associated data
- List and manage all projects with detailed metadata
- Project group organization and type management
- Pagination support for large project lists
- Credit consumption tracking for project operations

**Installation:**
```bash
cd serpstat-project-management
npm install
npm run build
export SERPSTAT_TOKEN="your-api-token"
```

**Usage:**
Configure in MCP settings:
```json
{
  "mcpServers": {
    "serpstat-project-management": {
      "command": "node",
      "args": ["/path/to/serpstat-project-management/build/index.js"],
      "env": {
        "SERPSTAT_TOKEN": "your-serpstat-api-token"
      }
    }
  }
}
```

**Available Tools:**
- `createProject` - Create new Serpstat projects (1 project credit)
- `deleteProject` - Remove existing projects permanently (1 project credit)
- `getProjects` - List all projects with metadata (no credit cost)

**Note:** The createProject tool uses `name` parameter (not `projectName`) as required by the actual API.

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

### serpstat-url-analysis
MCP server for Serpstat URL analysis with 4 different analysis methods.

**Features:**
- URL traffic and keyword statistics
- URL competitor analysis
- URL keyword ranking analysis
- Missing keyword analysis for SEO gap identification
- Advanced filtering and pagination support

**Installation:**
```bash
cd serpstat-url-analysis
npm install
npm run build
export SERPSTAT_API_KEY="your-api-key"
```

**Usage:**
Configure in MCP settings:
```json
{
  "mcpServers": {
    "serpstat-url-analysis": {
      "command": "node",
      "args": ["/path/to/serpstat-url-analysis/build/index.js"],
      "env": {
        "SERPSTAT_API_KEY": "your-serpstat-api-key"
      }
    }
  }
}
```

### serpstat-backlinks
MCP server for Serpstat backlinks analysis with 21 different analysis methods.

**Features:**
- Referring domains analysis with domain rank and authority metrics
- New and lost backlinks tracking
- Anchor text analysis and optimization insights
- External link analysis and outlink tracking
- Competitor backlink intersection analysis
- Domain redirection analysis
- Domain Rating (SDR) and TLD distribution analysis
- Threat detection and malicious domain analysis
- Historical backlink changes tracking
- Complex filtering with AND/OR logic
- Advanced sorting and pagination (up to 1000 results per page)

**Installation:**
```bash
cd serpstat-backlinks
npm install
npm run build
export SERPSTAT_API_KEY="your-api-key"
```

**Usage:**
Configure in MCP settings:
```json
{
  "mcpServers": {
    "serpstat-backlinks": {
      "command": "node",
      "args": ["/path/to/serpstat-backlinks/build/index.js"],
      "env": {
        "SERPSTAT_API_KEY": "your-serpstat-api-key"
      }
    }
  }
}
```

### serpstat-audit
MCP server for Serpstat site audit with 15 different analysis methods.

**Features:**
- Automated website scanning and audit management
- Technical SEO error detection and categorization
- Comprehensive audit reporting and export capabilities
- Advanced audit configuration and scheduling
- Historical data tracking and analysis
- Error priority management (high, medium, low, information)
- Multi-format export (CSV, XLSX, JSON)
- Audit project management and monitoring

**Installation:**
```bash
cd serpstat-audit
npm install
npm run build
export SERPSTAT_API_KEY="your-api-key"
```

**Usage:**
Configure in MCP settings:
```json
{
  "mcpServers": {
    "serpstat-audit": {
      "command": "node",
      "args": ["/path/to/serpstat-audit/build/index.js"],
      "env": {
        "SERPSTAT_API_KEY": "your-serpstat-api-key"
      }
    }
  }
}
```

### serpstat-rank-tracker
MCP server for Serpstat rank tracking with 6 different analysis methods.

**Features:**
- Project management and status monitoring
- Keyword ranking history and SERP analysis
- URL-specific ranking tracking
- Competitor domain analysis in top-20 positions
- Regional ranking data with comprehensive filtering
- Historical ranking trend analysis
- No API credits consumed for any operations

**Installation:**
```bash
cd serpstat-rank-tracker
npm install
npm run build
export SERPSTAT_TOKEN="your-api-token"
```

**Usage:**
Configure in MCP settings:
```json
{
  "mcpServers": {
    "serpstat-rank-tracker": {
      "command": "node",
      "args": ["/path/to/serpstat-rank-tracker/build/index.js"],
      "env": {
        "SERPSTAT_TOKEN": "your-serpstat-api-token"
      }
    }
  }
}
```


### serpstat-shared
Shared library providing common functionality for all MCP servers.

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
Date: 2025-09-03