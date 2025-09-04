/**
 * Serpstat SERP Crawling API Constants
 * ===================================
 *
 * This file contains all API method names and constants for the SERP Crawling API.
 * The SERP Crawling API uses a different endpoint (v2) and has separate billing.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-04
 */

/**
 * API Method Names
 * All methods use the 'tasks.' prefix as per the API documentation
 */
export const API_METHODS = {
  /** Add a single keyword task - consumes credits */
  addTask: 'tasks.addTask',
  
  /** Add multiple keywords as array - consumes credits */
  addKeywordList: 'tasks.addKeywordList',
  
  /** Get task list for last 7 days - free */
  getList: 'tasks.getList',
  
  /** Get account balance - free */
  getParsingBalance: 'tasks.getParsingBalance',
  
  /** Get SERP results - free */
  getTaskResult: 'tasks.getTaskResult',
  
  /** Get raw HTML SERP - free */
  getKeywordSerp: 'tasks.getKeywordSerp',
} as const;

/**
 * API Configuration
 * The SERP Crawling API uses different endpoint and billing
 */
export const API_CONFIG = {
  /** Base URL for SERP Crawling API (different from other Serpstat APIs) */
  BASE_URL: 'https://serpstat.com/rt/api/v2',
  
  /** API version */
  VERSION: 'v2',
  
  /** Separate billing requirement */
  SEPARATE_BILLING: true,
  
  /** AI Overview becomes separate parameter on this date */
  AI_OVERVIEW_SEPARATE_DATE: '2025-08-01',
} as const;

/**
 * Search Engine Types
 * Common search engine identifiers
 */
export const SEARCH_ENGINES = {
  GOOGLE: 1,
  BING: 2,
  YANDEX: 3,
} as const;

/**
 * Device Types
 * Device type identifiers for crawling
 */
export const DEVICE_TYPES = {
  DESKTOP: 1,
  MOBILE: 2,
} as const;

/**
 * Result Types
 * Types of Google results and SERP parsing modes
 */
export const RESULT_TYPES = {
  REGULAR: 'regular',
  LOCAL: 'local',
  REGULAR_AIO: 'regular_aio',
} as const;

/**
 * Language IDs
 * Common language identifiers
 */
export const LANGUAGE_IDS = {
  ENGLISH: 1,
  SPANISH: 2,
  FRENCH: 3,
  GERMAN: 4,
  ITALIAN: 5,
  PORTUGUESE: 6,
  RUSSIAN: 7,
  JAPANESE: 8,
  CHINESE: 9,
  KOREAN: 10,
} as const;

/**
 * Country ID Ranges
 * Validation ranges for country identifiers
 */
export const COUNTRY_ID_RANGE = {
  MIN: 1,
  MAX: 247,
} as const;

/**
 * Language ID Ranges  
 * Validation ranges for language identifiers
 */
export const LANGUAGE_ID_RANGE = {
  MIN: 1,
  MAX: 48,
} as const;

/**
 * Pagination Limits
 * Pagination configuration for list methods
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 100,
  MAX_PAGE_SIZE: 1000,
} as const;

/**
 * Task Status
 * Common task progress values
 */
export const TASK_STATUS = {
  NOT_STARTED: '0%',
  IN_PROGRESS: '50%',
  COMPLETED: '100%',
} as const;

/**
 * API Limits
 * Various limits and constraints
 */
export const API_LIMITS = {
  /** Maximum results per API call */
  MAX_RESULTS: 60000,
  
  /** Time range for task list (days) */
  TASK_LIST_DAYS: 7,
  
  /** Rate limits per second (depending on plan) */
  RATE_LIMITS: {
    STANDARD: 1,
    PREMIUM: 10,
  },
} as const;

/**
 * Credit Information
 * Information about API credit consumption
 */
export const CREDIT_INFO = {
  /** Methods that consume credits */
  PAID_METHODS: [
    API_METHODS.addTask,
    API_METHODS.addKeywordList,
  ],
  
  /** Methods that are free */
  FREE_METHODS: [
    API_METHODS.getList,
    API_METHODS.getParsingBalance,
    API_METHODS.getTaskResult,
    API_METHODS.getKeywordSerp,
  ],
  
  /** Separate billing notice */
  SEPARATE_BILLING_NOTICE: 'This API has separate billing and credits must be purchased separately',
} as const;