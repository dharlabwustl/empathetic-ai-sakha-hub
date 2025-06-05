
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Target, Brain, TrendingUp, BookOpen, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StudentProfileSection from "@/components/dashboard/student/study-plan/StudentProfileSection";
import SubjectAnalysisInput from "@/components/dashboard/student/study-plan/SubjectAnalysisInput";
import AdaptiveStudyPlanTable from "@/components/dashboard/student/study-plan/AdaptiveStudyPlanTable";
import WeeklyMonthlyDashboard from "@/components/dashboard/student/study-plan/WeeklyMonthlyDashboard";
import AIRecommendationsSection from "@/components/dashboard/student/study-plan/AIRecommendationsSection";
import PerformanceTrackerSection from "@/components/dashboard/student/study-plan/PerformanceTrackerSection";
import ResourcesNotesSection from "@/components/dashboard/student/study-plan/ResourcesNotesSection";
import SettingsCustomizationSection from "@/components/dashboard/student/study-plan/SettingsCustomizationSection";

const ComprehensiveStudyPlanPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dynamic Study Plan</h1>
              <p className="text-gray-600">Personalized learning path for NEET 2026</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Active Plan
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Days Remaining</p>
                  <p className="text-2xl font-bold">485</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Study Streak</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Overall Progress</p>
                  <p className="text-2xl font-bold">68%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Focus Score</p>
                  <p className="text-2xl font-bold">85</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="profile" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="ai-reco" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              AI Tips
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <StudentProfileSection />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <SubjectAnalysisInput />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <AdaptiveStudyPlanTable />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <WeeklyMonthlyDashboard />
          </TabsContent>

          <TabsContent value="ai-reco" className="space-y-6">
            <AIRecommendationsSection />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceTrackerSection />
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <ResourcesNotesSection />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsCustomizationSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveStudyPlanPage;
