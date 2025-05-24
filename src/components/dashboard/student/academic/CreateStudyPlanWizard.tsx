
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ArrowRight, ArrowLeft, Calendar as CalendarIcon, Clock, BookOpen, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';
import SubjectsStep from '@/components/dashboard/student/onboarding/SubjectsStep';
import { useStudyPlanWizard } from '@/components/dashboard/student/academic/hooks/useStudyPlanWizard';
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

  // Progress calculation
  const totalSteps = 6;
  const progressPercent = Math.round((step / totalSteps) * 100);

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
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium text-blue-800 dark:text-blue-300">Exam Goal: {formData.examGoal}</h3>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  We'll create a personalized study plan based on your target date and exam goal.
                </p>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-h-[400px] overflow-y-auto pr-2">
            <div className="mb-4 sticky top-0 z-10 bg-white dark:bg-gray-950 pt-2 pb-2">
              <h2 className="text-xl font-semibold mb-1">Subject Proficiency</h2>
              <p className="text-muted-foreground">
                Choose your strong, average, and weak subjects for {formData.examGoal}
              </p>
              <div className="flex gap-2 mt-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Strong</Badge>
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Average</Badge>
                <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Weak</Badge>
              </div>
            </div>
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
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md text-center">
                  <Clock className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-blue-700 dark:text-blue-400">Weekly Hours</p>
                  <p className="font-bold text-lg text-blue-800 dark:text-blue-300">
                    {formData.studyHoursPerDay ? formData.studyHoursPerDay * 7 : 0}
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md text-center">
                  <BookOpen className="h-5 w-5 mx-auto mb-2 text-green-600" />
                  <p className="text-sm text-green-700 dark:text-green-400">Subjects</p>
                  <p className="font-bold text-lg text-green-800 dark:text-green-300">
                    {strongSubjects.length + weakSubjects.length + mediumSubjects.length}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md text-center">
                  <Gauge className="h-5 w-5 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-purple-700 dark:text-purple-400">Coverage</p>
                  <p className="font-bold text-lg text-purple-800 dark:text-purple-300">
                    {Math.min(formData.studyHoursPerDay ? formData.studyHoursPerDay * 5 : 0, 100)}%
                  </p>
                </div>
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
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md mt-4 border border-green-100 dark:border-green-800">
              <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">Ready to Create Your Plan</h3>
              <p className="text-sm text-green-700 dark:text-green-400 mb-1">
                Your personalized study plan for {formData.examGoal} will include:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-green-700 dark:text-green-400">
                <li>Daily and weekly schedule based on your availability</li>
                <li>Focus areas for your weak subjects</li>
                <li>Study materials tailored to your learning pace</li>
                <li>Progress tracking and study streak monitoring</li>
              </ul>
            </div>
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
          <DialogTitle className="flex items-center justify-between">
            <span>Create Study Plan</span>
            <Badge className="ml-2">{formData.examGoal}</Badge>
          </DialogTitle>
          
          {/* Progress bar */}
          <div className="w-full mt-2">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Step {step} of {totalSteps}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
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
