
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Target, 
  Calendar, 
  Clock, 
  BookOpen, 
  Brain, 
  TrendingUp,
  Settings,
  FileText,
  BarChart3,
  Award,
  Download,
  Bell
} from 'lucide-react';
import { StudentProfileSection } from './sections/StudentProfileSection';
import { SubjectAnalysisSection } from './sections/SubjectAnalysisSection';
import { AdaptivePlanTable } from './sections/AdaptivePlanTable';
import { WeeklyMonthlyDashboard } from './sections/WeeklyMonthlyDashboard';
import { AIRecommendationsSection } from './sections/AIRecommendationsSection';
import { PerformanceTrackerSection } from './sections/PerformanceTrackerSection';
import { ResourcesNotesSection } from './sections/ResourcesNotesSection';
import { SettingsCustomizationSection } from './sections/SettingsCustomizationSection';
import { useToast } from '@/hooks/use-toast';

const StudyPlanPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  // Quick stats for the header
  const quickStats = {
    examDate: '2026-05-03',
    daysLeft: 497,
    totalProgress: 45,
    todayProgress: 3.5,
    weeklyTarget: 40,
    studyStreak: 15,
    conceptsMastered: 156
  };

  const handleExportPlan = () => {
    toast({
      title: "Study Plan Exported",
      description: "Your study plan has been downloaded successfully.",
    });
  };

  return (
    <SharedPageLayout
      title="Comprehensive Study Plan"
      subtitle="NEET 2026 - AI-Powered Personalized Learning Journey"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Reminders
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPlan}>
            <Download className="h-4 w-4 mr-2" />
            Export Plan
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Settings className="h-4 w-4 mr-2" />
            Customize
          </Button>
        </div>
      }
    >
      {/* Quick Overview Header */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <div className="text-xs text-gray-600 mb-1">Exam Date</div>
              <div className="font-bold text-blue-600 text-sm">May 3, 2026</div>
              <div className="text-xs text-gray-500">{quickStats.daysLeft} days left</div>
            </div>
            <div className="text-center">
              <Target className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="text-xs text-gray-600 mb-1">Overall Progress</div>
              <div className="font-bold text-green-600 text-lg">{quickStats.totalProgress}%</div>
              <Progress value={quickStats.totalProgress} className="h-1 mt-1" />
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <div className="text-xs text-gray-600 mb-1">Today's Study</div>
              <div className="font-bold text-orange-600 text-lg">{quickStats.todayProgress}h</div>
              <div className="text-xs text-gray-500">Target: 6h</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <div className="text-xs text-gray-600 mb-1">Weekly Target</div>
              <div className="font-bold text-purple-600 text-lg">{quickStats.weeklyTarget}h</div>
              <div className="text-xs text-gray-500">28h completed</div>
            </div>
            <div className="text-center">
              <Award className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
              <div className="text-xs text-gray-600 mb-1">Study Streak</div>
              <div className="font-bold text-yellow-600 text-lg">{quickStats.studyStreak}</div>
              <div className="text-xs text-gray-500">days</div>
            </div>
            <div className="text-center">
              <Brain className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
              <div className="text-xs text-gray-600 mb-1">Concepts</div>
              <div className="font-bold text-indigo-600 text-lg">{quickStats.conceptsMastered}</div>
              <div className="text-xs text-gray-500">mastered</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6 h-12">
          <TabsTrigger value="profile" className="flex flex-col items-center gap-1 p-2">
            <User className="h-4 w-4" />
            <span className="text-xs">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex flex-col items-center gap-1 p-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="plan" className="flex flex-col items-center gap-1 p-2">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">Plan</span>
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex flex-col items-center gap-1 p-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex flex-col items-center gap-1 p-2">
            <Brain className="h-4 w-4" />
            <span className="text-xs">AI</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex flex-col items-center gap-1 p-2">
            <Award className="h-4 w-4" />
            <span className="text-xs">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex flex-col items-center gap-1 p-2">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex flex-col items-center gap-1 p-2">
            <Settings className="h-4 w-4" />
            <span className="text-xs">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">🧑‍🎓 Student Profile Section</h2>
          </div>
          <StudentProfileSection />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold">📊 Subject Analysis & Input</h2>
          </div>
          <SubjectAnalysisSection />
        </TabsContent>

        <TabsContent value="plan" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-semibold">📅 Adaptive Study Plan Table</h2>
          </div>
          <AdaptivePlanTable />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <h2 className="text-xl font-semibold">📆 Weekly & Monthly Dashboard</h2>
          </div>
          <WeeklyMonthlyDashboard />
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">🤖 AI-Powered Recommendations</h2>
          </div>
          <AIRecommendationsSection />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-yellow-600" />
            <h2 className="text-xl font-semibold">📈 Performance Tracker</h2>
          </div>
          <PerformanceTrackerSection />
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-teal-600" />
            <h2 className="text-xl font-semibold">📚 Resources & Notes Section</h2>
          </div>
          <ResourcesNotesSection />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-semibold">⚙️ Settings & Customization</h2>
          </div>
          <SettingsCustomizationSection />
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default StudyPlanPage;
