
import React from 'react';
import { Button } from '@/components/ui/button';

interface StudyPlanFooterProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  onClose: () => void;
}

const StudyPlanFooter = ({ isEditing, setIsEditing, onClose }: StudyPlanFooterProps) => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="flex justify-between w-full">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button className="bg-gradient-to-r from-sky-500 to-violet-500 text-white">Save Changes</Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button 
              className="bg-gradient-to-r from-sky-500 to-violet-500 text-white"
              onClick={() => setIsEditing(true)}
            >
              Edit Study Plan
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudyPlanFooter;
