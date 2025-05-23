
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Zap, CheckCircle, XCircle, Repeat, EyeOff, Eye } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface RecallSectionProps {
  conceptName: string;
}

const RecallSection: React.FC<RecallSectionProps> = ({ conceptName }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [recallScore, setRecallScore] = useState(75);
  const [userResponses, setUserResponses] = useState<('correct' | 'incorrect' | 'pending')[]>([
    'pending', 'pending', 'pending', 'pending', 'pending'
  ]);
  
  // Sample recall questions
  const recallQuestions = [
    {
      question: `What is ${conceptName}?`,
      answer: `${conceptName} states that the current through a conductor between two points is directly proportional to the voltage across the two points.`
    },
    {
      question: `Write the formula for ${conceptName}.`,
      answer: `V = IR, where V is voltage, I is current, and R is resistance.`
    },
    {
      question: `What happens to current if resistance increases while voltage remains constant?`,
      answer: `If resistance increases while voltage remains constant, the current decreases. This is because current is inversely proportional to resistance (I = V/R).`
    },
    {
      question: `In a circuit with a 9V battery and a 3Ω resistor, what is the current?`,
      answer: `Using Ohm's law: I = V/R = 9V/3Ω = 3A`
    },
    {
      question: `What is the unit of measurement for resistance?`,
      answer: `The unit of resistance is the ohm (Ω).`
    }
  ];
  
  const handleResponse = (response: 'correct' | 'incorrect') => {
    const newResponses = [...userResponses];
    newResponses[currentQuestionIndex] = response;
    setUserResponses(newResponses);
    
    // Update score
    const correctCount = newResponses.filter(r => r === 'correct').length;
    const attemptedCount = newResponses.filter(r => r !== 'pending').length;
    if (attemptedCount > 0) {
      setRecallScore(Math.round((correctCount / attemptedCount) * 100));
    }
    
    // Move to next question if available
    if (currentQuestionIndex < recallQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    }
  };
  
  const currentQuestion = recallQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === recallQuestions.length - 1;
  const allQuestionsAnswered = userResponses.every(r => r !== 'pending');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-indigo-600" />
          Active Recall: {conceptName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Question {currentQuestionIndex + 1} of {recallQuestions.length}</h3>
                <div className="flex gap-1">
                  {recallQuestions.map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-3 h-3 rounded-full ${
                        index === currentQuestionIndex 
                          ? 'bg-indigo-600' 
                          : userResponses[index] === 'correct' 
                            ? 'bg-green-500' 
                            : userResponses[index] === 'incorrect' 
                              ? 'bg-red-500' 
                              : 'bg-gray-300 dark:bg-gray-700'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              <Progress value={(currentQuestionIndex / recallQuestions.length) * 100} className="h-1" />
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
              
              {showAnswer ? (
                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300">Answer:</h4>
                  <p className="mt-2 text-blue-700 dark:text-blue-300">{currentQuestion.answer}</p>
                </div>
              ) : (
                <div className="mt-6 p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center">
                  <EyeOff className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">Try to recall the answer before revealing it</p>
                </div>
              )}
              
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {!showAnswer ? (
                  <Button 
                    onClick={() => setShowAnswer(true)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Show Answer
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50 flex-1"
                      onClick={() => handleResponse('correct')}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      I Knew This
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50 flex-1"
                      onClick={() => handleResponse('incorrect')}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Didn't Know
                    </Button>
                  </>
                )}
              </div>
              
              {isLastQuestion && allQuestionsAnswered && (
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" onClick={() => {
                    setCurrentQuestionIndex(0);
                    setShowAnswer(false);
                    setUserResponses(['pending', 'pending', 'pending', 'pending', 'pending']);
                  }}>
                    <Repeat className="h-4 w-4 mr-2" />
                    Start Over
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm">Recall Accuracy</h3>
                  <span className="text-lg font-bold">{recallScore}%</span>
                </div>
                <Progress 
                  value={recallScore} 
                  className="h-2 bg-gray-200" 
                  indicatorClassName={
                    recallScore > 80 
                      ? 'bg-green-500' 
                      : recallScore > 50 
                        ? 'bg-amber-500' 
                        : 'bg-red-500'
                  } 
                />
                <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
                  Your recall accuracy shows how well you remember this concept without aids.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Recall Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-amber-500 mt-0.5" />
                    <span>Answer questions before looking at the solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-amber-500 mt-0.5" />
                    <span>Practice recalling information at increasing intervals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-amber-500 mt-0.5" />
                    <span>Try explaining the concept to someone else</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Button variant="outline" className="w-full">
              <Repeat className="h-4 w-4 mr-2" />
              Create Custom Recall Deck
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecallSection;
