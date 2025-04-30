
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileType } from "@/types/user";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { KpiData } from "@/hooks/useKpiTracking";

interface DashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

export function DashboardOverview({ userProfile, kpis }: DashboardOverviewProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Convert KPI change types
  const mapChangeType = (change: string | number, changeType: string) => {
    if (changeType === "positive") return "increase";
    if (changeType === "negative") return "decrease";
    return "neutral";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, {userProfile.name}!</h2>
          <p className="text-muted-foreground">Here's an overview of your progress</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Button onClick={() => navigate("/dashboard/student/today")}>
            Go to Today's Plan
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            unit={kpi.unit}
            change={kpi.change}
            changeType={mapChangeType(kpi.change, kpi.changeType)}
            icon={kpi.icon}
          />
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your student information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{getInitials(userProfile.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{userProfile.name}</p>
                <p className="text-sm text-muted-foreground">{userProfile.email}</p>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Account type:</span>
                <span className="font-medium">Student</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Login count:</span>
                <span className="font-medium">{userProfile.loginCount || 1}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/dashboard/student/academic')}>
              Academic Advisor
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/dashboard/student/tutor')}>
              Chat with AI Tutor
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/dashboard/student/practice-exam')}>
              Practice Tests
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/dashboard/student/concepts')}>
              Browse Concepts
            </Button>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest study sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-sm font-medium">Physics Quiz</p>
              <p className="text-xs text-muted-foreground">Completed yesterday</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="text-sm font-medium">Math Concepts</p>
              <p className="text-xs text-muted-foreground">Studied 2 days ago</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="text-sm font-medium">Chemistry Flashcards</p>
              <p className="text-xs text-muted-foreground">Reviewed 3 days ago</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center">
              <CardTitle>Study Progress</CardTitle>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="subjects">By Subject</TabsTrigger>
                <TabsTrigger value="time">Time Spent</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="overview" className="space-y-4">
            <div className="h-[250px] flex items-center justify-center border rounded">
              <p className="text-muted-foreground">Progress chart will be displayed here</p>
            </div>
          </TabsContent>
          <TabsContent value="subjects" className="space-y-4">
            <div className="h-[250px] flex items-center justify-center border rounded">
              <p className="text-muted-foreground">Subject breakdown will be displayed here</p>
            </div>
          </TabsContent>
          <TabsContent value="time" className="space-y-4">
            <div className="h-[250px] flex items-center justify-center border rounded">
              <p className="text-muted-foreground">Time tracking chart will be displayed here</p>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
}
