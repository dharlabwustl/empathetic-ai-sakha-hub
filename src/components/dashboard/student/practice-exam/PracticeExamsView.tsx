
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, CheckCircle, Clock, FileText, Filter, Calendar, Brain, TrendingUp, Target, Trophy } from "lucide-react";
import BackButton from '@/components/dashboard/student/BackButton';
import { motion } from 'framer-motion';

// Enhanced exam data with concept card page structure
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
    topics: ["Mechanics", "Thermodynamics", "Optics", "Modern Physics"],
    weightage: 9.1,
    priority: "high",
    aiSuggestion: "Focus on mechanics and thermodynamics first",
    expectedScore: 85,
    averageTime: 165
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
    topics: ["Hydrocarbons", "Alcohols", "Carbonyl Compounds"],
    weightage: 8.5,
    priority: "high",
    aiSuggestion: "Review reaction mechanisms",
    expectedScore: 80,
    averageTime: 85
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
    topics: ["Human Physiology", "Plant Biology", "Genetics"],
    weightage: 8.2,
    priority: "medium",
    aiSuggestion: "Complete genetics section first",
    expectedScore: 75,
    averageTime: 110
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
    topics: ["Calculus", "Algebra", "Coordinate Geometry"],
    weightage: 9.3,
    priority: "high",
    aiSuggestion: "Start with calculus fundamentals",
    expectedScore: 82,
    averageTime: 170
  }
];

// Daily AI suggestions for practice exams
const dailyAISuggestions = [
  {
    id: 1,
    title: "High-Priority Mock Tests",
    description: "Complete Physics and Mathematics tests to boost overall score",
    priority: "high",
    estimatedTime: "6 hours",
    subjects: ["Physics", "Mathematics"],
    examIds: ["1", "4"]
  },
  {
    id: 2,
    title: "Review Completed Exams",
    description: "Analyze mistakes in Organic Chemistry test and strengthen weak areas",
    priority: "medium",
    estimatedTime: "1 hour",
    subjects: ["Chemistry"],
    examIds: ["2"]
  }
];

// Subject performance analysis
const subjectPerformance = [
  { subject: 'Mathematics', weightage: 9.3, avgScore: 85, testsCompleted: 12, priority: 'high' },
  { subject: 'Physics', weightage: 9.1, avgScore: 82, testsCompleted: 10, priority: 'high' },
  { subject: 'Chemistry', weightage: 8.5, avgScore: 78, testsCompleted: 8, priority: 'medium' },
  { subject: 'Biology', weightage: 8.2, avgScore: 75, testsCompleted: 6, priority: 'medium' }
];

// Priority colors
const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
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
    <div className="container py-6 space-y-8">
      {/* Back Button */}
      <BackButton to="/dashboard/student" />
      
      {/* Header */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Smart Practice Exams</h1>
          <p className="text-gray-600 mt-2">AI-powered test preparation with performance analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1 border-gray-200 hover:border-indigo-300">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1 border-gray-200 hover:border-indigo-300">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Schedule</span>
          </Button>
        </div>
      </div>

      {/* Daily AI Suggestions Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Brain className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Daily AI Recommendations</h3>
            <p className="text-sm text-gray-600">Personalized exam strategy for optimal performance</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailyAISuggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-white rounded-lg p-4 border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                <Badge variant="outline" className={priorityColors[suggestion.priority as keyof typeof priorityColors]}>
                  {suggestion.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {suggestion.estimatedTime}
                </div>
                <Button variant="outline" className="text-xs px-2 py-1 h-6">
                  Start Tests
                </Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Subject Performance Analysis */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Subject Performance Analysis</h3>
            <p className="text-sm text-gray-600">Track your progress across different subjects</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjectPerformance.map((subject) => (
            <div key={subject.subject} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                  {subject.weightage}/10
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg Score</span>
                  <span className="font-medium">{subject.avgScore}%</span>
                </div>
                <Progress value={subject.avgScore} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{subject.testsCompleted} tests</span>
                  <Badge variant="outline" className={priorityColors[subject.priority as keyof typeof priorityColors]}>
                    {subject.priority}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Exam Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full sm:w-auto bg-white shadow-sm border border-gray-200">
          <TabsTrigger value="all" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">All Exams</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">Pending</TabsTrigger>
          <TabsTrigger value="in-progress" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">In Progress</TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam, index) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                index={index}
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterExams("pending").map((exam, index) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                index={index}
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterExams("in-progress").map((exam, index) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                index={index}
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterExams("completed").map((exam, index) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                index={index}
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
  index: number;
  onStart: (id: string) => void;
  onReview: (id: string) => void;
  onContinue: (id: string) => void;
  difficultyColorFn: (difficulty: string) => string;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, index, onStart, onReview, onContinue, difficultyColorFn }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="group"
    >
      <Card className="h-full flex flex-col bg-white hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-200">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                  {exam.examType}
                </Badge>
                <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs">
                  {exam.subject}
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {exam.title}
              </CardTitle>
              <CardDescription className="mt-1 text-sm text-gray-600">
                {exam.questionsCount} Questions • {exam.timeEstimate} min
              </CardDescription>
            </div>
            {getStatusBadge()}
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className={difficultyColorFn(exam.difficulty)}>
              {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
            </Badge>
            <Badge variant="outline" className={priorityColors[exam.priority as keyof typeof priorityColors]}>
              {exam.priority} priority
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow space-y-4">
          <p className="text-sm text-gray-600">{exam.description}</p>
          
          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{exam.progress}%</span>
            </div>
            <Progress value={exam.progress} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="text-sm font-bold text-blue-700">{exam.weightage}</div>
              <div className="text-xs text-blue-600">Weightage</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-2">
              <div className="text-sm font-bold text-orange-700">{exam.expectedScore}%</div>
              <div className="text-xs text-orange-600">Expected</div>
            </div>
            <div className="bg-green-50 rounded-lg p-2">
              <div className="text-sm font-bold text-green-700">{exam.averageTime}m</div>
              <div className="text-xs text-green-600">Avg Time</div>
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-100">
            <div className="flex items-center gap-2 mb-1">
              <Brain className="h-3 w-3 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700">AI Strategy</span>
            </div>
            <p className="text-xs text-gray-600">{exam.aiSuggestion}</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
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
        
        <CardFooter className="pt-2">
          {isCompleted ? (
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white" 
              onClick={() => onReview(exam.id)}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Review Results
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : isStarted ? (
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={() => onContinue(exam.id)}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Continue Exam
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
              onClick={() => onStart(exam.id)}
            >
              <FileText className="mr-2 h-4 w-4" />
              Start Exam
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PracticeExamsView;
