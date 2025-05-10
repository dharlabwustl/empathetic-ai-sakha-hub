
import React, { useState, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Upload, FileText, Eye, EyeOff } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Formula {
  id: string;
  name: string;
  latex: string;
  description: string;
  variables: {
    symbol: string;
    name: string;
    unit?: string;
  }[];
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface FormulaQuestion {
  id: string;
  questionText: string;
  formula: Formula;
  givenVariables: string[];
  targetVariable: string;
  difficulty: 'easy' | 'medium' | 'hard';
  solution: {
    steps: {
      stepNumber: number;
      description: string;
      equation?: string;
    }[];
    finalAnswer: {
      value: number | string;
      unit?: string;
    };
  };
}

// Mock formulas for the example
const mockFormulas: Formula[] = [
  {
    id: '1',
    name: "Newton's Second Law",
    latex: "F = m \\cdot a",
    description: "The rate of change of momentum is proportional to the force applied.",
    variables: [
      { symbol: 'F', name: 'Force', unit: 'N' },
      { symbol: 'm', name: 'Mass', unit: 'kg' },
      { symbol: 'a', name: 'Acceleration', unit: 'm/s²' }
    ],
    subject: 'Physics',
    topic: 'Mechanics',
    difficulty: 'easy'
  },
  {
    id: '2',
    name: "Kinetic Energy",
    latex: "K = \\frac{1}{2} \\cdot m \\cdot v^2",
    description: "The energy possessed by an object due to its motion.",
    variables: [
      { symbol: 'K', name: 'Kinetic Energy', unit: 'J' },
      { symbol: 'm', name: 'Mass', unit: 'kg' },
      { symbol: 'v', name: 'Velocity', unit: 'm/s' }
    ],
    subject: 'Physics',
    topic: 'Work and Energy',
    difficulty: 'medium'
  },
  {
    id: '3',
    name: "Ohm's Law",
    latex: "V = I \\cdot R",
    description: "The current through a conductor is directly proportional to the voltage across it.",
    variables: [
      { symbol: 'V', name: 'Voltage', unit: 'V' },
      { symbol: 'I', name: 'Current', unit: 'A' },
      { symbol: 'R', name: 'Resistance', unit: 'Ω' }
    ],
    subject: 'Physics',
    topic: 'Electricity',
    difficulty: 'medium'
  },
  {
    id: '4',
    name: "Einstein's Mass-Energy Equivalence",
    latex: "E = m \\cdot c^2",
    description: "Energy equals mass multiplied by the speed of light squared.",
    variables: [
      { symbol: 'E', name: 'Energy', unit: 'J' },
      { symbol: 'm', name: 'Mass', unit: 'kg' },
      { symbol: 'c', name: 'Speed of Light', unit: 'm/s' }
    ],
    subject: 'Physics',
    topic: 'Modern Physics',
    difficulty: 'hard'
  }
];

// Function to generate random questions based on formulas
const generateQuestions = (
  formulas: Formula[], 
  count: number, 
  difficulty: 'easy' | 'medium' | 'hard' | 'all'
): FormulaQuestion[] => {
  const filteredFormulas = difficulty === 'all' 
    ? formulas 
    : formulas.filter(f => f.difficulty === difficulty);
  
  if (filteredFormulas.length === 0) return [];
  
  const questions: FormulaQuestion[] = [];
  
  for (let i = 0; i < count; i++) {
    const formula = filteredFormulas[Math.floor(Math.random() * filteredFormulas.length)];
    const targetVarIndex = Math.floor(Math.random() * formula.variables.length);
    const targetVar = formula.variables[targetVarIndex];
    
    const givenVars = formula.variables
      .filter(v => v.symbol !== targetVar.symbol)
      .map(v => v.symbol);
    
    // Simple example question generation - would be more sophisticated in a real app
    const questionText = `Find the ${targetVar.name} (${targetVar.symbol}) using ${formula.name} when ` + 
      givenVars.map(symbol => {
        const variable = formula.variables.find(v => v.symbol === symbol);
        const value = Math.floor(Math.random() * 10) + 1;
        return `${variable?.name} (${symbol}) = ${value} ${variable?.unit || ''}`;
      }).join(' and ');
    
    questions.push({
      id: `q${i+1}`,
      questionText,
      formula,
      givenVariables: givenVars,
      targetVariable: targetVar.symbol,
      difficulty: formula.difficulty,
      solution: {
        steps: [
          {
            stepNumber: 1,
            description: `Identify the formula: ${formula.name} - ${formula.latex}`,
          },
          {
            stepNumber: 2,
            description: `Substitute the given values into the formula`,
            equation: formula.latex.replace(targetVar.symbol, '?')
          },
          {
            stepNumber: 3,
            description: `Solve for ${targetVar.symbol}`,
          }
        ],
        finalAnswer: {
          value: (Math.random() * 100).toFixed(2),
          unit: targetVar.unit
        }
      }
    });
  }
  
  return questions;
};

const FormulaTabContent: React.FC = () => {
  const [questions, setQuestions] = useState<FormulaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[questionId: string]: string}>({});
  const [isCorrect, setIsCorrect] = useState<{[questionId: string]: boolean}>({});
  const [showSolutions, setShowSolutions] = useState<{[questionId: string]: boolean}>({});
  const [currentStep, setCurrentStep] = useState<{[questionId: string]: number}>({});
  const [questionCount, setQuestionCount] = useState(5);
  const [difficultyLevel, setDifficultyLevel] = useState<'easy' | 'medium' | 'hard' | 'all'>('all');
  const [showDifficultyHighlight, setShowDifficultyHighlight] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Generate questions based on user settings
  const handleGenerateQuestions = () => {
    const newQuestions = generateQuestions(mockFormulas, questionCount, difficultyLevel);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsCorrect({});
    setShowSolutions({});
    setCurrentStep({});
    
    toast.success(`Generated ${newQuestions.length} ${difficultyLevel !== 'all' ? difficultyLevel : ''} questions`);
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentQuestion) return;
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: e.target.value
    });
  };
  
  const handleSubmitAnswer = () => {
    if (!currentQuestion) return;
    
    const userAnswer = userAnswers[currentQuestion.id] || '';
    const correctAnswer = String(currentQuestion.solution.finalAnswer.value);
    
    // Compare answers, ignoring spaces and case
    const isAnswerCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    
    setIsCorrect({
      ...isCorrect,
      [currentQuestion.id]: isAnswerCorrect
    });
    
    // Initialize current step if not yet set
    if (!currentStep[currentQuestion.id]) {
      setCurrentStep({
        ...currentStep,
        [currentQuestion.id]: 1
      });
    }
    
    if (isAnswerCorrect) {
      toast.success("Correct answer! Well done!");
      // If answered correctly, move to the next step
      const nextStep = (currentStep[currentQuestion.id] || 0) + 1;
      if (nextStep <= currentQuestion.solution.steps.length) {
        setCurrentStep({
          ...currentStep,
          [currentQuestion.id]: nextStep
        });
      }
    } else {
      toast.error("Not quite right. Try again or check the solution.");
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const toggleShowSolution = (questionId: string) => {
    setShowSolutions({
      ...showSolutions,
      [questionId]: !showSolutions[questionId]
    });
  };
  
  const handleNextStep = (questionId: string) => {
    const currentStepNum = currentStep[questionId] || 1;
    const question = questions.find(q => q.id === questionId);
    
    if (question && currentStepNum < question.solution.steps.length) {
      setCurrentStep({
        ...currentStep,
        [questionId]: currentStepNum + 1
      });
    }
  };
  
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !currentQuestion) return;
    
    const file = files[0];
    
    // Simulate processing the file and checking the answer
    toast.info(`Processing file: ${file.name}...`);
    
    // In a real app, we would send the file to a backend API for processing
    // Here we'll just simulate a successful answer match after a delay
    setTimeout(() => {
      const randomSuccess = Math.random() > 0.3; // 70% chance of success for demo
      
      if (randomSuccess) {
        setIsCorrect({
          ...isCorrect,
          [currentQuestion.id]: true
        });
        toast.success("Answer in document matches the correct solution!");
        
        // Move to next step
        const nextStep = (currentStep[currentQuestion.id] || 0) + 1;
        if (nextStep <= currentQuestion.solution.steps.length) {
          setCurrentStep({
            ...currentStep,
            [currentQuestion.id]: nextStep
          });
        }
      } else {
        toast.error("Could not find the correct answer in the uploaded file.");
      }
    }, 1500);
    
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [currentQuestion, isCorrect, currentStep]);

  return (
    <div className="space-y-6">
      {/* Question Generator Section */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Practice Questions</CardTitle>
          <CardDescription>Create formula-based questions to test your understanding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="questionCount">Number of Questions</Label>
              <Input 
                id="questionCount" 
                type="number" 
                min="1" 
                max="20"
                value={questionCount} 
                onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)} 
                className="mt-1"
              />
            </div>
            
            <div className="flex-1">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <div 
                className={`mt-1 border rounded-md ${showDifficultyHighlight ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                onClick={() => setShowDifficultyHighlight(true)}
                onBlur={() => setShowDifficultyHighlight(false)}
              >
                <Select value={difficultyLevel} onValueChange={(value: any) => setDifficultyLevel(value)}>
                  <SelectTrigger id="difficulty" className="w-full">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateQuestions} 
            className="w-full bg-violet-600 hover:bg-violet-700"
          >
            Generate Questions
          </Button>
        </CardFooter>
      </Card>
      
      {/* Questions and Solutions Section */}
      {questions.length > 0 && currentQuestion && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
                <CardDescription>
                  Formula: {currentQuestion.formula.name} • 
                  Difficulty: <Badge variant="outline" className={
                    currentQuestion.difficulty === 'easy' 
                      ? 'bg-green-100 text-green-800 border-green-200'
                      : currentQuestion.difficulty === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        : 'bg-red-100 text-red-800 border-red-200'
                  }>{currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}</Badge>
                </CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() => toggleShowSolution(currentQuestion.id)}
                className="flex items-center gap-1"
              >
                {showSolutions[currentQuestion.id] ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Hide Solution
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Show Solution
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
              <p className="font-medium">Problem:</p>
              <p className="mt-1">{currentQuestion.questionText}</p>
            </div>
            
            {/* Show each step if completed */}
            {currentStep[currentQuestion.id] && currentStep[currentQuestion.id] > 0 && (
              <div className="space-y-3 mt-4">
                <p className="font-medium">Solution Steps:</p>
                
                {currentQuestion.solution.steps.map((step, index) => {
                  // Only show steps up to the current step
                  if (index >= (currentStep[currentQuestion.id] || 0)) return null;
                  
                  return (
                    <div 
                      key={index} 
                      className="border-l-4 border-blue-500 pl-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r-md"
                    >
                      <p className="text-sm font-medium">Step {step.stepNumber}: {step.description}</p>
                      {step.equation && (
                        <div className="mt-1 p-2 bg-white dark:bg-gray-800 rounded">
                          <code>{step.equation}</code>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Answer input section */}
            <div className="space-y-2">
              <Label htmlFor="answer">Your Answer:</Label>
              <div className="flex gap-2">
                <Input
                  id="answer"
                  value={userAnswers[currentQuestion.id] || ''}
                  onChange={handleAnswerChange}
                  placeholder={`Enter your answer for ${currentQuestion.targetVariable}...`}
                  disabled={isCorrect[currentQuestion.id]}
                  className={isCorrect[currentQuestion.id] ? "bg-green-50 border-green-300" : ""}
                />
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={isCorrect[currentQuestion.id]}
                  variant={isCorrect[currentQuestion.id] ? "outline" : "default"}
                  className={isCorrect[currentQuestion.id] ? "bg-green-100 text-green-800 border-green-300" : ""}
                >
                  {isCorrect[currentQuestion.id] ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Correct
                    </>
                  ) : (
                    "Check"
                  )}
                </Button>
              </div>
              
              {isCorrect[currentQuestion.id] && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Correct! The answer is {currentQuestion.solution.finalAnswer.value} {currentQuestion.solution.finalAnswer.unit || ''}
                </p>
              )}
            </div>
            
            {/* File upload section */}
            <div className="space-y-2 border-t pt-4">
              <Label htmlFor="file-upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Solution File
              </Label>
              <p className="text-sm text-gray-500">Upload a document with your solution (PDF, Word, or image)</p>
              <Input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500">We'll scan your document for the answer</p>
            </div>
            
            {/* Solution section (shown when toggled) */}
            {showSolutions[currentQuestion.id] && (
              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold text-lg">Solution</h3>
                
                {currentQuestion.solution.steps.map((step, index) => (
                  <div key={index} className="mt-3">
                    <p className="font-medium">Step {step.stepNumber}:</p>
                    <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                    {step.equation && (
                      <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded">
                        <code>{step.equation}</code>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                  <p className="font-medium">Final Answer:</p>
                  <p>
                    {currentQuestion.targetVariable} = {currentQuestion.solution.finalAnswer.value} {currentQuestion.solution.finalAnswer.unit || ''}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {questions.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold">No Questions Generated</h3>
          <p className="text-gray-500 mt-2">Generate questions using the options above to practice</p>
        </div>
      )}
    </div>
  );
};

export default FormulaTabContent;
