
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ArrowRight, ArrowLeft, Calendar as CalendarIcon, Target, BarChart, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import SubjectsStep from '@/components/dashboard/student/onboarding/SubjectsStep';
import { useStudyPlanWizard } from '@/components/dashboard/student/academic/hooks/useStudyPlanWizard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  const examGoals = ['NEET', 'JEE', 'CAT', 'UPSC', 'GATE', 'SSC', 'Banking', 'Other'];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Choose Your Exam</h2>
                <p className="text-muted-foreground">Select the exam you're preparing for</p>
              </div>
              <div className="bg-blue-600 rounded-full p-2">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {examGoals.map((goal) => (
                <Button
                  key={goal}
                  variant={formData.examGoal === goal ? "default" : "outline"}
                  className={cn("h-20 flex flex-col", 
                    formData.examGoal === goal && "border-2 border-primary bg-primary/10")}
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
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Set Your Target Date</h2>
                <p className="text-muted-foreground">When is your exam?</p>
              </div>
              <div className="bg-violet-600 rounded-full p-2">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <Card className="p-4 border-2 border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-900/20">
              <div className="font-bold text-xl mb-2 text-blue-800 dark:text-blue-400">
                {formData.examGoal || 'Your Exam'}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Setting a target date helps us structure your study plan most effectively
              </p>
            </Card>
            
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
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-h-[400px] overflow-y-auto pr-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Your Subjects</h2>
                <p className="text-muted-foreground">How comfortable are you with each subject?</p>
              </div>
              <div className="bg-green-600 rounded-full p-2">
                <BarChart className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <Card className="p-4 mb-4 border-2 border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-900/20">
              <Badge className="bg-blue-600 mb-2">{formData.examGoal}</Badge>
              <p className="text-sm text-muted-foreground">
                Mark subjects based on your current knowledge level to personalize your plan
              </p>
            </Card>
            
            <SubjectsStep
              examType={formData.examGoal || ''}
              strongSubjects={strongSubjects}
              weakSubjects={weakSubjects}
              handleToggleSubject={handleToggleSubject}
              mediumSubjects={mediumSubjects}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Study Hours</h2>
                <p className="text-muted-foreground">How many hours can you study each day?</p>
              </div>
              <div className="bg-amber-600 rounded-full p-2">
                <Flame className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <Card className="p-4 mb-4 border-2 border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-900/20">
              <div className="font-bold text-lg mb-1 text-blue-800 dark:text-blue-400">
                {formData.examGoal} Preparation
              </div>
              {formData.examDate && (
                <Badge variant="outline" className="mb-2">
                  Target: {format(new Date(formData.examDate), "PP")}
                </Badge>
              )}
              <p className="text-sm text-muted-foreground">
                {weakSubjects.length > 0 && (
                  <span>Focus areas: {weakSubjects.join(', ')} </span>
                )}
              </p>
            </Card>
            
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
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Study Preferences</h2>
                <p className="text-muted-foreground">When do you prefer to study?</p>
              </div>
            </div>
            
            <Card className="p-4 mb-4 border-2 border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-900/20">
              <div className="font-bold text-lg mb-1 text-blue-800 dark:text-blue-400">
                {formData.examGoal} - {formData.studyHoursPerDay} hours daily
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Customize when you study most effectively</p>
              </div>
            </Card>
            
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
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Study Pace</h2>
                <p className="text-muted-foreground">How would you describe your ideal learning pace?</p>
              </div>
            </div>
            
            <Card className="p-4 mb-4 border-2 border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-900/20">
              <div className="font-bold text-lg mb-1 text-blue-800 dark:text-blue-400">
                Final Step for Your {formData.examGoal} Plan
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Choose your preferred learning pace to complete your personalized plan</p>
              </div>
            </Card>
            
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
          <DialogTitle className="text-center text-xl">
            <span className="gradient-text font-bold">Create Your Study Plan</span>
          </DialogTitle>
        </DialogHeader>
        <div className="my-4 overflow-y-auto pr-1">{renderStep()}</div>
        <DialogFooter className="flex justify-between sm:justify-between mt-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
            {step === 6 ? "Create Plan" : "Next"}
            {step !== 6 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
