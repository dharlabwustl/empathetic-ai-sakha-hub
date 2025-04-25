
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { BarChart, BookOpen, Calendar, Clock, FileText, Flag, Timer, Award, CheckCircle, X, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number; // minutes
  totalQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'available' | 'completed' | 'upcoming';
  lastAttempt?: {
    date: string;
    score: number;
    percentile: number;
  };
  scheduledFor?: string;
}

const exams: Exam[] = [
  {
    id: 'exam1',
    title: 'Physics Unit Test: Mechanics',
    subject: 'Physics',
    duration: 60,
    totalQuestions: 25,
    difficulty: 'medium',
    status: 'available',
  },
  {
    id: 'exam2',
    title: 'Chemistry Practice: Chemical Bonding',
    subject: 'Chemistry',
    duration: 45,
    totalQuestions: 20,
    difficulty: 'hard',
    status: 'available',
  },
  {
    id: 'exam3',
    title: 'Mathematics Weekly Mock: Calculus',
    subject: 'Mathematics',
    duration: 90,
    totalQuestions: 30,
    difficulty: 'hard',
    status: 'completed',
    lastAttempt: {
      date: '2025-04-20',
      score: 24,
      percentile: 82
    }
  },
  {
    id: 'exam4',
    title: 'Biology Quiz: Cell Structure',
    subject: 'Biology',
    duration: 30,
    totalQuestions: 15,
    difficulty: 'easy',
    status: 'completed',
    lastAttempt: {
      date: '2025-04-15',
      score: 14,
      percentile: 93
    }
  },
  {
    id: 'exam5',
    title: 'Chemistry Grand Test: Organic Chemistry',
    subject: 'Chemistry',
    duration: 120,
    totalQuestions: 50,
    difficulty: 'hard',
    status: 'upcoming',
    scheduledFor: '2025-04-30'
  }
];

const PracticeExamPage = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam);
    setShowStartDialog(true);
  };

  const handleConfirmStartExam = () => {
    setShowStartDialog(false);
    
    if (selectedExam) {
      toast({
        title: "Exam Started",
        description: `You've started ${selectedExam.title}. Good luck!`,
      });
      
      navigate(`/dashboard/student/exam/${selectedExam.id}`);
    }
  };

  const handleReviewExam = (exam: Exam) => {
    setSelectedExam(exam);
    setShowReviewDialog(true);
  };

  const handleConfirmReviewExam = () => {
    setShowReviewDialog(false);
    
    if (selectedExam) {
      toast({
        title: "Review Mode",
        description: `Reviewing your answers for ${selectedExam.title}.`,
      });
      
      navigate(`/dashboard/student/exam/${selectedExam.id}/review`);
    }
  };

  const getDifficultyBadge = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch(difficulty) {
      case 'easy':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Easy</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Medium</Badge>;
      case 'hard':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Hard</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Practice Exams</h1>
        <p className="text-gray-600 mt-1">Test your knowledge with practice exams aligned with your study plan</p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="text-blue-600" size={18} />
              Available Exams
            </CardTitle>
            <CardDescription>Ready for you to attempt</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{exams.filter(e => e.status === 'available').length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="text-green-600" size={18} />
              Completed Exams
            </CardTitle>
            <CardDescription>Exams you've already taken</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{exams.filter(e => e.status === 'completed').length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="text-purple-600" size={18} />
              Upcoming Exams
            </CardTitle>
            <CardDescription>Scheduled for future dates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{exams.filter(e => e.status === 'upcoming').length}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Exams Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="available">Available ({exams.filter(e => e.status === 'available').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({exams.filter(e => e.status === 'completed').length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({exams.filter(e => e.status === 'upcoming').length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="mt-6">
          {exams.filter(e => e.status === 'available').length > 0 ? (
            <div className="space-y-4">
              {exams
                .filter(e => e.status === 'available')
                .map(exam => (
                  <Card key={exam.id} className="overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2" />
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="text-blue-600" size={18} />
                            <h3 className="font-semibold text-lg">{exam.title}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="bg-blue-50">
                              {exam.subject}
                            </Badge>
                            {getDifficultyBadge(exam.difficulty)}
                            <div className="flex items-center text-sm text-gray-600 gap-1">
                              <Clock size={12} />
                              <span>{exam.duration} mins</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 gap-1">
                              <BookOpen size={12} />
                              <span>{exam.totalQuestions} questions</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => handleStartExam(exam)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Start Exam
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="p-8 text-center">
                <AlertCircle className="mx-auto text-gray-400 mb-3" size={32} />
                <h3 className="text-lg font-medium mb-1">No available exams</h3>
                <p className="text-gray-500 mb-4">
                  Check back later for new practice exams
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          {exams.filter(e => e.status === 'completed').length > 0 ? (
            <div className="space-y-4">
              {exams
                .filter(e => e.status === 'completed')
                .map(exam => (
                  <Card key={exam.id} className="overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-2" />
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="text-green-600" size={18} />
                            <h3 className="font-semibold text-lg">{exam.title}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="bg-green-50">
                              {exam.subject}
                            </Badge>
                            {getDifficultyBadge(exam.difficulty)}
                            <div className="flex items-center text-sm text-gray-600 gap-1">
                              <Calendar size={12} />
                              <span>Completed on {exam.lastAttempt?.date}</span>
                            </div>
                          </div>
                          
                          {exam.lastAttempt && (
                            <div className="mt-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">Score: {exam.lastAttempt.score}/{exam.totalQuestions}</span>
                                <span className="text-sm font-medium">{Math.round((exam.lastAttempt.score / exam.totalQuestions) * 100)}%</span>
                              </div>
                              <Progress value={(exam.lastAttempt.score / exam.totalQuestions) * 100} className="h-2" />
                              
                              <div className="mt-2 flex items-center gap-2 text-sm">
                                <Award className="text-amber-500" size={14} />
                                <span>Percentile: {exam.lastAttempt.percentile}%</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          onClick={() => handleReviewExam(exam)}
                          variant="outline"
                          className="border-green-200 text-green-700 hover:bg-green-50"
                        >
                          Review Exam
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="p-8 text-center">
                <AlertCircle className="mx-auto text-gray-400 mb-3" size={32} />
                <h3 className="text-lg font-medium mb-1">No completed exams</h3>
                <p className="text-gray-500 mb-4">
                  Complete available exams to see results here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          {exams.filter(e => e.status === 'upcoming').length > 0 ? (
            <div className="space-y-4">
              {exams
                .filter(e => e.status === 'upcoming')
                .map(exam => (
                  <Card key={exam.id} className="overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2" />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="text-purple-600" size={18} />
                            <h3 className="font-semibold text-lg">{exam.title}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="bg-purple-50">
                              {exam.subject}
                            </Badge>
                            {getDifficultyBadge(exam.difficulty)}
                            <div className="flex items-center text-sm text-gray-600 gap-1">
                              <Clock size={12} />
                              <span>{exam.duration} mins</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 gap-1">
                              <BookOpen size={12} />
                              <span>{exam.totalQuestions} questions</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2">
                            <Flag className="text-purple-600" size={14} />
                            <span className="text-sm">Scheduled for: {exam.scheduledFor}</span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          disabled
                          className="opacity-50"
                        >
                          Coming Soon
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="p-8 text-center">
                <AlertCircle className="mx-auto text-gray-400 mb-3" size={32} />
                <h3 className="text-lg font-medium mb-1">No upcoming exams</h3>
                <p className="text-gray-500 mb-4">
                  Check back later for scheduled exams
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Start Exam Dialog */}
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Exam</DialogTitle>
            <DialogDescription>
              You are about to start {selectedExam?.title}. Please ensure you have enough time to complete it.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Duration:</span>
              <span>{selectedExam?.duration} minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Questions:</span>
              <span>{selectedExam?.totalQuestions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Difficulty:</span>
              <span>{selectedExam?.difficulty}</span>
            </div>
            <div className="bg-amber-50 p-3 rounded-md">
              <div className="flex items-start gap-2 text-amber-800">
                <Timer className="mt-1 shrink-0" size={16} />
                <p className="text-sm">
                  Once started, the exam timer cannot be paused. Make sure you have sufficient time to complete it.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStartDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirmStartExam} className="bg-blue-600 hover:bg-blue-700">Start Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Exam Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Exam</DialogTitle>
            <DialogDescription>
              Review your answers and performance for {selectedExam?.title}.
            </DialogDescription>
          </DialogHeader>

          {selectedExam?.lastAttempt && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-500">Score</p>
                    <p className="text-3xl font-bold">{Math.round((selectedExam.lastAttempt.score / selectedExam.totalQuestions) * 100)}%</p>
                    <p className="text-xs text-gray-500">{selectedExam.lastAttempt.score}/{selectedExam.totalQuestions} questions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-500">Percentile</p>
                    <p className="text-3xl font-bold">{selectedExam.lastAttempt.percentile}</p>
                    <p className="text-xs text-gray-500">Better than {selectedExam.lastAttempt.percentile}% of students</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md">
                <div className="flex items-start gap-2 text-blue-800">
                  <BarChart className="mt-1 shrink-0" size={16} />
                  <p className="text-sm">
                    Review your answers, see detailed explanations, and learn from your mistakes.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirmReviewExam} className="bg-green-600 hover:bg-green-700">Review Exam</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PracticeExamPage;
