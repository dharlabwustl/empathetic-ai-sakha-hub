
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Flag } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'assignment' | 'revision';
  priority: 'high' | 'medium' | 'low';
}

interface UpcomingMilestonesSectionProps {
  milestones: Milestone[];
}

const UpcomingMilestonesSection: React.FC<UpcomingMilestonesSectionProps> = ({ milestones }) => {
  // Default milestones if none provided
  const defaultMilestones: Milestone[] = [
    {
      id: '1',
      title: 'Physics Mock Test',
      date: '2024-01-15',
      type: 'exam',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Chemistry Revision',
      date: '2024-01-12',
      type: 'revision',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Math Assignment',
      date: '2024-01-18',
      type: 'assignment',
      priority: 'low'
    }
  ];

  const displayMilestones = milestones.length > 0 ? milestones : defaultMilestones;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam': return <Flag className="h-4 w-4" />;
      case 'assignment': return <Clock className="h-4 w-4" />;
      case 'revision': return <Calendar className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-purple-600" />
          <CardTitle className="text-lg">Upcoming Milestones</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayMilestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-full bg-purple-100 text-purple-600">
                  {getTypeIcon(milestone.type)}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{milestone.title}</h4>
                  <p className="text-xs text-muted-foreground">{formatDate(milestone.date)}</p>
                </div>
              </div>
              <Badge variant="outline" className={getPriorityColor(milestone.priority)}>
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
