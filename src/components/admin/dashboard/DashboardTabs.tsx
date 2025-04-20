
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, BookOpen, Cog, CreditCard, FileBarChart, FileText, Layers, MessageSquare, PieChart, Users } from "lucide-react";
import UserManagementTab from './tabs/UserManagementTab';
import StudyHabitsTab from './tabs/StudyHabitsTab';
import EngagementTab from './tabs/EngagementTab';
import AIPersonalizationTab from './tabs/AIPersonalizationTab';
import ContentManagementTab from './tabs/ContentManagementTab';
import SystemAnalyticsTab from './tabs/SystemAnalyticsTab';
import SettingsTab from './tabs/SettingsTab';
import IssueResolutionTab from './tabs/IssueResolutionTab';
import NotificationsTab from './tabs/NotificationsTab';
import DocumentationTab from './tabs/DocumentationTab';
import SubscriptionTab from './tabs/SubscriptionTab';
import FeaturesTab from './tabs/FeaturesTab';
import { StudentData } from '@/types/admin/studentData';
import { SystemLog } from '@/types/admin/systemLog';
import { formatDateTime } from '@/utils/dateUtils';

interface DashboardTabsProps {
  students: StudentData[];
  systemLogs: SystemLog[];
  stats?: any; // Adding this prop to prevent errors with AdminDashboard.tsx
}

interface KPI {
  title: string;
  value: number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: number;
}

const getNewUsersCount = (students: StudentData[]): number => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Use registrationDate or joinedDate instead of createdAt
  return students.filter(student => {
    const registrationDate = student.registrationDate || student.joinedDate;
    return registrationDate && new Date(registrationDate) >= thirtyDaysAgo;
  }).length;
};

export default function DashboardTabs({ students, systemLogs }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <Tabs defaultValue="overview" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
      <div className="flex justify-between">
        <TabsList className="grid grid-cols-11 h-auto">
          <TabsTrigger value="overview" className="text-xs py-2">
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="text-xs py-2">
            Users
          </TabsTrigger>
          <TabsTrigger value="study-habits" className="text-xs py-2">
            Study Habits
          </TabsTrigger>
          <TabsTrigger value="engagement" className="text-xs py-2">
            Engagement
          </TabsTrigger>
          <TabsTrigger value="ai" className="text-xs py-2">
            AI
          </TabsTrigger>
          <TabsTrigger value="content" className="text-xs py-2">
            Content
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="text-xs py-2">
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="features" className="text-xs py-2">
            Features
          </TabsTrigger>
          <TabsTrigger value="system" className="text-xs py-2">
            System
          </TabsTrigger>
          <TabsTrigger value="issues" className="text-xs py-2">
            Issues
          </TabsTrigger>
          <TabsTrigger value="docs" className="text-xs py-2">
            Docs
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">
                {getNewUsersCount(students)} new users in the last 30 days
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/students">
                <Button variant="ghost" size="sm">View all users</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subscriptions
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65</div>
              <p className="text-xs text-muted-foreground">
                +12 from last month
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/admin/subscriptions">
                <Button variant="ghost" size="sm">View subscriptions</Button>
              </Link>
              <Link to="/admin/payment-gateway">
                <Button variant="outline" size="sm">Payment Gateway</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Study Time
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32h</div>
              <p className="text-xs text-muted-foreground">
                +7% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                AI Interactions
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">122</div>
              <p className="text-xs text-muted-foreground">
                +23% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Content Views
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">721</div>
              <p className="text-xs text-muted-foreground">
                +52 since last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                System Uptime
              </CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">
                No downtime in the last 30 days
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Recent system logs and user activity
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <ScrollArea className="h-[300px] w-full pr-6">
              <div className="space-y-2">
                {systemLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://avatar.vercel.sh/${log.source}.png`} />
                      <AvatarFallback>{log.source.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{log.source}</p>
                      <p className="text-sm text-muted-foreground">
                        {log.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(log.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="users" className="space-y-4">
        <UserManagementTab students={students} />
      </TabsContent>

      <TabsContent value="study-habits" className="space-y-4">
        <StudyHabitsTab />
      </TabsContent>

      <TabsContent value="engagement" className="space-y-4">
        <EngagementTab />
      </TabsContent>

      <TabsContent value="ai" className="space-y-4">
        <AIPersonalizationTab />
      </TabsContent>

      <TabsContent value="content" className="space-y-4">
        <ContentManagementTab />
      </TabsContent>

      <TabsContent value="subscriptions" className="space-y-4">
        <SubscriptionTab />
      </TabsContent>
      
      <TabsContent value="features" className="space-y-4">
        <FeaturesTab />
      </TabsContent>
      
      <TabsContent value="system" className="space-y-4">
        <SystemAnalyticsTab systemLogs={systemLogs} />
      </TabsContent>

      <TabsContent value="issues" className="space-y-4">
        <IssueResolutionTab systemLogs={systemLogs} />
      </TabsContent>
      
      <TabsContent value="docs" className="space-y-4">
        <DocumentationTab />
      </TabsContent>
    </Tabs>
  );
}
