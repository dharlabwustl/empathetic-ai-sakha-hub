
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, BookOpen, Target, BookCheck, Brain, FileText, Star } from "lucide-react";
import { motion } from "framer-motion";
import { KpiData } from "@/hooks/useKpiTracking";
import { UserProfile } from "@/types/user/base";
import { KpiCard } from "@/components/dashboard/KpiCard";
import FeatureHighlights from '@/components/dashboard/student/FeatureHighlights';
import RecommendedResources from '@/components/dashboard/student/RecommendedResources';
import UpcomingTasks from '@/components/dashboard/student/UpcomingTasks';
import StudyProgress from '@/components/dashboard/student/StudyProgress';
import SubjectPerformance from '@/components/dashboard/student/SubjectPerformance';

interface DashboardData {
  upcomingTasks: any[];
  progressData: any;
  features: any[];
  recommendedResources: any[];
}

interface DashboardOverviewProps {
  userProfile: UserProfile;
  kpis: KpiData[];
  dashboardData?: DashboardData;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  userProfile, 
  kpis,
  dashboardData = {
    upcomingTasks: [],
    progressData: {
      subjects: [],
      studyStreak: {
        currentStreak: 0,
        longestStreak: 0,
        thisWeek: [0, 0, 0, 0, 0, 0, 0]
      }
    },
    features: [],
    recommendedResources: []
  }
}) => {
  // Mock KPI icon mapping
  const getKpiIcon = (kpiId: string) => {
    switch (kpiId) {
      case 'study-hours':
        return <Clock className="h-8 w-8 text-blue-500" />;
      case 'concepts-mastered':
        return <BookOpen className="h-8 w-8 text-green-500" />;
      case 'streak':
        return <Target className="h-8 w-8 text-red-500" />;
      case 'accuracy':
        return <Star className="h-8 w-8 text-yellow-500" />;
      case 'tests-completed':
        return <FileText className="h-8 w-8 text-purple-500" />;
      case 'flashcards-reviewed':
        return <Brain className="h-8 w-8 text-cyan-500" />;
      case 'points':
        return <BookCheck className="h-8 w-8 text-lime-500" />;
      default:
        return <BookOpen className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <KpiCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              icon={getKpiIcon(kpi.id)}
              change={kpi.change || 0}
              changeType={kpi.changeType || 'neutral'}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Study Progress */}
          <StudyProgress 
            subjects={dashboardData.progressData?.subjects || []}
            studyStreak={dashboardData.progressData?.studyStreak || {
              currentStreak: 0,
              longestStreak: 0,
              thisWeek: [0, 0, 0, 0, 0, 0, 0]
            }}
          />

          {/* Subject Performance */}
          <SubjectPerformance 
            subjects={[
              { subject: "Physics", progress: 75, change: 5 },
              { subject: "Chemistry", progress: 60, change: -2 },
              { subject: "Mathematics", progress: 85, change: 7 },
              { subject: "Biology", progress: 45, change: 3 }
            ]}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <UpcomingTasks tasks={dashboardData.upcomingTasks || []} />

          {/* Feature Highlights */}
          <FeatureHighlights features={dashboardData.features || []} />

          {/* Recommended Resources */}
          <RecommendedResources resources={dashboardData.recommendedResources || []} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
