
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Clock, AlertCircle, Check, BookOpen, Brain, Filter,
  Search, BarChart, Play, TrendingUp, Flag, ClipboardList
} from "lucide-react";
import { SharedPageLayout } from '../SharedPageLayout';
import { Input } from '@/components/ui/input';

// Mock data for practice exams
const practiceExams = [
  {
    id: "e1",
    title: "Algebra Level 1 Mini Test",
    subject: "Mathematics",
    topic: "Algebra",
    linkedConcept: "Linear Equations",
    questionCount: 20,
    priority: "high",
    duration: 30,
    status: "not-started",
    difficulty: "medium"
  },
  {
    id: "e2",
    title: "Physics Mechanics Quiz",
    subject: "Physics",
    topic: "Mechanics",
    linkedConcept: "Newton's Laws",
    questionCount: 15,
    priority: "medium",
    duration: 25,
    status: "completed",
    difficulty: "hard",
    score: 85
  },
  {
    id: "e3",
    title: "Organic Chemistry Test",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    linkedConcept: "Functional Groups",
    questionCount: 25,
    priority: "low",
    duration: 45,
    status: "in-progress",
    difficulty: "hard",
    completedQuestions: 10
  },
  {
    id: "e4",
    title: "Cell Biology Assessment",
    subject: "Biology",
    topic: "Cell Biology",
    linkedConcept: "Cell Division",
    questionCount: 18,
    priority: "high",
    duration: 30,
    status: "not-started",
    difficulty: "medium"
  },
  {
    id: "e5",
    title: "Calculus Practice Test",
    subject: "Mathematics",
    topic: "Calculus",
    linkedConcept: "Derivatives",
    questionCount: 15,
    priority: "medium",
    duration: 35,
    status: "completed",
    difficulty: "hard",
    score: 72
  },
  {
    id: "e6",
    title: "Chemistry Periodic Table Test",
    subject: "Chemistry",
    topic: "Periodic Table",
    linkedConcept: "Element Properties",
    questionCount: 20,
    priority: "medium",
    duration: 30,
    status: "not-started",
    difficulty: "easy"
  }
];

// Filter exams by time period
const filterExamsByTimePeriod = (period: string) => {
  switch (period) {
    case "today":
      return practiceExams.filter(exam => exam.priority === "high");
    case "week":
      return practiceExams.filter(exam => exam.priority === "high" || exam.priority === "medium");
    case "month":
      return practiceExams;
    default:
      return practiceExams;
  }
};

// Get status badge color and text
const getStatusInfo = (status: string) => {
  switch (status) {
    case "completed":
      return { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Check, text: "Completed" };
    case "in-progress":
      return { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Clock, text: "In Progress" };
    case "not-started":
      return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: FileText, text: "Not Started" };
    default:
      return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: FileText, text: "Unknown" };
  }
};

// Get difficulty badge color and text
const getDifficultyInfo = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return { color: "bg-green-100 text-green-800 border-green-200", text: "Easy" };
    case "medium":
      return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "Medium" };
    case "hard":
      return { color: "bg-red-100 text-red-800 border-red-200", text: "Hard" };
    default:
      return { color: "bg-gray-100 text-gray-800 border-gray-200", text: "Unknown" };
  }
};

// Get priority badge color and text
const getPriorityInfo = (priority: string) => {
  switch (priority) {
    case "high":
      return { color: "bg-red-100 text-red-800 border-red-200", text: "High Priority" };
    case "medium":
      return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "Medium Priority" };
    case "low":
      return { color: "bg-green-100 text-green-800 border-green-200", text: "Low Priority" };
    default:
      return { color: "bg-gray-100 text-gray-800 border-gray-200", text: "Unknown" };
  }
};

interface ExamCardProps {
  exam: typeof practiceExams[0];
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const statusInfo = getStatusInfo(exam.status);
  const difficultyInfo = getDifficultyInfo(exam.difficulty);
  const priorityInfo = getPriorityInfo(exam.priority);
  const StatusIcon = statusInfo.icon;

  return (
    <Card className="h-full flex flex-col transform hover:scale-[1.01] transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{exam.title}</CardTitle>
          <Badge variant="outline" className={priorityInfo.color}>
            {priorityInfo.text}
          </Badge>
        </div>
        <CardDescription className="flex flex-wrap gap-2 mt-1">
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            {exam.subject}
          </Badge>
          <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
            {exam.topic}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className={statusInfo.color}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusInfo.text}
          </Badge>
          <Badge variant="outline" className={difficultyInfo.color}>
            {difficultyInfo.text}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>Linked Concept: {exam.linkedConcept}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <ClipboardList className="h-4 w-4 mr-2" />
            <span>{exam.questionCount} Questions</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>Duration: {exam.duration} min</span>
          </div>
        </div>
        
        {exam.status === "completed" && (
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Score</span>
              <span className={exam.score! >= 80 ? "text-emerald-600 font-medium" : exam.score! >= 60 ? "text-yellow-600 font-medium" : "text-red-600 font-medium"}>
                {exam.score}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  exam.score! >= 80 ? "bg-emerald-500" : 
                  exam.score! >= 60 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${exam.score}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {exam.status === "in-progress" && (
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span>{exam.completedQuestions}/{exam.questionCount} Questions</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${(exam.completedQuestions! / exam.questionCount) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2">
          {exam.status === "completed" ? (
            <>
              <BarChart className="h-4 w-4" />
              View Results
            </>
          ) : exam.status === "in-progress" ? (
            <>
              <Play className="h-4 w-4" />
              Continue Test
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Start Test
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

const PracticeExamSection = () => {
  const [timePeriod, setTimePeriod] = useState("today");
  const filteredExams = filterExamsByTimePeriod(timePeriod);
  
  return (
    <SharedPageLayout
      title="Practice Tests — Sharpen Your Skills"
      subtitle="Test your knowledge and track your progress with personalized assessments"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search tests..." className="pl-9" />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Flag className="h-4 w-4" />
              <span className="hidden sm:inline">Flagged</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </Button>
          </div>
        </div>
      
        <Tabs defaultValue="today" value={timePeriod} onValueChange={setTimePeriod} className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="today" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                Today
              </TabsTrigger>
              <TabsTrigger value="week" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                This Week
              </TabsTrigger>
              <TabsTrigger value="month" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                This Month
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="today" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExams.map(exam => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="week" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExams.map(exam => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="month" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExams.map(exam => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-6">
          <Button variant="outline" className="flex items-center gap-1">
            <Search className="h-4 w-4 mr-1" />
            View All Practice Tests
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamSection;
