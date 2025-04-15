import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Flame } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { StudyStreak } from "@/types/user";

interface StudyProgressHeaderProps {
  streak: StudyStreak;
}

const StudyProgressHeader: React.FC<StudyProgressHeaderProps> = ({ streak }) => {
  const today = new Date();
  const streakDays = Array.from({ length: 7 }, (_, i) => addDays(today, -i)).reverse();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Study Streak</span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Flame className="mr-2 h-4 w-4 text-orange-500" />
            Current: {streak.current} days
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {streakDays.map((day, index) => {
            const formattedDate = format(day, 'EEE');
            const dayOfMonth = format(day, 'd');
            const isStudied = streak.thisWeek.includes(index + 1);
            const isToday = format(today, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');

            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium
                    ${isStudied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}
                    ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                >
                  {dayOfMonth}
                </div>
                <span className="text-xs text-muted-foreground mt-1">{formattedDate}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyProgressHeader;
