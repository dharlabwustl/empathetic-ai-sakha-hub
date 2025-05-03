import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { NewStudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';

interface CreateStudyPlanWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlan: (plan: NewStudyPlan) => void;
  examGoal?: string;
}

const examGoals = [
  "NEET", "JEE Main", "JEE Advanced", "UPSC", "GATE", 
  "CAT", "GMAT", "GRE", "IELTS", "TOEFL", "SAT", "ACT",
  "Bank PO", "SSC", "CLAT", "NDA", "CA", "CS"
];

const subjects = {
  "NEET": ["Physics", "Chemistry", "Biology", "Mathematics"],
  "JEE Main": ["Physics", "Chemistry", "Mathematics"],
  "JEE Advanced": ["Physics", "Chemistry", "Mathematics"],
  "UPSC": ["History", "Geography", "Economics", "Political Science", "Current Affairs"],
  "GATE": ["Engineering Mathematics", "General Aptitude", "Subject Specific Knowledge"],
  "CAT": ["Quantitative Ability", "Data Interpretation", "Logical Reasoning", "Verbal Ability"],
  "GMAT": ["Analytical Writing", "Integrated Reasoning", "Quantitative Reasoning", "Verbal Reasoning"],
  // Default subjects for other exams
  "default": ["Subject 1", "Subject 2", "Subject 3", "Subject 4"]
};

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({ 
  isOpen, 
  onClose, 
  onCreatePlan,
  examGoal: initialExamGoal
}) => {
  const [step, setStep] = useState(1);
  const [examGoal, setExamGoal] = useState<string>(initialExamGoal || '');
  const [examDate, setExamDate] = useState<Date | undefined>(undefined);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState<number>(4);
  const [preferredStudyTime, setPreferredStudyTime] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const [learningPace, setLearningPace] = useState<'slow' | 'moderate' | 'fast'>('moderate');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  
  const availableSubjects = examGoal && subjects[examGoal as keyof typeof subjects] || subjects.default;
  
  const resetForm = () => {
    setStep(1);
    setExamGoal(initialExamGoal || '');
    setExamDate(undefined);
    setStudyHoursPerDay(4);
    setPreferredStudyTime('morning');
    setLearningPace('moderate');
    setSelectedSubjects([]);
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = () => {
    // Create study plan subjects with basic metadata
    const planSubjects = selectedSubjects.map(subject => ({
      id: `subject-${Math.random().toString(36).substr(2, 9)}`,
      name: subject,
      proficiency: 'medium' as const,
      priority: 'medium' as const,
      color: '#' + Math.floor(Math.random()*16777215).toString(16), // Random color
      hoursPerWeek: 4,
      completed: false
    }));
    
    const newPlan: NewStudyPlan = {
      examGoal,
      examDate: examDate || new Date(),
      status: 'active',
      studyHoursPerDay,
      preferredStudyTime,
      learningPace,
      subjects: planSubjects
    };
    
    onCreatePlan(newPlan);
    handleClose();
  };
  
  const validateStep = () => {
    switch (step) {
      case 1:
        return !!examGoal && !!examDate;
      case 2:
        return selectedSubjects.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };
  
  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="examGoal">Exam Goal</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {examGoal || "Select your exam goal..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search exam..." />
                    <CommandEmpty>No exam found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-72">
                        {examGoals.map((goal) => (
                          <CommandItem
                            key={goal}
                            onSelect={() => {
                              setExamGoal(goal);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                examGoal === goal ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {goal}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
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
                    {examDate ? format(examDate, "PPP") : "Select your exam date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={examDate}
                    onSelect={setExamDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <Label>Select Subjects</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableSubjects.map(subject => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox 
                    id={subject} 
                    checked={selectedSubjects.includes(subject)}
                    onCheckedChange={() => handleSubjectToggle(subject)}
                  />
                  <Label htmlFor={subject} className="cursor-pointer">{subject}</Label>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <Label>Selected Subjects:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSubjects.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No subjects selected</p>
                ) : (
                  selectedSubjects.map(subject => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studyHours">Study Hours Per Day</Label>
              <Select 
                value={studyHoursPerDay.toString()}
                onValueChange={(value) => setStudyHoursPerDay(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="5">5 hours</SelectItem>
                  <SelectItem value="6">6 hours</SelectItem>
                  <SelectItem value="7">7 hours</SelectItem>
                  <SelectItem value="8">8 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Preferred Study Time</Label>
              <RadioGroup 
                value={preferredStudyTime}
                onValueChange={(value) => setPreferredStudyTime(value as 'morning' | 'afternoon' | 'evening' | 'night')}
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
              <Label>Learning Pace</Label>
              <RadioGroup 
                value={learningPace}
                onValueChange={(value) => setLearningPace(value as 'slow' | 'moderate' | 'fast')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="slow" id="slow" />
                  <Label htmlFor="slow">Slow</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fast" id="fast" />
                  <Label htmlFor="fast">Fast</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Study Plan Summary</h3>
            
            <div className="rounded-md bg-muted p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Exam Goal:</span>
                <span className="font-medium">{examGoal}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Exam Date:</span>
                <span className="font-medium">
                  {examDate ? format(examDate, 'PPP') : 'Not set'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subjects:</span>
                <span className="font-medium">{selectedSubjects.length} subjects</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Study Hours:</span>
                <span className="font-medium">{studyHoursPerDay} hours/day</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Study Time:</span>
                <span className="font-medium capitalize">{preferredStudyTime}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Learning Pace:</span>
                <span className="font-medium capitalize">{learningPace}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              We'll create a personalized study plan based on these preferences. You can always adjust it later.
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Study Plan</DialogTitle>
        </DialogHeader>
        
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4].map(stepNumber => (
            <div 
              key={stepNumber}
              className={`h-2 flex-1 rounded-full ${
                step === stepNumber 
                  ? 'bg-primary' 
                  : step > stepNumber 
                    ? 'bg-primary/60' 
                    : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
        
        {renderStep()}
        
        <div className="flex justify-between mt-6">
          <Button 
            type="button"
            variant="outline"
            onClick={step === 1 ? handleClose : handleBack}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          <Button 
            type="button"
            onClick={step === 4 ? handleSubmit : handleNext}
            disabled={!validateStep()}
          >
            {step === 4 ? 'Create Plan' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
