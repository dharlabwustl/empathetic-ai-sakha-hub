
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Target, Flag, Brain } from 'lucide-react';

const ExamResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state;

  if (!results) {
    navigate('/dashboard/student/exams');
    return null;
  }

  const {
    answers,
    flaggedQuestions,
    timeSpent,
    totalQuestions,
    attempted,
    correct
  } = results;

  const accuracy = (correct / attempted) * 100;
  const completion = (attempted / totalQuestions) * 100;
  
  return (
    <div className="container max-w-4xl mx-auto py-6">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard/student/exams')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Exam Results</h1>
            <p className="text-gray-500">
              Review your performance and areas for improvement
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {accuracy.toFixed(1)}%
              </div>
              <Progress value={accuracy} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {completion.toFixed(1)}%
              </div>
              <Progress value={completion} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">Time Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Average: {(timeSpent / attempted).toFixed(1)} sec/question
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Questions</h3>
                  <p className="text-2xl font-bold">{totalQuestions}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Attempted</h3>
                  <p className="text-2xl font-bold text-blue-600">{attempted}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Correct Answers</h3>
                  <p className="text-2xl font-bold text-green-600">{correct}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Incorrect Answers</h3>
                  <p className="text-2xl font-bold text-red-600">{attempted - correct}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/dashboard/student/exams')}>
            View All Exams
          </Button>
          <Button variant="outline">
            Review Answers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamResultsPage;
