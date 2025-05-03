
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ArrowRight, ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import SubjectsStep from '@/components/dashboard/student/onboarding/SubjectsStep';
import { useStudyPlanWizard } from './hooks/useStudyPlanWizard';

interface CreateStudyPlanWizardProps {
  isOpen: boolean;
  onClose: () => void;
  examGoal?: string;
  onCreatePlan: (plan: any) => void;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  isOpen,
  onClose,
  examGoal = '',
  onCreatePlan
}) => {
  const {
    step,
    formData,
    setFormData,
    strongSubjects,
    mediumSubjects,
    weakSubjects,
    handleToggleSubject,
    handlePaceChange,
    handleStudyTimeChange,
    handleExamGoalSelect,
    handleNext,
    handleBack
  } = useStudyPlanWizard({ examGoal, onCreatePlan, onClose });

  const examGoals = [
    'NEET', 'JEE Main', 'JEE Advanced', 'UPSC', 'CAT', 
    'GATE', 'Bank PO', 'SSC', 'CLAT', 'GMAT', 'GRE'
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Choose Your Exam</h2>
              <p className="text-muted-foreground">Select the exam you're preparing for</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {examGoals.map((goal) => (
                <Button
                  key={goal}
                  variant={formData.examGoal === goal ? "default" : "outline"}
                  className={cn("h-20 flex flex-col", 
                    formData.examGoal === goal && "border-2 border-primary")}
                  onClick={() => handleExamGoalSelect(goal)}
                >
                  <span>{goal}</span>
                </Button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Set Your Target Date</h2>
              <p className="text-muted-foreground">When is your exam?</p>
            </div>
            <div className="flex flex-col space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.examDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.examDate ? (
                      format(new Date(formData.examDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(formData.examDate)}
                    onSelect={(date) => 
                      setFormData(prev => ({ ...prev, examDate: date || new Date() }))}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-h-[400px] overflow-y-auto pr-2">
            <SubjectsStep
              examType={formData.examGoal}
              strongSubjects={strongSubjects}
              mediumSubjects={mediumSubjects}
              weakSubjects={weakSubjects}
              handleToggleSubject={handleToggleSubject}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Study Hours</h2>
              <p className="text-muted-foreground">How many hours can you study each day?</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studyHours">Hours per day</Label>
                <Input
                  id="studyHours"
                  type="number"
                  min="1"
                  max="16"
                  value={formData.studyHoursPerDay || ""}
                  onChange={(e) => 
                    setFormData(prev => ({ 
                      ...prev, 
                      studyHoursPerDay: e.target.value ? parseInt(e.target.value) : undefined 
                    }))
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Study Preferences</h2>
              <p className="text-muted-foreground">When do you prefer to study?</p>
            </div>
            <div className="space-y-5">
              <RadioGroup
                value={formData.preferredStudyTime}
                onValueChange={(value: 'morning' | 'afternoon' | 'evening' | 'night') => 
                  setFormData(prev => ({ ...prev, preferredStudyTime: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="morning" id="morning" />
                  <Label htmlFor="morning">Morning (5AM - 12PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="afternoon" id="afternoon" />
                  <Label htmlFor="afternoon">Afternoon (12PM - 5PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="evening" id="evening" />
                  <Label htmlFor="evening">Evening (5PM - 10PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="night" id="night" />
                  <Label htmlFor="night">Night (10PM - 5AM)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Study Pace</h2>
              <p className="text-muted-foreground">How would you describe your ideal learning pace?</p>
            </div>
            <RadioGroup
              value={
                formData.learningPace === 'slow' ? 'Relaxed' : 
                formData.learningPace === 'moderate' ? 'Balanced' : 'Aggressive'
              }
              onValueChange={(value: "Aggressive" | "Balanced" | "Relaxed") => handlePaceChange(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Relaxed" id="relaxed" />
                <Label htmlFor="relaxed">Relaxed - I need more time to understand concepts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Balanced" id="balanced" />
                <Label htmlFor="balanced">Balanced - I prefer a moderate pace</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Aggressive" id="aggressive" />
                <Label htmlFor="aggressive">Aggressive - I want to cover as much as possible quickly</Label>
              </div>
            </RadioGroup>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create Study Plan</DialogTitle>
        </DialogHeader>
        <div className="my-4 overflow-y-auto pr-1">{renderStep()}</div>
        <DialogFooter className="flex justify-between sm:justify-between mt-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext}>
            {step === 6 ? "Create Plan" : "Next"}
            {step !== 6 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
