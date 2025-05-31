
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeeklySchedule from './WeeklySchedule';
import StudyGoals from './StudyGoals';
import StudyTimeAllocation from './StudyTimeAllocation';
import { useToast } from '@/hooks/use-toast';

const StudyPlanPage = () => {
  const { toast } = useToast();
  
  const handleSaveTimeAllocation = (allocations: any[]) => {
    toast({
      title: "Time allocation updated",
      description: "Your weekly study plan has been adjusted based on your preferences.",
      variant: "default",
    });
    
    // In a real app, this would update the backend
    console.log("New time allocations:", allocations);
  };
  
  return (
    <SharedPageLayout
      title="Study Plan"
      subtitle="Personalize your study schedule and track your progress"
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
