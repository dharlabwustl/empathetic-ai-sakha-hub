
import React from 'react';
import { X, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudyPlanHeaderProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  onClose: () => void;
}

const StudyPlanHeader = ({ isEditing, setIsEditing, onClose }: StudyPlanHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-gradient-to-r from-sky-500/90 to-violet-500/90 backdrop-blur-md p-5 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">Your Smart Study Plan</h2>
      <div className="flex gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit size={20} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X size={24} />
        </Button>
      </div>
    </div>
  );
};

export default StudyPlanHeader;
