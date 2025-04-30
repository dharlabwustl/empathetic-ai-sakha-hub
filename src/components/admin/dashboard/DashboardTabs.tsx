
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { UserProfileBase } from '@/types/user/base';
import { SystemLog } from '@/types/admin/systemLog';
import UsersTab from './UsersTab';
import AnalyticsTab from './AnalyticsTab';
import ContentTab from './ContentTab';
import SystemTab from './SystemTab';

interface DashboardTabsProps {
  users: UserProfileBase[];
  logs: SystemLog[];
  analyticsData?: any; // Replace with proper type
  contentData?: any; // Replace with proper type
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  users, 
  logs,
  analyticsData = {}, 
  contentData = {} 
}) => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="system">System</TabsTrigger>
      </TabsList>
      
      <TabsContent value="users" className="mt-0">
        <UsersTab users={users} />
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-0">
        <AnalyticsTab data={analyticsData} />
      </TabsContent>
      
      <TabsContent value="content" className="mt-0">
        <ContentTab data={contentData} />
      </TabsContent>
      
      <TabsContent value="system" className="mt-0">
        <SystemTab logs={logs} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
