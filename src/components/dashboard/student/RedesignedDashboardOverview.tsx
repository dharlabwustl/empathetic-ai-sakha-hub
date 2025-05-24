
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentDashboardData } from '@/hooks/useStudentDashboardData';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import SubjectBreakdownSection from './dashboard-sections/SubjectBreakdownSection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import ProgressTrackerSection from './dashboard-sections/ProgressTrackerSection';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import ExamReadinessScore from './dashboard-sections/ExamReadinessScore';
import StudentKPIDashboard from './StudentKPIDashboard';
import { MoodType } from '@/types/user/base';
import UpcomingTasks from './UpcomingTasks';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

// Mock data for the dashboard sections
const mockProgressTracker = {
  completedTasks: 8,
  totalTasks: 12,
  streak: 5,
  weeklyGoal: 80,
  weeklyProgress: 75
};

const mockSubjects = [
  { id: '1', name: 'Physics', progress: 75, color: '#3B82F6', timeSpent: 12 },
  { id: '2', name: 'Chemistry', progress: 60, color: '#10B981', timeSpent: 8 },
  { id: '3', name: 'Mathematics', progress: 85, color: '#F59E0B', timeSpent: 15 }
];

const mockPerformance = {
  suggestions: [
    {
      id: '1',
      title: 'Review Organic Chemistry',
      description: 'You have some pending concepts in organic chemistry',
      priority: 'high' as const,
      type: 'revision' as const,
      estimatedTime: 30
    },
    {
      id: '2',
      title: 'Practice Physics Problems',
      description: 'Complete mechanics problem set',
      priority: 'medium' as const,
      type: 'practice' as const,
      estimatedTime: 45
    }
  ]
};

const mockStudyStats = {
  subjects: mockSubjects,
  conceptCards: {
    mastered: 48,
    total: 120,
    recentlyAdded: 5
  }
};

const dummyTasks = [
  {
    id: "task-1",
    title: "Review Newton's Laws of Motion",
    subject: "Physics",
    type: "concept" as const,
    timeEstimate: 30,
    dueDate: "Today",
    priority: "high" as const
  },
  {
    id: "task-2",
    title: "Complete Organic Chemistry Flashcards",
    subject: "Chemistry",
    type: "flashcard" as const,
    timeEstimate: 20,
    dueDate: "Today",
    priority: "medium" as const
  },
  {
    id: "task-3",
    title: "Take Practice Test on Algebra",
    subject: "Mathematics",
    type: "exam" as const,
    timeEstimate: 60,
    dueDate: "Tomorrow",
    priority: "low" as const
  }
];

export default function RedesignedDashboardOverview({ userProfile, kpis }: RedesignedDashboardOverviewProps) {
  const { loading, dashboardData, refreshData } = useStudentDashboardData();
  const [currentMood, setCurrentMood] = useState<MoodType>();
  const navigate = useNavigate();

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

  const handleMoodSelect = (mood: MoodType) => {
    setCurrentMood(mood);
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-[250px] mb-2" />
                <Skeleton className="h-8 w-[100px] mb-2" />
                <Skeleton className="h-4 w-[200px]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Enhanced KPI Dashboard */}
      <motion.div variants={itemVariants}>
        <StudentKPIDashboard userProfile={userProfile} kpis={kpis} />
      </motion.div>

      {/* Exam Readiness Section */}
      <motion.div variants={itemVariants}>
        <ExamReadinessScore 
          score={78}
          previousScore={72}
          weeklyTrends={[
            { week: '1', score: 65 },
            { week: '2', score: 68 },
            { week: '3', score: 72 },
            { week: '4', score: 75 },
            { week: '5', score: 78 }
          ]}
          weakAreas={['Organic Chemistry', 'Thermodynamics']}
          strongAreas={['Algebra', 'Mechanics']}
        />
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants}>
            <TodaysPlanSection />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <ProgressTrackerSection progressTracker={mockProgressTracker} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <SubjectBreakdownSection subjects={mockSubjects} />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <SmartSuggestionsCenter performance={mockPerformance} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <StudyStatsSection 
              subjects={mockStudyStats.subjects} 
              conceptCards={mockStudyStats.conceptCards} 
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <MoodBasedSuggestions currentMood={currentMood} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <UpcomingTasks tasks={dummyTasks} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
