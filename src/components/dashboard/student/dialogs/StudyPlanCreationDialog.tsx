
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar, GraduationCap, Clock, Brain, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudyPlanCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudyPlanCreationDialog: React.FC<StudyPlanCreationDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [examType, setExamType] = useState('neet');
  const [studyTimePerDay, setStudyTimePerDay] = useState('2-4');
  const [learningStyle, setLearningStyle] = useState('visual');
  const [prioritySubject, setPrioritySubject] = useState('physics');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Set flag that study plan has been created
      localStorage.setItem('needs_study_plan_creation', 'false');
      localStorage.setItem('study_plan_created', 'true');
      
      // Save preferences to localStorage for future reference
      const studyPreferences = {
        examType,
        studyTimePerDay,
        learningStyle,
        prioritySubject,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('study_preferences', JSON.stringify(studyPreferences));
      
      toast({
        title: "Study plan created",
        description: "Your personalized study plan has been created successfully",
      });
      
      setIsSubmitting(false);
      onClose();
      
      // Redirect to the study plan page
      navigate('/dashboard/student/study-plan');
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create Your Study Plan</DialogTitle>
          <DialogDescription className="text-center">
            Let us create a personalized study plan to help you excel in your exams
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="exam-type" className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-indigo-500" />
              Preparing for which exam?
            </Label>
            <Select value={examType} onValueChange={setExamType}>
              <SelectTrigger id="exam-type">
                <SelectValue placeholder="Select exam type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neet">NEET (Medical)</SelectItem>
                <SelectItem value="jee">JEE (Engineering)</SelectItem>
                <SelectItem value="upsc">UPSC Civil Services</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-indigo-500" />
              How much time can you dedicate to studying per day?
            </Label>
            <RadioGroup 
              value={studyTimePerDay}
              onValueChange={setStudyTimePerDay}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0-2" id="time-1" />
                <Label htmlFor="time-1">Less than 2 hours</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2-4" id="time-2" />
                <Label htmlFor="time-2">2-4 hours</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4-6" id="time-3" />
                <Label htmlFor="time-3">4-6 hours</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="6+" id="time-4" />
                <Label htmlFor="time-4">More than 6 hours</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <Label className="flex items-center">
              <Brain className="mr-2 h-4 w-4 text-indigo-500" />
              What's your preferred learning style?
            </Label>
            <RadioGroup 
              value={learningStyle}
              onValueChange={setLearningStyle}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="visual" id="style-1" />
                <Label htmlFor="style-1">Visual (diagrams, charts, videos)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="auditory" id="style-2" />
                <Label htmlFor="style-2">Auditory (lectures, discussions)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reading" id="style-3" />
                <Label htmlFor="style-3">Reading/Writing (text-based materials)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="kinesthetic" id="style-4" />
                <Label htmlFor="style-4">Kinesthetic (practice, hands-on)</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority-subject" className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-indigo-500" />
              Which subject do you want to focus on most?
            </Label>
            <Select value={prioritySubject} onValueChange={setPrioritySubject}>
              <SelectTrigger id="priority-subject">
                <SelectValue placeholder="Select priority subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Skip for now
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Creating plan...</span>
                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              </>
            ) : "Create Study Plan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanCreationDialog;
