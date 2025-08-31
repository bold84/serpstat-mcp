/**
 * Serpstat Shared Library - Common Types
 * ======================================
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-08-31
 *
 * Shared type definitions used across all Serpstat MCP servers
 *
 * This module defines the core type interfaces and configuration constants used throughout
 * the Serpstat MCP server ecosystem. It provides consistent type definitions for API
 * responses, error handling, and client configuration across both domain analysis and
 * team management servers.
 *
 * Key Features:
 * - Standardized API response interfaces for consistent error handling
 * - Comprehensive configuration interfaces for API client setup
 * - Extensive search engine constants covering 200+ Google variants
 * - Pagination and sorting configuration constants
 * - Credit tracking and export configuration constants
 * - TypeScript ReadonlyArray assertions for type safety
 *
 * Architecture:
 * - Response interfaces for standardized API communication
 * - Configuration interfaces for client setup and customization
 * - Constant objects for API settings and limits
 * - Search engine mappings for global search engine support
 *
 * @module serpstat-shared
 */

/**
 * Base API response wrapper for consistent error handling
 *
 * This interface provides a standardized response format for all Serpstat API calls,
 * ensuring consistent handling of successful responses across the MCP servers.
 *
 * @template T - The type of the result data
 * @property {string} id - Unique identifier for the API request
 * @property {T} result - The actual data returned from the API
 *
 * @example
 * ```typescript
 * const response: SerpstatResponse<{ domains: string[] }> = {
 *   id: "req_123456789",
 *   result: { domains: ["example.com", "test.com"] }
 * };
 * ```
 */
export interface SerpstatResponse<T = any> {
  id: string;
  result: T;
}

/**
 * Standard error response format
 *
 * This interface defines the structure for error responses in the MCP protocol,
 * providing a consistent format for error communication between servers and clients.
 *
 * @property {boolean} isError - Flag indicating this is an error response
 * @property {Array<{type: "text", text: string}>} content - Error message content array
 *
 * @example
 * ```typescript
 * const error: ErrorResponse = {
 *   isError: true,
 *   content: [{ type: "text", text: "Invalid API key provided" }]
 * };
 * ```
 */
export interface ErrorResponse {
  isError: boolean;
  content: Array<{
    type: "text";
    text: string;
  }>;
}

/**
 * API Response wrapper for consistent error handling
 *
 * This interface provides a comprehensive response format for Serpstat API calls,
 * including success status, error information, credit usage tracking, and request identification.
 * It serves as the standard response format for all API interactions within the shared library.
 *
 * @template T - The type of the data payload in successful responses
 * @property {boolean} success - Whether the API call was successful
 * @property {T} [data] - The data payload (only present on success)
 * @property {Object} [error] - Error information (only present on failure)
 * @property {string} error.code - Error code for programmatic handling
 * @property {string} error.message - Human-readable error message
 * @property {any} [error.details] - Additional error details for debugging
 * @property {number} [credits_used] - Number of API credits consumed by the request
 * @property {string} [request_id] - Unique identifier for the API request
 *
 * @example
 * ```typescript
 * const successResponse: ApiResponse<{ keyword_count: number }> = {
 *   success: true,
 *   data: { keyword_count: 1500 },
 *   credits_used: 5
 * };
 *
 * const errorResponse: ApiResponse = {
 *   success: false,
 *   error: {
 *     code: "INVALID_API_KEY",
 *     message: "The provided API key is invalid or expired"
 *   }
 * };
 * ```
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  credits_used?: number;
  request_id?: string;
}

/**
 * API Client Configuration
 *
 * This interface defines the configuration options for the Serpstat API client,
 * allowing customization of connection parameters, timeout settings, and retry behavior.
 * All properties are optional except for the API key, which is required for authentication.
 *
 * @property {string} apiKey - The API key for authenticating with Serpstat API (required)
 * @property {string} [baseURL] - Base URL for the Serpstat API (defaults to official API endpoint)
 * @property {number} [timeout] - Request timeout in milliseconds (defaults to 120000ms/2min)
 * @property {number} [maxRetries] - Maximum number of retry attempts for failed requests (defaults to 3)
 * @property {number} [retryDelay] - Initial delay between retries in milliseconds (defaults to 1000ms)
 *
 * @example
 * ```typescript
 * const config: ApiClientConfig = {
 *   apiKey: "your_api_key_here",
 *   baseURL: "https://api.serpstat.com/v4",
 *   timeout: 60000,
 *   maxRetries: 5,
 *   retryDelay: 2000
 * };
 * ```
 */
export interface ApiClientConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
}

/**
 * Base API configuration constants
 *
 * This object defines the default configuration settings for the Serpstat API client,
 * including the base URL, timeout duration, and retry behavior. These constants
 * provide sensible defaults that can be overridden when creating an API client instance.
 *
 * @property {string} baseURL - The base URL for all API requests (official Serpstat API v4 endpoint)
 * @property {number} timeout - Default request timeout in milliseconds (2 minutes)
 * @property {number} maxRetries - Default maximum number of retry attempts for failed requests
 * @property {number} retryDelay - Default initial delay between retry attempts in milliseconds
 *
 * @example
 * ```typescript
 * import { API_CONFIG } from './types';
 *
 * // Use default configuration
 * const config = { ...API_CONFIG, apiKey: "your_key" };
 *
 * // Override timeout setting
 * const customConfig = { ...API_CONFIG, timeout: 60000 };
 * ```
 */
export const API_CONFIG = {
  baseURL: "https://api.serpstat.com/v4",
  timeout: 120000,
  maxRetries: 3,
  retryDelay: 1000
} as const;

/**
 * Default pagination values
 *
 * This object defines the standard pagination parameters used across all Serpstat API endpoints
 * that support pagination. These values provide a balance between performance and data completeness,
 * with sensible defaults that can be customized based on specific use cases.
 *
 * @property {number} page - Default starting page number (1-based indexing)
 * @property {number} size - Default number of items per page
 * @property {number} maxSize - Maximum allowed items per page (enforced by API limits)
 * @property {number} minSize - Minimum allowed items per page (enforced by API limits)
 *
 * @example
 * ```typescript
 * import { PAGINATION_DEFAULTS } from './types';
 *
 * // Use default pagination
 * const pagination = {
 *   page: PAGINATION_DEFAULTS.page,
 *   size: PAGINATION_DEFAULTS.size
 * };
 *
 * // Use maximum page size for comprehensive data retrieval
 * const fullPage = {
 *   page: 1,
 *   size: PAGINATION_DEFAULTS.maxSize
 * };
 * ```
 */
export const PAGINATION_DEFAULTS = {
  page: 1,
  size: 100,
  maxSize: 1000,
  minSize: 1
} as const;

/**
 * Sort order options
 *
 * This readonly array defines the supported sorting directions for API responses
 * that support ordering. The values represent ascending and descending order
 * and are used consistently across different API endpoints for sorting results.
 *
 * @type {ReadonlyArray<"asc" | "desc">}
 * @property {"asc"} - Sort in ascending order (A-Z, 0-9, earliest to latest)
 * @property {"desc"} - Sort in descending order (Z-A, 9-0, latest to earliest)
 *
 * @example
 * ```typescript
 * import { SORT_ORDERS } from './types';
 *
 * // Use in API request configuration
 * const sortConfig = {
 *   field: "keywords",
 *   order: SORT_ORDERS[1] // "desc"
 * };
 *
 * // Validate sort order input
 * function isValidSortOrder(order: string): order is "asc" | "desc" {
 *   return SORT_ORDERS.includes(order as "asc" | "desc");
 * }
 * ```
 */
export const SORT_ORDERS = ["asc", "desc"] as const;

/**
 * Standard pagination schema
 *
 * This object defines the validation schema for pagination parameters used across
 * all Serpstat API endpoints. It provides type-safe validation with minimum and
 * maximum constraints, along with default values for consistent pagination behavior.
 *
 * @property {Object} page - Page number configuration
 * @property {string} page.type - Data type validation ("number")
 * @property {number} page.min - Minimum allowed page number (1)
 * @property {number} page.default - Default page number when not specified
 * @property {Object} size - Page size configuration
 * @property {string} size.type - Data type validation ("number")
 * @property {number} size.min - Minimum allowed page size
 * @property {number} size.max - Maximum allowed page size (API limit)
 * @property {number} size.default - Default page size when not specified
 *
 * @example
 * ```typescript
 * import { BasePaginationSchema, PAGINATION_DEFAULTS } from './types';
 *
 * // Validate pagination parameters
 * const validatePagination = (params: { page?: number; size?: number }) => {
 *   const validated = {
 *     page: params.page ?? BasePaginationSchema.page.default,
 *     size: params.size ?? BasePaginationSchema.size.default
 *   };
 *
 *   // Apply constraints
 *   validated.page = Math.max(BasePaginationSchema.page.min, validated.page);
 *   validated.size = Math.max(
 *     BasePaginationSchema.size.min,
 *     Math.min(BasePaginationSchema.size.max, validated.size)
 *   );
 *
 *   return validated;
 * };
 * ```
 */
export const BasePaginationSchema = {
  page: { type: "number", min: 1, default: PAGINATION_DEFAULTS.page },
  size: { type: "number", min: 1, max: 1000, default: PAGINATION_DEFAULTS.size }
} as const;

/**
 * Complete list of all supported search engines for Serpstat API
 *
 * This readonly array contains all supported search engine codes for the Serpstat API,
 * including over 200 Google country variants and Bing US. The search engine codes
 * follow the pattern "g_xx" for Google variants (where xx is the country code)
 * and specific codes for other search engines.
 *
 * @type {ReadonlyArray<string>}
 * @property {string[]} Google country variants - All supported Google country variants (e.g., "g_us", "g_uk", "g_ca")
 * @property {"bing_us"} Bing US - Currently supported Bing variant for United States
 *
 * @remarks
 * Based on official Serpstat API documentation. Google country variants follow the ISO 3166-1 alpha-2
 * country code format with a "g_" prefix. The complete list covers major markets and regions worldwide.
 *
 * @example
 * ```typescript
 * import { SEARCH_ENGINES } from './types';
 *
 * // Validate search engine code
 * function isValidSearchEngine(engine: string): boolean {
 *   return SEARCH_ENGINES.includes(engine);
 * }
 *
 * // Get Google variants only
 * const googleEngines = SEARCH_ENGINES.filter(engine => engine.startsWith('g_'));
 *
 * // Use in API request
 * const requestConfig = {
 *   domain: "example.com",
 *   se: "g_us" // United States Google
 * };
 * ```
 */
export const SEARCH_ENGINES = [
  // Google country variants (200+ variants)
  "g_af", "g_al", "g_dz", "g_as", "g_ad", "g_ao", "g_ai", "g_ag", "g_ar", "g_am",
  "g_aw", "g_au", "g_at", "g_az", "g_bh", "g_bd", "g_bb", "g_by", "g_be", "g_bz",
  "g_bj", "g_bm", "g_bt", "g_bo", "g_ba", "g_bw", "g_br", "g_io", "g_vg", "g_bn",
  "g_bg", "g_bf", "g_bi", "g_kh", "g_cm", "g_ca", "g_cv", "g_ky", "g_cf", "g_td",
  "g_cl", "g_cn", "g_cx", "g_cc", "g_co", "g_km", "g_ck", "g_cr", "g_ci", "g_hr",
  "g_cw", "g_cy", "g_cz", "g_cd", "g_dk", "g_dj", "g_dm", "g_do", "g_ec", "g_eg",
  "g_sv", "g_gq", "g_er", "g_ee", "g_et", "g_fk", "g_fo", "g_fm", "g_fj", "g_fi",
  "g_fr", "g_gf", "g_pf", "g_ga", "g_ge", "g_de", "g_gh", "g_gi", "g_gr", "g_gl",
  "g_gd", "g_gp", "g_gu", "g_gt", "g_gg", "g_gn", "g_gw", "g_gy", "g_ht", "g_hn",
  "g_hk", "g_hu", "g_is", "g_in", "g_id", "g_iq", "g_ie", "g_im", "g_il", "g_it",
  "g_jm", "g_jp", "g_je", "g_jo", "g_kz", "g_ke", "g_ki", "g_kw", "g_kg", "g_la",
  "g_lv", "g_lb", "g_ls", "g_lr", "g_ly", "g_li", "g_lt", "g_lu", "g_mo", "g_mk",
  "g_mg", "g_mw", "g_my", "g_mv", "g_ml", "g_mt", "g_mh", "g_mq", "g_mr", "g_mu",
  "g_yt", "g_mx", "g_md", "g_mc", "g_mn", "g_me", "g_ms", "g_ma", "g_mz", "g_mm",
  "g_na", "g_nr", "g_np", "g_nl", "g_nc", "g_nz", "g_ni", "g_ne", "g_ng", "g_nu",
  "g_nf", "g_mp", "g_no", "g_om", "g_pk", "g_pw", "g_ps", "g_pa", "g_pg", "g_py",
  "g_pe", "g_ph", "g_pn", "g_pl", "g_pt", "g_pr", "g_qa", "g_cg", "g_re", "g_ro",
  "g_ru", "g_rw", "g_sh", "g_kn", "g_lc", "g_pm", "g_vc", "g_ws", "g_sm", "g_st",
  "g_sa", "g_sn", "g_rs", "g_sc", "g_sl", "g_sg", "g_sx", "g_sk", "g_si", "g_sb",
  "g_so", "g_za", "g_kr", "g_es", "g_lk", "g_sr", "g_sz", "g_se", "g_ch", "g_tw",
  "g_tj", "g_tz", "g_th", "g_bs", "g_gm", "g_tl", "g_tg", "g_tk", "g_to", "g_tt",
  "g_tn", "g_tr", "g_tm", "g_tc", "g_tv", "g_vi", "g_ug", "g_ua", "g_ae", "g_uk",
  "g_us", "g_uy", "g_uz", "g_vu", "g_va", "g_ve", "g_vn", "g_wf", "g_ye", "g_zm",
  "g_zw",
  // Bing variants (currently only US is supported)
  "bing_us"
] as const;

/**
 * Sort field options for different API methods
 *
 * This object defines the available sort fields for different categories of API endpoints.
 * Each category has its own set of valid sort fields that can be used in API requests
 * to order the results according to specific criteria.
 *
 * @property {ReadonlyArray<"traff" | "region" | "country_name_en" | "google_domain">} regions - Sort fields for regional data
 * @property {ReadonlyArray<"relevance" | "common" | "not_intersected" | "missing">} domains - Sort fields for domain analysis
 * @property {ReadonlyArray<"organic_keywords" | "facebook_shares" | "potencial_traff">} urls - Sort fields for URL analysis
 * @property {ReadonlyArray<"date" | "keywords" | "traff" | "visible">} history - Sort fields for historical data
 *
 * @remarks
 * The sort fields are specific to different API endpoint categories and should be used
 * with the appropriate sort order (asc/desc) to achieve the desired result ordering.
 *
 * @example
 * ```typescript
 * import { SORT_FIELDS } from './types';
 *
 * // Use in domain analysis request
 * const domainSort = {
 *   field: SORT_FIELDS.domains[0], // "relevance"
 *   order: "desc"
 * };
 *
 * // Use in regional traffic request
 * const regionSort = {
 *   field: SORT_FIELDS.regions[1], // "region"
 *   order: "asc"
 * };
 *
 * // Validate sort field for specific category
 * function isValidSortField(category: keyof typeof SORT_FIELDS, field: string): boolean {
 *   return SORT_FIELDS[category].includes(field as any);
 * }
 * ```
 */
export const SORT_FIELDS = {
  regions: ["traff", "region", "country_name_en", "google_domain"] as const,
  domains: ["relevance", "common", "not_intersected", "missing"] as const,
  urls: ["organic_keywords", "facebook_shares", "potencial_traff"] as const,
  history: ["date", "keywords", "traff", "visible"] as const
} as const;

/**
 * Credit information for API calls
 *
 * This object defines the credit costs for different types of API operations within
 * the Serpstat platform. Understanding these costs is important for managing API
 * usage and budgeting for large-scale data extraction operations.
 *
 * @property {number} domainsInfo - Credit cost for domain information requests (5 credits per domain)
 * @property {number} perResult - Credit cost per result for paginated endpoints (1 credit per result)
 * @property {number} exportPerRow - Credit cost per row for export operations (1 credit per row)
 *
 * @remarks
 * Credit consumption varies based on the type of API call and the amount of data requested.
 * Domain analysis operations typically cost more due to the complexity of the data processing.
 * Export operations are billed per row to encourage efficient data retrieval.
 *
 * @example
 * ```typescript
 * import { CREDIT_INFO } from './types';
 *
 * // Calculate estimated cost for domain analysis
 * function calculateDomainAnalysisCost(domainCount: number): number {
 *   return domainCount * CREDIT_INFO.domainsInfo;
 * }
 *
 * // Calculate export cost based on result size
 * function calculateExportCost(rowCount: number): number {
 *   return rowCount * CREDIT_INFO.exportPerRow;
 * }
 *
 * // Budget planning for API usage
 * const budget = {
 *   maxDomains: Math.floor(1000 / CREDIT_INFO.domainsInfo), // 200 domains
 *   maxExportRows: Math.floor(5000 / CREDIT_INFO.exportPerRow) // 5000 rows
 * };
 * ```
 */
export const CREDIT_INFO = {
  domainsInfo: 5,
  perResult: 1,
  exportPerRow: 1
} as const;

/**
 * Export configuration constants
 *
 * This object defines the limits and defaults for data export operations across
 * the Serpstat API. These values help prevent excessive data retrieval and ensure
 * optimal performance for both the client and server systems.
 *
 * @property {number} maxExportSize - Maximum number of rows that can be exported in a single request
 * @property {number} defaultExportSize - Default number of rows to export when not specified
 *
 * @remarks
 * Export operations are subject to size limits to maintain system performance and
 * prevent memory issues. The maximum export size is enforced at the API level,
 * while the default provides a balanced approach between data completeness and performance.
 *
 * @example
 * ```typescript
 * import { EXPORT_CONFIG } from './types';
 *
 * // Configure export request with safe limits
 * const exportRequest = {
 *   size: Math.min(EXPORT_CONFIG.defaultExportSize, EXPORT_CONFIG.maxExportSize),
 *   format: "csv"
 * };
 *
 * // Validate export size parameters
 * function validateExportSize(size: number): number {
 *   return Math.max(
 *     1,
 *     Math.min(EXPORT_CONFIG.maxExportSize, size)
 *   );
 * }
 *
 * // Batch export for large datasets
 * function createBatchExports(totalRows: number): Array<{ start: number; size: number }> {
 *   const batches = [];
 *   let remaining = totalRows;
 *
 *   while (remaining > 0) {
 *     const batchSize = Math.min(EXPORT_CONFIG.maxExportSize, remaining);
 *     batches.push({ size: batchSize });
 *     remaining -= batchSize;
 *   }
 *
 *   return batches;
 * }
 * ```
 */
export const EXPORT_CONFIG = {
  maxExportSize: 60000,
  defaultExportSize: 1000
} as const;
