/**
 * Serpstat Shared Library
 * =======================
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-08-31
 *
 * A comprehensive shared library for all Serpstat MCP servers providing:
 * - Common type definitions and interfaces
 * - Shared API client with advanced error handling and retry logic
 * - Comprehensive validation utilities and schemas
 * - Base configuration constants and settings
 * - Common HTTP client utilities
 *
 * This shared library serves as the foundation for both the serpstat-domain-analysis
 * and serpstat-team-management MCP servers, providing consistent functionality,
 * type safety, and error handling across all Serpstat API integrations.
 *
 * Key Features:
 * - Robust API client with built-in retry logic and exponential backoff
 * - Comprehensive Zod validation schemas for all common data types
 * - Standardized error handling and response formatting
 * - Shared constants for pagination, sorting, and search engines
 * - Type-safe HTTP client utilities using Axios
 * - Configurable API client with environment variable support
 *
 * Architecture:
 * - types.ts: Core type definitions and interfaces
 * - api-client.ts: HTTP client with error handling and retry logic
 * - validation.ts: Comprehensive validation schemas and utilities
 *
 * @version 1.0.0
 * @module serpstat-shared
 * @requires zod
 * @requires axios
 */

// Export all types
export type {
  SerpstatResponse,
  ErrorResponse,
  ApiResponse,
  ApiClientConfig
} from './types.js';

// Export all constants
export {
  API_CONFIG,
  PAGINATION_DEFAULTS,
  SORT_ORDERS,
  SEARCH_ENGINES,
  SORT_FIELDS,
  CREDIT_INFO,
  EXPORT_CONFIG
} from './types.js';

// Export API client
export {
  SerpstatApiClient,
  createSerpstatClient,
  makeSerpstatRequest
} from './api-client.js';

// Export validation utilities
export {
  BasePaginationSchema,
  SearchEngineSchema,
  SortOrderSchema,
  FilterSchema,
  SortSchema,
  validateSchema,
  safeValidateSchema,
  EmailSchema,
  PositiveNumberSchema,
  UrlSchema,
  StringArraySchema,
  BooleanSchema,
  RequiredStringSchema,
  OptionalStringSchema,
  NumberRangeSchema,
  createDomainSchema,
  createPaginationSchema,
  createSearchSchema
} from './validation.js';

// Re-export commonly used items for convenience
export { z } from 'zod';
export { default as axios } from 'axios';