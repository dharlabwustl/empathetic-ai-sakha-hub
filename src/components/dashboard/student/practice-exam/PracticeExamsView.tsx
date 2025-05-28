
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, CheckCircle, Clock, FileText, Filter, Calendar, PlayCircle, Target, TrendingUp } from "lucide-react";
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

// Subject-specific exam cards
const subjectExams = {
  physics: [
    { id: "p1", title: "Mechanics Mastery", questions: 50, time: 90, difficulty: "medium", weightage: "25%" },
    { id: "p2", title: "Thermodynamics Deep Dive", questions: 40, time: 75, difficulty: "hard", weightage: "20%" },
    { id: "p3", title: "Optics & Waves", questions: 45, time: 80, difficulty: "medium", weightage: "22%" },
    { id: "p4", title: "Modern Physics", questions: 35, time: 60, difficulty: "hard", weightage: "18%" }
  ],
  chemistry: [
    { id: "c1", title: "Organic Chemistry", questions: 55, time: 100, difficulty: "hard", weightage: "30%" },
    { id: "c2", title: "Inorganic Chemistry", questions: 45, time: 85, difficulty: "medium", weightage: "25%" },
    { id: "c3", title: "Physical Chemistry", questions: 50, time: 90, difficulty: "hard", weightage: "28%" },
    { id: "c4", title: "Chemical Bonding", questions: 30, time: 55, difficulty: "easy", weightage: "17%" }
  ],
  biology: [
    { id: "b1", title: "Human Physiology", questions: 60, time: 95, difficulty: "medium", weightage: "35%" },
    { id: "b2", title: "Plant Biology", questions: 45, time: 75, difficulty: "medium", weightage: "25%" },
    { id: "b3", title: "Genetics & Evolution", questions: 40, time: 70, difficulty: "hard", weightage: "22%" },
    { id: "b4", title: "Ecology", questions: 35, time: 60, difficulty: "easy", weightage: "18%" }
  ]
};

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
        <TabsList className="grid grid-cols-7 w-full sm:w-auto">
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="biology">Biology</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Subject-specific tabs with exam cards */}
        <TabsContent value="physics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjectExams.physics.map((exam) => (
              <SubjectExamCard 
                key={exam.id} 
                exam={exam} 
                subject="Physics"
                onStart={handleStartExam}
                difficultyColorFn={getDifficultyColor}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chemistry" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjectExams.chemistry.map((exam) => (
              <SubjectExamCard 
                key={exam.id} 
                exam={exam} 
                subject="Chemistry"
                onStart={handleStartExam}
                difficultyColorFn={getDifficultyColor}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="biology" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjectExams.biology.map((exam) => (
              <SubjectExamCard 
                key={exam.id} 
                exam={exam} 
                subject="Biology"
                onStart={handleStartExam}
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
    <Card className="h-80 w-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-base line-clamp-2">{exam.title}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription className="text-sm">
          {exam.subject} • {exam.questionsCount} Questions
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
            {exam.examType}
          </Badge>
          <Badge variant="outline" className={`${difficultyColorFn(exam.difficulty)} text-xs`}>
            {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
          </Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {exam.timeEstimate}m
          </Badge>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{exam.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{exam.progress}%</span>
          </div>
          <Progress value={exam.progress} className="h-2" />
        </div>
        
        {exam.lastAttempted && (
          <div className="text-xs text-gray-500 mt-2">
            Last attempt: {new Date(exam.lastAttempted).toLocaleDateString()}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {isCompleted ? (
          <Button 
            className="w-full text-sm" 
            onClick={() => onReview(exam.id)}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Review Exam
          </Button>
        ) : isStarted ? (
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-sm" 
            onClick={() => onContinue(exam.id)}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Continue Exam
          </Button>
        ) : (
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm" 
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

interface SubjectExamCardProps {
  exam: any;
  subject: string;
  onStart: (id: string) => void;
  difficultyColorFn: (difficulty: string) => string;
}

const SubjectExamCard: React.FC<SubjectExamCardProps> = ({ exam, subject, onStart, difficultyColorFn }) => {
  return (
    <Card className="h-80 w-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-base line-clamp-2">{exam.title}</CardTitle>
          <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs">
            {subject}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className={`${difficultyColorFn(exam.difficulty)} text-xs`}>
            {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
          </Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {exam.time}m
          </Badge>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {exam.weightage}
          </Badge>
        </div>
        
        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Questions</span>
            <span className="font-semibold">{exam.questions}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Time Limit</span>
            <span className="font-semibold">{exam.time} min</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Exam Weightage</span>
            <span className="font-semibold text-purple-600">{exam.weightage}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm" 
          onClick={() => onStart(exam.id)}
        >
          <PlayCircle className="mr-2 h-4 w-4" />
          Start Test
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PracticeExamsView;
