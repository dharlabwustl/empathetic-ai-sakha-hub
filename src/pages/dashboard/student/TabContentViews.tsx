
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import ConceptCardView from '@/components/dashboard/student/concept-cards/ConceptCardView';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, FileCheck, BookOpen, Clock, Brain, CheckCircle, Flag, ArrowLeft, CheckSquare, Share, Download, Printer } from 'lucide-react';
import TodayStudyPlan from '@/components/dashboard/student/TodayStudyPlan';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import SmartSuggestionSection from '@/components/dashboard/student/SmartSuggestionSection';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export const MicroConceptView = () => {
  const { userProfile } = useUserProfile();
  const { conceptCards, loading } = useUserStudyPlan();
  
  const todayCards = conceptCards.filter(card => card.scheduledFor === 'today');
  const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Concept Cards</h2>
          <p className="text-gray-500">
            Master key concepts for your {examGoal} preparation with detailed explanations.
          </p>
        </div>
        <Link to="/dashboard/student/concepts/all">
          <Button variant="outline" className="flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ConceptCardView 
          title=""
          limit={3}
          showViewAll={false}
        />
      </div>
      
      {todayCards.length > 3 && (
        <div className="text-center">
          <Link to="/dashboard/student/concepts/all">
            <Button variant="ghost">
              View {todayCards.length - 3} more concept cards
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export const TodayPlanView = () => {
  return (
    <div className="space-y-6">
      <TodayStudyPlan />
      <ConceptCardView 
        title="Today's Concept Cards" 
        limit={3}
        showViewAll={true}
      />
      <SmartSuggestionSection />
    </div>
  );
};

export const FlashcardsView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Flashcards</h2>
      <p className="text-gray-600 mb-4">
        Study and memorize key concepts with interactive flashcards.
      </p>
      
      {/* Flashcards content would go here */}
      <div className="p-8 text-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Select a flashcard deck to begin studying.</p>
      </div>
    </div>
  );
};

interface PracticeExam {
  id: string;
  title: string;
  subject: string;
  description: string;
  questionsCount: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'available' | 'in-progress' | 'completed';
  score?: number;
  dateCompleted?: string;
  questions?: Question[];
}

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  userAnswer?: string;
}

export const PracticeExamsView = () => {
  const [activeTab, setActiveTab] = useState<string>('available');
  const [currentExam, setCurrentExam] = useState<PracticeExam | null>(null);
  const [currentStep, setCurrentStep] = useState<'list' | 'exam' | 'results'>('list');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [examResults, setExamResults] = useState<{
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    unanswered: number;
  } | null>(null);
  
  // Mock data for practice exams
  const mockExams: Record<string, PracticeExam[]> = {
    available: [
      {
        id: 'e1',
        title: 'Physics Mock Test',
        subject: 'Physics',
        description: 'Test your knowledge of mechanics, waves, and thermodynamics.',
        questionsCount: 10,
        duration: 20,
        difficulty: 'medium',
        status: 'available',
        questions: [
          {
            id: 'q1',
            text: 'What is Newton\'s Second Law of Motion?',
            options: [
              { id: 'a', text: 'Objects in motion stay in motion unless acted upon by an external force' },
              { id: 'b', text: 'Force equals mass times acceleration (F = ma)' },
              { id: 'c', text: 'For every action, there is an equal and opposite reaction' },
              { id: 'd', text: 'Energy cannot be created or destroyed, only transformed' }
            ],
            correctOptionId: 'b',
            explanation: 'Newton\'s Second Law states that the force acting on an object is equal to the mass of the object times its acceleration (F = ma).'
          },
          {
            id: 'q2',
            text: 'Which of the following is a unit of work?',
            options: [
              { id: 'a', text: 'Newton (N)' },
              { id: 'b', text: 'Watt (W)' },
              { id: 'c', text: 'Joule (J)' },
              { id: 'd', text: 'Kelvin (K)' }
            ],
            correctOptionId: 'c',
            explanation: 'The Joule (J) is the SI unit of work, energy, and heat. One joule equals the work done when a force of one newton is applied over a distance of one meter.'
          }
        ]
      },
      {
        id: 'e2',
        title: 'Chemistry: Organic',
        subject: 'Chemistry',
        description: 'Test covering fundamental concepts in organic chemistry.',
        questionsCount: 15,
        duration: 30,
        difficulty: 'easy',
        status: 'available'
      },
      {
        id: 'e3',
        title: 'Full JEE Mock Test',
        subject: 'Combined',
        description: 'Comprehensive test covering Physics, Chemistry, and Math topics.',
        questionsCount: 30,
        duration: 60,
        difficulty: 'hard',
        status: 'available'
      }
    ],
    completed: [
      {
        id: 'e4',
        title: 'Physics Basics',
        subject: 'Physics',
        description: 'Fundamental concepts in physics.',
        questionsCount: 10,
        duration: 15,
        difficulty: 'easy',
        status: 'completed',
        score: 80,
        dateCompleted: '2025-04-20'
      },
      {
        id: 'e5',
        title: 'Math: Calculus',
        subject: 'Mathematics',
        description: 'Essential calculus concepts for JEE.',
        questionsCount: 15,
        duration: 25,
        difficulty: 'medium',
        status: 'completed',
        score: 70,
        dateCompleted: '2025-04-18'
      }
    ],
    inProgress: [
      {
        id: 'e6',
        title: 'Chemistry: Inorganic',
        subject: 'Chemistry',
        description: 'Key concepts in inorganic chemistry.',
        questionsCount: 12,
        duration: 20,
        difficulty: 'medium',
        status: 'in-progress'
      }
    ]
  };

  const handleStartExam = (exam: PracticeExam) => {
    setCurrentExam(exam);
    setTimeRemaining(exam.duration * 60); // Convert minutes to seconds
    setCurrentStep('exam');
    
    // Initialize empty user answers
    const initialAnswers: Record<string, string> = {};
    exam.questions?.forEach(q => {
      initialAnswers[q.id] = '';
    });
    setUserAnswers(initialAnswers);
    
    toast({
      title: "Exam Started",
      description: `You have ${exam.duration} minutes to complete this exam.`,
    });
  };
  
  const handleAnswerChange = (questionId: string, optionId: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };
  
  const handleSubmitExam = () => {
    if (!currentExam) return;
    
    // Calculate results
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    
    currentExam.questions?.forEach(q => {
      if (!userAnswers[q.id]) {
        unansweredCount++;
      } else if (userAnswers[q.id] === q.correctOptionId) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });
    
    const totalQuestions = currentExam.questions?.length || 0;
    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    
    setExamResults({
      score: scorePercentage,
      totalQuestions,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      unanswered: unansweredCount
    });
    
    setCurrentStep('results');
    
    toast({
      title: "Exam Completed",
      description: `Your score: ${scorePercentage}% (${correctCount} out of ${totalQuestions} correct)`,
    });
  };
  
  const handleReturnToList = () => {
    setCurrentExam(null);
    setCurrentStep('list');
    setUserAnswers({});
    setExamResults(null);
  };

  // Render based on current step
  if (currentStep === 'exam' && currentExam) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle className="text-2xl">{currentExam.title}</CardTitle>
              <CardDescription>{currentExam.description}</CardDescription>
            </div>
            <div className="mt-2 sm:mt-0">
              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                <Clock size={14} className="mr-1" /> {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')} remaining
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {currentExam.questions?.map((question, index) => (
              <div key={question.id} className="border-b pb-6 last:border-none">
                <h3 className="font-medium mb-2">Question {index + 1}:</h3>
                <p className="mb-4">{question.text}</p>
                
                <RadioGroup
                  value={userAnswers[question.id]}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  className="space-y-2"
                >
                  {question.options.map(option => (
                    <div key={option.id} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                      <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                      <Label htmlFor={`${question.id}-${option.id}`} className="flex-grow cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <div className="flex justify-end mt-2">
                  <Badge variant="outline" className="bg-gray-50">
                    {userAnswers[question.id] ? 'Answered' : 'Not answered'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleReturnToList}>
              <ArrowLeft size={16} className="mr-1" />
              Exit Exam
            </Button>
            <Button onClick={handleSubmitExam}>
              Submit Exam
              <CheckCircle size={16} className="ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (currentStep === 'results' && currentExam && examResults) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
              <CardTitle className="text-2xl">Exam Results: {currentExam.title}</CardTitle>
              <Badge className={examResults.score >= 70 ? 'bg-green-100 text-green-800' : examResults.score >= 40 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                Score: {examResults.score}%
              </Badge>
            </div>
            <CardDescription>Completed on {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="bg-gray-50 border-none">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-gray-500">Total Questions</p>
                  <p className="text-2xl font-bold">{examResults.totalQuestions}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-none">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-green-700">Correct</p>
                  <p className="text-2xl font-bold text-green-700">{examResults.correctAnswers}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50 border-none">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-red-700">Incorrect</p>
                  <p className="text-2xl font-bold text-red-700">{examResults.incorrectAnswers}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-yellow-50 border-none">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-yellow-700">Unanswered</p>
                  <p className="text-2xl font-bold text-yellow-700">{examResults.unanswered}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Score Distribution</h3>
              <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div 
                    className="bg-green-500 h-full" 
                    style={{ width: `${(examResults.correctAnswers / examResults.totalQuestions) * 100}%` }}
                  />
                  <div 
                    className="bg-red-500 h-full" 
                    style={{ width: `${(examResults.incorrectAnswers / examResults.totalQuestions) * 100}%` }}
                  />
                  <div 
                    className="bg-yellow-500 h-full" 
                    style={{ width: `${(examResults.unanswered / examResults.totalQuestions) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Question Analysis</h3>
              
              {currentExam.questions?.map((question, index) => (
                <div key={question.id} className={`p-4 rounded-lg ${
                  !userAnswers[question.id] ? 'bg-yellow-50' :
                  userAnswers[question.id] === question.correctOptionId ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="flex justify-between">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    {!userAnswers[question.id] ? (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Not Answered</Badge>
                    ) : userAnswers[question.id] === question.correctOptionId ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800">Correct</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-100 text-red-800">Incorrect</Badge>
                    )}
                  </div>
                  <p className="mt-2 text-sm">{question.text}</p>
                  
                  {userAnswers[question.id] && userAnswers[question.id] !== question.correctOptionId && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Your answer:</span> {
                        question.options.find(o => o.id === userAnswers[question.id])?.text
                      }
                    </div>
                  )}
                  
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Correct answer:</span> {
                      question.options.find(o => o.id === question.correctOptionId)?.text
                    }
                  </div>
                  
                  <div className="mt-2 p-2 bg-white rounded border text-sm">
                    <span className="font-medium">Explanation:</span> {question.explanation}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download size={14} />
                Download
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share size={14} />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Printer size={14} />
                Print
              </Button>
            </div>
            <Button onClick={handleReturnToList}>
              Return to Exams
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Default view - exam list
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Practice Exams</h2>
          <p className="text-gray-600">
            Test your knowledge with practice exams and quizzes.
          </p>
        </div>
        <Link to="/dashboard/student/exams">
          <Button variant="outline" className="flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="available">Available ({mockExams.available.length})</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress ({mockExams.inProgress.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({mockExams.completed.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockExams.available.map(exam => (
              <PracticeExamCard
                key={exam.id}
                title={exam.title}
                subject={exam.subject}
                description={exam.description}
                questionsCount={exam.questionsCount}
                duration={exam.duration}
                difficulty={exam.difficulty}
                onStart={() => handleStartExam(exam)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inProgress" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockExams.inProgress.map(exam => (
              <PracticeExamCard
                key={exam.id}
                title={exam.title}
                subject={exam.subject}
                description={exam.description}
                questionsCount={exam.questionsCount}
                duration={exam.duration}
                difficulty={exam.difficulty}
                status="in-progress"
                onStart={() => handleStartExam(exam)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockExams.completed.map(exam => (
              <PracticeExamCard
                key={exam.id}
                title={exam.title}
                subject={exam.subject}
                description={exam.description}
                questionsCount={exam.questionsCount}
                duration={exam.duration}
                difficulty={exam.difficulty}
                status="completed"
                score={exam.score}
                dateCompleted={exam.dateCompleted}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface PracticeExamCardProps { 
  title: string; 
  subject: string; 
  description?: string;
  questionsCount: number; 
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  status?: 'available' | 'in-progress' | 'completed';
  score?: number;
  dateCompleted?: string;
  onStart?: () => void;
}

const PracticeExamCard = ({ 
  title, 
  subject, 
  description,
  questionsCount, 
  duration,
  difficulty,
  status = 'available',
  score,
  dateCompleted,
  onStart
}: PracticeExamCardProps) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return '';
    }
  };
  
  const getStatusBadge = () => {
    switch (status) {
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card className="hover:shadow-md transition-all duration-200 h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className="mb-2 bg-indigo-50 text-indigo-700 border-indigo-200">{subject}</Badge>
          {getStatusBadge()}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription className="line-clamp-2">{description}</CardDescription>}
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mt-1 mb-3">
          <Badge variant="outline" className={getDifficultyColor()}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
          
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {questionsCount} questions
          </Badge>
          
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            {duration} min
          </Badge>
        </div>
        
        {status === 'completed' && score !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-500">Score</span>
              <span className={`text-sm font-medium ${
                score >= 70 ? 'text-green-600' : 
                score >= 40 ? 'text-amber-600' : 
                'text-red-600'
              }`}>
                {score}%
              </span>
            </div>
            <Progress value={score} className="h-1.5" />
            {dateCompleted && (
              <p className="text-xs text-gray-500 mt-1">
                Completed on {dateCompleted}
              </p>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {status === 'available' && (
          <Button className="w-full" onClick={onStart}>Start Exam</Button>
        )}
        {status === 'in-progress' && (
          <Button className="w-full" onClick={onStart}>Continue Exam</Button>
        )}
        {status === 'completed' && (
          <div className="w-full grid grid-cols-2 gap-2">
            <Button variant="outline">Review</Button>
            <Button onClick={onStart}>Retake</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
