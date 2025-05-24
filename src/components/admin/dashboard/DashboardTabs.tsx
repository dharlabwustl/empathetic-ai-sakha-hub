
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import components
import Overview from './Overview';
import UsersManagement from './UsersManagement';
import ContentManagementTab from './ContentManagementTab';
import SystemLogs from './SystemLogs';
import SubscriptionPlans from './SubscriptionPlans';
import Analytics from './Analytics';
import DatabaseManagement from './DatabaseManagement';
import Security from './Security';
import StudentProfilesTab from './StudentProfilesTab';
import AIModelsTab from './AIModelsTab';
import ExamManagementTab from './ExamManagementTab';
import FeatureManagementTab from './FeatureManagementTab';
import RevenueAnalyticsTab from './RevenueAnalyticsTab';
import APIManagementTab from './APIManagementTab';
import SystemSettingsTab from './SystemSettingsTab';
import MoodAnalyticsTab from './MoodAnalyticsTab';
import StudyPlanManagementTab from './StudyPlanManagementTab';
import NotificationManagementTab from './NotificationManagementTab';

const DashboardTabs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (newTab: string) => {
    setSearchParams({ tab: newTab });
  };

  // Mock system logs data
  const mockLogs = [
    { 
      id: '1', 
      event: 'User login successful', 
      timestamp: new Date().toISOString(),
      level: 'info' as const,
      message: 'User logged in successfully',
      details: { userId: 'user123', ip: '192.168.1.1' } 
    },
    { 
      id: '2', 
      event: 'Database connection failed', 
      timestamp: new Date().toISOString(),
      level: 'error' as const,
      message: 'Database connection failed',
      details: { database: 'users', error: 'Connection timeout' } 
    },
  ];

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={handleTabChange}
      className="w-full space-y-6"
    >
      <TabsContent value="overview" className="space-y-4 mt-4">
        <Overview />
      </TabsContent>
      
      <TabsContent value="analytics" className="space-y-4 mt-4">
        <Analytics />
      </TabsContent>
      
      <TabsContent value="users" className="space-y-4 mt-4">
        <UsersManagement />
      </TabsContent>

      <TabsContent value="student-profiles" className="space-y-4 mt-4">
        <StudentProfilesTab />
      </TabsContent>
      
      <TabsContent value="content" className="space-y-4 mt-4">
        <ContentManagementTab />
      </TabsContent>

      <TabsContent value="ai-models" className="space-y-4 mt-4">
        <AIModelsTab />
      </TabsContent>

      <TabsContent value="exams" className="space-y-4 mt-4">
        <ExamManagementTab />
      </TabsContent>
      
      <TabsContent value="subscriptions" className="space-y-4 mt-4">
        <SubscriptionPlans />
      </TabsContent>

      <TabsContent value="features" className="space-y-4 mt-4">
        <FeatureManagementTab />
      </TabsContent>

      <TabsContent value="revenue" className="space-y-4 mt-4">
        <RevenueAnalyticsTab />
      </TabsContent>

      <TabsContent value="mood-analytics" className="space-y-4 mt-4">
        <MoodAnalyticsTab />
      </TabsContent>

      <TabsContent value="study-plans" className="space-y-4 mt-4">
        <StudyPlanManagementTab />
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4 mt-4">
        <NotificationManagementTab />
      </TabsContent>
      
      <TabsContent value="database" className="space-y-4 mt-4">
        <DatabaseManagement />
      </TabsContent>

      <TabsContent value="api" className="space-y-4 mt-4">
        <APIManagementTab />
      </TabsContent>
      
      <TabsContent value="security" className="space-y-4 mt-4">
        <Security />
      </TabsContent>

      <TabsContent value="settings" className="space-y-4 mt-4">
        <SystemSettingsTab />
      </TabsContent>
      
      <TabsContent value="logs" className="space-y-4 mt-4">
        <SystemLogs logs={mockLogs} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
