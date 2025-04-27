
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Plus, Calendar, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AcademicAdvisorView = () => {
  const [activeTab, setActiveTab] = useState("advice");

  return (
    <SharedPageLayout title="Academic Advisor" subtitle="Personalized guidance for your academic journey">
      <div className="space-y-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="advice">Get Advice</TabsTrigger>
            <TabsTrigger value="progress">Progress Analysis</TabsTrigger>
            <TabsTrigger value="goals">Goals & Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="advice" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                    <GraduationCap size={32} className="text-violet-600 dark:text-violet-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Your Academic Success Partner</h2>
                  <p className="text-muted-foreground max-w-lg mb-6">
                    Get personalized guidance on course selection, study strategies, and career planning. Your academic advisor is here to help you reach your full potential.
                  </p>
                  <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                    <Plus size={16} />
                    Schedule Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick help topics */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Common Academic Questions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Calendar size={20} className="text-violet-500" />
                    <div>
                      <h4 className="font-medium">Study Schedule Optimization</h4>
                      <p className="text-sm text-muted-foreground">Find the perfect study routine that works for you</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-3">
                    <BookOpen size={20} className="text-violet-500" />
                    <div>
                      <h4 className="font-medium">Subject Selection Advice</h4>
                      <p className="text-sm text-muted-foreground">Which subjects align with your career goals</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Target size={20} className="text-violet-500" />
                    <div>
                      <h4 className="font-medium">Test Preparation Strategies</h4>
                      <p className="text-sm text-muted-foreground">Customized approach for exam success</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-3">
                    <GraduationCap size={20} className="text-violet-500" />
                    <div>
                      <h4 className="font-medium">Career Path Guidance</h4>
                      <p className="text-sm text-muted-foreground">Discover and plan your future opportunities</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Academic Progress Analysis</h2>
                <p className="text-muted-foreground mb-6">Connect with your advisor to get a detailed analysis of your current academic performance.</p>
                
                <div className="bg-violet-50 dark:bg-violet-900/10 p-4 rounded-lg border border-violet-100 dark:border-violet-800/20 mb-6">
                  <h3 className="font-medium mb-2 text-violet-800 dark:text-violet-300">Schedule a Progress Review Session</h3>
                  <p className="text-sm text-muted-foreground mb-4">Your advisor will analyze your current performance and provide personalized recommendations.</p>
                  <Button className="bg-violet-600 hover:bg-violet-700">Book Session</Button>
                </div>
                
                <p className="text-sm text-muted-foreground">Note: Progress analysis features will be fully available after your first consultation.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="mt-0">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Academic Goals & Planning</h2>
                <p className="text-muted-foreground mb-6">Set clear academic goals and create a roadmap to achieve them with guidance from your advisor.</p>
                
                <div className="bg-violet-50 dark:bg-violet-900/10 p-4 rounded-lg border border-violet-100 dark:border-violet-800/20 mb-6">
                  <h3 className="font-medium mb-2 text-violet-800 dark:text-violet-300">Create Your Academic Plan</h3>
                  <p className="text-sm text-muted-foreground mb-4">Work with your advisor to develop a customized academic plan aligned with your goals.</p>
                  <Button className="bg-violet-600 hover:bg-violet-700">Start Planning</Button>
                </div>
                
                <p className="text-sm text-muted-foreground">Goal setting and planning features will be enabled after your initial consultation.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
