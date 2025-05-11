
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Calculator, XCircle, FileUp, RefreshCw, CheckCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const FormulaLabPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { toast } = useToast();
  
  // State for formula and calculator
  const [formula, setFormula] = useState<string>('F = m×a');
  const [calculatorInput, setCalculatorInput] = useState<string>('');
  const [calculatorResult, setCalculatorResult] = useState<string | null>(null);

  // State for questions
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [answerResult, setAnswerResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [solutionSteps, setSolutionSteps] = useState<string[]>([]);
  
  // State for difficulty level selection
  const [difficultyLevel, setDifficultyLevel] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
  
  // State for file upload
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUploadResult, setFileUploadResult] = useState<string | null>(null);

  // Dummy data for concept (in a real app, fetch this from API)
  const concept = {
    id: conceptId,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    formulas: [
      { id: 1, name: "Newton's Second Law", formula: "F = m×a" },
      { id: 2, name: "Weight Formula", formula: "W = m×g" },
      { id: 3, name: "Momentum", formula: "p = m×v" }
    ]
  };

  // Sample questions based on difficulty
  const sampleQuestions = {
    easy: [
      { 
        id: 1, 
        question: "Calculate the force needed to accelerate a 2 kg object at 5 m/s².", 
        answer: "10 N",
        solution: ["Identify the formula: F = m×a", "Substitute the values: F = 2 kg × 5 m/s²", "Calculate: F = 10 N"]
      },
      { 
        id: 2, 
        question: "What is the weight of a 10 kg object on Earth? (g = 9.8 m/s²)", 
        answer: "98 N",
        solution: ["Use the weight formula: W = m×g", "Substitute the values: W = 10 kg × 9.8 m/s²", "Calculate: W = 98 N"]
      }
    ],
    medium: [
      { 
        id: 3, 
        question: "A 1500 kg car accelerates from 0 to 27 m/s in 9 seconds. Calculate the net force acting on the car.", 
        answer: "4500 N",
        solution: [
          "Find the acceleration: a = Δv/Δt = (27 - 0)/9 = 3 m/s²", 
          "Use Newton's Second Law: F = m×a", 
          "Substitute values: F = 1500 kg × 3 m/s²",
          "Calculate: F = 4500 N"
        ]
      },
      { 
        id: 4, 
        question: "Two forces act on an object: 8 N east and 6 N north. Calculate the magnitude of the resultant force.", 
        answer: "10 N",
        solution: [
          "Use the Pythagorean theorem to find the resultant: F = √(F₁² + F₂²)",
          "Substitute values: F = √(8² + 6²) = √(64 + 36) = √100",
          "Calculate: F = 10 N"
        ]
      }
    ],
    hard: [
      { 
        id: 5, 
        question: "A rocket of mass 5000 kg ejects gas at a rate of 50 kg/s with a relative velocity of 2000 m/s. Calculate the thrust produced by the rocket engine.", 
        answer: "100000 N",
        solution: [
          "Use the thrust equation: T = ṁ×v_e",
          "Where ṁ is mass flow rate and v_e is exhaust velocity",
          "Substitute values: T = 50 kg/s × 2000 m/s",
          "Calculate: T = 100000 N"
        ]
      },
      { 
        id: 6, 
        question: "A 0.5 kg block slides down a frictionless inclined plane with an angle of 30° to the horizontal. Calculate the acceleration of the block.", 
        answer: "4.9 m/s²",
        solution: [
          "The force acting down the plane is F = mg×sin(θ)",
          "Using Newton's Second Law: ma = mg×sin(θ)",
          "Therefore: a = g×sin(θ) = 9.8 m/s² × sin(30°)",
          "a = 9.8 m/s² × 0.5 = 4.9 m/s²"
        ]
      }
    ]
  };

  // Generate questions based on difficulty and number
  const generateQuestions = () => {
    // In a real app, this would fetch from an API
    let generatedQuestions: any[] = [];
    
    // For demo, we'll use the sample questions and duplicate them if needed
    const baseQuestions = sampleQuestions[difficultyLevel];
    
    for (let i = 0; i < numberOfQuestions; i++) {
      // Cycle through base questions if we need more than we have
      const baseQuestion = baseQuestions[i % baseQuestions.length];
      generatedQuestions.push({
        ...baseQuestion,
        id: i + 1, // Give each question a unique ID
        question: i >= baseQuestions.length 
          ? `Question ${i+1}: ${baseQuestion.question.replace(/\d+/g, n => Math.floor(Math.random() * 10) + 1)}` 
          : baseQuestion.question
      });
    }
    
    setQuestions(generatedQuestions);
    setSelectedQuestion(null);
    setUserAnswer('');
    setAnswerResult(null);
    setShowSolution(false);
    
    toast({
      title: "Questions Generated",
      description: `${numberOfQuestions} ${difficultyLevel} questions ready for practice`,
    });
  };

  // Handle formula selection
  const handleFormulaSelect = (formula: string) => {
    setFormula(formula);
    setCalculatorInput('');
    setCalculatorResult(null);
  };

  // Handle calculator calculation
  const handleCalculate = () => {
    try {
      // Very simple calculator implementation - in a real app use a proper math library
      // This is just for demonstration
      const result = eval(calculatorInput.replace('×', '*'));
      setCalculatorResult(result.toString());
    } catch (error) {
      setCalculatorResult('Error');
      toast({
        title: "Calculation Error",
        description: "Please check your input formula",
        variant: "destructive",
      });
    }
  };

  // Handle question selection
  const handleSelectQuestion = (index: number) => {
    setSelectedQuestion(index);
    setUserAnswer('');
    setAnswerResult(null);
    setShowSolution(false);
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (selectedQuestion === null) return;
    
    const question = questions[selectedQuestion];
    
    // Normalize answers for comparison (remove spaces, convert to lowercase)
    const normalizedUserAnswer = userAnswer.replace(/\s+/g, '').toLowerCase();
    const normalizedCorrectAnswer = question.answer.replace(/\s+/g, '').toLowerCase();
    
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    
    setAnswerResult(isCorrect ? 'correct' : 'incorrect');
    setSolutionSteps(question.solution);
    
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Well done, your answer is correct.",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Try again or check the solution.",
        variant: "destructive",
      });
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
      
      toast({
        title: "File Uploaded",
        description: `${e.target.files[0].name} ready for processing`,
      });
    }
  };

  const handleFileSubmit = () => {
    if (!uploadedFile) return;
    
    // In a real app, this would send the file to a server for processing
    // For demo purposes, we'll simulate a successful match
    setFileUploadResult('Document answers match with 80% accuracy');
    
    toast({
      title: "Document Processed",
      description: "Your document has been analyzed successfully",
    });
  };

  // Generate initial questions when component mounts
  useEffect(() => {
    generateQuestions();
  }, []);

  return (
    <SharedPageLayout
      title="Formula Lab"
      subtitle={`Interactive formula practice for ${concept.title}`}
      showBackButton
      backButtonUrl={`/dashboard/student/concepts/${conceptId}`}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl">Formula Practice</CardTitle>
                <CardDescription>{concept.title} - Interactive Formula Lab</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                  {concept.subject}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="generator">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="generator">Question Generator</TabsTrigger>
                <TabsTrigger value="calculator">Formula Calculator</TabsTrigger>
                <TabsTrigger value="upload">Answer Matcher</TabsTrigger>
              </TabsList>

              {/* Question Generator Tab */}
              <TabsContent value="generator" className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Control Panel */}
                  <div className="w-full lg:w-1/3 space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Controls</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Difficulty Setting */}
                        <div className="space-y-2">
                          <Label htmlFor="difficulty">Difficulty Level</Label>
                          <Select 
                            value={difficultyLevel} 
                            onValueChange={(value) => setDifficultyLevel(value as 'easy' | 'medium' | 'hard')}
                          >
                            <SelectTrigger id="difficulty" className="w-full">
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Number of Questions */}
                        <div className="space-y-2">
                          <Label htmlFor="numQuestions">Number of Questions</Label>
                          <Select 
                            value={numberOfQuestions.toString()} 
                            onValueChange={(value) => setNumberOfQuestions(parseInt(value))}
                          >
                            <SelectTrigger id="numQuestions" className="w-full">
                              <SelectValue placeholder="Select number of questions" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3 Questions</SelectItem>
                              <SelectItem value="5">5 Questions</SelectItem>
                              <SelectItem value="10">10 Questions</SelectItem>
                              <SelectItem value="15">15 Questions</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Generate Button */}
                        <Button 
                          className="w-full mt-4 flex items-center gap-2"
                          onClick={generateQuestions}
                        >
                          <RefreshCw className="w-4 h-4" />
                          Generate New Questions
                        </Button>
                        
                        {/* Question List */}
                        <div className="mt-6 space-y-2">
                          <h4 className="font-medium text-sm">Questions</h4>
                          <div className="grid grid-cols-3 gap-2">
                            {questions.map((q, index) => (
                              <Button
                                key={q.id}
                                size="sm"
                                variant={selectedQuestion === index ? "default" : "outline"}
                                onClick={() => handleSelectQuestion(index)}
                              >
                                {index + 1}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Question & Answer Area */}
                  <div className="w-full lg:w-2/3 space-y-4">
                    {selectedQuestion !== null ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Question {selectedQuestion + 1}
                          </CardTitle>
                          <CardDescription>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 capitalize">
                              {difficultyLevel} Difficulty
                            </Badge>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                            {questions[selectedQuestion].question}
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="answer">Your Answer</Label>
                            <div className="flex gap-2">
                              <Input 
                                id="answer"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                disabled={showSolution}
                                className="flex-1"
                              />
                              <Button onClick={handleSubmitAnswer} disabled={showSolution}>
                                Submit
                              </Button>
                            </div>
                          </div>
                          
                          {answerResult && (
                            <div className={`flex items-center gap-2 p-3 rounded-md ${
                              answerResult === 'correct' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                            }`}>
                              {answerResult === 'correct' ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <XCircle className="h-5 w-5" />
                              )}
                              <span>{answerResult === 'correct' ? 'Correct answer!' : 'Incorrect answer'}</span>
                            </div>
                          )}
                          
                          {answerResult === 'incorrect' && !showSolution && (
                            <Button 
                              variant="outline" 
                              onClick={() => setShowSolution(true)}
                              className="w-full"
                            >
                              Show Solution
                            </Button>
                          )}
                          
                          {showSolution && (
                            <div className="space-y-3">
                              <h4 className="font-medium">Solution Steps:</h4>
                              <div className="space-y-2">
                                {solutionSteps.map((step, index) => (
                                  <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-start gap-2">
                                      <div className="mt-0.5">
                                        <CheckCheck className="h-4 w-4 text-green-500" />
                                      </div>
                                      <span>{step}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                                <span className="font-medium">Final Answer: </span>
                                <span>{questions[selectedQuestion].answer}</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="flex items-center justify-center h-60 border-2 border-dashed rounded-md border-gray-300 dark:border-gray-700">
                        <div className="text-center">
                          <h3 className="font-medium mb-1">No Question Selected</h3>
                          <p className="text-muted-foreground text-sm">Select a question from the list to begin</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Formula Calculator Tab */}
              <TabsContent value="calculator">
                <div className="space-y-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Formula Selection */}
                    <Card className="w-full lg:w-1/3">
                      <CardHeader>
                        <CardTitle className="text-lg">Select Formula</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup 
                          value={formula} 
                          onValueChange={handleFormulaSelect}
                          className="space-y-3"
                        >
                          {concept.formulas.map((f) => (
                            <div 
                              key={f.id} 
                              className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                              onClick={() => handleFormulaSelect(f.formula)}
                            >
                              <RadioGroupItem value={f.formula} id={`formula-${f.id}`} />
                              <div>
                                <Label htmlFor={`formula-${f.id}`} className="font-medium">
                                  {f.name}
                                </Label>
                                <p className="text-sm text-muted-foreground">{f.formula}</p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </CardContent>
                    </Card>

                    {/* Calculator */}
                    <Card className="w-full lg:w-2/3">
                      <CardHeader>
                        <CardTitle className="text-lg">Formula Calculator</CardTitle>
                        <CardDescription>
                          Current Formula: <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">{formula}</code>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="calculation">Enter expression to calculate</Label>
                          <Input 
                            id="calculation"
                            value={calculatorInput} 
                            onChange={(e) => setCalculatorInput(e.target.value)} 
                            placeholder="e.g. 2×5"
                          />
                        </div>
                        
                        <Button 
                          onClick={handleCalculate}
                          className="w-full flex items-center gap-2"
                        >
                          <Calculator className="w-4 h-4" />
                          Calculate
                        </Button>
                        
                        {calculatorResult && (
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mt-4">
                            <div className="text-sm text-muted-foreground mb-1">Result:</div>
                            <div className="text-xl font-mono">{calculatorResult}</div>
                          </div>
                        )}
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md mt-4">
                          <h3 className="font-medium mb-2">Formula Help</h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            Enter values with the appropriate operations. Use × for multiplication.
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                              <code>2×5</code> = 10
                            </div>
                            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                              <code>10/2</code> = 5
                            </div>
                            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                              <code>5+3</code> = 8
                            </div>
                            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                              <code>9-4</code> = 5
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Answer Matcher Tab */}
              <TabsContent value="upload">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Upload Document</CardTitle>
                      <CardDescription>
                        Upload a document with your work to match answers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-2 border-dashed rounded-md border-gray-300 dark:border-gray-700 p-6">
                        <div className="flex flex-col items-center justify-center">
                          <FileUp className="h-8 w-8 text-muted-foreground mb-4" />
                          <h3 className="font-medium mb-1">Upload Answer Document</h3>
                          <p className="text-muted-foreground text-sm mb-4 text-center">
                            Upload a PDF or image document with your work to automatically check your answers
                          </p>
                          <Input
                            type="file"
                            className="max-w-xs"
                            onChange={handleFileChange}
                            accept=".pdf,image/*"
                          />
                        </div>
                      </div>
                      
                      {uploadedFile && (
                        <>
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md flex justify-between items-center">
                            <span>{uploadedFile.name}</span>
                            <Button size="sm" onClick={() => setUploadedFile(null)}>Remove</Button>
                          </div>
                          
                          <Button 
                            onClick={handleFileSubmit} 
                            className="w-full"
                          >
                            Process Document
                          </Button>
                        </>
                      )}
                      
                      {fileUploadResult && (
                        <div className="p-4 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded-md">
                          <h3 className="font-medium mb-2">Result</h3>
                          <p>{fileUploadResult}</p>
                        </div>
                      )}
                      
                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-2">Processing Information</h3>
                        <p className="text-muted-foreground text-sm">
                          Our system will analyze your uploaded document and match your work against the correct answers. 
                          The system can handle different formats of answers and ignores spaces or gaps in your notation.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default FormulaLabPage;
