
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeeklySchedule from './WeeklySchedule';
import StudyGoals from './StudyGoals';
import EnhancedStudyPlanPage from './EnhancedStudyPlanPage';
import { useToast } from '@/hooks/use-toast';

const StudyPlanPage = () => {
  const { toast } = useToast();
  
  const handleSaveTimeAllocation = (allocations: any[]) => {
    toast({
      title: "Time allocation updated",
      description: "Your weekly study plan has been adjusted based on your preferences.",
      variant: "default",
    });
    
    console.log("New time allocations:", allocations);
  };
  
  return (
    <SharedPageLayout
      title="NEET 2026 Study Plan"
      subtitle="Personalize your study schedule and track your progress toward NEET 2026"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Tabs defaultValue="enhanced" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="enhanced">Time Allocation</TabsTrigger>
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="goals">Study Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enhanced">
          <EnhancedStudyPlanPage />
        </TabsContent>
        
        <TabsContent value="schedule">
          <WeeklySchedule />
        </TabsContent>
        
        <TabsContent value="goals">
          <StudyGoals />
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default StudyPlanPage;
