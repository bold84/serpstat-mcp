/**
 * Serpstat Keyword Analysis API Validation Schemas
 * =================================================
 *
 * This file contains Zod validation schemas for all keyword analysis API methods.
 * Each schema provides comprehensive input validation with detailed error messages
 * and proper type checking for all parameters.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 */

import { z } from 'zod';
import { API_LIMITS } from '../constants.js';

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
    .max(API_LIMITS.MAX_RESULTS_PER_PAGE, `Size cannot exceed ${API_LIMITS.MAX_RESULTS_PER_PAGE}`)
    .optional()
    .describe('Number of results per page in response'),
});

const FilterSchema = z.object({})
  .passthrough()
  .describe('Filter parameters for search. Fields are combined using AND logic.');

const SortSchema = z.object({})
  .passthrough()
  .describe('Order of sorting the results in the format: {field: order}');

/**
 * getKeywords validation schema
 * Get keywords related to a specific keyword with volume, CPC, and competition data
 */
export const GetKeywordsSchema = BaseParamsSchema.extend({
  keyword: z.string()
    .min(1, 'Keyword is required')
    .describe('Keyword to search for'),
    
  minusKeywords: z.array(z.string())
    .optional()
    .describe('List of keywords to exclude from the search'),
    
  withIntents: z.boolean()
    .optional()
    .describe('Keyword intent. This parameter works for g_ua and g_us database only'),
    
  filters: FilterSchema.optional(),
  sort: SortSchema.optional(),
  ...PaginationSchema.shape,
});

/**
 * getSuggestions validation schema
 * Get search suggestions for a keyword
 */
export const GetSuggestionsSchema = BaseParamsSchema.extend({
  keyword: z.string()
    .min(1, 'Keyword is required')
    .describe('Keyword to get suggestions for'),
    
  filters: z.object({
    minus_keywords: z.array(z.string()).optional(),
  }).optional()
    .describe('Filter conditions'),
    
  ...PaginationSchema.shape,
});

/**
 * getKeywordsInfo validation schema
 * Get detailed information about specific keywords including volume and difficulty
 */
export const GetKeywordsInfoSchema = BaseParamsSchema.extend({
  keywords: z.array(z.string())
    .min(1, 'At least one keyword is required')
    .max(API_LIMITS.MAX_KEYWORDS_PER_REQUEST, `Cannot exceed ${API_LIMITS.MAX_KEYWORDS_PER_REQUEST} keywords`)
    .describe('Array with keywords to search for'),
    
  withIntents: z.boolean()
    .optional()
    .describe('Keyword intent. This parameter works for g_ua and g_us database only'),
    
  filters: FilterSchema.optional(),
  sort: SortSchema.optional(),
});

/**
 * getRelatedKeywords validation schema
 * Get related keywords for semantic analysis
 */
export const GetRelatedKeywordsSchema = BaseParamsSchema.extend({
  keyword: z.string()
    .min(1, 'Keyword is required')
    .describe('Keyword to find related keywords for'),
    
  filters: FilterSchema.optional(),
  sort: SortSchema.optional(),
  ...PaginationSchema.shape,
});

/**
 * getTopUrls validation schema
 * Get top URLs ranking for keyword variations
 */
export const GetTopUrlsSchema = BaseParamsSchema.extend({
  keyword: z.string()
    .min(1, 'Keyword is required')
    .describe('Keyword to analyze top URLs for'),
    
  filters: FilterSchema.optional(),
  sort: SortSchema.optional(),
  ...PaginationSchema.shape,
});

/**
 * getCompetitors validation schema
 * Get competitors for specific keywords
 */
export const GetCompetitorsSchema = BaseParamsSchema.extend({
  keyword: z.string()
    .min(1, 'Keyword is required')
    .describe('Keyword to find competitors for'),
    
  filters: FilterSchema.optional(),
  sort: SortSchema.optional(),
  ...PaginationSchema.shape,
});

/**
 * getAdKeywords validation schema
 * Get ad keywords for specific keywords
 */
export const GetAdKeywordsSchema = BaseParamsSchema.extend({
  keyword: z.string()
    .min(1, 'Keyword is required')
    .describe('Keyword to find ad keywords for'),
    
  filters: FilterSchema.optional(),
  sort: SortSchema.optional(),
  ...PaginationSchema.shape,
});

/**
 * getAdsCompetitors validation schema
 * Get ads competitors for specific keywords
 */
export const GetAdsCompetitorsSchema = BaseParamsSchema.extend({
  keyword: z.string()
    .min(1, 'Keyword is required')
    .describe('Keyword to find ad competitors for'),
    
  filters: FilterSchema.optional(),
  sort: SortSchema.optional(),
  ...PaginationSchema.shape,
});

/**
 * getKeywordTop validation schema
 * Get keyword performance in top positions
 */
export const GetKeywordTopSchema = BaseParamsSchema.extend({
  keyword: z.string()
    .min(1, 'Keyword is required')
    .describe('Keyword to analyze top performance for'),
    
  filters: FilterSchema.optional(),
  sort: SortSchema.optional(),
  ...PaginationSchema.shape,
});

/**
 * getKeywordFullTop validation schema
 * Get full keyword performance data
 */
export const GetKeywordFullTopSchema = BaseParamsSchema.extend({
  keyword: z.string()
    .min(1, 'Keyword is required')
    .describe('Keyword to analyze full performance for'),
    
  filters: FilterSchema.optional(),
  sort: SortSchema.optional(),
  ...PaginationSchema.shape,
});

/**
 * exportKeywordsPhrase validation schema
 * Export keywords data in various formats
 */
export const ExportKeywordsPhraseSchema = BaseParamsSchema.extend({
  keyword: z.string()
    .min(1, 'Keyword is required')
    .describe('Keyword to export data for'),
    
  filters: FilterSchema.optional(),
  sort: SortSchema.optional(),
  ...PaginationSchema.shape,
});

/**
 * exportSuggestions validation schema
 * Export suggestions data
 */
export const ExportSuggestionsSchema = BaseParamsSchema.extend({
  keyword: z.string()
    .min(1, 'Keyword is required')
    .describe('Keyword to export suggestions for'),
    
  filters: z.object({
    minus_keywords: z.array(z.string()).optional(),
  }).optional()
    .describe('Filter conditions'),
    
  ...PaginationSchema.shape,
});

/**
 * Type exports for TypeScript inference
 */
export type GetKeywordsParams = z.infer<typeof GetKeywordsSchema>;
export type GetSuggestionsParams = z.infer<typeof GetSuggestionsSchema>;
export type GetKeywordsInfoParams = z.infer<typeof GetKeywordsInfoSchema>;
export type GetRelatedKeywordsParams = z.infer<typeof GetRelatedKeywordsSchema>;
export type GetTopUrlsParams = z.infer<typeof GetTopUrlsSchema>;
export type GetCompetitorsParams = z.infer<typeof GetCompetitorsSchema>;
export type GetAdKeywordsParams = z.infer<typeof GetAdKeywordsSchema>;
export type GetAdsCompetitorsParams = z.infer<typeof GetAdsCompetitorsSchema>;
export type GetKeywordTopParams = z.infer<typeof GetKeywordTopSchema>;
export type GetKeywordFullTopParams = z.infer<typeof GetKeywordFullTopSchema>;
export type ExportKeywordsPhraseParams = z.infer<typeof ExportKeywordsPhraseSchema>;
export type ExportSuggestionsParams = z.infer<typeof ExportSuggestionsSchema>;