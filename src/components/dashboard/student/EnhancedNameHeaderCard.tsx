
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedNameHeaderCardProps {
  userProfile: {
    name?: string;
    firstName?: string;
    avatar?: string;
    studyStreak?: number;
  };
}

const EnhancedNameHeaderCard: React.FC<EnhancedNameHeaderCardProps> = ({ userProfile }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
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

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = userProfile.name || userProfile.firstName || 'Student';
  const streak = userProfile.studyStreak || 5;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
              <AvatarImage src={userProfile.avatar} alt={userName} />
              <AvatarFallback className="text-lg font-semibold bg-blue-600 text-white">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {getGreeting()}, {userName}!
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div className="font-mono text-lg text-blue-600 dark:text-blue-400">
                  {formatTime(currentTime)}
                </div>
                <div className="text-gray-500">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Animated Daily Streak */}
            <motion.div 
              className="flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="h-5 w-5 text-orange-500" />
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {streak}
                </div>
                <div className="text-xs text-orange-500">
                  Day Streak
                </div>
              </div>
            </motion.div>

            {/* Enhanced Upgrade Button */}
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open('https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/subscription', '_blank')}
            >
              <Crown className="h-5 w-5 mr-2" />
              Upgrade Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedNameHeaderCard;
