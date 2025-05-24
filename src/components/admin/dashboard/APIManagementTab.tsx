
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Globe, Key, Activity, AlertTriangle, CheckCircle, Zap, Database, Shield } from 'lucide-react';

const APIManagementTab: React.FC = () => {
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Student Dashboard API',
      key: 'sk_live_***************3a2b',
      status: 'active',
      requests: 15670,
      rateLimit: '1000/hour',
      lastUsed: '2 minutes ago',
      permissions: ['read:students', 'write:progress', 'read:analytics']
    },
    {
      id: '2',
      name: 'Content Management API',
      key: 'sk_live_***************7c8d',
      status: 'active',
      requests: 8934,
      rateLimit: '500/hour',
      lastUsed: '15 minutes ago',
      permissions: ['read:content', 'write:content', 'delete:content']
    },
    {
      id: '3',
      name: 'AI Models API',
      key: 'sk_test_***************1e2f',
      status: 'inactive',
      requests: 0,
      rateLimit: '100/hour',
      lastUsed: 'Never',
      permissions: ['read:models', 'write:models']
    }
  ]);

  const flaskEndpoints = [
    {
      endpoint: '/api/students',
      method: 'GET',
      description: 'Retrieve student profiles and data',
      status: 'operational',
      responseTime: '245ms',
      requests24h: 2543
    },
    {
      endpoint: '/api/content/concepts',
      method: 'GET',
      description: 'Fetch concept cards and learning materials',
      status: 'operational',
      responseTime: '180ms',
      requests24h: 5678
    },
    {
      endpoint: '/api/exams/results',
      method: 'POST',
      description: 'Submit and retrieve exam results',
      status: 'operational',
      responseTime: '320ms',
      requests24h: 1234
    },
    {
      endpoint: '/api/ai/tutor',
      method: 'POST',
      description: 'AI tutor interaction and responses',
      status: 'degraded',
      responseTime: '1.2s',
      requests24h: 8765
    },
    {
      endpoint: '/api/analytics/dashboard',
      method: 'GET',
      description: 'Dashboard analytics and metrics',
      status: 'operational',
      responseTime: '156ms',
      requests24h: 987
    }
  ];

  const toggleApiKey = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId 
        ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
        : key
    ));
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'operational': 'bg-green-100 text-green-800',
      'degraded': 'bg-yellow-100 text-yellow-800',
      'down': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'operational' || status === 'active') {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else if (status === 'degraded') {
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    } else {
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* API Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total API Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apiKeys.length}</div>
            <p className="text-xs text-muted-foreground">{apiKeys.filter(k => k.status === 'active').length} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requests Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flaskEndpoints.reduce((sum, ep) => sum + ep.requests24h, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all endpoints</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">287ms</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime this month</p>
          </CardContent>
        </Card>
      </div>

      {/* API Keys Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>API Keys Management</CardTitle>
            <Button>
              <Key className="mr-2 h-4 w-4" />
              Generate New Key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>API Key</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requests</TableHead>
                  <TableHead>Rate Limit</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-medium">{key.name}</TableCell>
                    <TableCell className="font-mono text-sm">{key.key}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(key.status)}>
                        {key.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{key.requests.toLocaleString()}</TableCell>
                    <TableCell>{key.rateLimit}</TableCell>
                    <TableCell>{key.lastUsed}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={key.status === 'active'}
                          onCheckedChange={() => toggleApiKey(key.id)}
                        />
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Flask Endpoints Status */}
      <Card>
        <CardHeader>
          <CardTitle>Flask API Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flaskEndpoints.map((endpoint, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="font-mono">
                        {endpoint.method}
                      </Badge>
                      <span className="font-mono text-sm">{endpoint.endpoint}</span>
                      {getStatusIcon(endpoint.status)}
                      <Badge className={getStatusColor(endpoint.status)}>
                        {endpoint.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Response Time: {endpoint.responseTime}</span>
                      <span>Requests (24h): {endpoint.requests24h.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Logs
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle>Database & Flask Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold">Database Connections</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span>Primary Database</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span>Redis Cache</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span>Analytics DB</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">Flask Services</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span>Authentication Service</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Running</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span>Content Service</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Running</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span>AI Service</span>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-600">Degraded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIManagementTab;
