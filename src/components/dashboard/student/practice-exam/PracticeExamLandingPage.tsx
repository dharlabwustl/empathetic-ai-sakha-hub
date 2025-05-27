import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Play, ChevronRight, Clock, Target, TrendingUp, Users, Star, Trophy, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import OverviewSection from '../OverviewSection';
import CreateExamDialog from './CreateExamDialog';

const PracticeExamLandingPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState('all');

  // Listen for URL parameter changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'today', 'pending', 'completed'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Listen for popstate events (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const tab = new URLSearchParams(window.location.search).get('tab');
      if (tab && ['overview', 'today', 'pending', 'completed'].includes(tab)) {
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
      takenBy: 1250,
      status: 'today',
      dueDate: new Date()
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
      takenBy: 890,
      status: 'pending',
      dueDate: new Date(Date.now() + 86400000)
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
      takenBy: 650,
      status: 'completed',
      dueDate: new Date(Date.now() - 86400000)
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

  const handleContinueLearning = () => {
    setActiveTab('today');
    setSearchParams({ tab: 'today' });
  };

  const getFilteredExams = (status: string) => {
    let filtered = availableExams;
    
    if (status !== 'all') {
      filtered = filtered.filter(exam => exam.status === status);
    }
    
    if (subjectFilter !== 'all') {
      filtered = filtered.filter(exam => exam.subject === subjectFilter);
    }
    
    return filtered;
  };

  const getStatusCount = (status: string) => {
    return getFilteredExams(status).length;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const ExamCard = ({ exam }: { exam: typeof availableExams[0] }) => (
    <Card className="border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="font-semibold text-lg text-gray-900">{exam.title}</h4>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">{exam.subject}</Badge>
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
              onClick={() => handleStartExam(exam.id)}
              className="min-w-[120px] bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Play className="h-4 w-4 mr-1" />
              Start Exam
            </Button>
            {exam.attempts > 0 && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleViewResults(exam.id)}
                className="min-w-[120px]"
              >
                View Results
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-green-50 to-blue-50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="today" className="flex items-center gap-2">
            Today <Badge variant="secondary" className="bg-red-100 text-red-700">{getStatusCount('today')}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pending <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">{getStatusCount('pending')}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed <Badge variant="secondary" className="bg-green-100 text-green-700">{getStatusCount('completed')}</Badge>
          </TabsTrigger>
          <TabsTrigger value="available-exams">All Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <OverviewSection 
            {...overviewData} 
            onContinueLearning={handleContinueLearning}
          />
        </TabsContent>

        {['today', 'pending', 'completed', 'available-exams'].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-6 mt-6">
            {/* Header with Filters */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {tabValue === 'available-exams' ? 'Available Practice Exams' : 
                   tabValue.charAt(0).toUpperCase() + tabValue.slice(1)} Exams
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {getStatusCount(tabValue === 'available-exams' ? 'all' : tabValue)} exams available
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="All Subjects">All Subjects</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => handleStartExam('4')} className="bg-gradient-to-r from-blue-500 to-purple-500">
                  <Play className="mr-2 h-4 w-4" />
                  Quick Test
                </Button>
                <Button variant="outline" onClick={() => setShowCreateDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Custom Test
                </Button>
              </div>
            </div>

            {/* Exams List */}
            <div className="space-y-4">
              {getFilteredExams(tabValue === 'available-exams' ? 'all' : tabValue).map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-blue-800">67</p>
                  <p className="text-sm text-blue-600">Total Exams</p>
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
        ))}
      </Tabs>

      <CreateExamDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </div>
  );
};

export default PracticeExamLandingPage;
