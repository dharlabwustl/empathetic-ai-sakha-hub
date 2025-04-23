
import React from 'react';
import { NudgeData } from '@/hooks/useKpiTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Bell, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface NudgesSectionProps {
  nudges: NudgeData[];
  onMarkAsRead: (id: string) => void;
}

const NudgesSection: React.FC<NudgesSectionProps> = ({ nudges, onMarkAsRead }) => {
  if (!nudges || nudges.length === 0) return null;
  
  return (
    <Card className="mb-4 border-l-4 border-amber-500 bg-white dark:bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Bell className="h-5 w-5 mr-2 text-amber-500" />
          Important Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {nudges.map((nudge, index) => (
          <React.Fragment key={nudge.id}>
            {index > 0 && <Separator className="my-2" />}
            <div className="flex items-start justify-between py-2">
              <div className="flex items-start space-x-3">
                <div className={`p-1.5 rounded-full flex-shrink-0 
                  ${nudge.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 
                   nudge.priority === 'medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                   'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{nudge.title}</h4>
                  <p className="text-xs text-muted-foreground">{nudge.message}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-xs"
                onClick={() => onMarkAsRead(nudge.id)}
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Mark as Read
              </Button>
            </div>
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default NudgesSection;
