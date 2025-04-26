
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { ArrowLeft, Filter, Search, FileText, PieChart } from 'lucide-react';
import PracticeExamCard, { PracticeExam } from '@/components/dashboard/student/practice-exams/PracticeExamCard';

// Sample data - in production this would come from an API
const mockExams: PracticeExam[] = [
  {
    id: 'exam1',
    title: 'Physics Mechanics Test',
    subject: 'Physics',
    topic: 'Mechanics',
    questionCount: 15,
    duration: 30,
    difficulty: 'easy',
    status: 'not-started',
  },
  {
    id: 'exam2',
    title: 'Organic Chemistry Quiz',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    questionCount: 20,
    duration: 45,
    difficulty: 'medium',
    status: 'completed',
    score: 85,
    completedAt: '2025-04-20',
  },
  {
    id: 'exam3',
    title: 'Calculus Practice Test',
    subject: 'Mathematics',
    topic: 'Calculus',
    questionCount: 25,
    duration: 60,
    difficulty: 'hard',
    status: 'in-progress',
  },
  {
    id: 'exam4',
    title: 'Electrostatics Quiz',
    subject: 'Physics',
    topic: 'Electrostatics',
    questionCount: 15,
    duration: 30,
    difficulty: 'medium',
    status: 'not-started',
  },
  {
    id: 'exam5',
    title: 'Algebra Test',
    subject: 'Mathematics',
    topic: 'Algebra',
    questionCount: 20,
    duration: 45,
    difficulty: 'easy',
    status: 'completed',
    score: 92,
    completedAt: '2025-04-15',
  },
];

const PracticeExamsListPage: React.FC = () => {
  const [filters, setFilters] = useState({
    subject: '',
    topic: '',
    difficulty: '',
    status: '',
    search: ''
  });
  
  const [activeTab, setActiveTab] = useState<'all' | 'analysis'>('all');

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredExams = mockExams.filter(exam => {
    if (filters.subject && exam.subject !== filters.subject) return false;
    if (filters.topic && exam.topic !== filters.topic) return false;
    if (filters.difficulty && exam.difficulty !== filters.difficulty) return false;
    if (filters.status && exam.status !== filters.status) return false;
    if (filters.search && !exam.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  // Compute some analytics for the analysis tab
  const totalExams = mockExams.length;
  const completedExams = mockExams.filter(e => e.status === 'completed').length;
  const averageScore = mockExams
    .filter(e => e.status === 'completed' && e.score)
    .reduce((sum, exam) => sum + (exam.score || 0), 0) / 
    (mockExams.filter(e => e.status === 'completed' && e.score).length || 1);

  // Extract unique subjects for analysis
  const subjects = [...new Set(mockExams.map(e => e.subject))];
  const subjectStats = subjects.map(subject => {
    const subjectExams = mockExams.filter(e => e.subject === subject);
    const completed = subjectExams.filter(e => e.status === 'completed').length;
    const avgScore = subjectExams
      .filter(e => e.status === 'completed' && e.score)
      .reduce((sum, exam) => sum + (exam.score || 0), 0) / 
      (subjectExams.filter(e => e.status === 'completed' && e.score).length || 1);
    
    return {
      subject,
      total: subjectExams.length,
      completed,
      avgScore: Math.round(avgScore),
      percentCompleted: Math.round((completed / subjectExams.length) * 100)
    };
  });

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/student/practice-exam" className="hover:text-blue-600">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FileText className="text-blue-600" />
                Practice Tests
              </h1>
              <p className="text-gray-500">Browse and filter all available practice tests</p>
            </div>
          </div>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'all' | 'analysis')}
          className="w-full"
        >
          <TabsList className="mb-6 w-full flex justify-start">
            <TabsTrigger value="all" className="flex-1 max-w-[200px]">All Tests</TabsTrigger>
            <TabsTrigger value="analysis" className="flex-1 max-w-[200px]">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {/* Filters Section */}
            <Card className="p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <Input
                    placeholder="Search tests..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    icon={<Search className="h-4 w-4" />}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Select onValueChange={(value) => handleFilterChange('subject', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Subjects</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <Select onValueChange={(value) => handleFilterChange('difficulty', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Difficulties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Difficulties</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="not-started">Not Started</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Exams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExams.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No practice tests found</p>
                </div>
              ) : (
                filteredExams.map((exam) => (
                  <PracticeExamCard key={exam.id} exam={exam} />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="analysis">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Overall Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Total Tests</p>
                      <p className="text-3xl font-bold">{totalExams}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Completed</p>
                      <div className="flex items-center">
                        <p className="text-3xl font-bold mr-2">{completedExams}</p>
                        <span className="text-sm text-gray-500">
                          ({Math.round((completedExams / totalExams) * 100)}%)
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Average Score</p>
                      <p className="text-3xl font-bold">{Math.round(averageScore)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Subject-wise Analysis */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Subject Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectStats.map(stat => (
                      <div key={stat.subject} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium">{stat.subject}</p>
                          <p className="text-sm">{stat.completed}/{stat.total} completed</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${stat.percentCompleted}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <p className="text-sm text-gray-500">Progress: {stat.percentCompleted}%</p>
                          <p className="text-sm text-gray-500">Avg. Score: {stat.avgScore}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Difficulty Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Difficulty Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['easy', 'medium', 'hard'].map(difficulty => {
                      const tests = mockExams.filter(e => e.difficulty === difficulty);
                      const completed = tests.filter(e => e.status === 'completed').length;
                      return (
                        <div key={difficulty} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between">
                            <p className="font-medium capitalize">{difficulty}</p>
                            <p className="text-sm">{completed}/{tests.length} tests</p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div 
                              className={`h-2.5 rounded-full ${
                                difficulty === 'easy' ? 'bg-green-500' :
                                difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: tests.length ? `${(completed / tests.length) * 100}%` : '0%' }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PracticeExamsListPage;
