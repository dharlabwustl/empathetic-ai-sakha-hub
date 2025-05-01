
import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NudgeData } from '@/hooks/useKpiTracking';

interface NudgesListProps {
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
}

const NudgesList: React.FC<NudgesListProps> = ({ nudges, markNudgeAsRead }) => {
  if (!nudges || nudges.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
        <p className="mt-4 text-muted-foreground">No notifications at the moment</p>
      </div>
    );
  }

  const getNudgeIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'medium':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {nudges.map((nudge) => (
        <Card key={nudge.id} className="overflow-hidden shadow-sm">
          <CardContent className="p-0">
            <div className="flex p-4">
              <div className="mr-4 flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {getNudgeIcon(nudge.priority)}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{nudge.title}</h3>
                  <Badge variant={
                    nudge.priority === 'high' ? 'destructive' :
                    nudge.priority === 'medium' ? 'secondary' : 'outline'
                  }>
                    {nudge.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{nudge.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {new Date(nudge.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => markNudgeAsRead(nudge.id)}
                  >
                    Mark as read
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NudgesList;
