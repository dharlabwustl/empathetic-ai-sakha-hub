
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertCircle, Book, Calculator, CheckCircle, File, ArrowLeft, Plus, Eye } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const FormulaLabPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentTab, setCurrentTab] = useState('practice');
  const [difficultyLevel, setDifficultyLevel] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [showAnswers, setShowAnswers] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [solvedSteps, setSolvedSteps] = useState<Record<number, string[]>>({});
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  // Mock concept data - In a real app, fetch based on conceptId
  const concept = {
    id: parseInt(conceptId || "1"),
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Mechanics",
    description: "Understanding the principles of motion and forces in classical mechanics",
    formulas: [
      { id: 1, equation: "F = m·a", name: "Newton's Second Law" },
      { id: 2, equation: "a = F/m", name: "Acceleration Formula" },
      { id: 3, equation: "F₁ = -F₂", name: "Newton's Third Law" }
    ]
  };

  // Mock questions based on difficulty level
  const generateQuestions = (count: number, difficulty: string) => {
    const questions = [];
    for (let i = 1; i <= count; i++) {
      let question, answer;
      
      if (difficulty === 'easy') {
        question = `A block of mass ${2 + i} kg is pushed with a force of ${5 * i} N. What is its acceleration?`;
        answer = `${(5 * i) / (2 + i)} m/s²`;
      } else if (difficulty === 'medium') {
        question = `A block of mass ${3 + i} kg is placed on a frictionless inclined plane making an angle of ${15 + i}° with the horizontal. Calculate the acceleration of the block down the plane.`;
        answer = `${(9.8 * Math.sin((15 + i) * Math.PI / 180)).toFixed(2)} m/s²`;
      } else {
        question = `A rocket of mass ${1000 * i} kg expels gas at a rate of ${50 + i} kg/s with a relative velocity of ${3000 - i * 100} m/s. Calculate the thrust produced by the rocket engine.`;
        answer = `${((50 + i) * (3000 - i * 100)).toLocaleString()} N`;
      }
      
      questions.push({ id: i, question, answer });
    }
    return questions;
  };

  const questions = generateQuestions(numQuestions, difficultyLevel);

  const handleBack = () => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      // In a real app, you would process the file to extract answers
    }
  };

  const handleAnswerSubmit = (questionId: number) => {
    const userAnswer = userAnswers[questionId] || '';
    const correctAnswer = questions.find(q => q.id === questionId)?.answer || '';
    
    // Simple answer checking that ignores spaces and is case-insensitive
    const normalizedUserAnswer = userAnswer.replace(/\s+/g, '').toLowerCase();
    const normalizedCorrectAnswer = correctAnswer.replace(/\s+/g, '').toLowerCase();
    
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    
    // Track solved steps
    const previousSteps = solvedSteps[questionId] || [];
    const newStep = isCorrect 
      ? `✓ Correct! ${correctAnswer}` 
      : `✗ Your answer (${userAnswer}) was incorrect. The correct answer is ${correctAnswer}.`;
    
    setSolvedSteps({
      ...solvedSteps,
      [questionId]: [...previousSteps, newStep]
    });
    
    setSubmittedAnswers({
      ...submittedAnswers,
      [questionId]: isCorrect
    });
  };

  const handleGenerateQuestions = () => {
    // Reset user answers and submit state when generating new questions
    setUserAnswers({});
    setSubmittedAnswers({});
    setSolvedSteps({});
    setActiveQuestion(null);
  };

  const handleShowAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  return (
    <SharedPageLayout
      title="Formula Lab"
      subtitle={`Practice ${concept.title} formulas and calculations`}
    >
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          className="mb-4 flex items-center gap-1"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Concept</span>
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{concept.title} - Formula Lab</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{concept.subject} • {concept.chapter}</p>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                Interactive Practice
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {concept.formulas.map(formula => (
                <Card key={formula.id} className="bg-gray-50 dark:bg-gray-800/50">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium mb-1">{formula.name}</p>
                    <p className="text-lg font-semibold">{formula.equation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs
              value={currentTab}
              onValueChange={setCurrentTab}
              className="space-y-4"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="practice" className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Practice
                </TabsTrigger>
                <TabsTrigger value="calculator" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Calculator
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <File className="h-4 w-4" />
                  Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="practice" className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="difficultyLevel" className="text-sm">Difficulty</Label>
                    <Select
                      value={difficultyLevel}
                      onValueChange={(value: 'easy' | 'medium' | 'hard') => setDifficultyLevel(value)}
                    >
                      <SelectTrigger className="w-[150px]" id="difficultyLevel">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="numQuestions" className="text-sm">Number of Questions</Label>
                    <Input 
                      id="numQuestions"
                      type="number"
                      min={1}
                      max={20}
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(parseInt(e.target.value) || 5)}
                      className="w-[100px]"
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <Button onClick={handleGenerateQuestions} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Generate Questions
                    </Button>
                  </div>
                  
                  <div className="flex items-end ml-auto">
                    <Button 
                      variant="outline" 
                      onClick={handleShowAnswers} 
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      {showAnswers ? "Hide Answers" : "Show Answers"}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {questions.map(question => (
                    <Card key={question.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 dark:bg-gray-800/50 p-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-medium flex items-center">
                            <span className="mr-2">Question {question.id}</span>
                            {submittedAnswers[question.id] === true && (
                              <Badge variant="outline" className="bg-green-100 text-green-800">Correct</Badge>
                            )}
                            {submittedAnswers[question.id] === false && (
                              <Badge variant="outline" className="bg-red-100 text-red-800">Incorrect</Badge>
                            )}
                          </CardTitle>
                          <Badge>
                            {difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="mb-4">{question.question}</p>
                        
                        {/* Answer input section */}
                        <div className="space-y-2">
                          <Label htmlFor={`answer-${question.id}`}>Your Answer</Label>
                          <div className="flex gap-2">
                            <Input
                              id={`answer-${question.id}`}
                              value={userAnswers[question.id] || ''}
                              onChange={(e) => setUserAnswers({
                                ...userAnswers,
                                [question.id]: e.target.value
                              })}
                              placeholder="Enter your answer"
                            />
                            <Button onClick={() => handleAnswerSubmit(question.id)}>Submit</Button>
                          </div>
                          
                          {/* Show answer section */}
                          {showAnswers && (
                            <Alert className="mt-2 bg-yellow-50 dark:bg-yellow-900/20">
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                              <AlertTitle>Answer</AlertTitle>
                              <AlertDescription>{question.answer}</AlertDescription>
                            </Alert>
                          )}
                          
                          {/* Step-by-step solution section */}
                          {solvedSteps[question.id] && solvedSteps[question.id].length > 0 && (
                            <div className="mt-4 border rounded-md p-3 bg-gray-50 dark:bg-gray-800/50">
                              <h4 className="font-medium text-sm mb-2">Solution Steps:</h4>
                              <ul className="space-y-2 text-sm">
                                {solvedSteps[question.id].map((step, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="font-mono">{index + 1}.</span>
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calculator" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Formula Calculator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="formula">Select Formula</Label>
                        <Select defaultValue="f_ma">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a formula" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="f_ma">F = m·a (Force)</SelectItem>
                            <SelectItem value="a_fm">a = F/m (Acceleration)</SelectItem>
                            <SelectItem value="m_fa">m = F/a (Mass)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="mass">Mass (kg)</Label>
                          <Input id="mass" placeholder="Enter mass" />
                        </div>
                        <div>
                          <Label htmlFor="acceleration">Acceleration (m/s²)</Label>
                          <Input id="acceleration" placeholder="Enter acceleration" />
                        </div>
                      </div>
                      
                      <Button className="w-full">Calculate Force</Button>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md mt-4">
                        <p className="font-medium">Result:</p>
                        <p className="text-xl font-bold mt-1">Force = 0 N</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Answer Sheet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Upload your answer sheet document to check your answers against the correct solutions.
                      </p>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="fileUpload">Upload File</Label>
                        <Input 
                          id="fileUpload" 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                        />
                      </div>
                      
                      {uploadedFile && (
                        <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-md mt-4">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <div>
                            <p className="font-medium">File uploaded successfully</p>
                            <p className="text-sm text-muted-foreground">{uploadedFile.name}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="ml-auto"
                          >
                            Analyze Answers
                          </Button>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Upload Guidelines:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li>File must be PDF, DOC, or JPG format</li>
                          <li>Answers should be clearly marked</li>
                          <li>One answer per line for best results</li>
                          <li>Maximum file size: 10MB</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default FormulaLabPage;
