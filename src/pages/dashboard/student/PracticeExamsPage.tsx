
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Search, Clock, Calendar, File, CheckCircle, Award } from 'lucide-react';
import { motion } from 'framer-motion';

type ExamType = 'mock' | 'subject' | 'chapter' | 'full';
type ExamDifficulty = 'easy' | 'medium' | 'hard' | 'mixed';

interface PracticeExam {
  id: string;
  title: string;
  type: ExamType;
  subject?: string;
  chapter?: string;
  difficulty: ExamDifficulty;
  duration: number; // minutes
  questionsCount: number;
  deadline?: string;
  completed: boolean;
  score?: number;
  lastAttempt?: string;
  attemptsLeft?: number;
}

const mockExams: PracticeExam[] = [
  {
    id: '1',
    title: 'JEE Physics Mock Test',
    type: 'subject',
    subject: 'Physics',
    difficulty: 'medium',
    duration: 60,
    questionsCount: 30,
    deadline: '2025-05-15',
    completed: false,
    attemptsLeft: 3
  },
  {
    id: '2',
    title: 'NEET Biology Full Test',
    type: 'subject',
    subject: 'Biology',
    difficulty: 'hard',
    duration: 120,
    questionsCount: 90,
    deadline: '2025-05-20',
    completed: true,
    score: 76,
    lastAttempt: '2025-04-10'
  },
  {
    id: '3',
    title: 'JEE Chemistry: Organic',
    type: 'chapter',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry',
    difficulty: 'easy',
    duration: 45,
    questionsCount: 20,
    deadline: '2025-04-30',
    completed: false,
    attemptsLeft: 5
  },
  {
    id: '4',
    title: 'Full Mock Test 1',
    type: 'full',
    difficulty: 'mixed',
    duration: 180,
    questionsCount: 90,
    deadline: '2025-05-05',
    completed: true,
    score: 68,
    lastAttempt: '2025-04-05'
  },
  {
    id: '5',
    title: 'Mathematics: Calculus',
    type: 'chapter',
    subject: 'Mathematics',
    chapter: 'Calculus',
    difficulty: 'hard',
    duration: 30,
    questionsCount: 15,
    deadline: '2025-04-28',
    completed: false,
    attemptsLeft: 2
  }
];

const PracticeExamsPage = () => {
  const [tab, setTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  // Filter exams based on tab and search
  const filteredExams = mockExams
    .filter(exam => {
      if (tab === 'upcoming') return !exam.completed;
      if (tab === 'completed') return exam.completed;
      return true;
    })
    .filter(exam => {
      if (!searchQuery) return true;
      return exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             exam.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
             exam.chapter?.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter(exam => {
      if (!selectedSubject) return true;
      return exam.subject === selectedSubject;
    });
  
  // Get unique subjects
  const subjects = Array.from(new Set(mockExams
    .filter(exam => exam.subject)
    .map(exam => exam.subject as string)
  ));
  
  // Stats
  const totalExams = mockExams.length;
  const completedExams = mockExams.filter(exam => exam.completed).length;
  const completionRate = (completedExams / totalExams) * 100;
  const averageScore = mockExams
    .filter(exam => exam.completed && exam.score)
    .reduce((sum, exam) => sum + (exam.score || 0), 0) / completedExams || 0;
  
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
                <h1 className="text-3xl font-bold">Practice Exams</h1>
                <p className="text-gray-600">Prepare for your exams with targeted practice tests</p>
              </div>
              <Button className="mt-2 sm:mt-0">Create Custom Test</Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Total Exams</p>
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
                  <p className="text-4xl font-bold">{mockExams.filter(exam => !exam.completed).length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="relative w-full md:w-auto md:flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search exams..." 
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
                All
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
          
          {/* Tabs and Exams List */}
          <Tabs value={tab} onValueChange={(value) => setTab(value as 'upcoming' | 'completed' | 'all')}>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Exams</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              {filteredExams.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <File className="mx-auto text-gray-300 mb-3" size={48} />
                    <h3 className="text-xl font-medium mb-1">No exams found</h3>
                    <p className="text-gray-500">
                      {tab === 'upcoming' ? "You don't have any upcoming exams matching your search." : 
                       tab === 'completed' ? "You haven't completed any exams matching your search yet." :
                       "No exams match your search criteria."}
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
  
  const getDifficultyColor = (difficulty: ExamDifficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-50 text-green-600 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-600 border-red-200';
      case 'mixed': return 'bg-purple-50 text-purple-600 border-purple-200';
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`transition-shadow hover:shadow-md ${exam.completed ? 'bg-gray-50' : ''}`}>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 mb-1">
                <Badge variant={exam.completed ? "outline" : "default"}>
                  {exam.completed ? "Completed" : "Pending"}
                </Badge>
                
                <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                  {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
                </Badge>
                
                <Badge variant="outline">
                  {exam.type === 'mock' ? 'Mock Test' : 
                   exam.type === 'subject' ? `${exam.subject} Test` :
                   exam.type === 'chapter' ? `${exam.chapter} (${exam.subject})` :
                   'Full Length Test'}
                </Badge>
              </div>
              
              <h3 className="text-lg font-medium">{exam.title}</h3>
              
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{exam.duration} minutes</span>
                </div>
                
                {exam.deadline && !exam.completed && (
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Due {formatDate(exam.deadline)}</span>
                  </div>
                )}
                
                {exam.completed && exam.lastAttempt && (
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Completed {formatDate(exam.lastAttempt)}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <File size={14} />
                  <span>{exam.questionsCount} questions</span>
                </div>
                
                {exam.completed && exam.score !== undefined && (
                  <div className="flex items-center gap-1">
                    <Award size={14} />
                    <span>Score: {exam.score}%</span>
                  </div>
                )}
                
                {!exam.completed && exam.attemptsLeft !== undefined && (
                  <div className="flex items-center gap-1">
                    <CheckCircle size={14} />
                    <span>{exam.attemptsLeft} attempts left</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              {exam.completed ? (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Review</Button>
                  <Button size="sm">Retry</Button>
                </div>
              ) : (
                <Button size="sm">Start Exam</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PracticeExamsPage;
