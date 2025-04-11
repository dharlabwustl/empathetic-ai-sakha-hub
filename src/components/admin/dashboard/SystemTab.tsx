
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { SystemLog } from "@/types/admin";

interface SystemTabProps {
  recentLogs: SystemLog[];
}

const SystemTab = ({ recentLogs }: SystemTabProps) => {
  const getTimeSince = (date: Date) => {
    const now = new Date().getTime();
    const past = new Date(date).getTime();
    const diff = now - past;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>System Logs</span>
            <Button variant="outline" size="sm">View All Logs</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Time</th>
                  <th className="text-left py-3 px-4 font-medium">Source</th>
                  <th className="text-left py-3 px-4 font-medium">Level</th>
                  <th className="text-left py-3 px-4 font-medium">Message</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">{getTimeSince(log.timestamp)}</td>
                    <td className="py-3 px-4">{log.source}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        log.level === 'error' 
                          ? "bg-red-100 text-red-800" 
                          : log.level === 'warning'
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                      }`}>
                        {log.level.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">{log.message}</td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>API Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">API Latency (ms)</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-24 text-sm">/api/planner</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{width: '15%'}}></div>
                    </div>
                    <span className="text-sm">156</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-sm">/api/doubts</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-2 bg-amber-500 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <span className="text-sm">876</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-sm">/api/content</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{width: '10%'}}></div>
                    </div>
                    <span className="text-sm">125</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-sm">/api/chat</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div className="h-2 bg-amber-500 rounded-full" style={{width: '38%'}}></div>
                    </div>
                    <span className="text-sm">742</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h3 className="font-medium text-sm">Success Rate</h3>
                  <p className="text-2xl font-bold text-green-600">99.2%</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h3 className="font-medium text-sm">Avg Response</h3>
                  <p className="text-2xl font-bold">321ms</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>API Key Management</span>
              <Button variant="outline" size="sm">Rotate Keys</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">OpenAI API Key</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="flex items-center">
                  <input 
                    type="password" 
                    className="flex-1 bg-muted border border-muted rounded p-2" 
                    value="••••••••••••••••••••••••••"
                    disabled
                  />
                  <Button variant="ghost" size="sm" className="ml-2">
                    <Eye size={16} />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h3 className="font-medium text-sm">Today's Usage</h3>
                  <p className="text-xl font-bold">$12.45</p>
                  <p className="text-xs text-gray-600">132,450 tokens</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h3 className="font-medium text-sm">Monthly Usage</h3>
                  <p className="text-xl font-bold">$254.67</p>
                  <p className="text-xs text-gray-600">42.6% of budget</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Notification System</span>
            <Button variant="outline" size="sm">Configure</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Active Notifications</h3>
              <div className="space-y-2">
                <div className="bg-primary/10 p-2 rounded-md flex justify-between">
                  <span className="text-sm">Study Reminder</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 rounded-full">Active</span>
                </div>
                <div className="bg-primary/10 p-2 rounded-md flex justify-between">
                  <span className="text-sm">Concept Review</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 rounded-full">Active</span>
                </div>
                <div className="bg-primary/10 p-2 rounded-md flex justify-between">
                  <span className="text-sm">Exam Alert</span>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 rounded-full">Paused</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Notification Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sent (24h):</span>
                  <span className="font-medium">1,245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Open Rate:</span>
                  <span className="font-medium">76%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Action Rate:</span>
                  <span className="font-medium">42%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Upcoming Broadcasts</h3>
              <div className="space-y-2">
                <div className="bg-primary/10 p-2 rounded-md">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">New Feature Alert</span>
                    <span className="text-xs text-gray-600">Today</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Scheduled for 3:00 PM</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-md">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Weekly Summary</span>
                    <span className="text-xs text-gray-600">Tomorrow</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Scheduled for 9:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemTab;
