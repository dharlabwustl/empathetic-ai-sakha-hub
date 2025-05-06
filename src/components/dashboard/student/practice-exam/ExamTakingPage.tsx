import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, ChevronRight, ChevronLeft, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useExamData } from "@/hooks/useExamData";
import { formatTimeRemaining } from "@/lib/formatters";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const ExamTakingPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { examData, loading, error } = useExamData(examId);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | string[]>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  
  // Initialize exam timer when exam data is loaded
  useEffect(() => {
    if (examData && !examStarted) {
      setTimeRemaining(examData.durationMinutes * 60);
      setExamStarted(true);
    }
  }, [examData, examStarted]);
  
  // Timer countdown
  useEffect(() => {
    if (!examStarted || examCompleted || timeRemaining <= 0) return;
    
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
  }, [examStarted, examCompleted, timeRemaining]);
  
  // Warning when time is running low
  useEffect(() => {
    if (timeRemaining === 300) { // 5 minutes remaining
      toast({
        title: "Time is running out!",
        description: "You have 5 minutes remaining to complete the exam.",
        variant: "destructive",
      });
    }
  }, [timeRemaining, toast]);
  
  if (loading) {
    return (
      <SharedPageLayout title="Loading Exam...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }
  
  if (error || !examData) {
    return (
      <SharedPageLayout title="Error Loading Exam">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-amber-500" />
              <div>
                <p className="text-lg font-medium">Failed to load exam</p>
                <p className="text-sm text-muted-foreground">
                  There was an error loading the exam. Please try again later.
                </p>
              </div>
              <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>
          </CardContent>
        </Card>
      </SharedPageLayout>
    );
  }
  
  const currentQuestion = examData.questions[currentQuestionIndex];
  const totalQuestions = examData.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const handleAnswerSelect = (questionId: string, answer: string | string[]) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSaveProgress = () => {
    // In a real app, this would save to backend
    toast({
      title: "Progress Saved",
      description: "Your exam progress has been saved.",
    });
  };
  
  const handleSubmitExam = () => {
    // Calculate results
    let correctAnswers = 0;
    let totalAnswered = 0;
    
    examData.questions.forEach(question => {
      if (selectedAnswers[question.id]) {
        totalAnswered++;
        
        if (question.type === 'multiple-choice') {
          if (selectedAnswers[question.id] === question.correctAnswer) {
            correctAnswers++;
          }
        } else if (question.type === 'multiple-select') {
          const selected = selectedAnswers[question.id] as string[];
          const correct = question.correctAnswers as string[];
          
          if (selected.length === correct.length && 
              selected.every(item => correct.includes(item))) {
            correctAnswers++;
          }
        }
      }
    });
    
    // Store results in localStorage for review page
    localStorage.setItem(`exam_result_${examId}`, JSON.stringify({
      examId,
      examTitle: examData.title,
      totalQuestions,
      totalAnswered,
      correctAnswers,
      selectedAnswers,
      timeSpent: examData.durationMinutes * 60 - timeRemaining,
      completedAt: new Date().toISOString()
    }));
    
    setExamCompleted(true);
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };
  
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentQuestion.subject} - {currentQuestion.topic}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFlagQuestion(currentQuestion.id)}
              className={flaggedQuestions.includes(currentQuestion.id) ? "bg-amber-100 text-amber-800 border-amber-300" : ""}
            >
              {flaggedQuestions.includes(currentQuestion.id) ? "Unflag" : "Flag for Review"}
            </Button>
          </div>
        </div>
        
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-base font-medium">{currentQuestion.text}</p>
          {currentQuestion.image && (
            <img 
              src={currentQuestion.image} 
              alt="Question illustration" 
              className="my-4 max-h-64 mx-auto rounded-md"
            />
          )}
        </div>
        
        <div className="pt-2">
          {currentQuestion.type === 'multiple-choice' && (
            <RadioGroup
              value={selectedAnswers[currentQuestion.id] as string || ""}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 rounded-md hover:bg-muted/50">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="font-normal cursor-pointer flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
          
          {currentQuestion.type === 'multiple-select' && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const selectedOptions = (selectedAnswers[currentQuestion.id] as string[]) || [];
                return (
                  <div key={index} className="flex items-start space-x-2 p-3 rounded-md hover:bg-muted/50">
                    <Checkbox
                      id={`option-${index}`}
                      checked={selectedOptions.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleAnswerSelect(
                            currentQuestion.id,
                            [...selectedOptions, option]
                          );
                        } else {
                          handleAnswerSelect(
                            currentQuestion.id,
                            selectedOptions.filter(item => item !== option)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`option-${index}`} className="font-normal cursor-pointer flex-1">
                      {option}
                    </Label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Add Back Button */}
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Exams
      </Button>
      
      <Card className="border-t-4 border-t-primary">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{examData.title}</CardTitle>
              <CardDescription>
                {examData.subject} • {examData.questions.length} questions • {examData.durationMinutes} minutes
              </CardDescription>
            </div>
            <div className="flex flex-col items-end">
              <Badge variant="outline" className="flex items-center gap-1 text-base px-3 py-1.5 bg-primary/10">
                <Clock className="h-4 w-4" />
                {formatTimeRemaining(timeRemaining)}
              </Badge>
              <span className="text-xs text-muted-foreground mt-1">Time Remaining</span>
            </div>
          </div>
        </CardHeader>
        
        <Separator />
        
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{currentQuestionIndex + 1} of {totalQuestions}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {renderQuestion()}
        </CardContent>
        
        <Separator className="my-1" />
        
        <CardFooter className="flex justify-between pt-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => handlePreviousQuestion()}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSaveProgress()}
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
          
          <div className="flex gap-2">
            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button onClick={() => handleNextQuestion()}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button 
                variant="default" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setShowSubmitDialog(true)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Submit Exam
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      
      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Exam?</DialogTitle>
            <DialogDescription>
              You are about to submit your exam. Make sure you have answered all questions.
              {Object.keys(selectedAnswers).length < totalQuestions && (
                <div className="mt-2 p-2 bg-amber-50 text-amber-800 rounded-md flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>You have only answered {Object.keys(selectedAnswers).length} out of {totalQuestions} questions.</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Continue Exam
            </Button>
            <Button onClick={handleSubmitExam}>
              Submit Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exit Exam?</DialogTitle>
            <DialogDescription>
              Your progress will be lost if you exit now. Are you sure you want to leave?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExitDialog(false)}>
              Continue Exam
            </Button>
            <Button variant="destructive" onClick={() => navigate(-1)}>
              Exit Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamTakingPage;
