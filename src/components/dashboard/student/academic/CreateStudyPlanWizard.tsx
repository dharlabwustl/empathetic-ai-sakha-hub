
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStudyPlanWizard } from '@/hooks/useStudyPlanWizard';
import { Calendar, Clock, Target, BookOpen } from 'lucide-react';

interface CreateStudyPlanWizardProps {
  onPlanCreated?: (plan: any) => void;
  onClose?: () => void;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  onPlanCreated,
  onClose
}) => {
  const {
    currentStep,
    wizardData,
    updateWizardData,
    nextStep,
    prevStep,
    generatePlan,
    resetWizard
  } = useStudyPlanWizard();

  const handleFinish = () => {
    const plan = generatePlan();
    onPlanCreated?.(plan);
    resetWizard();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose Your Exam Goal</h3>
            <div className="grid grid-cols-2 gap-3">
              {['JEE Main', 'JEE Advanced', 'NEET', 'BITSAT'].map((exam) => (
                <Button
                  key={exam}
                  variant={wizardData.examGoal === exam ? 'default' : 'outline'}
                  onClick={() => updateWizardData({ examGoal: exam })}
                  className="h-16"
                >
                  {exam}
                </Button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Subjects</h3>
            <div className="grid grid-cols-1 gap-3">
              {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map((subject) => (
                <Button
                  key={subject}
                  variant={wizardData.subjects.includes(subject) ? 'default' : 'outline'}
                  onClick={() => {
                    const newSubjects = wizardData.subjects.includes(subject)
                      ? wizardData.subjects.filter(s => s !== subject)
                      : [...wizardData.subjects, subject];
                    updateWizardData({ subjects: newSubjects });
                  }}
                >
                  {subject}
                </Button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Study Schedule</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Daily Study Hours</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={wizardData.studyHours}
                  onChange={(e) => updateWizardData({ studyHours: parseInt(e.target.value) })}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Target Date</label>
                <input
                  type="date"
                  value={wizardData.targetDate.toISOString().split('T')[0]}
                  onChange={(e) => updateWizardData({ targetDate: new Date(e.target.value) })}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Plan</h3>
            <div className="space-y-2">
              <p><strong>Exam:</strong> {wizardData.examGoal}</p>
              <p><strong>Subjects:</strong> {wizardData.subjects.join(', ')}</p>
              <p><strong>Daily Hours:</strong> {wizardData.studyHours}</p>
              <p><strong>Target Date:</strong> {wizardData.targetDate.toLocaleDateString()}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Create Study Plan - Step {currentStep} of 4
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? onClose : prevStep}
            >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>
            
            <Button
              onClick={currentStep === 4 ? handleFinish : nextStep}
              disabled={
                (currentStep === 1 && !wizardData.examGoal) ||
                (currentStep === 2 && wizardData.subjects.length === 0)
              }
            >
              {currentStep === 4 ? 'Create Plan' : 'Next'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateStudyPlanWizard;
