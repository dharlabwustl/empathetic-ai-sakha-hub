
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole } from '@/types/user/base';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Clock, Calendar, BookOpen } from 'lucide-react';

interface CreateStudyPlanWizardProps {
  onComplete?: (plan: any) => void;
  defaultExam?: string;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({ onComplete, defaultExam }) => {
  const [step, setStep] = useState(1);
  const [planData, setPlanData] = useState({
    examType: defaultExam || '',
    examDate: '',
    studyHoursPerDay: '2',
    daysPerWeek: '5',
    subjects: [] as string[],
    preferences: {
      learningStyle: 'visual',
      studyTime: 'morning',
      breakFrequency: 'moderate',
    },
    goals: '',
    additionalNotes: ''
  });
  
  const handleChange = (field: string, value: string) => {
    setPlanData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handlePreferenceChange = (field: string, value: string) => {
    setPlanData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };
  
  const handleSubjectToggle = (subject: string) => {
    setPlanData(prev => {
      if (prev.subjects.includes(subject)) {
        return {
          ...prev,
          subjects: prev.subjects.filter(s => s !== subject)
        };
      } else {
        return {
          ...prev,
          subjects: [...prev.subjects, subject]
        };
      }
    });
  };
  
  const handleNext = () => {
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete(planData);
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Exam Type</label>
              <Select 
                value={planData.examType} 
                onValueChange={(value) => handleChange('examType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jee">JEE</SelectItem>
                  <SelectItem value="neet">NEET</SelectItem>
                  <SelectItem value="gre">GRE</SelectItem>
                  <SelectItem value="gmat">GMAT</SelectItem>
                  <SelectItem value="custom">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Exam Date</label>
              <Input 
                type="date" 
                value={planData.examDate} 
                onChange={(e) => handleChange('examDate', e.target.value)} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Study Hours/Day</label>
                <Select 
                  value={planData.studyHoursPerDay} 
                  onValueChange={(value) => handleChange('studyHoursPerDay', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="5">5+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Days/Week</label>
                <Select 
                  value={planData.daysPerWeek} 
                  onValueChange={(value) => handleChange('daysPerWeek', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="4">4 days</SelectItem>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="6">6 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Subjects to Focus On</label>
              <div className="flex flex-wrap gap-2">
                {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'].map(subject => (
                  <Button 
                    key={subject}
                    type="button"
                    variant={planData.subjects.includes(subject) ? "default" : "outline"}
                    onClick={() => handleSubjectToggle(subject)}
                    className="text-sm"
                  >
                    {subject}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Your Learning Style</label>
              <Tabs 
                defaultValue={planData.preferences.learningStyle}
                onValueChange={(value) => handlePreferenceChange('learningStyle', value)}
              >
                <TabsList className="grid grid-cols-3 mb-2">
                  <TabsTrigger value="visual">Visual</TabsTrigger>
                  <TabsTrigger value="auditory">Auditory</TabsTrigger>
                  <TabsTrigger value="kinesthetic">Hands-on</TabsTrigger>
                </TabsList>
                <TabsContent value="visual" className="text-xs text-muted-foreground">
                  You learn best through images, diagrams and visual aids.
                </TabsContent>
                <TabsContent value="auditory" className="text-xs text-muted-foreground">
                  You learn best through listening and verbal explanations.
                </TabsContent>
                <TabsContent value="kinesthetic" className="text-xs text-muted-foreground">
                  You learn best through physical activities and practicing.
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Study Time</label>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant={planData.preferences.studyTime === 'morning' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handlePreferenceChange('studyTime', 'morning')}
                  className="flex-1"
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Morning
                </Button>
                <Button 
                  type="button" 
                  variant={planData.preferences.studyTime === 'afternoon' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handlePreferenceChange('studyTime', 'afternoon')}
                  className="flex-1"
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Afternoon
                </Button>
                <Button 
                  type="button" 
                  variant={planData.preferences.studyTime === 'evening' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handlePreferenceChange('studyTime', 'evening')}
                  className="flex-1"
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Evening
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Your Study Goals</label>
              <Textarea 
                placeholder="What do you want to achieve with this study plan?"
                value={planData.goals}
                onChange={(e) => handleChange('goals', e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Additional Notes</label>
              <Textarea 
                placeholder="Any additional information that might help us create a better plan for you"
                value={planData.additionalNotes}
                onChange={(e) => handleChange('additionalNotes', e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="p-3 bg-muted rounded-md">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Study Plan Summary
              </h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Exam:</span>
                  <span className="font-medium">{planData.examType.toUpperCase()}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{planData.examDate || 'Not specified'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Study time:</span>
                  <span className="font-medium">{planData.studyHoursPerDay} hr/day, {planData.daysPerWeek} days/week</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Subjects:</span>
                  <span className="font-medium">{planData.subjects.length} selected</span>
                </li>
              </ul>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-primary" />
          Create Personalized Study Plan
        </CardTitle>
        <CardDescription>
          Answer a few questions to build your customized study plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderStep()}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        {step > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div></div>
        )}
        
        {step < 3 ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleComplete}>
            Create Plan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreateStudyPlanWizard;
