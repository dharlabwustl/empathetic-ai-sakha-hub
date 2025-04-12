
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FlaskIntegrationGuide from "../FlaskIntegrationGuide";

const SystemAnalyticsTab = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("monitoring");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">System Management</h2>
          <p className="text-muted-foreground">
            Monitor system health, database performance, and integration points
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              toast({
                title: "System Refreshed",
                description: "All system diagnostics have been updated",
              });
            }}
          >
            Refresh Stats
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-blue-600 text-white" 
            onClick={() => {
              toast({
                title: "System Optimization",
                description: "System optimization process started...",
              });
              
              setTimeout(() => {
                toast({
                  title: "Optimization Complete",
                  description: "System has been successfully optimized",
                });
              }, 2000);
            }}
          >
            Optimize System
          </Button>
        </div>
      </div>

      <Tabs defaultValue="monitoring" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="integration">Flask Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monitoring">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Server Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-green-600">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="font-medium">24 days, 13 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Memory Usage</span>
                  <span className="font-medium">64%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPU Load</span>
                  <span className="font-medium">42%</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">API Health</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Authentication Service</span>
                  <span className="font-medium text-green-600">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Content API</span>
                  <span className="font-medium text-green-600">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Analytics Engine</span>
                  <span className="font-medium text-yellow-600">Degraded</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Services</span>
                  <span className="font-medium text-green-600">Operational</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Resource Monitoring</h3>
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <span className="text-gray-500">System Monitoring Graph Placeholder</span>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm">Real-time View</Button>
              <Button variant="outline" size="sm">Export Data</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="database">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Database Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <h4 className="text-sm font-medium">Query Performance</h4>
                <p className="text-2xl font-bold mt-1">94ms</p>
                <p className="text-xs text-gray-500">Average response time</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <h4 className="text-sm font-medium">Active Connections</h4>
                <p className="text-2xl font-bold mt-1">24</p>
                <p className="text-xs text-gray-500">Current open connections</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <h4 className="text-sm font-medium">Storage Used</h4>
                <p className="text-2xl font-bold mt-1">4.2 GB</p>
                <p className="text-xs text-gray-500">Of 10GB allocated</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Database Schema</h3>
              <div className="border rounded overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="text-left p-2">Table Name</th>
                      <th className="text-left p-2">Records</th>
                      <th className="text-left p-2">Size</th>
                      <th className="text-left p-2">Last Updated</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2">students</td>
                      <td className="p-2">1,245</td>
                      <td className="p-2">420 MB</td>
                      <td className="p-2">12 mins ago</td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">content</td>
                      <td className="p-2">892</td>
                      <td className="p-2">1.2 GB</td>
                      <td className="p-2">5 mins ago</td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">learning_tracks</td>
                      <td className="p-2">54</td>
                      <td className="p-2">180 MB</td>
                      <td className="p-2">1 hour ago</td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">analytics</td>
                      <td className="p-2">15,234</td>
                      <td className="p-2">2.5 GB</td>
                      <td className="p-2">just now</td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    toast({
                      title: "Database Backup",
                      description: "Starting database backup process...",
                    });
                    
                    setTimeout(() => {
                      toast({
                        title: "Backup Complete",
                        description: "Database backup saved to storage",
                      });
                    }, 2000);
                  }}
                >
                  Backup Database
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Schema Documentation",
                      description: "Generating database schema documentation...",
                    });
                    
                    setTimeout(() => {
                      toast({
                        title: "Documentation Ready",
                        description: "Database schema documentation is available for download",
                      });
                    }, 1500);
                  }}
                >
                  Download Schema Documentation
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="logs">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">System Logs</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    toast({
                      title: "Logs Refreshed",
                      description: "System logs have been updated"
                    });
                  }}
                >
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Logs Downloaded",
                      description: "System logs have been downloaded as CSV"
                    });
                  }}
                >
                  Export
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md font-mono text-xs h-64 overflow-y-auto">
              <p className="border-b border-gray-200 dark:border-gray-700 p-2">[2025-04-11 14:32:05] INFO: System started successfully</p>
              <p className="border-b border-gray-200 dark:border-gray-700 p-2">[2025-04-11 14:45:18] INFO: User admin@example.com logged in</p>
              <p className="border-b border-gray-200 dark:border-gray-700 p-2">[2025-04-11 15:02:34] WARNING: High CPU usage detected (85%)</p>
              <p className="border-b border-gray-200 dark:border-gray-700 p-2">[2025-04-11 15:15:42] INFO: Database backup completed successfully</p>
              <p className="border-b border-gray-200 dark:border-gray-700 p-2">[2025-04-11 15:30:11] INFO: 3 new students registered</p>
              <p className="border-b border-gray-200 dark:border-gray-700 p-2">[2025-04-11 16:05:23] ERROR: Connection to AI service timed out</p>
              <p className="border-b border-gray-200 dark:border-gray-700 p-2">[2025-04-11 16:08:45] INFO: AI service connection restored</p>
              <p className="border-b border-gray-200 dark:border-gray-700 p-2">[2025-04-11 16:15:32] INFO: Content upload: 5 new files processed</p>
              <p className="p-2">[2025-04-11 16:45:19] INFO: Daily analytics report generated</p>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Error Summary</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">Critical</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">0</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-300">Errors</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">2</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">5</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Info</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">126</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="integration">
          <FlaskIntegrationGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemAnalyticsTab;
