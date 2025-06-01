
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Search, 
  Filter, 
  Clock, 
  Target, 
  TrendingUp,
  CheckCircle2,
  Play,
  Star,
  Calendar,
  Award,
  Users,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PracticeExam {
  id: string;
  title: string;
  subject: string;
  type: 'full-length' | 'chapter-wise' | 'topic-wise' | 'mock';
  duration: number;
  questions: number;
  difficulty: 'easy' | 'medium' | 'hard';
  attempted: boolean;
  score?: number;
  rank?: number;
  lastAttempted?: string;
  participants?: number;
  tags: string[];
  topScore?: number;
  averageScore?: number;
}

const EnhancedPracticeExamsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const subjects = [
    { name: 'Physics', color: '#3b82f6', attempted: 12, total: 20, avgScore: 78, bestScore: 92 },
    { name: 'Chemistry', color: '#10b981', attempted: 8, total: 16, avgScore: 72, bestScore: 85 },
    { name: 'Biology', color: '#8b5cf6', attempted: 15, total: 24, avgScore: 85, bestScore: 96 }
  ];

  const practiceExams: PracticeExam[] = [
    {
      id: '1',
      title: 'NEET Physics Full Mock Test',
      subject: 'Physics',
      type: 'full-length',
      duration: 180,
      questions: 45,
      difficulty: 'hard',
      attempted: true,
      score: 85,
      rank: 245,
      lastAttempted: '2 days ago',
      participants: 15420,
      tags: ['mechanics', 'optics', 'electricity'],
      topScore: 100,
      averageScore: 67
    },
    {
      id: '2',
      title: 'Organic Chemistry Chapter Test',
      subject: 'Chemistry',
      type: 'chapter-wise',
      duration: 90,
      questions: 25,
      difficulty: 'medium',
      attempted: false,
      participants: 8930,
      tags: ['reactions', 'mechanisms', 'isomerism'],
      topScore: 96,
      averageScore: 58
    },
    {
      id: '3',
      title: 'Cell Biology Mock Exam',
      subject: 'Biology',
      type: 'mock',
      duration: 120,
      questions: 35,
      difficulty: 'easy',
      attempted: true,
      score: 92,
      rank: 89,
      lastAttempted: '1 day ago',
      participants: 12050,
      tags: ['cell structure', 'organelles', 'division'],
      topScore: 100,
      averageScore: 74
    },
    {
      id: '4',
      title: 'Thermodynamics Topic Test',
      subject: 'Physics',
      type: 'topic-wise',
      duration: 60,
      questions: 20,
      difficulty: 'hard',
      attempted: false,
      participants: 5640,
      tags: ['heat', 'entropy', 'cycles'],
      topScore: 95,
      averageScore: 52
    },
    {
      id: '5',
      title: 'Plant Physiology Mock',
      subject: 'Biology',
      type: 'chapter-wise',
      duration: 100,
      questions: 30,
      difficulty: 'medium',
      attempted: true,
      score: 78,
      rank: 1240,
      lastAttempted: '5 days ago',
      participants: 9870,
      tags: ['photosynthesis', 'respiration', 'transport'],
      topScore: 97,
      averageScore: 65
    }
  ];

  const filteredExams = practiceExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || exam.subject === selectedSubject;
    const matchesType = selectedType === 'all' || exam.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'attempted' && exam.attempted) ||
                         (selectedStatus === 'pending' && !exam.attempted);
    
    return matchesSearch && matchesSubject && matchesType && matchesStatus;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-length': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'chapter-wise': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'topic-wise': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'mock': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Exams</p>
                <p className="text-2xl font-bold text-blue-800">60</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Attempted</p>
                <p className="text-2xl font-bold text-green-800">35</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Avg Score</p>
                <p className="text-2xl font-bold text-purple-800">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Best Rank</p>
                <p className="text-2xl font-bold text-orange-800">#89</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.name} className="border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: subject.color }}
                  />
                  {subject.name}
                </span>
                <Badge variant="outline">{Math.round((subject.attempted / subject.total) * 100)}%</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{subject.attempted}/{subject.total}</span>
                </div>
                <Progress value={(subject.attempted / subject.total) * 100} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Avg Score</span>
                  <p className="font-bold text-blue-600">{subject.avgScore}%</p>
                </div>
                <div>
                  <span className="text-gray-500">Best Score</span>
                  <p className="font-bold text-green-600">{subject.bestScore}%</p>
                </div>
              </div>
              
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => setActiveTab(subject.name.toLowerCase())}
              >
                <Play className="mr-2 h-4 w-4" />
                Take {subject.name} Test
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const ExamGrid = ({ exams }: { exams: PracticeExam[] }) => (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {exams.map((exam) => (
        <Card 
          key={exam.id} 
          className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300"
          onClick={() => navigate(`/dashboard/student/practice-exam/${exam.id}`)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex gap-2">
                <Badge 
                  variant="outline" 
                  className={getDifficultyColor(exam.difficulty)}
                >
                  {exam.difficulty}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={getTypeColor(exam.type)}
                >
                  {exam.type}
                </Badge>
              </div>
              {exam.attempted && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
            </div>
            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
              {exam.title}
            </CardTitle>
            <p className="text-sm text-gray-600">{exam.subject}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{exam.duration} min</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Target className="h-4 w-4" />
                <span>{exam.questions} questions</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Users className="h-4 w-4" />
                <span>{exam.participants?.toLocaleString()}</span>
              </div>
              {exam.score && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className={`font-medium ${getScoreColor(exam.score)}`}>
                    {exam.score}%
                  </span>
                </div>
              )}
            </div>

            {exam.attempted && exam.score && exam.rank && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Your Score</span>
                    <p className={`font-bold ${getScoreColor(exam.score)}`}>{exam.score}%</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Your Rank</span>
                    <p className="font-bold text-purple-600">#{exam.rank}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Top Score</span>
                    <p className="font-bold text-green-600">{exam.topScore}%</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Average</span>
                    <p className="font-bold text-gray-600">{exam.averageScore}%</p>
                  </div>
                </div>
              </div>
            )}

            {exam.lastAttempted && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>Last attempted {exam.lastAttempted}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              {exam.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                size="sm" 
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/dashboard/student/practice-exam/${exam.id}/start`);
                }}
              >
                <Play className="mr-1 h-3 w-3" />
                {exam.attempted ? 'Retake' : 'Start'}
              </Button>
              {exam.attempted && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/student/practice-exam/${exam.id}/results`);
                  }}
                >
                  <BarChart3 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-green-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-green-900/10">
      <Helmet>
        <title>Practice Exams - PREPZR</title>
        <meta name="description" content="Take NEET practice exams and mock tests" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Practice Exams
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Test your knowledge with comprehensive mock exams and track your progress
          </p>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search practice exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-length">Full Length</SelectItem>
                  <SelectItem value="chapter-wise">Chapter Wise</SelectItem>
                  <SelectItem value="topic-wise">Topic Wise</SelectItem>
                  <SelectItem value="mock">Mock Test</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="attempted">Attempted</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="biology">Biology</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="physics" className="mt-6">
            <ExamGrid 
              exams={filteredExams.filter(e => e.subject === 'Physics')} 
            />
          </TabsContent>

          <TabsContent value="chemistry" className="mt-6">
            <ExamGrid 
              exams={filteredExams.filter(e => e.subject === 'Chemistry')} 
            />
          </TabsContent>

          <TabsContent value="biology" className="mt-6">
            <ExamGrid 
              exams={filteredExams.filter(e => e.subject === 'Biology')} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedPracticeExamsPage;
