
import React, { useState, useRef } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Calculator, CheckCircle2, Upload, List, ArrowRight, ArrowLeft, Eye, ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Step {
  description: string;
  formula?: string;
  result?: string | number;
}

const FormulaLabPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [solutionSteps, setSolutionSteps] = useState<Step[]>([]);
  const [questionsGenerated, setQuestionsGenerated] = useState<boolean>(false);
  
  // Mock concept data (in a real app, this would be fetched based on conceptId)
  const concept = {
    id: conceptId,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Mechanics",
    formulas: [
      {
        id: "newton-second",
        name: "Newton's Second Law",
        formula: "F = m × a",
        variables: {
          F: { name: "Force", unit: "N" },
          m: { name: "Mass", unit: "kg" },
          a: { name: "Acceleration", unit: "m/s²" }
        }
      },
      {
        id: "kinetic-energy",
        name: "Kinetic Energy",
        formula: "KE = 0.5 × m × v²",
        variables: {
          KE: { name: "Kinetic Energy", unit: "J" },
          m: { name: "Mass", unit: "kg" },
          v: { name: "Velocity", unit: "m/s" }
        }
      }
    ]
  };

  // Mock questions for Newton's second law
  const questions = [
    {
      id: 1,
      text: "A box with a mass of 25 kg is accelerating at 2 m/s². Calculate the force acting on it.",
      answer: "50",
      unit: "N",
      steps: [
        { description: "Start with Newton's Second Law of Motion:", formula: "F = m × a" },
        { description: "Substitute the given values:", formula: "F = 25 kg × 2 m/s²" },
        { description: "Calculate the force:", formula: "F = 50 N", result: 50 }
      ]
    },
    {
      id: 2,
      text: "A force of 120 N is applied to a car with a mass of 1500 kg. What will be its acceleration?",
      answer: "0.08",
      unit: "m/s²",
      steps: [
        { description: "Start with Newton's Second Law of Motion:", formula: "F = m × a" },
        { description: "Rearrange the formula to solve for acceleration:", formula: "a = F / m" },
        { description: "Substitute the given values:", formula: "a = 120 N / 1500 kg" },
        { description: "Calculate the acceleration:", formula: "a = 0.08 m/s²", result: 0.08 }
      ]
    },
    {
      id: 3,
      text: "A ball with a mass of 0.5 kg experiences an acceleration of 9.8 m/s². What force is acting on the ball?",
      answer: "4.9",
      unit: "N",
      steps: [
        { description: "Start with Newton's Second Law of Motion:", formula: "F = m × a" },
        { description: "Substitute the given values:", formula: "F = 0.5 kg × 9.8 m/s²" },
        { description: "Calculate the force:", formula: "F = 4.9 N", result: 4.9 }
      ]
    }
  ];
  
  // Handle answer checking
  const checkAnswer = () => {
    // Clean up user answer to remove spaces and handle formatting
    const cleanAnswer = userAnswer.replace(/\s+/g, '');
    const correctAnswerStr = String(questions[currentQuestionIndex].answer);
    
    const isCorrect = cleanAnswer === correctAnswerStr;
    
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Your answer matches the correct solution.",
        variant: "success"
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Your answer doesn't match the expected result. Try again or view the solution.",
        variant: "warning"
      });
    }
  };
  
  // Handle generating questions
  const generateQuestions = () => {
    setQuestionsGenerated(true);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setShowAnswer(false);
    setShowSteps(false);
    setSolutionSteps([]);
    
    toast({
      title: "Questions Generated",
      description: `${questionCount} ${difficulty} questions have been prepared for you.`,
    });
  };
  
  // Navigation between questions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setShowAnswer(false);
      setShowSteps(false);
      setSolutionSteps([]);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserAnswer('');
      setShowAnswer(false);
      setShowSteps(false);
      setSolutionSteps([]);
    }
  };
  
  // Handle showing solution
  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
    if (!showSteps && !showAnswer) {
      setSolutionSteps(questions[currentQuestionIndex].steps);
      setShowSteps(true);
    }
  };
  
  // Handle step-by-step solution
  const showNextStep = () => {
    const allSteps = questions[currentQuestionIndex].steps;
    if (!showSteps) {
      setShowSteps(true);
      setSolutionSteps([allSteps[0]]);
    } else if (solutionSteps.length < allSteps.length) {
      setSolutionSteps(allSteps.slice(0, solutionSteps.length + 1));
    }
  };
  
  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    toast({
      title: "File uploaded",
      description: `"${file.name}" has been uploaded for answer verification.`,
    });
    
    // In a real app, this would process the file
    setTimeout(() => {
      toast({
        title: "Answer verification",
        description: `The answer in your document matches the expected solution.`,
        variant: "success"
      });
    }, 1500);
  };
  
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  // Handle back navigation
  const handleGoBack = () => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  return (
    <SharedPageLayout 
      title={`Formula Lab: ${concept.title}`} 
      subtitle={`Interactive practice with formulas and concepts from ${concept.subject}`}
    >
      <Button
        variant="outline"
        size="sm"
        className="mb-4 flex items-center gap-1"
        onClick={handleGoBack}
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Concept</span>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <span>Formula Lab Settings</span>
              </CardTitle>
              <CardDescription>Customize your formula practice session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Formula selection */}
              <div className="space-y-2">
                <Label htmlFor="formula">Formula</Label>
                <Select defaultValue={concept.formulas[0].id}>
                  <SelectTrigger id="formula">
                    <SelectValue placeholder="Select a formula" />
                  </SelectTrigger>
                  <SelectContent>
                    {concept.formulas.map(formula => (
                      <SelectItem key={formula.id} value={formula.id}>
                        {formula.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Difficulty selection */}
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Tabs defaultValue="medium" value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)}>
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="easy">Easy</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="hard">Hard</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Number of questions */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="questions">Number of Questions</Label>
                  <span className="text-sm">{questionCount}</span>
                </div>
                <Slider 
                  id="questions" 
                  min={1} 
                  max={10} 
                  step={1} 
                  value={[questionCount]} 
                  onValueChange={(vals) => setQuestionCount(vals[0])}
                />
              </div>
              
              <Button 
                onClick={generateQuestions} 
                className="w-full"
              >
                Generate Questions
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{concept.formulas[0].name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge className="bg-blue-600 text-white">Formula</Badge>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-md">
                <p className="text-xl font-semibold text-center">{concept.formulas[0].formula}</p>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Variables:</h4>
                <ul className="space-y-1">
                  {Object.entries(concept.formulas[0].variables).map(([symbol, {name, unit}]) => (
                    <li key={symbol} className="text-sm flex justify-between">
                      <span className="font-medium">{symbol}</span>
                      <span className="text-muted-foreground">{name} [{unit}]</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {questionsGenerated ? (
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </CardTitle>
                  <Badge variant={difficulty === 'easy' ? 'success' : difficulty === 'medium' ? 'warning' : 'destructive'}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question */}
                <div className="bg-muted/30 p-4 rounded-md">
                  <p className="text-lg">{questions[currentQuestionIndex].text}</p>
                </div>
                
                {/* Formula reminder */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Formula:</span>
                  <span className="font-mono bg-muted px-2 py-0.5 rounded">{concept.formulas[0].formula}</span>
                </div>
                
                {/* User answer input */}
                <div className="space-y-2">
                  <Label htmlFor="answer">Your Answer</Label>
                  <div className="flex gap-2">
                    <Input
                      id="answer"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder={`Enter your answer in ${questions[currentQuestionIndex].unit}`}
                      className="flex-1"
                    />
                    <Button onClick={checkAnswer} variant="outline">
                      Check
                    </Button>
                  </div>
                </div>
                
                {/* Answer and solution */}
                <div className="space-y-4">
                  {showAnswer && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <h4 className="font-semibold">Correct Answer:</h4>
                      </div>
                      <p className="text-lg font-semibold">
                        {questions[currentQuestionIndex].answer} {questions[currentQuestionIndex].unit}
                      </p>
                    </div>
                  )}
                  
                  {/* Step-by-step solution */}
                  {showSteps && solutionSteps.length > 0 && (
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted p-3 flex items-center justify-between">
                        <h4 className="font-medium">Solution Steps</h4>
                        <Badge variant="outline">{solutionSteps.length} of {questions[currentQuestionIndex].steps.length}</Badge>
                      </div>
                      <div className="p-4 space-y-3">
                        {solutionSteps.map((step, index) => (
                          <div key={index} className="flex gap-3 items-start">
                            <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-800">
                              {index + 1}
                            </div>
                            <div>
                              <p>{step.description}</p>
                              {step.formula && (
                                <div className="mt-1 p-2 bg-muted/50 rounded font-mono">
                                  {step.formula}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={toggleShowAnswer} className="flex gap-1 items-center">
                      <Eye className="h-4 w-4" />
                      {showAnswer ? "Hide Answer" : "Show Answer"}
                    </Button>
                    <Button variant="outline" onClick={showNextStep} className="flex gap-1 items-center">
                      <List className="h-4 w-4" />
                      {!showSteps ? "Show Steps" : "Next Step"}
                    </Button>
                  </div>
                  
                  <div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      onChange={handleFileUpload} 
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                    <Button variant="outline" onClick={triggerFileUpload} className="flex gap-1 items-center">
                      <Upload className="h-4 w-4" />
                      Upload Answer
                    </Button>
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={goToNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="flex items-center"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-2 h-[400px] flex items-center justify-center">
              <div className="text-center p-6">
                <Calculator className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Formula Practice Lab</h3>
                <p className="text-muted-foreground mb-4">
                  Generate questions to practice applying formulas from {concept.title}
                </p>
                <Button onClick={generateQuestions}>Generate Questions</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FormulaLabPage;
