# Serpstat Domain Analysis MCP Server

A comprehensive Model Context Protocol (MCP) server for Serpstat Domain Analysis API, providing access to 15 different domain analysis methods with advanced filtering, pagination, and validation.

## Features

- **15 Domain Analysis Methods**: Complete coverage of Serpstat's domain analysis API
- **Advanced Filtering**: Support for complex filtering by position, traffic, competition, and keyword volume
- **Pagination**: Built-in pagination support for large datasets
- **TypeScript**: Full type safety with comprehensive validation schemas
- **Error Handling**: Robust error handling with retry logic
- **Search Engine Support**: Support for all major search engines (Google, Bing, etc.)
- **Credit Management**: Automatic credit calculation and usage tracking

## Installation

### Prerequisites

- Node.js 18 or higher
- A valid Serpstat API key
- Model Context Protocol compatible client (e.g., Claude Desktop, MCP Inspector)

### Setup

1. Install the package:
```bash
npm install
```

2. Set up your Serpstat API key:
```bash
export SERPSTAT_API_KEY=your_api_key_here
```

3. Build the project:
```bash
npm run build
```

## Usage

### Starting the Server

```bash
# Start with stdio transport
npm start

# Or for development with watch mode
npm run dev
```

### Using with MCP Inspector

```bash
npx @modelcontextprotocol/inspector build/index.js
```

### Available Tools

#### Core Domain Analysis

1. **getDomainsInfo**
   - Get basic domain information including domain name, domain ID, and keyword count
   - Parameters: `query`, `search_engine`, `dataset`, `page`, `size`, `sort`, `order`

2. **getDomainKeywords**
   - Get keywords for a specific domain with advanced filtering options
   - Parameters: `query`, `keyword_type`, `se_position_from/to`, `traffic_from/to`, `competition`, `keyword_volume_from/to`, `keyword`, etc.

3. **getAdKeywords**
   - Get advertising keywords for a specific domain with paid search analysis
   - Parameters: All keyword parameters plus advertising-specific filters like `ad_position_from/to`, `ad_traffic_from/to`, `ad_competition`

#### Competitor Analysis

4. **getCompetitors** (Deprecated)
   - Get competitors for a domain (deprecated but still available)
   - Parameters: Similar to getDomainKeywords with competitor-specific filters

5. **getAdsCompetitors**
   - Get paid search competitors for a domain
   - Parameters: Advanced competitor analysis with advertising data

6. **getOrganicCompetitorsPage**
   - Get organic search competitors for a domain
   - Parameters: Focused on organic search competitor analysis

#### Traffic & Performance

7. **getTopUrls**
   - Get top-performing URLs for a domain
   - Parameters: Sort by organic keywords, Facebook shares, or potential traffic

8. **getDomainUrls**
   - Get URLs associated with a domain and their keyword information
   - Parameters: Comprehensive URL-level analysis

9. **getDomainsHistory**
   - Get historical data for a domain over time
   - Parameters: `days`, `date_from`, `date_to` for historical analysis

#### Multi-Domain Analysis

10. **getDomainsIntersection**
    - Find intersection of keywords between multiple domains
    - Parameters: `domain_list` (array of domains) with all keyword filters

11. **getDomainsUniqKeywords**
    - Get unique keywords across multiple domains
    - Parameters: Similar to intersection but for unique keyword analysis

#### Regional Analysis

12. **getAllRegionsTraffic**
    - Get traffic data for all regions for a domain
    - Parameters: `region`, `country_name_en`, `google_domain`, `traff_from/to`

13. **getRegionsCount**
    - Get database/region statistics for a domain
    - Parameters: Basic domain and search engine info

#### Data Export

14. **exportPositions**
    - Export position data to CSV format
    - Parameters: All keyword filters with `limit` parameter for export size

## API Reference

### Search Engines

The server supports Google country variants and Bing. Common values include:
- `g_us` - Google United States
- `g_uk` - Google United Kingdom
- `g_de` - Google Germany
- `bing_us` - Bing United States
- Full list available in constants.ts (200+ Google variants + 1 Bing variant)

### Common Parameters

#### Filtering
- `se_position_from`, `se_position_to`: Search engine position range
- `traffic_from`, `traff_to`: Traffic volume range
- `keyword_volume_from`, `keyword_volume_to`: Keyword volume range
- `competition`: 'low', 'medium', 'high'

#### Pagination
- `page`: Page number (default: 1)
- `size`: Results per page (default: 100, max: 1000)

#### Sorting
- `sort`: Field to sort by
- `order`: 'asc' or 'desc' (default: 'desc')

### Credit Usage

Each API call consumes credits based on:
- Method type
- Number of results requested
- Export size (for exportPositions)

Example credit calculations:
- `getDomainsInfo`: 5 credits
- `getDomainKeywords`: 1 credit per result
- `exportPositions`: 1 credit per row exported

## Configuration

### Environment Variables

- `SERPSTAT_API_KEY`: Your Serpstat API key (required)

### Build Configuration

The project uses esbuild for fast compilation:

```json
{
  "scripts": {
    "build": "node esbuild.config.js",
    "build:ts": "tsc && node -e \"require('fs').chmodSync('build/index.js', '755')\"",
    "dev": "node esbuild.config.js --watch",
    "start": "node build/index.js"
  }
}
```

## Development

### Project Structure

```
serpstat-domain-analysis/
├── src/
│   ├── constants.ts          # Search engines and API constants
│   ├── index.ts             # Main entry point
│   ├── server.ts            # MCP server implementation
│   ├── utils/
│   │   ├── api-client.ts     # API client with error handling
│   │   └── validation.ts     # Zod validation schemas
├── esbuild.config.js        # Build configuration
├── package.json
└── README.md
```

### Adding New Methods

1. Add validation schema in `src/utils/validation.ts`
2. Add tool definition in `src/server.ts`
3. Implement method handler in `src/server.ts`
4. Update constants if needed

### Testing

```bash
# Build the project
npm run build

# Test with MCP Inspector
npx @modelcontextprotocol/inspector build/index.js
```

## Error Handling

The server provides comprehensive error handling:

- **Validation Errors**: Clear error messages for invalid parameters
- **API Errors**: Serpstat API errors with proper HTTP status codes
- **Network Errors**: Retry logic with exponential backoff
- **Credit Errors**: Clear indication when credits are insufficient

## Examples

### Basic Domain Information

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

### Advanced Keyword Analysis

```json
{
  "name": "getDomainKeywords",
  "arguments": {
    "query": "example.com",
    "search_engine": "g_us",
    "keyword_type": "organic",
    "se_position_from": 1,
    "se_position_to": 10,
    "traffic_from": 100,
    "competition": "medium",
    "size": 50
  }
}
```

### Multi-Domain Comparison

```json
{
  "name": "getDomainsIntersection",
  "arguments": {
    "query": "example.com",
    "domain_list": ["competitor1.com", "competitor2.com"],
    "keyword_type": "all",
    "size": 100
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all builds pass
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the [Serpstat API documentation](https://serpstat.com/api/)
- Review the error messages for specific guidance
- Ensure your API key has sufficient credits

## Changelog

### v0.1.0
- Initial release with 15 domain analysis methods
- Full TypeScript support with validation
- Comprehensive error handling and retry logic
- Build configuration with esbuild
- Docker support included