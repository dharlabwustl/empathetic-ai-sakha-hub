
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, FileText, Users, Settings, Tag, BarChart2, Activity, Calendar } from "lucide-react";
import { AdminDashboardStats, StudentData, SystemLog } from "@/types/admin";

import PersonalizationTab from "./PersonalizationTab";
import ContentTab from "./ContentTab";
import UsersTab from "./UsersTab";
import SystemTab from "./SystemTab";

interface DashboardTabsProps {
  stats: AdminDashboardStats | null;
  recentStudents: StudentData[];
  recentLogs: SystemLog[];
}

const DashboardTabs = ({ stats, recentStudents, recentLogs }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="personalization" className="space-y-6">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <TabsTrigger value="personalization" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
          <Brain size={16} className="text-purple-500" />
          <span>AI Personalization</span>
        </TabsTrigger>
        <TabsTrigger value="content" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
          <FileText size={16} className="text-indigo-500" />
          <span>Content & Insights</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
          <Users size={16} className="text-sky-500" />
          <span>Students</span>
        </TabsTrigger>
        <TabsTrigger value="system" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
          <Settings size={16} className="text-amber-500" />
          <span>System & Logs</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="personalization" className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Brain size={20} className="text-purple-500" />
            <h2 className="text-xl font-semibold">AI Personalization Engine</h2>
          </div>
          <div className="flex items-center gap-1 text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-md">
            <Activity size={14} />
            <span>AI Status: Active</span>
          </div>
        </div>
        <PersonalizationTab />
      </TabsContent>
      
      <TabsContent value="content" className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-indigo-500" />
            <h2 className="text-xl font-semibold">Content Management</h2>
          </div>
          <div className="flex items-center gap-1 text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-md">
            <Tag size={14} />
            <span>Items: {stats?.totalQuestions || 0}</span>
          </div>
        </div>
        <ContentTab stats={stats} />
      </TabsContent>
      
      <TabsContent value="users" className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-sky-500" />
            <h2 className="text-xl font-semibold">Student Management</h2>
          </div>
          <div className="flex items-center gap-1 text-xs bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 px-2 py-1 rounded-md">
            <BarChart2 size={14} />
            <span>Active: {stats?.activeStudents || 0}/{stats?.totalStudents || 0}</span>
          </div>
        </div>
        <UsersTab stats={stats} recentStudents={recentStudents} />
      </TabsContent>
      
      <TabsContent value="system" className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Settings size={20} className="text-amber-500" />
            <h2 className="text-xl font-semibold">System Configuration</h2>
          </div>
          <div className="flex items-center gap-1 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-md">
            <Calendar size={14} />
            <span>Last Update: Today</span>
          </div>
        </div>
        <SystemTab recentLogs={recentLogs} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
