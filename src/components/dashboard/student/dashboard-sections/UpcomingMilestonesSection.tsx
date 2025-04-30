
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, CheckCircle } from 'lucide-react';
import { Milestone } from '@/types/user/dashboard';

export interface UpcomingMilestonesSectionProps {
  milestones: Milestone[];
}

const UpcomingMilestonesSection: React.FC<UpcomingMilestonesSectionProps> = ({ milestones }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Calendar className="h-5 w-5 text-violet-600 mr-2" />
          <h3 className="text-lg font-medium">Upcoming Milestones</h3>
        </div>
        
        {milestones && milestones.length > 0 ? (
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <div 
                key={milestone.id} 
                className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">{milestone.title}</div>
                  <div className="text-xs text-muted-foreground">{milestone.date}</div>
                  {milestone.description && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {milestone.description}
                    </div>
                  )}
                </div>
                {milestone.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No upcoming milestones
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingMilestonesSection;
