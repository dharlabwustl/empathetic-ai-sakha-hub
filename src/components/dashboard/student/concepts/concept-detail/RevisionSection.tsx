
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flag, Clock, Calendar } from 'lucide-react';

interface RevisionSectionProps {
  conceptId: string;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

const RevisionSection: React.FC<RevisionSectionProps> = ({ conceptId, isFlagged, onToggleFlag }) => {
  const [revisionSchedule, setRevisionSchedule] = useState<string | null>(null);

  const scheduleRevision = (timeframe: string) => {
    setRevisionSchedule(timeframe);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4 flex items-center">
          <Flag className="h-4 w-4 mr-2" /> Revision Planning
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">Revision Status:</div>
            <div>
              <Button 
                variant={isFlagged ? "default" : "outline"} 
                size="sm"
                onClick={onToggleFlag}
              >
                {isFlagged ? "Flagged" : "Not Flagged"}
              </Button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="text-sm text-gray-500 mb-2">Schedule revision for:</div>
            <div className="flex flex-col gap-2">
              {["Today", "Tomorrow", "Next week"].map((time) => (
                <Button 
                  key={time} 
                  variant={revisionSchedule === time ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => scheduleRevision(time)}
                >
                  {time === "Today" && <Clock className="h-3 w-3 mr-2" />}
                  {time === "Tomorrow" && <Calendar className="h-3 w-3 mr-2" />}
                  {time === "Next week" && <Calendar className="h-3 w-3 mr-2" />}
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {revisionSchedule && (
          <div className="mt-4 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-800 text-sm">
            Revision scheduled for {revisionSchedule}.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevisionSection;
