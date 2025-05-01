
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NudgeData } from "@/hooks/useKpiTracking";
import { Check } from "lucide-react";

interface NudgesListProps {
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
}

const NudgesList: React.FC<NudgesListProps> = ({ nudges, markNudgeAsRead }) => {
  if (!nudges || nudges.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">You don't have any notifications right now.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {nudges.map((nudge) => (
        <Card key={nudge.id} className={`${nudge.read ? 'opacity-60' : 'border-blue-200 shadow-md'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between">
              <span>{nudge.title}</span>
              {nudge.type && (
                <span className={`text-xs px-2 py-1 rounded ${getNudgeTypeStyle(nudge.type)}`}>
                  {nudge.type}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{nudge.content || "No content available"}</p>
          </CardContent>
          <CardFooter className="border-t pt-3 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {formatDate(nudge.createdAt || new Date())}
            </span>
            {!nudge.read && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => markNudgeAsRead(nudge.id)}
              >
                <Check className="mr-1 h-4 w-4" /> Mark as Read
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

// Helper function to get styles based on nudge type
const getNudgeTypeStyle = (type: string) => {
  switch (type.toLowerCase()) {
    case 'reminder':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'achievement':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'alert':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'tip':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300';
  }
};

// Helper function to format date
const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default NudgesList;
