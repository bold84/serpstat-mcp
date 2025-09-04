/**
 * Serpstat Domain Analysis API Constants
 * ======================================
 *
 * Domain-specific constants extending the shared library
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-08-31
 *
 * This module defines all constants specific to the Serpstat Domain Analysis MCP server.
 * It includes API method names that map to the Serpstat Domain Analysis API procedures,
 * and re-exports shared constants from the serpstat-shared library for convenience.
 *
 * The API_METHODS object provides a mapping between the tool names used in the MCP
 * server and the corresponding procedure names in the Serpstat API. This mapping
 * ensures consistent communication with the Serpstat API endpoints.
 *
 * @module serpstat-domain-analysis
 * @requires serpstat-shared
 */

import {
  SORT_ORDERS,
  PAGINATION_DEFAULTS
} from 'serpstat-shared';

/**
 * API Method Names - Map MCP tool names to Serpstat API procedure names
 *
 * These constants define the mapping between the tool names exposed through the
 * MCP server and the corresponding procedure names in the Serpstat Domain Analysis API.
 * The naming convention follows "SerpstatDomainProcedure.{methodName}" format.
 *
 * Available methods:
 * - getDomainsInfo: Retrieves basic domain information including keyword count and visibility
 * - getDomainKeywords: Gets keywords that a domain ranks for in search results
 * - getAdKeywords: Retrieves advertising keywords for paid search analysis
 * - getAdsCompetitors: Gets paid search competitors
 * - getOrganicCompetitorsPage: Gets organic search competitors
 * - getTopUrls: Gets top-performing URLs for a domain
 * - getDomainUrls: Gets URLs associated with a domain and their keyword information
 * - getDomainsHistory: Gets historical data for domain analysis over time
 * - getDomainsIntersection: Finds common keywords between multiple domains
 * - getDomainsUniqKeywords: Gets unique keywords across multiple domains
 * - getAllRegionsTraffic: Gets traffic data for all regions for a domain
 * - getRegionsCount: Gets database/region statistics for domains
 * - exportPositions: Exports position data to CSV format
 */
export const API_METHODS = {
  getDomainsInfo: "SerpstatDomainProcedure.getDomainsInfo",
  getDomainKeywords: "SerpstatDomainProcedure.getDomainKeywords",
  getAdKeywords: "SerpstatDomainProcedure.getAdKeywords",
  getAdsCompetitors: "SerpstatDomainProcedure.getAdsCompetitors",
  getOrganicCompetitorsPage: "SerpstatDomainProcedure.getOrganicCompetitorsPage",
  getTopUrls: "SerpstatDomainProcedure.getTopUrls",
  getDomainUrls: "SerpstatDomainProcedure.getDomainUrls",
  getDomainsHistory: "SerpstatDomainProcedure.getDomainsHistory",
  getDomainsIntersection: "SerpstatDomainProcedure.getDomainsIntersection",
  getDomainsUniqKeywords: "SerpstatDomainProcedure.getDomainsUniqKeywords",
  getAllRegionsTraffic: "SerpstatDomainProcedure.getAllRegionsTraffic",
  getRegionsCount: "SerpstatDomainProcedure.getRegionsCount",
  exportPositions: "SerpstatDomainProcedure.exportPositions"
} as const;

// Re-export shared constants for convenience
export { SORT_ORDERS, PAGINATION_DEFAULTS };