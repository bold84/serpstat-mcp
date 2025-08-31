/**
 * Example Usage of Serpstat Domain Analysis MCP Server
 * ====================================================
 *
 * This file demonstrates how to use the Serpstat Domain Analysis MCP Server
 * with various methods and parameters.
 */

// Example configuration
const SERPSTAT_API_KEY = process.env.SERPSTAT_API_KEY || 'your_api_key_here';

// Example 1: Basic Domain Information
const basicDomainExample = {
  name: 'getDomainsInfo',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    size: 10,
    sort: 'relevance',
    order: 'desc'
  }
};

// Example 2: Advanced Keyword Analysis with Filtering
const keywordAnalysisExample = {
  name: 'getDomainKeywords',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    keyword_type: 'organic',
    se_position_from: 1,
    se_position_to: 10,
    traffic_from: 100,
    traff_to: 1000,
    competition: 'medium',
    keyword_volume_from: 10,
    keyword_volume_to: 1000,
    size: 50,
    sort: 'relevance',
    order: 'desc'
  }
};

// Example 3: Advertising Keywords Analysis
const adKeywordsExample = {
  name: 'getAdKeywords',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    keyword_type: 'paid',
    ad_position_from: 1,
    ad_position_to: 5,
    ad_traffic_from: 50,
    ad_traff_to: 500,
    ad_competition: 'high',
    size: 30,
    sort: 'relevance',
    order: 'desc'
  }
};

// Example 4: Competitor Analysis
const competitorsExample = {
  name: 'getAdsCompetitors',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    competitor_type: 'all',
    se_position_from: 1,
    se_position_to: 20,
    traffic_from: 10,
    traff_to: 1000,
    size: 25,
    sort: 'relevance',
    order: 'desc'
  }
};

// Example 5: Organic Competitors
const organicCompetitorsExample = {
  name: 'getOrganicCompetitorsPage',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    se_position_from: 1,
    se_position_to: 15,
    traffic_from: 50,
    traff_to: 2000,
    competition: 'low',
    size: 20,
    sort: 'relevance',
    order: 'desc'
  }
};

// Example 6: Top URLs Analysis
const topUrlsExample = {
  name: 'getTopUrls',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    sort: 'organic_keywords',
    order: 'desc',
    size: 15,
    se_position_from: 1,
    se_position_to: 10
  }
};

// Example 7: Domain URLs with Keyword Information
const domainUrlsExample = {
  name: 'getDomainUrls',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    sort: 'potencial_traff',
    order: 'desc',
    size: 20,
    se_position_from: 1,
    se_position_to: 5
  }
};

// Example 8: Historical Analysis
const domainsHistoryExample = {
  name: 'getDomainsHistory',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    days: 30,
    sort: 'date',
    order: 'desc',
    size: 30
  }
};

// Example 9: Multi-Domain Comparison (Intersection)
const domainsIntersectionExample = {
  name: 'getDomainsIntersection',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    domain_list: ['competitor1.com', 'competitor2.com', 'competitor3.com'],
    keyword_type: 'all',
    se_position_from: 1,
    se_position_to: 10,
    size: 100,
    sort: 'common',
    order: 'desc'
  }
};

// Example 10: Unique Keywords Across Multiple Domains
const domainsUniqKeywordsExample = {
  name: 'getDomainsUniqKeywords',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    domain_list: ['domain1.com', 'domain2.com', 'domain3.com'],
    keyword_type: 'organic',
    se_position_from: 1,
    se_position_to: 20,
    size: 50,
    sort: 'relevance',
    order: 'desc'
  }
};

// Example 11: Regional Traffic Analysis
const regionsTrafficExample = {
  name: 'getAllRegionsTraffic',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    traff_from: 100,
    traff_to: 10000,
    sort: 'traff',
    order: 'desc',
    size: 50
  }
};

// Example 12: Regional Statistics
const regionsCountExample = {
  name: 'getRegionsCount',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us'
  }
};

// Example 13: Export Positions to CSV
const exportPositionsExample = {
  name: 'exportPositions',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    keyword_type: 'all',
    se_position_from: 1,
    se_position_to: 20,
    traffic_from: 10,
    traff_to: 1000,
    competition: 'medium',
    keyword_volume_from: 10,
    keyword_volume_to: 1000,
    limit: 100,
    sort: 'relevance',
    order: 'desc'
  }
};

// Example 14: Using Specific Date Range
const dateRangeExample = {
  name: 'getDomainKeywords',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    update_date_from: '2023-01-01',
    update_date_to: '2023-12-31',
    sort: 'relevance',
    order: 'desc',
    size: 100
  }
};

// Example 15: Using Keyword Lists
const keywordListExample = {
  name: 'getDomainKeywords',
  arguments: {
    query: 'example.com',
    search_engine: 'g_us',
    keyword_list: ['seo services', 'digital marketing', 'content marketing'],
    keyword_type: 'organic',
    size: 50,
    sort: 'relevance',
    order: 'desc'
  }
};

// All examples organized by category
const examples = {
  basicDomainInformation: basicDomainExample,
  keywordAnalysis: keywordAnalysisExample,
  advertisingAnalysis: adKeywordsExample,
  competitorAnalysis: competitorsExample,
  organicCompetitors: organicCompetitorsExample,
  topUrlsAnalysis: topUrlsExample,
  domainUrlsAnalysis: domainUrlsExample,
  historicalAnalysis: domainsHistoryExample,
  multiDomainComparison: domainsIntersectionExample,
  uniqueKeywordsAnalysis: domainsUniqKeywordsExample,
  regionalTrafficAnalysis: regionsTrafficExample,
  regionalStatistics: regionsCountExample,
  dataExport: exportPositionsExample,
  dateRangeAnalysis: dateRangeExample,
  keywordListAnalysis: keywordListExample
};

// Export all examples
export { examples, SERPSTAT_API_KEY };

// Log available examples
console.log('Available Serpstat Domain Analysis Examples:');
console.log('=========================================');
Object.keys(examples).forEach((key, index) => {
  console.log(`${index + 1}. ${key}: ${examples[key].name}`);
});

console.log('\nTo use any example:');
console.log('1. Set your SERPSTAT_API_KEY environment variable');
console.log('2. Import the examples: import { examples } from "./examples/usage-example.js"');
console.log('3. Call the MCP server with the example arguments');
console.log('4. Modify parameters as needed for your specific use case');