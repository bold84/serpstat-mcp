/**
 * Serpstat SERP Crawling API Validation Schemas
 * ============================================
 *
 * This file contains Zod validation schemas for all SERP Crawling API methods.
 * Each schema provides comprehensive input validation with detailed error messages
 * and proper type checking for all parameters based on the API documentation.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-04
 */

import { z } from 'zod';
import { 
  COUNTRY_ID_RANGE,
  LANGUAGE_ID_RANGE,
  PAGINATION,
  RESULT_TYPES,
  DEVICE_TYPES,
  LANGUAGE_IDS
} from '../constants.js';

/**
 * Base schemas for common parameters
 */
const SeIdSchema = z.object({
  seId: z.number()
    .int('Search engine ID must be an integer')
    .min(1, 'Search engine ID must be at least 1')
    .describe('Search engine identifier'),
});

const CountryIdSchema = z.object({
  countryId: z.number()
    .int('Country ID must be an integer')
    .min(COUNTRY_ID_RANGE.MIN, `Country ID must be at least ${COUNTRY_ID_RANGE.MIN}`)
    .max(COUNTRY_ID_RANGE.MAX, `Country ID cannot exceed ${COUNTRY_ID_RANGE.MAX}`)
    .describe('Country identifier (1-247)'),
});

const RegionIdSchema = z.object({
  regionId: z.number()
    .int('Region ID must be an integer')
    .min(1, 'Region ID must be at least 1')
    .optional()
    .describe('Region or city identifier'),
});

const LangIdSchema = z.object({
  langId: z.number()
    .int('Language ID must be an integer')
    .min(LANGUAGE_ID_RANGE.MIN, `Language ID must be at least ${LANGUAGE_ID_RANGE.MIN}`)
    .max(LANGUAGE_ID_RANGE.MAX, `Language ID cannot exceed ${LANGUAGE_ID_RANGE.MAX}`)
    .optional()
    .default(LANGUAGE_IDS.ENGLISH)
    .describe('Language identifier (default: 1 for English)'),
});

const TypeIdSchema = z.object({
  typeId: z.number()
    .int('Device type ID must be an integer')
    .min(DEVICE_TYPES.DESKTOP, `Device type ID must be ${DEVICE_TYPES.DESKTOP} or ${DEVICE_TYPES.MOBILE}`)
    .max(DEVICE_TYPES.MOBILE, `Device type ID must be ${DEVICE_TYPES.DESKTOP} or ${DEVICE_TYPES.MOBILE}`)
    .optional()
    .default(DEVICE_TYPES.DESKTOP)
    .describe('Device type identifier (1=Desktop, 2=Mobile)'),
});

const TypeSchema = z.object({
  type: z.enum([RESULT_TYPES.REGULAR, RESULT_TYPES.LOCAL, RESULT_TYPES.REGULAR_AIO])
    .optional()
    .default(RESULT_TYPES.REGULAR)
    .describe('Type of Google results and SERP parsing mode'),
});

const TaskIdSchema = z.object({
  taskId: z.number()
    .int('Task ID must be an integer')
    .min(1, 'Task ID must be at least 1')
    .describe('Crawling identifier'),
});

const KeywordIdSchema = z.object({
  keywordId: z.number()
    .int('Keyword ID must be an integer')
    .min(1, 'Keyword ID must be at least 1')
    .describe('Keyword identifier for getting raw SERP'),
});

const PaginationSchema = z.object({
  page: z.number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .optional()
    .default(PAGINATION.DEFAULT_PAGE)
    .describe('Page number'),
    
  pageSize: z.number()
    .int('Page size must be an integer')
    .min(PAGINATION.MIN_PAGE_SIZE, `Page size must be at least ${PAGINATION.MIN_PAGE_SIZE}`)
    .max(PAGINATION.MAX_PAGE_SIZE, `Page size cannot exceed ${PAGINATION.MAX_PAGE_SIZE}`)
    .optional()
    .describe('Page size (100-1000)'),
});

/**
 * addTask validation schema
 * Add a single keyword task for SERP crawling
 */
export const AddTaskSchema = z.object({
  keywords: z.string()
    .min(1, 'Keywords must be at least 1 character')
    .describe('Keywords for parsing divided by commas'),
    
  seId: z.number()
    .int('Search engine ID must be an integer')
    .min(1, 'Search engine ID must be at least 1')
    .describe('Search engine identifier'),
    
  countryId: z.number()
    .int('Country ID must be an integer')
    .min(COUNTRY_ID_RANGE.MIN, `Country ID must be at least ${COUNTRY_ID_RANGE.MIN}`)
    .max(COUNTRY_ID_RANGE.MAX, `Country ID cannot exceed ${COUNTRY_ID_RANGE.MAX}`)
    .describe('Country identifier (1-247)'),
    
  regionId: z.number()
    .int('Region ID must be an integer')
    .min(1, 'Region ID must be at least 1')
    .optional()
    .describe('Region or city identifier'),
    
  langId: z.number()
    .int('Language ID must be an integer')
    .min(LANGUAGE_ID_RANGE.MIN, `Language ID must be at least ${LANGUAGE_ID_RANGE.MIN}`)
    .max(LANGUAGE_ID_RANGE.MAX, `Language ID cannot exceed ${LANGUAGE_ID_RANGE.MAX}`)
    .optional()
    .default(LANGUAGE_IDS.ENGLISH)
    .describe('Language identifier (default: 1 for English)'),
    
  typeId: z.number()
    .int('Device type ID must be an integer')
    .min(DEVICE_TYPES.DESKTOP, `Device type ID must be ${DEVICE_TYPES.DESKTOP} or ${DEVICE_TYPES.MOBILE}`)
    .max(DEVICE_TYPES.MOBILE, `Device type ID must be ${DEVICE_TYPES.DESKTOP} or ${DEVICE_TYPES.MOBILE}`)
    .optional()
    .default(DEVICE_TYPES.DESKTOP)
    .describe('Device type identifier (1=Desktop, 2=Mobile)'),
    
  type: z.enum([RESULT_TYPES.REGULAR, RESULT_TYPES.LOCAL, RESULT_TYPES.REGULAR_AIO])
    .optional()
    .default(RESULT_TYPES.REGULAR)
    .describe('Type of Google results and SERP parsing mode'),
});

/**
 * addKeywordList validation schema
 * Add multiple keywords as array for SERP crawling
 */
export const AddKeywordListSchema = z.object({
  keywords: z.array(z.string()
    .min(1, 'Each keyword must be at least 1 character'))
    .min(1, 'Keywords array must contain at least 1 keyword')
    .describe('Array of keyword strings with commas for parsing'),
    
  seId: z.number()
    .int('Search engine ID must be an integer')
    .min(1, 'Search engine ID must be at least 1')
    .describe('Search engine identifier'),
    
  countryId: z.number()
    .int('Country ID must be an integer')
    .min(COUNTRY_ID_RANGE.MIN, `Country ID must be at least ${COUNTRY_ID_RANGE.MIN}`)
    .max(COUNTRY_ID_RANGE.MAX, `Country ID cannot exceed ${COUNTRY_ID_RANGE.MAX}`)
    .describe('Country identifier (1-247)'),
    
  regionId: z.number()
    .int('Region ID must be an integer')
    .min(1, 'Region ID must be at least 1')
    .optional()
    .describe('Region or city identifier'),
    
  langId: z.number()
    .int('Language ID must be an integer')
    .min(LANGUAGE_ID_RANGE.MIN, `Language ID must be at least ${LANGUAGE_ID_RANGE.MIN}`)
    .max(LANGUAGE_ID_RANGE.MAX, `Language ID cannot exceed ${LANGUAGE_ID_RANGE.MAX}`)
    .optional()
    .default(LANGUAGE_IDS.ENGLISH)
    .describe('Language identifier (default: 1 for English)'),
    
  typeId: z.number()
    .int('Device type ID must be an integer')
    .min(DEVICE_TYPES.DESKTOP, `Device type ID must be ${DEVICE_TYPES.DESKTOP} or ${DEVICE_TYPES.MOBILE}`)
    .max(DEVICE_TYPES.MOBILE, `Device type ID must be ${DEVICE_TYPES.DESKTOP} or ${DEVICE_TYPES.MOBILE}`)
    .optional()
    .default(DEVICE_TYPES.DESKTOP)
    .describe('Device type identifier (1=Desktop, 2=Mobile)'),
    
  type: z.enum([RESULT_TYPES.REGULAR, RESULT_TYPES.LOCAL, RESULT_TYPES.REGULAR_AIO])
    .optional()
    .default(RESULT_TYPES.REGULAR)
    .describe('Type of Google results and SERP parsing mode'),
});

/**
 * getList validation schema
 * Get list of tasks for the last 7 days
 */
export const GetListSchema = PaginationSchema;

/**
 * getParsingBalance validation schema
 * Get account balance (no parameters required)
 */
export const GetParsingBalanceSchema = z.object({});

/**
 * getTaskResult validation schema
 * Get SERP crawling results using task ID
 */
export const GetTaskResultSchema = TaskIdSchema.merge(
  z.object({
    page: z.number()
      .int('Page must be an integer')
      .min(1, 'Page must be at least 1')
      .optional()
      .default(PAGINATION.DEFAULT_PAGE)
      .describe('Page number for pagination'),
  })
);

/**
 * getKeywordSerp validation schema
 * Get raw HTML SERP for a specific keyword
 */
export const GetKeywordSerpSchema = TaskIdSchema.merge(KeywordIdSchema);

/**
 * Type exports for TypeScript
 */
export type AddTaskInput = z.infer<typeof AddTaskSchema>;
export type AddKeywordListInput = z.infer<typeof AddKeywordListSchema>;
export type GetListInput = z.infer<typeof GetListSchema>;
export type GetParsingBalanceInput = z.infer<typeof GetParsingBalanceSchema>;
export type GetTaskResultInput = z.infer<typeof GetTaskResultSchema>;
export type GetKeywordSerpInput = z.infer<typeof GetKeywordSerpSchema>;