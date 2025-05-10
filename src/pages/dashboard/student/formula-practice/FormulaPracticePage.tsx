
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, ChevronRight, FileText, HelpCircle, 
  Upload, Check, X, AlertCircle, ArrowLeft, ArrowRight, BookOpen
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';

// Types
type FormulaQuestion = {
  id: string;
  title: string;
  formulaName: string;
  formulaDisplay: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  answer: string;
  steps: {
    id: string;
    text: string;
    hint: string;
    solution: string;
  }[];
  relatedFormulas?: string[];
  imageUrl?: string;
  examPattern: string;
  subject: string;
  topic: string;
};

type Subject = {
  id: string;
  name: string;
  examGoalId: string;
  hasFormulas: boolean;
  topics: {
    id: string;
    name: string;
    formulaCount: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
};

// Mock Data Service
const getSubjectsByExamGoal = (examGoalId: string): Subject[] => {
  // This would normally be an API call
  return [
    {
      id: "phys-101",
      name: "Physics",
      examGoalId: "NEET",
      hasFormulas: true,
      topics: [
        { id: "phys-mech", name: "Mechanics", formulaCount: 25, difficulty: "medium" },
        { id: "phys-elec", name: "Electricity", formulaCount: 18, difficulty: "hard" },
        { id: "phys-opt", name: "Optics", formulaCount: 12, difficulty: "easy" },
      ]
    },
    {
      id: "chem-101",
      name: "Chemistry",
      examGoalId: "NEET",
      hasFormulas: true,
      topics: [
        { id: "chem-phys", name: "Physical Chemistry", formulaCount: 22, difficulty: "medium" },
        { id: "chem-org", name: "Organic Chemistry", formulaCount: 15, difficulty: "hard" },
        { id: "chem-inorg", name: "Inorganic Chemistry", formulaCount: 10, difficulty: "medium" },
      ]
    },
    {
      id: "math-101",
      name: "Mathematics",
      examGoalId: "JEE",
      hasFormulas: true,
      topics: [
        { id: "math-calc", name: "Calculus", formulaCount: 30, difficulty: "hard" },
        { id: "math-alg", name: "Algebra", formulaCount: 25, difficulty: "medium" },
        { id: "math-geom", name: "Geometry", formulaCount: 20, difficulty: "easy" },
      ]
    },
  ];
};

const generateQuestions = (topicId: string, difficulty: string, count: number): FormulaQuestion[] => {
  // This would be an API call in a real application
  const questions: FormulaQuestion[] = [];
  const difficulties = ['easy', 'medium', 'hard'] as const;
  
  for (let i = 0; i < count; i++) {
    const subject = topicId.split('-')[0];
    const topic = topicId.split('-')[1];
    
    let formula = '';
    let formulaDisplay = '';
    let questionText = '';
    
    if (subject === 'phys') {
      if (topic === 'mech') {
        formula = 'F = ma';
        formulaDisplay = 'F = ma';
        questionText = `A ${Math.floor(Math.random() * 10) + 1}kg object experiences a force of ${Math.floor(Math.random() * 50) + 10}N. Calculate its acceleration.`;
      } else if (topic === 'elec') {
        formula = 'V = IR';
        formulaDisplay = 'V = IR';
        questionText = `If the current flowing through a resistor is ${Math.floor(Math.random() * 10) + 1}A and the resistance is ${Math.floor(Math.random() * 100) + 10}Ω, what is the voltage?`;
      }
    } else if (subject === 'chem') {
      formula = 'PV = nRT';
      formulaDisplay = 'PV = nRT';
      questionText = `A gas occupies ${Math.floor(Math.random() * 10) + 1}L at a pressure of ${Math.floor(Math.random() * 5) + 1}atm. If the temperature is ${Math.floor(Math.random() * 50) + 273}K and R = 0.082 L·atm/(mol·K), how many moles of gas are present?`;
    } else if (subject === 'math') {
      formula = 'a² + b² = c²';
      formulaDisplay = 'a² + b² = c²';
      questionText = `In a right triangle, if one leg is ${Math.floor(Math.random() * 10) + 3} units and the other is ${Math.floor(Math.random() * 10) + 3} units, what is the length of the hypotenuse?`;
    }
    
    questions.push({
      id: `q-${i}`,
      title: `Question ${i + 1}`,
      formulaName: formula,
      formulaDisplay: formulaDisplay,
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      question: questionText,
      answer: "Calculated answer will be shown here",
      steps: [
        {
          id: `step-${i}-1`,
          text: "Identify the variables in the problem",
          hint: "Look for numerical values and what they represent in the formula",
          solution: "Variables identified correctly"
        },
        {
          id: `step-${i}-2`,
          text: "Apply the formula correctly",
          hint: `Substitute the values into the formula: ${formula}`,
          solution: "Formula applied correctly with proper substitution"
        },
        {
          id: `step-${i}-3`,
          text: "Calculate the final answer",
          hint: "Make sure units are consistent and perform the calculation",
          solution: "Calculation completed correctly"
        }
      ],
      examPattern: difficulty === 'easy' ? 'Fundamental concept' : (difficulty === 'medium' ? 'Standard exam question' : 'Advanced problem'),
      subject: subject === 'phys' ? 'Physics' : (subject === 'chem' ? 'Chemistry' : 'Mathematics'),
      topic: topic === 'mech' ? 'Mechanics' : (topic === 'elec' ? 'Electricity' : (topic === 'calc' ? 'Calculus' : 'Other'))
    });
  }
  
  return questions;
};

// Main Component
const FormulaPracticePage: React.FC = () => {
  const { examGoalId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("medium");
  const [questionCount, setQuestionCount] = useState<number>(5);
  
  const [questions, setQuestions] = useState<FormulaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string[]}>({});
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [calculatorValue, setCalculatorValue] = useState<string>("");
  const [showUploadDialog, setShowUploadDialog] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // Load subjects based on exam goal
  useEffect(() => {
    if (examGoalId) {
      const subjectsData = getSubjectsByExamGoal(examGoalId);
      setSubjects(subjectsData.filter(subject => subject.hasFormulas));
      
      if (subjectsData.length > 0) {
        setSelectedSubject(subjectsData[0].id);
      }
    }
  }, [examGoalId]);
  
  // Update topic when subject changes
  useEffect(() => {
    if (selectedSubject) {
      const subject = subjects.find(s => s.id === selectedSubject);
      if (subject && subject.topics.length > 0) {
        setSelectedTopic(subject.topics[0].id);
      }
    }
  }, [selectedSubject, subjects]);
  
  const handleGenerateQuestions = () => {
    if (!selectedTopic || !selectedDifficulty) {
      toast({
        title: "Selection required",
        description: "Please select a topic and difficulty level",
        variant: "destructive",
      });
      return;
    }
    
    const generatedQuestions = generateQuestions(
      selectedTopic,
      selectedDifficulty,
      questionCount
    );
    
    setQuestions(generatedQuestions);
    setCurrentQuestionIndex(0);
    setCurrentStepIndex(0);
    setUserAnswers({});
    
    toast({
      title: "Questions Generated",
      description: `${generatedQuestions.length} ${selectedDifficulty} questions generated for your practice`,
    });
  };
  
  const handleAnswerSubmission = (questionId: string, stepId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [`${questionId}-${stepId}`]: [...(prev[`${questionId}-${stepId}`] || []), answer]
    }));
    
    // For demo purposes, let's consider the answer correct and move to the next step
    if (currentStepIndex < getCurrentQuestion()?.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      toast({
        title: "Question completed!",
        description: "You've completed all steps for this question.",
      });
    }
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0]);
    }
  };
  
  const handleSubmitFile = () => {
    if (uploadedFile) {
      toast({
        title: "File submitted",
        description: "Your answer is being processed and will be evaluated shortly.",
      });
      setShowUploadDialog(false);
      // In a real app, you would upload the file to a server for processing
    }
  };
  
  const getCurrentQuestion = (): FormulaQuestion | undefined => {
    return questions[currentQuestionIndex];
  };
  
  const getCurrentStep = () => {
    const question = getCurrentQuestion();
    return question ? question.steps[currentStepIndex] : null;
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentStepIndex(0);
    } else {
      toast({
        title: "Practice complete!",
        description: "You've completed all questions in this set.",
      });
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentStepIndex(0);
    }
  };
  
  const calculateResult = () => {
    try {
      // Simple calculator functionality - in a real app, use a proper evaluator
      const result = eval(calculatorValue);
      setCalculatorValue(result.toString());
    } catch (error) {
      setCalculatorValue("Error");
    }
  };
  
  return (
    <div className="container mx-auto p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <Button 
              variant="ghost" 
              className="mb-2" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Formula Practice Lab</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Master formulas through guided practice and step-by-step solutions
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setIsCalculatorOpen(true)}
                  >
                    <Calculator className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open Calculator</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setShowUploadDialog(true)}
                  >
                    <Upload className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload Written Solution</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => window.print()}
                  >
                    <FileText className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Print Questions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                Select Subject
              </CardTitle>
              <CardDescription>Choose from formula-based subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Available Subjects</SelectLabel>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Select Topic
              </CardTitle>
              <CardDescription>Choose a specific formula topic</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Available Topics</SelectLabel>
                    {subjects
                      .find(s => s.id === selectedSubject)
                      ?.topics.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id}>
                          {topic.name} ({topic.formulaCount} formulas)
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-purple-600" />
                Difficulty & Count
              </CardTitle>
              <CardDescription>Set practice parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Questions:</span>
                <Select 
                  value={questionCount.toString()} 
                  onValueChange={(val) => setQuestionCount(parseInt(val))}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mb-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium px-8 py-6"
            onClick={handleGenerateQuestions}
          >
            Generate Practice Questions <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    {getCurrentQuestion()?.title} - {getCurrentQuestion()?.formulaName}
                  </CardTitle>
                  <CardDescription>
                    {getCurrentQuestion()?.subject} - {getCurrentQuestion()?.topic}
                  </CardDescription>
                </div>
                <Badge variant={
                  getCurrentQuestion()?.difficulty === 'easy' ? 'outline' :
                  (getCurrentQuestion()?.difficulty === 'medium' ? 'secondary' : 'destructive')
                }>
                  {getCurrentQuestion()?.difficulty}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-2">Formula</h3>
                  <div className="p-2 text-center text-xl font-mono">
                    {getCurrentQuestion()?.formulaDisplay}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-2">Problem Statement</h3>
                  <p>{getCurrentQuestion()?.question}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Step-by-Step Solution</h3>
                  <div className="space-y-4">
                    {getCurrentQuestion()?.steps.map((step, index) => (
                      <div 
                        key={step.id}
                        className={`border border-gray-200 dark:border-gray-700 rounded-lg ${
                          index === currentStepIndex ? 'bg-blue-50 dark:bg-blue-900/10' : 
                          index < currentStepIndex ? 'bg-green-50 dark:bg-green-900/10' : 
                          'bg-white dark:bg-gray-800'
                        }`}
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Step {index + 1}: {step.text}</h4>
                            {index < currentStepIndex && (
                              <Badge className="bg-green-500">
                                <Check className="h-3 w-3 mr-1" /> Completed
                              </Badge>
                            )}
                          </div>
                          
                          {index <= currentStepIndex && (
                            <div className="mt-4">
                              <div className="flex gap-2 mb-4">
                                <Input 
                                  placeholder="Enter your solution for this step"
                                  disabled={index < currentStepIndex}
                                  className="flex-grow"
                                />
                                <Button 
                                  onClick={() => handleAnswerSubmission(getCurrentQuestion()!.id, step.id, "User answer")}
                                  disabled={index < currentStepIndex}
                                >
                                  <Check className="h-4 w-4 mr-2" /> Submit
                                </Button>
                                
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline">
                                        <HelpCircle className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{step.hint}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              
                              {index < currentStepIndex && (
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-sm">
                                  <p><span className="font-semibold">Your answer:</span> {userAnswers[`${getCurrentQuestion()!.id}-${step.id}`]?.[0] || "Not provided"}</p>
                                  <p className="mt-1"><span className="font-semibold">Correct solution:</span> {step.solution}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" /> View Solution
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Complete Solution</DialogTitle>
                        <DialogDescription>
                          Here's the step-by-step solution for this problem
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 my-4">
                        {getCurrentQuestion()?.steps.map((step, index) => (
                          <div key={step.id} className="border border-gray-200 dark:border-gray-700 p-3 rounded-lg">
                            <h4 className="font-medium mb-2">Step {index + 1}: {step.text}</h4>
                            <p className="text-gray-700 dark:text-gray-300">{step.solution}</p>
                          </div>
                        ))}
                        
                        <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800">
                          <h4 className="font-medium mb-2 text-green-700 dark:text-green-400">Final Answer</h4>
                          <p className="font-mono">{getCurrentQuestion()?.answer}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button onClick={handleNextQuestion}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Progress</h3>
              <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Question {currentQuestionIndex + 1}</span>
                <span>of {questions.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Calculator Dialog */}
      <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Calculator</DialogTitle>
            <DialogDescription>
              Perform calculations for your formula practice
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Input
              value={calculatorValue}
              onChange={(e) => setCalculatorValue(e.target.value)}
              className="text-xl font-mono text-right"
            />
            
            <div className="grid grid-cols-4 gap-2">
              {['7', '8', '9', '/'].map(key => (
                <Button 
                  key={key} 
                  variant="outline" 
                  onClick={() => setCalculatorValue(prev => prev + key)}
                >
                  {key}
                </Button>
              ))}
              
              {['4', '5', '6', '*'].map(key => (
                <Button 
                  key={key} 
                  variant="outline" 
                  onClick={() => setCalculatorValue(prev => prev + key)}
                >
                  {key}
                </Button>
              ))}
              
              {['1', '2', '3', '-'].map(key => (
                <Button 
                  key={key} 
                  variant="outline" 
                  onClick={() => setCalculatorValue(prev => prev + key)}
                >
                  {key}
                </Button>
              ))}
              
              {['0', '.', '=', '+'].map(key => (
                <Button 
                  key={key} 
                  variant="outline" 
                  onClick={() => key === '=' ? calculateResult() : setCalculatorValue(prev => prev + key)}
                >
                  {key}
                </Button>
              ))}
              
              <Button 
                variant="destructive"
                className="col-span-2"
                onClick={() => setCalculatorValue("")}
              >
                Clear
              </Button>
              
              <Button 
                variant="outline"
                className="col-span-2"
                onClick={() => setCalculatorValue(prev => prev.slice(0, -1))}
              >
                Backspace
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsCalculatorOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* File Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Written Solution</DialogTitle>
            <DialogDescription>
              Upload your handwritten solution or a PDF file for evaluation
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Click to upload or drag and drop your solution
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG, PDF up to 10MB
              </p>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".png,.jpg,.jpeg,.pdf"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="mt-4" variant="outline">
                  Select File
                </Button>
              </label>
            </div>
            
            {uploadedFile && (
              <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg flex justify-between items-center">
                <span className="text-sm font-medium">
                  {uploadedFile.name}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setUploadedFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitFile} disabled={!uploadedFile}>Submit for Evaluation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormulaPracticePage;
