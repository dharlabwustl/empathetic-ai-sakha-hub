import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { BookMarked, Calendar, Clock, Target, TrendingUp, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedDashboardHeader from '../student/EnhancedDashboardHeader';
import { useNavigate } from 'react-router-dom';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  hideHeader?: boolean;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange,
  hideHeader = false
}) => {
  const navigate = useNavigate();
  const [examReadiness, setExamReadiness] = useState(78);
  const [showReadinessDetails, setShowReadinessDetails] = useState(false);
  const [kpiMetrics, setKpiMetrics] = useState({
    conceptMastery: 65,
    quizPerformance: 72,
    studyConsistency: 85,
    mockTestScores: 68
  });

  // Calculate exam readiness based on KPIs
  useEffect(() => {
    if (kpis && kpis.length > 0) {
      // Extract relevant KPI data
      const conceptKpi = kpis.find(k => k.name === 'concept_mastery')?.value || 65;
      const quizKpi = kpis.find(k => k.name === 'quiz_performance')?.value || 72;
      const consistencyKpi = kpis.find(k => k.name === 'study_consistency')?.value || 85;
      const mockTestKpi = kpis.find(k => k.name === 'mock_test_scores')?.value || 68;
      
      // Update KPI metrics
      setKpiMetrics({
        conceptMastery: conceptKpi,
        quizPerformance: quizKpi,
        studyConsistency: consistencyKpi,
        mockTestScores: mockTestKpi
      });
      
      // Calculate weighted exam readiness
      const readiness = Math.round(
        (conceptKpi * 0.3) + 
        (quizKpi * 0.2) + 
        (consistencyKpi * 0.2) + 
        (mockTestKpi * 0.3)
      );
      
      setExamReadiness(readiness);
    }
  }, [kpis]);

  const getReadinessColorClass = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-600";
    if (score >= 65) return "from-blue-500 to-indigo-600";
    if (score >= 50) return "from-yellow-500 to-amber-600";
    return "from-red-500 to-pink-600";
  };

  const getReadinessStatus = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 65) return "Good";
    if (score >= 50) return "Average";
    return "Needs Improvement";
  };

  const handleViewStudyPlan = () => {
    navigate('/dashboard/student/study-plan');
  };

  const handleViewExamAnalysis = () => {
    navigate('/dashboard/student/exam-analyzer');
  };

  return (
    <div className="space-y-6">
      {/* Only show header if hideHeader is false */}
      {!hideHeader && (
        <EnhancedDashboardHeader
          userProfile={userProfile}
          onViewStudyPlan={handleViewStudyPlan}
          currentMood={currentMood}
          onMoodChange={onMoodChange}
        />
      )}

      {/* Exam goal section - keeping all existing content */}
      <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Current Exam Goal</p>
            <p className="font-medium text-gray-900 dark:text-white">{userProfile.examPreparation}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Switch Plan
          </Button>
          <Button size="sm">
            New Plan
          </Button>
        </div>
      </div>

      {/* Exam Readiness Score */}
      <Card className="border-indigo-200 dark:border-indigo-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-indigo-600" />
            Exam Readiness Score
            <Badge className="ml-auto bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/50">
              {getReadinessStatus(examReadiness)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Overall Readiness</span>
              <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{examReadiness}%</span>
            </div>
            <Progress 
              value={examReadiness} 
              className="h-2.5" 
              indicatorClassName={`bg-gradient-to-r ${getReadinessColorClass(examReadiness)}`}
            />
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              {Object.entries(kpiMetrics).map(([key, value]) => (
                <div key={key} className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="font-medium">{value}%</span>
                  </div>
                  <Progress value={value} className="h-1.5" />
                </div>
              ))}
            </div>
            
            <div className="flex justify-between pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setShowReadinessDetails(!showReadinessDetails)}
              >
                {showReadinessDetails ? 'Hide Details' : 'Show Details'}
              </Button>
              <Button 
                size="sm" 
                className="text-xs bg-indigo-600 hover:bg-indigo-700"
                onClick={handleViewExamAnalysis}
              >
                <ArrowRight className="h-3 w-3 mr-1" />
                Full Analysis
              </Button>
            </div>
            
            {showReadinessDetails && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md"
              >
                <p>Your exam readiness score is calculated based on your performance across multiple dimensions:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Concept Mastery (30%): How well you understand core concepts</li>
                  <li>Quiz Performance (20%): Your accuracy in practice quizzes</li>
                  <li>Study Consistency (20%): Your regular study habits</li>
                  <li>Mock Test Scores (30%): Performance in full-length tests</li>
                </ul>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Learning Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="bg-white dark:bg-gray-800/50 border-gray-100 dark:border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <CardTitle className="text-sm">Concepts</CardTitle>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{kpiMetrics.conceptMastery}%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Mastery</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800/50 border-gray-100 dark:border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-green-600" />
              <CardTitle className="text-sm">Quizzes</CardTitle>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{kpiMetrics.quizPerformance}%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Accuracy</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800/50 border-gray-100 dark:border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-purple-600" />
              <CardTitle className="text-sm">Consistency</CardTitle>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{kpiMetrics.studyConsistency}%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Streak</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800/50 border-gray-100 dark:border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <CardTitle className="text-sm">Mock Tests</CardTitle>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{kpiMetrics.mockTestScores}%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Average</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
