
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, BarChart, Clock } from "lucide-react";
import { StudyStatus, StudyPlanItem } from "@/types/user/study";
import MoodLogButton from "../mood-tracking/MoodLogButton";

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
        
        <TabsContent value="daily">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Today's Focus</h3>
            <div className="space-y-3">
              {todaysPlan.slice(0, 3).map(task => (
                <div key={task.id} className="p-3 border rounded-md flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <p className="font-medium">{task.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{task.subject}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {task.timeAllocation} min
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Completion rate</span>
                <span>{Math.round((studyStatus.weekly.completedTasks / studyStatus.weekly.totalTasks) * 100)}%</span>
              </div>
              <Progress 
                value={(studyStatus.weekly.completedTasks / studyStatus.weekly.totalTasks) * 100} 
                className="h-2 mb-4"
              />
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Top Subjects</h4>
                <div className="grid grid-cols-2 gap-2">
                  {studyStatus.weekly.topSubjects.map(subject => (
                    <div key={subject} className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
                      {subject}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Tasks completed</span>
                  <span>{studyStatus.monthly.completedTasks}/{studyStatus.monthly.totalTasks}</span>
                </div>
                <Progress 
                  value={(studyStatus.monthly.completedTasks / studyStatus.monthly.totalTasks) * 100} 
                  className="h-2 mb-2 mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Avg. Daily Study</p>
                  <p className="text-lg font-semibold">{studyStatus.monthly.averageStudyHours}h</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Improvement</p>
                  <p className="text-lg font-semibold text-green-600">+{studyStatus.monthly.improvement}%</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OverviewDashboard;
