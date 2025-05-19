
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemLog } from '@/types/admin/systemLog';

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
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onTabChange }) => {
  // Mock system logs data
  const logs: SystemLog[] = [
    { 
      id: '1', 
      event: 'User login successful', 
      timestamp: new Date().toISOString(), 
      level: 'info', 
      details: { userId: 'user123', ip: '192.168.1.1' } 
    },
    { 
      id: '2', 
      event: 'Database connection failed', 
      timestamp: new Date().toISOString(), 
      level: 'error', 
      details: { database: 'users', error: 'Connection timeout' } 
    },
    { 
      id: '3', 
      event: 'API rate limit exceeded', 
      timestamp: new Date().toISOString(), 
      level: 'warning',
      details: { endpoint: '/api/users', requestCount: 120, limit: 100 } 
    },
  ];

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={onTabChange}
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
        <SystemLogs logs={logs} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
