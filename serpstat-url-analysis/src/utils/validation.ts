/**
 * Serpstat URL Analysis API Validation Schemas
 * ===========================================
 *
 * This file contains Zod validation schemas for all URL analysis API methods.
 * Each schema provides comprehensive input validation with detailed error messages
 * and proper type checking for all parameters.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 */

import { z } from 'zod';

/**
 * Base schemas for common parameters
 */
const BaseParamsSchema = z.object({
  se: z.string()
    .min(1, 'Search engine code is required')
    .describe('Search engine code (e.g., "g_us" for Google US)'),
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
    .max(1000, 'Size cannot exceed 1000')
    .optional()
    .describe('Number of results per page in response (Default: 100)'),
});

const FilterSchema = z.object({})
  .passthrough()
  .describe('Filter parameters for search. Fields are combined using AND logic.');

const SortSchema = z.object({})
  .passthrough()
  .describe('Order of sorting the results in the format: {field: order}');

/**
 * getSummaryTraffic validation schema
 * Get traffic and keyword statistics for website pages that match a specific URL mask
 */
export const GetSummaryTrafficSchema = BaseParamsSchema.extend({
  domain: z.string()
    .min(1, 'Domain is required')
    .describe('The domain for which to retrieve traffic and keyword data'),
  
  urlContains: z.string()
    .min(1, 'URL contains parameter is required')
    .describe('Searched part of URL'),
  
  output_data: z.enum(['traffic', 'keywords'])
    .optional()
    .describe('Output data value. Both options enabled by default, choose one to spend less credits'),
});

/**
 * getUrlCompetitors validation schema
 * Get the list of URL competitors to the queried URL
 */
export const GetUrlCompetitorsSchema = BaseParamsSchema.extend({
  url: z.string()
    .url('Must be a valid URL')
    .min(1, 'URL is required')
    .describe('URL for finding competing URLs'),
  
  sort: SortSchema.optional(),
  
  page: z.number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .optional()
    .describe('Page number in response (Default: 1)'),
  
  size: z.number()
    .int('Size must be an integer')
    .min(1, 'Size must be at least 1')
    .max(1000, 'Size cannot exceed 1000')
    .optional()
    .describe('Number of results per page in response (Default: 100)'),
});

/**
 * getUrlKeywords validation schema
 * Get a list of keywords for which the specified URL ranks in the top-100 Google and top-50 Bing
 */
export const GetUrlKeywordsSchema = BaseParamsSchema.extend({
  url: z.string()
    .url('Must be a valid URL')
    .min(1, 'URL is required')
    .describe('Analyzed page URL'),
  
  withIntents: z.boolean()
    .optional()
    .describe('Keyword intent'),
  
  sort: SortSchema.optional(),
  
  filters: FilterSchema.optional(),
  
  page: z.number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .optional()
    .describe('Page number in response (Default: 1)'),
  
  size: z.number()
    .int('Size must be an integer')
    .min(1, 'Size must be at least 1')
    .max(1000, 'Size cannot exceed 1000')
    .optional()
    .describe('Number of results per page in response (Default: 100)'),
});

/**
 * getUrlMissingKeywords validation schema
 * Get keywords that competitors are ranking for but the given URL isn't ranking for them
 */
export const GetUrlMissingKeywordsSchema = BaseParamsSchema.extend({
  url: z.string()
    .url('Must be a valid URL')
    .min(1, 'URL is required')
    .describe('Analyzed URL'),
  
  sort: SortSchema.optional(),
  
  filters: FilterSchema.optional(),
  
  page: z.number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .optional()
    .describe('Page number in response (Default: 1)'),
  
  size: z.number()
    .int('Size must be an integer')
    .min(1, 'Size must be at least 1')
    .max(1000, 'Size cannot exceed 1000')
    .optional()
    .describe('Number of results per page in response (Default: 100)'),
});

/**
 * Type exports for TypeScript
 */
export type GetSummaryTrafficInput = z.infer<typeof GetSummaryTrafficSchema>;
export type GetUrlCompetitorsInput = z.infer<typeof GetUrlCompetitorsSchema>;
export type GetUrlKeywordsInput = z.infer<typeof GetUrlKeywordsSchema>;
export type GetUrlMissingKeywordsInput = z.infer<typeof GetUrlMissingKeywordsSchema>;