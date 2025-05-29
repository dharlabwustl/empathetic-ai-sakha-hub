
import React, { useState, useEffect } from 'react';
import { UserProfileType, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import EnhancedNameHeaderCard from './EnhancedNameHeaderCard';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import NEETStrategyCard from './NEETStrategyCard';
import AICoachCard from './AICoachCard';
import WeakAreasCard from './WeakAreasCard';
import StrongAreasCard from './StrongAreasCard';
import SubjectWiseBreakdownCard from './SubjectWiseBreakdownCard';
import KpiTabsCard from './KpiTabsCard';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>();

  useEffect(() => {
    // Get saved mood from localStorage
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

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    
    // Update localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        parsedData.mood = mood;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } catch (err) {
        console.error("Error updating mood in localStorage:", err);
        localStorage.setItem("userData", JSON.stringify({ mood }));
      }
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }

    // Trigger custom event for other components
    const moodChangeEvent = new CustomEvent('mood-changed', { 
      detail: { 
        mood, 
        timestamp: new Date().toISOString()
      } 
    });
    document.dispatchEvent(moodChangeEvent);
  };

  const weakAreas = [
    { name: "Organic Chemistry", link: "/dashboard/student/concepts/organic-chemistry" },
    { name: "Thermodynamics", link: "/dashboard/student/concepts/thermodynamics" },
    { name: "Genetics", link: "/dashboard/student/concepts/genetics" }
  ];

  const strongAreas = [
    { name: "Mechanics", link: "/dashboard/student/concepts/mechanics" },
    { name: "Cell Biology", link: "/dashboard/student/concepts/cell-biology" },
    { name: "Algebra", link: "/dashboard/student/concepts/algebra" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Name Header */}
      <EnhancedNameHeaderCard userProfile={userProfile} />
      
      {/* Top Row - Priority Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaysTopPrioritySection currentMood={currentMood} />
        <TodaysPlanSection currentMood={currentMood} />
      </div>
      
      {/* Second Row - Goals and Mood */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ExamGoalCard 
          currentMood={currentMood}
          onMoodChange={handleMoodChange}
        />
        <MoodBasedSuggestions 
          currentMood={currentMood}
          onMoodSelect={handleMoodChange}
        />
        <NEETStrategyCard />
      </div>
      
      {/* Third Row - AI Coach and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AICoachCard />
        <WeakAreasCard areas={weakAreas} />
        <StrongAreasCard areas={strongAreas} />
      </div>
      
      {/* Fourth Row - Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubjectWiseBreakdownCard />
        <KpiTabsCard />
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
