
import apiClient from '../api/apiClient';
import { API_ENDPOINTS } from '../api/apiConfig';

/**
 * API Endpoint Checker - Used to verify API endpoints are correctly configured
 * This utility can be used from the admin dashboard to verify the API endpoints
 */
export const apiEndpointChecker = {
  /**
   * Check if the API endpoint exists and is accessible
   * @param endpoint The endpoint to check
   * @returns Promise resolving to a check result
   */
  async checkEndpoint(endpoint: string): Promise<{
    exists: boolean;
    status?: number;
    message: string;
  }> {
    try {
      const response = await apiClient.head(endpoint);
      return {
        exists: true,
        status: response.status,
        message: `Endpoint exists and returned status ${response.status}`,
      };
    } catch (error: any) {
      // If we got a 404, the endpoint doesn't exist
      if (error.response?.status === 404) {
        return {
          exists: false,
          status: 404,
          message: 'Endpoint not found',
        };
      }
      
      // If we got another error status, the endpoint exists but there might be an auth issue
      if (error.response?.status) {
        return {
          exists: true,
          status: error.response.status,
          message: `Endpoint exists but returned status ${error.response.status}`,
        };
      }
      
      // Network error or other issue
      return {
        exists: false,
        message: `Error checking endpoint: ${error.message || 'Unknown error'}`,
      };
    }
  },
  
  /**
   * Check all API endpoints 
   * @returns Promise resolving to a map of endpoint check results
   */
  async checkAllEndpoints(): Promise<Record<string, { exists: boolean; status?: number; message: string }>> {
    const results: Record<string, { exists: boolean; status?: number; message: string }> = {};
    
    // Flatten API endpoints into a list
    const endpointsList: string[] = [];
    
    // Add endpoints for students
    endpointsList.push(API_ENDPOINTS.STUDENTS.PROFILE('test'));
    endpointsList.push(API_ENDPOINTS.STUDENTS.GOALS('test'));
    endpointsList.push(API_ENDPOINTS.STUDENTS.ONBOARDING('test'));
    endpointsList.push(API_ENDPOINTS.STUDENTS.STUDY_PLAN('test'));
    endpointsList.push(API_ENDPOINTS.STUDENTS.MOOD_LOGS('test'));
    endpointsList.push(API_ENDPOINTS.STUDENTS.DOUBTS('test'));
    
    // Check each endpoint
    for (const endpoint of endpointsList) {
      results[endpoint] = await this.checkEndpoint(endpoint);
    }
    
    return results;
  }
};

// Export a helper function to get the database schema
export const getDatabaseSchema = async () => {
  try {
    const response = await apiClient.get('/admin/database-schema');
    return response.data;
  } catch (error) {
    console.error('Error fetching database schema:', error);
    throw error;
  }
};
