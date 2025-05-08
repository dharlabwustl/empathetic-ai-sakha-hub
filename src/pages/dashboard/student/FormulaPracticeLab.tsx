
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, BookOpen, Calculator, Volume2, Lightbulb, Clock, Brain, AlertTriangle, PlusCircle, MinusCircle, ChevronRight, ArrowRight, FileText, HelpCircle, Square } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock formula data
const formula = {
  id: "f1",
  name: "Ohm's Law",
  subject: "Physics",
  chapter: "Electricity",
  class: "12th Grade",
  exams: ["NEET", "JEE"],
  description: "Relates voltage, current, and resistance in an electric circuit. It states that the current flowing through a conductor is directly proportional to the voltage and inversely proportional to the resistance.",
  realLifeApplication: "Used in designing electric circuits in appliances, calculating power consumption, and troubleshooting electrical problems.",
  latexFormula: "V = I × R",
  variables: [
    { symbol: "V", name: "Voltage", unit: "Volts (V)", description: "The electric potential difference between two points" },
    { symbol: "I", name: "Current", unit: "Amperes (A)", description: "The flow rate of electric charge" },
    { symbol: "R", name: "Resistance", unit: "Ohms (Ω)", description: "The opposition to the flow of electric current" }
  ],
  derivation: "Ohm's Law can be derived from experimental observations. When Georg Ohm conducted experiments with various conductors, he found that the current flowing through a conductor was proportional to the voltage applied across it. This led to the formulation of I = V/R, which is commonly rearranged as V = I × R.",
  problems: [
    {
      id: "p1",
      difficulty: "easy",
      text: "If a circuit has a resistance of 5 Ω and a current of 2 A is flowing through it, what is the voltage?",
      steps: [
        { id: "s1", text: "Identify the given values", solution: "R = 5 Ω, I = 2 A" },
        { id: "s2", text: "Apply Ohm's Law: V = I × R", solution: "V = 2 A × 5 Ω" },
        { id: "s3", text: "Calculate the result", solution: "V = 10 V" }
      ],
      hints: [
        "Use the formula V = I × R with the given values",
        "Substitute R = 5 Ω and I = 2 A into the formula",
        "Multiply 2 A by 5 Ω to get the voltage"
      ]
    },
    {
      id: "p2",
      difficulty: "medium",
      text: "A light bulb is connected to a 120 V power supply and draws 0.5 A of current. What is the resistance of the light bulb?",
      steps: [
        { id: "s1", text: "Identify the given values", solution: "V = 120 V, I = 0.5 A" },
        { id: "s2", text: "Rearrange Ohm's Law to solve for R: R = V / I", solution: "R = 120 V / 0.5 A" },
        { id: "s3", text: "Calculate the result", solution: "R = 240 Ω" }
      ],
      hints: [
        "We need to find R, and we know V and I",
        "Rearrange Ohm's Law to R = V / I",
        "Divide 120 V by 0.5 A to find the resistance"
      ]
    },
    {
      id: "p3",
      difficulty: "hard",
      text: "A circuit contains three resistors connected in series with values 10 Ω, 15 Ω, and 25 Ω. If the voltage across the entire circuit is 100 V, calculate the current flowing through each resistor.",
      steps: [
        { id: "s1", text: "Calculate the total resistance", solution: "Rtotal = 10 Ω + 15 Ω + 25 Ω = 50 Ω" },
        { id: "s2", text: "Use Ohm's Law to find the current", solution: "I = V / Rtotal = 100 V / 50 Ω" },
        { id: "s3", text: "Calculate the result", solution: "I = 2 A" },
        { id: "s4", text: "Since the resistors are in series, the current is the same through each", solution: "I = 2 A for all resistors" }
      ],
      hints: [
        "For resistors in series, the total resistance is the sum of all individual resistances",
        "After finding the total resistance, use Ohm's Law with the total voltage",
        "In a series circuit, the current is the same through all components"
      ]
    }
  ],
  commonMistakes: [
    "Forgetting to convert units (e.g., mA to A)",
    "Misapplying the formula when dealing with AC circuits",
    "Incorrectly calculating total resistance in complex circuits"
  ]
};

const FormulaPracticeLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState("formula-info");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [currentProblem, setCurrentProblem] = useState(formula.problems[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{correct: boolean; message: string} | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [mastery, setMastery] = useState<"learning" | "practicing" | "mastered">("learning");
  const [accuracy, setAccuracy] = useState(0);
  const [notes, setNotes] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Start timer when a new problem is loaded
  React.useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [timerRunning]);

  // Load a problem based on selected difficulty
  const loadProblem = (difficulty: "easy" | "medium" | "hard") => {
    const problem = formula.problems.find(p => p.difficulty === difficulty) || formula.problems[0];
    setCurrentProblem(problem);
    setCurrentStep(0);
    setUserAnswers({});
    setFeedback(null);
    setShowHint(false);
    setHintLevel(0);
    setTimeSpent(0);
    setTimerRunning(true);
    setAttempts(0);
  };

  // Handle user input for steps
  const handleStepInputChange = (stepId: string, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [stepId]: value
    }));
  };

  // Check the current step
  const checkStep = () => {
    const currentStepObj = currentProblem.steps[currentStep];
    const userAnswer = userAnswers[currentStepObj.id] || "";
    const solution = currentStepObj.solution;
    
    // Simple exact match for now (in a real app, you would use more sophisticated validation)
    const isCorrect = userAnswer.trim().toLowerCase() === solution.trim().toLowerCase();
    
    setAttempts(prev => prev + 1);
    
    if (isCorrect) {
      setFeedback({
        correct: true,
        message: "Correct! Well done."
      });
      
      // Move to the next step after a delay or complete if this was the last step
      setTimeout(() => {
        if (currentStep < currentProblem.steps.length - 1) {
          setCurrentStep(prev => prev + 1);
          setFeedback(null);
        } else {
          // Problem completed
          setTimerRunning(false);
          setMastery(prev => prev === "learning" ? "practicing" : prev === "practicing" ? "mastered" : "mastered");
          setAccuracy(prev => Math.min(100, prev + 10));
        }
      }, 1500);
    } else {
      setFeedback({
        correct: false,
        message: attempts > 1 ? "Still not quite right. Try using a hint." : "Not quite right. Try again."
      });
    }
  };

  // Show the next hint
  const showNextHint = () => {
    setShowHint(true);
    setHintLevel(prev => Math.min(prev + 1, currentProblem.hints.length - 1));
  };

  // Toggle voice guide
  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    // In a real implementation, this would start/stop text-to-speech
  };

  // Generate a new problem
  const generateProblem = () => {
    loadProblem(difficulty);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Formula Practice Lab</h1>
          <p className="text-gray-500 mt-1">Interactive, step-by-step formula mastery</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline" size="sm" onClick={toggleVoice}>
            <Volume2 className={`h-4 w-4 mr-2 ${isVoiceActive ? "text-blue-600" : "text-gray-500"}`} />
            {isVoiceActive ? "Voice Guide On" : "Voice Guide Off"}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="/dashboard/student/flashcards">
              <FileText className="h-4 w-4 mr-2" />
              Flashcards
            </a>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area - Tabs */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-0">
              <Tabs defaultValue="formula-info" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start p-2 bg-muted/50 rounded-t-lg overflow-x-auto flex-nowrap">
                  <TabsTrigger value="formula-info" className="whitespace-nowrap">Formula Info</TabsTrigger>
                  <TabsTrigger value="interactive-practice" className="whitespace-nowrap">Interactive Practice Lab</TabsTrigger>
                  <TabsTrigger value="visualizer" className="whitespace-nowrap">Visualizer</TabsTrigger>
                  <TabsTrigger value="progress-tracker" className="whitespace-nowrap">Progress</TabsTrigger>
                  <TabsTrigger value="notes" className="whitespace-nowrap">Notes</TabsTrigger>
                </TabsList>
                
                {/* Formula Info Tab */}
                <TabsContent value="formula-info" className="p-6">
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2 items-center">
                      <h2 className="text-xl font-semibold">{formula.name}</h2>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">{formula.subject}</Badge>
                      {formula.exams.map((exam) => (
                        <Badge key={exam} variant="outline">{exam}</Badge>
                      ))}
                      <Badge variant="outline">Chapter: {formula.chapter}</Badge>
                      <Badge variant="outline">Class: {formula.class}</Badge>
                    </div>
                    
                    <div className="prose max-w-none">
                      <p>{formula.description}</p>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                      <h3 className="font-medium text-amber-800 mb-1">Real-Life Application</h3>
                      <p className="text-amber-700">{formula.realLifeApplication}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <h3 className="text-3xl font-serif">{formula.latexFormula}</h3>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Hover over variables for details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <div className="mt-4 flex justify-center gap-4">
                        {formula.variables.map((variable) => (
                          <TooltipProvider key={variable.symbol}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="bg-white p-2 rounded-md border border-gray-200 min-w-[80px]">
                                  <div className="text-lg font-medium">{variable.symbol}</div>
                                  <div className="text-xs text-gray-500">{variable.name}</div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="bottom" className="w-60 p-2">
                                <p className="font-medium">{variable.name} ({variable.unit})</p>
                                <p className="text-sm">{variable.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>
                    
                    <Accordion type="single" collapsible>
                      <AccordionItem value="derivation">
                        <AccordionTrigger className="text-lg font-medium">Derivation</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-700">{formula.derivation}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="font-medium mb-2">Video Explanation</p>
                        <p className="text-sm text-gray-500">(Video player would appear here)</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button onClick={() => setActiveTab("interactive-practice")} className="flex items-center">
                        Practice This Formula
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Interactive Practice Lab Tab */}
                <TabsContent value="interactive-practice" className="p-6">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h2 className="text-xl font-semibold">Interactive Practice</h2>
                        <p className="text-gray-500">Solve step-by-step problems using {formula.name}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Select value={difficulty} onValueChange={(value) => setDifficulty(value as "easy" | "medium" | "hard")}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button variant="outline" onClick={generateProblem} className="flex items-center gap-1">
                          <PlusCircle className="h-4 w-4" />
                          Generate Problem
                        </Button>
                      </div>
                    </div>
                    
                    <Card className="border-t-4" style={{ borderTopColor: difficulty === "easy" ? "#22c55e" : difficulty === "medium" ? "#f59e0b" : "#ef4444" }}>
                      <CardContent className="p-6">
                        {/* Problem Statement */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Problem:</h3>
                            <Badge variant={difficulty === "easy" ? "outline" : difficulty === "medium" ? "default" : "destructive"} className="capitalize">
                              {difficulty}
                            </Badge>
                          </div>
                          <p className="mt-2 p-3 bg-gray-50 rounded-md">{currentProblem.text}</p>
                        </div>
                        
                        {/* Progress Tracker */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm">
                              Step {currentStep + 1} of {currentProblem.steps.length}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                            </div>
                          </div>
                          <Progress value={((currentStep + 1) / currentProblem.steps.length) * 100} className="h-2" />
                        </div>
                        
                        {/* Current Step */}
                        <div className="mb-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
                          <h3 className="font-medium text-blue-800">Step {currentStep + 1}: {currentProblem.steps[currentStep].text}</h3>
                        </div>
                        
                        {/* Input for Current Step */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2">Your Answer:</label>
                          <div className="flex gap-2">
                            <Input 
                              value={userAnswers[currentProblem.steps[currentStep].id] || ''}
                              onChange={(e) => handleStepInputChange(currentProblem.steps[currentStep].id, e.target.value)}
                              placeholder="Enter your answer..."
                              className="flex-grow"
                            />
                            <Button onClick={checkStep}>Check</Button>
                          </div>
                          
                          {feedback && (
                            <div className={`mt-3 p-3 rounded-md ${feedback.correct ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                              {feedback.correct ? (
                                <div className="flex items-center">
                                  <CheckCircle className="h-5 w-5 mr-2" />
                                  {feedback.message}
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <AlertTriangle className="h-5 w-5 mr-2" />
                                  {feedback.message}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Hints */}
                        <div className="mt-6">
                          <div className="flex justify-between items-center">
                            <Button 
                              variant="outline" 
                              onClick={showNextHint} 
                              disabled={hintLevel >= currentProblem.hints.length - 1 && showHint}
                            >
                              <Lightbulb className="h-4 w-4 mr-2" />
                              {!showHint ? 'Show Hint' : `Next Hint (${hintLevel + 1}/${currentProblem.hints.length})`}
                            </Button>
                            
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="text-gray-500">
                                <Calculator className="h-4 w-4 mr-1" />
                                Calculator
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-500">
                                <Volume2 className="h-4 w-4 mr-1" />
                                Voice Input
                              </Button>
                            </div>
                          </div>
                          
                          {showHint && (
                            <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-md">
                              <div className="flex items-start">
                                <Lightbulb className="h-5 w-5 mr-2 text-amber-600 mt-0.5" />
                                <p className="text-amber-800">{currentProblem.hints[hintLevel]}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="mt-6 flex justify-between text-xs text-gray-500">
                          <Button variant="ghost" size="sm">Skip This Step</Button>
                          <Button variant="ghost" size="sm">Show Solution</Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Numeric Keypad for Mobile (Simplified) */}
                    <div className="md:hidden mt-4">
                      <div className="text-center text-sm text-gray-500 mb-2">Numeric Keypad</div>
                      <div className="grid grid-cols-3 gap-2">
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "="
                        ].map((key) => (
                          <Button 
                            key={key} 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              const stepId = currentProblem.steps[currentStep].id;
                              const currentValue = userAnswers[stepId] || '';
                              handleStepInputChange(stepId, currentValue + key);
                            }}
                          >
                            {key}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Visualizer Tab */}
                <TabsContent value="visualizer" className="p-6">
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Visual Representation</h2>
                    
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                      <div className="text-center p-6">
                        <p className="font-medium mb-2">Interactive Visualization</p>
                        <p className="text-sm text-gray-500 mb-4">(In a real implementation, this would be an interactive diagram showing how {formula.name} works in practice)</p>
                        <div className="flex justify-center">
                          <Button variant="outline">
                            <PlayButton className="h-4 w-4 mr-2" />
                            Play Animation
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-3">Graphical Representation</h3>
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <p className="text-sm text-gray-500">(Graphical visualization)</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Real-world Example</h3>
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <p className="text-sm text-gray-500">(Real-world application visualization)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <h3 className="font-medium text-blue-800 mb-2">Interactive Elements</h3>
                      <p className="text-blue-700 mb-4">Adjust the values below to see how changes affect the circuit:</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {formula.variables.map((variable) => (
                          <div key={variable.symbol}>
                            <label className="block text-sm font-medium mb-1">
                              {variable.name} ({variable.symbol})
                            </label>
                            <Input 
                              type="range" 
                              min="1" 
                              max="100"
                              className="w-full"
                              disabled
                            />
                            <div className="flex justify-between text-xs mt-1">
                              <span>Min</span>
                              <span>Max</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Progress Tracker Tab */}
                <TabsContent value="progress-tracker" className="p-6">
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Progress Tracker</h2>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="font-medium">Mastery Status</h3>
                          <Badge 
                            variant={mastery === "learning" ? "outline" : mastery === "practicing" ? "default" : "default"}
                            className={
                              mastery === "learning" ? "bg-blue-50 text-blue-700 border-blue-200" :
                              mastery === "practicing" ? "bg-amber-50 text-amber-700 border-amber-200" :
                              "bg-green-50 text-green-700 border-green-200"
                            }
                          >
                            {mastery === "learning" ? "Learning" : mastery === "practicing" ? "Practicing" : "Mastered"}
                          </Badge>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="flex items-center gap-1">
                                <Brain className="h-4 w-4 text-purple-600" />
                                Accuracy
                              </span>
                              <span>{accuracy}%</span>
                            </div>
                            <Progress value={accuracy} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-md text-center">
                              <p className="text-sm text-gray-500">Problems Solved</p>
                              <p className="text-lg font-medium">{mastery === "learning" ? 0 : mastery === "practicing" ? 1 : 3}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md text-center">
                              <p className="text-sm text-gray-500">Total Time Spent</p>
                              <p className="text-lg font-medium">{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md">
                            <h4 className="font-medium mb-2">Breakdown by Difficulty</h4>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Easy</span>
                                  <span>{mastery === "practicing" || mastery === "mastered" ? "1/1" : "0/1"}</span>
                                </div>
                                <Progress value={mastery === "practicing" || mastery === "mastered" ? 100 : 0} className="h-1.5" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Medium</span>
                                  <span>{mastery === "mastered" ? "1/1" : "0/1"}</span>
                                </div>
                                <Progress value={mastery === "mastered" ? 100 : 0} className="h-1.5" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Hard</span>
                                  <span>{mastery === "mastered" ? "1/1" : "0/1"}</span>
                                </div>
                                <Progress value={mastery === "mastered" ? 100 : 0} className="h-1.5" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md">
                            <h4 className="font-medium mb-2">Recent Activity</h4>
                            <div className="space-y-2 text-sm">
                              {mastery === "learning" ? (
                                <p className="text-gray-500">No recent activity yet. Start practicing!</p>
                              ) : (
                                <div className="flex justify-between items-center p-2 bg-white rounded border border-gray-100">
                                  <div>
                                    <p className="font-medium">Completed {difficulty} problem</p>
                                    <p className="text-xs text-gray-500">Just now</p>
                                  </div>
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    +10% Accuracy
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {mastery === "mastered" && (
                      <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-green-800">Formula Mastered!</h3>
                          <p className="text-green-700 mb-3">You've demonstrated excellent understanding of this formula.</p>
                          <Button size="sm" variant="outline" className="bg-white text-green-700 border-green-200 hover:bg-green-50">
                            Unlock Advanced Challenges
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-medium mb-3">Next Steps</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <Button variant="outline" className="justify-between">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2" />
                            <span>Related Concepts</span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="justify-between">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>Practice Tests</span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="justify-between">
                          <div className="flex items-center">
                            <Calculator className="h-4 w-4 mr-2" />
                            <span>Complex Problems</span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Notes Tab */}
                <TabsContent value="notes" className="p-6">
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Personal Notes</h2>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h3 className="font-medium mb-2">Quick Summary</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-blue-600" />
                          </div>
                          <span>{formula.name} defines the relationship between {formula.variables[0].name}, {formula.variables[1].name}, and {formula.variables[2].name}.</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-blue-600" />
                          </div>
                          <span>Formula: {formula.latexFormula}</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-blue-600" />
                          </div>
                          <span>Common mistake: {formula.commonMistakes[0]}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <label className="block font-medium mb-2">Your Notes</label>
                      <Textarea 
                        placeholder="Write your notes here..." 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="h-40"
                      />
                      <div className="flex justify-end mt-2">
                        <Button size="sm">Save Notes</Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Example Problems</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="p-2 bg-white rounded border border-gray-100">
                          <div className="flex justify-between">
                            <span className="font-medium">Basic Example:</span>
                            <Badge variant="outline">Easy</Badge>
                          </div>
                          <p>If a circuit has 5V and 2A, the resistance is 2.5Ω.</p>
                        </li>
                        <li className="p-2 bg-white rounded border border-gray-100">
                          <div className="flex justify-between">
                            <span className="font-medium">Advanced Example:</span>
                            <Badge variant="outline">Hard</Badge>
                          </div>
                          <p>For a circuit with resistors in series of 10Ω, 15Ω, and 25Ω with 100V, the current is 2A.</p>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Export Notes
                      </Button>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Print Formula Sheet
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Concept Strategy Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <h3 className="font-medium text-blue-800 flex items-center gap-1">
                  <Lightbulb className="h-4 w-4" />
                  Smart Tip
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Always double-check your unit conversions before applying Ohm's Law.
                </p>
              </div>
              
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                <h3 className="font-medium text-amber-800 flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  Common Mistake
                </h3>
                <p className="text-sm text-amber-700 mt-1">
                  Remember that Ohm's Law applies to resistors, not to all circuit elements (like capacitors or inductors).
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <h3 className="font-medium text-green-800 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Memory Aid
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Remember the triangle: V at the top, I and R at the bottom. Cover the value you want to find.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Hints Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hint Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="font-medium text-sm mb-1">Level 1: Concept Nudge</p>
                  <p className="text-xs text-gray-600">
                    Gentle guidance about which formula to use or what concept to apply.
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="font-medium text-sm mb-1">Level 2: Partial Formula</p>
                  <p className="text-xs text-gray-600">
                    Shows how to start the problem and which values to substitute.
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="font-medium text-sm mb-1">Level 3: Step-by-Step</p>
                  <p className="text-xs text-gray-600">
                    Complete walkthrough of the solution with detailed explanations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Formulas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Formulas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Calculator className="h-4 w-4 mr-2" />
                  <span>Power Law (P = VI)</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Calculator className="h-4 w-4 mr-2" />
                  <span>Series Resistance</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center">
                  <Calculator className="h-4 w-4 mr-2" />
                  <span>Parallel Resistance</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          {/* Help Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">Need Help?</span>
                </div>
                <Button variant="link" size="sm" className="text-blue-600">Contact Tutor</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Save Progress
            </Button>
            <Button variant="outline" className="w-full">
              <Volume2 className="h-4 w-4 mr-2" />
              Voice Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Play Button icon component
const PlayButton = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

export default FormulaPracticeLab;
