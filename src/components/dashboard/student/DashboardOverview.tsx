
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import NudgePanel from "@/components/dashboard/NudgePanel";
import ProfileCard from "@/components/dashboard/ProfileCard";
import FeatureCard from "@/components/dashboard/FeatureCard";
import LearningCommandCenter from "./learning-command-center/LearningCommandCenter";
import FeelGoodCorner from "@/components/dashboard/student/FeelGoodCorner";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: {
    icon: React.ReactNode;
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
  const isMobile = useIsMobile();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LearningCommandCenter userProfile={userProfile} />
        </div>
        
        <div className="space-y-6">
          <ProfileCard profile={userProfile} />
          <NudgePanel nudges={nudges} markAsRead={markNudgeAsRead} />
          <FeelGoodCorner />
        </div>
      </div>
    </motion.div>
  );
}
