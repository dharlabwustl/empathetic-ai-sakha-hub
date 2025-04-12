
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Server, 
  AlertTriangle, 
  BarChart2, 
  Database, 
  RefreshCcw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Cpu,
  Memory,
  HardDrive,
  Network,
  Download,
  ArrowRightLeft,
  Brain
} from "lucide-react";

import { Progress } from "@/components/ui/progress";

const SystemMonitoringPage = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    toast({
      title: "Refreshing Data",
      description: "Fetching latest system metrics..."
    });
    
    // Simulate data fetch
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Updated",
        description: "System monitoring data is now up to date.",
        variant: "success"
      });
    }, 2000);
  };
  
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">System Monitoring</h1>
          <p className="text-gray-500">Track and analyze system performance and resource utilization</p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCcw size={16} className={isRefreshing ? "animate-spin" : ""} />
          <span>{isRefreshing ? "Refreshing..." : "Refresh Data"}</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">System Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <h4 className="text-xl font-bold">Operational</h4>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Activity size={24} className="text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Last checked: 2 minutes ago</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">API Response Time</p>
                <div className="flex items-center gap-1 mt-1">
                  <h4 className="text-xl font-bold">127ms</h4>
                  <span className="text-xs text-green-600">(-12ms)</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock size={24} className="text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">24-hour average: 142ms</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Error Rate</p>
                <div className="flex items-center gap-1 mt-1">
                  <h4 className="text-xl font-bold">0.24%</h4>
                  <span className="text-xs text-green-600">(-0.08%)</span>
                </div>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <AlertTriangle size={24} className="text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">From 1.2M requests today</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">ML Model Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <h4 className="text-xl font-bold">All Active</h4>
                </div>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <Brain size={24} className="text-indigo-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">12 models operational</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API Performance</TabsTrigger>
          <TabsTrigger value="errors">Error Logs</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
          <TabsTrigger value="models">ML Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Request Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  {/* This would be a chart in the actual implementation */}
                  <BarChart2 size={48} className="text-gray-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Health Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Disk Space</span>
                    <span className="text-sm">34%</span>
                  </div>
                  <Progress value={34} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Database Connections</span>
                    <span className="text-sm">57%</span>
                  </div>
                  <Progress value={57} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Network Bandwidth</span>
                    <span className="text-sm">22%</span>
                  </div>
                  <Progress value={22} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>System Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <div className="divide-y">
                    {[
                      {
                        type: "info",
                        message: "Database backup completed successfully",
                        time: "Today at 04:00 AM",
                        icon: <CheckCircle2 size={16} className="text-green-500" />
                      },
                      {
                        type: "warning",
                        message: "API response time spike detected",
                        time: "Yesterday at 2:24 PM",
                        icon: <AlertTriangle size={16} className="text-amber-500" />
                      },
                      {
                        type: "info",
                        message: "System update applied successfully",
                        time: "Yesterday at 11:30 AM",
                        icon: <RefreshCcw size={16} className="text-blue-500" />
                      },
                      {
                        type: "error",
                        message: "ML model training failed: Out of memory",
                        time: "2 days ago at 8:15 PM",
                        icon: <XCircle size={16} className="text-red-500" />
                      },
                      {
                        type: "info",
                        message: "New AI personalization model deployed",
                        time: "2 days ago at 10:45 AM",
                        icon: <CheckCircle2 size={16} className="text-green-500" />
                      }
                    ].map((event, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3">
                        <div className="flex-shrink-0">{event.icon}</div>
                        <div className="flex-grow">
                          <p className="font-medium">{event.message}</p>
                          <p className="text-xs text-gray-500">{event.time}</p>
                        </div>
                        <Badge className={
                          event.type === "info" ? "bg-blue-100 text-blue-800" :
                          event.type === "warning" ? "bg-amber-100 text-amber-800" :
                          event.type === "error" ? "bg-red-100 text-red-800" : 
                          "bg-gray-100 text-gray-800"
                        }>
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="api">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-6">
                  {/* This would be a chart in the actual implementation */}
                  <Activity size={48} className="text-gray-400" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <ArrowRightLeft size={24} className="mx-auto mb-2 text-blue-500" />
                        <h3 className="text-xl font-bold">1.2M</h3>
                        <p className="text-sm text-gray-500">Requests Today</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Clock size={24} className="mx-auto mb-2 text-green-500" />
                        <h3 className="text-xl font-bold">127ms</h3>
                        <p className="text-sm text-gray-500">Avg Response Time</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <XCircle size={24} className="mx-auto mb-2 text-red-500" />
                        <h3 className="text-xl font-bold">0.24%</h3>
                        <p className="text-sm text-gray-500">Error Rate</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Database size={24} className="mx-auto mb-2 text-purple-500" />
                        <h3 className="text-xl font-bold">42ms</h3>
                        <p className="text-sm text-gray-500">Avg DB Query Time</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top API Endpoints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Endpoint</th>
                        <th className="text-left py-3 px-4">Requests</th>
                        <th className="text-left py-3 px-4">Avg. Response Time</th>
                        <th className="text-left py-3 px-4">Error Rate</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          endpoint: "/api/ai/generate-content",
                          requests: "245,823",
                          responseTime: "213ms",
                          errorRate: "0.31%",
                          status: "operational"
                        },
                        {
                          endpoint: "/api/students",
                          requests: "183,472",
                          responseTime: "86ms",
                          errorRate: "0.12%",
                          status: "operational"
                        },
                        {
                          endpoint: "/api/content/concepts",
                          requests: "142,358",
                          responseTime: "124ms",
                          errorRate: "0.19%",
                          status: "operational"
                        },
                        {
                          endpoint: "/api/analytics/engagement",
                          requests: "98,745",
                          responseTime: "156ms",
                          errorRate: "0.28%",
                          status: "operational"
                        },
                        {
                          endpoint: "/api/study-plans",
                          requests: "87,621",
                          responseTime: "203ms",
                          errorRate: "0.42%",
                          status: "degraded"
                        }
                      ].map((api, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="py-3 px-4 font-medium">{api.endpoint}</td>
                          <td className="py-3 px-4">{api.requests}</td>
                          <td className="py-3 px-4">{api.responseTime}</td>
                          <td className="py-3 px-4">{api.errorRate}</td>
                          <td className="py-3 px-4">
                            <Badge className={api.status === "operational" ? 
                              "bg-green-100 text-green-800" : 
                              "bg-amber-100 text-amber-800"
                            }>
                              {api.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline">View All Endpoints</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="errors">
          <Card>
            <CardHeader>
              <CardTitle>Error Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Time</th>
                      <th className="text-left py-3 px-4">Level</th>
                      <th className="text-left py-3 px-4">Source</th>
                      <th className="text-left py-3 px-4">Message</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        time: "2023-04-12 14:32:45",
                        level: "error",
                        source: "AI Model: Concept Generator",
                        message: "Failed to generate concept: Out of memory"
                      },
                      {
                        time: "2023-04-12 13:28:12",
                        level: "warning",
                        source: "API Gateway",
                        message: "Rate limit exceeded for user ID: 3845"
                      },
                      {
                        time: "2023-04-12 12:45:07",
                        level: "error",
                        source: "Database Connection",
                        message: "Connection timeout after 30 seconds"
                      },
                      {
                        time: "2023-04-12 11:23:54",
                        level: "warning",
                        source: "Content Management",
                        message: "Invalid content format submitted for review"
                      },
                      {
                        time: "2023-04-12 10:08:23",
                        level: "error",
                        source: "Authentication Service",
                        message: "Failed login attempts exceeded for user: johndoe@example.com"
                      },
                      {
                        time: "2023-04-12 09:15:42",
                        level: "info",
                        source: "System Monitor",
                        message: "High CPU usage detected: 92%"
                      },
                    ].map((log, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-4 text-sm whitespace-nowrap">{log.time}</td>
                        <td className="py-3 px-4">
                          <Badge className={
                            log.level === "error" ? "bg-red-100 text-red-800" :
                            log.level === "warning" ? "bg-amber-100 text-amber-800" :
                            log.level === "info" ? "bg-blue-100 text-blue-800" : 
                            "bg-gray-100 text-gray-800"
                          }>
                            {log.level}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{log.source}</td>
                        <td className="py-3 px-4">{log.message}</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">Showing 6 of 124 logs</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download size={16} />
                    <span>Export Logs</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>CPU Usage</span>
                  <Badge className="bg-green-100 text-green-800">Normal</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <Cpu size={48} className="text-gray-400" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Current Usage</p>
                    <p className="text-2xl font-bold">42%</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500">24h Peak</p>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Memory Usage</span>
                  <Badge className="bg-amber-100 text-amber-800">High</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <Memory size={48} className="text-gray-400" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Current Usage</p>
                    <p className="text-2xl font-bold">68%</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500">24h Peak</p>
                    <p className="text-2xl font-bold">82%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Disk Usage</span>
                  <Badge className="bg-green-100 text-green-800">Normal</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <HardDrive size={48} className="text-gray-400" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Current Usage</p>
                    <p className="text-2xl font-bold">34%</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Total Storage</p>
                    <p className="text-2xl font-bold">500GB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Network Traffic</span>
                  <Badge className="bg-green-100 text-green-800">Normal</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <Network size={48} className="text-gray-400" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Inbound</p>
                    <p className="text-2xl font-bold">24 MB/s</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Outbound</p>
                    <p className="text-2xl font-bold">42 MB/s</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>AI Models Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Model Name</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Accuracy</th>
                      <th className="text-left py-3 px-4">Last Updated</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Learning Style Detector",
                        type: "Classification",
                        status: "active",
                        accuracy: "92%",
                        lastUpdated: "2023-04-10"
                      },
                      {
                        name: "Concept Card Generator",
                        type: "NLP",
                        status: "active",
                        accuracy: "88%",
                        lastUpdated: "2023-04-08"
                      },
                      {
                        name: "Difficulty Adaptation Engine",
                        type: "Reinforcement Learning",
                        status: "active",
                        accuracy: "85%",
                        lastUpdated: "2023-04-05"
                      },
                      {
                        name: "Study Plan Generator",
                        type: "Planning",
                        status: "active",
                        accuracy: "91%",
                        lastUpdated: "2023-04-12"
                      },
                      {
                        name: "Emotional Intelligence Engine",
                        type: "Sentiment Analysis",
                        status: "warning",
                        accuracy: "78%",
                        lastUpdated: "2023-04-01"
                      },
                      {
                        name: "Doubt Resolution Model",
                        type: "Question Answering",
                        status: "active",
                        accuracy: "87%",
                        lastUpdated: "2023-04-09"
                      },
                      {
                        name: "Peer Content Recommender",
                        type: "Recommendation",
                        status: "active",
                        accuracy: "82%",
                        lastUpdated: "2023-04-07"
                      },
                      {
                        name: "Engagement Predictor",
                        type: "Forecasting",
                        status: "error",
                        accuracy: "76%",
                        lastUpdated: "2023-03-28"
                      },
                    ].map((model, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-4 font-medium">{model.name}</td>
                        <td className="py-3 px-4">{model.type}</td>
                        <td className="py-3 px-4">
                          <Badge className={
                            model.status === "active" ? "bg-green-100 text-green-800" :
                            model.status === "warning" ? "bg-amber-100 text-amber-800" :
                            "bg-red-100 text-red-800"
                          }>
                            {model.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{model.accuracy}</td>
                        <td className="py-3 px-4">{model.lastUpdated}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Test</Button>
                            <Button variant="ghost" size="sm">Configure</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" className="mr-2">Retrain Selected</Button>
                <Button>Add New Model</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default SystemMonitoringPage;
