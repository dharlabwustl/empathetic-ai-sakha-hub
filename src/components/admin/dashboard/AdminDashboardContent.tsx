
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Bell,
  TrendingUp,
  Database,
  FileText,
  CreditCard
} from 'lucide-react';
import UserManagementTab from './tabs/UserManagementTab';
import ContentManagementTab from './ContentManagementTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import SettingsTab from './tabs/SettingsTab';
import NotificationsTab from './tabs/NotificationsTab';
import SubscriptionTab from './tabs/SubscriptionTab';
import EnhancedKpiDashboard from '@/components/dashboard/EnhancedKpiDashboard';
import DashboardStats from './DashboardStats';
import { adminService } from '@/services/adminService';
import { AdminDashboardStats } from '@/types/admin';

const AdminDashboardContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardStats, setDashboardStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const stats = await adminService.getDashboardStats();
        setDashboardStats(stats);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <BarChart3 className="h-4 w-4" />,
      component: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Admin Dashboard Overview</h2>
              <p className="text-muted-foreground">Comprehensive platform insights and metrics</p>
            </div>
            <Button onClick={() => window.location.reload()}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          {/* Enhanced KPI Dashboard */}
          <EnhancedKpiDashboard />
          
          {/* Original Dashboard Stats */}
          {dashboardStats && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Detailed Statistics</h3>
              <DashboardStats stats={dashboardStats} />
            </div>
          )}
        </div>
      )
    },
    {
      id: 'users',
      label: 'Users',
      icon: <Users className="h-4 w-4" />,
      component: <UserManagementTab />
    },
    {
      id: 'content',
      label: 'Content',
      icon: <BookOpen className="h-4 w-4" />,
      component: <ContentManagementTab />
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="h-4 w-4" />,
      component: <AnalyticsTab />
    },
    {
      id: 'subscription',
      label: 'Subscription',
      icon: <CreditCard className="h-4 w-4" />,
      component: <SubscriptionTab />
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="h-4 w-4" />,
      component: <NotificationsTab />
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      component: <SettingsTab />
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-24 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          {tabs.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminDashboardContent;
