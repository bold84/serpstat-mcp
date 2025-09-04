/**
 * Serpstat Project Management API Validation Schemas
 * ==================================================
 *
 * This file contains Zod validation schemas for all project management API methods.
 * Each schema provides comprehensive input validation with detailed error messages
 * and proper type checking for all parameters based on the API documentation.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-04
 */

import { z } from 'zod';
import { 
  PAGE_SIZE_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  API_LIMITS
} from '../constants.js';

/**
 * Base schemas for common parameters
 */
const DomainSchema = z.object({
  domain: z.string()
    .min(1, 'Domain must be at least 1 character')
    .max(API_LIMITS.MAX_DOMAIN_LENGTH, `Domain cannot exceed ${API_LIMITS.MAX_DOMAIN_LENGTH} characters`)
    .regex(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 
      'Domain must be a valid domain name without protocol (e.g., example.com)')
    .describe('Domain name for the project (without protocol)'),
});

const ProjectNameSchema = z.object({
  name: z.string()
    .min(1, 'Project name must be at least 1 character')
    .max(API_LIMITS.MAX_PROJECT_NAME_LENGTH, `Project name cannot exceed ${API_LIMITS.MAX_PROJECT_NAME_LENGTH} characters`)
    .describe('Name for the project'),
});

const ProjectIdSchema = z.object({
  project_id: z.number()
    .int('Project ID must be an integer')
    .min(1, 'Project ID must be at least 1')
    .describe('ID of the project in Serpstat'),
});

const PaginationSchema = z.object({
  page: z.number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .optional()
    .default(1)
    .describe('Page number in the projects list'),
    
  size: z.number()
    .int('Page size must be an integer')
    .min(1, 'Page size must be at least 1')
    .max(API_LIMITS.MAX_PAGE_SIZE, `Page size cannot exceed ${API_LIMITS.MAX_PAGE_SIZE}`)
    .refine(
      (size) => PAGE_SIZE_OPTIONS.includes(size as any),
      `Page size must be one of: ${PAGE_SIZE_OPTIONS.join(', ')}`
    )
    .optional()
    .default(100)
    .describe('Number of results per page in the project list'),
});

/**
 * createProject validation schema
 * Create a new project
 */
export const CreateProjectSchema = DomainSchema
  .merge(ProjectNameSchema)
  .extend({
    group: z.string()
      .max(API_LIMITS.MAX_GROUP_LENGTH, `Group name cannot exceed ${API_LIMITS.MAX_GROUP_LENGTH} characters`)
      .optional()
      .default('Default group')
      .describe('Project group name'),
      
    type: z.enum(PROJECT_TYPE_OPTIONS)
      .optional()
      .default('owner')
      .describe('Project type - "owner" or "reader"'),
  });

/**
 * deleteProject validation schema
 * Delete an existing project
 */
export const DeleteProjectSchema = ProjectIdSchema;

/**
 * getProjects validation schema
 * Get list of projects
 */
export const GetProjectsSchema = PaginationSchema;

/**
 * Type exports for TypeScript
 */
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type DeleteProjectInput = z.infer<typeof DeleteProjectSchema>;
export type GetProjectsInput = z.infer<typeof GetProjectsSchema>;