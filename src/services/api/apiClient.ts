
import apiConfig, { ApiResponse } from './apiConfig';

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private withCredentials: boolean;
  
  constructor() {
    this.baseUrl = apiConfig.baseUrl;
    this.defaultHeaders = { ...apiConfig.defaultHeaders };
    this.withCredentials = apiConfig.withCredentials;
  }
  
  // Set authorization token for authenticated requests
  setAuthToken(token: string | null): void {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }
  
  // Generic request method
  private async request<T>(
    endpoint: string, 
    method: string, 
    data?: unknown, 
    customHeaders?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = this.baseUrl + endpoint;
    const headers = { ...this.defaultHeaders, ...customHeaders };
    
    const options: RequestInit = {
      method,
      headers,
      credentials: this.withCredentials ? 'include' : 'same-origin',
    };
    
    if (data && (method !== 'GET' && method !== 'HEAD')) {
      options.body = JSON.stringify(data);
    }
    
    try {
      console.log(`API ${method} request to: ${url}`);
      const response = await fetch(url, options);
      
      // If the content type is JSON, parse the response
      const contentType = response.headers.get('content-type');
      let responseData;
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
      
      if (!response.ok) {
        console.error('API error:', responseData);
        return {
          success: false,
          error: responseData?.error || 'An error occurred',
          message: responseData?.message || response.statusText,
        };
      }
      
      return {
        success: true,
        data: responseData,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: (error as Error).message || 'Network error',
      };
    }
  }
  
  // HTTP method implementations
  async get<T>(endpoint: string, customHeaders?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'GET', undefined, customHeaders);
  }
  
  async post<T>(endpoint: string, data: unknown, customHeaders?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', data, customHeaders);
  }
  
  async put<T>(endpoint: string, data: unknown, customHeaders?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PUT', data, customHeaders);
  }
  
  async patch<T>(endpoint: string, data: unknown, customHeaders?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PATCH', data, customHeaders);
  }
  
  async delete<T>(endpoint: string, customHeaders?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE', undefined, customHeaders);
  }
  
  // Adding HEAD method for API endpoint checking
  async head<T>(endpoint: string, customHeaders?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'HEAD', undefined, customHeaders);
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();
export default apiClient;
