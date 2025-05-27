
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Clock, Target, TrendingUp, Play, ChevronRight, BarChart } from 'lucide-react';

const PracticeExamLandingPage = () => {
  const navigate = useNavigate();

  // Mock data for NEET subjects
  const subjectProgress = [
    {
      subject: 'Physics',
      totalExams: 25,
      completedExams: 18,
      avgScore: 76,
      bestScore: 89,
      studyTime: '15h 30m',
      improvement: '+12%',
      color: 'bg-blue-500'
    },
    {
      subject: 'Chemistry', 
      totalExams: 30,
      completedExams: 22,
      avgScore: 82,
      bestScore: 94,
      studyTime: '18h 45m',
      improvement: '+8%',
      color: 'bg-green-500'
    },
    {
      subject: 'Biology',
      totalExams: 35,
      completedExams: 25,
      avgScore: 79,
      bestScore: 91,
      studyTime: '22h 15m',
      improvement: '+15%',
      color: 'bg-purple-500'
    }
  ];

  const recentExams = [
    {
      id: '1',
      title: 'NEET Physics Mock Test 3',
      subject: 'Physics',
      questions: 45,
      duration: 180,
      score: 82,
      status: 'completed',
      difficulty: 'Medium',
      takenAt: '2 days ago'
    },
    {
      id: '2',
      title: 'Organic Chemistry Practice',
      subject: 'Chemistry',
      questions: 30,
      duration: 120,
      score: null,
      status: 'available',
      difficulty: 'Hard',
      takenAt: null
    },
    {
      id: '3',
      title: 'Human Physiology Test',
      subject: 'Biology',
      questions: 40,
      duration: 150,
      score: 78,
      status: 'completed',
      difficulty: 'Medium',
      takenAt: '1 week ago'
    }
  ];

  const aiSuggestions = [
    "Focus on Physics mechanics - your weakest area needs attention",
    "Take more Chemistry organic practice tests to boost confidence",
    "Biology scores are improving - maintain the momentum!",
    "Consider full-length NEET mock tests to build endurance"
  ];

  const handleExamAction = (exam: any) => {
    if (exam.status === 'completed') {
      // Navigate to exam analysis/review page
      navigate(`/dashboard/student/practice-exam/analysis/${exam.id}`);
    } else {
      // Navigate to exam taking page
      navigate(`/dashboard/student/practice-exam/take/${exam.id}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Practice Exams</h1>
          <p className="text-gray-600 dark:text-gray-400">Test your knowledge with comprehensive mock exams</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Create Custom Exam
        </Button>
      </div>

      {/* NEET Subject Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjectProgress.map((subject) => (
          <Card key={subject.subject} className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{subject.subject}</CardTitle>
                <div className={`w-4 h-4 rounded-full ${subject.color}`}></div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion</span>
                  <span>{Math.round((subject.completedExams / subject.totalExams) * 100)}%</span>
                </div>
                <Progress value={(subject.completedExams / subject.totalExams) * 100} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-blue-50 rounded text-center">
                  <p className="text-lg font-bold text-blue-700">{subject.avgScore}%</p>
                  <p className="text-xs text-blue-600">Avg Score</p>
                </div>
                <div className="p-2 bg-green-50 rounded text-center">
                  <p className="text-lg font-bold text-green-700">{subject.bestScore}%</p>
                  <p className="text-xs text-green-600">Best Score</p>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{subject.studyTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-green-600">{subject.improvement}</span>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Take {subject.subject} Test
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Suggestions */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Target className="h-5 w-5" />
            AI Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-orange-200">
                <p className="text-sm text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Exams */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Practice Exams</CardTitle>
            <Button variant="ghost" size="sm">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{exam.title}</h4>
                    <Badge variant="outline">{exam.subject}</Badge>
                    <Badge variant={exam.difficulty === 'Easy' ? 'default' : exam.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                      {exam.difficulty}
                    </Badge>
                    {exam.score && (
                      <Badge variant={exam.score >= 80 ? 'default' : exam.score >= 60 ? 'secondary' : 'destructive'}>
                        {exam.score}%
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{exam.questions} questions</span>
                    <span>{exam.duration} min</span>
                    {exam.takenAt && <span>Taken: {exam.takenAt}</span>}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant={exam.status === 'completed' ? 'outline' : 'default'}
                  onClick={() => handleExamAction(exam)}
                >
                  {exam.status === 'completed' ? (
                    <>
                      <BarChart className="h-4 w-4 mr-1" />
                      Review
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-1" />
                      Start Exam
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">90</p>
            <p className="text-sm text-gray-600">Total Exams</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">65</p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">56h</p>
            <p className="text-sm text-gray-600">Practice Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">79%</p>
            <p className="text-sm text-gray-600">Avg Score</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PracticeExamLandingPage;
