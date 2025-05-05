
import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

interface CreateStudyPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateStudyPlanDialog: React.FC<CreateStudyPlanDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [step, setStep] = useState(1);
  const [examGoal, setExamGoal] = useState('');
  const [examDate, setExamDate] = useState<Date | undefined>(undefined);
  const [hoursPerDay, setHoursPerDay] = useState('4');
  const [studyTime, setStudyTime] = useState('evening');
  const [pace, setPace] = useState('moderate');
  const [subjects, setSubjects] = useState<{id: string; name: string; proficiency: string}[]>([]);
  const [subjectInput, setSubjectInput] = useState('');
  const [proficiency, setProficiency] = useState('medium');

  // Popular exam options
  const examOptions = [
    'NEET', 'JEE Main', 'JEE Advanced', 'UPSC', 'CAT', 
    'GATE', 'GMAT', 'GRE', 'Bank Exams', 'SSC', 'Other'
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Create study plan logic here
      onOpenChange(false);
      resetForm();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onOpenChange(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setStep(1);
    setExamGoal('');
    setExamDate(undefined);
    setHoursPerDay('4');
    setStudyTime('evening');
    setPace('moderate');
    setSubjects([]);
    setSubjectInput('');
    setProficiency('medium');
  };

  const handleAddSubject = () => {
    if (subjectInput.trim()) {
      setSubjects([
        ...subjects,
        {
          id: `subject-${Date.now()}`,
          name: subjectInput.trim(),
          proficiency: proficiency
        }
      ]);
      setSubjectInput('');
      setProficiency('medium');
    }
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Study Plan</DialogTitle>
          <DialogDescription>
            {step === 1 && "Set your exam goal and timeline"}
            {step === 2 && "Configure your study preferences"}
            {step === 3 && "Add subjects to your study plan"}
            {step === 4 && "Review your study plan"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Step 1: Exam Goal and Date */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="examGoal">Exam Goal</Label>
                <Select value={examGoal} onValueChange={setExamGoal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {examOptions.map((exam) => (
                      <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="examDate">Exam Date</Label>
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
                      {examDate ? format(examDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={examDate}
                      onSelect={setExamDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
          
          {/* Step 2: Study Preferences */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hoursPerDay">Study Hours Per Day</Label>
                <Select value={hoursPerDay} onValueChange={setHoursPerDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="8">8+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="studyTime">Preferred Study Time</Label>
                <Select value={studyTime} onValueChange={setStudyTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="night">Night</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pace">Learning Pace</Label>
                <Select value={pace} onValueChange={setPace}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pace" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slow">Relaxed</SelectItem>
                    <SelectItem value="moderate">Balanced</SelectItem>
                    <SelectItem value="fast">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Step 3: Subjects */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Add Subject</Label>
                <div className="flex space-x-2">
                  <Input
                    id="subject"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    placeholder="e.g., Physics"
                    className="flex-grow"
                  />
                  <Select value={proficiency} onValueChange={setProficiency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weak">Weak</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="strong">Strong</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    onClick={handleAddSubject}
                    disabled={!subjectInput.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Added Subjects</Label>
                {subjects.length > 0 ? (
                  <div className="border rounded-md divide-y">
                    {subjects.map((subject) => (
                      <div key={subject.id} className="flex items-center justify-between p-3">
                        <div>
                          <span className="font-medium">{subject.name}</span>
                          <span 
                            className={cn(
                              "ml-2 text-xs px-2 py-0.5 rounded-full",
                              subject.proficiency === 'weak' ? "bg-red-100 text-red-800" :
                              subject.proficiency === 'medium' ? "bg-yellow-100 text-yellow-800" :
                              "bg-green-100 text-green-800"
                            )}
                          >
                            {subject.proficiency}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveSubject(subject.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-md text-muted-foreground">
                    No subjects added yet
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="border rounded-md p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exam Goal:</span>
                  <span className="font-medium">{examGoal}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exam Date:</span>
                  <span className="font-medium">
                    {examDate ? format(examDate, "PPP") : "Not set"}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Study Hours:</span>
                  <span className="font-medium">{hoursPerDay} hours/day</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Preferred Time:</span>
                  <span className="font-medium capitalize">{studyTime}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Learning Pace:</span>
                  <span className="font-medium capitalize">{pace}</span>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="text-muted-foreground mb-2">Subjects:</div>
                  {subjects.map((subject) => (
                    <div key={subject.id} className="flex justify-between py-1">
                      <span>{subject.name}</span>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        subject.proficiency === 'weak' ? "bg-red-100 text-red-800" :
                        subject.proficiency === 'medium' ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      )}>
                        {subject.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <div className="w-full flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              disabled={
                (step === 1 && (!examGoal || !examDate)) ||
                (step === 3 && subjects.length === 0)
              }
            >
              {step === 4 ? "Create Plan" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanDialog;
