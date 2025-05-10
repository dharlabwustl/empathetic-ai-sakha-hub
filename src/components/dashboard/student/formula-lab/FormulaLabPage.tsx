
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, ChevronDown, ChevronRight, Eye, Lightbulb, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Define physics formulas
const physicsFormulas = [
  { 
    id: 1, 
    name: "Kinematics: Velocity", 
    formula: "v = u + at", 
    variables: ["v (final velocity)", "u (initial velocity)", "a (acceleration)", "t (time)"],
    difficulty: "easy"
  },
  { 
    id: 2, 
    name: "Kinematics: Distance", 
    formula: "s = ut + ½at²", 
    variables: ["s (distance)", "u (initial velocity)", "a (acceleration)", "t (time)"],
    difficulty: "medium" 
  },
  { 
    id: 3, 
    name: "Newton's Second Law", 
    formula: "F = ma", 
    variables: ["F (force)", "m (mass)", "a (acceleration)"],
    difficulty: "easy"
  },
  { 
    id: 4, 
    name: "Gravitational Potential Energy", 
    formula: "E = mgh", 
    variables: ["E (energy)", "m (mass)", "g (gravity)", "h (height)"],
    difficulty: "easy"
  },
  { 
    id: 5, 
    name: "Kinetic Energy", 
    formula: "E = ½mv²", 
    variables: ["E (energy)", "m (mass)", "v (velocity)"],
    difficulty: "medium"
  },
  { 
    id: 6, 
    name: "Work Done", 
    formula: "W = F·d·cos(θ)", 
    variables: ["W (work)", "F (force)", "d (distance)", "θ (angle)"],
    difficulty: "hard"
  },
];

// Define chemistry formulas
const chemistryFormulas = [
  { 
    id: 1, 
    name: "Molarity", 
    formula: "M = n/V", 
    variables: ["M (molarity)", "n (moles)", "V (volume in liters)"],
    difficulty: "medium"
  },
  { 
    id: 2, 
    name: "Ideal Gas Law", 
    formula: "PV = nRT", 
    variables: ["P (pressure)", "V (volume)", "n (moles)", "R (gas constant)", "T (temperature)"],
    difficulty: "hard"
  },
  { 
    id: 3, 
    name: "pH Calculation", 
    formula: "pH = -log[H⁺]", 
    variables: ["pH (acidity)", "[H⁺] (hydrogen ion concentration)"],
    difficulty: "medium"
  }
];

// Define math formulas
const mathFormulas = [
  { 
    id: 1, 
    name: "Quadratic Formula", 
    formula: "x = (-b ± √(b² - 4ac)) / 2a", 
    variables: ["x (solution)", "a (coefficient of x²)", "b (coefficient of x)", "c (constant)"],
    difficulty: "medium"
  },
  { 
    id: 2, 
    name: "Pythagorean Theorem", 
    formula: "a² + b² = c²", 
    variables: ["a (side 1)", "b (side 2)", "c (hypotenuse)"],
    difficulty: "easy"
  },
  { 
    id: 3, 
    name: "Area of Circle", 
    formula: "A = πr²", 
    variables: ["A (area)", "r (radius)"],
    difficulty: "easy"
  }
];

// Generate practice questions for a formula
const generateQuestions = (formula: any, count: number, difficulty: string) => {
  const questions = [];
  
  // Generate based on formula type and difficulty
  for (let i = 0; i < count; i++) {
    let question: any = {
      id: `q-${formula.id}-${i}`,
      formulaId: formula.id,
      formulaName: formula.name,
      formulaText: formula.formula,
      difficulty,
      steps: []
    };
    
    // Generate different question types based on the formula
    if (formula.name.includes("Velocity")) {
      const u = Math.round(Math.random() * 10);
      const a = Math.round(Math.random() * 5);
      const t = Math.round(Math.random() * 10);
      const v = u + a * t;
      
      if (difficulty === "easy") {
        question.text = `An object starts with an initial velocity of ${u} m/s and accelerates at ${a} m/s². What is its final velocity after ${t} seconds?`;
        question.answer = `${v} m/s`;
        question.steps = [
          { text: `Identify the formula: v = u + at` },
          { text: `Substitute the values: v = ${u} + (${a} × ${t})` },
          { text: `Solve: v = ${u} + ${a*t} = ${v} m/s` }
        ];
      } else {
        question.text = `A car accelerates uniformly from ${u} m/s to ${v} m/s in ${t} seconds. Calculate the acceleration.`;
        question.answer = `${a} m/s²`;
        question.steps = [
          { text: `Rearrange the formula v = u + at to find a` },
          { text: `a = (v - u)/t` },
          { text: `a = (${v} - ${u})/${t} = ${a} m/s²` }
        ];
      }
    } else if (formula.name.includes("Distance")) {
      const u = Math.round(Math.random() * 10);
      const a = Math.round(Math.random() * 5);
      const t = Math.round(Math.random() * 8);
      const s = u*t + 0.5*a*t*t;
      
      question.text = `An object starts with velocity of ${u} m/s and accelerates at ${a} m/s². How far will it travel in ${t} seconds?`;
      question.answer = `${s.toFixed(1)} m`;
      question.steps = [
        { text: `Identify the formula: s = ut + ½at²` },
        { text: `Substitute the values: s = ${u} × ${t} + 0.5 × ${a} × ${t}²` },
        { text: `Solve: s = ${u*t} + 0.5 × ${a} × ${t*t} = ${s.toFixed(1)} m` }
      ];
    } else if (formula.name.includes("Newton")) {
      const m = Math.round((Math.random() * 10) + 1);
      const a = Math.round(Math.random() * 5);
      const f = m * a;
      
      question.text = `What force is needed to accelerate a ${m} kg object at ${a} m/s²?`;
      question.answer = `${f} N`;
      question.steps = [
        { text: `Identify the formula: F = ma` },
        { text: `Substitute the values: F = ${m} × ${a}` },
        { text: `Solve: F = ${f} N` }
      ];
    } else {
      // Generic question template for other formulas
      question.text = `Practice question ${i+1} for ${formula.name}: Solve using the formula ${formula.formula}.`;
      question.answer = `See solution`;
      question.steps = [
        { text: `Step 1: Identify the variables in the formula` },
        { text: `Step 2: Substitute with appropriate values` },
        { text: `Step 3: Calculate the result` }
      ];
    }
    
    questions.push(question);
  }
  
  return questions;
};

// Practice Question Component
const PracticeQuestion = ({ question, index }: { question: any, index: number }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  return (
    <TooltipProvider>
      <Card className="mb-4 border-l-4" style={{ borderLeftColor: question.difficulty === 'easy' ? '#22c55e' : question.difficulty === 'medium' ? '#f59e0b' : '#ef4444' }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Question {index + 1}</CardTitle>
            <Badge variant={question.difficulty === 'easy' ? 'outline' : question.difficulty === 'medium' ? 'secondary' : 'destructive'} className="text-xs">
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </Badge>
          </div>
          <CardDescription className="text-sm font-medium">{question.formulaName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">{question.text}</p>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
            <p className="text-sm font-mono">{question.formulaText}</p>
          </div>
          
          {showAnswer && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-3 mt-2">
                <p className="font-medium text-sm">Answer: {question.answer}</p>
                
                {question.steps.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Solution Steps:</p>
                    <ol className="list-decimal list-inside space-y-1 mt-2">
                      {question.steps.map((step: any, i: number) => (
                        <li key={i} className="text-sm">{step.text}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAnswer(!showAnswer)}
              >
                <Eye className="h-4 w-4 mr-1" />
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{showAnswer ? "Hide the solution" : "View the complete solution"}</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={completed ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setCompleted(!completed)}
              >
                {completed ? (
                  <><Check className="h-4 w-4 mr-1" /> Completed</>
                ) : (
                  "Mark Complete"
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Mark this question as completed</p>
            </TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};

const FormulaLabPage = () => {
  const [subject, setSubject] = useState<string>("physics");
  const [selectedFormula, setSelectedFormula] = useState<any>(physicsFormulas[0]);
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  
  // Get formulas based on selected subject
  const getFormulas = () => {
    switch (subject) {
      case "physics": return physicsFormulas;
      case "chemistry": return chemistryFormulas;
      case "math": return mathFormulas;
      default: return physicsFormulas;
    }
  };
  
  // Filter formulas by difficulty
  const filteredFormulas = difficultyFilter === "all" 
    ? getFormulas() 
    : getFormulas().filter(f => f.difficulty === difficultyFilter);
  
  // Handle formula selection
  const handleFormulaSelect = (formulaId: number) => {
    const formula = getFormulas().find(f => f.id === formulaId);
    if (formula) {
      setSelectedFormula(formula);
    }
  };
  
  // Generate practice questions
  const handleGenerateQuestions = () => {
    const questions = generateQuestions(selectedFormula, questionCount, selectedFormula.difficulty);
    setGeneratedQuestions(questions);
  };

  return (
    <SharedPageLayout
      title="Formula Practice Lab"
      subtitle="Master formulas through interactive practice"
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <TooltipProvider>
        <Tabs defaultValue="practice" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="practice">Practice Questions</TabsTrigger>
            <TabsTrigger value="formula-list">Formula List</TabsTrigger>
            <TabsTrigger value="flashcards">Formula Cards</TabsTrigger>
          </TabsList>
          
          {/* Practice Questions Tab */}
          <TabsContent value="practice" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Sidebar */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-base">Formula Selection</CardTitle>
                  <CardDescription>Choose a formula to practice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Subject</label>
                    <Select 
                      value={subject} 
                      onValueChange={(value) => {
                        setSubject(value);
                        setSelectedFormula(value === "physics" ? physicsFormulas[0] : 
                                        value === "chemistry" ? chemistryFormulas[0] : mathFormulas[0]);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="math">Mathematics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Difficulty</label>
                    <div className="flex gap-2 mb-3">
                      <Button 
                        variant={difficultyFilter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficultyFilter("all")}
                        className="flex-1"
                      >
                        All
                      </Button>
                      <Button 
                        variant={difficultyFilter === "easy" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficultyFilter("easy")}
                        className="flex-1"
                      >
                        Easy
                      </Button>
                      <Button 
                        variant={difficultyFilter === "medium" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficultyFilter("medium")}
                        className="flex-1"
                      >
                        Medium
                      </Button>
                      <Button 
                        variant={difficultyFilter === "hard" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficultyFilter("hard")}
                        className="flex-1"
                      >
                        Hard
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Formula</label>
                    <div className="max-h-64 overflow-y-auto border rounded-md">
                      {filteredFormulas.length > 0 ? filteredFormulas.map(formula => (
                        <Tooltip key={formula.id}>
                          <TooltipTrigger asChild>
                            <div 
                              className={`p-3 border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${selectedFormula?.id === formula.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                              onClick={() => handleFormulaSelect(formula.id)}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm font-medium">{formula.name}</p>
                                  <p className="text-xs text-gray-500">{formula.formula}</p>
                                </div>
                                <Badge variant={formula.difficulty === 'easy' ? 'outline' : formula.difficulty === 'medium' ? 'secondary' : 'destructive'} className="text-xs">
                                  {formula.difficulty.charAt(0).toUpperCase() + formula.difficulty.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Click to practice this formula</p>
                          </TooltipContent>
                        </Tooltip>
                      )) : (
                        <p className="text-center p-4 text-sm text-gray-500">No formulas match your filter</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Number of Questions</label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[questionCount]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(vals) => setQuestionCount(vals[0])}
                        className="flex-1"
                      />
                      <Input 
                        type="number" 
                        value={questionCount} 
                        onChange={(e) => setQuestionCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                        className="w-16 text-center" 
                      />
                    </div>
                  </div>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={handleGenerateQuestions} 
                        className="w-full"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" /> Generate Questions
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Create new practice questions</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
              
              {/* Right Content */}
              <div className="md:col-span-2">
                {selectedFormula && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        {selectedFormula.name}
                      </CardTitle>
                      <CardDescription>{selectedFormula.formula}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Variables:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {selectedFormula.variables.map((variable: string, index: number) => (
                            <li key={index} className="text-sm">{variable}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {generatedQuestions.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Practice Questions</h3>
                    {generatedQuestions.map((question, index) => (
                      <PracticeQuestion 
                        key={question.id} 
                        question={question} 
                        index={index} 
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="bg-gray-50 dark:bg-gray-800/50 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <p className="text-center text-muted-foreground mb-4">
                        Select a formula and generate questions to practice
                      </p>
                      <Button onClick={handleGenerateQuestions}>
                        <RefreshCw className="h-4 w-4 mr-2" /> Generate Questions
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          {/* Formula List Tab */}
          <TabsContent value="formula-list">
            <Card>
              <CardHeader>
                <CardTitle>Formula Library</CardTitle>
                <CardDescription>Browse all formulas by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="physics" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="physics">Physics</TabsTrigger>
                    <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                    <TabsTrigger value="math">Mathematics</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="physics" className="space-y-4">
                    {physicsFormulas.map(formula => (
                      <Card key={formula.id} className="mb-2">
                        <CardHeader className="py-3">
                          <div className="flex justify-between">
                            <CardTitle className="text-base">{formula.name}</CardTitle>
                            <Badge variant="outline">{formula.difficulty}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="font-mono text-lg mb-2">{formula.formula}</p>
                          <div className="text-sm text-muted-foreground">
                            <strong>Variables:</strong> {formula.variables.join(', ')}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" onClick={() => {
                            setSelectedFormula(formula);
                            setSubject("physics");
                            document.querySelector('[data-value="practice"]')?.click();
                          }}>
                            Practice This Formula
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="chemistry" className="space-y-4">
                    {chemistryFormulas.map(formula => (
                      <Card key={formula.id} className="mb-2">
                        <CardHeader className="py-3">
                          <div className="flex justify-between">
                            <CardTitle className="text-base">{formula.name}</CardTitle>
                            <Badge variant="outline">{formula.difficulty}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="font-mono text-lg mb-2">{formula.formula}</p>
                          <div className="text-sm text-muted-foreground">
                            <strong>Variables:</strong> {formula.variables.join(', ')}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" onClick={() => {
                            setSelectedFormula(formula);
                            setSubject("chemistry");
                            document.querySelector('[data-value="practice"]')?.click();
                          }}>
                            Practice This Formula
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="math" className="space-y-4">
                    {mathFormulas.map(formula => (
                      <Card key={formula.id} className="mb-2">
                        <CardHeader className="py-3">
                          <div className="flex justify-between">
                            <CardTitle className="text-base">{formula.name}</CardTitle>
                            <Badge variant="outline">{formula.difficulty}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="font-mono text-lg mb-2">{formula.formula}</p>
                          <div className="text-sm text-muted-foreground">
                            <strong>Variables:</strong> {formula.variables.join(', ')}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" onClick={() => {
                            setSelectedFormula(formula);
                            setSubject("math");
                            document.querySelector('[data-value="practice"]')?.click();
                          }}>
                            Practice This Formula
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Flashcards Tab */}
          <TabsContent value="flashcards">
            <Card>
              <CardHeader>
                <CardTitle>Formula Flashcards</CardTitle>
                <CardDescription>Quick review format for memorization</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-10 text-muted-foreground">Coming soon! Flashcard mode for formula review.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </TooltipProvider>
    </SharedPageLayout>
  );
};

export default FormulaLabPage;
