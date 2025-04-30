
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import { MoodType } from "@/types/user/base";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Clock, Book, CheckCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const RedesignedDashboardOverview = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange,
}: RedesignedDashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
      
      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="p-4">
            <div className="flex flex-col">
              <div className="text-sm text-muted-foreground mb-1">{kpi.title}</div>
              <div className="text-2xl font-bold flex items-end">
                {kpi.value}
                {kpi.unit && <span className="text-sm text-muted-foreground ml-1">{kpi.unit}</span>}
                {kpi.change && (
                  <span className={`ml-2 text-xs ${kpi.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                    {kpi.changeType === 'positive' ? '+' : ''}{kpi.change}%
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Progress */}
        <div className="lg:col-span-2">
          <Card className="p-6 h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Your Study Progress</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Physics</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Chemistry</span>
                  <span className="text-sm text-muted-foreground">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Mathematics</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Biology</span>
                  <span className="text-sm text-muted-foreground">30%</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
        
        {/* Upcoming Tasks */}
        <div>
          <Card className="p-6 h-full">
            <h3 className="text-xl font-semibold mb-4">Today's Tasks</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Physics Quiz</p>
                  <p className="text-sm text-muted-foreground">Due in 2 hours</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Math Assignment</p>
                  <p className="text-sm text-muted-foreground">Due tomorrow</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Chemistry Lab</p>
                  <p className="text-sm text-muted-foreground">Due in 3 days</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">View All Tasks</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                <Book className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Completed Physics Revision</p>
                <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Submitted Math Assignment</p>
                <p className="text-sm text-muted-foreground">Yesterday, 3:45 PM</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Studied Chemistry for 2 hours</p>
                <p className="text-sm text-muted-foreground">Yesterday, 1:20 PM</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Added exam date to calendar</p>
                <p className="text-sm text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Study Statistics */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Study Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total study time this week</span>
              <span className="font-semibold">16 hours</span>
            </div>
            <div className="flex justify-between">
              <span>Flashcards reviewed</span>
              <span className="font-semibold">324</span>
            </div>
            <div className="flex justify-between">
              <span>Practice tests taken</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex justify-between">
              <span>Concepts mastered</span>
              <span className="font-semibold">42</span>
            </div>
            <div className="flex justify-between">
              <span>Weekly streak</span>
              <span className="font-semibold">5 days</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
