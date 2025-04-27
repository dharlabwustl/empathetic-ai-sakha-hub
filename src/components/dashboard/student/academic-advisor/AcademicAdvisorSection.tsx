
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calendar, Target, Book } from "lucide-react";
import { SharedPageLayout } from '../SharedPageLayout';

const AcademicAdvisorSection: React.FC = () => {
  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Your personalized academic guidance and study planning"
    >
      <Tabs defaultValue="studyPlans" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="studyPlans" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Study Plans</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Goals</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>Courses</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="studyPlans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Study Plans</CardTitle>
              <CardDescription>
                Create and manage personalized study plans for your exams
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                No active study plans available.
              </p>
              <Button>Create New Study Plan</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Goals</CardTitle>
              <CardDescription>
                Set and track your academic goals and targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your academic goals will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>
                View your enrolled courses and track progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your enrolled courses will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Analytics</CardTitle>
              <CardDescription>
                Detailed insights into your academic performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your academic analytics will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorSection;
