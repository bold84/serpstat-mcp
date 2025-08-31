/**
 * Serpstat API Client
 * ==================
 *
 * Handles HTTP communication with the Serpstat API, including:
 * - Making authenticated API requests
 * - Error handling and retry logic
 * - Request/response logging
 * - Credit management
 */

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG, CREDIT_INFO, API_METHODS } from '../constants.js';

/**
 * API Response wrapper for consistent error handling
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  credits_used?: number;
  request_id?: string;
}

/**
 * API Client Configuration
 */
export interface ApiClientConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
}

/**
 * Serpstat API Client Class
 */
export class SerpstatApiClient {
  private client: AxiosInstance;
  private config: Required<ApiClientConfig>;

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
      
      // Wait before retrying
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
   */
  async callMethod<T = any>(methodName: string, methodParams: Record<string, any> = {}): Promise<ApiResponse<T>> {
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
   * Calculate estimated credits for an API call
   */
  calculateCredits(method: string, params: Record<string, any>): number {
    let credits = 0;

    switch (method) {
      case 'getDomainsInfo':
        credits = CREDIT_INFO.domainsInfo;
        break;
      
      case 'getDomainKeywords':
      case 'getAdKeywords':
      case 'getTopUrls':
      case 'getDomainUrls':
      case 'getCompetitors':
      case 'getAdsCompetitors':
      case 'getOrganicCompetitorsPage':
      case 'getDomainsIntersection':
      case 'getDomainsUniqKeywords':
      case 'getAllRegionsTraffic':
        credits = CREDIT_INFO.perResult * (params.size || 100);
        break;
      
      case 'exportPositions':
        credits = CREDIT_INFO.exportPerRow * (params.limit || CREDIT_INFO.exportPerRow);
        break;
      
      case 'getDomainsHistory':
        credits = CREDIT_INFO.perResult * (params.size || 100) * (params.days || 30);
        break;
      
      case 'getRegionsCount':
        credits = 1;
        break;
      
      default:
        credits = 1;
    }

    return Math.max(1, credits);
  }

  /**
   * Get API client instance for direct use
   */
  getClient(): AxiosInstance {
    return this.client;
  }
}

/**
 * Create a Serpstat API client instance
 */
export function createSerpstatClient(apiKey: string): SerpstatApiClient {
  return new SerpstatApiClient({ apiKey });
}

/**
 * Export API methods for external use
 */
export { API_METHODS };