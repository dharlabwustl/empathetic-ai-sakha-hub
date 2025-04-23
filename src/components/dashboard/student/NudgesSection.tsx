
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NudgeData } from '@/hooks/useKpiTracking';

interface NudgesSectionProps {
  nudges: NudgeData[];
  onMarkAsRead: (id: string) => void;
}

const NudgesSection: React.FC<NudgesSectionProps> = ({ nudges, onMarkAsRead }) => {
  if (!nudges || nudges.length === 0) return null;

  return (
    <div className="space-y-2 mb-4">
      {nudges.map((nudge) => (
        <Alert 
          key={nudge.id} 
          className={`border-l-4 ${getPriorityColor(nudge.priority)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              <div>
                <AlertTitle className="text-sm font-medium">
                  {nudge.title}
                </AlertTitle>
                <AlertDescription className="text-xs">
                  {nudge.message}
                </AlertDescription>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 ml-2" 
              onClick={() => onMarkAsRead(nudge.id)}
            >
              <CheckCircle className="h-4 w-4" />
              <span className="sr-only">Mark as read</span>
            </Button>
          </div>
        </Alert>
      ))}
    </div>
  );
};

// Helper function to get appropriate color based on priority
function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'border-red-500';
    case 'medium':
      return 'border-amber-500';
    default:
      return 'border-blue-500';
  }
}

export default NudgesSection;
