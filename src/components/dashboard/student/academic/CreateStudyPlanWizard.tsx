
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewStudyPlan } from '@/types/user/studyPlan';

export interface CreateStudyPlanWizardProps {
  open: boolean;
  onClose: () => void;
  examGoal?: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  open,
  onClose,
  examGoal = "NEET",
  onCreatePlan
}) => {
  // Mock implementation for now
  const handleCreateDummyPlan = () => {
    const newPlan: NewStudyPlan = {
      examGoal: examGoal || "NEET",
      examDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      subjects: [
        { name: "Physics", proficiency: "moderate" },
        { name: "Chemistry", proficiency: "weak" },
        { name: "Biology", proficiency: "strong" }
      ],
      studyHoursPerDay: 5,
      preferredStudyTime: "evening",
      learningPace: "moderate"
    };
    
    onCreatePlan(newPlan);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Study Plan</DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <p className="text-center text-muted-foreground">
            This is a placeholder for the study plan creation wizard.
          </p>
          
          <button 
            className="w-full mt-4 bg-primary text-white p-3 rounded-md"
            onClick={handleCreateDummyPlan}
          >
            Create Sample Study Plan
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
