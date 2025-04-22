
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserProfileType } from "@/types/user/base";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight,
  Save,
  RotateCw,
  ArrowLeft,
  PieChart,
  BookCheck,
  BarChart
} from "lucide-react";

import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import DashboardLoading from './DashboardLoading';
import PracticeExamStart from '@/components/dashboard/student/practice-exam/PracticeExamStart';

interface QuestionData {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
}

const PracticeExamPage: React.FC = () => {
  const { examId } = useParams<{ examId?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    loading,
    userProfile,
    activeTab,
    showWelcomeTour,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  } = useStudentDashboard();

  // Exam state
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [tabValue, setTabValue] = useState("questions");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock questions data - in a real app this would come from the backend
  const [questions] = useState<QuestionData[]>([
    {
      id: "q1",
      text: "What is the capital of France?",
      options: [
        { id: "a", text: "London" },
        { id: "b", text: "Paris" },
        { id: "c", text: "Berlin" },
        { id: "d", text: "Madrid" }
      ],
      correctOptionId: "b",
      explanation: "Paris is the capital and most populous city of France."
    },
    {
      id: "q2",
      text: "Which element has the chemical symbol 'O'?",
      options: [
        { id: "a", text: "Gold" },
        { id: "b", text: "Silver" },
        { id: "c", text: "Oxygen" },
        { id: "d", text: "Osmium" }
      ],
      correctOptionId: "c",
      explanation: "Oxygen is represented by the chemical symbol 'O' on the periodic table."
    },
    {
      id: "q3",
      text: "Which planet is known as the Red Planet?",
      options: [
        { id: "a", text: "Venus" },
        { id: "b", text: "Jupiter" },
        { id: "c", text: "Mars" },
        { id: "d", text: "Saturn" }
      ],
      correctOptionId: "c",
      explanation: "Mars is often called the Red Planet due to its reddish appearance, which is caused by iron oxide (rust) on its surface."
    }
    // More questions would be added in a real implementation
  ]);

  // Timer effect
  useEffect(() => {
    if (examStarted && !examCompleted) {
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
    }
  }, [examStarted, examCompleted]);
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleStartExam = () => {
    setExamStarted(true);
    setExamCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setTimeRemaining(60 * 60); // Reset timer to 60 minutes
    
    toast({
      title: "Exam Started",
      description: "Good luck! You have 60 minutes to complete the exam."
    });
  };
  
  const handleSubmitExam = () => {
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setExamCompleted(true);
      setTabValue("results");
      setIsSubmitting(false);
      
      toast({
        title: "Exam Completed",
        description: "Your answers have been submitted successfully."
      });
    }, 1500);
  };
  
  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (selectedOptions[question.id] === question.correctOptionId) {
        correct++;
      }
    });
    return correct;
  };
  
  const getScorePercentage = () => {
    return Math.round((calculateScore() / questions.length) * 100);
  };
  
  const getProgressValue = () => {
    return Object.keys(selectedOptions).length / questions.length * 100;
  };
  
  // Render exam status based on completion
  const renderExamStatus = () => {
    if (examCompleted) {
      const score = getScorePercentage();
      const scoreColor = score >= 70 ? 'text-green-600' : score >= 40 ? 'text-amber-600' : 'text-red-600';
      
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Score:</span>
          <span className={`text-sm font-bold ${scoreColor}`}>{score}%</span>
          <span className="text-sm text-muted-foreground">
            ({calculateScore()}/{questions.length} correct)
          </span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-amber-600" />
          <span className="text-amber-700 font-medium">{formatTime(timeRemaining)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-600" />
          <span className="text-sm">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
      </div>
    );
  };
  
  if (loading || !userProfile) {
    return <DashboardLoading />;
  }
  
  // If exam is not started, show the start screen
  if (!examId || examId === "start") {
    return (
      <DashboardLayout
        userProfile={userProfile}
        hideSidebar={hideSidebar}
        hideTabsNav={hideTabsNav}
        activeTab={activeTab}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        showWelcomeTour={showWelcomeTour}
        onTabChange={handleTabChange}
        onViewStudyPlan={handleViewStudyPlan}
        onToggleSidebar={toggleSidebar}
        onToggleTabsNav={toggleTabsNav}
        onSkipTour={handleSkipTour}
        onCompleteTour={handleCompleteTour}
        showStudyPlan={false}
        onCloseStudyPlan={handleCloseStudyPlan}
      >
        <PracticeExamStart userProfile={userProfile} onStartExam={handleStartExam} />
      </DashboardLayout>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab={activeTab}
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      showWelcomeTour={showWelcomeTour}
      onTabChange={handleTabChange}
      onViewStudyPlan={handleViewStudyPlan}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
      showStudyPlan={false}
      onCloseStudyPlan={handleCloseStudyPlan}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard/student/practice-exam/start")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Exams
          </Button>
          {renderExamStatus()}
        </div>
        
        <div className="w-full">
          <Progress value={getProgressValue()} className="h-2" />
        </div>
        
        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="questions" className="flex-1">Exam Questions</TabsTrigger>
            <TabsTrigger value="results" className="flex-1" disabled={!examCompleted}>Results & Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions" className="mt-4 space-y-4">
            {/* Current Question */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Question {currentQuestionIndex + 1}</h3>
                  <p className="text-gray-700">{currentQuestion?.text}</p>
                </div>
                
                <div className="space-y-3">
                  {currentQuestion?.options.map(option => (
                    <div
                      key={option.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedOptions[currentQuestion.id] === option.id
                          ? 'bg-primary/10 border-primary'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => !examCompleted && handleSelectOption(currentQuestion.id, option.id)}
                    >
                      <div className="flex items-center">
                        <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                          selectedOptions[currentQuestion.id] === option.id
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300'
                        }`}>
                          {selectedOptions[currentQuestion.id] === option.id && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {examCompleted && (
                  <div className="mt-6 p-4 rounded-lg bg-gray-50">
                    <div className="flex items-start gap-2">
                      {selectedOptions[currentQuestion?.id] === currentQuestion?.correctOptionId ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-medium">
                          {selectedOptions[currentQuestion?.id] === currentQuestion?.correctOptionId 
                            ? 'Correct!' 
                            : 'Incorrect'}
                        </p>
                        <p className="text-sm mt-1">{currentQuestion?.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Navigation and Submit buttons */}
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={handlePrevQuestion} 
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                {!examCompleted && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      toast({
                        title: "Progress Saved",
                        description: "Your answers have been saved."
                      });
                    }}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Progress
                  </Button>
                )}
                
                {currentQuestionIndex === questions.length - 1 ? (
                  !examCompleted ? (
                    <Button 
                      onClick={handleSubmitExam}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Exam
                          <CheckCircle className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button onClick={() => setTabValue("results")}>
                      View Analysis
                      <BarChart className="ml-2 h-4 w-4" />
                    </Button>
                  )
                ) : (
                  <Button onClick={handleNextQuestion}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            {/* Question navigation buttons */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Question Navigation</h4>
              <div className="flex flex-wrap gap-2">
                {questions.map((q, idx) => (
                  <Button
                    key={q.id}
                    variant="outline"
                    size="sm"
                    className={`w-10 h-10 p-0 ${
                      idx === currentQuestionIndex
                        ? 'border-primary bg-primary text-primary-foreground'
                        : selectedOptions[q.id]
                        ? 'bg-blue-50 border-blue-200'
                        : ''
                    }`}
                    onClick={() => setCurrentQuestionIndex(idx)}
                  >
                    {idx + 1}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="mt-4 space-y-6">
            {/* Results Summary */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-medium">Exam Results</h3>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/dashboard/student/practice-exam/start")}
                  >
                    <RotateCw className="mr-2 h-4 w-4" />
                    Try Another Exam
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                    <PieChart className="h-8 w-8 text-blue-600 mb-2" />
                    <div className="text-3xl font-bold mb-1">
                      {getScorePercentage()}%
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Overall Score
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                    <BookCheck className="h-8 w-8 text-green-600 mb-2" />
                    <div className="text-3xl font-bold mb-1">
                      {calculateScore()}/{questions.length}
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Correct Answers
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                    <BarChart className="h-8 w-8 text-purple-600 mb-2" />
                    <div className="text-3xl font-bold mb-1">
                      {getScorePercentage() >= 70 ? 'Excellent' : getScorePercentage() >= 40 ? 'Good' : 'Needs Improvement'}
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Performance
                    </div>
                  </div>
                </div>
                
                {/* Detailed Analysis */}
                <div className="space-y-4">
                  <h4 className="font-medium">Question Analysis</h4>
                  
                  {questions.map((question, idx) => {
                    const isCorrect = selectedOptions[question.id] === question.correctOptionId;
                    const selectedOption = question.options.find(opt => opt.id === selectedOptions[question.id]);
                    const correctOption = question.options.find(opt => opt.id === question.correctOptionId);
                    
                    return (
                      <div 
                        key={question.id}
                        className={`p-3 border rounded-lg ${
                          isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5">
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">Question {idx + 1}: {question.text}</p>
                            <div className="mt-1 text-sm">
                              <p>
                                Your answer: <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                                  {selectedOption?.text || 'Not answered'}
                                </span>
                              </p>
                              {!isCorrect && (
                                <p className="text-green-700">
                                  Correct answer: {correctOption?.text}
                                </p>
                              )}
                            </div>
                            <p className="mt-2 text-sm text-gray-700">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setTabValue("questions")}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Questions
              </Button>
              
              <Button onClick={() => navigate("/dashboard/student/practice-exam/start")}>
                Try Another Exam
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PracticeExamPage;
