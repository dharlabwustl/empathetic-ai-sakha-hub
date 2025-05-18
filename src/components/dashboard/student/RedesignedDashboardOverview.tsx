
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentDashboardData } from '@/hooks/useStudentDashboardData';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, CalendarDays, GraduationCap, BookOpen,
  Brain, FileText, Bell, TrendingUp, Target, Check, Clock, Calendar
} from 'lucide-react';

import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import SubjectBreakdownSection from './dashboard-sections/SubjectBreakdownSection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import ProgressTrackerSection from './dashboard-sections/ProgressTrackerSection';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import ExamReadinessScore from './dashboard-sections/ExamReadinessScore';
import { MoodType } from '@/types/user/base';
import { Progress } from '@/components/ui/progress';
import UpcomingTasks from './UpcomingTasks';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

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

  if (loading || !dashboardData) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  // Enhanced KPIs with icons
  const enhancedKpis = [
    {
      id: "1",
      title: "Concepts Completed",
      value: 45,
      unit: "/60",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      change: 5,
      changeType: "positive" as const
    },
    {
      id: "2",
      title: "Quiz Average Score",
      value: 82,
      unit: "%",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      change: 3,
      changeType: "positive" as const
    },
    {
      id: "3",
      title: "Flashcard Recall",
      value: 78,
      unit: "%",
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      change: 7,
      changeType: "positive" as const
    },
    {
      id: "4",
      title: "Practice Tests",
      value: 12,
      icon: <Check className="h-6 w-6 text-amber-500" />,
      change: 2,
      changeType: "positive" as const
    },
    {
      id: "5",
      title: "Daily Study Goal",
      value: 4.5,
      unit: "hrs",
      icon: <Clock className="h-6 w-6 text-indigo-500" />,
      change: 0.5,
      changeType: "positive" as const
    }
  ];

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Study Dashboard</h2>
            <div className="flex items-center mt-1">
              <span className="text-sm text-muted-foreground mr-2">Exam Goal:</span>
              <span className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 px-3 py-1 rounded-full text-lg font-semibold">
                {dashboardData.examGoal}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI section above surrounding influences */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {enhancedKpis.map((kpi) => (
            <Card 
              key={kpi.id} 
              className="bg-white dark:bg-gray-800/50 border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>{kpi.icon}</div>
                  {kpi.changeType && (
                    <div className={`text-xs ${
                      kpi.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {kpi.changeType === 'positive' ? '+' : '-'}{kpi.change}{typeof kpi.change === 'number' && kpi.change % 1 === 0 ? '' : '%'}
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <div className="text-xl font-bold">
                    {kpi.value}{kpi.unit ? ` ${kpi.unit}` : ''}
                  </div>
                  <div className="text-xs text-gray-500">{kpi.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Exam Readiness Score with enhanced layout */}
      <motion.div variants={itemVariants} className="mb-6">
        <Card className="overflow-hidden border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="flex items-center mb-4 md:mb-0">
                <Target className="h-6 w-6 text-violet-600 mr-3" />
                <h3 className="text-xl font-bold">Exam Readiness Score</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Target Exam:</span>
                <span className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 px-2 py-1 rounded-full text-sm font-medium">
                  {dashboardData.examGoal}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-violet-600">72%</span>
                    <span className="text-xs text-gray-500">Readiness</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Concept Mastery</div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">75%</div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Recall Accuracy</div>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">68%</div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Exam Score</div>
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400">82%</div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Days to Exam</div>
                    <div className="text-xl font-bold text-amber-600 dark:text-amber-400">85</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={() => navigate('/dashboard/student/today')}
                    size="sm"
                    className="bg-violet-600 hover:bg-violet-700"
                  >
                    Complete Today's Tasks
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/dashboard/student/concepts')}
                    size="sm"
                    variant="outline"
                    className="border-violet-200 text-violet-700 hover:bg-violet-50"
                  >
                    View Upcoming Tasks
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Today's Plan and Mood Based Suggestions side by side */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaysPlanSection studyPlan={dashboardData.studyPlan} currentMood={currentMood} />
        <MoodBasedSuggestions currentMood={currentMood} onMoodSelect={handleMoodSelect} />
      </motion.div>

      {/* Learning Profile and Upcoming Tasks side by side */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Profile - Compact Design */}
        <Card className="overflow-hidden border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Brain className="h-5 w-5 text-violet-600 mr-2" />
              <h3 className="text-lg font-medium">Your Learning Status</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground">Concepts Mastered</div>
                <div className="text-2xl font-bold">45/60</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">75% completed</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground">Total Study Time</div>
                <div className="text-2xl font-bold">126 hrs</div>
                <div className="text-xs text-green-600 dark:text-green-400">+12 this week</div>
              </div>
            </div>
              
            <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-800/50">
              <h4 className="font-medium text-violet-800 dark:text-violet-300 mb-2">Daily Streak</h4>
              <div className="grid grid-cols-7 gap-1 mb-3">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-6 rounded ${i < 5 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'} flex items-center justify-center text-xs text-white`}
                  >
                    {i < 5 && <Check className="h-3 w-3" />}
                  </div>
                ))}
              </div>
              <div className="text-sm text-center">
                <span className="font-medium">5 days</span> study streak! Keep it going!
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={() => navigate('/dashboard/student/academic')}
                size="sm" 
                variant="outline"
                className="w-full"
              >
                View Complete Learning Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <UpcomingTasks tasks={dummyTasks} />
      </motion.div>

      {/* Smart Suggestions and Surrounding Influences */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SmartSuggestionsCenter 
          performance={{
            accuracy: 85,
            quizScores: 90,
            conceptProgress: 75,
            streak: 7
          }}
        />
        
        <SubjectBreakdownSection subjects={dashboardData.subjects} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ProgressTrackerSection progressTracker={dashboardData.progressTracker} />
      </motion.div>
    </motion.div>
  );
}
