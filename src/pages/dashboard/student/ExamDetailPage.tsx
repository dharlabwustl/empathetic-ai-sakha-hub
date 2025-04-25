
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Check, Clock, AlertCircle, ChevronLeft, ChevronRight, Flag, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

// Mock exam data - would come from an API in a real application
const mockExam = {
  id: 'exam1',
  title: 'Physics Unit Test: Mechanics',
  subject: 'Physics',
  duration: 60, // minutes
  totalQuestions: 10,
  difficulty: 'medium',
  instructions: 'This exam covers basic mechanics concepts. Answer all questions. You have 60 minutes to complete this exam.',
  questions: [
    {
      id: 'q1',
      text: "A body moves with constant acceleration. If its velocity at t = 0 is u and at t = T is v, then its velocity at t = T/2 will be:",
      options: [
        { id: 'a', text: "(u + v)/2" },
        { id: 'b', text: "u + v" },
        { id: 'c', text: "v/2" },
        { id: 'd', text: "u/2 + v/2" }
      ],
      correctAnswer: 'a',
      explanation: "Due to constant acceleration, the velocity changes uniformly with time. The average velocity is (u + v)/2."
    },
    {
      id: 'q2',
      text: "A particle moving along x-axis has acceleration a = -kx, where k is a positive constant. If the particle starts from the origin with initial velocity v₀, find the maximum distance traveled by the particle:",
      options: [
        { id: 'a', text: "v₀²/k" },
        { id: 'b', text: "v₀/k" },
        { id: 'c', text: "v₀²/(2k)" },
        { id: 'd', text: "v₀/(2k)" }
      ],
      correctAnswer: 'a',
      explanation: "This is a simple harmonic motion. The maximum displacement occurs when velocity becomes zero, which happens at x = v₀/√k. Squaring gives v₀²/k."
    },
    {
      id: 'q3',
      text: "A force of 10 N acts on a body of mass 2 kg for 3 seconds. What is the change in momentum of the body?",
      options: [
        { id: 'a', text: "5 kg·m/s" },
        { id: 'b', text: "15 kg·m/s" },
        { id: 'c', text: "30 kg·m/s" },
        { id: 'd', text: "60 kg·m/s" }
      ],
      correctAnswer: 'c',
      explanation: "Change in momentum = Force × Time = 10 N × 3 s = 30 kg·m/s"
    },
    {
      id: 'q4',
      text: "A body is thrown vertically upwards with velocity u. The time taken to reach the maximum height is:",
      options: [
        { id: 'a', text: "u/g" },
        { id: 'b', text: "u/2g" },
        { id: 'c', text: "2u/g" },
        { id: 'd', text: "u²/2g" }
      ],
      correctAnswer: 'a',
      explanation: "At maximum height, velocity becomes zero. Using v = u - gt, 0 = u - gt, thus t = u/g"
    },
    {
      id: 'q5',
      text: "The dimensional formula for angular momentum is:",
      options: [
        { id: 'a', text: "MLT⁻¹" },
        { id: 'b', text: "ML²T⁻¹" },
        { id: 'c', text: "ML²T⁻²" },
        { id: 'd', text: "MLT⁻²" }
      ],
      correctAnswer: 'b',
      explanation: "Angular momentum = moment of inertia × angular velocity = (mass × radius²) × (1/time) = ML²T⁻¹"
    },
    {
      id: 'q6',
      text: "A car moves with a constant acceleration of 2 m/s². What is its speed after 5 seconds if it starts from rest?",
      options: [
        { id: 'a', text: "5 m/s" },
        { id: 'b', text: "10 m/s" },
        { id: 'c', text: "25 m/s" },
        { id: 'd', text: "50 m/s" }
      ],
      correctAnswer: 'b',
      explanation: "Using v = u + at where u = 0, v = 0 + 2 × 5 = 10 m/s"
    },
    {
      id: 'q7',
      text: "Two bodies with masses m and 2m collide elastically. If the first body is initially moving with velocity v and the second is at rest, what will be the velocity of the first body after collision?",
      options: [
        { id: 'a', text: "-v/3" },
        { id: 'b', text: "v/3" },
        { id: 'c', text: "-v" },
        { id: 'd', text: "2v/3" }
      ],
      correctAnswer: 'a',
      explanation: "Using conservation of momentum and kinetic energy for elastic collisions, the velocity of the first body will be (m-2m)/(m+2m) × v = -v/3"
    },
    {
      id: 'q8',
      text: "What is the moment of inertia of a thin rod of mass M and length L about an axis passing through its center and perpendicular to its length?",
      options: [
        { id: 'a', text: "ML²/12" },
        { id: 'b', text: "ML²/3" },
        { id: 'c', text: "ML²/6" },
        { id: 'd', text: "ML²/4" }
      ],
      correctAnswer: 'a',
      explanation: "The moment of inertia of a thin rod about its center is ML²/12"
    },
    {
      id: 'q9',
      text: "A constant force acts on a body of mass 2 kg. The body starts from rest and attains a velocity of 10 m/s in 5 seconds. The power delivered by the force at the end of 5 seconds is:",
      options: [
        { id: 'a', text: "20 W" },
        { id: 'b', text: "40 W" },
        { id: 'c', text: "100 W" },
        { id: 'd', text: "4 W" }
      ],
      correctAnswer: 'b',
      explanation: "Force = ma = m(v-u)/t = 2(10-0)/5 = 4 N. Power = F·v = 4 × 10 = 40 W"
    },
    {
      id: 'q10',
      text: "A wheel is making 360 revolutions per minute. Its angular velocity in radians per second is:",
      options: [
        { id: 'a', text: "6π" },
        { id: 'b', text: "12π" },
        { id: 'c', text: "360π" },
        { id: 'd', text: "720π" }
      ],
      correctAnswer: 'b',
      explanation: "Angular velocity = (360 rev/min) × (2π rad/rev) × (1 min/60 s) = 12π rad/s"
    }
  ]
};

interface Answer {
  questionId: string;
  selectedOption: string | null;
  isMarked: boolean;
}

const ExamDetailPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isReviewMode = window.location.pathname.includes('/review');
  
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mockExam.duration * 60); // in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  
  // Initialize answers
  useEffect(() => {
    const initialAnswers = mockExam.questions.map(q => ({
      questionId: q.id,
      selectedOption: null,
      isMarked: false
    }));
    setAnswers(initialAnswers);
    
    // In review mode, populate with 'correct' answers for demonstration
    if (isReviewMode) {
      const reviewAnswers = mockExam.questions.map((q, index) => ({
        questionId: q.id,
        // For demonstration, make some right and some wrong
        selectedOption: index % 3 === 0 ? (q.correctAnswer === 'a' ? 'b' : 'a') : q.correctAnswer,
        isMarked: index % 4 === 0
      }));
      setAnswers(reviewAnswers);
      setIsExamSubmitted(true);
      
      // Calculate score for review mode
      const correctAnswers = reviewAnswers.filter((answer, index) => 
        answer.selectedOption === mockExam.questions[index].correctAnswer
      ).length;
      setExamScore(correctAnswers);
    }
  }, [isReviewMode]);
  
  // Timer countdown
  useEffect(() => {
    if (isReviewMode || isExamSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isReviewMode, isExamSubmitted]);
  
  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isReviewMode || isExamSubmitted) return;
    
    setAnswers(prev => 
      prev.map(answer => 
        answer.questionId === questionId 
          ? { ...answer, selectedOption: optionId } 
          : answer
      )
    );
  };
  
  const handleToggleMark = (questionId: string) => {
    if (isReviewMode || isExamSubmitted) return;
    
    setAnswers(prev => 
      prev.map(answer => 
        answer.questionId === questionId 
          ? { ...answer, isMarked: !answer.isMarked } 
          : answer
      )
    );
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockExam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  
  const handleSubmitExam = () => {
    // Calculate score
    const correctAnswers = answers.filter((answer, index) => 
      answer.selectedOption === mockExam.questions[index].correctAnswer
    ).length;
    
    setExamScore(correctAnswers);
    setIsExamSubmitted(true);
    setIsSubmitDialogOpen(false);
    
    toast({
      title: "Exam Submitted",
      description: `Your score: ${correctAnswers}/${mockExam.questions.length}`,
    });
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const currentQuestion = mockExam.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  
  const getOptionClassName = (optionId: string) => {
    const baseClasses = "flex items-start p-3 rounded-md border gap-3 cursor-pointer";
    
    if (isReviewMode || isExamSubmitted) {
      const isSelected = currentAnswer?.selectedOption === optionId;
      const isCorrect = optionId === currentQuestion.correctAnswer;
      
      if (isSelected && isCorrect) {
        return `${baseClasses} bg-green-50 border-green-300`;
      } else if (isSelected && !isCorrect) {
        return `${baseClasses} bg-red-50 border-red-300`;
      } else if (!isSelected && isCorrect) {
        return `${baseClasses} bg-blue-50 border-blue-300`;
      } else {
        return `${baseClasses} hover:bg-gray-50`;
      }
    }
    
    if (currentAnswer?.selectedOption === optionId) {
      return `${baseClasses} bg-blue-50 border-blue-300`;
    }
    
    return `${baseClasses} hover:bg-gray-50`;
  };

  return (
    <div className="container py-6 space-y-6">
      {/* Exam Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <Button 
            variant="ghost" 
            className="flex items-center mb-2" 
            onClick={() => navigate('/dashboard/student/practice-exams')}
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Exams
          </Button>
          <h1 className="text-2xl font-bold">{mockExam.title}</h1>
          <p className="text-gray-600">{mockExam.subject} | {mockExam.difficulty} | {mockExam.totalQuestions} Questions</p>
        </div>
        
        <div className="flex flex-col items-end">
          {!isReviewMode && !isExamSubmitted && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
              <Clock size={18} />
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
          )}
          
          {(isReviewMode || isExamSubmitted) && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700">
              <Check size={18} />
              <span className="font-semibold">Score: {examScore}/{mockExam.questions.length}</span>
            </div>
          )}
          
          <p className="text-sm text-gray-500 mt-1">
            {isReviewMode 
              ? 'Review Mode' 
              : isExamSubmitted 
                ? 'Exam Completed' 
                : `Questions: ${currentQuestionIndex + 1}/${mockExam.questions.length}`
            }
          </p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <Progress value={((currentQuestionIndex + 1) / mockExam.questions.length) * 100} className="h-2" />
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Questions Navigation Panel */}
        <Card className="order-2 lg:order-1">
          <CardHeader>
            <CardTitle className="text-lg">Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {mockExam.questions.map((question, index) => {
                const answer = answers[index];
                let buttonClass = "flex items-center justify-center w-full h-10 rounded-md";
                
                if (answer?.isMarked) {
                  buttonClass += " bg-yellow-100 text-yellow-800 border-2 border-yellow-300";
                } else if (answer?.selectedOption) {
                  if (isReviewMode || isExamSubmitted) {
                    const isCorrect = answer.selectedOption === question.correctAnswer;
                    buttonClass += isCorrect 
                      ? " bg-green-100 text-green-800" 
                      : " bg-red-100 text-red-800";
                  } else {
                    buttonClass += " bg-blue-100 text-blue-800";
                  }
                } else {
                  buttonClass += " bg-gray-100 text-gray-800";
                }
                
                if (index === currentQuestionIndex) {
                  buttonClass += " ring-2 ring-offset-2 ring-blue-500";
                }
                
                return (
                  <button 
                    key={question.id} 
                    className={buttonClass}
                    onClick={() => handleJumpToQuestion(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-100"></div>
                <span className="text-sm">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-100"></div>
                <span className="text-sm">Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-100"></div>
                <span className="text-sm">Unattempted</span>
              </div>
              {(isReviewMode || isExamSubmitted) && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-100"></div>
                    <span className="text-sm">Correct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-100"></div>
                    <span className="text-sm">Incorrect</span>
                  </div>
                </>
              )}
            </div>
            
            {!isReviewMode && !isExamSubmitted && (
              <Button 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsSubmitDialogOpen(true)}
              >
                Submit Exam
              </Button>
            )}
            
            {(isReviewMode || isExamSubmitted) && (
              <Button 
                className="w-full mt-4"
                onClick={() => navigate('/dashboard/student/practice-exams')}
              >
                Back to Exams
              </Button>
            )}
          </CardContent>
        </Card>
        
        {/* Current Question */}
        <Card className="lg:col-span-3 order-1 lg:order-2">
          <CardContent className="p-6">
            {/* Question */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Question {currentQuestionIndex + 1}/{mockExam.questions.length}
                </Badge>
                
                {!isReviewMode && !isExamSubmitted && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleToggleMark(currentQuestion.id)}
                    className={`flex items-center gap-1 ${
                      currentAnswer?.isMarked 
                        ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                        : ''
                    }`}
                  >
                    <Flag size={14} />
                    {currentAnswer?.isMarked ? 'Marked' : 'Mark for Review'}
                  </Button>
                )}
              </div>
              
              <h3 className="text-lg font-medium">{currentQuestion.text}</h3>
              
              <div className="space-y-3 mt-4">
                {currentQuestion.options.map(option => (
                  <div
                    key={option.id}
                    className={getOptionClassName(option.id)}
                    onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                  >
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full border text-sm ${
                      currentAnswer?.selectedOption === option.id 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}>
                      {option.id.toUpperCase()}
                    </div>
                    <div>{option.text}</div>
                  </div>
                ))}
              </div>
              
              {/* Explanation for review mode */}
              {(isReviewMode || isExamSubmitted) && (
                <div className="mt-6 bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-1">Explanation:</h4>
                  <p className="text-blue-700">{currentQuestion.explanation}</p>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="text-sm font-medium">Correct Answer:</span>
                      <span className="text-sm font-medium text-green-700">
                        {currentQuestion.correctAnswer.toUpperCase()}
                      </span>
                    </div>
                    
                    {currentAnswer?.selectedOption !== currentQuestion.correctAnswer && (
                      <div className="flex gap-1">
                        <span className="text-sm font-medium">Your Answer:</span>
                        <span className="text-sm font-medium text-red-700">
                          {currentAnswer?.selectedOption?.toUpperCase() || 'None'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="mr-1" size={16} />
                Previous
              </Button>
              
              <Button
                variant="outline"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === mockExam.questions.length - 1}
              >
                Next
                <ChevronRight className="ml-1" size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Submit Exam Dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Exam</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your exam? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Questions:</span>
              <span>{mockExam.questions.length}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span>Answered:</span>
              <span>{answers.filter(a => a.selectedOption).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Unanswered:</span>
              <span>{answers.filter(a => !a.selectedOption).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Marked for Review:</span>
              <span>{answers.filter(a => a.isMarked).length}</span>
            </div>
            
            {answers.filter(a => !a.selectedOption).length > 0 && (
              <div className="bg-amber-50 p-3 rounded-md flex items-start gap-2">
                <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                <p className="text-sm text-amber-700">
                  You have {answers.filter(a => !a.selectedOption).length} unanswered question(s).
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
              Back to Exam
            </Button>
            <Button onClick={handleSubmitExam}>
              Submit Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamDetailPage;
