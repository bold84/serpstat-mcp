/**
 * Serpstat Site Audit MCP Server
 * =================================
 *
 * Main MCP server implementation providing 15 comprehensive site audit tools
 * for technical SEO analysis and website health monitoring.
 *
 * Features:
 * - Automated website scanning and audit management
 * - Technical SEO error detection and categorization
 * - Comprehensive audit reporting and export capabilities
 * - Advanced audit configuration and scheduling
 * - Historical data tracking and analysis
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { makeSerpstatRequest } from 'serpstat-shared';
import { API_METHODS } from './constants.js';
import {
  StartSchema,
  StopSchema,
  GetBasicInfoSchema,
  GetErrorElementsSchema,
  GetCategoriesStatisticSchema,
  GetSettingsSchema,
  SetSettingsSchema,
  GetDefaultSettingsSchema,
  GetListSchema,
  GetReportWithoutDetailsSchema,
  GetSubElementsByCrcSchema,
  GetScanUserUrlListSchema,
  GetHistoryByCountErrorSchema,
  ExportSchema,
} from './utils/validation.js';

// Create MCP server instance
const server = new Server(
  {
    name: 'serpstat-audit',
    version: '0.1.0',
    description: 'Comprehensive Site Audit API for technical SEO analysis and website health monitoring',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool definitions
const TOOLS: Tool[] = [
  {
    name: 'start',
    description: 'Start audit scanning for a project. Initiates comprehensive technical SEO analysis of the website. Essential for automated website health monitoring.',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'number',
          description: 'The unique identifier for an audit site project'
        }
      },
      required: ['projectId']
    },
  },
  {
    name: 'stop',
    description: 'Stop an active audit session and returns the operation result. This method stops an active audit session and returns the operation result. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'number',
          description: 'The unique identifier for an audit site project'
        }
      },
      required: ['projectId']
    },
  },
  {
    name: 'getBasicInfo',
    description: 'Get basic audit summary information including SDO score, error counts, and scan progress. Essential for quick website health assessment. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        reportId: {
          type: 'number',
          description: 'The unique identifier for an audit report'
        }
      },
      required: ['reportId']
    },
  },
  {
    name: 'getErrorElements',
    description: 'Get a list of all pages where a specific audit error was detected. This method helps you quickly identify and address problematic URLs across your entire website. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        reportId: {
          type: 'number',
          description: 'The unique identifier for an audit report'
        },
        compareReportId: {
          type: 'number',
          description: 'Another unique identifier for an audit report from the same project to compare'
        },
        projectId: {
          type: 'number',
          description: 'The unique identifier for an audit site project'
        },
        errorName: {
          type: 'string',
          description: 'Error Name (e.g., "redirects", "broken_image_url", "https_expired")'
        },
        mode: {
          type: 'string',
          enum: ['all', 'new', 'solved'],
          description: 'Error display mode (Default: all)'
        },
        limit: {
          type: 'number',
          description: 'Count of returned items in response (Default: 10)'
        },
        offset: {
          type: 'number',
          description: 'Batch number required for pagination (Default: 0)'
        }
      },
      required: ['reportId', 'compareReportId', 'projectId', 'errorName']
    },
  },
  {
    name: 'getCategoriesStatistic',
    description: 'Get audit error statistics by category. Provides comprehensive breakdown of technical SEO issues by category for strategic analysis. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        reportId: {
          type: 'number',
          description: 'The unique identifier for an audit report'
        }
      },
      required: ['reportId']
    },
  },
  {
    name: 'getSettings',
    description: 'Get audit settings and configuration. Retrieve current audit configuration including scanning parameters and notification settings. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'number',
          description: 'The unique identifier for an audit site project'
        }
      },
      required: ['projectId']
    },
  },
  {
    name: 'setSettings',
    description: 'Set audit settings and configuration. Configure comprehensive audit parameters including scanning behavior, limits, and notifications.',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'number',
          description: 'The unique identifier for an audit site project'
        },
        mainSettings: {
          type: 'object',
          description: 'Main audit configuration settings',
          properties: {
            domain: {
              type: 'string',
              description: 'The domain name to audit'
            },
            name: {
              type: 'string',
              description: 'The project name'
            },
            subdomainsCheck: {
              type: 'boolean',
              description: 'Whether to check subdomains'
            },
            pagesLimit: {
              type: 'number',
              description: 'Limit for number of pages to scan (1-100000)'
            },
            scanSpeed: {
              type: 'number',
              description: 'Scan speed setting (1-10)'
            },
            autoSpeed: {
              type: 'boolean',
              description: 'Enable automatic speed adjustment'
            },
            scanNoIndex: {
              type: 'boolean',
              description: 'Scan no-index pages'
            },
            scanWrongCanonical: {
              type: 'boolean',
              description: 'Scan pages with wrong canonical tags'
            },
            autoUserAgent: {
              type: 'boolean',
              description: 'Use automatic user agent'
            },
            scanDuration: {
              type: 'number',
              description: 'Scan duration in hours (1-168)'
            },
            folderDepth: {
              type: 'number',
              description: 'Maximum folder depth (0-20)'
            },
            urlDepth: {
              type: 'number',
              description: 'Maximum URL depth (1-50)'
            },
            userAgent: {
              type: 'number',
              description: 'User agent type (0-10)'
            },
            robotsTxt: {
              type: 'boolean',
              description: 'Respect robots.txt'
            },
            withImages: {
              type: 'boolean',
              description: 'Include images in scan'
            }
          }
        },
        dontScanKeywordsBlock: {
          type: 'object',
          description: 'Keywords to exclude from scanning',
          properties: {
            checked: {
              type: 'boolean',
              description: 'Whether this block is enabled'
            },
            keywords: {
              type: 'string',
              description: 'Keywords to exclude from scanning'
            }
          }
        },
        onlyScanKeywordsBlock: {
          type: 'object',
          description: 'Keywords to include in scanning',
          properties: {
            checked: {
              type: 'boolean',
              description: 'Whether this block is enabled'
            },
            keywords: {
              type: 'string',
              description: 'Keywords to include in scanning'
            }
          }
        },
        baseAuthBlock: {
          type: 'object',
          description: 'Authentication settings for restricted sites',
          properties: {
            login: {
              type: 'string',
              description: 'Login for authentication'
            },
            password: {
              type: 'string',
              description: 'Password for authentication'
            }
          }
        },
        mailTriggerSettings: {
          type: 'object',
          description: 'Email notification settings',
          properties: {
            emails: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of email addresses for notifications'
            },
            interval: {
              type: 'number',
              description: 'Email notification interval (1-30)'
            },
            enabled: {
              type: 'boolean',
              description: 'Whether mail notifications are enabled'
            },
            enableExportAfterFinish: {
              type: 'boolean',
              description: 'Enable export after scan completion'
            }
          }
        },
        scheduleSettings: {
          type: 'object',
          description: 'Scan schedule settings',
          properties: {
            scheduleRepeatOption: {
              type: 'number',
              description: 'Schedule repeat option (0-10)'
            }
          }
        },
        scanSetting: {
          type: 'object',
          description: 'Scan type settings',
          properties: {
            type: {
              type: 'number',
              description: 'Scan type (1-5)'
            },
            list: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of specific scan items'
            }
          }
        },
        errorsSettings: {
          type: 'object',
          description: 'Advanced error threshold settings',
          properties: {
            tiny_title: {
              type: 'number',
              description: 'Maximum title length for tiny title error (1-100)'
            },
            long_title: {
              type: 'number',
              description: 'Maximum title length for long title error (50-200)'
            },
            tiny_desc: {
              type: 'number',
              description: 'Maximum description length for tiny description error (50-200)'
            },
            long_desc: {
              type: 'number',
              description: 'Maximum description length for long description error (150-320)'
            },
            long_url: {
              type: 'number',
              description: 'Maximum URL length for long URL error (500-4096)'
            },
            large_image_size: {
              type: 'number',
              description: 'Maximum image size for large image error in KB (50-5000)'
            },
            large_page_size: {
              type: 'number',
              description: 'Maximum page size for large page error in MB (1-10)'
            },
            many_external_links: {
              type: 'number',
              description: 'Maximum number of external links for many external links error (10-1000)'
            }
          }
        }
      },
      required: ['projectId']
    },
  },
  {
    name: 'getDefaultSettings',
    description: 'Get default audit settings. Retrieve the default configuration values for new audit projects. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    },
  },
  {
    name: 'getList',
    description: 'Get list of audit reports for a specific project with pagination. Retrieve audit history and reports for monitoring project progress. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'number',
          description: 'The unique identifier for an audit site project'
        },
        limit: {
          type: 'number',
          description: 'Count of returned items in response (Default: 30, Max: 100)'
        },
        offset: {
          type: 'number',
          description: 'Batch number required for pagination (Default: 0)'
        }
      },
      required: ['projectId']
    },
  },
  {
    name: 'getReportWithoutDetails',
    description: 'Get audit report without detailed errors. Receive summary-level audit information for quick overviews and reporting. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        reportId: {
          type: 'number',
          description: 'The unique identifier for an audit report'
        }
      },
      required: ['reportId']
    },
  },
  {
    name: 'getSubElementsByCrc',
    description: 'Get a list of sub-elements which contains a specific errors/issues. Crc can be found in the response of getErrorElements method. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        reportId: {
          type: 'number',
          description: 'The unique identifier for an audit report'
        },
        projectId: {
          type: 'number',
          description: 'The unique identifier for an audit site project'
        },
        errorName: {
          type: 'string',
          description: 'Error Name (e.g., "redirects", "broken_image_url", "https_expired")'
        },
        crc: {
          type: 'number',
          description: 'URL crc'
        },
        compareReportId: {
          type: 'number',
          description: 'Another unique identifier for an audit report from the same project to compare'
        },
        mode: {
          type: 'string',
          enum: ['all', 'new', 'solved'],
          description: 'Error display mode (Default: all)'
        },
        limit: {
          type: 'number',
          description: 'Count of returned items in response (Default: 30)'
        },
        offset: {
          type: 'number',
          description: 'Batch number required for pagination (Default: 0)'
        }
      },
      required: ['reportId', 'projectId', 'errorName', 'crc']
    },
  },
  {
    name: 'getScanUserUrlList',
    description: 'Get a list of URLs audited during the scan, provided the scan type was configured for assigned URLs. It allows verification of the pages scanned by the Audit tool. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'number',
          description: 'The unique identifier for an audit site project'
        }
      },
      required: ['projectId']
    },
  },
  {
    name: 'getHistoryByCountError',
    description: 'Display the number of changed errors and information messages for each issue category across all reports within a project. It enables tracking of issue resolution progress over time. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'number',
          description: 'The unique identifier for an audit site project'
        },
        errorName: {
          type: 'string',
          description: 'Error Name (e.g., "redirects", "broken_image_url", "https_expired")'
        },
        limit: {
          type: 'number',
          description: 'Count of returned items in response (Default: 30)'
        },
        offset: {
          type: 'number',
          description: 'Batch number required for pagination (Default: 0)'
        }
      },
      required: ['projectId', 'errorName', 'limit', 'offset']
    },
  },
  {
    name: 'export',
    description: 'Export a complete site audit report in a convenient format. Use this method to download technical SEO data for offline analysis or client reporting. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        reportId: {
          type: 'number',
          description: 'The unique identifier for an audit report'
        },
        exportType: {
          type: 'string',
          enum: ['mgxlsx', 'mgxlsx_mfiles', 'puppeter_pdf'],
          description: 'Type of export file'
        }
      },
      required: ['reportId', 'exportType']
    },
  },
];

// Tool handler functions
async function handleStart(args: unknown) {
  const validatedArgs = StartSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.start, {
    projectId: validatedArgs.projectId,
  });
}

async function handleStop(args: unknown) {
  const validatedArgs = StopSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.stop, {
    projectId: validatedArgs.projectId,
  });
}

async function handleGetBasicInfo(args: unknown) {
  const validatedArgs = GetBasicInfoSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getBasicInfo, {
    reportId: validatedArgs.reportId,
  });
}

async function handleGetErrorElements(args: unknown) {
  const validatedArgs = GetErrorElementsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getErrorElements, {
    reportId: validatedArgs.reportId,
    compareReportId: validatedArgs.compareReportId,
    projectId: validatedArgs.projectId,
    errorName: validatedArgs.errorName,
    ...(validatedArgs.mode && validatedArgs.mode !== 'all' && { mode: validatedArgs.mode }),
    ...(validatedArgs.limit && validatedArgs.limit !== 10 && { limit: validatedArgs.limit }),
    ...(validatedArgs.offset && validatedArgs.offset !== 0 && { offset: validatedArgs.offset }),
  });
}

async function handleGetCategoriesStatistic(args: unknown) {
  const validatedArgs = GetCategoriesStatisticSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getCategoriesStatistic, {
    reportId: validatedArgs.reportId,
  });
}

async function handleGetSettings(args: unknown) {
  const validatedArgs = GetSettingsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getSettings, {
    projectId: validatedArgs.projectId,
  });
}

async function handleSetSettings(args: unknown) {
  const validatedArgs = SetSettingsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.setSettings, {
    projectId: validatedArgs.projectId,
    ...(validatedArgs.mainSettings && { mainSettings: validatedArgs.mainSettings }),
    ...(validatedArgs.dontScanKeywordsBlock && { dontScanKeywordsBlock: validatedArgs.dontScanKeywordsBlock }),
    ...(validatedArgs.onlyScanKeywordsBlock && { onlyScanKeywordsBlock: validatedArgs.onlyScanKeywordsBlock }),
    ...(validatedArgs.baseAuthBlock && { baseAuthBlock: validatedArgs.baseAuthBlock }),
    ...(validatedArgs.mailTriggerSettings && { mailTriggerSettings: validatedArgs.mailTriggerSettings }),
    ...(validatedArgs.scheduleSettings && { scheduleSettings: validatedArgs.scheduleSettings }),
    ...(validatedArgs.scanSetting && { scanSetting: validatedArgs.scanSetting }),
    ...(validatedArgs.errorsSettings && { errorsSettings: validatedArgs.errorsSettings }),
  });
}

async function handleGetDefaultSettings(args: unknown) {
  GetDefaultSettingsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getDefaultSettings, {});
}

async function handleGetList(args: unknown) {
  const validatedArgs = GetListSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getList, {
    projectId: validatedArgs.projectId,
    ...(validatedArgs.limit && { limit: validatedArgs.limit }),
    ...(validatedArgs.offset !== undefined && { offset: validatedArgs.offset }),
  });
}

async function handleGetReportWithoutDetails(args: unknown) {
  const validatedArgs = GetReportWithoutDetailsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getReportWithoutDetails, {
    reportId: validatedArgs.reportId,
  });
}

async function handleGetSubElementsByCrc(args: unknown) {
  const validatedArgs = GetSubElementsByCrcSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getSubElementsByCrc, {
    reportId: validatedArgs.reportId,
    projectId: validatedArgs.projectId,
    errorName: validatedArgs.errorName,
    crc: validatedArgs.crc,
    ...(validatedArgs.compareReportId && { compareReportId: validatedArgs.compareReportId }),
    ...(validatedArgs.mode && validatedArgs.mode !== 'all' && { mode: validatedArgs.mode }),
    ...(validatedArgs.limit && validatedArgs.limit !== 30 && { limit: validatedArgs.limit }),
    ...(validatedArgs.offset && validatedArgs.offset !== 0 && { offset: validatedArgs.offset }),
  });
}

async function handleGetScanUserUrlList(args: unknown) {
  const validatedArgs = GetScanUserUrlListSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getScanUserUrlList, {
    projectId: validatedArgs.projectId,
  });
}

async function handleGetHistoryByCountError(args: unknown) {
  const validatedArgs = GetHistoryByCountErrorSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getHistoryByCountError, {
    projectId: validatedArgs.projectId,
    errorName: validatedArgs.errorName,
    limit: validatedArgs.limit,
    offset: validatedArgs.offset,
  });
}

async function handleExport(args: unknown) {
  const validatedArgs = ExportSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.export, {
    reportId: validatedArgs.reportId,
    exportType: validatedArgs.exportType,
  });
}

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;

    switch (name) {
      case 'start':
        result = await handleStart(args);
        break;
      case 'stop':
        result = await handleStop(args);
        break;
      case 'getBasicInfo':
        result = await handleGetBasicInfo(args);
        break;
      case 'getErrorElements':
        result = await handleGetErrorElements(args);
        break;
      case 'getCategoriesStatistic':
        result = await handleGetCategoriesStatistic(args);
        break;
      case 'getSettings':
        result = await handleGetSettings(args);
        break;
      case 'setSettings':
        result = await handleSetSettings(args);
        break;
      case 'getDefaultSettings':
        result = await handleGetDefaultSettings(args);
        break;
      case 'getList':
        result = await handleGetList(args);
        break;
      case 'getReportWithoutDetails':
        result = await handleGetReportWithoutDetails(args);
        break;
      case 'getSubElementsByCrc':
        result = await handleGetSubElementsByCrc(args);
        break;
      case 'getScanUserUrlList':
        result = await handleGetScanUserUrlList(args);
        break;
      case 'getHistoryByCountError':
        result = await handleGetHistoryByCountError(args);
        break;
      case 'export':
        result = await handleExport(args);
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
    if (error instanceof z.ZodError) {
      throw new Error(
        `Validation error: ${error.errors
          .map((e) => `${e.path.join('.')}: ${e.message}`)
          .join(', ')}`
      );
    }
    throw error;
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Serpstat Site Audit MCP server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});

export { server };