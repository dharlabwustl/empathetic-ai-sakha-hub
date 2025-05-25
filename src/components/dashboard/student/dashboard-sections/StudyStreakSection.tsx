
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Calendar, Target } from 'lucide-react';

const StudyStreakSection: React.FC = () => {
  const currentStreak = 5;
  const longestStreak = 12;
  const weeklyGoal = 7;
  
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const studyDays = [true, true, true, true, true, false, false]; // Last 7 days

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-600" />
          <CardTitle className="text-lg">Study Streak</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Streak */}
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{currentStreak}</div>
            <div className="text-sm text-muted-foreground">Days in a row</div>
            <Badge variant="outline" className="mt-2 bg-orange-100 text-orange-800 border-orange-200">
              Keep it up!
            </Badge>
          </div>

          {/* Week Overview */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">This Week</span>
            </div>
            <div className="flex justify-between">
              {weekDays.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-xs text-muted-foreground mb-1">{day}</div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    studyDays[index] 
                      ? 'bg-orange-100 text-orange-600 border-2 border-orange-200' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {studyDays[index] ? '✓' : '○'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="text-center">
              <div className="text-lg font-semibold">{longestStreak}</div>
              <div className="text-xs text-muted-foreground">Longest Streak</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{studyDays.filter(Boolean).length}/{weeklyGoal}</div>
              <div className="text-xs text-muted-foreground">Weekly Goal</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStreakSection;
