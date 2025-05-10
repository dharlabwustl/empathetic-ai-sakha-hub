
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calculator, 
  BookOpen, 
  Save, 
  Upload, 
  RefreshCw, 
  Check, 
  X, 
  ArrowRight,
  Lightbulb,
  FileUp
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Mock formula subjects based on common exam goals
const formulaSubjects = [
  { 
    id: 'physics',
    name: 'Physics',
    topics: [
      { id: 'mechanics', name: 'Mechanics', difficulty: ['easy', 'medium', 'hard'] },
      { id: 'thermodynamics', name: 'Thermodynamics', difficulty: ['easy', 'medium', 'hard'] },
      { id: 'electromagnetism', name: 'Electromagnetism', difficulty: ['easy', 'medium', 'hard'] },
      { id: 'optics', name: 'Optics', difficulty: ['easy', 'medium', 'hard'] }
    ]
  },
  { 
    id: 'chemistry',
    name: 'Chemistry',
    topics: [
      { id: 'stoichiometry', name: 'Stoichiometry', difficulty: ['easy', 'medium', 'hard'] },
      { id: 'thermochemistry', name: 'Thermochemistry', difficulty: ['easy', 'medium', 'hard'] },
      { id: 'electrochemistry', name: 'Electrochemistry', difficulty: ['easy', 'medium', 'hard'] }
    ]
  },
  { 
    id: 'mathematics',
    name: 'Mathematics',
    topics: [
      { id: 'algebra', name: 'Algebra', difficulty: ['easy', 'medium', 'hard'] },
      { id: 'calculus', name: 'Calculus', difficulty: ['easy', 'medium', 'hard'] },
      { id: 'statistics', name: 'Statistics', difficulty: ['easy', 'medium', 'hard'] },
      { id: 'probability', name: 'Probability', difficulty: ['easy', 'medium', 'hard'] }
    ]
  },
  { 
    id: 'quantitative-aptitude',
    name: 'Quantitative Aptitude',
    topics: [
      { id: 'percentage', name: 'Percentage', difficulty: ['easy', 'medium', 'hard'] },
      { id: 'profit-loss', name: 'Profit & Loss', difficulty: ['easy', 'medium', 'hard'] },
      { id: 'time-work', name: 'Time & Work', difficulty: ['easy', 'medium', 'hard'] }
    ]
  }
];

// Mock difficulty levels with descriptions
const difficultyLevels = [
  { value: 'easy', label: 'Easy - Foundation Level', description: 'Basic formula application with direct solutions' },
  { value: 'medium', label: 'Medium - Intermediate Level', description: 'Multiple steps and formula combinations' },
  { value: 'hard', label: 'Hard - Advanced Level', description: 'Complex problem solving with multi-concept applications' }
];

// Mock formulas
const physicsFormulas = [
  { formula: "F = ma", name: "Newton's Second Law", explanation: "Force equals mass times acceleration" },
  { formula: "v = u + at", name: "First Equation of Motion", explanation: "Final velocity equals initial velocity plus acceleration times time" },
  { formula: "s = ut + ½at²", name: "Second Equation of Motion", explanation: "Displacement equals initial velocity times time plus half of acceleration times time squared" },
  { formula: "E = mc²", name: "Mass-Energy Equivalence", explanation: "Energy equals mass times the speed of light squared" }
];

// Mock calculator buttons
const calculatorButtons = [
  '7', '8', '9', '÷',
  '4', '5', '6', '×',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  'x²', '√', 'sin', 'cos',
  '(', ')', 'π', 'C'
];

const FormulaPracticePage: React.FC = () => {
  const { toast } = useToast();
  
  // State variables
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>();
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medium');
  const [questionCount, setQuestionCount] = useState<string>('5');
  
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorDisplay, setCalculatorDisplay] = useState('0');
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | 'partial' | null>(null);
  const [submittedAnswer, setSubmittedAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Mock questions for the selected configuration
  const [questions, setQuestions] = useState([
    {
      id: '1',
      question: 'A force of 10 N acts on a body of mass 2 kg. What is the acceleration of the body?',
      answer: '5 m/s²',
      explanation: 'Using Newton\'s Second Law: F = ma. Rearranging for a: a = F/m = 10/2 = 5 m/s².',
      hint: 'Use Newton\'s Second Law (F = ma) and solve for acceleration.',
      formula: 'a = F/m',
      steps: [
        { text: 'Identify the known variables: Force (F) = 10 N, Mass (m) = 2 kg', answerRequired: false },
        { text: 'Apply Newton\'s Second Law: a = F/m', answerRequired: false },
        { text: 'Substitute the values: a = 10 N / 2 kg', answer: '5 m/s²' },
        { text: 'Express the answer with proper units: a = 5 m/s²', answerRequired: false }
      ]
    },
    {
      id: '2',
      question: 'A car accelerates from 0 to 60 km/h in 6 seconds. What is the acceleration of the car in m/s²?',
      answer: '2.78 m/s²',
      explanation: 'First, convert 60 km/h to m/s: 60 km/h × 1000/3600 = 16.67 m/s. Then, a = (v - u)/t = (16.67 - 0)/6 = 2.78 m/s².',
      hint: 'First convert km/h to m/s, then use the formula a = (v - u)/t.',
      formula: 'a = (v - u)/t',
      steps: [
        { text: 'Convert 60 km/h to m/s: 60 × (1000/3600) = ?', answer: '16.67 m/s' },
        { text: 'Identify the known variables: Initial velocity (u) = 0 m/s, Final velocity (v) = 16.67 m/s, Time (t) = 6 s', answerRequired: false },
        { text: 'Apply the formula: a = (v - u)/t', answerRequired: false },
        { text: 'Substitute the values: a = (16.67 - 0)/6', answer: '2.78 m/s²' }
      ]
    }
  ]);

  // Generate questions based on selected parameters
  const generateQuestions = () => {
    if (!selectedSubject || !selectedTopic) {
      toast({
        title: "Missing selection",
        description: "Please select both subject and topic.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an API to generate questions
    toast({
      title: "Generating questions",
      description: `Creating ${questionCount} ${selectedDifficulty} questions on ${selectedTopic}.`
    });
    
    // Reset states for new questions
    setActiveQuestion(0);
    setShowAnswer(false);
    setUserAnswer('');
    setAnswerStatus(null);
    setSubmittedAnswer(false);
    setShowHint(false);
    setCurrentStep(0);
    
    // Mock generated questions would be set here
    // For now, we'll use our existing mock questions
  };
  
  // Handle calculator button clicks
  const handleCalculatorClick = (value: string) => {
    if (value === 'C') {
      setCalculatorDisplay('0');
    } else if (value === '=') {
      try {
        // Replace mathematical symbols with JavaScript operators
        let expression = calculatorDisplay
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, Math.PI.toString())
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/x²/g, '**2')
          .replace(/√/g, 'Math.sqrt');
          
        // eslint-disable-next-line no-eval
        const result = eval(expression);
        setCalculatorDisplay(result.toString());
      } catch (error) {
        setCalculatorDisplay('Error');
      }
    } else {
      setCalculatorDisplay(calculatorDisplay === '0' ? value : calculatorDisplay + value);
    }
  };
  
  // Check the user's answer
  const checkAnswer = () => {
    if (!userAnswer.trim()) return;
    
    setSubmittedAnswer(true);
    
    // In a real app, this would validate against the correct answer
    // For now, let's use a simple comparison
    const currentQuestion = questions[activeQuestion];
    const currentStepAnswer = currentQuestion.steps[currentStep]?.answer;
    
    if (currentStepAnswer) {
      // Simple answer checking logic (for demo purposes)
      const normalizedUserAnswer = userAnswer.toLowerCase().replace(/\s+/g, '');
      const normalizedCorrectAnswer = currentStepAnswer.toLowerCase().replace(/\s+/g, '');
      
      if (normalizedUserAnswer === normalizedCorrectAnswer) {
        setAnswerStatus('correct');
        toast({
          title: "Correct!",
          description: "Your answer is correct.",
          variant: "default"
        });
      } else if (normalizedUserAnswer.includes(normalizedCorrectAnswer.split(' ')[0])) {
        setAnswerStatus('partial');
        toast({
          title: "Partially Correct",
          description: "Your answer is on the right track but not entirely correct.",
          variant: "default"
        });
      } else {
        setAnswerStatus('incorrect');
        toast({
          title: "Incorrect",
          description: "Try again or check the hint.",
          variant: "destructive"
        });
      }
    }
  };
  
  // Move to next step in the solution
  const nextStep = () => {
    const currentQuestion = questions[activeQuestion];
    if (currentStep < currentQuestion.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setUserAnswer('');
      setAnswerStatus(null);
      setSubmittedAnswer(false);
    }
  };
  
  // Move to next question
  const nextQuestion = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
      setUserAnswer('');
      setAnswerStatus(null);
      setSubmittedAnswer(false);
      setShowHint(false);
      setCurrentStep(0);
      setShowAnswer(false);
    }
  };
  
  // Reset current question
  const resetQuestion = () => {
    setUserAnswer('');
    setAnswerStatus(null);
    setSubmittedAnswer(false);
    setShowHint(false);
    setCurrentStep(0);
    setShowAnswer(false);
  };
  
  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload the file for processing
      toast({
        title: "Analyzing your solution",
        description: `Uploaded ${file.name}. Our system is analyzing your work.`,
      });
      
      // Mock successful analysis after a delay
      setTimeout(() => {
        setAnswerStatus('correct');
        toast({
          title: "Analysis Complete",
          description: "Your solution is correct! Great work.",
        });
      }, 2000);
    }
  };
  
  // Get available topics based on selected subject
  const getTopics = () => {
    return formulaSubjects.find(subject => subject.id === selectedSubject)?.topics || [];
  };
  
  const currentQuestion = questions[activeQuestion];

  return (
    <SharedPageLayout
      title="Formula Practice Lab"
      subtitle="Master numerical problem solving with step-by-step solutions"
    >
      <div className="space-y-6">
        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Create Practice Session</CardTitle>
            <CardDescription>
              Select a subject, topic, and difficulty level to generate formula-based practice problems.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {formulaSubjects.map(subject => (
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
                  disabled={!selectedSubject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {getTopics().map(topic => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={selectedDifficulty}
                  onValueChange={setSelectedDifficulty}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {difficultyLevels.find(d => d.value === selectedDifficulty)?.description}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="questions">Number of Questions</Label>
                <Select
                  value={questionCount}
                  onValueChange={setQuestionCount}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Questions</SelectItem>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={generateQuestions} className="w-full sm:w-auto">
              Generate Practice Questions
            </Button>
          </CardFooter>
        </Card>
        
        {/* Question and Solution Area */}
        {questions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Question and answer entry */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="relative pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Question {activeQuestion + 1} of {questions.length}
                    </CardTitle>
                    <Badge variant={
                      selectedDifficulty === 'easy' ? 'outline' :
                      selectedDifficulty === 'medium' ? 'secondary' : 'destructive'
                    }>
                      {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
                    </Badge>
                  </div>
                  <Progress 
                    value={((activeQuestion + 1) / questions.length) * 100} 
                    className="h-1 absolute bottom-0 left-0 right-0 bg-slate-100"
                  />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                      <h3 className="font-medium mb-2">Problem:</h3>
                      <p>{currentQuestion.question}</p>
                    </div>
                    
                    {/* Current step */}
                    {currentQuestion.steps[currentStep] && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
                        <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-400">Step {currentStep + 1}:</h3>
                        <p>{currentQuestion.steps[currentStep].text}</p>
                      </div>
                    )}
                    
                    {/* Answer input */}
                    {currentQuestion.steps[currentStep]?.answerRequired !== false && (
                      <div className="space-y-3">
                        <Label htmlFor="answer">Your answer:</Label>
                        <Textarea 
                          id="answer"
                          placeholder="Enter your solution..."
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          disabled={submittedAnswer && answerStatus === 'correct'}
                          className="min-h-[100px]"
                        />
                      </div>
                    )}
                    
                    {/* Answer result feedback */}
                    {submittedAnswer && answerStatus && (
                      <div className={`p-3 rounded-lg ${
                        answerStatus === 'correct' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30' :
                        answerStatus === 'partial' ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30' :
                        'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30'
                      }`}>
                        <div className="flex items-center gap-2">
                          {answerStatus === 'correct' ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : answerStatus === 'partial' ? (
                            <ArrowRight className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <X className="h-5 w-5 text-red-600" />
                          )}
                          <span className={`font-medium ${
                            answerStatus === 'correct' ? 'text-green-800 dark:text-green-400' :
                            answerStatus === 'partial' ? 'text-yellow-800 dark:text-yellow-400' :
                            'text-red-800 dark:text-red-400'
                          }`}>
                            {answerStatus === 'correct' ? 'Correct!' :
                             answerStatus === 'partial' ? 'Partially Correct' :
                             'Incorrect'}
                          </span>
                        </div>
                        {answerStatus === 'correct' && currentStep < currentQuestion.steps.length - 1 && (
                          <Button onClick={nextStep} className="mt-2" variant="outline" size="sm">
                            Continue to Next Step
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        )}
                        {answerStatus === 'correct' && currentStep === currentQuestion.steps.length - 1 && (
                          <Button onClick={nextQuestion} className="mt-2" variant="outline" size="sm">
                            Next Question
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )}
                    
                    {/* Hint section */}
                    {showHint && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800/30">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="h-4 w-4 text-amber-600" />
                          <span className="font-medium text-amber-800 dark:text-amber-400">Hint:</span>
                        </div>
                        <p className="text-amber-800 dark:text-amber-400">{currentQuestion.hint}</p>
                      </div>
                    )}
                    
                    {/* Solution (shown when requested) */}
                    {showAnswer && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800/30">
                        <h3 className="font-medium mb-2 text-green-800 dark:text-green-400">Solution:</h3>
                        <p>{currentQuestion.explanation}</p>
                        
                        <div className="mt-3 p-2 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-800/30 inline-block">
                          <span className="font-medium">Answer: {currentQuestion.answer}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2 flex-grow">
                    <Button 
                      onClick={checkAnswer}
                      disabled={!userAnswer.trim() || (submittedAnswer && answerStatus === 'correct')}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Check Answer
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => setShowHint(!showHint)}
                    >
                      <Lightbulb className="mr-1 h-4 w-4" />
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => setShowAnswer(!showAnswer)}
                    >
                      <BookOpen className="mr-1 h-4 w-4" />
                      {showAnswer ? 'Hide Solution' : 'Show Solution'}
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={resetQuestion}
                    >
                      <RefreshCw className="mr-1 h-4 w-4" />
                      Reset
                    </Button>
                    <Button 
                      variant={activeQuestion < questions.length - 1 ? "default" : "secondary"}
                      onClick={nextQuestion}
                      disabled={activeQuestion === questions.length - 1}
                    >
                      <ArrowRight className="mr-1 h-4 w-4" />
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              {/* File upload for solutions */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upload Written Solution</CardTitle>
                  <CardDescription>
                    Submit a photo or scan of your handwritten work for verification.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                    <FileUp className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Drag and drop your solution file, or click to browse
                    </p>
                    <Input 
                      type="file" 
                      accept=".jpg,.jpeg,.png,.pdf" 
                      className="hidden" 
                      id="solution-upload" 
                      onChange={handleFileUpload}
                    />
                    <Label htmlFor="solution-upload" className="cursor-pointer">
                      <Button variant="outline" className="mt-2" onClick={() => document.getElementById('solution-upload')?.click()}>
                        <Upload className="mr-1 h-4 w-4" />
                        Select File
                      </Button>
                    </Label>
                    <p className="text-xs text-gray-400 mt-2">Supported formats: JPG, PNG, PDF (max 5MB)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - Tools and reference */}
            <div className="lg:col-span-1 space-y-6">
              {/* Calculator */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg mb-3">
                    <input 
                      type="text" 
                      className="w-full text-right text-xl font-mono p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded"
                      value={calculatorDisplay}
                      readOnly
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {calculatorButtons.map((btn) => (
                      <Button 
                        key={btn} 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCalculatorClick(btn)}
                        className="h-10 text-lg font-medium"
                      >
                        {btn}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Key Formulas */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Key Formulas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {physicsFormulas.map((formula, index) => (
                      <div 
                        key={index} 
                        className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800"
                      >
                        <div className="font-medium text-lg mb-1">{formula.formula}</div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{formula.name}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{formula.explanation}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Progress Tracking */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Completion</span>
                        <span>{activeQuestion + 1}/{questions.length} ({Math.round(((activeQuestion + 1) / questions.length) * 100)}%)</span>
                      </div>
                      <Progress value={((activeQuestion + 1) / questions.length) * 100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Accuracy Rate</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Save className="mr-1 h-4 w-4" />
                        Save Progress
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </SharedPageLayout>
  );
};

export default FormulaPracticePage;
