
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KpiSection from "./dashboard-sections/KpiSection";
import NudgesSection from "./dashboard-sections/NudgesSection";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { UserProfileType } from "@/types/user/base";
import ActivitySummarySection from "./dashboard-sections/ActivitySummarySection";
import ExamReadinessSection from "./dashboard-sections/ExamReadinessSection";
import UpcomingTopicsSection from "./dashboard-sections/UpcomingTopicsSection";
import RecentActivitiesSection from "./dashboard-sections/RecentActivitiesSection";
import PerformanceSection from "./dashboard-sections/PerformanceSection";
import LearningProfileSection from "./learning-profile/LearningProfileSection";
import { useNavigate } from "react-router-dom";
import { Book, CalendarDays, BookOpen, Gamepad2 } from "lucide-react";

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges?: NudgeData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis,
  nudges = []
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* KPI Section */}
      <KpiSection kpis={kpis} />
      
      {/* Middle Section - Learning Profile and Exam Readiness */}
      <div className="grid md:grid-cols-2 gap-6">
        <LearningProfileSection userProfile={userProfile} />
        <ExamReadinessSection userProfile={userProfile} />
      </div>

      {/* Bottom Sections */}
      <div className="grid lg:grid-cols-2 gap-6">
        <UpcomingTopicsSection userProfile={userProfile} />
        <RecentActivitiesSection userProfile={userProfile} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="col-span-full md:col-span-2 shadow-sm dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceSection userProfile={userProfile} />
          </CardContent>
        </Card>

        <Card className="shadow-sm dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivitySummarySection userProfile={userProfile} />
          </CardContent>
        </Card>
      </div>
      
      {/* Nudges Section */}
      {nudges && nudges.length > 0 && (
        <Card className="shadow-sm dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Notifications & Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <NudgesSection nudges={nudges} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RedesignedDashboardOverview;
