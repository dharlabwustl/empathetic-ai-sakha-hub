import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Slider } from '@/components/ui/slider';
import { ChevronRight } from 'lucide-react';
import { StudyPlanSubject, NewStudyPlan } from '@/types/user/studyPlan';

interface CreateStudyPlanWizardProps {
  isOpen: boolean;
  onClose: () => void;
  examGoal?: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
}

const subjectOptions = [
  { name: 'Physics', color: '#3b82f6', difficulty: 'hard' as const, proficiency: 'weak' as const },
  { name: 'Chemistry', color: '#10b981', difficulty: 'medium' as const, proficiency: 'medium' as const },
  { name: 'Biology', color: '#f97316', difficulty: 'medium' as const, proficiency: 'strong' as const },
  { name: 'Mathematics', color: '#8b5cf6', difficulty: 'hard' as const, proficiency: 'weak' as const },
  { name: 'English', color: '#ec4899', difficulty: 'easy' as const, proficiency: 'strong' as const },
  { name: 'History', color: '#f43f5e', difficulty: 'medium' as const, proficiency: 'medium' as const },
  { name: 'Geography', color: '#14b8a6', difficulty: 'easy' as const, proficiency: 'medium' as const },
  { name: 'Computer Science', color: '#6366f1', difficulty: 'hard' as const, proficiency: 'weak' as const }
];

const defaultPriorities = {
  'weak': 'high',
  'medium': 'medium',
  'strong': 'low'
};

const timePreferences = [
  { value: 'morning', label: 'Morning (6AM - 12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
  { value: 'evening', label: 'Evening (5PM - 10PM)' },
  { value: 'night', label: 'Night (10PM - 6AM)' }
];

const learningPaces = [
  { value: 'slow', label: 'Slow - I prefer thorough understanding' },
  { value: 'moderate', label: 'Moderate - Balanced pace' },
  { value: 'fast', label: 'Fast - I grasp concepts quickly' }
];

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  isOpen,
  onClose,
  examGoal = 'NEET',
  onCreatePlan
}) => {
  const [step, setStep] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [examDate, setExamDate] = useState<Date | undefined>(undefined);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(4);
  const [preferredStudyTime, setPreferredStudyTime] = useState<string>('evening');
  const [learningPace, setLearningPace] = useState<string>('moderate');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleToggleSubject = (subjectName: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subjectName)) {
        return prev.filter(name => name !== subjectName);
      } else {
        return [...prev, subjectName];
      }
    });
  };

  const getTopicsForSubject = (name: string) => {
    // Generate sample topics for each subject
    switch(name.toLowerCase()) {
      case 'physics':
        return [
          { 
            id: `topic-${Date.now()}-1`, 
            name: "Mechanics", 
            difficulty: "medium" as const, 
            completed: false, 
            status: "in-progress" as const, 
            priority: "high" as const 
          },
          { 
            id: `topic-${Date.now()}-2`, 
            name: "Thermodynamics", 
            difficulty: "hard" as const, 
            completed: false, 
            status: "pending" as const, 
            priority: "medium" as const 
          },
          { 
            id: `topic-${Date.now()}-3`, 
            name: "Electrostatics", 
            difficulty: "medium" as const, 
            completed: false, 
            status: "pending" as const, 
            priority: "high" as const 
          }
        ];
      case 'chemistry':
        return [
          { 
            id: `topic-${Date.now()}-1`, 
            name: "Organic Chemistry", 
            difficulty: "hard" as const, 
            completed: false, 
            status: "pending" as const, 
            priority: "high" as const 
          },
          { 
            id: `topic-${Date.now()}-2`, 
            name: "Chemical Bonding", 
            difficulty: "medium" as const, 
            completed: false, 
            status: "in-progress" as const, 
            priority: "medium" as const 
          },
          { 
            id: `topic-${Date.now()}-3`, 
            name: "Equilibrium", 
            difficulty: "easy" as const, 
            completed: false, 
            status: "pending" as const, 
            priority: "low" as const 
          }
        ];
      case 'biology':
        return [
          { 
            id: `topic-${Date.now()}-1`, 
            name: "Cell Biology", 
            difficulty: "medium" as const, 
            completed: false, 
            status: "in-progress" as const, 
            priority: "high" as const 
          },
          { 
            id: `topic-${Date.now()}-2`, 
            name: "Human Physiology", 
            difficulty: "hard" as const, 
            completed: false, 
            status: "pending" as const, 
            priority: "high" as const 
          },
          { 
            id: `topic-${Date.now()}-3`, 
            name: "Genetics", 
            difficulty: "medium" as const, 
            completed: false, 
            status: "pending" as const, 
            priority: "medium" as const 
          }
        ];
      default:
        return [
          { 
            id: `topic-${Date.now()}-1`, 
            name: "Basic Concepts", 
            difficulty: "medium" as const, 
            completed: false, 
            status: "pending" as const, 
            priority: "high" as const 
          }
        ];
    }
  };

  const handleCreate = () => {
    setIsSubmitting(true);
    
    // Create subjects array from selected subjects
    const subjects: StudyPlanSubject[] = selectedSubjects.map(name => {
      const subject = subjectOptions.find(option => option.name === name);
      // Map 'moderate' to 'medium' for proficiency to match the expected type
      const proficiency = subject?.proficiency || 'medium';
      
      return {
        id: `subject-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name,
        color: subject?.color || '#6366f1',
        hoursPerWeek: proficiency === 'weak' ? 8 : proficiency === 'medium' ? 6 : 4,
        priority: defaultPriorities[proficiency] as 'high' | 'medium' | 'low',
        proficiency,
        difficulty: subject?.difficulty || 'medium',
        completed: false,
        topics: getTopicsForSubject(name)
      };
    });
    
    // Create the study plan
    const plan: NewStudyPlan = {
      goal: examGoal, // Add the goal property to satisfy the type
      examGoal,
      examDate: examDate ? format(examDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      status: 'active',
      subjects,
      weeklyHours: studyHoursPerDay * 7,
      studyHoursPerDay,
      preferredStudyTime: preferredStudyTime as 'morning' | 'afternoon' | 'evening' | 'night',
      learningPace: learningPace as 'slow' | 'moderate' | 'fast'
    };
    
    // Call the create handler
    onCreatePlan(plan);
    
    // Reset state and close dialog
    setIsSubmitting(false);
    setStep(0);
    setSelectedSubjects([]);
    setExamDate(undefined);
    setStudyHoursPerDay(4);
    setPreferredStudyTime('evening');
    setLearningPace('moderate');
  };

  const isNextDisabled = () => {
    if (step === 0 && !examDate) return true;
    if (step === 1 && selectedSubjects.length === 0) return true;
    return false;
  };

  // Render steps
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6 py-4">
            <div>
              <Label htmlFor="exam-goal">Exam Goal</Label>
              <Input id="exam-goal" value={examGoal} readOnly className="mt-2 bg-gray-50" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exam-date">Exam Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="exam-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {examDate ? format(examDate, 'PPP') : <span>Select your exam date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={examDate}
                    onSelect={setExamDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground mt-1">Choose your expected exam date to plan accordingly</p>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Select Subjects</Label>
              <p className="text-sm text-muted-foreground mb-4">Choose the subjects you want to include in your study plan</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subjectOptions.map((subject) => (
                  <div
                    key={subject.name}
                    className={`p-3 rounded-md border-2 cursor-pointer transition-colors ${
                      selectedSubjects.includes(subject.name)
                        ? `border-primary bg-primary/10`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleToggleSubject(subject.name)}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: subject.color }}
                      ></div>
                      <span className="font-medium">{subject.name}</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      <span className="capitalize">{subject.difficulty} difficulty</span>
                      <span className="mx-1">•</span>
                      <span className="capitalize">{subject.proficiency} proficiency</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedSubjects.length === 0 && (
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                  Please select at least one subject
                </p>
              )}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div>
                <Label>Study Hours Per Day</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    value={[studyHoursPerDay]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(values) => setStudyHoursPerDay(values[0])}
                    className="flex-1"
                  />
                  <span className="font-medium w-8 text-center">{studyHoursPerDay}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  How many hours can you dedicate to studying each day?
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferred-time">Preferred Study Time</Label>
                <Select
                  value={preferredStudyTime}
                  onValueChange={setPreferredStudyTime}
                >
                  <SelectTrigger id="preferred-time" className="w-full">
                    <SelectValue placeholder="Select preferred study time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timePreferences.map((time) => (
                      <SelectItem key={time.value} value={time.value}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="learning-pace">Learning Pace</Label>
                <Select
                  value={learningPace}
                  onValueChange={setLearningPace}
                >
                  <SelectTrigger id="learning-pace" className="w-full">
                    <SelectValue placeholder="Select your learning pace" />
                  </SelectTrigger>
                  <SelectContent>
                    {learningPaces.map((pace) => (
                      <SelectItem key={pace.value} value={pace.value}>
                        {pace.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6 py-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Study Plan Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exam Goal:</span>
                  <span className="font-medium">{examGoal}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exam Date:</span>
                  <span className="font-medium">{examDate ? format(examDate, 'PPP') : 'Not set'}</span>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Subjects:</span>
                    <span className="font-medium">{selectedSubjects.length} selected</span>
                  </div>
                  <div className="flex flex-wrap gap-1 ml-4">
                    {selectedSubjects.map((subject) => (
                      <span key={subject} className="text-xs bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily Study Hours:</span>
                  <span className="font-medium">{studyHoursPerDay} hours</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Preferred Study Time:</span>
                  <span className="font-medium capitalize">{preferredStudyTime}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Learning Pace:</span>
                  <span className="font-medium capitalize">{learningPace}</span>
                </div>
              </div>
            </div>
            
            <p className="text-center text-sm text-muted-foreground">
              Your personalized study plan will be created based on these preferences
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Step indicator
  const steps = ['Exam Details', 'Subjects', 'Preferences', 'Review'];

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      setStep(0);
      onClose();
    }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Study Plan</DialogTitle>
          <DialogDescription>
            Set up a personalized study plan for your {examGoal} preparation
          </DialogDescription>
        </DialogHeader>
        
        {/* Step Indicator */}
        <div className="flex justify-between mb-6">
          {steps.map((stepName, idx) => (
            <div key={idx} className="flex items-center">
              <div 
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                  idx <= step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 dark:bg-gray-700 text-muted-foreground'
                }`}
              >
                {idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`h-1 w-12 sm:w-16 md:w-24 mx-1 ${
                    idx < step
                      ? 'bg-primary'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        
        {renderStepContent()}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          {step > 0 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < steps.length - 1 ? (
            <Button 
              onClick={handleNext} 
              disabled={isNextDisabled()}
              className="flex items-center"
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleCreate} 
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Creating...' : 'Create Study Plan'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
