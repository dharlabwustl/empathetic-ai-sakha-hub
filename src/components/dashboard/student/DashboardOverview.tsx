
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import KpiCard from "@/components/dashboard/KpiCard";
import NudgePanel from "@/components/dashboard/NudgePanel";
import ProfileCard from "@/components/dashboard/ProfileCard";
import FeatureCard from "@/components/dashboard/FeatureCard";
import TodayStudyPlan from "@/components/dashboard/student/TodayStudyPlan";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertCircle, BookOpen, Coffee } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const staggerCardVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({ 
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  // Current time for personalized tip
  const currentHour = new Date().getHours();
  let studyTip = "";
  let tipIcon = <Coffee className="text-amber-500" />;

  if (currentHour < 12) {
    studyTip = "Morning study sessions can boost retention. Take advantage of your fresh mind!";
    tipIcon = <Coffee className="text-amber-500" />;
  } else if (currentHour < 17) {
    studyTip = "Afternoon slump? Try a 5-minute walk, then tackle your most challenging subject.";
    tipIcon = <BookOpen className="text-emerald-500" />;
  } else {
    studyTip = "Evening review helps consolidate memory. Try summarizing today's key concepts.";
    tipIcon = <AlertCircle className="text-violet-500" />;
  }

  return (
    <>
      {/* Study Tip Banner */}
      <motion.div
        variants={itemVariants}
        className="mb-6 bg-gradient-to-r from-amber-50 to-violet-50 dark:from-amber-900/20 dark:to-violet-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-700/30 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow flex items-center justify-center">
            {tipIcon}
          </div>
          <div>
            <h3 className="font-medium text-sm text-amber-800 dark:text-amber-300">Today's Study Tip</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{studyTip}</p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
        variants={itemVariants}
      >
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.id}
            custom={index}
            variants={staggerCardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: isMobile ? 1.01 : 1.03, transition: { duration: 0.2 } }}
          >
            <KpiCard kpi={kpi} />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Study Plan and Profile */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
        variants={itemVariants}
      >
        <motion.div 
          className="lg:col-span-2"
          whileHover={{ scale: isMobile ? 1.005 : 1.01, transition: { duration: 0.2 } }}
        >
          <TodayStudyPlan />
        </motion.div>
        <motion.div
          whileHover={{ scale: isMobile ? 1.005 : 1.02, transition: { duration: 0.2 } }}
        >
          <ProfileCard profile={userProfile} />
        </motion.div>
      </motion.div>
      
      {/* Nudges Panel */}
      <motion.div 
        className="mb-6 sm:mb-8"
        variants={itemVariants}
      >
        <NudgePanel nudges={nudges} markAsRead={markNudgeAsRead} />
      </motion.div>
      
      {/* Feature Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        variants={itemVariants}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={staggerCardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              scale: isMobile ? 1.01 : 1.05, 
              transition: { duration: 0.2 },
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
            }}
          >
            <FeatureCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              path={feature.path}
              isPremium={feature.isPremium}
              userSubscription={userProfile.subscription}
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
