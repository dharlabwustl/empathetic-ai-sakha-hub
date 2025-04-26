import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SystemLog } from '@/types/admin/systemLog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const SystemTab = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([
    {
      id: '1',
      level: 'error',
      message: 'Database connection failed',
      source: 'backend',
      timestamp: new Date('2025-04-15T12:30:00').toISOString(),
      resolved: false
    },
    {
      id: '2',
      level: 'info',
      message: 'User authentication successful',
      source: 'auth',
      timestamp: new Date('2025-04-15T13:45:00').toISOString(),
      resolved: true
    },
    {
      id: '3',
      level: 'warning',
      message: 'Rate limit approaching',
      source: 'api',
      timestamp: new Date('2025-04-15T14:20:00').toISOString(),
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
    const date = new Date(timestamp);
    return format(date, 'MMM dd, yyyy HH:mm:ss');
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
                    log.level === 'error' ? 'bg-red-50 dark:bg-red-900/20' : 
                    log.level === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' : 
                    'bg-blue-50 dark:bg-blue-900/20'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-medium ${
                          log.level === 'error' ? 'text-red-700 dark:text-red-400' :
                          log.level === 'warning' ? 'text-yellow-700 dark:text-yellow-400' :
                          'text-blue-700 dark:text-blue-400'
                        }`}>
                          {log.level.toUpperCase()}: {log.message}
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
