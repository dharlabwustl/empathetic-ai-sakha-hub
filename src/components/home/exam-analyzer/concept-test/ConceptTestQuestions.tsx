
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, CheckCircle2, XCircle, Timer } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';

interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface ConceptTestQuestionsProps {
  selectedExam: string;
  onCompleteTest: (answers: any[]) => void;
  examDetails?: {
    scoringPattern: string;
    timePerQuestion: string;
    totalTime: string;
    totalQuestions: string;
  };
}

const ConceptTestQuestions: React.FC<ConceptTestQuestionsProps> = ({
  selectedExam,
  onCompleteTest,
  examDetails
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);

  useEffect(() => {
    // Sample questions - in a real app, these would come from an API or be properly imported
    const sampleQuestions: TestQuestion[] = [
      {
        id: 'q1',
        question: 'Which of the following is a characteristic of enzymes?',
        options: [
          'They are consumed in the reaction',
          'They lower activation energy',
          'They are always proteins',
          'They change the reaction equilibrium'
        ],
        correctAnswer: 'They lower activation energy',
        explanation: 'Enzymes are biological catalysts that lower the activation energy required for a reaction to occur. They are not consumed in the reaction and do not change the equilibrium.'
      },
      {
        id: 'q2',
        question: 'Newton\'s first law of motion states:',
        options: [
          'Force equals mass times acceleration',
          'An object remains at rest or in motion unless acted upon by a force',
          'For every action there is an equal and opposite reaction',
          'Energy cannot be created or destroyed'
        ],
        correctAnswer: 'An object remains at rest or in motion unless acted upon by a force',
        explanation: 'Newton\'s first law, also known as the law of inertia, states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.'
      },
      {
        id: 'q3',
        question: 'Which of the following is an example of a covalent bond?',
        options: [
          'NaCl',
          'H₂O',
          'CaO',
          'KCl'
        ],
        correctAnswer: 'H₂O',
        explanation: 'Water (H₂O) has covalent bonds where electrons are shared between hydrogen and oxygen atoms. The other examples are ionic compounds.'
      }
    ];
    
    setQuestions(sampleQuestions);
  }, [selectedExam]);
  
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswer = {
      questionId: currentQuestion.id,
      answer,
      isCorrect
    };
    
    setShowExplanation(true);
    setUserAnswers([...userAnswers, newAnswer]);
    
    // Move to next question or finish the test after a delay
    setTimeout(() => {
      setShowExplanation(false);
      setSelectedAnswer(null);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        onCompleteTest([...userAnswers, newAnswer]);
      }
    }, 2500);
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p>Loading questions...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        {examDetails && (
          <div className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
            <Timer className="h-4 w-4 mr-1" />
            {examDetails.timePerQuestion} per question
          </div>
        )}
      </div>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium flex items-center mb-4">
          <Brain className="mr-2 text-pink-500" size={20} />
          {currentQuestion.question}
        </h3>
        
        <div className="space-y-3 mb-4">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full justify-start text-left p-4 h-auto ${
                selectedAnswer === option 
                  ? (option === currentQuestion.correctAnswer 
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                      : "border-red-500 bg-red-50 dark:bg-red-900/20") 
                  : ""
              }`}
              onClick={() => !showExplanation && handleAnswer(option)}
              disabled={showExplanation}
            >
              <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </Button>
          ))}
        </div>
        
        {showExplanation && (
          <div className={`p-4 rounded-lg ${
            userAnswers[userAnswers.length - 1].isCorrect 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-start">
              {userAnswers[userAnswers.length - 1].isCorrect ? (
                <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
              ) : (
                <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" size={18} />
              )}
              <div>
                <p className="font-medium">
                  {userAnswers[userAnswers.length - 1].isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm mt-1">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
      
      <CustomProgress 
        value={(currentQuestionIndex + 1) / questions.length * 100} 
        className="h-2" 
        indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" 
      />
    </div>
  );
};

export default ConceptTestQuestions;
