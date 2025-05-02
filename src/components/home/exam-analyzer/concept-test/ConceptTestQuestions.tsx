
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, CheckCircle2, XCircle, Timer, Atom, Flask, Book } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CustomProgress } from '@/components/ui/custom-progress';

interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  subject?: string;
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
  currentSubject?: string;
}

const ConceptTestQuestions: React.FC<ConceptTestQuestionsProps> = ({
  selectedExam,
  onCompleteTest,
  examDetails,
  currentSubject
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);

  useEffect(() => {
    // Get subject-specific questions - in a real app, these would come from an API
    const sampleQuestions: TestQuestion[] = generateSubjectQuestions(currentSubject);
    setQuestions(sampleQuestions);
  }, [selectedExam, currentSubject]);
  
  const generateSubjectQuestions = (subject?: string): TestQuestion[] => {
    const isNeet = selectedExam === 'NEET-UG';
    
    if (isNeet) {
      switch(subject?.toLowerCase()) {
        case 'physics':
          return [
            {
              id: 'phys1',
              question: 'A body of mass m is thrown vertically upward with an initial velocity v. The time after which the K.E. becomes one-fourth of the initial value is:',
              options: [
                '3v/4g',
                'v/4g',
                'v/2g',
                'v/g'
              ],
              correctAnswer: 'v/2g',
              explanation: 'When KE becomes 1/4th, v becomes 1/2 of initial. Using v = u - gt, we get t = v/2g',
              subject: 'Physics'
            },
            {
              id: 'phys2',
              question: 'Newton\'s first law of motion describes:',
              options: [
                'Force equals mass times acceleration',
                'An object remains at rest or in motion unless acted upon by a force',
                'For every action there is an equal and opposite reaction',
                'Energy cannot be created or destroyed'
              ],
              correctAnswer: 'An object remains at rest or in motion unless acted upon by a force',
              explanation: 'Newton\'s first law, also known as the law of inertia, states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.',
              subject: 'Physics'
            },
            {
              id: 'phys3',
              question: 'Which of the following is the unit of electric potential?',
              options: [
                'Newton',
                'Joule',
                'Volt',
                'Coulomb'
              ],
              correctAnswer: 'Volt',
              explanation: 'Volt is the SI unit of electric potential, potential difference and electromotive force.',
              subject: 'Physics'
            }
          ];
        case 'chemistry':
          return [
            {
              id: 'chem1',
              question: 'Which of the following is an example of a covalent bond?',
              options: [
                'NaCl',
                'H₂O',
                'CaO',
                'KCl'
              ],
              correctAnswer: 'H₂O',
              explanation: 'Water (H₂O) has covalent bonds where electrons are shared between hydrogen and oxygen atoms. The other examples are ionic compounds.',
              subject: 'Chemistry'
            },
            {
              id: 'chem2',
              question: 'What is the pH of a neutral solution at 25°C?',
              options: [
                '0',
                '7',
                '14',
                '1'
              ],
              correctAnswer: '7',
              explanation: 'At 25°C, a neutral solution has a pH of 7.',
              subject: 'Chemistry'
            },
            {
              id: 'chem3',
              question: 'Which of the following elements has the highest electronegativity?',
              options: [
                'Sodium',
                'Carbon',
                'Chlorine',
                'Fluorine'
              ],
              correctAnswer: 'Fluorine',
              explanation: 'Fluorine has the highest electronegativity value (3.98 on the Pauling scale) among all elements.',
              subject: 'Chemistry'
            }
          ];
        case 'biology':
          return [
            {
              id: 'bio1',
              question: 'Which of the following is a characteristic of enzymes?',
              options: [
                'They are consumed in the reaction',
                'They lower activation energy',
                'They are always proteins',
                'They change the reaction equilibrium'
              ],
              correctAnswer: 'They lower activation energy',
              explanation: 'Enzymes are biological catalysts that lower the activation energy required for a reaction to occur. They are not consumed in the reaction and do not change the equilibrium.',
              subject: 'Biology'
            },
            {
              id: 'bio2',
              question: 'Which organelle is known as the "powerhouse of the cell"?',
              options: [
                'Nucleus',
                'Ribosome',
                'Mitochondria',
                'Golgi apparatus'
              ],
              correctAnswer: 'Mitochondria',
              explanation: 'Mitochondria are known as the "powerhouse of the cell" because they generate most of the cell\'s supply of adenosine triphosphate (ATP), which is used as a source of chemical energy.',
              subject: 'Biology'
            },
            {
              id: 'bio3',
              question: 'Which of the following is NOT a function of the liver?',
              options: [
                'Detoxification of drugs',
                'Production of insulin',
                'Storage of glycogen',
                'Production of bile'
              ],
              correctAnswer: 'Production of insulin',
              explanation: 'The liver does not produce insulin; insulin is produced by beta cells in the pancreas. The liver performs the other functions listed.',
              subject: 'Biology'
            }
          ];
        default:
          // Generic questions for when no subject is specified
          return [
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
      }
    }
    
    // Default generic questions if not NEET or no subject specified
    return [
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
  };
  
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswer = {
      questionId: currentQuestion.id,
      answer,
      isCorrect,
      subject: currentQuestion.subject
    };
    
    setUserAnswers([...userAnswers, newAnswer]);
    setShowExplanation(true);
    
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

  const getSubjectIcon = () => {
    if (!currentSubject) return <Brain size={16} className="mr-2" />;
    
    switch(currentSubject.toLowerCase()) {
      case 'physics':
        return <Atom size={16} className="mr-2" />;
      case 'chemistry':
        return <Flask size={16} className="mr-2" />;
      case 'biology':
        return <Book size={16} className="mr-2" />;
      default:
        return <Brain size={16} className="mr-2" />;
    }
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
        <div className="text-sm font-medium flex items-center">
          {currentSubject && (
            <Badge variant="outline" className="mr-2 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
              {getSubjectIcon()}
              {currentSubject}
            </Badge>
          )}
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
