
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronLeft, ChevronRight, Flag, Clock, HelpCircle } from 'lucide-react';

// Define question type
interface ExamQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswerId: string;
  explanation?: string;
}

// Define exam type
interface Exam {
  id: string;
  title: string;
  subject: string;
  topic: string;
  description: string;
  duration: number; // In minutes
  questions: ExamQuestion[];
  difficulty: 'easy' | 'medium' | 'hard';
}

// Mock data generator
const getExamById = (id: string): Exam => {
  return {
    id,
    title: 'Physics Mechanics Comprehensive Exam',
    subject: 'Physics',
    topic: 'Mechanics',
    description: 'This exam tests your understanding of fundamental mechanics concepts including Newton\'s laws of motion, momentum, and energy conservation.',
    duration: 45,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        text: 'What is Newton\'s first law of motion?',
        options: [
          { id: 'a', text: 'Force equals mass times acceleration' },
          { id: 'b', text: 'An object in motion stays in motion unless acted upon by an external force' },
          { id: 'c', text: 'For every action there is an equal and opposite reaction' },
          { id: 'd', text: 'Energy cannot be created or destroyed' }
        ],
        correctAnswerId: 'b',
        explanation: 'Newton\'s first law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.'
      },
      {
        id: 'q2',
        text: 'What is the SI unit of force?',
        options: [
          { id: 'a', text: 'Newton' },
          { id: 'b', text: 'Joule' },
          { id: 'c', text: 'Watt' },
          { id: 'd', text: 'Pascal' }
        ],
        correctAnswerId: 'a',
        explanation: 'The SI unit of force is the Newton (N), which is equal to kg·m/s².'
      },
      {
        id: 'q3',
        text: 'Which of the following is a vector quantity?',
        options: [
          { id: 'a', text: 'Mass' },
          { id: 'b', text: 'Time' },
          { id: 'c', text: 'Velocity' },
          { id: 'd', text: 'Energy' }
        ],
        correctAnswerId: 'c',
        explanation: 'Velocity is a vector quantity because it has both magnitude (speed) and direction.'
      },
      // Additional questions would be here in a real app
    ]
  };
};

const PracticeExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  // Load exam data
  useEffect(() => {
    if (!examId) return;
    
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const examData = getExamById(examId);
      setExam(examData);
      setTimeRemaining(examData.duration * 60); // Convert minutes to seconds
    } catch (error) {
      console.error("Error loading exam:", error);
    } finally {
      setLoading(false);
    }
    
    // Check if we're in review mode
    const url = window.location.href;
    if (url.includes('review=true')) {
      setIsReviewMode(true);
      setIsExamStarted(true);
      
      // In a real app, we would fetch the user's previous answers
      // For now, we'll just simulate some answers
      if (exam) {
        const simulatedAnswers: Record<string, string> = {};
        exam.questions.forEach((q, index) => {
          // Simulate some answers (correctly answer 70% of questions)
          if (Math.random() > 0.3) {
            simulatedAnswers[q.id] = q.correctAnswerId;
          } else {
            // Get a wrong answer
            const wrongOptions = q.options.filter(o => o.id !== q.correctAnswerId);
            if (wrongOptions.length > 0) {
              simulatedAnswers[q.id] = wrongOptions[0].id;
            }
          }
        });
        setUserAnswers(simulatedAnswers);
      }
    }
  }, [examId]);

  // Timer effect
  useEffect(() => {
    if (!isExamStarted || isExamSubmitted || isReviewMode) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isExamStarted, isExamSubmitted, isReviewMode]);

  const handleStartExam = () => {
    setIsExamStarted(true);
  };

  const handleAnswerChange = (questionId: string, answerId: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleNextQuestion = () => {
    if (exam && currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleFlagQuestion = () => {
    if (!exam) return;
    
    const questionId = exam.questions[currentQuestionIndex].id;
    setFlaggedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  const handleSubmitExam = () => {
    setIsExamSubmitted(true);
    
    // Calculate score - in a real app this would be sent to the server
    let correctAnswers = 0;
    if (exam) {
      exam.questions.forEach(question => {
        if (userAnswers[question.id] === question.correctAnswerId) {
          correctAnswers++;
        }
      });
    }
    
    // Navigate to results page
    setTimeout(() => {
      navigate(`/dashboard/student/exams/${examId}/results`);
    }, 1500);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading || !exam) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If exam hasn't started yet, show start screen
  if (!isExamStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2">
          <ChevronLeft size={16} /> Back to Exams
        </Button>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{exam.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Subject:</h3>
              <p>{exam.subject}</p>
            </div>
            <div>
              <h3 className="font-medium">Topic:</h3>
              <p>{exam.topic}</p>
            </div>
            <div>
              <h3 className="font-medium">Description:</h3>
              <p>{exam.description}</p>
            </div>
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">Duration:</h3>
                <p>{exam.duration} minutes</p>
              </div>
              <div>
                <h3 className="font-medium">Questions:</h3>
                <p>{exam.questions.length}</p>
              </div>
              <div>
                <h3 className="font-medium">Difficulty:</h3>
                <p className="capitalize">{exam.difficulty}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartExam} className="w-full">Start Exam</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // If exam is submitted, show loading screen
  if (isExamSubmitted) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-lg">Calculating your results...</p>
      </div>
    );
  }

  // Get current question
  const currentQuestion = exam.questions[currentQuestionIndex];
  const isQuestionFlagged = flaggedQuestions.includes(currentQuestion.id);
  const currentAnswer = userAnswers[currentQuestion.id] || '';
  const isCorrect = currentAnswer === currentQuestion.correctAnswerId;
  const isAnswered = !!currentAnswer;
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
        {isReviewMode ? (
          <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ChevronLeft size={16} /> Back to Results
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {
              if (confirm("Are you sure you want to exit the exam? Your progress will be lost.")) {
                navigate(-1);
              }
            }}
          >
            <ChevronLeft size={16} /> Exit Exam
          </Button>
        )}

        {!isReviewMode && (
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-red-500" />
            <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Question {currentQuestionIndex + 1} of {exam.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3 flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-lg">Question {currentQuestionIndex + 1}</CardTitle>
            <p className="text-sm text-muted-foreground">{exam.subject} - {exam.topic}</p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className={`flex items-center gap-1 ${isQuestionFlagged ? 'text-amber-600' : ''}`}
            onClick={handleFlagQuestion}
          >
            <Flag className={`h-4 w-4 ${isQuestionFlagged ? 'fill-amber-500 text-amber-600' : ''}`} />
            {isQuestionFlagged ? 'Flagged' : 'Flag'}
          </Button>
        </CardHeader>
        
        <CardContent>
          <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
          <RadioGroup 
            value={currentAnswer}
            onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            className="space-y-3"
            disabled={isReviewMode}
          >
            {currentQuestion.options.map(option => (
              <div key={option.id} className={`
                flex items-center space-x-2 p-3 rounded-md border
                ${isReviewMode && option.id === currentQuestion.correctAnswerId ? 'border-green-500 bg-green-50' : ''}
                ${isReviewMode && currentAnswer === option.id && option.id !== currentQuestion.correctAnswerId ? 'border-red-500 bg-red-50' : ''}
              `}>
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">{option.text}</Label>
                {isReviewMode && option.id === currentQuestion.correctAnswerId && (
                  <Check className="h-5 w-5 text-green-600" />
                )}
              </div>
            ))}
          </RadioGroup>
          
          {isReviewMode && currentQuestion.explanation && (
            <div className="mt-6 p-3 bg-blue-50 rounded-md border border-blue-200">
              <h4 className="font-medium mb-1 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-600" />
                Explanation
              </h4>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-wrap gap-3 justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            
            <Button
              variant="outline"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === exam.questions.length - 1}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
          
          {!isReviewMode && currentQuestionIndex === exam.questions.length - 1 && (
            <Button onClick={handleSubmitExam}>Submit Exam</Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Question navigation */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h4 className="font-medium mb-3">Question Navigation</h4>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {exam.questions.map((question, index) => {
            const isAnsweredQuestion = !!userAnswers[question.id];
            const isFlagged = flaggedQuestions.includes(question.id);
            
            return (
              <Button
                key={question.id}
                variant="outline"
                size="sm"
                className={`h-10 w-10 p-0 relative ${
                  index === currentQuestionIndex ? 'ring-2 ring-offset-2 ring-primary' : ''
                } ${
                  isAnsweredQuestion ? 'bg-blue-50' : ''
                } ${
                  isReviewMode && userAnswers[question.id] === question.correctAnswerId ? 'bg-green-100' : ''
                } ${
                  isReviewMode && userAnswers[question.id] && userAnswers[question.id] !== question.correctAnswerId ? 'bg-red-100' : ''
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
                {isFlagged && (
                  <div className="absolute -top-1 -right-1">
                    <Flag className="h-3 w-3 fill-amber-500 text-amber-600" />
                  </div>
                )}
              </Button>
            );
          })}
        </div>
        <div className="mt-4 flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-blue-50 border rounded-sm"></div>
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 border rounded-sm"></div>
            <span>Unanswered</span>
          </div>
          <div className="flex items-center gap-1">
            <Flag className="h-3 w-3 fill-amber-500 text-amber-600" />
            <span>Flagged</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeExamPage;
