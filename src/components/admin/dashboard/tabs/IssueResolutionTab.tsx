
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { SystemLog } from '@/types/admin';
import { AlertCircle, CheckCircle, Clock, FileText, Filter, Search, XCircle } from 'lucide-react';

interface IssueResolutionTabProps {
  recentLogs: SystemLog[];
}

const IssueResolutionTab: React.FC<IssueResolutionTabProps> = ({ recentLogs }) => {
  const [activeTab, setActiveTab] = useState("open");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  // Filter logs based on search term, status, and type filter
  const filteredLogs = recentLogs.filter(log => {
    const matchesSearch = search === "" || 
      log.message.toLowerCase().includes(search.toLowerCase()) || 
      log.source.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = 
      (activeTab === "open" && !log.resolved) || 
      (activeTab === "resolved" && log.resolved) ||
      activeTab === "all";
    
    const matchesFilter = filter === null || log.type === filter;
    
    return matchesSearch && matchesStatus && matchesFilter;
  });

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'error': return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case 'warning': return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case 'info': return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case 'success': return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getSeverityColor = (level: string) => {
    if (level === 'critical' || level === 'error') {
      return "text-red-600 dark:text-red-400";
    } else if (level === 'high' || level === 'warning') {
      return "text-yellow-600 dark:text-yellow-400";
    } else if (level === 'medium' || level === 'info') {
      return "text-blue-600 dark:text-blue-400";
    } else {
      return "text-gray-600 dark:text-gray-400";
    }
  };

  const formatTime = (timestamp: string) => {
    return format(new Date(timestamp), 'MMM dd, yyyy HH:mm:ss');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Issue Management</h2>
          <Badge variant="outline" className="ml-2 bg-primary/10">
            {filteredLogs.filter(log => !log.resolved).length} Open Issues
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-8" 
              placeholder="Search issues..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          
          <Button variant="outline" size="icon" onClick={() => setFilter(filter === null ? 'error' : null)}>
            <Filter className={filter !== null ? "text-primary" : "text-muted-foreground"} size={16} />
          </Button>
        </div>
      </div>
      
      <Tabs 
        defaultValue="open" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="w-full md:w-auto grid grid-cols-3 mb-4">
          <TabsTrigger value="open">Open Issues</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="all">All Logs</TabsTrigger>
        </TabsList>
        
        {['open', 'resolved', 'all'].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {tab === 'open' ? 'Open Issues' : tab === 'resolved' ? 'Resolved Issues' : 'All System Logs'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredLogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FileText className="h-12 w-12 text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium">No Issues Found</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-sm mt-1">
                      {activeTab === 'open' ? "There are no open issues at the moment." : 
                       activeTab === 'resolved' ? "No resolved issues match your search criteria." :
                       "No logs match your search criteria."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {filteredLogs.map((log) => (
                      <div 
                        key={log.id} 
                        className="border rounded-md p-4 hover:bg-accent/10 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className={getBadgeColor(log.type)}>
                                {log.type.toUpperCase()}
                              </Badge>
                              <span className={`text-xs font-mono ${getSeverityColor(log.level)}`}>
                                {log.level === 'critical' || log.level === 'error' ? (
                                  <AlertCircle className="inline h-3 w-3 mr-1" />
                                ) : log.level === 'high' || log.level === 'warning' ? (
                                  <Clock className="inline h-3 w-3 mr-1" />
                                ) : (
                                  <></>
                                )}
                                {log.level.toUpperCase()}
                              </span>
                            </div>
                            
                            <h3 className="font-medium">{log.message}</h3>
                            <div className="flex items-center text-xs text-muted-foreground mt-1 gap-2">
                              <span className="bg-muted px-2 py-1 rounded">
                                {log.source}
                              </span>
                              <span>{formatTime(log.timestamp)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {log.resolved ? (
                              <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" /> Resolved
                              </Badge>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-xs h-8"
                              >
                                <XCircle className="h-3 w-3 mr-1" /> Mark Resolved
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-xs h-8"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default IssueResolutionTab;
