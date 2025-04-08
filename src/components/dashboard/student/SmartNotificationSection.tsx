
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  Clock, 
  Smartphone,
  Mail,
  CheckCircle, 
  AlertCircle,
  Send,
  Settings 
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  time: string;
  type: "reminder" | "alert" | "info";
  channel: "app" | "sms" | "whatsapp" | "email";
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Study Reminder: Physics",
    message: "Your scheduled 1-hour study session for Physics - Electromagnetism starts in 30 minutes.",
    date: "2023-06-18",
    time: "10:30 AM",
    type: "reminder",
    channel: "app",
    read: false
  },
  {
    id: "n2",
    title: "Concept Review Due",
    message: "You have a pending review for 'Integration by Parts' concept in Mathematics scheduled for today.",
    date: "2023-06-18",
    time: "09:15 AM",
    type: "alert",
    channel: "whatsapp",
    read: true
  },
  {
    id: "n3",
    title: "Weekly Goal Update",
    message: "You're 70% through your weekly goal! Keep going to earn your streak bonus.",
    date: "2023-06-17",
    time: "08:00 PM",
    type: "info",
    channel: "sms",
    read: true
  },
  {
    id: "n4",
    title: "Mock Test Scheduled",
    message: "Your JEE Physics mock test is scheduled for tomorrow at 2:00 PM. Make sure to be prepared!",
    date: "2023-06-17",
    time: "06:45 PM",
    type: "reminder",
    channel: "email",
    read: false
  }
];

const SmartNotificationSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);
  
  // Notification settings
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("+91 98765 43210");
  const [emailAddress, setEmailAddress] = useState("student@example.com");
  
  const [showSettings, setShowSettings] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    if (activeTab === "reminders") return notification.type === "reminder";
    if (activeTab === "alerts") return notification.type === "alert";
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Smart Notifications</h2>
          <p className="text-muted-foreground">
            Manage your study reminders and notifications across all channels
          </p>
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings size={16} />
          Notification Settings
        </Button>
      </div>

      {!showSettings ? (
        <>
          <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all" className="gap-2">
                  <Bell size={14} />
                  <span>All</span>
                  <Badge variant="secondary" className="ml-1 bg-gray-200">{notifications.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="unread" className="gap-2">
                  <AlertCircle size={14} />
                  <span>Unread</span>
                  <Badge variant="secondary" className="ml-1 bg-gray-200">
                    {notifications.filter(n => !n.read).length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="reminders" className="gap-2">
                  <Clock size={14} />
                  <span>Reminders</span>
                </TabsTrigger>
              </TabsList>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-violet-600"
                disabled={!notifications.some(n => !n.read)}
              >
                <CheckCircle size={14} className="mr-1" />
                Mark all as read
              </Button>
            </div>

            <TabsContent value="all" className="mt-0">
              <Card>
                <CardContent className="p-0">
                  {filteredNotifications.length > 0 ? (
                    <ul className="divide-y">
                      {filteredNotifications.map((notification) => (
                        <li 
                          key={notification.id} 
                          className={`p-4 ${notification.read ? 'bg-white' : 'bg-violet-50'} hover:bg-slate-50`}
                        >
                          <div className="flex gap-3">
                            <div className="pt-1">
                              {notification.type === 'reminder' && (
                                <Clock className="h-5 w-5 text-violet-500" />
                              )}
                              {notification.type === 'alert' && (
                                <AlertCircle className="h-5 w-5 text-amber-500" />
                              )}
                              {notification.type === 'info' && (
                                <Bell className="h-5 w-5 text-sky-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <h4 className={`font-medium ${notification.read ? '' : 'text-violet-700'}`}>
                                  {notification.title}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">
                                    {notification.time}
                                  </span>
                                  {notification.channel === 'whatsapp' && (
                                    <Badge variant="outline" className="bg-green-50 text-green-600 text-xs">
                                      WhatsApp
                                    </Badge>
                                  )}
                                  {notification.channel === 'sms' && (
                                    <Badge variant="outline" className="bg-blue-50 text-blue-600 text-xs">
                                      SMS
                                    </Badge>
                                  )}
                                  {notification.channel === 'email' && (
                                    <Badge variant="outline" className="bg-orange-50 text-orange-600 text-xs">
                                      Email
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {notification.message}
                              </p>
                              <div className="flex justify-end gap-2">
                                {!notification.read && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-xs text-violet-600 hover:text-violet-700"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    Mark as read
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <h3 className="text-lg font-medium mb-1">No notifications</h3>
                      <p className="text-muted-foreground">
                        You're all caught up! No {activeTab} notifications.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="unread" className="mt-0">
              {/* Similar content structure as "all" tab */}
            </TabsContent>

            <TabsContent value="reminders" className="mt-0">
              {/* Similar content structure as "all" tab */}
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Upcoming Reminders</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-violet-100 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-violet-600" />
                    </div>
                    <Badge variant="outline" className="bg-violet-50 text-violet-600">Today</Badge>
                  </div>
                  <h4 className="font-medium mb-1">Physics Study Session</h4>
                  <p className="text-sm text-muted-foreground mb-2">Electromagnetism chapter review</p>
                  <div className="flex items-center gap-1 text-sm text-violet-600">
                    <Clock size={14} />
                    <span>2:00 PM - 3:30 PM</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-violet-100 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-violet-600" />
                    </div>
                    <Badge variant="outline" className="bg-violet-50 text-violet-600">Tomorrow</Badge>
                  </div>
                  <h4 className="font-medium mb-1">Chemistry Quiz</h4>
                  <p className="text-sm text-muted-foreground mb-2">Weekly assessment on Organic Chemistry</p>
                  <div className="flex items-center gap-1 text-sm text-violet-600">
                    <Clock size={14} />
                    <span>10:00 AM - 11:00 AM</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-violet-100 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-violet-600" />
                    </div>
                    <Badge variant="outline" className="bg-violet-50 text-violet-600">Jun 21</Badge>
                  </div>
                  <h4 className="font-medium mb-1">Mock Test: JEE Mathematics</h4>
                  <p className="text-sm text-muted-foreground mb-2">Full-length practice exam</p>
                  <div className="flex items-center gap-1 text-sm text-violet-600">
                    <Clock size={14} />
                    <span>9:00 AM - 12:00 PM</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Channels</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-violet-100 p-2 rounded-md">
                    <Bell className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in the app</p>
                  </div>
                </div>
                <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-orange-100 p-2 rounded-md">
                    <Mail className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                </div>
                <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
              </div>
              
              {emailEnabled && (
                <div className="ml-10 pl-2 border-l border-gray-200">
                  <Label className="text-sm">Email Address</Label>
                  <Input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} className="mt-1" />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                </div>
                <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-md">
                    <Smartphone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <Label>WhatsApp Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via WhatsApp</p>
                  </div>
                </div>
                <Switch checked={whatsappEnabled} onCheckedChange={setWhatsappEnabled} />
              </div>
              
              {(smsEnabled || whatsappEnabled) && (
                <div className="ml-10 pl-2 border-l border-gray-200">
                  <Label className="text-sm">Phone Number</Label>
                  <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="mt-1" />
                </div>
              )}
            </div>
            
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Notification Types</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Study Reminders</Label>
                    <p className="text-sm text-muted-foreground">Daily reminders for your study plan</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Quiz & Test Alerts</Label>
                    <p className="text-sm text-muted-foreground">Reminders for upcoming quizzes and tests</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Performance Updates</Label>
                    <p className="text-sm text-muted-foreground">Weekly summary of your progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Announcements</Label>
                    <p className="text-sm text-muted-foreground">Important updates about the platform</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowSettings(false)}>Cancel</Button>
            <Button 
              className="bg-gradient-to-r from-violet-600 to-purple-600"
              onClick={() => setShowSettings(false)}
            >
              Save Settings
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SmartNotificationSection;
