
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  LineChart,
  BarChart2,
  Activity,
  Server,
  Database,
  Cpu,
  Calendar,
  Download,
  AlertCircle,
  Clock,
  Search,
  Plus,
  ExternalLink,
  Terminal
} from "lucide-react";

const SystemAnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Monitoring</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="24h">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6h">Last 6 Hours</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export Logs</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="api" className="text-sm">API Performance</TabsTrigger>
          <TabsTrigger value="errors" className="text-sm">Error Logs</TabsTrigger>
          <TabsTrigger value="resources" className="text-sm">Resource Usage</TabsTrigger>
          <TabsTrigger value="models" className="text-sm">ML Models</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">System Health Dashboard</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Last 24 Hours</span>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download size={14} />
                    <span>Export</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Overall System Health</h3>
                    <Badge className="bg-green-100 text-green-800">A+</Badge>
                  </div>
                  <div className="text-xl font-bold mb-1">Good</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">All systems operational</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Current Load</h3>
                    <Badge className="bg-amber-100 text-amber-800">B</Badge>
                  </div>
                  <div className="text-xl font-bold mb-1">Moderate</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">1,245 active users</p>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Active Incidents</h3>
                    <Badge className="bg-red-100 text-red-800">4</Badge>
                  </div>
                  <div className="text-xl font-bold mb-1">Attention Needed</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">4 active errors</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm">32%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
                <div className="border p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm">68%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div className="border p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Disk Space</span>
                    <span className="text-sm">45%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div className="border p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Network Traffic</span>
                    <span className="text-sm">12 MB/s</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="border p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Requests/min</span>
                    <span className="text-sm">1,245</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="border p-3 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-sm">0.8%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">System Activity Timeline</h3>
                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Activity Timeline Chart Placeholder</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Recent Errors</h3>
                  <Button variant="ghost" size="sm">View All Errors</Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded-md bg-red-50/50 dark:bg-red-900/10">
                    <div>
                      <p className="font-medium">Internal Server Error in /api/content/generate</p>
                      <p className="text-sm text-gray-500">Active • 15:23:45 • 3 occurrences</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-md bg-amber-50/50 dark:bg-amber-900/10">
                    <div>
                      <p className="font-medium">Resource not found: /api/user/35</p>
                      <p className="text-sm text-gray-500">Active • 14:12:30 • 12 occurrences</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-md bg-red-50/50 dark:bg-red-900/10">
                    <div>
                      <p className="font-medium">Unauthorized access to /api/admin/settings</p>
                      <p className="text-sm text-gray-500">Active • 12:45:10 • 5 occurrences</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">API Performance</h3>
                  <Button variant="ghost" size="sm">View All API Stats</Button>
                </div>
                <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">API Response Time Chart Placeholder</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* API Performance Tab */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">API Performance Monitoring</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Last 24 Hours</span>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download size={14} />
                    <span>Export</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Average Response Time</h3>
                  <div className="text-2xl font-bold mb-1">235ms</div>
                  <p className="text-sm text-green-600">-12ms from yesterday</p>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Error Rate</h3>
                  <div className="text-2xl font-bold mb-1">0.5%</div>
                  <p className="text-sm text-green-600">-0.2% from yesterday</p>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Total Requests</h3>
                  <div className="text-2xl font-bold mb-1">145,621</div>
                  <p className="text-sm text-green-600">+12% from yesterday</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">API Response Time Trend</h3>
                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">API Response Time Trend Chart Placeholder</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Error Logs Tab */}
        <TabsContent value="errors">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Error Logs & Exceptions</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Terminal size={14} />
                    <span>Export Logs</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Active Errors</h3>
                  <div className="text-2xl font-bold mb-1">4</div>
                  <p className="text-sm text-red-600">Need attention</p>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Resolved Today</h3>
                  <div className="text-2xl font-bold mb-1">12</div>
                  <p className="text-sm text-green-600">Fixed issues</p>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Error Rate</h3>
                  <div className="text-2xl font-bold mb-1">0.8%</div>
                  <p className="text-sm text-red-600">+0.2% from yesterday</p>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Avg. Resolution Time</h3>
                  <div className="text-2xl font-bold mb-1">2.5h</div>
                  <p className="text-sm text-green-600">-15m from last week</p>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">Error</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Occurrences</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div>
                          <p className="font-medium">Internal Server Error in /api/content/generate</p>
                          <p className="text-xs text-gray-500">Error Code: 500 • First seen: 2024-01-15 • Last seen: 2024-01-15</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge className="bg-red-100 text-red-800">Active</Badge></TableCell>
                      <TableCell>3 occurrences</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Investigate</Button>
                          <Button variant="outline" size="sm">Mark Resolved</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div>
                          <p className="font-medium">Resource not found: /api/user/35</p>
                          <p className="text-xs text-gray-500">Error Code: 404 • First seen: 2024-01-14 • Last seen: 2024-01-15</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge className="bg-red-100 text-red-800">Active</Badge></TableCell>
                      <TableCell>12 occurrences</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Investigate</Button>
                          <Button variant="outline" size="sm">Mark Resolved</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div>
                          <p className="font-medium">Unauthorized access to /api/admin/settings</p>
                          <p className="text-xs text-gray-500">Error Code: 403 • First seen: 2024-01-15 • Last seen: 2024-01-15</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge className="bg-red-100 text-red-800">Active</Badge></TableCell>
                      <TableCell>5 occurrences</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Investigate</Button>
                          <Button variant="outline" size="sm">Mark Resolved</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div>
                          <p className="font-medium">Database connection error in /api/content/search</p>
                          <p className="text-xs text-gray-500">Error Code: 500 • First seen: 2024-01-15 • Last seen: 2024-01-15</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">Resolved</Badge></TableCell>
                      <TableCell>8 occurrences</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div>
                          <p className="font-medium">Rate limit exceeded for user ID 142</p>
                          <p className="text-xs text-gray-500">Error Code: 429 • First seen: 2024-01-14 • Last seen: 2024-01-15</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge className="bg-red-100 text-red-800">Active</Badge></TableCell>
                      <TableCell>24 occurrences</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Investigate</Button>
                          <Button variant="outline" size="sm">Mark Resolved</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="p-2 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Showing 5 of 32 errors</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Resource Usage Tab */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Resource Usage & Capacity</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Last 24 Hours</span>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download size={14} />
                    <span>Export</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">CPU Usage</h3>
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-gray-500">CPU Usage Chart Placeholder</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Current: 32%</span>
                    <span>Peak: 78%</span>
                    <span>Average: 45%</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Memory Usage</h3>
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-gray-500">Memory Usage Chart Placeholder</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Current: 12.4 GB (68%)</span>
                    <span>Total: 18 GB</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Disk Usage</h3>
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-gray-500">Disk Usage Chart Placeholder</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Used: 450 GB (45%)</span>
                    <span>Total: 1 TB</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Network Traffic</h3>
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-gray-500">Network Traffic Chart Placeholder</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Inbound: 8.5 MB/s</span>
                    <span>Outbound: 3.5 MB/s</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Database Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="border p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Query Response Time</h4>
                    <div className="text-xl font-bold mb-1">45ms</div>
                    <p className="text-sm text-green-600">-5ms from average</p>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Active Connections</h4>
                    <div className="text-xl font-bold mb-1">124</div>
                    <p className="text-sm text-gray-500">Out of 500 max</p>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Cache Hit Ratio</h4>
                    <div className="text-xl font-bold mb-1">87%</div>
                    <p className="text-sm text-green-600">+2% from yesterday</p>
                  </div>
                </div>
                <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Database Performance Chart Placeholder</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* ML Models Tab */}
        <TabsContent value="models">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">ML Models Monitoring</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Plus size={14} />
                    <span>Add Model</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Total API Calls</h3>
                  <div className="text-2xl font-bold mb-1">325,842</div>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Average Latency</h3>
                  <div className="text-2xl font-bold mb-1">785ms</div>
                  <p className="text-sm text-amber-600">+120ms from last month</p>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Cost (This Month)</h3>
                  <div className="text-2xl font-bold mb-1">$1,245.78</div>
                  <p className="text-sm text-gray-500">Budget: $2,000.00</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">OpenAI GPT-4o</h3>
                      <p className="text-sm text-gray-600">Main language model for content generation</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">API Calls (24h)</p>
                      <p className="text-lg font-bold">32,450</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Avg. Latency</p>
                      <p className="text-lg font-bold">845ms</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Error Rate</p>
                      <p className="text-lg font-bold">0.3%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cost (24h)</p>
                      <p className="text-lg font-bold">$85.40</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">API Usage Chart Placeholder</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex space-x-2">
                        <span className="text-sm text-gray-600">Flashcards</span>
                        <span className="text-sm text-gray-600">Exam Generation</span>
                        <span className="text-sm text-gray-600">AI Tutor</span>
                      </div>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">Sentiment Analysis Model</h3>
                      <p className="text-sm text-gray-600">Emotion detection for personalized learning</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">API Calls (24h)</p>
                      <p className="text-lg font-bold">15,782</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Avg. Latency</p>
                      <p className="text-lg font-bold">125ms</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Error Rate</p>
                      <p className="text-lg font-bold">0.1%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cost (24h)</p>
                      <p className="text-lg font-bold">$12.30</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">API Usage Chart Placeholder</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex space-x-2">
                        <span className="text-sm text-gray-600">Mood Analysis</span>
                        <span className="text-sm text-gray-600">Learning Pulse</span>
                      </div>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">Custom Recommendation Model</h3>
                      <p className="text-sm text-gray-600">Personalized content recommendations</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">API Calls (24h)</p>
                      <p className="text-lg font-bold">8,450</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Avg. Latency</p>
                      <p className="text-lg font-bold">210ms</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Error Rate</p>
                      <p className="text-lg font-bold">0.4%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cost (24h)</p>
                      <p className="text-lg font-bold">$5.20</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">API Usage Chart Placeholder</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex space-x-2">
                        <span className="text-sm text-gray-600">Smart Suggestions</span>
                        <span className="text-sm text-gray-600">Content Feed</span>
                      </div>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemAnalyticsTab;
