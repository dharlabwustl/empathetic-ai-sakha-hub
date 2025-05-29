
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserProfileBase } from "@/types/user/base";
import { Crown, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from 'framer-motion';

interface EnhancedNameHeaderCardProps {
  userProfile: UserProfileBase;
}

const EnhancedNameHeaderCard: React.FC<EnhancedNameHeaderCardProps> = ({
  userProfile
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second for real-time display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  // Get the greeting based on the time of day
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  const greetingText = getGreeting();
  const userName = userProfile?.name || userProfile?.firstName || "Student";
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const studyStreak = userProfile.studyStreak || 12;

  const handleUpgradeClick = () => {
    window.open('https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/subscription', '_blank');
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-blue-900/20 border-purple-100 dark:border-purple-800/30 mb-6">
      <div className="flex items-center justify-between">
        {/* User avatar and greeting with real-time info */}
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20 border-3 border-white dark:border-gray-700 shadow-lg">
            <AvatarImage src={userProfile.avatar} alt={userName} />
            <AvatarFallback className="text-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {greetingText}, <span className="text-purple-700 dark:text-purple-400">{userName}</span>!
            </h1>
            
            {/* Real-time clock and date */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <motion.span
                  key={formatTime(currentTime)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono font-medium"
                >
                  {formatTime(currentTime)}
                </motion.span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(currentTime)}
              </span>
            </div>
            
            {/* Daily study streak with fire animation */}
            <motion.div 
              className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5 rounded-full w-fit"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span 
                className="text-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🔥
              </motion.span>
              <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                {studyStreak} day streak!
              </span>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Upgrade button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleUpgradeClick}
            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-lg"
          >
            <Crown className="h-5 w-5 mr-2 animate-pulse" />
            Upgrade to Pro
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </Button>
        </motion.div>
      </div>
    </Card>
  );
};

export default EnhancedNameHeaderCard;
