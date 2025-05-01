
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bell, 
  Calendar, 
  CheckCheck, 
  Clock, 
  Info, 
  Megaphone, 
  Settings, 
  Trash, 
  Award,
  BookOpen,
  Brain,
  FileText
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'reminder' | 'achievement' | 'update' | 'system';
  time: string; // ISO string
  read: boolean;
  actionText?: string;
  actionPath?: string;
  category?: 'concept' | 'flashcard' | 'exam' | 'system' | 'achievement';
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Upcoming Physics Test',
    message: 'You have a Physics test scheduled for tomorrow at 10:00 AM. Make sure to review Newton\'s Laws of Motion.',
    type: 'reminder',
    time: '2023-11-17T08:30:00Z',
    read: false,
    actionText: 'Review Now',
    actionPath: '/dashboard/student/concepts/card/1',
    category: 'exam'
  },
  {
    id: '2',
    title: 'Achievement Unlocked: Physics Master',
    message: 'Congratulations! You\'ve completed 10 Physics concept cards with 90%+ accuracy.',
    type: 'achievement',
    time: '2023-11-16T15:45:00Z',
    read: true,
    category: 'achievement'
  },
  {
    id: '3',
    title: 'New Flashcards Available',
    message: 'We\'ve added new flashcards for Organic Chemistry based on your study plan.',
    type: 'update',
    time: '2023-11-15T12:20:00Z',
    read: false,
    actionText: 'View Cards',
    actionPath: '/dashboard/student/flashcards/2/interactive',
    category: 'flashcard'
  },
  {
    id: '4',
    title: 'Study Reminder',
    message: 'You haven\'t studied Calculus in 3 days. Don\'t break your streak!',
    type: 'reminder',
    time: '2023-11-14T09:15:00Z',
    read: false,
    actionText: 'Study Now',
    actionPath: '/dashboard/student/today',
    category: 'system'
  },
  {
    id: '5',
    title: 'Platform Update',
    message: 'We\'ve added new features to the practice exam section, including improved analytics and personalized recommendations.',
    type: 'system',
    time: '2023-11-13T11:00:00Z',
    read: true,
    actionText: 'Learn More',
    actionPath: '/dashboard/student/practice-exam',
    category: 'system'
  },
  {
    id: '6',
    title: 'Concept Cards Updated',
    message: 'The Newton\'s Laws concept card has been updated with new examples and visualizations.',
    type: 'info',
    time: '2023-11-12T16:30:00Z',
    read: true,
    actionText: 'View Updates',
    actionPath: '/dashboard/student/concepts/card/1',
    category: 'concept'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const [notificationSettings, setNotificationSettings] = useState({
    studyReminders: true,
    examReminders: true,
    achievements: true,
    systemUpdates: true,
    emailNotifications: false
  });
  
  // Function to mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  // Function to mark a single notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  // Function to delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  // Function to clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  // Filter notifications based on the active tab
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'all':
        return notifications;
      case 'unread':
        return notifications.filter(notification => !notification.read);
      case 'reminders':
        return notifications.filter(notification => notification.type === 'reminder');
      case 'updates':
        return notifications.filter(notification => notification.type === 'update' || notification.type === 'system');
      case 'achievements':
        return notifications.filter(notification => notification.type === 'achievement');
      default:
        return notifications;
    }
  };
  
  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // Function to format time
  const formatTime = (timeString: string) => {
    const now = new Date();
    const notificationTime = new Date(timeString);
    const diffMs = now.getTime() - notificationTime.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };
  
  // Function to get category icon
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'concept':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'flashcard':
        return <Brain className="h-5 w-5 text-violet-500" />;
      case 'exam':
        return <FileText className="h-5 w-5 text-emerald-500" />;
      case 'achievement':
        return <Award className="h-5 w-5 text-amber-500" />;
      case 'system':
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <SharedPageLayout 
      title="Notifications" 
      subtitle="Stay updated with your study progress and important alerts"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main notifications panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notifications header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Notifications</h2>
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-primary">{unreadCount} unread</Badge>
              )}
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCheck className="h-4 w-4 mr-1" />
                Mark All Read
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={clearAllNotifications}
                disabled={notifications.length === 0}
              >
                <Trash className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
          </div>
          
          {/* Notification tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="all">
                All
                {notifications.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{notifications.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">{unreadCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="reminders">Reminders</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Notifications list */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-muted-foreground mt-1">
                    {activeTab === 'all' 
                      ? "You're all caught up! No notifications to display."
                      : `No ${activeTab} notifications to display.`
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`transition-all hover:shadow-sm ${!notification.read ? 'border-l-4 border-l-primary' : 'border'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="mt-1.5">
                        {getCategoryIcon(notification.category)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground text-xs whitespace-nowrap">
                              {formatTime(notification.time)}
                            </span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7" 
                              title="Delete"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className={`mb-3 text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex justify-between mt-2">
                          {notification.actionText && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs h-7"
                              onClick={() => {
                                markAsRead(notification.id);
                                if (notification.actionPath) {
                                  window.location.href = notification.actionPath;
                                }
                              }}
                            >
                              {notification.actionText}
                            </Button>
                          )}
                          
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="ml-auto text-xs h-7"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        
        {/* Notification settings panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="study-reminders">Study Reminders</Label>
                  </div>
                  <Switch 
                    id="study-reminders" 
                    checked={notificationSettings.studyReminders}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, studyReminders: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="exam-reminders">Exam Reminders</Label>
                  </div>
                  <Switch 
                    id="exam-reminders" 
                    checked={notificationSettings.examReminders}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, examReminders: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="achievements">Achievements</Label>
                  </div>
                  <Switch 
                    id="achievements" 
                    checked={notificationSettings.achievements}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, achievements: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Megaphone className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="system-updates">System Updates</Label>
                  </div>
                  <Switch 
                    id="system-updates" 
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>
              </div>
              
              <Button className="w-full">Save Preferences</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Stay on Track</h4>
                  <p className="text-muted-foreground">
                    Notifications help you maintain your study schedule. Keep them enabled for important reminders.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email Notifications</h4>
                  <p className="text-muted-foreground">
                    Enable email notifications to receive important alerts even when you're not using the app.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
}
