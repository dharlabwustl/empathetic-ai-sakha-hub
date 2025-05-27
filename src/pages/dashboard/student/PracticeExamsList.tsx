
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  Filter, 
  Play, 
  Clock,
  Target,
  Star,
  TrendingUp,
  Award,
  CheckCircle,
  AlertCircle,
  BarChart3
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PracticeExamsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const practiceExams = [
    {
      id: '1',
      title: 'JEE Main Physics Mock Test 1',
      subject: 'Physics',
      totalQuestions: 30,
      duration: 90,
      difficulty: 'medium',
      lastScore: 85,
      bestScore: 92,
      attempts: 3,
      avgScore: 88,
      status: 'completed',
      type: 'mock',
      examPattern: 'JEE Main'
    },
    {
      id: '2',
      title: 'Chemistry Full Length Test',
      subject: 'Chemistry',
      totalQuestions: 60,
      duration: 180,
      difficulty: 'hard',
      lastScore: 0,
      bestScore: 0,
      attempts: 0,
      avgScore: 0,
      status: 'new',
      type: 'full-length',
      examPattern: 'JEE Advanced'
    },
    {
      id: '3',
      title: 'Biology Chapter-wise Test',
      subject: 'Biology',
      totalQuestions: 25,
      duration: 60,
      difficulty: 'easy',
      lastScore: 96,
      bestScore: 96,
      attempts: 2,
      avgScore: 94,
      status: 'completed',
      type: 'chapter',
      examPattern: 'NEET'
    },
    {
      id: '4',
      title: 'Mathematics Problem Solving',
      subject: 'Mathematics',
      totalQuestions: 40,
      duration: 120,
      difficulty: 'hard',
      lastScore: 72,
      bestScore: 78,
      attempts: 4,
      avgScore: 75,
      status: 'in-progress',
      type: 'sectional',
      examPattern: 'JEE Main'
    },
    {
      id: '5',
      title: 'Physics Conceptual Test',
      subject: 'Physics',
      totalQuestions: 20,
      duration: 45,
      difficulty: 'medium',
      lastScore: 0,
      bestScore: 0,
      attempts: 0,
      avgScore: 0,
      status: 'new',
      type: 'conceptual',
      examPattern: 'Custom'
    },
    {
      id: '6',
      title: 'Full JEE Mock Exam',
      subject: 'All Subjects',
      totalQuestions: 90,
      duration: 180,
      difficulty: 'hard',
      lastScore: 78,
      bestScore: 85,
      attempts: 2,
      avgScore: 82,
      status: 'completed',
      type: 'full-length',
      examPattern: 'JEE Main'
    }
  ];

  const stats = {
    totalExams: practiceExams.length,
    completedExams: practiceExams.filter(e => e.status === 'completed').length,
    averageScore: Math.round(practiceExams.filter(e => e.attempts > 0).reduce((sum, e) => sum + e.avgScore, 0) / practiceExams.filter(e => e.attempts > 0).length) || 0,
    bestScore: Math.max(...practiceExams.map(e => e.bestScore)),
    totalAttempts: practiceExams.reduce((sum, e) => sum + e.attempts, 0),
    improvement: 12
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'new': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Physics': 'bg-blue-50 text-blue-700 border-blue-200',
      'Chemistry': 'bg-purple-50 text-purple-700 border-purple-200',
      'Biology': 'bg-green-50 text-green-700 border-green-200',
      'Mathematics': 'bg-orange-50 text-orange-700 border-orange-200',
      'All Subjects': 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'new': return <Star className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  const filteredExams = practiceExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.examPattern.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'new' && exam.status === 'new') ||
                         (selectedFilter === 'completed' && exam.status === 'completed') ||
                         (selectedFilter === 'in-progress' && exam.status === 'in-progress') ||
                         (selectedFilter === exam.subject.toLowerCase()) ||
                         (selectedFilter === exam.type);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Practice Exam Center
            </h1>
            <p className="text-gray-600 mt-2">Simulate real exam conditions and track your performance</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/dashboard/student/practice-exam/create')} className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <FileText className="h-4 w-4 mr-2" />
              Create Custom Test
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam/analytics')}>
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.totalExams}</div>
              <div className="text-sm text-gray-600">Total Exams</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.completedExams}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.averageScore}%</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.bestScore}%</div>
              <div className="text-sm text-gray-600">Best Score</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{stats.totalAttempts}</div>
              <div className="text-sm text-gray-600">Attempts</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">+{stats.improvement}%</div>
              <div className="text-sm text-gray-600">Improvement</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search practice exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'new', 'in-progress', 'completed', 'physics', 'chemistry', 'biology', 'mathematics', 'mock', 'full-length'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className={selectedFilter === filter ? "bg-gradient-to-r from-indigo-600 to-purple-600" : "bg-white/80 backdrop-blur-sm border-0 shadow-lg"}
              >
                <Filter className="h-3 w-3 mr-1" />
                {filter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Practice Exams Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredExams.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => handleStartExam(exam.id)}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 ${exam.difficulty === 'hard' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 
                  exam.difficulty === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 
                  'bg-gradient-to-r from-green-500 to-emerald-500'}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {exam.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant="outline" className={getSubjectColor(exam.subject)}>
                          {exam.subject}
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                          {exam.difficulty}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(exam.status)}>
                          {getStatusIcon(exam.status)}
                          <span className="ml-1">{exam.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                    </div>
                    {exam.bestScore > 0 && (
                      <div className={`px-2 py-1 rounded-lg text-sm font-bold ${getScoreColor(exam.bestScore)}`}>
                        {exam.bestScore}%
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Exam Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span>{exam.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{exam.duration} min</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <strong>Pattern:</strong> {exam.examPattern}
                  </div>

                  {/* Performance Stats */}
                  {exam.attempts > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Performance</span>
                        <span className="font-medium">Avg: {exam.avgScore}% | Best: {exam.bestScore}%</span>
                      </div>
                      <Progress value={exam.avgScore} className="h-2" />
                      <div className="text-xs text-gray-500">
                        Attempts: {exam.attempts} | Last Score: {exam.lastScore}%
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartExam(exam.id);
                    }}
                  >
                    {exam.status === 'new' ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Test
                      </>
                    ) : exam.status === 'in-progress' ? (
                      <>
                        <Target className="h-4 w-4 mr-2" />
                        Continue
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Retake
                      </>
                    )}
                  </Button>

                  {exam.attempts > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/student/practice-exam/${exam.id}/review`);
                      }}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analysis
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredExams.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No practice exams found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {setSearchTerm(''); setSelectedFilter('all');}}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PracticeExamsList;
