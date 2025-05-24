
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Bell, Mail, MessageSquare, Send, Users, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CommunicationManagementTab = () => {
  const { toast } = useToast();
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const notificationStats = [
    { type: 'Push Notifications', sent: 12543, opened: 8921, rate: 71 },
    { type: 'Email Campaigns', sent: 5674, opened: 3402, rate: 60 },
    { type: 'In-App Messages', sent: 8932, opened: 7845, rate: 88 },
    { type: 'SMS Alerts', sent: 2341, opened: 2108, rate: 90 }
  ];

  const recentAnnouncements = [
    { id: 1, title: 'New Study Materials Available', date: '2024-01-15', status: 'Published', reach: 2543 },
    { id: 2, title: 'Maintenance Window Scheduled', date: '2024-01-14', status: 'Draft', reach: 0 },
    { id: 3, title: 'Weekly Challenge Results', date: '2024-01-13', status: 'Published', reach: 1876 }
  ];

  const emailCampaigns = [
    { id: 1, name: 'Weekly Progress Report', status: 'Active', subscribers: 2341, openRate: 34 },
    { id: 2, name: 'Study Tips Newsletter', status: 'Paused', subscribers: 1876, openRate: 28 },
    { id: 3, name: 'Exam Preparation Guide', status: 'Active', subscribers: 3421, openRate: 42 }
  ];

  const pushNotificationSettings = [
    { type: 'Study Reminders', enabled: true, frequency: 'Daily' },
    { type: 'Milestone Achievements', enabled: true, frequency: 'Immediate' },
    { type: 'Weekly Reports', enabled: true, frequency: 'Weekly' },
    { type: 'Breaking News', enabled: false, frequency: 'As needed' }
  ];

  const handleSendAnnouncement = () => {
    if (newAnnouncement.trim()) {
      toast({
        title: "Announcement Sent",
        description: "Your announcement has been sent to all users"
      });
      setNewAnnouncement('');
    }
  };

  const handleCreateCampaign = () => {
    toast({
      title: "Campaign Created",
      description: "New email campaign has been created and scheduled"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Communication & Engagement</h2>
          <p className="text-muted-foreground">Manage notifications, announcements, and user communications</p>
        </div>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Quick Broadcast
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,642</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">Above industry avg</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29,490</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">+7% improvement</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="campaigns">Email Campaigns</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Statistics</CardTitle>
                <CardDescription>Performance metrics for all notification types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationStats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{stat.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {stat.sent} sent • {stat.opened} opened
                        </div>
                      </div>
                      <Badge variant={stat.rate > 70 ? 'default' : stat.rate > 50 ? 'secondary' : 'destructive'}>
                        {stat.rate}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pushNotificationSettings.map((setting, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{setting.type}</div>
                        <div className="text-sm text-muted-foreground">{setting.frequency}</div>
                      </div>
                      <Switch checked={setting.enabled} />
                    </div>
                  ))}
                  <Button className="w-full mt-4">Update Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Announcement</CardTitle>
                <CardDescription>Send important messages to all users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="announcement-title">Title</Label>
                    <Input id="announcement-title" placeholder="Announcement title" />
                  </div>
                  
                  <div>
                    <Label htmlFor="announcement-content">Content</Label>
                    <Textarea 
                      id="announcement-content"
                      placeholder="Write your announcement here..."
                      value={newAnnouncement}
                      onChange={(e) => setNewAnnouncement(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleSendAnnouncement}>Send Now</Button>
                    <Button variant="outline">Schedule</Button>
                    <Button variant="outline">Save Draft</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{announcement.title}</h4>
                        <Badge variant={announcement.status === 'Published' ? 'default' : 'secondary'}>
                          {announcement.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {announcement.date} • Reached {announcement.reach} users
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription>Manage automated email campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emailCampaigns.map((campaign) => (
                    <div key={campaign.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{campaign.name}</h4>
                        <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {campaign.subscribers} subscribers • {campaign.openRate}% open rate
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">View Stats</Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" onClick={handleCreateCampaign}>Create New Campaign</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">68%</div>
                    <div className="text-sm text-muted-foreground">Average Open Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24%</div>
                    <div className="text-sm text-muted-foreground">Click Through Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">12%</div>
                    <div className="text-sm text-muted-foreground">Conversion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication Settings</CardTitle>
              <CardDescription>Configure global communication preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <Label>Enable Push Notifications</Label>
                    <div className="text-sm text-muted-foreground">Allow sending push notifications to users</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <Label>Email Marketing</Label>
                    <div className="text-sm text-muted-foreground">Send promotional and marketing emails</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <Label>SMS Notifications</Label>
                    <div className="text-sm text-muted-foreground">Send SMS for urgent notifications</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <Label>In-App Messaging</Label>
                    <div className="text-sm text-muted-foreground">Show messages within the application</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationManagementTab;
