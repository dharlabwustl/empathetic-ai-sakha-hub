
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ArrowRight, ArrowLeft, Calendar as CalendarIcon, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import SubjectsStep from '@/components/dashboard/student/onboarding/SubjectsStep';
import { useStudyPlanWizard } from '@/components/dashboard/student/academic/hooks/useStudyPlanWizard';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  const navigate = useNavigate();
  const {
    step,
    formData,
    setFormData,
    strongSubjects,
    weakSubjects,
    handleToggleSubject,
    handlePaceChange,
    handleStudyTimeChange,
    handleExamGoalSelect,
    handleNext,
    handleBack
  } = useStudyPlanWizard({ 
    examGoal, 
    onCreatePlan: (plan) => {
      onCreatePlan(plan);
      // Navigate to academic advisor page after plan creation
      setTimeout(() => {
        navigate('/dashboard/student/academic');
      }, 300);
    }, 
    onClose 
  });

  // Define common exam goals
  const examGoals = [
    'NEET', 'JEE Main', 'JEE Advanced', 'UPSC', 'CAT', 'GATE', 
    'Bank PO', 'SSC', 'GMAT', 'GRE'
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Choose Your Exam</h2>
              <p className="text-muted-foreground">Select the exam you're preparing for</p>
              
              <Alert className="mt-3 bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Creating a new study plan will reset your current progress. Only create a new plan if you're changing exams or want to start fresh.
                </AlertDescription>
              </Alert>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {examGoals.map((goal) => (
                <Tooltip key={goal}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={formData.examGoal === goal ? "default" : "outline"}
                      className={cn("h-20 flex flex-col", 
                        formData.examGoal === goal && "border-2 border-primary")}
                      onClick={() => handleExamGoalSelect(goal)}
                    >
                      <span>{goal}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set your study plan for {goal}</p>
                  </TooltipContent>
                </Tooltip>
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
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.examDate ? new Date(formData.examDate) : undefined}
                    onSelect={(date) => 
                      setFormData(prev => ({ ...prev, examDate: date || new Date() }))}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-muted-foreground">
                Setting your exam date helps us create a properly paced study plan
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-h-[400px] overflow-y-auto pr-2">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Your Subjects</h2>
              <p className="text-muted-foreground">
                Select your strong and weak subjects to personalize your plan
              </p>
            </div>
            <SubjectsStep
              examType={formData.examGoal}
              strongSubjects={strongSubjects}
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
              <p className="text-sm text-muted-foreground">
                Be realistic about how much time you can dedicate each day
              </p>
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
                value={formData.preferredStudyTime || "evening"}
                onValueChange={(value) => {
                  const studyTime = value as 'morning' | 'afternoon' | 'evening' | 'night';
                  setFormData(prev => ({ ...prev, preferredStudyTime: studyTime }));
                }}
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
              value={formData.learningPace || "moderate"}
              onValueChange={(value) => {
                const pace = value as 'slow' | 'moderate' | 'fast';
                setFormData(prev => ({ ...prev, learningPace: pace }));
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="slow" id="relaxed" />
                <Label htmlFor="relaxed">Relaxed - I need more time to understand concepts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderate" id="balanced" />
                <Label htmlFor="balanced">Balanced - I prefer a moderate pace</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fast" id="aggressive" />
                <Label htmlFor="aggressive">Aggressive - I want to cover as much as possible quickly</Label>
              </div>
            </RadioGroup>

            <Alert className="mt-3 bg-green-50 text-green-800 border-green-200">
              <Info className="h-4 w-4" />
              <AlertDescription>
                After creating your plan, you'll be taken to the Academic Advisor where you can view and manage it.
              </AlertDescription>
            </Alert>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{step === 1 ? "Create New Study Plan" : `${formData.examGoal} Study Plan - Step ${step}/6`}</DialogTitle>
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
