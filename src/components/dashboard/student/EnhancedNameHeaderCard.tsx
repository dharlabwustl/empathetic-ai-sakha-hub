
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserProfileBase, MoodType } from '@/types/user/base';
import MoodLogButton from './mood-tracking/MoodLogButton';

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

  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  const userName = userProfile.name || userProfile.firstName || "Student";
  const studyStreak = userProfile.studyStreak || 12;

  return (
    <Card className="bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-blue-900/20 border-purple-100 dark:border-purple-800/30">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* User greeting and info */}
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {getGreeting()}, <span className="text-purple-700 dark:text-purple-400">{userName}</span>! 
                <span className="text-2xl">🌟</span>
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(currentTime)}
                </p>
                <div className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                  {formatTime(currentTime)}
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Flame className="h-5 w-5 text-orange-500" />
                  </motion.div>
                  <span className="font-bold text-orange-600 dark:text-orange-400">
                    {studyStreak} day streak!
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
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
                size="lg"
                onClick={() => window.open('https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/subscription', '_blank')}
                className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white border-0 shadow-xl px-6 py-3 text-lg font-bold"
              >
                <Crown className="h-5 w-5 mr-2" />
                Upgrade Now
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  ✨
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedNameHeaderCard;
