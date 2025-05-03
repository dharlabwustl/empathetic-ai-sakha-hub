
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useStudyPlanWizard } from './hooks/useStudyPlanWizard';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { NewStudyPlan } from '@/types/user/studyPlan';

// Step components will be defined below
const Step1ExamGoal = ({ examGoal, onSelect }: { examGoal: string | undefined, onSelect: (goal: string) => void }) => {
  const goals = ['NEET', 'JEE', 'UPSC', 'CAT', 'GATE', 'Other'];
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Select the exam you are preparing for:</p>
      <div className="grid grid-cols-2 gap-3">
        {goals.map((goal) => (
          <Button
            key={goal}
            variant={examGoal === goal ? "default" : "outline"}
            className={cn(
              "h-16",
              examGoal === goal ? "border-primary" : ""
            )}
            onClick={() => onSelect(goal)}
          >
            {goal}
          </Button>
        ))}
      </div>
    </div>
  );
};

const Step2ExamDate = ({ date, onDateChange }: { date: Date | undefined, onDateChange: (date: Date) => void }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">When is your exam scheduled?</p>
      <div className="grid place-items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange as any}
              initialFocus
              disabled={(d) => d < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

const Step3Subjects = ({ 
  strongSubjects, 
  weakSubjects, 
  examGoal, 
  onToggle 
}: { 
  strongSubjects: string[], 
  weakSubjects: string[], 
  examGoal: string,
  onToggle: (subject: string, type: 'strong' | 'weak') => void 
}) => {
  // Sample subjects based on exam goal
  const getSubjects = () => {
    switch (examGoal) {
      case 'NEET':
        return ['Physics', 'Chemistry', 'Biology', 'Botany', 'Zoology', 'Organic Chemistry'];
      case 'JEE':
        return ['Physics', 'Chemistry', 'Mathematics', 'Algebra', 'Calculus', 'Mechanics'];
      case 'UPSC':
        return ['History', 'Geography', 'Polity', 'Economy', 'Science & Tech', 'Current Affairs'];
      case 'CAT':
        return ['Quantitative Aptitude', 'Data Interpretation', 'Verbal Ability', 'Logical Reasoning'];
      case 'GATE':
        return ['Engineering Mathematics', 'Computer Science', 'Data Structures', 'Algorithms', 'Digital Logic'];
      default:
        return ['Mathematics', 'Science', 'English', 'Social Studies'];
    }
  };

  const subjects = getSubjects();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Select your strong and weak subjects:</p>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Strong Subjects:</h3>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <Button
              key={`strong-${subject}`}
              variant={strongSubjects.includes(subject) ? "default" : "outline"}
              size="sm"
              onClick={() => onToggle(subject, 'strong')}
            >
              {subject}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Weak Subjects:</h3>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <Button
              key={`weak-${subject}`}
              variant={weakSubjects.includes(subject) ? "destructive" : "outline"}
              size="sm"
              onClick={() => onToggle(subject, 'weak')}
            >
              {subject}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Step4StudyTime = ({ 
  selectedTime, 
  onSelectTime 
}: { 
  selectedTime: "Morning" | "Afternoon" | "Evening" | "Night", 
  onSelectTime: (time: "Morning" | "Afternoon" | "Evening" | "Night") => void 
}) => {
  const timeOptions = [
    { label: "Morning", description: "6 AM - 12 PM" },
    { label: "Afternoon", description: "12 PM - 5 PM" },
    { label: "Evening", description: "5 PM - 9 PM" },
    { label: "Night", description: "9 PM - 6 AM" }
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">When do you prefer to study?</p>
      <div className="grid grid-cols-1 gap-3">
        {timeOptions.map((option) => (
          <Button
            key={option.label}
            variant={selectedTime === option.label ? "default" : "outline"}
            className={cn(
              "h-16 justify-start",
              selectedTime === option.label ? "border-primary" : ""
            )}
            onClick={() => onSelectTime(option.label as any)}
          >
            <div className="text-left">
              <div className="font-medium">{option.label}</div>
              <div className="text-xs text-muted-foreground">{option.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

const Step5StudyPace = ({ 
  selectedPace, 
  onSelectPace 
}: { 
  selectedPace: "Aggressive" | "Balanced" | "Relaxed", 
  onSelectPace: (pace: "Aggressive" | "Balanced" | "Relaxed") => void 
}) => {
  const paceOptions = [
    { label: "Aggressive", description: "Intense study schedule, faster progress" },
    { label: "Balanced", description: "Moderate pace with good work-life balance" },
    { label: "Relaxed", description: "Slower pace with more flexibility" }
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">What learning pace do you prefer?</p>
      <div className="grid grid-cols-1 gap-3">
        {paceOptions.map((option) => (
          <Button
            key={option.label}
            variant={selectedPace === option.label ? "default" : "outline"}
            className={cn(
              "h-16 justify-start",
              selectedPace === option.label ? "border-primary" : ""
            )}
            onClick={() => onSelectPace(option.label as any)}
          >
            <div className="text-left">
              <div className="font-medium">{option.label}</div>
              <div className="text-xs text-muted-foreground">{option.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

const Step6StudyHours = ({ 
  hours, 
  onHoursChange 
}: { 
  hours: number, 
  onHoursChange: (hours: number) => void 
}) => {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">How many hours can you study daily?</p>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm">Hours per day: <strong>{hours}</strong></span>
        </div>
        
        <Slider
          value={[hours]}
          min={1}
          max={12}
          step={1}
          onValueChange={(value) => onHoursChange(value[0])}
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 hour</span>
          <span>6 hours</span>
          <span>12 hours</span>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-md text-sm">
        <p className="text-blue-800 dark:text-blue-400">
          {hours < 4 
            ? "A minimum of 4 hours per day is recommended for optimal preparation."
            : hours > 8 
              ? "Make sure to include breaks in your schedule to avoid burnout."
              : "This is a good balanced schedule for effective learning."
          }
        </p>
      </div>
    </div>
  );
};

interface CreateStudyPlanWizardProps {
  isOpen: boolean;
  onClose: () => void;
  examGoal?: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  isOpen,
  onClose,
  examGoal: initialExamGoal,
  onCreatePlan
}) => {
  const {
    step,
    formData,
    strongSubjects,
    weakSubjects,
    handleToggleSubject,
    handlePaceChange,
    handleStudyTimeChange,
    handleExamGoalSelect,
    handleNext,
    handleBack,
    setFormData
  } = useStudyPlanWizard({
    examGoal: initialExamGoal || '',
    onCreatePlan,
    onClose
  });

  // Helper to get current step title
  const getStepTitle = () => {
    switch (step) {
      case 1: return "Select Exam Goal";
      case 2: return "Set Exam Date";
      case 3: return "Subject Proficiency";
      case 4: return "Study Time Preference";
      case 5: return "Learning Pace";
      case 6: return "Study Hours";
      default: return "Create Study Plan";
    }
  };

  // Helper to convert from state value to UI selection
  const getSelectedPace = (): "Aggressive" | "Balanced" | "Relaxed" => {
    switch (formData.learningPace) {
      case 'fast': return "Aggressive";
      case 'slow': return "Relaxed";
      default: return "Balanced";
    }
  };

  // Helper to convert from state value to UI selection
  const getSelectedTime = (): "Morning" | "Afternoon" | "Evening" | "Night" => {
    switch (formData.preferredStudyTime) {
      case 'morning': return "Morning";
      case 'afternoon': return "Afternoon";
      case 'night': return "Night";
      default: return "Evening";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getStepTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {/* Stepper display */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div 
                key={s} 
                className={`w-9 h-1 rounded-full ${
                  s === step 
                    ? "bg-primary" 
                    : s < step 
                      ? "bg-primary/40"
                      : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>

          {/* Step content */}
          <div className="min-h-[300px]">
            {step === 1 && (
              <Step1ExamGoal 
                examGoal={formData.examGoal} 
                onSelect={handleExamGoalSelect} 
              />
            )}
            
            {step === 2 && (
              <Step2ExamDate 
                date={formData.examDate instanceof Date ? formData.examDate : new Date()} 
                onDateChange={(date) => setFormData({ ...formData, examDate: date })} 
              />
            )}
            
            {step === 3 && (
              <Step3Subjects 
                strongSubjects={strongSubjects.map(s => s.name)} 
                weakSubjects={weakSubjects.map(s => s.name)} 
                examGoal={formData.examGoal}
                onToggle={handleToggleSubject} 
              />
            )}
            
            {step === 4 && (
              <Step4StudyTime 
                selectedTime={getSelectedTime()} 
                onSelectTime={handleStudyTimeChange} 
              />
            )}
            
            {step === 5 && (
              <Step5StudyPace 
                selectedPace={getSelectedPace()} 
                onSelectPace={handlePaceChange} 
              />
            )}
            
            {step === 6 && (
              <Step6StudyHours 
                hours={formData.studyHoursPerDay} 
                onHoursChange={(hours) => setFormData({ ...formData, studyHoursPerDay: hours })} 
              />
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handleBack}
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.examGoal) || 
                (step === 2 && !formData.examDate)
              }
            >
              {step === 6 ? "Create Plan" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
