
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';
import { 
  Users, BookOpen, TrendingUp, Settings, BarChart3, Database, Shield, Bell,
  Brain, Calendar, Target, MessageSquare, Heart, Gamepad2, Mic, CreditCard,
  FileText, Globe, UserCheck, Zap, Activity, Coffee, Award, Headphones
} from 'lucide-react';

// Import all admin modules
import SystemOverview from './modules/SystemOverview';
import StudentManagement from './modules/StudentManagement';
import ContentManagement from './modules/ContentManagement';
import AIModelsManagement from './modules/AIModelsManagement';
import StudyPlanManagement from './modules/StudyPlanManagement';
import ExamManagement from './modules/ExamManagement';
import MoodAnalytics from './modules/MoodAnalytics';
import FeelGoodCorner from './modules/FeelGoodCorner';
import AITutorManagement from './modules/AITutorManagement';
import NotificationCenter from './modules/NotificationCenter';
import BatchManagement from './modules/BatchManagement';
import SubscriptionManagement from './modules/SubscriptionManagement';
import AnalyticsCenter from './modules/AnalyticsCenter';
import VoiceAssistant from './modules/VoiceAssistant';
import SurroundingInfluence from './modules/SurroundingInfluence';
import ExamReadiness from './modules/ExamReadiness';
import SystemLogs from './modules/SystemLogs';
import SecurityCenter from './modules/SecurityCenter';

const AdminDashboard: React.FC = () => {
  const { adminUser, adminLogout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = async () => {
    await adminLogout();
    window.location.href = '/admin/login';
  };

  const adminModules = [
    { id: "overview", label: "System Overview", icon: BarChart3, component: SystemOverview },
    { id: "students", label: "Student Management", icon: Users, component: StudentManagement },
    { id: "content", label: "Content Management", icon: BookOpen, component: ContentManagement },
    { id: "ai-models", label: "AI Models", icon: Brain, component: AIModelsManagement },
    { id: "study-plans", label: "Study Plans", icon: Calendar, component: StudyPlanManagement },
    { id: "exams", label: "Exam Management", icon: FileText, component: ExamManagement },
    { id: "mood", label: "Mood Analytics", icon: Heart, component: MoodAnalytics },
    { id: "feel-good", label: "Feel Good Corner", icon: Gamepad2, component: FeelGoodCorner },
    { id: "ai-tutor", label: "AI Tutor", icon: MessageSquare, component: AITutorManagement },
    { id: "notifications", label: "Notifications", icon: Bell, component: NotificationCenter },
    { id: "batches", label: "Batch Management", icon: UserCheck, component: BatchManagement },
    { id: "subscriptions", label: "Subscriptions", icon: CreditCard, component: SubscriptionManagement },
    { id: "analytics", label: "Analytics Center", icon: TrendingUp, component: AnalyticsCenter },
    { id: "voice", label: "Voice Assistant", icon: Headphones, component: VoiceAssistant },
    { id: "influence", label: "Surrounding Influence", icon: Globe, component: SurroundingInfluence },
    { id: "readiness", label: "Exam Readiness", icon: Award, component: ExamReadiness },
    { id: "logs", label: "System Logs", icon: Activity, component: SystemLogs },
    { id: "security", label: "Security", icon: Shield, component: SecurityCenter }
  ];

  const ActiveComponent = adminModules.find(module => module.id === activeTab)?.component || SystemOverview;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen overflow-y-auto">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">PREPZR Admin</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive Dashboard</p>
          </div>
          
          <nav className="mt-6">
            <div className="px-3 space-y-1">
              {adminModules.map((module) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveTab(module.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === module.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {module.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
            <div className="flex justify-between items-center px-6 py-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {adminModules.find(m => m.id === activeTab)?.label}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Welcome back, {adminUser?.name}
                </p>
              </div>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
