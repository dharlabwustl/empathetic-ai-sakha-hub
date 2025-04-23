
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';

interface UpcomingExamCardProps {
  examTitle: string;
  examDate: string;
  daysLeft: number;
}

const UpcomingExamCard: React.FC<UpcomingExamCardProps> = ({ 
  examTitle, 
  examDate, 
  daysLeft 
}) => {
  const getUrgencyLevel = () => {
    if (daysLeft <= 7) return "high";
    if (daysLeft <= 30) return "medium";
    return "low";
  };

  const urgency = getUrgencyLevel();
  const urgencyColors = {
    high: "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400",
    medium: "text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400",
    low: "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400"
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Upcoming Exam</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-4">
          <div className={`rounded-full p-4 ${urgencyColors[urgency]}`}>
            <CalendarClock className="h-8 w-8" />
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-lg font-bold">{examTitle}</p>
          <p className="text-2xl font-bold mt-1">{daysLeft} Days</p>
          <p className="text-sm text-muted-foreground mt-1">
            {examDate ? `Exam on ${formatDate(examDate)}` : 'Date not set'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingExamCard;
