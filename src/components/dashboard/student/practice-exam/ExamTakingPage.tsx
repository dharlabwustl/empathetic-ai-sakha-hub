
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useToast } from "@/hooks/use-toast";

// Mock exam data
const mockExams = {
  "physics-101": {
    id: "physics-101",
    title: "Physics Basics Assessment",
    subject: "Physics",
    totalQuestions: 10,
    timeLimit: 30, // minutes
    questions: [
      {
        id: "q1",
        text: "What is Newton's second law of motion?",
        options: [
          "An object at rest stays at rest unless acted upon by an external force.",
          "Force equals mass times acceleration (F=ma).",
          "For every action, there is an equal and opposite reaction.",
          "Objects with mass attract each other with a force proportional to their masses."
        ],
        correctAnswer: 1
      },
      {
        id: "q2",
        text: "Which of the following is a unit of force?",
        options: [
          "Watt",
          "Joule",
          "Newton",
          "Pascal"
        ],
        correctAnswer: 2
      },
      {
        id: "q3",
        text: "What is the formula for calculating kinetic energy?",
        options: [
          "KE = mgh",
          "KE = 1/2mv²",
          "KE = F×d",
          "KE = P×V"
        ],
        correctAnswer: 1
      },
      // More questions would be added here...
      {
        id: "q4",
        text: "Which law of thermodynamics states that energy cannot be created or destroyed?",
        options: [
          "Zeroth law",
          "First law",
          "Second law",
          "Third law"
        ],
        correctAnswer: 1
      },
      {
        id: "q5",
        text: "What is the SI unit of electric current?",
        options: [
          "Volt",
          "Watt",
          "Ampere",
          "Ohm"
        ],
        correctAnswer: 2
      }
    ],
    difficulty: "medium"
  },
  "chemistry-fundamentals": {
    id: "chemistry-fundamentals",
    title: "Chemistry Fundamentals",
    subject: "Chemistry",
    totalQuestions: 8,
    timeLimit: 25, // minutes
    questions: [
      {
        id: "q1",
        text: "What is the chemical symbol for gold?",
        options: [
          "Go",
          "Au",
          "Ag",
          "Gd"
        ],
        correctAnswer: 1
      },
      {
        id: "q2",
        text: "Which is NOT a state of matter?",
        options: [
          "Solid",
          "Liquid",
          "Gas",
          "Energy"
        ],
        correctAnswer: 3
      },
      {
        id: "q3",
        text: "What is the pH of a neutral solution?",
        options: [
          "0",
          "7",
          "10",
          "14"
        ],
        correctAnswer: 1
      },
      // More questions would be added here...
      {
        id: "q4",
        text: "What is the main component of natural gas?",
        options: [
          "Ethane",
          "Propane",
          "Methane",
          "Butane"
        ],
        correctAnswer: 2
      },
      {
        id: "q5",
        text: "Which element has the atomic number 1?",
        options: [
          "Oxygen",
          "Carbon",
          "Hydrogen",
          "Helium"
        ],
        correctAnswer: 2
      }
    ],
    difficulty: "easy"
  }
};

export default function ExamTakingPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentExam, setCurrentExam] = useState<any | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  
  useEffect(() => {
    if (examId && mockExams[examId as keyof typeof mockExams]) {
      const exam = mockExams[examId as keyof typeof mockExams];
      setCurrentExam(exam);
      setTimeRemaining(exam.timeLimit * 60); // Convert to seconds
    }
  }, [examId]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [examStarted, timeRemaining]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const startExam = () => {
    setExamStarted(true);
    toast({
      title: "Exam Started",
      description: `You have ${currentExam.timeLimit} minutes to complete this exam.`,
    });
  };
  
  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentExam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const toggleMarkForReview = (questionId: string) => {
    if (markedForReview.includes(questionId)) {
      setMarkedForReview(prev => prev.filter(id => id !== questionId));
    } else {
      setMarkedForReview(prev => [...prev, questionId]);
    }
  };
  
  const handleSubmitExam = () => {
    // Calculate results
    const totalQuestions = currentExam.questions.length;
    let correctAnswers = 0;
    
    currentExam.questions.forEach((question: any) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Store results in localStorage for review page
    const results = {
      examId: currentExam.id,
      answers,
      score,
      correctAnswers,
      totalQuestions,
      timeSpent: currentExam.timeLimit * 60 - timeRemaining,
      date: new Date().toISOString(),
      markedQuestions: markedForReview
    };
    
    localStorage.setItem(`exam-result-${currentExam.id}`, JSON.stringify(results));
    
    // Navigate to the review page
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };
  
  const currentQuestion = currentExam?.questions?.[currentQuestionIndex];
  const progress = currentExam ? ((currentQuestionIndex + 1) / currentExam.questions.length) * 100 : 0;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = currentExam ? currentExam.questions.length - answeredCount : 0;
  
  if (!currentExam) {
    return (
      <SharedPageLayout title="Practice Exam" subtitle="Loading exam content...">
        <div className="flex items-center justify-center h-64">
          <p>Loading exam content...</p>
        </div>
      </SharedPageLayout>
    );
  }
  
  if (!examStarted) {
    return (
      <SharedPageLayout 
        title={currentExam.title}
        subtitle={`${currentExam.subject} Practice Exam`}
      >
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{currentExam.title}</h2>
              <p className="text-muted-foreground">{currentExam.subject}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-800/30">
                <h3 className="font-medium mb-2">Exam Details</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <AlertCircle className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{currentExam.totalQuestions} Questions</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Time Limit: {currentExam.timeLimit} minutes</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                    <span>Difficulty: {currentExam.difficulty}</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-amber-50/50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-800/30">
                <h3 className="font-medium mb-2">Instructions</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Read each question carefully</li>
                  <li>• You can mark questions for review</li>
                  <li>• Submit before the time runs out</li>
                  <li>• You will see your results immediately after submission</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-indigo-600"
                onClick={startExam}
              >
                Start Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </SharedPageLayout>
    );
  }
  
  return (
    <SharedPageLayout 
      title={currentExam.title}
      subtitle={`${currentExam.subject} Practice Exam`}
    >
      <div className="space-y-6">
        {/* Status Bar */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Progress */}
            <div className="w-full md:w-1/3 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Question {currentQuestionIndex + 1}/{currentExam.questions.length}</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {unansweredCount} Unanswered
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            {/* Timer */}
            <div className="flex items-center">
              <Badge variant={timeRemaining < 300 ? "destructive" : "outline"} className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                Time Remaining: {formatTime(timeRemaining)}
              </Badge>
            </div>
            
            {/* Submit Button */}
            <Button 
              onClick={handleSubmitExam}
              className="bg-gradient-to-r from-emerald-500 to-teal-600"
            >
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Submit Exam
            </Button>
          </div>
        </div>
        
        {/* Question Card */}
        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4">
              <CardContent className="pt-4 space-y-6">
                {/* Question */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge variant="outline" className="mb-2">Question {currentQuestionIndex + 1}</Badge>
                    <h3 className="text-lg font-medium">{currentQuestion.text}</h3>
                  </div>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => toggleMarkForReview(currentQuestion.id)}
                    className={markedForReview.includes(currentQuestion.id) 
                      ? "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100" 
                      : ""
                    }
                  >
                    {markedForReview.includes(currentQuestion.id) ? "Marked for Review" : "Mark for Review"}
                  </Button>
                </div>
                
                {/* Answer Options */}
                <div className="py-4">
                  <RadioGroup 
                    value={answers[currentQuestion.id]?.toString()} 
                    onValueChange={(value) => handleAnswerSelect(currentQuestion.id, parseInt(value, 10))}
                  >
                    <div className="space-y-3">
                      {currentQuestion.options.map((option: string, index: number) => (
                        <div 
                          key={index} 
                          className={`flex items-start space-x-2 p-3 rounded-lg border ${
                            answers[currentQuestion.id] === index 
                              ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50" 
                              : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          }`}
                        >
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous Question
                  </Button>
                  
                  {currentQuestionIndex < currentExam.questions.length - 1 ? (
                    <Button onClick={handleNextQuestion}>
                      Next Question
                    </Button>
                  ) : (
                    <Button 
                      className="bg-gradient-to-r from-emerald-500 to-teal-600"
                      onClick={handleSubmitExam}
                    >
                      <CheckCircle className="h-4 w-4 mr-1.5" />
                      Submit Exam
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Question Navigation */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-3">Question Navigation</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {currentExam.questions.map((question: any, index: number) => (
              <Button
                key={question.id}
                variant="outline"
                size="sm"
                className={`h-10 w-10 p-0 ${
                  index === currentQuestionIndex 
                    ? "border-violet-500 bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" 
                    : answers[question.id] !== undefined
                      ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : markedForReview.includes(question.id)
                        ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                        : ""
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-violet-100 border border-violet-500 rounded-sm mr-2"></div>
              <span className="text-xs">Current</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border border-green-500 rounded-sm mr-2"></div>
              <span className="text-xs">Answered</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-amber-100 border border-amber-500 rounded-sm mr-2"></div>
              <span className="text-xs">Marked</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-white border rounded-sm mr-2"></div>
              <span className="text-xs">Unanswered</span>
            </div>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
}
