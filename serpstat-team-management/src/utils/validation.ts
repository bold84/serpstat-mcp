/**
 * Serpstat Team Management API Validation Schemas
 * ================================================
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-08-31
 *
 * Team-specific validation schemas extending the shared library for Serpstat Team Management API
 *
 * This module defines comprehensive Zod validation schemas for all Serpstat Team Management API
 * operations. It provides robust input validation and response type safety for the MCP server,
 * ensuring that all API calls are properly validated before being sent to the Serpstat API.
 *
 * The schemas are organized into two main categories:
 * 1. Request schemas - Validate incoming tool arguments
 * 2. Response schemas - Validate API responses and provide type safety
 *
 * Key Features:
 * - Comprehensive input validation for all team management operations
 * - Response validation with detailed type definitions
 * - Integration with shared pagination and validation constants
 * - Clear error messages for validation failures
 * - Type-safe data structures for team members and limits
 *
 * Available Request Schemas:
 * - AddUserRequestSchema: Validates email format for user invitations
 * - GetListRequestSchema: Validates pagination and search parameters
 * - ActivateUserRequestSchema: Validates user ID for activation
 * - DeactivateUserRequestSchema: Validates user ID for deactivation
 * - RemoveUserRequestSchema: Validates user ID and project merge option
 *
 * Available Response Schemas:
 * - TeamMemberSchema: Validates team member data structure
 * - TeamLimitsSchema: Validates team usage limits
 * - AddUserResultSchema: Validates user invitation results
 * - GetListResultSchema: Validates user list results
 * - UserActionResultSchema: Validates user action results
 *
 * @module serpstat-team-management
 * @requires zod
 * @requires serpstat-shared
 */

import { z } from 'zod';
import { PAGINATION_DEFAULTS } from 'serpstat-shared';

/**
 * Schema for validating add_user tool arguments
 *
 * This schema validates the input parameters for adding a new user to the team.
 * It ensures that the email address is properly formatted and valid.
 *
 * @property {string} email - The email address of the user to invite (required, must be valid email format)
 *
 * @example
 * ```typescript
 * const validInput = {
 *   email: "user@example.com"
 * };
 * const result = AddUserRequestSchema.parse(validInput);
 * ```
 */
export const AddUserRequestSchema = z.object({
  email: z.string().email("Invalid email format"),
});

/**
 * Schema for validating get_list tool arguments
 *
 * This schema validates the input parameters for retrieving a list of team members.
 * It provides sensible defaults for pagination parameters and allows for optional
 * search functionality to filter users by email address.
 *
 * @property {string} [search=""] - Optional search term to filter by email (default: empty string)
 * @property {number} [page=1] - Page number for pagination (default: 1, minimum: 1)
 * @property {number} [size=100] - Number of results per page (default: 100, minimum: 1, maximum: 1000)
 *
 * @example
 * ```typescript
 * const validInput = {
 *   search: "example.com",
 *   page: 1,
 *   size: 50
 * };
 * const result = GetListRequestSchema.parse(validInput);
 * ```
 */
export const GetListRequestSchema = z.object({
  search: z.string().optional().default(""),
  page: z.number().int().min(1).default(PAGINATION_DEFAULTS.page),
  size: z.number().int().min(1).max(1000).default(100),
});

/**
 * Schema for validating activate_user tool arguments
 *
 * This schema validates the input parameters for activating an inactive user.
 * It ensures that the user ID is a positive number representing a valid user.
 *
 * @property {number} user_id - The user's identifier at Serpstat (required, must be positive)
 *
 * @example
 * ```typescript
 * const validInput = {
 *   user_id: 12345
 * };
 * const result = ActivateUserRequestSchema.parse(validInput);
 * ```
 */
export const ActivateUserRequestSchema = z.object({
  user_id: z.number().positive("User ID must be positive"),
});

/**
 * Schema for validating deactivate_user tool arguments
 *
 * This schema validates the input parameters for deactivating an active user.
 * It ensures that the user ID is a positive number representing a valid user.
 *
 * @property {number} user_id - The user's identifier at Serpstat (required, must be positive)
 *
 * @example
 * ```typescript
 * const validInput = {
 *   user_id: 12345
 * };
 * const result = DeactivateUserRequestSchema.parse(validInput);
 * ```
 */
export const DeactivateUserRequestSchema = z.object({
  user_id: z.number().positive("User ID must be positive"),
});

/**
 * Schema for validating remove_user tool arguments
 *
 * This schema validates the input parameters for removing a user from the team.
 * It ensures that the user ID is a positive number and provides a default value
 * for the merge_projects parameter to control project assignment behavior.
 *
 * @property {number} user_id - The user's identifier at Serpstat (required, must be positive)
 * @property {boolean} [merge_projects=true] - Transfer user's projects to team owner if true, delete if false (default: true)
 *
 * @example
 * ```typescript
 * const validInput = {
 *   user_id: 12345,
 *   merge_projects: true
 * };
 * const result = RemoveUserRequestSchema.parse(validInput);
 * ```
 */
export const RemoveUserRequestSchema = z.object({
  user_id: z.number().positive("User ID must be positive"),
  merge_projects: z.boolean().default(true),
});

/**
 * Response schema for team member data
 *
 * This schema validates the structure of individual team member data returned
 * by the Serpstat API. It provides type safety for all team member properties.
 *
 * @property {number} user_id - The user's identifier at Serpstat
 * @property {string} email - The user's email address
 * @property {number} status - User status (0: INACTIVE, 1: ACTIVE)
 * @property {string|null} first_name - User's first name (nullable)
 * @property {string|null} last_name - User's last name (nullable)
 *
 * @example
 * ```typescript
 * const teamMember = {
 *   user_id: 12345,
 *   email: "user@example.com",
 *   status: 1,
 *   first_name: "John",
 *   last_name: "Doe"
 * };
 * const result = TeamMemberSchema.parse(teamMember);
 * ```
 */
export const TeamMemberSchema = z.object({
  user_id: z.number(),
  email: z.string().email(),
  status: z.number().min(0).max(1),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
});

/**
 * Response schema for team limits
 *
 * This schema validates the structure of team usage limits returned by the API.
 * It provides information about the total number of users, currently used slots,
 * and available slots remaining.
 *
 * @property {number} total - Total number of user slots available for the team
 * @property {number} used - Number of currently active user slots
 * @property {number} left - Number of available user slots remaining
 *
 * @example
 * ```typescript
 * const limits = {
 *   total: 10,
 *   used: 7,
 *   left: 3
 * };
 * const result = TeamLimitsSchema.parse(limits);
 * ```
 */
export const TeamLimitsSchema = z.object({
  total: z.number(),
  used: z.number(),
  left: z.number(),
});

/**
 * Response schema for add_user result
 *
 * This schema validates the response structure when adding a new user to the team.
 * It confirms the success of the operation and returns the new user's information
 * along with updated team limits.
 *
 * @property {boolean} success - Whether the user was successfully added
 * @property {number} user_id - The new user's identifier at Serpstat
 * @property {string} email - The new user's email address
 * @property {TeamLimitsSchema} limits - Updated team usage limits after adding the user
 *
 * @example
 * ```typescript
 * const result = {
 *   success: true,
 *   user_id: 12345,
 *   email: "newuser@example.com",
 *   limits: {
 *     total: 10,
 *     used: 8,
 *     left: 2
 *   }
 * };
 * const validated = AddUserResultSchema.parse(result);
 * ```
 */
export const AddUserResultSchema = z.object({
  success: z.boolean(),
  user_id: z.number(),
  email: z.string().email(),
  limits: TeamLimitsSchema,
});

/**
 * Response schema for get_list result
 *
 * This schema validates the response structure when retrieving a list of team members.
 * It includes the paginated data array, summary information, and current team limits.
 *
 * @property {TeamMemberSchema[]} data - Array of team member data
 * @property {Object} summary_info - Summary information about the list results
 * @property {string} summary_info.total - Total number of results found
 * @property {number} summary_info.page - Current page number
 * @property {TeamLimitsSchema} limits - Current team usage limits
 *
 * @example
 * ```typescript
 * const result = {
 *   data: [
 *     {
 *       user_id: 12345,
 *       email: "user1@example.com",
 *       status: 1,
 *       first_name: "John",
 *       last_name: "Doe"
 *     }
 *   ],
 *   summary_info: {
 *     total: "1",
 *     page: 1
 *   },
 *   limits: {
 *     total: 10,
 *     used: 7,
 *     left: 3
 *   }
 * };
 * const validated = GetListResultSchema.parse(result);
 * ```
 */
export const GetListResultSchema = z.object({
  data: z.array(TeamMemberSchema),
  summary_info: z.object({
    total: z.string(),
    page: z.number(),
  }),
  limits: TeamLimitsSchema,
});

/**
 * Response schema for user action result (activate/deactivate/remove)
 *
 * This schema validates the response structure for user management actions.
 * It confirms the success of the operation and returns the affected user's ID
 * along with updated team limits.
 *
 * @property {boolean} success - Whether the action was successful
 * @property {number} user_id - The affected user's identifier at Serpstat
 * @property {TeamLimitsSchema} limits - Updated team usage limits after the action
 *
 * @example
 * ```typescript
 * const result = {
 *   success: true,
 *   user_id: 12345,
 *   limits: {
 *     total: 10,
 *     used: 6,
 *     left: 4
 *   }
 * };
 * const validated = UserActionResultSchema.parse(result);
 * ```
 */
export const UserActionResultSchema = z.object({
  success: z.boolean(),
  user_id: z.number(),
  limits: TeamLimitsSchema,
});