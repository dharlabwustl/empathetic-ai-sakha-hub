
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewStudyPlan } from "@/types/user/studyPlan";

interface CreateStudyPlanWizardProps {
  examGoal?: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
  onClose: () => void;
  open: boolean;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  examGoal = "IIT-JEE",
  onCreatePlan,
  onClose,
  open
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<NewStudyPlan>({
    examGoal: examGoal,
    examDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    subjects: [{ name: "Mathematics", proficiency: 'moderate' }],
    studyHoursPerDay: 3,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  });
  
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleAddSubject = () => {
    setFormData({
      ...formData,
      subjects: [
        ...formData.subjects,
        { name: "", proficiency: 'moderate' }
      ]
    });
  };
  
  const handleRemoveSubject = (index: number) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects.splice(index, 1);
    
    setFormData({
      ...formData,
      subjects: updatedSubjects
    });
  };
  
  const handleSubjectChange = (index: number, field: string, value: string) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      subjects: updatedSubjects
    });
  };
  
  const handleInputChange = (field: keyof NewStudyPlan, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onCreatePlan(formData);
      setLoading(false);
      setCurrentStep(1);
    }, 1000);
  };
  
  const renderStepOne = () => (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="examGoal">Exam Goal</Label>
          <Input 
            id="examGoal" 
            value={formData.examGoal} 
            onChange={(e) => handleInputChange('examGoal', e.target.value)} 
            placeholder="e.g., IIT-JEE, NEET, UPSC"
          />
        </div>
        
        <div className="grid gap-2">
          <Label>Exam Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.examDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.examDate ? format(formData.examDate, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.examDate}
                onSelect={(date) => handleInputChange('examDate', date)}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleNextStep}>
          Next Step
        </Button>
      </div>
    </>
  );
  
  const renderStepTwo = () => (
    <>
      <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
        <div className="flex justify-between items-center">
          <Label>Subjects</Label>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={handleAddSubject} 
            className="h-8 px-2"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Subject
          </Button>
        </div>
        
        {formData.subjects.map((subject, index) => (
          <div key={index} className="space-y-3 border rounded-md p-3">
            <div className="flex justify-between items-start">
              <Label className="text-sm font-medium">Subject {index + 1}</Label>
              {index > 0 && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveSubject(index)} 
                  className="h-6 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor={`subject-${index}`} className="text-xs text-muted-foreground">
                Subject Name
              </Label>
              <Input 
                id={`subject-${index}`} 
                value={subject.name} 
                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                placeholder="e.g., Mathematics, Physics"
              />
            </div>
            
            <div className="grid gap-2">
              <Label className="text-xs text-muted-foreground">
                Current Proficiency
              </Label>
              <RadioGroup 
                value={subject.proficiency}
                onValueChange={(value) => handleSubjectChange(index, 'proficiency', value as 'weak' | 'moderate' | 'strong')}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="weak" id={`weak-${index}`} />
                  <Label htmlFor={`weak-${index}`} className="text-sm">Weak</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="moderate" id={`moderate-${index}`} />
                  <Label htmlFor={`moderate-${index}`} className="text-sm">Moderate</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="strong" id={`strong-${index}`} />
                  <Label htmlFor={`strong-${index}`} className="text-sm">Strong</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={handlePreviousStep}>
          Previous
        </Button>
        <Button onClick={handleNextStep}>
          Next Step
        </Button>
      </div>
    </>
  );
  
  const renderStepThree = () => (
    <>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Study Hours Per Day</Label>
            <span className="text-sm font-medium">{formData.studyHoursPerDay} hours</span>
          </div>
          <Slider 
            value={[formData.studyHoursPerDay]} 
            max={12} 
            min={1} 
            step={0.5}
            onValueChange={(value) => handleInputChange('studyHoursPerDay', value[0])}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Preferred Study Time</Label>
          <Select 
            value={formData.preferredStudyTime}
            onValueChange={(value) => handleInputChange('preferredStudyTime', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select preferred study time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (5 AM - 12 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
              <SelectItem value="evening">Evening (5 PM - 9 PM)</SelectItem>
              <SelectItem value="night">Night (9 PM - 5 AM)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Learning Pace</Label>
          <Select 
            value={formData.learningPace}
            onValueChange={(value) => handleInputChange('learningPace', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select learning pace" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow">Slow - Thorough understanding</SelectItem>
              <SelectItem value="moderate">Moderate - Balanced pace</SelectItem>
              <SelectItem value="fast">Fast - Cover more ground quickly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={handlePreviousStep}>
          Previous
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating Plan...' : 'Create Study Plan'}
        </Button>
      </div>
    </>
  );
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStepOne();
      case 2:
        return renderStepTwo();
      case 3:
        return renderStepThree();
      default:
        return renderStepOne();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Study Plan</DialogTitle>
          <DialogDescription>
            Let's create a personalized study plan for your exam preparation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-between text-sm mb-4">
          <div className={`flex items-center ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              1
            </div>
            <span>Basics</span>
          </div>
          <Separator className="w-8 h-[1px] bg-muted-foreground/30 my-auto" />
          <div className={`flex items-center ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              2
            </div>
            <span>Subjects</span>
          </div>
          <Separator className="w-8 h-[1px] bg-muted-foreground/30 my-auto" />
          <div className={`flex items-center ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              3
            </div>
            <span>Preferences</span>
          </div>
        </div>
        
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
