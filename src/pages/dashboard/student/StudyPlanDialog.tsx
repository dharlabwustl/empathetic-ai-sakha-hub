
// Update the StudyPlanDialog to fix the "subtle" button variant issue
import React, { useState } from "react";
import { UserProfileType } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  BarChart, 
  BookMarked, 
  CalendarDays, 
  ChevronRight, 
  Clock, 
  Compass, 
  ListChecks,
  Pencil
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface StudyPlanDialogProps {
  userProfile: UserProfileType;
  onClose: () => void;
}

const StudyPlanDialog: React.FC<StudyPlanDialogProps> = ({ userProfile, onClose }) => {
  const [activeTab, setActiveTab] = useState("today");
  
  // Mock data
  const examGoal = userProfile?.examPreparation || "IIT-JEE";
  const remainingDays = 120; // Days remaining for exam
  const completedTopics = 24;
  const totalTopics = 56;
  const completionPercentage = Math.round((completedTopics / totalTopics) * 100);
  
  const todayPlan = [
    { id: 1, subject: "Physics", topic: "Rigid Body Dynamics", duration: 60, completed: true },
    { id: 2, subject: "Chemistry", topic: "Chemical Equilibrium", duration: 45, completed: false },
    { id: 3, subject: "Mathematics", topic: "Differential Equations", duration: 60, completed: false },
  ];
  
  const weekPlan = [
    { day: "Monday", topics: ["Physics: Mechanics", "Chemistry: Periodic Table"] },
    { day: "Tuesday", topics: ["Mathematics: Calculus", "Chemistry: Organic Chemistry"] },
    { day: "Wednesday", topics: ["Physics: Thermodynamics", "Mathematics: Algebra"] },
    { day: "Thursday", topics: ["Chemistry: Physical Chemistry", "Physics: Optics"] },
    { day: "Friday", topics: ["Mathematics: Trigonometry", "Physics: Modern Physics"] },
    { day: "Saturday", topics: ["Full-length Practice Test", "Revision"] },
    { day: "Sunday", topics: ["Weak Areas Review", "Rest and Recharge"] },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <BookMarked className="h-6 w-6 text-indigo-500" />
            Study Plan for {examGoal}
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center gap-1 text-sm bg-sky-100 dark:bg-sky-900/30 px-3 py-1 rounded-full">
                <CalendarDays className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <span>{remainingDays} days remaining</span>
              </div>
              <div className="flex items-center gap-1 text-sm bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                <ListChecks className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>{completedTopics} of {totalTopics} topics completed</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} />
        </div>
        
        <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="today">Today's Plan</TabsTrigger>
            <TabsTrigger value="week">Weekly Overview</TabsTrigger>
            <TabsTrigger value="topics">All Topics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-4">
            <h3 className="text-lg font-medium mb-4">Today's Study Schedule</h3>
            
            <div className="space-y-4">
              {todayPlan.map(item => (
                <div 
                  key={item.id}
                  className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border ${
                    item.completed 
                      ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{item.subject}: {item.topic}</h4>
                    <div className="flex items-center mt-1 gap-3">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.duration} minutes
                      </div>
                      {item.completed && (
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs font-medium">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 md:mt-0">
                    {!item.completed && (
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Compass className="h-4 w-4" />
                        Start
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-2 flex items-center justify-center gap-2"
              >
                <span>View Detailed Study Resources</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="week" className="mt-4">
            <h3 className="text-lg font-medium mb-4">Weekly Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weekPlan.map((day, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium mb-2">{day.day}</h4>
                  <ul className="space-y-2">
                    {day.topics.map((topic, tIndex) => (
                      <li key={tIndex} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full"></span>
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="topics" className="mt-4">
            <h3 className="text-lg font-medium mb-4">All Topics</h3>
            
            <div className="flex flex-col gap-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <span className="h-3 w-3 bg-red-500 rounded-full mr-2"></span>
                  Physics
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <Button variant="ghost" size="sm" className="justify-start">Mechanics</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Thermodynamics</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Optics</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Electromagnetism</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Modern Physics</Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <span className="h-3 w-3 bg-blue-500 rounded-full mr-2"></span>
                  Chemistry
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <Button variant="ghost" size="sm" className="justify-start">Physical Chemistry</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Organic Chemistry</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Inorganic Chemistry</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Periodicity</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Chemical Bonding</Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                  Mathematics
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <Button variant="ghost" size="sm" className="justify-start">Algebra</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Calculus</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Trigonometry</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Coordinate Geometry</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Probability</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button 
            variant="default" 
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600"
          >
            <BarChart className="mr-2 h-4 w-4" />
            Update Progress
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDialog;
