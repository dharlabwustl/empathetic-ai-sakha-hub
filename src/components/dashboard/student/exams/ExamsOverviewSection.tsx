import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BookOpen, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { SharedPageLayout } from '../SharedPageLayout';

const ExamsOverviewSection = () => {
  // Mock exam data
  const examsData = [
    {
      id: "pe1",
      title: "Physics Full Mock Test",
      subject: "Physics",
      questions: 50,
      duration: "2 hours",
      difficulty: "Hard",
      status: "Completed",
      score: 72,
      completedDate: "3 days ago",
    },
    {
      id: "pe2",
      title: "Chemistry Half Test",
      subject: "Chemistry",
      questions: 25,
      duration: "1 hour",
      difficulty: "Medium",
      status: "Not Started",
      score: null,
      completedDate: null,
    },
    {
      id: "pe3",
      title: "Mathematics Practice Quiz",
      subject: "Mathematics",
      questions: 30,
      duration: "1.5 hours",
      difficulty: "Medium",
      status: "In Progress",
      score: null,
      completedDate: "Started yesterday",
    }
  ];

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Test your knowledge with comprehensive practice exams"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <Button variant="outline">
            <BookOpen className="mr-2 h-4 w-4" />
            View All
          </Button>
          <Button variant="outline">
            <LineChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Exam
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="pending">Not Started</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {examsData.map(exam => (
            <Card key={exam.id}>
              <CardHeader>
                <div className="flex justify-between">
                  <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    {exam.subject}
                  </span>
                  <Badge variant={
                    exam.status === "Completed" ? "default" :
                    exam.status === "In Progress" ? "secondary" : "outline"
                  }>
                    {exam.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-2">{exam.title}</CardTitle>
                <CardDescription>
                  {exam.questions} questions · {exam.duration} · {exam.difficulty} difficulty
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {exam.status === "Completed" ? (
                    <>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Score</span>
                          <span>{exam.score}%</span>
                        </div>
                        <Progress
                          value={exam.score}
                          className="h-2"
                          indicatorClassName={
                            exam.score! >= 70 ? "bg-green-500" :
                            exam.score! >= 50 ? "bg-amber-500" : "bg-red-500"
                          }
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Completed {exam.completedDate}
                      </div>
                    </>
                  ) : exam.status === "In Progress" ? (
                    <div className="text-sm text-muted-foreground">
                      {exam.completedDate} · Continue where you left off
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Start this exam to test your knowledge
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {exam.status === "Completed" ? (
                  <Button variant="outline" className="w-full">Review Exam</Button>
                ) : (
                  <Button className="w-full">
                    {exam.status === "In Progress" ? "Continue Exam" : "Start Exam"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        {/* Other tabs content */}
        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {examsData.filter(exam => exam.status === "Not Started").map(exam => (
              <Card key={exam.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {exam.subject}
                    </span>
                    <Badge variant="outline">{exam.status}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{exam.title}</CardTitle>
                  <CardDescription>
                    {exam.questions} questions · {exam.duration} · {exam.difficulty} difficulty
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Start this exam to test your knowledge
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Exam</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {examsData.filter(exam => exam.status === "Completed").map(exam => (
              <Card key={exam.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {exam.subject}
                    </span>
                    <Badge>{exam.status}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{exam.title}</CardTitle>
                  <CardDescription>
                    {exam.questions} questions · {exam.duration} · {exam.difficulty} difficulty
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Score</span>
                        <span>{exam.score}%</span>
                      </div>
                      <Progress
                        value={exam.score}
                        className="h-2"
                        indicatorClassName={
                          exam.score! >= 70 ? "bg-green-500" :
                          exam.score! >= 50 ? "bg-amber-500" : "bg-red-500"
                        }
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completed {exam.completedDate}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Review Exam</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommended">
          <p className="text-center py-8 text-muted-foreground">Recommended exams based on your study progress will appear here.</p>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Weekly Test Challenge</CardTitle>
          <CardDescription>Take this week's challenge to boost your score</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This week's challenge focuses on important exam topics in Physics and Chemistry.</p>
        </CardContent>
        <CardFooter>
          <Button variant="default" className="w-full">Start Weekly Challenge</Button>
        </CardFooter>
      </Card>
    </SharedPageLayout>
  );
};

export default ExamsOverviewSection;
