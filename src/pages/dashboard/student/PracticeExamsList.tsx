
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, Target, Play, BarChart3, Calendar } from 'lucide-react';

const PracticeExamsList = () => {
  const navigate = useNavigate();

  const mockExams = [
    {
      id: '1',
      title: 'NEET Mock Test 1',
      type: 'Full Length',
      duration: 180,
      questions: 180,
      subjects: ['Physics', 'Chemistry', 'Biology'],
      difficulty: 'medium',
      attempted: false,
      score: null,
      accuracy: null
    },
    {
      id: '2',
      title: 'Physics Chapter Test',
      type: 'Subject Wise',
      duration: 60,
      questions: 45,
      subjects: ['Physics'],
      difficulty: 'easy',
      attempted: true,
      score: 38,
      accuracy: 84
    },
    {
      id: '3',
      title: 'Previous Year 2023',
      type: 'Previous Year',
      duration: 180,
      questions: 180,
      subjects: ['Physics', 'Chemistry', 'Biology'],
      difficulty: 'hard',
      attempted: true,
      score: 142,
      accuracy: 79
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  const handleReviewExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Test your preparation with mock tests and practice papers"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Total Exams</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">82%</p>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">24h</p>
                  <p className="text-xs text-muted-foreground">Time Spent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exam Categories */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Exams</TabsTrigger>
            <TabsTrigger value="full-length">Full Length</TabsTrigger>
            <TabsTrigger value="subject-wise">Subject Wise</TabsTrigger>
            <TabsTrigger value="previous-year">Previous Year</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockExams.map((exam) => (
                <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <Badge variant="outline" className="text-xs">
                          {exam.type}
                        </Badge>
                      </div>
                      <Badge className={getDifficultyColor(exam.difficulty)}>
                        {exam.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{exam.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{exam.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>{exam.questions} questions</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {exam.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>

                    {exam.attempted && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Score: {exam.score}/{exam.questions}</span>
                          <span>Accuracy: {exam.accuracy}%</span>
                        </div>
                        <Progress value={exam.accuracy} />
                      </div>
                    )}

                    <div className="flex gap-2">
                      {exam.attempted ? (
                        <>
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleReviewExam(exam.id)}
                          >
                            Review
                          </Button>
                          <Button 
                            className="flex-1"
                            onClick={() => handleStartExam(exam.id)}
                          >
                            Retake
                          </Button>
                        </>
                      ) : (
                        <Button 
                          className="w-full flex items-center gap-2"
                          onClick={() => handleStartExam(exam.id)}
                        >
                          <Play className="h-4 w-4" />
                          Start Exam
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamsList;
