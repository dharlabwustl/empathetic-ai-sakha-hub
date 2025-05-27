
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Play, ChevronRight, Clock, Target, TrendingUp, Users, Star, Trophy } from 'lucide-react';
import OverviewSection from '../OverviewSection';
import CreateExamDialog from './CreateExamDialog';

const PracticeExamLandingPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

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
      avgScore: 68,
      rating: 4.8,
      takenBy: 1250
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
      avgScore: 76,
      rating: 4.6,
      takenBy: 890
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
      avgScore: 65,
      rating: 4.7,
      takenBy: 650
    }
  ];

  const handleStartExam = (examId: string) => {
    console.log('🔥 STARTING EXAM:', examId);
    console.log('🔥 NAVIGATING TO:', `/dashboard/student/practice-exam/${examId}/start`);
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  const handleViewResults = (examId: string) => {
    console.log('🔥 VIEWING RESULTS:', examId);
    console.log('🔥 NAVIGATING TO:', `/dashboard/student/practice-exam/${examId}/review`);
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  const handleSubjectClick = (subjectName: string) => {
    // Navigate to available exams tab when subject card is clicked
    setActiveTab('available-exams');
    setSearchParams({ tab: 'available-exams' });
  };

  const handleContinueLearning = () => {
    // Navigate to available exams tab when "Take Practice Test" is clicked
    setActiveTab('available-exams');
    setSearchParams({ tab: 'available-exams' });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="available-exams">Available Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <OverviewSection 
            {...overviewData} 
            onContinueLearning={handleContinueLearning}
          />
        </TabsContent>

        <TabsContent value="available-exams" className="space-y-6 mt-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Available Practice Exams</h1>
              <p className="text-gray-600 dark:text-gray-400">Test your knowledge and track your progress</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleStartExam('4')}>
                <Play className="mr-2 h-4 w-4" />
                Quick Test
              </Button>
              <Button variant="outline" onClick={() => setShowCreateDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Custom Test
              </Button>
            </div>
          </div>

          {/* Subject Practice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {overviewData.subjects.map((subject) => (
              <Card key={subject.name} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSubjectClick(subject.name)}>
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
                  
                  <Button 
                    className="w-full" 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartExam('4');
                    }}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Take Practice Test
                  </Button>
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
                  <Card key={exam.id} className="border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-lg">{exam.title}</h4>
                            <Badge variant="outline">{exam.subject}</Badge>
                            <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                              {exam.difficulty}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {exam.questions} questions
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {exam.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Trophy className="h-4 w-4" />
                              Best: {exam.bestScore}%
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              {exam.attempts} attempts
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{exam.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Users className="h-4 w-4" />
                              <span>{exam.takenBy.toLocaleString()} students</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <Button 
                            size="sm" 
                            onClick={() => {
                              console.log('🔥 START EXAM BUTTON CLICKED FOR:', exam.id);
                              handleStartExam(exam.id);
                            }}
                            className="min-w-[120px]"
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Start Exam
                          </Button>
                          {exam.attempts > 0 && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => {
                                console.log('🔥 VIEW RESULTS BUTTON CLICKED FOR:', exam.id);
                                handleViewResults(exam.id);
                              }}
                              className="min-w-[120px]"
                            >
                              View Results
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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

      <CreateExamDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </div>
  );
};

export default PracticeExamLandingPage;
