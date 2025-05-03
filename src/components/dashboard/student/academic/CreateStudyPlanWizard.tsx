
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useStudyPlanWizard } from './hooks/useStudyPlanWizard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { CalendarIcon, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { NewStudyPlan } from '@/types/user/studyPlan';

export interface CreateStudyPlanWizardProps {
  examGoal?: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
  onClose: () => void;
  open: boolean;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  examGoal = '',
  onCreatePlan,
  onClose,
  open
}) => {
  const {
    step,
    formData,
    setFormData,
    strongSubjects,
    weakSubjects,
    examDate,
    handleExamDateChange,
    handleToggleSubject,
    handlePaceChange,
    handleStudyTimeChange,
    handleExamGoalSelect,
    handleNext,
    handleBack
  } = useStudyPlanWizard({ examGoal, onCreatePlan, onClose });

  // Available exam goals
  const examGoals = ['NEET'];

  // Exam subjects
  const neetSubjects = ['Physics', 'Chemistry', 'Biology', 'General Knowledge'];

  const getSubjects = () => {
    if (formData.examGoal?.includes('NEET')) return neetSubjects;
    return [];
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Select your exam</h2>
            <div className="grid gap-4">
              {examGoals.map((goal) => (
                <Button
                  key={goal}
                  variant={formData.examGoal === goal ? "default" : "outline"}
                  className="justify-start h-auto p-4 text-left"
                  onClick={() => handleExamGoalSelect(goal)}
                >
                  <div>
                    <div className="font-medium">{goal}</div>
                    <div className="text-sm text-muted-foreground">
                      Personalized study plan for {goal} preparation
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">When is your exam?</h2>
            
            <div className="grid gap-2">
              <Label>Exam Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !examDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {examDate ? format(examDate, "PPP") : <span>Select your exam date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={examDate}
                    onSelect={handleExamDateChange}
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
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Mark your stronger and weaker subjects</h2>
            
            <div className="space-y-4">
              <div className="text-sm font-medium">Stronger Subjects</div>
              <div className="grid grid-cols-2 gap-2">
                {getSubjects().map((subject) => (
                  <Button
                    key={`strong-${subject}`}
                    variant={strongSubjects.includes(subject) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggleSubject(subject, 'strong')}
                    className={`${strongSubjects.includes(subject) ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  >
                    {subject}
                  </Button>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="text-sm font-medium">Weaker Subjects</div>
              <div className="grid grid-cols-2 gap-2">
                {getSubjects().map((subject) => (
                  <Button
                    key={`weak-${subject}`}
                    variant={weakSubjects.includes(subject) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleToggleSubject(subject, 'weak')}
                    className={`${weakSubjects.includes(subject) ? 'bg-amber-600 hover:bg-amber-700' : ''}`}
                  >
                    {subject}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Study hours per day</h2>
            
            <div className="space-y-4">
              <Label>How many hours can you study daily?</Label>
              <Input 
                type="number" 
                min={1} 
                max={12}
                value={formData.studyHoursPerDay || 4}
                onChange={(e) => setFormData({...formData, studyHoursPerDay: parseInt(e.target.value)})}
              />
              
              <div className="text-sm text-muted-foreground mt-2">
                Recommended: 3-8 hours per day based on your schedule
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Preferred study time</h2>
            
            <RadioGroup 
              defaultValue={formData.preferredStudyTime}
              onValueChange={(value) => handleStudyTimeChange(value as "Morning" | "Afternoon" | "Evening" | "Night")}
            >
              <div className="grid grid-cols-1 gap-4">
                <Label className="flex items-center space-x-3 border rounded-md p-4 cursor-pointer">
                  <RadioGroupItem value="morning" />
                  <div>
                    <div className="font-medium">Morning (5 AM - 11 AM)</div>
                    <div className="text-sm text-muted-foreground">Early bird gets the worm</div>
                  </div>
                </Label>
                <Label className="flex items-center space-x-3 border rounded-md p-4 cursor-pointer">
                  <RadioGroupItem value="afternoon" />
                  <div>
                    <div className="font-medium">Afternoon (12 PM - 5 PM)</div>
                    <div className="text-sm text-muted-foreground">Steady energy through the day</div>
                  </div>
                </Label>
                <Label className="flex items-center space-x-3 border rounded-md p-4 cursor-pointer">
                  <RadioGroupItem value="evening" />
                  <div>
                    <div className="font-medium">Evening (5 PM - 9 PM)</div>
                    <div className="text-sm text-muted-foreground">After school/work hours</div>
                  </div>
                </Label>
                <Label className="flex items-center space-x-3 border rounded-md p-4 cursor-pointer">
                  <RadioGroupItem value="night" />
                  <div>
                    <div className="font-medium">Night (9 PM - 2 AM)</div>
                    <div className="text-sm text-muted-foreground">Night owl productivity</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Study pace</h2>
            
            <RadioGroup 
              defaultValue={formData.learningPace}
              onValueChange={(value) => handlePaceChange(value as "Aggressive" | "Balanced" | "Relaxed")}
            >
              <div className="grid grid-cols-1 gap-4">
                <Label className="flex items-center space-x-3 border rounded-md p-4 cursor-pointer">
                  <RadioGroupItem value="fast" />
                  <div>
                    <div className="font-medium">Aggressive</div>
                    <div className="text-sm text-muted-foreground">Cover more material in less time</div>
                  </div>
                </Label>
                <Label className="flex items-center space-x-3 border rounded-md p-4 cursor-pointer">
                  <RadioGroupItem value="moderate" />
                  <div>
                    <div className="font-medium">Balanced</div>
                    <div className="text-sm text-muted-foreground">Standard pace with good retention</div>
                  </div>
                </Label>
                <Label className="flex items-center space-x-3 border rounded-md p-4 cursor-pointer">
                  <RadioGroupItem value="slow" />
                  <div>
                    <div className="font-medium">Relaxed</div>
                    <div className="text-sm text-muted-foreground">Thorough understanding with extra practice</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        );
      
      default:
        return null;
    }
  };

  const progress = ((step) / 6) * 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Your Study Plan</DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-muted-foreground text-right mt-1">
            Step {step} of 6
          </div>
        </div>
        
        <div className="py-4">
          {getStepContent()}
        </div>
        
        <div className="flex justify-between pt-2">
          <Button 
            variant="outline" 
            onClick={handleBack}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={
              (step === 2 && !examDate) || 
              (step === 3 && strongSubjects.length === 0 && weakSubjects.length === 0)
            }
          >
            {step === 6 ? (
              <>
                Create Study Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
