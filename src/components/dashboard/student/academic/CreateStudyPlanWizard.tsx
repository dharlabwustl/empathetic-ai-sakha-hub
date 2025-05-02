import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, GraduationCap, LucideBook, Target, User2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { NewStudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';
import { PersonalityType, MoodType } from '@/types/user/base';

interface StepProps {
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  isLastStep?: boolean;
  disableNext?: boolean;
}

const Step: React.FC<StepProps> = ({ children, onNext, onBack, isLastStep = false, disableNext = false }) => {
  return (
    <div className="flex flex-col min-h-[400px]">
      <div className="flex-1">
        {children}
      </div>
      <div className="flex justify-between mt-6">
        {onBack ? (
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : <div></div>}
        <Button onClick={onNext} disabled={disableNext}>
          {isLastStep ? 'Create Plan' : 'Next'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const examOptions = [
  { value: 'iit-jee', label: 'IIT JEE' },
  { value: 'neet', label: 'NEET' },
  { value: 'upsc', label: 'UPSC' },
  { value: 'gate', label: 'GATE' },
  { value: 'cat', label: 'CAT' },
  { value: 'other', label: 'Other' },
];

const difficultyLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const studyTimeOptions = [
  { value: 'morning', label: 'Morning (5AM - 12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
  { value: 'evening', label: 'Evening (5PM - 10PM)' },
  { value: 'night', label: 'Night (10PM - 5AM)' },
];

const personalityTypes = [
  { value: PersonalityType.Analytical, label: 'Analytical' },
  { value: PersonalityType.Creative, label: 'Creative' },
  { value: PersonalityType.Imagination, label: 'Imagination' },
  { value: PersonalityType.Practical, label: 'Practical' },
  { value: PersonalityType.Visual, label: 'Visual' },
  { value: PersonalityType.Auditory, label: 'Auditory' },
  { value: PersonalityType.Kinesthetic, label: 'Kinesthetic' },
];

const studyPaceOptions = [
  { value: 'aggressive', label: 'Aggressive' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'relaxed', label: 'Relaxed' },
];

// Export the component with 'export' so it's available for import in other files
export const CreateStudyPlanWizard = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<NewStudyPlan>>({
    goal: '',
    examGoal: '',
    examDate: new Date(),
    subjects: [],
    weeklyHours: 20,
    studyHoursPerDay: 4,
    status: 'active',
    learningPace: 'moderate',
    preferredStudyTime: 'evening',
    studyPreferences: {
      personalityType: 'analytical',
      studyPace: 'balanced',
      dailyStudyHours: 4,
      preferredStudyTime: 'evening',
    },
  });

  const [otherExam, setOtherExam] = useState('');
  const [subjectInput, setSubjectInput] = useState('');
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [strongSubjects, setStrongSubjects] = useState<string[]>([]);

  const handleAddSubject = () => {
    if (subjectInput.trim() && !formData.subjects?.some(s => s.name === subjectInput.trim())) {
      const newSubject: StudyPlanSubject = {
        id: Math.random().toString(36).substring(2, 9),
        name: subjectInput.trim(),
        difficulty: 'medium',
        completed: false,
        isWeakSubject: weakSubjects.includes(subjectInput.trim()),
      };
      
      setFormData({
        ...formData,
        subjects: [...(formData.subjects || []), newSubject]
      });
      setSubjectInput('');
    }
  };

  const handleRemoveSubject = (id: string) => {
    setFormData({
      ...formData,
      subjects: formData.subjects?.filter(s => s.id !== id) || []
    });
  };

  const handleToggleWeakSubject = (subjectName: string) => {
    if (weakSubjects.includes(subjectName)) {
      setWeakSubjects(weakSubjects.filter(s => s !== subjectName));
    } else {
      setWeakSubjects([...weakSubjects, subjectName]);
      // Remove from strong subjects if it's there
      setStrongSubjects(strongSubjects.filter(s => s !== subjectName));
    }
    
    // Update the subject in the formData
    setFormData({
      ...formData,
      subjects: formData.subjects?.map(s => 
        s.name === subjectName 
          ? { ...s, isWeakSubject: !weakSubjects.includes(subjectName) }
          : s
      ) || []
    });
  };

  const handleToggleStrongSubject = (subjectName: string) => {
    if (strongSubjects.includes(subjectName)) {
      setStrongSubjects(strongSubjects.filter(s => s !== subjectName));
    } else {
      setStrongSubjects([...strongSubjects, subjectName]);
      // Remove from weak subjects if it's there
      setWeakSubjects(weakSubjects.filter(s => s !== subjectName));
    }
    
    // Update the subject in the formData
    setFormData({
      ...formData,
      subjects: formData.subjects?.map(s => 
        s.name === subjectName 
          ? { ...s, isWeakSubject: false }
          : s
      ) || []
    });
  };

  const handleCreatePlan = () => {
    // In a real app, this would save the plan to the backend
    toast({
      title: "Study Plan Created!",
      description: "Your personalized study plan is ready. Let's start learning!",
    });
    
    console.log("Created study plan:", formData);
    // Here you would typically redirect to the study plan view
  };

  const steps = [
    {
      title: "Choose Your Exam",
      description: "Select the exam you're preparing for",
      icon: <Target className="h-6 w-6" />,
      component: (
        <Step 
          onNext={() => setCurrentStep(1)}
          disableNext={!formData.examGoal || (formData.examGoal === 'other' && !otherExam)}
        >
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="exam">Which exam are you preparing for?</Label>
              <Select 
                value={formData.examGoal} 
                onValueChange={(value) => setFormData({...formData, examGoal: value})}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select an exam" />
                </SelectTrigger>
                <SelectContent>
                  {examOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {formData.examGoal === 'other' && (
              <div className="mt-4">
                <Label htmlFor="otherExam">Specify the exam name</Label>
                <Input 
                  id="otherExam"
                  value={otherExam}
                  onChange={(e) => {
                    setOtherExam(e.target.value);
                    setFormData({...formData, goal: e.target.value});
                  }}
                  placeholder="Enter the exam name"
                  className="mt-1.5"
                />
              </div>
            )}
            
            <div className="mt-4">
              <Label htmlFor="examDate">When is your exam date?</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full mt-1.5 justify-start text-left font-normal",
                      !formData.examDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.examDate ? format(new Date(formData.examDate), "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.examDate ? new Date(formData.examDate) : undefined}
                    onSelect={(date) => date && setFormData({...formData, examDate: date})}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </Step>
      )
    },
    {
      title: "Subjects",
      description: "Select subjects to include in your plan",
      icon: <LucideBook className="h-6 w-6" />,
      component: (
        <Step 
          onNext={() => setCurrentStep(2)} 
          onBack={() => setCurrentStep(0)}
          disableNext={(formData.subjects?.length || 0) === 0}
        >
          <div className="space-y-4">
            <Label className="text-base">Add subjects for your study plan</Label>
            
            <div className="flex space-x-2">
              <Input 
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                placeholder="Enter a subject"
                onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
              />
              <Button onClick={handleAddSubject} type="button">Add</Button>
            </div>
            
            {formData.subjects && formData.subjects.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Your Subjects:</h3>
                <div className="space-y-2">
                  {formData.subjects.map((subject) => (
                    <div key={subject.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center">
                        <span>{subject.name}</span>
                        <div className="ml-4 flex space-x-2">
                          <Button 
                            size="sm" 
                            variant={weakSubjects.includes(subject.name) ? "default" : "outline"} 
                            className="h-7 text-xs"
                            onClick={() => handleToggleWeakSubject(subject.name)}
                          >
                            Weak
                          </Button>
                          <Button 
                            size="sm" 
                            variant={strongSubjects.includes(subject.name) ? "default" : "outline"} 
                            className="h-7 text-xs"
                            onClick={() => handleToggleStrongSubject(subject.name)}
                          >
                            Strong
                          </Button>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleRemoveSubject(subject.id)}
                        className="h-7 px-2"
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center p-4 border border-dashed rounded-md text-muted-foreground">
                No subjects added yet. Add subjects to continue.
              </div>
            )}
          </div>
        </Step>
      )
    },
    {
      title: "Study Preferences",
      description: "Set your daily study hours and timing preferences",
      icon: <Clock className="h-6 w-6" />,
      component: (
        <Step 
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
          disableNext={!formData.studyHoursPerDay || !formData.studyPreferences?.preferredStudyTime}
        >
          <div className="space-y-6">
            <div>
              <Label htmlFor="studyHours">How many hours can you study each day?</Label>
              <div className="flex items-center mt-2 space-x-4">
                <Slider
                  id="studyHours"
                  min={1}
                  max={12}
                  step={0.5}
                  value={[formData.studyHoursPerDay || 4]}
                  onValueChange={(value) => setFormData({
                    ...formData, 
                    studyHoursPerDay: value[0],
                    studyPreferences: {
                      ...formData.studyPreferences,
                      dailyStudyHours: value[0]
                    }
                  })}
                  className="flex-1"
                />
                <span className="font-semibold w-12 text-center">{formData.studyHoursPerDay}h</span>
              </div>
            </div>
            
            <div>
              <Label className="text-base">When do you prefer to study?</Label>
              <RadioGroup
                value={formData.studyPreferences?.preferredStudyTime || 'evening'}
                onValueChange={(value: "morning" | "afternoon" | "evening" | "night") => setFormData({
                  ...formData,
                  preferredStudyTime: value,
                  studyPreferences: {
                    ...formData.studyPreferences,
                    preferredStudyTime: value
                  }
                })}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                {studyTimeOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="studyPace">Your preferred study pace</Label>
              <Select 
                value={formData.studyPreferences?.studyPace || 'balanced'} 
                onValueChange={(value: "aggressive" | "balanced" | "relaxed") => setFormData({
                  ...formData,
                  studyPreferences: {
                    ...formData.studyPreferences,
                    studyPace: value
                  }
                })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your pace" />
                </SelectTrigger>
                <SelectContent>
                  {studyPaceOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                This helps us determine how to schedule your study sessions
              </p>
            </div>
          </div>
        </Step>
      )
    },
    {
      title: "Learning Style",
      description: "Tell us about your learning personality",
      icon: <User2 className="h-6 w-6" />,
      component: (
        <Step 
          onNext={() => setCurrentStep(4)}
          onBack={() => setCurrentStep(2)}
          disableNext={!formData.studyPreferences?.personalityType}
        >
          <div className="space-y-6">
            <div>
              <Label htmlFor="personalityType">What's your learning personality type?</Label>
              <Select 
                value={formData.studyPreferences?.personalityType || 'analytical'} 
                onValueChange={(value) => setFormData({
                  ...formData,
                  studyPreferences: {
                    ...formData.studyPreferences,
                    personalityType: value
                  }
                })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your learning style" />
                </SelectTrigger>
                <SelectContent>
                  {personalityTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                This helps us tailor your study materials to your learning style
              </p>
            </div>
            
            <div>
              <Label htmlFor="studyEnvironment">Describe your ideal study environment</Label>
              <Input 
                id="studyEnvironment"
                value={formData.studyPreferences?.studyEnvironment || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  studyPreferences: {
                    ...formData.studyPreferences,
                    studyEnvironment: e.target.value
                  }
                })}
                placeholder="e.g., Quiet room with good lighting"
                className="mt-1.5"
              />
            </div>
            
            <div>
              <Label htmlFor="stressManagement">How do you manage stress during studying?</Label>
              <Input 
                id="stressManagement"
                value={formData.studyPreferences?.stressManagement || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  studyPreferences: {
                    ...formData.studyPreferences,
                    stressManagement: e.target.value
                  }
                })}
                placeholder="e.g., Short breaks, meditation, music"
                className="mt-1.5"
              />
            </div>
          </div>
        </Step>
      )
    },
    {
      title: "Review",
      description: "Review your study plan details",
      icon: <GraduationCap className="h-6 w-6" />,
      component: (
        <Step 
          onNext={handleCreatePlan} 
          onBack={() => setCurrentStep(3)}
          isLastStep={true}
        >
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">Plan Summary</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start">
                  <Target className="h-4 w-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-500" />
                  <span>
                    <strong>Exam:</strong> {formData.examGoal === 'other' ? otherExam : examOptions.find(e => e.value === formData.examGoal)?.label || 'Not selected'}
                    {formData.examDate && <> (Exam date: {format(new Date(formData.examDate), "PPP")})</>}
                  </span>
                </li>
                <li className="flex items-start">
                  <LucideBook className="h-4 w-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-500" />
                  <span>
                    <strong>Subjects:</strong> {formData.subjects?.map(s => s.name).join(', ')}
                  </span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-4 w-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-500" />
                  <span>
                    <strong>Study Time:</strong> {formData.studyHoursPerDay} hours per day, 
                    preferably in the {formData.studyPreferences?.preferredStudyTime || 'evening'}
                  </span>
                </li>
                <li className="flex items-start">
                  <User2 className="h-4 w-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-500" />
                  <span>
                    <strong>Learning Style:</strong> {formData.studyPreferences?.personalityType || 'Not selected'}
                  </span>
                </li>
                <li className="flex items-start">
                  <GraduationCap className="h-4 w-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-500" />
                  <span>
                    <strong>Study Pace:</strong> {formData.studyPreferences?.studyPace || 'Not selected'}
                  </span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium">Weak Subjects</h3>
              <div className="mt-1">
                {weakSubjects.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {weakSubjects.map(subject => (
                      <span key={subject} className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded text-xs">
                        {subject}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No weak subjects identified</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium">Strong Subjects</h3>
              <div className="mt-1">
                {strongSubjects.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {strongSubjects.map(subject => (
                      <span key={subject} className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded text-xs">
                        {subject}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No strong subjects identified</p>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                Your personalized study plan will be created based on these preferences. You can always modify your plan later.
              </p>
            </div>
          </div>
        </Step>
      )
    }
  ];

  return (
    <Card className="shadow-xl border-gray-200 dark:border-gray-800 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
            <CardDescription className="text-blue-100">
              {steps[currentStep].description}
            </CardDescription>
          </div>
          <div className="bg-white/20 rounded-full p-3">
            {steps[currentStep].icon}
          </div>
        </div>
      </CardHeader>
      
      <div className="bg-slate-100 dark:bg-slate-800 px-6 py-2 flex justify-between">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center ${index <= currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              index < currentStep ? 'bg-blue-600 text-white' : 
              index === currentStep ? 'border-2 border-blue-600 text-blue-600' : 
              'border-2 border-gray-300 text-gray-400'
            }`}>
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
          </div>
        ))}
      </div>
      
      <div className="relative h-1">
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />
        <div 
          className="absolute inset-y-0 left-0 bg-blue-600 dark:bg-blue-500 transition-all duration-300" 
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} 
        />
      </div>
      
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {steps[currentStep].component}
          </motion.div>
        </AnimatePresence>
      </CardContent>
      
      <CardFooter className="border-t bg-muted/30 flex justify-between py-3 px-6">
        <div>
          <Progress value={(currentStep + 1) / steps.length * 100} className="h-2 w-24" />
        </div>
        <p className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </p>
      </CardFooter>
    </Card>
  );
};

// Also add a default export to maintain compatibility
export default CreateStudyPlanWizard;
