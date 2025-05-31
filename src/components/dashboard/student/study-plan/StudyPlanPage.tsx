
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeeklySchedule from './WeeklySchedule';
import StudyGoals from './StudyGoals';
import StudyTimeAllocation from './StudyTimeAllocation';
import { useToast } from '@/hooks/use-toast';
import { StudyPlanSubject } from '@/types/user/studyPlan';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, Calendar, BookOpen, TrendingUp, AlertTriangle } from 'lucide-react';

const StudyPlanPage = () => {
  const { toast } = useToast();
  
  const handleSaveTimeAllocation = (allocations: StudyPlanSubject[]) => {
    toast({
      title: "Time allocation updated",
      description: "Your NEET 2026 study plan has been optimized based on your preferences.",
      variant: "default",
    });
    
    // Update localStorage with NEET 2026 data
    const neetPlanData = {
      exam: 'NEET 2026',
      examDate: '2026-05-03',
      subjects: allocations,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('neet_study_plan', JSON.stringify(neetPlanData));
    
    console.log("NEET 2026 time allocations saved:", allocations);
  };

  // NEET 2026 specific data
  const examDate = new Date('2026-05-03');
  const daysLeft = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <SharedPageLayout
      title="NEET 2026 Study Plan"
      subtitle="Comprehensive preparation strategy for NEET 2026 - Physics, Chemistry & Biology"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      {/* NEET 2026 Overview Card */}
      <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            NEET 2026 Exam Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <Calendar className="h-5 w-5 mx-auto mb-1 text-blue-600" />
              <div className="text-sm font-medium">Exam Date</div>
              <div className="text-lg font-bold text-blue-600">May 3, 2026</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <Clock className="h-5 w-5 mx-auto mb-1 text-green-600" />
              <div className="text-sm font-medium">Days Left</div>
              <div className="text-lg font-bold text-green-600">{daysLeft}</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <BookOpen className="h-5 w-5 mx-auto mb-1 text-purple-600" />
              <div className="text-sm font-medium">Subjects</div>
              <div className="text-lg font-bold text-purple-600">3</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-orange-600" />
              <div className="text-sm font-medium">Weekly Hours</div>
              <div className="text-lg font-bold text-orange-600">40</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="goals">Study Goals</TabsTrigger>
          <TabsTrigger value="time-allocation">Time Allocation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule">
          <WeeklySchedule />
        </TabsContent>
        
        <TabsContent value="goals">
          <StudyGoals />
        </TabsContent>
        
        <TabsContent value="time-allocation">
          <StudyTimeAllocation
            weeklyTotal={40}
            onSave={handleSaveTimeAllocation}
          />
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default StudyPlanPage;
