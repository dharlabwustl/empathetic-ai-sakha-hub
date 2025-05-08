
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  BookOpen, 
  Play, 
  Info, 
  Calculator, 
  ChevronRight, 
  Lightbulb,
  Video, 
  NotebookPen, 
  LineChart, 
  Clock,
  AlertCircle,
  CheckCircle,
  MicIcon,
  RefreshCw,
  ArrowRight
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FormulaPracticeLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [currentStep, setCurrentStep] = useState(1);
  const [difficulty, setDifficulty] = useState('easy');
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState(1);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Mock formula data
  const formula = {
    name: "Ohm's Law",
    subject: "Physics",
    description: "Relates voltage, current, and resistance in an electric circuit.",
    realLifeApplication: "Used in designing electric circuits in household appliances and electronics.",
    tags: ["Electricity", "12th Grade", "NEET", "JEE"],
    latex: "V = I × R",
    variables: [
      { symbol: "V", name: "Voltage", unit: "Volts" },
      { symbol: "I", name: "Current", unit: "Amperes" },
      { symbol: "R", name: "Resistance", unit: "Ohms" }
    ],
    derivation: "Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across the two points. Introducing the constant of proportionality, the resistance, we get I = V/R, which is equivalent to V = I×R.",
    video: "https://example.com/ohms-law-video",
    progress: 65,
    mastered: false,
    attempts: 7,
    averageTime: "1m 45s",
    accuracy: 82
  };

  // Mock problem data
  const problem = {
    question: "A circuit has a resistance of 5 ohms. If a current of 2 amperes flows through it, what is the voltage across the circuit?",
    steps: [
      { id: 1, instruction: "Identify the formula to use", expected: "V = I × R" },
      { id: 2, instruction: "Substitute the known values", expected: "V = 2A × 5Ω" },
      { id: 3, instruction: "Calculate the result", expected: "V = 10V" }
    ],
    solution: "10 Volts",
    hints: [
      "Remember Ohm's Law relates voltage, current, and resistance",
      "Use V = I × R and plug in the values",
      "Multiply 2 amperes by 5 ohms to get your answer"
    ]
  };

  // Handle generation of a new problem
  const handleGenerateProblem = () => {
    setCurrentStep(1);
    setUserAnswer('');
    setIsAnswerCorrect(null);
    setAttemptCount(0);
    setShowSolution(false);
    setShowHint(false);
    setHintLevel(1);
    setIsTimerRunning(true);
    // In a real app, this would call an API to generate a new problem
  };

  // Handle answer validation
  const handleCheckAnswer = () => {
    const correctAnswer = problem.steps[currentStep - 1].expected;
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    setIsAnswerCorrect(isCorrect);
    setAttemptCount(prev => prev + 1);
    
    if (isCorrect && currentStep < problem.steps.length) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setUserAnswer('');
        setIsAnswerCorrect(null);
      }, 1000);
    } else if (isCorrect && currentStep === problem.steps.length) {
      setIsTimerRunning(false);
      // Completed all steps successfully
    }
    
    if (!isCorrect && attemptCount >= 2) {
      setShowHint(true);
    }
  };

  // Handle showing hint
  const handleGetHint = () => {
    setShowHint(true);
    if (hintLevel < 3) {
      setHintLevel(prev => prev + 1);
    }
  };

  // Show full solution after 3 attempts
  const handleShowSolution = () => {
    if (attemptCount >= 2) {
      setShowSolution(true);
    }
  };

  // Reset the current problem and step
  const handleReset = () => {
    setUserAnswer('');
    setIsAnswerCorrect(null);
    setAttemptCount(0);
    setShowHint(false);
    setHintLevel(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{formula.name} - Formula Practice Lab</h1>
          <p className="text-gray-500 mt-1">Master formulas interactively with step-by-step guidance</p>
        </div>
        
        <Button onClick={() => window.history.back()} variant="ghost" className="mt-2 md:mt-0">
          <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
          Back to Formula Tab
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="info" className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Formula Info</span>
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-1">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Practice Lab</span>
              </TabsTrigger>
              <TabsTrigger value="visual" className="flex items-center gap-1">
                <Play className="h-4 w-4" />
                <span className="hidden sm:inline">Visualizer</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                <span className="hidden sm:inline">Progress</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-1">
                <NotebookPen className="h-4 w-4" />
                <span className="hidden sm:inline">Notes</span>
              </TabsTrigger>
            </TabsList>

            {/* Formula Info Tab */}
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{formula.name}</CardTitle>
                      <p className="text-muted-foreground">{formula.subject}</p>
                    </div>
                    <div className="flex gap-2">
                      {formula.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p>{formula.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Real-Life Application</h3>
                    <p className="bg-blue-50 p-3 rounded-md text-blue-800 border border-blue-100">
                      {formula.realLifeApplication}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Formula</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border text-center text-xl font-medium">
                      {formula.latex}
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {formula.variables.map((variable, index) => (
                        <div key={index} className="text-sm bg-gray-100 p-2 rounded">
                          {variable.symbol} = {variable.name} ({variable.unit})
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Derivation</h3>
                    <details className="bg-gray-50 rounded-md">
                      <summary className="cursor-pointer p-3 font-medium">Show Derivation</summary>
                      <div className="p-3 pt-0 border-t">
                        {formula.derivation}
                      </div>
                    </details>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Video Explanation</h3>
                    <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Video className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-gray-600">Video Explainer</p>
                        <Button variant="outline" className="mt-2">
                          <Play className="mr-2 h-4 w-4" />
                          Watch Video
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Practice Lab Tab */}
            <TabsContent value="practice">
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="text-xl">Interactive Practice Lab</CardTitle>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-blue-800">Problem</h3>
                    <p className="mt-1">{problem.question}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <span className="text-sm text-gray-600">Time: {timer}s</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleGenerateProblem}
                      className="text-sm"
                    >
                      <RefreshCw className="mr-1 h-3 w-3" />
                      Generate New Problem
                    </Button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">Step {currentStep} of {problem.steps.length}</h3>
                      <Badge variant={isAnswerCorrect ? "default" : "outline"}>
                        {isAnswerCorrect ? "Correct" : "Pending"}
                      </Badge>
                    </div>
                    <p className="mb-3 text-gray-600">{problem.steps[currentStep - 1].instruction}</p>
                    
                    <div className="flex gap-2 mb-4">
                      <Input 
                        value={userAnswer} 
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Enter your answer..."
                        className={`${isAnswerCorrect === true ? 'border-green-500' : isAnswerCorrect === false ? 'border-red-500' : ''}`}
                      />
                      <Button onClick={handleCheckAnswer} disabled={!userAnswer}>Check</Button>
                    </div>

                    {isAnswerCorrect === false && (
                      <div className="bg-red-50 p-3 rounded-md text-red-800 border border-red-100 mb-4">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">Incorrect answer. Try again!</p>
                            {attemptCount >= 2 && (
                              <p className="text-sm mt-1">Need help? Use the hint button below.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {isAnswerCorrect === true && (
                      <div className="bg-green-50 p-3 rounded-md text-green-800 border border-green-100 mb-4">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">Correct! Well done.</p>
                            {currentStep < problem.steps.length && (
                              <p className="text-sm mt-1">Moving to the next step...</p>
                            )}
                            {currentStep === problem.steps.length && (
                              <p className="text-sm mt-1">You've completed this problem!</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {showHint && (
                      <div className="bg-amber-50 p-3 rounded-md text-amber-800 border border-amber-100 mb-4">
                        <div className="flex items-start">
                          <Lightbulb className="h-5 w-5 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">Hint Level {hintLevel}:</p>
                            <p className="text-sm mt-1">{problem.hints[hintLevel - 1]}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {showSolution && (
                      <div className="bg-blue-50 p-3 rounded-md text-blue-800 border border-blue-100">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium">Solution:</p>
                            <p className="text-sm mt-1">{problem.steps[currentStep - 1].expected}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={handleGetHint} 
                        disabled={hintLevel > 3} 
                        className="text-amber-600 border-amber-200 hover:bg-amber-50"
                      >
                        <Lightbulb className="mr-1 h-4 w-4" />
                        {showHint ? `Next Hint (${hintLevel}/3)` : "Get Hint"}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={handleShowSolution} 
                        disabled={attemptCount < 2} 
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Info className="mr-1 h-4 w-4" />
                        Show Solution
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={handleReset}
                        className="ml-auto"
                      >
                        <RefreshCw className="mr-1 h-4 w-4" />
                        Reset
                      </Button>
                      
                      <Button variant="ghost" className="px-2">
                        <MicIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Visualizer Tab */}
            <TabsContent value="visual">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Formula Visualizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-gray-600">Interactive Visualization</p>
                      <Button variant="outline" className="mt-2">
                        <Play className="mr-2 h-4 w-4" />
                        Start Animation
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">How It Works</h3>
                    <p className="text-gray-600">
                      This visualization demonstrates how voltage (V), current (I), and resistance (R) 
                      relate to each other in an electrical circuit according to Ohm's Law.
                    </p>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-1">Try it yourself:</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Voltage (V): 10V</span>
                          </div>
                          <Slider defaultValue={[10]} max={20} step={1} />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Resistance (R): 5Ω</span>
                          </div>
                          <Slider defaultValue={[5]} max={10} step={0.5} />
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-center font-medium">Current (I) = 2A</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">Mastery Status</h3>
                      <Badge 
                        variant={formula.mastered ? "default" : "outline"}
                        className={formula.mastered ? "bg-green-500" : ""}
                      >
                        {formula.mastered ? "Mastered" : "In Progress"}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Progress value={formula.progress} className="h-2 flex-1 mr-4" />
                      <span className="font-medium">{formula.progress}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold">{formula.attempts}</p>
                          <p className="text-sm text-gray-500 mt-1">Total Attempts</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold">{formula.accuracy}%</p>
                          <p className="text-sm text-gray-500 mt-1">Accuracy</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold">{formula.averageTime}</p>
                          <p className="text-sm text-gray-500 mt-1">Avg. Solve Time</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-amber-500">
                            {formula.progress >= 80 ? "★★★" : formula.progress >= 50 ? "★★☆" : "★☆☆"}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">Proficiency</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Next Steps</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-left" asChild>
                        <a href="/dashboard/student/flashcards">
                          <ChevronRight className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span>Practice with related flashcards</span>
                        </a>
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start text-left" asChild>
                        <a href="/dashboard/student/concepts">
                          <ChevronRight className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span>Study related concept cards</span>
                        </a>
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start text-left" asChild>
                        <a href="/dashboard/student/practice-exam">
                          <ChevronRight className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span>Take a practice test</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg border h-64">
                    <textarea 
                      className="w-full h-full bg-transparent resize-none focus:outline-none" 
                      placeholder="Add your notes here..."
                    ></textarea>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <h3 className="font-semibold">Quick Summary</h3>
                    <div className="space-y-2">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="font-medium">Key Formula: V = I × R</p>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-md">
                        <p className="font-medium">Example:</p>
                        <p className="text-sm mt-1">For a circuit with a resistance of 10 Ω and a current of 2 A, the voltage is V = 2 A × 10 Ω = 20 V.</p>
                      </div>
                      
                      <div className="bg-red-50 p-3 rounded-md">
                        <p className="font-medium">Common Error:</p>
                        <p className="text-sm mt-1">Forgetting to convert units before plugging values into the formula.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Strategy Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <p className="text-sm">Always convert to the same units before using in formula</p>
              </div>
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <p className="text-sm">Remember: Voltage (V) = Current (I) × Resistance (R)</p>
              </div>
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <p className="text-sm">Current (I) = Voltage (V) ÷ Resistance (R)</p>
              </div>
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <p className="text-sm">Resistance (R) = Voltage (V) ÷ Current (I)</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Formulas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-left">
                <div>
                  <p className="font-medium">Power in Electrical Circuits</p>
                  <p className="text-xs text-gray-500 mt-1">P = V × I</p>
                </div>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left">
                <div>
                  <p className="font-medium">Kirchhoff's Voltage Law</p>
                  <p className="text-xs text-gray-500 mt-1">∑V = 0</p>
                </div>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left">
                <div>
                  <p className="font-medium">Resistors in Series</p>
                  <p className="text-xs text-gray-500 mt-1">Rtotal = R₁ + R₂ + ...</p>
                </div>
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-left">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>Electricity Concepts</span>
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left">
                <Video className="h-4 w-4 mr-2" />
                <span>Circuit Tutorials</span>
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left">
                <Calculator className="h-4 w-4 mr-2" />
                <span>Practice Problems</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormulaPracticeLab;
