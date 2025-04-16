
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserProfileType } from '@/types/user';

export interface StudyPlanModalProps {
  isOpen?: boolean;
  onClose: () => void;
  user?: UserProfileType;
}

const StudyPlanModal: React.FC<StudyPlanModalProps> = ({
  isOpen = true,
  onClose,
  user
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Your Study Plan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <p className="text-muted-foreground">
            {user?.name ? `Here's your personalized study plan, ${user.name}.` : 'Here is your personalized study plan.'}
          </p>
          
          <div className="h-64 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
            <p className="text-gray-400">Study plan content will be available soon</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanModal;
