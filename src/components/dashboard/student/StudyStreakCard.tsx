
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Award, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StudyStreakCardProps {
  currentStreak?: number;
  longestStreak?: number;
  daysStudied?: number;
  totalDays?: number;
  className?: string;
}

const StudyStreakCard: React.FC<StudyStreakCardProps> = ({
  currentStreak = 0,
  longestStreak = 0,
  daysStudied = 0,
  totalDays = 30,
  className = ""
}) => {
  const streakPercentage = (daysStudied / totalDays) * 100;
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Study Streak</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
            <Flame className="h-3 w-3 text-amber-500" />
            <span>{currentStreak} day{currentStreak !== 1 ? 's' : ''}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium">Current Streak</p>
              <div className="flex items-center gap-1 text-lg font-bold text-amber-600">
                <Flame className="h-5 w-5" />
                {currentStreak} day{currentStreak !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Longest Streak</p>
              <div className="flex items-center gap-1 text-lg font-bold text-indigo-600">
                <Award className="h-5 w-5" />
                {longestStreak} day{longestStreak !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Days studied this month</span>
              <span className="font-medium">{daysStudied}/{totalDays}</span>
            </div>
            <Progress value={streakPercentage} className="h-2" />
            
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-2">
              <Calendar className="h-3 w-3" />
              <span>Keep studying daily to increase your streak!</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStreakCard;
