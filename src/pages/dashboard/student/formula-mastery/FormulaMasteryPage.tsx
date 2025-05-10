
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Calculator, BookOpen, Check, X, HelpCircle, Lightbulb, ArrowRight, ListFilter
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Slider,
} from "@/components/ui/slider";
import { useToast } from '@/hooks/use-toast';

// Mock data for subjects and topics
const subjects = [
  { id: "physics", name: "Physics" },
  { id: "chemistry", name: "Chemistry" },
  { id: "mathematics", name: "Mathematics" }
];

const topicsBySubject = {
  physics: [
    { id: "mechanics", name: "Mechanics" },
    { id: "thermodynamics", name: "Thermodynamics" },
    { id: "electromagnetism", name: "Electromagnetism" },
    { id: "optics", name: "Optics" },
    { id: "modern_physics", name: "Modern Physics" }
  ],
  chemistry: [
    { id: "physical_chemistry", name: "Physical Chemistry" },
    { id: "organic_chemistry", name: "Organic Chemistry" },
    { id: "inorganic_chemistry", name: "Inorganic Chemistry" },
    { id: "biochemistry", name: "Biochemistry" }
  ],
  mathematics: [
    { id: "calculus", name: "Calculus" },
    { id: "algebra", name: "Algebra" },
    { id: "trigonometry", name: "Trigonometry" },
    { id: "statistics", name: "Statistics" },
    { id: "vectors", name: "Vectors" }
  ]
};

const difficultyLevels = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" }
];

// Mock formula problems
const mockProblems = {
  physics: {
    mechanics: [
      {
        id: "p1",
        title: "Calculate Velocity",
        question: "A car accelerates from 10 m/s to 30 m/s in 5 seconds. Calculate the acceleration.",
        formula: "a = (v₂ - v₁) / t",
        variables: { "v₂": 30, "v₁": 10, "t": 5 },
        steps: [
          { description: "Identify the initial velocity (v₁)", equation: "v₁ = 10 m/s" },
          { description: "Identify the final velocity (v₂)", equation: "v₂ = 30 m/s" },
          { description: "Identify the time taken (t)", equation: "t = 5 s" },
          { description: "Apply the formula for acceleration", equation: "a = (v₂ - v₁) / t" },
          { description: "Substitute the values", equation: "a = (30 m/s - 10 m/s) / 5 s" },
          { description: "Calculate the acceleration", equation: "a = 20 m/s / 5 s = 4 m/s²" }
        ],
        answer: "4 m/s²",
        difficulty: "easy",
        hint: "Remember that acceleration is the rate of change of velocity with respect to time."
      },
      {
        id: "p2",
        title: "Calculate Kinetic Energy",
        question: "A 2 kg object moves at 10 m/s. What is its kinetic energy?",
        formula: "KE = (1/2) × m × v²",
        variables: { "m": 2, "v": 10 },
        steps: [
          { description: "Identify the mass (m)", equation: "m = 2 kg" },
          { description: "Identify the velocity (v)", equation: "v = 10 m/s" },
          { description: "Apply the formula for kinetic energy", equation: "KE = (1/2) × m × v²" },
          { description: "Substitute the values", equation: "KE = (1/2) × 2 kg × (10 m/s)²" },
          { description: "Calculate v²", equation: "v² = 10 m/s × 10 m/s = 100 m²/s²" },
          { description: "Calculate the kinetic energy", equation: "KE = (1/2) × 2 kg × 100 m²/s² = 1 × 100 J = 100 J" }
        ],
        answer: "100 J",
        difficulty: "medium",
        hint: "Kinetic energy depends on both mass and the square of velocity."
      },
      {
        id: "p3",
        title: "Calculate Force using Newton's Second Law",
        question: "Calculate the force required to accelerate a 1500 kg car from rest to 27 m/s in 10 seconds.",
        formula: "F = m × a",
        variables: { "m": 1500, "v₁": 0, "v₂": 27, "t": 10 },
        steps: [
          { description: "Identify the mass (m)", equation: "m = 1500 kg" },
          { description: "Calculate the acceleration (a)", equation: "a = (v₂ - v₁) / t" },
          { description: "Substitute values for acceleration", equation: "a = (27 m/s - 0 m/s) / 10 s = 2.7 m/s²" },
          { description: "Apply Newton's Second Law", equation: "F = m × a" },
          { description: "Substitute the values", equation: "F = 1500 kg × 2.7 m/s²" },
          { description: "Calculate the force", equation: "F = 4050 N" }
        ],
        answer: "4050 N",
        difficulty: "hard",
        hint: "First calculate acceleration, then apply F=ma."
      }
    ],
    thermodynamics: [
      // Add thermodynamics problems here
    ]
  }
};

interface Step {
  description: string;
  equation: string;
  userInput?: string;
  isCorrect?: boolean;
}

interface Problem {
  id: string;
  title: string;
  question: string;
  formula: string;
  variables: Record<string, number>;
  steps: Step[];
  answer: string;
  difficulty: string;
  hint: string;
}

const FormulaMasteryPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subject, setSubject] = useState<string>("physics");
  const [topic, setTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string[]>(["easy", "medium", "hard"]);
  const [numQuestions, setNumQuestions] = useState<number>(3);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isGeneratingProblems, setIsGeneratingProblems] = useState<boolean>(false);
  const [hasSolved, setHasSolved] = useState<boolean>(false);

  // Update available topics when subject changes
  useEffect(() => {
    if (subject && topicsBySubject[subject as keyof typeof topicsBySubject]?.length > 0) {
      setTopic(topicsBySubject[subject as keyof typeof topicsBySubject][0].id);
    } else {
      setTopic("");
    }
  }, [subject]);

  // Handle subject change
  const handleSubjectChange = (value: string) => {
    setSubject(value);
    setProblems([]);
    setCurrentProblemIndex(0);
    setCurrentStep(0);
    setUserAnswers([]);
    setShowAnswer(false);
    setHasSolved(false);
  };

  // Handle topic change
  const handleTopicChange = (value: string) => {
    setTopic(value);
    setProblems([]);
    setCurrentProblemIndex(0);
    setCurrentStep(0);
    setUserAnswers([]);
    setShowAnswer(false);
    setHasSolved(false);
  };

  // Handle difficulty change
  const handleDifficultyChange = (value: string) => {
    if (difficulty.includes(value)) {
      setDifficulty(difficulty.filter(d => d !== value));
    } else {
      setDifficulty([...difficulty, value]);
    }
  };

  // Generate problems
  const generateProblems = () => {
    setIsGeneratingProblems(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filteredProblems: Problem[] = [];
      
      // Get problems for the selected subject and topic
      if (mockProblems[subject as keyof typeof mockProblems] && 
          mockProblems[subject as keyof typeof mockProblems][topic as keyof typeof mockProblems.physics]) {
        filteredProblems = mockProblems[subject as keyof typeof mockProblems][topic as keyof typeof mockProblems.physics]
          .filter(p => difficulty.includes(p.difficulty))
          .slice(0, numQuestions);
      }
      
      // Initialize user answers array
      setUserAnswers(new Array(filteredProblems.length).fill(""));
      
      setProblems(filteredProblems);
      setCurrentProblemIndex(0);
      setCurrentStep(0);
      setShowAnswer(false);
      setHasSolved(false);
      setIsGeneratingProblems(false);
      
      toast({
        title: "Problems Generated",
        description: `${filteredProblems.length} ${filteredProblems.length === 1 ? 'problem' : 'problems'} generated for practice.`,
      });
    }, 1000);
  };

  // Get current problem
  const currentProblem = problems[currentProblemIndex];

  // Check step answer
  const checkStepAnswer = (input: string, stepIndex: number) => {
    if (!currentProblem) return;
    
    // Create a copy of the problems array to update the current problem's step
    const updatedProblems = [...problems];
    const stepAnswer = updatedProblems[currentProblemIndex].steps[stepIndex].equation.replace(/\s/g, '').toLowerCase();
    const userInput = input.replace(/\s/g, '').toLowerCase();
    
    // Update the step with user's input and whether it's correct
    updatedProblems[currentProblemIndex].steps[stepIndex].userInput = input;
    updatedProblems[currentProblemIndex].steps[stepIndex].isCorrect = userInput === stepAnswer;
    
    setProblems(updatedProblems);
    
    // If correct, move to the next step
    if (userInput === stepAnswer) {
      if (stepIndex < currentProblem.steps.length - 1) {
        setCurrentStep(stepIndex + 1);
        toast({
          title: "Correct!",
          description: "Moving to the next step.",
        });
      } else {
        // All steps completed
        setHasSolved(true);
        toast({
          title: "Problem Solved!",
          description: "You've successfully solved the problem.",
        });
      }
    } else {
      toast({
        title: "Not quite right",
        description: "Try again or check the hint for help.",
        variant: "destructive"
      });
    }
  };

  // Function to reset the current problem
  const resetProblem = () => {
    const updatedProblems = [...problems];
    updatedProblems[currentProblemIndex].steps.forEach(step => {
      delete step.userInput;
      delete step.isCorrect;
    });
    
    setProblems(updatedProblems);
    setCurrentStep(0);
    setShowAnswer(false);
    setShowHint(false);
    setHasSolved(false);
  };

  // Navigate to previous or next problem
  const goToProblem = (index: number) => {
    if (index >= 0 && index < problems.length) {
      setCurrentProblemIndex(index);
      setCurrentStep(0);
      setShowAnswer(false);
      setShowHint(false);
      setHasSolved(false);
    }
  };

  // Check if there are no problems available
  const noProblemsAvailable = problems.length === 0;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard/student')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </TooltipTrigger>
            <TooltipContent>Return to dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <h1 className="text-2xl font-bold flex items-center">
          <Calculator className="mr-2 h-6 w-6 text-blue-600" />
          Formula Mastery
        </h1>
        
        <div className="w-[120px]">
          {/* Placeholder for balance */}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - Problem generator */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
              Problem Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={handleSubjectChange}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subj => (
                    <SelectItem key={subj.id} value={subj.id}>{subj.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Select value={topic} onValueChange={handleTopicChange}>
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topicsBySubject[subject as keyof typeof topicsBySubject]?.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <div className="flex flex-wrap gap-2">
                {difficultyLevels.map(level => (
                  <TooltipProvider key={level.value}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={difficulty.includes(level.value) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleDifficultyChange(level.value)}
                          className={difficulty.includes(level.value) ? 
                            level.value === "easy" ? "bg-green-600" : 
                            level.value === "medium" ? "bg-amber-600" : 
                            "bg-red-600" : ""}
                        >
                          {level.label}
                          {difficulty.includes(level.value) && <Check className="ml-1 h-3 w-3" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{`${level.label} difficulty problems`}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="num-questions">Number of Problems: {numQuestions}</Label>
              </div>
              <Slider 
                id="num-questions"
                value={[numQuestions]} 
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => setNumQuestions(value[0])}
              />
            </div>
            
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              onClick={generateProblems}
              disabled={isGeneratingProblems || !subject || !topic || difficulty.length === 0}
            >
              {isGeneratingProblems ? 
                "Generating..." : 
                `Generate ${numQuestions} Problem${numQuestions !== 1 ? 's' : ''}`}
            </Button>
          </CardContent>
        </Card>
        
        {/* Main content - Problems */}
        <Card className="lg:col-span-2">
          {noProblemsAvailable ? (
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Calculator className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Problems Generated Yet</h3>
              <p className="text-gray-500 mb-6">
                Select a subject, topic, and difficulty level, then click "Generate Problems" to start practicing.
              </p>
            </CardContent>
          ) : (
            <>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  Problem {currentProblemIndex + 1} of {problems.length}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowAnswer(!showAnswer)}
                        >
                          {showAnswer ? "Hide Answer" : "Show Answer"}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{showAnswer ? "Hide the full solution" : "View the full solution"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={resetProblem}
                        >
                          Reset
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Start over with this problem</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Problem information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={
                      currentProblem?.difficulty === "easy" ? "bg-green-50 text-green-700 border-green-200" : 
                      currentProblem?.difficulty === "medium" ? "bg-amber-50 text-amber-700 border-amber-200" : 
                      "bg-red-50 text-red-700 border-red-200"
                    }>
                      {currentProblem?.difficulty.charAt(0).toUpperCase() + currentProblem?.difficulty.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {topics.find(t => t.id === topic)?.name || topic}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold">{currentProblem?.title}</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <p>{currentProblem?.question}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="font-semibold">Formula:</span>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-sm font-mono p-2">
                      {currentProblem?.formula}
                    </Badge>
                  </div>
                  
                  <div>
                    <span className="font-semibold mb-2 block">Variables:</span>
                    <div className="flex flex-wrap gap-2">
                      {currentProblem?.variables && Object.entries(currentProblem.variables).map(([key, value]) => (
                        <Badge key={key} variant="outline" className="bg-blue-50 text-blue-700">
                          {key} = {value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Step by step solution */}
                <div className="space-y-6">
                  <h4 className="font-semibold">Step-by-Step Solution:</h4>
                  
                  {showAnswer ? (
                    // Show all steps with full solutions
                    <div className="space-y-4">
                      {currentProblem?.steps.map((step, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          <p className="mb-2 font-medium">Step {index + 1}: {step.description}</p>
                          <p className="font-mono bg-white dark:bg-gray-900 p-2 rounded border">{step.equation}</p>
                        </div>
                      ))}
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                        <p className="font-semibold">Final Answer: {currentProblem?.answer}</p>
                      </div>
                    </div>
                  ) : (
                    // Interactive step-by-step mode
                    <div className="space-y-4">
                      {currentProblem?.steps.map((step, index) => {
                        // Show completed steps
                        if (index < currentStep) {
                          return (
                            <div key={index} className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                              <p className="mb-2 font-medium">Step {index + 1}: {step.description}</p>
                              <p className="font-mono bg-white dark:bg-gray-900 p-2 rounded border flex items-center">
                                {step.equation}
                                <Check className="ml-2 h-4 w-4 text-green-500" />
                              </p>
                            </div>
                          );
                        }
                        
                        // Show current step
                        if (index === currentStep && !hasSolved) {
                          return (
                            <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                              <p className="mb-3 font-medium">Step {index + 1}: {step.description}</p>
                              <div className="space-y-2">
                                <Textarea 
                                  placeholder="Enter your answer for this step..."
                                  value={step.userInput || ""}
                                  onChange={(e) => {
                                    const updatedProblems = [...problems];
                                    updatedProblems[currentProblemIndex].steps[index].userInput = e.target.value;
                                    setProblems(updatedProblems);
                                  }}
                                  className="font-mono"
                                />
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    onClick={() => checkStepAnswer(step.userInput || "", index)}
                                    disabled={!step.userInput}
                                  >
                                    Check Answer
                                  </Button>
                                  <Dialog>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <DialogTrigger asChild>
                                            <Button size="sm" variant="outline">
                                              <HelpCircle className="h-4 w-4 mr-1" />
                                              Hint
                                            </Button>
                                          </DialogTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>Get a hint for this step</TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Hint for Step {index + 1}</DialogTitle>
                                      </DialogHeader>
                                      <div className="py-4">
                                        <p className="text-sm">{index === 0 ? currentProblem?.hint : `Think about how to ${step.description.toLowerCase()}.`}</p>
                                      </div>
                                      <DialogFooter>
                                        <Button variant="default" type="submit">Close</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        
                        // Hide future steps
                        return (
                          <div key={index} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md opacity-60">
                            <p className="font-medium">Step {index + 1}: {step.description}</p>
                            <p className="text-sm text-gray-500">Complete previous steps first</p>
                          </div>
                        );
                      })}
                      
                      {/* Show answer when all steps are completed */}
                      {hasSolved && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                          <p className="font-semibold">Final Answer: {currentProblem?.answer}</p>
                          <p className="text-sm text-green-600 mt-2">Great job! You've solved this problem correctly.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => goToProblem(currentProblemIndex - 1)}
                  disabled={currentProblemIndex === 0}
                >
                  Previous Problem
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => goToProblem(currentProblemIndex + 1)}
                  disabled={currentProblemIndex === problems.length - 1}
                >
                  Next Problem
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FormulaMasteryPage;
