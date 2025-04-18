
import React from 'react';
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ExamDateStep from "../../student/onboarding/ExamDateStep";
import StudyHoursStep from "../../student/onboarding/StudyHoursStep";
import StudyTimeStep from "../../student/onboarding/StudyTimeStep";
import StudyPaceStep from "../../student/onboarding/StudyPaceStep";
import SubjectsStep from "../../student/onboarding/SubjectsStep";
import { getSubjectsForGoal } from "../../student/onboarding/SubjectData";
import type { NewStudyPlan, NewStudyPlanSubject } from "@/types/user/studyPlan";
import WizardHeader from './components/WizardHeader';
import WizardProgress from './components/WizardProgress';
import { useStudyPlanWizard } from './hooks/useStudyPlanWizard';
import GoalStep from "@/components/signup/steps/GoalStep";
import OnboardingStepContent from "../../student/onboarding/components/OnboardingStepContent";

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
                <GoalStep 
                  role={undefined}
                  onGoalSelect={handleExamGoalSelect}
                />
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
