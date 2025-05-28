
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Plus, 
  PlayCircle, 
  BarChart3, 
  Target,
  Clock,
  TrendingUp,
  Star,
  Filter,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const RedesignedPracticeExamsLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const overviewData = {
    type: "Practice Exams" as const,
    title: "NEET Practice Exams Overview",
    subjects: [
      { name: "Physics", completed: 8, total: 12, progress: 67, efficiency: 82, studyTime: 240 },
      { name: "Chemistry", completed: 6, total: 10, progress: 60, efficiency: 75, studyTime: 180 },
      { name: "Biology", completed: 10, total: 14, progress: 71, efficiency: 88, studyTime: 280 }
    ],
    totalStudyTime: 700,
    overallProgress: 66,
    suggestions: [
      "Focus on Physics numerical problems in practice tests",
      "Chemistry organic section needs more mock exam practice",
      "Biology scores show consistent improvement - keep practicing"
    ]
  };

  const practiceExams = [
    {
      id: '1',
      title: "NEET Physics Mock Test #1",
      subject: "Physics",
      weightage: "25%",
      questionCount: 45,
      duration: 180,
      difficulty: "Medium",
      lastAttempted: "2 days ago",
      bestScore: 85,
      topic: "Mechanics & Optics",
      examType: "NEET",
      status: "completed",
      attempts: 3
    },
    {
      id: '2',
      title: "Chemistry Full Length Test",
      subject: "Chemistry", 
      weightage: "25%",
      questionCount: 45,
      duration: 180,
      difficulty: "Hard",
      lastAttempted: "Never",
      bestScore: null,
      topic: "Organic & Inorganic",
      examType: "NEET",
      status: "pending",
      attempts: 0
    },
    {
      id: '3',
      title: "Biology Comprehensive Exam",
      subject: "Biology",
      weightage: "50%",
      questionCount: 90,
      duration: 180,
      difficulty: "Medium",
      lastAttempted: "1 day ago",
      bestScore: 78,
      topic: "Botany & Zoology",
      examType: "NEET",
      status: "in-progress",
      attempts: 1
    },
    {
      id: '4',
      title: "Mixed Subject Mock Test",
      subject: "All Subjects",
      weightage: "100%",
      questionCount: 180,
      duration: 180,
      difficulty: "Hard",
      lastAttempted: "5 days ago",
      bestScore: 72,
      topic: "Complete NEET Syllabus",
      examType: "NEET",
      status: "completed",
      attempts: 2
    }
  ];

  const subjects = ['all', 'Physics', 'Chemistry', 'Biology', 'All Subjects'];

  const getFilteredExams = () => {
    return practiceExams.filter(exam => {
      const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exam.topic.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || exam.subject === selectedSubject;
      const matchesTab = activeTab === 'all' || exam.status === activeTab;
      return matchesSearch && matchesSubject && matchesTab;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'; 
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <PlayCircle className="h-4 w-4 text-blue-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return 'text-gray-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const navigateToExam = (examId: string, action: 'start' | 'review') => {
    const targetRoute = `/dashboard/student/practice-exam/${examId}/${action}`;
    console.log(`🔥 NAVIGATION TO PRACTICE EXAM: ${targetRoute}`);
    navigate(targetRoute);
  };

  const getTabCounts = () => {
    const filtered = practiceExams.filter(exam => {
      const matchesSubject = selectedSubject === 'all' || exam.subject === selectedSubject;
      return matchesSubject;
    });
    
    return {
      all: filtered.length,
      pending: filtered.filter(e => e.status === 'pending').length,
      'in-progress': filtered.filter(e => e.status === 'in-progress').length,
      completed: filtered.filter(e => e.status === 'completed').length
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-indigo-900/10">
      <Helmet>
        <title>Practice Exams - PREPZR</title>
        <meta name="description" content="NEET practice exams for comprehensive assessment" />
      </Helmet>

      {/* Overview Section */}
      <div className="p-6">
        <OverviewSection {...overviewData} />
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Practice Exams
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive practice tests with detailed analytics and performance tracking
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search practice exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {subjects.map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubject(subject)}
                className="capitalize"
              >
                {subject === 'All Subjects' ? 'Mixed' : subject}
              </Button>
            ))}
          </div>
          
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Exam
          </Button>
        </motion.div>

        {/* Status Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                All ({tabCounts.all})
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Pending ({tabCounts.pending})
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                In Progress ({tabCounts['in-progress']})
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                Completed ({tabCounts.completed})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {/* Practice Exams Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {getFilteredExams().map((exam, index) => (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="w-full"
                  >
                    <Card className="h-80 w-full flex flex-col hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-base font-semibold line-clamp-2">
                            {exam.title}
                          </CardTitle>
                          <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                            {exam.difficulty}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {exam.subject}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                            {exam.weightage}
                          </Badge>
                          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 text-xs flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {exam.examType}
                          </Badge>
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            {getStatusIcon(exam.status)}
                            {exam.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{exam.topic}</p>
                      </CardHeader>
                      
                      <CardContent className="space-y-3 flex-grow">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">{exam.questionCount} questions</span>
                          <span className="text-gray-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {exam.duration}min
                          </span>
                        </div>
                        
                        {exam.bestScore && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium">Best Score</span>
                              <span className={`text-xs font-bold ${getScoreColor(exam.bestScore)}`}>
                                {exam.bestScore}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  exam.bestScore >= 80 ? 'bg-green-500' :
                                  exam.bestScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${exam.bestScore}%` }}
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {exam.attempts} attempts
                          </span>
                          <span className="text-gray-500">
                            Last: {exam.lastAttempted}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                          {exam.status === 'completed' ? (
                            <>
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => navigateToExam(exam.id, 'review')}
                                className="text-xs"
                              >
                                <BarChart3 className="h-3 w-3 mr-1" />
                                Review
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => navigateToExam(exam.id, 'start')}
                                className="text-xs bg-blue-600 hover:bg-blue-700"
                              >
                                <PlayCircle className="h-3 w-3 mr-1" />
                                Retake
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => navigateToExam(exam.id, 'start')}
                                className="text-xs"
                              >
                                <PlayCircle className="h-3 w-3 mr-1" />
                                {exam.status === 'in-progress' ? 'Continue' : 'Start'}
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => navigateToExam(exam.id, 'start')}
                                className="text-xs bg-blue-600 hover:bg-blue-700"
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                Take Test
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* No practice exams found */}
              {getFilteredExams().length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No practice exams found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Exam
                  </Button>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default RedesignedPracticeExamsLandingPage;
