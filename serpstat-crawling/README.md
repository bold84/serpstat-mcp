# Serpstat SERP Crawling MCP Server

A Model Context Protocol (MCP) server for the Serpstat SERP Crawling API, providing comprehensive SERP crawling capabilities with AI overview support.

## Features

This MCP server provides 6 tools for SERP crawling and task management:

### Core Crawling Operations
- **addTask**: Add single keyword tasks for SERP crawling (consumes credits)
- **addKeywordList**: Add multiple keywords as array for batch crawling (consumes credits)
- **getTaskResult**: Retrieve comprehensive SERP results including organic results, ads, local packs, and AI overview
- **getKeywordSerp**: Get raw HTML SERP for specific keyword analysis

### Management & Monitoring
- **getList**: Get task list for the last 7 days with progress tracking
- **getParsingBalance**: Check account balance and parsing costs

## Installation

# No installation required! Run directly with npx:
npx serpstat-crawling

# Or install globally if preferred:
npm install -g serpstat-crawling

# Set your API key:
export SERPSTAT_TOKEN="your-api-token"

## Usage

### MCP Configuration
Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "serpstat-crawling": {
      "command": "npx",
      "args": ["serpstat-crawling"],
      "env": {
        "SERPSTAT_TOKEN": "your-api-token"
      }
    }
  }
}
```

### Environment Variables
- `SERPSTAT_API_KEY`: Your Serpstat API token (required for SERP Crawling API)

### Building
```bash
npm run build
```

### Running
```bash
npm start
```

## API Methods

### addTask
Add a single keyword task for SERP crawling.

**Parameters:**
- `keywords` (required): Keywords for parsing divided by commas
- `seId` (required): Search engine identifier (1=Google, 2=Bing, 3=Yandex)
- `countryId` (required): Country identifier (1-247)
- `regionId` (optional): Region or city identifier
- `langId` (optional): Language identifier (default: 1=English)
- `typeId` (optional): Device type identifier (1=Desktop, 2=Mobile, default: 1)
- `type` (optional): Result type - "regular", "local", "regular_aio" (default: "regular")

**Returns:** Task ID and blocked keywords information.

**Credits:** Consumes separate crawling credits

### addKeywordList
Add multiple keywords as array for batch SERP crawling.

**Parameters:**
- `keywords` (required): Array of keyword strings with commas
- `seId` (required): Search engine identifier
- `countryId` (required): Country identifier (1-247)
- `regionId` (optional): Region or city identifier
- `langId` (optional): Language identifier (default: 1=English)
- `typeId` (optional): Device type identifier (default: 1)
- `type` (optional): Result type (default: "regular")

**Returns:** Task ID and blocked keywords information.

**Credits:** Consumes separate crawling credits

### getList
Get list of crawling tasks for the last 7 days.

**Parameters:**
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Results per page (100-1000)

**Returns:** Task list with progress, creation time, and completion status.

**Credits:** No API credits consumed

### getParsingBalance
Get account balance for SERP and volume parsing services.

**Parameters:** None

**Returns:** Available balance, SERP parsing cost, and volume parsing cost.

**Credits:** No API credits consumed

### getTaskResult
Get SERP crawling results using task ID.

**Parameters:**
- `taskId` (required): Crawling task identifier
- `page` (optional): Page number for pagination (default: 1)

**Returns:** Comprehensive SERP data including organic results, ads, local packs, AI overview, and other SERP features.

**Credits:** No API credits consumed

### getKeywordSerp
Get raw HTML SERP for a specific keyword.

**Parameters:**
- `taskId` (required): Crawling task identifier
- `keywordId` (required): Keyword identifier from getTaskResult

**Returns:** Raw HTML SERP data with date information.

**Credits:** No API credits consumed

## API Credits

### Separate Billing
**Important:** This API has separate billing and credits must be purchased separately. Credits are not included in any subscription plan, but uses the same SERPSTAT_API_KEY environment variable for authentication.

- **addTask**: Consumes crawling credits (1 per keyword)
- **addKeywordList**: Consumes crawling credits (1 per keyword in array)
- **getList**: No API credits consumed
- **getParsingBalance**: No API credits consumed
- **getTaskResult**: No API credits consumed
- **getKeywordSerp**: No API credits consumed

### AI Overview
Google AI Overview results are currently included at no additional cost but will become a separate optional parameter (`type=regular_aio`) starting August 1, 2025.

## Examples

### Add Single Keyword Task
```json
{
  "name": "addTask",
  "arguments": {
    "keywords": "iphone, samsung, best phone",
    "seId": 1,
    "countryId": 23,
    "regionId": 21176,
    "langId": 1,
    "typeId": 1,
    "type": "regular"
  }
}
```

### Add Multiple Keywords as Array
```json
{
  "name": "addKeywordList",
  "arguments": {
    "keywords": ["iphone, samsung", "nike, adidas", "best laptop, gaming pc"],
    "seId": 1,
    "countryId": 23,
    "regionId": 21176,
    "langId": 1,
    "typeId": 1,
    "type": "regular_aio"
  }
}
```

### Get Task Results
```json
{
  "name": "getTaskResult",
  "arguments": {
    "taskId": 5484945,
    "page": 1
  }
}
```

### Check Account Balance
```json
{
  "name": "getParsingBalance",
  "arguments": {}
}
```

### Get Task List
```json
{
  "name": "getList",
  "arguments": {
    "page": 1,
    "pageSize": 100
  }
}
```

### Get Raw HTML SERP
```json
{
  "name": "getKeywordSerp",
  "arguments": {
    "taskId": 5484945,
    "keywordId": 706657334
  }
}
```

## Search Engines

- **Google (seId: 1)**: Default search engine
- **Bing (seId: 2)**: Microsoft search engine
- **Yandex (seId: 3)**: Russian search engine

## Device Types

- **Desktop (typeId: 1)**: Desktop computer results
- **Mobile (typeId: 2)**: Mobile phone results

## Result Types

- **regular**: Standard organic SERP results
- **local**: Local business results with maps
- **regular_aio**: Regular results with AI Overview (becomes paid Aug 1, 2025)

## Important Notes

### Separate Billing
This API uses separate billing from other Serpstat APIs. Credits must be purchased specifically for SERP crawling, but authentication uses the same SERPSTAT_API_KEY environment variable.

### Task Time Range
The `getList` method only returns tasks from the last 7 days.

### AI Overview Changes
Starting August 1, 2025, AI Overview data will become a separate paid parameter. Plan your usage accordingly.

### Rate Limits
- Standard plans: 1 request per second
- Premium plans: Up to 10 requests per second

### Task Progress Monitoring
Use the `getList` method to monitor task completion progress (0% to 100%).

## Technical Details

- Built with TypeScript and Zod for type safety
- Uses Model Context Protocol (MCP) for AI assistant integration
- Follows JSON-RPC 2.0 protocol for Serpstat API communication
- Comprehensive input validation with detailed error messages
- Supports pagination for large result sets
- ES module support for modern Node.js environments
- Uses separate API endpoint (v2) for SERP crawling

## Error Handling

The server provides detailed error messages for:
- Invalid parameter formats
- Missing required parameters
- Insufficient crawling credits
- Task not found errors
- Authentication issues

## Author

Benjamin Oldenburg

## License

MIT