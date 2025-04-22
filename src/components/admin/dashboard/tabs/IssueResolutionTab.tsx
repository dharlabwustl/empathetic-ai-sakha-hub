
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SystemLog } from "@/types/admin";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Check,
  CheckCircle,
  Clock,
  Info,
  Search,
  Trash2,
  User,
  Users,
  FileText,
  Settings,
  RefreshCcw,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const IssueResolutionTab = () => {
  // Mock data for system logs
  const [logs, setLogs] = useState<SystemLog[]>([
    {
      id: "1",
      timestamp: "2023-12-01T08:30:00",
      type: "error",
      level: "critical",
      message: "Payment gateway connection failed",
      source: "payment-service",
      resolved: false,
    },
    {
      id: "2",
      timestamp: "2023-12-01T10:15:00",
      type: "warning",
      level: "medium",
      message: "High CPU usage detected",
      source: "monitoring",
      resolved: false,
    },
    {
      id: "3",
      timestamp: "2023-12-01T11:45:00",
      type: "info",
      level: "low",
      message: "Backup completed successfully",
      source: "backup-service",
      resolved: true,
    },
    {
      id: "4",
      timestamp: "2023-12-02T09:20:00",
      type: "error",
      level: "high",
      message: "Database query timeout",
      source: "db-service",
      resolved: false,
    },
    {
      id: "5",
      timestamp: "2023-12-02T14:10:00",
      type: "warning",
      level: "medium",
      message: "Memory usage approaching limit",
      source: "monitoring",
      resolved: true,
    },
    {
      id: "6",
      timestamp: "2023-12-03T08:05:00",
      type: "error",
      level: "critical",
      message: "Authentication service unreachable",
      source: "auth-service",
      resolved: false,
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate stats
  const criticalCount = logs.filter(log => log.level === "critical" && !log.resolved).length;
  const highCount = logs.filter(log => log.level === "high" && !log.resolved).length;
  const mediumCount = logs.filter(log => log.level === "medium" && !log.resolved).length;
  const resolvedCount = logs.filter(log => log.resolved).length;

  // Handle filters
  const filteredLogs = logs.filter(log => {
    // Search term
    if (searchTerm && !log.message.toLowerCase().includes(searchTerm.toLowerCase()) && !log.source.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (filter === "resolved" && !log.resolved) return false;
    if (filter === "unresolved" && log.resolved) return false;
    
    return true;
  });

  const handleResolve = (id: string) => {
    setLogs(logs.map(log => 
      log.id === id ? { ...log, resolved: true } : log
    ));
  };

  const handleDeleteResolved = () => {
    setLogs(logs.filter(log => !log.resolved));
  };

  const getStatusBadge = (log: SystemLog) => {
    if (log.resolved) {
      return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
    }
    
    switch(log.level) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-red-100 dark:bg-red-800/30 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-red-600 dark:text-red-400">Critical Issues</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">{criticalCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 dark:bg-orange-900/20">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-orange-100 dark:bg-orange-800/30 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-orange-600 dark:text-orange-400">High Priority</p>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{highCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-yellow-100 dark:bg-yellow-800/30 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Medium Priority</p>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{mediumCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-green-100 dark:bg-green-800/30 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">Resolved Issues</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{resolvedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <CardTitle>System Logs & Issues</CardTitle>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => setLogs([...logs])}>
                <RefreshCcw size={14} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button size="sm" variant="destructive" className="h-8 gap-1" onClick={handleDeleteResolved}>
                <Trash2 size={14} />
                <span className="hidden sm:inline">Clear Resolved</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search issues..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
              defaultValue="all"
              onValueChange={setFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Issues</SelectItem>
                <SelectItem value="unresolved">Unresolved</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">Type</TableHead>
                  <TableHead className="w-[180px] sm:w-auto">Message</TableHead>
                  <TableHead className="hidden sm:table-cell">Source</TableHead>
                  <TableHead className="hidden md:table-cell">Time</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                      No issues found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="align-top pt-4">
                        {getTypeIcon(log.type)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {log.message}
                        <div className="md:hidden text-xs text-gray-500 mt-1">
                          {log.source} • {format(new Date(log.timestamp), "MMM d, h:mm a")}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{log.source}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(new Date(log.timestamp), "MMM d, h:mm a")}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(log)}
                      </TableCell>
                      <TableCell className="text-right">
                        {!log.resolved && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleResolve(log.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Resolve</span>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueResolutionTab;
