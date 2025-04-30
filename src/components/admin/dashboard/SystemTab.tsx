
import React from 'react';
import { SystemLog } from '@/types/admin/systemLog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Sample data for demonstration
const sampleLogs: SystemLog[] = [
  {
    id: '1',
    event: 'Server Restart',
    timestamp: new Date().toISOString(),
    level: 'info',
    details: { reason: 'Scheduled maintenance', duration: '5m' }
  },
  {
    id: '2',
    event: 'Database Backup',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    level: 'info',
    details: { size: '1.2GB', location: 's3://backup' }
  },
  {
    id: '3',
    event: 'API Rate Limit Exceeded',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    level: 'warning',
    details: { endpoint: '/api/data', user: 'user123' }
  }
];

interface SystemTabProps {
  logs?: SystemLog[];
}

const SystemTab: React.FC<SystemTabProps> = ({ logs = sampleLogs }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-amber-100 text-amber-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.event}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getLevelBadgeClass(log.level)}`}>
                      {log.level}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(log.timestamp)}</TableCell>
                  <TableCell>
                    <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemTab;
