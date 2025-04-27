
import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData } from "@/hooks/useKpiTracking";
import KpiCard from "@/components/dashboard/KpiCard";
import ProfileCard from "@/components/dashboard/ProfileCard";
import TodayStudyPlan from "@/components/dashboard/student/TodayStudyPlan";
import FeelGoodCorner from "@/components/dashboard/student/feel-good-corner/FeelGoodCorner";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ExamReadinessMeter from "@/components/dashboard/student/ExamReadinessMeter";

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

export default function RedesignedDashboardOverview({
  userProfile,
  kpis
}: RedesignedDashboardOverviewProps) {
  const isMobile = useIsMobile();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
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

  // Current time for personalized tip
  const currentHour = new Date().getHours();
  let studyTip = "";
  let tipIcon = <Coffee className="text-amber-500" />;

  if (currentHour < 12) {
    studyTip = "Morning study sessions can boost retention. Take advantage of your fresh mind!";
    tipIcon = <Coffee className="text-amber-500" />;
  } else if (currentHour < 17) {
    studyTip = "Afternoon slump? Try a 5-minute walk, then tackle your most challenging subject.";
  } else {
    studyTip = "Evening review helps consolidate memory. Try summarizing today's key concepts.";
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </motion.div>
      
      {/* Exam Readiness Meter */}
      <motion.div variants={itemVariants}>
        <ExamReadinessMeter userProfile={userProfile} />
      </motion.div>
      
      {/* Study Plan and Profile */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
        variants={itemVariants}
      >
        <motion.div 
          className="lg:col-span-2"
          whileHover={{ scale: isMobile ? 1.005 : 1.01, transition: { duration: 0.2 } }}
          variants={itemVariants}
        >
          <TodayStudyPlan />
        </motion.div>
        <motion.div
          whileHover={{ scale: isMobile ? 1.005 : 1.02, transition: { duration: 0.2 } }}
          variants={itemVariants}
        >
          <ProfileCard profile={userProfile} />
        </motion.div>
      </motion.div>
      
      {/* Feel Good Corner */}
      <motion.div variants={itemVariants}>
        <FeelGoodCorner />
      </motion.div>
    </motion.div>
  );
}
