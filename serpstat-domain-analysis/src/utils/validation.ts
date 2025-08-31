/**
 * Serpstat Domain Analysis API Validation Schemas
 * ===============================================
 *
 * Comprehensive Zod schemas for validating all API method parameters
 * and response structures.
 */

import { z } from 'zod';
import { SEARCH_ENGINES, SORT_ORDERS, SORT_FIELDS, PAGINATION_DEFAULTS } from '../constants.js';

/**
 * Base validation schemas
 */
const BasePaginationSchema = z.object({
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(1000).default(PAGINATION_DEFAULTS.size),
});

const SortOrderSchema = z.enum(SORT_ORDERS);

/**
 * Search Engine Schema
 */
const SearchEngineSchema = z.enum(SEARCH_ENGINES).optional();

/**
 * Domain Analysis API Schemas
 */

// getDomainsInfo
export const GetDomainsInfoSchema = z.object({
  domains: z.array(z.string()).min(1).max(100),
  se: SearchEngineSchema,
});

export type GetDomainsInfoParams = z.infer<typeof GetDomainsInfoSchema>;

// getDomainKeywords
export const GetDomainKeywordsSchema = z.object({
  domain: z.string().min(1).max(100),
  se: SearchEngineSchema,
  withSubdomains: z.boolean().optional(),
  withIntents: z.boolean().optional(),
  url: z.string().url().optional(),
  keywords: z.array(z.string()).optional(),
  minusKeywords: z.array(z.string()).optional(),
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(1000).default(PAGINATION_DEFAULTS.size),
});

export type GetDomainKeywordsParams = z.infer<typeof GetDomainKeywordsSchema>;

// getAdKeywords
export const GetAdKeywordsSchema = z.object({
  domain: z.string().min(1).max(100),
  se: SearchEngineSchema,
  withSubdomains: z.boolean().optional(),
  withIntents: z.boolean().optional(),
  url: z.string().url().optional(),
  keywords: z.array(z.string()).optional(),
  minusKeywords: z.array(z.string()).optional(),
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(1000).default(PAGINATION_DEFAULTS.size),
});

export type GetAdKeywordsParams = z.infer<typeof GetAdKeywordsSchema>;

// getCompetitors (deprecated but still documented)
export const GetCompetitorsSchema = z.object({
  domain: z.string().min(1).max(100),
  se: SearchEngineSchema,
  withSubdomains: z.boolean().optional(),
  withIntents: z.boolean().optional(),
  url: z.string().url().optional(),
  keywords: z.array(z.string()).optional(),
  minusKeywords: z.array(z.string()).optional(),
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(1000).default(PAGINATION_DEFAULTS.size),
});

export type GetCompetitorsParams = z.infer<typeof GetCompetitorsSchema>;

// getAdsCompetitors
export const GetAdsCompetitorsSchema = z.object({
  domain: z.string().min(1).max(100),
  se: SearchEngineSchema,
  withSubdomains: z.boolean().optional(),
  withIntents: z.boolean().optional(),
  url: z.string().url().optional(),
  keywords: z.array(z.string()).optional(),
  minusKeywords: z.array(z.string()).optional(),
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(1000).default(PAGINATION_DEFAULTS.size),
});

export type GetAdsCompetitorsParams = z.infer<typeof GetAdsCompetitorsSchema>;

// getOrganicCompetitorsPage
export const GetOrganicCompetitorsPageSchema = z.object({
  domain: z.string().min(1).max(100),
  se: SearchEngineSchema,
  sort: z.object({}).optional(),
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(10).max(500).default(PAGINATION_DEFAULTS.size),
});

export type GetOrganicCompetitorsPageParams = z.infer<typeof GetOrganicCompetitorsPageSchema>;

// getTopUrls
export const GetTopUrlsSchema = z.object({
  domain: z.string().min(1).max(100),
  se: SearchEngineSchema,
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(1000).default(PAGINATION_DEFAULTS.size),
});

export type GetTopUrlsParams = z.infer<typeof GetTopUrlsSchema>;

// getDomainUrls
export const GetDomainUrlsSchema = z.object({
  domain: z.string().min(1).max(100),
  se: SearchEngineSchema,
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(1000).default(PAGINATION_DEFAULTS.size),
});

export type GetDomainUrlsParams = z.infer<typeof GetDomainUrlsSchema>;

// getDomainsHistory
export const GetDomainsHistorySchema = z.object({
  domain: z.string().min(1).max(100),
  se: SearchEngineSchema,
  during_all_time: z.boolean().optional(),
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  size: z.number().int().min(1).max(1000).default(PAGINATION_DEFAULTS.size),
});

export type GetDomainsHistoryParams = z.infer<typeof GetDomainsHistorySchema>;

// getDomainsIntersection
export const GetDomainsIntersectionSchema = z.object({
  se: SearchEngineSchema,
  domains: z.array(z.string()).min(2).max(3),
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(1000).default(PAGINATION_DEFAULTS.size),
});

export type GetDomainsIntersectionParams = z.infer<typeof GetDomainsIntersectionSchema>;

// getDomainsUniqKeywords
export const GetDomainsUniqKeywordsSchema = z.object({
  se: SearchEngineSchema,
  domains: z.array(z.string()).min(1).max(2),
  minusDomain: z.string().min(1).max(100),
  filters: z.object({}).optional(),
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(1000).default(PAGINATION_DEFAULTS.size),
});

export type GetDomainsUniqKeywordsParams = z.infer<typeof GetDomainsUniqKeywordsSchema>;

// getAllRegionsTraffic
export const GetAllRegionsTrafficSchema = z.object({
  domain: z.string().min(1).max(100),
  sort: z.enum(['traff', 'region', 'country_name_en', 'google_domain']).optional(),
  order: SortOrderSchema.default('desc'),
});

export type GetAllRegionsTrafficParams = z.infer<typeof GetAllRegionsTrafficSchema>;

// getRegionsCount
export const GetRegionsCountSchema = z.object({
  domain: z.string().min(1).max(100),
  sort: z.enum(['keywords_count', 'db_name', 'country_name_en', 'google_domain']).optional(),
  order: SortOrderSchema.default('desc'),
});

export type GetRegionsCountParams = z.infer<typeof GetRegionsCountSchema>;

// exportPositions
export const ExportPositionsSchema = z.object({
  domain: z.string().min(1).max(100),
  se: SearchEngineSchema,
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(60000).default(PAGINATION_DEFAULTS.size),
});

export type ExportPositionsParams = z.infer<typeof ExportPositionsSchema>;

/**
 * Utility function to validate any schema
 */
export function validateSchema<T>(schema: z.ZodType<T>, data: any): T {
  return schema.parse(data);
}

/**
 * Utility function to safely validate data with error handling
 */
export function safeValidateSchema<T>(schema: z.ZodType<T>, data: any): { success: true; data: T } | { success: false; error: string } {
  try {
    return { success: true, data: schema.parse(data) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as any).errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ') };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}