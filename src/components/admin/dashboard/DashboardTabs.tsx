
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart2, 
  Users, 
  Brain, 
  BookOpen, 
  MessageSquare, 
  CreditCard, 
  AlertCircle, 
  Bell,
  FileText,
  Settings
} from "lucide-react";
import { AdminDashboardStats, SystemLog } from "@/types/admin";
import { StudentData } from "@/types/admin/studentData";

import UserManagementTab from "./tabs/UserManagementTab";
import AIPersonalizationTab from "./tabs/AIPersonalizationTab";
import ContentManagementTab from "./tabs/ContentManagementTab";
import EngagementTab from "./tabs/EngagementTab";
import SubscriptionTab from "./tabs/SubscriptionTab";
import SystemAnalyticsTab from "./tabs/SystemAnalyticsTab";
import IssueResolutionTab from "./tabs/IssueResolutionTab";
import NotificationsTab from "./tabs/NotificationsTab";
import DocumentationTab from "./tabs/DocumentationTab";
import SettingsTab from "./tabs/SettingsTab";

interface DashboardTabsProps {
  stats: AdminDashboardStats | null;
  recentStudents: StudentData[];
  recentLogs: SystemLog[];
}

const DashboardTabs = ({ stats, recentStudents, recentLogs }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
          <BarChart2 size={16} className="text-blue-500" />
          <span>Overview</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
          <Users size={16} className="text-indigo-500" />
          <span>Users</span>
        </TabsTrigger>
        <TabsTrigger value="ai" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
          <Brain size={16} className="text-purple-500" />
          <span>AI</span>
        </TabsTrigger>
        <TabsTrigger value="content" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
          <BookOpen size={16} className="text-amber-500" />
          <span>Content</span>
        </TabsTrigger>
        <TabsTrigger value="engagement" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
          <MessageSquare size={16} className="text-green-500" />
          <span>Engagement</span>
        </TabsTrigger>
        <TabsTrigger value="subscriptions" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
          <CreditCard size={16} className="text-pink-500" />
          <span>Subscriptions</span>
        </TabsTrigger>
        <TabsTrigger value="system" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
          <Settings size={16} className="text-gray-500" />
          <span>System</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Student Engagement</h3>
            <p className="text-sm text-gray-500 mb-2">Time spent on platform over the last 30 days</p>
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Chart Placeholder</span>
            </div>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Emotional Trends</h3>
            <p className="text-sm text-gray-500 mb-2">Learner mood distribution</p>
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Chart Placeholder</span>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="users">
        <UserManagementTab recentStudents={recentStudents} />
      </TabsContent>
      
      <TabsContent value="ai">
        <AIPersonalizationTab />
      </TabsContent>
      
      <TabsContent value="content">
        <ContentManagementTab />
      </TabsContent>
      
      <TabsContent value="engagement">
        <EngagementTab />
      </TabsContent>
      
      <TabsContent value="subscriptions">
        <SubscriptionTab />
      </TabsContent>
      
      <TabsContent value="system">
        <SystemAnalyticsTab />
      </TabsContent>
      
      <TabsContent value="issues">
        <IssueResolutionTab recentLogs={recentLogs} />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationsTab />
      </TabsContent>
      
      <TabsContent value="documentation">
        <DocumentationTab />
      </TabsContent>
      
      <TabsContent value="settings">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
