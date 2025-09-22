# Serpstat Backlinks MCP Server

A comprehensive Model Context Protocol (MCP) server for Serpstat backlinks analysis, providing 21 different analysis methods for complete backlink intelligence and competitive analysis.

## Features

This MCP server provides access to the complete Serpstat Backlinks API, including:

### Core Analysis Tools
- **getRefDomains** - Analyze referring domains with domain rank and authority metrics
- **getNewBacklinks** - Track newly acquired backlinks for growth monitoring
- **getLostBacklinks** - Identify lost backlinks for link retention strategies
- **getOutlinks** - Analyze external links pointing from your domain

### Advanced Analysis
- **getAnchors** - Comprehensive anchor text analysis for SEO optimization
- **getTopPages** - Identify highest-performing pages by backlink count
- **getTopAnchors** - Analyze most frequently used anchor texts
- **getIntersect** - Find competitor backlink intersections for opportunity discovery
- **getIntersectSummary** - Get summary statistics for intersecting backlinks

### Domain Intelligence
- **getRedirectedDomains** - Analyze domain redirection patterns
- **getDistributionSdr** - Domain Rating (SDR) distribution analysis
- **getDistributionTld** - Top-level domain distribution insights

### Security & Risk Management
- **getThreats** - Identify malicious domains referring to your site
- **getThreatsLinks** - Analyze specific threatening backlinks
- **getOutThreats** - Detect external threat links from your domain
- **getOutThreatsLinks** - Analyze specific external threat links

### Historical Analysis
- **getBacklinksChangesHistory** - Track historical backlink changes over time

### Outbound Analysis
- **getOutDomains** - Analyze external domains you link to
- **getLostOutlinks** - Track lost external links from your domain

## Installation

# No installation required! Run directly with npx:
npx serpstat-backlinks

# Or install globally if preferred:
npm install -g serpstat-backlinks

# Set your API key:
export SERPSTAT_API_KEY="your-serpstat-api-key"

## Configuration

### MCP Settings

Configure the server in your MCP client settings:

```json
{
  "mcpServers": {
    "serpstat-backlinks": {
      "command": "npx",
      "args": ["serpstat-backlinks"],
      "env": {
        "SERPSTAT_API_KEY": "your-serpstat-api-key"
      }
    }
  }
}
```

### Environment Variables

- **SERPSTAT_API_KEY**: Your Serpstat API token (required)

## Usage Examples

### Analyze Referring Domains
```typescript
// Get top referring domains for a domain
const refDomains = await getRefDomains({
  query: "example.com",
  searchType: "domain_with_subdomains",
  sort: "domain_rank",
  order: "desc",
  size: 100
});
```

### Find New Backlinks
```typescript
// Get recently acquired backlinks
const newBacklinks = await getNewBacklinks({
  query: "example.com",
  sort: "check",
  order: "desc",
  size: 50
});
```

### Analyze Anchor Text
```typescript
// Analyze anchor text distribution
const anchors = await getAnchors({
  query: "example.com",
  sort: "total",
  order: "desc",
  size: 100
});
```

### Competitor Intersection Analysis
```typescript
// Find backlinks shared with competitors
const intersection = await getIntersect({
  query: "example.com",
  intersect: ["competitor1.com", "competitor2.com"],
  sort: "links_count1",
  order: "desc"
});
```

### Complex Filtering
```typescript
// Advanced filtering with AND/OR logic
const filteredResults = await getRefDomains({
  query: "example.com",
  complexFilter: [
    [
      { field: "domain_rank", compareType: "gte", value: [50] },
      { field: "domain_links", compareType: "lte", value: [100] }
    ]
  ]
});
```

## API Reference

### Common Parameters

#### Base Parameters
- **query** (string, required): Domain name to analyze
- **searchType** (enum): Search mode (`domain` or `domain_with_subdomains`)

#### Pagination
- **page** (number, optional): Page number (default: 1)
- **size** (number, optional): Results per page (default: 100, max: 1000)

#### Sorting
- **sort** (string, optional): Field to sort by
- **order** (enum): Sort order (`asc` or `desc`)

#### Complex Filtering
- **complexFilter** (array): Advanced filtering with AND/OR logic
  - First level: OR conditions
  - Second level: AND conditions
  - Supported compare types: `contains`, `notContains`, `eq`, `neq`, `gte`, `lte`, `gt`, `lt`, `between`

### Available Tools

#### Core Analysis
- **getRefDomains**: Analyze referring domains with domain rank and authority
- **getNewBacklinks**: Track newly acquired backlinks
- **getLostBacklinks**: Identify lost backlinks
- **getOutlinks**: Analyze external links from your domain

#### Content & Anchor Analysis
- **getAnchors**: Analyze anchor text distribution
- **getTopPages**: Identify top pages by backlink count
- **getTopAnchors**: Get most frequent anchor texts

#### Competitive Intelligence
- **getIntersect**: Find competitor backlink intersections
- **getIntersectSummary**: Get intersection summary statistics

#### Domain Analysis
- **getRedirectedDomains**: Analyze domain redirections
- **getDistributionSdr**: Domain Rating distribution
- **getDistributionTld**: TLD distribution analysis

#### Security & Risk
- **getThreats**: Identify malicious referring domains
- **getThreatsLinks**: Analyze threatening backlinks
- **getOutThreats**: Detect external threat links
- **getOutThreatsLinks**: Analyze specific external threats

#### Historical Analysis
- **getBacklinksChangesHistory**: Track backlink changes over time

#### Outbound Analysis
- **getOutDomains**: Analyze external domains you link to
- **getLostOutlinks**: Track lost external links

## Search Engines

All major search engines are supported:
- Google variants: `g_us`, `g_uk`, `g_de`, `g_fr`, etc.
- Bing variants: `bing_us`, `bing_uk`, etc.
- Yandex variants: `yandex_ru`, etc.
- 200+ search engine options available

## API Credits

Most backlinks API methods consume **1 credit per result** returned. The API supports:
- Up to 1000 results per page
- Up to 60,000 total results per query
- Complex filtering doesn't consume extra credits

## Development

### Project Structure
```
serpstat-backlinks/
├── src/
│   ├── index.ts           # Entry point
│   ├── server.ts          # Main MCP server implementation
│   ├── constants.ts       # API methods and configuration
│   └── utils/
│       └── validation.ts  # Zod validation schemas
├── build/                 # Compiled output
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── esbuild.config.js     # Build configuration
```

### Building
```bash
npm run build
```

### Type Checking
```bash
npx tsc --noEmit
```

### Development
```bash
npm run dev
```

## Error Handling

The server provides comprehensive error handling:
- Input validation with detailed error messages
- API rate limiting and retry logic
- Network timeout handling
- Credit usage monitoring
- Detailed error responses with actionable feedback

## Best Practices

1. **Pagination**: Use appropriate page sizes to balance performance and data completeness
2. **Filtering**: Apply complex filters early to reduce API credit usage
3. **Caching**: Cache results locally when possible to minimize API calls
4. **Rate Limits**: Respect API rate limits to avoid service interruptions
5. **Error Handling**: Implement proper error handling in your client applications

## Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clean build
rm -rf build/ node_modules/
npm install
npm run build
```

**TypeScript Errors**
```bash
# Check types
npx tsc --noEmit
```

**API Issues**
- Verify API key is valid and has sufficient credits
- Check domain format and spelling
- Ensure search engine code is correct
- Review complex filter syntax

## Support

For issues related to:
- **API Usage**: Consult Serpstat API documentation
- **MCP Integration**: Check MCP client documentation
- **Server Implementation**: Review this README and source code
- **Bug Reports**: Create an issue in the project repository

## License

This project is part of the Serpstat MCP servers collection.

## Author

Benjamin Oldenburg  
Date: 2025-09-03

---

**Note**: This server provides access to the complete Serpstat Backlinks API with all 21 analysis methods. Ensure you have appropriate API credits and permissions before use.