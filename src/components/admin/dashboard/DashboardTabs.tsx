
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemLog } from '@/types/admin/systemLog';
import { AdminDashboardStats } from '@/types/admin';
import { StudentData } from "@/types/admin/studentData";

// Import components
import Overview from './Overview';
import UsersManagement from './UsersManagement';
import ContentManagement from './ContentManagement';
import SystemLogs from './SystemLogs';
import SubscriptionPlans from './SubscriptionPlans';
import FeatureManager from '../features/FeatureManager';
import DatabaseExplorer from '../database/DatabaseExplorer';
import ApiEndpoints from '../api/ApiEndpoints';

interface DashboardTabsProps {
  stats?: AdminDashboardStats | null;
  recentStudents?: StudentData[];
  recentLogs?: SystemLog[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ stats, recentStudents = [], recentLogs = [] }) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock system logs data if none provided
  const logsToDisplay = recentLogs.length > 0 ? recentLogs : [
    { 
      id: '1', 
      event: 'User login successful', 
      timestamp: new Date().toISOString(),
      level: 'info' as 'info',
      message: 'User logged in successfully',
      details: { userId: 'user123', ip: '192.168.1.1' } 
    },
    { 
      id: '2', 
      event: 'Database connection failed', 
      timestamp: new Date().toISOString(),
      level: 'error' as 'error',
      message: 'Database connection failed',
      details: { database: 'users', error: 'Connection timeout' } 
    },
    { 
      id: '3', 
      event: 'API rate limit exceeded', 
      timestamp: new Date().toISOString(),
      level: 'warning' as 'warning',
      message: 'API rate limit exceeded',
      details: { endpoint: '/api/users', requestCount: 120, limit: 100 } 
    },
  ];

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="database">Database</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 mt-4">
        <Overview />
      </TabsContent>
      
      <TabsContent value="users" className="space-y-4 mt-4">
        <UsersManagement />
      </TabsContent>
      
      <TabsContent value="content" className="space-y-4 mt-4">
        <ContentManagement />
      </TabsContent>
      
      <TabsContent value="subscriptions" className="space-y-4 mt-4">
        <SubscriptionPlans />
      </TabsContent>
      
      <TabsContent value="features" className="space-y-4 mt-4">
        <FeatureManager />
      </TabsContent>
      
      <TabsContent value="database" className="space-y-4 mt-4">
        <DatabaseExplorer />
      </TabsContent>
      
      <TabsContent value="api" className="space-y-4 mt-4">
        <ApiEndpoints />
      </TabsContent>
      
      <TabsContent value="logs" className="space-y-4 mt-4">
        <SystemLogs logs={logsToDisplay} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
