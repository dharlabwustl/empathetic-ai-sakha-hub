
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import ContentFeedbackButton from '@/components/dashboard/student/feedback/ContentFeedbackButton';
import { FileText, Clock, Target, Plus, Search, TrendingUp, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

// Mock practice exam data
const mockPracticeExams = [
  {
    id: "1",
    title: "NEET Physics Mock Test 1",
    subject: "Physics",
    duration: 180,
    questions: 45,
    difficulty: "Medium",
    attempted: false,
    status: "today",
    type: "Full Length"
  },
  {
    id: "2",
    title: "NEET Chemistry Practice Set",
    subject: "Chemistry",
    duration: 180,
    questions: 45,
    difficulty: "Hard",
    attempted: true,
    score: 78,
    status: "completed",
    type: "Subject Test"
  },
  {
    id: "3",
    title: "NEET Biology Comprehensive",
    subject: "Biology",
    duration: 180,
    questions: 90,
    difficulty: "Medium",
    attempted: false,
    status: "pending",
    type: "Chapter Test"
  },
  {
    id: "4",
    title: "NEET Full Mock Test 2024",
    subject: "All Subjects",
    duration: 180,
    questions: 180,
    difficulty: "Hard",
    attempted: false,
    status: "today",
    type: "Full Length"
  },
  {
    id: "5",
    title: "Physics Mechanics Test",
    subject: "Physics",
    duration: 90,
    questions: 30,
    difficulty: "Easy",
    attempted: true,
    score: 85,
    status: "completed",
    type: "Topic Test"
  }
];

const PracticeExamsList = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState<'today' | 'pending' | 'completed'>('today');
  const [activeSubject, setActiveSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const overviewData = {
    type: "Practice Exams" as const,
    title: "PREPZR Practice Exams Overview",
    subjects: [
      { name: "Physics", completed: 8, total: 12, progress: 67, efficiency: 82, studyTime: 32 },
      { name: "Chemistry", completed: 6, total: 10, progress: 60, efficiency: 78, studyTime: 28 },
      { name: "Biology", completed: 10, total: 15, progress: 67, efficiency: 85, studyTime: 38 }
    ],
    totalStudyTime: 98,
    overallProgress: 64,
    suggestions: [
      "Take more Chemistry practice tests to improve weak areas",
      "Focus on Biology mock tests for better time management",
      "Physics problem-solving speed needs improvement",
      "Attempt full-length tests weekly for exam readiness"
    ]
  };

  // Get unique subjects
  const subjects = React.useMemo(() => {
    const subjectsSet = new Set(mockPracticeExams.map(exam => exam.subject));
    return Array.from(subjectsSet);
  }, []);

  // Filter exams based on search, status, and subject
  const filteredExams = React.useMemo(() => {
    let filtered = mockPracticeExams;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(exam => 
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter === 'today') {
      filtered = filtered.filter(exam => exam.status === 'today');
    } else if (statusFilter === 'pending') {
      filtered = filtered.filter(exam => exam.status === 'pending');
    } else if (statusFilter === 'completed') {
      filtered = filtered.filter(exam => exam.status === 'completed');
    }

    // Apply subject filter
    if (activeSubject !== 'all') {
      filtered = filtered.filter(exam => exam.subject === activeSubject);
    }

    return filtered;
  }, [searchQuery, statusFilter, activeSubject]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full Length': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Subject Test': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Chapter Test': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Topic Test': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <SharedPageLayout 
      title="Practice Exams" 
      subtitle="Test your knowledge with comprehensive mock exams"
    >
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
            {/* Search and Create Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full max-w-md">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search practice exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Button className="whitespace-nowrap">
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Exam
              </Button>
            </div>

            {/* Status Filter Tabs */}
            <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Subject Filter Tabs */}
            <Tabs value={activeSubject} onValueChange={setActiveSubject}>
              <TabsList className="flex flex-wrap h-auto">
                <TabsTrigger value="all">All Subjects</TabsTrigger>
                {subjects.map(subject => (
                  <TabsTrigger key={subject} value={subject}>{subject}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Available Exams</p>
                      <p className="text-3xl font-bold">{filteredExams.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-primary opacity-80" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-3xl font-bold">
                        {filteredExams.filter(exam => exam.attempted).length}
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Score</p>
                      <p className="text-3xl font-bold">
                        {Math.round(
                          filteredExams
                            .filter(exam => exam.score)
                            .reduce((acc, exam) => acc + (exam.score || 0), 0) /
                          Math.max(filteredExams.filter(exam => exam.score).length, 1)
                        )}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Exams Grid */}
            <motion.div 
              className="grid gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredExams.map((exam) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-2 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <FileText className="h-6 w-6 text-blue-600" />
                            <h3 className="text-xl font-semibold">{exam.title}</h3>
                            <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                              {exam.difficulty}
                            </Badge>
                            <Badge variant="outline" className={getTypeColor(exam.type)}>
                              {exam.type}
                            </Badge>
                            {exam.attempted && exam.score && (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                Score: {exam.score}%
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{exam.duration} min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              <span>{exam.questions} questions</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{exam.subject}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          {exam.attempted ? (
                            <>
                              <Button variant="outline" size="sm">
                                View Results
                              </Button>
                              <Button size="sm">
                                Retake Exam
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" className="px-6">
                              Start Exam
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {/* Add feedback button */}
                      <div className="flex justify-end">
                        <ContentFeedbackButton
                          contentId={exam.id}
                          contentType="exam"
                          contentTitle={exam.title}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredExams.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No practice exams found for the selected filters</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Exam
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamsList;
