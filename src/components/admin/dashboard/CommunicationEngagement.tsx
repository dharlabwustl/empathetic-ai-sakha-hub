
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Bell, Mail, Users, TrendingUp, Send } from 'lucide-react';

const CommunicationEngagement = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome Message', type: 'onboarding', active: true, sent: 1250 },
    { id: 2, title: 'Study Reminder', type: 'engagement', active: true, sent: 3400 },
    { id: 3, title: 'Achievement Alert', type: 'gamification', active: true, sent: 890 },
    { id: 4, title: 'Low Mood Support', type: 'wellness', active: false, sent: 156 }
  ]);

  const [announcements] = useState([
    { id: 1, title: 'New Features Released', date: '2024-01-20', status: 'Published', views: 1250 },
    { id: 2, title: 'Maintenance Schedule', date: '2024-01-18', status: 'Draft', views: 0 },
    { id: 3, title: 'Exam Updates', date: '2024-01-15', status: 'Published', views: 2100 }
  ]);

  const emailCampaigns = [
    { name: 'Weekly Progress Report', sent: 1200, opened: 840, clicked: 235, status: 'Active' },
    { name: 'Study Tips Newsletter', sent: 980, opened: 720, clicked: 180, status: 'Active' },
    { name: 'Motivational Monday', sent: 1500, opened: 1050, clicked: 420, status: 'Paused' },
    { name: 'Exam Preparation Guide', sent: 800, opened: 680, clicked: 340, status: 'Active' }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Notifications</CardTitle>
            <Bell className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.filter(n => n.active).length}</div>
            <p className="text-xs text-muted-foreground">Out of {notifications.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <Send className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,896</div>
            <p className="text-xs text-green-600">+12% this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Open Rate</CardTitle>
            <Mail className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-purple-600">Above average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <p className="text-xs text-yellow-600">Users engaged</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="email">Email Campaigns</TabsTrigger>
          <TabsTrigger value="push">Push Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notification Management</h3>
            <Button>Create New Notification</Button>
          </div>

          <div className="grid gap-4">
            {notifications.map((notification) => (
              <Card key={notification.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{notification.title}</h3>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{notification.type}</Badge>
                        <Badge className={notification.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {notification.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Sent to {notification.sent} users
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Analytics</Button>
                      <Button 
                        variant={notification.active ? "destructive" : "default"} 
                        size="sm"
                      >
                        {notification.active ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">System Announcements</h3>
            <Button>Create Announcement</Button>
          </div>

          <div className="grid gap-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{announcement.title}</h3>
                      <p className="text-sm text-gray-600">Created: {announcement.date}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge className={announcement.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {announcement.status}
                        </Badge>
                        {announcement.status === 'Published' && (
                          <Badge variant="outline">{announcement.views} views</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      {announcement.status === 'Draft' ? (
                        <Button size="sm">Publish</Button>
                      ) : (
                        <Button variant="outline" size="sm">Unpublish</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Email Campaign Management</h3>
            <Button>Create Campaign</Button>
          </div>

          <div className="grid gap-4">
            {emailCampaigns.map((campaign, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <Badge className={campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Duplicate</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Sent:</span>
                      <div className="font-medium">{campaign.sent}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Opened:</span>
                      <div className="font-medium">{campaign.opened} ({Math.round((campaign.opened / campaign.sent) * 100)}%)</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Clicked:</span>
                      <div className="font-medium">{campaign.clicked} ({Math.round((campaign.clicked / campaign.opened) * 100)}%)</div>
                    </div>
                    <div>
                      <span className="text-gray-600">CTR:</span>
                      <div className="font-medium">{Math.round((campaign.clicked / campaign.sent) * 100)}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="push" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Push Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Timing Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm">Quiet Hours Start</label>
                      <input type="time" defaultValue="22:00" className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="text-sm">Quiet Hours End</label>
                      <input type="time" defaultValue="07:00" className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Frequency Limits</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm">Max per day</label>
                      <input type="number" defaultValue="5" className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="text-sm">Max per hour</label>
                      <input type="number" defaultValue="2" className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Analytics</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="border rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">2,456</div>
                      <div className="text-sm text-gray-600">Delivered Today</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-600">68%</div>
                      <div className="text-sm text-gray-600">Open Rate</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-600">12%</div>
                      <div className="text-sm text-gray-600">Click Rate</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full">Save Push Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationEngagement;
