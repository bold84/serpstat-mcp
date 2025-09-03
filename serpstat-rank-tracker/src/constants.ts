/**
 * Serpstat Rank Tracker API Constants
 * ====================================
 *
 * This file contains all API method names and constants for the Rank Tracker API.
 * Each method name exactly matches the Serpstat API documentation.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 */

/**
 * Rank Tracker API Method Names
 * These exactly match the method names in the Serpstat API documentation
 */
export const API_METHODS = {
  // Project Management Methods
  getProjects: 'RtApiProjectProcedure.getProjects',
  getProjectStatus: 'RtApiProjectProcedure.getProjectStatus',
  getProjectRegions: 'RtApiSearchEngineProcedure.getProjectRegions',
  
  // SERP Results Methods
  getKeywordsSerpResultsHistory: 'RtApiSerpResultsProcedure.getKeywordsSerpResultsHistory',
  getUrlsSerpResultsHistory: 'RtApiSerpResultsProcedure.getUrlsSerpResultsHistory',
  getTopCompetitorsDomainsHistory: 'RtApiSerpResultsProcedure.getTopCompetitorsDomainsHistory',
} as const;

/**
 * Page Size Options
 * Valid page size values for pagination
 */
export const PAGE_SIZE_OPTIONS = [20, 50, 100, 200, 500] as const;

/**
 * Sort Options for SERP Results
 * Valid sorting parameters
 */
export const SORT_OPTIONS = ['keyword', 'date'] as const;

/**
 * Sort Options for Competitors History
 * Valid sorting parameters for competitors data
 */
export const COMPETITORS_SORT_OPTIONS = [
  'domain',
  'sum_traffic', 
  'keywords_count',
  'avg_position',
  'position_ranges',
  'ads_count'
] as const;

/**
 * Sort Range Options for Competitors
 * Valid sort range parameters
 */
export const SORT_RANGE_OPTIONS = [
  'top1',
  'top2',
  'top3',
  'top5',
  'top10',
  'top20',
  'top101',
  'keywords_count_bottom',
  'keywords_count_top',
  'avg_position_top',
  'avg_position_bottom'
] as const;

/**
 * Order Options
 * Valid sorting orders
 */
export const ORDER_OPTIONS = ['asc', 'desc'] as const;

/**
 * API Limits
 * Maximum values for various parameters
 */
export const API_LIMITS = {
  MAX_PAGE_SIZE: 500,
  MAX_KEYWORDS_FILTER: 1000,
  MAX_RESULTS_PER_PAGE: 1000,
} as const;

/**
 * Date Format Pattern
 * Regular expression for date validation (YYYY-MM-DD)
 */
export const DATE_PATTERN = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

/**
 * Method Groups for Organization
 */
export const METHOD_GROUPS = {
  PROJECT_MANAGEMENT: [
    'getProjects',
    'getProjectStatus', 
    'getProjectRegions'
  ],
  SERP_RESULTS: [
    'getKeywordsSerpResultsHistory',
    'getUrlsSerpResultsHistory',
    'getTopCompetitorsDomainsHistory'
  ],
} as const;