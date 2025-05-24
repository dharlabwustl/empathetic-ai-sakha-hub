
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Bot, 
  Bell, 
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CommunicationTab = () => {
  const { toast } = useToast();

  const aiTutorStats = [
    { metric: "Daily Conversations", value: 1847, change: "+12%" },
    { metric: "Avg Response Time", value: "1.2s", change: "-15%" },
    { metric: "Satisfaction Rate", value: "94.2%", change: "+3%" },
    { metric: "Problem Solved", value: "89.1%", change: "+7%" }
  ];

  const notificationStats = [
    { type: "Study Reminders", sent: 3456, opened: 2987, rate: 86.4 },
    { type: "Achievement Alerts", sent: 1234, opened: 1156, rate: 93.7 },
    { type: "Exam Notifications", sent: 567, opened: 523, rate: 92.2 },
    { type: "Mood Check-ins", sent: 2341, opened: 1987, rate: 84.9 }
  ];

  const communicationChannels = [
    { name: "AI Tutor Chat", activeUsers: 1423, avgSessionTime: "8.5min", satisfaction: 94 },
    { name: "Push Notifications", reach: 2847, openRate: 87, engagement: 76 },
    { name: "In-App Messages", sent: 1234, readRate: 92, actionRate: 34 },
    { name: "Email Campaigns", sent: 5678, openRate: 34, clickRate: 12 }
  ];

  const handleSendBroadcast = () => {
    toast({
      title: "Broadcasting Message",
      description: "Sending notification to all active users...",
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Communication & AI Tutor Management</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage AI tutor interactions, notifications, and student communication
          </p>
        </div>
        <Button 
          onClick={handleSendBroadcast}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Bell className="h-4 w-4 mr-2" />
          Broadcast Message
        </Button>
      </div>

      {/* AI Tutor Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            24/7 AI Tutor Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTutorStats.map((stat, index) => (
              <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">{stat.metric}</span>
                  <Badge variant="outline" className={`${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Channels Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communicationChannels.map((channel, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{channel.name}</h4>
                  <Badge variant="outline">Active</Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      {channel.activeUsers ? 'Active Users:' : 
                       channel.reach ? 'Reach:' : 
                       channel.sent ? 'Sent:' : 'Sent:'}
                    </span>
                    <div className="font-semibold">
                      {(channel.activeUsers || channel.reach || channel.sent || 0).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      {channel.avgSessionTime ? 'Avg Session:' :
                       channel.openRate ? 'Open Rate:' :
                       channel.readRate ? 'Read Rate:' : 'Open Rate:'}
                    </span>
                    <div className="font-semibold text-green-600">
                      {channel.avgSessionTime || `${channel.openRate || channel.readRate}%`}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      {channel.satisfaction ? 'Satisfaction:' :
                       channel.engagement ? 'Engagement:' :
                       channel.actionRate ? 'Action Rate:' : 'Click Rate:'}
                    </span>
                    <div className="font-semibold text-blue-600">
                      {channel.satisfaction || channel.engagement || channel.actionRate || channel.clickRate}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-600" />
            Smart Notification System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationStats.map((notification, index) => (
              <div key={index} className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{notification.type}</span>
                  <Badge variant="outline" className="bg-orange-100 text-orange-800">
                    {notification.rate.toFixed(1)}% open rate
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Sent:</span>
                    <div className="font-semibold">{notification.sent.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Opened:</span>
                    <div className="font-semibold text-green-600">{notification.opened.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rate:</span>
                    <div className="font-semibold text-blue-600">{notification.rate.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Communication Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Real-time Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Active Conversations</div>
                  <div className="text-2xl font-bold text-green-600">234</div>
                </div>
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Pending Responses</div>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Notifications Queued</div>
                  <div className="text-2xl font-bold text-purple-600">89</div>
                </div>
                <Bell className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">94.2%</div>
                  <div className="text-sm text-muted-foreground">AI Response Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1.2s</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">89.1%</div>
                  <div className="text-sm text-muted-foreground">Problem Resolution</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">87.3%</div>
                  <div className="text-sm text-muted-foreground">User Satisfaction</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunicationTab;
