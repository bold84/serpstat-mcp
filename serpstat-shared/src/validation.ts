/**
 * Serpstat Shared Library - Validation Utilities
 * ==============================================
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-08-31
 *
 * Common validation schemas and utilities for all Serpstat MCP servers
 *
 * This module provides comprehensive Zod validation schemas and utility functions
 * for use across all Serpstat MCP servers. It includes common validation patterns
 * for pagination, search engines, sorting, and various data types, ensuring
 * consistent input validation and type safety throughout the application.
 *
 * Key Features:
 * - Comprehensive Zod schemas for common data validation patterns
 * - Pagination validation with configurable limits
 * - Search engine validation with 200+ Google variants
 * - Sorting and filtering validation utilities
 * - Safe validation functions with error handling
 * - Factory functions for creating custom validation schemas
 * - Email, URL, and numeric validation schemas
 *
 * Available Schemas:
 * - BasePaginationSchema: Validates pagination parameters
 * - SearchEngineSchema: Validates search engine codes
 * - SortOrderSchema: Validates sorting directions
 * - FilterSchema: Generic filter validation
 * - SortSchema: Generic sort object validation
 * - EmailSchema: Email format validation
 * - PositiveNumberSchema: Positive number validation
 * - UrlSchema: URL format validation
 * - StringArraySchema: String array validation
 * - BooleanSchema: Boolean validation
 * - RequiredStringSchema: Required string validation
 * - OptionalStringSchema: Optional string validation
 *
 * Available Utility Functions:
 * - validateSchema: Basic schema validation
 * - safeValidateSchema: Safe validation with error handling
 * - createDomainSchema: Create custom domain validation
 * - createPaginationSchema: Create custom pagination schema
 * - createSearchSchema: Create custom search schema
 *
 * @module serpstat-shared
 * @requires zod
 */

import { z } from 'zod';
import {
  PAGINATION_DEFAULTS,
  SORT_ORDERS,
  SEARCH_ENGINES
} from './types.js';

/**
 * Base pagination schema for standardized pagination validation
 *
 * This schema provides consistent validation for pagination parameters across
 * all Serpstat API endpoints. It enforces minimum constraints while providing
 * sensible defaults that align with API limits and best practices.
 *
 * @property {number} page - Page number (minimum: 1, default: 1)
 * @property {number} size - Number of items per page (minimum: 1, maximum: 1000, default: 100)
 *
 * @example
 * ```typescript
 * import { BasePaginationSchema } from './validation';
 *
 * // Validate pagination parameters
 * const pagination = {
 *   page: 1,
 *   size: 50
 * };
 * const validated = BasePaginationSchema.parse(pagination);
 *
 * // Use defaults
 * const minimal = { page: 1 };
 * const withDefaults = BasePaginationSchema.parse(minimal);
 * console.log(withDefaults); // { page: 1, size: 100 }
 * ```
 */
export const BasePaginationSchema = z.object({
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(PAGINATION_DEFAULTS.maxSize).default(PAGINATION_DEFAULTS.size),
});

/**
 * Search engine validation schema
 *
 * This schema validates that a search engine code is one of the supported
 * search engines, including over 200 Google country variants and Bing US.
 * The schema is optional to allow for cases where no specific search engine is required.
 *
 * @property {string} - Search engine code (optional, must be one of SEARCH_ENGINES)
 *
 * @example
 * ```typescript
 * import { SearchEngineSchema } from './validation';
 *
 * // Validate search engine code
 * const validEngine = "g_us";
 * const result = SearchEngineSchema.parse(validEngine);
 *
 * // Optional usage
 * const optionalEngine = SearchEngineSchema.optional();
 * const withEngine = optionalEngine.parse("g_uk"); // "g_uk"
 * const withoutEngine = optionalEngine.parse(undefined); // undefined
 * ```
 */
export const SearchEngineSchema = z.enum(SEARCH_ENGINES).optional();

/**
 * Sort order validation schema
 *
 * This schema validates sorting direction parameters, ensuring that only
 * valid sort order values ("asc" or "desc") are accepted. This provides
 * type safety for sorting operations across different API endpoints.
 *
 * @property {"asc" | "desc"} - Sorting direction (ascending or descending)
 *
 * @example
 * ```typescript
 * import { SortOrderSchema } from './validation';
 *
 * // Validate sort order
 * const ascending = "asc";
 * const descending = "desc";
 *
 * const validatedAsc = SortOrderSchema.parse(ascending);
 * const validatedDesc = SortOrderSchema.parse(descending);
 *
 * // Type safety
 * const sortConfig: { order: typeof validatedAsc } = { order: validatedAsc };
 * ```
 */
export const SortOrderSchema = z.enum(SORT_ORDERS);

/**
 * Generic filter validation schema
 *
 * This schema provides a base structure for filter validation that can be
 * extended or customized for specific filtering requirements. By default,
 * it accepts any object structure and is optional to allow for cases
 * where no filtering is needed.
 *
 * @property {Object} - Filter object structure (optional)
 *
 * @example
 * ```typescript
 * import { FilterSchema } from './validation';
 *
 * // Basic filter validation
 * const filters = { category: "tech", status: "active" };
 * const validated = FilterSchema.parse(filters);
 *
 * // Optional usage
 * const optionalFilter = FilterSchema.optional();
 * const withFilters = optionalFilter.parse({ category: "tech" }); // { category: "tech" }
 * const withoutFilters = optionalFilter.parse(undefined); // undefined
 * ```
 */
export const FilterSchema = z.object({}).optional();

/**
 * Generic sort object validation schema
 *
 * This schema provides a base structure for sort object validation that can be
 * extended or customized for specific sorting requirements. It's designed
 * to work with complex sorting configurations that may include multiple fields
 * and directions.
 *
 * @property {Object} - Sort object structure (optional)
 *
 * @example
 * ```typescript
 * import { SortSchema } from './validation';
 *
 * // Complex sort configuration
 * const sortConfig = {
 *   field: "relevance",
 *   order: "desc",
 *   secondary: { field: "date", order: "asc" }
 * };
 * const validated = SortSchema.parse(sortConfig);
 * ```
 */
export const SortSchema = z.object({}).optional();

/**
 * Utility function to validate data against a schema
 *
 * This function provides a simple interface for validating data against a
 * Zod schema. It throws an error if validation fails, making it suitable
 * for cases where validation errors should be handled as exceptions.
 *
 * @template T - The expected type of the validated data
 * @param {z.ZodType<T>} schema - The Zod schema to validate against
 * @param {any} data - The data to validate
 * @returns {T} The validated data
 * @throws {z.ZodError} If validation fails
 *
 * @example
 * ```typescript
 * import { validateSchema, EmailSchema } from './validation';
 *
 * // Validate email format
 * const email = "user@example.com";
 * const validatedEmail = validateSchema(EmailSchema, email);
 *
 * // Validate with custom schema
 * const customSchema = z.object({ name: z.string(), age: z.number() });
 * const userData = { name: "John", age: 30 };
 * const validatedUser = validateSchema(customSchema, userData);
 * ```
 */
export function validateSchema<T>(schema: z.ZodType<T>, data: any): T {
  return schema.parse(data);
}

/**
 * Utility function to safely validate data with error handling
 *
 * This function provides a safe interface for validating data against a
 * Zod schema, returning a structured result object that indicates success
 * or failure. This is particularly useful for cases where validation
 * errors should be handled gracefully without throwing exceptions.
 *
 * @template T - The expected type of the validated data
 * @param {z.ZodType<T>} schema - The Zod schema to validate against
 * @param {any} data - The data to validate
 * @returns {{success: true; data: T} | {success: false; error: string}} Validation result
 *
 * @example
 * ```typescript
 * import { safeValidateSchema, EmailSchema } from './validation';
 *
 * // Safe email validation
 * const email = "invalid-email";
 * const result = safeValidateSchema(EmailSchema, email);
 *
 * if (result.success) {
 *   console.log('Valid email:', result.data);
 * } else {
 *   console.error('Validation error:', result.error);
 * }
 *
 * // Handle multiple validation errors
 * const complexData = { name: "", age: "not-a-number" };
 * const schema = z.object({
 *   name: z.string().min(1, "Name is required"),
 *   age: z.number().min(0, "Age must be positive")
 * });
 *
 * const validation = safeValidateSchema(schema, complexData);
 * if (!validation.success) {
 *   console.error('Validation failed:', validation.error);
 *   // Output: "name: Name is required, age: Age must be positive"
 * }
 * ```
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

/**
 * Email validation schema
 *
 * This schema validates that a string is in proper email format using
 * standard email validation rules. It's commonly used for user input
 * validation and API parameter validation.
 *
 * @property {string} - Email address (must be valid email format)
 *
 * @example
 * ```typescript
 * import { EmailSchema } from './validation';
 *
 * // Validate email addresses
 * const validEmail = "user@example.com";
 * const invalidEmail = "invalid-email";
 *
 * const validated = EmailSchema.parse(validEmail);
 * // Throws error for invalidEmail
 *
 * // Use in form validation
 * const emailFormSchema = z.object({
 *   email: EmailSchema,
 *   name: z.string().min(1)
 * });
 * ```
 */
export const EmailSchema = z.string().email("Invalid email format");

/**
 * Positive number validation schema
 *
 * This schema validates that a number is positive (greater than 0).
 * It's commonly used for ID validation, count validation, and any
 * scenario where negative values are not meaningful.
 *
 * @property {number} - Positive number (must be greater than 0)
 *
 * @example
 * ```typescript
 * import { PositiveNumberSchema } from './validation';
 *
 * // Validate positive numbers
 * const validNumber = 42;
 * const invalidNumber = -5;
 *
 * const validated = PositiveNumberSchema.parse(validNumber);
 * // Throws error for invalidNumber
 *
 * // Use in user validation
 * const userIdSchema = z.object({
 *   user_id: PositiveNumberSchema,
 *   name: z.string()
 * });
 * ```
 */
export const PositiveNumberSchema = z.number().positive("Value must be positive");

/**
 * URL validation schema
 *
 * This schema validates that a string is in proper URL format using
 * standard URL validation rules. It's commonly used for link validation,
 * API endpoint validation, and any scenario where URL format is required.
 *
 * @property {string} - URL (must be valid URL format)
 *
 * @example
 * ```typescript
 * import { UrlSchema } from './validation';
 *
 * // Validate URLs
 * const validUrl = "https://example.com";
 * const invalidUrl = "not-a-url";
 *
 * const validated = UrlSchema.parse(validUrl);
 * // Throws error for invalidUrl
 *
 * // Use in link validation
 * const linkSchema = z.object({
 *   url: UrlSchema,
 *   title: z.string().min(1)
 * });
 * ```
 */
export const UrlSchema = z.string().url("Invalid URL format");

/**
 * String array validation schema
 *
 * This schema validates that a value is an array of strings.
 * It's commonly used for tag lists, category lists, and any scenario
 * where multiple string values are required.
 *
 * @property {string[]} - Array of strings
 *
 * @example
 * ```typescript
 * import { StringArraySchema } from './validation';
 *
 * // Validate string arrays
 * const validArray = ["tag1", "tag2", "tag3"];
 * const invalidArray = ["tag1", 123, "tag3"];
 *
 * const validated = StringArraySchema.parse(validArray);
 * // Throws error for invalidArray
 *
 * // Use in tag validation
 * const tagsSchema = z.object({
 *   tags: StringArraySchema,
 *   category: z.string()
 * });
 * ```
 */
export const StringArraySchema = z.array(z.string());

/**
 * Boolean validation schema
 *
 * This schema validates that a value is a boolean. It's commonly
 * used for flag validation, toggle settings, and any scenario where
 * a true/false value is required.
 *
 * @property {boolean} - Boolean value
 *
 * @example
 * ```typescript
 * import { BooleanSchema } from './validation';
 *
 * // Validate boolean values
 * const validTrue = true;
 * const validFalse = false;
 * const invalidValue = "yes";
 *
 * const validatedTrue = BooleanSchema.parse(validTrue);
 * const validatedFalse = BooleanSchema.parse(validFalse);
 * // Throws error for invalidValue
 *
 * // Use in settings validation
 * const settingsSchema = z.object({
 *   enableFeature: BooleanSchema,
 *   debugMode: BooleanSchema
 * });
 * ```
 */
export const BooleanSchema = z.boolean();

/**
 * Required string validation schema
 *
 * This schema validates that a string is not empty (minimum length of 1).
 * It's commonly used for name validation, title validation, and any scenario
 * where a non-empty string is required.
 *
 * @property {string} - Non-empty string (minimum length: 1)
 *
 * @example
 * ```typescript
 * import { RequiredStringSchema } from './validation';
 *
 * // Validate required strings
 * const validString = "Hello World";
 * const emptyString = "";
 *
 * const validated = RequiredStringSchema.parse(validString);
 * // Throws error for emptyString
 *
 * // Use in form validation
 * const formSchema = z.object({
 *   name: RequiredStringSchema,
 *   description: z.string().optional()
 * });
 * ```
 */
export const RequiredStringSchema = z.string().min(1, "Field is required");

/**
 * Optional string validation schema
 *
 * This schema validates that a value is either a string or undefined.
 * It's commonly used for optional fields in forms and API parameters
 * where a string value may or may not be provided.
 *
 * @property {string | undefined} - Optional string value
 *
 * @example
 * ```typescript
 * import { OptionalStringSchema } from './validation';
 *
 * // Validate optional strings
 * const validString = "Hello World";
 * const undefinedValue = undefined;
 * const nullValue = null; // Will be treated as undefined
 *
 * const validatedString = OptionalStringSchema.parse(validString);
 * const validatedUndefined = OptionalStringSchema.parse(undefinedValue);
 * // nullValue will be converted to undefined
 * ```
 */
export const OptionalStringSchema = z.string().optional();

/**
 * Number range validation schema components
 *
 * This object provides pre-configured validation schemas for number ranges.
 * The min schema ensures values are 0 or greater, while the max schema
 * ensures values are 1 or greater. These can be used individually or
 * combined for complex range validation.
 *
 * @property {z.ZodNumber} min - Minimum value validation (0 or greater)
 * @property {z.ZodNumber} max - Maximum value validation (1 or greater)
 *
 * @example
 * ```typescript
 * import { NumberRangeSchema } from './validation';
 *
 * // Use min validation
 * const minSchema = z.object({
 *   value: NumberRangeSchema.min
 * });
 *
 * // Use max validation
 * const maxSchema = z.object({
 *   value: NumberRangeSchema.max
 * });
 *
 * // Combine for range validation
 * const rangeSchema = z.object({
 *   minValue: NumberRangeSchema.min,
 *   maxValue: NumberRangeSchema.max
 * });
 *
 * const validData = { minValue: 0, maxValue: 100 };
 * const validated = rangeSchema.parse(validData);
 * ```
 */
export const NumberRangeSchema = {
  min: z.number().min(0, "Minimum value must be 0 or greater"),
  max: z.number().min(1, "Maximum value must be 1 or greater")
};

/**
 * Create a domain validation schema
 *
 * This factory function creates a validation schema for domain names with
 * configurable maximum length. It ensures that the domain is a non-empty
 * string within the specified length limits, making it suitable for
 * domain-specific validation requirements.
 *
 * @param {number} maxLength - Maximum allowed length for domain strings (default: 100)
 * @returns {z.ZodString} A Zod string schema with domain validation rules
 *
 * @example
 * ```typescript
 * import { createDomainSchema } from './validation';
 *
 * // Create default domain schema
 * const domainSchema = createDomainSchema();
 * const validDomain = "example.com";
 * const validated = domainSchema.parse(validDomain);
 *
 * // Create custom domain schema
 * const longDomainSchema = createDomainSchema(200);
 * const longDomain = "this-is-a-very-long-domain-name-that-exceeds-normal-limits.com";
 * const longValidated = longDomainSchema.parse(longDomain);
 *
 * // Use in domain validation
 * const domainValidationSchema = z.object({
 *   domain: createDomainSchema(),
 *   subdomain: createDomainSchema(50)
 * });
 * ```
 */
export function createDomainSchema(maxLength: number = 100) {
  return z.string().min(1).max(maxLength);
}

/**
 * Create a pagination schema with custom max size
 *
 * This factory function creates a validation schema for pagination parameters
 * with a configurable maximum page size. It provides consistent validation
 * for pagination while allowing customization based on specific API limits
 * or requirements.
 *
 * @param {number} maxSize - Maximum allowed page size (default: 1000)
 * @returns {z.ZodObject} A Zod object schema with pagination validation rules
 *
 * @example
 * ```typescript
 * import { createPaginationSchema } from './validation';
 *
 * // Create default pagination schema
 * const paginationSchema = createPaginationSchema();
 * const pagination = { page: 1, size: 50 };
 * const validated = paginationSchema.parse(pagination);
 *
 * // Create custom pagination schema with smaller max size
 * const smallPaginationSchema = createPaginationSchema(100);
 * const smallPagination = { page: 1, size: 150 }; // Will fail validation
 * const smallValidated = smallPaginationSchema.parse({ page: 1, size: 50 });
 *
 * // Use in API validation
 * const apiSchema = z.object({
 *   pagination: createPaginationSchema(),
 *   filters: z.object({}).optional()
 * });
 * ```
 */
export function createPaginationSchema(maxSize: number = 1000) {
  return z.object({
    page: z.number().int().min(1).default(1),
    size: z.number().int().min(1).max(maxSize).default(100),
  });
}

/**
 * Create a search schema with optional search term
 *
 * This factory function creates a validation schema for search parameters
 * with an optional search term. It provides a consistent structure for
 * search functionality across different API endpoints and use cases.
 *
 * @returns {z.ZodObject} A Zod object schema with search validation rules
 *
 * @example
 * ```typescript
 * import { createSearchSchema } from './validation';
 *
 * // Create search schema
 * const searchSchema = createSearchSchema();
 *
 * // With search term
 * const withSearch = { search: "example query" };
 * const validatedWithSearch = searchSchema.parse(withSearch);
 *
 * // Without search term (uses default empty string)
 * const withoutSearch = {};
 * const validatedWithoutSearch = searchSchema.parse(withoutSearch);
 * console.log(validatedWithoutSearch.search); // ""
 *
 * // Use in search validation
 * const searchValidationSchema = z.object({
 *   search: createSearchSchema(),
 *   filters: z.object({}).optional()
 * });
 * ```
 */
export function createSearchSchema() {
  return z.object({
    search: z.string().optional().default(""),
  });
}