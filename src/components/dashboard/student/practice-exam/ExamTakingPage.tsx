
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Timer, Flag, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QuestionView from './QuestionView';

interface ExamQuestion {
  id: string;
  text: string;
  options: { id: string; text: string; }[];
  correctOptionId: string;
  explanation: string;
  difficulty: string;
}

const ExamTakingPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);

  console.log('ExamTakingPage - examId:', examId);

  // Mock exam data
  const mockQuestions: ExamQuestion[] = Array.from({ length: 30 }, (_, i) => ({
    id: `q${i + 1}`,
    text: `Sample question ${i + 1}: What is the formula for calculating kinetic energy?`,
    options: [
      { id: 'a', text: 'KE = ½mv²' },
      { id: 'b', text: 'KE = mv' },
      { id: 'c', text: 'KE = mgh' },
      { id: 'd', text: 'KE = mv²' }
    ],
    correctOptionId: 'a',
    explanation: 'Kinetic energy is calculated using the formula KE = ½mv²',
    difficulty: i < 10 ? 'easy' : i < 20 ? 'medium' : 'hard'
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [mockQuestions[currentQuestionIndex].id]: optionId
    }));
  };

  const handleSubmitExam = () => {
    const results = {
      examId,
      answers,
      score: Math.floor(Math.random() * 40) + 60, // Mock score 60-100
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`exam_result_${examId}`, JSON.stringify(results));
    
    toast({
      title: "Exam Submitted Successfully",
      description: "Your answers have been recorded. Redirecting to results...",
    });

    setTimeout(() => {
      navigate(`/dashboard/student/practice-exam/${examId}/review`);
    }, 2000);
  };

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mockQuestions.length - 1;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Practice Exam {examId}</h1>
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of {mockQuestions.length}</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Exams
        </Button>
      </div>

      {/* Timer and Progress */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            {formatTime(timeLeft)}
          </Badge>
          <span className="text-sm text-gray-600">
            Answered: {answeredCount}/{mockQuestions.length}
          </span>
        </div>
        <Button onClick={handleSubmitExam} variant="destructive">
          Submit Exam
        </Button>
      </div>

      <Progress value={(currentQuestionIndex + 1) / mockQuestions.length * 100} className="mb-6" />

      {/* Question */}
      <QuestionView
        question={currentQuestion}
        selectedOptionId={answers[currentQuestion.id]}
        onAnswerSelect={handleAnswerSelect}
        questionNumber={currentQuestionIndex + 1}
        isFlagged={flaggedQuestions.includes(currentQuestion.id)}
      />

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            const questionId = currentQuestion.id;
            setFlaggedQuestions(prev => 
              prev.includes(questionId) 
                ? prev.filter(id => id !== questionId)
                : [...prev, questionId]
            );
          }}
        >
          <Flag className="h-4 w-4 mr-2" />
          {flaggedQuestions.includes(currentQuestion.id) ? 'Unflag' : 'Flag'}
        </Button>

        {isLastQuestion ? (
          <Button onClick={handleSubmitExam}>
            Submit Exam
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExamTakingPage;
