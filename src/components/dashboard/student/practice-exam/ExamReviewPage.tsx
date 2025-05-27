
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Clock, ChevronLeft, RotateCcw } from 'lucide-react';
import QuestionReview from './QuestionReview';

interface ExamResults {
  examId: string;
  answers: Record<string, string>;
  score: number;
  completedAt: string;
}

const ExamReviewPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState<ExamResults | null>(null);

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
        completedAt: new Date().toISOString()
      });
    }
  }, [examId]);

  // Mock questions for review
  const mockQuestions = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    text: `Sample question ${i + 1}: What is the formula for calculating kinetic energy?`,
    userAnswer: i % 3 === 0 ? 'KE = ½mv²' : i % 3 === 1 ? 'KE = mv' : 'KE = mgh',
    correctAnswer: 'KE = ½mv²',
    isCorrect: i % 3 === 0,
    explanation: 'Kinetic energy is calculated using the formula KE = ½mv², where m is mass and v is velocity.'
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

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Exam Results</h1>
          <p className="text-gray-600">Practice Exam {examId}</p>
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

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-3xl font-bold text-yellow-600">{results.score}%</p>
            <p className="text-sm text-gray-600">Overall Score</p>
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
            <p className="text-3xl font-bold text-green-600">45:30</p>
            <p className="text-sm text-gray-600">Time Taken</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Badge */}
      <div className="text-center mb-8">
        <Badge 
          variant={results.score >= 80 ? 'default' : results.score >= 60 ? 'secondary' : 'destructive'}
          className="text-lg px-4 py-2"
        >
          {results.score >= 80 ? 'Excellent' : results.score >= 60 ? 'Good' : 'Needs Improvement'}
        </Badge>
      </div>

      {/* Progress Bar */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Correct Answers</span>
              <span>{correctAnswers}/{totalQuestions}</span>
            </div>
            <Progress value={(correctAnswers / totalQuestions) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Question Review */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Question Review</h2>
        {mockQuestions.map((question, index) => (
          <QuestionReview
            key={question.id}
            question={question}
            questionNumber={index + 1}
          />
        ))}
      </div>

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
