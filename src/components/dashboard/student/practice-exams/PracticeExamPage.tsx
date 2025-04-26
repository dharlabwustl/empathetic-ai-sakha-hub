
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Timer, Flag, CheckCircle, ArrowLeft, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import MainLayout from '@/components/layouts/MainLayout';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface ExamData {
  id: string;
  title: string;
  subject?: string;
  topic?: string;
  duration: number; // in minutes
  questions: Question[];
}

const mockExams: Record<string, ExamData> = {
  'exam1': {
    id: 'exam1',
    title: 'Physics Mechanics Test',
    subject: 'Physics',
    topic: 'Mechanics',
    duration: 45,
    questions: [
      {
        id: 'q1',
        text: "What is Newton's First Law of Motion?",
        options: [
          "An object at rest stays at rest, and an object in motion stays in motion",
          "Force equals mass times acceleration",
          "For every action, there is an equal and opposite reaction",
          "None of the above"
        ],
        correctAnswer: 0
      },
      {
        id: 'q2',
        text: "In physics, what is the SI unit of force?",
        options: [
          "Watt",
          "Newton",
          "Joule",
          "Pascal"
        ],
        correctAnswer: 1
      },
      {
        id: 'q3',
        text: "Which of the following is a vector quantity?",
        options: [
          "Mass",
          "Time",
          "Velocity",
          "Temperature"
        ],
        correctAnswer: 2
      },
      {
        id: 'q4',
        text: "What is the formula for kinetic energy?",
        options: [
          "KE = mgh",
          "KE = m·v",
          "KE = ½·m·v²",
          "KE = F·d"
        ],
        correctAnswer: 2
      },
      {
        id: 'q5',
        text: "What is the formula for acceleration?",
        options: [
          "a = m/F",
          "a = F/m",
          "a = v/t",
          "a = (v2-v1)/t"
        ],
        correctAnswer: 3
      }
    ]
  },
  'exam2': {
    id: 'exam2',
    title: 'Organic Chemistry Quiz',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    duration: 30,
    questions: [
      {
        id: 'q1',
        text: "What is the general formula for alkanes?",
        options: [
          "CnH2n+2",
          "CnH2n",
          "CnH2n-2",
          "CnHn"
        ],
        correctAnswer: 0
      },
      {
        id: 'q2',
        text: "Which of these is not a functional group?",
        options: [
          "Carbonyl",
          "Carboxyl",
          "Hydroxyl",
          "Metallic"
        ],
        correctAnswer: 3
      }
    ]
  }
};

const PracticeExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isReview = location.state?.review === true;

  const [exam, setExam] = useState<ExamData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewAnswers, setReviewAnswers] = useState<Record<string, number>>({});
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // In a real app, fetch exam data from API
    if (examId && mockExams[examId]) {
      setExam(mockExams[examId]);
      setTimeLeft(mockExams[examId].duration * 60);
      
      // If in review mode, load previous answers
      if (isReview && location.state?.answers) {
        setReviewAnswers(location.state.answers);
      }
      
      setIsLoading(false);
    } else {
      // Handle exam not found
      toast.error("Exam not found");
      navigate("/dashboard/student/exams");
    }
  }, [examId, navigate, isReview, location.state]);

  // Start timer only in exam mode (not review)
  useEffect(() => {
    if (!isReview && exam && !examSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [exam, isReview, examSubmitted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, optionIndex: number) => {
    // Don't allow changing answers in review mode
    if (isReview) return;
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    if (!exam) return;

    // Calculate results
    const totalQuestions = exam.questions.length;
    const attempted = Object.keys(answers).length;
    const correct = exam.questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);

    setExamSubmitted(true);
    toast.success('Exam submitted successfully!');
    
    // Navigate to results page with data
    navigate(`/dashboard/student/exams/${examId}/results`, {
      state: {
        answers,
        flaggedQuestions: Array.from(flaggedQuestions),
        timeSpent: exam.duration * 60 - timeLeft,
        totalQuestions,
        attempted,
        correct,
        exam // Pass the exam data for review
      }
    });
  };
  
  const handleToggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (isLoading || !exam) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto py-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p>Loading exam...</p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isCorrectAnswer = isReview && reviewAnswers[currentQuestion.id] === currentQuestion.correctAnswer;
  const isAnswered = isReview ? reviewAnswers[currentQuestion.id] !== undefined : answers[currentQuestion.id] !== undefined;

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-6">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex flex-col">
                <CardTitle className="text-xl">{exam.title}</CardTitle>
                {exam.subject && (
                  <div className="text-sm text-gray-500 mt-1">
                    {exam.subject} {exam.topic ? `- ${exam.topic}` : ''}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                {isReview ? (
                  <Badge variant="outline" className="text-lg">
                    <Clock className="mr-2 h-4 w-4" />
                    Review Mode
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-lg animate-pulse">
                    <Timer className="mr-2 h-4 w-4" />
                    {formatTime(timeLeft)}
                  </Badge>
                )}
                
                {!isReview && (
                  <Button variant="destructive" onClick={handleSubmit}>
                    Submit Test
                  </Button>
                )}
                
                {isReview && currentQuestion && (
                  <Button 
                    variant={showAnswer ? "secondary" : "outline"}
                    onClick={handleToggleShowAnswer}
                  >
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(currentQuestionIndex + 1) / exam.questions.length * 100} 
              className="h-2" 
            />
            <div className="mt-2 text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {exam.questions.length}
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">
                Question {currentQuestionIndex + 1}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleFlag(currentQuestion.id)}
                className={flaggedQuestions.has(currentQuestion.id) ? "text-red-500" : ""}
              >
                <Flag className="h-4 w-4 mr-1" />
                {flaggedQuestions.has(currentQuestion.id) ? "Flagged" : "Flag"}
              </Button>
            </div>
            
            <p className="text-lg mb-6">{currentQuestion.text}</p>
            
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                // Determine button variant and styling based on context
                let buttonVariant: "default" | "outline" | "destructive" | "secondary" = "outline";
                let extraClasses = "";
                
                if (!isReview) {
                  // Normal exam mode
                  buttonVariant = answers[currentQuestion.id] === index ? "default" : "outline";
                } else if (showAnswer) {
                  // Review mode with answers shown
                  if (index === currentQuestion.correctAnswer) {
                    buttonVariant = "secondary";
                    extraClasses = "border-green-500 border-2";
                  } else if (reviewAnswers[currentQuestion.id] === index) {
                    buttonVariant = "destructive";
                  } else {
                    buttonVariant = "outline";
                  }
                } else {
                  // Review mode without answers shown
                  buttonVariant = reviewAnswers[currentQuestion.id] === index ? "default" : "outline";
                }
                
                return (
                  <Button
                    key={index}
                    variant={buttonVariant}
                    className={`w-full justify-start text-left p-4 ${extraClasses}`}
                    onClick={() => handleAnswer(currentQuestion.id, index)}
                  >
                    {!isReview && answers[currentQuestion.id] === index && (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    {isReview && reviewAnswers[currentQuestion.id] === index && showAnswer && (
                      index === currentQuestion.correctAnswer 
                        ? <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        : <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                    )}
                    {option}
                  </Button>
                );
              })}
            </div>
            
            {isReview && showAnswer && reviewAnswers[currentQuestion.id] !== currentQuestion.correctAnswer && (
              <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-md">
                <p className="text-sm font-medium">Correct Answer:</p>
                <p className="mt-1">{currentQuestion.options[currentQuestion.correctAnswer]}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {isReview && (
              <Button 
                variant="outline"
                onClick={() => navigate("/dashboard/student/exams")}
              >
                Back to Exams
              </Button>
            )}
            
            {currentQuestionIndex === exam.questions.length - 1 && !isReview ? (
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                Finish Exam
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestionIndex(prev => Math.min(exam.questions.length - 1, prev + 1))}
                disabled={currentQuestionIndex === exam.questions.length - 1}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Question Navigation */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium mb-4">Question Navigation</h3>
            <div className="grid grid-cols-10 gap-2">
              {exam.questions.map((q, idx) => {
                // Determine button styling
                const isCurrentQuestion = idx === currentQuestionIndex;
                const isAnsweredQuestion = isReview 
                  ? reviewAnswers[q.id] !== undefined 
                  : answers[q.id] !== undefined;
                const isFlagged = flaggedQuestions.has(q.id);
                
                let bgColor = "bg-gray-100 hover:bg-gray-200";
                
                if (isCurrentQuestion) {
                  bgColor = "bg-blue-100 text-blue-700 border-blue-300";
                } else if (isFlagged) {
                  bgColor = "bg-amber-100 text-amber-700 border-amber-300";
                } else if (isAnsweredQuestion) {
                  bgColor = "bg-green-100 text-green-700 border-green-300";
                }
                
                return (
                  <button
                    key={q.id}
                    className={`${bgColor} rounded-md py-1 px-2 border text-sm font-medium`}
                    onClick={() => setCurrentQuestionIndex(idx)}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 bg-blue-100 border border-blue-300 rounded-sm"></span>
                <span className="text-xs">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 bg-green-100 border border-green-300 rounded-sm"></span>
                <span className="text-xs">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 bg-amber-100 border border-amber-300 rounded-sm"></span>
                <span className="text-xs">Flagged</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 bg-gray-100 border border-gray-300 rounded-sm"></span>
                <span className="text-xs">Unanswered</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PracticeExamPage;
