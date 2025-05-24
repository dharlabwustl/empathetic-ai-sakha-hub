
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Zap, AlertCircle, CheckCircle } from 'lucide-react';

const APIBackendIntegration = () => {
  const apiEndpoints = [
    { name: 'User Management', status: 'operational', response: '120ms' },
    { name: 'Content Generation', status: 'operational', response: '340ms' },
    { name: 'Study Plans', status: 'operational', response: '180ms' },
    { name: 'Analytics', status: 'warning', response: '560ms' },
    { name: 'Notifications', status: 'operational', response: '95ms' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            API Endpoint Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiEndpoints.map((endpoint) => (
              <div key={endpoint.name} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  {endpoint.status === 'operational' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className="font-medium">{endpoint.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={endpoint.status === 'operational' ? 'default' : 'secondary'}>
                    {endpoint.response}
                  </Badge>
                  <Badge variant={endpoint.status === 'operational' ? 'default' : 'destructive'}>
                    {endpoint.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Flask Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <h3 className="font-medium text-green-800">Flask Routes Status</h3>
              <p className="text-sm text-green-700">All routes aligned with current page structure</p>
            </div>
            <div className="flex gap-2">
              <Button>Test All Endpoints</Button>
              <Button variant="outline">View Error Logs</Button>
              <Button variant="outline">Update Routes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIBackendIntegration;
