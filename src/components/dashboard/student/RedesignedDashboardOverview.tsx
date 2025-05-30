
import React from "react";
import { UserProfileBase } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import ExamGoalCard from "./dashboard-sections/ExamGoalCard";
import TodayScheduleCard from "./dashboard-sections/TodayScheduleCard";
import PerformanceInsightsCard from "./dashboard-sections/PerformanceInsightsCard";
import NextActionsCard from "./dashboard-sections/NextActionsCard";
import WelcomeSection from "./dashboard-sections/WelcomeSection";
import MoodBasedPlanAdjuster from "./mood-tracking/MoodBasedPlanAdjuster";
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage, getMoodThemeClass } from "./mood-tracking/moodUtils";
import { MoodType } from "@/types/user/base";

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = React.useState<MoodType | undefined>(getCurrentMoodFromLocalStorage());

  React.useEffect(() => {
    // Apply mood theme to body
    const moodClass = getMoodThemeClass(currentMood);
    if (moodClass) {
      document.body.classList.add(moodClass);
      
      // Remove other mood classes
      const allMoodClasses = [
        'mood-happy', 'mood-motivated', 'mood-focused', 'mood-neutral',
        'mood-tired', 'mood-anxious', 'mood-stressed', 'mood-sad',
        'mood-overwhelmed', 'mood-curious', 'mood-confused', 'mood-calm', 'mood-okay'
      ];
      
      allMoodClasses.forEach(cls => {
        if (cls !== moodClass) {
          document.body.classList.remove(cls);
        }
      });
    }

    return () => {
      // Cleanup on unmount
      const allMoodClasses = [
        'mood-happy', 'mood-motivated', 'mood-focused', 'mood-neutral',
        'mood-tired', 'mood-anxious', 'mood-stressed', 'mood-sad',
        'mood-overwhelmed', 'mood-curious', 'mood-confused', 'mood-calm', 'mood-okay'
      ];
      
      allMoodClasses.forEach(cls => {
        document.body.classList.remove(cls);
      });
    };
  }, [currentMood]);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  // Mock data for the dashboard
  const mockSubjects = [
    { id: "1", name: "Physics", progress: 72, color: "blue", topics: [], completedTopics: 0, priority: "high" as const, status: "active" as const, difficulty: "medium" as const, estimatedHours: 40, actualHours: 28, weeklyHours: 8, proficiency: "medium" as const },
    { id: "2", name: "Chemistry", progress: 65, color: "green", topics: [], completedTopics: 0, priority: "medium" as const, status: "active" as const, difficulty: "medium" as const, estimatedHours: 35, actualHours: 22, weeklyHours: 7, proficiency: "medium" as const },
    { id: "3", name: "Biology", progress: 78, color: "purple", topics: [], completedTopics: 0, priority: "high" as const, status: "active" as const, difficulty: "easy" as const, estimatedHours: 30, actualHours: 23, weeklyHours: 6, proficiency: "strong" as const }
  ];

  const mockConcepts = [
    { id: "1", title: "Newton's Laws", subject: "Physics", difficulty: "medium" as const, completed: false, progress: 75 },
    { id: "2", title: "Organic Reactions", subject: "Chemistry", difficulty: "hard" as const, completed: true, progress: 100 },
    { id: "3", title: "Cell Division", subject: "Biology", difficulty: "easy" as const, completed: false, progress: 60 }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <WelcomeSection 
        userProfile={userProfile}
        currentMood={currentMood}
        onMoodChange={handleMoodChange}
      />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Primary Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Goal Card with Progress Meters */}
          <ExamGoalCard 
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
          />
          
          {/* Today's Schedule */}
          <TodayScheduleCard />
          
          {/* Performance Insights */}
          <PerformanceInsightsCard 
            subjects={mockSubjects}
            concepts={mockConcepts}
          />
        </div>

        {/* Right Column - Secondary Cards */}
        <div className="space-y-6">
          {/* Mood-Based Plan Adjuster */}
          <MoodBasedPlanAdjuster currentMood={currentMood} />
          
          {/* Next Actions */}
          <NextActionsCard />
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
