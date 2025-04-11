
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

const SystemAnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Monitoring & Performance</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Last 7 Days</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export Logs</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">API Usage</h3>
              <Badge className="bg-blue-100 text-blue-800">Live</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">1.2M</span>
              <span className="text-sm text-gray-500">requests today</span>
            </div>
            <div className="h-10 bg-blue-50 dark:bg-blue-900/20 rounded-md mt-3 flex items-end">
              <div className="bg-blue-500 h-6 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-4 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-8 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-5 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-7 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-10 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-3 w-8 rounded-sm"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Server Load</h3>
              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">42%</span>
              <span className="text-sm text-gray-500">avg CPU</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Peak: 78%</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <Cpu size={12} />
                <span>Details</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Response Time</h3>
              <Badge className="bg-amber-100 text-amber-800">173ms</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">98.7%</span>
              <span className="text-sm text-gray-500">uptime</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Slowest: 428ms</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <Activity size={12} />
                <span>Monitor</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Error Rate</h3>
              <Badge className="bg-green-100 text-green-800">Low</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">0.14%</span>
              <span className="text-sm text-gray-500">errors</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Last week: 0.17%</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <AlertCircle size={12} />
                <span>Investigate</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">System Usage Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                User activity distribution across the day (hourly)
              </p>
              <div className="h-64 bg-gray-50 dark:bg-gray-800/50 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Heatmap Placeholder</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1 items-center">
                    <div className="h-3 w-3 rounded-sm bg-blue-900"></div>
                    <span className="text-xs text-gray-500">High</span>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <div className="h-3 w-3 rounded-sm bg-blue-600"></div>
                    <span className="text-xs text-gray-500">Medium</span>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <div className="h-3 w-3 rounded-sm bg-blue-400"></div>
                    <span className="text-xs text-gray-500">Low</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Full Report</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '28%' }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>28% Storage Used</span>
                  <span>3.2 GB / 12 GB</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Services</span>
                  <Badge className="bg-green-100 text-green-800">All Operational</Badge>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>/api/users</span>
                    <Badge variant="outline" className="text-green-600">200 OK</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>/api/content</span>
                    <Badge variant="outline" className="text-green-600">200 OK</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>/api/analytics</span>
                    <Badge variant="outline" className="text-green-600">200 OK</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Queue Status</span>
                  <Badge className="bg-amber-100 text-amber-800">24 Pending</Badge>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Email Queue</span>
                    <span>8 jobs</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>AI Processing</span>
                    <span>12 jobs</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Export Jobs</span>
                    <span>4 jobs</span>
                  </div>
                </div>
              </div>

              <Button className="w-full flex items-center gap-2">
                <Server size={14} />
                <span>View System Dashboard</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">API Performance & Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-medium mb-3">Slowest API Routes</h3>
              <div className="space-y-2">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">/api/content/generate</span>
                    <Badge className="bg-amber-100 text-amber-800">347ms</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>42,567 requests today</span>
                    <span>2.4% error rate</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">/api/analytics/student</span>
                    <Badge className="bg-amber-100 text-amber-800">312ms</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>18,243 requests today</span>
                    <span>0.8% error rate</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">/api/planner/generate</span>
                    <Badge className="bg-amber-100 text-amber-800">284ms</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>9,856 requests today</span>
                    <span>1.2% error rate</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium mb-3">AI Model Performance</h3>
              <div className="space-y-2">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">GPT-4o</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
                    <span>Avg Response: 1.24s</span>
                    <span>Cost: $0.04/query</span>
                  </div>
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">82% Accuracy</span>
                      <span className="text-xs text-gray-600">24,678 calls today</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">Sentiment Analysis</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
                    <span>Avg Response: 0.18s</span>
                    <span>Cost: $0.01/query</span>
                  </div>
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">78% Accuracy</span>
                      <span className="text-xs text-gray-600">56,423 calls today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemAnalyticsTab;
