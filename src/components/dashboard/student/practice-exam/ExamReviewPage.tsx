
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Clock, CheckSquare, Calendar, ArrowRight } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from '@/components/ui/section-header';

// Mock exams (same as ExamTakingPage)
const mockExams = {
  "physics-101": {
    id: "physics-101",
    title: "Physics Basics Assessment",
    subject: "Physics",
    totalQuestions: 10,
    timeLimit: 30, // minutes
    questions: [
      {
        id: "q1",
        text: "What is Newton's second law of motion?",
        options: [
          "An object at rest stays at rest unless acted upon by an external force.",
          "Force equals mass times acceleration (F=ma).",
          "For every action, there is an equal and opposite reaction.",
          "Objects with mass attract each other with a force proportional to their masses."
        ],
        correctAnswer: 1
      },
      {
        id: "q2",
        text: "Which of the following is a unit of force?",
        options: [
          "Watt",
          "Joule",
          "Newton",
          "Pascal"
        ],
        correctAnswer: 2
      },
      {
        id: "q3",
        text: "What is the formula for calculating kinetic energy?",
        options: [
          "KE = mgh",
          "KE = 1/2mv²",
          "KE = F×d",
          "KE = P×V"
        ],
        correctAnswer: 1
      },
      // More questions would be added here...
      {
        id: "q4",
        text: "Which law of thermodynamics states that energy cannot be created or destroyed?",
        options: [
          "Zeroth law",
          "First law",
          "Second law",
          "Third law"
        ],
        correctAnswer: 1
      },
      {
        id: "q5",
        text: "What is the SI unit of electric current?",
        options: [
          "Volt",
          "Watt",
          "Ampere",
          "Ohm"
        ],
        correctAnswer: 2
      }
    ],
    difficulty: "medium"
  },
  "chemistry-fundamentals": {
    id: "chemistry-fundamentals",
    title: "Chemistry Fundamentals",
    subject: "Chemistry",
    totalQuestions: 8,
    timeLimit: 25, // minutes
    questions: [
      {
        id: "q1",
        text: "What is the chemical symbol for gold?",
        options: [
          "Go",
          "Au",
          "Ag",
          "Gd"
        ],
        correctAnswer: 1
      },
      {
        id: "q2",
        text: "Which is NOT a state of matter?",
        options: [
          "Solid",
          "Liquid",
          "Gas",
          "Energy"
        ],
        correctAnswer: 3
      },
      {
        id: "q3",
        text: "What is the pH of a neutral solution?",
        options: [
          "0",
          "7",
          "10",
          "14"
        ],
        correctAnswer: 1
      },
      // More questions would be added here...
      {
        id: "q4",
        text: "What is the main component of natural gas?",
        options: [
          "Ethane",
          "Propane",
          "Methane",
          "Butane"
        ],
        correctAnswer: 2
      },
      {
        id: "q5",
        text: "Which element has the atomic number 1?",
        options: [
          "Oxygen",
          "Carbon",
          "Hydrogen",
          "Helium"
        ],
        correctAnswer: 2
      }
    ],
    difficulty: "easy"
  }
};

// Mock historical data for performance trends
const mockHistoricalPerformance = {
  "physics-101": [
    { date: "2025-04-20", score: 65 },
    { date: "2025-04-15", score: 60 },
    { date: "2025-04-10", score: 55 },
    { date: "2025-04-05", score: 50 },
  ],
  "chemistry-fundamentals": [
    { date: "2025-04-22", score: 75 },
    { date: "2025-04-17", score: 70 },
    { date: "2025-04-12", score: 65 },
    { date: "2025-04-07", score: 60 },
  ]
};

// Mock topic breakdown data
const mockTopicBreakdown = {
  "physics-101": [
    { topic: "Newton's Laws", score: 85 },
    { topic: "Energy & Work", score: 70 },
    { topic: "Kinematics", score: 60 },
    { topic: "Thermodynamics", score: 75 },
    { topic: "Electromagnetism", score: 55 },
  ],
  "chemistry-fundamentals": [
    { topic: "Periodic Table", score: 90 },
    { topic: "Chemical Bonds", score: 75 },
    { topic: "Acids & Bases", score: 80 },
    { topic: "Organic Chemistry", score: 65 },
    { topic: "Redox Reactions", score: 70 },
  ]
};

export default function ExamReviewPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  const [currentExam, setCurrentExam] = useState<any | null>(null);
  const [examResult, setExamResult] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  
  useEffect(() => {
    if (examId && mockExams[examId as keyof typeof mockExams]) {
      const exam = mockExams[examId as keyof typeof mockExams];
      setCurrentExam(exam);
      
      // Get the results from localStorage
      const storedResult = localStorage.getItem(`exam-result-${examId}`);
      if (storedResult) {
        setExamResult(JSON.parse(storedResult));
      } else {
        // If no result found, create mock result
        const mockResult = {
          examId: exam.id,
          answers: {
            "q1": 1, // correct
            "q2": 1, // incorrect
            "q3": 1, // correct
            "q4": 0, // incorrect
            "q5": 2, // correct
          },
          score: 60,
          correctAnswers: 3,
          totalQuestions: 5,
          timeSpent: 720, // 12 minutes
          date: new Date().toISOString(),
          markedQuestions: ["q2"]
        };
        setExamResult(mockResult);
      }
    }
  }, [examId]);
  
  if (!currentExam || !examResult) {
    return (
      <SharedPageLayout title="Exam Review" subtitle="Loading review data...">
        <div className="flex items-center justify-center h-64">
          <p>Loading exam review data...</p>
        </div>
      </SharedPageLayout>
    );
  }
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };
  
  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-50 dark:bg-green-950/30";
    if (score >= 60) return "bg-amber-50 dark:bg-amber-950/30";
    return "bg-red-50 dark:bg-red-950/30";
  };
  
  const getResultMessage = (score: number) => {
    if (score >= 80) return "Excellent work! You've mastered this content.";
    if (score >= 60) return "Good job! Some areas could use more practice.";
    return "Keep practicing! Review the topics you struggled with.";
  };
  
  // Improvement from previous attempt
  const previousAttempts = mockHistoricalPerformance[examId as keyof typeof mockHistoricalPerformance] || [];
  const previousScore = previousAttempts.length > 0 ? previousAttempts[0].score : null;
  const improvement = previousScore !== null ? examResult.score - previousScore : null;
  
  return (
    <SharedPageLayout 
      title="Exam Results & Analysis"
      subtitle={currentExam.title}
    >
      <div className="space-y-6">
        {/* Score Summary Card */}
        <Card className={`border-t-4 ${
          examResult.score >= 80 ? "border-t-green-500" : 
          examResult.score >= 60 ? "border-t-amber-500" : 
          "border-t-red-500"
        }`}>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>{currentExam.title} - Results</CardTitle>
              <Badge className={`${getScoreBg(examResult.score)} ${getScoreColor(examResult.score)} text-base px-3 py-1`}>
                Score: {examResult.score}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Overall Performance */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 border border-violet-100 dark:border-violet-800/30">
                <h3 className="font-medium mb-3">Exam Overview</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Performance</span>
                      <span className={getScoreColor(examResult.score)}>
                        {examResult.correctAnswers}/{examResult.totalQuestions} correct
                      </span>
                    </div>
                    <Progress value={examResult.score} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Date Taken</span>
                      <span className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-violet-500" />
                        {new Date(examResult.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Time Spent</span>
                      <span className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1.5 text-violet-500" />
                        {formatTime(examResult.timeSpent)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Questions</span>
                      <span className="flex items-center">
                        <CheckSquare className="h-3.5 w-3.5 mr-1.5 text-violet-500" />
                        {examResult.totalQuestions} total
                      </span>
                    </div>
                    {improvement !== null && (
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Improvement</span>
                        <span className={`flex items-center ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {improvement >= 0 
                            ? <ArrowRight className="h-3.5 w-3.5 mr-1.5 text-green-500" /> 
                            : <ArrowRight className="h-3.5 w-3.5 mr-1.5 text-red-500" />
                          }
                          {improvement > 0 ? '+' : ''}{improvement}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Performance Feedback */}
              <div className={`p-4 rounded-lg ${getScoreBg(examResult.score)} border`}>
                <h3 className="font-medium mb-2">Performance Feedback</h3>
                <p className="text-sm">{getResultMessage(examResult.score)}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg border">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1.5 text-green-500" />
                      Strengths
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {mockTopicBreakdown[examId as keyof typeof mockTopicBreakdown]
                        .filter(item => item.score >= 75)
                        .slice(0, 2)
                        .map((item, idx) => (
                          <li key={idx} className="ml-6 list-disc">
                            {item.topic} ({item.score}%)
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  
                  <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg border">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <XCircle className="h-4 w-4 mr-1.5 text-red-500" />
                      Areas to Improve
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {mockTopicBreakdown[examId as keyof typeof mockTopicBreakdown]
                        .filter(item => item.score < 75)
                        .slice(0, 2)
                        .map((item, idx) => (
                          <li key={idx} className="ml-6 list-disc">
                            {item.topic} ({item.score}%)
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button variant="outline" onClick={() => navigate(`/dashboard/student/practice-exam/${examId}/start`)}>
                  <AlertCircle className="h-4 w-4 mr-1.5" />
                  Retake Exam
                </Button>
                <Button onClick={() => navigate('/dashboard/student/practice-exam')}>
                  <CheckSquare className="h-4 w-4 mr-1.5" />
                  View All Practice Exams
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Detailed Review Tabs */}
        <div>
          <SectionHeader title="Detailed Analysis" />
          
          <Tabs defaultValue="summary" className="mt-4" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="summary">Performance Summary</TabsTrigger>
              <TabsTrigger value="questions">Question Analysis</TabsTrigger>
              <TabsTrigger value="topics">Topic Breakdown</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-4">
              {/* Performance Over Time */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Performance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <p>Performance chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recommendations */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Personalized Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                    <h4 className="font-medium mb-2">Suggested Study Materials</h4>
                    <ul className="space-y-2">
                      {mockTopicBreakdown[examId as keyof typeof mockTopicBreakdown]
                        .filter(item => item.score < 75)
                        .slice(0, 2)
                        .map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                            <span>{item.topic} Concept Review</span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/30">
                    <h4 className="font-medium mb-2">Practice Suggestions</h4>
                    <ul className="space-y-2">
                      {mockTopicBreakdown[examId as keyof typeof mockTopicBreakdown]
                        .filter(item => item.score < 75)
                        .slice(0, 2)
                        .map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <CheckSquare className="h-4 w-4 mr-2 text-violet-500" />
                            <span>Additional {item.topic} Practice Quiz</span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="questions">
              {/* Question-by-Question Review */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Question Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {currentExam.questions.map((question: any, index: number) => {
                      const userAnswer = examResult.answers[question.id] !== undefined ? examResult.answers[question.id] : null;
                      const isCorrect = userAnswer === question.correctAnswer;
                      const isExpanded = selectedQuestion === index;
                      
                      return (
                        <div key={question.id} className="border rounded-lg overflow-hidden">
                          {/* Question Header */}
                          <div 
                            className={`p-3 flex justify-between items-center cursor-pointer ${
                              isCorrect 
                                ? "bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800/30" 
                                : "bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-800/30"
                            }`}
                            onClick={() => setSelectedQuestion(isExpanded ? null : index)}
                          >
                            <div className="flex items-center">
                              <span className="font-medium mr-3">Q{index + 1}.</span>
                              <span className="text-sm">{question.text.substring(0, 40)}...</span>
                            </div>
                            <div className="flex items-center">
                              {isCorrect ? (
                                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                  <CheckCircle className="h-3.5 w-3.5 mr-1" /> Correct
                                </Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                                  <XCircle className="h-3.5 w-3.5 mr-1" /> Incorrect
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Expanded Question Details */}
                          {isExpanded && (
                            <div className="p-4 bg-white dark:bg-gray-800">
                              <div className="mb-4">
                                <h4 className="font-medium mb-2">{question.text}</h4>
                                <div className="space-y-2">
                                  {question.options.map((option: string, idx: number) => (
                                    <div 
                                      key={idx}
                                      className={`p-2 rounded ${
                                        idx === question.correctAnswer
                                          ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30"
                                          : idx === userAnswer
                                            ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30"
                                            : "bg-gray-50 dark:bg-gray-800"
                                      }`}
                                    >
                                      <div className="flex items-start">
                                        <div className="mr-2">
                                          {idx === question.correctAnswer ? (
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                          ) : idx === userAnswer ? (
                                            <XCircle className="h-4 w-4 text-red-600" />
                                          ) : (
                                            <div className="h-4 w-4" />
                                          )}
                                        </div>
                                        <span className="text-sm">{option}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="text-sm border-t pt-3 text-muted-foreground">
                                <p>
                                  {isCorrect 
                                    ? "Great job! You answered this question correctly." 
                                    : `You selected option ${userAnswer !== null ? userAnswer + 1 : "none"}, but the correct answer was option ${question.correctAnswer + 1}.`
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="topics">
              {/* Topic-wise Analysis */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Topics Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTopicBreakdown[examId as keyof typeof mockTopicBreakdown].map((topic, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{topic.topic}</span>
                          <span className={getScoreColor(topic.score)}>{topic.score}%</span>
                        </div>
                        <Progress value={topic.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SharedPageLayout>
  );
}
