
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, FileText, Calendar, Target, TrendingUp, Award, Star } from "lucide-react";
import SmartDailySuggestions from './SmartDailySuggestions';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with User Greeting */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{getGreeting()}, {userProfile.name}! 🌟</h1>
            <p className="text-blue-100 text-lg">Ready to conquer your study goals today?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-xl font-bold">7 Day Streak</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              3h 15m planned today
            </Badge>
          </div>
        </div>
      </div>

      {/* Smart Daily Suggestions - Moved below header */}
      <SmartDailySuggestions />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-full shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Study Concepts</h3>
                <p className="text-blue-700 text-sm">Master key topics</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500 rounded-full shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-900">Review Flashcards</h3>
                <p className="text-purple-700 text-sm">Quick memory boost</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500 rounded-full shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900">Practice Exams</h3>
                <p className="text-green-700 text-sm">Test your knowledge</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.filter(kpi => 
          !['Weekly Study Time', 'Practice Questions', 'Target Exams Covered', 'Users Log Weekly Moods'].includes(kpi.title)
        ).map(kpi => (
          <Card key={kpi.id} className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="font-medium text-sm text-gray-600 dark:text-gray-400">{kpi.title}</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value} {kpi.unit}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Schedule Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Physics - Laws of Motion</p>
                  <p className="text-sm text-gray-600">30 minutes</p>
                </div>
              </div>
              <Button size="sm">Start</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Chemistry Flashcards</p>
                  <p className="text-sm text-gray-600">25 minutes</p>
                </div>
              </div>
              <Button size="sm">Start</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Biology Mock Test</p>
                  <p className="text-sm text-gray-600">45 minutes</p>
                </div>
              </div>
              <Button size="sm">Start</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedesignedDashboardOverview;
