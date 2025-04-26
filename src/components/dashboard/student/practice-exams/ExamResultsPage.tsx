
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, RotateCcw, Printer, Download, ThumbsUp, ThumbsDown, Star, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Assuming this interface would eventually be imported from a types file
interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswerId: string;
  userAnswerId?: string;
  explanation: string;
  concept?: string;
  subtopic?: string;
  difficultyLevel?: 'easy' | 'medium' | 'hard';
}

interface ExamResult {
  examId: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skipped: number;
  score: number;
  timeSpent: number; // in minutes
  completedAt: string;
  questions: Question[];
  conceptMastery: { name: string; score: number }[];
  weakAreas: { name: string; score: number }[];
  strengthAreas: { name: string; score: number }[];
}

// Mock data for demonstration
const getMockExamResult = (examId: string): ExamResult => {
  return {
    examId,
    totalQuestions: 20,
    correctAnswers: 16,
    incorrectAnswers: 3,
    skipped: 1,
    score: 80,
    timeSpent: 28,
    completedAt: new Date().toISOString(),
    questions: [
      {
        id: 'q1',
        text: 'What is Newton\'s first law of motion?',
        options: [
          { id: 'a', text: 'Force equals mass times acceleration' },
          { id: 'b', text: 'An object in motion stays in motion unless acted upon by an external force' },
          { id: 'c', text: 'For every action there is an equal and opposite reaction' },
          { id: 'd', text: 'Energy cannot be created or destroyed' }
        ],
        correctAnswerId: 'b',
        userAnswerId: 'b',
        explanation: 'Newton\'s first law of motion states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.',
        concept: 'Newton\'s Laws',
        subtopic: 'Mechanics',
        difficultyLevel: 'easy'
      },
      // ... more questions would be here
    ],
    conceptMastery: [
      { name: 'Newton\'s Laws', score: 90 },
      { name: 'Energy Conservation', score: 85 },
      { name: 'Kinematics', score: 60 },
      { name: 'Momentum', score: 75 }
    ],
    weakAreas: [
      { name: 'Kinematics', score: 60 },
      { name: 'Electromagnetism', score: 65 }
    ],
    strengthAreas: [
      { name: 'Newton\'s Laws', score: 90 },
      { name: 'Energy Conservation', score: 85 }
    ]
  };
};

const ExamResultsPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'weak-concepts'>('overview');

  useEffect(() => {
    if (!examId) return;
    
    // In a real application, we would fetch the exam result from an API
    // For now, we'll use mock data
    const result = getMockExamResult(examId);
    setExamResult(result);
  }, [examId]);

  if (!examResult) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getScoreVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'outline';
    return 'destructive';
  };

  const COLORS = ['#4CAF50', '#FFC107', '#F44336'];
  const pieData = [
    { name: 'Correct', value: examResult.correctAnswers },
    { name: 'Incorrect', value: examResult.incorrectAnswers },
    { name: 'Skipped', value: examResult.skipped }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with navigation and controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
        <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ChevronLeft size={16} /> Back to Exams
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer size={16} /> Print Results
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} /> Download PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RotateCcw size={16} /> Retake Exam
          </Button>
        </div>
      </div>

      {/* Result summary card */}
      <Card className="mb-6 border-t-4 border-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl">Exam Results Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Score Breakdown</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Overall Score</span>
                    <span className="font-bold">{examResult.score}%</span>
                  </div>
                  <Progress 
                    value={examResult.score} 
                    className={`h-2 ${examResult.score >= 80 ? 'bg-green-100' : examResult.score >= 60 ? 'bg-yellow-100' : 'bg-red-100'}`}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-bold text-green-600 text-xl">{examResult.correctAnswers}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-bold text-red-600 text-xl">{examResult.incorrectAnswers}</div>
                    <div className="text-sm text-gray-600">Incorrect</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-bold text-gray-600 text-xl">{examResult.skipped}</div>
                    <div className="text-sm text-gray-600">Skipped</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-medium mb-4">Performance Overview</h3>
              <div className="h-48 md:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-4">
          <Button variant={getScoreVariant(examResult.score)} className="flex items-center gap-2">
            {examResult.score >= 80 ? <ThumbsUp size={16} /> : examResult.score >= 60 ? <AlertCircle size={16} /> : <ThumbsDown size={16} />}
            {examResult.score >= 80 ? 'Excellent Performance' : examResult.score >= 60 ? 'Good Effort' : 'Needs Improvement'}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Star size={16} /> 
            Time Spent: {examResult.timeSpent} minutes
          </Button>
        </CardFooter>
      </Card>

      {/* Detailed analysis tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Question Analysis</TabsTrigger>
          <TabsTrigger value="weak-concepts">Areas to Improve</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Concept Mastery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={examResult.conceptMastery}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#8884d8" name="Mastery Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsUp className="text-green-500" size={20} /> 
                  Strength Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                {examResult.strengthAreas.map((area) => (
                  <div key={area.name} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span>{area.name}</span>
                      <span className="font-medium">{area.score}%</span>
                    </div>
                    <Progress value={area.score} className="h-2 bg-green-100" />
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="text-amber-500" size={20} /> 
                  Areas to Improve
                </CardTitle>
              </CardHeader>
              <CardContent>
                {examResult.weakAreas.map((area) => (
                  <div key={area.name} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span>{area.name}</span>
                      <span className="font-medium">{area.score}%</span>
                    </div>
                    <Progress value={area.score} className="h-2 bg-amber-100" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="questions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Question Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {examResult.questions.map((question, index) => (
                  <Card key={question.id} className="overflow-hidden border-l-4 border-l-blue-500">
                    <CardHeader className="bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Question {index + 1}</h4>
                        {question.userAnswerId === question.correctAnswerId ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 size={16} /> Correct
                          </div>
                        ) : question.userAnswerId ? (
                          <div className="flex items-center gap-1 text-red-600">
                            <XCircle size={16} /> Incorrect
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-amber-600">
                            <AlertCircle size={16} /> Skipped
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{question.text}</p>
                      <div className="space-y-2 mb-4">
                        {question.options.map((option) => (
                          <div 
                            key={option.id}
                            className={`p-3 rounded-lg border ${
                              option.id === question.correctAnswerId 
                                ? 'bg-green-50 border-green-200' 
                                : option.id === question.userAnswerId && option.id !== question.correctAnswerId
                                ? 'bg-red-50 border-red-200'
                                : 'bg-white border-gray-200'
                            }`}
                          >
                            {option.id === question.correctAnswerId && (
                              <CheckCircle2 className="inline-block mr-2 text-green-600" size={16} />
                            )}
                            {option.id === question.userAnswerId && option.id !== question.correctAnswerId && (
                              <XCircle className="inline-block mr-2 text-red-600" size={16} />
                            )}
                            {option.text}
                          </div>
                        ))}
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h5 className="font-medium text-sm text-blue-700 mb-1">Explanation</h5>
                        <p className="text-sm text-blue-800">{question.explanation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="weak-concepts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Improvement Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examResult.weakAreas.map((area) => (
                  <div key={area.name} className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-medium text-lg mb-2">{area.name}</h4>
                    <p className="text-gray-600 mb-3">
                      You scored {area.score}% in this area. Here are some resources to help you improve.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="flex items-center justify-center gap-2">
                        Review {area.name} Concepts
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center gap-2">
                        Practice {area.name} Problems
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <Button className="w-full">Create Personalized Study Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamResultsPage;
