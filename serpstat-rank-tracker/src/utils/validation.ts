/**
 * Serpstat Rank Tracker API Validation Schemas
 * =============================================
 *
 * This file contains Zod validation schemas for all rank tracker API methods.
 * Each schema provides comprehensive input validation with detailed error messages
 * and proper type checking for all parameters based on the API documentation.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 */

import { z } from 'zod';
import { 
  PAGE_SIZE_OPTIONS,
  SORT_OPTIONS,
  COMPETITORS_SORT_OPTIONS,
  SORT_RANGE_OPTIONS,
  ORDER_OPTIONS,
  API_LIMITS,
  DATE_PATTERN
} from '../constants.js';

/**
 * Base schemas for common parameters
 */
const ProjectIdSchema = z.object({
  projectId: z.number()
    .int('Project ID must be an integer')
    .min(1, 'Project ID must be at least 1')
    .describe('The unique identifier for a rank tracker project'),
});

const RegionIdSchema = z.object({
  regionId: z.number()
    .int('Region ID must be an integer')
    .min(1, 'Region ID must be at least 1')
    .describe('The unique identifier for a search region'),
});

const ProjectRegionIdSchema = z.object({
  projectRegionId: z.number()
    .int('Project Region ID must be an integer')
    .min(1, 'Project Region ID must be at least 1')
    .describe('The unique identifier for a project region configuration'),
});

const PaginationSchema = z.object({
  page: z.number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .describe('Page number in response'),
    
  pageSize: z.number()
    .int('Page size must be an integer')
    .min(1, 'Page size must be at least 1')
    .max(API_LIMITS.MAX_PAGE_SIZE, `Page size cannot exceed ${API_LIMITS.MAX_PAGE_SIZE}`)
    .refine(
      (size) => PAGE_SIZE_OPTIONS.includes(size as any),
      `Page size must be one of: ${PAGE_SIZE_OPTIONS.join(', ')}`
    )
    .describe('Number of results per page'),
});

const DateRangeSchema = z.object({
  dateFrom: z.string()
    .regex(DATE_PATTERN, 'Date from must be in YYYY-MM-DD format')
    .optional()
    .describe('Start date for historical data (YYYY-MM-DD)'),
    
  dateTo: z.string()
    .regex(DATE_PATTERN, 'Date to must be in YYYY-MM-DD format')
    .optional()
    .describe('End date for historical data (YYYY-MM-DD)'),
});

const SortSchema = z.object({
  sort: z.enum(SORT_OPTIONS)
    .optional()
    .describe('Sorting by field'),
    
  order: z.enum(ORDER_OPTIONS)
    .optional()
    .describe('Sorting order'),
});

/**
 * getProjects validation schema
 * Get list of rank tracker projects
 */
export const GetProjectsSchema = z.object({
  page: z.number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .optional()
    .default(1)
    .describe('Page number in response (Default: 1)'),
    
  pageSize: z.number()
    .int('Page size must be an integer')
    .min(1, 'Page size must be at least 1')
    .max(500, 'Page size cannot exceed 500')
    .refine(
      (size) => [20, 50, 100, 500].includes(size as any),
      'Page size must be one of: 20, 50, 100, 500'
    )
    .optional()
    .default(100)
    .describe('Number of results per page (Default: 100)'),
});

/**
 * getProjectStatus validation schema
 * Get project parsing status
 */
export const GetProjectStatusSchema = ProjectIdSchema.merge(RegionIdSchema);

/**
 * getProjectRegions validation schema
 * Get project regions list
 */
export const GetProjectRegionsSchema = ProjectIdSchema;

/**
 * getKeywordsSerpResultsHistory validation schema
 * Get keywords SERP results history
 */
export const GetKeywordsSerpResultsHistorySchema = ProjectIdSchema
  .merge(ProjectRegionIdSchema)
  .merge(PaginationSchema.pick({ page: true }))  // Only page is required
  .merge(DateRangeSchema)
  .merge(SortSchema)
  .extend({
    pageSize: z.number()
      .int('Page size must be an integer')
      .min(1, 'Page size must be at least 1')
      .max(500, 'Page size cannot exceed 500')
      .refine(
        (size) => [20, 50, 100, 200, 500].includes(size as any),
        'Page size must be one of: 20, 50, 100, 200, 500'
      )
      .optional()
      .default(100)
      .describe('Number of results per page (Default: 100)'),
      
    keywords: z.array(z.string())
      .max(API_LIMITS.MAX_KEYWORDS_FILTER, `Cannot filter more than ${API_LIMITS.MAX_KEYWORDS_FILTER} keywords`)
      .optional()
      .describe('Keywords for which pages and positions are required'),
      
    withTags: z.boolean()
      .optional()
      .default(false)
      .describe('Display tags for the keywords (Default: false)'),
  });

/**
 * getUrlsSerpResultsHistory validation schema
 * Get URLs SERP results history
 */
export const GetUrlsSerpResultsHistorySchema = ProjectIdSchema
  .merge(ProjectRegionIdSchema)
  .merge(PaginationSchema.pick({ page: true }))  // Only page is required
  .merge(DateRangeSchema)
  .merge(SortSchema)
  .extend({
    pageSize: z.number()
      .int('Page size must be an integer')
      .min(1, 'Page size must be at least 1')
      .max(500, 'Page size cannot exceed 500')
      .refine(
        (size) => [20, 50, 100, 200, 500].includes(size as any),
        'Page size must be one of: 20, 50, 100, 200, 500'
      )
      .optional()
      .default(100)
      .describe('Number of results per page (Default: 100)'),
      
    keywords: z.array(z.string())
      .max(API_LIMITS.MAX_KEYWORDS_FILTER, `Cannot filter more than ${API_LIMITS.MAX_KEYWORDS_FILTER} keywords`)
      .optional()
      .describe('Keywords for which pages and positions are required'),
      
    withTags: z.boolean()
      .optional()
      .default(false)
      .describe('Display tags for the keywords (Default: false)'),
      
    domain: z.string()
      .min(1, 'Domain must be at least 1 character')
      .optional()
      .describe('Domain or page for which the data is required (format: domain.com or https://domain.com/)'),
  });

/**
 * getTopCompetitorsDomainsHistory validation schema
 * Get top competitors domains history
 */
export const GetTopCompetitorsDomainsHistorySchema = ProjectIdSchema
  .merge(ProjectRegionIdSchema)
  .merge(PaginationSchema)  // Both page and pageSize are required for this method
  .extend({
    dateFrom: z.string()
      .regex(DATE_PATTERN, 'Date from must be in YYYY-MM-DD format')
      .describe('Start date of the period for which the data is required'),
      
    dateTo: z.string()
      .regex(DATE_PATTERN, 'Date to must be in YYYY-MM-DD format')
      .describe('Date of last withdrawal of positions'),
      
    sort: z.enum(COMPETITORS_SORT_OPTIONS)
      .optional()
      .default('sum_traffic')
      .describe('Sorting by parameters'),
      
    sortRange: z.enum(SORT_RANGE_OPTIONS)
      .optional()
      .describe('Sort range for detailed sorting'),
      
    order: z.enum(ORDER_OPTIONS)
      .optional()
      .default('desc')
      .describe('Sorting order'),
      
    domains: z.array(z.string())
      .min(1, 'At least one domain must be provided')
      .describe('All domains in top 20 for two project keywords'),
  });

/**
 * Type exports for TypeScript
 */
export type GetProjectsInput = z.infer<typeof GetProjectsSchema>;
export type GetProjectStatusInput = z.infer<typeof GetProjectStatusSchema>;
export type GetProjectRegionsInput = z.infer<typeof GetProjectRegionsSchema>;
export type GetKeywordsSerpResultsHistoryInput = z.infer<typeof GetKeywordsSerpResultsHistorySchema>;
export type GetUrlsSerpResultsHistoryInput = z.infer<typeof GetUrlsSerpResultsHistorySchema>;
export type GetTopCompetitorsDomainsHistoryInput = z.infer<typeof GetTopCompetitorsDomainsHistorySchema>;