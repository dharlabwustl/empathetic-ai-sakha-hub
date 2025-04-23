
import React from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export interface NudgeData {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success' | 'error';
  icon?: React.ReactNode;
  action?: {
    text: string;
    url: string;
  };
}

interface NudgesSectionProps {
  nudges: NudgeData[];
  onMarkAsRead: (id: string) => void;
}

const NudgesSection: React.FC<NudgesSectionProps> = ({
  nudges,
  onMarkAsRead,
}) => {
  if (!nudges || nudges.length === 0) return null;
  
  return (
    <div className="space-y-2 mb-6">
      {nudges.map((nudge) => (
        <Alert key={nudge.id} variant={nudge.type === 'error' ? 'destructive' : 'default'}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <AlertTitle>{nudge.title}</AlertTitle>
              <AlertDescription>{nudge.description}</AlertDescription>
              
              {nudge.action && (
                <Button 
                  variant="link" 
                  className="mt-2 p-0 h-auto text-sm"
                  asChild
                >
                  <a href={nudge.action.url}>{nudge.action.text}</a>
                </Button>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onMarkAsRead(nudge.id)}
              className="-mt-1 -mr-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default NudgesSection;
