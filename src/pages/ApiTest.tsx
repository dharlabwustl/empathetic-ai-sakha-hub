
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  testBackendConnection,
  testApiEndpoint,
  testAllApiEndpoints
} from '@/utils/apiTestUtils';
import { API_ENDPOINTS } from '@/services/api/apiConfig';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const ApiTest = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Record<string, { success: boolean; message: string }>>({});
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);
  
  const testConnection = async () => {
    setIsLoading(true);
    try {
      const isConnected = await testBackendConnection();
      setConnectionStatus(isConnected);
      toast({
        title: isConnected ? 'Connection Successful!' : 'Connection Failed',
        description: isConnected 
          ? 'Backend is reachable and responding properly.'
          : 'Could not connect to the backend. Check server status and configuration.',
        variant: isConnected ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('Connection test error:', error);
      setConnectionStatus(false);
      toast({
        title: 'Connection Test Error',
        description: 'An unexpected error occurred while testing the connection.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const runAllTests = async () => {
    setIsLoading(true);
    try {
      const allResults = await testAllApiEndpoints();
      setResults(allResults.results);
      toast({
        title: allResults.success ? 'All Tests Passed!' : 'Some Tests Failed',
        description: allResults.success 
          ? 'All API endpoints are working correctly.'
          : 'Some API endpoints failed. Check the results for details.',
        variant: allResults.success ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('API testing error:', error);
      toast({
        title: 'Testing Error',
        description: 'An unexpected error occurred while running the tests.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const testSpecificEndpoint = async (endpointName: string, endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET') => {
    setIsLoading(true);
    try {
      const result = await testApiEndpoint(endpoint, method);
      setResults(prev => ({
        ...prev,
        [endpointName]: {
          success: result.success,
          message: result.message
        }
      }));
      toast({
        title: result.success ? 'Test Passed!' : 'Test Failed',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error(`Error testing ${endpointName}:`, error);
      toast({
        title: 'Testing Error',
        description: `Failed to test ${endpointName}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">API Integration Testing</h1>
      
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Backend Connection</h2>
        <p className="mb-4 text-gray-600">Test if the Flask backend server is reachable.</p>
        
        <div className="flex items-center gap-4 mb-4">
          <Button onClick={testConnection} disabled={isLoading}>
            {isLoading ? 'Testing...' : 'Test Connection'}
          </Button>
          
          {connectionStatus !== null && (
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 ${connectionStatus ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>{connectionStatus ? 'Connected' : 'Not Connected'}</span>
            </div>
          )}
        </div>
      </Card>
      
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Environment</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Current Environment:</p>
            <p className="text-gray-600">{import.meta.env.VITE_APP_ENVIRONMENT || 'development'}</p>
          </div>
          <div>
            <p className="font-medium">API Base URL:</p>
            <p className="text-gray-600">{import.meta.env.VITE_APP_ENVIRONMENT === 'production' 
              ? import.meta.env.VITE_API_URL_PRODUCTION 
              : import.meta.env.VITE_APP_ENVIRONMENT === 'staging' 
                ? import.meta.env.VITE_API_URL_STAGING 
                : import.meta.env.VITE_API_URL_DEVELOPMENT}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
        <p className="mb-4 text-gray-600">Test individual API endpoints or run a comprehensive test of all endpoints.</p>
        
        <Button onClick={runAllTests} className="mb-6" disabled={isLoading}>
          {isLoading ? 'Testing...' : 'Test All Endpoints'}
        </Button>
        
        <Separator className="my-6" />
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-3">Authentication</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => testSpecificEndpoint('Auth - Verify Token', API_ENDPOINTS.AUTH.VERIFY_TOKEN, 'GET')}
                disabled={isLoading}
              >
                Test Verify Token
              </Button>
              <Button 
                variant="outline" 
                onClick={() => testSpecificEndpoint('Auth - Login', API_ENDPOINTS.AUTH.LOGIN, 'POST')}
                disabled={isLoading}
              >
                Test Login Endpoint
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">Student</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => testSpecificEndpoint('Students - Get All', API_ENDPOINTS.STUDENTS.BASE, 'GET')}
                disabled={isLoading}
              >
                Test Get Students
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  const studentId = prompt("Enter student ID for testing:", "test-student-id");
                  if (studentId) {
                    testSpecificEndpoint('Student - Get Profile', API_ENDPOINTS.STUDENTS.PROFILE(studentId), 'GET');
                  }
                }}
                disabled={isLoading}
              >
                Test Get Student Profile
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => testSpecificEndpoint('Content - Get Concepts', API_ENDPOINTS.CONTENT.CONCEPTS, 'GET')}
                disabled={isLoading}
              >
                Test Get Concepts
              </Button>
              <Button 
                variant="outline" 
                onClick={() => testSpecificEndpoint('Content - Get Flashcards', API_ENDPOINTS.CONTENT.FLASHCARDS, 'GET')}
                disabled={isLoading}
              >
                Test Get Flashcards
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">AI</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  const userId = prompt("Enter user ID for testing:", "test-user-id");
                  if (userId) {
                    testSpecificEndpoint(
                      'AI - Tutor Chat', 
                      API_ENDPOINTS.AI.TUTOR_CHAT, 
                      'POST'
                    );
                  }
                }}
                disabled={isLoading}
              >
                Test Tutor Chat
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  const userId = prompt("Enter user ID for testing:", "test-user-id");
                  if (userId) {
                    testSpecificEndpoint(
                      'AI - Learning Style', 
                      API_ENDPOINTS.AI.LEARNING_STYLE, 
                      'POST'
                    );
                  }
                }}
                disabled={isLoading}
              >
                Test Learning Style
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">Admin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => testSpecificEndpoint('Admin - Dashboard', API_ENDPOINTS.ADMIN.DASHBOARD, 'GET')}
                disabled={isLoading}
              >
                Test Admin Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={() => testSpecificEndpoint('Admin - Settings', API_ENDPOINTS.ADMIN.SETTINGS, 'GET')}
                disabled={isLoading}
              >
                Test Admin Settings
              </Button>
            </div>
          </div>
        </div>
        
        {Object.keys(results).length > 0 && (
          <>
            <Separator className="my-6" />
            
            <h3 className="text-xl font-medium mb-3">Test Results</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(results).map(([name, result]) => (
                    <tr key={name}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {result.success ? 'Success' : 'Failed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{result.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ApiTest;
