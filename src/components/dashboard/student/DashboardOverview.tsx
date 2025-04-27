import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import KpiCard from "@/components/dashboard/KpiCard";
import NudgePanel from "@/components/dashboard/NudgePanel";
import ProfileCard from "@/components/dashboard/ProfileCard";
import FeatureCard from "@/components/dashboard/FeatureCard";
import TodayStudyPlan from "@/components/dashboard/student/TodayStudyPlan";
import FeelGoodCorner from "@/components/dashboard/student/FeelGoodCorner";
import ExamReadinessMeter from './metrics/ExamReadinessMeter';
import { motion } from "framer-motion";

interface DashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: {
    icon?: ReactNode;
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
    tipIcon = <BookOpen className="text-emerald-500" />;
  } else {
    studyTip = "Evening review helps consolidate memory. Try summarizing today's key concepts.";
    tipIcon = <AlertCircle className="text-violet-500" />;
  }

  // Helper function to determine user's subscription type
  const getUserSubscriptionType = (): SubscriptionType => {
    if (!userProfile.subscription) return SubscriptionType.Basic;
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription.planType;
    }
    
    return userProfile.subscription;
  };

  // Mock readiness data - in a real app, this would come from props or an API
  const readinessData = {
    conceptCompletion: 75,
    flashcardAccuracy: 82,
    examScores: {
      physics: 78,
      chemistry: 85,
      mathematics: 80
    },
    overallReadiness: 78,
    timestamp: new Date().toISOString()
  };

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

      {/* KPI Cards - Only show here, not duplicated */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
        variants={itemVariants}
      >
        {kpis.map((kpi, index) => (
          <KpiCard key={kpi.id} kpi={kpi} delay={index} />
        ))}
      </motion.div>
      
      {/* Study Plan and Profile - Only show study plan here, not duplicated */}
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
      
      {/* Feel Good Corner and Nudges */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"
        variants={itemVariants}
      >
        <motion.div variants={itemVariants}>
          <FeelGoodCorner />
        </motion.div>
        <motion.div variants={itemVariants}>
          <NudgePanel nudges={nudges} markAsRead={markNudgeAsRead} />
        </motion.div>
      </motion.div>
      
      {/* Exam Readiness Meter */}
      <motion.div 
        className="mb-6"
        variants={itemVariants}
      >
        <ExamReadinessMeter 
          userAvatar={userProfile.avatar} 
          readinessData={readinessData}
        />
      </motion.div>
      
      {/* Feature Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        variants={itemVariants}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            custom={index}
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
              userSubscription={getUserSubscriptionType()}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
