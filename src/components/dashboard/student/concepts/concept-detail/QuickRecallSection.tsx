
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle, RefreshCw, Brain, Star, Award, ArrowRight, Volume2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface QuickRecallSectionProps {
  conceptId: string;
  title: string;
  content: string;
  onQuizComplete?: (score: number) => void;
}

const QuickRecallSection: React.FC<QuickRecallSectionProps> = ({ 
  conceptId, 
  title, 
  content,
  onQuizComplete 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [validationMode, setValidationMode] = useState(false);
  const [score, setScore] = useState(0);
  const [isConfident, setIsConfident] = useState<boolean | null>(null);
  const { toast } = useToast();
  
  // Generate more comprehensive questions
  const generateQuestions = () => {
    // Basic questions
    const basicQuestions = [
      {
        question: `What is the main topic of "${title}"?`,
        answer: content.substring(0, 150) + "...",
        type: "recall",
        difficulty: "easy"
      },
      {
        question: "Can you explain this concept in your own words?",
        answer: "This is a self-assessment question. Try to recall and explain the concept clearly.",
        type: "self-assessment",
        difficulty: "medium"
      }
    ];
    
    // Extract key terms from content to create specific questions
    const lines = content.split('.');
    const specificQuestions = [];
    
    if (content.includes('cell division')) {
      specificQuestions.push({
        question: "What are the two main types of cell division mentioned?",
        answer: "The two main types of cell division are mitosis and meiosis. Mitosis is for growth and repair, while meiosis is for sexual reproduction.",
        type: "specific",
        difficulty: "medium"
      });
    }
    
    if (content.includes('cell cycle')) {
      specificQuestions.push({
        question: "What are the phases of the cell cycle?",
        answer: "The cell cycle consists of interphase (G₁, S, and G₂ phases) and the mitotic phase (mitosis and cytokinesis).",
        type: "specific",
        difficulty: "hard"
      });
    }
    
    if (content.includes('mitosis')) {
      specificQuestions.push({
        question: "What happens during mitosis?",
        answer: "During mitosis, the replicated chromosomes are separated into two nuclei, and cytokinesis divides the cytoplasm, organelles, and cell membrane.",
        type: "specific",
        difficulty: "hard"
      });
    }
    
    // Combine all questions
    return [...basicQuestions, ...specificQuestions];
  };

  const questions = generateQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  // Calculate score when user finishes the quiz
  useEffect(() => {
    if (quizCompleted) {
      const answersCount = Object.keys(userAnswers).length;
      if (answersCount > 0) {
        const correctAnswers = Object.values(userAnswers).filter(Boolean).length;
        const calculatedScore = Math.round((correctAnswers / answersCount) * 100);
        setScore(calculatedScore);
        
        if (onQuizComplete) {
          onQuizComplete(calculatedScore);
        }
      }
    }
  }, [quizCompleted, userAnswers, onQuizComplete]);

  const handleNext = () => {
    setIsConfident(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    } else {
      // End of questions
      setQuizCompleted(true);
      
      const correctAnswers = Object.values(userAnswers).filter(Boolean).length;
      const totalAnswers = Object.values(userAnswers).length;
      
      toast({
        title: "Practice completed!",
        description: `You answered ${correctAnswers} out of ${totalAnswers} questions correctly.`,
        variant: "default",
      });
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const markAnswer = (isCorrect: boolean) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: isCorrect });
    
    // If validation mode, show feedback
    if (validationMode) {
      toast({
        title: isCorrect ? "Correct!" : "Incorrect",
        description: isCorrect 
          ? "Great job! You've got this right." 
          : "Review this concept again to better understand it.",
        variant: isCorrect ? "default" : "destructive",
      });
    }
    
    handleNext();
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setUserAnswers({});
    setQuizCompleted(false);
    setValidationMode(false);
    setIsConfident(null);
  };

  const startValidation = () => {
    resetQuiz();
    setValidationMode(true);
    toast({
      title: "Knowledge Validation Started",
      description: "Answer all questions to validate your mastery of this concept.",
      variant: "default",
    });
  };

  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center text-indigo-800 dark:text-indigo-300">
            <Brain className="h-5 w-5 mr-2 text-indigo-600" /> 
            {validationMode ? "Knowledge Validation" : "Quick Recall Practice"}
          </h2>
          <p className="text-sm text-indigo-700/70 dark:text-indigo-400/70">
            {validationMode 
              ? "Test your understanding and validate your mastery of this concept" 
              : "Practice recalling key information from this concept"}
          </p>
        </div>
        
        {!validationMode && !quizCompleted && (
          <Button 
            variant="outline" 
            onClick={startValidation} 
            className="flex items-center gap-1 border-purple-400 text-purple-700 hover:bg-purple-100 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-900/30"
          >
            <Award className="h-4 w-4" /> Start Validation
          </Button>
        )}
        
        {!validationMode && (
          <Button variant="outline" onClick={resetQuiz} className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" /> Reset
          </Button>
        )}
      </div>
      
      {quizCompleted ? (
        <Card className="mb-6 border-0 shadow-lg bg-white dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative flex items-center justify-center w-40 h-40 mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    className="text-gray-200 stroke-current" 
                    strokeWidth="8" 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                  ></circle>
                  <circle 
                    className={`${
                      score >= 80 ? 'text-green-500' : 
                      score >= 60 ? 'text-blue-500' : 
                      score >= 40 ? 'text-amber-500' : 'text-red-500'
                    } stroke-current`} 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * score / 100)}
                  ></circle>
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{score}%</span>
                  <span className="text-xs text-gray-500">Score</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-center mb-2">
                {validationMode ? "Validation Complete!" : "Practice Complete!"}
              </h3>
              
              <p className="text-center mb-6 text-gray-600 dark:text-gray-300 max-w-md">
                {score >= 80 && "Excellent work! You have a strong understanding of this concept and are ready to move on to more advanced topics."}
                {score >= 60 && score < 80 && "Good job! You have a solid understanding of this concept but might benefit from one more review."}
                {score >= 40 && score < 60 && "You're making progress! Take some time to review the areas where you had difficulty."}
                {score < 40 && "This concept needs more review. Don't worry - revisit the content and try again when you're ready."}
              </p>
              
              <div className="grid grid-cols-3 gap-4 w-full max-w-lg mb-8">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {Object.values(userAnswers).filter(Boolean).length}
                  </div>
                  <div className="text-xs text-green-700 dark:text-green-500">Correct</div>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800 text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {Object.values(userAnswers).filter(val => !val).length}
                  </div>
                  <div className="text-xs text-red-700 dark:text-red-500">Incorrect</div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {Object.keys(userAnswers).length}
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-500">Total</div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={resetQuiz} 
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" /> Try Again
                </Button>
                
                {!validationMode && (
                  <Button 
                    onClick={startValidation} 
                    className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Award className="h-4 w-4" /> Start Validation
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6 border-0 shadow-lg bg-white dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden">
            <div className={`absolute top-0 left-0 w-2 h-full ${
              currentQuestion.difficulty === 'easy' 
                ? 'bg-green-500' 
                : currentQuestion.difficulty === 'medium' 
                ? 'bg-amber-500'
                : 'bg-red-500'
            }`}></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </h3>
                    <Badge className={`
                      ${currentQuestion.difficulty === 'easy' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : currentQuestion.difficulty === 'medium' 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }
                    `}>
                      {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {currentQuestion.type === 'recall' ? 'Memory Recall' : 
                     currentQuestion.type === 'self-assessment' ? 'Self Assessment' : 'Specific Knowledge'}
                  </p>
                </div>
                
                {validationMode && (
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-3 py-1">
                    <Star className="h-3 w-3 mr-1" /> Validation Mode
                  </Badge>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full h-8 w-8 p-0"
                  onClick={speakQuestion}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-5 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg mb-6 shadow-sm">
                <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">{currentQuestion.question}</p>
              </div>
              
              {showAnswer ? (
                <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded mb-6">
                  <p className="text-gray-700 dark:text-gray-300">{currentQuestion.answer}</p>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 mb-6">
                  <Button 
                    variant="outline" 
                    onClick={handleShowAnswer}
                    className="w-full py-6 text-base bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <HelpCircle className="h-5 w-5 mr-2" /> Reveal Answer
                  </Button>
                </div>
              )}
              
              {/* Confidence assessment before marking */}
              {showAnswer && isConfident === null && (
                <div className="mb-6">
                  <p className="text-sm text-center mb-3 text-gray-600 dark:text-gray-400">
                    How confident were you in your answer?
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button 
                      variant="outline" 
                      className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                      onClick={() => setIsConfident(false)}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" /> Not Confident
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-green-300 text-green-600 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20"
                      onClick={() => setIsConfident(true)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" /> Confident
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-4">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          {showAnswer && isConfident !== null && (
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="sm:space-x-2 flex gap-2 sm:gap-0 flex-col sm:flex-row">
                <Button 
                  variant="outline" 
                  className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                  onClick={() => markAnswer(false)}
                >
                  <XCircle className="h-4 w-4 mr-1" /> I Got It Wrong
                </Button>
                <Button 
                  variant="outline" 
                  className="border-green-300 text-green-600 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20"
                  onClick={() => markAnswer(true)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" /> I Got It Right
                </Button>
              </div>
              <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700">
                Next Question <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
          
          <div className="flex justify-between mt-6">
            <div className="flex items-center gap-1.5">
              {questions.map((_, idx) => (
                <motion.div 
                  key={idx} 
                  className={`w-3 h-3 rounded-full ${
                    idx === currentQuestionIndex 
                      ? 'bg-indigo-500 scale-125' 
                      : idx in userAnswers
                        ? userAnswers[idx] 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  animate={idx === currentQuestionIndex ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuickRecallSection;
