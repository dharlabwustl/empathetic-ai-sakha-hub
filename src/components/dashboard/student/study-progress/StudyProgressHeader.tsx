
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2 } from 'lucide-react';
import { StudyStreak } from "@/types/user";

interface StudyProgressHeaderProps {
  studyStreak: StudyStreak | null;
}

export const StudyProgressHeader: React.FC<StudyProgressHeaderProps> = ({
  studyStreak
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Study Progress</h1>
        <p className="text-muted-foreground">Track your learning journey and academic performance</p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full flex items-center">
          <CheckCircle2 size={16} className="mr-1" />
          <span>{studyStreak?.current || studyStreak?.currentStreak || 0} Day Streak</span>
        </div>
        
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Study Calendar
        </Button>
      </div>
    </div>
  );
};
