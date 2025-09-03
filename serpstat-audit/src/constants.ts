/**
 * Serpstat Site Audit API Constants
 * ====================================
 *
 * This file contains all the API method names and constants used by the
 * Serpstat Site Audit MCP server. All method names are case-sensitive
 * and must match the exact Serpstat API specification.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 */

/**
 * Site Audit API Method Names
 * These are the exact method names required by the Serpstat API
 */
export const API_METHODS = {
  /** Start audit scanning for a project */
  start: 'AuditSite.start',
  
  /** Stop audit scanning for a project */
  stop: 'AuditSite.stop',
  
  /** Get basic audit summary information */
  getBasicInfo: 'AuditSite.getBasicInfo',
  
  /** Get detailed error elements from audit */
  getErrorElements: 'AuditSite.getErrorElements',
  
  /** Get audit error statistics by category */
  getCategoriesStatistic: 'AuditSite.getCategoriesStatistic',
  
  /** Get audit settings and configuration */
  getSettings: 'AuditSite.getSettings',
  
  /** Set audit settings and configuration */
  setSettings: 'AuditSite.setSettings',
  
  /** Get default audit settings */
  getDefaultSettings: 'AuditSite.getDefaultSettings',
  
  /** Get list of audit projects/reports */
  getList: 'AuditSite.getList',
  
  /** Get audit report without detailed errors */
  getReportWithoutDetails: 'AuditSite.getReportWithoutDetails',
  
  /** Get sub-elements by CRC hash */
  getSubElementsByCrc: 'AuditSite.getSubElementsByCrc',
  
  /** Get scan user URL list */
  getScanUserUrlList: 'AuditSite.getScanUserUrlList',
  
  /** Get audit history by error count */
  getHistoryByCountError: 'AuditSite.getHistoryByCountError',
  
  /** Export audit results */
  export: 'AuditSite.export',
} as const;

/**
 * API Limits and Defaults
 */
export const API_LIMITS = {
  MAX_RESULTS_PER_PAGE: 1000,
  MAX_TOTAL_RESULTS: 60000,
} as const;

/**
 * Audit Status Values
 */
export const AUDIT_STATUS = {
  PENDING: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
  STOPPED: 3,
  ERROR: 4,
} as const;

/**
 * Error Priority Levels
 */
export const ERROR_PRIORITIES = [
  'high',
  'medium', 
  'low',
  'information'
] as const;

/**
 * Error Categories
 */
export const ERROR_CATEGORIES = [
  'indexing',
  'content',
  'links',
  'images',
  'structure',
  'optimization',
  'security',
  'performance',
  'mobile',
  'other'
] as const;

/**
 * Sort Orders
 */
export const SORT_ORDERS = ['asc', 'desc'] as const;

/**
 * Common Sort Fields
 */
export const COMMON_SORT_FIELDS = [
  'priority',
  'category',
  'page_count',
  'error_count',
  'date'
] as const;