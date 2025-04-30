
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { SystemLog } from '@/types/admin/systemLog';

interface SystemTabProps {
  logs: SystemLog[];
}

const SystemTab: React.FC<SystemTabProps> = ({ logs }) => {
  const [logFilter, setLogFilter] = useState<'all' | 'info' | 'warning' | 'error'>('all');
  
  const filteredLogs = logFilter === 'all' 
    ? logs 
    : logs.filter(log => log.level === logFilter);
  
  const getBadgeVariant = (level: string) => {
    switch (level) {
      case 'info': return 'default';
      case 'warning': return 'warning';
      case 'error': return 'destructive';
      case 'debug': return 'outline';
      default: return 'secondary';
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>System Logs</CardTitle>
        <div className="flex space-x-2">
          <Badge 
            className={`cursor-pointer ${logFilter === 'all' ? 'opacity-100' : 'opacity-50'}`}
            onClick={() => setLogFilter('all')}
          >
            All
          </Badge>
          <Badge 
            className={`cursor-pointer ${logFilter === 'info' ? 'opacity-100' : 'opacity-50'}`}
            variant="default" 
            onClick={() => setLogFilter('info')}
          >
            Info
          </Badge>
          <Badge 
            className={`cursor-pointer ${logFilter === 'warning' ? 'opacity-100' : 'opacity-50'}`}
            variant="warning" 
            onClick={() => setLogFilter('warning')}
          >
            Warning
          </Badge>
          <Badge 
            className={`cursor-pointer ${logFilter === 'error' ? 'opacity-100' : 'opacity-50'}`}
            variant="destructive" 
            onClick={() => setLogFilter('error')}
          >
            Error
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(log.level) as any}>
                    {log.level.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{log.event}</TableCell>
                <TableCell>
                  <pre className="text-xs max-w-xs overflow-x-auto">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SystemTab;
