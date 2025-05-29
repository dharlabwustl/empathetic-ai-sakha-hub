
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Crown, Clock, Calendar, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserProfileBase, MoodType } from '@/types/user/base';
import MoodLogButton from './mood-tracking/MoodLogButton';
import { useNavigate } from 'react-router-dom';

interface EnhancedNameHeaderCardProps {
  userProfile: UserProfileBase;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const EnhancedNameHeaderCard: React.FC<EnhancedNameHeaderCardProps> = ({
  userProfile,
  currentMood,
  onMoodChange
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
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

  const userName = userProfile?.name || userProfile?.firstName || "Student";
  const studyStreak = userProfile?.studyStreak || 12;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleUpgradeClick = () => {
    navigate('/dashboard/student/subscription');
  };

  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-blue-900/20 border-purple-100 dark:border-purple-800/30 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left side - Avatar and greeting */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white dark:border-gray-700 shadow-sm">
              <AvatarImage src={userProfile.avatar} alt={userName} />
              <AvatarFallback className="text-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {getGreeting()}, <span className="text-purple-700 dark:text-purple-400">{userName}</span>!
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="font-mono">{formatTime(currentTime)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span>{formatDate(currentTime)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Daily Streak */}
          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-orange-200 dark:border-orange-700 shadow-sm">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Flame className="h-6 w-6 text-orange-500" />
                </motion.div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Study Streak</p>
                  <p className="font-bold text-xl text-orange-600 dark:text-orange-400">{studyStreak} days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Mood and Upgrade */}
          <div className="flex items-center gap-3">
            {/* Mood button */}
            {onMoodChange && (
              <MoodLogButton
                currentMood={currentMood}
                onMoodChange={handleMoodChange}
              />
            )}

            {/* Enhanced Upgrade button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleUpgradeClick}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-lg px-6 py-3 text-base font-semibold"
              >
                <Crown className="h-5 w-5 mr-2" />
                Upgrade Now
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom row - Exam goal */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Current Exam Goal</p>
                <p className="font-medium text-gray-900 dark:text-white">{userProfile.examPreparation || "NEET 2024"}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Switch Plan
              </Button>
              <Button size="sm">
                New Plan
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedNameHeaderCard;
