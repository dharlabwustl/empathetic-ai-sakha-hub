
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ChevronRight, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface QuickRecallQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuickRecallSectionProps {
  conceptId: string;
  title: string;
  content: string;
  onQuizComplete: (score: number) => void;
}

const QuickRecallSection: React.FC<QuickRecallSectionProps> = ({ 
  conceptId, 
  title, 
  content,
  onQuizComplete 
}) => {
  const [questions, setQuestions] = useState<QuickRecallQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  // Generate simple questions based on content
  useEffect(() => {
    // In a real app, this would be an API call to a backend service that generates questions
    setTimeout(() => {
      // For demo, we'll create some simple questions based on the concept title
      const mockQuestions: QuickRecallQuestion[] = [
        {
          id: '1',
          question: `What is the main focus of ${title}?`,
          options: [
            'Understanding the fundamental principles',
            'Applying formulas to solve problems',
            'Memorizing key dates and figures',
            'Analyzing historical context'
          ],
          correctAnswer: 'Understanding the fundamental principles'
        },
        {
          id: '2',
          question: 'Which of the following best describes the relationship between concepts?',
          options: [
            'They are completely independent',
            'They build upon each other',
            'They contradict each other',
            'They are alphabetically organized'
          ],
          correctAnswer: 'They build upon each other'
        },
        {
          id: '3',
          question: `How would you apply ${title} in a real-world scenario?`,
          options: [
            'Through mathematical calculations',
            'By conducting experiments',
            'By observing natural phenomena',
            'All of the above'
          ],
          correctAnswer: 'All of the above'
        }
      ];
      
      setQuestions(mockQuestions);
      setIsGenerating(false);
    }, 1500);
  }, [content, title]);

  const handleAnswerSelect = (option: string) => {
    setSelectedOption(option);
    setIsAnswered(true);
    
    // Check if answer is correct
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      const finalScore = Math.round(((score + (selectedOption === questions[currentQuestionIndex].correctAnswer ? 1 : 0)) / questions.length) * 100);
      onQuizComplete(finalScore);
      
      toast({
        title: "Quick Recall Complete!",
        description: `You scored ${finalScore}% on this practice session.`,
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-12 w-12 text-blue-500" />
        </motion.div>
        <p className="text-center text-muted-foreground">Generating recall questions based on this concept...</p>
      </div>
    );
  }

  if (quizCompleted) {
    const finalScore = Math.round((score / questions.length) * 100);
    
    return (
      <Card className="bg-white dark:bg-gray-800 shadow-sm border-0">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <CheckCircle className="h-8 w-8" />
            </div>
            
            <h2 className="text-xl font-bold">Quick Recall Completed!</h2>
            
            <div className="space-y-2">
              <p className="text-muted-foreground">Your score:</p>
              <div className="relative pt-4">
                <div className="flex justify-center">
                  <span className="text-4xl font-bold">{finalScore}%</span>
                </div>
                <Progress value={finalScore} className="h-2 mt-2" />
              </div>
              
              <p className="mt-4 text-sm text-muted-foreground">
                {finalScore >= 80 
                  ? "Great work! You have a strong understanding of this concept."
                  : finalScore >= 50
                  ? "Good job! You're on the right track with this concept."
                  : "Keep practicing! This concept might need more review."
                }
              </p>
            </div>
            
            <Button onClick={resetQuiz} className="mt-4">
              Practice Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm border-0">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Brain className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="font-medium">Quick Recall Practice</h2>
            </div>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          
          <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-1" />
          
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full justify-start text-left px-4 py-6 h-auto ${
                    selectedOption === option 
                      ? option === currentQuestion.correctAnswer 
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                        : "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : ""
                  }`}
                  disabled={isAnswered}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <div className="flex items-center w-full">
                    <div className="mr-3 flex-shrink-0">
                      {isAnswered && selectedOption === option ? (
                        option === currentQuestion.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )
                      ) : (
                        <div className="w-5 h-5 border-2 rounded-full flex items-center justify-center">
                          {String.fromCharCode(65 + index)}
                        </div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          {isAnswered && (
            <div className="flex justify-end">
              <Button onClick={handleNextQuestion} className="flex items-center gap-1">
                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickRecallSection;
