
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { FileText, Clock, Award, Play, PlusCircle, LucideIcon, Crown, Lock } from "lucide-react";
import { SubscriptionType } from '@/types/user/base';
import CreateExamCardDialog from './CreateExamCardDialog';

interface PracticeExam {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number;
  timeLimit: number;
  subject: string;
  topic: string;
  lastAttempt?: string;
  attemptsCount: number;
  avgScore?: number;
  status: 'not-started' | 'in-progress' | 'completed';
  isLocked?: boolean;
  requiredSubscription?: SubscriptionType;
}

interface PracticeExamsSectionProps {
  title?: string;
  description?: string;
  userSubscription?: SubscriptionType;
}

const PracticeExamsSection: React.FC<PracticeExamsSectionProps> = ({
  title = "Practice Exams",
  description = "Test your knowledge with subject-specific practice exams",
  userSubscription = SubscriptionType.FREE
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const navigate = useNavigate();

  // Sample exams data - In a real app, this would come from an API or state
  const [exams, setExams] = useState<PracticeExam[]>([
    {
      id: "exam1",
      title: "Physics Full Mock Test",
      description: "Comprehensive test covering all physics topics for NEET preparation",
      difficulty: "Medium",
      questions: 45,
      timeLimit: 60,
      subject: "Physics",
      topic: "Full Syllabus",
      lastAttempt: "2023-08-15",
      attemptsCount: 2,
      avgScore: 72,
      status: "in-progress"
    },
    {
      id: "exam2",
      title: "Biology - Human Physiology",
      description: "Focused test on digestive, respiratory, and circulatory systems",
      difficulty: "Hard",
      questions: 30,
      timeLimit: 45,
      subject: "Biology",
      topic: "Human Physiology",
      lastAttempt: "2023-08-10",
      attemptsCount: 3,
      avgScore: 68,
      status: "completed"
    },
    {
      id: "exam3",
      title: "Chemistry - Organic Compounds",
      description: "Test your knowledge of hydrocarbons, alcohols, and carbonyl compounds",
      difficulty: "Medium",
      questions: 25,
      timeLimit: 40,
      subject: "Chemistry",
      topic: "Organic Chemistry",
      lastAttempt: null,
      attemptsCount: 0,
      avgScore: null,
      status: "not-started"
    },
    {
      id: "exam4",
      title: "Advanced Physics - Electromagnetism",
      description: "In-depth test on electric fields, magnetic fields, and electromagnetic induction",
      difficulty: "Hard",
      questions: 40,
      timeLimit: 60,
      subject: "Physics",
      topic: "Electromagnetism",
      lastAttempt: null,
      attemptsCount: 0,
      avgScore: null,
      status: "not-started",
      isLocked: true,
      requiredSubscription: SubscriptionType.PRO
    },
    {
      id: "exam5",
      title: "Chemistry - Thermodynamics",
      description: "Comprehensive test on thermodynamic principles and applications",
      difficulty: "Medium",
      questions: 30,
      timeLimit: 45,
      subject: "Chemistry",
      topic: "Thermodynamics",
      lastAttempt: null,
      attemptsCount: 0,
      avgScore: null,
      status: "not-started"
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'not-started':
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Not Started</Badge>;
      default:
        return null;
    }
  };

  const getFilteredExams = () => {
    if (activeTab === 'all') return exams;
    return exams.filter(exam => exam.status === activeTab);
  };

  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  const handleCreateExam = (newExam: PracticeExam) => {
    setExams(prev => [...prev, newExam]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Exam
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="not-started">Not Started</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredExams().map(exam => (
              <Card key={exam.id} className={`overflow-hidden ${exam.isLocked ? 'opacity-80' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                      {exam.difficulty}
                    </Badge>
                    {getStatusBadge(exam.status)}
                  </div>
                  <CardTitle className="text-lg mt-2 flex items-center gap-2">
                    {exam.title}
                    {exam.isLocked && (
                      <Lock className="h-4 w-4 text-gray-400" />
                    )}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{exam.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      <span>{exam.questions} questions</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{exam.timeLimit} min</span>
                    </div>
                  </div>
                  
                  {exam.attemptsCount > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Best Score</span>
                        <span className="font-medium">{exam.avgScore}%</span>
                      </div>
                      <Progress value={exam.avgScore || 0} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Last attempt: {new Date(exam.lastAttempt || Date.now()).toLocaleDateString()}</span>
                        <span>{exam.attemptsCount} attempts</span>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  {exam.isLocked ? (
                    <Button
                      disabled={true}
                      className="w-full flex gap-2 items-center"
                      variant="outline"
                    >
                      <Lock className="h-4 w-4" />
                      Requires {exam.requiredSubscription} Plan
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleStartExam(exam.id)}
                      className="w-full flex gap-2 items-center"
                      variant={exam.status === 'not-started' ? 'default' : 'outline'}
                    >
                      {exam.status === 'completed' ? (
                        <>
                          <Award className="h-4 w-4" />
                          Review Exam
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          {exam.status === 'in-progress' ? 'Continue Exam' : 'Start Exam'}
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <CreateExamCardDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
        onCreateExam={handleCreateExam}
        userSubscription={userSubscription}
      />
    </div>
  );
};

export default PracticeExamsSection;
