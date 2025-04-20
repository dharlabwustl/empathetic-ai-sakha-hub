
import React, { useState } from 'react';
import { SystemLog } from '@/types/admin/systemLog';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, AlertOctagon, Info } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const defaultSystemLogs: SystemLog[] = [
  {
    id: "1",
    timestamp: "2023-08-15T15:30:00Z",
    source: "Authentication Service",
    level: "error",
    message: "User login failures detected: multiple incorrect password attempts",
    details: "Three users experienced repeated login failures. IP addresses have been temporarily rate-limited.",
    resolved: false
  },
  {
    id: "2",
    timestamp: "2023-08-15T14:45:00Z",
    source: "Content Delivery Network",
    level: "critical",
    message: "CDN outage affecting video content delivery",
    details: "Our main CDN provider is experiencing an outage affecting video streaming. Estimated resolution time: 30 minutes. Failover initiated.",
    resolved: false
  },
  {
    id: "3",
    timestamp: "2023-08-15T12:15:00Z",
    source: "Database Service",
    level: "warning",
    message: "Database performance degradation",
    details: "The main database cluster is experiencing increased latency. Query times are approximately 2x normal values. Investigating connection pool issues.",
    resolved: false
  }
];

interface IssueResolutionTabProps {
  systemLogs?: SystemLog[];
}

const IssueResolutionTab = ({ systemLogs = defaultSystemLogs }: IssueResolutionTabProps) => {
  const [logs, setLogs] = useState<SystemLog[]>(systemLogs);
  const [filter, setFilter] = useState<'all' | 'resolved' | 'unresolved'>('unresolved');

  const handleResolveIssue = (id: string) => {
    setLogs(prev => prev.map(log => 
      log.id === id ? { ...log, resolved: true } : log
    ));
  };

  const getFilteredLogs = () => {
    switch (filter) {
      case 'resolved':
        return logs.filter(log => log.resolved);
      case 'unresolved':
        return logs.filter(log => !log.resolved);
      default:
        return logs;
    }
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
        <h2 className="text-2xl font-bold">System Issues</h2>
        <div className="flex items-center space-x-2">
          <Input 
            placeholder="Search issues..."
            className="w-64"
          />
          <Button variant="outline">Search</Button>
        </div>
      </div>
      
      <Tabs defaultValue="unresolved" value={filter} onValueChange={value => setFilter(value as 'all' | 'resolved' | 'unresolved')}>
        <TabsList>
          <TabsTrigger value="all">All Issues</TabsTrigger>
          <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        
        <TabsContent value={filter} className="mt-6">
          <div className="space-y-4">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No issues matching the current filter
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
                        onClick={() => handleResolveIssue(log.id)}
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
};

export default IssueResolutionTab;
