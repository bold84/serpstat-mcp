# SerpStat API Guide for SEO Optimization

Based on the SerpStat API documentation, here are the most important APIs for optimizing your website to rank high in Google.

## Top APIs for SEO Optimization

### 1. **Domain Analysis API** - [`getDomainsInfo`](docs/serpstat/domain-analysis-api/get-domains-info.md:1)
**Why it's crucial:** Provides comprehensive SEO metrics for your domain and competitors, including:
- Keyword visibility and rankings
- Traffic estimates
- Keyword dynamics (new, lost, rising, falling keywords)
- Competition analysis

**Use case:** Understand your current SEO performance and identify areas for improvement.

**Cost:** 5 credits per domain

### 2. **Keyword Analysis API** - [`getKeywords`](docs/serpstat/keyword-analysis-api/get-keywords.md:1)
**Why it's crucial:** Essential for keyword research and optimization:
- Find keywords your competitors rank for
- Get search volume, CPC, and difficulty scores
- Analyze keyword intent and competition
- Discover related keywords and suggestions

**Use case:** Identify high-value keywords to target and optimize your content strategy.

**Cost:** 1 credit per result row

### 3. **URL Analysis API** - [`getSummaryTraffic`](docs/serpstat/url-analysis-api/get-summary-traffic.md:1)
**Why it's crucial:** Optimizes individual pages for better performance:
- Analyze traffic for specific URL patterns
- Identify which pages are performing well
- Optimize underperforming pages
- Track URL-specific keyword rankings

**Use case:** Optimize individual pages and content sections for maximum impact.

**Cost:** 1000 credits per parameter (traffic/keywords)

### 4. **Backlinks API** - [`getSummary`](docs/serpstat/backlinks-api/get-summary.md:1)
**Why it's crucial:** Critical for link building and domain authority:
- Analyze referring domains and backlinks
- Track dofollow vs nofollow links
- Monitor competitor link profiles
- Identify link building opportunities

**Use case:** Build a strong backlink profile and improve domain authority.

**Cost:** 5 credits per request

### 5. **Site Audit API** - [`start`](docs/serpstat/audit-api/start.md:1)
**Why it's crucial:** Ensures technical SEO health:
- Identify and fix technical errors
- Monitor crawlability issues
- Track site health over time
- Improve site performance

**Use case:** Maintain optimal technical SEO conditions for better crawling and indexing.

**Cost:** Varies based on scan size

### 6. **Rank Tracker API** - [`rank-tracker-api.md`](docs/serpstat/rank-tracker-api/rank-tracker-api.md:1)
**Why it's crucial:** Monitor keyword rankings over time:
- Track position changes for your target keywords
- Monitor competitor rankings
- Measure SEO campaign effectiveness
- Identify ranking opportunities

**Use case:** Track your progress and adjust strategies based on ranking data.

**Cost:** Varies based on tracking scope

### 7. **SERP Crawling API** - [`serp-crawling-api.md`](docs/serpstat/serp-crawling-api/serp-crawling-api.md:1)
**Why it's crucial:** Understand SERP features and opportunities:
- Analyze SERP features for your keywords
- Identify featured snippet opportunities
- Track SERP changes and updates
- Understand competitor SERP positions

**Use case:** Optimize content for featured snippets and other SERP features.

**Cost:** Varies based on crawling scope

## Recommended Implementation Strategy

### Phase 1: Foundation (High Priority)
1. **Domain Analysis API** - Establish baseline metrics
2. **Keyword Analysis API** - Identify target keywords
3. **Site Audit API** - Fix technical issues

### Phase 2: Optimization (Medium Priority)
4. **URL Analysis API** - Optimize individual pages
5. **Backlinks API** - Build authority
6. **Rank Tracker API** - Monitor progress

### Phase 3: Advanced Growth (Lower Priority)
7. **SERP Crawling API** - Capture SERP features

## Credit Cost Summary

| API | Cost per Request |
|-----|------------------|
| Domain Analysis | 5 credits per domain |
| Keyword Analysis | 1 credit per result row |
| URL Analysis | 1000 credits per parameter |
| Backlinks | 5 credits per request |
| Site Audit | Varies based on scan size |
| Rank Tracker | Varies based on tracking scope |
| SERP Crawling | Varies based on crawling scope |

## API Base Information

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

### Common Parameters
- `token`: API authentication token
- `method`: API method name (case-sensitive)
- `size`: Results per page (default 100, max 1000)
- `page`: Page number for pagination
- `filters`: Method-specific filtering options

## Next Steps

To implement these APIs effectively, you should:

1. **Start with Domain Analysis** to understand your current SEO position
2. **Use Keyword Analysis** to identify high-value keywords to target
3. **Conduct Site Audit** to fix any technical issues that could hurt rankings
4. **Implement monitoring** with Rank Tracker and Backlinks APIs to track progress

This comprehensive approach addresses all major Google ranking factors: technical SEO, content optimization, backlink authority, and SERP feature optimization.

---
*Generated from SerpStat API documentation analysis*