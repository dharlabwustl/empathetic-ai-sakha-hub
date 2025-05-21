
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Flag, Clock, BellRing } from 'lucide-react';
import { addDays, format } from 'date-fns';

interface RevisionSectionProps {
  conceptId: string;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

const RevisionSection: React.FC<RevisionSectionProps> = ({ 
  conceptId,
  isFlagged,
  onToggleFlag
}) => {
  // Get dates for spaced repetition
  const today = new Date();
  const nextRevisionDate = addDays(today, 3);
  const secondRevisionDate = addDays(today, 7);
  const thirdRevisionDate = addDays(today, 14);
  
  // Format dates
  const formatRevisionDate = (date: Date) => {
    return format(date, 'MMM dd');
  };
  
  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-700">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-indigo-500" /> 
            Revision Schedule
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-2 flex items-center gap-1 ${isFlagged ? 'text-amber-600 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'}`}
            onClick={onToggleFlag}
          >
            <Flag className="h-4 w-4" />
            {isFlagged ? 'Flagged' : 'Flag'}
          </Button>
        </div>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/10 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800/30">
          <div className="text-xs text-indigo-700 dark:text-indigo-300 mb-1 font-medium">
            Next Revision
          </div>
          <div className="flex justify-between items-center">
            <div className="font-medium">{formatRevisionDate(nextRevisionDate)}</div>
            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100/50">
              <Clock className="h-3 w-3 mr-1" /> Remind Me
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Spaced Repetition Schedule
          </h4>
          
          <div className="flex justify-between items-center text-xs py-1.5 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-1.5">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 h-5 w-5 rounded-full flex items-center justify-center font-medium">1</div>
              <span>First Review</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 dark:text-gray-300">{formatRevisionDate(nextRevisionDate)}</span>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 ml-1">
                <BellRing className="h-3 w-3 text-gray-400" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs py-1.5 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-1.5">
              <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 h-5 w-5 rounded-full flex items-center justify-center font-medium">2</div>
              <span>Reinforcement</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 dark:text-gray-300">{formatRevisionDate(secondRevisionDate)}</span>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 ml-1">
                <BellRing className="h-3 w-3 text-gray-400" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs py-1.5">
            <div className="flex items-center gap-1.5">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 h-5 w-5 rounded-full flex items-center justify-center font-medium">3</div>
              <span>Long-term Memory</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 dark:text-gray-300">{formatRevisionDate(thirdRevisionDate)}</span>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 ml-1">
                <BellRing className="h-3 w-3 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevisionSection;
