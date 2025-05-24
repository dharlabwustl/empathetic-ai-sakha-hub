
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, GraduationCap, Settings, BarChart3, Database, CreditCard, UserCheck, Brain, BookOpen, FileText, MessageSquare, UserPlus } from 'lucide-react';
import Overview from './Overview';
import UsersTab from './UsersTab';
import StudentProfilesTab from './StudentProfilesTab';
import SubscriptionPlans from './SubscriptionPlans';
import BatchManagementTab from './tabs/BatchManagementTab';
import AIModelsTab from './tabs/AIModelsTab';
import ContentManagementTab from './tabs/ContentManagementTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import SystemLogsTab from './tabs/SystemLogsTab';
import DatabaseTab from './tabs/DatabaseTab';
import NotificationsTab from './tabs/NotificationsTab';
import DocumentationTab from './tabs/DocumentationTab';
import { UserProfileBase } from '@/types/user/base';

const mockUsers: UserProfileBase[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    subscription: 'premium'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'student',
    subscription: 'basic'
  }
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Get active tab from URL params
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', value);
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your platform, users, and content from one central location
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 w-full h-auto p-1">
          <TabsTrigger value="overview" className="flex items-center gap-1 py-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-1 py-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-1 py-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Students</span>
          </TabsTrigger>
          <TabsTrigger value="batches" className="flex items-center gap-1 py-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Batches</span>
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-1 py-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Plans</span>
          </TabsTrigger>
          <TabsTrigger value="ai-models" className="flex items-center gap-1 py-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">AI Models</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-1 py-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1 py-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-1 py-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Logs</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-1 py-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Database</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1 py-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-1 py-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Docs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Overview />
        </TabsContent>

        <TabsContent value="users">
          <UsersTab users={mockUsers} />
        </TabsContent>

        <TabsContent value="students">
          <StudentProfilesTab />
        </TabsContent>

        <TabsContent value="batches">
          <BatchManagementTab />
        </TabsContent>

        <TabsContent value="subscription">
          <SubscriptionPlans />
        </TabsContent>

        <TabsContent value="ai-models">
          <AIModelsTab />
        </TabsContent>

        <TabsContent value="content">
          <ContentManagementTab />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>

        <TabsContent value="logs">
          <SystemLogsTab />
        </TabsContent>

        <TabsContent value="database">
          <DatabaseTab />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="docs">
          <DocumentationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
