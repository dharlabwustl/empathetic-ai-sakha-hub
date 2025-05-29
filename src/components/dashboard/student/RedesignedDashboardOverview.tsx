
import React from 'react';
import { UserProfileType } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import EnhancedExamReadinessScore from './dashboard-sections/EnhancedExamReadinessScore';
import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import SubjectBreakdownSection from './dashboard-sections/SubjectBreakdownSection';
import ProgressTrackerSection from './dashboard-sections/ProgressTrackerSection';
import RevisionLoopSection from './dashboard-sections/RevisionLoopSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import { MoodType } from '@/types/user/base';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from './mood-tracking/moodUtils';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = React.useState<MoodType | undefined>(
    getCurrentMoodFromLocalStorage()
  );

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  // Mock data for demonstration
  const mockExamReadinessData = {
    currentScore: 78,
    previousScore: 65,
    trend: "up" as const
  };

  const mockStudyStatsData = {
    studyStreak: 7,
    averageStudyTime: 4.5,
    completedTopics: 15,
    totalTopics: 25
  };

  const mockSubjects = [
    { name: "Physics", progress: 75, color: "#3b82f6" },
    { name: "Chemistry", progress: 68, color: "#10b981" },
    { name: "Biology", progress: 82, color: "#8b5cf6" }
  ];

  const mockProgressTracker = {
    weeklyProgress: 75,
    monthlyProgress: 65,
    overallProgress: 70
  };

  const mockRevisionItems = [
    { topic: "Thermodynamics", subject: "Physics", difficulty: "medium", lastReviewed: "2 days ago" },
    { topic: "Organic Chemistry", subject: "Chemistry", difficulty: "hard", lastReviewed: "1 week ago" }
  ];

  const mockMilestones = [
    { title: "Complete Physics Revision", date: "2024-02-15", type: "revision", progress: 80 },
    { title: "Chemistry Mock Test", date: "2024-02-20", type: "exam", progress: 0 }
  ];

  const mockPerformance = {
    strengths: ["Physics", "Mathematics"],
    weaknesses: ["Organic Chemistry"],
    recommendations: ["Focus on problem-solving", "Practice more MCQs"]
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 min-h-screen">
      {/* Header section with key cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExamGoalCard 
          currentMood={currentMood}
          onMoodChange={handleMoodChange}
        />
        <MoodBasedSuggestions 
          currentMood={currentMood}
          onMoodChange={handleMoodChange}
        />
      </div>

      {/* Metrics and stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnhancedExamReadinessScore 
          currentScore={mockExamReadinessData.currentScore}
          previousScore={mockExamReadinessData.previousScore}
          trend={mockExamReadinessData.trend}
        />
        
        <StudyStatsSection 
          studyStreak={mockStudyStatsData.studyStreak}
          averageStudyTime={mockStudyStatsData.averageStudyTime}
          completedTopics={mockStudyStatsData.completedTopics}
          totalTopics={mockStudyStatsData.totalTopics}
        />
      </div>

      {/* Today's focus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaysPlanSection />
        <TodaysTopPrioritySection />
      </div>

      {/* Progress and performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubjectBreakdownSection subjects={mockSubjects} />
        
        <ProgressTrackerSection progressTracker={mockProgressTracker} />
      </div>

      {/* Learning optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevisionLoopSection revisionItems={mockRevisionItems} />
        
        {/* Smart suggestions - full width on mobile, half on larger screens */}
        <div className="lg:col-span-1">
          <SmartSuggestionsCenter performance={mockPerformance} />
        </div>
      </div>

      {/* Upcoming milestones - full width */}
      <div className="w-full">
        <UpcomingMilestonesSection milestones={mockMilestones} />
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
