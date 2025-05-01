
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { PracticeExam, UserAnswer } from '@/types/practice-exam';
import { Check, X, ChevronLeft, ChevronRight, AlertTriangle, Trophy, ArrowRight, BarChart2 } from 'lucide-react';
import QuestionReview from './QuestionReview';
import LoadingScreen from '@/components/common/LoadingScreen';

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
      difficulty: i % 3 === 0 ? "hard" : i % 2 === 0 ? "medium" : "easy"
    }))
  };
};

interface ExamResult {
  examId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  userAnswers: UserAnswer[];
  completedAt: string;
}

const ExamReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { examId = '' } = useParams<{ examId: string }>();
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState<PracticeExam | null>(null);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [difficulty, setDifficulty] = useState<Record<string, number>>({
    easy: 0,
    medium: 0,
    hard: 0
  });
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    setTimeout(() => {
      // Get mock exam
      const mockExam = getMockExam(examId);
      setExam(mockExam);
      
      // Get results from localStorage (simulating a backend)
      const storedResult = localStorage.getItem(`examResult_${examId}`);
      
      if (storedResult) {
        try {
          const result = JSON.parse(storedResult) as ExamResult;
          setExamResult(result);
          
          // Calculate difficulty statistics
          const difficultyStats = { easy: 0, medium: 0, hard: 0 };
          
          mockExam.questions.forEach((question, index) => {
            const userAnswer = result.userAnswers[index];
            
            if (!userAnswer.isCorrect) {
              difficultyStats[question.difficulty as keyof typeof difficultyStats]++;
            }
          });
          
          setDifficulty(difficultyStats);
        } catch (error) {
          console.error("Error parsing stored exam result:", error);
          // Create a fallback result if parsing fails
          createFallbackResult(mockExam);
        }
      } else {
        // If no stored result, create a fallback
        createFallbackResult(mockExam);
      }
      
      setLoading(false);
    }, 1500);
  }, [examId]);
  
  const createFallbackResult = (mockExam: PracticeExam) => {
    // Create a fallback result with random answers
    const userAnswers: UserAnswer[] = mockExam.questions.map(question => {
      const isCorrect = Math.random() > 0.3; // 70% correct answers
      
      return {
        questionId: question.id,
        selectedOptionId: isCorrect ? question.correctOptionId : question.options.find(o => o.id !== question.correctOptionId)?.id || "",
        isCorrect
      };
    });
    
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const score = Math.round((correctCount / mockExam.questions.length) * 100);
    
    const fallbackResult: ExamResult = {
      examId: mockExam.id,
      score,
      totalQuestions: mockExam.questions.length,
      correctAnswers: correctCount,
      userAnswers,
      completedAt: new Date().toISOString()
    };
    
    setExamResult(fallbackResult);
    
    // Calculate difficulty statistics
    const difficultyStats = { easy: 0, medium: 0, hard: 0 };
          
    mockExam.questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      
      if (!userAnswer.isCorrect) {
        difficultyStats[question.difficulty as keyof typeof difficultyStats]++;
      }
    });
    
    setDifficulty(difficultyStats);
    
    // Store for future reference
    localStorage.setItem(`examResult_${examId}`, JSON.stringify(fallbackResult));
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
  
  const getFilteredQuestions = () => {
    if (!exam || !examResult) return [];
    
    switch (activeTab) {
      case "correct":
        return exam.questions.filter((_, index) => 
          examResult.userAnswers[index].isCorrect
        );
      case "incorrect":
        return exam.questions.filter((_, index) => 
          !examResult.userAnswers[index].isCorrect
        );
      default:
        return exam.questions;
    }
  };
  
  const getQuestionIndexInFiltered = (index: number) => {
    if (!exam || !examResult) return 0;
    
    const filteredQuestions = getFilteredQuestions();
    const currentQuestion = exam.questions[index];
    
    return filteredQuestions.findIndex(q => q.id === currentQuestion.id);
  };
  
  const getCurrentFilteredQuestion = () => {
    const filteredQuestions = getFilteredQuestions();
    const currentIndexInFiltered = getQuestionIndexInFiltered(currentQuestionIndex);
    
    if (currentIndexInFiltered === -1) {
      // Current question not in filtered view, show first filtered question
      setCurrentQuestionIndex(
        exam!.questions.findIndex(q => q.id === filteredQuestions[0]?.id) || 0
      );
      return filteredQuestions[0];
    }
    
    return filteredQuestions[currentIndexInFiltered];
  };
  
  if (loading) {
    return <LoadingScreen message="Loading exam results..." />;
  }
  
  if (!exam || !examResult) {
    return (
      <SharedPageLayout
        title="Exam Review Not Available"
        subtitle="We couldn't load your exam review"
        showBackButton
        backButtonUrl="/dashboard/student/practice-exams"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
          <h2 className="text-xl font-medium mb-2">Exam Review Not Available</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            We couldn't load the review for this exam. This could be because the exam data has expired or hasn't been submitted yet.
          </p>
          <Button onClick={() => navigate('/dashboard/student/practice-exams')}>
            Return to Practice Exams
          </Button>
        </div>
      </SharedPageLayout>
    );
  }
  
  const filteredQuestions = getFilteredQuestions();
  const currentFilteredQuestion = getCurrentFilteredQuestion();
  const currentFilteredIndex = getQuestionIndexInFiltered(currentQuestionIndex);
  
  // Get the user's answers for the current question
  const getCurrentUserAnswer = () => {
    if (!currentFilteredQuestion) return null;
    
    const questionIndex = exam.questions.findIndex(q => q.id === currentFilteredQuestion.id);
    return examResult.userAnswers[questionIndex];
  };
  
  const currentUserAnswer = getCurrentUserAnswer();
  
  return (
    <SharedPageLayout
      title="Exam Review"
      subtitle={`${exam.title} - ${exam.subject}`}
      showBackButton
      backButtonUrl="/dashboard/student/practice-exams"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              Your Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-4xl font-bold mb-2">{examResult.score}%</div>
              <p className="text-muted-foreground">
                {examResult.correctAnswers} out of {examResult.totalQuestions} correct
              </p>
              
              <div className="mt-4">
                <Progress 
                  value={examResult.score} 
                  className="h-3"
                  indicatorColor={
                    examResult.score >= 80 ? "bg-green-500" :
                    examResult.score >= 60 ? "bg-blue-500" :
                    examResult.score >= 40 ? "bg-yellow-500" : "bg-red-500"
                  }
                />
              </div>
              
              <div className="mt-4">
                {examResult.score >= 80 && (
                  <p className="text-green-600 dark:text-green-400 font-medium">Excellent work!</p>
                )}
                {examResult.score >= 60 && examResult.score < 80 && (
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Good job!</p>
                )}
                {examResult.score >= 40 && examResult.score < 60 && (
                  <p className="text-yellow-600 dark:text-yellow-400 font-medium">Keep practicing!</p>
                )}
                {examResult.score < 40 && (
                  <p className="text-red-600 dark:text-red-400 font-medium">Needs improvement</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
              Performance by Difficulty
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Easy Questions</span>
                <span className="font-medium">
                  {difficulty.easy} incorrect
                </span>
              </div>
              <Progress 
                value={
                  (difficulty.easy / 
                  exam.questions.filter(q => q.difficulty === "easy").length) * 100
                } 
                className="h-2"
                indicatorColor="bg-red-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Medium Questions</span>
                <span className="font-medium">
                  {difficulty.medium} incorrect
                </span>
              </div>
              <Progress 
                value={
                  (difficulty.medium / 
                  exam.questions.filter(q => q.difficulty === "medium").length) * 100
                } 
                className="h-2"
                indicatorColor="bg-red-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Hard Questions</span>
                <span className="font-medium">
                  {difficulty.hard} incorrect
                </span>
              </div>
              <Progress 
                value={
                  (difficulty.hard / 
                  exam.questions.filter(q => q.difficulty === "hard").length) * 100
                } 
                className="h-2"
                indicatorColor="bg-red-500"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-between">
              <span>Review Weak Areas</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span>Practice Similar Questions</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span>Take Another Practice Exam</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Question Review</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all" className="flex items-center gap-1">
                All ({exam.questions.length})
              </TabsTrigger>
              <TabsTrigger value="correct" className="flex items-center gap-1">
                <Check className="h-4 w-4" />
                Correct ({examResult.correctAnswers})
              </TabsTrigger>
              <TabsTrigger value="incorrect" className="flex items-center gap-1">
                <X className="h-4 w-4" />
                Incorrect ({examResult.totalQuestions - examResult.correctAnswers})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {filteredQuestions.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentFilteredIndex + 1} of {filteredQuestions.length}
              </span>
              <span className="text-sm font-medium">
                Difficulty: 
                <span className={`ml-1 ${
                  currentFilteredQuestion.difficulty === "hard" ? "text-red-600 dark:text-red-400" :
                  currentFilteredQuestion.difficulty === "medium" ? "text-yellow-600 dark:text-yellow-400" :
                  "text-green-600 dark:text-green-400"
                }`}>
                  {currentFilteredQuestion.difficulty.charAt(0).toUpperCase() + 
                  currentFilteredQuestion.difficulty.slice(1)}
                </span>
              </span>
            </div>
            
            {currentFilteredQuestion && currentUserAnswer && (
              <QuestionReview
                question={currentFilteredQuestion}
                userAnswer={currentUserAnswer}
                showExplanation
              />
            )}
            
            <div className="flex justify-between pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={handlePrevQuestion}
                disabled={currentFilteredIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <Button 
                onClick={handleNextQuestion}
                disabled={currentFilteredIndex === filteredQuestions.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No questions match the selected filter.
            </p>
          </div>
        )}
      </div>
    </SharedPageLayout>
  );
};

export default ExamReviewPage;
