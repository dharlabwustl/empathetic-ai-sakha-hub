
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Milestone } from '@/types/student/dashboard';
import { Calendar, Check, Flag, TrendingUp } from 'lucide-react';
import { format, isFuture, parseISO } from 'date-fns';

interface UpcomingMilestonesSectionProps {
  milestones: Milestone[];
}

const UpcomingMilestonesSection: React.FC<UpcomingMilestonesSectionProps> = ({ milestones }) => {
  const upcomingMilestones = milestones
    .filter(milestone => isFuture(parseISO(milestone.date)))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'weekly-target':
        return <Flag className="h-4 w-4 text-blue-500" />;
      case 'practice-exam':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'performance-check':
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const getMilestoneTypeLabel = (type: string) => {
    switch (type) {
      case 'weekly-target':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">Weekly Target</Badge>;
      case 'practice-exam':
        return <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">Practice Exam</Badge>;
      case 'performance-check':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">Performance Check</Badge>;
      default:
        return <Badge variant="outline">Milestone</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-violet-600" />
          Upcoming Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingMilestones.length > 0 ? (
            upcomingMilestones.map(milestone => (
              <div key={milestone.id} className="bg-white dark:bg-gray-800 border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      {getMilestoneIcon(milestone.type)}
                      <h4 className="text-sm font-medium ml-2">{milestone.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{milestone.description}</p>
                  </div>
                  {getMilestoneTypeLabel(milestone.type)}
                </div>
                <div className="mt-2 pt-2 border-t flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium">Due: </span>
                    <span className="text-muted-foreground">
                      {format(parseISO(milestone.date), "MMM d, yyyy")}
                    </span>
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No upcoming milestones</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Calendar className="h-4 w-4 mr-1" /> View All Milestones
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingMilestonesSection;
