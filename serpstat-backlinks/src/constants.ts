/**
 * Serpstat Backlinks API Constants
 * ===================================
 *
 * This file contains all the API method names and constants used by the
 * Serpstat Backlinks MCP server. All method names are case-sensitive
 * and must match the exact Serpstat API specification.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 */

/**
 * Backlinks Analysis API Method Names
 * These are the exact method names required by the Serpstat API
 */
export const API_METHODS = {
  /** Get general information about link profile (deprecated but included for completeness) */
  getSummary: 'SerpstatBacklinksProcedure.getSummary',
  
  /** Get a list of referring domains of a site */
  getRefDomains: 'SerpstatBacklinksProcedure.getRefDomains',
  
  /** Get a list of active backlinks of a site */
  getNewBacklinks: 'SerpstatBacklinksProcedure.getNewBacklinks',
  
  /** Get a list of lost backlinks of a site */
  getLostBacklinks: 'SerpstatBacklinksProcedure.getLostBacklinks',
  
  /** Get a list of external backlinks of a site */
  getOutlinks: 'SerpstatBacklinksProcedure.getOutlinks',
  
  /** Get a list of keywords used as anchors for backlinks */
  getAnchors: 'SerpstatBacklinksProcedure.getAnchors',
  
  /** Get a list of leading pages by the number of backlinks */
  getTopPages: 'SerpstatBacklinksProcedure.getTopPages',
  
  /** Get backlinks from intersecting donors to the analyzed domain */
  getIntersect: 'SerpstatBacklinksProcedure.getIntersect',
  
  /** Get summary of intersecting backlinks */
  getIntersectSummary: 'SerpstatBacklinksProcedure.getIntersectSummary',
  
  /** Get domain redirection analysis */
  getRedirectedDomains: 'SerpstatBacklinksProcedure.getRedirectedDomains',
  
  /** Get Domain Rating distribution */
  getDistributionSdr: 'SerpstatBacklinksProcedure.getDistributionSDR',
  
  /** Get top-level domain distribution */
  getDistributionTld: 'SerpstatBacklinksProcedure.getDistributionTLD',
  
  /** Get malicious domains referring to the analyzed domain */
  getThreats: 'SerpstatBacklinksProcedure.getThreats',
  
  /** Get specific threatening backlinks */
  getThreatsLinks: 'SerpstatBacklinksProcedure.getThreatsLinks',
  
  /** Get external threat links from domain */
  getOutThreats: 'SerpstatBacklinksProcedure.getOutThreats',
  
  /** Get specific external threat links */
  getOutThreatsLinks: 'SerpstatBacklinksProcedure.getOutThreatsLinks',
  
  /** Get top anchor text analysis */
  getTopAnchors: 'SerpstatBacklinksProcedure.getTopAnchors',
  
  /** Get external domains linked to */
  getOutDomains: 'SerpstatBacklinksProcedure.getOutDomains',
  
  /** Get lost external links */
  getLostOutlinks: 'SerpstatBacklinksProcedure.getLostOutlinks',
  
  /** Get historical backlink changes */
  getBacklinksChangesHistory: 'SerpstatBacklinksProcedure.getBacklinksChangesHistory',
} as const;

/**
 * API Limits and Defaults
 */
export const API_LIMITS = {
  MAX_RESULTS_PER_PAGE: 1000,
  MAX_TOTAL_RESULTS: 60000,
} as const;

/**
 * Search Types
 */
export const SEARCH_TYPES = ['domain', 'domain_with_subdomains'] as const;

/**
 * Sort Orders
 */
export const SORT_ORDERS = ['asc', 'desc'] as const;

/**
 * Common Sort Fields
 */
export const COMMON_SORT_FIELDS = [
  'lastupdate',
  'domain_rank',
  'domain_links',
  'domain_from',
  'check'
] as const;

/**
 * Complex Filter Compare Types
 */
export const COMPARE_TYPES = [
  'contains',
  'notContains',
  'eq',
  'neq',
  'gte',
  'lte',
  'gt',
  'lt',
  'between'
] as const;

/**
 * Additional Filters
 */
export const ADDITIONAL_FILTERS = [
  'last_week',
  'last_month',
  'no_subdomains',
  'only_main_page'
] as const;