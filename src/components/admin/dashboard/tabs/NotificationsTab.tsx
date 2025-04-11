
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Send,
  Plus,
  Users,
  UserCheck,
  Calendar as CalendarIcon,
  Edit,
  Trash2,
  Filter
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const NotificationsTab = () => {
  const [notifTitle, setNotifTitle] = useState("");
  const [notifBody, setNotifBody] = useState("");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Smart Notifications</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Schedule</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Send size={16} />
            <span>Send Now</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Notification Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="relative flex items-center gap-1"
                  >
                    <Filter size={14} />
                    <span>Filter</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                  >
                    <Calendar size={14} />
                    <span>Today</span>
                  </Button>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input placeholder="Search notifications..." className="pl-8" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-medium">Recent Notifications</h3>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Sent</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          title: "New Study Material Available",
                          type: "content",
                          status: "sent",
                          recipients: "All Physics Students",
                          sent: new Date(2023, 5, 15, 14, 30),
                          opened: "78%"
                        },
                        {
                          title: "Low Activity Reminder",
                          type: "engagement",
                          status: "scheduled",
                          recipients: "Inactive Users",
                          sent: new Date(2023, 5, 16, 9, 0),
                          opened: "—"
                        },
                        {
                          title: "Exam Reminder: JEE Mains",
                          type: "reminder",
                          status: "sent",
                          recipients: "JEE Students",
                          sent: new Date(2023, 5, 14, 10, 0),
                          opened: "92%"
                        },
                        {
                          title: "New Feature: Smart Quiz",
                          type: "announcement",
                          status: "draft",
                          recipients: "All Users",
                          sent: null,
                          opened: "—"
                        }
                      ].map((notification, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{notification.title}</TableCell>
                          <TableCell>
                            {notification.type === "content" && (
                              <Badge className="bg-green-100 text-green-800">Content</Badge>
                            )}
                            {notification.type === "engagement" && (
                              <Badge className="bg-blue-100 text-blue-800">Engagement</Badge>
                            )}
                            {notification.type === "reminder" && (
                              <Badge className="bg-purple-100 text-purple-800">Reminder</Badge>
                            )}
                            {notification.type === "announcement" && (
                              <Badge className="bg-amber-100 text-amber-800">Announcement</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {notification.status === "sent" && (
                              <Badge className="bg-green-100 text-green-800">Sent</Badge>
                            )}
                            {notification.status === "scheduled" && (
                              <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                            )}
                            {notification.status === "draft" && (
                              <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
                            )}
                          </TableCell>
                          <TableCell>{notification.recipients}</TableCell>
                          <TableCell>
                            {notification.sent ? 
                              `${notification.sent.toLocaleDateString()} ${notification.sent.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : 
                              '—'
                            }
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-medium">Automated Notification Rules</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                    <div>
                      <p className="font-medium">Inactive User Reminder</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Send after 3 days of inactivity
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                    <div>
                      <p className="font-medium">Study Plan Progress</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Weekly progress summary every Sunday
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                    <div>
                      <p className="font-medium">Low Mood Intervention</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Send when mood score drops below 4/10
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                    <div>
                      <p className="font-medium">Content Updates</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Notify when new content in student's subjects
                      </p>
                    </div>
                    <Switch checked={false} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create Notification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Notification Title</label>
                <Input 
                  placeholder="Enter title..." 
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea 
                  placeholder="Enter notification message..." 
                  className="min-h-[120px]" 
                  value={notifBody}
                  onChange={(e) => setNotifBody(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="flex items-center justify-start gap-2">
                    <Users size={14} />
                    <span>All Users</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center justify-start gap-2">
                    <UserCheck size={14} />
                    <span>Selected</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Delivery Time</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="flex items-center justify-start gap-2">
                    <Send size={14} />
                    <span>Immediately</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center justify-start gap-2">
                    <CalendarIcon size={14} />
                    <span>Schedule</span>
                  </Button>
                </div>
              </div>
              <div className="pt-2">
                <Button className="w-full">Preview & Send</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notification Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold">81%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Open Rate</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold">42%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Click Rate</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold">8%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Conversion</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Top Performing Notifications</h4>
                <div className="space-y-2">
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-2 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Exam Day Tips</span>
                      <Badge className="bg-blue-100 text-blue-800">94% Open</Badge>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Sent to 1,245 students</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-2 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">New Question Bank</span>
                      <Badge className="bg-blue-100 text-blue-800">89% Open</Badge>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Sent to 876 students</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notification Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">Saved Templates</h4>
                <Button variant="outline" size="sm" className="flex items-center gap-1 h-8">
                  <Plus size={14} />
                  <span>New Template</span>
                </Button>
              </div>
              <div className="space-y-2">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md flex items-center justify-between">
                  <div>
                    <p className="font-medium">Study Reminder</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Reminds students to complete daily goals
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">Use</Button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md flex items-center justify-between">
                  <div>
                    <p className="font-medium">Achievement Unlocked</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Celebrates student milestones
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">Use</Button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Summary</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Progress overview and next steps
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">Use</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsTab;
