
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, Home, CheckCircle2, XCircle, HelpCircle,
  BarChart3, Check, ArrowLeft, ArrowRight, BookOpen
} from 'lucide-react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Reusing the Question interface and mockExams from ExamTakingPage
interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

interface ExamData {
  id: string;
  title: string;
  subject: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
}

// Mock data for the exam
const mockExams: Record<string, ExamData> = {
  "physics-mechanics": {
    id: "physics-mechanics",
    title: "Physics Mechanics Exam",
    subject: "Physics",
    description: "Test your knowledge of classical mechanics concepts",
    duration: 30,
    questions: [
      {
        id: "q1",
        text: "Which of Newton's laws states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force?",
        options: [
          "Newton's First Law",
          "Newton's Second Law",
          "Newton's Third Law",
          "Newton's Law of Gravitation"
        ],
        correctOptionIndex: 0
      },
      {
        id: "q2",
        text: "What is the formula for force?",
        options: [
          "F = mv",
          "F = ma",
          "F = m/a",
          "F = a/m"
        ],
        correctOptionIndex: 1
      },
      {
        id: "q3",
        text: "For every action, there is an equal and opposite reaction. This is:",
        options: [
          "Newton's First Law",
          "Newton's Second Law",
          "Newton's Third Law",
          "Law of Conservation of Energy"
        ],
        correctOptionIndex: 2
      },
      {
        id: "q4",
        text: "What is momentum?",
        options: [
          "The resistance of an object to changes in its motion",
          "The product of mass and velocity",
          "The rate of change of velocity",
          "The sum of all forces acting on an object"
        ],
        correctOptionIndex: 1
      },
      {
        id: "q5",
        text: "Which of the following is a unit of force?",
        options: [
          "Joule",
          "Watt",
          "Newton",
          "Pascal"
        ],
        correctOptionIndex: 2
      }
    ]
  },
  "chemistry-organic": {
    id: "chemistry-organic",
    title: "Organic Chemistry Quiz",
    subject: "Chemistry",
    description: "Test your knowledge of organic chemistry fundamentals",
    duration: 20,
    questions: [
      {
        id: "q1",
        text: "What are alkanes?",
        options: [
          "Hydrocarbons with double bonds",
          "Hydrocarbons with triple bonds",
          "Saturated hydrocarbons with single bonds",
          "Cyclic hydrocarbons with aromatic rings"
        ],
        correctOptionIndex: 2
      },
      {
        id: "q2",
        text: "What is a functional group in organic chemistry?",
        options: [
          "A specific group of atoms responsible for characteristic reactions",
          "The longest carbon chain in a molecule",
          "The central carbon atom in a molecule",
          "A group of compounds with similar properties"
        ],
        correctOptionIndex: 0
      },
      {
        id: "q3",
        text: "What is isomerism?",
        options: [
          "The property of having the same number of atoms",
          "Compounds with the same molecular formula but different structures",
          "The property of having the same physical properties",
          "Compounds with different molecular formulas"
        ],
        correctOptionIndex: 1
      }
    ]
  }
};

// Mock explanations for questions
const explanations: Record<string, Record<string, string>> = {
  "physics-mechanics": {
    "q1": "Newton's First Law states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force. This is also known as the law of inertia.",
    "q2": "The formula for force is F = ma, where F is force, m is mass, and a is acceleration. This is Newton's Second Law of Motion.",
    "q3": "Newton's Third Law states that for every action, there is an equal and opposite reaction.",
    "q4": "Momentum is defined as the product of an object's mass and velocity. The formula is p = mv.",
    "q5": "The unit of force in the International System of Units (SI) is the Newton (N)."
  },
  "chemistry-organic": {
    "q1": "Alkanes are saturated hydrocarbons that contain only carbon-carbon single bonds and carbon-hydrogen bonds. The general formula for alkanes is CnH2n+2.",
    "q2": "A functional group is a specific group of atoms within a molecule that is responsible for the characteristic chemical reactions of that molecule. Examples include hydroxyl (-OH), carbonyl (C=O), and carboxyl (-COOH) groups.",
    "q3": "Isomerism is the phenomenon where two or more compounds have the same molecular formula but different structural arrangements or configurations of atoms. Types include structural isomerism and stereoisomerism."
  }
};

export default function ExamReviewPage() {
  const { examId } = useParams<{ examId: string }>();
  const location = useLocation();
  
  // Get user answers and score from location state, or use defaults
  const userAnswers = location.state?.userAnswers || [];
  const score = location.state?.score || 0;
  const timeSpent = location.state?.timeSpent || 0;
  const incomplete = location.state?.incomplete || false;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("results");
  const [categoryPerformance, setCategoryPerformance] = useState<Record<string, { correct: number, total: number }>>({});
  
  const examData = examId && mockExams[examId] ? mockExams[examId] : null;
  
  // Calculate performance by category (mock data)
  useEffect(() => {
    if (examData && userAnswers.length > 0) {
      const categories: Record<string, { correct: number, total: number }> = {
        "Mechanics": { correct: 0, total: 0 },
        "Energy": { correct: 0, total: 0 },
        "Kinematics": { correct: 0, total: 0 }
      };
      
      // Assign questions to mock categories
      examData.questions.forEach((question, index) => {
        let category = "Mechanics";
        if (index % 3 === 1) category = "Energy";
        if (index % 3 === 2) category = "Kinematics";
        
        categories[category].total += 1;
        if (userAnswers[index] === question.correctOptionIndex) {
          categories[category].correct += 1;
        }
      });
      
      setCategoryPerformance(categories);
    }
  }, [examData, userAnswers]);
  
  if (!examData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold">Exam Not Found</h2>
          <p className="mt-2 text-gray-500">The exam you're looking for doesn't exist.</p>
          <Link to="/dashboard/student/practice-exam" className="mt-4 inline-block">
            <Button>Back to Practice Exams</Button>
          </Link>
        </Card>
      </div>
    );
  }
  
  const currentQuestion = examData.questions[currentQuestionIndex];
  const correctAnswers = userAnswers.reduce((count, answer, index) => {
    return count + (answer === examData.questions[index].correctOptionIndex ? 1 : 0);
  }, 0);
  
  const incorrectAnswers = userAnswers.reduce((count, answer, index) => {
    return count + (answer !== null && answer !== examData.questions[index].correctOptionIndex ? 1 : 0);
  }, 0);
  
  const unansweredCount = examData.questions.length - correctAnswers - incorrectAnswers;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const getPerformanceColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard/student/practice-exam" className="text-blue-600">
              <Home className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold">{examData.title} - Results</h1>
          </div>
          <p className="text-muted-foreground">{examData.subject}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3.5 w-3.5 mr-1" /> Time Taken: {formatTime(timeSpent)}
          </Badge>
          <Badge variant={!incomplete ? "default" : "outline"} className={
            !incomplete ? "bg-green-500" : "bg-amber-100 text-amber-800 border-amber-200"
          }>
            {!incomplete ? "Completed" : "In Progress"}
          </Badge>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="results">Results Summary</TabsTrigger>
          <TabsTrigger value="questions">Question Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance Details</TabsTrigger>
        </TabsList>
        
        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardTitle className="text-xl">Exam Results</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={score >= 80 ? "#4ade80" : score >= 60 ? "#fbbf24" : "#ef4444"}
                      strokeWidth="10"
                      strokeDasharray={`${score * 2.83} ${283 - score * 2.83}`}
                      strokeDashoffset={70.75}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold ${getPerformanceColor(score)}`}>
                      {score}%
                    </span>
                    <span className="text-sm text-gray-500">Score</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full">
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                    <CardContent className="p-4 text-center">
                      <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                      <h3 className="font-medium">Correct</h3>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {correctAnswers}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ({Math.round((correctAnswers / examData.questions.length) * 100)}%)
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900">
                    <CardContent className="p-4 text-center">
                      <XCircle className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
                      <h3 className="font-medium">Incorrect</h3>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {incorrectAnswers}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ({Math.round((incorrectAnswers / examData.questions.length) * 100)}%)
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-900">
                    <CardContent className="p-4 text-center">
                      <HelpCircle className="h-8 w-8 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                      <h3 className="font-medium">Unanswered</h3>
                      <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                        {unansweredCount}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ({Math.round((unansweredCount / examData.questions.length) * 100)}%)
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-8 w-full">
                  <h3 className="text-lg font-medium mb-4">Performance by Category</h3>
                  <div className="space-y-4">
                    {Object.entries(categoryPerformance).map(([category, data]) => (
                      <div key={category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{category}</span>
                          <span>
                            {data.correct}/{data.total} ({Math.round((data.correct / data.total) * 100)}%)
                          </span>
                        </div>
                        <Progress value={(data.correct / data.total) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => setActiveTab("questions")} 
              className="flex items-center"
            >
              <Check className="mr-2 h-4 w-4" />
              Review Questions
            </Button>
            <Link to={`/dashboard/student/practice-exam/${examId}/start`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                <Refresh className="mr-2 h-4 w-4" />
                Retake Exam
              </Button>
            </Link>
          </div>
        </TabsContent>
        
        {/* Questions Tab */}
        <TabsContent value="questions">
          <Card className="mb-4">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 py-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg mb-1">Question {currentQuestionIndex + 1} of {examData.questions.length}</CardTitle>
                <Badge variant="outline" className={
                  userAnswers[currentQuestionIndex] === examData.questions[currentQuestionIndex].correctOptionIndex
                    ? "bg-green-100 text-green-800 border-green-200"
                    : userAnswers[currentQuestionIndex] !== null
                    ? "bg-red-100 text-red-800 border-red-200"
                    : "bg-gray-100 text-gray-800 border-gray-200"
                }>
                  {userAnswers[currentQuestionIndex] === examData.questions[currentQuestionIndex].correctOptionIndex
                    ? "Correct"
                    : userAnswers[currentQuestionIndex] !== null
                    ? "Incorrect"
                    : "Unanswered"}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentQuestionIndex(prevIndex => Math.max(0, prevIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentQuestionIndex(prevIndex => Math.min(examData.questions.length - 1, prevIndex + 1))}
                  disabled={currentQuestionIndex === examData.questions.length - 1}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md border ${
                      userAnswers[currentQuestionIndex] === index && index === currentQuestion.correctOptionIndex
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900"
                        : userAnswers[currentQuestionIndex] === index
                        ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900"
                        : index === currentQuestion.correctOptionIndex
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="mr-3">
                        {userAnswers[currentQuestionIndex] === index && index === currentQuestion.correctOptionIndex ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : userAnswers[currentQuestionIndex] === index ? (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        ) : index === currentQuestion.correctOptionIndex ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border border-gray-300 dark:border-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{option}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-md p-4">
                <h4 className="flex items-center text-blue-800 dark:text-blue-300 font-medium mb-2">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explanation
                </h4>
                <p className="text-sm">
                  {explanations[examId!]?.[currentQuestion.id] || "No explanation available for this question."}
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Question navigation */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">All Questions</h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {examData.questions.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`w-full h-10 ${
                    index === currentQuestionIndex ? 'border-2 border-blue-500' : ''
                  } ${
                    userAnswers[index] === examData.questions[index].correctOptionIndex 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : userAnswers[index] !== null 
                      ? 'bg-red-100 dark:bg-red-900/30' 
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard/student/practice-exam">
              <Button variant="outline" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Back to Exams
              </Button>
            </Link>
            <Link to={`/dashboard/student/practice-exam/${examId}/start`}>
              <Button className="flex items-center">
                <Refresh className="mr-2 h-4 w-4" />
                Retake Exam
              </Button>
            </Link>
          </div>
        </TabsContent>
        
        {/* Performance Tab */}
        <TabsContent value="performance">
          <Card className="mb-6">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardTitle className="text-xl">Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Time Analysis */}
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Time Analysis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gray-50 dark:bg-gray-800/50">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-medium text-gray-500">Total Time</h4>
                        <p className="text-2xl font-bold">{formatTime(timeSpent)}</p>
                        <p className="text-xs text-muted-foreground">
                          Out of {examData.duration} min allowed
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-50 dark:bg-gray-800/50">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-medium text-gray-500">Avg. Time per Question</h4>
                        <p className="text-2xl font-bold">
                          {formatTime(Math.round(timeSpent / examData.questions.length))}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-50 dark:bg-gray-800/50">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-medium text-gray-500">Time Management</h4>
                        <p className="text-2xl font-bold">
                          {timeSpent < examData.duration * 60 * 0.8 ? "Good" : "Rushed"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Strength & Weaknesses */}
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    Strengths & Weaknesses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                      <CardContent className="p-4">
                        <h4 className="text-base font-medium text-green-700 dark:text-green-300 mb-2">Strengths</h4>
                        <ul className="space-y-2">
                          {correctAnswers > 0 ? (
                            <>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 dark:text-green-400 mt-0.5" />
                                <span>You performed well in {Object.keys(categoryPerformance).filter(
                                  cat => categoryPerformance[cat].correct / categoryPerformance[cat].total >= 0.7
                                ).join(", ") || "some categories"}</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 dark:text-green-400 mt-0.5" />
                                <span>You answered {correctAnswers} questions correctly</span>
                              </li>
                            </>
                          ) : (
                            <li className="text-sm text-muted-foreground">
                              Practice more to develop strengths in this subject.
                            </li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900">
                      <CardContent className="p-4">
                        <h4 className="text-base font-medium text-red-700 dark:text-red-300 mb-2">Areas to Improve</h4>
                        <ul className="space-y-2">
                          {incorrectAnswers > 0 ? (
                            <>
                              <li className="flex items-start">
                                <XCircle className="h-4 w-4 mr-2 text-red-600 dark:text-red-400 mt-0.5" />
                                <span>You need to work on {Object.keys(categoryPerformance).filter(
                                  cat => categoryPerformance[cat].correct / categoryPerformance[cat].total < 0.6
                                ).join(", ") || "some categories"}</span>
                              </li>
                              <li className="flex items-start">
                                <XCircle className="h-4 w-4 mr-2 text-red-600 dark:text-red-400 mt-0.5" />
                                <span>You answered {incorrectAnswers} questions incorrectly</span>
                              </li>
                            </>
                          ) : (
                            <li className="text-sm text-muted-foreground">
                              Great job! Keep practicing to maintain your performance.
                            </li>
                          )}
                          {unansweredCount > 0 && (
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 mr-2 text-red-600 dark:text-red-400 mt-0.5" />
                              <span>You left {unansweredCount} questions unanswered</span>
                            </li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Recommended Actions */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Recommended Actions</h3>
                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900">
                    <CardContent className="p-4">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-800/50 p-1 rounded-full mr-3">
                            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <p className="font-medium">Review Weak Areas</p>
                            <p className="text-sm text-muted-foreground">
                              Focus on the topics where you scored less than 60%
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-800/50 p-1 rounded-full mr-3">
                            <Check className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <p className="font-medium">Practice More Questions</p>
                            <p className="text-sm text-muted-foreground">
                              Try similar questions to reinforce your understanding
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-800/50 p-1 rounded-full mr-3">
                            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <p className="font-medium">Improve Time Management</p>
                            <p className="text-sm text-muted-foreground">
                              Practice answering questions within time limits
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => setActiveTab("questions")} 
              className="flex items-center"
            >
              <Check className="mr-2 h-4 w-4" />
              Review Questions
            </Button>
            <Link to={`/dashboard/student/practice-exam/${examId}/start`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                <Refresh className="mr-2 h-4 w-4" />
                Retake Exam
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
