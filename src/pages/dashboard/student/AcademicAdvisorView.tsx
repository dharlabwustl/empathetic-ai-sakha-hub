
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BarChart, Calendar, GraduationCap, BookOpen, CheckCircle, Clock, ArrowRight, Lightbulb } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AcademicAdvisorView = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <SharedPageLayout 
      title="Academic Advisor"
      subtitle="Get personalized guidance for your academic journey"
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Advisor Card */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/advisor-avatar.jpg" alt="Academic Advisor" />
                  <AvatarFallback className="bg-blue-100 text-blue-800">AA</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-xl">Your Academic Advisor</h3>
                  <p className="text-muted-foreground">Personalized guidance for your educational journey</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200">
                <p className="italic text-muted-foreground">
                  "Based on your recent progress, I recommend focusing on Physics concepts this week. 
                  Your upcoming exams will require a solid understanding of mechanics principles."
                </p>
                <div className="mt-3 flex justify-end">
                  <Button size="sm">
                    Get Detailed Advice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Study Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  Study Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Physics</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Chemistry</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Mathematics</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" size="sm" className="ml-auto p-0">
                  View Detailed Progress
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <div>
                      <p className="text-sm font-medium">Physics Mid-term</p>
                      <p className="text-xs text-muted-foreground">In 5 days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="text-sm font-medium">Chemistry Assignment</p>
                      <p className="text-xs text-muted-foreground">Due tomorrow</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-sm font-medium">Math Study Group</p>
                      <p className="text-xs text-muted-foreground">Thursday, 4PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" size="sm" className="ml-auto p-0">
                  View Calendar
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Top Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p className="text-xs">Complete the Physics practice exam for better preparation</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p className="text-xs">Review your flashcards on Organic Chemistry reactions</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p className="text-xs">Schedule a tutoring session for calculus integration methods</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" size="sm" className="ml-auto p-0">
                  See All Recommendations
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Study Performance */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Study Performance</CardTitle>
                <Badge variant="outline">Last 30 Days</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-64 flex items-center justify-center">
                <BarChart className="h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground ml-2">Performance analytics graph would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Academic Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Excel in JEE Advanced</h3>
                      <p className="text-sm text-muted-foreground">Aim for a top 1000 rank</p>
                    </div>
                    <Badge>Primary Goal</Badge>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall preparation</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Target date: May 2024</span>
                    </div>
                    <Button size="sm">Update Progress</Button>
                  </div>
                </div>
                
                {/* More goals would be listed here */}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <GraduationCap className="mr-2 h-4 w-4" />
                Add New Goal
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Complete Physics Mock Test</h4>
                    <p className="text-xs text-muted-foreground">Achieved on October 15, 2023</p>
                  </div>
                  <Badge className="ml-auto">Completed</Badge>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Master Organic Chemistry</h4>
                    <p className="text-xs text-muted-foreground">Due by November 30, 2023</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">In Progress</Badge>
                </div>
                
                {/* More milestones would be listed here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Subject progress would be shown here */}
                <div className="space-y-4">
                  <h3 className="font-medium">Physics</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mechanics</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2 bg-green-200" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Electromagnetism</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2 bg-yellow-200" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Thermodynamics</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2 bg-red-200" />
                    </div>
                  </div>
                </div>
                
                {/* More subjects would be shown here */}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Studied Physics Concepts</h4>
                      <p className="text-xs text-muted-foreground">45 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Completed Chemistry Quiz</h4>
                      <p className="text-xs text-muted-foreground">Yesterday at 4:30 PM</p>
                    </div>
                  </div>
                  
                  {/* More activities would be listed here */}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Study Streaks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">Current Streak</h4>
                    <p className="text-3xl font-bold">7 days</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-right">Longest Streak</h4>
                    <p className="text-3xl font-bold text-right">12 days</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map(day => (
                    <div key={day} className="h-8 bg-green-100 rounded flex items-center justify-center text-green-700">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Study Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-700">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Focus on Physics Mechanics</h4>
                      <p className="text-sm text-muted-foreground">Your weakest area based on recent assessments</p>
                    </div>
                    <Button size="sm" className="ml-auto">Study Now</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Review Organic Chemistry Flashcards</h4>
                      <p className="text-sm text-muted-foreground">Scheduled review based on spaced repetition</p>
                    </div>
                    <Button size="sm" className="ml-auto">Review</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Take a Practice Test</h4>
                      <p className="text-sm text-muted-foreground">Recommended to assess your overall preparation</p>
                    </div>
                    <Button size="sm" className="ml-auto">Start Test</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Study Schedule Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Based on your learning patterns, here's an optimized schedule for maximum retention:
                </p>
                
                <div className="border rounded-lg divide-y">
                  <div className="flex justify-between items-center p-3">
                    <div>
                      <h4 className="font-medium">Morning (6 AM - 10 AM)</h4>
                      <p className="text-xs text-muted-foreground">Focus on new concepts and hard subjects</p>
                    </div>
                    <Badge>High Focus Time</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3">
                    <div>
                      <h4 className="font-medium">Afternoon (2 PM - 4 PM)</h4>
                      <p className="text-xs text-muted-foreground">Review and practice problems</p>
                    </div>
                    <Badge variant="outline">Moderate Focus</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3">
                    <div>
                      <h4 className="font-medium">Evening (7 PM - 9 PM)</h4>
                      <p className="text-xs text-muted-foreground">Flashcard review and light reading</p>
                    </div>
                    <Badge variant="outline">Moderate Focus</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Generate Detailed Schedule
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
