
import apiClient from '@/services/api/apiClient';
import { API_ENDPOINTS } from '@/services/api/apiConfig';
import { toast } from '@/hooks/use-toast';

// Utility for testing API endpoints
export const testApiEndpoint = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  data?: any
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    console.log(`Testing API endpoint: ${endpoint} with method: ${method}`);
    
    let response;
    switch (method) {
      case 'GET':
        response = await apiClient.get(endpoint);
        break;
      case 'POST':
        response = await apiClient.post(endpoint, data || {});
        break;
      case 'PUT':
        response = await apiClient.put(endpoint, data || {});
        break;
      case 'PATCH':
        response = await apiClient.patch(endpoint, data || {});
        break;
      case 'DELETE':
        response = await apiClient.delete(endpoint);
        break;
    }
    
    console.log(`API response:`, response);
    
    if (response.success) {
      return {
        success: true,
        message: `Successfully tested ${endpoint}`,
        data: response.data
      };
    } else {
      return {
        success: false,
        message: response.error || `Failed to connect to ${endpoint}`,
      };
    }
  } catch (error) {
    console.error(`API test error for ${endpoint}:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

// Test connection to the Flask backend
export const testBackendConnection = async (): Promise<boolean> => {
  try {
    // Test a simple endpoint that should always be available
    const response = await apiClient.get('/health');
    return response.success;
  } catch (error) {
    console.error('Backend connection test failed:', error);
    return false;
  }
};

// Run a comprehensive test of all critical API endpoints
export const testAllApiEndpoints = async (): Promise<{
  success: boolean;
  results: Record<string, { success: boolean; message: string }>;
}> => {
  const results: Record<string, { success: boolean; message: string }> = {};
  let overallSuccess = true;
  
  // Test auth endpoints
  const authEndpoints = [
    { name: 'Auth - Verify Token', endpoint: API_ENDPOINTS.AUTH.VERIFY_TOKEN, method: 'GET' as const },
  ];
  
  // Test student endpoints
  const studentId = 'test-student-id'; // This would be replaced with an actual ID in a real test
  const studentEndpoints = [
    { name: 'Students - Get Profile', endpoint: API_ENDPOINTS.STUDENTS.PROFILE(studentId), method: 'GET' as const },
  ];
  
  // Test content endpoints
  const contentEndpoints = [
    { name: 'Content - Get Concepts', endpoint: API_ENDPOINTS.CONTENT.CONCEPTS, method: 'GET' as const },
  ];
  
  // Test AI endpoints
  const aiEndpoints = [
    { name: 'AI - Get Personalized Content', endpoint: `${API_ENDPOINTS.AI.PERSONALIZE}?userId=${studentId}&type=concept&count=3`, method: 'GET' as const },
  ];
  
  // Test admin endpoints
  const adminEndpoints = [
    { name: 'Admin - Get Dashboard Stats', endpoint: API_ENDPOINTS.ADMIN.DASHBOARD, method: 'GET' as const },
  ];
  
  // Combine all endpoints
  const allEndpoints = [
    ...authEndpoints,
    ...studentEndpoints,
    ...contentEndpoints,
    ...aiEndpoints,
    ...adminEndpoints
  ];
  
  // Test each endpoint
  for (const endpoint of allEndpoints) {
    const result = await testApiEndpoint(endpoint.endpoint, endpoint.method);
    results[endpoint.name] = {
      success: result.success,
      message: result.message
    };
    
    if (!result.success) {
      overallSuccess = false;
    }
  }
  
  return {
    success: overallSuccess,
    results
  };
};
