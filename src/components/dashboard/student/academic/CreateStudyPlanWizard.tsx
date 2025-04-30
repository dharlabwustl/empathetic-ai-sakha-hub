
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalityType } from '@/types/user/base';

// Define the UserRole here since it's needed in this component
export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin'
}

// Define the study plan interface
export interface NewStudyPlan {
  title: string;
  goalExam: string;
  subjects: string[];
  duration: number;
  dailyHours: number;
  startDate: string;
}

// Define props for the component
export interface CreateStudyPlanWizardProps {
  examGoal: string;
  isOpen?: boolean;
  onClose?: () => void;
  onCreatePlan: (plan: NewStudyPlan) => void;
}

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  examGoal,
  isOpen = true,
  onClose = () => {},
  onCreatePlan
}) => {
  const [activeTab, setActiveTab] = useState('subjects');
  const [plan, setPlan] = useState<NewStudyPlan>({
    title: `My ${examGoal} Prep Plan`,
    goalExam: examGoal,
    subjects: [],
    duration: 12,
    dailyHours: 3,
    startDate: new Date().toISOString().split('T')[0]
  });

  // Mock subjects based on exam type
  const getSubjectsForExam = (exam: string) => {
    switch (exam.toLowerCase()) {
      case 'iit-jee':
        return ['Physics', 'Chemistry', 'Mathematics'];
      case 'neet':
        return ['Biology', 'Physics', 'Chemistry'];
      case 'upsc':
        return ['History', 'Geography', 'Polity', 'Economics', 'Science & Technology'];
      default:
        return ['Mathematics', 'Science', 'English', 'General Knowledge'];
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCreatePlan = () => {
    // Final validation could be done here
    onCreatePlan(plan);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95">
        <CardHeader>
          <CardTitle>Create Study Plan for {examGoal}</CardTitle>
          <CardDescription>
            Let's personalize your study journey for optimal results
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="approach">Approach</TabsTrigger>
            </TabsList>
            
            <TabsContent value="subjects" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Select Your Subjects</h3>
                <p className="text-sm text-gray-500">
                  Based on {examGoal}, we recommend these subjects for your preparation
                </p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {getSubjectsForExam(examGoal).map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={subject}
                        checked={plan.subjects.includes(subject)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPlan({...plan, subjects: [...plan.subjects, subject]});
                          } else {
                            setPlan({...plan, subjects: plan.subjects.filter(s => s !== subject)});
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={subject} className="text-sm font-medium text-gray-700">
                        {subject}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleTabChange('schedule')}>
                  Next: Schedule
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Plan Duration (weeks)
                  </label>
                  <input
                    type="range"
                    id="duration"
                    value={plan.duration}
                    onChange={(e) => setPlan({...plan, duration: Number(e.target.value)})}
                    min="1"
                    max="52"
                    step="1"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>{plan.duration} weeks</span>
                    <span>52</span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="daily-hours" className="block text-sm font-medium text-gray-700">
                    Daily Study Hours
                  </label>
                  <input
                    type="range"
                    id="daily-hours"
                    value={plan.dailyHours}
                    onChange={(e) => setPlan({...plan, dailyHours: Number(e.target.value)})}
                    min="1"
                    max="10"
                    step="0.5"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>{plan.dailyHours} hours</span>
                    <span>10</span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    value={plan.startDate}
                    onChange={(e) => setPlan({...plan, startDate: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => handleTabChange('subjects')}>
                  Previous: Subjects
                </Button>
                <Button onClick={() => handleTabChange('approach')}>
                  Next: Approach
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="approach" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Study Approach</h3>
                <p className="text-sm text-gray-500">
                  We'll tailor your study materials based on these preferences
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium">Visual Learning</h4>
                    <p className="text-sm text-gray-500">
                      Diagrams, videos, and visual concept maps
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium">Practical Application</h4>
                    <p className="text-sm text-gray-500">
                      Examples, case studies, and problem solving
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium">Spaced Repetition</h4>
                    <p className="text-sm text-gray-500">
                      Regular review of concepts at optimal intervals
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium">Active Recall</h4>
                    <p className="text-sm text-gray-500">
                      Self-testing and practice question emphasis
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => handleTabChange('schedule')}>
                  Previous: Schedule
                </Button>
                <Button onClick={handleCreatePlan}>
                  Create Study Plan
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-end border-t pt-4">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateStudyPlanWizard;
