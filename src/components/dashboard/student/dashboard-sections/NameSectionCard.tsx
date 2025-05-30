
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Clock, Target, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NameSectionCardProps {
  userName: string;
  currentTime?: string;
  dailyGoalStreak?: number;
}

const NameSectionCard: React.FC<NameSectionCardProps> = ({
  userName,
  currentTime,
  dailyGoalStreak = 12
}) => {
  const getCurrentTime = () => {
    if (currentTime) return currentTime;
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="premium-card shadow-xl border-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {userName.charAt(0).toUpperCase()}
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Hello, {userName}!
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{getCurrentTime()}</span>
                </div>
              </div>
            </div>
            <Link to="/dashboard/student/subscription">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Plan
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Flame className="h-5 w-5 text-orange-500" />
                </motion.div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{dailyGoalStreak}</p>
                  <p className="text-xs text-gray-600">Day Streak</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Daily Goal</p>
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    On Track
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NameSectionCard;
