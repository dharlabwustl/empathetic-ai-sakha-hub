
import React, { useState } from 'react';
import { SystemLog } from '@/types/admin/systemLog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, AlertOctagon, Info } from 'lucide-react';

const mockLogs: SystemLog[] = [
  {
    id: "1",
    timestamp: "2023-08-15T15:30:00Z",
    source: "Authentication Service",
    level: "info",
    message: "User login successful: Rahul Sharma (rahul.s@example.com)",
    resolved: true
  },
  {
    id: "2",
    timestamp: "2023-08-15T14:45:00Z",
    source: "Content Delivery Network",
    level: "warning",
    message: "Slow response times detected on content delivery network. Average load time increased by 1.5 seconds.",
    resolved: true
  },
  {
    id: "3",
    timestamp: "2023-08-15T12:15:00Z",
    source: "Database Service",
    level: "error",
    message: "Connection timeout error occurred during database query execution.",
    resolved: false,
    details: "Connection to the primary database timed out after 30 seconds. Failover to secondary database was successful."
  },
  {
    id: "4",
    timestamp: "2023-08-14T23:10:00Z",
    source: "Payment Gateway",
    level: "critical",
    message: "Payment processing failure detected for multiple transactions.",
    resolved: false,
    details: "Multiple payment attempts failed due to API timeout. Affected user IDs: 1042, 1055, 1060. Technical team has been notified."
  }
];

interface SystemTabProps {
  systemLogs?: SystemLog[];
}

export function SystemTab({ systemLogs = mockLogs }: SystemTabProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [logs, setLogs] = useState(systemLogs);

  const handleResolveLog = (id: string) => {
    setLogs(logs.map(log => 
      log.id === id ? { ...log, resolved: true } : log
    ));
  };

  const getFilteredLogs = () => {
    if (activeTab === 'all') return logs;
    if (activeTab === 'resolved') return logs.filter(log => log.resolved);
    if (activeTab === 'unresolved') return logs.filter(log => !log.resolved);
    
    // Filter by level
    return logs.filter(log => log.level === activeTab);
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertOctagon className="h-5 w-5 text-red-500" />;
      case 'critical':
        return <AlertOctagon className="h-5 w-5 text-red-700" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const filteredLogs = getFilteredLogs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">System Logs</h2>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Logs</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="warning">Warnings</TabsTrigger>
          <TabsTrigger value="error">Errors</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No logs matching the current filter
              </div>
            ) : (
              filteredLogs.map((log) => (
                <Card key={log.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getLogIcon(log.level)}
                        <CardTitle className="text-lg">{log.source}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`
                          ${log.level === 'info' ? 'bg-blue-100 text-blue-800' : ''}
                          ${log.level === 'warning' ? 'bg-amber-100 text-amber-800' : ''}
                          ${log.level === 'error' ? 'bg-red-100 text-red-800' : ''}
                          ${log.level === 'critical' ? 'bg-red-200 text-red-900' : ''}
                        `}>
                          {log.level.toUpperCase()}
                        </Badge>
                        
                        {log.resolved !== undefined && (
                          <Badge variant={log.resolved ? "outline" : "default"} className={log.resolved ? "bg-green-100 text-green-800 border-green-200" : ""}>
                            {log.resolved ? "Resolved" : "Unresolved"}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardDescription className="text-xs">
                      {formatTimestamp(log.timestamp)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{log.message}</p>
                    {log.details && (
                      <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                        <p className="font-semibold mb-1">Details:</p>
                        <p>{log.details}</p>
                      </div>
                    )}
                  </CardContent>
                  {!log.resolved && (
                    <CardFooter>
                      <Button 
                        variant="outline"
                        className="ml-auto"
                        onClick={() => handleResolveLog(log.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Resolved
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
