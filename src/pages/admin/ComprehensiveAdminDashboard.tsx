import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Brain, 
  Settings, 
  BarChart3, 
  Bell,
  CreditCard,
  Target,
  UserCheck,
  Mic,
  Activity,
  Bot
} from 'lucide-react';

const ComprehensiveAdminDashboard = () => {
  const { adminUser, adminLogout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const tabsConfig = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "journey", label: "Journey", icon: Target },
    { id: "ai-models", label: "AI Models", icon: Brain },
    { id: "content", label: "Content", icon: BookOpen },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "batches", label: "Batches", icon: UserCheck },
    { id: "subscriptions", label: "Plans", icon: CreditCard },
    { id: "voice", label: "Voice AI", icon: Mic },
    { id: "notifications", label: "Alerts", icon: Bell },
    { id: "system", label: "System", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Comprehensive Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">AI-Powered Educational Platform Management</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Activity className="h-3 w-3 mr-1" />
              System Online
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Bot className="h-3 w-3 mr-1" />
              AI Models Active
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-11 w-full mb-6">
            {tabsConfig.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">AI-Generated Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15,234</div>
                  <p className="text-xs text-muted-foreground">+24.1% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Active AI Models</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">All operational</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Exam Readiness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87.5%</div>
                  <p className="text-xs text-muted-foreground">Average score</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs would contain their respective content */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Comprehensive user management interface coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add more tab contents as needed */}
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveAdminDashboard;
