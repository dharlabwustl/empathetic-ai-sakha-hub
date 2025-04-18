
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getSubjectsForGoal } from "../../student/onboarding/SubjectData";
import type { NewStudyPlan, NewStudyPlanSubject } from "@/types/user/studyPlan";
import WizardHeader from './components/WizardHeader';
import WizardProgress from './components/WizardProgress';
import { useStudyPlanWizard } from './hooks/useStudyPlanWizard';
import OnboardingStepContent from "../../student/onboarding/components/OnboardingStepContent";
import { UserRole } from "@/components/signup/OnboardingContext";

interface CreateStudyPlanWizardProps {
  isOpen: boolean;
  onClose: () => void;
  examGoal?: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  isOpen,
  onClose,
  examGoal = "",
  onCreatePlan
}) => {
  const {
    step,
    formData,
    setFormData,
    strongSubjects,
    weakSubjects,
    handleToggleSubject,
    handlePaceChange,
    handleStudyTimeChange,
    handleNext,
    handleBack,
    handleExamGoalSelect
  } = useStudyPlanWizard({ examGoal, onCreatePlan, onClose });

  // Convert string arrays to NewStudyPlanSubject arrays for type compatibility
  const strongSubjectsTyped: NewStudyPlanSubject[] = strongSubjects.map(
    subject => ({ name: subject, proficiency: 'strong' })
  );
  
  const weakSubjectsTyped: NewStudyPlanSubject[] = weakSubjects.map(
    subject => ({ name: subject, proficiency: 'weak' })
  );

  // These are the same exam goals as defined in GoalStep.tsx
  const studentGoals = [
    "IIT JEE (Engineering Entrance)",
    "NEET (Medical Entrance)",
    "MBA (CAT, XAT, SNAP, CMAT, etc.)",
    "CUET UG (Undergraduate Common Entrance Test)",
    "UPSC (Civil Services – Prelims & Mains)",
    "CLAT (Law Entrance)",
    "BANK PO (Bank Probationary Officer Exams)"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
        <WizardHeader examGoal={formData.examGoal} />

        <div className="py-4 text-gray-900 dark:text-gray-100">
          <div className="mb-6">
            <WizardProgress currentStep={step} />

            {step === 1 && (
              <div className="px-1 py-4">
                <h2 className="text-xl font-semibold mb-4">Select Exam Goal</h2>
                <div className="grid grid-cols-1 gap-3">
                  {studentGoals.map((goal) => (
                    <Button
                      key={goal}
                      onClick={() => handleExamGoalSelect(goal)}
                      className={`bg-white hover:bg-blue-50 text-blue-700 border h-auto py-3 justify-start ${
                        formData.examGoal === goal 
                          ? "border-blue-500 bg-blue-50 shadow-sm" 
                          : "border-blue-200"
                      }`}
                      variant="outline"
                    >
                      {goal}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step > 1 && (
              <OnboardingStepContent
                currentStep={step - 1}
                examDate={formData.examDate}
                studyHours={formData.studyHoursPerDay}
                strongSubjects={strongSubjectsTyped}
                weakSubjects={weakSubjectsTyped}
                studyPace={formData.learningPace === 'slow' ? 'Relaxed' : 
                          formData.learningPace === 'moderate' ? 'Balanced' : 'Aggressive'}
                studyTime={formData.preferredStudyTime.charAt(0).toUpperCase() + formData.preferredStudyTime.slice(1) as "Morning" | "Afternoon" | "Evening" | "Night"}
                examGoal={formData.examGoal}
                setExamDate={(date) => setFormData(prev => ({ ...prev, examDate: date || new Date() }))}
                setStudyHours={(hours) => setFormData(prev => ({ ...prev, studyHoursPerDay: hours }))}
                handleToggleSubject={handleToggleSubject}
                setStudyPace={handlePaceChange}
                setStudyTime={handleStudyTimeChange}
              />
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="w-full flex justify-between">
            <Button variant="outline" onClick={handleBack} className="min-w-[100px]">
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[100px]" 
              onClick={handleNext}
              disabled={step === 1 && !formData.examGoal}
            >
              {step === 6 ? 'Generate Plan' : 'Next'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
