
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calculator,
  BookOpen,
  Info,
  CheckCircle,
  ArrowRight,
  BookText
} from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import Latex from "react-latex-next";
import 'katex/dist/katex.min.css';

interface Formula {
  id: string;
  title: string;
  latex: string;
  description: string;
  variables: { symbol: string; name: string; unit: string }[];
  examples: { problem: string; solution: string }[];
  relatedFormulas?: string[];
}

interface FormulaTabContentProps {
  conceptId?: string;
  conceptTitle?: string;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ 
  conceptId = "1", 
  conceptTitle = "Kinematics" 
}) => {
  const [activeTab, setActiveTab] = useState("formulas");
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [practiceProblem, setPracticeProblem] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const formulaLabRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [userSteps, setUserSteps] = useState<string[]>([""]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Sample formulas for demonstration
  const formulas: Formula[] = [
    {
      id: "1",
      title: "Velocity from Displacement and Time",
      latex: "v = \\frac{\\Delta x}{\\Delta t}",
      description: "Average velocity equals displacement divided by time interval.",
      variables: [
        { symbol: "v", name: "velocity", unit: "m/s" },
        { symbol: "\\Delta x", name: "displacement", unit: "m" },
        { symbol: "\\Delta t", name: "time interval", unit: "s" }
      ],
      examples: [
        {
          problem: "A car travels 150 meters in 6 seconds. What is its average velocity?",
          solution: "v = \\frac{\\Delta x}{\\Delta t} = \\frac{150 \\text{ m}}{6 \\text{ s}} = 25 \\text{ m/s}"
        }
      ]
    },
    {
      id: "2",
      title: "Constant Acceleration",
      latex: "v_f = v_i + at",
      description: "Final velocity equals initial velocity plus acceleration times time.",
      variables: [
        { symbol: "v_f", name: "final velocity", unit: "m/s" },
        { symbol: "v_i", name: "initial velocity", unit: "m/s" },
        { symbol: "a", name: "acceleration", unit: "m/s²" },
        { symbol: "t", name: "time", unit: "s" }
      ],
      examples: [
        {
          problem: "A car accelerates uniformly from 10 m/s to 30 m/s in 5 seconds. What is the acceleration?",
          solution: "a = \\frac{v_f - v_i}{t} = \\frac{30 \\text{ m/s} - 10 \\text{ m/s}}{5 \\text{ s}} = 4 \\text{ m/s²}"
        }
      ]
    },
    {
      id: "3",
      title: "Displacement with Constant Acceleration",
      latex: "\\Delta x = v_i t + \\frac{1}{2}at^2",
      description: "Displacement equals initial velocity times time plus one-half acceleration times time squared.",
      variables: [
        { symbol: "\\Delta x", name: "displacement", unit: "m" },
        { symbol: "v_i", name: "initial velocity", unit: "m/s" },
        { symbol: "a", name: "acceleration", unit: "m/s²" },
        { symbol: "t", name: "time", unit: "s" }
      ],
      examples: [
        {
          problem: "A ball is thrown upward with an initial velocity of 20 m/s. How high does it go?",
          solution: "Using the formula for displacement with a = -9.8 m/s² (gravity): \\Delta x = v_i t + \\frac{1}{2}at^2. At the highest point, v_f = 0, so using v_f = v_i + at, we get t = \\frac{v_i}{-a} = \\frac{20 \\text{ m/s}}{9.8 \\text{ m/s²}} = 2.04 \\text{ s}. Then \\Delta x = (20 \\text{ m/s})(2.04 \\text{ s}) + \\frac{1}{2}(-9.8 \\text{ m/s²})(2.04 \\text{ s})^2 = 20.4 \\text{ m}"
        }
      ]
    }
  ];

  const samplePracticeProblems = {
    easy: [
      "A car travels 120 meters in 10 seconds. What is its average velocity?",
      "An object accelerates uniformly from rest to 15 m/s in 5 seconds. What is its acceleration?"
    ],
    medium: [
      "A ball is thrown vertically upward with an initial velocity of 15 m/s. How high does it go?",
      "A car moving at 30 m/s begins to decelerate at a rate of 2 m/s². How far does it travel before stopping?"
    ],
    hard: [
      "A stone is thrown horizontally from the top of a 45m high cliff with a velocity of 12 m/s. How far from the base of the cliff will the stone hit the ground?",
      "A rocket accelerates from rest for 30 seconds and reaches a speed of 600 m/s. It then continues at a constant speed for 60 seconds before decelerating to a stop in 15 seconds. What is the total distance traveled by the rocket?"
    ]
  };

  const hints = [
    "Start by identifying the relevant formula for this problem.",
    "Make sure you have correctly identified the variables given in the problem.",
    "Remember to check your units to ensure consistency.",
    "For multi-step problems, break it down into smaller parts.",
    "Draw a diagram if it helps visualize the problem."
  ];

  const generatePracticeProblem = () => {
    const problems = samplePracticeProblems[selectedDifficulty as keyof typeof samplePracticeProblems];
    const randomIndex = Math.floor(Math.random() * problems.length);
    setPracticeProblem(problems[randomIndex]);
    setUserAnswer("");
    setIsCorrect(null);
    setStep(0);
    setUserSteps([""]);
    setShowHint(false);
    setShowSolution(false);
  };

  const handleSelectFormula = (formula: Formula) => {
    setSelectedFormula(formula);
    setActiveTab("details");
    if (formulaLabRef.current) {
      formulaLabRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextStep = () => {
    if (step < 3) { // Assume 3 steps maximum
      setStep(step + 1);
      setUserSteps([...userSteps, ""]);
    }
  };

  const updateUserStep = (index: number, value: string) => {
    const updatedSteps = [...userSteps];
    updatedSteps[index] = value;
    setUserSteps(updatedSteps);
  };

  const checkAnswer = () => {
    // Simple demo validation
    setIsCorrect(userAnswer.trim().length > 10);
  };

  const goToFormulaLab = () => {
    // Navigate to formula lab page
    if (conceptId) {
      window.location.href = `/dashboard/student/concepts/${conceptId}/formula-lab`;
    }
  };

  return (
    <div ref={formulaLabRef} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">{conceptTitle}: Formulas & Equations</h2>
          <p className="text-muted-foreground">
            Master key formulas and practice applying them
          </p>
        </div>
        <Button 
          onClick={goToFormulaLab} 
          className="flex gap-2 items-center"
        >
          <BookOpen className="h-4 w-4" />
          <span>Open Complete Formula Lab</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="formulas">Formula List</TabsTrigger>
          <TabsTrigger value="details">Formula Details</TabsTrigger>
          <TabsTrigger value="practice">Practice Problems</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="formulas">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {formulas.map(formula => (
              <Card 
                key={formula.id} 
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleSelectFormula(formula)}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{formula.title}</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                    <Latex>{`$${formula.latex}$`}</Latex>
                  </div>
                  <p className="text-sm mt-2 text-muted-foreground">{formula.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details">
          {selectedFormula ? (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{selectedFormula.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-md text-center">
                    <Latex>{`$${selectedFormula.latex}$`}</Latex>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p>{selectedFormula.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Variables</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedFormula.variables.map((variable, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              <Latex>{`$${variable.symbol}$`}</Latex>:
                            </span>
                            <span>{variable.name}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Unit: {variable.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Example</h3>
                    {selectedFormula.examples.map((example, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="mb-2">
                          <Badge variant="outline">Problem</Badge>
                          <p className="mt-1">{example.problem}</p>
                        </div>
                        <div>
                          <Badge variant="success">Solution</Badge>
                          <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <Latex>{`$${example.solution}$`}</Latex>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2">
                    <Button onClick={() => setActiveTab("practice")} className="gap-2">
                      Try Practice Problems <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">
                Select a formula from the list to view its details.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Practice Problems</span>
                <div className="flex items-center gap-2">
                  <Label htmlFor="difficulty" className="text-sm font-normal">Difficulty:</Label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {practiceProblem ? (
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <Badge>Problem</Badge>
                    <p className="mt-2">{practiceProblem}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Step-by-step solution</h3>
                    
                    {userSteps.map((userStep, index) => (
                      <div key={index}>
                        <Label htmlFor={`step-${index}`}>Step {index + 1}</Label>
                        <div className="flex gap-2 mt-1">
                          <Textarea
                            id={`step-${index}`}
                            placeholder={`Enter step ${index + 1}...`}
                            value={userStep}
                            onChange={(e) => updateUserStep(index, e.target.value)}
                            className="flex-1"
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                    
                    {step < 3 && (
                      <Button variant="outline" onClick={handleNextStep} className="gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Add Next Step
                      </Button>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="final-answer">Final Answer</Label>
                    <Textarea
                      id="final-answer"
                      placeholder="Enter your final answer..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button onClick={checkAnswer}>Check Answer</Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowHint(!showHint)}
                    >
                      Show Hint
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowSolution(!showSolution)}
                    >
                      {showSolution ? "Hide Solution" : "Show Solution"}
                    </Button>
                  </div>
                  
                  {isCorrect !== null && (
                    <Alert className={isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                      <div className={`flex items-center ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                        {isCorrect ? (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        ) : (
                          <Info className="h-4 w-4 mr-2" />
                        )}
                        <AlertDescription>
                          {isCorrect ? "Great job! Your answer is correct." : "Your answer needs revision. Try again."}
                        </AlertDescription>
                      </div>
                    </Alert>
                  )}
                  
                  {showHint && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <div className="flex items-center text-blue-700">
                        <Info className="h-4 w-4 mr-2" />
                        <AlertDescription>
                          {hints[Math.floor(Math.random() * hints.length)]}
                        </AlertDescription>
                      </div>
                    </Alert>
                  )}
                  
                  {showSolution && (
                    <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800">
                      <Badge variant="success">Solution</Badge>
                      <div className="mt-3 space-y-2">
                        <p>Step 1: Identify the variables given in the problem.</p>
                        <p>Step 2: Select the appropriate formula based on what we're solving for.</p>
                        <p>Step 3: Substitute the values into the formula.</p>
                        <p>Step 4: Solve the equation to find the answer.</p>
                        <div className="pt-2 font-medium">
                          For this problem, the answer is approximately 25 m/s.
                        </div>
                      </div>
                    </div>
                  )}
                  
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <p className="text-muted-foreground">
                    Generate a practice problem to test your understanding.
                  </p>
                  <Button onClick={generatePracticeProblem}>Generate Problem</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <CardTitle>Formula Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Select Formula</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a formula" />
                    </SelectTrigger>
                    <SelectContent>
                      {formulas.map(formula => (
                        <SelectItem key={formula.id} value={formula.id}>
                          {formula.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800 text-center">
                  <Latex>{"$v = \\frac{\\Delta x}{\\Delta t}$"}</Latex>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="var1">Displacement (Δx)</Label>
                    <div className="flex mt-1">
                      <Input id="var1" placeholder="Enter value" />
                      <Select defaultValue="m">
                        <SelectTrigger className="w-[80px] ml-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m">m</SelectItem>
                          <SelectItem value="km">km</SelectItem>
                          <SelectItem value="cm">cm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="var2">Time (Δt)</Label>
                    <div className="flex mt-1">
                      <Input id="var2" placeholder="Enter value" />
                      <Select defaultValue="s">
                        <SelectTrigger className="w-[80px] ml-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="s">s</SelectItem>
                          <SelectItem value="min">min</SelectItem>
                          <SelectItem value="hr">hr</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">Calculate</Button>
                
                <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                  <span>Result: Velocity (v) = </span>
                  <span className="font-semibold">— m/s</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button asChild variant="outline" className="gap-1">
          <Link to={`/dashboard/student/formula-practice`}>
            <BookText className="h-4 w-4 mr-1" />
            Go to Formula Practice
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FormulaTabContent;
