
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, X } from 'lucide-react';
import { format } from "date-fns";
import { NewStudyPlan, StudyPlanSubject } from "@/types/user/studyPlan";
import { useToast } from "@/hooks/use-toast";

interface CreateStudyPlanWizardProps {
  onClose: () => void;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [planData, setPlanData] = useState<Partial<NewStudyPlan>>({
    status: 'active',
    difficulty: 'intermediate',
    subjects: []
  });
  const [examDate, setExamDate] = useState<Date>();
  const { toast } = useToast();

  const handleInputChange = (field: keyof NewStudyPlan, value: any) => {
    setPlanData(prev => ({ ...prev, [field]: value }));
  };

  const handleExamDateSelect = (date: Date | undefined) => {
    setExamDate(date);
    if (date) {
      setPlanData(prev => ({ 
        ...prev, 
        examDate: format(date, 'yyyy-MM-dd')
      }));
    }
  };

  const addSubject = () => {
    const newSubject: Omit<StudyPlanSubject, 'id' | 'progress' | 'completed'> = {
      name: '',
      topics: [],
      hours: 0,
      difficulty: 'medium',
      priority: 'medium',
      hoursPerWeek: 0
    };
    
    setPlanData(prev => ({
      ...prev,
      subjects: [...(prev.subjects || []), newSubject]
    }));
  };

  const updateSubject = (index: number, field: keyof StudyPlanSubject, value: any) => {
    setPlanData(prev => ({
      ...prev,
      subjects: prev.subjects?.map((subject, i) => 
        i === index ? { ...subject, [field]: value } : subject
      ) || []
    }));
  };

  const removeSubject = (index: number) => {
    setPlanData(prev => ({
      ...prev,
      subjects: prev.subjects?.filter((_, i) => i !== index) || []
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Study Plan Created",
      description: `${planData.name} has been created successfully.`
    });
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                value={planData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., NEET 2025 Preparation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={planData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your study plan..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="examGoal">Exam Goal</Label>
                <Input
                  id="examGoal"
                  value={planData.examGoal || ''}
                  onChange={(e) => handleInputChange('examGoal', e.target.value)}
                  placeholder="e.g., NEET, JEE"
                />
              </div>

              <div className="space-y-2">
                <Label>Exam Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {examDate ? format(examDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={examDate}
                      onSelect={handleExamDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select 
                value={planData.difficulty} 
                onValueChange={(value) => handleInputChange('difficulty', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Subjects</h3>
              <Button onClick={addSubject} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Subject
              </Button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {planData.subjects?.map((subject, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <Input
                      placeholder="Subject name"
                      value={subject.name}
                      onChange={(e) => updateSubject(index, 'name', e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSubject(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Hours per week</Label>
                      <Input
                        type="number"
                        value={subject.hoursPerWeek || 0}
                        onChange={(e) => updateSubject(index, 'hoursPerWeek', parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label>Total hours</Label>
                      <Input
                        type="number"
                        value={subject.hours || 0}
                        onChange={(e) => updateSubject(index, 'hours', parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Difficulty</Label>
                      <Select 
                        value={subject.difficulty} 
                        onValueChange={(value) => updateSubject(index, 'difficulty', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Priority</Label>
                      <Select 
                        value={subject.priority} 
                        onValueChange={(value) => updateSubject(index, 'priority', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review & Confirm</h3>
            
            <div className="space-y-3">
              <div>
                <Label>Plan Name:</Label>
                <p className="font-medium">{planData.name}</p>
              </div>
              
              <div>
                <Label>Exam Goal:</Label>
                <p className="font-medium">{planData.examGoal}</p>
              </div>
              
              <div>
                <Label>Exam Date:</Label>
                <p className="font-medium">{planData.examDate}</p>
              </div>
              
              <div>
                <Label>Subjects ({planData.subjects?.length || 0}):</Label>
                <div className="flex flex-wrap gap-2">
                  {planData.subjects?.map((subject, index) => (
                    <Badge key={index} variant="outline">
                      {subject.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Study Plan - Step {currentStep} of 3</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose()}
          >
            {currentStep > 1 ? 'Previous' : 'Cancel'}
          </Button>
          
          <Button onClick={handleNext}>
            {currentStep < 3 ? 'Next' : 'Create Plan'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudyPlanWizard;
