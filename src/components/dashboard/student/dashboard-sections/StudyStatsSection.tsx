
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar, Target, BookOpen } from 'lucide-react';

interface StudyStatsSectionProps {
  dailyStats?: {
    studyTime: string;
    conceptsReviewed: number;
    flashcardsMastered: number;
    questionsAnswered: number;
  }
}

const StudyStatsSection = ({ dailyStats }: StudyStatsSectionProps) => {
  const defaultStats = {
    studyTime: '2h 45m',
    conceptsReviewed: 8,
    flashcardsMastered: 24,
    questionsAnswered: 35,
  };
  
  const stats = dailyStats || defaultStats;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-500" />
          Today's Study Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Clock className="h-8 w-8 mb-2 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold">{stats.studyTime}</span>
            <span className="text-xs text-muted-foreground">Study Time</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <BookOpen className="h-8 w-8 mb-2 text-green-600 dark:text-green-400" />
            <span className="text-xl font-bold">{stats.conceptsReviewed}</span>
            <span className="text-xs text-muted-foreground">Concepts Reviewed</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Calendar className="h-8 w-8 mb-2 text-purple-600 dark:text-purple-400" />
            <span className="text-xl font-bold">{stats.flashcardsMastered}</span>
            <span className="text-xs text-muted-foreground">Flashcards Mastered</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <Target className="h-8 w-8 mb-2 text-amber-600 dark:text-amber-400" />
            <span className="text-xl font-bold">{stats.questionsAnswered}</span>
            <span className="text-xs text-muted-foreground">Questions Answered</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStatsSection;
