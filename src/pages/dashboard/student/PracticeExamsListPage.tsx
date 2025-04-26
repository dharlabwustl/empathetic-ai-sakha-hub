
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Clock, Calendar, FileText, CheckCircle, Award, BookOpen, Tag, Filter, Clock3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PracticeExam } from '@/components/dashboard/student/practice-exams/PracticeExamCard';

// Mock data
const mockExams: PracticeExam[] = [
  {
    id: '1',
    title: 'JEE Physics Mock Test',
    subject: 'Physics',
    topic: 'Mechanics',
    linkedConcept: 'Newton\'s Laws',
    questionCount: 30,
    duration: 60,
    difficulty: 'medium',
    status: 'not-started'
  },
  {
    id: '2',
    title: 'NEET Biology Full Test',
    subject: 'Biology',
    topic: 'Human Physiology',
    linkedConcept: 'Circulatory System',
    questionCount: 90,
    duration: 120,
    difficulty: 'hard',
    status: 'completed',
    score: 76,
    completedAt: '2025-04-10'
  },
  {
    id: '3',
    title: 'JEE Chemistry: Organic',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    linkedConcept: 'Functional Groups',
    questionCount: 20,
    duration: 45,
    difficulty: 'easy',
    status: 'not-started'
  },
  {
    id: '4',
    title: 'Full Mock Test 1',
    subject: 'Combined',
    topic: 'Multiple Topics',
    questionCount: 90,
    duration: 180,
    difficulty: 'hard',
    status: 'completed',
    score: 68,
    completedAt: '2025-04-05'
  },
  {
    id: '5',
    title: 'Mathematics: Calculus',
    subject: 'Mathematics',
    topic: 'Calculus',
    linkedConcept: 'Limits and Derivatives',
    questionCount: 15,
    duration: 30,
    difficulty: 'medium',
    status: 'in-progress'
  }
];

const PracticeExamsListPage: React.FC = () => {
  const [tab, setTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  
  // Filter exams based on tab, search, subject, and difficulty
  const filteredExams = mockExams
    .filter(exam => {
      if (tab === 'upcoming') return exam.status !== 'completed';
      if (tab === 'completed') return exam.status === 'completed';
      return true;
    })
    .filter(exam => {
      if (!searchQuery) return true;
      return exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
             exam.topic?.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter(exam => {
      if (!selectedSubject) return true;
      return exam.subject === selectedSubject;
    })
    .filter(exam => {
      if (!selectedDifficulty) return true;
      return exam.difficulty === selectedDifficulty;
    });
  
  // Get unique subjects
  const subjects = Array.from(new Set(mockExams
    .map(exam => exam.subject)
  ));
  
  // Stats
  const totalExams = mockExams.length;
  const completedExams = mockExams.filter(exam => exam.status === 'completed').length;
  const completionRate = totalExams > 0 ? (completedExams / totalExams) * 100 : 0;
  const averageScore = mockExams
    .filter(exam => exam.status === 'completed' && exam.score !== undefined)
    .reduce((sum, exam) => sum + (exam.score || 0), 0) / completedExams || 0;
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <Link to="/dashboard/student/overview" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
            </Link>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold">Practice Tests</h1>
                <p className="text-gray-600">Sharpen your skills with targeted practice tests</p>
              </div>
              <Button className="mt-2 sm:mt-0">Create Custom Test</Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Total Tests</p>
                  <p className="text-4xl font-bold">{totalExams}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Completion Rate</p>
                  <p className="text-4xl font-bold">{completionRate.toFixed(0)}%</p>
                  <Progress value={completionRate} className="mt-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Average Score</p>
                  <p className="text-4xl font-bold">{averageScore.toFixed(0)}%</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Coming Up</p>
                  <p className="text-4xl font-bold">{mockExams.filter(exam => exam.status !== 'completed').length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="relative w-full md:w-auto md:flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search tests..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1">
              <Button 
                variant="outline" 
                size="sm" 
                className={!selectedSubject ? "bg-blue-50 text-blue-600 border-blue-200" : ""} 
                onClick={() => setSelectedSubject(null)}
              >
                All Subjects
              </Button>
              {subjects.map(subject => (
                <Button
                  key={subject}
                  variant="outline"
                  size="sm"
                  className={selectedSubject === subject ? "bg-blue-50 text-blue-600 border-blue-200" : ""}
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Difficulty Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Button 
              variant="outline" 
              size="sm" 
              className={!selectedDifficulty ? "bg-blue-50 text-blue-600 border-blue-200" : ""} 
              onClick={() => setSelectedDifficulty(null)}
            >
              All Difficulty
            </Button>
            {['easy', 'medium', 'hard'].map(difficulty => (
              <Button
                key={difficulty}
                variant="outline"
                size="sm"
                className={selectedDifficulty === difficulty ? `${getDifficultyColor(difficulty)}` : ""}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Button>
            ))}
            
            <div className="ml-auto">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter size={14} />
                More Filters
              </Button>
            </div>
          </div>
          
          {/* Tabs and Exams List */}
          <Tabs value={tab} onValueChange={(value) => setTab(value as 'upcoming' | 'completed' | 'all')}>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Tests</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              {filteredExams.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <FileText className="mx-auto text-gray-300 mb-3" size={48} />
                    <h3 className="text-xl font-medium mb-1">No tests found</h3>
                    <p className="text-gray-500">
                      {tab === 'upcoming' ? "You don't have any upcoming tests matching your search." : 
                       tab === 'completed' ? "You haven't completed any tests matching your search yet." :
                       "No tests match your search criteria."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {filteredExams.map((exam) => (
                    <ExamCard key={exam.id} exam={exam} />
                  ))}
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

const ExamCard = ({ exam }: { exam: PracticeExam }) => {
  // Format functions
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-50 text-green-600 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-purple-50 text-purple-600 border-purple-200';
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`transition-shadow hover:shadow-md ${exam.status === 'completed' ? 'bg-gray-50' : ''}`}>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 mb-1">
                <Badge variant={exam.status === 'completed' ? "outline" : "default"}>
                  {exam.status === 'completed' ? "Completed" : 
                   exam.status === 'in-progress' ? "In Progress" : "Not Started"}
                </Badge>
                
                <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                  {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
                </Badge>
                
                {exam.subject && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <BookOpen size={12} />
                    {exam.subject}
                  </Badge>
                )}
                
                {exam.topic && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Tag size={12} />
                    {exam.topic}
                  </Badge>
                )}
              </div>
              
              <h3 className="text-lg font-medium">{exam.title}</h3>
              
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{exam.duration} minutes</span>
                </div>
                
                {exam.status === 'completed' && exam.completedAt && (
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Completed {formatDate(exam.completedAt)}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <FileText size={14} />
                  <span>{exam.questionCount} questions</span>
                </div>
                
                {exam.status === 'completed' && exam.score !== undefined && (
                  <div className="flex items-center gap-1">
                    <Award size={14} />
                    <span>Score: {exam.score}%</span>
                  </div>
                )}
                
                {exam.status !== 'completed' && (
                  <div className="flex items-center gap-1">
                    <CheckCircle size={14} />
                    <span>Attempts available: 3</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              {exam.status === 'completed' ? (
                <div className="flex gap-2">
                  <Link to={`/dashboard/student/exams/${exam.id}/review`}>
                    <Button variant="outline" size="sm">Review</Button>
                  </Link>
                  <Link to={`/dashboard/student/exams/${exam.id}`}>
                    <Button size="sm">Retry</Button>
                  </Link>
                </div>
              ) : (
                <Link to={`/dashboard/student/exams/${exam.id}`}>
                  <Button size="sm">Start Test</Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PracticeExamsListPage;
