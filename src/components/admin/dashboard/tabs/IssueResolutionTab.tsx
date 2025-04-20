
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SystemLog } from '@/types/admin/systemLog';
import { formatDateTime } from '@/utils/dateUtils';
import { AlertCircle, CheckCircle, Clock, MessageSquare, Plus, Search } from 'lucide-react';

interface IssueResolutionTabProps {
  recentLogs: SystemLog[];
}

const IssueResolutionTab: React.FC<IssueResolutionTabProps> = ({ recentLogs }) => {
  const [selectedIssue, setSelectedIssue] = React.useState<SystemLog | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Filter logs by error level and search term
  const errorLogs = recentLogs.filter(
    log => 
      log.level === "error" || 
      log.level === "warning" && 
      (searchTerm === "" || log.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Issue Resolution Center</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search issues..."
              className="pl-8 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Issue
          </Button>
        </div>
      </div>

      <Alert className="bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800/30">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
        <AlertTitle className="text-amber-800 dark:text-amber-500">
          Active Issues
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-400">
          There are currently {errorLogs.length} active issues requiring attention.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Open Issues</CardTitle>
            <CardDescription>Issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {errorLogs.length > 0 ? (
                errorLogs.map((log) => (
                  <div 
                    key={log.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      selectedIssue?.id === log.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                    }`}
                    onClick={() => setSelectedIssue(log)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-2">
                        {log.level === "error" ? (
                          <Badge variant="destructive">Error</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>
                        )}
                        <div>
                          <p className="font-medium">{log.source}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{log.message}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{formatDateTime(log.timestamp)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No issues found matching your search criteria.
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" size="sm">View All</Button>
            <Button variant="outline" size="sm">Export</Button>
          </CardFooter>
        </Card>

        {selectedIssue ? (
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>Issue Details</span>
                  {selectedIssue.level === "error" ? (
                    <Badge variant="destructive">Error</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  {selectedIssue.resolved ? "Reopen Issue" : "Mark Resolved"}
                </Button>
              </CardTitle>
              <CardDescription>{selectedIssue.message}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Source</h4>
                  <p>{selectedIssue.source}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Timestamp</h4>
                  <p>{formatDateTime(selectedIssue.timestamp)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <div className="flex items-center space-x-1">
                    {selectedIssue.resolved ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Resolved</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span>Open</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Details</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm font-mono">
                  {selectedIssue.details ? (
                    <pre>{JSON.stringify(selectedIssue.details, null, 2)}</pre>
                  ) : (
                    "No additional details available"
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Comments</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Admin</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                      <p className="text-sm mt-1">Investigating this issue...</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-3">
                  <input 
                    type="text" 
                    placeholder="Add a comment..."
                    className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors" 
                  />
                  <Button size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="md:col-span-1">
            <CardContent className="flex items-center justify-center h-full min-h-[300px]">
              <div className="text-center text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="font-medium">Select an issue to view details</p>
                <p className="text-sm mt-1">Issue information will appear here</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default IssueResolutionTab;
