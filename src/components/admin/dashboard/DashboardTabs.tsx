
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, FileText, Users, Settings } from "lucide-react";
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
      <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <TabsTrigger value="personalization" className="flex items-center gap-2">
          <Brain size={14} />
          <span>AI Personalization</span>
        </TabsTrigger>
        <TabsTrigger value="content" className="flex items-center gap-2">
          <FileText size={14} />
          <span>Content & Insights</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users size={14} />
          <span>Students</span>
        </TabsTrigger>
        <TabsTrigger value="system" className="flex items-center gap-2">
          <Settings size={14} />
          <span>System & Logs</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="personalization">
        <PersonalizationTab />
      </TabsContent>
      
      <TabsContent value="content">
        <ContentTab stats={stats} />
      </TabsContent>
      
      <TabsContent value="users">
        <UsersTab stats={stats} recentStudents={recentStudents} />
      </TabsContent>
      
      <TabsContent value="system">
        <SystemTab recentLogs={recentLogs} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
