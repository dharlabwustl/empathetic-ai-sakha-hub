
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { QuickAccessButtons } from "../QuickAccessButtons";
import { DailyPlanBreakdown } from "./DailyPlanBreakdown";
import { TimeAllocationWidget } from "./TimeAllocationWidget";
import { BacklogTasksList } from "./BacklogTasksList";
import { QuickAccessPanel } from "./QuickAccessPanel";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import { TimelineView } from "@/types/student/todaysPlan";
import { Calendar, CalendarDays, CalendarRange } from "lucide-react";

export default function NewTodaysPlanView() {
  const {
    loading,
    error,
    planData,
    activeView,
    setActiveView,
    refreshData,
    markTaskCompleted,
    addBookmark,
  } = useTodaysPlan("IIT-JEE", "Student"); // These should come from context

  const overallProgress = planData ? 
    Object.values(planData.subjectBreakdown).reduce((acc, subject) => {
      const total = subject.concepts.length + subject.flashcards.length + subject.practiceExams.length;
      const completed = 
        subject.concepts.filter(c => c.status === '✅ completed').length +
        subject.flashcards.filter(f => f.status === '✅ completed').length +
        subject.practiceExams.filter(p => p.status === '✅ completed').length;
      return acc + (completed / total) * 100;
    }, 0) / Object.keys(planData.subjectBreakdown).length : 0;

  if (error) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">Error Loading Study Plan</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button 
          onClick={refreshData}
          className="text-primary hover:text-primary/90 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Access Buttons - Now appears on all pages */}
      <QuickAccessButtons />
      
      {/* Header Section */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base text-muted-foreground">
            Hi <span className="font-medium text-foreground">{planData?.userName}</span>, 
            here's your personalized daily plan based on your{" "}
            <Badge variant="outline" className="font-normal">📌 {planData?.examGoal}</Badge>
            {" "}exam goal and <Badge variant="outline" className="font-normal">🧮 current progress</Badge>.
          </h3>
        </div>
        
        {/* Overall Progress */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Progress value={overallProgress} className="h-2" />
          </div>
          <Badge variant="outline">
            Today's Completion: {Math.round(overallProgress)}% ✓
          </Badge>
        </div>

        {/* Timeline Navigation */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as TimelineView)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>🔹 Today</span>
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>🔸 Weekly</span>
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <CalendarRange className="h-4 w-4" />
              <span>🔸 Monthly</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <DailyPlanBreakdown 
                  planData={planData} 
                  isLoading={loading}
                  onMarkCompleted={markTaskCompleted}
                  onBookmark={addBookmark}
                />
                <BacklogTasksList planData={planData} isLoading={loading} />
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                <TimeAllocationWidget planData={planData} isLoading={loading} />
                <QuickAccessPanel />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weekly">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Weekly view coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Monthly view coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
