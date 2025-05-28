
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, CheckCircle, Clock, FileText, Filter, Calendar, ChevronDown, ChevronUp, Target, TrendingUp, Brain } from "lucide-react";
import BackButton from '@/components/dashboard/student/BackButton';
import * as Collapsible from '@radix-ui/react-collapsible';

// Enhanced exam data with topic breakdowns and weightage
const enhancedExams = [
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
    weightage: 35,
    examImportance: "Very High",
    completionRate: 0,
    topics: [
      { name: "Mechanics", weightage: 12, completed: false, priority: "High", questions: 25 },
      { name: "Thermodynamics", weightage: 8, completed: false, priority: "Medium", questions: 18 },
      { name: "Optics", weightage: 10, completed: false, priority: "High", questions: 22 },
      { name: "Modern Physics", weightage: 5, completed: false, priority: "Medium", questions: 15 }
    ]
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
    weightage: 25,
    examImportance: "High",
    completionRate: 100,
    topics: [
      { name: "Hydrocarbons", weightage: 10, completed: true, priority: "High", questions: 18 },
      { name: "Alcohols", weightage: 8, completed: true, priority: "Medium", questions: 15 },
      { name: "Carbonyl Compounds", weightage: 7, completed: true, priority: "High", questions: 12 }
    ]
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
    weightage: 30,
    examImportance: "High",
    completionRate: 30,
    topics: [
      { name: "Human Physiology", weightage: 15, completed: true, priority: "High", questions: 25 },
      { name: "Plant Biology", weightage: 10, completed: false, priority: "Medium", questions: 20 },
      { name: "Genetics", weightage: 5, completed: false, priority: "High", questions: 15 }
    ]
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
    weightage: 40,
    examImportance: "Very High",
    completionRate: 0,
    topics: [
      { name: "Calculus", weightage: 18, completed: false, priority: "High", questions: 30 },
      { name: "Algebra", weightage: 12, completed: false, priority: "High", questions: 25 },
      { name: "Coordinate Geometry", weightage: 10, completed: false, priority: "Medium", questions: 20 }
    ]
  }
];

// Daily smart suggestions for practice exams
const dailySuggestions = [
  {
    id: 1,
    title: "Take Physics Mock Test",
    description: "High weightage exam due tomorrow - start preparation",
    priority: "High",
    estimatedTime: "180 min",
    subject: "Physics"
  },
  {
    id: 2,
    title: "Complete Biology Unit Test",
    description: "Resume from 30% progress - focus on remaining topics",
    priority: "Medium", 
    estimatedTime: "90 min",
    subject: "Biology"
  }
];

const PracticeExamsView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  
  const filterExams = (status: string) => {
    switch (status) {
      case "pending":
        return enhancedExams.filter(exam => !exam.completed && exam.progress === 0);
      case "in-progress":
        return enhancedExams.filter(exam => !exam.completed && exam.progress > 0 && exam.progress < 100);
      case "completed":
        return enhancedExams.filter(exam => exam.completed);
      default:
        return enhancedExams;
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

  const toggleCardExpansion = (examId: string) => {
    setExpandedCards(prev => 
      prev.includes(examId) 
        ? prev.filter(id => id !== examId)
        : [...prev, examId]
    );
  };

  // Calculate overall progress
  const overallProgress = Math.round(
    enhancedExams.reduce((sum, exam) => sum + exam.completionRate, 0) / enhancedExams.length
  );

  return (
    <div className="container py-6">
      <BackButton to="/dashboard/student" />
      
      {/* Header with Progress Overview */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mt-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Practice Exams</h1>
            <p className="text-gray-600 dark:text-gray-300">
              {enhancedExams.filter(e => e.completed).length} of {enhancedExams.length} exams completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">{overallProgress}%</div>
            <div className="text-sm text-gray-500">Overall Progress</div>
          </div>
        </div>
        <Progress value={overallProgress} className="h-3" />
      </div>

      {/* Daily Smart Suggestions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Daily Smart Suggestions
          </CardTitle>
          <CardDescription>AI-powered recommendations for optimal exam preparation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {dailySuggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={suggestion.priority === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                      {suggestion.priority}
                    </Badge>
                    <span className="text-sm font-medium">{suggestion.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{suggestion.description}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {suggestion.estimatedTime}
                    </span>
                    <span>{suggestion.subject}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">Start</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center mb-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {enhancedExams.map((exam) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
                isExpanded={expandedCards.includes(exam.id)}
                onToggleExpansion={() => toggleCardExpansion(exam.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filterExams("pending").map((exam) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
                isExpanded={expandedCards.includes(exam.id)}
                onToggleExpansion={() => toggleCardExpansion(exam.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filterExams("in-progress").map((exam) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
                isExpanded={expandedCards.includes(exam.id)}
                onToggleExpansion={() => toggleCardExpansion(exam.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filterExams("completed").map((exam) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam}
                onReview={handleReviewExam}
                onContinue={handleContinueExam}
                difficultyColorFn={getDifficultyColor}
                isExpanded={expandedCards.includes(exam.id)}
                onToggleExpansion={() => toggleCardExpansion(exam.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ExamCardProps {
  exam: typeof enhancedExams[0];
  onStart: (id: string) => void;
  onReview: (id: string) => void;
  onContinue: (id: string) => void;
  difficultyColorFn: (difficulty: string) => string;
  isExpanded: boolean;
  onToggleExpansion: () => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ 
  exam, 
  onStart, 
  onReview, 
  onContinue, 
  difficultyColorFn, 
  isExpanded, 
  onToggleExpansion 
}) => {
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
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: exam.examImportance === 'Very High' ? '#ef4444' : exam.examImportance === 'High' ? '#f59e0b' : '#22c55e' }}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{exam.title}</CardTitle>
            <CardDescription className="mt-1">
              {exam.subject} • {exam.questionsCount} Questions
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1">
            {getStatusBadge()}
            <Badge variant="outline" className={exam.examImportance === 'Very High' ? 'bg-red-100 text-red-800' : exam.examImportance === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}>
              {exam.examImportance}
            </Badge>
          </div>
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
          <Badge variant="outline" className="bg-indigo-100 text-indigo-800">
            {exam.weightage}% weightage
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

        {/* Collapsible Topic Breakdown */}
        <div className="mt-4">
          <Collapsible.Root open={isExpanded} onOpenChange={onToggleExpansion}>
            <Collapsible.Trigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-between p-2 h-8">
                <span className="text-sm font-medium">Topic Breakdown</span>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </Collapsible.Trigger>
            
            <Collapsible.Content className="space-y-2 mt-2">
              {exam.topics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${topic.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-sm">{topic.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm" className={topic.priority === 'High' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700'}>
                      {topic.priority}
                    </Badge>
                    <span className="text-xs text-gray-500">{topic.questions}Q</span>
                    <span className="text-xs text-gray-500">{topic.weightage}%</span>
                  </div>
                </div>
              ))}
            </Collapsible.Content>
          </Collapsible.Root>
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
            <FileText className="mr-2 h-4 w-4" />
            Start Exam
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PracticeExamsView;
