
import React from 'react';
import { useStudyProgress } from "@/hooks/useStudyProgress";
import { useUserProfile } from "@/hooks/useUserProfile";
import StudyProgressHeader from "@/components/dashboard/student/study-progress/StudyProgressHeader";
import { ProgressStatCards } from "@/components/dashboard/student/study-progress/ProgressStatCards";
import { WeeklyProgressChart } from "@/components/dashboard/student/study-progress/WeeklyProgressChart";
import { StudyStreakCard } from "@/components/dashboard/student/study-progress/StudyStreakCard";
import PerformanceTabs from "@/components/dashboard/student/study-progress/PerformanceTabs";

const StudyProgress = () => {
  const { subjectsProgress, streak, loading, selectedSubject, selectSubject } = useStudyProgress();
  const { userProfile } = useUserProfile("student");
  
  // Check if userProfile isn't null before accessing examPreparation
  const examGoal = userProfile?.examPreparation || "General Study";
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <StudyProgressHeader streak={streak} />
      
      <ProgressStatCards 
        subjectsLength={subjectsProgress.length} 
        studyStreak={streak.current} 
        examGoal={examGoal} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
        <WeeklyProgressChart subjects={subjectsProgress} />
        <StudyStreakCard studyStreak={streak} />
      </div>
      
      <PerformanceTabs
        subjectsProgress={subjectsProgress}
        streak={streak}
      />
    </div>
  );
};

export default StudyProgress;
