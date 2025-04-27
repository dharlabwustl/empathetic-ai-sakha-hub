
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  RefreshCw,
  BarChart,
  Clock,
  BookOpen,
  FileText,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExamQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Exam {
  id: string;
  title: string;
  description: string;
  subject: string;
  duration: number; // in minutes
  totalMarks: number;
  questions: ExamQuestion[];
}

export default function ExamReviewPage() {
  const { examId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // States
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState<Exam | null>(null);
  const [activeTab, setActiveTab] = useState('questions');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  // Retrieve results from location state
  const results = location.state || {
    answers: {},
    score: 0,
    totalQuestions: 0,
    timeSpent: 0,
    flaggedQuestions: [],
    bookmarkedQuestions: []
  };

  // Mock data loading
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockExam: Exam = {
        id: examId || '1',
        title: "Physics: Mechanics and Motion",
        description: "Test your understanding of basic mechanics concepts including Newton's laws and kinematics.",
        subject: "Physics",
        duration: 30, // 30 minutes
        totalMarks: 50,
        questions: [
          {
            id: "q1",
            text: "According to Newton's First Law of Motion, an object at rest will remain at rest and an object in motion will remain in motion with the same speed and in the same direction unless acted upon by...",
            options: [
              { id: "a1", text: "Gravitational force only" },
              { id: "a2", text: "An unbalanced force" },
              { id: "a3", text: "Another object of equal mass" },
              { id: "a4", text: "Frictional force only" }
            ],
            correctOptionId: "a2",
            explanation: "Newton's First Law of Motion states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an unbalanced force. This property of objects is called inertia.",
            subject: "Physics",
            topic: "Newton's Laws",
            difficulty: "medium"
          },
          {
            id: "q2",
            text: "What is the formula for calculating kinetic energy?",
            options: [
              { id: "a1", text: "KE = mv" },
              { id: "a2", text: "KE = mv²" },
              { id: "a3", text: "KE = (1/2)mv²" },
              { id: "a4", text: "KE = (1/2)m²v" }
            ],
            correctOptionId: "a3",
            explanation: "The formula for kinetic energy is KE = (1/2)mv², where m is mass and v is velocity.",
            subject: "Physics",
            topic: "Energy",
            difficulty: "easy"
          },
          {
            id: "q3",
            text: "A 2 kg object accelerates at 5 m/s². What is the force applied to it according to Newton's Second Law?",
            options: [
              { id: "a1", text: "2.5 N" },
              { id: "a2", text: "7 N" },
              { id: "a3", text: "10 N" },
              { id: "a4", text: "0.4 N" }
            ],
            correctOptionId: "a3",
            explanation: "Using Newton's Second Law: F = ma, where F is force, m is mass, and a is acceleration. F = 2 kg × 5 m/s² = 10 N",
            subject: "Physics",
            topic: "Newton's Laws",
            difficulty: "medium"
          },
          {
            id: "q4",
            text: "A car accelerates from rest to 20 m/s in 10 seconds. What is its acceleration?",
            options: [
              { id: "a1", text: "0.5 m/s²" },
              { id: "a2", text: "2 m/s²" },
              { id: "a3", text: "10 m/s²" },
              { id: "a4", text: "20 m/s²" }
            ],
            correctOptionId: "a2",
            explanation: "Acceleration = change in velocity / time taken. Acceleration = (20 m/s - 0 m/s) / 10 s = 2 m/s²",
            subject: "Physics",
            topic: "Kinematics",
            difficulty: "easy"
          },
          {
            id: "q5",
            text: "Which of the following is NOT conserved in an elastic collision?",
            options: [
              { id: "a1", text: "Momentum" },
              { id: "a2", text: "Kinetic energy" },
              { id: "a3", text: "Mechanical energy" },
              { id: "a4", text: "Mass" }
            ],
            correctOptionId: "a3",
            explanation: "In an elastic collision, both momentum and kinetic energy are conserved. Mechanical energy (which includes potential energy) is not necessarily conserved if there's a change in potential energy.",
            subject: "Physics",
            topic: "Conservation Laws",
            difficulty: "hard"
          }
        ]
      };

      setExam(mockExam);
      setLoading(false);
    }, 1200);
  }, [examId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  const percentageScore = results.totalQuestions > 0 ? 
    Math.round((results.score / results.totalQuestions) * 100) : 0;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreGradient = (percentage: number) => {
    if (percentage >= 80) return "from-green-200 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20";
    if (percentage >= 60) return "from-amber-200 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20";
    return "from-red-200 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20";
  };

  const toggleQuestionExpansion = (questionId: string) => {
    setExpandedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  const isQuestionExpanded = (questionId: string) => expandedQuestions.includes(questionId);

  const getResultFeedback = () => {
    if (percentageScore >= 90) return "Excellent! You've mastered this subject.";
    if (percentageScore >= 80) return "Great job! Just a few concepts to review.";
    if (percentageScore >= 70) return "Good work. Consider reviewing the topics you missed.";
    if (percentageScore >= 60) return "You're on the right track. Focus on strengthening weak areas.";
    return "Keep practicing. Review the topics you missed and try again.";
  };

  const handleRetakeExam = () => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  // Data for pie chart
  const pieChartData = [
    { name: 'Correct', value: results.score },
    { name: 'Incorrect', value: results.totalQuestions - results.score }
  ];
  const COLORS = ['#10b981', '#ef4444'];

  if (!exam && loading) {
    return (
      <div className="container max-w-4xl mx-auto p-4">
        <Card className="w-full h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4 mx-auto"></div>
            <p className="text-xl font-medium mb-2">Loading Results</p>
            <p className="text-muted-foreground">Preparing your exam analysis...</p>
          </div>
        </Card>
      </div>
    );
  }

  // Topic performance analysis
  const topicPerformance = exam?.questions.reduce((acc, question) => {
    const isCorrect = results.answers[question.id] === question.correctOptionId;
    if (!acc[question.topic]) {
      acc[question.topic] = { total: 0, correct: 0 };
    }
    acc[question.topic].total += 1;
    if (isCorrect) acc[question.topic].correct += 1;
    return acc;
  }, {} as Record<string, { total: number, correct: number }>);

  // Difficulty breakdown
  const difficultyBreakdown = exam?.questions.reduce((acc, question) => {
    const isCorrect = results.answers[question.id] === question.correctOptionId;
    if (!acc[question.difficulty]) {
      acc[question.difficulty] = { total: 0, correct: 0 };
    }
    acc[question.difficulty].total += 1;
    if (isCorrect) acc[question.difficulty].correct += 1;
    return acc;
  }, {} as Record<string, { total: number, correct: number }>);

  // Format data for bar chart
  const topicPerformanceData = Object.entries(topicPerformance || {}).map(([topic, data]) => ({
    topic,
    percentage: Math.round((data.correct / data.total) * 100)
  }));

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <Card className="mb-6 shadow-md">
        <CardHeader className={`bg-gradient-to-r ${getScoreGradient(percentageScore)}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl">{exam?.title || 'Exam Results'}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{exam?.subject}</p>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(percentageScore)}`}>
              {percentageScore}%
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-4 space-y-4">
          <Progress value={percentageScore} className="h-3" />
          
          <div className="flex flex-wrap justify-between mt-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Correct: {results.score}/{results.totalQuestions}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Time spent: {formatTime(results.timeSpent)}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-600" />
              <span>Topic: {exam?.subject}</span>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800/50">
            <p className="font-medium mb-1">Feedback:</p>
            <p className="text-sm">{getResultFeedback()}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="questions" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Questions</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Recommendations</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions" className="space-y-4">
          {exam?.questions.map(question => (
            <Card key={question.id} className={`border-l-4 ${
              results.answers[question.id] === question.correctOptionId ? 
              'border-l-green-500' : 'border-l-red-500'
            }`}>
              <CardHeader className="py-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <Badge className={
                      question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      question.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {question.difficulty}
                    </Badge>
                    <h3 className="font-medium">{question.text}</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleQuestionExpansion(question.id)}
                    className="ml-2"
                  >
                    {isQuestionExpanded(question.id) ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              
              {isQuestionExpanded(question.id) && (
                <CardContent className="py-2">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      {question.options.map(option => {
                        const isSelected = results.answers[question.id] === option.id;
                        const isCorrect = option.id === question.correctOptionId;
                        
                        return (
                          <div 
                            key={option.id} 
                            className={`p-3 border rounded-md ${
                              isSelected && isCorrect ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700' :
                              isSelected && !isCorrect ? 'bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700' :
                              isCorrect ? 'bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-700' :
                              ''
                            }`}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mt-0.5">
                                {isSelected && isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                                {isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                                {!isSelected && isCorrect && <CheckCircle className="h-5 w-5 text-blue-600" />}
                                {!isSelected && !isCorrect && <div className="w-5 h-5"></div>}
                              </div>
                              <span className="ml-2">{option.text}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800/50">
                      <p className="font-medium mb-1">Explanation:</p>
                      <p className="text-sm">{question.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div>
                  <h3 className="text-base font-medium mb-3 text-center">Score Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Topic Performance Bar Chart */}
                <div>
                  <h3 className="text-base font-medium mb-3 text-center">Topic Performance</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart
                        data={topicPerformanceData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="percentage" fill="#3b82f6" name="Percentage Correct" />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Difficulty Breakdown */}
              <div className="mt-8">
                <h3 className="text-base font-medium mb-4">Difficulty Breakdown</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Object.entries(difficultyBreakdown || {}).map(([difficulty, data]) => (
                    <Card key={difficulty} className={`border ${
                      difficulty === 'easy' ? 'border-green-200 dark:border-green-700' :
                      difficulty === 'medium' ? 'border-amber-200 dark:border-amber-700' :
                      'border-red-200 dark:border-red-700'
                    }`}>
                      <CardContent className="pt-4">
                        <h4 className={`font-medium text-center mb-2 ${
                          difficulty === 'easy' ? 'text-green-600 dark:text-green-400' :
                          difficulty === 'medium' ? 'text-amber-600 dark:text-amber-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </h4>
                        <div className="flex justify-center text-2xl font-bold mb-2">
                          {Math.round((data.correct / data.total) * 100)}%
                        </div>
                        <div className="text-center text-sm text-muted-foreground">
                          {data.correct} / {data.total} correct
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Time Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Time Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Time Spent</h4>
                  <div className="text-2xl font-bold mt-1">{formatTime(results.timeSpent)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    vs {exam?.duration || 30} minutes allocated
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Time per Question</h4>
                  <div className="text-2xl font-bold mt-1">
                    {Math.round(results.timeSpent / results.totalQuestions)} sec
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Average time spent on each question
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Time Efficiency</h4>
                  <div className="text-2xl font-bold mt-1">
                    {Math.round((results.score / results.timeSpent) * 100)} %
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Correct answers per time spent
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Areas to Improve</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(topicPerformance || {})
                  .filter(([_, data]) => (data.correct / data.total) < 0.7) // Less than 70% correct
                  .map(([topic, data]) => (
                    <div key={topic} className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 p-4 rounded-lg">
                      <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">{topic}</h3>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performance</span>
                        <span>{Math.round((data.correct / data.total) * 100)}%</span>
                      </div>
                      <Progress value={Math.round((data.correct / data.total) * 100)} className="h-2 mb-3" />
                      <div className="text-sm space-y-2">
                        <p>Review the following concepts:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {exam?.questions
                            .filter(q => q.topic === topic && results.answers[q.id] !== q.correctOptionId)
                            .map(q => (
                              <li key={q.id}>{q.text.split('?')[0]}?</li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                
                {Object.entries(topicPerformance || {}).filter(([_, data]) => (data.correct / data.total) < 0.7).length === 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 dark:text-green-300 mb-1">Great Job!</h3>
                    <p className="text-sm">You performed well across all topics. Consider taking more challenging exams to continue your progress.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 border rounded-lg">
                    <div className="flex items-start">
                      <BookOpen className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h3 className="font-medium">Concept Review</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Review related concepts with interactive learning materials
                        </p>
                        <Button variant="outline" size="sm">
                          Go to Concepts
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 border rounded-lg">
                    <div className="flex items-start">
                      <FileText className="h-6 w-6 text-purple-600 mr-3 mt-1" />
                      <div>
                        <h3 className="font-medium">Practice Problems</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Try additional practice problems focused on your weak areas
                        </p>
                        <Button variant="outline" size="sm">
                          Practice More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {percentageScore < 70 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Study Plan Suggestion</h3>
                    <p className="text-sm mb-3">We've created a personalized study plan to help improve your score.</p>
                    <Button size="sm">View Study Plan</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Exams
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Results
          </Button>
          <Button onClick={handleRetakeExam}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retake Exam
          </Button>
        </div>
      </div>
    </div>
  );
}
