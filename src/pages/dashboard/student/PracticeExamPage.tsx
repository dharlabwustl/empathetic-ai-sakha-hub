
import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Target, Play, ArrowRight, Plus, Filter, Search } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OverviewSection from '@/components/dashboard/student/OverviewSection';
import CreateExamCardDialog from '@/components/dashboard/student/exams/CreateExamCardDialog';

const PracticeExamPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [statusView, setStatusView] = useState<'today' | 'pending' | 'completed'>('today');
  const [activeSubject, setActiveSubject] = useState('all');
  const [showAllCards, setShowAllCards] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Mock practice exam data
  const practiceExams = [
    {
      id: '1',
      title: 'NEET Physics Mock Test 1',
      subject: 'Physics',
      topic: 'Mechanics',
      duration: 180,
      questions: 45,
      difficulty: 'Medium',
      attempted: false,
      completed: false,
      scheduledFor: 'today',
      score: null,
      maxScore: 180
    },
    {
      id: '2',
      title: 'NEET Chemistry Practice Set',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      duration: 180,
      questions: 45,
      difficulty: 'Hard',
      attempted: true,
      completed: true,
      scheduledFor: 'today',
      score: 140,
      maxScore: 180
    },
    {
      id: '3',
      title: 'NEET Biology Comprehensive',
      subject: 'Biology',
      topic: 'Cell Biology',
      duration: 180,
      questions: 90,
      difficulty: 'Medium',
      attempted: false,
      completed: false,
      scheduledFor: 'week',
      score: null,
      maxScore: 360
    }
  ];

  // Listen for URL parameter changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    const subject = searchParams.get('subject');
    
    if (tab && (tab === 'overview' || tab === 'available-exams')) {
      setActiveTab(tab);
    }
    
    if (subject && tab === 'available-exams') {
      setActiveSubject(decodeURIComponent(subject));
    }
  }, [searchParams]);

  const overviewData = {
    type: "Practice Exams" as const,
    title: "NEET Practice Exams Overview",
    subjects: [
      { name: "Physics", completed: 12, total: 20, progress: 60, efficiency: 75, studyTime: 18 },
      { name: "Chemistry", completed: 15, total: 25, progress: 60, efficiency: 82, studyTime: 22 },
      { name: "Biology", completed: 18, total: 30, progress: 60, efficiency: 78, studyTime: 25 }
    ],
    totalStudyTime: 65,
    overallProgress: 60,
    suggestions: [
      "Focus on Physics numerical problems for better exam performance",
      "Chemistry reaction mechanisms need more practice through mock tests",
      "Biology diagram-based questions show good understanding",
      "Attempt more full-length mock tests to improve time management"
    ]
  };

  // Get unique subjects
  const subjects = useMemo(() => {
    const subjectsSet = new Set(practiceExams.map(exam => exam.subject));
    return Array.from(subjectsSet);
  }, []);

  // Count practice exams per subject and status
  const examCounts = useMemo(() => {
    const counts: Record<string, Record<string, number>> = {};
    
    practiceExams.forEach(exam => {
      if (!counts[exam.subject]) {
        counts[exam.subject] = { today: 0, pending: 0, completed: 0 };
      }
      
      if (exam.completed) {
        counts[exam.subject].completed++;
      } else if (exam.scheduledFor === 'today') {
        counts[exam.subject].today++;
      } else {
        counts[exam.subject].pending++;
      }
    });
    
    return counts;
  }, []);

  // Filter practice exams
  const filteredExams = useMemo(() => {
    let filtered = practiceExams.filter(exam => {
      if (statusView === 'completed') {
        return exam.completed;
      } else if (statusView === 'today') {
        return !exam.completed && exam.scheduledFor === 'today';
      } else { // pending
        return !exam.completed && exam.scheduledFor !== 'today';
      }
    });
    
    if (activeSubject !== 'all') {
      filtered = filtered.filter(exam => exam.subject === activeSubject);
    }
    
    if (!showAllCards) {
      filtered = filtered.slice(0, 6);
    }
    
    return filtered;
  }, [statusView, activeSubject, showAllCards]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const url = new URL(window.location);
    url.searchParams.set('tab', value);
    if (value === 'overview') {
      url.searchParams.delete('subject');
    }
    window.history.pushState({}, '', url);
  };

  const handleSubjectChange = (subject: string) => {
    setActiveSubject(subject);
    const url = new URL(window.location);
    if (subject === 'all') {
      url.searchParams.delete('subject');
    } else {
      url.searchParams.set('subject', encodeURIComponent(subject));
    }
    window.history.pushState({}, '', url);
  };

  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  const handleViewResults = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Practice Exams</h1>
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
          <Button size="sm" onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Exam
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="available-exams">Available Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <OverviewSection {...overviewData} />
        </TabsContent>

        <TabsContent value="available-exams" className="space-y-6 mt-6">
          {/* Status-based Tabs */}
          <Tabs value={statusView} onValueChange={(v) => setStatusView(v as typeof statusView)}>
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Subject Tabs */}
          <div className="border-b">
            <div className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => handleSubjectChange('all')}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeSubject === 'all'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Subjects
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {practiceExams.filter(e => statusView === 'completed' ? e.completed : 
                    statusView === 'today' ? (!e.completed && e.scheduledFor === 'today') :
                    (!e.completed && e.scheduledFor !== 'today')).length}
                </span>
              </button>
              {subjects.map(subject => (
                <button
                  key={subject}
                  onClick={() => handleSubjectChange(subject)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    activeSubject === subject
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {subject}
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {examCounts[subject]?.[statusView] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Practice Exams Grid */}
          <motion.div 
            className="grid gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredExams.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">
                  No {statusView} practice exams found {activeSubject !== 'all' ? `for ${activeSubject}` : ''}
                </p>
              </div>
            ) : (
              filteredExams.map((exam) => (
                <motion.div key={exam.id} variants={itemVariants}>
                  <Card className="border-2 hover:shadow-lg transition-all duration-200 hover:border-green-300 bg-gradient-to-br from-white to-green-50/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <FileText className="h-5 w-5 text-green-600" />
                            <h3 className="text-lg font-semibold">{exam.title}</h3>
                            <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                              {exam.difficulty}
                            </Badge>
                            {exam.completed && exam.score && (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                Score: {Math.round((exam.score / exam.maxScore) * 100)}%
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{exam.duration} min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              <span>{exam.questions} questions</span>
                            </div>
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                              {exam.subject} - {exam.topic}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {exam.completed ? (
                            <>
                              <Button variant="outline" size="sm" onClick={() => handleViewResults(exam.id)}>
                                View Results
                              </Button>
                              <Button size="sm" onClick={() => handleStartExam(exam.id)}>
                                Retake Exam
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" onClick={() => handleStartExam(exam.id)}>
                              <Play className="mr-2 h-4 w-4" />
                              Start Exam
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* View All Button */}
          {!showAllCards && filteredExams.length === 6 && (
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAllCards(true)}
                className="group"
              >
                View All Practice Exams
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <CreateExamCardDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
};

export default PracticeExamPage;
