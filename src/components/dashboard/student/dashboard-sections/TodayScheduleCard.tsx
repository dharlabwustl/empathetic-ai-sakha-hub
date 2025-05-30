
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const TodayScheduleCard: React.FC = () => {
  const todaySchedule = [
    { time: "9:00 AM", subject: "Physics", topic: "Thermodynamics", duration: "2 hours" },
    { time: "2:00 PM", subject: "Chemistry", topic: "Organic Reactions", duration: "1.5 hours" },
    { time: "4:00 PM", subject: "Biology", topic: "Cell Biology", duration: "1 hour" }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Today's Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {todaySchedule.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-3 w-3" />
                {item.time}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{item.subject} - {item.topic}</div>
              <div className="text-xs text-gray-500">{item.duration}</div>
            </div>
            <Link to="/dashboard/student/today">
              <Button size="sm" variant="outline">
                <Play className="h-3 w-3 mr-1" />
                Start
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TodayScheduleCard;
