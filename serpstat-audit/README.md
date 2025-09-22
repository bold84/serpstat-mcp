# Serpstat Site Audit MCP Server

A comprehensive Model Context Protocol (MCP) server for Serpstat Site Audit API, providing 15 different analysis methods for complete technical SEO and website health monitoring.

## Features

This MCP server provides access to the complete Serpstat Site Audit API, including:

### Audit Management
- **start** - Initiate automated website scanning and technical SEO analysis
- **stop** - Halt ongoing audit processes and manage resources
- **getList** - Manage and monitor multiple audit projects centrally

### Audit Analysis & Reporting
- **getBasicInfo** - Quick website health assessment with SDO score and error summary
- **getErrorElements** - Detailed technical SEO error analysis with filtering and pagination
- **getCategoriesStatistic** - Comprehensive breakdown of issues by category
- **getReportWithoutDetails** - Summary-level audit information for quick overviews
- **getSubElementsByCrc** - Drill down into specific error groups for detailed analysis
- **getScanUserUrlList** - Review all URLs included in the audit scan

### Configuration & Settings
- **getSettings** - Retrieve current audit configuration and parameters
- **setSettings** - Configure comprehensive audit parameters and behavior
- **getDefaultSettings** - Get default configuration values for new projects

### Historical Analysis & Export
- **getHistoryByCountError** - Track technical SEO improvements and regressions over time
- **export** - Generate professional reports in multiple formats (CSV, XLSX, JSON)

## Installation

1. Navigate to the project directory:
```bash
cd serpstat-audit
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Set up your Serpstat API key:
```bash
export SERPSTAT_API_KEY="your-serpstat-api-key"
```

## Configuration

### MCP Settings

Configure the server in your MCP client settings:

```json
{
  "mcpServers": {
    "serpstat-audit": {
      "command": "npx",
      "args": ["serpstat-audit"],
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

### Start an Audit
```typescript
// Start scanning a website for technical SEO issues
const auditResult = await start({
  projectId: 12345
});
```

### Get Basic Audit Information
```typescript
// Get quick website health summary
const basicInfo = await getBasicInfo({
  reportId: 67890
});
```

### Analyze Technical SEO Errors
```typescript
// Get detailed errors with filtering
const errors = await getErrorElements({
  reportId: 67890,
  priority: "high",
  category: "indexing",
  page: 1,
  size: 100,
  sort: "priority",
  order: "desc"
});
```

### Configure Audit Settings
```typescript
// Configure comprehensive audit parameters
const settings = await setSettings({
  projectId: 12345,
  mainSettings: {
    domain: "example.com",
    name: "Example Site Audit",
    subdomainsCheck: true,
    pagesLimit: 5000,
    scanSpeed: 5,
    autoSpeed: true,
    scanDuration: 24,
    folderDepth: 5,
    urlDepth: 20,
    robotsTxt: true,
    withImages: false
  },
  mailTriggerSettings: {
    emails: ["seo@example.com"],
    interval: 7,
    enabled: true,
    enableExportAfterFinish: true
  }
});
```

### Export Audit Results
```typescript
// Generate professional audit report
const exportResult = await export({
  reportId: 67890,
  format: "xlsx",
  includeDetails: true,
  priority: "high"
});
```

### Track Historical Performance
```typescript
// Analyze technical SEO trends over time
const history = await getHistoryByCountError({
  projectId: 12345,
  dateFrom: "2024-01-01",
  dateTo: "2024-12-31",
  limit: 50
});
```

## API Reference

### Common Parameters

#### Project Management
- **projectId** (number, required): Unique identifier for an audit project
- **reportId** (number, required): Unique identifier for an audit report
- **scanId** (number, required): Unique identifier for a scan process

#### Pagination
- **page** (number, optional): Page number (default: 1)
- **size** (number, optional): Results per page (default: 100, max: 1000)

#### Sorting
- **sort** (string, optional): Field to sort by
- **order** (string, optional): Sort order (`asc` or `desc`)

#### Filtering
- **priority** (enum): Error priority (`high`, `medium`, `low`, `information`)
- **category** (enum): Error category (`indexing`, `content`, `links`, `images`, `structure`, `optimization`, `security`, `performance`, `mobile`, `other`)
- **pageUrl** (string): Filter by specific page URL

### Available Tools

#### Audit Management
- **start**: Initiate website scanning and technical SEO analysis
- **stop**: Halt ongoing audit processes
- **getList**: Manage audit projects with filtering and pagination

#### Core Analysis
- **getBasicInfo**: Quick health assessment with SDO score and error summary
- **getErrorElements**: Detailed error analysis with advanced filtering
- **getCategoriesStatistic**: Error breakdown by category
- **getReportWithoutDetails**: Summary-level audit information

#### Detailed Analysis
- **getSubElementsByCrc**: Drill down into specific error groups
- **getScanUserUrlList**: Review scanned URLs with filtering

#### Configuration
- **getSettings**: Retrieve current audit configuration
- **setSettings**: Configure comprehensive audit parameters
- **getDefaultSettings**: Get default configuration values

#### Historical & Export
- **getHistoryByCountError**: Track technical SEO trends over time
- **export**: Generate reports in multiple formats

## Error Categories

The audit API categorizes technical SEO issues into:

- **Indexing**: Problems with search engine crawling and indexing
- **Content**: Content quality and optimization issues
- **Links**: Internal and external link problems
- **Images**: Image optimization and accessibility issues
- **Structure**: Site structure and navigation problems
- **Optimization**: On-page SEO optimization issues
- **Security**: Security vulnerabilities and risks
- **Performance**: Page speed and performance issues
- **Mobile**: Mobile optimization and responsiveness
- **Other**: Miscellaneous technical issues

## Error Priority Levels

- **High**: Critical issues requiring immediate attention
- **Medium**: Important issues that should be addressed
- **Low**: Minor issues for long-term improvement
- **Information**: Recommendations and best practices

## Export Formats

- **CSV**: Comma-separated values for spreadsheet analysis
- **XLSX**: Excel format with advanced formatting
- **JSON**: Structured data format for integration

## API Credits

Most audit API methods consume **1 credit per request**. Some methods like `getBasicInfo` and `getCategoriesStatistic` consume **no credits**. The API supports:
- Up to 1000 results per page
- Advanced filtering and sorting
- Multiple export formats

## Development

### Project Structure
```
serpstat-audit/
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

1. **Audit Configuration**: Carefully configure scan parameters to balance depth and performance
2. **Error Prioritization**: Focus on high and medium priority errors first
3. **Regular Monitoring**: Schedule regular audits to track technical SEO health
4. **Export Management**: Use appropriate export formats for different use cases
5. **Historical Analysis**: Track trends over time to measure improvement

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
- Check project and report IDs are correct
- Ensure audit projects are properly configured
- Review complex configuration settings

### Audit Configuration Tips

- Start with conservative scan limits to avoid overwhelming servers
- Use appropriate scan speeds based on server capacity
- Configure email notifications for monitoring
- Set realistic page and folder depth limits
- Enable subdomain scanning for comprehensive analysis

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

**Note**: This server provides access to the complete Serpstat Site Audit API with all 15 analysis methods. Ensure you have appropriate API credits and permissions before use. The Site Audit API fills a critical gap in technical SEO analysis, making it an essential component of comprehensive SEO strategy.