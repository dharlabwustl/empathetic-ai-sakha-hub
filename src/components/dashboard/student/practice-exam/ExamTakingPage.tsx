
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useToast } from '@/hooks/use-toast';
import LoadingScreen from '@/components/common/LoadingScreen';
import { PracticeExam, ExamQuestion, UserAnswer } from '@/types/practice-exam';
import { Timer, AlertCircle, ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import QuestionView from './QuestionView';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Mock data for a practice exam
const getMockExam = (examId: string): PracticeExam => {
  return {
    id: examId,
    title: `Practice Exam ${examId}`,
    description: "Test your knowledge with this comprehensive practice exam",
    subject: "Physics",
    topic: "Mechanics",
    totalQuestions: 10,
    timeAllowed: 60, // minutes
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: `q${i + 1}`,
      text: `Question ${i + 1}: What is the formula for calculating the force?`,
      options: [
        { id: "a", text: "F = ma" },
        { id: "b", text: "F = mv" },
        { id: "c", text: "F = mg" },
        { id: "d", text: "F = mv²/r" },
      ],
      correctOptionId: "a",
      explanation: "According to Newton's second law, force equals mass times acceleration (F = ma).",
      subject: "Physics",
      topic: "Mechanics",
      difficulty: i % 3 === 0 ? "hard" : i % 2 === 0 ? "medium" : "easy"
    }))
  };
};

const ExamTakingPage: React.FC = () => {
  const navigate = useNavigate();
  const { examId = '' } = useParams<{ examId: string }>();
  const { toast } = useToast();
  
  const [exam, setExam] = useState<PracticeExam | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    setTimeout(() => {
      const mockExam = getMockExam(examId);
      setExam(mockExam);
      setTimeLeft(mockExam.timeAllowed * 60); // Convert to seconds
      setLoading(false);
    }, 1000);
  }, [examId]);
  
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
  
  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { 
        questionId, 
        selectedAnswer: 0, // Keep for compatibility
        selectedOptionId: optionId 
      }
    }));
  };
  
  const handleNextQuestion = () => {
    if (exam && currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleFlagQuestion = () => {
    if (!exam) return;
    
    const questionId = exam.questions[currentQuestionIndex].id;
    
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(prev => prev.filter(id => id !== questionId));
    } else {
      setFlaggedQuestions(prev => [...prev, questionId]);
    }
  };
  
  const handleSubmitExam = async () => {
    if (!exam) return;
    
    setIsSubmitting(true);
    
    // Calculate results
    let correctAnswers = 0;
    const userAnswers: UserAnswer[] = [];
    
    exam.questions.forEach(question => {
      const answer = answers[question.id];
      
      const userAnswer: UserAnswer = {
        questionId: question.id,
        selectedAnswer: 0, // Keep for compatibility
        selectedOptionId: answer?.selectedOptionId || "",
        isCorrect: answer?.selectedOptionId === question.correctOptionId
      };
      
      userAnswers.push(userAnswer);
      
      if (userAnswer.isCorrect) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / exam.questions.length) * 100);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Store results in localStorage to simulate a backend
      const examResults = {
        examId: exam.id,
        score,
        totalQuestions: exam.questions.length,
        correctAnswers,
        userAnswers,
        completedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`examResult_${examId}`, JSON.stringify(examResults));
      
      // Navigate to review page
      navigate(`/dashboard/student/exam/${examId}/results`);
    }, 1500);
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  if (loading) {
    return <LoadingScreen message="Loading exam..." />;
  }
  
  if (!exam) {
    return (
      <SharedPageLayout
        title="Exam Not Found"
        subtitle="The requested exam could not be found"
        showBackButton
        backButtonUrl="/dashboard/student/practice-exam"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Exam Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the exam you're looking for.
          </p>
          <Button onClick={() => navigate('/dashboard/student/practice-exam')}>
            Return to Practice Exams
          </Button>
        </div>
      </SharedPageLayout>
    );
  }
  
  const currentQuestion = exam.questions[currentQuestionIndex];
  const isQuestionFlagged = flaggedQuestions.includes(currentQuestion.id);
  const answeredCount = Object.keys(answers).length;
  const questionsLeftCount = exam.totalQuestions - answeredCount;
  
  return (
    <SharedPageLayout
      title={exam.title}
      subtitle={`${exam.subject} - ${exam.topic}`}
      showBackButton={false}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 rounded-md px-3 py-1.5 flex items-center">
            <Timer className="h-4 w-4 mr-2" />
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              Questions: {currentQuestionIndex + 1} of {exam.totalQuestions}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
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
      
      <div className="space-y-6">
        {/* Question Display */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">
              Question {currentQuestionIndex + 1}
            </h3>
            {isQuestionFlagged && (
              <span className="bg-yellow-100 text-yellow-800 border-yellow-300 px-2 py-1 rounded text-sm">
                <Flag className="h-3 w-3 mr-1 fill-yellow-500 inline" />
                Flagged
              </span>
            )}
          </div>
          
          <p className="text-lg leading-relaxed mb-6">{currentQuestion.text}</p>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id]?.selectedOptionId === option.id;
              
              return (
                <div
                  key={option.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerChange(currentQuestion.id, option.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    } flex items-center justify-center`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className={`text-sm ${isSelected ? 'font-medium text-blue-900' : 'text-gray-700'}`}>
                      {option.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
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
              <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 mt-2">
                <AlertCircle className="h-4 w-4" />
                <p>
                  You still have {questionsLeftCount} unanswered {questionsLeftCount === 1 ? 'question' : 'questions'}.
                </p>
              </div>
            )}
            
            {flaggedQuestions.length > 0 && (
              <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400 mt-2">
                <Flag className="h-4 w-4" />
                <p>
                  You have {flaggedQuestions.length} flagged {flaggedQuestions.length === 1 ? 'question' : 'questions'}.
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
    </SharedPageLayout>
  );
};

export default ExamTakingPage;
