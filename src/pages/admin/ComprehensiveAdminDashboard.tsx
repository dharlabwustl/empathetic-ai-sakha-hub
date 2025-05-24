
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Brain, 
  Settings, 
  BarChart3, 
  Database, 
  Shield, 
  Bell,
  Activity,
  CreditCard,
  Bot,
  FileText,
  Target,
  Zap,
  Globe,
  Headphones,
  UserCheck,
  TrendingUp,
  Calendar,
  MessageSquare,
  Gamepad2,
  Award,
  Clock,
  BookMarked,
  GraduationCap,
  Heart,
  Mic,
  Eye,
  Layers,
  Palette
} from 'lucide-react';

// Import all admin components
import SystemOverviewTab from '@/components/admin/dashboard/tabs/SystemOverviewTab';
import StudentJourneyManagementTab from '@/components/admin/dashboard/tabs/StudentJourneyManagementTab';
import AIModelsContentTab from '@/components/admin/dashboard/tabs/AIModelsContentTab';
import MoodAnalyticsTab from '@/components/admin/dashboard/tabs/MoodAnalyticsTab';
import LearningToolsAdminTab from '@/components/admin/dashboard/tabs/LearningToolsAdminTab';
import GamificationManagementTab from '@/components/admin/dashboard/tabs/GamificationManagementTab';
import CommunicationSupportTab from '@/components/admin/dashboard/tabs/CommunicationSupportTab';
import BatchManagementAdvancedTab from '@/components/admin/dashboard/tabs/BatchManagementAdvancedTab';
import ExamReadinessManagementTab from '@/components/admin/dashboard/tabs/ExamReadinessManagementTab';
import SubscriptionBusinessTab from '@/components/admin/dashboard/tabs/SubscriptionBusinessTab';
import AdvancedAnalyticsTab from '@/components/admin/dashboard/tabs/AdvancedAnalyticsTab';
import SystemConfigurationTab from '@/components/admin/dashboard/tabs/SystemConfigurationTab';

const ComprehensiveAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const adminModules = [
    {
      id: "overview",
      label: "System Overview",
      icon: LayoutDashboard,
      component: SystemOverviewTab,
      description: "Real-time platform health, AI model performance, and key metrics",
      category: "core"
    },
    {
      id: "student-journey",
      label: "Student Journey",
      icon: Target,
      component: StudentJourneyManagementTab,
      description: "Complete student pipeline from signup to exam readiness",
      category: "management"
    },
    {
      id: "ai-content",
      label: "AI & Content",
      icon: Brain,
      component: AIModelsContentTab,
      description: "AI models management and content generation oversight",
      category: "ai"
    },
    {
      id: "mood-analytics",
      label: "Mood Analytics",
      icon: Heart,
      component: MoodAnalyticsTab,
      description: "Mood-based study adaptations and surrounding influence analysis",
      category: "analytics"
    },
    {
      id: "learning-tools",
      label: "Learning Tools",
      icon: BookOpen,
      component: LearningToolsAdminTab,
      description: "Concept cards, flashcards, and interactive content management",
      category: "content"
    },
    {
      id: "gamification",
      label: "Gamification",
      icon: Gamepad2,
      component: GamificationManagementTab,
      description: "Feel Good Corner, achievements, and engagement systems",
      category: "engagement"
    },
    {
      id: "communication",
      label: "AI Support",
      icon: MessageSquare,
      component: CommunicationSupportTab,
      description: "AI Tutor, Voice Assistant, and communication management",
      category: "support"
    },
    {
      id: "batch-management",
      label: "Batch Groups",
      icon: UserCheck,
      component: BatchManagementAdvancedTab,
      description: "Advanced batch management and collaborative learning",
      category: "management"
    },
    {
      id: "exam-readiness",
      label: "Exam Readiness",
      icon: Award,
      component: ExamReadinessManagementTab,
      description: "Assessment creation, readiness scoring, and performance prediction",
      category: "assessment"
    },
    {
      id: "subscriptions",
      label: "Business",
      icon: CreditCard,
      component: SubscriptionBusinessTab,
      description: "Subscription management and business analytics",
      category: "business"
    },
    {
      id: "advanced-analytics",
      label: "Analytics",
      icon: BarChart3,
      component: AdvancedAnalyticsTab,
      description: "Advanced learning patterns and predictive intelligence",
      category: "analytics"
    },
    {
      id: "system-config",
      label: "Configuration",
      icon: Settings,
      component: SystemConfigurationTab,
      description: "Flask backend, APIs, and system configuration",
      category: "system"
    }
  ];

  const getCurrentComponent = () => {
    const currentModule = adminModules.find(module => module.id === activeTab);
    if (currentModule) {
      const Component = currentModule.component;
      return <Component />;
    }
    return <SystemOverviewTab />;
  };

  const getTabsByCategory = (category: string) => {
    return adminModules.filter(module => module.category === category);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                PREPZR Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                AI-Powered Educational Platform Management & Analytics
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="h-3 w-3 mr-1" />
                All Systems Online
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Bot className="h-3 w-3 mr-1" />
                12 AI Models Active
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Eye className="h-3 w-3 mr-1" />
                Student Dashboard: Protected
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-12 w-full h-auto p-1 bg-gray-100 dark:bg-gray-700">
              {adminModules.map((module) => {
                const Icon = module.icon;
                return (
                  <TabsTrigger
                    key={module.id}
                    value={module.id}
                    className="flex flex-col items-center p-3 text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600"
                  >
                    <Icon className="h-4 w-4 mb-1" />
                    <span className="hidden sm:inline text-center leading-tight">
                      {module.label}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Module Description */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Current Module:</strong>{" "}
            {adminModules.find(module => module.id === activeTab)?.description}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {getCurrentComponent()}
      </div>
    </div>
  );
};

export default ComprehensiveAdminDashboard;
