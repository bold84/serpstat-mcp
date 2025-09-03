/**
 * Serpstat Keyword Analysis API Constants
 * =======================================
 *
 * This file contains all the API method names and constants used by the
 * Serpstat Keyword Analysis MCP server. All method names are case-sensitive
 * and must match the exact Serpstat API specification.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 */

/**
 * Keyword Analysis API Method Names
 * These are the exact method names required by the Serpstat API
 */
export const API_METHODS = {
  /** Get keywords related to a specific keyword with volume, CPC, and competition data */
  getKeywords: 'SerpstatKeywordProcedure.getKeywords',
  
  /** Get search suggestions for a keyword */
  getSuggestions: 'SerpstatKeywordProcedure.getSuggestions',
  
  /** Get detailed information about specific keywords including volume and difficulty */
  getKeywordsInfo: 'SerpstatKeywordProcedure.getKeywordsInfo',
  
  /** Get related keywords for semantic analysis */
  getRelatedKeywords: 'SerpstatKeywordProcedure.getRelatedKeywords',
  
  /** Get top URLs ranking for keyword variations */
  getTopUrls: 'SerpstatKeywordProcedure.getTopUrls',
  
  /** Get competitors for specific keywords */
  getCompetitors: 'SerpstatKeywordProcedure.getCompetitors',
  
  /** Get ad keywords for specific keywords */
  getAdKeywords: 'SerpstatKeywordProcedure.getAdKeywords',
  
  /** Get ads competitors for specific keywords */
  getAdsCompetitors: 'SerpstatKeywordProcedure.getAdsCompetitors',
  
  /** Get keyword performance in top positions */
  getKeywordTop: 'SerpstatKeywordProcedure.getKeywordTop',
  
  /** Get full keyword performance data */
  getKeywordFullTop: 'SerpstatKeywordProcedure.getKeywordFullTop',
  
  /** Export keywords data in various formats */
  exportKeywordsPhrase: 'SerpstatKeywordProcedure.exportKeywordsPhrase',
  
  /** Export suggestions data */
  exportSuggestions: 'SerpstatKeywordProcedure.exportSuggestions',
} as const;

/**
 * Search Engine Codes
 * Common search engine codes for different regions
 */
export const SEARCH_ENGINES = {
  GOOGLE_US: 'g_us',
  GOOGLE_UK: 'g_uk', 
  GOOGLE_DE: 'g_de',
  GOOGLE_AU: 'g_au',
  BING_US: 'bing_us',
} as const;

/**
 * Sort Order Options
 */
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

/**
 * Common Filter Fields
 */
export const FILTER_FIELDS = {
  COST_FROM: 'cost_from',
  COST_TO: 'cost_to',
  CONCURRENCY_FROM: 'concurrency_from',
  CONCURRENCY_TO: 'concurrency_to',
  FOUND_RESULTS_FROM: 'found_results_from',
  FOUND_RESULTS_TO: 'found_results_to',
  REGION_QUERIES_COUNT_FROM: 'region_queries_count_from',
  REGION_QUERIES_COUNT_TO: 'region_queries_count_to',
  DIFFICULTY_FROM: 'difficulty_from',
  DIFFICULTY_TO: 'difficulty_to',
} as const;

/**
 * API Limits and Defaults
 */
export const API_LIMITS = {
  MAX_RESULTS_PER_PAGE: 1000,
  DEFAULT_RESULTS_PER_PAGE: 100,
  MAX_KEYWORDS_PER_REQUEST: 1000,
  CREDIT_COST_PER_RESULT: 1,
} as const;