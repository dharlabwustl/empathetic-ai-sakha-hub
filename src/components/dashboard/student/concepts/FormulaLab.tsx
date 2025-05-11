
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Calculator, Check, Upload, FileQuestion, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FormulaLab = () => {
  const navigate = useNavigate();
  const { conceptId } = useParams();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState('practice');
  const [question, setQuestion] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('medium');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [generatedQuestions, setGeneratedQuestions] = useState<Array<{
    id: string;
    text: string;
    answer: string;
    difficulty: string;
    solved: boolean;
    explanation: string;
  }>>([]);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [calculatorValue, setCalculatorValue] = useState<string>('0');
  const [calculatorHistory, setCalculatorHistory] = useState<string[]>([]);
  const [generatingQuestion, setGeneratingQuestion] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [userFile, setUserFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  
  const [conceptData, setConceptData] = useState<{
    id: string;
    title: string;
    subject: string;
  } | null>(null);

  // Fetch concept data
  useEffect(() => {
    // For demo, we'll use mock data
    setConceptData({
      id: conceptId || '1',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics'
    });
    
    // Generate a starting question
    generateQuestion();
  }, [conceptId]);

  // Find current active question
  const activeQuestion = activeQuestionId 
    ? generatedQuestions.find(q => q.id === activeQuestionId)
    : generatedQuestions[0];

  // Generate a new practice question
  const generateQuestion = () => {
    setGeneratingQuestion(true);
    setShowAnswer(false);
    setUserAnswer('');
    setShowHint(false);

    // Example questions by difficulty
    const easyQuestions = [
      {
        text: "Calculate the kinetic energy of a 2kg object moving at 5 m/s.",
        answer: "25 J",
        explanation: "Using the formula KE = 0.5 × m × v². KE = 0.5 × 2 × 5² = 0.5 × 2 × 25 = 25 Joules."
      },
      {
        text: "Find the resistance in a circuit with a voltage of 12V and current of 2A.",
        answer: "6 Ω",
        explanation: "Using Ohm's Law: R = V/I. R = 12/2 = 6 ohms."
      }
    ];
    
    const mediumQuestions = [
      {
        text: "A capacitor of 5μF is connected to a 12V battery. Calculate the charge stored in the capacitor.",
        answer: "60 μC",
        explanation: "Using the formula Q = C × V. Q = 5 × 10⁻⁶ × 12 = 60 × 10⁻⁶ = 60 μC."
      },
      {
        text: "Calculate the equivalent resistance of three resistors R₁ = 3Ω, R₂ = 6Ω, and R₃ = 12Ω connected in parallel.",
        answer: "2 Ω",
        explanation: "For parallel resistors: 1/Req = 1/R₁ + 1/R₂ + 1/R₃. 1/Req = 1/3 + 1/6 + 1/12 = 4/12 + 2/12 + 1/12 = 7/12. Req = 12/7 ≈ 1.71Ω ≈ 2Ω."
      }
    ];
    
    const hardQuestions = [
      {
        text: "In an RLC series circuit with R = 10Ω, L = 5H, and C = 8μF, what is the resonant frequency?",
        answer: "0.05 Hz",
        explanation: "Using the formula f = 1/(2π√(LC)). f = 1/(2π√(5 × 8 × 10⁻⁶)) = 1/(2π√(40 × 10⁻⁶)) = 1/(2π × 6.32 × 10⁻³) ≈ 0.05 Hz."
      },
      {
        text: "A mass attached to a spring oscillates with a period of 2s. If the spring constant is 8π² N/m, what is the mass in kg?",
        answer: "2 kg",
        explanation: "Using T = 2π√(m/k). 2 = 2π√(m/(8π²)). 1 = π√(m/(8π²)). 1/π = √(m/(8π²)). 1/π² = m/(8π²). m = 8π² × 1/π² = 8 × π²/π² = 8 × 1 = 8/4 = 2 kg."
      }
    ];
    
    // Select questions based on difficulty
    let questionPool;
    if (difficulty === 'easy') {
      questionPool = easyQuestions;
      setCurrentHint("Remember the basic formula and substitute the values directly.");
    } else if (difficulty === 'medium') {
      questionPool = mediumQuestions;
      setCurrentHint("Break down the problem into steps and use the appropriate formula for each step.");
    } else {
      questionPool = hardQuestions;
      setCurrentHint("Consider all relevant formulas and physical principles, then approach step by step.");
    }
    
    // Randomly select a question
    const randomIndex = Math.floor(Math.random() * questionPool.length);
    const selectedQuestion = questionPool[randomIndex];
    
    // Create a new question with unique ID
    const newQuestion = {
      id: Date.now().toString(),
      text: selectedQuestion.text,
      answer: selectedQuestion.answer,
      difficulty: difficulty,
      solved: false,
      explanation: selectedQuestion.explanation
    };
    
    // Add to list of generated questions
    setGeneratedQuestions(prev => [...prev, newQuestion]);
    setActiveQuestionId(newQuestion.id);
    
    // Simulate generation delay
    setTimeout(() => {
      setGeneratingQuestion(false);
      toast({
        title: `New ${difficulty} question generated`,
        description: "Answer the question to improve your formula skills.",
        variant: "default"
      });
    }, 1000);
  };

  // Handle submitting an answer
  const handleSubmitAnswer = () => {
    if (!activeQuestion) return;
    
    // Process and compare answers
    const normalizedUserAnswer = userAnswer.toLowerCase().replace(/\s+/g, '');
    const normalizedCorrectAnswer = activeQuestion.answer.toLowerCase().replace(/\s+/g, '');
    
    // Check if answer is correct
    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      // Update question state
      setGeneratedQuestions(prev => 
        prev.map(q => 
          q.id === activeQuestion.id ? {...q, solved: true} : q
        )
      );
      
      // Show success message
      toast({
        title: "Correct answer!",
        description: "Well done! You've solved this formula problem correctly.",
        variant: "default",
      });
      
      setShowAnswer(true);
    } else {
      // Show error message
      toast({
        title: "Not quite right",
        description: "Try again or check the answer for guidance.",
        variant: "destructive",
      });
    }
  };

  // Handle calculator functions
  const handleCalculatorInput = (value: string) => {
    if (calculatorValue === '0' && !['/', '*', '-', '+', '.'].includes(value)) {
      setCalculatorValue(value);
    } else {
      setCalculatorValue(prev => prev + value);
    }
  };

  const handleCalculatorClear = () => {
    setCalculatorValue('0');
  };

  const handleCalculatorEquals = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(calculatorValue);
      setCalculatorHistory(prev => [...prev, `${calculatorValue} = ${result}`]);
      setCalculatorValue(result.toString());
    } catch (error) {
      setCalculatorValue('Error');
    }
  };

  // File upload handling
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUserFile(files[0]);
    }
  };

  const processFile = () => {
    if (!userFile) return;
    
    setUploadingFile(true);
    
    // Simulate file processing
    setTimeout(() => {
      setUploadingFile(false);
      toast({
        title: "File processed successfully",
        description: `Found 3 formulas in "${userFile.name}" that match your current concept.`,
        variant: "default",
      });
      
      // Generate a custom question based on "file content"
      const newQuestion = {
        id: Date.now().toString(),
        text: `Based on the formula in your uploaded file: Calculate the result when using the main equation with values x=5 and y=3.`,
        answer: "15",
        difficulty: "custom",
        solved: false,
        explanation: "Using the formula from your file: result = xy. Substituting x=5, y=3: result = 5×3 = 15."
      };
      
      setGeneratedQuestions(prev => [...prev, newQuestion]);
      setActiveQuestionId(newQuestion.id);
    }, 2000);
  };

  // Go back to concept detail
  const handleGoBack = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formulas`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleGoBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to {conceptData?.title || 'Concept'}</span>
        </Button>
      </div>

      <Card className="bg-white dark:bg-gray-950">
        <CardHeader>
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div>
              <CardTitle className="text-xl">Formula Lab</CardTitle>
              <CardDescription>Master formulas through interactive practice</CardDescription>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="practice">Practice</TabsTrigger>
                <TabsTrigger value="reference">Formula Reference</TabsTrigger>
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        
        <CardContent>
          <TabsContent value="practice" className="mt-0">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Side: Question Area */}
              <div className="space-y-4">
                {/* Question generation controls */}
                <div className="flex flex-wrap gap-3 items-center">
                  <Select 
                    value={difficulty} 
                    onValueChange={setDifficulty}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    onClick={generateQuestion}
                    disabled={generatingQuestion}
                  >
                    {generatingQuestion ? 'Generating...' : 'Generate Question'}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setShowHint(!showHint)}
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </Button>

                  <Button 
                    variant="outline"
                    onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculator
                  </Button>
                </div>
                
                {/* Current Question Display */}
                {activeQuestion && (
                  <Card className="relative border-l-4 border-l-blue-600">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="default">
                          {activeQuestion.difficulty.charAt(0).toUpperCase() + activeQuestion.difficulty.slice(1)}
                        </Badge>
                        {activeQuestion.solved && (
                          <Badge className="bg-green-600">
                            <Check className="h-3 w-3 mr-1" /> Solved
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-medium">{activeQuestion.text}</p>
                      
                      {/* Hint section */}
                      {showHint && (
                        <Alert className="mt-4 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
                          <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          <AlertTitle>Hint</AlertTitle>
                          <AlertDescription>{currentHint}</AlertDescription>
                        </Alert>
                      )}
                      
                      {/* Answer input */}
                      <div className="mt-4 space-y-3">
                        <Label htmlFor="answer">Your Answer</Label>
                        <Input
                          id="answer"
                          placeholder="Enter your answer here..."
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          disabled={showAnswer}
                        />
                      </div>
                      
                      {/* Show answer section */}
                      {(showAnswer || activeQuestion.solved) && (
                        <Alert className="mt-4 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                          <Check className="h-4 w-4 text-green-600" />
                          <AlertTitle>Correct Answer</AlertTitle>
                          <AlertDescription>
                            <p className="font-bold">{activeQuestion.answer}</p>
                            <p className="mt-2 text-sm">{activeQuestion.explanation}</p>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowAnswer(!showAnswer)}
                      >
                        {showAnswer ? 'Hide Answer' : 'Show Answer'}
                      </Button>
                      <Button onClick={handleSubmitAnswer} disabled={showAnswer || !userAnswer}>
                        Submit Answer
                      </Button>
                    </CardFooter>
                  </Card>
                )}
                
                {/* File upload section */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Upload Problem Sheet</CardTitle>
                    <CardDescription>
                      Upload a PDF or image with formulas to practice
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md text-center">
                      <FileQuestion className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="mb-4 text-sm text-muted-foreground">
                        Upload a document with formulas to generate practice questions
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="gap-2"
                        >
                          <Upload className="h-4 w-4" /> 
                          Select File
                        </Button>
                        <Button
                          disabled={!userFile || uploadingFile}
                          onClick={processFile}
                        >
                          {uploadingFile ? 'Processing...' : 'Process File'}
                        </Button>
                      </div>
                      {userFile && (
                        <p className="mt-2 text-sm">
                          Selected: {userFile.name}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Side: Calculator & History */}
              <div>
                {isCalculatorOpen && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Scientific Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="calculator-display bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3 text-right text-xl font-mono">
                        {calculatorValue}
                      </div>
                      <div className="calculator-buttons grid grid-cols-4 gap-1">
                        {['7', '8', '9', '/'].map(btn => (
                          <Button 
                            key={btn}
                            variant="outline" 
                            className="h-10 font-mono"
                            onClick={() => handleCalculatorInput(btn)}
                          >
                            {btn}
                          </Button>
                        ))}
                        {['4', '5', '6', '*'].map(btn => (
                          <Button 
                            key={btn}
                            variant="outline" 
                            className="h-10 font-mono"
                            onClick={() => handleCalculatorInput(btn)}
                          >
                            {btn}
                          </Button>
                        ))}
                        {['1', '2', '3', '-'].map(btn => (
                          <Button 
                            key={btn}
                            variant="outline" 
                            className="h-10 font-mono"
                            onClick={() => handleCalculatorInput(btn)}
                          >
                            {btn}
                          </Button>
                        ))}
                        {['0', '.', '=', '+'].map(btn => (
                          <Button 
                            key={btn}
                            variant="outline" 
                            className="h-10 font-mono"
                            onClick={() => btn === '=' ? handleCalculatorEquals() : handleCalculatorInput(btn)}
                          >
                            {btn}
                          </Button>
                        ))}
                        <Button 
                          variant="outline" 
                          className="h-10 font-mono col-span-4"
                          onClick={handleCalculatorClear}
                        >
                          Clear
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col items-start">
                      <h4 className="text-sm font-medium mb-2">Calculation History</h4>
                      <ScrollArea className="h-32 w-full">
                        {calculatorHistory.length > 0 ? (
                          <ul className="space-y-2 text-sm">
                            {calculatorHistory.map((calc, idx) => (
                              <li key={idx} className="font-mono">{calc}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground">No calculations yet</p>
                        )}
                      </ScrollArea>
                    </CardFooter>
                  </Card>
                )}
                
                {/* Practice history */}
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Practice History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {generatedQuestions.length > 0 ? (
                      <div className="space-y-2">
                        {generatedQuestions.map(q => (
                          <div 
                            key={q.id}
                            className={`
                              p-3 rounded-md cursor-pointer border flex items-center justify-between
                              ${q.id === activeQuestionId ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : ''}
                              ${q.solved ? 'border-green-200' : 'border-gray-200 dark:border-gray-700'}
                            `}
                            onClick={() => setActiveQuestionId(q.id)}
                          >
                            <div className="flex items-center">
                              <Badge variant="default" className="mr-2">
                                {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                              </Badge>
                              <p className="text-sm line-clamp-1">{q.text}</p>
                            </div>
                            {q.solved && <Check className="h-4 w-4 text-green-600" />}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No practice history yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reference" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Formula Reference</CardTitle>
                <CardDescription>Key formulas related to this concept</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-semibold mb-2">Kinetic Energy</h3>
                    <p className="text-lg font-mono mb-2">KE = 0.5 × m × v²</p>
                    <p className="text-sm text-muted-foreground">
                      Where KE is kinetic energy (Joules), m is mass (kg), and v is velocity (m/s).
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-semibold mb-2">Ohm's Law</h3>
                    <p className="text-lg font-mono mb-2">V = I × R</p>
                    <p className="text-sm text-muted-foreground">
                      Where V is voltage (Volts), I is current (Amperes), and R is resistance (Ohms).
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-semibold mb-2">Capacitance</h3>
                    <p className="text-lg font-mono mb-2">Q = C × V</p>
                    <p className="text-sm text-muted-foreground">
                      Where Q is charge (Coulombs), C is capacitance (Farads), and V is voltage (Volts).
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-semibold mb-2">Resonant Frequency</h3>
                    <p className="text-lg font-mono mb-2">f = 1 / (2π × √(LC))</p>
                    <p className="text-sm text-muted-foreground">
                      Where f is frequency (Hz), L is inductance (Henries), and C is capacitance (Farads).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calculator" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Scientific Calculator</CardTitle>
                <CardDescription>
                  Use this calculator for solving formula problems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="calculator-display bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3 text-right text-xl font-mono">
                  {calculatorValue}
                </div>
                <div className="calculator-buttons grid grid-cols-4 gap-1">
                  {/* Basic number pad */}
                  {['7', '8', '9', '/'].map(btn => (
                    <Button 
                      key={btn}
                      variant="outline" 
                      className="h-10 font-mono"
                      onClick={() => handleCalculatorInput(btn)}
                    >
                      {btn}
                    </Button>
                  ))}
                  {['4', '5', '6', '*'].map(btn => (
                    <Button 
                      key={btn}
                      variant="outline" 
                      className="h-10 font-mono"
                      onClick={() => handleCalculatorInput(btn)}
                    >
                      {btn}
                    </Button>
                  ))}
                  {['1', '2', '3', '-'].map(btn => (
                    <Button 
                      key={btn}
                      variant="outline" 
                      className="h-10 font-mono"
                      onClick={() => handleCalculatorInput(btn)}
                    >
                      {btn}
                    </Button>
                  ))}
                  {['0', '.', '=', '+'].map(btn => (
                    <Button 
                      key={btn}
                      variant="outline" 
                      className="h-10 font-mono"
                      onClick={() => btn === '=' ? handleCalculatorEquals() : handleCalculatorInput(btn)}
                    >
                      {btn}
                    </Button>
                  ))}
                  
                  {/* Scientific functions */}
                  {['sin', 'cos', 'tan', '^'].map(btn => (
                    <Button 
                      key={btn}
                      variant="outline" 
                      className="h-10 font-mono"
                      onClick={() => handleCalculatorInput(btn === '^' ? '**' : `Math.${btn}(`)}
                    >
                      {btn}
                    </Button>
                  ))}
                  {['(', ')', 'π', '√'].map(btn => (
                    <Button 
                      key={btn}
                      variant="outline" 
                      className="h-10 font-mono"
                      onClick={() => handleCalculatorInput(
                        btn === 'π' ? 'Math.PI' : 
                        btn === '√' ? 'Math.sqrt(' : 
                        btn
                      )}
                    >
                      {btn}
                    </Button>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="h-10 font-mono col-span-4"
                    onClick={handleCalculatorClear}
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start">
                <h4 className="text-sm font-medium mb-2">Calculation History</h4>
                <ScrollArea className="h-40 w-full">
                  {calculatorHistory.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {calculatorHistory.map((calc, idx) => (
                        <li key={idx} className="font-mono">{calc}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No calculations yet</p>
                  )}
                </ScrollArea>
              </CardFooter>
            </Card>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaLab;
