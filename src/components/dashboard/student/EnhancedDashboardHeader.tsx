import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  Settings, 
  User,
  Heart,
  Zap
} from "lucide-react";
import { UserProfileBase, MoodType } from "@/types/user/base";
import { useIsMobile } from "@/hooks/use-mobile";

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileBase;
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  hideSidebar,
  onToggleSidebar,
  currentMood,
  onMoodChange
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const isMobile = useIsMobile();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return 'N/A';
    const parts = name.split(' ');
    let initials = '';
    for (let i = 0; i < parts.length; i++) {
      initials += parts[i].charAt(0).toUpperCase();
    }
    return initials;
  };

  const moodEmojis = {
    [MoodType.Happy]: '😊',
    [MoodType.Motivated]: '🔥',
    [MoodType.Focused]: '🎯',
    [MoodType.Calm]: '😌',
    [MoodType.Tired]: '😴',
    [MoodType.Confused]: '😕',
    [MoodType.Anxious]: '😰',
    [MoodType.Stressed]: '😫',
    [MoodType.Overwhelmed]: '😵',
    [MoodType.Neutral]: '😐',
    [MoodType.Okay]: '👍',
    [MoodType.Sad]: '😢'
  };

  const getMoodDisplay = () => {
    if (!currentMood) return null;
    
    const moodConfig = {
      [MoodType.Happy]: { emoji: '😊', color: 'bg-yellow-100 text-yellow-800' },
      [MoodType.Motivated]: { emoji: '🔥', color: 'bg-orange-100 text-orange-800' },
      [MoodType.Focused]: { emoji: '🎯', color: 'bg-blue-100 text-blue-800' },
      [MoodType.Tired]: { emoji: '😴', color: 'bg-gray-100 text-gray-800' },
      [MoodType.Stressed]: { emoji: '😫', color: 'bg-red-100 text-red-800' },
      [MoodType.Anxious]: { emoji: '😰', color: 'bg-purple-100 text-purple-800' },
      [MoodType.Neutral]: { emoji: '😐', color: 'bg-gray-100 text-gray-800' },
      [MoodType.Sad]: { emoji: '😢', color: 'bg-blue-100 text-blue-800' }
    };

    const config = moodConfig[currentMood];
    if (!config) return null;

    return (
      <Badge variant="secondary" className={`${config.color} flex items-center gap-1`}>
        <span>{config.emoji}</span>
        <span className="capitalize">{currentMood}</span>
      </Badge>
    );
  };

  return (
    <div className="flex items-center justify-between p-4 sm:p-6">
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          {hideSidebar ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          <span className="sr-only">Toggle Menu</span>
        </Button>
      )}

      {/* Search Bar (Hidden on smaller screens) */}
      {!isMobile && (
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search concepts, flashcards, and more..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-8 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      )}

      {/* User Profile Section */}
      <div className="flex items-center space-x-4">
        {/* Mood Display */}
        {getMoodDisplay()}

        {/* Avatar and User Info */}
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback>{getInitials(userProfile.name)}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">{userProfile.name}</p>
            <p className="text-xs text-muted-foreground">
              {userProfile.grade} | {userProfile.examPreparation}
            </p>
          </div>
        </div>

        {/* Settings Button */}
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>

        {/* Notifications Button */}
        <Button variant="ghost" size="icon" onClick={toggleNotifications}>
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </div>
  );
};

export default EnhancedDashboardHeader;
