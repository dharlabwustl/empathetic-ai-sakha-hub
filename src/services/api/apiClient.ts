
import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add response interceptor to handle common errors
apiClient.interceptors.response.use(response => {
  return response;
}, error => {
  // Handle 401 errors (unauthorized)
  if (error.response && error.response.status === 401) {
    // Clear auth token
    localStorage.removeItem('authToken');
    
    // Redirect to login page if not already there
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }
  
  // Handle other errors
  const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
  console.error('API Error:', errorMessage);
  
  return Promise.reject(error);
});

export default apiClient;
