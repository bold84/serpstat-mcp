/**
 * Serpstat Shared Library - API Client
 * =====================================
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-08-31
 *
 * Common API client for all Serpstat MCP servers with error handling and retry logic
 *
 * This module provides a robust HTTP client for interacting with the Serpstat API,
 * featuring automatic retry logic, comprehensive error handling, logging, and
 * specialized support for different response formats (JSON and CSV).
 *
 * Key Features:
 * - Automatic retry mechanism with exponential backoff
 * - Comprehensive error handling and structured error responses
 * - Request/response logging for debugging and monitoring
 * - Support for both JSON-RPC 2.0 and direct POST API calls
 * - Special handling for CSV export responses
 * - Credit calculation utilities for cost estimation
 * - Configurable timeout and retry parameters
 * - Axios-based HTTP client with interceptors
 *
 * Architecture:
 * - SerpstatApiClient class as the main client implementation
 * - Interceptors for request/response processing and error handling
 * - Support for both JSON-RPC 2.0 and standard HTTP POST methods
 * - Credit calculation based on API method and parameters
 * - Factory functions for easy client creation and backward compatibility
 *
 * @module serpstat-shared
 */

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import {
  ApiClientConfig,
  ApiResponse,
  API_CONFIG
} from './types.js';

/**
 * Serpstat API Client Class
 *
 * This class provides a comprehensive HTTP client for interacting with the Serpstat API.
 * It handles authentication, request/response processing, error handling, retry logic,
 * and provides specialized support for different API response formats.
 *
 * Key Capabilities:
 * - Automatic retry with configurable parameters
 * - Structured error responses for consistent error handling
 * - Request/response logging for debugging
 * - Support for JSON-RPC 2.0 and direct POST methods
 * - CSV response handling for export operations
 * - Credit cost calculation for API usage tracking
 *
 * @example
 * ```typescript
 * import { createSerpstatClient } from './api-client';
 *
 * // Create client instance
 * const client = createSerpstatClient('your_api_key_here');
 *
 * // Make API call
 * const response = await client.callMethod('SerpstatDomainProcedure.getDomainsInfo', {
 *   domains: ['example.com', 'test.com'],
 *   se: 'g_us'
 * });
 *
 * if (response.success) {
 *   console.log('API call successful:', response.data);
 * } else {
 *   console.error('API call failed:', response.error);
 * }
 * ```
 */
export class SerpstatApiClient {
  private client: AxiosInstance;
  private config: Required<ApiClientConfig>;

  /**
   * Create a new Serpstat API client instance
   *
   * @param {ApiClientConfig} config - Configuration for the API client
   * @param {string} config.apiKey - API key for authentication (required)
   * @param {string} [config.baseURL] - Base URL for API requests (defaults to official endpoint)
   * @param {number} [config.timeout] - Request timeout in milliseconds (defaults to 120000ms)
   * @param {number} [config.maxRetries] - Maximum number of retry attempts (defaults to 3)
   * @param {number} [config.retryDelay] - Initial delay between retries in milliseconds (defaults to 1000ms)
   *
   * @example
   * ```typescript
   * const client = new SerpstatApiClient({
   *   apiKey: 'your_api_key_here',
   *   timeout: 60000,
   *   maxRetries: 5
   * });
   * ```
   */
  constructor(config: ApiClientConfig) {
    this.config = {
      baseURL: config.baseURL || API_CONFIG.baseURL,
      timeout: config.timeout || API_CONFIG.timeout,
      maxRetries: config.maxRetries || API_CONFIG.maxRetries,
      retryDelay: config.retryDelay || API_CONFIG.retryDelay,
      ...config
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Update Accept header for exportPositions method to handle CSV responses
    this.client.interceptors.request.use(
      (config) => {
        // Check if this is an exportPositions request
        if (config.url?.includes('exportPositions')) {
          config.headers['Accept'] = 'text/plain';
        }
        return config;
      },
      (error) => {
        console.error(`[Serpstat API] Request Error:`, error);
        return Promise.reject(error);
      }
    );

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[Serpstat API] Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error(`[Serpstat API] Request Error:`, error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => this.handleRequestError(error)
    );
  }

  /**
   * Handle API request errors with retry logic
   *
   * This method implements automatic retry logic for failed API requests,
   * providing exponential backoff and structured error responses when
   * all retry attempts are exhausted.
   *
   * @private
   * @param {AxiosError} error - The original Axios error object
   * @returns {Promise<ApiResponse<any>>} Structured response with error information
   *
   * @example
   * ```typescript
   * // Error handling is automatic when using the client
   * const response = await client.callMethod('some_method', params);
   * if (!response.success) {
   *   console.error('API failed:', response.error);
   * }
   * ```
   */
  private async handleRequestError(error: AxiosError): Promise<any> {
    const config = error.config as any;
    if (!config || !config.retryCount) {
      config.retryCount = 0;
    }

    const retryCount = config.retryCount;
    const maxRetries = this.config.maxRetries;

    if (retryCount < maxRetries) {
      console.warn(`[Serpstat API] Retrying request (${retryCount + 1}/${maxRetries})...`);
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, this.config.retryDelay * (retryCount + 1)));
      
      // Retry the request
      config.retryCount = retryCount + 1;
      return this.client.request(config);
    }

    // Max retries exceeded, return structured error
    return {
      success: false,
      error: {
        code: 'API_REQUEST_FAILED',
        message: (error.response?.data as any)?.message || error.message || 'Unknown API error',
        details: error.response?.data || error
      }
    };
  }

  /**
   * Make a JSON-RPC 2.0 request to the Serpstat API
   *
   * This method sends JSON-RPC 2.0 formatted requests to the Serpstat API,
   * handling both successful responses and API errors. It automatically
   * detects and handles CSV responses for export operations.
   *
   * @template T - The expected type of the response data
   * @param {string} methodName - The JSON-RPC 2.0 method name to call
   * @param {Record<string, any>} [methodParams={}] - Parameters for the API method
   * @returns {Promise<ApiResponse<T | string>>} Structured API response
   *
   * @example
   * ```typescript
   * // Domain analysis request
   * const response = await client.callMethod('SerpstatDomainProcedure.getDomainsInfo', {
   *   domains: ['example.com', 'test.com'],
   *   se: 'g_us'
   * });
   *
   * // Export positions request (returns CSV string)
   * const exportResponse = await client.callMethod('SerpstatDomainProcedure.exportPositions', {
   *   domain: 'example.com',
   *   se: 'g_us',
   *   size: 1000
   * });
   *
   * if (response.success) {
   *   const data = response.data; // Type depends on method
   * } else {
   *   console.error('API Error:', response.error);
   * }
   * ```
   */
  async callMethod<T = any>(methodName: string, methodParams: Record<string, any> = {}): Promise<ApiResponse<T | string>> {
    try {
      const requestId = Date.now().toString();
      const url = `${this.config.baseURL}/?token=${this.config.apiKey}#${methodName}`;
      
      const requestBody = {
        id: requestId,
        method: methodName,
        params: methodParams
      };

      const response: AxiosResponse<T> = await this.client.post(url, requestBody);
      
      // Check if response contains error
      if (response.data && typeof response.data === 'object' && 'error' in response.data) {
        return {
          success: false,
          error: response.data.error as any,
          credits_used: (response.data as any).credits_used,
          request_id: (response.data as any).id
        };
      }

      // Handle CSV response for exportPositions method
      if (methodName.includes('exportPositions')) {
        return {
          success: true,
          data: response.data as unknown as string, // CSV data as string
          credits_used: (response.data as any).credits_used,
          request_id: (response.data as any).id
        };
      }

      return {
        success: true,
        data: response.data,
        credits_used: (response.data as any).credits_used,
        request_id: (response.data as any).id
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network request failed',
          details: error
        }
      };
    }
  }

  /**
   * Make a POST request to the Serpstat API
   *
   * This method sends direct POST requests to the Serpstat API endpoints,
   * providing an alternative to the JSON-RPC 2.0 format. It handles both
   * successful responses and API errors with consistent error formatting.
   *
   * @template T - The expected type of the response data
   * @param {string} endpoint - The API endpoint URL
   * @param {any} [data={}] - Request data to send in the POST body
   * @returns {Promise<ApiResponse<T>>} Structured API response
   *
   * @example
   * ```typescript
   * // Direct POST request
   * const response = await client.post('/some/endpoint', {
   *   param1: 'value1',
   *   param2: 'value2'
   * });
   *
   * if (response.success) {
   *   console.log('Success:', response.data);
   * } else {
   *   console.error('Failed:', response.error);
   * }
   * ```
   */
  async post<T = any>(endpoint: string, data: any = {}): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.post(endpoint, data);
      
      // Check if response contains error
      if (response.data && typeof response.data === 'object' && 'error' in response.data) {
        return {
          success: false,
          error: response.data.error as any,
          credits_used: (response.data as any).credits_used,
          request_id: (response.data as any).request_id
        };
      }

      return {
        success: true,
        data: response.data,
        credits_used: (response.data as any).credits_used,
        request_id: (response.data as any).request_id
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network request failed',
          details: error
        }
      };
    }
  }

  /**
   * Get API client instance for direct use
   *
   * This method returns the underlying Axios instance for direct use,
   * allowing access to advanced Axios features while maintaining
   * the configured base settings and interceptors.
   *
   * @returns {AxiosInstance} The configured Axios instance
   *
   * @example
   * ```typescript
   * // Get direct access to Axios instance
   * const axiosClient = client.getClient();
   *
   * // Use Axios-specific features
   * const response = await axiosClient.get('/some-endpoint', {
   *   params: { custom: 'param' }
   * });
   * ```
   */
  getClient(): AxiosInstance {
    return this.client;
  }

  /**
   * Calculate estimated credits for an API call
   *
   * This method provides a basic implementation for estimating API credit costs
   * based on the method name and parameters. Credit costs vary by operation
   * type and are important for budgeting and usage tracking.
   *
   * @param {string} method - The API method name
   * @param {Record<string, any>} params - Method parameters
   * @returns {number} Estimated credit cost for the operation
   *
   * @example
   * ```typescript
   * // Calculate credit costs for different operations
   * const domainCost = client.calculateCredits('SerpstatDomainProcedure.getDomainsInfo', {
   *   domains: ['example.com'],
   *   se: 'g_us'
   * }); // Returns 5
   *
   * const exportCost = client.calculateCredits('SerpstatDomainProcedure.exportPositions', {
   *   domain: 'example.com',
   *   size: 1000
   * }); // Returns 1000 (size * 1)
   *
   * const teamCost = client.calculateCredits('TeamManagement.getList', {
   *   size: 50
   * }); // Returns 1
   * ```
   */
  calculateCredits(method: string, params: Record<string, any>): number {
    // Basic credit calculation - can be overridden by specific implementations
    let credits = 1;

    switch (method) {
      case 'SerpstatDomainProcedure.getDomainsInfo':
        credits = 5;
        break;
      
      case 'SerpstatDomainProcedure.exportPositions':
        credits = (params.size || 100) * 1;
        break;
      
      case 'TeamManagement.addUser':
      case 'TeamManagement.getList':
      case 'TeamManagement.activateUser':
      case 'TeamManagement.deactivateUser':
      case 'TeamManagement.removeUser':
        credits = 1;
        break;
      
      default:
        credits = (params.size || 100) * 1;
    }

    return Math.max(1, credits);
  }
}

/**
 * Create a Serpstat API client instance
 *
 * This factory function provides a convenient way to create a new SerpstatApiClient
 * instance with the specified API key. It uses the default configuration settings
 * from the shared constants and is the recommended way to create client instances.
 *
 * @param {string} apiKey - The API key for authenticating with Serpstat API
 * @returns {SerpstatApiClient} A new configured API client instance
 *
 * @example
 * ```typescript
 * import { createSerpstatClient } from './api-client';
 *
 * // Create client with API key
 * const client = createSerpstatClient('your_api_key_here');
 *
 * // Use the client for API calls
 * const response = await client.callMethod('SerpstatDomainProcedure.getDomainsInfo', {
 *   domains: ['example.com'],
 *   se: 'g_us'
 * });
 * ```
 */
export function createSerpstatClient(apiKey: string): SerpstatApiClient {
  return new SerpstatApiClient({ apiKey });
}

/**
 * Make a simple Serpstat API request (backward compatibility)
 *
 * This utility function provides backward compatibility for simple API requests
 * by automatically creating a client instance from the environment variable
 * and making a single API call. It's designed for quick, one-off API calls
 * where maintaining a client instance is not necessary.
 *
 * @template T - The expected type of the response data
 * @param {string} method - The API method name to call
 * @param {Record<string, any>} [params={}] - Parameters for the API method
 * @returns {Promise<any>} The API response data
 * @throws {Error} If SERPSTAT_API_KEY environment variable is not set
 *
 * @example
 * ```typescript
 * import { makeSerpstatRequest } from './api-client';
 *
 * // Simple API call without managing client instance
 * const result = await makeSerpstatRequest('SerpstatDomainProcedure.getDomainsInfo', {
 *   domains: ['example.com'],
 *   se: 'g_us'
 * });
 *
 * // The function expects SERPSTAT_API_KEY environment variable to be set
 * // This is convenient for quick scripts and testing
 * ```
 */
export async function makeSerpstatRequest<T>(
  method: string,
  params: Record<string, any> = {}
): Promise<any> {
  const token = process.env.SERPSTAT_API_KEY;
  if (!token) {
    throw new Error("SERPSTAT_API_KEY environment variable is required");
  }

  const client = createSerpstatClient(token);
  return await client.callMethod<T>(method, params);
}