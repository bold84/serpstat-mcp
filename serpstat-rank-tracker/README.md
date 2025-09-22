# Serpstat Rank Tracker MCP Server

A Model Context Protocol (MCP) server for the Serpstat Rank Tracker API, providing comprehensive keyword ranking tracking, competitor analysis, and SERP history data.

## Features

This MCP server provides 6 tools for rank tracking and SEO analysis:

### Project Management
- **getProjects**: Retrieve all your rank tracker projects with metadata
- **getProjectStatus**: Check parsing status for project/region combinations  
- **getProjectRegions**: Get configured regions for your projects

### SERP Analysis
- **getKeywordsSerpResultsHistory**: Get Google top-100 results for your keywords over time
- **getUrlsSerpResultsHistory**: Track ranking history for specific URLs and pages
- **getTopCompetitorsDomainsHistory**: Analyze competitor domains in top-20 positions

## Installation

```bash
npm install
```

## Usage

### MCP Configuration
Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "serpstat-rank-tracker": {
      "command": "npx",
      "args": ["serpstat-rank-tracker"],
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

### getProjects
Get a list of your rank tracker projects.

**Parameters:**
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Results per page - 20, 50, 100, 500 (default: 100)

**Returns:** Project list with ID, name, domain, creation date, status, and tracking settings.

### getProjectStatus
Check if position data is ready for a project/region.

**Parameters:**
- `projectId` (required): Project ID
- `regionId` (required): Region ID

**Returns:** Parsing status - wait if `true` (parsing), proceed if `false` (ready).

### getProjectRegions
Get all configured regions for a project.

**Parameters:**
- `projectId` (required): Project ID

**Returns:** Array of regions with device types, search engines, and status.

### getKeywordsSerpResultsHistory
Get historical SERP data for your keywords.

**Parameters:**
- `projectId` (required): Project ID
- `projectRegionId` (required): Region ID
- `page` (required): Page number
- `pageSize` (optional): Results per page (default: 100)
- `dateFrom` (optional): Start date (YYYY-MM-DD)
- `dateTo` (optional): End date (YYYY-MM-DD)
- `sort` (optional): Sort by 'keyword' or 'date' (default: keyword)
- `order` (optional): 'asc' or 'desc' (default: desc)
- `keywords` (optional): Filter by specific keywords (max 1000)
- `withTags` (optional): Include keyword tags (default: false)

**Returns:** Keyword ranking history with positions, URLs, and tags.

### getUrlsSerpResultsHistory
Get ranking history for specific URLs.

**Parameters:**
- Same as getKeywordsSerpResultsHistory, plus:
- `domain` (optional): Filter by specific domain or URL

**Returns:** URL ranking history with position data for specified keywords.

### getTopCompetitorsDomainsHistory
Analyze competitor performance in top-20 positions.

**Parameters:**
- `projectId` (required): Project ID
- `projectRegionId` (required): Region ID
- `page` (required): Page number
- `pageSize` (required): Results per page (20-500)
- `dateFrom` (required): Start date (YYYY-MM-DD)
- `dateTo` (required): End date (YYYY-MM-DD)
- `sort` (optional): Sort by traffic, keywords, position, etc. (default: sum_traffic)
- `sortRange` (optional): Detailed sort range
- `order` (optional): 'asc' or 'desc' (default: desc)
- `domains` (required): Array of competitor domains to analyze

**Returns:** Competitor ranking history with traffic distribution and position data.

## API Credits

All methods in this API **do not consume API credits**, making them ideal for frequent monitoring and analysis.

## Region IDs

Region IDs can be found in the [Serpstat regions reference](https://docs.google.com/spreadsheets/d/1LUDtm-L1qWMVpmWuN-nvDyYFfQtfiXUh5LIHE8sjs0k/edit?gid=75443986#gid=75443986).

## Parameter Notes

- **`regionId`**: Used for basic project operations like checking status and getting regions
- **`projectRegionId`**: Used for data retrieval operations like getting SERP history and competitor analysis
- Both parameters refer to the same region ID values, but are used in different API contexts

## Examples

### Get Project List
```json
{
  "name": "getProjects",
  "arguments": {
    "page": 1,
    "pageSize": 50
  }
}
```

### Check Project Status
```json
{
  "name": "getProjectStatus", 
  "arguments": {
    "projectId": 123456,
    "regionId": 389715
  }
}
```

### Get Keyword Rankings
```json
{
  "name": "getKeywordsSerpResultsHistory",
  "arguments": {
    "projectId": 123456,
    "projectRegionId": 389715,
    "page": 1,
    "dateFrom": "2025-01-01",
    "dateTo": "2025-01-31",
    "keywords": ["seo tools", "keyword research"]
  }
}
```

### Analyze Competitors
```json
{
  "name": "getTopCompetitorsDomainsHistory",
  "arguments": {
    "projectId": 123456,
    "projectRegionId": 389715,
    "page": 1,
    "pageSize": 20,
    "dateFrom": "2025-01-01",
    "dateTo": "2025-01-31",
    "domains": ["competitor1.com", "competitor2.com"]
  }
}
```

## Technical Details

- Built with TypeScript and Zod for type safety
- Uses Model Context Protocol (MCP) for AI assistant integration
- Follows JSON-RPC 2.0 protocol for Serpstat API communication
- Comprehensive input validation with detailed error messages
- Supports pagination, filtering, and sorting across all methods

## Author

Benjamin Oldenburg

## License

MIT