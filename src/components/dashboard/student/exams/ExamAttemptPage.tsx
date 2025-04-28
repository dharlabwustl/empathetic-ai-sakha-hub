
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ExamQuestion } from "@/types/user/exam";
import { useToast } from "@/hooks/use-toast";
import { Flag, ArrowLeft, ArrowRight, CheckSquare, Timer, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const ExamAttemptPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(5400); // 90 minutes in seconds
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  
  // Mock questions data
  const questions: ExamQuestion[] = [
    {
      id: "q1",
      question: "What is Newton's Second Law of Motion?",
      type: "short-answer",
      points: 2,
      explanation: "Newton's Second Law states that Force equals mass times acceleration (F = ma)."
    },
    {
      id: "q2",
      question: "Which of the following are fundamental forces in physics?",
      options: ["Gravity", "Electromagnetic Force", "Strong Nuclear Force", "Centripetal Force"],
      type: "checkbox",
      correctAnswer: ["option1", "option2", "option3"],
      points: 3,
      explanation: "The four fundamental forces are gravity, electromagnetic force, strong nuclear force, and weak nuclear force. Centripetal force is not a fundamental force."
    },
    {
      id: "q3",
      question: "Which law of thermodynamics states that energy cannot be created or destroyed?",
      options: ["Zeroth Law", "First Law", "Second Law", "Third Law"],
      type: "multiple-choice",
      correctAnswer: "option2",
      points: 2,
      explanation: "The First Law of Thermodynamics states that energy cannot be created or destroyed, only transferred or converted from one form to another."
    },
    {
      id: "q4",
      question: "Explain the principle of conservation of momentum.",
      type: "long-answer",
      points: 5,
      explanation: "The principle of conservation of momentum states that in an isolated system, the total momentum remains constant if no external forces act on the system."
    },
    {
      id: "q5",
      question: "Which of these is not a vector quantity?",
      options: ["Velocity", "Force", "Energy", "Displacement"],
      type: "multiple-choice",
      correctAnswer: "option3",
      points: 2,
      explanation: "Energy is a scalar quantity. The other options (velocity, force, and displacement) are all vector quantities."
    }
  ];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };
  
  const handleAnswerChange = (value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };
  
  const handleCheckboxChange = (optionIndex: number) => {
    const optionValue = `option${optionIndex + 1}`;
    const currentAnswer = answers[currentQuestion.id] || [];
    
    if (currentAnswer.includes(optionValue)) {
      handleAnswerChange(currentAnswer.filter((v: string) => v !== optionValue));
    } else {
      handleAnswerChange([...currentAnswer, optionValue]);
    }
  };
  
  const handleFlagQuestion = () => {
    if (flaggedQuestions.includes(currentQuestion.id)) {
      setFlaggedQuestions((prev) => prev.filter(id => id !== currentQuestion.id));
      toast({
        title: "Question unflagged",
        description: "You've removed the flag from this question."
      });
    } else {
      setFlaggedQuestions((prev) => [...prev, currentQuestion.id]);
      toast({
        title: "Question flagged",
        description: "You've flagged this question for review."
      });
    }
  };
  
  const handleSubmitExam = () => {
    // In a real app, submit answers to the backend
    toast({
      title: "Exam submitted",
      description: "Your answers have been recorded."
    });
    
    // Navigate to the review page
    navigate(`/dashboard/student/exams/review/${examId}`);
  };
  
  const isQuestionAnswered = (questionId: string) => {
    return answers[questionId] !== undefined && 
           (typeof answers[questionId] === 'string' ? 
            answers[questionId].trim() !== '' : 
            answers[questionId].length > 0);
  };
  
  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case "multiple-choice":
        return (
          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                <RadioGroupItem value={`option${index + 1}`} id={`option${index + 1}`} />
                <Label htmlFor={`option${index + 1}`} className="flex-grow cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
        
      case "checkbox":
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => {
              const optionValue = `option${index + 1}`;
              const isChecked = (answers[currentQuestion.id] || []).includes(optionValue);
              
              return (
                <div key={index} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                  <Checkbox 
                    id={optionValue}
                    checked={isChecked}
                    onCheckedChange={() => handleCheckboxChange(index)}
                  />
                  <Label htmlFor={optionValue} className="flex-grow cursor-pointer">
                    {option}
                  </Label>
                </div>
              );
            })}
          </div>
        );
        
      case "short-answer":
        return (
          <Textarea
            placeholder="Enter your answer here..."
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="min-h-[100px]"
          />
        );
        
      case "long-answer":
        return (
          <Textarea
            placeholder="Write your detailed answer here..."
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="min-h-[200px]"
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Exam in Progress</h1>
        <div className="flex items-center bg-amber-50 text-amber-800 px-3 py-1 rounded-md">
          <Timer className="h-4 w-4 mr-2" />
          <span className="font-medium">{formatTime(timeRemaining)}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{progress.toFixed(0)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-lg">
                Question {currentQuestionIndex + 1}
                <span className="text-sm font-normal ml-2 text-muted-foreground">
                  ({currentQuestion.points} {currentQuestion.points === 1 ? "point" : "points"})
                </span>
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleFlagQuestion}
                className={`gap-1 ${flaggedQuestions.includes(currentQuestion.id) ? "text-amber-600" : ""}`}
              >
                <Flag className={`h-4 w-4 ${flaggedQuestions.includes(currentQuestion.id) ? "fill-amber-500" : ""}`} />
                {flaggedQuestions.includes(currentQuestion.id) ? "Flagged" : "Flag"}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-base">{currentQuestion.question}</div>
            {renderQuestionInput()}
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => toast({
                  title: "Need help?",
                  description: "Remember to read the question carefully and review your course notes."
                })}
              >
                <HelpCircle className="h-4 w-4" /> Need a hint?
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-4">
            <div>
              <Button 
                variant="outline" 
                onClick={handlePreviousQuestion} 
                disabled={currentQuestionIndex === 0}
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
            </div>
            <div className="flex gap-2">
              {currentQuestionIndex === questions.length - 1 ? (
                <Button onClick={() => setShowSubmitDialog(true)} className="gap-1">
                  <CheckSquare className="h-4 w-4" /> Submit Exam
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="gap-1">
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
      
      {/* Question navigation */}
      <div className="mt-6">
        <h3 className="font-medium mb-3">Question Navigator</h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {questions.map((q, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={`h-10 ${
                index === currentQuestionIndex ? "border-2 border-primary" : ""
              } ${
                isQuestionAnswered(q.id) ? "bg-green-50" : ""
              } ${
                flaggedQuestions.includes(q.id) ? "border-amber-500" : ""
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 border border-green-500 rounded-sm"></div>
            <span className="text-sm">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white border border-gray-300 rounded-sm"></div>
            <span className="text-sm">Unanswered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white border-2 border-amber-500 rounded-sm"></div>
            <span className="text-sm">Flagged</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white border-2 border-primary rounded-sm"></div>
            <span className="text-sm">Current</span>
          </div>
        </div>
      </div>
      
      {showSubmitDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Submit Exam</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Are you sure you want to submit your exam? You won't be able to change your answers after submission.</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Total Questions:</span>
                  <span>{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Answered:</span>
                  <span>{Object.keys(answers).filter(id => isQuestionAnswered(id)).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Unanswered:</span>
                  <span>{questions.length - Object.keys(answers).filter(id => isQuestionAnswered(id)).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Flagged for Review:</span>
                  <span>{flaggedQuestions.length}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitExam}>
                Submit Exam
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ExamAttemptPage;
