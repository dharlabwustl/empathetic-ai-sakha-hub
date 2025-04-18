
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronRight, Calendar, Clock, Target, Brain, BookOpen, PencilLine, ArrowRight, Plus, GraduationCap, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AcademicAdvisorProps {
  userProfile: any;
}

interface StudyPlan {
  id: string;
  examGoal: string;
  examDate: string;
  daysLeft: number;
  createdAt: string;
  status: 'active' | 'completed' | 'expired';
  progressPercentage: number;
  subjects: {
    name: string;
    topics: {
      name: string;
      duration: number;
      status: 'pending' | 'in-progress' | 'completed';
      priority: 'high' | 'medium' | 'low';
    }[];
    allocatedHours: number;
    proficiency: 'weak' | 'moderate' | 'strong';
    progress: number;
  }[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showNewPlanDialog, setShowNewPlanDialog] = useState(false);
  const [newPlanStep, setNewPlanStep] = useState(1);
  const [activePlanTab, setActivePlanTab] = useState<string>("overview");
  
  // Sample active study plan
  const activePlan: StudyPlan = {
    id: "plan-1",
    examGoal: userProfile?.examPreparation || "IIT-JEE",
    examDate: "Apr 15, 2025",
    daysLeft: 240,
    createdAt: "2024-04-10T12:00:00Z",
    status: 'active',
    progressPercentage: 35,
    subjects: [
      {
        name: "Physics",
        topics: [
          { name: "Mechanics", duration: 120, status: 'in-progress', priority: 'high' },
          { name: "Thermodynamics", duration: 90, status: 'pending', priority: 'medium' },
          { name: "Electrostatics", duration: 60, status: 'completed', priority: 'high' }
        ],
        allocatedHours: 40,
        proficiency: 'moderate',
        progress: 45
      },
      {
        name: "Chemistry",
        topics: [
          { name: "Organic Chemistry", duration: 120, status: 'pending', priority: 'high' },
          { name: "Chemical Bonding", duration: 60, status: 'in-progress', priority: 'medium' },
          { name: "Equilibrium", duration: 90, status: 'pending', priority: 'low' }
        ],
        allocatedHours: 30,
        proficiency: 'weak',
        progress: 25
      },
      {
        name: "Mathematics",
        topics: [
          { name: "Calculus", duration: 120, status: 'completed', priority: 'high' },
          { name: "Coordinate Geometry", duration: 90, status: 'completed', priority: 'high' },
          { name: "Probability", duration: 60, status: 'in-progress', priority: 'medium' }
        ],
        allocatedHours: 45,
        proficiency: 'strong',
        progress: 72
      }
    ],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  };
  
  // Sample historical plans
  const historicalPlans: StudyPlan[] = [
    {
      id: "plan-old-1",
      examGoal: "IIT-JEE",
      examDate: "Apr 15, 2025",
      daysLeft: 0,
      createdAt: "2024-03-01T12:00:00Z",
      status: 'expired',
      progressPercentage: 65,
      subjects: [
        {
          name: "Physics",
          topics: [
            { name: "Mechanics", duration: 120, status: 'completed', priority: 'high' },
            { name: "Waves", duration: 90, status: 'completed', priority: 'medium' }
          ],
          allocatedHours: 30,
          proficiency: 'weak',
          progress: 65
        },
        {
          name: "Chemistry",
          topics: [
            { name: "Periodic Table", duration: 60, status: 'completed', priority: 'medium' }
          ],
          allocatedHours: 25,
          proficiency: 'weak',
          progress: 60
        },
        {
          name: "Mathematics",
          topics: [
            { name: "Algebra", duration: 120, status: 'completed', priority: 'high' }
          ],
          allocatedHours: 35,
          proficiency: 'moderate',
          progress: 70
        }
      ],
      studyHoursPerDay: 5,
      preferredStudyTime: 'morning',
      learningPace: 'slow'
    }
  ];
  
  const getTopicStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleCreateNewPlan = () => {
    // Reset the step counter
    setNewPlanStep(1);
    setShowNewPlanDialog(true);
  };
  
  const handleNewPlanNext = () => {
    if (newPlanStep < 4) {
      setNewPlanStep(newPlanStep + 1);
    } else {
      setShowNewPlanDialog(false);
      toast({
        title: "New Study Plan Created!",
        description: "Your personalized study plan has been generated successfully.",
      });
    }
  };
  
  const handleNewPlanBack = () => {
    if (newPlanStep > 1) {
      setNewPlanStep(newPlanStep - 1);
    }
  };
  
  const handleViewActivePlan = () => {
    setShowPlanDialog(true);
  };
  
  const handleViewHistoricalPlans = () => {
    setShowHistoryDialog(true);
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <motion.div
        className="space-y-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              Academic Advisor
            </h1>
            <p className="text-gray-500">Your personalized study plan for {activePlan.examGoal}</p>
          </div>
          
          <Button 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            onClick={handleCreateNewPlan}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Smart Study Plan
          </Button>
        </div>
        
        {/* Current Plan Overview Card */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-600" />
                  Current Study Plan
                </CardTitle>
                <CardDescription>
                  Created on {formatDate(activePlan.createdAt)}
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-indigo-100 text-indigo-700 border-indigo-200">
                {activePlan.daysLeft} days left
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Exam Goal</h3>
                <p className="font-semibold">{activePlan.examGoal}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Exam Date</h3>
                <p className="font-semibold">{activePlan.examDate}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Study Hours/Day</h3>
                <p className="font-semibold">{activePlan.studyHoursPerDay} hours</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Overall Progress</h3>
              <Progress value={activePlan.progressPercentage} className="h-2 mb-1" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{activePlan.progressPercentage}% Complete</span>
                <span>Target: 100%</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Subject Progress</h3>
              <div className="space-y-4">
                {activePlan.subjects.map((subject) => (
                  <div key={subject.name} className="space-y-1">
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{subject.name}</span>
                        {subject.proficiency === 'weak' && 
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-100">Focus Needed</Badge>
                        }
                      </div>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className={
                      subject.proficiency === 'strong' ? 'bg-green-500 h-2' : 
                      subject.proficiency === 'moderate' ? 'bg-amber-500 h-2' : 
                      'bg-red-500 h-2'
                    } />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Today's Focus</h3>
              <div className="space-y-2">
                {activePlan.subjects.map((subject) => {
                  const inProgressTopic = subject.topics.find(t => t.status === 'in-progress');
                  if (!inProgressTopic) return null;
                  
                  return (
                    <div key={`today-${subject.name}`} className="flex items-start gap-2 p-3 border rounded-lg bg-white">
                      <div className={`h-2 w-2 mt-2 rounded-full ${getTopicStatusColor(inProgressTopic.status)}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{subject.name}: {inProgressTopic.name}</h4>
                          {getPriorityBadge(inProgressTopic.priority)}
                        </div>
                        <p className="text-sm text-gray-500">Duration: {inProgressTopic.duration} minutes</p>
                      </div>
                    </div>
                  );
                }).filter(Boolean)}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t pt-4 flex gap-2 justify-between">
            <Button 
              variant="outline" 
              onClick={handleViewHistoricalPlans}
              className="border-indigo-200"
            >
              <Clock className="mr-2 h-4 w-4" />
              View Plan History
            </Button>
            <Button onClick={handleViewActivePlan}>
              <ChevronRight className="mr-2 h-4 w-4" />
              View Full Plan
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      {/* View Active Study Plan Dialog */}
      <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-indigo-600" />
              Study Plan for {activePlan.examGoal}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Tabs value={activePlanTab} onValueChange={setActivePlanTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Exam Goal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-indigo-700">{activePlan.examGoal}</div>
                      <p className="text-sm text-gray-500 mt-1">Target exam</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Exam Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-indigo-700">{activePlan.examDate}</div>
                      <p className="text-sm text-gray-500 mt-1">{activePlan.daysLeft} days remaining</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-indigo-700">{activePlan.progressPercentage}%</div>
                      <Progress value={activePlan.progressPercentage} className="h-2 mt-2" />
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Study Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Daily Study Hours</h4>
                        <p className="font-medium">{activePlan.studyHoursPerDay} hours</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Preferred Study Time</h4>
                        <p className="font-medium capitalize">{activePlan.preferredStudyTime}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Learning Pace</h4>
                        <p className="font-medium capitalize">{activePlan.learningPace}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Subject Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activePlan.subjects.map(subject => (
                      <div key={subject.name}>
                        <div className="flex justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{subject.name}</span>
                            {subject.proficiency === 'weak' && 
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-100">Focus Needed</Badge>
                            }
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{subject.allocatedHours} hours allocated</span>
                            <span className="text-gray-500">|</span>
                            <span>{subject.progress}% complete</span>
                          </div>
                        </div>
                        <Progress value={subject.progress} className={
                          subject.proficiency === 'strong' ? 'bg-green-500 h-2' : 
                          subject.proficiency === 'moderate' ? 'bg-amber-500 h-2' : 
                          'bg-red-500 h-2'
                        } />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="subjects" className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  {activePlan.subjects.map(subject => (
                    <AccordionItem key={subject.name} value={subject.name}>
                      <AccordionTrigger>
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{subject.name}</span>
                            {subject.proficiency === 'weak' && 
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-100">Focus Needed</Badge>
                            }
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={subject.progress} className={`w-24 ${
                              subject.proficiency === 'strong' ? 'bg-green-500 h-2' : 
                              subject.proficiency === 'moderate' ? 'bg-amber-500 h-2' : 
                              'bg-red-500 h-2'
                            }`} />
                            <span>{subject.progress}%</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {subject.topics.map(topic => (
                            <div key={topic.name} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center gap-3">
                                <div className={`h-3 w-3 rounded-full ${getTopicStatusColor(topic.status)}`} />
                                <span>{topic.name}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                {getPriorityBadge(topic.priority)}
                                <span className="text-sm text-gray-500">{topic.duration} min</span>
                                {topic.status === 'completed' && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weekly Schedule</CardTitle>
                    <CardDescription>Based on your preferred study hours and time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <div key={day} className="border rounded-lg p-3">
                          <h4 className="font-medium mb-2">{day}</h4>
                          <div className="space-y-2 pl-2">
                            {activePlan.subjects.map((subject, idx) => {
                              if (idx % 7 !== ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day) % 3) return null;
                              
                              return (
                                <div key={`${day}-${subject.name}`} className="flex items-center gap-2 text-sm">
                                  <span className="text-indigo-600">{activePlan.preferredStudyTime === 'morning' ? '08:00 AM' : 
                                    activePlan.preferredStudyTime === 'afternoon' ? '02:00 PM' : 
                                    activePlan.preferredStudyTime === 'evening' ? '06:00 PM' : '09:00 PM'
                                  } - {subject.name}</span>
                                  <span className="text-gray-500">{subject.topics[0]?.name}</span>
                                </div>
                              );
                            }).filter(Boolean)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPlanDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Historical Plans Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              Study Plan History
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            {historicalPlans.length > 0 ? (
              historicalPlans.map(plan => (
                <Card key={plan.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{plan.examGoal}</CardTitle>
                        <CardDescription>
                          Created on {formatDate(plan.createdAt)}
                        </CardDescription>
                      </div>
                      <Badge variant={plan.status === 'completed' ? 'default' : 'secondary'} className={plan.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'}>
                        {plan.status === 'completed' ? 'Completed' : 'Expired'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Progress value={plan.progressPercentage} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{plan.progressPercentage}%</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500 block">Study Hours/Day</span>
                        <span className="font-medium">{plan.studyHoursPerDay} hours</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Learning Pace</span>
                        <span className="font-medium capitalize">{plan.learningPace}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Subjects</span>
                        <span className="font-medium">{plan.subjects.length}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Subject Progress</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {plan.subjects.map(subject => (
                          <div key={subject.name} className="border rounded-md p-2">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">{subject.name}</span>
                              <span className="text-sm">{subject.progress}%</span>
                            </div>
                            <Progress value={subject.progress} className="h-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <Clock className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Past Plans</h3>
                <p className="text-sm text-gray-500">
                  All your previous study plans will appear here.
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHistoryDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create New Study Plan Dialog */}
      <Dialog open={showNewPlanDialog} onOpenChange={setShowNewPlanDialog}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Smart Study Plan</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step === newPlanStep ? 'bg-indigo-600 text-white' : 
                      step < newPlanStep ? 'bg-green-500 text-white' : 
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {step < newPlanStep ? <Check className="h-4 w-4" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`h-1 w-10 ${
                        step < newPlanStep ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Step 1 - Exam Goal */}
              {newPlanStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Choose Your Exam Goal</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="exam-goal">Exam</Label>
                      <Select defaultValue={activePlan.examGoal}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select exam" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IIT-JEE">IIT-JEE</SelectItem>
                          <SelectItem value="NEET">NEET</SelectItem>
                          <SelectItem value="UPSC">UPSC</SelectItem>
                          <SelectItem value="CAT">CAT</SelectItem>
                          <SelectItem value="GATE">GATE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="exam-date">Exam Date</Label>
                      <Input type="date" id="exam-date" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2 - Subjects */}
              {newPlanStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Subject Preferences</h2>
                  <p className="text-sm text-gray-500">Rate your proficiency in each subject</p>
                  
                  <div className="space-y-4">
                    {['Physics', 'Chemistry', 'Mathematics'].map(subject => (
                      <div key={subject} className="space-y-2">
                        <Label>{subject}</Label>
                        <Select defaultValue="moderate">
                          <SelectTrigger>
                            <SelectValue placeholder="Select proficiency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weak">Weak (Need more focus)</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="strong">Strong</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Step 3 - Study Preferences */}
              {newPlanStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Study Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hours-per-day">Study Hours Per Day</Label>
                      <Select defaultValue="6">
                        <SelectTrigger id="hours-per-day">
                          <SelectValue placeholder="Select hours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 hours</SelectItem>
                          <SelectItem value="4">4 hours</SelectItem>
                          <SelectItem value="6">6 hours</SelectItem>
                          <SelectItem value="8">8 hours</SelectItem>
                          <SelectItem value="10">10+ hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preferred-time">Preferred Study Time</Label>
                      <Select defaultValue="evening">
                        <SelectTrigger id="preferred-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                          <SelectItem value="night">Night</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="learning-pace">Learning Pace</Label>
                      <Select defaultValue="moderate">
                        <SelectTrigger id="learning-pace">
                          <SelectValue placeholder="Select pace" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Slow & Steady</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="fast">Fast-paced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 4 - Review & Generate */}
              {newPlanStep === 4 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Review & Generate Plan</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 rounded-lg space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-sm text-gray-500">Exam Goal</span>
                          <p className="font-medium">{activePlan.examGoal}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Study Hours/Day</span>
                          <p className="font-medium">6 hours</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Preferred Study Time</span>
                          <p className="font-medium capitalize">Evening</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Learning Pace</span>
                          <p className="font-medium capitalize">Moderate</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Subject Focus</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {activePlan.subjects.map(subject => (
                          <div key={subject.name} className="p-2 border rounded-md">
                            <span className="font-medium">{subject.name}</span>
                            <p className="text-sm text-gray-500 capitalize">{subject.proficiency}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Brain className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800">AI is ready to create your personalized plan</p>
                          <p className="text-sm text-yellow-700">This will replace your current active plan</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <div className="w-full flex justify-between">
              {newPlanStep > 1 ? (
                <Button variant="outline" onClick={handleNewPlanBack}>Back</Button>
              ) : (
                <Button variant="outline" onClick={() => setShowNewPlanDialog(false)}>Cancel</Button>
              )}
              
              <Button onClick={handleNewPlanNext}>
                {newPlanStep === 4 ? (
                  <>Generate Plan</>
                ) : (
                  <>Next</>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AcademicAdvisor;
