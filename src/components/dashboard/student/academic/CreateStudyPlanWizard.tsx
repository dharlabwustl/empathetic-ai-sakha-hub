
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { StudyPlan } from '@/types/user/studyPlan';

interface CreateStudyPlanWizardProps {
  isOpen: boolean;
  onClose: () => void;
  examGoal?: string;
  onCreatePlan: (plan: StudyPlan) => void;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  isOpen,
  onClose,
  examGoal = '',
  onCreatePlan
}) => {
  const [step, setStep] = useState(1);
  const [selectedExamGoal, setSelectedExamGoal] = useState(examGoal);
  const [examDate, setExamDate] = useState<Date | undefined>(undefined);
  const [studyPace, setStudyPace] = useState<'slow' | 'moderate' | 'fast'>('moderate');
  const [studyTime, setStudyTime] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('evening');
  const [studyHours, setStudyHours] = useState(3);

  const examGoals = [
    "NEET", "JEE Mains", "JEE Advanced", "CAT", "GATE", "UPSC", 
    "GRE", "GMAT", "SAT", "TOEFL", "IELTS", "Other"
  ];

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleCreatePlan();
    }
  };

  const handleCreatePlan = () => {
    // Create a new study plan object
    const newPlan: StudyPlan = {
      id: `plan_${Date.now()}`,
      userId: 'user123',
      goal: selectedExamGoal,
      examDate: examDate ? examDate.toISOString() : new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subjects: [
        {
          id: `subject_${Date.now()}_1`,
          name: 'Subject 1',
          color: '#8B5CF6',
          hoursPerWeek: 5,
          priority: 'high',
          completed: false
        }
      ],
      weeklyHours: studyHours * 7,
      status: 'active',
      studyHoursPerDay: studyHours,
      preferredStudyTime: studyTime,
      learningPace: studyPace,
      progressPercentage: 0,
      daysLeft: examDate ? Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 90
    };
    
    onCreatePlan(newPlan);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setSelectedExamGoal(examGoal);
    setExamDate(undefined);
    setStudyPace('moderate');
    setStudyTime('evening');
    setStudyHours(3);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="exam-goal">Select Exam Goal</Label>
              <Select 
                value={selectedExamGoal} 
                onValueChange={setSelectedExamGoal}
              >
                <SelectTrigger id="exam-goal">
                  <SelectValue placeholder="Select an exam" />
                </SelectTrigger>
                <SelectContent>
                  {examGoals.map((goal) => (
                    <SelectItem key={goal} value={goal}>
                      {goal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Exam Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !examDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {examDate ? format(examDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={examDate}
                    onSelect={setExamDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Preferred Study Time</Label>
              <RadioGroup 
                value={studyTime} 
                onValueChange={(value) => setStudyTime(value as 'morning' | 'afternoon' | 'evening' | 'night')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="morning" id="morning" />
                  <Label htmlFor="morning">Morning</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="afternoon" id="afternoon" />
                  <Label htmlFor="afternoon">Afternoon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="evening" id="evening" />
                  <Label htmlFor="evening">Evening</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="night" id="night" />
                  <Label htmlFor="night">Night</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Study Pace</Label>
              <RadioGroup 
                value={studyPace} 
                onValueChange={(value) => setStudyPace(value as 'slow' | 'moderate' | 'fast')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="slow" id="slow" />
                  <Label htmlFor="slow">Relaxed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Balanced</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fast" id="fast" />
                  <Label htmlFor="fast">Intensive</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="study-hours">Daily Study Hours</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="study-hours"
                  type="range"
                  min="1"
                  max="12"
                  value={studyHours}
                  onChange={(e) => setStudyHours(Number(e.target.value))}
                  className="w-full"
                />
                <span className="font-medium text-lg">{studyHours} hrs</span>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-md p-4">
              <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Your Study Plan Summary</h4>
              <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-300">
                <li><span className="font-medium">Exam Goal:</span> {selectedExamGoal || 'Not selected'}</li>
                <li><span className="font-medium">Exam Date:</span> {examDate ? format(examDate, "PPP") : 'Not set'}</li>
                <li><span className="font-medium">Preferred Study Time:</span> {studyTime.charAt(0).toUpperCase() + studyTime.slice(1)}</li>
                <li><span className="font-medium">Study Pace:</span> {studyPace.charAt(0).toUpperCase() + studyPace.slice(1)}</li>
                <li><span className="font-medium">Daily Study Hours:</span> {studyHours} hours</li>
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Study Plan</DialogTitle>
          <DialogDescription>
            Set up a personalized study plan to achieve your exam goals.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center my-2">
          <div className="flex items-center">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  i === step
                    ? "bg-blue-600 text-white"
                    : i < step
                    ? "bg-blue-200 text-blue-800"
                    : "bg-gray-200 text-gray-500"
                )}>
                  {i}
                </div>
                {i < 3 && (
                  <div className={cn(
                    "w-10 h-1",
                    i < step ? "bg-blue-600" : "bg-gray-200"
                  )}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {renderStep()}
        
        <DialogFooter className="flex gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={handlePrevStep}>
              Back
            </Button>
          )}
          <Button onClick={handleNextStep}>
            {step === 3 ? "Create Plan" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
