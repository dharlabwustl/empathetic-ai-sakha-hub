
import React, { useState, useRef, useCallback } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Calculator, CheckCircle2, ChevronRight, Upload, List, ArrowRight, ArrowLeft, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Formula {
  id: string;
  title: string;
  formula: string;
  description: string;
  variables: { [key: string]: { name: string; unit: string; } };
}

interface Step {
  description: string;
  formula?: string;
  result?: string | number;
}

const FormulaPracticePage = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedSubject, setSelectedSubject] = useState<string>('physics');
  const [selectedTopic, setSelectedTopic] = useState<string>('kinematics');
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [solutionSteps, setSolutionSteps] = useState<Step[]>([]);
  
  // Mock data for subjects, topics, and formulas
  const subjects = [
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'math', name: 'Mathematics' }
  ];
  
  const topics = {
    physics: [
      { id: 'kinematics', name: 'Kinematics' },
      { id: 'dynamics', name: 'Dynamics' },
      { id: 'energy', name: 'Energy & Work' }
    ],
    chemistry: [
      { id: 'stoichiometry', name: 'Stoichiometry' },
      { id: 'thermodynamics', name: 'Thermodynamics' },
      { id: 'electrochemistry', name: 'Electrochemistry' }
    ],
    math: [
      { id: 'calculus', name: 'Calculus' },
      { id: 'algebra', name: 'Algebra' },
      { id: 'geometry', name: 'Geometry' }
    ]
  };
  
  const formulas = {
    kinematics: [
      {
        id: 'velocity',
        title: 'Final Velocity',
        formula: 'v = u + at',
        description: 'Calculate the final velocity of an object with constant acceleration',
        variables: {
          v: { name: 'Final velocity', unit: 'm/s' },
          u: { name: 'Initial velocity', unit: 'm/s' },
          a: { name: 'Acceleration', unit: 'm/s²' },
          t: { name: 'Time', unit: 's' }
        }
      },
      {
        id: 'distance',
        title: 'Distance',
        formula: 's = ut + (1/2)at²',
        description: 'Calculate the distance traveled by an object with constant acceleration',
        variables: {
          s: { name: 'Distance', unit: 'm' },
          u: { name: 'Initial velocity', unit: 'm/s' },
          a: { name: 'Acceleration', unit: 'm/s²' },
          t: { name: 'Time', unit: 's' }
        }
      }
    ],
    dynamics: [
      {
        id: 'force',
        title: 'Force',
        formula: 'F = ma',
        description: "Calculate force using Newton's Second Law",
        variables: {
          F: { name: 'Force', unit: 'N' },
          m: { name: 'Mass', unit: 'kg' },
          a: { name: 'Acceleration', unit: 'm/s²' }
        }
      }
    ]
  };
  
  // Mock questions
  const generateQuestion = useCallback(() => {
    if (!selectedFormula) return null;
    
    // Generate parameters based on difficulty
    const baseValue = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 20;
    const u = Math.round(Math.random() * baseValue);
    const a = Math.round(Math.random() * baseValue / 2) + 1;
    const t = Math.round(Math.random() * baseValue / 4) + 1;
    
    if (selectedFormula.id === 'velocity') {
      const answer = u + a * t;
      const steps = [
        { description: `Start with the formula for final velocity:`, formula: 'v = u + at' },
        { description: `Substitute initial velocity u = ${u} m/s, acceleration a = ${a} m/s², and time t = ${t} s:`, formula: `v = ${u} + ${a} × ${t}` },
        { description: `Multiply acceleration by time:`, formula: `v = ${u} + ${a * t}` },
        { description: `Add initial velocity to get final velocity:`, formula: `v = ${answer} m/s`, result: answer }
      ];
      
      return {
        questionText: `A car starts with an initial velocity of ${u} m/s and accelerates at ${a} m/s². What is its velocity after ${t} seconds?`,
        parameters: { u, a, t },
        answer: answer,
        unit: 'm/s',
        steps
      };
    } else if (selectedFormula.id === 'distance') {
      const answer = u * t + 0.5 * a * t * t;
      const steps = [
        { description: `Start with the formula for distance:`, formula: 's = ut + (1/2)at²' },
        { description: `Substitute initial velocity u = ${u} m/s, acceleration a = ${a} m/s², and time t = ${t} s:`, formula: `s = ${u} × ${t} + (1/2) × ${a} × ${t}²` },
        { description: `Calculate the first term:`, formula: `s = ${u * t} + (1/2) × ${a} × ${t}²` },
        { description: `Calculate the second term:`, formula: `s = ${u * t} + (1/2) × ${a} × ${t * t}` },
        { description: `s = ${u * t} + ${0.5 * a * t * t}` },
        { description: `Add the terms to find the distance:`, formula: `s = ${answer} m`, result: answer }
      ];
      
      return {
        questionText: `A train starts with an initial velocity of ${u} m/s and accelerates at ${a} m/s². How far does it travel in ${t} seconds?`,
        parameters: { u, a, t },
        answer: answer,
        unit: 'm',
        steps
      };
    } else if (selectedFormula.id === 'force') {
      const m = Math.round(Math.random() * baseValue) + 1;
      const answer = m * a;
      const steps = [
        { description: `Start with the formula for force:`, formula: 'F = ma' },
        { description: `Substitute mass m = ${m} kg and acceleration a = ${a} m/s²:`, formula: `F = ${m} × ${a}` },
        { description: `Multiply mass and acceleration to get force:`, formula: `F = ${answer} N`, result: answer }
      ];
      
      return {
        questionText: `A box with a mass of ${m} kg is pushed and accelerates at ${a} m/s². What is the force applied to the box?`,
        parameters: { m, a },
        answer: answer,
        unit: 'N',
        steps
      };
    }
    
    return null;
  }, [selectedFormula, difficulty]);
  
  // Generate questions
  const [questions, setQuestions] = useState<any[]>([]);
  
  // Generate a new set of questions
  const generateQuestions = () => {
    if (!selectedFormula) {
      toast({
        title: "Select a formula first",
        description: "Please select a formula to generate questions",
        variant: "destructive"
      });
      return;
    }
    
    const newQuestions = [];
    for (let i = 0; i < questionCount; i++) {
      const question = generateQuestion();
      if (question) newQuestions.push(question);
    }
    
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setShowAnswer(false);
    setShowSteps(false);
    setSolutionSteps([]);
    
    toast({
      title: "Questions generated",
      description: `${questionCount} ${difficulty} questions have been generated`,
    });
  };
  
  // Handle answer checking
  const checkAnswer = () => {
    if (!questions[currentQuestionIndex]) return;
    
    // Clean up user answer to remove spaces and handle formatting
    const cleanAnswer = userAnswer.replace(/\s+/g, '');
    const correctAnswerStr = String(questions[currentQuestionIndex].answer);
    
    const isCorrect = cleanAnswer === correctAnswerStr;
    
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: `Your answer is correct.`,
        variant: "success"
      });
    } else {
      toast({
        title: "Not quite right",
        description: `Try again or view the solution.`,
        variant: "warning"
      });
    }
  };
  
  // Handle navigation between questions
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
      setSolutionSteps(questions[currentQuestionIndex]?.steps || []);
      setShowSteps(true);
    }
  };
  
  // Handle step-by-step solution
  const showNextStep = () => {
    if (!questions[currentQuestionIndex]) return;
    
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
    
    // In a real app, this would process the file contents
    // For now, just simulate a match
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
  
  // When topic changes, reset selected formula
  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    setSelectedFormula(null);
  };
  
  // When formula changes, reset questions
  const handleFormulaChange = (formulaId: string) => {
    const formulaList = formulas[selectedTopic as keyof typeof formulas] || [];
    const formula = formulaList.find(f => f.id === formulaId) || null;
    setSelectedFormula(formula);
    setQuestions([]);
    setUserAnswer('');
    setShowAnswer(false);
    setShowSteps(false);
    setSolutionSteps([]);
  };

  return (
    <SharedPageLayout title="Formula Practice Lab" subtitle="Master formulas and concepts with interactive practice">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <span>Formula Selection</span>
              </CardTitle>
              <CardDescription>Choose a subject and formula to practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subject selection */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Topic selection */}
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Select 
                  value={selectedTopic} 
                  onValueChange={handleTopicChange}
                  disabled={!selectedSubject}
                >
                  <SelectTrigger id="topic">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics[selectedSubject as keyof typeof topics]?.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Formula selection */}
              <div className="space-y-2">
                <Label htmlFor="formula">Formula</Label>
                <Select 
                  value={selectedFormula?.id || ''} 
                  onValueChange={handleFormulaChange}
                  disabled={!selectedTopic}
                >
                  <SelectTrigger id="formula">
                    <SelectValue placeholder="Select formula" />
                  </SelectTrigger>
                  <SelectContent>
                    {formulas[selectedTopic as keyof typeof formulas]?.map((formula) => (
                      <SelectItem key={formula.id} value={formula.id}>
                        {formula.title}
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
                disabled={!selectedFormula}
                className="w-full"
              >
                Generate Questions
              </Button>
            </CardContent>
          </Card>
          
          {selectedFormula && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{selectedFormula.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Badge className="bg-blue-600 text-white">Formula</Badge>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-md">
                  <p className="text-xl font-semibold text-center">{selectedFormula.formula}</p>
                </div>
                
                <p className="text-sm text-muted-foreground">{selectedFormula.description}</p>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Variables:</h4>
                  <ul className="space-y-1">
                    {Object.entries(selectedFormula.variables).map(([symbol, {name, unit}]) => (
                      <li key={symbol} className="text-sm flex justify-between">
                        <span className="font-medium">{symbol}</span>
                        <span className="text-muted-foreground">{name} [{unit}]</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="xl:col-span-2">
          {questions.length > 0 && currentQuestionIndex < questions.length ? (
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
                  <p className="text-lg">{questions[currentQuestionIndex].questionText}</p>
                </div>
                
                {/* Formula reminder */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Formula:</span>
                  <span className="font-mono bg-muted px-2 py-0.5 rounded">{selectedFormula?.formula}</span>
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
            <Card className={cn("border-dashed border-2 h-[400px] flex items-center justify-center", questions.length === 0 ? "border-gray-300" : "border-red-300")}>
              <div className="text-center p-6">
                <Calculator className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Questions Generated Yet</h3>
                <p className="text-muted-foreground mb-4">
                  {selectedFormula 
                    ? "Click the 'Generate Questions' button to create practice problems."
                    : "Select a formula first, then generate questions to practice."}
                </p>
                {selectedFormula && (
                  <Button onClick={generateQuestions}>Generate Questions</Button>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FormulaPracticePage;
