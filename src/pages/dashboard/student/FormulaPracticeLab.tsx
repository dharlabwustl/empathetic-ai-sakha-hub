
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, ChevronRight, Plus, Minus, RotateCcw, 
  Check, ArrowRight, CheckCircle, XCircle, Eye, EyeOff 
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import UnifiedSidebar from '@/components/dashboard/UnifiedSidebar';

interface Formula {
  id: string;
  name: string;
  formula: string;
  description: string;
  subject: string;
  category: string;
  variables: { symbol: string; name: string; unit: string }[];
  difficulty: 'easy' | 'medium' | 'hard';
  relatedConcepts: string[];
}

interface Question {
  id: string;
  formula: Formula;
  question: string;
  values: Record<string, number>;
  answer: number;
  isCorrect?: boolean;
  userAnswer?: number | null;
  unit: string;
  showAnswer?: boolean;
  steps: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

const formulas: Formula[] = [
  {
    id: "1",
    name: "Kinematic Equation (Displacement)",
    formula: "s = ut + 0.5at²",
    description: "Calculate displacement given initial velocity, time and acceleration",
    subject: "Physics",
    category: "Kinematics",
    variables: [
      { symbol: "s", name: "displacement", unit: "m" },
      { symbol: "u", name: "initial velocity", unit: "m/s" },
      { symbol: "t", name: "time", unit: "s" },
      { symbol: "a", name: "acceleration", unit: "m/s²" }
    ],
    difficulty: "medium",
    relatedConcepts: ["Motion", "Velocity", "Acceleration"]
  },
  {
    id: "2",
    name: "Force",
    formula: "F = ma",
    description: "Calculate the force acting on an object",
    subject: "Physics",
    category: "Dynamics",
    variables: [
      { symbol: "F", name: "force", unit: "N" },
      { symbol: "m", name: "mass", unit: "kg" },
      { symbol: "a", name: "acceleration", unit: "m/s²" }
    ],
    difficulty: "easy",
    relatedConcepts: ["Newton's Laws", "Force", "Mass"]
  },
  {
    id: "3",
    name: "Ohm's Law",
    formula: "V = IR",
    description: "Calculate the voltage across a conductor",
    subject: "Physics",
    category: "Electricity",
    variables: [
      { symbol: "V", name: "voltage", unit: "V" },
      { symbol: "I", name: "current", unit: "A" },
      { symbol: "R", name: "resistance", unit: "Ω" }
    ],
    difficulty: "easy",
    relatedConcepts: ["Electricity", "Circuits"]
  },
  {
    id: "4",
    name: "Gravitational Potential Energy",
    formula: "E = mgh",
    description: "Calculate the gravitational potential energy",
    subject: "Physics",
    category: "Energy",
    variables: [
      { symbol: "E", name: "energy", unit: "J" },
      { symbol: "m", name: "mass", unit: "kg" },
      { symbol: "g", name: "gravitational acceleration", unit: "m/s²" },
      { symbol: "h", name: "height", unit: "m" }
    ],
    difficulty: "medium",
    relatedConcepts: ["Energy", "Gravity", "Work"]
  },
  {
    id: "5",
    name: "Einstein's Mass-Energy Equivalence",
    formula: "E = mc²",
    description: "Calculate the energy equivalent of mass",
    subject: "Physics",
    category: "Modern Physics",
    variables: [
      { symbol: "E", name: "energy", unit: "J" },
      { symbol: "m", name: "mass", unit: "kg" },
      { symbol: "c", name: "speed of light", unit: "m/s" }
    ],
    difficulty: "hard",
    relatedConcepts: ["Relativity", "Nuclear Physics"]
  }
];

// Generate a simple physics question based on a formula
const generateQuestion = (formula: Formula, difficulty: 'easy' | 'medium' | 'hard'): Question => {
  const values: Record<string, number> = {};
  let answer = 0;
  let question = '';
  let answerSymbol = '';
  let answerUnit = '';
  const steps: string[] = [];
  
  // Determine which variable to solve for (randomly)
  const variables = [...formula.variables];
  const answerVarIndex = Math.floor(Math.random() * variables.length);
  const answerVar = variables[answerVarIndex];
  answerSymbol = answerVar.symbol;
  answerUnit = answerVar.unit;
  
  // Generate random values for other variables based on difficulty
  let multiplier = 1;
  switch(difficulty) {
    case 'easy':
      multiplier = 1;
      break;
    case 'medium':
      multiplier = 10;
      break;
    case 'hard':
      multiplier = 100;
      break;
  }
  
  // Formula-specific question generation
  if (formula.id === "1") { // s = ut + 0.5at²
    if (answerSymbol === "s") {
      values.u = Math.floor(Math.random() * 10 * multiplier) / 10;
      values.t = Math.floor(Math.random() * 5 * multiplier) / 10 + 1;
      values.a = Math.floor(Math.random() * 5 * multiplier) / 10 + 1;
      answer = values.u * values.t + 0.5 * values.a * Math.pow(values.t, 2);
      
      question = `An object starts with an initial velocity of ${values.u} m/s and accelerates at ${values.a} m/s². What is its displacement after ${values.t} seconds?`;
      
      steps.push(`Identify the formula: s = ut + 0.5at²`);
      steps.push(`Substitute the values: s = ${values.u} × ${values.t} + 0.5 × ${values.a} × ${values.t}²`);
      steps.push(`Calculate: s = ${values.u * values.t} + 0.5 × ${values.a} × ${values.t * values.t}`);
      steps.push(`Calculate: s = ${values.u * values.t} + ${0.5 * values.a * Math.pow(values.t, 2)}`);
      steps.push(`Final answer: s = ${answer} m`);
    } else if (answerSymbol === "u") {
      values.s = Math.floor(Math.random() * 100 * multiplier) / 10 + 10;
      values.t = Math.floor(Math.random() * 5 * multiplier) / 10 + 1;
      values.a = Math.floor(Math.random() * 5 * multiplier) / 10 + 1;
      answer = (values.s - 0.5 * values.a * Math.pow(values.t, 2)) / values.t;
      
      question = `An object moves ${values.s} m in ${values.t} seconds with a constant acceleration of ${values.a} m/s². What was its initial velocity?`;
      
      steps.push(`Identify the formula: s = ut + 0.5at²`);
      steps.push(`Rearrange to solve for u: u = (s - 0.5at²) / t`);
      steps.push(`Substitute the values: u = (${values.s} - 0.5 × ${values.a} × ${values.t}²) / ${values.t}`);
      steps.push(`Calculate: u = (${values.s} - 0.5 × ${values.a} × ${values.t * values.t}) / ${values.t}`);
      steps.push(`Calculate: u = (${values.s} - ${0.5 * values.a * Math.pow(values.t, 2)}) / ${values.t}`);
      steps.push(`Calculate: u = ${values.s - 0.5 * values.a * Math.pow(values.t, 2)} / ${values.t}`);
      steps.push(`Final answer: u = ${answer} m/s`);
    }
  } else if (formula.id === "2") { // F = ma
    if (answerSymbol === "F") {
      values.m = Math.floor(Math.random() * 20 * multiplier) / 10 + 1;
      values.a = Math.floor(Math.random() * 10 * multiplier) / 10 + 1;
      answer = values.m * values.a;
      
      question = `What is the force required to accelerate an object with mass ${values.m} kg at ${values.a} m/s²?`;
      
      steps.push(`Identify the formula: F = ma`);
      steps.push(`Substitute the values: F = ${values.m} × ${values.a}`);
      steps.push(`Calculate: F = ${answer} N`);
    } else if (answerSymbol === "m") {
      values.F = Math.floor(Math.random() * 100 * multiplier) / 10 + 10;
      values.a = Math.floor(Math.random() * 10 * multiplier) / 10 + 1;
      answer = values.F / values.a;
      
      question = `A force of ${values.F} N causes an acceleration of ${values.a} m/s². What is the mass of the object?`;
      
      steps.push(`Identify the formula: F = ma`);
      steps.push(`Rearrange to solve for m: m = F / a`);
      steps.push(`Substitute the values: m = ${values.F} / ${values.a}`);
      steps.push(`Calculate: m = ${answer} kg`);
    }
  }
  
  // Round the answer to 2 decimal places for cleaner display
  answer = parseFloat(answer.toFixed(2));
  
  return {
    id: Math.random().toString(36).substring(2, 9),
    formula,
    question,
    values,
    answer,
    unit: answerUnit,
    steps,
    difficulty,
    showAnswer: false
  };
};

const FormulaPracticeLab: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const conceptId = searchParams.get('concept');
  
  const [activeTab, setActiveTab] = useState('formulas');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [selectedFormulaId, setSelectedFormulaId] = useState<string | undefined>(undefined);
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{ total: number; correct: number }>({ total: 0, correct: 0 });
  const [showResults, setShowResults] = useState(false);
  
  // Use the concept ID to preselect a formula if available
  useEffect(() => {
    if (conceptId) {
      // In a real app, you'd fetch formulas related to the concept
      // For now, just select the first formula
      setSelectedFormulaId(formulas[0].id);
    }
  }, [conceptId]);
  
  const handleGenerateQuestions = () => {
    if (!selectedFormulaId && !conceptId) return;
    
    const formula = formulas.find(f => f.id === selectedFormulaId) || formulas[0];
    const newQuestions: Question[] = [];
    
    for (let i = 0; i < numQuestions; i++) {
      newQuestions.push(generateQuestion(formula, selectedDifficulty));
    }
    
    setPracticeQuestions(newQuestions);
    setUserAnswers({});
    setShowResults(false);
    setActiveTab('practice');
  };
  
  const handleAnswerChange = (questionId: string, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const toggleShowAnswer = (questionId: string) => {
    setPracticeQuestions(questions => 
      questions.map(q => 
        q.id === questionId ? { ...q, showAnswer: !q.showAnswer } : q
      )
    );
  };
  
  const handleSubmitAnswers = () => {
    // Calculate results and mark questions
    const updatedQuestions = practiceQuestions.map(question => {
      const userAnswerValue = parseFloat(userAnswers[question.id] || '');
      const isCorrect = !isNaN(userAnswerValue) && 
                       Math.abs(userAnswerValue - question.answer) < 0.1; // Allow small rounding errors
      
      return {
        ...question,
        isCorrect,
        userAnswer: isNaN(userAnswerValue) ? null : userAnswerValue
      };
    });
    
    const correctCount = updatedQuestions.filter(q => q.isCorrect).length;
    
    setPracticeQuestions(updatedQuestions);
    setResults({
      total: updatedQuestions.length,
      correct: correctCount
    });
    setShowResults(true);
  };
  
  const handleReset = () => {
    setPracticeQuestions([]);
    setUserAnswers({});
    setResults({ total: 0, correct: 0 });
    setShowResults(false);
    setActiveTab('formulas');
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <UnifiedSidebar activeTab="formula-practice-lab" onTabChange={() => {}} />
      <div className="flex-1 ml-64 p-8">
        <SharedPageLayout
          title="Formula Practice Lab"
          subtitle="Master formulas through interactive practice"
          activeTab="formula-practice-lab"
          showBackButton={!conceptId}
          backButtonUrl={conceptId ? `/dashboard/student/concepts/${conceptId}` : '/dashboard/student'}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 w-[400px]">
              <TabsTrigger value="formulas">Formulas</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>
            
            <TabsContent value="formulas" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Practice Questions</CardTitle>
                  <CardDescription>
                    Select a formula and difficulty level to generate practice questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Formula</label>
                      <Select 
                        value={selectedFormulaId} 
                        onValueChange={setSelectedFormulaId}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a formula" />
                        </SelectTrigger>
                        <SelectContent>
                          {formulas.map(formula => (
                            <SelectItem key={formula.id} value={formula.id}>
                              <div className="flex items-center justify-between w-full">
                                <span>{formula.name}</span>
                                <Badge variant="outline" className="ml-2">{formula.difficulty}</Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Number of Questions</label>
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setNumQuestions(prev => Math.max(1, prev - 1))}
                          disabled={numQuestions <= 1}
                        >
                          <Minus size={16} />
                        </Button>
                        <div className="w-16 text-center font-medium">{numQuestions}</div>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setNumQuestions(prev => Math.min(20, prev + 1))}
                          disabled={numQuestions >= 20}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
                      <div className="flex space-x-2">
                        <TooltipProvider>
                          {(['easy', 'medium', 'hard'] as const).map(level => (
                            <Tooltip key={level}>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant={selectedDifficulty === level ? "default" : "outline"}
                                  onClick={() => setSelectedDifficulty(level)}
                                  className="flex-1"
                                >
                                  {level.charAt(0).toUpperCase() + level.slice(1)}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm">
                                  {level === 'easy' && "Simple calculations with small numbers"}
                                  {level === 'medium' && "More complex calculations with larger numbers"}
                                  {level === 'hard' && "Advanced calculations with multi-step solving"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    disabled={!selectedFormulaId}
                    onClick={handleGenerateQuestions}
                  >
                    Generate Questions
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              {selectedFormulaId && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {formulas.find(f => f.id === selectedFormulaId)?.name}
                    </CardTitle>
                    <CardDescription>
                      {formulas.find(f => f.id === selectedFormulaId)?.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-center mb-4">
                      <p className="text-lg font-semibold">
                        {formulas.find(f => f.id === selectedFormulaId)?.formula}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Variables:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {formulas.find(f => f.id === selectedFormulaId)?.variables.map((variable, index) => (
                          <li key={index} className="text-sm">
                            <span className="font-mono">{variable.symbol}</span>: {variable.name} ({variable.unit})
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="practice" className="space-y-6">
              {practiceQuestions.length === 0 ? (
                <Card className="text-center p-8">
                  <CardContent>
                    <Calculator className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium">No questions generated yet</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Go to the Formulas tab to generate practice questions
                    </p>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button variant="outline" onClick={() => setActiveTab('formulas')}>
                      Select Formula
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <>
                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                        <CardHeader>
                          <CardTitle className="text-center">Your Results</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className="text-4xl font-bold mb-2">
                            {results.correct} / {results.total}
                          </div>
                          <div className="text-lg">
                            {Math.round((results.correct / results.total) * 100)}% Correct
                          </div>
                        </CardContent>
                        <CardFooter className="justify-center space-x-3">
                          <Button variant="outline" onClick={handleReset}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Try Again
                          </Button>
                          <Button onClick={() => setActiveTab('formulas')}>
                            <Calculator className="mr-2 h-4 w-4" />
                            New Practice
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )}
                  
                  <div className="space-y-6">
                    {practiceQuestions.map((question, index) => (
                      <Card key={question.id} className={`
                        ${showResults && question.isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : ''}
                        ${showResults && question.isCorrect === false ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : ''}
                      `}>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <span className="bg-gray-100 dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                              {index + 1}
                            </span>
                            Question {index + 1}
                            <Badge className="ml-auto" variant={
                              question.difficulty === 'easy' ? 'outline' : 
                              question.difficulty === 'medium' ? 'secondary' : 
                              'destructive'
                            }>
                              {question.difficulty}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p>{question.question}</p>
                          
                          <div className="flex items-center space-x-4">
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="Enter your answer"
                              value={userAnswers[question.id] || ''}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              disabled={showResults}
                              className="max-w-[200px]"
                            />
                            <span className="text-sm text-gray-500">{question.unit}</span>
                            
                            {!showResults && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => toggleShowAnswer(question.id)}
                                    >
                                      {question.showAnswer ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-sm">{question.showAnswer ? "Hide answer" : "Show answer"}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            
                            {(showResults || question.showAnswer) && (
                              <span className="font-medium">
                                Answer: {question.answer} {question.unit}
                              </span>
                            )}
                            
                            {showResults && (
                              question.isCorrect ? 
                                <CheckCircle className="text-green-500 h-5 w-5" /> : 
                                <XCircle className="text-red-500 h-5 w-5" />
                            )}
                          </div>
                          
                          {(showResults || question.showAnswer) && (
                            <div className="mt-4 border-t pt-4">
                              <h4 className="font-medium mb-2">Solution Steps:</h4>
                              <ol className="list-decimal list-inside space-y-1">
                                {question.steps.map((step, stepIndex) => (
                                  <li key={stepIndex} className="text-sm">{step}</li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {!showResults && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={handleSubmitAnswers}>
                        Submit Answers
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </SharedPageLayout>
      </div>
    </div>
  );
};

export default FormulaPracticeLab;
