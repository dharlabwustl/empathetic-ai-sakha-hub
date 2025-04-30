
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Clock, Brain, BookOpen, CheckCircle2, Medal } from "lucide-react";
import { TodaysPlanData } from "@/types/student/todaysPlans";
import RecommendationCard from './RecommendationCard';
import DailyQuote from './DailyQuote';
import StudyBreakdown from './StudyBreakdown';
import HistorySection from './HistorySection';
import TimeAllocationSection from './TimeAllocationSection';
import SubjectBreakdown from './SubjectBreakdown';
import ScheduleTimeline from './ScheduleTimeline';

interface NewTodaysPlanViewProps {
  planData: TodaysPlanData;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ planData }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  // Calculate overall completion percentage
  useEffect(() => {
    if (!planData) return;

    const totalTasks = 
      (planData.concepts?.length || 0) +
      (planData.flashcards?.length || 0) +
      (planData.practiceExams?.length || 0);
    
    let completedTasks = 0;
    
    if (planData.concepts) {
      completedTasks += planData.concepts.filter(
        concept => concept.status === "completed"
      ).length;
    }
    
    if (planData.flashcards) {
      completedTasks += planData.flashcards.filter(
        flashcard => flashcard.status === "completed"
      ).length;
    }
    
    if (planData.practiceExams) {
      completedTasks += planData.practiceExams.filter(
        exam => exam.status === "completed"
      ).length;
    }
    
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    setCompletionPercentage(percentage);
  }, [planData]);

  // Mock data for history chart
  const historyData = [
    { day: 'Mon', completed: 4, partial: 1, missed: 0 },
    { day: 'Tue', completed: 3, partial: 2, missed: 1 },
    { day: 'Wed', completed: 5, partial: 0, missed: 0 },
    { day: 'Thu', completed: 2, partial: 2, missed: 1 },
    { day: 'Fri', completed: 3, partial: 1, missed: 0 },
    { day: 'Sat', completed: 4, partial: 0, missed: 0 },
    { day: 'Sun', completed: 0, partial: 0, missed: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Today's Study Plan</h1>
          <p className="text-gray-500">Personalized plan to maximize your learning</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Recommendations
          </Button>
          <Button className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Mark All Complete
          </Button>
        </div>
      </div>
      
      {/* Overall Progress Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#e2e8f0" 
                  strokeWidth="8"
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45 * completionPercentage / 100} ${2 * Math.PI * 45 * (1 - completionPercentage / 100)}`}
                  strokeDashoffset={2 * Math.PI * 45 * 0.25}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{completionPercentage}%</span>
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Daily Progress</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Time Spent</p>
                  <p className="font-medium">{planData.timeAllocation?.total || 0} mins</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Concepts</p>
                  <p className="font-medium">{planData.concepts?.length || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Flashcards</p>
                  <p className="font-medium">{planData.flashcards?.length || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Practice Tests</p>
                  <p className="font-medium">{planData.practiceExams?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main Content Tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <StudyBreakdown planData={planData} />
              <SubjectBreakdown concepts={planData.concepts || []} flashcards={planData.flashcards || []} practiceExams={planData.practiceExams || []} />
            </div>
            
            <div className="space-y-6">
              <TimeAllocationSection timeAllocation={planData.timeAllocation || {concepts: 0, flashcards: 0, practiceExams: 0}} />
              <DailyQuote />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-6">
          <ScheduleTimeline tasks={[
            ...(planData.concepts || []),
            ...(planData.flashcards || []),
            ...(planData.practiceExams || [])
          ]} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <RecommendationCard />
            <HistorySection data={historyData} />
          </div>
        </TabsContent>
        
        <TabsContent value="subjects" className="space-y-6">
          <SubjectBreakdown 
            concepts={planData.concepts || []} 
            flashcards={planData.flashcards || []} 
            practiceExams={planData.practiceExams || []}
            showAllTasks={true}
          />
        </TabsContent>
        
        <TabsContent value="progress" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <HistorySection data={historyData} />
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-medium">Weekly Achievements</h2>
                
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <Medal className="h-8 w-8 text-amber-500" />
                  <div>
                    <p className="font-medium">Consistency Champion</p>
                    <p className="text-sm text-gray-500">Completed tasks 5 days in a row</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium">Concept Master</p>
                    <p className="text-sm text-gray-500">Learned 12 new concepts this week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Monthly Progress</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Physics</span>
                    <span className="text-sm text-gray-500">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Chemistry</span>
                    <span className="text-sm text-gray-500">48%</span>
                  </div>
                  <Progress value={48} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Mathematics</span>
                    <span className="text-sm text-gray-500">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewTodaysPlanView;
