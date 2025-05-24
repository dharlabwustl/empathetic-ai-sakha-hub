
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { apiEndpointChecker } from '@/services/api/apiEndpointChecker';

interface EndpointStatus {
  exists: boolean;
  status?: number;
  message: string;
  responseTime?: number;
}

const APIPerformance: React.FC = () => {
  const [endpointStatuses, setEndpointStatuses] = useState<Record<string, EndpointStatus>>({});
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkAllEndpoints = async () => {
    setIsChecking(true);
    try {
      const results = await apiEndpointChecker.checkAllEndpoints();
      setEndpointStatuses(results);
      setLastChecked(new Date());
    } catch (error) {
      console.error('Error checking endpoints:', error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkAllEndpoints();
  }, []);

  const getStatusIcon = (status: EndpointStatus) => {
    if (status.exists && status.status && status.status >= 200 && status.status < 300) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (status.status && status.status >= 400 && status.status < 500) {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    } else {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: EndpointStatus) => {
    if (status.exists && status.status && status.status >= 200 && status.status < 300) {
      return <Badge className="bg-green-100 text-green-800">Online</Badge>;
    } else if (status.status && status.status >= 400 && status.status < 500) {
      return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Offline</Badge>;
    }
  };

  const categorizeEndpoints = () => {
    const categories: Record<string, string[]> = {
      'Authentication': [],
      'Admin': [],
      'AI Services': [],
      'Database': []
    };

    Object.keys(endpointStatuses).forEach(endpoint => {
      if (endpoint.includes('/auth/')) {
        categories['Authentication'].push(endpoint);
      } else if (endpoint.includes('/admin/')) {
        categories['Admin'].push(endpoint);
      } else if (endpoint.includes('/ai/')) {
        categories['AI Services'].push(endpoint);
      } else if (endpoint.includes('/database/')) {
        categories['Database'].push(endpoint);
      }
    });

    return categories;
  };

  const getOverallHealth = () => {
    const total = Object.keys(endpointStatuses).length;
    const healthy = Object.values(endpointStatuses).filter(
      status => status.exists && status.status && status.status >= 200 && status.status < 300
    ).length;
    
    return total > 0 ? Math.round((healthy / total) * 100) : 0;
  };

  const categories = categorizeEndpoints();
  const overallHealth = getOverallHealth();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            API Performance Monitor
          </CardTitle>
          <Button
            onClick={checkAllEndpoints}
            disabled={isChecking}
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
            {isChecking ? 'Checking...' : 'Refresh'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Health */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <h3 className="font-medium">Overall API Health</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {lastChecked ? `Last checked: ${lastChecked.toLocaleTimeString()}` : 'Never checked'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{overallHealth}%</div>
            <Badge className={overallHealth >= 80 ? 'bg-green-100 text-green-800' : 
                             overallHealth >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                             'bg-red-100 text-red-800'}>
              {overallHealth >= 80 ? 'Healthy' : overallHealth >= 60 ? 'Warning' : 'Critical'}
            </Badge>
          </div>
        </div>

        {/* Endpoint Categories */}
        {Object.entries(categories).map(([category, endpoints]) => (
          endpoints.length > 0 && (
            <div key={category} className="space-y-3">
              <h3 className="font-medium text-lg">{category}</h3>
              <div className="space-y-2">
                {endpoints.map(endpoint => {
                  const status = endpointStatuses[endpoint];
                  return (
                    <div 
                      key={endpoint}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(status)}
                        <div>
                          <code className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {endpoint.replace(process.env.VITE_API_URL || 'http://localhost:5000/api', '')}
                          </code>
                          <p className="text-xs text-gray-500 mt-1">{status.message}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {status.status && (
                          <Badge variant="outline" className="text-xs">
                            {status.status}
                          </Badge>
                        )}
                        {getStatusBadge(status)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        ))}

        {Object.keys(endpointStatuses).length === 0 && !isChecking && (
          <div className="text-center py-8 text-gray-500">
            <p>No endpoint data available. Click refresh to check API status.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default APIPerformance;
