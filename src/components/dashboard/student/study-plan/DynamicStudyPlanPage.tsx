
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Lightbulb,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
  Award
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
import { useLanguage } from '@/contexts/LanguageContext';

const DynamicStudyPlanPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');

  // Quick stats for the header
  const quickStats = {
    examDate: '2026-05-03',
    daysLeft: 497,
    totalProgress: 45,
    todayProgress: 3.5,
    weeklyTarget: 40
  };

  return (
    <SharedPageLayout
      title={t('adaptiveStudyPlan') || "Dynamic & Adaptive Study Plan"}
      subtitle="NEET 2026 - Personalized AI-Powered Study Strategy"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
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
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <Calendar className="h-5 w-5 mx-auto mb-1 text-blue-600" />
              <div className="text-xs text-gray-600">Exam Date</div>
              <div className="font-bold text-blue-600">May 3, 2026</div>
            </div>
            <div className="text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-red-600" />
              <div className="text-xs text-gray-600">Days Left</div>
              <div className="font-bold text-red-600">{quickStats.daysLeft}</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-600" />
              <div className="text-xs text-gray-600">Overall Progress</div>
              <div className="font-bold text-green-600">{quickStats.totalProgress}%</div>
            </div>
            <div className="text-center">
              <BookOpen className="h-5 w-5 mx-auto mb-1 text-orange-600" />
              <div className="text-xs text-gray-600">Today's Hours</div>
              <div className="font-bold text-orange-600">{quickStats.todayProgress}h</div>
            </div>
            <div className="text-center">
              <Target className="h-5 w-5 mx-auto mb-1 text-purple-600" />
              <div className="text-xs text-gray-600">Weekly Target</div>
              <div className="font-bold text-purple-600">{quickStats.weeklyTarget}h</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="plan" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Plan</span>
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">AI</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <StudentProfileSection />
        </TabsContent>

        <TabsContent value="analysis">
          <SubjectAnalysisSection />
        </TabsContent>

        <TabsContent value="plan">
          <AdaptivePlanTable />
        </TabsContent>

        <TabsContent value="dashboard">
          <WeeklyMonthlyDashboard />
        </TabsContent>

        <TabsContent value="ai">
          <AIRecommendationsSection />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceTrackerSection />
        </TabsContent>

        <TabsContent value="resources">
          <ResourcesNotesSection />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsCustomizationSection />
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default DynamicStudyPlanPage;
