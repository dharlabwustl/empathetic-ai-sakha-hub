
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Clock, GraduationCap, Calendar, Target, BookOpen } from 'lucide-react';

interface StudyPlanCreationDialogProps {
  open: boolean;
  onClose: () => void;
  onCreatePlan: (planData: any) => void;
}

export function StudyPlanCreationDialog({
  open,
  onClose,
  onCreatePlan
}: StudyPlanCreationDialogProps) {
  const { toast } = useToast();
  const [examType, setExamType] = useState('neet');
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(3);
  const [preferredSubjects, setPreferredSubjects] = useState({
    physics: true,
    chemistry: true,
    biology: true,
    mathematics: false
  });
  const [examDate, setExamDate] = useState<string>(
    new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  const handleSubmit = () => {
    const planData = {
      examType,
      studyHoursPerDay,
      preferredSubjects: Object.entries(preferredSubjects)
        .filter(([_, selected]) => selected)
        .map(([subject]) => subject),
      examDate
    };
    
    // Mock API call to create study plan
    setTimeout(() => {
      onCreatePlan(planData);
      
      toast({
        title: "Study Plan Created!",
        description: "Your personalized study plan is ready. You can view it in your dashboard.",
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Create Your Personalized Study Plan
          </DialogTitle>
          <DialogDescription>
            Let's set up a study schedule tailored to your needs and goals.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center">
              <GraduationCap className="h-4 w-4 mr-2 text-purple-600" />
              Which exam are you preparing for?
            </h3>
            <RadioGroup value={examType} onValueChange={setExamType}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neet" id="neet" />
                  <Label htmlFor="neet">NEET (Medical)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="jee" id="jee" />
                  <Label htmlFor="jee">JEE (Engineering)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-600" />
                How many hours can you study daily?
              </h3>
              <span className="font-medium">{studyHoursPerDay} hours</span>
            </div>
            <Slider
              value={[studyHoursPerDay]}
              min={1}
              max={8}
              step={0.5}
              onValueChange={(value) => setStudyHoursPerDay(value[0])}
            />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-green-600" />
              Select your subjects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="physics" 
                  checked={preferredSubjects.physics}
                  onCheckedChange={(checked) => 
                    setPreferredSubjects({...preferredSubjects, physics: checked === true})
                  }
                />
                <Label htmlFor="physics">Physics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="chemistry" 
                  checked={preferredSubjects.chemistry}
                  onCheckedChange={(checked) => 
                    setPreferredSubjects({...preferredSubjects, chemistry: checked === true})
                  }
                />
                <Label htmlFor="chemistry">Chemistry</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="biology" 
                  checked={preferredSubjects.biology}
                  onCheckedChange={(checked) => 
                    setPreferredSubjects({...preferredSubjects, biology: checked === true})
                  }
                />
                <Label htmlFor="biology">Biology</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="mathematics" 
                  checked={preferredSubjects.mathematics}
                  onCheckedChange={(checked) => 
                    setPreferredSubjects({...preferredSubjects, mathematics: checked === true})
                  }
                />
                <Label htmlFor="mathematics">Mathematics</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-red-600" />
              When is your exam?
            </h3>
            <input
              type="date"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Skip for now
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Create Study Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
