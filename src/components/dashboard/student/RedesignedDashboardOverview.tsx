
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
  Brain, FileText, Bell, TrendingUp, Target
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

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

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

      {/* KPI section moved above surrounding influences */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {kpis.map((kpi) => (
            <Card 
              key={kpi.id} 
              className="bg-white dark:bg-gray-800/50 border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-2xl">{kpi.icon}</div>
                  {kpi.changeType && (
                    <div className={`text-xs ${
                      kpi.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {kpi.changeType === 'positive' ? '+' : '-'}{kpi.change}%
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
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Days to Exam</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">85</div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Study Hours</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">126</div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Daily Tasks</div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">7</div>
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
                    View Study Plan
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Learning Profile and Today's Plan side by side */}
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
              <h4 className="font-medium text-violet-800 dark:text-violet-300 mb-2">Weekly Progress</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Study Hours</span>
                    <span className="font-medium">12.5 hrs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Practice Tests</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Flashcards</span>
                    <span className="font-medium">120</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Score</span>
                    <span className="font-medium">82%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      
        {/* Today's Plan */}
        <TodaysPlanSection studyPlan={dashboardData.studyPlan} currentMood={currentMood} />
      </motion.div>

      {/* Mood Based Suggestions and Smart Suggestions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MoodBasedSuggestions currentMood={currentMood} onMoodSelect={handleMoodSelect} />
        <SmartSuggestionsCenter 
          performance={{
            accuracy: 85,
            quizScores: 90,
            conceptProgress: 75,
            streak: 7
          }}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StudyStatsSection subjects={dashboardData.subjects} conceptCards={dashboardData.conceptCards} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Brain className="h-5 w-5 text-violet-600 mr-2" />
                <h3 className="text-lg font-medium">AI Personalized Study Plan</h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Based on your profile and learning goals, we've created a personalized study plan to help you succeed.
                </p>
                
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-800/50">
                  <h4 className="font-medium text-violet-800 dark:text-violet-300 mb-2">Your Learning Profile</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 md:col-span-1">
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-violet-400 rounded-full mr-2"></span>
                          <span>Learning Style: <strong>Visual</strong></span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-violet-400 rounded-full mr-2"></span>
                          <span>Best Study Time: <strong>Morning</strong></span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-violet-400 rounded-full mr-2"></span>
                          <span>Focus Duration: <strong>45 min</strong></span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-violet-400 rounded-full mr-2"></span>
                          <span>Recommended Break: <strong>10 min</strong></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600" 
                  onClick={() => navigate('/dashboard/student/academic')}
                >
                  View Complete Study Strategy
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <SubjectBreakdownSection subjects={dashboardData.subjects} />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <ProgressTrackerSection progressTracker={dashboardData.progressTracker} />
      </motion.div>
    </motion.div>
  );
}
