
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, Book, Calendar, MessageCircle, BookOpen, Lightbulb, Trophy, TrendingUp } from 'lucide-react';
import { SharedPageLayout } from '../SharedPageLayout';

const AcademicAdvisorSection = () => {
  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Get personalized guidance for your academic journey"
    >
      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid grid-cols-4 md:w-[400px]">
          <TabsTrigger value="insights" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Insights</span>
          </TabsTrigger>
          <TabsTrigger value="plan" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Plan</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-1">
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="ask" className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Ask</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-800/30 p-3 rounded-full">
                <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Your Learning Insights</h3>
                <p className="text-gray-600 dark:text-gray-400">Based on your recent activity and progress, here are some insights to help you improve.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                  Learning Style
                </CardTitle>
                <CardDescription>Visual-Spatial Learner</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You learn best with diagrams, charts, and spatial relationships.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0 text-indigo-600">View Recommendations</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-emerald-500" />
                  Progress Analysis
                </CardTitle>
                <CardDescription>Making steady progress</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your consistency in Physics has improved by 23% this week.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0 text-indigo-600">View Details</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-amber-500" />
                  Achievements
                </CardTitle>
                <CardDescription>Recent milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You've completed 5 practice tests with scores above 80%.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0 text-indigo-600">View All Achievements</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Learning Recommendations</CardTitle>
              <CardDescription>Personalized suggestions based on your progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium">Focus on Physics Mechanics</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Your performance shows room for improvement in Newton's Laws and Momentum concepts.
                  </p>
                  <Button variant="link" className="px-0 text-blue-600 mt-1">View Related Concepts</Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div>
                  <h4 className="font-medium">Schedule Regular Chemistry Practice</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Your retention improves with spaced repetition. Try 20-minute daily sessions.
                  </p>
                  <Button variant="link" className="px-0 text-purple-600 mt-1">Adjust Study Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan">
          <Card>
            <CardHeader>
              <CardTitle>Your Academic Plan</CardTitle>
              <CardDescription>Long-term study strategy and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Academic planning content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Resources</CardTitle>
              <CardDescription>Personalized learning materials for your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Resources content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ask">
          <Card>
            <CardHeader>
              <CardTitle>Ask Your Academic Advisor</CardTitle>
              <CardDescription>Get personalized answers to your academic questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Question and answer interface will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorSection;
