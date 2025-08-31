# Serpstat Domain Analysis MCP Server

A Model Context Protocol (MCP) server for Serpstat domain analysis.

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

## Usage

### getDomainsInfo
Get basic domain information.
```json
{
  "name": "getDomainsInfo",
  "arguments": {
    "query": "example.com",
    "search_engine": "g_us",
    "size": 10
  }
}
```

### getDomainKeywords
Get keywords for a domain with filtering.
```json
{
  "name": "getDomainKeywords",
  "arguments": {
    "query": "example.com",
    "search_engine": "g_us",
    "se_position_from": 1,
    "se_position_to": 10,
    "size": 50
  }
}
```

### getAdKeywords
Get advertising keywords for a domain.
```json
{
  "name": "getAdKeywords",
  "arguments": {
    "query": "example.com",
    "search_engine": "g_us",
    "size": 50
  }
}
```

### exportPositions
Export position data to CSV.
```json
{
  "name": "exportPositions",
  "arguments": {
    "query": "example.com",
    "search_engine": "g_us",
    "size": 1000
  }
}
```

### getDomainsIntersection
Find keyword intersection between domains.
```json
{
  "name": "getDomainsIntersection",
  "arguments": {
    "query": "example.com",
    "domain_list": ["competitor1.com", "competitor2.com"],
    "size": 100
  }
}
```

## Common Search Engines
- `g_us` - Google United States
- `g_uk` - Google United Kingdom
- `g_de` - Google Germany
- `bing_us` - Bing United States