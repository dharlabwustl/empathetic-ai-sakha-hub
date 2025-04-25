
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, BarChart, Clock } from "lucide-react";
import { StudyStatus, StudyPlanItem } from "@/types/user/study";
import { MoodLogButton } from "../mood-tracking/MoodLogButton";

interface OverviewDashboardProps {
  userProfile: any;
  studyStatus: StudyStatus;
  todaysPlan: StudyPlanItem[];
}

const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  userProfile,
  studyStatus,
  todaysPlan
}) => {
  return (
    <div className="space-y-6">
      {/* Mood and Study Status Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Study Dashboard</h2>
          <p className="text-muted-foreground">Track your progress and stay focused</p>
        </div>
        <MoodLogButton currentMood={studyStatus.daily.mood} />
      </div>

      {/* Daily Progress Overview */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Today's Progress</h3>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {studyStatus.daily.studyHours}h studied today
            </span>
          </div>
        </div>
        <Progress 
          value={(studyStatus.daily.completedTasks / studyStatus.daily.totalTasks) * 100} 
          className="h-2 mb-2"
        />
        <p className="text-sm text-muted-foreground">
          {studyStatus.daily.completedTasks} of {studyStatus.daily.totalTasks} tasks completed
        </p>
      </Card>

      {/* Time Period Tabs */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todaysPlan.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    item.priority === 'high' ? 'bg-red-500' :
                    item.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.subject}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.timeAllocation} mins
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Overview</h3>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span>Average Study Hours</span>
                <span className="font-medium">{studyStatus.weekly.averageStudyHours}h/day</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Task Completion Rate</span>
                <span className="font-medium">
                  {Math.round((studyStatus.weekly.completedTasks / studyStatus.weekly.totalTasks) * 100)}%
                </span>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Progress</h3>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span>Average Study Hours</span>
                <span className="font-medium">{studyStatus.monthly.averageStudyHours}h/day</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Improvement</span>
                <span className="font-medium text-green-500">+{studyStatus.monthly.improvement}%</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OverviewDashboard;
