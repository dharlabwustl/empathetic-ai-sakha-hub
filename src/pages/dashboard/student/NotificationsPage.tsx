
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, CheckCircle, Clock, Star, MessageSquare, AlertTriangle } from 'lucide-react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'reminder',
      title: 'Study Reminder',
      message: 'Time for your Physics study session!',
      timestamp: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You completed 10 chemistry flashcards in a row!',
      timestamp: '1 day ago',
      read: true,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'update',
      title: 'New Practice Test Available',
      message: 'NEET Mock Test 5 is now available for practice.',
      timestamp: '2 days ago',
      read: false,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Study Goal Behind',
      message: 'You are behind on your weekly study goal. Consider increasing study time.',
      timestamp: '3 days ago',
      read: true,
      priority: 'high'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'achievement': return <Star className="h-4 w-4 text-yellow-600" />;
      case 'update': return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SharedPageLayout
      title="Notifications"
      subtitle={`You have ${unreadCount} unread notifications`}
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span className="font-medium">All Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notification Filters */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </span>
                          {notification.read && (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unread">
            <div className="space-y-3">
              {notifications.filter(n => !n.read).map((notification) => (
                <Card 
                  key={notification.id} 
                  className="cursor-pointer bg-blue-50 border-blue-200"
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default NotificationsPage;
