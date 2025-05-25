
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { UserProfileType } from "@/types/user";
import { KpiData } from "@/hooks/useKpiTracking";
import { useIsMobile } from '@/hooks/use-mobile';

// Import dashboard sections
import WelcomeSection from './dashboard-sections/WelcomeSection';
import StudyStreakSection from './dashboard-sections/StudyStreakSection';
import QuickActionsSection from './dashboard-sections/QuickActionsSection';
import StudyProgressSection from './dashboard-sections/StudyProgressSection';
import UpcomingEventsSection from './dashboard-sections/UpcomingEventsSection';
import RecentActivitySection from './dashboard-sections/RecentActivitySection';
import AchievementsSection from './dashboard-sections/AchievementsSection';
import TipsSection from './dashboard-sections/TipsSection';
import { MoodType } from '@/types/user/base';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
  currentMood?: MoodType;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis,
  currentMood
}) => {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Generate smart suggestions based on performance
  const getSmartSuggestion = () => {
    const performance = {
      accuracy: 85,
      quizScores: 88,
      conceptProgress: 75,
      streak: 6
    };

    if (performance.accuracy > 80 && performance.quizScores > 85) {
      return {
        text: "You're ready for advanced practice exams! Your high accuracy shows mastery 📚🚀",
        action: "Try Advanced Exam",
        actionLink: "/dashboard/student/practice-exam",
        color: "bg-violet-50 border-violet-200 text-violet-800"
      };
    } else if (performance.conceptProgress > 70 && performance.accuracy < 60) {
      return {
        text: "Strong conceptual understanding, but recall needs improvement. Focus on flashcards today 🧠",
        action: "Review Flashcards",
        actionLink: "/dashboard/student/flashcards",
        color: "bg-emerald-50 border-emerald-200 text-emerald-800"
      };
    } else if (performance.conceptProgress < 50) {
      return {
        text: "Focus on core concepts first. Small wins will build momentum for more complex topics 🎯",
        action: "Study Core Concepts",
        actionLink: "/dashboard/student/concepts",
        color: "bg-amber-50 border-amber-200 text-amber-800"
      };
    }
    
    return {
      text: "Based on your recent activity, we recommend focusing on key concepts today.",
      action: "View Recommendation",
      actionLink: "/dashboard/student/today",
      color: "bg-purple-50 border-purple-200 text-purple-800"
    };
  };

  const smartSuggestion = getSmartSuggestion();

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <WelcomeSection userProfile={userProfile} currentMood={currentMood} />
      </motion.div>

      {/* Main Grid Layout */}
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
        {/* Left Column - Main Content */}
        <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-2'} space-y-6`}>
          {/* Study Progress and Quick Actions Row */}
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <StudyProgressSection kpis={kpis} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <QuickActionsSection />
            </motion.div>
          </div>

          {/* Recent Activity Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <RecentActivitySection />
          </motion.div>
        </div>

        {/* Right Column - Secondary Content */}
        <div className="space-y-6">
          {/* Study Streak */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StudyStreakSection />
          </motion.div>

          {/* Tips Section with Smart Suggestion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TipsSection smartSuggestion={smartSuggestion} />
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <UpcomingEventsSection />
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AchievementsSection />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
