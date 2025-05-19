
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, CheckCircle, XCircle, RefreshCw, Award, 
  ArrowRight, HelpCircle, Star 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConceptExercisesProps {
  conceptId: string;
  conceptTitle: string;
  recallAccuracy: number;
  lastPracticed: string;
  quizScore: number;
}

const ConceptExercises: React.FC<ConceptExercisesProps> = ({
  conceptId,
  conceptTitle,
  recallAccuracy,
  lastPracticed,
  quizScore
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();
  
  // Mock questions - in a real app this would come from an API
  const questions = [
    {
      question: "What does Newton's Second Law state?",
      answer: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
      difficulty: "medium"
    },
    {
      question: "What is the formula for Newton's Second Law?",
      answer: "F = ma, where F is the net force, m is the mass, and a is the acceleration.",
      difficulty: "easy"
    },
    {
      question: "If a 5kg object experiences a force of 20N, what is its acceleration?",
      answer: "Using F = ma, a = F/m = 20N/5kg = 4 m/s²",
      difficulty: "hard"
    }
  ];

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
      toast({
        title: "Practice completed!",
        description: "You've completed all practice questions for this concept.",
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setQuizCompleted(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <Brain className="h-5 w-5 mr-2 text-purple-600" /> 
          Practice & Quick Recall
        </h2>
        
        <Button 
          variant="outline" 
          onClick={resetQuiz} 
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" /> Reset
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Recall Accuracy</div>
          <div className="text-sm font-medium">{recallAccuracy}%</div>
        </div>
        <Progress value={recallAccuracy} className="h-2" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Last Practice Session</h3>
              <span className="text-sm text-gray-500">
                {new Date(lastPracticed).toLocaleDateString()}
              </span>
            </div>
            <Button className="w-full mt-4">
              Practice Recall
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 dark:bg-purple-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Quiz Performance</h3>
              <span className="text-sm">
                Score: <span className="font-medium">{quizScore}%</span>
              </span>
            </div>
            <Button className="w-full mt-4" variant="outline">
              Take Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {quizCompleted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl text-center"
        >
          <Award className="h-16 w-16 mx-auto text-green-600 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Practice Complete!</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You've successfully completed the practice questions for this concept.
          </p>
          <div className="flex justify-center">
            <Button onClick={resetQuiz} className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" /> Practice Again
            </Button>
          </div>
        </motion.div>
      ) : (
        <Card className="border-0 shadow-md overflow-hidden">
          <div className={`absolute top-0 left-0 w-2 h-full ${
            currentQuestion.difficulty === 'easy' ? 'bg-green-500' : 
            currentQuestion.difficulty === 'medium' ? 'bg-amber-500' :
            'bg-red-500'
          }`}></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h3>
              <div className={`px-2 py-1 text-xs rounded ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                currentQuestion.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
                'bg-red-100 text-red-800'
              }`}>
                {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
              </div>
            </div>
            
            <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mb-6">
              <p className="text-gray-800 dark:text-gray-200 text-lg">{currentQuestion.question}</p>
            </div>
            
            {showAnswer ? (
              <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded mb-6">
                <p className="text-gray-700 dark:text-gray-300">{currentQuestion.answer}</p>
              </div>
            ) : (
              <div className="mb-6">
                <Button 
                  variant="outline" 
                  onClick={handleShowAnswer}
                  className="w-full py-6 text-base"
                >
                  <HelpCircle className="h-5 w-5 mr-2" /> Reveal Answer
                </Button>
              </div>
            )}
            
            {showAnswer && (
              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    className="border-red-300 text-red-600"
                  >
                    <XCircle className="h-4 w-4 mr-1" /> I Got It Wrong
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-green-300 text-green-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" /> I Got It Right
                  </Button>
                </div>
                <Button onClick={handleNextQuestion}>
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
                      idx === currentQuestionIndex ? 'bg-indigo-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    animate={idx === currentQuestionIndex ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Practice Tips</h3>
        <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>Review the formula F = ma and practice applying it to different scenarios</li>
          <li>Try calculating acceleration when different forces are applied</li>
          <li>Practice identifying all forces acting on an object before applying the formula</li>
        </ul>
      </Card>
    </div>
  );
};

export default ConceptExercises;
