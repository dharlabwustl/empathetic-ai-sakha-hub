
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, Clock, ChevronLeft, RotateCcw, TrendingUp, Award, AlertCircle, CheckCircle } from 'lucide-react';
import QuestionReview from './QuestionReview';

interface ExamResults {
  examId: string;
  answers: Record<string, string>;
  score: number;
  completedAt: string;
  timeSpent: number;
  breakdown: {
    physics: number;
    chemistry: number;
    biology: number;
  };
}

const ExamReviewPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState<ExamResults | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  console.log('ExamReviewPage - examId:', examId);

  useEffect(() => {
    const storedResults = localStorage.getItem(`exam_result_${examId}`);
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // Mock results if not found
      setResults({
        examId: examId || '',
        answers: {},
        score: 75,
        completedAt: new Date().toISOString(),
        timeSpent: 2700, // 45 minutes
        breakdown: {
          physics: 72,
          chemistry: 78,
          biology: 75
        }
      });
    }
  }, [examId]);

  // Enhanced mock questions for review
  const mockQuestions = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    text: i === 0 ? 
      "A particle moves with uniform acceleration. If it covers 100m in the first 10 seconds and 150m in the next 10 seconds, what is its acceleration?" :
      `Sample question ${i + 1}: What is the formula for calculating kinetic energy?`,
    userAnswer: i % 4 === 0 ? 'KE = ½mv²' : i % 4 === 1 ? 'KE = mv' : i % 4 === 2 ? 'KE = mgh' : '2.5 m/s²',
    correctAnswer: i === 0 ? '2.5 m/s²' : 'KE = ½mv²',
    isCorrect: i % 3 === 0,
    explanation: i === 0 ? 
      'Using the kinematic equation s = ut + ½at², we can determine the acceleration by analyzing the motion in two intervals.' :
      'Kinetic energy is calculated using the formula KE = ½mv², where m is mass and v is velocity.',
    subject: i % 3 === 0 ? 'Physics' : i % 3 === 1 ? 'Chemistry' : 'Biology',
    difficulty: i < 10 ? 'Easy' : i < 20 ? 'Medium' : 'Hard',
    timeSpent: Math.floor(Math.random() * 120) + 30 // 30-150 seconds
  }));

  if (!results) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Results...</h1>
        </div>
      </div>
    );
  }

  const correctAnswers = mockQuestions.filter(q => q.isCorrect).length;
  const totalQuestions = mockQuestions.length;
  const timeSpentFormatted = `${Math.floor(results.timeSpent / 60)}:${(results.timeSpent % 60).toString().padStart(2, '0')}`;

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 75) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 60) return { level: 'Average', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Needs Improvement', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const performance = getPerformanceLevel(results.score);
  const subjectAnalysis = [
    { subject: 'Physics', score: results.breakdown.physics, questions: 10, correct: Math.floor(results.breakdown.physics / 10) },
    { subject: 'Chemistry', score: results.breakdown.chemistry, questions: 10, correct: Math.floor(results.breakdown.chemistry / 10) },
    { subject: 'Biology', score: results.breakdown.biology, questions: 10, correct: Math.floor(results.breakdown.biology / 10) }
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Exam Results</h1>
          <p className="text-gray-600">Practice Exam {examId} • Completed {new Date(results.completedAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Exams
          </Button>
          <Button onClick={() => navigate(`/dashboard/student/practice-exam/${examId}/start`)}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Exam
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="questions">Question Review</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-2">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
                <p className="text-5xl font-bold text-yellow-600">{results.score}%</p>
                <p className="text-lg text-gray-600 mb-2">Overall Score</p>
                <Badge className={`${performance.bgColor} ${performance.color} border-0`}>
                  {performance.level}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-3xl font-bold text-blue-600">{correctAnswers}/{totalQuestions}</p>
                <p className="text-sm text-gray-600">Correct Answers</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-3xl font-bold text-green-600">{timeSpentFormatted}</p>
                <p className="text-sm text-gray-600">Time Taken</p>
              </CardContent>
            </Card>
          </div>

          {/* Subject-wise Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectAnalysis.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{subject.correct}/{subject.questions}</span>
                        <Badge variant="outline">{subject.score}%</Badge>
                      </div>
                    </div>
                    <Progress value={subject.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Strengths
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Strong performance in Chemistry (78%)</li>
                    <li>• Good time management</li>
                    <li>• Consistent accuracy across topics</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-orange-700 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Areas for Improvement
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Focus more on Physics mechanics</li>
                    <li>• Review Biology classification</li>
                    <li>• Practice more difficult questions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Difficulty Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Easy Questions</span>
                    <span className="font-medium">9/10 (90%)</span>
                  </div>
                  <Progress value={90} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>Medium Questions</span>
                    <span className="font-medium">7/10 (70%)</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>Hard Questions</span>
                    <span className="font-medium">4/10 (40%)</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Average per Question</span>
                    <span className="font-medium">1:30 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fastest Question</span>
                    <span className="font-medium">0:25 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Slowest Question</span>
                    <span className="font-medium">3:45 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Remaining</span>
                    <span className="font-medium">15:00 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                PREPZR AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Study Plan</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Spend more time on Physics mechanics</li>
                    <li>• Review organic chemistry reactions</li>
                    <li>• Practice more numerical problems</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Next Steps</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Take another full-length test in 3 days</li>
                    <li>• Focus on weak topics identified</li>
                    <li>• Review explanations for wrong answers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          {/* Question Review */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Question-by-Question Review</h2>
            {mockQuestions.map((question, index) => (
              <QuestionReview
                key={question.id}
                question={question}
                questionNumber={index + 1}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-8">
        <Button onClick={() => navigate(`/dashboard/student/practice-exam/${examId}/start`)}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Retake Exam
        </Button>
        <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
          Browse More Exams
        </Button>
      </div>
    </div>
  );
};

export default ExamReviewPage;
