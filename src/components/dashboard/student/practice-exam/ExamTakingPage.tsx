
import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, X, Flag, ChevronRight, ChevronLeft, 
  Check, AlertCircle, Home, Save 
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

interface ExamData {
  id: string;
  title: string;
  subject: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
}

// Mock data for the exam
const mockExams: Record<string, ExamData> = {
  "physics-mechanics": {
    id: "physics-mechanics",
    title: "Physics Mechanics Exam",
    subject: "Physics",
    description: "Test your knowledge of classical mechanics concepts",
    duration: 30,
    questions: [
      {
        id: "q1",
        text: "Which of Newton's laws states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force?",
        options: [
          "Newton's First Law",
          "Newton's Second Law",
          "Newton's Third Law",
          "Newton's Law of Gravitation"
        ],
        correctOptionIndex: 0
      },
      {
        id: "q2",
        text: "What is the formula for force?",
        options: [
          "F = mv",
          "F = ma",
          "F = m/a",
          "F = a/m"
        ],
        correctOptionIndex: 1
      },
      {
        id: "q3",
        text: "For every action, there is an equal and opposite reaction. This is:",
        options: [
          "Newton's First Law",
          "Newton's Second Law",
          "Newton's Third Law",
          "Law of Conservation of Energy"
        ],
        correctOptionIndex: 2
      },
      {
        id: "q4",
        text: "What is momentum?",
        options: [
          "The resistance of an object to changes in its motion",
          "The product of mass and velocity",
          "The rate of change of velocity",
          "The sum of all forces acting on an object"
        ],
        correctOptionIndex: 1
      },
      {
        id: "q5",
        text: "Which of the following is a unit of force?",
        options: [
          "Joule",
          "Watt",
          "Newton",
          "Pascal"
        ],
        correctOptionIndex: 2
      }
    ]
  },
  "chemistry-organic": {
    id: "chemistry-organic",
    title: "Organic Chemistry Quiz",
    subject: "Chemistry",
    description: "Test your knowledge of organic chemistry fundamentals",
    duration: 20,
    questions: [
      {
        id: "q1",
        text: "What are alkanes?",
        options: [
          "Hydrocarbons with double bonds",
          "Hydrocarbons with triple bonds",
          "Saturated hydrocarbons with single bonds",
          "Cyclic hydrocarbons with aromatic rings"
        ],
        correctOptionIndex: 2
      },
      {
        id: "q2",
        text: "What is a functional group in organic chemistry?",
        options: [
          "A specific group of atoms responsible for characteristic reactions",
          "The longest carbon chain in a molecule",
          "The central carbon atom in a molecule",
          "A group of compounds with similar properties"
        ],
        correctOptionIndex: 0
      },
      {
        id: "q3",
        text: "What is isomerism?",
        options: [
          "The property of having the same number of atoms",
          "Compounds with the same molecular formula but different structures",
          "The property of having the same physical properties",
          "Compounds with different molecular formulas"
        ],
        correctOptionIndex: 1
      }
    ]
  }
};

export default function ExamTakingPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isTimeUpDialogOpen, setIsTimeUpDialogOpen] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const examData = examId && mockExams[examId] ? mockExams[examId] : null;
  
  // Initialize the exam state
  useEffect(() => {
    if (examData) {
      // Initialize user answers array with nulls
      setUserAnswers(new Array(examData.questions.length).fill(null));
      // Set initial timer value
      setTimeRemaining(examData.duration * 60);
    }
  }, [examData]);
  
  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimeUpDialogOpen(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeRemaining]);
  
  if (!examData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold">Exam Not Found</h2>
          <p className="mt-2 text-gray-500">The exam you're looking for doesn't exist.</p>
          <Link to="/dashboard/student/practice-exam" className="mt-4 inline-block">
            <Button>Back to Practice Exams</Button>
          </Link>
        </Card>
      </div>
    );
  }
  
  const currentQuestion = examData.questions[currentQuestionIndex];
  
  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleFlagQuestion = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex);
      } else {
        newSet.add(currentQuestionIndex);
      }
      return newSet;
    });
  };
  
  const handleSubmitExam = () => {
    // Stop the timer
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Calculate score
    let correctAnswers = 0;
    examData.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctOptionIndex) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / examData.questions.length) * 100);
    
    // Navigate to the review page with result data
    navigate(`/dashboard/student/practice-exam/${examId}/review`, { 
      state: { 
        userAnswers,
        score,
        timeSpent: examData.duration * 60 - timeRemaining
      } 
    });
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const answeredCount = userAnswers.filter(answer => answer !== null).length;
  const progress = (answeredCount / examData.questions.length) * 100;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard/student/practice-exam" className="text-blue-600">
              <Home className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold">{examData.title}</h1>
          </div>
          <p className="text-muted-foreground">{examData.subject}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={`${
            timeRemaining < 60 ? 'bg-red-50 text-red-700 border-red-200' :
            timeRemaining < 300 ? 'bg-amber-50 text-amber-700 border-amber-200' :
            'bg-blue-50 text-blue-700 border-blue-200'
          }`}>
            <Clock className="h-3.5 w-3.5 mr-1" /> {formatTime(timeRemaining)}
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Question {currentQuestionIndex + 1} of {examData.questions.length}
          </Badge>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Answered: {answeredCount}/{examData.questions.length}</span>
          <span>Flagged: {flaggedQuestions.size}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <Card className="mb-8 shadow-lg">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <Badge className={flaggedQuestions.has(currentQuestionIndex) ? 
              "bg-amber-100 text-amber-800 border-amber-200" : 
              "bg-gray-100 text-gray-800 border-gray-200"
            }>
              Question {currentQuestionIndex + 1}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleFlagQuestion}
              className={`flex items-center gap-1 ${
                flaggedQuestions.has(currentQuestionIndex) ? 'text-amber-600' : ''
              }`}
            >
              <Flag className="h-4 w-4" />
              {flaggedQuestions.has(currentQuestionIndex) ? 'Unflag' : 'Flag'} for review
            </Button>
          </div>
          
          <h2 className="text-xl font-medium mt-4">{currentQuestion.text}</h2>
        </div>
        
        <div className="p-6">
          <RadioGroup 
            value={userAnswers[currentQuestionIndex] !== null ? 
              userAnswers[currentQuestionIndex]!.toString() : undefined
            }
            onValueChange={(value) => handleAnswerSelect(parseInt(value, 10))}
          >
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`}
                    className="flex-grow p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </Card>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center justify-center"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          Previous
        </Button>
        
        <Button
          variant="outline" 
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === examData.questions.length - 1}
          className="flex items-center justify-center"
        >
          Next
          <ChevronRight className="ml-1 h-5 w-5" />
        </Button>
        
        <Button
          variant="default"
          onClick={() => navigate(`/dashboard/student/practice-exam/${examId}/review`, { 
            state: { 
              userAnswers, 
              timeSpent: examData.duration * 60 - timeRemaining,
              incomplete: true
            } 
          })}
          className="flex items-center justify-center bg-amber-600 hover:bg-amber-700"
        >
          <Save className="mr-1 h-5 w-5" />
          Save Progress
        </Button>
        
        <Button
          variant="default"
          onClick={() => setIsSubmitDialogOpen(true)}
          className="flex items-center justify-center bg-green-600 hover:bg-green-700"
        >
          <Check className="mr-1 h-5 w-5" />
          Submit Exam
        </Button>
      </div>
      
      {/* Question navigation */}
      <div className="mt-8">
        <h3 className="text-sm font-medium mb-3">Question Navigation</h3>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {examData.questions.map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={`w-full h-10 ${
                index === currentQuestionIndex ? 'border-2 border-blue-500' : ''
              } ${
                userAnswers[index] !== null ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
              } ${
                flaggedQuestions.has(index) ? 'border-amber-500' : ''
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
              {flaggedQuestions.has(index) && (
                <Flag className="h-3 w-3 text-amber-600 absolute top-1 right-1" />
              )}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Submit confirmation dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Exam</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit this exam? You have answered {answeredCount} out of {examData.questions.length} questions.
              {answeredCount < examData.questions.length && (
                <div className="mt-2 text-amber-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  You still have {examData.questions.length - answeredCount} unanswered questions.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitExam}>
              Submit Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Time's up dialog */}
      <Dialog open={isTimeUpDialogOpen} onOpenChange={setIsTimeUpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Time's Up!</DialogTitle>
            <DialogDescription>
              Your exam time has ended. Your answers will be submitted automatically.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleSubmitExam}>
              View Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
