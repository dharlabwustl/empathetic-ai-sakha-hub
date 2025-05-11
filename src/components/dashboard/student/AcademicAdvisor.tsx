
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { UserProfileType, StudyPlanTopic } from '@/types/user/base';
import { Check, Clock, Calendar, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';

interface AcademicAdvisorProps {
  userProfile?: UserProfileType;
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState<string>('topics');
  const navigate = useNavigate();

  // Sample study plan data
  const studyPlan = {
    examGoal: userProfile?.goals?.[0]?.title || 'NEET 2023',
    progressPercent: 42,
    streak: 5,
    daysRemaining: 45,
    readinessScore: 68,
    topics: [
      { 
        id: '1', 
        name: 'Cell Structure and Organization', 
        difficulty: 'easy' as const, 
        completed: true, 
        status: 'completed' as const,
        priority: 'high' as const
      },
      { 
        id: '2', 
        name: 'Newton\'s Laws of Motion', 
        difficulty: 'medium' as const, 
        completed: false, 
        status: 'in-progress' as const,
        priority: 'high' as const
      },
      { 
        id: '3', 
        name: 'Periodic Table and Elements', 
        difficulty: 'hard' as const, 
        completed: false, 
        status: 'not-started' as const,
        priority: 'medium' as const
      },
    ],
    timeSpent: {
      total: 120,
      bySubject: [
        { subject: 'Physics', hours: 45 },
        { subject: 'Chemistry', hours: 35 },
        { subject: 'Biology', hours: 40 },
      ]
    },
    recommendations: [
      {
        id: '1',
        title: 'Focus on Organic Chemistry',
        description: 'Your performance in recent tests indicates a need for additional focus.',
        tags: ['chemistry', 'urgent']
      },
      {
        id: '2',
        title: 'Increase practice test frequency',
        description: 'Taking more practice tests will improve your exam readiness.',
        tags: ['practice', 'suggestion']
      }
    ],
    achievements: [
      {
        id: '1',
        name: '5-Day Streak',
        completed: true,
        status: 'completed' as const,
        priority: 'high' as const
      },
      {
        id: '2',
        name: 'Master 10 Physics Concepts',
        completed: true,
        status: 'completed' as const,
        priority: 'medium' as const
      },
      {
        id: '3',
        name: 'Complete 5 Practice Tests',
        completed: true,
        status: 'completed' as const,
        priority: 'high' as const
      }
    ],
    masteredConcepts: 48,
    totalConceptsRequired: 105,
  };

  const handleNewStudyPlan = () => {
    navigate('/dashboard/student/create-study-plan');
  };

  const handleViewTopic = (topicId: string) => {
    navigate(`/dashboard/student/concepts/${topicId}`);
  };

  return (
    <div className="space-y-6">
      {/* Plan Overview Card */}
      <Card className="bg-white dark:bg-gray-950">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left column */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Academic Advisor</h2>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  AI Powered
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Current Goal: <span className="text-blue-600">{studyPlan.examGoal}</span>
                </h3>
                <div className="flex items-center gap-2">
                  <Progress value={studyPlan.progressPercent} className="h-2 flex-1" />
                  <span className="text-sm font-medium">{studyPlan.progressPercent}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Days Remaining</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">{studyPlan.daysRemaining}</p>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <span className="font-medium">Study Streak</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">{studyPlan.streak} days</p>
                </div>
              </div>
              
              <Button onClick={handleNewStudyPlan} className="w-full mt-4">
                Create New Study Plan
              </Button>
            </div>
            
            {/* Right column - Readiness */}
            <div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 h-full">
                <h3 className="font-semibold mb-3">Exam Readiness</h3>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Overall Readiness Score</span>
                    <span className="font-semibold">{studyPlan.readinessScore}%</span>
                  </div>
                  <Progress value={studyPlan.readinessScore} className="h-2" />
                </div>
                
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Concepts Mastered</span>
                      <span>{studyPlan.masteredConcepts}/{studyPlan.totalConceptsRequired}</span>
                    </div>
                    <Progress value={(studyPlan.masteredConcepts / studyPlan.totalConceptsRequired) * 100} className="h-1.5" />
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-2 text-sm">Priority Focus Areas</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                        <span>Organic Chemistry</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-amber-500" />
                        <span>Newton's Laws of Motion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs Section */}
      <Tabs defaultValue="topics" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="topics">Topics & Progress</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="topics" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Current Topic Progress</h3>
              
              <div className="space-y-3">
                {studyPlan.topics.map((topic) => (
                  <div 
                    key={topic.id}
                    className={`p-3 border rounded-md flex justify-between items-center gap-2 ${
                      topic.completed 
                        ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/50' 
                        : (topic.status === 'in-progress' 
                          ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/50' 
                          : 'bg-white dark:bg-gray-800')
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {topic.completed ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (topic.status === 'in-progress' ? (
                          <Clock className="h-4 w-4 text-blue-600" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-gray-600" />
                        ))}
                        <h4 className="font-medium">{topic.name}</h4>
                        
                        <Badge variant={
                          topic.difficulty === 'easy' ? 'default' : 
                          topic.difficulty === 'medium' ? 'secondary' : 
                          'destructive'
                        } className="ml-2">
                          {topic.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1 ml-6">
                        Status: {topic.status === 'completed' ? 'Completed' : 
                                topic.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                      </p>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="whitespace-nowrap"
                      onClick={() => handleViewTopic(topic.id)}
                    >
                      View Topic <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Subject Time Distribution</h3>
              
              <div className="space-y-4">
                {studyPlan.timeSpent.bySubject.map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{subject.subject}</span>
                      <span>{subject.hours} hours</span>
                    </div>
                    <Progress 
                      value={(subject.hours / studyPlan.timeSpent.total) * 100} 
                      className="h-2" 
                    />
                  </div>
                ))}
                
                <div className="text-sm text-right text-muted-foreground">
                  Total: {studyPlan.timeSpent.total} hours
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Personalized Recommendations</h3>
              
              <div className="space-y-4">
                {studyPlan.recommendations.map((rec) => (
                  <div key={rec.id} className="p-4 border rounded-md">
                    <h4 className="font-semibold flex items-center gap-2">
                      {rec.tags.includes('urgent') && (
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      )}
                      {rec.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {rec.description}
                    </p>
                    <div className="flex gap-2 mt-3">
                      {rec.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="capitalize">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="study-tips">
                  <AccordionTrigger>Study Tips</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Break study sessions into 25-minute focused periods with 5-minute breaks</li>
                      <li>Review your notes within 24 hours of creating them to improve retention</li>
                      <li>Use practice tests to identify knowledge gaps</li>
                      <li>Teach concepts to others to solidify your understanding</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="improvement-areas">
                  <AccordionTrigger>Areas for Improvement</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Spend more time on organic chemistry reactions and mechanisms</li>
                      <li>Practice numerical problems in physics, especially mechanics</li>
                      <li>Review biology diagrams and terminology regularly</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Your Achievements</h3>
              
              <div className="space-y-3">
                {studyPlan.achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/50 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <h4 className="font-medium">{achievement.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Study Milestones</h3>
              
              <div className="relative pl-6 border-l border-gray-200 dark:border-gray-700 space-y-6">
                <div className="relative">
                  <div className="absolute -left-[23px] p-1 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded-full">
                    <Check className="h-3 w-3 text-green-700 dark:text-green-400" />
                  </div>
                  <h4 className="font-medium">Started Study Plan</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">August 15, 2023</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[23px] p-1 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded-full">
                    <Check className="h-3 w-3 text-green-700 dark:text-green-400" />
                  </div>
                  <h4 className="font-medium">Completed 25% of Curriculum</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">October 5, 2023</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[23px] p-1 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded-full">
                    <Check className="h-3 w-3 text-green-700 dark:text-green-400" />
                  </div>
                  <h4 className="font-medium">Reached 50% Exam Readiness</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">November 20, 2023</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[23px] p-1 bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-400 rounded-full">
                    <Clock className="h-3 w-3 text-blue-700 dark:text-blue-400" />
                  </div>
                  <h4 className="font-medium">Complete Full Curriculum</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">January 15, 2024 (Estimated)</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[23px] p-1 bg-gray-100 dark:bg-gray-800 border-2 border-gray-400 rounded-full">
                    <span className="block h-3 w-3"></span>
                  </div>
                  <h4 className="font-medium">Exam Day</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">February 20, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicAdvisor;
