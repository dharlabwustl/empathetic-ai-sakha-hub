
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, FileCheck, FileQuestion, Layers, Star, Lock } from 'lucide-react';
import CreateExamCardDialog from './CreateExamCardDialog';
import { useNavigate } from 'react-router-dom';
import { SubscriptionType } from '@/types/user/base';

interface PracticeExam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  questions: number;
  date: string;
  status: 'not-started' | 'in-progress' | 'completed';
  score?: number;
  progress?: number;
  isPremium?: boolean;
}

interface PracticeExamsSectionProps {
  exams?: PracticeExam[];
  isLoading?: boolean;
  subscriptionType?: SubscriptionType;
}

const PracticeExamsSection: React.FC<PracticeExamsSectionProps> = ({
  exams: providedExams,
  isLoading = false,
  subscriptionType = SubscriptionType.FREE
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  
  // Mock exams data if not provided
  const mockExams: PracticeExam[] = [
    {
      id: 'exam-1',
      title: 'Physics Full Test',
      subject: 'physics',
      duration: 120,
      questions: 60,
      date: '2023-05-20T10:00:00',
      status: 'not-started'
    },
    {
      id: 'exam-2',
      title: 'Chemistry Quick Quiz',
      subject: 'chemistry',
      duration: 30,
      questions: 20,
      date: '2023-05-18T14:00:00',
      status: 'completed',
      score: 85,
      progress: 100
    },
    {
      id: 'exam-3',
      title: 'Biology Unit Test',
      subject: 'biology',
      duration: 60,
      questions: 40,
      date: '2023-05-19T09:30:00',
      status: 'in-progress',
      progress: 40
    },
    {
      id: 'exam-4',
      title: 'Previous Year NEET Physics',
      subject: 'physics',
      duration: 180,
      questions: 90,
      date: '2023-05-21T10:00:00',
      status: 'not-started',
      isPremium: true
    }
  ];
  
  // Use provided exams or fallback to mock data
  const exams = providedExams || mockExams;
  
  // Handler for creating new exams
  const handleCreateExam = (examData: any) => {
    console.log("Created exam:", examData);
    // This would normally add the exam to the list
  };
  
  // Handler for starting an exam
  const handleStartExam = (exam: PracticeExam) => {
    if (exam.isPremium && subscriptionType === SubscriptionType.FREE) {
      // Show upgrade dialog
      console.log("Premium exam, show upgrade dialog");
      return;
    }
    
    navigate(`/dashboard/student/practice-exam/${exam.id}`);
  };
  
  // Filtered exams based on tab and subject selection
  const filteredExams = exams.filter(exam => {
    // Filter by tab
    if (activeTab === 'upcoming' && exam.status !== 'not-started') return false;
    if (activeTab === 'in-progress' && exam.status !== 'in-progress') return false;
    if (activeTab === 'completed' && exam.status !== 'completed') return false;
    
    // Filter by subject
    if (subjectFilter !== 'all' && exam.subject !== subjectFilter) return false;
    
    return true;
  });
  
  // Show skeleton loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-semibold">Practice Exams</h2>
        
        <div className="flex gap-2">
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        {/* Tab content */}
        <TabsContent value="all" className="mt-6">
          <ExamsGrid 
            exams={filteredExams} 
            onStartExam={handleStartExam}
            onCreateExam={handleCreateExam}
            subscriptionType={subscriptionType}
          />
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          <ExamsGrid 
            exams={filteredExams} 
            onStartExam={handleStartExam}
            onCreateExam={handleCreateExam}
            subscriptionType={subscriptionType}
          />
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-6">
          <ExamsGrid 
            exams={filteredExams} 
            onStartExam={handleStartExam}
            onCreateExam={handleCreateExam}
            subscriptionType={subscriptionType}
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <ExamsGrid 
            exams={filteredExams} 
            onStartExam={handleStartExam}
            onCreateExam={handleCreateExam}
            subscriptionType={subscriptionType}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Exams grid component
interface ExamsGridProps {
  exams: PracticeExam[];
  onStartExam: (exam: PracticeExam) => void;
  onCreateExam: (examData: any) => void;
  subscriptionType?: SubscriptionType;
}

const ExamsGrid: React.FC<ExamsGridProps> = ({ exams, onStartExam, onCreateExam, subscriptionType }) => {
  if (exams.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <h3 className="font-semibold text-lg mb-2">No exams found</h3>
          <p className="text-muted-foreground mb-4">
            No exams match your current filters. Try adjusting your selection or create a new exam.
          </p>
          <Button variant="default">Create New Exam</Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.map((exam) => (
        <ExamCard key={exam.id} exam={exam} onStartExam={onStartExam} />
      ))}
      
      {/* Create exam card */}
      <CreateExamCardDialog onCreateExam={onCreateExam} subscriptionType={subscriptionType} />
    </div>
  );
};

// Individual exam card component
interface ExamCardProps {
  exam: PracticeExam;
  onStartExam: (exam: PracticeExam) => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onStartExam }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Status badge color
  const getStatusBadge = () => {
    switch (exam.status) {
      case 'not-started':
        return <Badge variant="outline">Not Started</Badge>;
      case 'in-progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-600">Completed</Badge>;
      default:
        return null;
    }
  };
  
  // Button text based on status
  const getButtonText = () => {
    switch (exam.status) {
      case 'not-started':
        return 'Start Exam';
      case 'in-progress':
        return 'Continue Exam';
      case 'completed':
        return 'Review Results';
      default:
        return 'View Exam';
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className={`pb-2 ${
        exam.subject === 'physics' ? 'bg-blue-50 dark:bg-blue-900/20' :
        exam.subject === 'chemistry' ? 'bg-green-50 dark:bg-green-900/20' :
        exam.subject === 'biology' ? 'bg-purple-50 dark:bg-purple-900/20' :
        'bg-gray-50 dark:bg-gray-800'
      }`}>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{exam.title}</CardTitle>
          {exam.isPremium && (
            <Badge variant="outline" className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 border-amber-300">
              <Star className="h-3 w-3 mr-1 text-amber-500 fill-amber-500" />
              Premium
            </Badge>
          )}
        </div>
        <CardDescription className="capitalize">
          {exam.subject}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{exam.duration} min</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <FileQuestion className="h-4 w-4" />
            <span>{exam.questions} questions</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(exam.date)}</span>
          </div>
        </div>
        
        {/* Show progress bar for in-progress or completed exams */}
        {(exam.status === 'in-progress' || exam.status === 'completed') && (
          <div className="mt-2 mb-4">
            <div className="flex justify-between items-center text-xs mb-1">
              <span>Progress</span>
              <span>{exam.progress}%</span>
            </div>
            <Progress value={exam.progress} className="h-1.5" />
          </div>
        )}
        
        {/* Show score for completed exams */}
        {exam.status === 'completed' && exam.score !== undefined && (
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md mb-4 flex items-center justify-between">
            <span className="text-sm font-medium">Your Score</span>
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
              {exam.score}%
            </Badge>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        {getStatusBadge()}
        
        <Button 
          variant={exam.status === 'completed' ? 'outline' : 'default'}
          className={exam.isPremium ? 'gap-2' : ''}
          onClick={() => onStartExam(exam)}
        >
          {exam.isPremium && <Lock className="h-3.5 w-3.5" />}
          {getButtonText()}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PracticeExamsSection;
