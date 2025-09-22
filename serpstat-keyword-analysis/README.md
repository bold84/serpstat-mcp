# Serpstat Keyword Analysis MCP Server

A comprehensive Model Context Protocol (MCP) server for interacting with the Serpstat Keyword Analysis API. This server provides 12 different keyword analysis methods to help you with keyword research, competitor analysis, and content optimization.

## Features

- **Keyword Research**: Find keywords related to your target terms with volume, CPC, and competition data
- **Search Suggestions**: Get keyword suggestions to expand your research
- **Keyword Information**: Get detailed metrics for specific keywords including difficulty and intent
- **Related Keywords**: Discover semantically related terms for topical authority
- **Competitor Analysis**: Identify competitors for your target keywords
- **Top URLs**: Analyze top-ranking pages for keyword variations
- **Ad Keywords**: Analyze paid search competition and advertising opportunities
- **Export Capabilities**: Export data in various formats for large-scale analysis

## Installation

```bash
cd serpstat-keyword-analysis
npm install
npm run build
export SERPSTAT_API_KEY="your-api-key"
```

## Usage

### MCP Configuration

Configure in your MCP settings:

```json
{
  "mcpServers": {
    "serpstat-keyword-analysis": {
      "command": "npx",
      "args": ["serpstat-keyword-analysis"],
      "env": {
        "SERPSTAT_API_KEY": "your-serpstat-api-key"
      }
    }
  }
}
```

### Available Tools

#### Core Keyword Research

**getKeywords**
Get keywords related to a specific keyword with volume, CPC, competition, and difficulty data.

```json
{
  "name": "getKeywords",
  "arguments": {
    "keyword": "iphone",
    "se": "g_us",
    "withIntents": true,
    "filters": {
      "region_queries_count_from": 100000
    },
    "size": 10
  }
}
```

**getSuggestions**
Get search suggestions for a keyword using full-text search.

```json
{
  "name": "getSuggestions", 
  "arguments": {
    "keyword": "social security administration",
    "se": "g_us",
    "size": 5
  }
}
```

**getKeywordsInfo**
Get detailed information about specific keywords including volume and difficulty.

```json
{
  "name": "getKeywordsInfo",
  "arguments": {
    "keywords": ["iphone", "iphone 11"],
    "se": "g_us",
    "withIntents": true
  }
}
```

**getRelatedKeywords**
Get related keywords for semantic analysis and content expansion.

```json
{
  "name": "getRelatedKeywords",
  "arguments": {
    "keyword": "content marketing",
    "se": "g_us",
    "size": 15
  }
}
```

#### Analysis Tools

**getTopUrls**
Get top URLs ranking for keyword variations.

```json
{
  "name": "getTopUrls",
  "arguments": {
    "keyword": "best laptops",
    "se": "g_us",
    "size": 10
  }
}
```

**getCompetitors**
Get competitors for specific keywords.

```json
{
  "name": "getCompetitors",
  "arguments": {
    "keyword": "running shoes",
    "se": "g_us",
    "size": 20
  }
}
```

#### Paid Search Analysis

**getAdKeywords**
Get ad keywords for specific keywords.

```json
{
  "name": "getAdKeywords",
  "arguments": {
    "keyword": "insurance",
    "se": "g_us",
    "size": 15
  }
}
```

**getAdsCompetitors**
Get ads competitors for specific keywords.

```json
{
  "name": "getAdsCompetitors",
  "arguments": {
    "keyword": "mortgage rates",
    "se": "g_us",
    "size": 10
  }
}
```

#### Performance Analysis

**getKeywordTop**
Get keyword performance in top positions.

```json
{
  "name": "getKeywordTop",
  "arguments": {
    "keyword": "digital marketing",
    "se": "g_us",
    "size": 20
  }
}
```

**getKeywordFullTop**
Get full keyword performance data.

```json
{
  "name": "getKeywordFullTop",
  "arguments": {
    "keyword": "seo services",
    "se": "g_us",
    "size": 50
  }
}
```

#### Export Functions

**exportKeywordsPhrase**
Export keywords data in various formats.

```json
{
  "name": "exportKeywordsPhrase",
  "arguments": {
    "keyword": "content marketing",
    "se": "g_us",
    "size": 1000
  }
}
```

**exportSuggestions**
Export suggestions data in various formats.

```json
{
  "name": "exportSuggestions",
  "arguments": {
    "keyword": "social media marketing",
    "se": "g_us",
    "size": 500
  }
}
```

## Common Parameters

### Search Engine Codes

- `g_us` - Google United States
- `g_uk` - Google United Kingdom  
- `g_de` - Google Germany
- `g_ca` - Google Canada
- `g_au` - Google Australia
- `bing_us` - Bing United States
- 200+ Google variants supported

### Filtering

All tools support advanced filtering:

```json
{
  "filters": {
    "cost_from": 1,
    "cost_to": 10,
    "concurrency_from": 50,
    "region_queries_count_from": 10000,
    "difficulty_from": 30,
    "difficulty_to": 70,
    "minus_keywords": ["free", "cheap"]
  }
}
```

### Sorting

Sort results by any field:

```json
{
  "sort": {
    "region_queries_count": "desc",
    "cost": "asc"
  }
}
```

## API Credits

- **Cost**: 1 credit per result row for most methods
- **Maximum results**: 60,000 rows per request
- **Rate limits**: 1 request per second (standard), 10 requests per second (top-tier)

## Response Format

All responses follow this structure:

```json
{
  "result": {
    "data": [
      {
        "keyword": "example keyword",
        "cost": 1.25,
        "concurrency": 85,
        "found_results": 4500000,
        "region_queries_count": 12000,
        "difficulty": 45,
        "types": ["also_asks", "related_search"],
        "intents": ["informational"]
      }
    ],
    "summary_info": {
      "page": 1,
      "total": 150,
      "left_lines": 999850
    }
  }
}
```

## Development

```bash
# Development with watch mode
npm run dev

# Type checking
npm run build:ts

# Run MCP inspector for testing
npm run inspector
```

## Requirements

- Node.js 18 or higher
- Valid Serpstat API key
- Model Context Protocol compatible client

## Examples

### Keyword Research Workflow

1. **Start with broad keywords**:
   ```json
   {
     "name": "getKeywords",
     "arguments": {
       "keyword": "digital marketing",
       "se": "g_us",
       "withIntents": true,
       "size": 50
     }
   }
   ```

2. **Get detailed metrics**:
   ```json
   {
     "name": "getKeywordsInfo", 
     "arguments": {
       "keywords": ["content marketing", "seo services", "social media marketing"],
       "se": "g_us",
       "withIntents": true
     }
   }
   ```

3. **Find related terms**:
   ```json
   {
     "name": "getRelatedKeywords",
     "arguments": {
       "keyword": "content marketing",
       "se": "g_us",
       "size": 30
     }
   }
   ```

4. **Analyze competitors**:
   ```json
   {
     "name": "getCompetitors",
     "arguments": {
       "keyword": "content marketing strategy",
       "se": "g_us",
       "size": 20
     }
   }
   ```

### Content Strategy Development

1. **Find top-performing content**:
   ```json
   {
     "name": "getTopUrls",
     "arguments": {
       "keyword": "beginner guitar lessons",
       "se": "g_us",
       "size": 15
     }
   }
   ```

2. **Get content suggestions**:
   ```json
   {
     "name": "getSuggestions",
     "arguments": {
       "keyword": "how to play guitar",
       "se": "g_us",
       "size": 25
     }
   }
   ```

## Error Handling

The server provides comprehensive error handling:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or expired"
  }
}
```

Common error codes:
- `INVALID_API_KEY` - Invalid or expired API key
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INVALID_PARAMETERS` - Missing or invalid parameters
- `INSUFFICIENT_CREDITS` - Not enough API credits

## Credit Management

Monitor your credit usage:

```json
{
  "result": {
    "summary_info": {
      "left_lines": 999850
    }
  }
}
```

Each result row consumes 1 credit. Plan your requests accordingly to stay within your plan limits.

## Tips for Effective Usage

1. **Start broad, then narrow down**: Begin with general keywords, then use filters to refine
2. **Use intent analysis**: Enable `withIntents` for US and UK databases to understand user intent
3. **Leverage filters**: Use cost, difficulty, and volume filters to find valuable keywords
4. **Combine with domain analysis**: Use keyword insights to inform your domain analysis strategy
5. **Export for large datasets**: Use export functions for comprehensive analysis
6. **Monitor credit usage**: Keep track of remaining credits to avoid interruptions

## Integration with Other Serpstat MCP Servers

This keyword analysis server works seamlessly with:

- **serpstat-domain-analysis**: Use keyword insights to analyze domain performance
- **serpstat-team-management**: Manage team access to keyword research tools

## Support

For API documentation and support:
- [Serpstat API Documentation](https://serpstat.com/api/)
- [MCP Documentation](https://modelcontextprotocol.io/)
- Report issues in the GitHub repository

---

*Author: Benjamin Oldenburg*  
*Date: 2025-09-03*