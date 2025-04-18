
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  ArrowRight, 
  Edit, 
  Clock, 
  BarChart, 
  CheckCircle,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { UserProfileType } from '@/types/user/base';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface AcademicAdvisorProps {
  userProfile: UserProfileType;
}

interface StudyPlanItem {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface SubjectProgress {
  subject: string;
  progress: number;
  color: string;
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [showCreatePlanDialog, setShowCreatePlanDialog] = useState(false);
  const [selectedWeekday, setSelectedWeekday] = useState<string>('monday');
  
  // Extract exam goal from user profile
  const examGoal = userProfile.examPreparation || userProfile.goals?.[0]?.title || 'JEE';
  
  // Sample study plans
  const studyPlans: Record<string, StudyPlanItem[]> = {
    monday: [
      { id: '1', subject: 'Physics', topic: 'Newton\'s Laws of Motion', duration: 90, priority: 'high', completed: true },
      { id: '2', subject: 'Chemistry', topic: 'Chemical Bonding', duration: 60, priority: 'medium', completed: false },
      { id: '3', subject: 'Mathematics', topic: 'Integration', duration: 120, priority: 'high', completed: false },
    ],
    tuesday: [
      { id: '4', subject: 'Physics', topic: 'Electrostatics', duration: 90, priority: 'medium', completed: false },
      { id: '5', subject: 'Chemistry', topic: 'Organic Chemistry Basics', duration: 120, priority: 'high', completed: false },
      { id: '6', subject: 'Mathematics', topic: 'Coordinate Geometry', duration: 90, priority: 'medium', completed: false },
    ],
    wednesday: [
      { id: '7', subject: 'Physics', topic: 'Optics', duration: 120, priority: 'high', completed: false },
      { id: '8', subject: 'Chemistry', topic: 'Thermodynamics', duration: 90, priority: 'medium', completed: false },
      { id: '9', subject: 'Mathematics', topic: 'Differentiation', duration: 90, priority: 'high', completed: false },
    ],
    thursday: [
      { id: '10', subject: 'Physics', topic: 'Modern Physics', duration: 120, priority: 'medium', completed: false },
      { id: '11', subject: 'Chemistry', topic: 'Solutions', duration: 60, priority: 'low', completed: false },
      { id: '12', subject: 'Mathematics', topic: 'Probability', duration: 90, priority: 'medium', completed: false },
    ],
    friday: [
      { id: '13', subject: 'Physics', topic: 'Waves', duration: 90, priority: 'medium', completed: false },
      { id: '14', subject: 'Chemistry', topic: 'Equilibrium', duration: 90, priority: 'high', completed: false },
      { id: '15', subject: 'Mathematics', topic: 'Vectors', duration: 120, priority: 'high', completed: false },
    ],
    saturday: [
      { id: '16', subject: 'Physics', topic: 'Revision', duration: 180, priority: 'high', completed: false },
      { id: '17', subject: 'Chemistry', topic: 'Practice Tests', duration: 120, priority: 'high', completed: false },
      { id: '18', subject: 'Mathematics', topic: 'Problem Solving', duration: 120, priority: 'high', completed: false },
    ],
    sunday: [
      { id: '19', subject: 'Physics', topic: 'Mock Test', duration: 180, priority: 'high', completed: false },
      { id: '20', subject: 'Self-Care', topic: 'Rest and Relaxation', duration: 120, priority: 'medium', completed: false },
    ],
  };

  // Subject progress data
  const subjectProgress: SubjectProgress[] = [
    { subject: 'Physics', progress: 62, color: 'bg-blue-500' },
    { subject: 'Chemistry', progress: 45, color: 'bg-green-500' },
    { subject: 'Mathematics', progress: 78, color: 'bg-violet-500' },
  ];

  // Weekly goal completion rate
  const weeklyCompletion = 65;

  const handleMarkAsComplete = (id: string) => {
    toast({
      title: "Task Completed",
      description: "You've marked this task as complete!",
      variant: "default",
    });
  };

  const handleViewDetails = (subject: string) => {
    toast({
      title: "Subject Details",
      description: `Viewing detailed progress for ${subject}`,
      variant: "default",
    });
  };

  const handleCreatePlan = () => {
    setShowCreatePlanDialog(false);
    toast({
      title: "Study Plan Created",
      description: "Your new study plan has been created successfully!",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6 pb-8">
      <motion.div 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <GraduationCap className="mr-3 h-8 w-8 text-indigo-600" />
            Academic Advisor
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Personalized guidance for your {examGoal} preparation
          </p>
        </div>
        
        <Button 
          className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700"
          onClick={() => setShowCreatePlanDialog(true)}
        >
          Create Study Plan
        </Button>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Overview */}
        <motion.div 
          className="lg:col-span-2" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Weekly Study Plan
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Your personalized schedule for effective learning
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0">
              <Tabs value={selectedWeekday} onValueChange={setSelectedWeekday} className="w-full">
                <div className="bg-gray-50 border-b border-gray-200 overflow-x-auto">
                  <TabsList className="bg-transparent h-auto p-2 w-auto inline-flex overflow-x-auto min-w-full">
                    {Object.keys(studyPlans).map((day) => (
                      <TabsTrigger 
                        key={day} 
                        value={day}
                        className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
                      >
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {Object.entries(studyPlans).map(([day, plans]) => (
                  <TabsContent key={day} value={day} className="p-4 space-y-4 m-0">
                    {plans.map((plan) => (
                      <div 
                        key={plan.id} 
                        className={`p-4 rounded-lg border ${
                          plan.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <span className={`w-2 h-2 rounded-full mr-2 ${
                                plan.priority === 'high' ? 'bg-red-500' :
                                plan.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}></span>
                              <h3 className="font-medium">
                                {plan.subject}: {plan.topic}
                              </h3>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{plan.duration} minutes</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs"
                              onClick={() => handleViewDetails(plan.subject)}
                            >
                              View Details
                            </Button>
                            <Button 
                              size="sm"
                              className="text-xs"
                              disabled={plan.completed}
                              onClick={() => handleMarkAsComplete(plan.id)}
                            >
                              {plan.completed ? (
                                <span className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  Completed
                                </span>
                              ) : "Mark Complete"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm" onClick={() => setShowCreatePlanDialog(true)}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add More Activities
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Subject Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Subject Progress
              </CardTitle>
              <CardDescription className="text-blue-100">
                Track your performance across subjects
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-4 space-y-6">
              <div className="space-y-4">
                {subjectProgress.map((subject, index) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <span className="text-sm">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className={subject.color} />
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900">Weekly Goal Completion</h3>
                <div className="mt-2 relative pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
                        {weeklyCompletion}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Target: 80%
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mt-2 text-xs flex rounded bg-blue-200">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${weeklyCompletion}%` }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                </div>
                {weeklyCompletion < 70 && (
                  <div className="mt-3 text-xs flex items-center text-amber-600">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    <span>You're behind on your weekly goals</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleViewDetails('all')}
                >
                  View Full Analysis <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Create Study Plan Dialog */}
      <Dialog open={showCreatePlanDialog} onOpenChange={setShowCreatePlanDialog}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle>Create New Study Plan</DialogTitle>
            <DialogDescription>
              Customize your study plan to fit your learning goals and schedule.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select defaultValue="physics">
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="day">Day of Week</Label>
                <Select defaultValue="monday">
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(studyPlans).map((day) => (
                      <SelectItem key={day} value={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input id="topic" placeholder="Enter topic name" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="60" min="15" step="15" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="recurring" />
              <Label htmlFor="recurring" className="text-sm">Make this a recurring study session</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreatePlanDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePlan}>
              Create Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AcademicAdvisor;
