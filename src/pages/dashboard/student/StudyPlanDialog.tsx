import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserProfileType } from "@/types/user";

interface StudyPlanDialogProps {
  userProfile: UserProfileType;
  onClose: () => void;
}

const StudyPlanDialog = ({ userProfile, onClose }: StudyPlanDialogProps) => {
  // Get exam preparation safely with type checking
  let examPreparation = "General Studies";
  if (userProfile.role === "student" && 'examPreparation' in userProfile) {
    examPreparation = userProfile.examPreparation || "General Studies";
  }
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Study Plan</DialogTitle>
          <DialogDescription>
            Personalized study plan for {examPreparation}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Today's Focus Areas</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>Physics: Kinematics</span>
                <span className="text-sm text-muted-foreground">45 min</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Chemistry: Organic Chemistry</span>
                <span className="text-sm text-muted-foreground">30 min</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Mathematics: Integration</span>
                <span className="text-sm text-muted-foreground">60 min</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Recommended Resources</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>Physics Video Lecture: Newton's Laws</span>
                <Button variant="link" size="sm" className="p-0 h-auto">View</Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Chemistry Practice Quiz: Organic Compounds</span>
                <Button variant="link" size="sm" className="p-0 h-auto">Start</Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Math Problem Set: Integration Techniques</span>
                <Button variant="link" size="sm" className="p-0 h-auto">Download</Button>
              </li>
            </ul>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Weekly Goals Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Complete Physics Module 3</span>
                  <span>75%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Solve 50 Math Problems</span>
                  <span>60%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Complete Chemistry Quiz</span>
                  <span>100%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Customize Plan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDialog;
