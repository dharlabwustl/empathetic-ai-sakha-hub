
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import KpiCard from "@/components/dashboard/KpiCard";
import NudgePanel from "@/components/dashboard/NudgePanel";
import ProfileCard from "@/components/dashboard/ProfileCard";
import FeatureCard from "@/components/dashboard/FeatureCard";
import TodayStudyPlan from "@/components/dashboard/student/TodayStudyPlan";
import { ReactNode } from "react";

interface DashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: {
    icon: ReactNode;
    title: string;
    description: string;
    path: string;
    isPremium: boolean;
  }[];
}

export default function DashboardOverview({
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features
}: DashboardOverviewProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map(kpi => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TodayStudyPlan />
        </div>
        <div>
          <ProfileCard profile={userProfile} />
        </div>
      </div>
      
      <div className="mb-8">
        <NudgePanel nudges={nudges} markAsRead={markNudgeAsRead} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            path={feature.path}
            isPremium={feature.isPremium}
            userSubscription={userProfile.subscription}
          />
        ))}
      </div>
    </>
  );
}
