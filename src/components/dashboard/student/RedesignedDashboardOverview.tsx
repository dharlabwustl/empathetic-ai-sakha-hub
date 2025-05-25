
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserProfileType } from "@/types/user";
import { KpiData } from "@/hooks/useKpiTracking";
import { Progress } from "@/components/ui/progress";
import TodaysPlanSection from "./dashboard-sections/TodaysPlanSection";
import ExamReadinessSection from "./dashboard-sections/ExamReadinessSection";
import DashboardVoiceAssistant from '@/components/voice/DashboardVoiceAssistant';
import { getCurrentMoodFromLocalStorage } from './mood-tracking/moodUtils';
import { MoodType } from '@/types/user/base';
import { Brain, Target, Calendar, Clock } from 'lucide-react';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const currentMood = getCurrentMoodFromLocalStorage();

  // Mock performance data - replace with real data from your backend
  const performance = {
    accuracy: 78,
    quizScores: 85,
    conceptProgress: 72,
    streak: 7
  };

  // Generate daily smart suggestions
  const getDailySmartSuggestions = () => {
    const suggestions = [];

    if (performance.accuracy > 80 && performance.quizScores > 85) {
      suggestions.push({
        icon: <Target className="h-4 w-4 text-green-600" />,
        text: "You're ready for advanced practice exams! Your high accuracy shows mastery.",
        color: "bg-green-50 border-green-200 text-green-800"
      });
    } else if (performance.conceptProgress > 70 && performance.accuracy < 60) {
      suggestions.push({
        icon: <Brain className="h-4 w-4 text-blue-600" />,
        text: "Strong conceptual understanding, but recall needs improvement. Focus on flashcards today.",
        color: "bg-blue-50 border-blue-200 text-blue-800"
      });
    } else if (performance.conceptProgress < 50) {
      suggestions.push({
        icon: <Calendar className="h-4 w-4 text-amber-600" />,
        text: "Focus on core concepts first. Small wins will build momentum for complex topics.",
        color: "bg-amber-50 border-amber-200 text-amber-800"
      });
    }

    if (performance.streak >= 5) {
      suggestions.push({
        icon: <Clock className="h-4 w-4 text-purple-600" />,
        text: "Amazing study streak! Your consistency is paying off. Keep it up!",
        color: "bg-purple-50 border-purple-200 text-purple-800"
      });
    }

    return suggestions.slice(0, 2); // Limit to 2 suggestions
  };

  const dailySuggestions = getDailySmartSuggestions();

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {userProfile.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to continue your exam preparation journey? Let's make today productive!
        </p>
        {currentMood && (
          <Badge variant="outline" className="mt-2 capitalize">
            Current mood: {currentMood.toLowerCase()}
          </Badge>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.filter(kpi => 
          !['Weekly Study Time', 'Practice Questions', 'Target Exams Covered', 'Users Log Weekly Moods'].includes(kpi.title)
        ).map(kpi => (
          <Card key={kpi.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <h3 className="font-medium text-sm text-gray-600 dark:text-gray-400">{kpi.title}</h3>
              <p className="text-2xl font-bold">{kpi.value} {kpi.unit}</p>
              {kpi.trend && (
                <p className={`text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Plan Section */}
        <TodaysPlanSection 
          studyPlan={null}
          currentMood={currentMood as MoodType}
        />

        {/* Exam Readiness Section */}
        <ExamReadinessSection />
      </div>

      {/* Daily Smart Suggestions - moved below exam readiness */}
      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-indigo-200 dark:border-indigo-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200">
            <Brain className="h-5 w-5" />
            Daily Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {dailySuggestions.map((suggestion, index) => (
            <div key={index} className={`p-3 rounded-lg border ${suggestion.color}`}>
              <div className="flex items-start gap-2">
                {suggestion.icon}
                <p className="text-sm">{suggestion.text}</p>
              </div>
            </div>
          ))}
          
          {dailySuggestions.length === 0 && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Keep studying consistently to receive personalized suggestions!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voice Assistant */}
      <DashboardVoiceAssistant
        userName={userProfile.name || userProfile.firstName || 'Student'}
        language="en-IN"
        userMood={currentMood as MoodType}
      />
    </div>
  );
};

export default RedesignedDashboardOverview;
