
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from './apiConfig';
import { useToast } from '@/hooks/use-toast';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Standard response wrapper
interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error: string | null;
  statusCode?: number;
}

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Add response interceptor to handle common errors
axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  // Handle 401 errors (unauthorized)
  if (error.response && error.response.status === 401) {
    // Clear auth token
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    
    // Redirect to login page if not already there
    if (window.location.pathname !== '/login' && 
        window.location.pathname !== '/signup' &&
        !window.location.pathname.includes('/auth/')) {
      window.location.href = '/login';
    }
  }
  
  // Handle API rate limiting
  if (error.response && error.response.status === 429) {
    console.error('API Rate Limited:', error.response.data);
    // You can implement a retry mechanism here
  }
  
  // Handle server errors
  if (error.response && error.response.status >= 500) {
    console.error('Server Error:', error.response.data);
    // Consider implementing a fallback mechanism here
  }
  
  // Handle network errors
  if (error.request && !error.response) {
    console.error('Network Error: No response received');
    // Implement offline handling or retry mechanism
  }
  
  // Extract error message
  const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
  console.error('API Error:', errorMessage);
  
  return Promise.reject(error);
});

// Enhanced API client with typed responses
const apiClient = {
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url, config);
      return {
        success: true,
        data: response.data,
        error: null,
        statusCode: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || error.message || 'Request failed',
        statusCode: error.response?.status
      };
    }
  },
  
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(url, data, config);
      return {
        success: true,
        data: response.data,
        error: null,
        statusCode: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || error.message || 'Request failed',
        statusCode: error.response?.status
      };
    }
  },
  
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.put(url, data, config);
      return {
        success: true,
        data: response.data,
        error: null,
        statusCode: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || error.message || 'Request failed',
        statusCode: error.response?.status
      };
    }
  },
  
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.delete(url, config);
      return {
        success: true,
        data: response.data,
        error: null,
        statusCode: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || error.message || 'Request failed',
        statusCode: error.response?.status
      };
    }
  },
  
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.patch(url, data, config);
      return {
        success: true,
        data: response.data,
        error: null,
        statusCode: response.status
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || error.message || 'Request failed',
        statusCode: error.response?.status
      };
    }
  },
  
  setAuthToken: (token: string | null) => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('authToken', token);
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken');
    }
  },
  
  // Mock API for client-side simulated responses during development
  mock: {
    async get<T = any>(mockData: T, delay = 500, shouldError = false): Promise<ApiResponse<T>> {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (shouldError) {
            resolve({
              success: false,
              data: null,
              error: 'Mock API error',
              statusCode: 500
            });
          } else {
            resolve({
              success: true,
              data: mockData,
              error: null,
              statusCode: 200
            });
          }
        }, delay);
      });
    },
    
    async post<T = any>(mockData: T, delay = 500, shouldError = false): Promise<ApiResponse<T>> {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (shouldError) {
            resolve({
              success: false,
              data: null,
              error: 'Mock API error',
              statusCode: 500
            });
          } else {
            resolve({
              success: true,
              data: mockData,
              error: null,
              statusCode: 201
            });
          }
        }, delay);
      });
    }
  },
  
  // Add axios instance reference for advanced usage
  axios: axiosInstance
};

export default apiClient;
export type { ApiResponse };
