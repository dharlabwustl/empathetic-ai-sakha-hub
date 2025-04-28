
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialog } from '@/components/ui/alert-dialog';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { ExamQuestion } from '@/types/user/exam';

const ExamAttemptPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [examData, setExamData] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isTimeoutDialogOpen, setIsTimeoutDialogOpen] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchExamData = () => {
      setLoading(true);
      
      // Mock data
      setTimeout(() => {
        const mockExam = {
          id: examId,
          title: 'Physics Mock Test #2',
          subject: 'Physics',
          timeLimit: 60, // in minutes
          totalQuestions: 10,
          questions: [
            {
              id: '1',
              question: 'Which of the following is a vector quantity?',
              options: ['Mass', 'Speed', 'Velocity', 'Temperature'],
              correctAnswer: '2', // index of correct option
              type: 'multiple-choice',
              points: 1
            },
            {
              id: '2',
              question: 'The SI unit of force is:',
              options: ['Kilogram', 'Newton', 'Joule', 'Watt'],
              correctAnswer: '1',
              type: 'multiple-choice',
              points: 1
            },
            {
              id: '3',
              question: 'Which of these represents the equation for work done?',
              options: ['W = m × g', 'W = F × d', 'W = m × v²', 'W = F / d'],
              correctAnswer: '1',
              type: 'multiple-choice',
              points: 1
            },
            {
              id: '4',
              question: 'According to Newton\'s Third Law:',
              options: [
                'An object at rest stays at rest unless acted upon by an external force',
                'Force equals mass times acceleration',
                'For every action, there is an equal and opposite reaction',
                'Energy can neither be created nor destroyed'
              ],
              correctAnswer: '2',
              type: 'multiple-choice',
              points: 1
            },
            {
              id: '5',
              question: 'Which of these is a unit of power?',
              options: ['Joule', 'Newton', 'Watt', 'Pascal'],
              correctAnswer: '2',
              type: 'multiple-choice',
              points: 1
            }
          ]
        };
        
        setExamData(mockExam);
        setTimeRemaining(mockExam.timeLimit * 60);
        setLoading(false);
      }, 1000);
    };
    
    fetchExamData();
  }, [examId]);
  
  // Timer effect
  useEffect(() => {
    if (!loading && examData) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTimeoutDialogOpen(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [loading, examData]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const handleMarkForReview = (questionId: string) => {
    if (markedForReview.includes(questionId)) {
      setMarkedForReview(prev => prev.filter(id => id !== questionId));
    } else {
      setMarkedForReview(prev => [...prev, questionId]);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmitExam = () => {
    // Calculate results
    let score = 0;
    let totalPoints = 0;
    
    const scoredAnswers = examData.questions.map((q: ExamQuestion) => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      totalPoints += q.points;
      if (isCorrect) score += q.points;
      
      return {
        questionId: q.id,
        userAnswer: userAnswers[q.id],
        correct: isCorrect,
        points: isCorrect ? q.points : 0
      };
    });
    
    // In a real app, this would be an API call to save the attempt
    toast({
      title: "Exam Submitted",
      description: `Your score: ${score}/${totalPoints}`
    });
    
    // Navigate to results page with attempt data
    navigate(`/dashboard/student/exams/review/${examId}`, {
      state: {
        examData,
        userAnswers,
        score,
        totalPoints,
        timeTaken: examData.timeLimit * 60 - timeRemaining
      }
    });
  };
  
  const handleNavigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  
  const handleTimeoutSubmit = () => {
    setIsTimeoutDialogOpen(false);
    handleSubmitExam();
  };
  
  if (loading) {
    return (
      <SharedPageLayout 
        title="Loading Exam..." 
        subtitle="Please wait while we prepare your exam"
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }
  
  if (!examData) {
    return (
      <SharedPageLayout 
        title="Exam Not Found" 
        subtitle="The requested exam could not be found"
      >
        <Button 
          onClick={() => navigate('/dashboard/student/practice-exam')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Practice Exams
        </Button>
      </SharedPageLayout>
    );
  }
  
  const currentQuestion = examData.questions[currentQuestionIndex];
  const isMarkedForReview = markedForReview.includes(currentQuestion.id);
  const isAnswered = userAnswers[currentQuestion.id] !== undefined;
  const progressPercentage = (currentQuestionIndex + 1) / examData.questions.length * 100;
  
  return (
    <SharedPageLayout
      title={examData.title}
      subtitle={`${examData.subject} • ${examData.totalQuestions} questions • ${examData.timeLimit} minutes`}
      showQuickAccess={false}
    >
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 py-2 border-b border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSubmitDialogOpen(true)}
              className="text-muted-foreground"
            >
              Exit Exam
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className={timeRemaining < 300 ? "text-red-500" : "text-muted-foreground"} />
            <span className={`font-medium ${timeRemaining < 300 ? "text-red-500" : ""}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Question {currentQuestionIndex + 1} of {examData.questions.length}</span>
          <Badge variant={isMarkedForReview ? "outline" : "secondary"}>
            {isMarkedForReview ? "Marked for Review" : isAnswered ? "Answered" : "Not Answered"}
          </Badge>
        </div>
        <Progress value={progressPercentage} />
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Q{currentQuestionIndex + 1}. {currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={userAnswers[currentQuestion.id]} 
            onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
          >
            {currentQuestion.options.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => handlePrevQuestion()}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Previous
            </Button>
            <Button 
              variant={isMarkedForReview ? "default" : "secondary"}
              onClick={() => handleMarkForReview(currentQuestion.id)}
              className="flex items-center gap-2"
            >
              {isMarkedForReview ? "Unmark for Review" : "Mark for Review"}
            </Button>
          </div>
          <div>
            {currentQuestionIndex < examData.questions.length - 1 ? (
              <Button 
                onClick={() => handleNextQuestion()}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button 
                onClick={() => setIsSubmitDialogOpen(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Exam
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Question Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {examData.questions.map((q: ExamQuestion, index: number) => {
              const isCurrentQuestion = index === currentQuestionIndex;
              const isQuestionAnswered = userAnswers[q.id] !== undefined;
              const isQuestionMarked = markedForReview.includes(q.id);
              
              return (
                <Button 
                  key={q.id}
                  size="sm"
                  variant={isQuestionAnswered ? "default" : "outline"}
                  className={`w-10 h-10 p-0 ${
                    isCurrentQuestion ? "ring-2 ring-black dark:ring-white" : ""
                  } ${
                    isQuestionMarked ? "border-orange-500 dark:border-orange-500" : ""
                  }`}
                  onClick={() => handleNavigateToQuestion(index)}
                >
                  {index + 1}
                </Button>
              );
            })}
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-gray-200 dark:border-gray-700 rounded-sm"></div>
              <span>Not Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-orange-500 rounded-sm"></div>
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-black dark:border-white rounded-sm"></div>
              <span>Current Question</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button 
            onClick={() => setIsSubmitDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            Submit Exam
          </Button>
        </CardFooter>
      </Card>
      
      {/* Submit Confirmation Dialog */}
      <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Exam?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your exam?
              
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>
                    {Object.keys(userAnswers).length} of {examData.questions.length} questions answered
                  </span>
                </div>
                
                {Object.keys(userAnswers).length < examData.questions.length && (
                  <div className="flex items-center gap-2 text-orange-600">
                    <AlertTriangle size={16} />
                    <span>
                      {examData.questions.length - Object.keys(userAnswers).length} questions unanswered
                    </span>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Exam</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitExam}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Timeout Dialog */}
      <AlertDialog open={isTimeoutDialogOpen} onOpenChange={setIsTimeoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your exam time has expired. Your answers will be submitted automatically.
              
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>
                    {Object.keys(userAnswers).length} of {examData.questions.length} questions answered
                  </span>
                </div>
                
                {Object.keys(userAnswers).length < examData.questions.length && (
                  <div className="flex items-center gap-2 text-orange-600">
                    <XCircle size={16} />
                    <span>
                      {examData.questions.length - Object.keys(userAnswers).length} questions unanswered
                    </span>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleTimeoutSubmit}>View Results</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SharedPageLayout>
  );
};

export default ExamAttemptPage;
