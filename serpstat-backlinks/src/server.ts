/**
 * Serpstat Backlinks MCP Server
 * =================================
 *
 * Main server entry point that initializes and configures the MCP server
 * with all backlinks analysis tools and procedures.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 *
 * This module implements the core MCP server for Serpstat Backlinks API integration.
 * It provides a comprehensive interface to 21 different backlinks analysis methods through
 * the Model Context Protocol (MCP) framework.
 *
 * The server initializes with MCP server capabilities and registers various tools for
 * backlinks analysis, including domain authority analysis, competitive intelligence,
 * risk management, and content strategy insights. All API calls are routed through a shared
 * Serpstat API client with built-in error handling and retry logic.
 *
 * Key Features:
 * - 21 backlinks analysis tools with comprehensive validation
 * - Advanced filtering with complex AND/OR logic
 * - Robust error handling with detailed error messages
 * - Automatic API client initialization with environment variable validation
 * - Comprehensive input validation using Zod schemas
 * - Support for multiple search types and advanced sorting
 * - Pagination support for large datasets (up to 60,000 results)
 * - Credit-efficient API usage (1 credit per result)
 * - Risk management and threat detection capabilities
 *
 * @module serpstat-backlinks
 * @requires @modelcontextprotocol/sdk/server
 * @requires serpstat-shared
 * @requires ./utils/validation
 * @requires ./constants
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool
} from '@modelcontextprotocol/sdk/types.js';
import {
  makeSerpstatRequest
} from 'serpstat-shared';
import {
  GetSummarySchema,
  GetRefDomainsSchema,
  GetNewBacklinksSchema,
  GetLostBacklinksSchema,
  GetOutlinksSchema,
  GetAnchorsSchema,
  GetTopPagesSchema,
  GetIntersectSchema,
  GetIntersectSummarySchema,
  GetRedirectedDomainsSchema,
  GetDistributionSdrSchema,
  GetDistributionTldSchema,
  GetThreatsSchema,
  GetThreatsLinksSchema,
  GetOutThreatsSchema,
  GetOutThreatsLinksSchema,
  GetTopAnchorsSchema,
  GetOutDomainsSchema,
  GetLostOutlinksSchema,
  GetBacklinksChangesHistorySchema
} from './utils/validation.js';
import { API_METHODS } from './constants.js';
import { z } from 'zod';

// Initialize MCP Server
export const server: Server = new Server(
  {
    name: 'serpstat-backlinks-server',
    version: '0.1.0',
    description: 'A comprehensive MCP server for Serpstat Backlinks API with 21 analysis methods',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Tool definitions for MCP
 * All 21 backlinks analysis tools with comprehensive descriptions
 */
const TOOLS: Tool[] = [
  {
    name: 'getSummary',
    description: 'Get general information about link profile including number of external links, referring IP addresses, domains, subdomains, and domain authority indicator. (Deprecated: 5 credits per request)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain)'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getRefDomains',
    description: 'Get a list of referring domains of a site with domain rank, link count, and authority metrics. Essential for understanding link profile quality and identifying high-value link opportunities. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (domain_links, domain_from, domain_rank, check)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        },
        linkPerDomain: {
          type: 'number',
          description: 'Links per domain limit'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getNewBacklinks',
    description: 'Get a list of active backlinks with source URLs, anchor text, follow status, and domain authority. Critical for monitoring new link acquisitions and competitor analysis. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (url_from, anchor, link_nofollow, links_external, link_type, url_to, check, add, domain_rank)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        },
        linkPerDomain: {
          type: 'number',
          description: 'Links per domain limit'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getLostBacklinks',
    description: 'Get a list of lost backlinks to analyze link profile changes and identify recovery opportunities. Essential for maintaining SEO authority and monitoring competitor tactics. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (url_from, anchor, link_nofollow, links_external, link_type, url_to, check, add, domain_rank)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        },
        linkPerDomain: {
          type: 'number',
          description: 'Links per domain limit'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getOutlinks',
    description: 'Get a list of external backlinks from the analyzed domain to understand outbound linking patterns and identify relationship opportunities. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (url_from, anchor, link_nofollow, links_external, link_type, url_to, check, add, domain_rank)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        },
        linkPerDomain: {
          type: 'number',
          description: 'Links per domain limit'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getAnchors',
    description: 'Get a list of keywords used as anchors for backlinks with frequency analysis and follow status distribution. Critical for anchor text optimization and detecting over-optimization. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        anchor: {
          type: 'string',
          description: 'Anchor text to filter by'
        },
        count: {
          type: 'string',
          description: 'Number of words in anchor'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (total, refDomains, nofollow, anchor, lastupdate)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getTopPages',
    description: 'Get a list of leading pages by the number of backlinks with referring pages, domains, and IPs. Essential for content strategy and identifying top-performing pages. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (ips, count, domains, url_to, lastupdate)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getIntersect',
    description: 'Get backlinks from intersecting donors to analyze common backlinks with up to 5 competitors. Powerful for competitive intelligence and link gap analysis. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        intersect: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of competitor domains to find intersecting backlinks (Max: 5)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (links_count1, links_count2, etc.)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        }
      },
      required: ['query', 'intersect']
    },
  },
  {
    name: 'getIntersectSummary',
    description: 'Get summary statistics of intersecting backlinks between your domain and competitors. Quick overview of common backlink opportunities. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        intersect: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of competitor domains to find intersecting backlinks (Max: 5)'
        }
      },
      required: ['query', 'intersect']
    },
  },
  {
    name: 'getRedirectedDomains',
    description: 'Analyze domain redirection patterns and identify redirected domains in the backlink profile. Important for understanding link equity flow. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        },
        linkPerDomain: {
          type: 'number',
          description: 'Links per domain limit'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getDistributionSDR',
    description: 'Get Domain Rating (SDR) distribution analysis to understand the quality distribution of referring domains. Essential for link quality assessment. (1 credit per request)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getDistributionTLD',
    description: 'Get top-level domain distribution analysis to understand geographic and categorical diversity of referring domains. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getThreats',
    description: 'Get malicious domains referring to the analyzed domain for security risk assessment and penalty prevention. Critical for maintaining site health. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (lastupdate, domain_link, links_count, platform_type, threat_type)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        },
        linkPerDomain: {
          type: 'number',
          description: 'Links per domain limit'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getThreatsLinks',
    description: 'Get specific threatening backlinks with detailed threat analysis for disavow file creation and risk mitigation. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (lastupdate, domain_link, links_count, platform_type, threat_type)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        },
        linkPerDomain: {
          type: 'number',
          description: 'Links per domain limit'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getOutThreats',
    description: 'Get external threat links from the analyzed domain to assess outbound risk and protect site reputation. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (lastupdate, domain_link, links_count, platform_type, threat_type)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        },
        linkPerDomain: {
          type: 'number',
          description: 'Links per domain limit'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getOutThreatsLinks',
    description: 'Get specific external threat links with detailed analysis for outbound risk management and content safety. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (lastupdate, domain_link, links_count, platform_type, threat_type)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        },
        linkPerDomain: {
          type: 'number',
          description: 'Links per domain limit'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getTopAnchors',
    description: 'Get top anchor text analysis with frequency and distribution data for anchor optimization strategy. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        anchor: {
          type: 'string',
          description: 'Anchor text to filter by'
        },
        count: {
          type: 'string',
          description: 'Number of words in anchor'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (total, refDomains, nofollow, anchor)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getOutDomains',
    description: 'Get external domains linked to by the analyzed domain for partnership and relationship opportunity analysis. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (domain_links, domain_from, domain_rank)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        },
        linkPerDomain: {
          type: 'number',
          description: 'Links per domain limit'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getLostOutlinks',
    description: 'Get lost external links to analyze relationship changes and identify partnership opportunities. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field (url_from, anchor, link_nofollow, links_external)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        },
        linkPerDomain: {
          type: 'number',
          description: 'Links per domain limit'
        }
      },
      required: ['query']
    },
  },
  {
    name: 'getBacklinksChangesHistory',
    description: 'Get historical backlink changes to track link profile evolution and identify trends over time. Essential for long-term SEO strategy. (1 credit per result)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The domain name of the analyzed site'
        },
        searchType: {
          type: 'string',
          enum: ['domain', 'domain_with_subdomains'],
          description: 'Search modes for analysis (Default: domain_with_subdomains)'
        },
        dateFrom: {
          type: 'string',
          description: 'Start date for history analysis (YYYY-MM-DD)'
        },
        dateTo: {
          type: 'string',
          description: 'End date for history analysis (YYYY-MM-DD)'
        },
        sort: {
          type: 'string',
          description: 'Sorting by field'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1, Max: 1000)'
        },
        complexFilter: {
          type: 'array',
          description: 'Complex filtering conditions with AND/OR logic'
        }
      },
      required: ['query']
    },
  },
];

/**
 * List available tools
 *
 * This handler returns the list of available tools to the MCP client.
 * It provides metadata about each tool including name, description,
 * and input schema.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

/**
 * Handle tool calls
 *
 * This handler processes tool calls from the MCP client. It validates input
 * parameters, makes API requests to Serpstat, and returns formatted responses.
 * Each tool has its own validation schema and API method.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;

    switch (name) {
      case 'getSummary':
        result = await handleGetSummary(args);
        break;
      case 'getRefDomains':
        result = await handleGetRefDomains(args);
        break;
      case 'getNewBacklinks':
        result = await handleGetNewBacklinks(args);
        break;
      case 'getLostBacklinks':
        result = await handleGetLostBacklinks(args);
        break;
      case 'getOutlinks':
        result = await handleGetOutlinks(args);
        break;
      case 'getAnchors':
        result = await handleGetAnchors(args);
        break;
      case 'getTopPages':
        result = await handleGetTopPages(args);
        break;
      case 'getIntersect':
        result = await handleGetIntersect(args);
        break;
      case 'getIntersectSummary':
        result = await handleGetIntersectSummary(args);
        break;
      case 'getRedirectedDomains':
        result = await handleGetRedirectedDomains(args);
        break;
      case 'getDistributionSDR':
        result = await handleGetDistributionSDR(args);
        break;
      case 'getDistributionTLD':
        result = await handleGetDistributionTLD(args);
        break;
      case 'getThreats':
        result = await handleGetThreats(args);
        break;
      case 'getThreatsLinks':
        result = await handleGetThreatsLinks(args);
        break;
      case 'getOutThreats':
        result = await handleGetOutThreats(args);
        break;
      case 'getOutThreatsLinks':
        result = await handleGetOutThreatsLinks(args);
        break;
      case 'getTopAnchors':
        result = await handleGetTopAnchors(args);
        break;
      case 'getOutDomains':
        result = await handleGetOutDomains(args);
        break;
      case 'getLostOutlinks':
        result = await handleGetLostOutlinks(args);
        break;
      case 'getBacklinksChangesHistory':
        result = await handleGetBacklinksChangesHistory(args);
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ error: errorMessage }, null, 2),
        },
      ],
      isError: true,
    };
  }
});

/**
 * Handler functions for all 21 tools
 * Each function validates input and makes the appropriate API call
 */

async function handleGetSummary(args: unknown) {
  const validatedArgs = GetSummarySchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getSummary, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
  });
}

async function handleGetRefDomains(args: unknown) {
  const validatedArgs = GetRefDomainsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getRefDomains, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
    ...(validatedArgs.linkPerDomain && { linkPerDomain: validatedArgs.linkPerDomain }),
  });
}

async function handleGetNewBacklinks(args: unknown) {
  const validatedArgs = GetNewBacklinksSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getNewBacklinks, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
    ...(validatedArgs.linkPerDomain && { linkPerDomain: validatedArgs.linkPerDomain }),
  });
}

async function handleGetLostBacklinks(args: unknown) {
  const validatedArgs = GetLostBacklinksSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getLostBacklinks, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
    ...(validatedArgs.linkPerDomain && { linkPerDomain: validatedArgs.linkPerDomain }),
  });
}

async function handleGetOutlinks(args: unknown) {
  const validatedArgs = GetOutlinksSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getOutlinks, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
    ...(validatedArgs.linkPerDomain && { linkPerDomain: validatedArgs.linkPerDomain }),
  });
}

async function handleGetAnchors(args: unknown) {
  const validatedArgs = GetAnchorsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getAnchors, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.anchor !== undefined && { anchor: validatedArgs.anchor }),
    ...(validatedArgs.count !== undefined && { count: validatedArgs.count }),
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
  });
}

async function handleGetTopPages(args: unknown) {
  const validatedArgs = GetTopPagesSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getTopPages, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
  });
}

async function handleGetIntersect(args: unknown) {
  const validatedArgs = GetIntersectSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getIntersect, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    intersect: validatedArgs.intersect,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
  });
}

async function handleGetIntersectSummary(args: unknown) {
  const validatedArgs = GetIntersectSummarySchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getIntersectSummary, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    intersect: validatedArgs.intersect,
  });
}

async function handleGetRedirectedDomains(args: unknown) {
  const validatedArgs = GetRedirectedDomainsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getRedirectedDomains, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
    ...(validatedArgs.linkPerDomain && { linkPerDomain: validatedArgs.linkPerDomain }),
  });
}

async function handleGetDistributionSDR(args: unknown) {
  const validatedArgs = GetDistributionSdrSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getDistributionSdr, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
  });
}

async function handleGetDistributionTLD(args: unknown) {
  const validatedArgs = GetDistributionTldSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getDistributionTld, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
  });
}

async function handleGetThreats(args: unknown) {
  const validatedArgs = GetThreatsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getThreats, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
    ...(validatedArgs.linkPerDomain && { linkPerDomain: validatedArgs.linkPerDomain }),
  });
}

async function handleGetThreatsLinks(args: unknown) {
  const validatedArgs = GetThreatsLinksSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getThreatsLinks, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
    ...(validatedArgs.linkPerDomain && { linkPerDomain: validatedArgs.linkPerDomain }),
  });
}

async function handleGetOutThreats(args: unknown) {
  const validatedArgs = GetOutThreatsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getOutThreats, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
    ...(validatedArgs.linkPerDomain && { linkPerDomain: validatedArgs.linkPerDomain }),
  });
}

async function handleGetOutThreatsLinks(args: unknown) {
  const validatedArgs = GetOutThreatsLinksSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getOutThreatsLinks, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
    ...(validatedArgs.linkPerDomain && { linkPerDomain: validatedArgs.linkPerDomain }),
  });
}

async function handleGetTopAnchors(args: unknown) {
  const validatedArgs = GetTopAnchorsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getTopAnchors, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.anchor !== undefined && { anchor: validatedArgs.anchor }),
    ...(validatedArgs.count !== undefined && { count: validatedArgs.count }),
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
  });
}

async function handleGetOutDomains(args: unknown) {
  const validatedArgs = GetOutDomainsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getOutDomains, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
    ...(validatedArgs.linkPerDomain && { linkPerDomain: validatedArgs.linkPerDomain }),
  });
}

async function handleGetLostOutlinks(args: unknown) {
  const validatedArgs = GetLostOutlinksSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getLostOutlinks, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
    ...(validatedArgs.linkPerDomain && { linkPerDomain: validatedArgs.linkPerDomain }),
  });
}

async function handleGetBacklinksChangesHistory(args: unknown) {
  const validatedArgs = GetBacklinksChangesHistorySchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getBacklinksChangesHistory, {
    query: validatedArgs.query,
    searchType: validatedArgs.searchType,
    ...(validatedArgs.dateFrom && { dateFrom: validatedArgs.dateFrom }),
    ...(validatedArgs.dateTo && { dateTo: validatedArgs.dateTo }),
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && { order: validatedArgs.order }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
    ...(validatedArgs.complexFilter && { complexFilter: validatedArgs.complexFilter }),
  });
}

/**
 * Start the server
 *
 * This function initializes the server transport and starts listening for
 * MCP requests. It uses stdio transport for communication with the client.
 */
async function startServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Serpstat Backlinks MCP server started');
}

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});