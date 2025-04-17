
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UserProfileType } from '@/types/user';

export interface StudyPlanDialogProps {
  onClose: () => void;
  userProfile: UserProfileType;
}

const StudyPlanDialog: React.FC<StudyPlanDialogProps> = ({ onClose, userProfile }) => {
  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Study Plan for {userProfile.name}</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Today's Study Plan</h3>
          {/* Study plan content would go here */}
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
              <h4 className="font-medium">Physics</h4>
              <p className="text-sm text-muted-foreground">Newton's Laws of Motion - 1 hour</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
              <h4 className="font-medium">Mathematics</h4>
              <p className="text-sm text-muted-foreground">Integration Practice - 45 minutes</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
              <h4 className="font-medium">Chemistry</h4>
              <p className="text-sm text-muted-foreground">Organic Chemistry Review - 1 hour</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button>Start Studying</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDialog;
