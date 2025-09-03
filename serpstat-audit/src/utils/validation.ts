/**
 * Serpstat Site Audit API Validation Schemas
 * ===========================================
 *
 * This file contains Zod validation schemas for all site audit API methods.
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
const ProjectIdSchema = z.object({
  projectId: z.number()
    .int('Project ID must be an integer')
    .min(1, 'Project ID must be at least 1')
    .describe('The unique identifier for an audit site project'),
});

const ReportIdSchema = z.object({
  reportId: z.number()
    .int('Report ID must be an integer')
    .min(1, 'Report ID must be at least 1')
    .describe('The unique identifier for an audit report'),
});



/**
 * start validation schema
 * Start audit scanning for a project
 */
export const StartSchema = ProjectIdSchema;

/**
 * stop validation schema
 * Stop audit scanning for a project
 */
export const StopSchema = ProjectIdSchema;

/**
 * getBasicInfo validation schema
 * Get basic audit summary information
 */
export const GetBasicInfoSchema = ReportIdSchema;

/**
 * getErrorElements validation schema
 * Get detailed error elements from audit
 */
export const GetErrorElementsSchema = z.object({
  reportId: z.number()
    .int('Report ID must be an integer')
    .min(1, 'Report ID must be at least 1')
    .describe('The unique identifier for an audit report'),
    
  compareReportId: z.number()
    .int('Compare Report ID must be an integer')
    .min(1, 'Compare Report ID must be at least 1')
    .describe('Another unique identifier for an audit report from the same project to compare'),
    
  projectId: z.number()
    .int('Project ID must be an integer')
    .min(1, 'Project ID must be at least 1')
    .describe('The unique identifier for an audit site project'),
    
  errorName: z.string()
    .min(1, 'Error name is required')
    .describe('Error Name'),
    
  mode: z.enum(['all', 'new', 'solved'])
    .optional()
    .default('all')
    .describe('Error display mode'),
    
  limit: z.number()
    .int('Limit must be an integer')
    .min(1, 'Limit must be at least 1')
    .optional()
    .default(10)
    .describe('Count of returned items in response'),
    
  offset: z.number()
    .int('Offset must be an integer')
    .min(0, 'Offset must be at least 0')
    .optional()
    .default(0)
    .describe('Batch number required for pagination'),
});

/**
 * getCategoriesStatistic validation schema
 * Get audit error statistics by category
 */
export const GetCategoriesStatisticSchema = ReportIdSchema;

/**
 * getSettings validation schema
 * Get audit settings and configuration
 */
export const GetSettingsSchema = ProjectIdSchema;

/**
 * setSettings validation schema
 * Set audit settings and configuration
 */
export const SetSettingsSchema = ProjectIdSchema
  .extend({
    mainSettings: z.object({
      domain: z.string()
        .min(1, 'Domain is required')
        .describe('The domain name to audit'),
        
      name: z.string()
        .min(1, 'Project name is required')
        .describe('The project name'),
        
      subdomainsCheck: z.boolean()
        .optional()
        .describe('Whether to check subdomains'),
        
      pagesLimit: z.number()
        .int('Pages limit must be an integer')
        .min(1, 'Pages limit must be at least 1')
        .max(100000, 'Pages limit cannot exceed 100000')
        .optional()
        .describe('Limit for number of pages to scan'),
        
      scanSpeed: z.number()
        .int('Scan speed must be an integer')
        .min(1, 'Scan speed must be at least 1')
        .max(10, 'Scan speed cannot exceed 10')
        .optional()
        .describe('Scan speed setting (1-10)'),
        
      autoSpeed: z.boolean()
        .optional()
        .describe('Enable automatic speed adjustment'),
        
      autoUserAgent: z.boolean()
        .optional()
        .describe('Use automatic user agent'),
        
      scanNoIndex: z.boolean()
        .optional()
        .describe('Scan no-index pages'),
        
      scanWrongCanonical: z.boolean()
        .optional()
        .describe('Scan pages with wrong canonical tags'),
        
      scanDuration: z.number()
        .int('Scan duration must be an integer')
        .min(1, 'Scan duration must be at least 1')
        .max(168, 'Scan duration cannot exceed 168 hours')
        .optional()
        .describe('Scan duration in hours'),
        
      folderDepth: z.number()
        .int('Folder depth must be an integer')
        .min(0, 'Folder depth must be at least 0')
        .max(20, 'Folder depth cannot exceed 20')
        .optional()
        .describe('Maximum folder depth'),
        
      urlDepth: z.number()
        .int('URL depth must be an integer')
        .min(1, 'URL depth must be at least 1')
        .max(50, 'URL depth cannot exceed 50')
        .optional()
        .describe('Maximum URL depth'),
        
      userAgent: z.number()
        .int('User agent must be an integer')
        .min(0, 'User agent must be at least 0')
        .max(10, 'User agent cannot exceed 10')
        .optional()
        .describe('User agent type'),
        
      robotsTxt: z.boolean()
        .optional()
        .describe('Respect robots.txt'),
        
      withImages: z.boolean()
        .optional()
        .describe('Include images in scan'),
    }),
    
    dontScanKeywordsBlock: z.object({
      checked: z.boolean()
        .optional()
        .describe('Whether this block is enabled'),
        
      keywords: z.string()
        .optional()
        .describe('Keywords to exclude from scanning'),
    }),
    
    onlyScanKeywordsBlock: z.object({
      checked: z.boolean()
        .optional()
        .describe('Whether this block is enabled'),
        
      keywords: z.string()
        .optional()
        .describe('Keywords to include in scanning'),
    }),
    
    baseAuthBlock: z.object({
      login: z.string()
        .optional()
        .describe('Login for authentication'),
        
      password: z.string()
        .optional()
        .describe('Password for authentication'),
    }),
    
    mailTriggerSettings: z.object({
      emails: z.array(z.string().email('Invalid email address'))
        .optional()
        .describe('List of email addresses for notifications'),
        
      interval: z.number()
        .int('Interval must be an integer')
        .min(1, 'Interval must be at least 1')
        .max(30, 'Interval cannot exceed 30')
        .optional()
        .describe('Email notification interval'),
        
      enabled: z.boolean()
        .optional()
        .describe('Whether mail notifications are enabled'),
        
      enableExportAfterFinish: z.boolean()
        .optional()
        .describe('Enable export after scan completion'),
    }),
    
    scheduleSettings: z.object({
      scheduleRepeatOption: z.number()
        .int('Schedule repeat option must be an integer')
        .min(0, 'Schedule repeat option must be at least 0')
        .max(10, 'Schedule repeat option cannot exceed 10')
        .optional()
        .describe('Schedule repeat option'),
    }),
    
    scanSetting: z.object({
      type: z.number()
        .int('Scan type must be an integer')
        .min(1, 'Scan type must be at least 1')
        .max(5, 'Scan type cannot exceed 5')
        .optional()
        .describe('Scan type'),
        
      list: z.array(z.string())
        .optional()
        .describe('List of specific scan items'),
        
      importedFilename: z.string()
        .optional()
        .describe('Imported filename'),
    }),
    
    errorsSettings: z.object({
      tiny_title: z.number()
        .int('Tiny title limit must be an integer')
        .min(1, 'Tiny title limit must be at least 1')
        .max(100, 'Tiny title limit cannot exceed 100')
        .optional()
        .describe('Maximum title length for tiny title error'),
        
      long_title: z.number()
        .int('Long title limit must be an integer')
        .min(50, 'Long title limit must be at least 50')
        .max(200, 'Long title limit cannot exceed 200')
        .optional()
        .describe('Maximum title length for long title error'),
        
      tiny_desc: z.number()
        .int('Tiny description limit must be an integer')
        .min(50, 'Tiny description limit must be at least 50')
        .max(200, 'Tiny description limit cannot exceed 200')
        .optional()
        .describe('Maximum description length for tiny description error'),
        
      long_desc: z.number()
        .int('Long description limit must be an integer')
        .min(150, 'Long description limit must be at least 150')
        .max(320, 'Long description limit cannot exceed 320')
        .optional()
        .describe('Maximum description length for long description error'),
        
      long_url: z.number()
        .int('Long URL limit must be an integer')
        .min(500, 'Long URL limit must be at least 500')
        .max(4096, 'Long URL limit cannot exceed 4096')
        .optional()
        .describe('Maximum URL length for long URL error'),
        
      large_image_size: z.number()
        .int('Large image size limit must be an integer')
        .min(50, 'Large image size limit must be at least 50')
        .max(5000, 'Large image size limit cannot exceed 5000')
        .optional()
        .describe('Maximum image size for large image error (KB)'),
        
      large_page_size: z.number()
        .int('Large page size limit must be an integer')
        .min(1, 'Large page size limit must be at least 1')
        .max(10, 'Large page size limit cannot exceed 10')
        .optional()
        .describe('Maximum page size for large page error (MB)'),
        
      many_external_links: z.number()
        .int('External links limit must be an integer')
        .min(10, 'External links limit must be at least 10')
        .max(1000, 'External links limit cannot exceed 1000')
        .optional()
        .describe('Maximum number of external links for many external links error'),
    }),
  });

/**
 * getDefaultSettings validation schema
 * Get default audit settings
 */
export const GetDefaultSettingsSchema = z.object({}).describe('No parameters required');

/**
 * getList validation schema
 * Get list of audit projects/reports
 */
export const GetListSchema = ProjectIdSchema
  .extend({
    limit: z.number()
      .int('Limit must be an integer')
      .min(1, 'Limit must be at least 1')
      .max(100, 'Limit cannot exceed 100')
      .optional()
      .describe('Count of returned items in response (Default: 30)'),
      
    offset: z.number()
      .int('Offset must be an integer')
      .min(0, 'Offset must be at least 0')
      .optional()
      .describe('Batch number required for pagination (Default: 0)'),
  });

/**
 * getReportWithoutDetails validation schema
 * Get audit report without detailed errors
 */
export const GetReportWithoutDetailsSchema = ReportIdSchema;

/**
 * getSubElementsByCrc validation schema
 * Get sub-elements by CRC hash
 */
export const GetSubElementsByCrcSchema = z.object({
  reportId: z.number()
    .int('Report ID must be an integer')
    .min(1, 'Report ID must be at least 1')
    .describe('The unique identifier for an audit report'),
    
  projectId: z.number()
    .int('Project ID must be an integer')
    .min(1, 'Project ID must be at least 1')
    .describe('The unique identifier for an audit site project'),
    
  errorName: z.string()
    .min(1, 'Error name is required')
    .describe('Error Name'),
    
  crc: z.number()
    .int('CRC must be an integer')
    .describe('URL crc'),
    
  compareReportId: z.number()
    .int('Compare Report ID must be an integer')
    .min(1, 'Compare Report ID must be at least 1')
    .optional()
    .describe('Another unique identifier for an audit report from the same project to compare'),
    
  mode: z.enum(['all', 'new', 'solved'])
    .optional()
    .default('all')
    .describe('Error display mode'),
    
  limit: z.number()
    .int('Limit must be an integer')
    .min(1, 'Limit must be at least 1')
    .optional()
    .default(30)
    .describe('Count of returned items in response'),
    
  offset: z.number()
    .int('Offset must be an integer')
    .min(0, 'Offset must be at least 0')
    .optional()
    .default(0)
    .describe('Batch number required for pagination'),
});

/**
 * getScanUserUrlList validation schema
 * Get scan user URL list
 */
export const GetScanUserUrlListSchema = ProjectIdSchema;

/**
 * getHistoryByCountError validation schema
 * Get audit history by error count
 */
export const GetHistoryByCountErrorSchema = ProjectIdSchema
  .extend({
    errorName: z.string()
      .min(1, 'Error name is required')
      .describe('Error Name'),
      
    limit: z.number()
      .int('Limit must be an integer')
      .min(1, 'Limit must be at least 1')
      .optional()
      .default(30)
      .describe('Count of returned items in response'),
      
    offset: z.number()
      .int('Offset must be an integer')
      .min(0, 'Offset must be at least 0')
      .optional()
      .default(0)
      .describe('Batch number required for pagination'),
  });

/**
 * export validation schema
 * Export audit results
 */
export const ExportSchema = ReportIdSchema
  .extend({
    exportType: z.enum(['mgxlsx', 'mgxlsx_mfiles', 'puppeter_pdf'])
      .describe('Type of export file'),
  });

/**
 * Type exports for TypeScript
 */
export type StartInput = z.infer<typeof StartSchema>;
export type StopInput = z.infer<typeof StopSchema>;
export type GetBasicInfoInput = z.infer<typeof GetBasicInfoSchema>;
export type GetErrorElementsInput = z.infer<typeof GetErrorElementsSchema>;
export type GetCategoriesStatisticInput = z.infer<typeof GetCategoriesStatisticSchema>;
export type GetSettingsInput = z.infer<typeof GetSettingsSchema>;
export type SetSettingsInput = z.infer<typeof SetSettingsSchema>;
export type GetDefaultSettingsInput = z.infer<typeof GetDefaultSettingsSchema>;
export type GetListInput = z.infer<typeof GetListSchema>;
export type GetReportWithoutDetailsInput = z.infer<typeof GetReportWithoutDetailsSchema>;
export type GetSubElementsByCrcInput = z.infer<typeof GetSubElementsByCrcSchema>;
export type GetScanUserUrlListInput = z.infer<typeof GetScanUserUrlListSchema>;
export type GetHistoryByCountErrorInput = z.infer<typeof GetHistoryByCountErrorSchema>;
export type ExportInput = z.infer<typeof ExportSchema>;