# Serpstat URL Analysis MCP Server

A comprehensive Model Context Protocol (MCP) server for interacting with the Serpstat URL Analysis API. This server provides 4 powerful tools for analyzing URL performance, competitors, keywords, and identifying SEO opportunities.

## Features

### 🔍 URL Traffic Analysis
- **getSummaryTraffic**: Get traffic and keyword statistics for website pages matching specific URL patterns
- Analyze specific sections of websites (e.g., mobile pages, product categories)
- Understand traffic distribution and keyword coverage

### 🥊 URL Competitor Analysis  
- **getUrlCompetitors**: Identify competing URLs for any target URL
- Discover who you're competing against in search results
- Analyze competitor strategies and performance

### 📈 URL Keyword Rankings
- **getUrlKeywords**: Get comprehensive keyword data for specific URLs
- Access ranking positions, search volume, CPC, and difficulty metrics
- Understand keyword intent and search performance

### 🔎 Missing Keyword Analysis
- **getUrlMissingKeywords**: Identify keywords competitors rank for but your URL doesn't
- Essential for SEO gap analysis and content strategy optimization
- Discover new content opportunities

## Installation

### Prerequisites
- Node.js 18 or higher
- Valid Serpstat API key
- Model Context Protocol compatible client

### Setup
```bash
# Navigate to the project directory
cd serpstat-url-analysis

# Install dependencies
npm install

# Build the project
npm run build

# Set your API key
export SERPSTAT_API_KEY="your-serpstat-api-key"
```

## Usage

### MCP Configuration
Add the server to your MCP settings:

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

### Available Tools

#### 1. getSummaryTraffic
Get traffic and keyword statistics for URL patterns.

**Parameters:**
- `se` (required): Search engine code (e.g., "g_us")
- `domain` (required): Domain to analyze
- `urlContains` (required): URL pattern to match
- `output_data` (optional): "traffic" or "keywords" (default: both)

**Example:**
```typescript
const result = await getSummaryTraffic({
  se: "g_us",
  domain: "example.com",
  urlContains: "/blog/",
  output_data: "traffic"
});
```

#### 2. getUrlCompetitors
Get URL competitors for analysis.

**Parameters:**
- `se` (required): Search engine code
- `url` (required): Target URL to analyze
- `sort` (optional): Sort results by field
- `page` (optional): Page number (default: 1)
- `size` (optional): Results per page (default: 100, max: 1000)

**Example:**
```typescript
const result = await getUrlCompetitors({
  se: "g_us",
  url: "https://example.com/product-page",
  sort: { cnt: "desc" },
  size: 50
});
```

#### 3. getUrlKeywords
Get keywords that specific URLs rank for.

**Parameters:**
- `se` (required): Search engine code
- `url` (required): URL to analyze
- `withIntents` (optional): Include keyword intent data
- `filters` (optional): Advanced filtering options
- `sort` (optional): Sort results
- `page` (optional): Page number
- `size` (optional): Results per page

**Example:**
```typescript
const result = await getUrlKeywords({
  se: "g_us",
  url: "https://example.com/blog/post",
  withIntents: true,
  filters: {
    cost_from: 1,
    cost_to: 1000
  },
  sort: { position: "asc" }
});
```

#### 4. getUrlMissingKeywords
Identify keyword gaps between you and competitors.

**Parameters:**
- `se` (required): Search engine code
- `url` (required): URL to analyze
- `filters` (optional): Filter by cost, difficulty, etc.
- `sort` (optional): Sort results
- `page` (optional): Page number
- `size` (optional): Results per page

**Example:**
```typescript
const result = await getUrlMissingKeywords({
  se: "g_us",
  url: "https://example.com",
  filters: {
    cost_from: 0.5,
    concurrency_from: 50
  },
  sort: { weight: "desc" }
});
```

## API Credits & Limits

### Credit Costs
- **getSummaryTraffic**: 1000 credits per parameter (traffic, keywords, or both)
- **getUrlCompetitors**: 1 credit per result returned
- **getUrlKeywords**: 1 credit per result returned  
- **getUrlMissingKeywords**: 1 credit per result returned

### Limits
- Maximum 60,000 results per query for competitor and keyword tools
- Maximum 1,000 results per page
- Pagination support for large datasets

## Search Engines

Supported search engines include:
- **Google**: `g_us` (United States), `g_uk` (United Kingdom), `g_de` (Germany), and 200+ other Google variants
- **Bing**: `bing_us` (United States)

## Development

### Build Commands
```bash
# Build with TypeScript (includes type checking)
npm run build:ts

# Build with esbuild (faster, for development)
npm run build

# Watch for changes
npm run dev

# Type checking only
npm run watch
```

### Project Structure
```
src/
├── index.ts              # Entry point
├── server.ts             # Main MCP server implementation
├── utils/
│   └── validation.ts     # Zod validation schemas
└── constants.ts          # API methods and constants
```

### Testing
```bash
# Run the inspector tool for testing
npm run inspector

# Test server startup
node build/index.js
```

## Response Format

All tools return structured JSON data following this pattern:

```json
{
  "id": "request-id",
  "result": {
    "data": [
      {
        // Tool-specific data fields
      }
    ],
    "summary_info": {
      "page": 1,
      "total": 100,
      "left_lines": 999999
    }
  }
}
```

## Error Handling

The server provides comprehensive error handling:
- Input validation with detailed error messages
- API error responses with status codes
- Network timeout and retry logic
- Credit limit warnings

## Examples

### Analyze Blog Section Traffic
```typescript
// Get traffic statistics for all blog pages
const blogStats = await getSummaryTraffic({
  se: "g_us",
  domain: "techblog.com",
  urlContains: "/blog/"
});
```

### Find Product Page Competitors
```typescript
// Identify competitors for a specific product page
const competitors = await getUrlCompetitors({
  se: "g_us", 
  url: "https://ecommerce.com/product/awesome-widget",
  size: 20
});
```

### Discover Content Gaps
```typescript
// Find keywords competitors rank for but you don't
const missingKeywords = await getUrlMissingKeywords({
  se: "g_us",
  url: "https://yoursite.com",
  filters: {
    cost_from: 1.0,
    concurrency_from: 75
  }
});
```

## Requirements

- Node.js 18+
- Valid Serpstat API key
- MCP-compatible client (Claude, etc.)

## Support

For API documentation, visit the [Serpstat API Documentation](https://api.serpstat.com/v4/).

For issues related to this MCP server, please check the project repository.

---

**Author:** Benjamin Oldenburg  
**Date:** 2025-09-03  
**Version:** 0.1.0