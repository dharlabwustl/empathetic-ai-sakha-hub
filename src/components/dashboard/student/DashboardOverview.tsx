
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import KpiCard from "@/components/dashboard/KpiCard";
import NudgePanel from "@/components/dashboard/NudgePanel";
import ProfileCard from "@/components/dashboard/ProfileCard";
import RedesignedDashboardOverview from "@/components/dashboard/student/RedesignedDashboardOverview";

interface DashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
}

export default function DashboardOverview({
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features
}: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-3">
          <ProfileCard profile={userProfile} />
        </div>
      </div>

      {/* Redesigned Dashboard Overview */}
      <RedesignedDashboardOverview />

      {/* Nudges Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <NudgePanel nudges={nudges} markAsRead={markNudgeAsRead} />
        </div>
      </div>
    </div>
  );
}
