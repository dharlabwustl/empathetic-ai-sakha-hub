
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Clock } from 'lucide-react';
import { UserProfileBase } from '@/types/user/base';
import { motion } from 'framer-motion';

interface EnhancedNameHeaderCardProps {
  userProfile: UserProfileBase;
}

const EnhancedNameHeaderCard: React.FC<EnhancedNameHeaderCardProps> = ({
  userProfile
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

  const userName = userProfile?.name || userProfile?.firstName || "Student";
  const studyStreak = userProfile.studyStreak || 12;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-blue-900/20 border-purple-100 dark:border-purple-800/30 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* User info section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white dark:border-gray-700 shadow-sm">
            <AvatarImage src={userProfile.avatar} alt={userName} />
            <AvatarFallback className="text-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getGreeting()}, <span className="text-purple-700 dark:text-purple-400">{userName}</span>!
            </h1>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <motion.span
                  key={formatTime(currentTime)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono"
                >
                  {formatTime(currentTime)}
                </motion.span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(currentTime)}
              </span>
              
              <motion.div 
                className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span 
                  className="text-lg"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🔥
                </motion.span>
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                  {studyStreak} day streak!
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Upgrade button */}
        <div className="flex items-center">
          <Button
            size="lg"
            onClick={() => window.open('https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/subscription', '_blank')}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-lg px-6 py-3"
          >
            <Crown className="h-5 w-5 mr-2" />
            Upgrade to Premium
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EnhancedNameHeaderCard;
