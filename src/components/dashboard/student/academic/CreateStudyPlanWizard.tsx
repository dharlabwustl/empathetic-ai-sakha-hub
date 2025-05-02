
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useStudyPlanWizard } from '@/hooks/useStudyPlanWizard';
import { Button } from '@/components/ui/button';
import { NewStudyPlan } from '@/types/user/studyPlan';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CreateStudyPlanWizardProps {
  open: boolean;
  onClose: () => void;
  examGoal?: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  open,
  onClose,
  examGoal = '',
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
    handleExamGoalSelect,
    handleNext,
    handleBack
  } = useStudyPlanWizard({ examGoal, onCreatePlan, onClose });

  // Add a date state for exam date
  const [examDate, setExamDate] = useState<Date | undefined>(
    formData.examDate ? new Date(formData.examDate) : undefined
  );

  const handleDateChange = (date: Date | undefined) => {
    setExamDate(date);
    if (date) {
      setFormData(prev => ({ ...prev, examDate: date }));
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Your Exam Goal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['IIT-JEE', 'NEET', 'UPSC', 'CAT', 'GATE', 'Other'].map((goal) => (
                <Button 
                  key={goal}
                  variant={formData.goal === goal ? "default" : "outline"}
                  className="text-left justify-start h-auto py-3"
                  onClick={() => handleExamGoalSelect(goal)}
                >
                  {goal}
                </Button>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What are your strengths?</h3>
            <p className="text-sm text-muted-foreground">Select subjects you're confident in</p>
            <div className="grid grid-cols-2 gap-2">
              {getSubjectsForGoal(formData.goal).map((subject) => (
                <Button 
                  key={subject}
                  variant={strongSubjects.includes(subject) ? "default" : "outline"}
                  className="text-left justify-start h-auto"
                  onClick={() => handleToggleSubject(subject, 'strong')}
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
            <h3 className="text-lg font-medium">Areas to improve</h3>
            <p className="text-sm text-muted-foreground">Select subjects you find challenging</p>
            <div className="grid grid-cols-2 gap-2">
              {getSubjectsForGoal(formData.goal).map((subject) => (
                <Button 
                  key={subject}
                  variant={weakSubjects.includes(subject) ? "default" : "outline"} 
                  className="text-left justify-start h-auto"
                  onClick={() => handleToggleSubject(subject, 'weak')}
                  disabled={strongSubjects.includes(subject)}
                >
                  {subject}
                </Button>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">When is your exam?</h3>
            <p className="text-sm text-muted-foreground">Select your exam date to optimize your study plan</p>
            <div className="grid gap-2">
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
                    {examDate ? format(examDate, "PPP") : <span>Select exam date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={examDate}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Learning pace preference</h3>
            <p className="text-sm text-muted-foreground">How intensively do you want to study?</p>
            <div className="space-y-2">
              {["Relaxed", "Balanced", "Aggressive"].map((pace) => (
                <Button 
                  key={pace}
                  variant={(
                    pace === "Relaxed" && formData.learningPace === "slow") || 
                    (pace === "Balanced" && formData.learningPace === "moderate") || 
                    (pace === "Aggressive" && formData.learningPace === "fast") 
                      ? "default" : "outline"
                  }
                  className="w-full text-left justify-start h-auto py-3"
                  onClick={() => handlePaceChange(pace as "Relaxed" | "Balanced" | "Aggressive")}
                >
                  <div>
                    <div className="font-medium">{pace}</div>
                    <div className="text-xs text-muted-foreground">
                      {pace === "Relaxed" && "Steady progress, less pressure (1-2 hours daily)"}
                      {pace === "Balanced" && "Standard preparation pace (2-4 hours daily)"}
                      {pace === "Aggressive" && "Intensive preparation (4+ hours daily)"}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Preferred study time</h3>
            <p className="text-sm text-muted-foreground">When do you learn most effectively?</p>
            <div className="grid grid-cols-2 gap-2">
              {["Morning", "Afternoon", "Evening", "Night"].map((time) => (
                <Button 
                  key={time}
                  variant={formData.preferredStudyTime === time.toLowerCase() ? "default" : "outline"}
                  className="text-left justify-start h-auto py-3"
                  onClick={() => handleStudyTimeChange(time as "Morning" | "Afternoon" | "Evening" | "Night")}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        );
      
      case 7:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Summary</h3>
            <div className="bg-muted p-3 rounded-md space-y-2 text-sm">
              <div><strong>Exam Goal:</strong> {formData.goal}</div>
              <div><strong>Exam Date:</strong> {examDate ? format(examDate, "PPP") : 'Not specified'}</div>
              <div><strong>Strong Subjects:</strong> {strongSubjects.join(', ') || 'None selected'}</div>
              <div><strong>Weak Subjects:</strong> {weakSubjects.join(', ') || 'None selected'}</div>
              <div>
                <strong>Learning Pace:</strong> {
                  formData.learningPace === 'slow' ? 'Relaxed' : 
                  formData.learningPace === 'moderate' ? 'Balanced' : 'Aggressive'
                }
              </div>
              <div><strong>Preferred Study Time:</strong> {formData.preferredStudyTime}</div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Study Plan</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {renderStep()}
        </div>
        
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            onClick={handleBack}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={step === 4 && !examDate}
          >
            {step === 7 ? 'Create Plan' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to get subjects based on selected goal
function getSubjectsForGoal(goal: string): string[] {
  switch (goal) {
    case 'IIT-JEE':
      return ['Physics', 'Chemistry', 'Mathematics'];
    case 'NEET':
      return ['Physics', 'Chemistry', 'Biology'];
    case 'UPSC':
      return ['History', 'Geography', 'Polity', 'Economics', 'Science & Technology', 'Current Affairs'];
    case 'CAT':
      return ['Quantitative Aptitude', 'Verbal Ability', 'Data Interpretation', 'Logical Reasoning'];
    case 'GATE':
      return ['Engineering Mathematics', 'General Aptitude', 'Subject Specific'];
    default:
      return ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'];
  }
}

export default CreateStudyPlanWizard;
