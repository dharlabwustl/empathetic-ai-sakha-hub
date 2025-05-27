
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Target, Trophy } from 'lucide-react';

interface StudyStreakSectionProps {
  streak?: number;
  todayStudied?: boolean;
  weeklyGoal?: number;
  weeklyProgress?: number;
}

const StudyStreakSection: React.FC<StudyStreakSectionProps> = ({
  streak = 7,
  todayStudied = true,
  weeklyGoal = 5,
  weeklyProgress = 4
}) => {
  return (
    <Card className="shadow-sm bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Flame className="h-5 w-5" />
          Study Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{streak}</div>
            <div className="text-sm text-orange-700">Days</div>
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant={todayStudied ? "default" : "outline"} className="bg-orange-100 text-orange-800">
              {todayStudied ? "Studied Today!" : "Study Today"}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-orange-700">
              <Target className="h-3 w-3" />
              {weeklyProgress}/{weeklyGoal} this week
            </div>
          </div>
        </div>
        <div className="text-xs text-orange-600 text-center">
          <Trophy className="h-3 w-3 inline mr-1" />
          Keep going! You're on fire! 🔥
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStreakSection;
