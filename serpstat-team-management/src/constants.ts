/**
 * Serpstat Team Management API Constants
 * ======================================
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-08-31
 *
 * Team-specific constants extending the shared library for Serpstat Team Management API
 *
 * This module defines all constants specific to the Serpstat Team Management MCP server.
 * It includes configuration constants, user status codes, and API method names that map
 * to the Team Management API procedures. The module also re-exports shared constants
 * from the serpstat-shared library for convenience.
 *
 * The API_METHODS object provides a mapping between the tool names used in the MCP
 * server and the corresponding procedure names in the Serpstat Team Management API.
 * This mapping ensures consistent communication with the Serpstat API endpoints.
 *
 * Key Features:
 * - Team configuration constants for pagination and result limits
 * - User status codes for tracking user activation states
 * - API method mappings for all team management operations
 * - Re-export of shared constants for consistency across modules
 *
 * Available Methods:
 * - addUser: Invite a new user to join your team by email address
 * - getList: Get a list of all users in your team with optional search and pagination
 * - activateUser: Activate an inactive user in your team
 * - deactivateUser: Deactivate an active user in your team
 * - removeUser: Remove a user from your team (optionally merge their projects)
 *
 * @module serpstat-team-management
 * @requires serpstat-shared
 */

import {
  SORT_ORDERS,
  PAGINATION_DEFAULTS
} from 'serpstat-shared';

/**
 * Team management configuration constants
 *
 * These constants define pagination and result limits for team management operations.
 * They provide sensible defaults while allowing for customization through the
 * API_METHODS configuration. The constants use TypeScript's `as const` assertion
 * to maintain type safety throughout the application.
 */
export const TEAM_CONFIG = {
  maxResultsPerPage: 1000,
  defaultResultsPerPage: 100,
  defaultPage: 1
} as const;

/**
 * User status codes for team management
 *
 * These constants define the numeric status codes used to represent user states
 * in the Serpstat Team Management API. The INACTIVE status (0) indicates that
 * a user has been invited but has not yet activated their account, while the ACTIVE
 * status (1) indicates that a user has successfully activated their account and
 * can access team resources.
 */
export const USER_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1
} as const;

/**
 * API Method Names for Team Management
 *
 * These constants define the mapping between the tool names exposed through the
 * MCP server and the corresponding procedure names in the Serpstat Team Management API.
 * The naming convention follows "TeamManagement.{methodName}" format to ensure
 * consistent communication with the Serpstat API endpoints.
 *
 * Available methods:
 * - addUser: Invite a new user to join your team by email address
 * - getList: Get a list of all users in your team with optional search and pagination
 * - activateUser: Activate an inactive user in your team
 * - deactivateUser: Deactivate an active user in your team
 * - removeUser: Remove a user from your team (optionally merge their projects)
 */
export const API_METHODS = {
  addUser: "TeamManagement.addUser",
  getList: "TeamManagement.getList",
  activateUser: "TeamManagement.activateUser",
  deactivateUser: "TeamManagement.deactivateUser",
  removeUser: "TeamManagement.removeUser"
} as const;

// Re-export shared constants for convenience
export { SORT_ORDERS, PAGINATION_DEFAULTS };