
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronRight, Calendar, Clock, Target, Brain, BookOpen, PencilLine, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface AcademicAdvisorProps {
  userProfile: any;
}

interface StudyPlanState {
  goal: string;
  examDate: string;
  daysLeft: string;
  progressPercentage: number;
  todaysFocus: string[];
  weeklyFocus: Record<string, string[]>;
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const [showNewPlanDialog, setShowNewPlanDialog] = useState(false);
  
  // Initialize with user profile data or defaults
  const initialStudyPlan: StudyPlanState = {
    goal: userProfile?.studyPlan?.goal || "IIT-JEE",
    examDate: userProfile?.studyPlan?.examDate || "Apr 2025",
    daysLeft: userProfile?.studyPlan?.daysLeft || "240",
    progressPercentage: userProfile?.studyPlan?.progressPercentage || 35,
    todaysFocus: userProfile?.studyPlan?.todaysFocus || [
      'Physics: Thermodynamics', 
      'Chemistry: Equilibrium', 
      'Mathematics: Integration'
    ],
    weeklyFocus: userProfile?.studyPlan?.weeklyFocus || {
      "Monday": ["Physics: Mechanics", "Mathematics: Calculus"],
      "Tuesday": ["Chemistry: Organic Chemistry", "Physics: Electrostatics"],
      "Wednesday": ["Mathematics: Probability", "Chemistry: Physical Chemistry"],
      "Thursday": ["Physics: Modern Physics", "Mathematics: Vectors"],
      "Friday": ["Chemistry: Inorganic Chemistry", "Physics: Optics"],
      "Saturday": ["Mathematics: Coordinate Geometry", "Chemistry: Equilibrium"],
      "Sunday": ["Revision and Practice Tests"]
    }
  };
  
  const [studyPlan, setStudyPlan] = useState<StudyPlanState>(initialStudyPlan);

  const handleViewPlan = () => {
    setShowPlanDialog(true);
  };

  const handleCreatePlan = () => {
    setShowNewPlanDialog(true);
  };
  
  const handleAdjustPlan = () => {
    // First show the toast
    toast({
      title: "Plan Adjusted",
      description: "Your study plan has been updated with new focus areas.",
    });
    
    // Then close the dialog
    setShowPlanDialog(false);
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
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="text-lg">Academic Advisor</CardTitle>
              </div>
              <Badge variant="outline" className="bg-purple-100/50 text-purple-700 border-purple-200">
                AI Powered
              </Badge>
            </div>
            <CardDescription>
              Your personalized study recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {userProfile?.studyPlan || studyPlan ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Goal</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium">{studyPlan.goal}</p>
                    <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
                      {studyPlan.progressPercentage}% Complete
                    </Badge>
                  </div>
                  <Progress value={studyPlan.progressPercentage} className="h-2 mt-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Exam: {studyPlan.examDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{studyPlan.daysLeft} days left</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Focus</h4>
                  <div className="space-y-1.5">
                    {studyPlan.todaysFocus.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5 text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-2" />
                <h3 className="font-medium text-lg mb-1">No Active Study Plan</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Create a personalized study plan based on your goals
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 pt-0">
            {userProfile?.studyPlan || studyPlan ? (
              <>
                <Button 
                  variant="default" 
                  className="w-full sm:w-auto flex items-center gap-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  onClick={handleViewPlan}
                >
                  View Details <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto bg-white dark:bg-gray-800"
                  onClick={handleCreatePlan}
                >
                  <PencilLine className="h-4 w-4 mr-1" />
                  Adjust Plan
                </Button>
              </>
            ) : (
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={handleCreatePlan}
              >
                <Target className="h-4 w-4 mr-1" />
                Create Study Plan
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      {/* View Study Plan Dialog */}
      <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              Your Study Plan for {studyPlan.goal}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Plan Summary */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Exam Date</p>
                <p className="font-medium">{studyPlan.examDate}</p>
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Days Left</p>
                <p className="font-medium">{studyPlan.daysLeft}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Progress</p>
                <p className="font-medium">{studyPlan.progressPercentage}%</p>
              </div>
            </div>
            
            {/* Today's Focus */}
            <div>
              <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-500" /> 
                Today's Focus
              </h3>
              <Card>
                <CardContent className="p-4 space-y-2">
                  {studyPlan.todaysFocus.map((item, i) => (
                    <div key={`today-${i}`} className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            {/* Weekly Schedule */}
            <div>
              <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-500" /> 
                Weekly Schedule
              </h3>
              <div className="space-y-3">
                {Object.entries(studyPlan.weeklyFocus).map(([day, topics]) => (
                  <Card key={day}>
                    <div className="p-3">
                      <div className="font-medium text-sm mb-2">{day}</div>
                      <div className="space-y-1.5">
                        {topics.map((topic, i) => (
                          <div key={`${day}-${i}`} className="flex items-center gap-2 text-sm">
                            <ArrowRight className="h-3 w-3 text-gray-500" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowPlanDialog(false)}
            >
              Close
            </Button>
            <Button
              onClick={handleAdjustPlan}
              className="bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              <PencilLine className="h-4 w-4 mr-1" />
              Adjust Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create/Adjust Plan Dialog - Simplified for Demo */}
      <Dialog open={showNewPlanDialog} onOpenChange={setShowNewPlanDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{studyPlan ? "Adjust Study Plan" : "Create New Study Plan"}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 text-center">
            <div className="mb-6">
              <Brain className="mx-auto h-16 w-16 text-purple-500" />
              <h3 className="text-xl font-medium mt-4">AI is generating your personalized study plan</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Based on your goal, learning style, and available time...
              </p>
            </div>
            
            <div className="relative h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-8">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5 }}
              />
            </div>
            
            <Button
              onClick={() => {
                setShowNewPlanDialog(false);
                toast({
                  title: "Plan Created!",
                  description: "Your new study plan is ready to view.",
                });
              }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              <Target className="h-4 w-4 mr-1" />
              Generate My Plan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AcademicAdvisor;
