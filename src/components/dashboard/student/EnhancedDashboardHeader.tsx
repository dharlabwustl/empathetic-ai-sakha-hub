
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  Bell,
  Settings,
  Search
} from 'lucide-react';
import { UserProfileType, MoodType } from '@/types/user/base';

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileType;
  currentTime: Date;
  upcomingEvents: Array<{
    title: string;
    time: string;
    type: "exam" | "task" | "revision";
  }>;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  currentTime,
  upcomingEvents,
  onSettingsClick,
  onNotificationsClick
}) => {
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalMessage = (mood?: MoodType) => {
    if (!mood) return "Ready to achieve your goals today?";
    
    switch (mood) {
      case MoodType.Happy:
        return "Your positive energy is perfect for learning!";
      case MoodType.Motivated:
        return "Keep that motivation going strong!";
      case MoodType.Focused:
        return "Great focus - let's tackle some challenging concepts!";
      case MoodType.Tired:
        return "Take it easy today with some light review.";
      case MoodType.Stressed:
        return "Let's break things down into manageable steps.";
      default:
        return "Every step forward counts towards your success!";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMoodBadgeColor = (mood?: MoodType) => {
    if (!mood) return "bg-gray-100 text-gray-800";
    
    switch (mood) {
      case MoodType.Happy:
        return "bg-yellow-100 text-yellow-800";
      case MoodType.Motivated:
        return "bg-green-100 text-green-800";
      case MoodType.Focused:
        return "bg-blue-100 text-blue-800";
      case MoodType.Tired:
        return "bg-orange-100 text-orange-800";
      case MoodType.Stressed:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Header Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {getGreeting()}, {userProfile.name || 'Student'}!
                </h1>
                {userProfile.mood && (
                  <Badge className={getMoodBadgeColor(userProfile.mood)}>
                    {userProfile.mood}
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {getMotivationalMessage(userProfile.mood)}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(currentTime)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTime(currentTime)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onNotificationsClick}>
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onSettingsClick}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats and Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quick Stats */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Today's Progress
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{userProfile.studyStreak || 0}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-xs text-muted-foreground">Tasks Done</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">0h</div>
                <div className="text-xs text-muted-foreground">Study Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              Upcoming
            </h3>
            <div className="space-y-2">
              {upcomingEvents.slice(0, 3).map((event, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      event.type === 'exam' ? 'bg-red-500' :
                      event.type === 'task' ? 'bg-blue-500' : 'bg-green-500'
                    }`} />
                    <span className="font-medium">{event.title}</span>
                  </div>
                  <span className="text-muted-foreground">{event.time}</span>
                </div>
              ))}
              {upcomingEvents.length === 0 && (
                <p className="text-sm text-muted-foreground">No upcoming events</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboardHeader;
