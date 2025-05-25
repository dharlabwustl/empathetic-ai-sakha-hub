
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardStats from "./DashboardStats";
import ContentManagementTab from "./ContentManagementTab";
import UserManagementTab from "./tabs/UserManagementTab";
import SubscriptionManagementTab from "./tabs/SubscriptionManagementTab";
import { EnhancedDatabaseSchemaDownloader } from "./EnhancedDatabaseSchemaDownloader";
import { 
  Users, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Database,
  Settings,
  Bell,
  Shield,
  Bot,
  BookOpen,
  Heart,
  MapPin,
  Target,
  Brain,
  Headphones,
  Calendar,
  TrendingUp,
  School,
  Globe
} from "lucide-react";

interface DashboardStatsType {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  newUsersToday: number;
  dailyActiveUsers: { date: string; count: number }[];
  subscriptionsByPlan: { free: number; basic: number; premium: number };
  verifiedMoodImprovement: number;
  averageMoodScore: number;
  averageTimeSavedPerWeek: number;
  studyPlanEfficiencyImprovement: number;
  studentsWithVerifiedConsistentHabits: number;
  studentsWithConsistentHabits: number;
  totalStudents: number;
  verifiedRetentionRate: number;
  verifiedExamConfidenceImprovement: number;
  averageConfidenceScore: number;
  activeStudents: number;
  verifiedMoodFeatureUsage: number;
  moodBasedSessionsCount: number;
  totalSessions: number;
  completedSurveys: number;
}

interface AdminDashboardProps {
  stats?: DashboardStatsType;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ stats }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const defaultStats: DashboardStatsType = {
    totalUsers: 1250,
    activeUsers: 980,
    totalRevenue: 45680,
    newUsersToday: 23,
    dailyActiveUsers: [
      { date: "2024-01-01", count: 120 },
      { date: "2024-01-02", count: 150 },
      { date: "2024-01-03", count: 180 },
    ],
    subscriptionsByPlan: { free: 800, basic: 300, premium: 150 },
    verifiedMoodImprovement: 72,
    averageMoodScore: 7.8,
    averageTimeSavedPerWeek: 4.2,
    studyPlanEfficiencyImprovement: 58,
    studentsWithVerifiedConsistentHabits: 156,
    studentsWithConsistentHabits: 200,
    totalStudents: 1250,
    verifiedRetentionRate: 84,
    verifiedExamConfidenceImprovement: 68,
    averageConfidenceScore: 8.1,
    activeStudents: 980,
    verifiedMoodFeatureUsage: 65,
    moodBasedSessionsCount: 4200,
    totalSessions: 6500,
    completedSurveys: 890
  };

  const dashboardStats = stats || defaultStats;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Comprehensive platform management and analytics
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Content</span>
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span>Subscriptions</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span>Database</span>
          </TabsTrigger>
          <TabsTrigger value="modules" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Student Modules</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <DashboardStats stats={dashboardStats} />
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <UserManagementTab />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <ContentManagementTab />
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          <SubscriptionManagementTab />
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <EnhancedDatabaseSchemaDownloader />
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Student Dashboard Modules Management
              </CardTitle>
              <CardDescription>
                Manage and monitor all student dashboard modules from the admin interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Today's Plan", icon: Calendar, status: "active", description: "Daily study planning and progress tracking" },
                  { name: "Concepts", icon: BookOpen, status: "active", description: "Learning concepts and educational content" },
                  { name: "Flashcards", icon: Brain, status: "active", description: "Interactive flashcard learning system" },
                  { name: "Practice Exams", icon: Target, status: "active", description: "Practice tests and assessments" },
                  { name: "Mood Tracking", icon: Heart, status: "active", description: "Emotional state monitoring and analytics" },
                  { name: "Voice Assistant", icon: Headphones, status: "active", description: "AI-powered voice guidance system" },
                  { name: "Analytics", icon: TrendingUp, status: "active", description: "Personal performance analytics" },
                  { name: "Feel Good Corner", icon: Heart, status: "active", description: "Motivational content and wellness" },
                  { name: "Surrounding Influences", icon: MapPin, status: "active", description: "Environmental factor tracking" },
                  { name: "AI Tutor", icon: Bot, status: "active", description: "Personalized AI tutoring system" },
                  { name: "Exam Readiness", icon: School, status: "active", description: "Exam preparation assessment" },
                  { name: "Study Habits", icon: Calendar, status: "active", description: "Study routine and habit tracking" }
                ].map((module) => (
                  <Card key={module.name} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <module.icon className="h-5 w-5 text-blue-600" />
                        {module.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          module.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {module.status}
                        </span>
                        <button className="text-sm text-blue-600 hover:underline">
                          Manage
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
