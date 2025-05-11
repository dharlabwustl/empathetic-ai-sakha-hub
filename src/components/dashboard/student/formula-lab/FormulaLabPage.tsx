
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import {
  ChevronLeft,
  Check,
  X,
  Calculator,
  Upload,
  RefreshCw,
  ArrowRight,
  FileText,
  Eye,
  CheckCircle,
  Download,
  HelpCircle,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

// Enhanced styling for different difficulty levels
const DifficultyBadge = ({ level }: { level: string }) => {
  const classes = {
    easy: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    hard: "bg-red-100 text-red-800 border-red-200",
  }[level.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";
  
  return (
    <Badge variant="outline" className={classes}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </Badge>
  );
};

const FormulaLabPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // States for the formula lab
  const [activeTab, setActiveTab] = useState('practice');
  const [difficulty, setDifficulty] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState<Array<{
    id: number;
    question: string;
    answer: string;
    userAnswer: string;
    isCorrect: boolean | null;
    steps: string[];
    currentStep: number;
    showAnswer: boolean;
    hint?: string;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showHelperTools, setShowHelperTools] = useState(false);
  
  // Mock concept data
  const conceptData = {
    id: conceptId,
    title: `Newton's Laws of Motion`,
    subject: 'Physics',
    description: 'Understanding the fundamental principles that govern motion and force.',
  };
  
  // Function to generate questions based on difficulty and number
  const generateQuestions = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newQuestions = Array(numQuestions).fill(null).map((_, index) => ({
        id: index + 1,
        question: generateQuestionByDifficulty(difficulty, index),
        answer: generateAnswerByDifficulty(difficulty, index),
        userAnswer: '',
        isCorrect: null,
        steps: generateStepsByDifficulty(difficulty, index),
        hint: generateHintByDifficulty(difficulty, index),
        currentStep: 0,
        showAnswer: false
      }));
      
      setQuestions(newQuestions);
      setLoading(false);
      
      toast({
        title: 'Questions Generated',
        description: `${numQuestions} ${difficulty} questions have been created for you.`,
      });
    }, 1000);
  };
  
  // Helper functions to generate content based on difficulty
  const generateQuestionByDifficulty = (diff: string, index: number) => {
    const questions = {
      easy: [
        "Calculate the force required to accelerate a 2kg object at 4 m/s².",
        "If a 5kg object experiences a force of 15N, what is its acceleration?",
        "Calculate the mass of an object that accelerates at 2 m/s² when a force of 10N is applied."
      ],
      medium: [
        "A 4kg object is pushed with a force of 12N against a frictional force of 4N. Calculate its acceleration.",
        "Calculate the net force on a 6kg object that accelerates from 0 to 12 m/s in 3 seconds.",
        "An 800kg car experiences a 2400N forward force and a 600N frictional force. What is its acceleration?"
      ],
      hard: [
        "A 1500kg car accelerates from rest to 25 m/s in 8 seconds. If the frictional force opposing motion is 500N, calculate the engine's driving force.",
        "Two masses of 3kg and 5kg are connected by a light string that passes over a frictionless pulley. Calculate the acceleration of the system.",
        "A 70kg skydiver reaches a terminal velocity of 60 m/s. Calculate the air resistance force acting on the skydiver at this speed."
      ]
    };
    
    return questions[diff as keyof typeof questions][index % 3];
  };
  
  const generateAnswerByDifficulty = (diff: string, index: number) => {
    const answers = {
      easy: ["8N", "3 m/s²", "5kg"],
      medium: ["2 m/s²", "24N", "2.25 m/s²"],
      hard: ["5156.25N", "3.75 m/s²", "686N"]
    };
    
    return answers[diff as keyof typeof answers][index % 3];
  };
  
  const generateHintByDifficulty = (diff: string, index: number) => {
    const hints = {
      easy: [
        "Use Newton's Second Law: F = ma",
        "Remember to solve for a: a = F/m",
        "Rearrange Newton's Second Law to solve for mass: m = F/a"
      ],
      medium: [
        "Calculate the net force first by subtracting friction",
        "Find acceleration first using kinematics, then use F = ma",
        "Remember to calculate net force before applying F = ma"
      ],
      hard: [
        "Break this down step by step: 1) Calculate acceleration 2) Find total force needed 3) Add friction",
        "Consider the net force on each mass and the tension in the string",
        "At terminal velocity, the force of gravity equals the drag force"
      ]
    };
    
    return hints[diff as keyof typeof hints][index % 3];
  };
  
  const generateStepsByDifficulty = (diff: string, index: number) => {
    const stepsObj = {
      easy: [
        ["Identify values: m = 2kg, a = 4 m/s²", "Apply Newton's Second Law: F = ma", "F = 2kg × 4 m/s² = 8N"],
        ["Identify values: m = 5kg, F = 15N", "Apply Newton's Second Law: a = F/m", "a = 15N ÷ 5kg = 3 m/s²"],
        ["Identify values: a = 2 m/s², F = 10N", "Apply Newton's Second Law: m = F/a", "m = 10N ÷ 2 m/s² = 5kg"]
      ],
      medium: [
        ["Identify values: m = 4kg, F_applied = 12N, F_friction = 4N", "Calculate net force: F_net = F_applied - F_friction", "F_net = 12N - 4N = 8N", "Apply Newton's Second Law: a = F_net/m", "a = 8N ÷ 4kg = 2 m/s²"],
        ["Identify values: m = 6kg, v_0 = 0 m/s, v_f = 12 m/s, t = 3s", "Calculate acceleration: a = (v_f - v_0)/t", "a = (12 m/s - 0 m/s) ÷ 3s = 4 m/s²", "Apply Newton's Second Law: F = ma", "F = 6kg × 4 m/s² = 24N"],
        ["Identify values: m = 800kg, F_forward = 2400N, F_friction = 600N", "Calculate net force: F_net = F_forward - F_friction", "F_net = 2400N - 600N = 1800N", "Apply Newton's Second Law: a = F_net/m", "a = 1800N ÷ 800kg = 2.25 m/s²"]
      ],
      hard: [
        ["Identify values: m = 1500kg, v_0 = 0 m/s, v_f = 25 m/s, t = 8s, F_friction = 500N", "Calculate acceleration: a = (v_f - v_0)/t", "a = (25 m/s - 0 m/s) ÷ 8s = 3.125 m/s²", "Calculate total force needed: F_total = ma", "F_total = 1500kg × 3.125 m/s² = 4687.5N", "Calculate driving force: F_driving = F_total + F_friction", "F_driving = 4687.5N + 500N = 5187.5N"],
        ["Identify values: m_1 = 3kg, m_2 = 5kg", "Apply Newton's Second Law to the system: m_2g - m_1g = (m_1 + m_2)a", "5kg × 9.8 m/s² - 3kg × 9.8 m/s² = (3kg + 5kg)a", "49N - 29.4N = 8kg × a", "19.6N = 8kg × a", "a = 19.6N ÷ 8kg = 2.45 m/s²", "The acceleration is 2.45 m/s² downward for the 5kg mass"],
        ["At terminal velocity, weight equals air resistance", "Weight = mass × gravity = 70kg × 9.8 m/s² = 686N", "Therefore, air resistance = 686N"]
      ],
    };
    
    return stepsObj[diff as keyof typeof stepsObj][index % 3];
  };
  
  // Handle user answer submission
  const handleSubmitAnswer = (questionId: number, answer: string) => {
    setQuestions(prevQuestions => prevQuestions.map(q => {
      if (q.id === questionId) {
        const isCorrect = q.answer.toLowerCase().trim() === answer.toLowerCase().trim();
        // If correct, advance to the next step
        const nextStep = isCorrect && q.currentStep < q.steps.length - 1 ? q.currentStep + 1 : q.currentStep;
        
        return {
          ...q,
          userAnswer: answer,
          isCorrect,
          currentStep: nextStep,
        };
      }
      return q;
    }));
  };
  
  // Handle showing the answer
  const handleShowAnswer = (questionId: number) => {
    setQuestions(prevQuestions => prevQuestions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          showAnswer: !q.showAnswer,
        };
      }
      return q;
    }));
  };
  
  // Handle showing a hint
  const handleShowHint = (questionId: number) => {
    toast({
      title: "Hint",
      description: questions.find(q => q.id === questionId)?.hint || "Try using Newton's Second Law",
    });
  };
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploadedFile(file);
    setUploading(true);
    
    // Simulate file processing
    setTimeout(() => {
      setUploading(false);
      
      toast({
        title: 'File Processed',
        description: 'Your answers have been processed from the uploaded file.',
      });
      
      // Simulate finding some correct answers in the file
      setQuestions(prevQuestions => prevQuestions.map((q, index) => {
        // Make every other question correct for demo purposes
        const foundCorrect = index % 2 === 0;
        
        return {
          ...q,
          userAnswer: foundCorrect ? q.answer : q.userAnswer,
          isCorrect: foundCorrect ? true : q.isCorrect,
          currentStep: foundCorrect ? q.steps.length - 1 : q.currentStep,
        };
      }));
    }, 2000);
  };
  
  // Calculate progress
  const calculateProgress = () => {
    if (questions.length === 0) return 0;
    
    const correctAnswers = questions.filter(q => q.isCorrect).length;
    return (correctAnswers / questions.length) * 100;
  };
  
  // Handle download of practice questions
  const handleDownloadQuestions = () => {
    const questionsText = questions.map(q => 
      `Question ${q.id}: ${q.question}\n\n`
    ).join('\n');
    
    const blob = new Blob([questionsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formula-practice-${conceptData.subject}-${difficulty}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Questions Downloaded",
      description: "Your practice questions have been downloaded."
    });
  };
  
  // Toggle helper tools
  const toggleHelperTools = () => {
    setShowHelperTools(!showHelperTools);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <Button 
          variant="ghost"
          onClick={() => navigate(`/dashboard/student/concepts/${conceptId}`)}
          className="flex items-center mb-2"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Concept
        </Button>
        <h1 className="text-3xl font-bold">{conceptData.title} - Formula Lab</h1>
        <div className="flex items-center gap-2 mt-1">
          <Badge>{conceptData.subject}</Badge>
          <span className="text-gray-500">·</span>
          <span className="text-gray-600">{conceptData.description}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="practice">Practice Formulas</TabsTrigger>
          <TabsTrigger value="reference">Formula Reference</TabsTrigger>
          <TabsTrigger value="calculator" className="hidden md:block">Formula Calculator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Generate Practice Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    value={difficulty}
                    onValueChange={setDifficulty}
                  >
                    <SelectTrigger id="difficulty" className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Difficulty</SelectLabel>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="numQuestions">Number of Questions</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="numQuestions"
                      min={1}
                      max={10}
                      step={1}
                      value={[numQuestions]}
                      onValueChange={(value) => setNumQuestions(value[0])}
                      className="flex-1"
                    />
                    <span className="w-10 text-center">{numQuestions}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={toggleHelperTools}
                  className="text-sm"
                >
                  {showHelperTools ? "Hide Tools" : "Show Helper Tools"}
                </Button>
                
                <Button 
                  onClick={generateQuestions} 
                  disabled={loading}
                  className="min-w-[120px]"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    'Generate'
                  )}
                </Button>
              </div>
              
              {showHelperTools && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-sm font-semibold mb-2 text-blue-800">Helper Tools</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => setActiveTab('calculator')}>
                      <Calculator className="mr-1 h-3 w-3" />
                      Calculator
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => setActiveTab('reference')}>
                      <FileText className="mr-1 h-3 w-3" />
                      Formulas
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs" onClick={handleDownloadQuestions} disabled={questions.length === 0}>
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Share2 className="mr-1 h-3 w-3" />
                      Share
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {questions.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Practice Questions</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Overall Progress:</span>
                  <Progress value={calculateProgress()} className="w-40 h-2" />
                  <span className="text-sm font-medium">{Math.round(calculateProgress())}%</span>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    File Upload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload a file with your answers to automatically match and check them.
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1"
                      disabled={uploading}
                    >
                      {uploading ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      {uploadedFile ? uploadedFile.name : 'Upload File'}
                    </Button>
                  </div>
                  {uploadedFile && (
                    <p className="text-sm text-green-600 mt-2">
                      <FileText className="inline mr-1 h-3 w-3" />
                      {uploadedFile.name} uploaded successfully
                    </p>
                  )}
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                {questions.map((question, idx) => (
                  <Card key={question.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          Question {idx + 1}
                          <DifficultyBadge level={difficulty} />
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleShowHint(question.id)}
                            className="text-blue-600"
                          >
                            <HelpCircle className="mr-1 h-4 w-4" />
                            Hint
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleShowAnswer(question.id)}
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            {question.showAnswer ? 'Hide' : 'Show'} Answer
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-800">{question.question}</p>
                      
                      {question.showAnswer && (
                        <Alert className="bg-blue-50 border-blue-200">
                          <AlertDescription className="text-blue-800">
                            Answer: {question.answer}
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {/* Steps section */}
                      {question.currentStep > 0 && (
                        <div className="space-y-2 mb-4">
                          <h4 className="text-sm font-medium">Solution Steps:</h4>
                          <ol className="space-y-2 list-decimal list-inside">
                            {question.steps.slice(0, question.currentStep + 1).map((step, i) => (
                              <li 
                                key={i}
                                className={cn(
                                  "p-2 rounded-md transition-colors",
                                  i === question.currentStep ? "bg-green-100 text-green-800" : "bg-gray-50"
                                )}
                              >
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor={`answer-${question.id}`}>Your Answer</Label>
                        <div className="flex gap-2">
                          <Input
                            id={`answer-${question.id}`}
                            value={question.userAnswer}
                            onChange={(e) => setQuestions(questions.map(q => 
                              q.id === question.id ? { ...q, userAnswer: e.target.value } : q
                            ))}
                            className={cn(
                              question.isCorrect === true && "border-green-500 focus-visible:ring-green-500",
                              question.isCorrect === false && "border-red-500 focus-visible:ring-red-500"
                            )}
                          />
                          <Button 
                            onClick={() => handleSubmitAnswer(question.id, question.userAnswer)}
                            disabled={!question.userAnswer}
                            size="icon"
                            variant={question.isCorrect === true ? "outline" : "default"}
                            className={question.isCorrect === true ? "border-green-500 text-green-600" : ""}
                          >
                            {question.isCorrect === true ? (
                              <Check className="h-4 w-4" />
                            ) : question.isCorrect === false ? (
                              <X className="h-4 w-4" />
                            ) : (
                              <ArrowRight className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        
                        {question.isCorrect === true && (
                          <p className="text-sm text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Correct! {question.currentStep < question.steps.length - 1 ? "Continue with the next step." : "All steps completed!"}
                          </p>
                        )}
                        
                        {question.isCorrect === false && (
                          <p className="text-sm text-red-600">Not quite right. Try again or check the answer.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="reference" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Formulas for {conceptData.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Newton's Second Law of Motion</h3>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-xl font-medium text-center">F = ma</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p><strong>F</strong> = Net force (newtons, N)</p>
                    <p><strong>m</strong> = Mass (kilograms, kg)</p>
                    <p><strong>a</strong> = Acceleration (meters per second squared, m/s²)</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Application</h4>
                  <p className="text-sm text-gray-700">
                    Newton's Second Law relates force and mass to acceleration. The acceleration of an object is directly proportional 
                    to the net force acting on it and inversely proportional to its mass.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Weight Formula</h3>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-xl font-medium text-center">W = mg</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p><strong>W</strong> = Weight (newtons, N)</p>
                    <p><strong>m</strong> = Mass (kilograms, kg)</p>
                    <p><strong>g</strong> = Gravitational acceleration (9.8 m/s² on Earth)</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Friction Force</h3>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-xl font-medium text-center">F<sub>friction</sub> = μN</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p><strong>F<sub>friction</sub></strong> = Friction force (newtons, N)</p>
                    <p><strong>μ</strong> = Coefficient of friction (dimensionless)</p>
                    <p><strong>N</strong> = Normal force (newtons, N)</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  onClick={() => navigate(`/dashboard/student/concepts/${conceptId}`)}
                  variant="outline"
                  className="w-full"
                >
                  Back to Concept Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Physics Formula Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Newton's Second Law Calculator</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mass">Mass (kg)</Label>
                      <Input id="mass" type="number" placeholder="Enter mass" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accel">Acceleration (m/s²)</Label>
                      <Input id="accel" type="number" placeholder="Enter acceleration" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="force">Force (N)</Label>
                      <Input id="force" type="number" placeholder="Result" readOnly />
                    </div>
                  </div>
                  <Button className="w-full">Calculate Force</Button>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-md">
                  <h3 className="font-medium text-blue-800 mb-2">Quick Tips</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                    <li>Leave the field you want to calculate empty</li>
                    <li>For F = ma, fill in any two values to calculate the third</li>
                    <li>Common errors: forgetting units, calculation errors</li>
                    <li>Always double-check your math with the calculator</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormulaLabPage;
