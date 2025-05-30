
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Brain, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TodayScheduleCardProps {
  className?: string;
}

const TodayScheduleCard: React.FC<TodayScheduleCardProps> = ({ className }) => {
  const todayTasks = [
    { id: 1, subject: 'Physics', type: 'concept', title: 'Thermodynamics', time: '9:00 AM', duration: 45, link: '/dashboard/student/concepts' },
    { id: 2, subject: 'Chemistry', type: 'practice', title: 'Organic Chemistry Test', time: '11:00 AM', duration: 60, link: '/dashboard/student/practice-exam' },
    { id: 3, subject: 'Biology', type: 'flashcard', title: 'Cell Structure Review', time: '2:00 PM', duration: 30, link: '/dashboard/student/flashcards' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <FileText className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Today's Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {todayTasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              {getIcon(task.type)}
              <div>
                <h4 className="font-medium text-sm">{task.title}</h4>
                <p className="text-xs text-muted-foreground">{task.subject}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{task.time}</p>
              <Badge variant="outline" className="text-xs">{task.duration}m</Badge>
            </div>
          </div>
        ))}
        <Link to="/dashboard/student/today">
          <Button variant="outline" className="w-full mt-2">
            View Full Schedule
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TodayScheduleCard;
