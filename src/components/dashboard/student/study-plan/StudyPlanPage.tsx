
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeeklySchedule from './WeeklySchedule';
import StudyGoals from './StudyGoals';
import StudyTimeAllocation from './StudyTimeAllocation';
import { useToast } from '@/hooks/use-toast';
import { StudyPlanSubject } from '@/types/user/studyPlan';

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
  
  return (
    <SharedPageLayout
      title="NEET 2026 Study Plan"
      subtitle="Comprehensive preparation strategy for NEET 2026 - Physics, Chemistry & Biology"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
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
