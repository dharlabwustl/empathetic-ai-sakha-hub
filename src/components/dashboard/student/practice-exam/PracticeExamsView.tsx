
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, CheckCircle, Clock, FileText, Filter, Calendar, PlayCircle } from "lucide-react";
import BackButton from '@/components/dashboard/student/BackButton';

const exams = [
  {
    id: "1",
    title: "Physics Full Mock Test",
    subject: "Physics",
    examType: "NEET",
    questionsCount: 90,
    timeEstimate: 180,
    difficulty: "hard",
    completed: false,
    progress: 0,
    dueDate: "2023-06-15",
    lastAttempted: null,
    description: "Complete physics mock test covering mechanics, thermodynamics, optics, and modern physics.",
    topics: ["Mechanics", "Thermodynamics", "Optics", "Modern Physics"]
  },
  {
    id: "2",
    title: "Organic Chemistry Test",
    subject: "Chemistry",
    examType: "NEET",
    questionsCount: 45,
    timeEstimate: 90,
    difficulty: "medium",
    completed: true,
    progress: 100,
    score: 78,
    dueDate: "2023-06-10",
    lastAttempted: "2023-06-09",
    description: "Test covering organic chemistry reactions, mechanisms, and compounds.",
    topics: ["Hydrocarbons", "Alcohols", "Carbonyl Compounds"]
  },
  {
    id: "3",
    title: "Biology Unit Test",
    subject: "Biology",
    examType: "NEET",
    questionsCount: 60,
    timeEstimate: 120,
    difficulty: "medium",
    completed: false,
    progress: 30,
    dueDate: "2023-06-18",
    lastAttempted: "2023-06-08",
    description: "Comprehensive unit test covering human physiology and plant biology.",
    topics: ["Human Physiology", "Plant Biology", "Genetics"]
  },
  {
    id: "4",
    title: "Mathematics Advanced Test",
    subject: "Mathematics",
    examType: "JEE",
    questionsCount: 75,
    timeEstimate: 180,
    difficulty: "hard",
    completed: false,
    progress: 0,
    dueDate: "2023-06-20",
    lastAttempted: null,
    description: "Advanced mathematics test covering calculus, algebra, and coordinate geometry.",
    topics: ["Calculus", "Algebra", "Coordinate Geometry"]
  }
];

const PracticeExamsView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  const filterExams = (status: string) => {
    switch (status) {
      case "pending":
        return exams.filter(exam => !exam.completed && exam.progress === 0);
      case "in-progress":
        return exams.filter(exam => !exam.completed && exam.progress > 0 && exam.progress < 100);
      case "completed":
        return exams.filter(exam => exam.completed);
      default:
        return exams;
    }
  };
  
  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/exam/${examId}/start`);
  };
  
  const handleReviewExam = (examId: string) => {
    navigate(`/dashboard/student/exam/${examId}/results`);
  };
  
  const handleContinueExam = (examId: string) => {
    navigate(`/dashboard/student/exam/${examId}/start`);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container py-6">
      {/* Add Back Button */}
      <BackButton to="/dashboard/student" />
      
      <div className="flex justify-between items-center mt-4 mb-6">
        <h1 className="text-3xl font-bold">Practice Exams</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Schedule</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab as any} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full sm:w-auto">
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exams.map((exam) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterExams("pending").map((exam) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterExams("in-progress").map((exam) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterExams("completed").map((exam) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ExamCardProps {
  exam: typeof exams[0];
  onStart: (id: string) => void;
  onReview: (id: string) => void;
  onContinue: (id: string) => void;
  difficultyColorFn: (difficulty: string) => string;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onStart, onReview, onContinue, difficultyColorFn }) => {
  const isStarted = exam.progress > 0;
  const isCompleted = exam.completed;
  
  const getStatusBadge = () => {
    if (isCompleted) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
    }
    if (isStarted) {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
    }
    
    const dueDate = new Date(exam.dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue <= 1) {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Due Today</Badge>;
    }
    if (daysUntilDue <= 3) {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Due Soon</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Upcoming</Badge>;
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{exam.title}</CardTitle>
            <CardDescription className="mt-1">
              {exam.subject} • {exam.questionsCount} Questions
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            {exam.examType}
          </Badge>
          <Badge variant="outline" className={difficultyColorFn(exam.difficulty)}>
            {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-500 mt-2">{exam.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{exam.progress}%</span>
          </div>
          <Progress value={exam.progress} className="h-2" />
        </div>
        
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{exam.timeEstimate} min</span>
          {exam.lastAttempted && (
            <>
              <span className="mx-1">•</span>
              <span>Last attempt: {new Date(exam.lastAttempted).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {isCompleted ? (
          <Button 
            className="w-full" 
            onClick={() => onReview(exam.id)}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Review Exam
          </Button>
        ) : isStarted ? (
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            onClick={() => onContinue(exam.id)}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Continue Exam
          </Button>
        ) : (
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700" 
            onClick={() => onStart(exam.id)}
          >
            <PlayCircle className="mr-2 h-4 w-4" />
            Start Exam
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PracticeExamsView;
