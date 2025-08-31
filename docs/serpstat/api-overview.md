
# SerpStat API Overview

## Available API Endpoints

Based on the extracted documentation, the SerpStat API provides access to the following main functional areas:

### 1. Domain Analysis API
- **Purpose**: Various data about domain SEO stats
- **Status**: Documentation available
- **Documentation File**: [`domain-analysis-api/05-domain-analysis-api.md`](domain-analysis-api/05-domain-analysis-api.md)

### 2. Keyword Analysis API
- **Purpose**: Keyword selection, synonyms, suggestions
- **Status**: Partial documentation (loading content extracted)
- **Documentation File**: [`keyword-analysis-api/06-keyword-analysis-api.md`](keyword-analysis-api/06-keyword-analysis-api.md)

### 3. URL Analysis API
- **Purpose**: SEO stats for specific URLs or paths of the website
- **Status**: Partial documentation (loading content extracted)
- **Documentation File**: [`url-analysis-api/07-url-analysis-api.md`](url-analysis-api/07-url-analysis-api.md)

### 4. Backlinks API
- **Purpose**: Backlinks, External Links, Referring domains and Domain stats
- **Status**: ✅ Complete documentation
- **Documentation File**: [`backlinks-api/03-backlinks-api.md`](backlinks-api/03-backlinks-api.md)

### 5. Domain Classification API
- **Purpose**: Classify your domain listings by the most common categories used by Google
- **Status**: Documentation available
- **Documentation File**: [`domain-classification-api/08-domain-classification-api.md`](domain-classification-api/08-domain-classification-api.md)

### 6. Site Audit API
- **Purpose**: Scan your website for common SEO errors
- **Status**: ✅ Complete documentation
- **Documentation File**: [`audit-api/02-audit-api.md`](audit-api/02-audit-api.md)

### 7. Rank Tracker API
- **Purpose**: Track the ranks of your website's keywords
- **Status**: Documentation available
- **Documentation File**: [`rank-tracker-api/09-rank-tracker-api.md`](rank-tracker-api/09-rank-tracker-api.md)

### 8. Project Management API
- **Purpose**: Manage your projects
- **Status**: Documentation available
- **Documentation File**: [`project-management-api/10-project-management-api.md`](project-management-api/10-project-management-api.md)

### 9. Team Management API
- **Purpose**: Manage your team directly
- **Status**: Documentation available
- **Documentation File**: [`team-management-api/11-team-management-api.md`](team-management-api/11-team-management-api.md)

### 10. SERP Crawling API
- **Purpose**: Crawl SERPs through API with AI overview scrapping
- **Status**: Documentation available
- **Documentation File**: [`serp-crawling-api/12-serp-crawling-api.md`](serp-crawling-api/12-serp-crawling-api.md)

### 11. Keyword Volume Checker API
- **Purpose**: Set up the keyword volume scanning through API
- **Status**: Documentation available
- **Documentation File**: [`keyword-volume-checker-api/13-keyword-volume-checker-api.md`](keyword-volume-checker-api/13-keyword-volume-checker-api.md)

### 12. Credits API
- **Purpose**: Stats about your API credits usage
- **Status**: Documentation available
- **Documentation File**: [`credits-api/14-credits-api.md`](credits-api/14-credits-api.md)

## Technical Specifications

### API Base Information
- **Base URL**: `https://api.serpstat.com/v4`
- **Protocol**: JSON-RPC 2.0
- **Authentication**: API token required
- **HTTP Method**: POST
- **Request Format**: JSON
- **Response Format**: JSON

### Rate Limits & Usage
- **Default Rate Limit**: 1 request per second
- **Top-tier Rate Limit**: 10 requests per second
- **Maximum Results per Method**: 60,000 rows
- **Pagination**: Available (size max 1000, page parameter)
- **Authentication**: API token required in all requests

### Common Parameters
- `token`: API authentication token
- `method`: API method name (case-sensitive)
- `size`: Results per page (default 100, max 1000)
- `page`: Page number for pagination
- `filters`: Method-specific filtering options

## Documentation Status

✅ **Complete**: Audit API, Backlinks API
📋 **Available**: Domain Analysis, Keyword Analysis, URL Analysis, Domain Classification, Rank Tracker, Project Management, Team Management, SERP Crawling, Keyword Volume Checker, Credits API
⚠️ **Partial**: Keyword Analysis API, URL Analysis API (loading content extracted)

## Next Steps

1. Extract complete documentation for partial APIs
2. Create individual files for each API endpoint
3. Add code examples and usage patterns
4. Include authentication and error handling examples