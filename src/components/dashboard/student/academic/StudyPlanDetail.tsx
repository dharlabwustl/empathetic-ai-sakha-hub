
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StudyPlan, StudyPlanSubject, StudyPlanTopic } from '@/types/user/studyPlan';
import { Calendar, Clock, GraduationCap, Book, FileText, Brain } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StudyPlanDetailProps {
  plan: StudyPlan;
  isOpen: boolean;
  onClose: () => void;
}

const StudyPlanDetail: React.FC<StudyPlanDetailProps> = ({
  plan,
  isOpen,
  onClose
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  const calculateDaysLeft = () => {
    const examDate = new Date(plan.examDate);
    const today = new Date();
    return Math.max(0, differenceInDays(examDate, today));
  };
  
  const daysLeft = plan.daysLeft !== undefined ? plan.daysLeft : calculateDaysLeft();

  const weakSubjects = plan.subjects.filter(subject => subject.proficiency === 'weak');
  const strongSubjects = plan.subjects.filter(subject => subject.proficiency === 'strong');

  const renderTopics = (subject: StudyPlanSubject) => {
    if (!subject.topics || subject.topics.length === 0) {
      return <p className="text-sm text-muted-foreground">No topics defined for this subject.</p>;
    }

    return (
      <div className="space-y-3 mt-2">
        {subject.topics.map((topic: StudyPlanTopic) => (
          <div key={topic.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/60 p-3 rounded-md">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                topic.status === 'completed' ? 'bg-green-500' : 
                topic.status === 'in-progress' ? 'bg-blue-500' : 
                topic.status === 'skipped' ? 'bg-gray-400' : 'bg-amber-500'
              }`}></div>
              <span className="text-sm">{topic.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={
                topic.difficulty === 'easy' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 
                topic.difficulty === 'hard' ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 
                'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
              }>
                {topic.difficulty}
              </Badge>
              <Badge variant="outline" className={
                topic.priority === 'high' ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' :
                topic.priority === 'low' ? 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400' :
                'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
              }>
                {topic.priority}
              </Badge>
              <Badge className={
                topic.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                topic.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                topic.status === 'skipped' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' :
                'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
              }>
                {topic.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            {plan.goal || plan.examGoal} Study Plan
          </DialogTitle>
          <DialogDescription>
            {plan.status === 'active' 
              ? 'Your current active study plan details' 
              : 'Completed study plan details'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center text-blue-700 dark:text-blue-400 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium">Exam Date</span>
                    </div>
                    <p className="text-lg font-semibold">{formatDate(plan.examDate)}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {daysLeft > 0 ? `${daysLeft} days remaining` : 'Exam day has passed'}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>The date of your exam and days remaining</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center text-purple-700 dark:text-purple-400 mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="font-medium">Study Schedule</span>
                    </div>
                    <p className="text-lg font-semibold">{plan.studyHoursPerDay} hours/day</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Preferred time: {plan.preferredStudyTime.charAt(0).toUpperCase() + plan.preferredStudyTime.slice(1)}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your study schedule and preferences</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Overall Progress</h3>
              <span>{plan.progressPercentage || plan.progressPercent || 0}%</span>
            </div>
            <Progress 
              value={plan.progressPercentage || plan.progressPercent || 0}
              className="h-2"
            />
          </div>
          
          <Tabs defaultValue="all-subjects">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all-subjects">All Subjects</TabsTrigger>
              <TabsTrigger value="weak-subjects">
                Focus Areas{' '}
                {weakSubjects.length > 0 && (
                  <Badge className="ml-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                    {weakSubjects.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="strong-subjects">
                Strong Areas{' '}
                {strongSubjects.length > 0 && (
                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    {strongSubjects.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all-subjects" className="mt-4">
              <div className="space-y-4">
                {plan.subjects.map(subject => (
                  <Card key={subject.id}>
                    <CardHeader className="py-3 pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-2" 
                            style={{ backgroundColor: subject.color }}
                          ></div>
                          <h3 className="font-medium">{subject.name}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={
                            subject.proficiency === 'weak' ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                            subject.proficiency === 'strong' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                            'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                          }>
                            {subject.proficiency}
                          </Badge>
                          <Badge variant="outline" className={
                            subject.priority === 'high' ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' :
                            subject.priority === 'low' ? 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400' :
                            'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                          }>
                            {subject.priority} priority
                          </Badge>
                          <span className="text-sm text-muted-foreground">{subject.hoursPerWeek} hrs/week</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {renderTopics(subject)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="weak-subjects" className="mt-4">
              {weakSubjects.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/40 rounded-lg">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-1">No weak subjects identified</h3>
                  <p className="text-muted-foreground">
                    You haven't marked any subjects as needing extra focus
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {weakSubjects.map(subject => (
                    <Card key={subject.id} className="border-red-200 dark:border-red-900/30">
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded-full mr-2" 
                              style={{ backgroundColor: subject.color }}
                            ></div>
                            <h3 className="font-medium">{subject.name}</h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                              Focus needed
                            </Badge>
                            <span className="text-sm text-muted-foreground">{subject.hoursPerWeek} hrs/week</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {renderTopics(subject)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="strong-subjects" className="mt-4">
              {strongSubjects.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/40 rounded-lg">
                  <Book className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-1">No strong subjects identified</h3>
                  <p className="text-muted-foreground">
                    You haven't marked any subjects as strong areas yet
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {strongSubjects.map(subject => (
                    <Card key={subject.id} className="border-green-200 dark:border-green-900/30">
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded-full mr-2" 
                              style={{ backgroundColor: subject.color }}
                            ></div>
                            <h3 className="font-medium">{subject.name}</h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                              Strong area
                            </Badge>
                            <span className="text-sm text-muted-foreground">{subject.hoursPerWeek} hrs/week</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {renderTopics(subject)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={onClose}>Close</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close this dialog</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {plan.status === 'active' && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary">Edit Plan</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Modify your current study plan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button>Start Studying</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Begin your study session now</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDetail;
