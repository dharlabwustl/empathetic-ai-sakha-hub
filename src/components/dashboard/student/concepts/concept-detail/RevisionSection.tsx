
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';

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
  // In a real app, this would come from your spaced repetition algorithm
  const nextRevisionData = {
    date: "Tomorrow",
    time: "10:00 AM",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Revision Schedule</h3>
      
      <div className="space-y-3">
        {isFlagged ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                <span>Next revision:</span>
              </div>
              <span className="text-sm font-medium">{nextRevisionData.date}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Clock className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                <span>Suggested time:</span>
              </div>
              <span className="text-sm font-medium">{nextRevisionData.time}</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 justify-center text-amber-600 border-amber-200 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/20"
              onClick={onToggleFlag}
            >
              Remove from Revision
            </Button>
          </>
        ) : (
          <div className="text-center py-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Add this concept to your revision schedule to improve retention.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-center"
              onClick={onToggleFlag}
            >
              Add to Revision Schedule
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevisionSection;
