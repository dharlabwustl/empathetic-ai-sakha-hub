
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User, Trophy, Target, Clock } from 'lucide-react';
import { UserProfileType } from '@/types/user/base';

interface EnhancedDashboardHeaderProps {
  user: UserProfileType;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  user,
  onNotificationClick,
  onSettingsClick,
  onProfileClick
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatExamGoal = (examPreparation?: string) => {
    if (!examPreparation) return 'No exam selected';
    return examPreparation;
  };

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {getGreeting()}, {user.name || 'Student'}!
              </h1>
              {user.mood && (
                <Badge variant="outline" className="bg-white/50">
                  Feeling {user.mood}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                <span>Preparing for: {formatExamGoal(user.examPreparation)}</span>
              </div>
              
              {user.studyStreak && (
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-orange-500" />
                  <span>{user.studyStreak} day streak</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>4.5h studied today</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onNotificationClick}
              className="relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onSettingsClick}
            >
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onProfileClick}
              className="bg-white/50"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedDashboardHeader;
