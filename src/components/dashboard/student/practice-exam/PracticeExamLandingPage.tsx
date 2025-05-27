
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Play, ChevronRight, Clock, Target, TrendingUp, Users } from 'lucide-react';
import OverviewSection from '../OverviewSection';

const PracticeExamLandingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Listen for URL parameter changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && (tab === 'overview' || tab === 'available-exams')) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Listen for popstate events (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const tab = new URLSearchParams(window.location.search).get('tab');
      if (tab && (tab === 'overview' || tab === 'available-exams')) {
        setActiveTab(tab);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const overviewData = {
    type: "Practice Exams" as const,
    title: "NEET Practice Exams Overview",
    subjects: [
      { name: "Physics", completed: 12, total: 20, progress: 60, efficiency: 78, studyTime: 24 },
      { name: "Chemistry", completed: 15, total: 22, progress: 68, efficiency: 82, studyTime: 28 },
      { name: "Biology", completed: 18, total: 25, progress: 72, efficiency: 75, studyTime: 35 }
    ],
    totalStudyTime: 87,
    overallProgress: 67,
    suggestions: [
      "Take more Physics mock tests to improve speed and accuracy",
      "Focus on Chemistry organic reactions in practice exams", 
      "Biology ecology questions need more practice attempts",
      "Try full-length practice exams to build exam stamina"
    ]
  };

  const availableExams = [
    {
      id: '4',
      title: 'NEET Full Length Mock Test 1',
      subject: 'All Subjects',
      questions: 180,
      duration: '3 hours',
      difficulty: 'Medium',
      attempts: 2,
      bestScore: 75,
      avgScore: 68
    },
    {
      id: '6', 
      title: 'Physics Chapter Test - Mechanics',
      subject: 'Physics',
      questions: 45,
      duration: '45 mins',
      difficulty: 'Hard',
      attempts: 3,
      bestScore: 82,
      avgScore: 76
    },
    {
      id: '7',
      title: 'Chemistry Organic Reactions Test',
      subject: 'Chemistry', 
      questions: 30,
      duration: '30 mins',
      difficulty: 'Medium',
      attempts: 1,
      bestScore: 65,
      avgScore: 65
    }
  ];

  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  const handleViewResults = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', value);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="available-exams">Available Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <OverviewSection {...overviewData} />
        </TabsContent>

        <TabsContent value="available-exams" className="space-y-6 mt-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Available Practice Exams</h1>
              <p className="text-gray-600 dark:text-gray-400">Test your knowledge and track your progress</p>
            </div>
            <div className="flex gap-2">
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Quick Test
              </Button>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Custom Test
              </Button>
            </div>
          </div>

          {/* Subject Practice Cards */}
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
                      <span>{subject.completed}/{subject.total} Tests</span>
                      <span>{subject.studyTime}h practiced</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-2 bg-blue-50 rounded text-center">
                      <p className="text-sm font-bold text-blue-700">{subject.efficiency}%</p>
                      <p className="text-xs text-blue-600">Avg Score</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded text-center">
                      <p className="text-sm font-bold text-green-700">{subject.studyTime}h</p>
                      <p className="text-xs text-green-600">Practice Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Available Exams List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Practice Exams</CardTitle>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{exam.title}</h4>
                        <Badge variant="outline">{exam.subject}</Badge>
                        <Badge variant={exam.difficulty === 'Easy' ? 'default' : exam.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                          {exam.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{exam.questions} questions</span>
                        <span>{exam.duration}</span>
                        <span>Best: {exam.bestScore}%</span>
                        <span>{exam.attempts} attempts</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleStartExam(exam.id)}>
                        <Play className="h-4 w-4 mr-1" />
                        Start Exam
                      </Button>
                      {exam.attempts > 0 && (
                        <Button size="sm" variant="outline" onClick={() => handleViewResults(exam.id)}>
                          View Results
                        </Button>
                      )}
                    </div>
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
                <p className="text-2xl font-bold">67</p>
                <p className="text-sm text-gray-600">Total Exams</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-gray-600">Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold">87h</p>
                <p className="text-sm text-gray-600">Practice Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold">76%</p>
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
