
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, BookOpen, Target, Trophy } from "lucide-react";

interface RecentActivity {
  id: string;
  type: 'study' | 'exam' | 'achievement' | 'milestone';
  title: string;
  description: string;
  timestamp: string;
  icon?: React.ReactNode;
}

interface RecentActivitySectionProps {
  activities?: RecentActivity[];
}

const RecentActivitySection: React.FC<RecentActivitySectionProps> = ({ 
  activities = [] 
}) => {
  const defaultActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'study',
      title: 'Physics Concepts',
      description: 'Completed 3 concept cards on Motion in One Dimension',
      timestamp: '2 hours ago',
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      id: '2',
      type: 'exam',
      title: 'Chemistry Practice Test',
      description: 'Scored 85% in Organic Chemistry mock test',
      timestamp: '1 day ago',
      icon: <Target className="h-4 w-4" />
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Study Streak',
      description: 'Completed 7-day study streak!',
      timestamp: '2 days ago',
      icon: <Trophy className="h-4 w-4" />
    }
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex-shrink-0 mt-1">
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{activity.title}</h4>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivitySection;
