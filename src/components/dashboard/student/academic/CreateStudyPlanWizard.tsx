
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

  const subjects = getSubjectsForGoal(formData.examGoal);
  
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
        <WizardHeader />

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

            {step === 2 && (
              <ExamDateStep 
                examDate={formData.examDate}
                setExamDate={(date) => setFormData(prev => ({ ...prev, examDate: date || new Date() }))}
              />
            )}

            {step === 3 && (
              <StudyHoursStep
                studyHours={formData.studyHoursPerDay}
                setStudyHours={(hours) => setFormData(prev => ({ ...prev, studyHoursPerDay: hours }))}
                normalizedGoalTitle={formData.examGoal}
              />
            )}

            {step === 4 && (
              <SubjectsStep
                subjects={[...strongSubjectsTyped, ...weakSubjectsTyped]}
                setSubjects={() => {}}
                examType={formData.examGoal}
                strongSubjects={strongSubjects}
                weakSubjects={weakSubjects}
                handleToggleSubject={handleToggleSubject}
              />
            )}

            {step === 5 && (
              <StudyTimeStep
                studyTime={formData.preferredStudyTime.charAt(0).toUpperCase() + formData.preferredStudyTime.slice(1) as "Morning" | "Afternoon" | "Evening" | "Night"}
                setStudyTime={handleStudyTimeChange}
              />
            )}

            {step === 6 && (
              <StudyPaceStep
                studyPace={formData.learningPace === 'slow' ? 'Relaxed' : 
                          formData.learningPace === 'moderate' ? 'Balanced' : 'Aggressive'}
                setStudyPace={handlePaceChange}
              />
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="w-full flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleNext}>
              {step === 6 ? 'Generate Plan' : 'Next'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
