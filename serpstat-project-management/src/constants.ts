/**
 * Serpstat Project Management API Constants
 * =====================================
 *
 * This file contains all API method names and constants for the Project Management API.
 * Each method name exactly matches the Serpstat API documentation.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-04
 */

/**
 * Project Management API Method Names
 * These exactly match the method names in the Serpstat API documentation
 */
export const API_METHODS = {
  // Project Management Methods
  createProject: 'ProjectProcedure.createProject',
  deleteProject: 'ProjectProcedure.deleteProject',
  getProjects: 'ProjectProcedure.getProjects',
} as const;

/**
 * Page Size Options
 * Valid page size values for pagination
 */
export const PAGE_SIZE_OPTIONS = [20, 50, 100, 200, 500] as const;

/**
 * Project Type Options
 * Valid project type values
 */
export const PROJECT_TYPE_OPTIONS = ['owner', 'reader'] as const;

/**
 * API Limits
 * Maximum values for various parameters
 */
export const API_LIMITS = {
  MAX_PAGE_SIZE: 500,
  MAX_PROJECT_NAME_LENGTH: 255,
  MAX_DOMAIN_LENGTH: 255,
  MAX_GROUP_LENGTH: 255,
} as const;

/**
 * Method Groups for Organization
 */
export const METHOD_GROUPS = {
  PROJECT_MANAGEMENT: [
    'createProject',
    'deleteProject',
    'getProjects',
  ],
} as const;