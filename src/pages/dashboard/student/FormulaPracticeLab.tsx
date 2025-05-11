
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ArrowLeft, Calculator, Info, Lightbulb, Check, BookOpen, 
  Brain, Clock, Download, AlertTriangle, ChevronRight, RefreshCw
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Mock data for formulas
const formulas = [
  {
    id: "ohms-law",
    title: "Ohm's Law",
    subject: "Physics",
    description: "The relationship between voltage, current, and resistance in an electrical circuit.",
    realLifeApplication: "Used in designing electrical circuits for all electronic devices.",
    tags: ["Electricity", "Circuits", "Class 11", "JEE", "NEET"],
    latexFormula: "V = I × R",
    variables: [
      { symbol: "V", name: "Voltage", unit: "Volts (V)", description: "The potential difference between two points" },
      { symbol: "I", name: "Current", unit: "Amperes (A)", description: "The flow of electric charge through a conductor" },
      { symbol: "R", name: "Resistance", unit: "Ohms (Ω)", description: "The opposition to the flow of electric current" }
    ],
    derivation: "Ohm observed that the current through a conductor is directly proportional to the voltage across it, given the temperature remains constant. This relationship is written as V = I × R.",
    commonMistakes: [
      "Forgetting to convert units (e.g., using kilohms instead of ohms)",
      "Applying the formula to non-ohmic conductors",
      "Confusing current with voltage in calculations"
    ],
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLW0gavSzhMlReKGMVfUt6YuNQsO0bqSMV"
  },
  {
    id: "newtons-second",
    title: "Newton's Second Law",
    subject: "Physics",
    description: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
    realLifeApplication: "Used to calculate how much force is needed to accelerate a car or stop a moving object.",
    tags: ["Mechanics", "Force", "Class 11", "JEE", "NEET"],
    latexFormula: "F = m × a",
    variables: [
      { symbol: "F", name: "Force", unit: "Newtons (N)", description: "Net force applied to the object" },
      { symbol: "m", name: "Mass", unit: "Kilograms (kg)", description: "Mass of the object" },
      { symbol: "a", name: "Acceleration", unit: "Meters per second squared (m/s²)", description: "Rate of change of velocity" }
    ],
    derivation: "Starting with Newton's observation that objects accelerate when forces are applied, he determined that the acceleration is proportional to the force and inversely proportional to the mass. This led to the mathematical expression F = m × a.",
    commonMistakes: [
      "Forgetting that both force and acceleration are vector quantities",
      "Not accounting for all forces in a system when calculating the net force",
      "Mixing up mass and weight in calculations"
    ],
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLW0gavSzhMlReKGMVfUt6YuNQsO0bqSMV"
  }
];

// Generate different difficulty problems based on a formula
const generateProblem = (formulaId: string, difficulty: 'easy' | 'medium' | 'hard') => {
  // In a real app, this would call an API to generate personalized problems
  const formula = formulas.find(f => f.id === formulaId) || formulas[0];
  
  if (formula.id === "ohms-law") {
    switch(difficulty) {
      case 'easy':
        return {
          question: "A circuit has a resistance of 5 Ω and a current of 2 A flowing through it. What is the voltage?",
          knowns: { resistance: "5", current: "2" },
          steps: [
            {
              instruction: "Identify the formula to use",
              answer: "V = I × R",
              hint1: "Ohm's Law relates voltage, current, and resistance",
              hint2: "The formula is V = I × R",
              hint3: "V (voltage) equals I (current) multiplied by R (resistance)"
            },
            {
              instruction: "Substitute the values into the formula",
              answer: "V = 2 A × 5 Ω",
              hint1: "Replace I with 2 A and R with 5 Ω in the formula V = I × R",
              hint2: "Substitute the values: V = 2 A × 5 Ω",
              hint3: "Make sure your units are consistent: amperes (A) and ohms (Ω)"
            },
            {
              instruction: "Calculate the result",
              answer: "10",
              unit: "V",
              hint1: "Multiply 2 A by 5 Ω",
              hint2: "2 × 5 = 10",
              hint3: "The final answer is 10 volts (V)"
            }
          ]
        };
      case 'medium':
        return {
          question: "A 120 V power source is connected to a circuit with three resistors in series: 10 Ω, 15 Ω, and 25 Ω. What is the current in the circuit?",
          knowns: { voltage: "120", resistors: ["10", "15", "25"] },
          steps: [
            {
              instruction: "Calculate the total resistance of the circuit",
              answer: "50",
              unit: "Ω",
              hint1: "For resistors in series, add the individual resistances",
              hint2: "Total resistance = R₁ + R₂ + R₃",
              hint3: "Total resistance = 10 Ω + 15 Ω + 25 Ω = 50 Ω"
            },
            {
              instruction: "Apply Ohm's Law to find the current",
              answer: "V = I × R",
              hint1: "Rearrange the formula V = I × R to solve for I",
              hint2: "I = V ÷ R",
              hint3: "Substitute the values: I = 120 V ÷ 50 Ω"
            },
            {
              instruction: "Calculate the final answer",
              answer: "2.4",
              unit: "A",
              hint1: "Divide 120 V by 50 Ω",
              hint2: "120 ÷ 50 = 2.4",
              hint3: "The current flowing through the circuit is 2.4 amperes (A)"
            }
          ]
        };
      case 'hard':
        return {
          question: "In a parallel circuit with three branches, the resistances are 4 Ω, 6 Ω, and 12 Ω. If the voltage across each branch is 24 V, calculate the total current drawn from the source.",
          knowns: { voltage: "24", resistors: ["4", "6", "12"] },
          steps: [
            {
              instruction: "Calculate the current in each branch using Ohm's Law",
              subSteps: [
                {
                  instruction: "Current through the first resistor (4 Ω)",
                  answer: "6",
                  unit: "A",
                  hint1: "Use I = V ÷ R for each branch",
                  hint2: "I₁ = 24 V ÷ 4 Ω",
                  hint3: "I₁ = 6 A"
                },
                {
                  instruction: "Current through the second resistor (6 Ω)",
                  answer: "4",
                  unit: "A",
                  hint1: "Use I = V ÷ R for each branch",
                  hint2: "I₂ = 24 V ÷ 6 Ω",
                  hint3: "I₂ = 4 A"
                },
                {
                  instruction: "Current through the third resistor (12 Ω)",
                  answer: "2",
                  unit: "A",
                  hint1: "Use I = V ÷ R for each branch",
                  hint2: "I₃ = 24 V ÷ 12 Ω",
                  hint3: "I₃ = 2 A"
                }
              ]
            },
            {
              instruction: "Calculate the total current (sum of all branch currents)",
              answer: "12",
              unit: "A",
              hint1: "For a parallel circuit, the total current equals the sum of the branch currents",
              hint2: "Total current = I₁ + I₂ + I₃",
              hint3: "Total current = 6 A + 4 A + 2 A = 12 A"
            }
          ]
        };
    }
  } else if (formula.id === "newtons-second") {
    switch(difficulty) {
      case 'easy':
        return {
          question: "A force of 10 N acts on a mass of 2 kg. What is the acceleration?",
          knowns: { force: "10", mass: "2" },
          steps: [
            {
              instruction: "Identify the formula to use",
              answer: "F = m × a",
              hint1: "Newton's Second Law relates force, mass, and acceleration",
              hint2: "The formula is F = m × a",
              hint3: "F (force) equals m (mass) multiplied by a (acceleration)"
            },
            {
              instruction: "Rearrange the formula to solve for acceleration",
              answer: "a = F ÷ m",
              hint1: "Solve for acceleration by dividing both sides by mass",
              hint2: "a = F ÷ m",
              hint3: "This gives us acceleration in terms of force and mass"
            },
            {
              instruction: "Calculate the result",
              answer: "5",
              unit: "m/s²",
              hint1: "Substitute the values: a = 10 N ÷ 2 kg",
              hint2: "10 ÷ 2 = 5",
              hint3: "The acceleration is 5 m/s²"
            }
          ]
        };
      default:
        return {
          question: "A default problem for this formula",
          knowns: {},
          steps: [
            {
              instruction: "This is a placeholder problem",
              answer: "Example answer",
              hint1: "First hint",
              hint2: "Second hint",
              hint3: "Third hint"
            }
          ]
        };
    }
  }
  
  // Default problem
  return {
    question: "A default problem for this formula",
    knowns: {},
    steps: [
      {
        instruction: "This is a placeholder problem",
        answer: "Example answer",
        hint1: "First hint",
        hint2: "Second hint",
        hint3: "Third hint"
      }
    ]
  };
};

// Mathematical symbols for the virtual keyboard
const mathSymbols = [
  { symbol: '+', label: 'Plus' },
  { symbol: '-', label: 'Minus' },
  { symbol: '×', label: 'Multiply' },
  { symbol: '÷', label: 'Divide' },
  { symbol: '=', label: 'Equals' },
  { symbol: '^', label: 'Power' },
  { symbol: '√', label: 'Square Root' },
  { symbol: 'π', label: 'Pi' },
  { symbol: '.', label: 'Decimal' }
];

const FormulaPracticeLab: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const formulaId = queryParams.get('formula') || "ohms-law";
  const mode = queryParams.get('mode') || "practice";
  
  // Find the current formula
  const [currentFormulaId, setCurrentFormulaId] = useState<string>(formulaId);
  const currentFormula = formulas.find(f => f.id === currentFormulaId) || formulas[0];
  
  // State for interactive practice
  const [activeTab, setActiveTab] = useState<string>(mode === "learn" ? "info" : "practice");
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [currentProblem, setCurrentProblem] = useState<any>(generateProblem(currentFormulaId, 'easy'));
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintLevel, setHintLevel] = useState<number>(1);
  const [attempts, setAttempts] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [mastery, setMastery] = useState<number>(0);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Start/stop timer
  useEffect(() => {
    let interval: number | undefined;
    
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);
  
  // Generate a new problem
  const handleGenerateProblem = () => {
    const newProblem = generateProblem(currentFormulaId, difficulty);
    setCurrentProblem(newProblem);
    setCurrentStepIndex(0);
    setUserAnswers({});
    setShowHint(false);
    setHintLevel(1);
    setAttempts(0);
    setTimer(0);
    setIsCorrect(null);
    
    toast({
      title: "New Problem Generated",
      description: `Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`,
      duration: 3000,
    });
  };
  
  // Check the current step answer
  const checkAnswer = () => {
    const currentStep = currentProblem.steps[currentStepIndex];
    const userAnswer = userAnswers[currentStepIndex] || '';
    
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
    
    setAttempts(prev => prev + 1);
    
    if (userAnswer.toLowerCase().trim() === currentStep.answer.toLowerCase().trim()) {
      setIsCorrect(true);
      
      // Move to next step after a delay or complete the problem
      setTimeout(() => {
        if (currentStepIndex < currentProblem.steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
          setShowHint(false);
          setHintLevel(1);
          setIsCorrect(null);
        } else {
          // Problem completed
          setIsTimerRunning(false);
          setMastery(prev => Math.min(prev + 10, 100));
          toast({
            title: "Problem Completed!",
            description: `Great job! Your mastery is increasing.`,
            duration: 3000,
          });
        }
      }, 1500);
    } else {
      setIsCorrect(false);
      
      // Show hint automatically after 3 incorrect attempts
      if (attempts % 3 === 2) {
        setShowHint(true);
        if (hintLevel < 3) {
          setHintLevel(prev => prev + 1);
        }
      }
    }
  };
  
  const handleHintClick = () => {
    setShowHint(true);
    if (hintLevel < 3) {
      setHintLevel(prev => prev + 1);
    }
    
    // Small mastery penalty for using hints
    if (mastery > 0) {
      setMastery(prev => Math.max(prev - 2, 0));
    }
  };
  
  const getCurrentHint = () => {
    const currentStep = currentProblem.steps[currentStepIndex];
    if (!showHint) return null;
    
    switch (hintLevel) {
      case 1:
        return currentStep.hint1;
      case 2:
        return currentStep.hint2;
      case 3:
        return currentStep.hint3;
      default:
        return currentStep.hint1;
    }
  };
  
  const handleInputChange = (value: string) => {
    setUserAnswers({
      ...userAnswers,
      [currentStepIndex]: value
    });
  };
  
  const handleSymbolClick = (symbol: string) => {
    const currentValue = userAnswers[currentStepIndex] || '';
    handleInputChange(currentValue + symbol);
  };
  
  const handleShowAnswer = () => {
    const currentStep = currentProblem.steps[currentStepIndex];
    handleInputChange(currentStep.answer);
    
    // Big mastery penalty for showing answers
    if (mastery > 0) {
      setMastery(prev => Math.max(prev - 10, 0));
    }
    
    toast({
      title: "Answer Revealed",
      description: "Try to solve it yourself next time for better learning.",
      duration: 3000,
    });
  };
  
  const handleBackClick = () => {
    navigate('/dashboard/student/concepts', { state: { activeTab: 'formulas' } });
  };
  
  const currentStepProgress = ((currentStepIndex + 1) / currentProblem.steps.length) * 100;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="mr-4"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Concepts
          </Button>
          <h1 className="text-2xl font-bold">Formula Practice Lab</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
            {currentFormula.subject}
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="info">Formula Info</TabsTrigger>
          <TabsTrigger value="practice">Interactive Practice</TabsTrigger>
          <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracker</TabsTrigger>
        </TabsList>
        
        {/* Formula Info Tab */}
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{currentFormula.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {currentFormula.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <p className="text-gray-700">{currentFormula.description}</p>
              
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-md flex items-start">
                <Info className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-amber-800">Real-life Application</h3>
                  <p className="text-amber-700">{currentFormula.realLifeApplication}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-md text-center my-6">
                <h3 className="text-lg font-medium mb-4">Formula</h3>
                <p className="text-3xl font-serif">{currentFormula.latexFormula}</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Variable Definitions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentFormula.variables.map((variable, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="p-3 bg-gray-50 border rounded-md">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-lg">{variable.symbol}</span>
                              <span className="text-sm text-gray-600">{variable.name}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{variable.unit}</div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="w-64 p-3">
                          <p>{variable.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="derivation">
                  <AccordionTrigger>Formula Derivation</AccordionTrigger>
                  <AccordionContent className="p-4 bg-gray-50 rounded-md">
                    <p>{currentFormula.derivation}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Video Explanation</h3>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={currentFormula.videoUrl} 
                    title={`${currentFormula.title} Explanation`} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Interactive Practice Tab */}
        <TabsContent value="practice" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Interactive Problem</CardTitle>
                <div className="flex items-center gap-2">
                  <RadioGroup 
                    defaultValue={difficulty} 
                    onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')}
                    className="flex space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="easy" id="easy" />
                      <Label htmlFor="easy">Easy</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="hard" id="hard" />
                      <Label htmlFor="hard">Hard</Label>
                    </div>
                  </RadioGroup>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleGenerateProblem}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    New Problem
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-medium">Step {currentStepIndex + 1} of {currentProblem.steps.length}</h3>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <Progress value={currentStepProgress} className="h-2" />
                </div>
                
                <div className="p-4 bg-blue-50 rounded-md mb-6">
                  <p className="font-medium">{currentProblem.question}</p>
                </div>
                
                <div className="mb-6">
                  {Object.entries(currentProblem.knowns).map(([key, value]: [string, any]) => {
                    if (Array.isArray(value)) {
                      return (
                        <div key={key} className="mb-2">
                          <div className="text-sm font-medium mb-1">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {value.map((item: string, i: number) => (
                              <div key={i} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                                {key.includes('resistor') ? `R${i+1} = ${item} Ω` : item}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={key} className="mb-2">
                          <div className="text-sm font-medium mb-1">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </div>
                          <div className="px-2 py-1 bg-gray-100 rounded-md inline-block text-sm">
                            {key === 'resistance' ? `${value} Ω` : 
                             key === 'current' ? `${value} A` :
                             key === 'voltage' ? `${value} V` :
                             key === 'force' ? `${value} N` :
                             key === 'mass' ? `${value} kg` :
                             value}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">
                    {currentProblem.steps[currentStepIndex].instruction}:
                  </h4>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={userAnswers[currentStepIndex] || ''}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Enter your answer here"
                      aria-label="Answer input"
                    />
                    {currentProblem.steps[currentStepIndex].unit && (
                      <div className="ml-2 px-3 py-2 bg-gray-100 border rounded-md">
                        {currentProblem.steps[currentStepIndex].unit}
                      </div>
                    )}
                  </div>
                </div>
                
                {showVirtualKeyboard && (
                  <div className="mb-6 p-3 border rounded-md bg-gray-50">
                    <h4 className="font-medium mb-2">Mathematical Symbols</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 10 }, (_, i) => i).map((num) => (
                        <Button
                          key={num}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSymbolClick(num.toString())}
                          className="w-10 h-10"
                        >
                          {num}
                        </Button>
                      ))}
                      {mathSymbols.map((symbol) => (
                        <TooltipProvider key={symbol.symbol}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSymbolClick(symbol.symbol)}
                                className="w-10 h-10"
                              >
                                {symbol.symbol}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>{symbol.label}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentValue = userAnswers[currentStepIndex] || '';
                          handleInputChange(currentValue.slice(0, -1));
                        }}
                        className="w-10 h-10"
                      >
                        ←
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="keyboard-toggle"
                      checked={showVirtualKeyboard}
                      onCheckedChange={setShowVirtualKeyboard}
                    />
                    <Label htmlFor="keyboard-toggle">Show Virtual Keyboard</Label>
                  </div>
                  <div>
                    Attempts: <span className="font-medium">{attempts}</span>
                  </div>
                </div>
                
                {isCorrect !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 mb-4 rounded-md ${
                      isCorrect
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5" />
                      )}
                      <span>
                        {isCorrect ? 'Correct! Well done.' : 'Not quite right. Try again or use a hint.'}
                      </span>
                    </div>
                  </motion.div>
                )}
                
                <div className="flex items-center justify-between gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handleHintClick}
                    disabled={hintLevel >= 3 && showHint}
                    className="flex-1"
                  >
                    {!showHint ? "Show Hint" : `Next Hint (${hintLevel}/3)`}
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={handleShowAnswer}
                  >
                    Show Answer
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={checkAnswer}
                  >
                    Check Answer
                  </Button>
                </div>
                
                {showHint && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-md"
                  >
                    <div className="flex gap-2">
                      <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0" />
                      <p>{getCurrentHint()}</p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mastery Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Formula Mastery</span>
                    <span>{mastery}%</span>
                  </div>
                  <Progress value={mastery} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-sm text-gray-500">Attempts</p>
                    <p className="text-lg font-medium">{attempts}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-sm text-gray-500">Time Spent</p>
                    <p className="text-lg font-medium">{Math.floor(timer / 60)}m {timer % 60}s</p>
                  </div>
                </div>
                
                {mastery >= 90 && (
                  <div className="bg-green-50 p-3 rounded-md border border-green-100">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <p className="font-medium text-green-700">Formula Mastered!</p>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      You've demonstrated excellent understanding of this formula.
                    </p>
                  </div>
                )}
                
                {mastery >= 50 && mastery < 90 && (
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                    <p className="text-blue-700">
                      <span className="font-medium">Good progress!</span> Keep practicing to master this formula completely.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Mistakes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentFormula.commonMistakes.map((mistake, idx) => (
                    <div key={idx} className="bg-gray-50 p-2 rounded-md flex gap-2 items-start">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{mistake}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Smart Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    <p className="font-medium text-blue-700">Learning Strategy</p>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Always identify the variables first and make sure your units are consistent before applying the formula.
                  </p>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Download Study Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Visualizer Tab */}
        <TabsContent value="visualizer">
          <Card>
            <CardHeader>
              <CardTitle>Formula Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border">
                <div className="text-center p-6">
                  <Calculator className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Interactive Visualization</h3>
                  <p className="text-gray-500">
                    This area would display an interactive visualization for {currentFormula.title}, 
                    allowing you to change variables and see how it affects the outcome.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Variable Controls</h3>
                  <div className="space-y-3">
                    {currentFormula.variables.map((variable, idx) => (
                      <div key={idx} className="grid grid-cols-3 gap-2 items-center">
                        <label className="col-span-1 text-sm font-medium">{variable.symbol}:</label>
                        <input 
                          type="range" 
                          className="col-span-2" 
                          min="0"
                          max="100"
                          defaultValue="50"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Real-world Application</h3>
                  <p className="text-sm text-gray-600 mb-3">{currentFormula.realLifeApplication}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Show Animation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Progress Tracker Tab */}
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <h3 className="font-medium text-gray-700 mb-2">Mastery Level</h3>
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-20 h-20">
                      <circle
                        className="text-gray-200"
                        strokeWidth="5"
                        stroke="currentColor"
                        fill="transparent"
                        r="30"
                        cx="40"
                        cy="40"
                      />
                      <circle
                        className="text-blue-600"
                        strokeWidth="5"
                        strokeDasharray={30 * 2 * Math.PI}
                        strokeDashoffset={30 * 2 * Math.PI * (1 - mastery / 100)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="30"
                        cx="40"
                        cy="40"
                      />
                    </svg>
                    <span className="absolute text-xl font-bold">{mastery}%</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <h3 className="font-medium text-gray-700 mb-2">Practice Stats</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Problems Solved</p>
                      <p className="text-xl font-medium">3</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Avg Time</p>
                      <p className="text-xl font-medium">2m 15s</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <h3 className="font-medium text-gray-700 mb-2">Achievements</h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Medal className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Learning Path</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-md border-l-4 border-blue-500">
                    <div className="flex justify-between">
                      <span className="font-medium">Current: {currentFormula.title}</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">In Progress</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">Related: Conservation of Energy</span>
                      <Badge variant="outline">Recommended</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">Next: Impulse-Momentum Theorem</span>
                      <Badge variant="outline">Up Next</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-3">Your Notes</h3>
                  <textarea 
                    className="w-full h-32 p-3 border rounded-md resize-none" 
                    placeholder="Write your notes about this formula here..."
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <Button size="sm">Save Notes</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormulaPracticeLab;

// Add missing imports
import { Eye, Star, Trophy, Medal } from "lucide-react";
