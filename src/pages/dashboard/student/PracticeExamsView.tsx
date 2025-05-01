
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock practice exam data
const upcomingExams = [
  {
    id: "exam-1",
    title: "Physics Mid-Term Mock",
    subject: "Physics",
    questions: 45,
    timeLimit: 90,
    difficulty: "medium",
    dueDate: "2023-10-15"
  },
  {
    id: "exam-2",
    title: "Chemistry Periodic Table Test",
    subject: "Chemistry",
    questions: 30,
    timeLimit: 60,
    difficulty: "easy",
    dueDate: "2023-10-18"
  },
  {
    id: "exam-3",
    title: "Advanced Calculus Full Test",
    subject: "Mathematics",
    questions: 50,
    timeLimit: 120,
    difficulty: "hard",
    dueDate: "2023-10-20"
  }
];

const completedExams = [
  {
    id: "exam-c1",
    title: "Basic Mechanics Test",
    subject: "Physics",
    score: 82,
    totalQuestions: 40,
    correctAnswers: 33,
    timeTaken: 65,
    completedOn: "2023-10-01"
  },
  {
    id: "exam-c2",
    title: "Organic Chemistry Quiz",
    subject: "Chemistry",
    score: 75,
    totalQuestions: 20,
    correctAnswers: 15,
    timeTaken: 28,
    completedOn: "2023-09-28"
  }
];

const PracticeExamsView = () => {
  return (
    <SharedPageLayout 
      title="Practice Exams" 
      subtitle="Test your knowledge and track your progress"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-8">
        {/* Overview stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mb-2">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-sm text-muted-foreground">Total Exams Available</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-2">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold">5</h3>
              <p className="text-sm text-muted-foreground">Exams Completed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3 mb-2">
                <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold">78%</h3>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Exams tabs */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
            <TabsTrigger value="completed">Completed Exams</TabsTrigger>
            <TabsTrigger value="all">All Exams</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingExams.map((exam) => (
                <Card key={exam.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>{exam.title}</CardTitle>
                      <Badge variant={
                        exam.difficulty === "easy" ? "outline" : 
                        exam.difficulty === "medium" ? "secondary" : "destructive"
                      }>
                        {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200">
                          {exam.subject}
                        </Badge>
                        <span className="text-muted-foreground">Due: {new Date(exam.dueDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{exam.questions} questions</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{exam.timeLimit} minutes</span>
                        </div>
                      </div>
                      
                      <Button asChild className="w-full">
                        <Link to={`/dashboard/student/practice-exam/${exam.id}/start`}>
                          Start Exam <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedExams.map((exam) => (
                <Card key={exam.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>{exam.title}</CardTitle>
                      <Badge variant={
                        exam.score >= 80 ? "success" : 
                        exam.score >= 60 ? "secondary" : "destructive"
                      } className={
                        exam.score >= 80 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : 
                        exam.score >= 60 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }>
                        {exam.score}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200">
                          {exam.subject}
                        </Badge>
                        <span className="text-muted-foreground">Completed: {new Date(exam.completedOn).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm">
                          <span>Score</span>
                          <span className="font-medium">{exam.correctAnswers}/{exam.totalQuestions} questions</span>
                        </div>
                        <Progress value={exam.score} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Time Taken: {exam.timeTaken} min</span>
                      </div>
                      
                      <Button variant="outline" asChild className="w-full">
                        <Link to={`/dashboard/student/practice-exam/${exam.id}/review`}>
                          Review Exam
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingExams.slice(0, 2).map((exam) => (
                <Card key={exam.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>{exam.title}</CardTitle>
                      <Badge variant={
                        exam.difficulty === "easy" ? "outline" : 
                        exam.difficulty === "medium" ? "secondary" : "destructive"
                      }>
                        {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200">
                          {exam.subject}
                        </Badge>
                        <span className="text-muted-foreground">Due: {new Date(exam.dueDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{exam.questions} questions</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{exam.timeLimit} minutes</span>
                        </div>
                      </div>
                      
                      <Button asChild className="w-full">
                        <Link to={`/dashboard/student/practice-exam/${exam.id}/start`}>
                          Start Exam
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {completedExams.map((exam) => (
                <Card key={exam.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>{exam.title}</CardTitle>
                      <Badge variant={
                        exam.score >= 80 ? "success" : 
                        exam.score >= 60 ? "secondary" : "destructive"
                      } className={
                        exam.score >= 80 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : 
                        exam.score >= 60 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }>
                        Completed • {exam.score}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200">
                          {exam.subject}
                        </Badge>
                        <span className="text-muted-foreground">Completed: {new Date(exam.completedOn).toLocaleDateString()}</span>
                      </div>
                      
                      <Button variant="outline" asChild className="w-full">
                        <Link to={`/dashboard/student/practice-exam/${exam.id}/review`}>
                          Review Exam
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamsView;
