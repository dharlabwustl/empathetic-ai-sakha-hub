
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bell, Send, Users, Calendar, Settings, Plus, Eye } from 'lucide-react';

const NotificationManagementTab: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Study Reminder',
      type: 'reminder',
      status: 'active',
      recipients: 3456,
      schedule: 'Daily at 9 AM',
      lastSent: '2024-01-15 09:00',
      openRate: 78.5,
      isEnabled: true
    },
    {
      id: '2',
      title: 'Weekly Progress Update',
      type: 'progress',
      status: 'active',
      recipients: 2891,
      schedule: 'Every Sunday',
      lastSent: '2024-01-14 18:00',
      openRate: 65.2,
      isEnabled: true
    },
    {
      id: '3',
      title: 'Exam Preparation Alert',
      type: 'alert',
      status: 'scheduled',
      recipients: 1234,
      schedule: 'Custom trigger',
      lastSent: '2024-01-13 15:30',
      openRate: 89.1,
      isEnabled: true
    }
  ]);

  const notificationStats = {
    totalSent: 15247,
    averageOpenRate: 72.3,
    activeNotifications: 8,
    subscribedUsers: 3456
  };

  const toggleNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, isEnabled: !notif.isEnabled }
          : notif
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Notification Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notificationStats.totalSent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notificationStats.averageOpenRate}%</div>
            <p className="text-xs text-muted-foreground">Average open rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notificationStats.activeNotifications}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notificationStats.subscribedUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Subscribed users</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="manage">Manage Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Notification Management</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Notification
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Enabled</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{notification.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={notification.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{notification.recipients.toLocaleString()}</TableCell>
                      <TableCell>{notification.schedule}</TableCell>
                      <TableCell>{notification.openRate}%</TableCell>
                      <TableCell>
                        <Switch
                          checked={notification.isEnabled}
                          onCheckedChange={() => toggleNotification(notification.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Notification Templates</CardTitle>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Study Reminder', usage: 1234, type: 'reminder' },
                  { name: 'Progress Update', usage: 987, type: 'progress' },
                  { name: 'Motivation Boost', usage: 765, type: 'motivation' },
                  { name: 'Exam Alert', usage: 543, type: 'alert' }
                ].map((template, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{template.name}</h3>
                      <Badge variant="outline">{template.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Used by {template.usage} notifications</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                      <Button size="sm" variant="outline" className="flex-1">Use</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationManagementTab;
