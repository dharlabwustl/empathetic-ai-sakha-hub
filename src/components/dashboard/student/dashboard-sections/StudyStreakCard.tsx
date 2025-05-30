
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const StudyStreakCard: React.FC = () => {
  const streakData = {
    currentStreak: 12,
    longestStreak: 25,
    weeklyGoal: 7,
    completedThisWeek: 5
  };

  return (
    <Card className="premium-card study-streak-card bg-gradient-to-br from-orange-50/80 via-white to-amber-100/60 dark:from-orange-950/30 dark:via-gray-900 dark:to-amber-900/20 border border-orange-200/50 dark:border-orange-800/30 shadow-lg backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-600" />
          Study Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <motion.div 
              className="text-3xl font-bold text-orange-600"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {streakData.currentStreak}
            </motion.div>
            <p className="text-sm text-muted-foreground">days in a row</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded premium-card">
              <div className="font-medium text-orange-700 dark:text-orange-300">
                {streakData.longestStreak}
              </div>
              <div className="text-muted-foreground">Best Streak</div>
            </div>
            <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded premium-card">
              <div className="font-medium text-orange-700 dark:text-orange-300">
                {streakData.completedThisWeek}/{streakData.weeklyGoal}
              </div>
              <div className="text-muted-foreground">This Week</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200 premium-badge">
              <TrendingUp className="h-3 w-3 mr-1" />
              On Fire!
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStreakCard;
