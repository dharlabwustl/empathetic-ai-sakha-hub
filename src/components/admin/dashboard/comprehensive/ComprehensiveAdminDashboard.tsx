
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, BookOpen, Brain, CreditCard, BarChart3, Settings,
  Zap, MessageSquare, Award, HelpCircle, Smartphone, Database
} from 'lucide-react';

// Import specialized components
import UserProfileManagement from './UserProfileManagement';
import ContentManagementSystem from './ContentManagementSystem';
import APIBackendIntegration from './APIBackendIntegration';
import AIModelManagement from './AIModelManagement';
import SubscriptionPaymentHandling from './SubscriptionPaymentHandling';
import InteractiveContentIntegration from './InteractiveContentIntegration';
import AnalyticsReporting from './AnalyticsReporting';
import AIFeaturesManagement from './AIFeaturesManagement';
import DocumentationDatabaseManagement from './DocumentationDatabaseManagement';
import ComprehensiveTesting from './ComprehensiveTesting';
import BusinessKPIOverview from './BusinessKPIOverview';
import BatchManagement from './BatchManagement';

const ComprehensiveAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const dashboardSections = [
    { id: 'overview', title: 'Business KPI Overview', icon: BarChart3, component: BusinessKPIOverview },
    { id: 'users', title: 'User Profile Management', icon: Users, component: UserProfileManagement },
    { id: 'content', title: 'Content Management System', icon: BookOpen, component: ContentManagementSystem },
    { id: 'api', title: 'API & Backend Integration', icon: Database, component: APIBackendIntegration },
    { id: 'ai', title: 'AI Model Management', icon: Brain, component: AIModelManagement },
    { id: 'subscriptions', title: 'Subscription & Payment', icon: CreditCard, component: SubscriptionPaymentHandling },
    { id: 'interactive', title: 'Interactive Content', icon: Zap, component: InteractiveContentIntegration },
    { id: 'analytics', title: 'Analytics & Reporting', icon: BarChart3, component: AnalyticsReporting },
    { id: 'ai-features', title: 'AI Features Management', icon: MessageSquare, component: AIFeaturesManagement },
    { id: 'docs', title: 'Documentation & Database', icon: Settings, component: DocumentationDatabaseManagement },
    { id: 'testing', title: 'Comprehensive Testing', icon: HelpCircle, component: ComprehensiveTesting },
    { id: 'batch', title: 'Batch Management', icon: Award, component: BatchManagement }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Comprehensive Admin Dashboard</h1>
          <p className="text-muted-foreground">Complete system management and oversight</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          All Systems Operational
        </Badge>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-4">
        <TabsList className="grid grid-cols-6 lg:grid-cols-12 gap-1">
          {dashboardSections.map((section) => (
            <TabsTrigger key={section.id} value={section.id} className="text-xs">
              <section.icon className="w-4 h-4 mr-1" />
              {section.title.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {dashboardSections.map((section) => (
          <TabsContent key={section.id} value={section.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="w-5 h-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <section.component />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ComprehensiveAdminDashboard;
