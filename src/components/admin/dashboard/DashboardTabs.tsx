
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  BarChart3, 
  Database, 
  Shield, 
  Bell,
  Activity,
  CreditCard
} from 'lucide-react';

// Import components (we'll create basic ones for now)
import Overview from './Overview';
import UsersManagement from './UsersManagement';
import ContentManagement from './ContentManagement';
import SystemLogs from './SystemLogs';
import SubscriptionPlans from './SubscriptionPlans';

const DashboardTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
      onValueChange={setActiveTab}
      className="w-full space-y-6"
    >
      <TabsList className="grid w-full grid-cols-8 lg:grid-cols-8">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Users</span>
        </TabsTrigger>
        <TabsTrigger value="content" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Content</span>
        </TabsTrigger>
        <TabsTrigger value="subscriptions" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Plans</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Analytics</span>
        </TabsTrigger>
        <TabsTrigger value="database" className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          <span className="hidden sm:inline">Database</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">Security</span>
        </TabsTrigger>
        <TabsTrigger value="logs" className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span className="hidden sm:inline">Logs</span>
        </TabsTrigger>
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
      
      <TabsContent value="analytics" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Analytics and reporting tools coming soon.</p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="database" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Database Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Database administration tools coming soon.</p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="security" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Security configuration and monitoring tools coming soon.</p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="logs" className="space-y-4 mt-4">
        <SystemLogs logs={mockLogs} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
