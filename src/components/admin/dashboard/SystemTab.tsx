
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SystemLog } from '@/types/admin';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const SystemTab = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([
    {
      id: '1',
      type: 'error',
      level: 'critical',
      message: 'Database connection failed',
      source: 'backend',
      timestamp: '2025-04-15T12:30:00',
      resolved: false
    },
    {
      id: '2',
      type: 'info',
      level: 'info',
      message: 'User authentication successful',
      source: 'auth',
      timestamp: '2025-04-15T13:45:00',
      resolved: true
    },
    {
      id: '3',
      type: 'warning',
      level: 'medium',
      message: 'Rate limit approaching',
      source: 'api',
      timestamp: '2025-04-15T14:20:00',
      resolved: false
    }
  ]);

  const resolveLog = (id: string) => {
    setSystemLogs(prev => 
      prev.map(log => 
        log.id === id ? { ...log, resolved: true } : log
      )
    );
  };

  const formatTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), 'MMM dd, yyyy HH:mm:ss');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Current system status and health metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* System health content... */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent system events and logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemLogs.map(log => (
                  <div key={log.id} className={`p-4 rounded-md ${
                    log.type === 'error' ? 'bg-red-50 dark:bg-red-900/20' : 
                    log.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' : 
                    'bg-blue-50 dark:bg-blue-900/20'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-medium ${
                          log.type === 'error' ? 'text-red-700 dark:text-red-400' :
                          log.type === 'warning' ? 'text-yellow-700 dark:text-yellow-400' :
                          'text-blue-700 dark:text-blue-400'
                        }`}>
                          {log.type.toUpperCase()}: {log.message}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Source: {log.source} | Time: {formatTimestamp(log.timestamp)}
                        </p>
                      </div>
                      {!log.resolved && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => resolveLog(log.id)}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>Performance metrics and analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Performance metrics... */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemTab;
