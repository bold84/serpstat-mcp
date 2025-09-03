/**
 * Serpstat Backlinks API Validation Schemas
 * ==========================================
 *
 * This file contains Zod validation schemas for all backlinks API methods.
 * Each schema provides comprehensive input validation with detailed error messages
 * and proper type checking for all parameters.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 */

import { z } from 'zod';
import { 
  SEARCH_TYPES, 
  SORT_ORDERS, 
  COMPARE_TYPES, 
  ADDITIONAL_FILTERS,
  API_LIMITS 
} from '../constants.js';

/**
 * Base schemas for common parameters
 */
const BaseQuerySchema = z.object({
  query: z.string()
    .min(1, 'Domain query is required')
    .describe('The domain name of the analyzed site'),
  
  searchType: z.enum(SEARCH_TYPES)
    .optional()
    .default('domain_with_subdomains')
    .describe('Search modes for analysis'),
});

const PaginationSchema = z.object({
  page: z.number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .optional()
    .describe('Page number in response (Default: 1)'),
    
  size: z.number()
    .int('Size must be an integer')
    .min(1, 'Size must be at least 1')
    .max(API_LIMITS.MAX_RESULTS_PER_PAGE, `Size cannot exceed ${API_LIMITS.MAX_RESULTS_PER_PAGE}`)
    .optional()
    .describe('Number of results per page in response (Default: 100)'),
});

const SortSchema = z.object({
  sort: z.string()
    .optional()
    .describe('Sorting by field'),
  
  order: z.enum(SORT_ORDERS)
    .optional()
    .describe('Sorting order'),
});

/**
 * Complex Filter Schema
 * Supports nested AND/OR logic for sophisticated filtering
 */
const FilterConditionSchema = z.object({
  field: z.string()
    .min(1, 'Field name is required'),
  
  compareType: z.enum(COMPARE_TYPES)
    .describe('Comparison type for the filter'),
  
  value: z.array(z.union([z.string(), z.number()]))
    .min(1, 'Value array must contain at least one item')
    .describe('Filter values'),
});

const AdditionalFilterSchema = z.object({
  additional_filters: z.enum(ADDITIONAL_FILTERS)
    .describe('Additional filter options'),
});

const ComplexFilterSchema = z.array(
  z.array(z.union([FilterConditionSchema, AdditionalFilterSchema]))
).optional()
.describe('Data filtering using complex conditions. First-level array represents OR conditions, nested arrays represent AND conditions.');

/**
 * Common schema combining base parameters with optional features
 */
const CommonBacklinksSchema = BaseQuerySchema
  .extend({
    ...PaginationSchema.shape,
    ...SortSchema.shape,
    complexFilter: ComplexFilterSchema.optional(),
    linkPerDomain: z.number()
      .int('linkPerDomain must be an integer')
      .min(1, 'linkPerDomain must be at least 1')
      .optional()
      .describe('Links per domain limit'),
  });

/**
 * getSummary validation schema
 * Get general information about link profile
 */
export const GetSummarySchema = BaseQuerySchema.extend({
  searchType: z.enum(SEARCH_TYPES)
    .optional()
    .default('domain')
    .describe('Search modes for analysis'),
});

/**
 * getRefDomains validation schema
 * Get a list of referring domains of a site
 */
export const GetRefDomainsSchema = CommonBacklinksSchema.extend({
  sort: z.string()
    .optional()
    .default('check')
    .describe('Sorting by field (domain_links, domain_from, domain_rank, check)'),
});

/**
 * getNewBacklinks validation schema
 * Get a list of active backlinks of a site
 */
export const GetNewBacklinksSchema = CommonBacklinksSchema.extend({
  sort: z.string()
    .optional()
    .default('check')
    .describe('Sorting by field (url_from, anchor, link_nofollow, links_external, link_type, url_to, check, add, domain_rank)'),
});

/**
 * getLostBacklinks validation schema
 * Get a list of lost backlinks of a site
 */
export const GetLostBacklinksSchema = CommonBacklinksSchema.extend({
  sort: z.string()
    .optional()
    .default('check')
    .describe('Sorting by field (url_from, anchor, link_nofollow, links_external, link_type, url_to, check, add, domain_rank)'),
});

/**
 * getOutlinks validation schema
 * Get a list of external backlinks of a site
 */
export const GetOutlinksSchema = CommonBacklinksSchema.extend({
  sort: z.string()
    .optional()
    .default('check')
    .describe('Sorting by field (url_from, anchor, link_nofollow, links_external, link_type, url_to, check, add, domain_rank)'),
});

/**
 * getAnchors validation schema
 * Get a list of keywords used as anchors for backlinks
 */
export const GetAnchorsSchema = BaseQuerySchema
  .extend({
    ...PaginationSchema.shape,
    ...SortSchema.shape,
    anchor: z.string()
      .optional()
      .describe('Anchor text to filter by'),
    
    count: z.string()
      .optional()
      .describe('Number of words in anchor'),
    
    sort: z.string()
      .optional()
      .default('lastupdate')
      .describe('Sorting by field (total, refDomains, nofollow, anchor, lastupdate)'),
    
    complexFilter: ComplexFilterSchema.optional(),
  });

/**
 * getTopPages validation schema
 * Get a list of leading pages by the number of backlinks
 */
export const GetTopPagesSchema = BaseQuerySchema
  .extend({
    ...PaginationSchema.shape,
    ...SortSchema.shape,
    sort: z.string()
      .optional()
      .default('lastupdate')
      .describe('Sorting by field (ips, count, domains, url_to, lastupdate)'),
    
    complexFilter: ComplexFilterSchema.optional(),
  });

/**
 * getIntersect validation schema
 * Get backlinks from intersecting donors to the analyzed domain
 */
export const GetIntersectSchema = BaseQuerySchema
  .extend({
    ...PaginationSchema.shape,
    ...SortSchema.shape,
    intersect: z.array(z.string())
      .min(1, 'At least one domain must be provided for intersection')
      .max(5, 'Maximum 5 domains allowed for intersection')
      .describe('Array of competitor domains to find intersecting backlinks'),
    
    sort: z.string()
      .optional()
      .default('links_count1')
      .describe('Sorting by field (links_count1, links_count2, etc.)'),
    
    complexFilter: ComplexFilterSchema.optional(),
  });

/**
 * getIntersectSummary validation schema
 * Get summary of intersecting backlinks
 */
export const GetIntersectSummarySchema = BaseQuerySchema.extend({
  intersect: z.array(z.string())
    .min(1, 'At least one domain must be provided for intersection')
    .max(5, 'Maximum 5 domains allowed for intersection')
    .describe('Array of competitor domains to find intersecting backlinks'),
});

/**
 * getRedirectedDomains validation schema
 * Get domain redirection analysis
 */
export const GetRedirectedDomainsSchema = CommonBacklinksSchema;

/**
 * getDistributionSdr validation schema
 * Get Domain Rating distribution
 */
export const GetDistributionSdrSchema = BaseQuerySchema.extend({
  complexFilter: ComplexFilterSchema.optional(),
});

/**
 * getDistributionTld validation schema
 * Get top-level domain distribution
 */
export const GetDistributionTldSchema = BaseQuerySchema.extend({
  complexFilter: ComplexFilterSchema.optional(),
});

/**
 * getThreats validation schema
 * Get malicious domains referring to the analyzed domain
 */
export const GetThreatsSchema = CommonBacklinksSchema.extend({
  sort: z.string()
    .optional()
    .default('lastupdate')
    .describe('Sorting by field (lastupdate, domain_link, links_count, platform_type, threat_type)'),
});

/**
 * getThreatsLinks validation schema
 * Get specific threatening backlinks
 */
export const GetThreatsLinksSchema = CommonBacklinksSchema.extend({
  sort: z.string()
    .optional()
    .default('lastupdate')
    .describe('Sorting by field (lastupdate, domain_link, links_count, platform_type, threat_type)'),
});

/**
 * getOutThreats validation schema
 * Get external threat links from domain
 */
export const GetOutThreatsSchema = CommonBacklinksSchema.extend({
  sort: z.string()
    .optional()
    .default('lastupdate')
    .describe('Sorting by field (lastupdate, domain_link, links_count, platform_type, threat_type)'),
});

/**
 * getOutThreatsLinks validation schema
 * Get specific external threat links
 */
export const GetOutThreatsLinksSchema = CommonBacklinksSchema.extend({
  sort: z.string()
    .optional()
    .default('lastupdate')
    .describe('Sorting by field (lastupdate, domain_link, links_count, platform_type, threat_type)'),
});

/**
 * getTopAnchors validation schema
 * Get top anchor text analysis
 */
export const GetTopAnchorsSchema = GetAnchorsSchema.extend({
  sort: z.string()
    .optional()
    .default('total')
    .describe('Sorting by field (total, refDomains, nofollow, anchor)'),
});

/**
 * getOutDomains validation schema
 * Get external domains linked to
 */
export const GetOutDomainsSchema = CommonBacklinksSchema.extend({
  sort: z.string()
    .optional()
    .default('domain_links')
    .describe('Sorting by field (domain_links, domain_from, domain_rank)'),
});

/**
 * getLostOutlinks validation schema
 * Get lost external links
 */
export const GetLostOutlinksSchema = CommonBacklinksSchema.extend({
  sort: z.string()
    .optional()
    .default('check')
    .describe('Sorting by field (url_from, anchor, link_nofollow, links_external)'),
});

/**
 * getBacklinksChangesHistory validation schema
 * Get historical backlink changes
 */
export const GetBacklinksChangesHistorySchema = BaseQuerySchema
  .extend({
    ...PaginationSchema.shape,
    ...SortSchema.shape,
    dateFrom: z.string()
      .optional()
      .describe('Start date for history analysis (YYYY-MM-DD)'),
    
    dateTo: z.string()
      .optional()
      .describe('End date for history analysis (YYYY-MM-DD)'),
    
    complexFilter: ComplexFilterSchema.optional(),
  });

/**
 * Type exports for TypeScript
 */
export type GetSummaryInput = z.infer<typeof GetSummarySchema>;
export type GetRefDomainsInput = z.infer<typeof GetRefDomainsSchema>;
export type GetNewBacklinksInput = z.infer<typeof GetNewBacklinksSchema>;
export type GetLostBacklinksInput = z.infer<typeof GetLostBacklinksSchema>;
export type GetOutlinksInput = z.infer<typeof GetOutlinksSchema>;
export type GetAnchorsInput = z.infer<typeof GetAnchorsSchema>;
export type GetTopPagesInput = z.infer<typeof GetTopPagesSchema>;
export type GetIntersectInput = z.infer<typeof GetIntersectSchema>;
export type GetIntersectSummaryInput = z.infer<typeof GetIntersectSummarySchema>;
export type GetRedirectedDomainsInput = z.infer<typeof GetRedirectedDomainsSchema>;
export type GetDistributionSdrInput = z.infer<typeof GetDistributionSdrSchema>;
export type GetDistributionTldInput = z.infer<typeof GetDistributionTldSchema>;
export type GetThreatsInput = z.infer<typeof GetThreatsSchema>;
export type GetThreatsLinksInput = z.infer<typeof GetThreatsLinksSchema>;
export type GetOutThreatsInput = z.infer<typeof GetOutThreatsSchema>;
export type GetOutThreatsLinksInput = z.infer<typeof GetOutThreatsLinksSchema>;
export type GetTopAnchorsInput = z.infer<typeof GetTopAnchorsSchema>;
export type GetOutDomainsInput = z.infer<typeof GetOutDomainsSchema>;
export type GetLostOutlinksInput = z.infer<typeof GetLostOutlinksSchema>;
export type GetBacklinksChangesHistoryInput = z.infer<typeof GetBacklinksChangesHistorySchema>;