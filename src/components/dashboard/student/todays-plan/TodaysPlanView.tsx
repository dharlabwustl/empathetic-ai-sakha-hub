
import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TimelineView } from "@/types/student/todaysPlan";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";

import TodaysPlanHeader from './TodaysPlanHeader';
import SubjectBreakdown from './SubjectBreakdown';
import TimeAllocationSection from './TimeAllocationSection';
import HistorySection from './HistorySection';
import SmartExtrasSection from './SmartExtrasSection';
import { useToast } from '@/hooks/use-toast';

export default function TodaysPlanView() {
  const { toast } = useToast();
  const userName = "Student"; // Should come from user context in a real app
  const examGoal = "IIT-JEE"; // Should come from user context in a real app
  
  const {
    loading,
    error,
    planData,
    activeView,
    setActiveView,
    refreshData,
    markTaskCompleted,
    addBookmark,
    addNote,
    markDayComplete
  } = useTodaysPlan(examGoal, userName);
  
  if (error) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Study Plan</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button 
          onClick={refreshData}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Try Again
        </button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <TodaysPlanHeader 
        planData={planData}
        isLoading={loading}
        activeView={activeView}
        onChangeView={setActiveView}
      />
      
      <Tabs value={activeView} className="space-y-6">
        {/* Daily Tab Content */}
        <TabsContent value="daily" className="space-y-6 mt-0">
          <SubjectBreakdown 
            planData={planData}
            isLoading={loading}
            onMarkCompleted={markTaskCompleted}
            onBookmark={addBookmark}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TimeAllocationSection planData={planData} isLoading={loading} />
            <SmartExtrasSection 
              planData={planData} 
              isLoading={loading} 
              onAddNote={addNote}
              onMarkDayComplete={markDayComplete}
            />
          </div>
          
          <HistorySection planData={planData} isLoading={loading} />
        </TabsContent>
        
        {/* Weekly Tab Content */}
        <TabsContent value="weekly" className="space-y-4 mt-0">
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Weekly View</h3>
            <p className="text-muted-foreground">
              Your weekly study plan will appear here, showing scheduled tasks across the entire week. 
              This helps you plan ahead and maintain a balanced study approach.
            </p>
          </Card>
        </TabsContent>
        
        {/* Monthly Tab Content */}
        <TabsContent value="monthly" className="space-y-4 mt-0">
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Monthly View</h3>
            <p className="text-muted-foreground">
              Your monthly overview will display here, with major milestones, exam dates,
              and long-term planning to help you stay on track with your exam goals.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
