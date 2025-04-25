
import { useState } from "react";
import { Calendar, Brain, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StudyTimeline from "./StudyTimeline";
import SubjectBreakdown from "./SubjectBreakdown";
import TimeAllocation from "./TimeAllocation";
import TaskHistory from "./TaskHistory";
import TomorrowPreview from "./TomorrowPreview";
import SmartExtras from "./SmartExtras";

export default function TodaysPlanSection() {
  const { userProfile } = useUserProfile();
  const [selectedTab, setSelectedTab] = useState<'today' | 'weekly' | 'monthly'>('today');
  
  return (
    <Card className="border-t-4 border-t-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 mb-1">
          <Calendar className="text-blue-500" />
          Today's Plan – Your Smart Study Companion
        </CardTitle>
        <p className="text-sm text-gray-500">
          Hi {userProfile?.name}, here's your personalized learning plan based on your {userProfile?.goals?.[0]?.title || 'exam'} goal and current progress.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Timeline-Based Navigation */}
        <Tabs value={selectedTab} onValueChange={(val) => setSelectedTab(val as typeof selectedTab)}>
          <TabsList className="bg-blue-50/80 p-1">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-4 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Subject Breakdown & Time Allocation */}
              <div className="lg:col-span-8 space-y-6">
                <SubjectBreakdown timeframe={selectedTab} />
                <TimeAllocation />
              </div>
              
              {/* Right Column: History & Tomorrow's Preview */}
              <div className="lg:col-span-4 space-y-6">
                <TaskHistory />
                <TomorrowPreview />
                <SmartExtras />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
