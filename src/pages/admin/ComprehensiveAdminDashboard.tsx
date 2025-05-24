
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Brain, 
  Settings, 
  BarChart3, 
  Bell,
  CreditCard,
  Target,
  UserCheck,
  Mic,
  Activity,
  Bot,
  Smile,
  GraduationCap,
  Zap,
  Shield,
  Database,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

// Import comprehensive admin components
import SystemOverviewTab from '@/components/admin/dashboard/tabs/SystemOverviewTab';
import StudentJourneyTab from '@/components/admin/dashboard/tabs/StudentJourneyTab';
import AIModelsTab from '@/components/admin/dashboard/tabs/AIModelsTab';
import ContentManagementTab from '@/components/admin/dashboard/tabs/ContentManagementTab';
import MoodAnalyticsTab from '@/components/admin/dashboard/tabs/MoodAnalyticsTab';
import LearningToolsTab from '@/components/admin/dashboard/tabs/LearningToolsTab';
import GamificationTab from '@/components/admin/dashboard/tabs/GamificationTab';
import CommunicationTab from '@/components/admin/dashboard/tabs/CommunicationTab';
import BatchManagementTab from '@/components/admin/dashboard/tabs/BatchManagementTab';
import ExamReadinessTab from '@/components/admin/dashboard/tabs/ExamReadinessTab';
import SubscriptionTab from '@/components/admin/dashboard/tabs/SubscriptionTab';
import AdvancedAnalyticsTab from '@/components/admin/dashboard/tabs/AdvancedAnalyticsTab';
import SystemConfigTab from '@/components/admin/dashboard/tabs/SystemConfigTab';
import AIPersonalizationTab from '@/components/admin/dashboard/tabs/AIPersonalizationTab';
import VoiceAssistantTab from '@/components/admin/dashboard/tabs/VoiceAssistantTab';

const ComprehensiveAdminDashboard = () => {
  const { adminUser, adminLogout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const tabsConfig = [
    { id: "overview", label: "System Overview", icon: LayoutDashboard, description: "Platform health & key metrics" },
    { id: "student-journey", label: "Student Journey", icon: Target, description: "Signup to exam readiness pipeline" },
    { id: "ai-models", label: "AI Models", icon: Brain, description: "AI model management & monitoring" },
    { id: "ai-personalization", label: "AI Personalization", icon: Bot, description: "Personalization engine configuration" },
    { id: "content", label: "Content Management", icon: BookOpen, description: "AI-generated content oversight" },
    { id: "mood-analytics", label: "Mood Analytics", icon: Smile, description: "Mood-based learning adaptations" },
    { id: "learning-tools", label: "Learning Tools", icon: GraduationCap, description: "Concept cards, flashcards, exams" },
    { id: "gamification", label: "Gamification", icon: Zap, description: "Feel Good Corner & engagement" },
    { id: "communication", label: "Communication", icon: MessageSquare, description: "AI Tutor & notifications" },
    { id: "voice-assistant", label: "Voice AI", icon: Mic, description: "Intelligent voice assistant" },
    { id: "batch-management", label: "Batch Management", icon: UserCheck, description: "Group & batch administration" },
    { id: "exam-readiness", label: "Exam Readiness", icon: TrendingUp, description: "Assessment & readiness tracking" },
    { id: "subscriptions", label: "Subscriptions", icon: CreditCard, description: "Subscription & monetization" },
    { id: "analytics", label: "Advanced Analytics", icon: BarChart3, description: "Predictive analytics & insights" },
    { id: "system-config", label: "System Config", icon: Settings, description: "Flask backend & security" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Comprehensive Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              AI-Powered Educational Platform Management & Student Journey Control
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Activity className="h-3 w-3 mr-1" />
              System Online
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Bot className="h-3 w-3 mr-1" />
              AI Models Active
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              <Shield className="h-3 w-3 mr-1" />
              Flask Backend Connected
            </Badge>
          </div>
        </div>

        {/* Quick System Health Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI-Generated Content</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15,234</div>
              <p className="text-xs text-muted-foreground">+24.1% from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Plans Active</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,923</div>
              <p className="text-xs text-muted-foreground">AI-adaptive plans</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Exam Readiness</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.5%</div>
              <p className="text-xs text-muted-foreground">+5.2% improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-8 lg:grid-cols-15 w-full mb-6 h-auto p-1">
            {tabsConfig.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id} 
                  className="flex flex-col items-center gap-1 p-2 h-auto"
                  title={tab.description}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs hidden lg:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="overview">
            <SystemOverviewTab />
          </TabsContent>

          <TabsContent value="student-journey">
            <StudentJourneyTab />
          </TabsContent>

          <TabsContent value="ai-models">
            <AIModelsTab />
          </TabsContent>

          <TabsContent value="ai-personalization">
            <AIPersonalizationTab />
          </TabsContent>

          <TabsContent value="content">
            <ContentManagementTab />
          </TabsContent>

          <TabsContent value="mood-analytics">
            <MoodAnalyticsTab />
          </TabsContent>

          <TabsContent value="learning-tools">
            <LearningToolsTab />
          </TabsContent>

          <TabsContent value="gamification">
            <GamificationTab />
          </TabsContent>

          <TabsContent value="communication">
            <CommunicationTab />
          </TabsContent>

          <TabsContent value="voice-assistant">
            <VoiceAssistantTab />
          </TabsContent>

          <TabsContent value="batch-management">
            <BatchManagementTab />
          </TabsContent>

          <TabsContent value="exam-readiness">
            <ExamReadinessTab />
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionTab />
          </TabsContent>

          <TabsContent value="analytics">
            <AdvancedAnalyticsTab />
          </TabsContent>

          <TabsContent value="system-config">
            <SystemConfigTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveAdminDashboard;
