import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UserProfileType } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import { QuickAccess } from "@/components/dashboard/student/QuickAccess";
import TodaysTopPrioritySection from "@/components/dashboard/student/dashboard-sections/TodaysTopPrioritySection";
import TodaysPlanSection from "@/components/dashboard/student/dashboard-sections/TodaysPlanSection";
import KpiCard from "@/components/dashboard/student/dashboard-sections/KpiCard";
import WeakAreasCard from "@/components/dashboard/student/dashboard-sections/WeakAreasCard";
import StrongAreasCard from "@/components/dashboard/student/dashboard-sections/StrongAreasCard";
import ExamGoalCard from "@/components/dashboard/student/dashboard-sections/ExamGoalCard";
import MoodBasedSuggestions from "@/components/dashboard/student/dashboard-sections/MoodBasedSuggestions";
import NEETStrategyCard from "@/components/dashboard/student/NEETStrategyCard";
import AICoachCard from "@/components/dashboard/student/dashboard-sections/AICoachCard";
import { motion } from 'framer-motion';
import { MoodType } from "@/types/user/base";

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        if (parsedData.mood) {
          setCurrentMood(parsedData.mood);
        }
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
      }
    }
  }, []);

  return (
    <div className="space-y-6 p-2 sm:p-4">
      <QuickAccess className="mb-6" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Top Priority Section */}
          <TodaysTopPrioritySection />
          
          {/* Today's Plan Section */}
          <TodaysPlanSection currentMood={currentMood} />
          
          {/* KPI Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {kpis.slice(0, 3).map((kpi, index) => (
              <motion.div
                key={kpi.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <KpiCard kpi={kpi} />
              </motion.div>
            ))}
          </div>

          {/* Strong and Weak Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <WeakAreasCard />
            <StrongAreasCard />
          </div>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          {/* Exam Goal Card with Mood Logging */}
          <ExamGoalCard 
            currentMood={currentMood}
            onMoodChange={setCurrentMood}
          />
          
          {/* Mood Based Suggestions */}
          <MoodBasedSuggestions 
            currentMood={currentMood}
            onMoodSelect={setCurrentMood}
          />
          
          {/* NEET Strategy Card */}
          <NEETStrategyCard />
          
          {/* AI Coach Card */}
          <AICoachCard />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
