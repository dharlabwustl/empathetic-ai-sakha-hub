
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, LineChart, CheckSquare } from "lucide-react";
import { SharedPageLayout } from '../SharedPageLayout';
import DailyPlanBreakdown from "./DailyPlanBreakdown";
import TimeAllocationWidget from "./TimeAllocationWidget";
import BacklogTasksList from "./BacklogTasksList";
import QuickAccessPanel from "./QuickAccessPanel";

const NewTodaysPlanView: React.FC = () => {
  return (
    <SharedPageLayout 
      title="Today's Study Plan" 
      subtitle="Your personalized daily learning plan"
    >
      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            <span>Today</span>
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Weekly</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-6">
          <QuickAccessPanel />
          <DailyPlanBreakdown />
          <TimeAllocationWidget />
          <BacklogTasksList />
        </TabsContent>
        
        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Plan View</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your weekly study schedule will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your study progress analytics will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default NewTodaysPlanView;
