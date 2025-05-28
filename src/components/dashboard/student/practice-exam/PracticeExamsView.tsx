
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, CheckCircle, Clock, FileText, Filter, Calendar, PlayCircle, Timer, Target, Star } from "lucide-react";
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
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };
  
  const handleReviewExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };
  
  const handleContinueExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
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

  // Subject-wise exam data
  const subjectExams = {
    Physics: [
      {
        id: "phy1",
        title: "Mechanics Mock Test",
        questionsCount: 30,
        timeEstimate: 60,
        difficulty: "medium",
        completed: false,
        progress: 0,
        examType: "Topic Test",
        weightage: "25%"
      },
      {
        id: "phy2", 
        title: "Thermodynamics Test",
        questionsCount: 25,
        timeEstimate: 45,
        difficulty: "hard",
        completed: true,
        progress: 100,
        score: 78,
        examType: "Chapter Test",
        weightage: "15%"
      }
    ],
    Chemistry: [
      {
        id: "chem1",
        title: "Organic Chemistry",
        questionsCount: 35,
        timeEstimate: 70,
        difficulty: "hard",
        completed: false,
        progress: 60,
        examType: "Full Test",
        weightage: "30%"
      },
      {
        id: "chem2",
        title: "Chemical Bonding",
        questionsCount: 20,
        timeEstimate: 40,
        difficulty: "medium",
        completed: true,
        progress: 100,
        score: 85,
        examType: "Topic Test",
        weightage: "20%"
      }
    ],
    Biology: [
      {
        id: "bio1",
        title: "Cell Biology",
        questionsCount: 28,
        timeEstimate: 50,
        difficulty: "easy",
        completed: true,
        progress: 100,
        score: 92,
        examType: "Chapter Test",
        weightage: "18%"
      },
      {
        id: "bio2",
        title: "Genetics & Evolution",
        questionsCount: 32,
        timeEstimate: 60,
        difficulty: "hard",
        completed: false,
        progress: 30,
        examType: "Topic Test",
        weightage: "22%"
      }
    ]
  };

  return (
    <div className="container py-6">
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
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="biology">Biology</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        
        <TabsContent value="physics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjectExams.Physics.map((exam) => (
              <SubjectExamCard 
                key={exam.id} 
                exam={exam} 
                subject="Physics"
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="chemistry" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjectExams.Chemistry.map((exam) => (
              <SubjectExamCard 
                key={exam.id} 
                exam={exam} 
                subject="Chemistry"
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="biology" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjectExams.Biology.map((exam) => (
              <SubjectExamCard 
                key={exam.id} 
                exam={exam} 
                subject="Biology"
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
    <Card className="aspect-square flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-sm font-semibold line-clamp-2">{exam.title}</CardTitle>
            <CardDescription className="mt-1 text-xs">
              {exam.subject} • {exam.questionsCount} Questions
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="flex-grow text-xs space-y-2">
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 text-xs px-2 py-0.5">
            {exam.examType}
          </Badge>
          <Badge variant="outline" className={`${difficultyColorFn(exam.difficulty)} text-xs px-2 py-0.5`}>
            {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 flex items-center gap-1">
            <Timer className="h-3 w-3" />
            {exam.timeEstimate}m
          </Badge>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{exam.progress}%</span>
          </div>
          <Progress value={exam.progress} className="h-1.5" />
        </div>
        
        {exam.lastAttempted && (
          <div className="text-xs text-gray-500">
            Last: {new Date(exam.lastAttempted).toLocaleDateString()}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3">
        {isCompleted ? (
          <Button 
            className="w-full text-xs" 
            size="sm"
            onClick={() => onReview(exam.id)}
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            Review
          </Button>
        ) : isStarted ? (
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-xs" 
            size="sm"
            onClick={() => onContinue(exam.id)}
          >
            <BookOpen className="mr-1 h-3 w-3" />
            Continue
          </Button>
        ) : (
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-xs" 
            size="sm"
            onClick={() => onStart(exam.id)}
          >
            <PlayCircle className="mr-1 h-3 w-3" />
            Start
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

interface SubjectExamCardProps {
  exam: any;
  subject: string;
  onStart: (id: string) => void;
  onReview: (id: string) => void;
  onContinue: (id: string) => void;
  difficultyColorFn: (difficulty: string) => string;
}

const SubjectExamCard: React.FC<SubjectExamCardProps> = ({ exam, subject, onStart, onReview, onContinue, difficultyColorFn }) => {
  const isStarted = exam.progress > 0;
  const isCompleted = exam.completed;

  const subjectColors = {
    'Physics': 'border-l-blue-500 bg-gradient-to-br from-blue-50 to-blue-100',
    'Chemistry': 'border-l-purple-500 bg-gradient-to-br from-purple-50 to-purple-100', 
    'Biology': 'border-l-green-500 bg-gradient-to-br from-green-50 to-green-100'
  };

  return (
    <Card className={`aspect-square flex flex-col border-l-4 ${subjectColors[subject as keyof typeof subjectColors]}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-sm font-semibold line-clamp-2">{exam.title}</CardTitle>
            <CardDescription className="mt-1 text-xs">
              {exam.questionsCount} Questions
            </CardDescription>
          </div>
          {exam.score && (
            <Star className="h-4 w-4 text-yellow-500" />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow text-xs space-y-2">
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs px-2 py-0.5">
            {exam.examType}
          </Badge>
          <Badge variant="outline" className={`${difficultyColorFn(exam.difficulty)} text-xs px-2 py-0.5`}>
            {exam.difficulty}
          </Badge>
        </div>

        <div className="flex gap-1">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 text-xs px-2 py-0.5 flex items-center gap-1">
            <Timer className="h-3 w-3" />
            {exam.timeEstimate}m
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 text-xs px-2 py-0.5 flex items-center gap-1">
            <Target className="h-3 w-3" />
            {exam.weightage}
          </Badge>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{exam.progress}%</span>
          </div>
          <Progress value={exam.progress} className="h-1.5" />
        </div>

        {exam.score && (
          <div className="text-xs font-medium text-green-600">
            Score: {exam.score}%
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3">
        {isCompleted ? (
          <Button 
            className="w-full text-xs" 
            size="sm"
            onClick={() => onReview(exam.id)}
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            Review Exam
          </Button>
        ) : isStarted ? (
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-xs" 
            size="sm"
            onClick={() => onContinue(exam.id)}
          >
            <BookOpen className="mr-1 h-3 w-3" />
            Continue
          </Button>
        ) : (
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-xs" 
            size="sm"
            onClick={() => onStart(exam.id)}
          >
            <PlayCircle className="mr-1 h-3 w-3" />
            Start Exam
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PracticeExamsView;
