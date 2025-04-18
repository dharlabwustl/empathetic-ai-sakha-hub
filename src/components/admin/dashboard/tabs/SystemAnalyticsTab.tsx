
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminService } from "@/services/adminService";
import { Activity, AlertCircle, TrendingUp, Users } from "lucide-react";
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface KpiStats {
  stressReduction: number;
  timeOptimization: number;
  habitFormation: number;
  examConfidence: number;
  userRetention: number;
  moodBasedUsage: number;
}

interface DataReliability {
  stressReduction: boolean;
  timeOptimization: boolean;
  habitFormation: boolean;
  examConfidence: boolean;
  userRetention: boolean;
  moodBasedUsage: boolean;
}

const SystemAnalyticsTab = () => {
  const [stats, setStats] = React.useState<KpiStats | null>(null);
  const [dataReliability, setDataReliability] = React.useState<DataReliability>({
    stressReduction: false,
    timeOptimization: false,
    habitFormation: false,
    examConfidence: false,
    userRetention: false,
    moodBasedUsage: false
  });
  const [sampleSizes, setSampleSizes] = React.useState({
    totalStudents: 0,
    totalSessions: 0,
    completedSurveys: 0
  });

  React.useEffect(() => {
    const fetchStats = async () => {
      const dashboardStats = await adminService.getDashboardStats();
      if (dashboardStats) {
        // Calculate metrics with more precise formulas
        setStats({
          stressReduction: dashboardStats.verifiedMoodImprovement
            ? Math.min(Math.round(dashboardStats.verifiedMoodImprovement), 100)
            : Math.min(Math.round((dashboardStats.averageMoodScore - 5) / 5 * 100), 100),
          
          timeOptimization: dashboardStats.averageTimeSavedPerWeek
            ? Math.round(dashboardStats.averageTimeSavedPerWeek)
            : dashboardStats.studyPlanEfficiencyImprovement
              ? Math.round(dashboardStats.studyPlanEfficiencyImprovement / 10)
              : 5,
          
          habitFormation: dashboardStats.studentsWithVerifiedConsistentHabits
            ? Math.round((dashboardStats.studentsWithVerifiedConsistentHabits / dashboardStats.totalStudents) * 100)
            : Math.round((dashboardStats.studentsWithConsistentHabits / dashboardStats.totalStudents) * 100),
          
          examConfidence: dashboardStats.verifiedExamConfidenceImprovement
            ? Math.round(dashboardStats.verifiedExamConfidenceImprovement)
            : Math.round((dashboardStats.averageConfidenceScore / 10) * 100),
          
          userRetention: dashboardStats.verifiedRetentionRate
            ? dashboardStats.verifiedRetentionRate
            : Math.round((dashboardStats.activeStudents / dashboardStats.totalStudents) * 100),
          
          moodBasedUsage: dashboardStats.verifiedMoodFeatureUsage
            ? dashboardStats.verifiedMoodFeatureUsage
            : Math.round((dashboardStats.moodBasedSessionsCount / dashboardStats.totalSessions) * 100)
        });
        
        // Set sample sizes for data validation
        setSampleSizes({
          totalStudents: dashboardStats.totalStudents,
          totalSessions: dashboardStats.totalSessions,
          completedSurveys: dashboardStats.completedSurveys || 0
        });
        
        // Determine which metrics have reliable data
        const MIN_SAMPLE_SIZE = 50;
        const MIN_SESSIONS_FOR_TIME_CALC = 100;
        const MIN_SURVEYS = 30;
        
        setDataReliability({
          stressReduction: Boolean(dashboardStats.verifiedMoodImprovement) && 
                          (dashboardStats.completedSurveys >= MIN_SURVEYS),
          
          timeOptimization: Boolean(dashboardStats.averageTimeSavedPerWeek) && 
                          (dashboardStats.totalSessions >= MIN_SESSIONS_FOR_TIME_CALC),
          
          habitFormation: Boolean(dashboardStats.studentsWithVerifiedConsistentHabits) && 
                          (dashboardStats.totalStudents >= MIN_SAMPLE_SIZE),
          
          examConfidence: Boolean(dashboardStats.verifiedExamConfidenceImprovement) && 
                          (dashboardStats.completedSurveys >= MIN_SURVEYS),
          
          userRetention: Boolean(dashboardStats.verifiedRetentionRate) && 
                        (dashboardStats.totalStudents >= MIN_SAMPLE_SIZE),
          
          moodBasedUsage: Boolean(dashboardStats.verifiedMoodFeatureUsage) && 
                        (dashboardStats.totalSessions >= MIN_SESSIONS_FOR_TIME_CALC)
        });
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div>Loading analytics...</div>;

  const DataReliabilityIndicator = ({ isReliable }: { isReliable: boolean }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {isReliable ? (
            <span className="h-3 w-3 rounded-full bg-green-500 inline-block ml-2"></span>
          ) : (
            <span className="h-3 w-3 rounded-full bg-amber-500 inline-block ml-2"></span>
          )}
        </TooltipTrigger>
        <TooltipContent>
          {isReliable ? 
            "Verified data with sufficient sample size" : 
            "Estimated data - needs more samples for verification"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-md mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-amber-600 dark:text-amber-400 mt-1" size={18} />
          <div>
            <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">Data Reliability Information</h4>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
              Sample sizes: {sampleSizes.totalStudents} students, {sampleSizes.totalSessions} sessions, {sampleSizes.completedSurveys} surveys.
              <br />
              Green indicators show verified metrics with sufficient sample size. Amber indicators show estimated data.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Student Success Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Stress Reduction</span>
                <div className="flex items-center">
                  <span className="font-bold">{stats.stressReduction}%</span>
                  <DataReliabilityIndicator isReliable={dataReliability.stressReduction} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Habit Formation</span>
                <div className="flex items-center">
                  <span className="font-bold">{stats.habitFormation}%</span>
                  <DataReliabilityIndicator isReliable={dataReliability.habitFormation} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Exam Confidence</span>
                <div className="flex items-center">
                  <span className="font-bold">{stats.examConfidence}%</span>
                  <DataReliabilityIndicator isReliable={dataReliability.examConfidence} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Engagement Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>User Retention</span>
                <div className="flex items-center">
                  <span className="font-bold">{stats.userRetention}%</span>
                  <DataReliabilityIndicator isReliable={dataReliability.userRetention} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Mood-Based Usage</span>
                <div className="flex items-center">
                  <span className="font-bold">{stats.moodBasedUsage}%</span>
                  <DataReliabilityIndicator isReliable={dataReliability.moodBasedUsage} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Time Optimization</span>
                <div className="flex items-center">
                  <span className="font-bold">{stats.timeOptimization}+ hrs/week</span>
                  <DataReliabilityIndicator isReliable={dataReliability.timeOptimization} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <TrendingUp className="h-24 w-24 text-gray-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemAnalyticsTab;
