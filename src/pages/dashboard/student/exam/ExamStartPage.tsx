
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Timer, AlertCircle, ChevronLeft, ChevronRight, Flag, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MainLayout from '@/components/layouts/MainLayout';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  topic: string;
}

interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  timeSpent?: number;
}

const ExamStartPage: React.FC = () => {
  const navigate = useNavigate();
  const { examId = '' } = useParams<{ examId: string }>();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 60 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Mock exam data based on examId
  const getExamData = (id: string) => {
    const examConfigs = {
      '4': { title: 'NEET Full Length Mock Test 1', subject: 'All Subjects', questions: 180, time: 180 },
      '6': { title: 'Physics Chapter Test - Mechanics', subject: 'Physics', questions: 45, time: 45 },
      '7': { title: 'Chemistry Organic Reactions Test', subject: 'Chemistry', questions: 30, time: 30 }
    };
    
    const config = examConfigs[id as keyof typeof examConfigs] || examConfigs['4'];
    
    return {
      id,
      title: config.title,
      subject: config.subject,
      totalQuestions: config.questions,
      timeAllowed: config.time,
      questions: Array.from({ length: config.questions }, (_, i) => ({
        id: `q${i + 1}`,
        text: `Question ${i + 1}: What is the formula for calculating force according to Newton's second law?`,
        options: [
          "F = ma",
          "F = mv", 
          "F = mg",
          "F = mv²/r"
        ],
        correctAnswer: 0,
        explanation: "According to Newton's second law, force equals mass times acceleration (F = ma).",
        subject: config.subject,
        topic: "Mechanics"
      }))
    };
  };

  const exam = getExamData(examId);
  
  useEffect(() => {
    setTimeLeft(exam.timeAllowed * 60);
    setLoading(false);
  }, [examId, exam.timeAllowed]);
  
  useEffect(() => {
    if (!loading && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !loading) {
      handleSubmitExam();
    }
  }, [timeLeft, loading]);
  
  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { questionId, selectedAnswer: answerIndex }
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleFlagQuestion = () => {
    const questionId = exam.questions[currentQuestionIndex].id;
    
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(prev => prev.filter(id => id !== questionId));
    } else {
      setFlaggedQuestions(prev => [...prev, questionId]);
    }
  };
  
  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    
    // Calculate results
    let correctAnswers = 0;
    const userAnswers: UserAnswer[] = [];
    
    exam.questions.forEach(question => {
      const answer = answers[question.id];
      const userAnswer: UserAnswer = {
        questionId: question.id,
        selectedAnswer: answer?.selectedAnswer ?? -1,
        timeSpent: 0
      };
      
      userAnswers.push(userAnswer);
      
      if (answer?.selectedAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / exam.questions.length) * 100);
    
    // Store results in localStorage
    const examResults = {
      examId: exam.id,
      title: exam.title,
      subject: exam.subject,
      score,
      totalQuestions: exam.questions.length,
      correctAnswers,
      userAnswers,
      completedAt: new Date().toISOString(),
      timeTaken: exam.timeAllowed * 60 - timeLeft
    };
    
    localStorage.setItem(`examResult_${examId}`, JSON.stringify(examResults));
    
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/dashboard/student/exam/${examId}/results`);
    }, 1500);
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const currentQuestion = exam.questions[currentQuestionIndex];
  const isQuestionFlagged = flaggedQuestions.includes(currentQuestion.id);
  const answeredCount = Object.keys(answers).length;
  const questionsLeftCount = exam.totalQuestions - answeredCount;
  
  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{exam.title}</h1>
            <p className="text-gray-600">{exam.subject}</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Exams
          </Button>
        </div>
        
        {/* Timer and Progress */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-amber-100 text-amber-800 rounded-md px-3 py-1.5 flex items-center">
              <Timer className="h-4 w-4 mr-2" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
            <div>
              <span className="text-sm text-gray-600">
                Question: {currentQuestionIndex + 1} of {exam.totalQuestions}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Answered: {answeredCount}/{exam.totalQuestions}
            </span>
            <Button variant="outline" size="sm" onClick={() => setShowConfirmSubmit(true)}>
              Submit Exam
            </Button>
          </div>
        </div>
        
        <Progress
          value={(currentQuestionIndex + 1) / exam.questions.length * 100}
          className="h-2 mb-6"
        />
        
        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">
                Question {currentQuestionIndex + 1}
              </CardTitle>
              {isQuestionFlagged && (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  <Flag className="h-3 w-3 mr-1 fill-yellow-500" />
                  Flagged
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">{currentQuestion.text}</p>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestion.id]?.selectedAnswer === index;
                
                return (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleAnswerChange(currentQuestion.id, index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      } flex items-center justify-center`}>
                        {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                      </div>
                      <span className={`text-sm ${isSelected ? 'font-medium text-blue-900' : 'text-gray-700'}`}>
                        {String.fromCharCode(65 + index)}. {option}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          <Button 
            variant="outline" 
            onClick={handleFlagQuestion}
            className={isQuestionFlagged ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : ''}
          >
            <Flag className={`h-4 w-4 mr-2 ${isQuestionFlagged ? 'fill-yellow-500' : ''}`} />
            {isQuestionFlagged ? 'Unflag Question' : 'Flag for Review'}
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === exam.questions.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
        
        {/* Confirmation Dialog */}
        <Dialog open={showConfirmSubmit} onOpenChange={setShowConfirmSubmit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Exam?</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p>
                You've answered <span className="font-medium">{answeredCount} out of {exam.totalQuestions}</span> questions.
              </p>
              
              {questionsLeftCount > 0 && (
                <div className="flex items-center space-x-2 text-amber-600 mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <p>
                    You still have {questionsLeftCount} unanswered {questionsLeftCount === 1 ? 'question' : 'questions'}.
                  </p>
                </div>
              )}
              
              <p className="mt-4">
                Are you sure you want to submit your exam?
              </p>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmSubmit(false)}>
                Continue Exam
              </Button>
              <Button onClick={handleSubmitExam} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Exam"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default ExamStartPage;
