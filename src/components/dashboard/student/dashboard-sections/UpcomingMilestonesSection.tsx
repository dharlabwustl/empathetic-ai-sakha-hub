
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Flag } from 'lucide-react';

interface UpcomingMilestonesSectionProps {
  milestones?: any[];
  isLoading?: boolean;
}

const UpcomingMilestonesSection = ({ milestones, isLoading }: UpcomingMilestonesSectionProps) => {
  // Mock data
  const defaultMilestones = [
    {
      id: '1',
      title: 'Physics Mid-Term Mock Test',
      date: '2023-05-15',
      daysLeft: 2,
      type: 'exam',
    },
    {
      id: '2',
      title: 'Complete Organic Chemistry Module',
      date: '2023-05-20',
      daysLeft: 7,
      type: 'module',
    },
    {
      id: '3',
      title: 'Mathematics Progress Assessment',
      date: '2023-05-25',
      daysLeft: 12,
      type: 'assessment',
    },
    {
      id: '4',
      title: 'Biology Final Mock Exam',
      date: '2023-06-05',
      daysLeft: 23,
      type: 'exam',
    },
  ];
  
  const displayMilestones = milestones || defaultMilestones;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Flag className="h-5 w-5 text-green-500" />
          Upcoming Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-sm">Milestone</th>
                <th className="text-left py-2 font-medium text-sm">Date</th>
                <th className="text-left py-2 font-medium text-sm">Countdown</th>
              </tr>
            </thead>
            <tbody>
              {displayMilestones.map(milestone => (
                <tr key={milestone.id} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="font-medium">{milestone.title}</div>
                    <div className="text-xs text-muted-foreground">{milestone.type}</div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDate(milestone.date)}
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      milestone.daysLeft <= 3 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                        : milestone.daysLeft <= 7 
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {milestone.daysLeft} days left
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingMilestonesSection;
