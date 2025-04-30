
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentDashboardData } from '@/hooks/useStudentDashboardData';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, CalendarDays, GraduationCap, BookOpen,
  Brain, FileText, TrendingUp
} from 'lucide-react';

import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import SubjectBreakdownSection from './dashboard-sections/SubjectBreakdownSection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import ProgressTrackerSection from './dashboard-sections/ProgressTrackerSection';
import RevisionLoopSection from './dashboard-sections/RevisionLoopSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import ExamReadinessSection from './dashboard-sections/ExamReadinessSection';
import TodaysPlanCompact from './dashboard-sections/TodaysPlanCompact';
import { MoodType } from '@/types/user/base';
import MoodLogButton from './mood-tracking/MoodLogButton';
import { useToast } from '@/hooks/use-toast';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

export default function RedesignedDashboardOverview({ 
  userProfile, 
  kpis, 
  currentMood,
  onMoodChange 
}: RedesignedDashboardOverviewProps) {
  const { loading, dashboardData, refreshData } = useStudentDashboardData();
  const goalTitle = userProfile?.goals && userProfile.goals.length > 0 
    ? userProfile.goals[0]?.title || "IIT-JEE" 
    : "IIT-JEE";
    
  const { planData, loading: planLoading } = useTodaysPlan(goalTitle, "Student");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Use current mood from props if available, otherwise use local state
  const [localMood, setLocalMood] = useState<MoodType | undefined>(currentMood);

  // Sync mood between props and local state
  useEffect(() => {
    if (currentMood !== undefined && currentMood !== localMood) {
      setLocalMood(currentMood);
    }
  }, [currentMood]);

  const handleMoodSelect = (mood: MoodType) => {
    setLocalMood(mood);
    if (onMoodChange) {
      onMoodChange(mood);
    }
    
    // Save to localStorage
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.mood = mood;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      }
    } catch (error) {
      console.error("Error saving mood to localStorage:", error);
    }
    
    toast({
      title: "Mood Updated",
      description: "Your study plan has been adjusted based on your mood",
    });
  };

  // Mock exam readiness data
  const examReadinessData = {
    overall: 68,
    conceptMastery: 75,
    practiceCompletion: 60,
    mockTestResults: 72,
    cutoffTarget: 85,
    examName: goalTitle
  };

  // Function to navigate to Today's Plan
  const handleGoToTodaysPlan = () => {
    navigate("/dashboard/student/today");
  };

  if (loading || planLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item}>
            <CardContent className="p-6">
              <Skeleton className="h-8 w-1/2 mb-4" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-8 w-3/4 mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mood Selection */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="text-primary h-6 w-6" />
          Dashboard Overview
        </h2>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">How are you feeling today?</span>
          <MoodLogButton
            currentMood={localMood}
            onMoodChange={handleMoodSelect}
            size="default"
            showLabel={true}
          />
        </div>
      </div>
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
        {/* Study Stats Section */}
        <div className="md:col-span-3 lg:col-span-4">
          <StudyStatsSection />
        </div>

        {/* Today's Plan Section */}
        <div className="md:col-span-3 lg:col-span-4">
          <TodaysPlanCompact
            planData={planData}
            isLoading={planLoading}
            currentMood={localMood}
            onViewAll={handleGoToTodaysPlan}
          />
        </div>

        {/* Mood-Based Suggestions */}
        <div className="md:col-span-6 lg:col-span-4">
          <MoodBasedSuggestions 
            currentMood={localMood} 
            onMoodSelect={handleMoodSelect}
          />
        </div>

        {/* Exam Readiness Section */}
        <div className="md:col-span-6 lg:col-span-12">
          <ExamReadinessSection examReadiness={examReadinessData} />
        </div>

        {/* Subject Breakdown */}
        <div className="md:col-span-6">
          <SubjectBreakdownSection />
        </div>

        {/* Progress Tracker */}
        <div className="md:col-span-6">
          <ProgressTrackerSection />
        </div>

        {/* Smart Suggestions Center */}
        <div className="md:col-span-6">
          <SmartSuggestionsCenter />
        </div>

        {/* Revision Loop */}
        <div className="md:col-span-6">
          <RevisionLoopSection />
        </div>

        {/* Upcoming Milestones */}
        <div className="md:col-span-12">
          <UpcomingMilestonesSection />
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          {
            title: "Today's Plan",
            description: "Your personalized study schedule",
            icon: CalendarDays,
            color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
            link: "/dashboard/student/today"
          },
          {
            title: "Concept Cards",
            description: "Master foundational concepts",
            icon: BookOpen,
            color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
            link: "/dashboard/student/concepts"
          },
          {
            title: "Flashcards",
            description: "Review and memorize key facts",
            icon: Brain,
            color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
            link: "/dashboard/student/flashcards"
          },
          {
            title: "Practice Exams",
            description: "Test your knowledge and skills",
            icon: FileText,
            color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
            link: "/dashboard/student/practice-exam"
          },
        ].map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Button
              variant="ghost"
              className="w-full h-full p-6 flex flex-col items-center justify-center gap-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-700 rounded-lg"
              onClick={() => navigate(card.link)}
            >
              <div className={`p-3 rounded-full ${card.color}`}>
                <card.icon className="h-6 w-6" />
              </div>
              <div className="text-center">
                <h3 className="font-medium">{card.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
