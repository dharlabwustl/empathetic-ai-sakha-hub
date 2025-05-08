
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Calculator, BookOpen, Lightbulb, CheckCircle, RefreshCw, ChevronRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types for formula practice
interface Formula {
  id: string;
  name: string;
  formula: string;
  subject: string;
  description: string;
  variables: Variable[];
  examples: Example[];
}

interface Variable {
  name: string;
  symbol: string;
  unit: string;
  description: string;
}

interface Example {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  problem: string;
  steps: Step[];
  answer: string;
  variables: Record<string, string | number>;
}

interface Step {
  instruction: string;
  calculation?: string;
  result?: string | number;
  variable?: string;
  isInput?: boolean;
}

interface UserAnswer {
  stepId: number;
  value: string;
  isCorrect: boolean | null;
}

// Sample formula data
const sampleFormulas: Formula[] = [
  {
    id: "f1",
    name: "Ohm's Law",
    formula: "V = I × R",
    subject: "Physics",
    description: "Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage and inversely proportional to the resistance.",
    variables: [
      { name: "voltage", symbol: "V", unit: "volts", description: "Potential difference across conductor" },
      { name: "current", symbol: "I", unit: "amperes", description: "Electric current flowing through conductor" },
      { name: "resistance", symbol: "R", unit: "ohms", description: "Resistance of the conductor" }
    ],
    examples: [
      {
        id: "e1",
        difficulty: "easy",
        problem: "If a circuit has a resistance of 5Ω and a current of 2A flows through it, what is the voltage?",
        steps: [
          { instruction: "Write down Ohm's Law formula", calculation: "V = I × R" },
          { instruction: "Substitute known values", calculation: "V = 2A × 5Ω", isInput: true },
          { instruction: "Calculate the voltage", calculation: "V = 10V", isInput: true, result: 10 }
        ],
        answer: "10V",
        variables: { "R": 5, "I": 2 }
      },
      {
        id: "e2",
        difficulty: "medium",
        problem: "A circuit operates with a voltage of 24V and has a resistance of 8Ω. What is the current flowing through it?",
        steps: [
          { instruction: "Write down Ohm's Law formula", calculation: "V = I × R" },
          { instruction: "Rearrange the formula to find I", calculation: "I = V / R", isInput: true },
          { instruction: "Substitute known values", calculation: "I = 24V / 8Ω", isInput: true },
          { instruction: "Calculate the current", calculation: "I = 3A", isInput: true, result: 3 }
        ],
        answer: "3A",
        variables: { "V": 24, "R": 8 }
      },
      {
        id: "e3",
        difficulty: "hard",
        problem: "An electric heater draws 15A when connected to a 120V source. What is its resistance? If the voltage drops to 110V, what will be the new current?",
        steps: [
          { instruction: "Write down Ohm's Law formula", calculation: "V = I × R" },
          { instruction: "Rearrange the formula to find R", calculation: "R = V / I", isInput: true },
          { instruction: "Substitute known values for the first part", calculation: "R = 120V / 15A", isInput: true },
          { instruction: "Calculate the resistance", calculation: "R = 8Ω", isInput: true, result: 8 },
          { instruction: "For the second part, use Ohm's Law with the new voltage", calculation: "I = V / R", isInput: true },
          { instruction: "Substitute known values", calculation: "I = 110V / 8Ω", isInput: true },
          { instruction: "Calculate the new current", calculation: "I = 13.75A", isInput: true, result: 13.75 }
        ],
        answer: "8Ω, 13.75A",
        variables: { "V1": 120, "I1": 15, "V2": 110 }
      }
    ]
  },
  {
    id: "f2",
    name: "Newton's Second Law",
    formula: "F = m × a",
    subject: "Physics",
    description: "Newton's Second Law states that the acceleration of an object is dependent upon two variables - the net force acting upon the object and the mass of the object.",
    variables: [
      { name: "force", symbol: "F", unit: "newtons", description: "Net force applied" },
      { name: "mass", symbol: "m", unit: "kilograms", description: "Mass of the object" },
      { name: "acceleration", symbol: "a", unit: "m/s²", description: "Acceleration produced" }
    ],
    examples: [
      {
        id: "e1",
        difficulty: "easy",
        problem: "A force of 10N is applied to a 2kg object. What is its acceleration?",
        steps: [
          { instruction: "Write down Newton's Second Law formula", calculation: "F = m × a" },
          { instruction: "Rearrange the formula to find a", calculation: "a = F / m", isInput: true },
          { instruction: "Substitute known values", calculation: "a = 10N / 2kg", isInput: true },
          { instruction: "Calculate the acceleration", calculation: "a = 5m/s²", isInput: true, result: 5 }
        ],
        answer: "5m/s²",
        variables: { "F": 10, "m": 2 }
      },
      {
        id: "e2",
        difficulty: "medium",
        problem: "A 1500kg car accelerates at 2m/s². What force is required?",
        steps: [
          { instruction: "Write down Newton's Second Law formula", calculation: "F = m × a" },
          { instruction: "Substitute known values", calculation: "F = 1500kg × 2m/s²", isInput: true },
          { instruction: "Calculate the force", calculation: "F = 3000N", isInput: true, result: 3000 }
        ],
        answer: "3000N",
        variables: { "m": 1500, "a": 2 }
      }
    ]
  },
  {
    id: "f3",
    name: "Gravitational Potential Energy",
    formula: "PE = m × g × h",
    subject: "Physics",
    description: "The gravitational potential energy is the energy stored in an object due to its height above the Earth's surface.",
    variables: [
      { name: "potential energy", symbol: "PE", unit: "joules", description: "Energy stored in the object" },
      { name: "mass", symbol: "m", unit: "kilograms", description: "Mass of the object" },
      { name: "gravitational acceleration", symbol: "g", unit: "m/s²", description: "Gravitational acceleration (9.8 m/s² on Earth)" },
      { name: "height", symbol: "h", unit: "meters", description: "Height above reference point" }
    ],
    examples: [
      {
        id: "e1",
        difficulty: "easy",
        problem: "A 5kg object is lifted to a height of 10m. What is its gravitational potential energy? (Take g = 9.8m/s²)",
        steps: [
          { instruction: "Write down the gravitational potential energy formula", calculation: "PE = m × g × h" },
          { instruction: "Substitute known values", calculation: "PE = 5kg × 9.8m/s² × 10m", isInput: true },
          { instruction: "Calculate the potential energy", calculation: "PE = 490J", isInput: true, result: 490 }
        ],
        answer: "490J",
        variables: { "m": 5, "g": 9.8, "h": 10 }
      }
    ]
  }
];

const FormulaPracticeLab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("practice");
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>("");
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [currentExample, setCurrentExample] = useState<Example | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Parse query params for formula ID and mode
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const formulaId = params.get('formula');
    const mode = params.get('mode');
    
    if (formulaId) {
      setSelectedFormulaId(formulaId);
      const formula = sampleFormulas.find(f => f.id === formulaId);
      if (formula) {
        setSelectedFormula(formula);
        
        // If mode is 'learn', switch to learn tab
        if (mode === 'learn') {
          setActiveTab('learn');
        } else {
          setActiveTab('practice');
          // Set first example by difficulty
          selectRandomExample(formula, selectedDifficulty);
        }
      }
    }
  }, [location.search]);

  // Handle formula selection
  const handleFormulaSelect = (formulaId: string) => {
    setSelectedFormulaId(formulaId);
    const formula = sampleFormulas.find(f => f.id === formulaId);
    if (formula) {
      setSelectedFormula(formula);
      setUserAnswers([]);
      setCurrentStepIndex(0);
      setShowAnswer(false);
      setShowHint(false);
      setPracticeCompleted(false);
      selectRandomExample(formula, selectedDifficulty);
    }
  };

  // Select a random example based on difficulty
  const selectRandomExample = (formula: Formula, difficulty: 'easy' | 'medium' | 'hard') => {
    const filteredExamples = formula.examples.filter(ex => ex.difficulty === difficulty);
    
    if (filteredExamples.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredExamples.length);
      setCurrentExample(filteredExamples[randomIndex]);
      setUserAnswers([]);
      setCurrentStepIndex(0);
      setShowAnswer(false);
      setShowHint(false);
      setPracticeCompleted(false);
      setProgress(0);
    } else {
      // If no examples of the selected difficulty, show the first example
      const example = formula.examples[0];
      if (example) {
        setCurrentExample(example);
        setUserAnswers([]);
        setCurrentStepIndex(0);
        setShowAnswer(false);
        setShowHint(false);
        setPracticeCompleted(false);
        setProgress(0);
      } else {
        setCurrentExample(null);
        toast({
          title: "No examples available",
          description: "No practice examples are available for this formula.",
          variant: "destructive"
        });
      }
    }
  };

  // Handle difficulty change
  const handleDifficultyChange = (difficulty: 'easy' | 'medium' | 'hard') => {
    setSelectedDifficulty(difficulty);
    if (selectedFormula) {
      selectRandomExample(selectedFormula, difficulty);
    }
  };

  // Generate new problem based on current difficulty
  const handleGenerateNewProblem = () => {
    if (selectedFormula) {
      selectRandomExample(selectedFormula, selectedDifficulty);
    }
  };

  // Handle user answer submission
  const handleAnswerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!currentExample || currentStepIndex >= currentExample.steps.length || !inputRef.current) {
      return;
    }
    
    const step = currentExample.steps[currentStepIndex];
    const userAnswer = inputRef.current.value.trim();
    
    if (!userAnswer) {
      toast({
        title: "Input required",
        description: "Please enter your answer before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if the step has a numerical result to compare against
    let isCorrect = false;
    if (step.result !== undefined) {
      // For numerical answers, parse and compare with tolerance
      const userNumericAnswer = parseFloat(userAnswer.replace(/[^\d.-]/g, ''));
      const expectedNumericAnswer = typeof step.result === 'string' 
        ? parseFloat(step.result.replace(/[^\d.-]/g, ''))
        : step.result;
        
      // 2% tolerance for numerical answers
      const tolerance = expectedNumericAnswer * 0.02;
      isCorrect = Math.abs(userNumericAnswer - expectedNumericAnswer) <= tolerance;
    } else if (step.calculation) {
      // For textual answers, compare cleaned strings
      const cleanUserAnswer = userAnswer.replace(/\s+/g, '').toLowerCase();
      const cleanExpectedAnswer = step.calculation.replace(/\s+/g, '').toLowerCase();
      isCorrect = cleanUserAnswer === cleanExpectedAnswer;
    }
    
    // Update user answers
    setUserAnswers(prev => [
      ...prev,
      { stepId: currentStepIndex, value: userAnswer, isCorrect }
    ]);
    
    // Show feedback
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Great job! That's the right answer.",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Try again or check the hint for guidance.",
        variant: "destructive"
      });
    }
    
    // Move to next step or complete
    if (isCorrect) {
      // Calculate progress
      const newProgress = ((currentStepIndex + 1) / currentExample.steps.length) * 100;
      setProgress(newProgress);
      
      if (currentStepIndex < currentExample.steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
        
        // Clear input for next step
        inputRef.current.value = "";
        setShowHint(false);
      } else {
        // Practice completed
        setPracticeCompleted(true);
        toast({
          title: "Practice completed!",
          description: "You've successfully worked through all steps.",
        });
      }
    }
  };

  // Navigate back to concepts landing page with formulas tab open
  const handleBackToFormulas = () => {
    navigate('/dashboard/student/concepts', { state: { activeTab: 'formulas' } });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2" 
            onClick={handleBackToFormulas}
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold">Formula Practice Lab</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left sidebar with formula selection */}
        <Card className="md:col-span-3">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-4">Select Formula</h2>
            <div className="space-y-2">
              {sampleFormulas.map((formula) => (
                <Button
                  key={formula.id}
                  variant={selectedFormulaId === formula.id ? "default" : "outline"}
                  className={`w-full justify-start ${selectedFormulaId === formula.id ? "" : "text-gray-700"}`}
                  onClick={() => handleFormulaSelect(formula.id)}
                >
                  <span className="truncate">{formula.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Main content area */}
        <div className="md:col-span-9">
          {selectedFormula ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{selectedFormula.name}</h2>
                    <p className="text-sm text-gray-500">{selectedFormula.subject}</p>
                  </div>
                  <Badge variant="outline" className="mt-2 md:mt-0">
                    {selectedFormula.formula}
                  </Badge>
                </div>
                
                <p className="text-gray-700 mb-6">{selectedFormula.description}</p>
                
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                    <TabsTrigger value="learn">Learn</TabsTrigger>
                    <TabsTrigger value="variables">Variables</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="practice">
                    {/* Practice tab content */}
                    {currentExample ? (
                      <div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                          <div className="mb-4 md:mb-0">
                            <Label>Difficulty Level</Label>
                            <div className="flex mt-1 space-x-2">
                              <Button 
                                variant={selectedDifficulty === "easy" ? "default" : "outline"}
                                size="sm" 
                                className={selectedDifficulty === "easy" ? "bg-green-600" : ""}
                                onClick={() => handleDifficultyChange("easy")}
                              >
                                Easy
                              </Button>
                              <Button 
                                variant={selectedDifficulty === "medium" ? "default" : "outline"}
                                size="sm" 
                                className={selectedDifficulty === "medium" ? "bg-amber-600" : ""}
                                onClick={() => handleDifficultyChange("medium")}
                              >
                                Medium
                              </Button>
                              <Button 
                                variant={selectedDifficulty === "hard" ? "default" : "outline"}
                                size="sm" 
                                className={selectedDifficulty === "hard" ? "bg-red-600" : ""}
                                onClick={() => handleDifficultyChange("hard")}
                              >
                                Hard
                              </Button>
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            onClick={handleGenerateNewProblem}
                            className="flex items-center"
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Generate New Problem
                          </Button>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md border mb-6">
                          <Label className="font-medium text-gray-700">Problem:</Label>
                          <p className="mt-2">{currentExample.problem}</p>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <Label className="font-medium">Progress:</Label>
                            <span className="text-sm text-gray-500">
                              Step {currentStepIndex + 1} of {currentExample.steps.length}
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        {/* Current step */}
                        <AnimatePresence mode="wait">
                          {!practiceCompleted ? (
                            <motion.div
                              key={`step-${currentStepIndex}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="bg-white border rounded-md p-4 mb-4"
                            >
                              <Label className="font-medium">Step {currentStepIndex + 1}:</Label>
                              <p className="mb-4">{currentExample.steps[currentStepIndex].instruction}</p>
                              
                              <form onSubmit={handleAnswerSubmit}>
                                <div className="flex flex-col md:flex-row gap-4">
                                  <div className="flex-1">
                                    <Label htmlFor="answer">Your Answer:</Label>
                                    <div className="flex mt-1">
                                      <Input 
                                        id="answer" 
                                        ref={inputRef}
                                        className="flex-1"
                                        placeholder="Enter your answer" 
                                      />
                                      <Button type="submit" className="ml-2">
                                        Check
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                              
                              {/* Hint button and content */}
                              <div className="mt-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-amber-600"
                                  onClick={() => setShowHint(!showHint)}
                                >
                                  <Lightbulb className="h-4 w-4 mr-1" />
                                  {showHint ? "Hide Hint" : "Show Hint"}
                                </Button>
                                
                                {showHint && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="bg-amber-50 p-3 rounded-md mt-2 text-amber-800 border border-amber-200"
                                  >
                                    {currentExample.steps[currentStepIndex].isInput ? (
                                      <p>Try substituting the values in the formula.</p>
                                    ) : (
                                      <p>Remember the basic formula and how to apply it.</p>
                                    )}
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-green-50 border border-green-200 rounded-md p-6 text-center"
                            >
                              <div className="flex justify-center mb-4">
                                <CheckCircle className="h-12 w-12 text-green-600" />
                              </div>
                              <h3 className="text-xl font-semibold text-green-800 mb-2">
                                Practice Complete!
                              </h3>
                              <p className="mb-4 text-green-700">
                                Great job! You've successfully worked through all steps of this problem.
                              </p>
                              <div className="flex flex-col sm:flex-row justify-center gap-3">
                                <Button onClick={handleGenerateNewProblem}>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Try Another Problem
                                </Button>
                                
                                <Button 
                                  variant="outline" 
                                  onClick={() => {
                                    setShowAnswer(true);
                                  }}
                                >
                                  Review Solution
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Previous steps */}
                        {userAnswers.length > 0 && (
                          <div className="mt-6">
                            <h3 className="font-medium mb-2">Previous Steps:</h3>
                            <div className="space-y-3">
                              {userAnswers.map((answer, index) => {
                                const step = currentExample.steps[answer.stepId];
                                return (
                                  <div 
                                    key={`answer-${index}`} 
                                    className={`p-3 rounded-md border ${answer.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium">Step {answer.stepId + 1}: {step.instruction}</p>
                                        <p className="text-sm mt-1">
                                          Your answer: <span className="font-mono">{answer.value}</span>
                                        </p>
                                      </div>
                                      <div>
                                        {answer.isCorrect ? (
                                          <Badge className="bg-green-600">Correct</Badge>
                                        ) : (
                                          <Badge variant="destructive">Incorrect</Badge>
                                        )}
                                      </div>
                                    </div>
                                    
                                    {!answer.isCorrect && step.calculation && (
                                      <p className="text-sm mt-2 text-red-700">
                                        Expected: <span className="font-mono">{step.calculation}</span>
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        {/* Full Solution */}
                        {(showAnswer || practiceCompleted) && (
                          <div className="mt-6 border-t pt-4">
                            <h3 className="font-bold text-lg mb-3">Complete Solution</h3>
                            <div className="space-y-3">
                              {currentExample.steps.map((step, index) => (
                                <div key={`solution-${index}`} className="bg-gray-50 p-3 rounded-md border">
                                  <p className="font-medium">Step {index + 1}: {step.instruction}</p>
                                  {step.calculation && (
                                    <p className="font-mono mt-2">{step.calculation}</p>
                                  )}
                                </div>
                              ))}
                              <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                                <p className="font-medium text-blue-800">Final Answer: {currentExample.answer}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p>No practice examples available for this formula.</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="learn">
                    {/* Learn tab content */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Formula Explanation</h3>
                        <div className="bg-gray-50 p-4 rounded-md border mb-4 flex items-center justify-center">
                          <span className="text-2xl font-mono">{selectedFormula.formula}</span>
                        </div>
                        <p className="text-gray-700">{selectedFormula.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Applied Examples</h3>
                        <div className="space-y-4">
                          {selectedFormula.examples.map((example, index) => (
                            <Card key={`example-${index}`}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium">Example {index + 1}</h4>
                                  <Badge variant="outline">{example.difficulty}</Badge>
                                </div>
                                <p className="mb-4">{example.problem}</p>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setActiveTab("practice");
                                    setCurrentExample(example);
                                    setSelectedDifficulty(example.difficulty);
                                    setUserAnswers([]);
                                    setCurrentStepIndex(0);
                                    setShowAnswer(false);
                                    setShowHint(false);
                                    setPracticeCompleted(false);
                                    setProgress(0);
                                  }}
                                >
                                  Practice This Example <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Applications</h3>
                        <Card>
                          <CardContent className="p-4">
                            <p className="mb-4">
                              {selectedFormula.name} is widely used in {selectedFormula.subject.toLowerCase()} 
                              for solving various problems related to {selectedFormula.description.toLowerCase().includes("states") ? 
                                "physical phenomena" : "calculations"}.
                            </p>
                            <Button variant="outline" onClick={() => setActiveTab("practice")}>
                              Go to Practice <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="variables">
                    {/* Variables tab content */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg mb-2">Variables Explained</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedFormula.variables.map((variable, index) => (
                          <Card key={`var-${index}`}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{variable.name}</h4>
                                <Badge variant="outline">{variable.symbol}</Badge>
                              </div>
                              <p className="text-sm text-gray-700 mb-1">{variable.description}</p>
                              <p className="text-sm text-gray-500">Unit: {variable.unit}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Calculator className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Welcome to Formula Practice Lab</h3>
                <p className="text-gray-600 mb-6">
                  Select a formula from the sidebar to start practicing and mastering key formulas.
                </p>
                <div className="text-left">
                  <h4 className="font-medium mb-2">Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Interactive step-by-step problem solving</li>
                    <li>Detailed explanations and hints</li>
                    <li>Variable difficulty levels for progressive learning</li>
                    <li>Formula visualization and applications</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormulaPracticeLab;
