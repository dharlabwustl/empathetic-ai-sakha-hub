
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle, RefreshCw, Brain, Star, Award, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

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
    handleNext();
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setUserAnswers({});
    setQuizCompleted(false);
    setValidationMode(false);
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600" /> 
            {validationMode ? "Knowledge Validation" : "Quick Recall Practice"}
          </h2>
          <p className="text-muted-foreground">
            {validationMode 
              ? "Test your understanding and validate your mastery of this concept" 
              : "Practice recalling key information from this concept"}
          </p>
        </div>
        
        {!validationMode && !quizCompleted && (
          <Button 
            variant="outline" 
            onClick={startValidation} 
            className="flex items-center gap-1 border-purple-500 text-purple-600"
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
        <Card className="mb-6 border-2 border-green-100 dark:border-green-900/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative flex items-center justify-center w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    className="text-gray-200 stroke-current" 
                    strokeWidth="10" 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                  ></circle>
                  <circle 
                    className={`${
                      score >= 80 ? 'text-green-500' : 
                      score >= 60 ? 'text-blue-500' : 
                      score >= 40 ? 'text-yellow-500' : 'text-red-500'
                    } stroke-current`} 
                    strokeWidth="10" 
                    strokeLinecap="round" 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * score / 100)}
                    transform="rotate(-90 50 50)" 
                  ></circle>
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{score}%</span>
                  <span className="text-xs text-gray-500">Score</span>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-center mb-3">
              {validationMode ? "Validation Complete!" : "Practice Complete!"}
            </h3>
            
            <p className="text-center mb-4">
              {score >= 80 && "Great job! You have excellent mastery of this concept."}
              {score >= 60 && score < 80 && "Good job! You have a solid understanding of this concept."}
              {score >= 40 && score < 60 && "You're making progress! Review the concept to strengthen your understanding."}
              {score < 40 && "You might need more review. Take some time to study this concept again."}
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                <CheckCircle className="h-3 w-3 mr-1" /> {Object.values(userAnswers).filter(Boolean).length} Correct
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                <XCircle className="h-3 w-3 mr-1" /> {Object.values(userAnswers).filter(val => !val).length} Incorrect
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                <Star className="h-3 w-3 mr-1" /> {validationMode ? "Mastery Validated" : "Practice Mode"}
              </Badge>
            </div>
            
            <div className="flex justify-center gap-3">
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
                  className="flex items-center gap-1"
                >
                  <Award className="h-4 w-4" /> Start Validation
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6 border-2 border-blue-100 dark:border-blue-900/30">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </h3>
                  <Badge variant="outline" className={`
                    ${currentQuestion.difficulty === 'easy' 
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                      : currentQuestion.difficulty === 'medium' 
                      ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    }
                  `}>
                    {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)} Question
                  </Badge>
                </div>
                
                {validationMode && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 px-3 py-1.5">
                    <Star className="h-3 w-3 mr-1" /> Validation Mode
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{currentQuestion.question}</p>
              
              {showAnswer ? (
                <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded mb-4">
                  <p className="text-gray-700 dark:text-gray-300">{currentQuestion.answer}</p>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 mb-4">
                  <Button variant="outline" onClick={handleShowAnswer}>
                    <HelpCircle className="h-4 w-4 mr-1" /> Show Answer
                  </Button>
                </div>
              )}
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mb-4">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full" 
                  style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          {showAnswer && (
            <div className="flex justify-between">
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => markAnswer(false)}
                >
                  <XCircle className="h-4 w-4 mr-1" /> Incorrect
                </Button>
                <Button 
                  variant="outline" 
                  className="border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
                  onClick={() => markAnswer(true)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" /> Correct
                </Button>
              </div>
              <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                Next Question <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
          
          <div className="flex justify-between mt-6">
            <div className="flex items-center gap-1">
              {questions.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-3 h-3 rounded-full ${
                    idx === currentQuestionIndex 
                      ? 'bg-blue-500' 
                      : idx in userAnswers
                        ? userAnswers[idx] 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                  }`}
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
