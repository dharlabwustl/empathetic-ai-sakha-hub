
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ExamDateStep from "../../student/onboarding/ExamDateStep";
import StudyHoursStep from "../../student/onboarding/StudyHoursStep";
import StudyTimeStep from "../../student/onboarding/StudyTimeStep";
import StudyPaceStep from "../../student/onboarding/StudyPaceStep";
import SubjectsStep from "../../student/onboarding/SubjectsStep";
import type { NewStudyPlan } from "@/types/user/studyPlan";

interface CreateStudyPlanWizardProps {
  isOpen: boolean;
  onClose: () => void;
  examGoal?: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  isOpen,
  onClose,
  examGoal = "IIT-JEE",
  onCreatePlan
}) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<NewStudyPlan>({
    examGoal,
    examDate: new Date(),
    subjects: [],
    studyHoursPerDay: 6,
    preferredStudyTime: 'morning',
    learningPace: 'moderate'
  });

  const handlePaceChange = (pace: string) => {
    let learningPace: 'slow' | 'moderate' | 'fast';
    switch (pace) {
      case 'Relaxed':
        learningPace = 'slow';
        break;
      case 'Balanced':
        learningPace = 'moderate';
        break;
      case 'Aggressive':
        learningPace = 'fast';
        break;
      default:
        learningPace = 'moderate';
    }
    setFormData(prev => ({ ...prev, learningPace }));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onCreatePlan(formData);
      onClose();
      toast({
        title: "Study Plan Created",
        description: "Your personalized study plan has been generated successfully.",
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Study Plan</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              {[1, 2, 3, 4, 5].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step === stepNumber ? 'bg-indigo-600 text-white' : 
                    step > stepNumber ? 'bg-green-500 text-white' : 
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                  </div>
                  {stepNumber < 5 && (
                    <div className={`h-1 w-10 ${
                      step > stepNumber ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {step === 1 && (
              <ExamDateStep 
                examDate={formData.examDate}
                setExamDate={(date) => setFormData(prev => ({ ...prev, examDate: date || new Date() }))}
              />
            )}

            {step === 2 && (
              <StudyHoursStep
                studyHours={formData.studyHoursPerDay}
                setStudyHours={(hours) => setFormData(prev => ({ ...prev, studyHoursPerDay: hours }))}
                normalizedGoalTitle={formData.examGoal}
              />
            )}

            {step === 3 && (
              <SubjectsStep
                subjects={formData.subjects}
                setSubjects={(subjects) => setFormData(prev => ({ ...prev, subjects }))}
                examType={formData.examGoal}
              />
            )}

            {step === 4 && (
              <StudyTimeStep
                studyTime={formData.preferredStudyTime}
                setStudyTime={(time) => {
                  // Convert the time string to lowercase to match our type
                  const preferredStudyTime = time.toLowerCase() as 'morning' | 'afternoon' | 'evening' | 'night';
                  setFormData(prev => ({ ...prev, preferredStudyTime }));
                }}
              />
            )}

            {step === 5 && (
              <StudyPaceStep
                studyPace={formData.learningPace === 'slow' ? 'Relaxed' : 
                          formData.learningPace === 'moderate' ? 'Balanced' : 'Aggressive'}
                setStudyPace={handlePaceChange}
              />
            )}
          </div>
        </div>

        <DialogFooter>
          <div className="w-full flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button onClick={handleNext}>
              {step === 5 ? 'Generate Plan' : 'Next'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
