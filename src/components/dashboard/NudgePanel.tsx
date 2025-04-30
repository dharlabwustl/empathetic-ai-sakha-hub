
import React from 'react';
import { NudgeData } from '@/hooks/useKpiTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, Clock, Info, AlertTriangle, MessageSquare } from 'lucide-react';

interface NudgePanelProps {
  nudges: NudgeData[];
  markAsRead: (id: string) => void;
  className?: string;
}

const NudgePanel: React.FC<NudgePanelProps> = ({
  nudges,
  markAsRead,
  className
}) => {
  const getNudgeIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'achievement':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-violet-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getNudgeBadgeStyle = (type: string, priorityLevel?: string) => {
    if (priorityLevel === 'high') {
      return "bg-red-100 text-red-800 border-red-200";
    }
    
    switch (type) {
      case 'reminder':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'alert':
        return "bg-amber-100 text-amber-800 border-amber-200";
      case 'achievement':
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case 'message':
        return "bg-violet-100 text-violet-800 border-violet-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CardTitle>
          {nudges.length > 0 && (
            <Badge className="bg-primary">
              {nudges.filter(n => !n.read).length} new
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {nudges.length > 0 ? (
          <div className="space-y-4">
            {nudges.map((nudge) => (
              <div
                key={nudge.id}
                className={`p-4 rounded-lg border ${nudge.read ? 'bg-muted/30 border-muted' : 'bg-white dark:bg-gray-800 border-primary/20'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 p-1.5 rounded-full ${nudge.read ? 'bg-muted' : 'bg-primary/10'}`}>
                      {getNudgeIcon(nudge.type)}
                    </div>
                    <div>
                      <h4 className={`font-medium ${nudge.read ? 'text-muted-foreground' : ''}`}>
                        {nudge.title}
                      </h4>
                      <p className={`text-sm mt-1 ${nudge.read ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                        {nudge.message}
                      </p>
                      {nudge.createdAt && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(nudge.createdAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${getNudgeBadgeStyle(nudge.type)}`}
                  >
                    {nudge.type.charAt(0).toUpperCase() + nudge.type.slice(1)}
                  </Badge>
                </div>
                
                {!nudge.read && (
                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(nudge.id)}
                    >
                      Mark as read
                    </Button>
                    {nudge.actionLabel && nudge.actionUrl && (
                      <Button
                        variant="default"
                        size="sm"
                        className="ml-2"
                        onClick={() => {
                          markAsRead(nudge.id);
                          window.location.href = nudge.actionUrl || '#';
                        }}
                      >
                        {nudge.actionLabel}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications at this time</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NudgePanel;
