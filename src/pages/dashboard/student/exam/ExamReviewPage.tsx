
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, CheckCircle, XCircle, ChevronLeft, Clock, 
  Timer, AlertCircle, BookOpen, RotateCw
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SharedPageLayout } from "@/components/dashboard/student/SharedPageLayout";

// Mock exam result data
const mockExamResult = {
  id: "e1",
  title: "Physics Mid-Term Practice",
  subject: "Physics",
  date: "2025-04-28",
  timeSpent: 48, // minutes
  timeLimit: 60, // minutes
  score: {
    correct: 21,
    incorrect: 6,
    unattempted: 3,
    total: 30,
    percentile: 78
  },
  sectionScores: [
    { name: "Multiple Choice", score: 86, totalQuestions: 15, correct: 13 },
    { name: "Numerical Problems", score: 70, totalQuestions: 10, correct: 7 },
    { name: "Short Answer", score: 40, totalQuestions: 5, correct: 2 }
  ],
  topicAnalysis: [
    { name: "Kinematics", score: 90, questions: 6 },
    { name: "Newton's Laws", score: 75, questions: 8 },
    { name: "Work & Energy", score: 66, questions: 6 },
    { name: "Heat Transfer", score: 50, questions: 6 },
    { name: "Sound Waves", score: 75, questions: 4 }
  ],
  questionAnalysis: [
    { 
      id: "q1", 
      topic: "Newton's Laws", 
      question: "Which of Newton's laws states that for every action, there is an equal and opposite reaction?", 
      yourAnswer: "Third Law", 
      correctAnswer: "Third Law", 
      isCorrect: true,
      timeTaken: 45, // seconds
      difficulty: "Easy" 
    },
    { 
      id: "q2", 
      topic: "Heat Transfer", 
      question: "Which heat transfer method requires a medium?", 
      yourAnswer: "Radiation", 
      correctAnswer: "Conduction", 
      isCorrect: false,
      timeTaken: 62, // seconds
      difficulty: "Medium" 
    },
    { 
      id: "q3", 
      topic: "Work & Energy", 
      question: "Calculate the work done when a force of 15N displaces an object by 3m in the direction of the force.", 
      yourAnswer: "45 J", 
      correctAnswer: "45 J", 
      isCorrect: true,
      timeTaken: 90, // seconds
      difficulty: "Medium" 
    }
    // More questions...
  ],
  weakAreas: ["Heat Transfer", "Work & Energy - Conservation Laws"],
  strongAreas: ["Kinematics", "Newton's Laws - Third Law"],
  recommendations: [
    { id: "c1", title: "Heat Transfer Mechanisms", type: "concept" },
    { id: "f1", title: "Conservation of Energy", type: "flashcard" },
    { id: "e2", title: "Thermodynamics Practice Quiz", type: "exam" }
  ]
};

const ExamReviewPage = () => {
  const { examId } = useParams<{examId: string}>();
  const [examResult, setExamResult] = useState(mockExamResult);
  const [activeTab, setActiveTab] = useState("summary");
  
  // Calculate overall score percentage
  const scorePercentage = Math.round((examResult.score.correct / examResult.score.total) * 100);
  
  // Data for accuracy chart
  const accuracyChartData = [
    { name: "Correct", value: examResult.score.correct, color: "#10b981" }, // green
    { name: "Incorrect", value: examResult.score.incorrect, color: "#ef4444" }, // red
    { name: "Unattempted", value: examResult.score.unattempted, color: "#d1d5db" } // gray
  ];
  
  // Data for time utilization
  const timePercentage = Math.round((examResult.timeSpent / examResult.timeLimit) * 100);
  
  return (
    <SharedPageLayout
      title="Exam Review"
      subtitle="Analyze your performance and identify areas for improvement"
      showBackLink={true}
      backLinkText="Back to Practice Exams"
      backLinkUrl="/dashboard/student/practice"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <Link to="/dashboard/student/practice" className="text-sm text-blue-600 hover:underline inline-flex items-center">
              <ChevronLeft size={16} className="mr-1" />
              Back to Practice Exams
            </Link>
            <h1 className="text-2xl font-bold mt-2">{examResult.title} - Performance Analysis</h1>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              {examResult.subject}
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
              {new Date(examResult.date).toLocaleDateString()}
            </Badge>
          </div>
        </div>
        
        <Card className="border-t-4 border-violet-500">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg text-center">
                <h3 className="font-medium text-violet-800 dark:text-violet-300">Overall Score</h3>
                <div className="text-3xl font-bold text-violet-900 dark:text-violet-100 mt-2">{scorePercentage}%</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <h3 className="font-medium text-green-800 dark:text-green-300">Correct Answers</h3>
                <div className="text-3xl font-bold text-green-900 dark:text-green-100 mt-2">{examResult.score.correct}/{examResult.score.total}</div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-center">
                <h3 className="font-medium text-amber-800 dark:text-amber-300">Time Used</h3>
                <div className="text-3xl font-bold text-amber-900 dark:text-amber-100 mt-2">{examResult.timeSpent}/{examResult.timeLimit} min</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <h3 className="font-medium text-blue-800 dark:text-blue-300">Percentile</h3>
                <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">{examResult.score.percentile}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="topics">Topic Analysis</TabsTrigger>
            <TabsTrigger value="questions">Question Review</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Performance Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64">
                      <h3 className="text-center font-medium mb-4">Accuracy Analysis</h3>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={accuracyChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {accuracyChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Section Performance</h3>
                        {examResult.sectionScores.map((section, index) => (
                          <div key={index} className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{section.name}</span>
                              <span className="font-medium">{section.score}%</span>
                            </div>
                            <Progress 
                              value={section.score} 
                              className="h-2" 
                              indicatorClassName={
                                section.score >= 80 ? "bg-green-500" :
                                section.score >= 60 ? "bg-amber-500" :
                                "bg-red-500"
                              }
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Time Utilization</h3>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Time Used</span>
                          <span className="font-medium">{examResult.timeSpent}/{examResult.timeLimit} minutes</span>
                        </div>
                        <Progress value={timePercentage} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Strengths & Weaknesses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-green-700 dark:text-green-400 flex items-center gap-2 mb-2">
                      <CheckCircle size={16} />
                      Strong Areas
                    </h3>
                    <ul className="space-y-2">
                      {examResult.strongAreas.map((area, index) => (
                        <li key={index} className="flex gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-red-700 dark:text-red-400 flex items-center gap-2 mb-2">
                      <XCircle size={16} />
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {examResult.weakAreas.map((area, index) => (
                        <li key={index} className="flex gap-2">
                          <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <BookOpen size={16} className="text-blue-500" />
                      Recommended Resources
                    </h3>
                    <div className="space-y-2">
                      {examResult.recommendations.map((item) => (
                        <Link 
                          key={item.id} 
                          to={
                            item.type === 'concept' 
                              ? `/dashboard/student/concepts/study/${item.id}` 
                              : item.type === 'flashcard'
                                ? `/dashboard/student/flashcards/practice/${item.id}`
                                : `/dashboard/student/exams/start/${item.id}`
                          }
                          className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            {item.type === 'concept' && <BookOpen className="h-5 w-5 text-blue-500" />}
                            {item.type === 'flashcard' && <BarChart className="h-5 w-5 text-amber-500" />}
                            {item.type === 'exam' && <Clock className="h-5 w-5 text-violet-500" />}
                            <span>{item.title}</span>
                          </div>
                          <Badge variant="outline">
                            {item.type === 'concept' ? 'Concept Card' : item.type === 'flashcard' ? 'Flashcard' : 'Exam'}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => window.print()}
                className="gap-2"
              >
                <BarChart size={16} />
                Download Report
              </Button>
              
              <Link to={`/dashboard/student/exams/start/${examId}`}>
                <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                  <RotateCw size={16} />
                  Retake Exam
                </Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="topics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Topic Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {examResult.topicAnalysis.map((topic, index) => (
                      <Card key={index} className="border shadow-none">
                        <CardContent className="p-4">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-medium">{topic.name}</h3>
                            <Badge className={`${
                              topic.score >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                              topic.score >= 60 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            }`}>
                              {topic.score}%
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Performance</span>
                            <span>{Math.round(topic.score * topic.questions / 100)}/{topic.questions} questions</span>
                          </div>
                          <Progress 
                            value={topic.score} 
                            className="h-2" 
                            indicatorClassName={
                              topic.score >= 80 ? "bg-green-500" :
                              topic.score >= 60 ? "bg-amber-500" :
                              "bg-red-500"
                            }
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/50">
                    <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                      <AlertCircle size={16} />
                      Topic Insights
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300">
                      Focus on improving your understanding of Heat Transfer, where your performance was lowest.
                      Consider revisiting the concept cards and practicing more flashcards in this area.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Question-by-Question Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {examResult.questionAnalysis.map((question, index) => (
                    <Card key={index} className={`border-l-4 ${
                      question.isCorrect ? 'border-l-green-500' : 'border-l-red-500'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">Question {index + 1}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                              {question.topic}
                            </Badge>
                            <Badge className={`${
                              question.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                              question.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            }`}>
                              {question.difficulty}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="mb-4">{question.question}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className={`p-3 rounded-lg ${
                            question.isCorrect 
                              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50' 
                              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50'
                          }`}>
                            <p className="text-sm font-medium mb-1">Your Answer</p>
                            <p className={`${
                              question.isCorrect 
                                ? 'text-green-800 dark:text-green-300' 
                                : 'text-red-800 dark:text-red-300'
                            }`}>
                              {question.yourAnswer}
                              {question.isCorrect 
                                ? <CheckCircle className="inline-block ml-2 h-4 w-4 text-green-500" /> 
                                : <XCircle className="inline-block ml-2 h-4 w-4 text-red-500" />
                              }
                            </p>
                          </div>
                          
                          {!question.isCorrect && (
                            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50">
                              <p className="text-sm font-medium mb-1">Correct Answer</p>
                              <p className="text-green-800 dark:text-green-300">{question.correctAnswer}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-3 flex items-center text-sm text-muted-foreground">
                          <Timer className="h-4 w-4 mr-1" />
                          Time taken: {Math.floor(question.timeTaken / 60)}m {question.timeTaken % 60}s
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ExamReviewPage;
