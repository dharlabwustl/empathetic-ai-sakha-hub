
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronLeft,
  BarChart3,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';

interface ExamResult {
  examId: string;
  title: string;
  subject: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  timeTaken: number;
  userAnswers: Array<{
    questionId: string;
    selectedAnswer: number;
    timeSpent?: number;
  }>;
}

const ExamResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { examId = '' } = useParams<{ examId: string }>();
  const { toast } = useToast();
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load exam results from localStorage
    const storedResult = localStorage.getItem(`examResult_${examId}`);
    if (storedResult) {
      try {
        const result = JSON.parse(storedResult);
        setExamResult(result);
      } catch (error) {
        console.error('Error parsing exam result:', error);
        toast({
          title: "Error",
          description: "Could not load exam results",
          variant: "destructive"
        });
      }
    } else {
      // Generate mock result if not found
      const mockResult: ExamResult = {
        examId,
        title: `Practice Exam ${examId}`,
        subject: "Physics",
        score: 75,
        totalQuestions: 45,
        correctAnswers: 34,
        completedAt: new Date().toISOString(),
        timeTaken: 2400, // 40 minutes
        userAnswers: []
      };
      setExamResult(mockResult);
    }
    setLoading(false);
  }, [examId, toast]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!examResult) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Exam Results Not Found</h1>
            <p className="text-gray-600 mb-6">We couldn't find the results for this exam.</p>
            <Button onClick={() => navigate('/dashboard/student/practice-exam')}>
              Back to Practice Exams
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{examResult.title}</h1>
            <p className="text-gray-600">{examResult.subject} - Results</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Exams
          </Button>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className={`h-8 w-8 mx-auto mb-2 ${getScoreColor(examResult.score)}`} />
              <p className={`text-3xl font-bold ${getScoreColor(examResult.score)}`}>
                {examResult.score}%
              </p>
              <p className="text-sm text-gray-600">Overall Score</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-3xl font-bold text-blue-600">
                {examResult.correctAnswers}/{examResult.totalQuestions}
              </p>
              <p className="text-sm text-gray-600">Correct Answers</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-3xl font-bold text-purple-600">
                {formatTime(examResult.timeTaken)}
              </p>
              <p className="text-sm text-gray-600">Time Taken</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <Badge variant={getScoreBadgeVariant(examResult.score)} className="text-lg px-3 py-1">
                {examResult.score >= 80 ? 'Excellent' : examResult.score >= 60 ? 'Good' : 'Needs Improvement'}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">Performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Correct Answers</span>
                  <span>{examResult.correctAnswers} of {examResult.totalQuestions}</span>
                </div>
                <Progress value={(examResult.correctAnswers / examResult.totalQuestions) * 100} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Strengths</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Strong conceptual understanding
                      </li>
                      <li className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Good time management
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Areas to Improve</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-red-600">
                        <XCircle className="h-4 w-4 mr-2" />
                        Complex problem solving
                      </li>
                      <li className="flex items-center text-red-600">
                        <XCircle className="h-4 w-4 mr-2" />
                        Application-based questions
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Study Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Recommended Actions</h4>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Review chapters on mechanics and thermodynamics</li>
                      <li>• Practice more numerical problems</li>
                      <li>• Take additional mock tests</li>
                      <li>• Focus on time management strategies</li>
                    </ul>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={() => navigate('/dashboard/student/concepts')}>
                      Study Concepts
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
                      Take Another Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-700">78%</p>
                    <p className="text-sm text-gray-600">Average Score</p>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-700">{examResult.score}%</p>
                    <p className="text-sm text-blue-600">Your Score</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-700">85%</p>
                    <p className="text-sm text-green-600">Top 10% Score</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-center text-gray-600">
                    {examResult.score > 78 
                      ? "Great job! You scored above average." 
                      : "Keep practicing to improve your score!"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button onClick={() => navigate(`/dashboard/student/exam/${examId}/start`)}>
            Retake Exam
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
            Browse More Exams
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExamResultsPage;
