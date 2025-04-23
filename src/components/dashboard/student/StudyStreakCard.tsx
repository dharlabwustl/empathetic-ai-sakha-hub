
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame } from 'lucide-react';

interface StudyStreakCardProps {
  streakDays: number;
}

const StudyStreakCard: React.FC<StudyStreakCardProps> = ({ streakDays }) => {
  const getStreakMessage = () => {
    if (streakDays === 0) return "Start your study streak today!";
    if (streakDays === 1) return "You've studied 1 day in a row!";
    if (streakDays < 3) return `${streakDays} day streak! Keep going!`;
    if (streakDays < 7) return `${streakDays} day streak! You're building momentum!`;
    if (streakDays < 14) return `${streakDays} day streak! Impressive discipline!`;
    if (streakDays < 30) return `${streakDays} day streak! You're on fire!`;
    return `${streakDays} day streak! Legendary commitment!`;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Study Streak</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-4">
          <div className="rounded-full bg-amber-50 dark:bg-amber-900/30 p-4">
            <div className="rounded-full bg-amber-100 dark:bg-amber-800/50 p-6">
              <Flame className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-2xl font-bold">{streakDays} Days</p>
          <p className="text-sm text-muted-foreground mt-1">{getStreakMessage()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStreakCard;
