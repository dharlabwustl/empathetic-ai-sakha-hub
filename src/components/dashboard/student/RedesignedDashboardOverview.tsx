
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { UserProfileType } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import SmartSuggestionsCenter from "./dashboard-sections/SmartSuggestionsCenter";
import TodaysPlanSection from "./dashboard-sections/TodaysPlanSection";
import NEETStrategyCard from "./NEETStrategyCard";
import OnboardingHighlights from "./OnboardingHighlights";
import ExamReadinessSection from "./dashboard-sections/ExamReadinessSection";
import { motion } from "framer-motion";
import { 
  Target, 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Zap,
  Award,
  BarChart
} from "lucide-react";

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis?: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis = [] 
}) => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has seen the onboarding
    const hasSeenOnboarding = localStorage.getItem('hasSeenDashboardOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenDashboardOnboarding', 'true');
  };

  // Mock data for performance analytics
  const performance = {
    accuracy: 78,
    quizScores: 85,
    conceptProgress: 68,
    streak: 5
  };

  // Mock exam readiness data
  const examReadinessData = {
    overallScore: 78,
    subjects: [
      { name: "Physics", score: 65, color: "bg-red-500" },
      { name: "Chemistry", score: 82, color: "bg-green-500" },
      { name: "Biology", score: 85, color: "bg-blue-500" }
    ],
    weeklyProgress: [
      { week: "Week 1", score: 60 },
      { week: "Week 2", score: 65 },
      { week: "Week 3", score: 72 },
      { week: "Week 4", score: 78 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Performance KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Overall Progress</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">68%</p>
                </div>
                <div className="p-2 bg-blue-200 dark:bg-blue-800/50 rounded-full">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">Study Streak</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">{performance.streak} days</p>
                </div>
                <div className="p-2 bg-green-200 dark:bg-green-800/50 rounded-full">
                  <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Quiz Average</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{performance.quizScores}%</p>
                </div>
                <div className="p-2 bg-purple-200 dark:bg-purple-800/50 rounded-full">
                  <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Hours Today</p>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">3.5h</p>
                </div>
                <div className="p-2 bg-orange-200 dark:bg-orange-800/50 rounded-full">
                  <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Exam Readiness Section */}
      <div data-tour="exam-readiness">
        <ExamReadinessSection examReadinessData={examReadinessData} />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Priority Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* NEET Strategy Card */}
          <NEETStrategyCard />
          
          {/* Today's Study Plan */}
          <TodaysPlanSection />
        </div>

        {/* Right Column - Smart Suggestions */}
        <div className="space-y-6" data-tour="smart-suggestions">
          <SmartSuggestionsCenter performance={performance} />
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-blue-500" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Concepts Learned</span>
                  <Badge variant="outline">128</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Practice Problems</span>
                  <Badge variant="outline">456</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Mock Tests</span>
                  <Badge variant="outline">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Revision Sessions</span>
                  <Badge variant="outline">34</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Onboarding Highlights */}
      <OnboardingHighlights 
        isVisible={showOnboarding}
        onComplete={handleCompleteOnboarding}
      />
    </div>
  );
};

export default RedesignedDashboardOverview;
