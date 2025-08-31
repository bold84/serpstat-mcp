/**
 * Serpstat Domain Analysis API Validation Schemas
 * ===============================================
 *
 * Comprehensive Zod schemas for validating all API method parameters
 * and response structures.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-08-31
 *
 * This module provides comprehensive validation schemas for all Serpstat Domain Analysis API
 * endpoints using the Zod validation library. Each schema corresponds to a specific API method
 * and ensures type safety and data integrity by validating input parameters against expected
 * formats, ranges, and constraints.
 *
 * The schemas extend shared validation utilities from the serpstat-shared library while
 * adding domain-specific validation rules and constraints. All schemas include detailed
 * error messages and provide TypeScript type inference through the `z.infer` utility.
 *
 * Features:
 * - Type-safe validation with comprehensive error messages
 * - Integration with shared validation utilities
 * - Support for complex filtering and pagination parameters
 * - Proper handling of optional and required parameters
 * - Extensible validation architecture
 *
 * @module serpstat-domain-analysis
 * @requires zod
 * @requires serpstat-shared
 */

import { z } from 'zod';
import {
  BasePaginationSchema,
  SearchEngineSchema,
  SortOrderSchema,
  validateSchema,
  safeValidateSchema
} from 'serpstat-shared';
import { PAGINATION_DEFAULTS } from '../constants.js';

// Extract default values from shared schema
const PaginationSchema = z.object({
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(1000).default(PAGINATION_DEFAULTS.size),
});

/**
 * Domain Analysis API Schemas
 *
 * This section contains validation schemas for all Serpstat Domain Analysis API endpoints.
 * Each schema is designed to validate input parameters for the corresponding API method,
 * ensuring data integrity and providing clear error messages for invalid inputs.
 */

// getDomainsInfo Schema
// Validates parameters for retrieving basic domain information including keyword count and visibility metrics
export const GetDomainsInfoSchema = z.object({
  domains: z.array(z.string()).min(1, "At least one domain is required").max(100, "Maximum 100 domains allowed"),
  se: SearchEngineSchema,
});

export type GetDomainsInfoParams = z.infer<typeof GetDomainsInfoSchema>;

// getDomainKeywords Schema
// Validates parameters for retrieving keywords that a domain ranks for in search results
export const GetDomainKeywordsSchema = z.object({
  domain: z.string().min(1, "Domain name is required").max(100, "Domain name too long"),
  se: SearchEngineSchema,
  withSubdomains: z.boolean().optional(),
  withIntents: z.boolean().optional(),
  url: z.string().url("Invalid URL format").optional(),
  keywords: z.array(z.string()).optional(),
  minusKeywords: z.array(z.string()).optional(),
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1, "Page must be at least 1").default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1, "Size must be at least 1").max(1000, "Maximum 1000 results per page").default(PAGINATION_DEFAULTS.size),
});

export type GetDomainKeywordsParams = z.infer<typeof GetDomainKeywordsSchema>;

// getAdKeywords Schema
// Validates parameters for retrieving advertising keywords for paid search analysis
export const GetAdKeywordsSchema = z.object({
  domain: z.string().min(1, "Domain name is required").max(100, "Domain name too long"),
  se: SearchEngineSchema,
  withSubdomains: z.boolean().optional(),
  withIntents: z.boolean().optional(),
  url: z.string().url("Invalid URL format").optional(),
  keywords: z.array(z.string()).optional(),
  minusKeywords: z.array(z.string()).optional(),
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1, "Page must be at least 1").default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1, "Size must be at least 1").max(1000, "Maximum 1000 results per page").default(PAGINATION_DEFAULTS.size),
});

export type GetAdKeywordsParams = z.infer<typeof GetAdKeywordsSchema>;

// getCompetitors Schema (deprecated but still documented)
// Validates parameters for competitor analysis (deprecated method but still available)
export const GetCompetitorsSchema = z.object({
  domain: z.string().min(1, "Domain name is required").max(100, "Domain name too long"),
  se: SearchEngineSchema,
  withSubdomains: z.boolean().optional(),
  withIntents: z.boolean().optional(),
  url: z.string().url("Invalid URL format").optional(),
  keywords: z.array(z.string()).optional(),
  minusKeywords: z.array(z.string()).optional(),
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1, "Page must be at least 1").default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1, "Size must be at least 1").max(1000, "Maximum 1000 results per page").default(PAGINATION_DEFAULTS.size),
});

export type GetCompetitorsParams = z.infer<typeof GetCompetitorsSchema>;

// getAdsCompetitors Schema
// Validates parameters for paid search competitor analysis
export const GetAdsCompetitorsSchema = z.object({
  domain: z.string().min(1, "Domain name is required").max(100, "Domain name too long"),
  se: SearchEngineSchema,
  withSubdomains: z.boolean().optional(),
  withIntents: z.boolean().optional(),
  url: z.string().url("Invalid URL format").optional(),
  keywords: z.array(z.string()).optional(),
  minusKeywords: z.array(z.string()).optional(),
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1, "Page must be at least 1").default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1, "Size must be at least 1").max(1000, "Maximum 1000 results per page").default(PAGINATION_DEFAULTS.size),
});

export type GetAdsCompetitorsParams = z.infer<typeof GetAdsCompetitorsSchema>;

// getOrganicCompetitorsPage Schema
// Validates parameters for organic search competitor analysis with specific size constraints
export const GetOrganicCompetitorsPageSchema = z.object({
  domain: z.string().min(1, "Domain name is required").max(100, "Domain name too long"),
  se: SearchEngineSchema,
  sort: z.object({}).optional(),
  page: z.number().int().min(1, "Page must be at least 1").default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(10, "Minimum 10 results required").max(500, "Maximum 500 results per page").default(PAGINATION_DEFAULTS.size),
});

export type GetOrganicCompetitorsPageParams = z.infer<typeof GetOrganicCompetitorsPageSchema>;

// getTopUrls Schema
// Validates parameters for retrieving top-performing URLs for a domain
export const GetTopUrlsSchema = z.object({
  domain: z.string().min(1, "Domain name is required").max(100, "Domain name too long"),
  se: SearchEngineSchema,
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1, "Page must be at least 1").default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1, "Size must be at least 1").max(1000, "Maximum 1000 results per page").default(PAGINATION_DEFAULTS.size),
});

export type GetTopUrlsParams = z.infer<typeof GetTopUrlsSchema>;

// getDomainUrls Schema
// Validates parameters for retrieving URLs associated with a domain and their keyword information
export const GetDomainUrlsSchema = z.object({
  domain: z.string().min(1, "Domain name is required").max(100, "Domain name too long"),
  se: SearchEngineSchema,
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1, "Page must be at least 1").default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1, "Size must be at least 1").max(1000, "Maximum 1000 results per page").default(PAGINATION_DEFAULTS.size),
});

export type GetDomainUrlsParams = z.infer<typeof GetDomainUrlsSchema>;

// getDomainsHistory Schema
// Validates parameters for retrieving historical domain analysis data over time
export const GetDomainsHistorySchema = z.object({
  domain: z.string().min(1, "Domain name is required").max(100, "Domain name too long"),
  se: SearchEngineSchema,
  during_all_time: z.boolean().optional(),
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  size: z.number().int().min(1, "Size must be at least 1").max(1000, "Maximum 1000 results").default(PAGINATION_DEFAULTS.size),
});

export type GetDomainsHistoryParams = z.infer<typeof GetDomainsHistorySchema>;

// getDomainsIntersection Schema
// Validates parameters for finding common keywords between multiple domains
export const GetDomainsIntersectionSchema = z.object({
  se: SearchEngineSchema,
  domains: z.array(z.string()).min(2, "At least 2 domains required for intersection").max(3, "Maximum 3 domains allowed"),
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1, "Page must be at least 1").default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1, "Size must be at least 1").max(1000, "Maximum 1000 results per page").default(PAGINATION_DEFAULTS.size),
});

export type GetDomainsIntersectionParams = z.infer<typeof GetDomainsIntersectionSchema>;

// getDomainsUniqKeywords Schema
// Validates parameters for retrieving unique keywords across multiple domains
export const GetDomainsUniqKeywordsSchema = z.object({
  se: SearchEngineSchema,
  domains: z.array(z.string()).min(1, "At least 1 domain required").max(2, "Maximum 2 domains allowed"),
  minusDomain: z.string().min(1, "Excluded domain is required").max(100, "Domain name too long"),
  filters: z.object({}).optional(),
  page: z.number().int().min(1, "Page must be at least 1").default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1, "Size must be at least 1").max(1000, "Maximum 1000 results per page").default(PAGINATION_DEFAULTS.size),
});

export type GetDomainsUniqKeywordsParams = z.infer<typeof GetDomainsUniqKeywordsSchema>;

// getAllRegionsTraffic Schema
// Validates parameters for retrieving traffic data for all regions for a domain
export const GetAllRegionsTrafficSchema = z.object({
  domain: z.string().min(1, "Domain name is required").max(100, "Domain name too long"),
  sort: z.enum(['traff', 'region', 'country_name_en', 'google_domain']).optional(),
  order: SortOrderSchema.default('desc'),
});

export type GetAllRegionsTrafficParams = z.infer<typeof GetAllRegionsTrafficSchema>;

// getRegionsCount Schema
// Validates parameters for retrieving database/region statistics for a domain
export const GetRegionsCountSchema = z.object({
  domain: z.string().min(1, "Domain name is required").max(100, "Domain name too long"),
  sort: z.enum(['keywords_count', 'db_name', 'country_name_en', 'google_domain']).optional(),
  order: SortOrderSchema.default('desc'),
});

export type GetRegionsCountParams = z.infer<typeof GetRegionsCountSchema>;

// exportPositions Schema
// Validates parameters for exporting position data to CSV format with extended size limits
export const ExportPositionsSchema = z.object({
  domain: z.string().min(1, "Domain name is required").max(100, "Domain name too long"),
  se: SearchEngineSchema,
  filters: z.object({}).optional(),
  sort: z.object({}).optional(),
  page: z.number().int().min(1, "Page must be at least 1").default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1, "Size must be at least 1").max(60000, "Maximum 60000 results for export").default(PAGINATION_DEFAULTS.size),
});

export type ExportPositionsParams = z.infer<typeof ExportPositionsSchema>;
