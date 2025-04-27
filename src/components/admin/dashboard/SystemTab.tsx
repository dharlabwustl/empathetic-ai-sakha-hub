
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SystemLog } from "@/types/admin/systemLog";

// Mock system logs
const systemLogs: SystemLog[] = [
  {
    id: "log1",
    level: "info",
    message: "System started successfully",
    timestamp: new Date().toISOString(), // Convert to string
    source: "system",
    details: { version: "1.2.3" }
  },
  {
    id: "log2",
    level: "warning",
    message: "High memory usage detected",
    timestamp: new Date().toISOString(), // Convert to string
    source: "monitoring",
    details: { usage: "85%" }
  },
  {
    id: "log3",
    level: "error",
    message: "Database connection failed",
    timestamp: new Date().toISOString(), // Convert to string
    source: "database",
    details: { error: "Connection timeout" }
  }
];

const getStatusColor = (level: string) => {
  switch (level) {
    case 'error':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'info':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'debug':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const SystemTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Healthy</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10 minutes ago</div>
            <p className="text-xs text-muted-foreground">Regular checks run every 5 min</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Version</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">v2.5.0</div>
            <p className="text-xs text-muted-foreground">Released 2 weeks ago</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Logs</CardTitle>
          <CardDescription>Recent system events and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(log.level)}>
                      {log.level.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.message}</TableCell>
                  <TableCell>{log.source}</TableCell>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline">View All Logs</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemTab;
