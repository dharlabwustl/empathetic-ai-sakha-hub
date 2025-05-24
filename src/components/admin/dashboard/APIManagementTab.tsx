
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Globe, Key, Activity, AlertCircle, CheckCircle, Copy, Eye, EyeOff } from 'lucide-react';

interface APIEndpoint {
  id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'active' | 'inactive' | 'deprecated';
  requestsToday: number;
  avgResponseTime: number;
  errorRate: number;
  lastUsed: string;
  description: string;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  created: string;
  lastUsed: string;
  active: boolean;
}

const APIManagementTab: React.FC = () => {
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [selectedTab, setSelectedTab] = useState<'endpoints' | 'keys' | 'docs'>('endpoints');

  const apiEndpoints: APIEndpoint[] = [
    {
      id: '1',
      name: 'User Authentication',
      path: '/api/auth/login',
      method: 'POST',
      status: 'active',
      requestsToday: 2847,
      avgResponseTime: 245,
      errorRate: 0.2,
      lastUsed: '2 minutes ago',
      description: 'Authenticate users and generate access tokens'
    },
    {
      id: '2',
      name: 'Student Progress',
      path: '/api/students/progress',
      method: 'GET',
      status: 'active',
      requestsToday: 1534,
      avgResponseTime: 180,
      errorRate: 0.1,
      lastUsed: '5 minutes ago',
      description: 'Retrieve student progress and analytics data'
    },
    {
      id: '3',
      name: 'Content Management',
      path: '/api/content',
      method: 'POST',
      status: 'active',
      requestsToday: 456,
      avgResponseTime: 320,
      errorRate: 0.5,
      lastUsed: '1 hour ago',
      description: 'Create and manage educational content'
    },
    {
      id: '4',
      name: 'Legacy Data Export',
      path: '/api/v1/export',
      method: 'GET',
      status: 'deprecated',
      requestsToday: 23,
      avgResponseTime: 1200,
      errorRate: 2.1,
      lastUsed: '2 days ago',
      description: 'Legacy endpoint for data export (deprecated)'
    }
  ];

  const apiKeys: APIKey[] = [
    {
      id: '1',
      name: 'Production Key',
      key: 'pk_live_abc123def456ghi789jkl012',
      permissions: ['read', 'write', 'admin'],
      created: '2024-01-01',
      lastUsed: '2 hours ago',
      active: true
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'pk_test_xyz789uvw456rst123opq456',
      permissions: ['read', 'write'],
      created: '2024-01-10',
      lastUsed: '1 day ago',
      active: true
    },
    {
      id: '3',
      name: 'Analytics Key',
      key: 'pk_analytics_mno345pqr678stu901vwx234',
      permissions: ['read'],
      created: '2024-01-15',
      lastUsed: '3 days ago',
      active: false
    }
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'deprecated': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      'GET': 'bg-blue-100 text-blue-800',
      'POST': 'bg-green-100 text-green-800',
      'PUT': 'bg-yellow-100 text-yellow-800',
      'DELETE': 'bg-red-100 text-red-800'
    };
    return colors[method] || 'bg-gray-100 text-gray-800';
  };

  const toggleApiKeyVisibility = (keyId: string) => {
    setShowApiKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you'd show a toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apiEndpoints.reduce((sum, api) => sum + api.requestsToday, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(apiEndpoints.reduce((sum, api) => sum + api.avgResponseTime, 0) / apiEndpoints.length)}ms
            </div>
            <p className="text-xs text-muted-foreground">Across all endpoints</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(apiEndpoints.reduce((sum, api) => sum + api.errorRate, 0) / apiEndpoints.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Average error rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Endpoints</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apiEndpoints.filter(api => api.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Out of {apiEndpoints.length} total</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 border-b">
        <Button
          variant={selectedTab === 'endpoints' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('endpoints')}
          className="rounded-t-lg rounded-b-none"
        >
          API Endpoints
        </Button>
        <Button
          variant={selectedTab === 'keys' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('keys')}
          className="rounded-t-lg rounded-b-none"
        >
          API Keys
        </Button>
        <Button
          variant={selectedTab === 'docs' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('docs')}
          className="rounded-t-lg rounded-b-none"
        >
          Documentation
        </Button>
      </div>

      {/* API Endpoints Tab */}
      {selectedTab === 'endpoints' && (
        <Card>
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiEndpoints.map((endpoint) => (
                <div key={endpoint.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{endpoint.name}</h3>
                        <Badge className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                        <Badge className={getStatusColor(endpoint.status)}>
                          {endpoint.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {endpoint.description}
                      </p>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {endpoint.path}
                      </code>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="text-lg font-bold text-blue-600">{endpoint.requestsToday.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Requests Today</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="text-lg font-bold text-green-600">{endpoint.avgResponseTime}ms</div>
                      <div className="text-xs text-gray-500">Avg Response</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className={`text-lg font-bold ${endpoint.errorRate > 1 ? 'text-red-600' : 'text-green-600'}`}>
                        {endpoint.errorRate}%
                      </div>
                      <div className="text-xs text-gray-500">Error Rate</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="text-lg font-bold text-gray-600">{endpoint.lastUsed}</div>
                      <div className="text-xs text-gray-500">Last Used</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Keys Tab */}
      {selectedTab === 'keys' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>API Keys</CardTitle>
              <Button>
                <Key className="mr-2 h-4 w-4" />
                Generate New Key
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{apiKey.name}</h3>
                        <Badge className={apiKey.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {apiKey.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Input
                          type={showApiKeys[apiKey.id] ? 'text' : 'password'}
                          value={apiKey.key}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleApiKeyVisibility(apiKey.id)}
                        >
                          {showApiKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(apiKey.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-500">Permissions:</span>
                        {apiKey.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>

                      <div className="text-sm text-gray-500">
                        Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch checked={apiKey.active} />
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documentation Tab */}
      {selectedTab === 'docs' && (
        <Card>
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Welcome to the PREPZR API. This RESTful API allows you to integrate with our platform
                  and access student data, content, and analytics.
                </p>
                
                <h4 className="font-semibold mb-2">Authentication</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  All API requests require authentication using an API key. Include your API key in the Authorization header:
                </p>
                <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
                  Authorization: Bearer your_api_key_here
                </code>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Rate Limits</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li>1000 requests per hour for standard endpoints</li>
                  <li>10000 requests per hour for analytics endpoints</li>
                  <li>Rate limit headers are included in all responses</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Common Endpoints</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">GET</Badge>
                    <code>/api/students</code>
                    <span className="text-gray-600">- Get all students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">GET</Badge>
                    <code>/api/students/:id/progress</code>
                    <span className="text-gray-600">- Get student progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">POST</Badge>
                    <code>/api/content</code>
                    <span className="text-gray-600">- Create new content</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default APIManagementTab;
