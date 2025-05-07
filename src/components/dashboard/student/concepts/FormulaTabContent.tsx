
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Download, ArrowRight, HelpCircle, Check, AlertTriangle, RefreshCw, Clock, Star, Brain, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormulaVariable {
  symbol: string;
  name: string;
  unit?: string;
  description: string;
}

interface Formula {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  level: string;
  examRelevance: string[];
  latex: string;
  rendered: string;
  description: string;
  realLifeApplication: string;
  variables: FormulaVariable[];
  derivation?: string;
  visualRepresentation?: string;
}

interface Problem {
  id: string;
  question: string;
  variables: Record<string, number>;
  solution: {
    steps: {
      instruction: string;
      expression: string;
      result: number;
    }[];
    finalAnswer: string;
    units: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
}

interface FormulaTabContentProps {
  conceptId?: string;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ conceptId }) => {
  const { toast } = useToast();
  const [activeFormula, setActiveFormula] = useState<Formula | null>(null);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [stepValidation, setStepValidation] = useState<Record<number, boolean>>({});
  const [hintLevel, setHintLevel] = useState(0);
  const [showDerivation, setShowDerivation] = useState(false);
  const [mastery, setMastery] = useState({
    stage: 'learning', // learning, practicing, mastered
    accuracy: 0,
    attempts: 0,
    timeSpent: 0,
    correctStreak: 0
  });
  const [timer, setTimer] = useState<number>(0);
  const [timerActive, setTimerActive] = useState(false);

  // Mock formula data - in a real app, this would be fetched from API based on conceptId
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setActiveFormula({
        id: "ohms-law",
        title: "Ohm's Law",
        subject: "Physics",
        chapter: "Current Electricity",
        level: "Class 10-12",
        examRelevance: ["NEET", "JEE Main", "JEE Advanced"],
        latex: "V = I \\times R",
        rendered: "V = I × R",
        description: "Relates voltage, current, and resistance in an electrical circuit",
        realLifeApplication: "Used to calculate current in household electrical circuits and electronic devices",
        variables: [
          { symbol: "V", name: "Voltage", unit: "Volts (V)", description: "The electric potential difference between two points" },
          { symbol: "I", name: "Current", unit: "Amperes (A)", description: "The flow rate of electric charge" },
          { symbol: "R", name: "Resistance", unit: "Ohms (Ω)", description: "Opposition to the flow of electric current" }
        ],
        derivation: "Ohm's Law was formulated based on experimental observations by Georg Ohm in 1827. He found that the current through a conductor is directly proportional to the voltage across it, given the temperature remains constant. This gives us I = V/R, which is typically rearranged as V = IR.",
        visualRepresentation: "circuit-diagram.png" // Would be an actual image in real implementation
      });
      
      generateNewProblem();
    }, 500);
  }, [conceptId]);

  // Start timer when problem loads
  useEffect(() => {
    if (currentProblem && timerActive) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [currentProblem, timerActive]);

  // Generate a new practice problem
  const generateNewProblem = () => {
    // Reset states for new problem
    setUserInputs({});
    setStepValidation({});
    setHintLevel(0);
    setTimer(0);
    setTimerActive(true);
    
    // In a real app, this would call an API to generate a problem
    // Here we create a simple mock problem
    const randomResistance = Math.floor(Math.random() * 100) + 10; // 10-110 ohms
    const randomCurrent = (Math.floor(Math.random() * 50) + 5) / 10; // 0.5-5.5 amps
    
    setCurrentProblem({
      id: `problem-${Date.now()}`,
      question: `A circuit has a resistance of ${randomResistance} Ω and a current of ${randomCurrent} A flowing through it. Calculate the voltage across the circuit.`,
      variables: {
        R: randomResistance,
        I: randomCurrent,
        V: randomResistance * randomCurrent
      },
      solution: {
        steps: [
          {
            instruction: "Identify the values from the problem",
            expression: "R = ? Ω, I = ? A",
            result: 0 // Not applicable for this step
          },
          {
            instruction: "Substitute the values into Ohm's Law: V = I × R",
            expression: "V = ? × ?",
            result: 0 // User will calculate
          },
          {
            instruction: "Calculate the voltage",
            expression: "V = ?",
            result: randomResistance * randomCurrent
          }
        ],
        finalAnswer: `${(randomResistance * randomCurrent).toFixed(2)}`,
        units: "Volts (V)"
      },
      difficulty: 'medium',
      hints: [
        "Remember that Ohm's Law states V = I × R",
        "Substitute the resistance and current values into the formula",
        "Multiply the resistance (in Ω) by the current (in A) to get the voltage (in V)"
      ]
    });
    
    // Update mastery attempts
    setMastery(prev => ({
      ...prev,
      attempts: prev.attempts + 1
    }));
  };

  // Handle user input change
  const handleInputChange = (stepIndex: number, value: string) => {
    setUserInputs(prev => ({
      ...prev,
      [stepIndex]: value
    }));
  };

  // Validate a specific step
  const validateStep = (stepIndex: number) => {
    if (!currentProblem) return;
    
    const step = currentProblem.solution.steps[stepIndex];
    
    // For the first step (identification), we're just checking if they filled it
    if (stepIndex === 0) {
      const userAnswer = userInputs[stepIndex] || "";
      const hasResistance = userAnswer.includes(currentProblem.variables.R.toString()) && userAnswer.toLowerCase().includes("r");
      const hasCurrent = userAnswer.includes(currentProblem.variables.I.toString()) && userAnswer.toLowerCase().includes("i");
      
      const isCorrect = hasResistance && hasCurrent;
      setStepValidation(prev => ({ ...prev, [stepIndex]: isCorrect }));
      
      if (isCorrect) {
        toast({
          title: "Step correct",
          description: "You've correctly identified the values!",
        });
      } else {
        toast({
          title: "Step incorrect",
          description: "Make sure to identify both resistance and current values correctly.",
          variant: "destructive"
        });
      }
      return;
    }
    
    // For the second step (formula setup)
    if (stepIndex === 1) {
      const userAnswer = userInputs[stepIndex] || "";
      const correctSubstitution = `V = ${currentProblem.variables.I} × ${currentProblem.variables.R}`;
      const alternateSubstitution = `V = ${currentProblem.variables.I}*${currentProblem.variables.R}`;
      
      // Check for variations of the formula with different spacing/symbols
      const userFormatted = userAnswer.replace(/\s+/g, "").toLowerCase();
      const correct1 = correctSubstitution.replace(/\s+/g, "").toLowerCase();
      const correct2 = alternateSubstitution.replace(/\s+/g, "").toLowerCase();
      const correct3 = `v=${currentProblem.variables.I}*${currentProblem.variables.R}`;
      const correct4 = `v=${currentProblem.variables.I}×${currentProblem.variables.R}`;
      
      const isCorrect = [correct1, correct2, correct3, correct4].some(c => userFormatted.includes(c));
      setStepValidation(prev => ({ ...prev, [stepIndex]: isCorrect }));
      
      if (isCorrect) {
        toast({
          title: "Step correct",
          description: "Good job setting up the formula with correct values!",
        });
      } else {
        toast({
          title: "Step incorrect",
          description: `Make sure you're substituting I = ${currentProblem.variables.I} A and R = ${currentProblem.variables.R} Ω into V = I × R`,
          variant: "destructive"
        });
      }
      return;
    }
    
    // For the final calculation step
    if (stepIndex === 2) {
      const userAnswer = parseFloat(userInputs[stepIndex] || "0");
      const correctAnswer = step.result;
      
      // Allow for slight rounding differences
      const isCorrect = Math.abs(userAnswer - correctAnswer) < 0.01;
      setStepValidation(prev => ({ ...prev, [stepIndex]: isCorrect }));
      
      if (isCorrect) {
        setTimerActive(false);
        const newStreak = mastery.correctStreak + 1;
        
        toast({
          title: "Correct!",
          description: `The voltage is ${currentProblem.solution.finalAnswer} ${currentProblem.solution.units}`,
        });
        
        // Update mastery statistics
        setMastery(prev => ({
          ...prev,
          accuracy: (prev.accuracy * (prev.attempts - 1) + 100) / prev.attempts,
          timeSpent: prev.timeSpent + timer,
          correctStreak: newStreak
        }));
        
        // Check if mastery level should change
        if (newStreak >= 3 && mastery.stage === 'learning') {
          setMastery(prev => ({ ...prev, stage: 'practicing' }));
          toast({
            title: "Level up!",
            description: "You've advanced to Practice stage!",
          });
        } else if (newStreak >= 5 && mastery.stage === 'practicing') {
          setMastery(prev => ({ ...prev, stage: 'mastered' }));
          toast({
            title: "Formula mastered!",
            description: "You've mastered this formula. Try the challenge problems!",
          });
        }
      } else {
        toast({
          title: "Step incorrect",
          description: "Check your calculation. Remember V = I × R",
          variant: "destructive"
        });
        
        // Reset streak on wrong answer
        setMastery(prev => ({
          ...prev,
          correctStreak: 0,
          accuracy: (prev.accuracy * (prev.attempts - 1)) / prev.attempts,
        }));
      }
    }
  };

  // Show hint based on current hint level
  const showHint = () => {
    if (!currentProblem) return;
    
    // Don't go beyond available hints
    if (hintLevel < currentProblem.hints.length) {
      toast({
        title: `Hint ${hintLevel + 1}`,
        description: currentProblem.hints[hintLevel],
      });
      setHintLevel(prev => prev + 1);
    } else {
      toast({
        title: "No more hints available",
        description: "Try solving the problem with the hints you've received.",
      });
    }
  };

  // Download formula notes
  const downloadNotes = () => {
    toast({
      title: "Notes downloaded",
      description: "Formula summary and examples have been downloaded.",
    });
    // In a real implementation, this would generate and download a PDF/document
  };

  // Generate mastery stage display
  const getMasteryStage = () => {
    switch (mastery.stage) {
      case 'learning':
        return { icon: <RefreshCw className="h-5 w-5 text-blue-500" />, label: "Learning", color: "bg-blue-500" };
      case 'practicing':
        return { icon: <Brain className="h-5 w-5 text-purple-500" />, label: "Practicing", color: "bg-purple-500" };
      case 'mastered':
        return { icon: <Check className="h-5 w-5 text-emerald-500" />, label: "Mastered", color: "bg-emerald-500" };
      default:
        return { icon: <RefreshCw className="h-5 w-5 text-blue-500" />, label: "Learning", color: "bg-blue-500" };
    }
  };

  if (!activeFormula) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin h-8 w-8 border-t-2 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6">
      {/* 1. Formula Introduction Block */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{activeFormula.title}</h2>
            <Badge className="bg-blue-100 text-blue-800">{activeFormula.subject}</Badge>
            <Badge variant="outline">{activeFormula.chapter}</Badge>
            <Badge variant="outline">{activeFormula.level}</Badge>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{activeFormula.description}</p>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-md p-3 text-amber-800 dark:text-amber-300 flex items-start gap-2 max-w-lg">
            <Lightbulb className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{activeFormula.realLifeApplication}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {activeFormula.examRelevance.map((exam, index) => (
              <Badge key={index} variant="outline" className="bg-purple-50 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                {exam}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 2. Formula Display & Breakdown */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Formula</h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg mb-4 text-center">
                <div className="text-3xl font-serif">
                  <TooltipProvider>
                    {activeFormula.rendered.split('').map((char, i) => {
                      // Find the variable this character belongs to
                      const variable = activeFormula.variables.find(v => v.symbol === char);
                      
                      if (variable) {
                        return (
                          <Tooltip key={i}>
                            <TooltipTrigger asChild>
                              <span className="cursor-help text-blue-600 dark:text-blue-400">{char}</span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              <p className="font-medium">{variable.name}</p>
                              {variable.unit && <p className="text-sm">Unit: {variable.unit}</p>}
                              <p className="text-xs mt-1">{variable.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      }
                      
                      return <span key={i}>{char}</span>;
                    })}
                  </TooltipProvider>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeFormula.variables.map(variable => (
                    <div key={variable.symbol} className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                      <div className="font-medium text-lg text-blue-600 dark:text-blue-400">{variable.symbol}</div>
                      <div className="text-sm">{variable.name}</div>
                      {variable.unit && <div className="text-xs text-gray-500">{variable.unit}</div>}
                    </div>
                  ))}
                </div>

                <Collapsible 
                  className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
                  open={showDerivation}
                  onOpenChange={setShowDerivation}
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 text-sm font-medium">
                    <span>Formula Derivation</span>
                    <span>{showDerivation ? '−' : '+'}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 border-t border-gray-200 dark:border-gray-700 text-sm">
                    {activeFormula.derivation || "Derivation not available for this formula."}
                  </CollapsibleContent>
                </Collapsible>
                
                {activeFormula.visualRepresentation && (
                  <div className="mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Visual Representation</h4>
                    <div className="bg-gray-100 dark:bg-gray-700 h-48 rounded-md flex items-center justify-center text-gray-400">
                      {/* This would be an actual image in production */}
                      <p>Circuit diagram visualization</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 3. Interactive Problem Practice Section */}
          <Card className="border-t-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Interactive Problem Practice</h3>
                {timerActive && currentProblem && (
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span>{formatTime(timer)}</span>
                  </div>
                )}
              </div>
              
              {currentProblem ? (
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Problem:</h4>
                    <p className="text-blue-800 dark:text-blue-300">{currentProblem.question}</p>
                  </div>
                  
                  <div className="space-y-4">
                    {currentProblem.solution.steps.map((step, index) => (
                      <div key={index} className={cn(
                        "border rounded-md p-4",
                        stepValidation[index] === true ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" : 
                        stepValidation[index] === false ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" : 
                        "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      )}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gray-100 dark:bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <h5 className="font-medium">{step.instruction}</h5>
                          {stepValidation[index] === true && <Check className="h-5 w-5 text-green-500" />}
                          {stepValidation[index] === false && <AlertTriangle className="h-5 w-5 text-red-500" />}
                        </div>
                        
                        <div className="mt-2">
                          {index === 0 ? (
                            <Input
                              placeholder="Type your answer (e.g. R = 50 Ω, I = 2 A)"
                              value={userInputs[index] || ""}
                              onChange={(e) => handleInputChange(index, e.target.value)}
                              className={
                                stepValidation[index] === true ? "border-green-500 focus-visible:ring-green-500" : 
                                stepValidation[index] === false ? "border-red-500 focus-visible:ring-red-500" : ""
                              }
                              disabled={stepValidation[index] === true}
                            />
                          ) : index === 1 ? (
                            <Input
                              placeholder="Type the formula with values (e.g. V = 2 × 50)"
                              value={userInputs[index] || ""}
                              onChange={(e) => handleInputChange(index, e.target.value)}
                              className={
                                stepValidation[index] === true ? "border-green-500 focus-visible:ring-green-500" : 
                                stepValidation[index] === false ? "border-red-500 focus-visible:ring-red-500" : ""
                              }
                              disabled={stepValidation[index] === true || stepValidation[index-1] !== true}
                            />
                          ) : (
                            <Input
                              placeholder="Enter your final answer (numeric value only)"
                              value={userInputs[index] || ""}
                              onChange={(e) => handleInputChange(index, e.target.value)}
                              type="number"
                              step="0.01"
                              className={
                                stepValidation[index] === true ? "border-green-500 focus-visible:ring-green-500" : 
                                stepValidation[index] === false ? "border-red-500 focus-visible:ring-red-500" : ""
                              }
                              disabled={stepValidation[index] === true || stepValidation[index-1] !== true}
                            />
                          )}
                        </div>
                        
                        <div className="flex justify-between mt-3">
                          {stepValidation[index] !== true && (
                            <Button 
                              onClick={() => validateStep(index)} 
                              size="sm"
                              disabled={!userInputs[index] || (index > 0 && stepValidation[index-1] !== true)}
                            >
                              Check Step
                            </Button>
                          )}
                          
                          {stepValidation[index] === false && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={showHint}
                            >
                              <HelpCircle className="h-4 w-4 mr-1" /> 
                              Hint
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <Button 
                      onClick={generateNewProblem}
                      className="flex items-center gap-1"
                    >
                      <RefreshCw className="h-4 w-4" /> New Problem
                    </Button>
                    
                    {stepValidation[2] === true && (
                      <Badge 
                        className="px-3 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                      >
                        Completed in {formatTime(timer)}
                      </Badge>
                    )}
                  </div>
                </div>
              ) : (
                <Button onClick={generateNewProblem}>Generate Problem</Button>
              )}
            </CardContent>
          </Card>
          
          {/* 5. Hints & Strategy Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tips & Common Mistakes</h3>
              
              <div className="space-y-3">
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-red-800 dark:text-red-300">Common Mistake</h4>
                  <p className="text-sm mt-1">Forgetting to convert units before applying the formula</p>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">Strategy Tip</h4>
                  <p className="text-sm mt-1">Always identify all variables and check their units before applying the formula</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Remember This</h4>
                  <p className="text-sm mt-1">Ohm's Law only applies to ohmic conductors with constant resistance</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* 7. Linked Content Recommendations */}
          <Card className="border-t-4 border-indigo-500">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Related Formulas & Concepts</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                  <h4 className="font-medium">Power in Electric Circuits</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">P = V × I</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                    <span>Explore</span> <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                  <h4 className="font-medium">Resistors in Series</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Rtotal = R1 + R2 + ...</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                    <span>Explore</span> <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                  <h4 className="font-medium">Resistors in Parallel</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">1/Rtotal = 1/R1 + 1/R2 + ...</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                    <span>Explore</span> <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                  <h4 className="font-medium">Kirchhoff's Laws</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Current and voltage laws for circuit analysis</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                    <span>Explore</span> <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* 4. Mastery Progress Indicator */}
          <Card className="border-t-4 border-green-500">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Formula Mastery Progress</h3>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-6/12 h-2 rounded-l-full bg-blue-500"></div>
                  <div className="w-4/12 h-2 bg-purple-500"></div>
                  <div className="w-2/12 h-2 rounded-r-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex flex-col items-center">
                    <RefreshCw className="h-4 w-4 text-blue-500 mb-1" />
                    <span>Learning</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Brain className="h-4 w-4 text-purple-500 mb-1" />
                    <span>Practicing</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Check className="h-4 w-4 text-gray-400 mb-1" />
                    <span>Mastered</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Current Stage</span>
                    <div className="flex items-center gap-1">
                      {getMasteryStage().icon}
                      <span className="font-medium">{getMasteryStage().label}</span>
                    </div>
                  </div>
                  <Progress value={
                    mastery.stage === 'learning' 
                      ? 33 
                      : mastery.stage === 'practicing' 
                        ? 66 
                        : 100
                  } className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Accuracy</span>
                    <span className="font-medium">{Math.round(mastery.accuracy)}%</span>
                  </div>
                  <Progress value={mastery.accuracy} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Problems Attempted</div>
                    <div className="text-2xl font-semibold">{mastery.attempts}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Current Streak</div>
                    <div className="text-2xl font-semibold">{mastery.correctStreak}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 col-span-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Time Spent</div>
                    <div className="text-2xl font-semibold">{formatTime(mastery.timeSpent)}</div>
                  </div>
                </div>
              </div>
              
              {/* 6. Concept Mastery Trigger & Unlockables */}
              {mastery.stage === 'mastered' && (
                <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-md">
                  <h4 className="font-medium text-purple-800 dark:text-purple-300 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" /> Mastery Unlocked!
                  </h4>
                  <div className="mt-3 space-y-2">
                    <Button className="w-full" variant="outline">
                      Take Challenge Quiz
                    </Button>
                    <Button className="w-full" variant="outline">
                      Share Achievement
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* 8. Quick Notes Download Button */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Study Resources</h3>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2 justify-start"
                  onClick={downloadNotes}
                >
                  <Download className="h-4 w-4" />
                  <span>Formula Summary Sheet</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2 justify-start"
                  onClick={downloadNotes}
                >
                  <Download className="h-4 w-4" />
                  <span>Practice Problems PDF</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2 justify-start"
                  onClick={downloadNotes}
                >
                  <Download className="h-4 w-4" />
                  <span>Common Mistakes Reference</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormulaTabContent;
