
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Calendar, Trophy } from 'lucide-react';

const StudyStreakCard: React.FC = () => {
  return (
    <Card id="study-streak-card" className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
          <Flame className="h-5 w-5" />
          Study Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">7</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Days in a row</p>
        </div>
        
        <div className="flex justify-center">
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            <Trophy className="h-3 w-3 mr-1" />
            Consistency Champion
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>This week</span>
            <span className="font-medium">7/7 days</span>
          </div>
          <div className="flex justify-between">
            <span>This month</span>
            <span className="font-medium">23/30 days</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>Keep it going! Study today to maintain your streak</span>
        </div>
        
        <Button variant="outline" className="w-full">
          View Study History
        </Button>
      </CardContent>
    </Card>
  );
};

export default StudyStreakCard;
