import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import components
import Overview from './Overview';
import UsersManagement from './UsersManagement';
import ContentManagement from './ContentManagement';
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

// Import new tabs
import MoodAnalyticsTab from './tabs/MoodAnalyticsTab';
import StudyPlanManagementTab from './tabs/StudyPlanManagementTab';
import PersonalizationControlTab from './tabs/PersonalizationControlTab';
import CommunicationManagementTab from './tabs/CommunicationManagementTab';
import GamificationManagementTab from './tabs/GamificationManagementTab';

// Import the new comprehensive tabs
import BatchManagementTab from './BatchManagementTab';
import AIFeaturesManagementTab from './AIFeaturesManagementTab';
import EnhancedContentManagementTab from './EnhancedContentManagementTab';

// Import alignment tabs
import StudentDataSyncTab from './StudentDataSyncTab';
import FeatureAuditTab from './FeatureAuditTab';

// Import the fixed components
import InteractiveContentManagement from './InteractiveContentManagement';
import EnhancedSubscriptionPlans from './EnhancedSubscriptionPlans';
import AnalyticsReporting from './AnalyticsReporting';

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

      <TabsContent value="student-data-sync" className="space-y-4 mt-4">
        <StudentDataSyncTab />
      </TabsContent>

      <TabsContent value="feature-audit" className="space-y-4 mt-4">
        <FeatureAuditTab />
      </TabsContent>

      <TabsContent value="mood-analytics" className="space-y-4 mt-4">
        <MoodAnalyticsTab />
      </TabsContent>

      <TabsContent value="batch-management" className="space-y-4 mt-4">
        <BatchManagementTab />
      </TabsContent>
      
      <TabsContent value="content" className="space-y-4 mt-4">
        <ContentManagement />
      </TabsContent>

      <TabsContent value="enhanced-content" className="space-y-4 mt-4">
        <EnhancedContentManagementTab />
      </TabsContent>

      <TabsContent value="interactive-content" className="space-y-4 mt-4">
        <InteractiveContentManagement />
      </TabsContent>

      <TabsContent value="ai-models" className="space-y-4 mt-4">
        <AIModelsTab />
      </TabsContent>

      <TabsContent value="ai-features" className="space-y-4 mt-4">
        <AIFeaturesManagementTab />
      </TabsContent>

      <TabsContent value="exams" className="space-y-4 mt-4">
        <ExamManagementTab />
      </TabsContent>

      <TabsContent value="study-plan-management" className="space-y-4 mt-4">
        <StudyPlanManagementTab />
      </TabsContent>

      <TabsContent value="personalization-control" className="space-y-4 mt-4">
        <PersonalizationControlTab />
      </TabsContent>

      <TabsContent value="communication-management" className="space-y-4 mt-4">
        <CommunicationManagementTab />
      </TabsContent>

      <TabsContent value="gamification-management" className="space-y-4 mt-4">
        <GamificationManagementTab />
      </TabsContent>
      
      <TabsContent value="subscriptions" className="space-y-4 mt-4">
        <SubscriptionPlans />
      </TabsContent>

      <TabsContent value="enhanced-subscriptions" className="space-y-4 mt-4">
        <EnhancedSubscriptionPlans />
      </TabsContent>

      <TabsContent value="features" className="space-y-4 mt-4">
        <FeatureManagementTab />
      </TabsContent>

      <TabsContent value="revenue" className="space-y-4 mt-4">
        <RevenueAnalyticsTab />
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

      <TabsContent value="analytics-reporting" className="space-y-4 mt-4">
        <AnalyticsReporting />
      </TabsContent>

      {/* Placeholder tabs for remaining features */}
      <TabsContent value="support-management" className="space-y-4 mt-4">
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Support & Help System</h3>
          <p className="text-muted-foreground">Support ticket system, FAQ management, and user feedback collection coming soon.</p>
        </div>
      </TabsContent>

      <TabsContent value="advanced-analytics" className="space-y-4 mt-4">
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
          <p className="text-muted-foreground">A/B testing, cohort analysis, and retention analytics coming soon.</p>
        </div>
      </TabsContent>

      <TabsContent value="mobile-management" className="space-y-4 mt-4">
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Mobile App Management</h3>
          <p className="text-muted-foreground">Mobile version control and app store analytics coming soon.</p>
        </div>
      </TabsContent>

      <TabsContent value="integration-management" className="space-y-4 mt-4">
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Integration Management</h3>
          <p className="text-muted-foreground">Third-party service integrations and webhook management coming soon.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
