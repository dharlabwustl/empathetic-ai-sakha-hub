
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Filter, Search, Clock, Target, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PracticeExamsSection: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'today' | 'pending' | 'completed'>('today');
  const [subjectFilter, setSubjectFilter] = useState('all');

  // Mock exam data
  const allExams = [
    {
      id: '1',
      title: 'NEET Physics Mock Test 1',
      subject: 'Physics',
      duration: 180,
      questions: 45,
      difficulty: 'Medium',
      completed: false,
      status: 'today',
      dueDate: 'Today'
    },
    {
      id: '2',
      title: 'NEET Chemistry Practice Set',
      subject: 'Chemistry',
      duration: 180,
      questions: 45,
      difficulty: 'Hard',
      completed: true,
      score: 78,
      status: 'completed',
      dueDate: '2 days ago'
    },
    {
      id: '3',
      title: 'NEET Biology Comprehensive',
      subject: 'Biology',
      duration: 180,
      questions: 90,
      difficulty: 'Medium',
      completed: false,
      status: 'pending',
      dueDate: 'Tomorrow'
    },
    {
      id: '4',
      title: 'Physics MCQ Challenge',
      subject: 'Physics',
      duration: 120,
      questions: 60,
      difficulty: 'Hard',
      completed: false,
      status: 'today',
      dueDate: 'Today'
    }
  ];

  const subjects = ['all', 'Physics', 'Chemistry', 'Biology'];

  // Filter exams based on status and subject
  const filteredExams = allExams.filter(exam => {
    const statusMatch = exam.status === statusFilter || (statusFilter === 'completed' && exam.completed);
    const subjectMatch = subjectFilter === 'all' || exam.subject === subjectFilter;
    return statusMatch && subjectMatch;
  });

  // Count exams by status
  const examCounts = {
    today: allExams.filter(e => e.status === 'today').length,
    pending: allExams.filter(e => e.status === 'pending').length,
    completed: allExams.filter(e => e.completed).length
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Chemistry': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Biology': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-green-50/30 dark:from-blue-900/10 dark:via-gray-900 dark:to-green-900/10 p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Practice Exams</h1>
            <p className="text-gray-600 dark:text-gray-400">Test your knowledge with comprehensive mock exams</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Exam
            </Button>
          </div>
        </div>

        {/* Status Filter Tabs with Count Indicators */}
        <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
          <TabsList>
            <TabsTrigger value="today" className="flex items-center gap-2">
              Today
              <Badge variant="secondary" className="ml-1 text-xs">
                {examCounts.today}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              Pending
              <Badge variant="secondary" className="ml-1 text-xs">
                {examCounts.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              Completed
              <Badge variant="secondary" className="ml-1 text-xs">
                {examCounts.completed}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Subject Filter */}
        <div className="flex gap-2">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={subjectFilter === subject ? "default" : "outline"}
              size="sm"
              onClick={() => setSubjectFilter(subject)}
              className="capitalize"
            >
              {subject}
            </Button>
          ))}
        </div>

        {/* Exams List */}
        <div className="grid gap-4">
          {filteredExams.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`border-2 ${
                exam.completed ? 'border-green-200 bg-green-50/30' : 'hover:border-blue-300'
              } transition-all duration-200 bg-gradient-to-r from-white to-blue-50/10 dark:from-gray-800 dark:to-blue-900/10`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {exam.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <FileText className="h-5 w-5 text-blue-600" />
                        )}
                        <h3 className="text-lg font-semibold">{exam.title}</h3>
                        <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                          {exam.difficulty}
                        </Badge>
                        {exam.completed && exam.score && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Score: {exam.score}%
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{exam.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          <span>{exam.questions} questions</span>
                        </div>
                        <Badge variant="outline" className={getSubjectColor(exam.subject)}>
                          {exam.subject}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {exam.status === 'today' ? (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                          <span>{exam.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {exam.completed ? (
                        <>
                          <Button variant="outline" size="sm">
                            View Results
                          </Button>
                          <Button size="sm">
                            Retake Exam
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="group">
                          Start Exam
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filteredExams.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No {statusFilter} exams found
              </h3>
              <p className="text-gray-500 mb-6">
                {statusFilter === 'completed'
                  ? "You haven't completed any exams yet."
                  : statusFilter === 'pending'
                  ? "No pending exams. You're all caught up!"
                  : "No exams scheduled for today."}
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Exam
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeExamsSection;
