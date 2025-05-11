import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, Lightbulb, Check, BookOpen, Brain, Clock, Download, AlertTriangle, ChevronRight, Calculator, Eye, FileUp, CheckCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FormulaTabContentProps {
  conceptId?: string;
}

interface ProblemStep {
  instruction: string;
  inputs: {name: string; label: string; placeholder: string}[];
  solution: Record<string, string>;
  expectedOutput: string;
  hint1: string;
  hint2: string;
  hint3: string;
  completed?: boolean;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ conceptId }) => {
  const [step, setStep] = useState<number>(1);
  const [userInput, setUserInput] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintLevel, setHintLevel] = useState<number>(1);
  const [validationResult, setValidationResult] = useState<{valid: boolean, message: string} | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [timeTracking, setTimeTracking] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [masteryStage, setMasteryStage] = useState<'learning' | 'practicing' | 'mastered'>('learning');
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | 'all'>('all');
  const [numQuestions, setNumQuestions] = useState<number>(3);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<ProblemStep[]>([]);
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const { toast } = useToast();

  // Example formula data
  const formula = {
    title: "Newton's Second Law of Motion",
    subject: "Physics",
    description: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
    realLifeApplication: "Used to calculate how much force is needed to accelerate a car or stop a moving object",
    tags: ["Mechanics", "Force", "Class 11", "NEET"],
    latexFormula: "F = m \\times a",
    variables: [
      { symbol: "F", name: "Force", unit: "Newtons (N)", description: "Net force applied to the object" },
      { symbol: "m", name: "Mass", unit: "Kilograms (kg)", description: "Mass of the object" },
      { symbol: "a", name: "Acceleration", unit: "Meters per second squared (m/s²)", description: "Rate of change of velocity" }
    ],
    visuals: {
      type: "physics",
      description: "Force diagram showing mass and acceleration vectors"
    },
    derivation: "Starting with Newton's observation that objects accelerate when forces are applied, he determined that the acceleration is proportional to the force and inversely proportional to the mass. This led to the mathematical expression F = m × a.",
    commonMistakes: [
      "Forgetting that both force and acceleration are vector quantities",
      "Not accounting for all forces in a system when calculating the net force",
      "Mixing up mass and weight in calculations"
    ],
    linkedConcepts: [
      { id: "c1", name: "Newton's First Law" },
      { id: "c2", name: "Newton's Third Law" },
      { id: "c3", name: "Conservation of Momentum" }
    ]
  };

  // Problem-solving steps for demonstration
  const allProblemSteps: Record<string, ProblemStep[]> = {
    easy: [
      {
        instruction: "What is the force required to accelerate a 1 kg object at 2 m/s²?",
        inputs: [{name: "mass", label: "Mass (kg)", placeholder: "Enter mass"}, {name: "acceleration", label: "Acceleration (m/s²)", placeholder: "Enter acceleration"}],
        solution: {mass: "1", acceleration: "2"},
        expectedOutput: "2",
        hint1: "Use the formula F = m × a and substitute the values",
        hint2: "You need to multiply the mass (1 kg) by the acceleration (2 m/s²)",
        hint3: "Calculate: F = 1 kg × 2 m/s² = 2 N"
      }
    ],
    medium: [
      {
        instruction: "What is the net force required to accelerate a 2 kg object at 5 m/s²?",
        inputs: [{name: "mass", label: "Mass (kg)", placeholder: "Enter mass"}, {name: "acceleration", label: "Acceleration (m/s²)", placeholder: "Enter acceleration"}],
        solution: {mass: "2", acceleration: "5"},
        expectedOutput: "10",
        hint1: "Use the formula F = m × a and substitute the values",
        hint2: "You need to multiply the mass (2 kg) by the acceleration (5 m/s²)",
        hint3: "Calculate: F = 2 kg × 5 m/s² = 10 N"
      },
      {
        instruction: "Now calculate: If a force of 30 N acts on a 6 kg object, what will be its acceleration?",
        inputs: [{name: "force", label: "Force (N)", placeholder: "Enter force"}, {name: "mass", label: "Mass (kg)", placeholder: "Enter mass"}],
        solution: {force: "30", mass: "6"},
        expectedOutput: "5",
        hint1: "Rearrange F = m × a to solve for acceleration",
        hint2: "The formula becomes a = F ÷ m",
        hint3: "Calculate: a = 30 N ÷ 6 kg = 5 m/s²"
      }
    ],
    hard: [
      {
        instruction: "Final problem: A 1500 kg car accelerates from 0 to 20 m/s in 10 seconds. What is the net force acting on the car?",
        inputs: [{name: "mass", label: "Mass (kg)", placeholder: "Enter mass"}, {name: "acceleration", label: "Acceleration (m/s²)", placeholder: "Calculate and enter acceleration"}],
        solution: {mass: "1500", acceleration: "2"},
        expectedOutput: "3000",
        hint1: "First calculate acceleration: a = change in velocity ÷ time = 20 m/s ÷ 10 s = 2 m/s²",
        hint2: "Use F = m × a with the mass and calculated acceleration",
        hint3: "Calculate: F = 1500 kg × 2 m/s² = 3000 N"
      }
    ]
  };

  // Get problems based on selected difficulty
  const getProblems = () => {
    if (selectedDifficulty === 'all') {
      return [
        ...allProblemSteps.easy,
        ...allProblemSteps.medium,
        ...allProblemSteps.hard
      ].slice(0, numQuestions);
    } else {
      return allProblemSteps[selectedDifficulty].slice(0, numQuestions);
    }
  };

  // Current problem being solved
  const problemSteps = getProblems();
  const currentProblem = problemSteps[step - 1];

  // Start time tracking
  const startTracking = () => {
    if (timeTracking) return;
    
    setTimeTracking(true);
    const intervalId = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    setTimer(intervalId);
  };

  // Stop time tracking
  const stopTracking = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setTimeTracking(false);
  };

  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    setUserInput(prev => ({...prev, [field]: value}));
  };

  // Clean input value by removing extra spaces
  const cleanInputValue = (value: string) => {
    return value.trim().replace(/\s+/g, ' ');
  };

  // Check user's answer
  const checkAnswer = () => {
    startTracking();
    setAttempts(prev => prev + 1);
    
    // Check if all inputs match the solution
    const currentSolution = currentProblem.solution;
    const allMatch = Object.keys(currentSolution).every(
      key => {
        const cleanedUserInput = cleanInputValue(userInput[key] || "");
        const cleanedSolution = cleanInputValue(currentSolution[key as keyof typeof currentSolution]);
        return cleanedUserInput === cleanedSolution;
      }
    );
    
    // Calculate expected output
    let isOutputCorrect = false;
    
    if (step === 1 && selectedDifficulty === 'medium') {
      const mass = parseFloat(userInput.mass || "0");
      const acceleration = parseFloat(userInput.acceleration || "0");
      const calculatedForce = mass * acceleration;
      isOutputCorrect = Math.abs(calculatedForce - parseFloat(currentProblem.expectedOutput)) < 0.01;
    } else if (step === 2 && selectedDifficulty === 'medium') {
      const force = parseFloat(userInput.force || "0");
      const mass = parseFloat(userInput.mass || "0");
      const calculatedAcceleration = mass > 0 ? force / mass : 0;
      isOutputCorrect = Math.abs(calculatedAcceleration - parseFloat(currentProblem.expectedOutput)) < 0.01;
    } else if (step === 1 && selectedDifficulty === 'hard') {
      const mass = parseFloat(userInput.mass || "0");
      const acceleration = parseFloat(userInput.acceleration || "0");
      const calculatedForce = mass * acceleration;
      isOutputCorrect = Math.abs(calculatedForce - parseFloat(currentProblem.expectedOutput)) < 0.01;
    } else if (selectedDifficulty === 'easy') {
      const mass = parseFloat(userInput.mass || "0");
      const acceleration = parseFloat(userInput.acceleration || "0");
      const calculatedForce = mass * acceleration;
      isOutputCorrect = Math.abs(calculatedForce - parseFloat(currentProblem.expectedOutput)) < 0.01;
    } else {
      // Generic calculation for other problems
      isOutputCorrect = allMatch;
    }
    
    // Update validation result
    if (isOutputCorrect || fileUploaded) {
      // Mark current problem as completed and add to completed steps
      const completedProblem = {...currentProblem, completed: true};
      setCompletedSteps(prev => [...prev, completedProblem]);
      
      setValidationResult({
        valid: true,
        message: fileUploaded ? "File processed. Answer accepted!" : "Correct! Well done."
      });
      
      setAccuracy(prev => {
        const totalCompleted = completedSteps.length + 1;
        const percentPerQuestion = 100 / problemSteps.length;
        return (totalCompleted * percentPerQuestion);
      });
      
      // Progress to the next step after a short delay
      setTimeout(() => {
        if (step < problemSteps.length) {
          setStep(prev => prev + 1);
          setUserInput({});
          setValidationResult(null);
          setShowHint(false);
          setHintLevel(1);
          setFileUploaded(false);
          setSelectedFile(null);
        } else {
          // Completed all problems
          stopTracking();
          setMasteryStage('mastered');
        }
      }, 1500);
    } else {
      setValidationResult({
        valid: false,
        message: "Not quite right. Try again or use a hint."
      });
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // In a real implementation, this would send the file to a backend for processing
      // For now, we'll simulate processing after a short delay
      toast({
        title: "Processing file...",
        description: "Your file is being analyzed",
      });
      
      setTimeout(() => {
        setFileUploaded(true);
        toast({
          title: "File processed",
          description: "Your answer has been accepted based on the uploaded document",
          variant: "success"
        });
      }, 2000);
    }
  };

  // Show next hint level
  const showNextHint = () => {
    setShowHint(true);
    setHintLevel(prev => Math.min(prev + 1, 3));
  };

  // Get current hint based on level
  const getCurrentHint = () => {
    if (!showHint) return null;
    
    switch (hintLevel) {
      case 1:
        return currentProblem.hint1;
      case 2:
        return currentProblem.hint2;
      case 3:
        return currentProblem.hint3;
      default:
        return currentProblem.hint1;
    }
  };

  // Generate new problems
  const generateNewProblems = () => {
    // Reset state for new problems
    setStep(1);
    setUserInput({});
    setValidationResult(null);
    setShowHint(false);
    setHintLevel(1);
    setCompletedSteps([]);
    setFileUploaded(false);
    setSelectedFile(null);
    
    toast({
      title: "New problems generated",
      description: `${numQuestions} ${selectedDifficulty !== 'all' ? selectedDifficulty : 'mixed'} difficulty problems ready to solve`,
      variant: "success"
    });
  };

  // Download notes
  const downloadNotes = () => {
    toast({
      title: "Formula sheet download started",
      description: "Your PDF is being prepared"
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold">Formula Practice</h2>
        <Button variant="default" className="mt-4 md:mt-0" asChild>
          <Link to="/dashboard/student/formula-practice-lab">
            <Calculator className="mr-2 h-4 w-4" />
            Open Formula Practice Lab
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - Formula and practice section */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Formula Introduction Block */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{formula.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {formula.subject}
                    </Badge>
                    {formula.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {formula.description}
              </p>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-md p-4 flex items-start">
                <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-300">Real-life Application</p>
                  <p className="text-amber-700 dark:text-amber-400 text-sm">{formula.realLifeApplication}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Formula Display & Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Formula Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex flex-col items-center mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 w-full text-center mb-4">
                  <p className="text-3xl font-serif">{formula.latexFormula}</p>
                </div>
                
                <div className="w-full">
                  <h3 className="text-md font-medium mb-2">Variable Definitions</h3>
                  <div className="space-y-2">
                    {formula.variables.map((variable, idx) => (
                      <TooltipProvider key={idx}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                              <span className="font-medium text-lg">{variable.symbol}</span>
                              <span className="text-sm">{variable.name} ({variable.unit})</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-xs">
                            <p>{variable.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="derivation">
                  <AccordionTrigger>Formula Derivation</AccordionTrigger>
                  <AccordionContent>
                    <p className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                      {formula.derivation}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-6">
                <h3 className="text-md font-medium mb-3">Visual Representation</h3>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center border border-gray-200 dark:border-gray-700">
                  {formula.visuals.type === "physics" && (
                    <div className="text-center p-4">
                      <p className="text-gray-500 dark:text-gray-400">{formula.visuals.description}</p>
                      <p className="text-sm text-gray-400 mt-2">(Interactive visualization would appear here)</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Interactive Problem Practice Section with Improved Controls */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">Interactive Practice</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant={showAnswers ? "default" : "outline"}
                    size="sm" 
                    onClick={() => setShowAnswers(!showAnswers)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {showAnswers ? "Hide Answers" : "Show Answers"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-3">
              {/* Difficulty selector and problem generator */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-medium mb-3">Generate Practice Problems</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Difficulty Level</h4>
                    <RadioGroup 
                      defaultValue={selectedDifficulty} 
                      className="flex flex-wrap gap-2"
                      onValueChange={(value) => setSelectedDifficulty(value as 'easy' | 'medium' | 'hard' | 'all')}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="easy" id="easy" className="peer" />
                        <Label 
                          htmlFor="easy" 
                          className="peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-700 peer-data-[state=checked]:border-blue-200 p-1 rounded cursor-pointer"
                        >
                          Easy
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" className="peer" />
                        <Label 
                          htmlFor="medium" 
                          className="peer-data-[state=checked]:bg-amber-50 peer-data-[state=checked]:text-amber-700 peer-data-[state=checked]:border-amber-200 p-1 rounded cursor-pointer"
                        >
                          Medium
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hard" id="hard" className="peer" />
                        <Label 
                          htmlFor="hard" 
                          className="peer-data-[state=checked]:bg-red-50 peer-data-[state=checked]:text-red-700 peer-data-[state=checked]:border-red-200 p-1 rounded cursor-pointer"
                        >
                          Hard
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" className="peer" />
                        <Label 
                          htmlFor="all" 
                          className="peer-data-[state=checked]:bg-purple-50 peer-data-[state=checked]:text-purple-700 peer-data-[state=checked]:border-purple-200 p-1 rounded cursor-pointer"
                        >
                          Mixed
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Number of Questions</h4>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="number" 
                        min={1} 
                        max={10} 
                        value={numQuestions} 
                        onChange={(e) => setNumQuestions(parseInt(e.target.value) || 3)}
                        className="w-20"
                      />
                      <Button onClick={generateNewProblems}>Generate Problems</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-medium">Problem {step} of {problemSteps.length}</h3>
                  {timeTracking && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
                    </div>
                  )}
                </div>
                <Progress value={(step / problemSteps.length) * 100} className="h-2" />
              </div>
              
              {/* Display of completed steps */}
              {completedSteps.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3">Completed Problems</h3>
                  <div className="space-y-3">
                    {completedSteps.map((step, idx) => (
                      <div key={idx} className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{step.instruction}</p>
                            <div className="mt-2 text-sm text-green-700 dark:text-green-400">
                              {showAnswers && (
                                <p>
                                  <span className="font-medium">Solution: </span>
                                  {Object.entries(step.solution).map(([key, value]) => (
                                    <span key={key}>{key}: {value}, </span>
                                  ))}
                                  Result: {step.expectedOutput}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md mb-6">
                <p className="font-medium">{currentProblem?.instruction}</p>
                
                {showAnswers && (
                  <div className="mt-3 p-2 bg-white/50 dark:bg-black/10 rounded border border-blue-100 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      <span className="font-medium">Answer: </span>
                      {Object.entries(currentProblem?.solution || {}).map(([key, value]) => (
                        <span key={key}>{key}: {value}, </span>
                      ))}
                      Result: {currentProblem?.expectedOutput}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-4 mb-6">
                {currentProblem?.inputs.map((input, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <label htmlFor={input.name} className="text-sm font-medium">
                      {input.label}:
                    </label>
                    <input
                      id={input.name}
                      type="text"
                      placeholder={input.placeholder}
                      value={userInput[input.name] || ''}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                      className="md:col-span-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                
                {step === 1 && selectedDifficulty === 'medium' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium">
                      Force (N):
                    </label>
                    <div className="md:col-span-2 p-2 border rounded-md bg-gray-50">
                      {userInput.mass && userInput.acceleration ? 
                        `${parseFloat(userInput.mass) * parseFloat(userInput.acceleration)} N` : 
                        "Calculated result will appear here"}
                    </div>
                  </div>
                )}
                
                {step === 2 && selectedDifficulty === 'medium' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium">
                      Acceleration (m/s²):
                    </label>
                    <div className="md:col-span-2 p-2 border rounded-md bg-gray-50">
                      {userInput.force && userInput.mass ? 
                        `${parseFloat(userInput.force) / parseFloat(userInput.mass)} m/s²` : 
                        "Calculated result will appear here"}
                    </div>
                  </div>
                )}
                
                {step === 1 && selectedDifficulty === 'hard' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium">
                      Force (N):
                    </label>
                    <div className="md:col-span-2 p-2 border rounded-md bg-gray-50">
                      {userInput.mass && userInput.acceleration ? 
                        `${parseFloat(userInput.mass) * parseFloat(userInput.acceleration)} N` : 
                        "Calculated result will appear here"}
                    </div>
                  </div>
                )}
                
                {/* File upload option */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <h4 className="font-medium mb-2">Or Upload Your Solution</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Upload a scan, image, Word or PDF file with your solution
                  </p>
                  <div className="flex items-center gap-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 text-sm">
                        <FileUp className="h-4 w-4" />
                        Choose File
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                      />
                    </label>
                    <span className="text-sm text-gray-500">
                      {selectedFile ? selectedFile.name : "No file selected"}
                    </span>
                  </div>
                  {fileUploaded && (
                    <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded text-sm text-green-700 dark:text-green-400">
                      File processed successfully
                    </div>
                  )}
                </div>
              </div>
              
              {validationResult && (
                <div className={`p-3 mb-4 rounded-md ${validationResult.valid ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {validationResult.valid ? (
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5" />
                      <span>{validationResult.message}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span>{validationResult.message}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  onClick={showNextHint}
                  disabled={hintLevel >= 3 && showHint}
                >
                  {!showHint ? "Show Hint" : `Next Hint (${hintLevel}/3)`}
                </Button>
                <Button onClick={checkAnswer}>Check Answer</Button>
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
        
        {/* Right Sidebar - Mastery and Helpful Content */}
        <div className="space-y-6">
          {/* 4. Mastery Progress Indicator */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Mastery Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  {masteryStage === 'learning' && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Learning
                    </Badge>
                  )}
                  {masteryStage === 'practicing' && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Practicing
                    </Badge>
                  )}
                  {masteryStage === 'mastered' && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Mastered
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Accuracy</span>
                    <span>{Math.round(accuracy)}%</span>
                  </div>
                  <Progress value={accuracy} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                    <p className="text-sm text-gray-500">Attempts</p>
                    <p className="text-lg font-medium">{attempts}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                    <p className="text-sm text-gray-500">Time Spent</p>
                    <p className="text-lg font-medium">{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</p>
                  </div>
                </div>
                
                {masteryStage === 'mastered' && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-100 dark:border-green-800">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <p className="font-medium text-green-700">Formula Mastered!</p>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      You've demonstrated excellent understanding of this formula.
                    </p>
                    <div className="mt-3">
                      <Button size="sm" variant="default" className="w-full">
                        Unlock Quiz Mode
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* 5. Hints & Strategy Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Common Mistakes & Strategies</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-red-600">Common Mistakes</h3>
                  <ul className="space-y-2 text-sm">
                    {formula.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md flex gap-2 items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-2 pt-2">
                  <h3 className="text-sm font-medium text-green-600">Smart Strategy</h3>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-100 dark:border-green-800">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm">Always identify the given variables first and check their units before applying the formula.</p>
                        <p className="text-xs text-green-600 mt-1">This tip is personalized based on your learning style.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* 7. Linked Content Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Related Concepts</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-3">
                {formula.linkedConcepts.map((concept, idx) => (
                  <Button key={idx} variant="outline" className="w-full justify-between" asChild>
                    <a href={`/dashboard/student/concepts/${concept.id}`}>
                      <span className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        {concept.name}
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* 8. Quick Notes Download Button */}
          <Button variant="outline" className="w-full flex gap-2" onClick={downloadNotes}>
            <Download className="h-4 w-4" />
            Download Formula Sheet
          </Button>
          
          <Button variant="outline" className="w-full flex gap-2" onClick={() => setShowNotes(!showNotes)}>
            {showNotes ? "Hide Your Notes" : "Show Your Notes"}
          </Button>
          
          {showNotes && (
            <Card>
              <CardContent className="p-4">
                <textarea 
                  className="w-full h-32 p-3 border rounded-md bg-background resize-none" 
                  placeholder="Take notes on this formula here..."
                />
                <div className="mt-3 flex justify-end">
                  <Button size="sm">Save Notes</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormulaTabContent;
