
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, Target, TrendingUp, Play, ChevronRight, BarChart, Plus } from 'lucide-react';
import OverviewSection from '../OverviewSection';

const PracticeExamLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const overviewData = {
    type: "Practice Exams" as const,
    title: "NEET Practice Exams Overview",
    subjects: [
      { name: "Physics", completed: 18, total: 25, progress: 72, efficiency: 76, studyTime: 15 },
      { name: "Chemistry", completed: 22, total: 30, progress: 73, efficiency: 82, studyTime: 18 },
      { name: "Biology", completed: 25, total: 35, progress: 71, efficiency: 79, studyTime: 22 }
    ],
    totalStudyTime: 55,
    overallProgress: 72,
    suggestions: [
      "Focus on Physics mechanics - your weakest area needs attention",
      "Take more Chemistry organic practice tests to boost confidence",
      "Biology scores are improving - maintain the momentum!",
      "Consider full-length NEET mock tests to build endurance"
    ]
  };

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

  const handleExamAction = (exam: any) => {
    if (exam.status === 'completed') {
      navigate('/dashboard/student/practice-exam/6/review');
    } else {
      navigate('/dashboard/student/practice-exam/4/start');
    }
  };

  const handleTakePracticeTest = () => {
    setActiveTab('all-exams');
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all-exams">All Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <OverviewSection {...overviewData} />
        </TabsContent>

        <TabsContent value="all-exams" className="space-y-6 mt-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Practice Exams</h1>
              <p className="text-gray-600 dark:text-gray-400">Test your knowledge with comprehensive mock exams</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/dashboard/student/practice-exam/4/start')}>
                <Play className="mr-2 h-4 w-4" />
                Take Practice Test
              </Button>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Custom Exam
              </Button>
            </div>
          </div>

          {/* Subject Practice Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {overviewData.subjects.map((subject) => (
              <Card key={subject.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{subject.name}</h3>
                    <Badge variant="outline">{subject.progress}% Complete</Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>{subject.completed}/{subject.total} Exams</span>
                      <span>{subject.studyTime}h practiced</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => navigate('/dashboard/student/practice-exam/4/start')}
                  >
                    Practice {subject.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

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
                          View Results
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticeExamLandingPage;
