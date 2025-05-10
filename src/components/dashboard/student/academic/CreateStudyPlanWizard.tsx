
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, BookOpen, GraduationCap, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface NewStudyPlan {
  title: string;
  examDate: Date | undefined;
  hoursPerWeek: number;
  subjects: string[];
  priority: string;
  preferredStudyTime: string;
  learningStyle: string[];
  notes: string;
}

interface CreateStudyPlanWizardProps {
  onCreatePlan: (plan: any) => void;
  onClose: () => void;
  examGoal: string;
  isOpen: boolean;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({ 
  onCreatePlan, 
  onClose, 
  examGoal,
  isOpen 
}) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<NewStudyPlan>>({
    title: `${examGoal} Study Plan`,
    hoursPerWeek: 15,
    subjects: [],
    priority: 'balanced',
    preferredStudyTime: 'morning',
    learningStyle: [],
  });

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    onCreatePlan(formData);
    onClose();
  };

  // Available subjects based on exam goal
  const getSubjectsForExam = (exam: string) => {
    switch(exam) {
      case 'NEET':
        return ['Physics', 'Chemistry', 'Biology'];
      case 'JEE':
        return ['Physics', 'Chemistry', 'Mathematics'];
      case 'UPSC':
        return ['General Studies', 'Current Affairs', 'Optional Subject'];
      case 'CAT':
        return ['Quantitative Aptitude', 'Verbal Ability', 'Data Interpretation', 'Logical Reasoning'];
      case 'GATE':
        return ['Engineering Mathematics', 'General Aptitude', 'Subject Specific'];
      default:
        return ['Mathematics', 'Science', 'Language', 'Social Studies'];
    }
  };

  const subjects = getSubjectsForExam(examGoal);

  const steps = [
    {
      title: "Basic Information",
      component: (
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <FormLabel>Plan Title</FormLabel>
            <Input 
              placeholder="Enter your study plan title" 
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <FormLabel>Target Exam Date</FormLabel>
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
                  {formData.examDate ? format(formData.examDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.examDate}
                  onSelect={(date) => setFormData({...formData, examDate: date})}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <FormLabel>Hours per Week</FormLabel>
            <div className="flex items-center space-x-4">
              <Slider 
                value={[formData.hoursPerWeek || 15]} 
                onValueChange={(value) => setFormData({...formData, hoursPerWeek: value[0]})}
                max={50} 
                step={1} 
              />
              <span className="w-12 text-center font-medium">{formData.hoursPerWeek || 15}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Select Subjects",
      component: (
        <div className="space-y-4 py-4">
          <FormLabel>Select Subjects for {examGoal}</FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox 
                  id={subject} 
                  checked={formData.subjects?.includes(subject)}
                  onCheckedChange={(checked) => {
                    const updatedSubjects = checked 
                      ? [...(formData.subjects || []), subject]
                      : (formData.subjects || []).filter(s => s !== subject);
                    setFormData({...formData, subjects: updatedSubjects});
                  }}
                />
                <label 
                  htmlFor={subject}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {subject}
                </label>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Learning Preferences",
      component: (
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <FormLabel>Study Priority</FormLabel>
            <RadioGroup 
              defaultValue={formData.priority || 'balanced'} 
              onValueChange={(value) => setFormData({...formData, priority: value})}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weak-areas" id="weak-areas" />
                <label htmlFor="weak-areas">Focus on weak areas</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="balanced" id="balanced" />
                <label htmlFor="balanced">Balanced approach</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="revision" id="revision" />
                <label htmlFor="revision">Revision focused</label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <FormLabel>Preferred Study Time</FormLabel>
            <Select 
              value={formData.preferredStudyTime || 'morning'} 
              onValueChange={(value) => setFormData({...formData, preferredStudyTime: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your preferred study time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="early-morning">Early morning (4-8 AM)</SelectItem>
                <SelectItem value="morning">Morning (8 AM-12 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12-5 PM)</SelectItem>
                <SelectItem value="evening">Evening (5-9 PM)</SelectItem>
                <SelectItem value="night">Night (9 PM-12 AM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <FormLabel>Learning Style (Select all that apply)</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { id: 'visual', label: 'Visual (diagrams, videos)' },
                { id: 'auditory', label: 'Auditory (lectures, discussions)' },
                { id: 'reading', label: 'Reading/Writing' },
                { id: 'kinesthetic', label: 'Kinesthetic (hands-on activities)' }
              ].map((style) => (
                <div key={style.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={style.id} 
                    checked={formData.learningStyle?.includes(style.id)}
                    onCheckedChange={(checked) => {
                      const updatedStyles = checked 
                        ? [...(formData.learningStyle || []), style.id]
                        : (formData.learningStyle || []).filter(s => s !== style.id);
                      setFormData({...formData, learningStyle: updatedStyles});
                    }}
                  />
                  <label 
                    htmlFor={style.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {style.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Additional Notes",
      component: (
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <FormLabel>Any specific requirements or notes?</FormLabel>
            <Textarea 
              placeholder="Enter any additional information that might help in creating your personalized study plan..."
              value={formData.notes || ''}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={5}
            />
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mt-6">
            <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Your plan will include:
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start">
                <BookOpen className="mr-2 h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400" />
                <span>Personalized study schedule based on your preferences</span>
              </li>
              <li className="flex items-start">
                <Brain className="mr-2 h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400" />
                <span>AI-generated practice questions tailored to your knowledge gaps</span>
              </li>
              <li className="flex items-start">
                <BookOpen className="mr-2 h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400" />
                <span>Automated reminders and progress tracking</span>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-violet-600" />
            Create {examGoal} Study Plan
          </DialogTitle>
          <DialogDescription>
            Let's create a customized study plan for your {examGoal} preparation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative">
          {/* Step indicators */}
          <div className="flex justify-between mb-8">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i === step 
                      ? 'bg-violet-600 text-white'
                      : i < step
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <div className="text-xs mt-1 text-center max-w-[80px]">{s.title}</div>
              </div>
            ))}
          </div>
          
          {/* Content */}
          <div>
            {steps[step].component}
          </div>
        </div>
        
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button 
              type="button" 
              variant="outline" 
              onClick={step === 0 ? onClose : handleBack}
            >
              {step === 0 ? "Cancel" : "Back"}
            </Button>
            
            <Button 
              type="button"
              onClick={step === steps.length - 1 ? handleSubmit : handleNext}
            >
              {step === steps.length - 1 ? "Create Plan" : "Continue"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
