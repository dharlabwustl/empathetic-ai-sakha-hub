
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import TopicsList from "./TopicsList";
import QuizzesList from "./QuizzesList";
import StudyTimeChart from "./StudyTimeChart";

const PerformanceTabs = () => {
  return (
    <Tabs defaultValue="topics" className="mt-6">
      <TabsList className="grid grid-cols-3 mb-4 w-full max-w-md">
        <TabsTrigger value="topics">Topics</TabsTrigger>
        <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        <TabsTrigger value="time">Study Time</TabsTrigger>
      </TabsList>

      <TabsContent value="topics">
        <TopicsList />
      </TabsContent>
      
      <TabsContent value="quizzes">
        <QuizzesList />
      </TabsContent>
      
      <TabsContent value="time">
        <StudyTimeChart />
      </TabsContent>
    </Tabs>
  );
};

export default PerformanceTabs;
