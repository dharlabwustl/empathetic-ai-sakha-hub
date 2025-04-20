
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemLog } from '@/types/admin/systemLog';
import { formatDateTime } from '@/utils/dateUtils';
import { Cpu, AlertTriangle, CheckCircle, RefreshCcw, Download } from 'lucide-react';

interface SystemAnalyticsTabProps {
  systemLogs: SystemLog[];
}

export default function SystemAnalyticsTab({ systemLogs }: SystemAnalyticsTabProps) {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">System Analytics</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-sm font-medium">All systems operational</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">API Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-sm font-medium">99.9% uptime</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                  <p className="text-sm font-medium">2 open issues</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent System Logs</CardTitle>
              <CardDescription>Latest activity and events from the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-4 rounded-lg border ${
                      log.level === "error"
                        ? "bg-red-50 border-red-100"
                        : log.level === "warning"
                        ? "bg-yellow-50 border-yellow-100"
                        : "bg-blue-50 border-blue-100"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        {log.level === "error" ? (
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                        ) : log.level === "warning" ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">{log.source}</p>
                          <p className="text-sm text-gray-500">{log.message}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{formatDateTime(log.timestamp)}</span>
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
              <CardDescription>Detailed metrics about system performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Performance monitoring data will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors">
          <Card>
            <CardHeader>
              <CardTitle>Error Logs</CardTitle>
              <CardDescription>System errors and exceptions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Error logs will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
              <CardDescription>Authentication and authorization logs</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Security events will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
