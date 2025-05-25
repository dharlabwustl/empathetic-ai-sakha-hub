
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, Clock } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'assignment' | 'test';
  priority: 'high' | 'medium' | 'low';
  status: 'upcoming' | 'completed' | 'overdue';
}

const UpcomingMilestonesSection = () => {
  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'Physics Mock Test',
      date: '2024-01-15',
      type: 'test',
      priority: 'high',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Chemistry Assignment',
      date: '2024-01-20',
      type: 'assignment',
      priority: 'medium',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'NEET Mock Exam',
      date: '2024-01-25',
      type: 'exam',
      priority: 'high',
      status: 'upcoming'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-600" />
          Upcoming Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">{milestone.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-3 w-3" />
                    {milestone.date}
                  </div>
                </div>
              </div>
              <Badge className={getPriorityColor(milestone.priority)}>
                {milestone.priority}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingMilestonesSection;
