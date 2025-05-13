
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Calculator, CheckCircle2, ChevronRight, FileUp, ExternalLink, Lightbulb, AlignJustify, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

// Mock data - In a real app, these would come from an API
const subjects = [
  { id: 'physics', name: 'Physics', formulas: 120, types: ['Mechanics', 'Electromagnetism', 'Thermodynamics', 'Optics', 'Modern Physics'] },
  { id: 'chemistry', name: 'Chemistry', formulas: 95, types: ['Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry'] },
  { id: 'mathematics', name: 'Mathematics', formulas: 150, types: ['Algebra', 'Calculus', 'Geometry', 'Trigonometry', 'Statistics'] }
];

const topics = {
  physics: [
    { id: 'kinematics', name: 'Kinematics', questions: 24, difficulty: 'medium' },
    { id: 'dynamics', name: 'Dynamics', questions: 32, difficulty: 'hard' },
    { id: 'gravitation', name: 'Gravitation', questions: 18, difficulty: 'medium' },
    { id: 'thermodynamics', name: 'Thermodynamics', questions: 28, difficulty: 'hard' },
    { id: 'electrostatics', name: 'Electrostatics', questions: 22, difficulty: 'medium' },
    { id: 'optics', name: 'Optics', questions: 20, difficulty: 'easy' },
    { id: 'nuclear', name: 'Nuclear Physics', questions: 16, difficulty: 'hard' }
  ],
  chemistry: [
    { id: 'stoichiometry', name: 'Stoichiometry', questions: 18, difficulty: 'medium' },
    { id: 'thermochemistry', name: 'Thermochemistry', questions: 20, difficulty: 'hard' },
    { id: 'atomic', name: 'Atomic Structure', questions: 15, difficulty: 'medium' },
    { id: 'periodic', name: 'Periodic Table', questions: 12, difficulty: 'easy' },
    { id: 'bonding', name: 'Chemical Bonding', questions: 22, difficulty: 'medium' },
    { id: 'equilibrium', name: 'Chemical Equilibrium', questions: 25, difficulty: 'hard' }
  ],
  mathematics: [
    { id: 'functions', name: 'Functions', questions: 30, difficulty: 'medium' },
    { id: 'limits', name: 'Limits & Continuity', questions: 25, difficulty: 'medium' },
    { id: 'derivatives', name: 'Derivatives', questions: 35, difficulty: 'hard' },
    { id: 'integration', name: 'Integration', questions: 40, difficulty: 'hard' },
    { id: 'vectors', name: 'Vectors', questions: 22, difficulty: 'medium' },
    { id: 'matrices', name: 'Matrices & Determinants', questions: 28, difficulty: 'medium' },
    { id: 'probability', name: 'Probability', questions: 20, difficulty: 'medium' }
  ]
};

const difficultyLevels = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
];

const FormulaPracticePage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('physics');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [practiceMode, setPracticeMode] = useState('step-by-step');
  
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [solutionSteps, setSolutionSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState('practice');
  const [showHint, setShowHint] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  // Load topics when subject changes
  useEffect(() => {
    if (selectedSubject && topics[selectedSubject as keyof typeof topics].length > 0) {
      setSelectedTopic(topics[selectedSubject as keyof typeof topics][0].id);
    }
  }, [selectedSubject]);

  // Generate a practice question
  const generateQuestion = () => {
    // In a real app, this would make an API call
    setIsCorrect(null);
    setShowSolution(false);
    setCurrentStep(0);
    setUserAnswers([]);
    
    // Mock question generation
    const question = {
      id: Math.random().toString(36).substring(7),
      text: "A ball is thrown vertically upward with an initial velocity of 20 m/s. Calculate the maximum height it reaches. (Take g = 9.8 m/s²)",
      difficulty: difficulty,
      formula: "h = v²/(2g)",
      steps: [
        "Identify the formula to calculate maximum height when initial velocity is given",
        "Substitute the values: v = 20 m/s, g = 9.8 m/s²",
        "Calculate h = (20 m/s)²/(2 × 9.8 m/s²)"
      ],
      answers: ["h = v²/(2g)", "h = (20)²/(2 × 9.8)", "h = 400/(19.6) = 20.41 m"],
      finalAnswer: "20.41 m",
      hints: [
        "Remember that at the maximum height, the final velocity becomes zero",
        "Use the kinematic equation v² = u² + 2as where v = 0, u = initial velocity, a = -g, s = h (height)",
        "Rearranging the equation gives h = u²/(2g)"
      ]
    };
    
    setCurrentQuestion(question);
    setSolutionSteps(question.steps);
    setUserAnswers(new Array(question.steps.length).fill(''));
    
    toast({
      title: "New practice question generated",
      description: "Try solving step-by-step to improve your understanding",
    });
  };

  const checkStepAnswer = () => {
    if (!currentQuestion) return;
    
    // In a real app, this would validate against the correct answer for the current step
    const isStepCorrect = Math.random() > 0.3; // Simulate 70% chance of being correct
    
    if (isStepCorrect) {
      toast({
        title: "Correct!",
        description: currentStep < solutionSteps.length - 1 ? "Proceed to the next step." : "You've completed all steps!",
        variant: "default",
      });
      
      if (currentStep < solutionSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsCorrect(true);
      }
    } else {
      toast({
        title: "Not quite right",
        description: "Try again or check the hint for this step.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    // In a real app, this would upload the file to the server for processing
    
    toast({
      title: "File uploaded",
      description: "Your answer is being processed...",
    });
    
    // Simulate processing delay
    setTimeout(() => {
      const isAnswerCorrect = Math.random() > 0.3; // Simulate 70% chance of being correct
      setIsCorrect(isAnswerCorrect);
      
      toast({
        title: isAnswerCorrect ? "Correct answer!" : "Incorrect answer",
        description: isAnswerCorrect 
          ? "Great job! Your solution is correct." 
          : "Your solution has some errors. Check the detailed feedback.",
        variant: isAnswerCorrect ? "default" : "destructive",
      });
    }, 2000);
  };

  const handleShowHint = () => {
    if (!currentQuestion) return;
    
    setShowHint(true);
    
    toast({
      title: "Hint displayed",
      description: "Use this hint to guide your solution.",
    });
  };

  const handleOpenCalculator = () => {
    setShowCalculator(true);
    
    toast({
      title: "Calculator opened",
      description: "Use the calculator to help with your calculations.",
    });
  };

  return (
    <SharedPageLayout
      title="Formula Practice"
      subtitle="Master mathematical formulas through interactive practice"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="practice" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            Practice Problems
          </TabsTrigger>
          <TabsTrigger value="formulas" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            Formula Library
          </TabsTrigger>
        </TabsList>
        
        {/* Practice Tab */}
        <TabsContent value="practice" className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Generate Practice Problems</CardTitle>
              <CardDescription>
                Select a subject, topic, and difficulty level to practice formula-based problems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
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
                
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Select
                    value={selectedTopic}
                    onValueChange={setSelectedTopic}
                  >
                    <SelectTrigger id="topic">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedSubject && topics[selectedSubject as keyof typeof topics].map((topic) => (
                        <SelectItem key={topic.id} value={topic.id}>
                          {topic.name} ({topic.questions} questions)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={difficulty}
                  onValueChange={setDifficulty}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="questionCount">Number of Questions</Label>
                  <span className="text-sm font-medium">{questionCount}</span>
                </div>
                <Slider
                  id="questionCount"
                  min={1}
                  max={10}
                  step={1}
                  value={[questionCount]}
                  onValueChange={(values) => setQuestionCount(values[0])}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="practiceMode">Practice Mode</Label>
                <Select
                  value={practiceMode}
                  onValueChange={setPracticeMode}
                >
                  <SelectTrigger id="practiceMode">
                    <SelectValue placeholder="Select practice mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="step-by-step">Step-by-step Solution</SelectItem>
                    <SelectItem value="final-answer">Final Answer Only</SelectItem>
                    <SelectItem value="file-upload">Upload Written Solution</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={generateQuestion}>
                Generate Practice Question
              </Button>
            </CardFooter>
          </Card>
          
          {currentQuestion && (
            <Card className="shadow-md">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle>Practice Problem</CardTitle>
                  <Badge variant={difficulty === 'easy' ? 'outline' : difficulty === 'medium' ? 'secondary' : 'destructive'}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="text-base font-medium text-foreground mt-1">
                  {currentQuestion.text}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {practiceMode === 'step-by-step' && (
                  <div className="space-y-6">
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium text-sm mb-2 flex items-center">
                        <AlignJustify className="h-4 w-4 mr-1" />
                        Step {currentStep + 1} of {solutionSteps.length}
                      </h3>
                      <p className="text-sm">{solutionSteps[currentStep]}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="stepAnswer">Your Solution for this Step</Label>
                      <Textarea
                        id="stepAnswer"
                        placeholder="Enter your solution for this step..."
                        value={userAnswers[currentStep] || ''}
                        onChange={(e) => {
                          const newAnswers = [...userAnswers];
                          newAnswers[currentStep] = e.target.value;
                          setUserAnswers(newAnswers);
                        }}
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        onClick={checkStepAnswer} 
                        disabled={!userAnswers[currentStep]} 
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        Check Answer
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => setShowSolution(!showSolution)}
                        className="border-indigo-200 hover:border-indigo-300"
                      >
                        {showSolution ? 'Hide Solution' : 'Show Solution'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="ml-auto border-amber-200 hover:border-amber-300"
                        onClick={handleShowHint}
                      >
                        <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                        Hint
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="border-teal-200 hover:border-teal-300"
                        onClick={handleOpenCalculator}
                      >
                        <Calculator className="h-4 w-4 mr-1 text-teal-500" />
                        Calculator
                      </Button>
                    </div>
                    
                    {showSolution && (
                      <Alert className="bg-indigo-50 border-indigo-200">
                        <AlertTitle className="text-indigo-800">Solution for Step {currentStep + 1}</AlertTitle>
                        <AlertDescription className="font-mono text-indigo-700">
                          {currentQuestion.answers[currentStep]}
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {showHint && (
                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertTitle className="text-amber-800 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                          Hint for Step {currentStep + 1}
                        </AlertTitle>
                        <AlertDescription className="text-amber-700">
                          {currentQuestion.hints[currentStep] || "Think about the relationships between variables in the problem."}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
                
                {practiceMode === 'final-answer' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="finalAnswer">Your Answer</Label>
                      <Input
                        id="finalAnswer"
                        placeholder="Enter your final answer..."
                        value={userAnswers[0] || ''}
                        onChange={(e) => setUserAnswers([e.target.value])}
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        onClick={() => setIsCorrect(userAnswers[0] === currentQuestion.finalAnswer)} 
                        disabled={!userAnswers[0]}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        Check Answer
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => setShowSolution(!showSolution)}
                        className="border-indigo-200 hover:border-indigo-300"
                      >
                        {showSolution ? 'Hide Solution' : 'Show Solution'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="ml-auto border-amber-200 hover:border-amber-300"
                        onClick={handleShowHint}
                      >
                        <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                        Hint
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="border-teal-200 hover:border-teal-300"
                        onClick={handleOpenCalculator}
                      >
                        <Calculator className="h-4 w-4 mr-1 text-teal-500" />
                        Calculator
                      </Button>
                    </div>
                    
                    {showSolution && (
                      <Alert className="bg-indigo-50 border-indigo-200">
                        <AlertTitle className="text-indigo-800">Complete Solution</AlertTitle>
                        <AlertDescription className="space-y-2 text-indigo-700">
                          {currentQuestion.steps.map((step: string, index: number) => (
                            <div key={index} className="space-y-1">
                              <div className="text-sm font-medium">Step {index + 1}:</div>
                              <div className="pl-4 font-mono">{step}</div>
                              <div className="pl-4 font-mono text-indigo-600">{currentQuestion.answers[index]}</div>
                            </div>
                          ))}
                          <div className="mt-2 font-bold">Final Answer: {currentQuestion.finalAnswer}</div>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {showHint && (
                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertTitle className="text-amber-800 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                          Hint
                        </AlertTitle>
                        <AlertDescription className="text-amber-700">
                          {currentQuestion.hints[0] || "Think about what formula applies to this problem."}
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {isCorrect !== null && (
                      <Alert variant={isCorrect ? "default" : "destructive"}>
                        <AlertTitle className="flex items-center">
                          {isCorrect ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <RotateCcw className="h-4 w-4 mr-1" />}
                          {isCorrect ? "Correct Answer!" : "Not quite right"}
                        </AlertTitle>
                        <AlertDescription>
                          {isCorrect 
                            ? "Great job! You've solved this problem correctly." 
                            : `The correct answer is: ${currentQuestion.finalAnswer}`}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
                
                {practiceMode === 'file-upload' && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Upload a scan or photo of your handwritten solution. The system will analyze 
                      your work and provide feedback.
                    </p>
                    
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm mb-4">Drag and drop your file here, or click to select</p>
                      <Input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileUpload}
                      />
                      <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                        Select File
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Supported formats: JPG, PNG, PDF (max 5MB)
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowSolution(!showSolution)}
                        className="border-indigo-200 hover:border-indigo-300"
                      >
                        {showSolution ? 'Hide Solution' : 'Show Solution'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="ml-auto border-amber-200 hover:border-amber-300"
                        onClick={handleShowHint}
                      >
                        <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                        Hint
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="border-teal-200 hover:border-teal-300"
                        onClick={handleOpenCalculator}
                      >
                        <Calculator className="h-4 w-4 mr-1 text-teal-500" />
                        Calculator
                      </Button>
                    </div>
                    
                    {isCorrect !== null && (
                      <Alert variant={isCorrect ? "default" : "destructive"}>
                        <AlertTitle className="flex items-center">
                          {isCorrect ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <RotateCcw className="h-4 w-4 mr-1" />}
                          {isCorrect ? "Correct Solution!" : "Needs Improvement"}
                        </AlertTitle>
                        <AlertDescription>
                          {isCorrect 
                            ? "Great job! Your solution method is correct." 
                            : "There are some issues with your solution. Review the correct approach below."}
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {showSolution && (
                      <Alert className="bg-indigo-50 border-indigo-200">
                        <AlertTitle className="text-indigo-800">Complete Solution</AlertTitle>
                        <AlertDescription className="space-y-2 text-indigo-700">
                          {currentQuestion.steps.map((step: string, index: number) => (
                            <div key={index} className="space-y-1">
                              <div className="text-sm font-medium">Step {index + 1}:</div>
                              <div className="pl-4 font-mono">{step}</div>
                              <div className="pl-4 font-mono text-indigo-600">{currentQuestion.answers[index]}</div>
                            </div>
                          ))}
                          <div className="mt-2 font-bold">Final Answer: {currentQuestion.finalAnswer}</div>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {showHint && (
                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertTitle className="text-amber-800 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                          Hint
                        </AlertTitle>
                        <AlertDescription className="text-amber-700">
                          {currentQuestion.hints[0] || "Think about what formula applies to this problem."}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentQuestion(null)}>
                  Back to Settings
                </Button>
                <Button 
                  onClick={generateQuestion}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  New Question
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        {/* Formula Library Tab */}
        <TabsContent value="formulas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Formula Reference Library</CardTitle>
              <CardDescription>
                Browse formulas by subject and topic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                  <Card key={subject.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <CardDescription>{subject.formulas} formulas</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-3">
                        {subject.types.slice(0, 3).map((type, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                            {type}
                          </li>
                        ))}
                        {subject.types.length > 3 && (
                          <li className="text-xs text-muted-foreground pl-6">
                            +{subject.types.length - 3} more topics
                          </li>
                        )}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full text-sm" onClick={() => setActiveTab('practice')}>
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        View Formulas & Practice
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Calculator Modal */}
      <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scientific Calculator</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50 rounded-md">
            <div className="col-span-4 bg-white border p-2 h-16 rounded-md flex items-end justify-end text-lg font-mono mb-2">
              0
            </div>
            
            {/* Calculator buttons */}
            {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((key) => (
              <Button 
                key={key} 
                variant={['÷', '×', '-', '+', '='].includes(key) ? "default" : "outline"}
                size="sm"
                className={key === '=' ? "bg-indigo-600 hover:bg-indigo-700" : ""}
              >
                {key}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCalculator(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SharedPageLayout>
  );
};

export default FormulaPracticePage;
