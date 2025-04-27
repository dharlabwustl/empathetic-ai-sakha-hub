
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Clock, BarChart3, FileText, ArrowRight, Search, CheckCircle, Plus, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import CreateExamDialog from '@/components/dashboard/student/practice-exams/CreateExamDialog';

interface ExamCard {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  description?: string;
  dueDate?: string;
  completed?: boolean;
  score?: number;
  maxScore?: number;
}

const PracticeExamPage = () => {
  const [activeTab, setActiveTab] = useState<string>('upcoming');
  const [showCreateExam, setShowCreateExam] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data
  const upcomingExams: ExamCard[] = [
    {
      id: "ex1",
      title: "Physics Mock Test - Electromagnetism",
      subject: "Physics",
      duration: 60,
      questionCount: 30,
      difficulty: "medium",
      dueDate: "Tomorrow",
      description: "This exam covers electromagnetic induction, Maxwell's equations, and more."
    },
    {
      id: "ex2",
      title: "Mathematics Mid-Term Prep",
      subject: "Mathematics",
      duration: 90,
      questionCount: 25,
      difficulty: "hard",
      dueDate: "3 days",
      description: "Comprehensive practice for calculus and coordinate geometry."
    },
    {
      id: "ex3",
      title: "Chemistry Quick Quiz - Organic Compounds",
      subject: "Chemistry",
      duration: 30,
      questionCount: 15,
      difficulty: "easy",
      dueDate: "Today",
      description: "Test your understanding of functional groups and naming conventions."
    }
  ];
  
  const completedExams: ExamCard[] = [
    {
      id: "ex4",
      title: "Biology Complete Test",
      subject: "Biology",
      duration: 120,
      questionCount: 40,
      difficulty: "medium",
      completed: true,
      score: 35,
      maxScore: 40
    },
    {
      id: "ex5",
      title: "Physics Quick Test - Mechanics",
      subject: "Physics",
      duration: 45,
      questionCount: 20,
      difficulty: "medium",
      completed: true,
      score: 16,
      maxScore: 20
    }
  ];
  
  const recommendedExams: ExamCard[] = [
    {
      id: "ex6",
      title: "Chemistry Comprehensive Review",
      subject: "Chemistry",
      duration: 90,
      questionCount: 30,
      difficulty: "hard",
      description: "A challenging test covering all key chemistry concepts. Highly recommended for exam preparation."
    },
    {
      id: "ex7",
      title: "Mathematics Problem Solving",
      subject: "Mathematics",
      duration: 60,
      questionCount: 15,
      difficulty: "medium",
      description: "Focus on advanced problem-solving techniques required for competitive exams."
    }
  ];
  
  const getDifficultyClass = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return '';
    }
  };
  
  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };
  
  const handleReviewExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };
  
  const handleAnalytics = () => {
    navigate('/dashboard/student/practice-exam/analytics');
  };
  
  const handleCreateExam = (data: any) => {
    toast({
      title: "Exam Created",
      description: `Your new practice exam for ${data.subject} has been created successfully.`
    });
    setShowCreateExam(false);
  };

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Test your knowledge and prepare for your exams"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Practice Exams</h1>
          <p className="text-muted-foreground">Test your knowledge and track your progress</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAnalytics}
            className="flex items-center gap-1"
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => setShowCreateExam(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Create Exam
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingExams.map((exam) => (
              <ExamCardComponent 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedExams.map((exam) => (
              <CompletedExamCard 
                key={exam.id} 
                exam={exam} 
                onReview={handleReviewExam}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedExams.map((exam) => (
              <ExamCardComponent 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam}
                isRecommended
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Create Exam Dialog */}
      <CreateExamDialog
        open={showCreateExam}
        onOpenChange={setShowCreateExam}
        onSubmit={handleCreateExam}
      />
    </SharedPageLayout>
  );
};

interface ExamCardComponentProps {
  exam: ExamCard;
  onStart: (id: string) => void;
  isRecommended?: boolean;
}

const ExamCardComponent: React.FC<ExamCardComponentProps> = ({ exam, onStart, isRecommended = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden group hover:shadow-md transition-shadow duration-200">
        <CardHeader className={`p-4 border-b ${isRecommended ? 'bg-blue-50 dark:bg-blue-950/20' : 'bg-gray-50 dark:bg-gray-900/10'}`}>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{exam.title}</CardTitle>
            <Badge variant="outline" className={getDifficultyClass(exam.difficulty)}>
              {exam.difficulty}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {exam.subject}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-3">
            <p className="text-sm">{exam.description}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                {exam.duration} mins
              </div>
              <div className="flex items-center text-muted-foreground">
                <FileText className="mr-1 h-4 w-4" />
                {exam.questionCount} questions
              </div>
            </div>
            
            {exam.dueDate && (
              <div className="flex items-center text-sm">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Due: </span>
                <Badge variant="outline" className="ml-2">
                  {exam.dueDate}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-2 border-t">
          <Button 
            onClick={() => onStart(exam.id)} 
            className="w-full"
          >
            Start Exam
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

interface CompletedExamCardProps {
  exam: ExamCard;
  onReview: (id: string) => void;
}

const CompletedExamCard: React.FC<CompletedExamCardProps> = ({ exam, onReview }) => {
  const scorePercentage = exam.score && exam.maxScore ? (exam.score / exam.maxScore) * 100 : 0;
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-amber-600';
    return 'text-red-600';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden group hover:shadow-md transition-shadow duration-200">
        <CardHeader className="p-4 border-b bg-gray-50 dark:bg-gray-900/10">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{exam.title}</CardTitle>
            <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {exam.subject}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Score</span>
              <span className={`text-lg font-semibold ${getScoreColor(scorePercentage)}`}>
                {exam.score}/{exam.maxScore} ({Math.round(scorePercentage)}%)
              </span>
            </div>
            
            <Progress value={scorePercentage} className="h-2" />
            
            <div className="pt-2 flex items-center justify-between text-sm">
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                {exam.duration} mins
              </div>
              <div className="flex items-center text-muted-foreground">
                <FileText className="mr-1 h-4 w-4" />
                {exam.questionCount} questions
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-2 border-t">
          <Button 
            onClick={() => onReview(exam.id)} 
            variant="outline"
            className="w-full"
          >
            Review Exam
            <Search className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PracticeExamPage;
