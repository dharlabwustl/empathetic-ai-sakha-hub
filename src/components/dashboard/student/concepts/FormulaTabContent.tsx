
import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, AlertCircle, Upload, Wand2 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import MathJax from "@/components/common/MathJax";
import { useToast } from "@/hooks/use-toast";

interface FormulaTabContentProps {
  conceptName: string;
  formulas?: Array<{
    id: string;
    formula: string;
    name: string;
    description: string;
  }>;
  onNavigateToFormulaPractice?: () => void;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({
  conceptName,
  formulas = [],
  onNavigateToFormulaPractice,
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("explore");
  const [difficulty, setDifficulty] = useState("medium");
  const [numQuestions, setNumQuestions] = useState(5);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const [answerFormat, setAnswerFormat] = useState<"text" | "options" | "step-by-step">("text");
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [hasFileUploaded, setHasFileUploaded] = useState(false);

  // Sample formulas if none provided
  const defaultFormulas = [
    {
      id: "1",
      name: "Distance Formula",
      formula: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
      description:
        "Used to find the distance between two points in a coordinate system.",
    },
    {
      id: "2",
      name: "Quadratic Formula",
      formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      description:
        "Used to solve quadratic equations of the form ax² + bx + c = 0.",
    },
    {
      id: "3",
      name: "Pythagorean Theorem",
      formula: "a^2 + b^2 = c^2",
      description:
        "In a right triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides.",
    },
  ];

  const formulaData = formulas.length > 0 ? formulas : defaultFormulas;

  const generatePracticeQuestions = () => {
    // This would typically be an API call to generate questions based on the selected formula
    // For demo purposes, we'll create some sample questions
    
    const sampleQuestions = [
      {
        id: "q1",
        text: `Find the distance between the points (3, 4) and (6, 8) using the distance formula.`,
        answer: "5",
        steps: [
          "Step 1: Identify the coordinates: (x₁, y₁) = (3, 4) and (x₂, y₂) = (6, 8)",
          "Step 2: Substitute into the distance formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]",
          "Step 3: d = √[(6 - 3)² + (8 - 4)²]",
          "Step 4: d = √[3² + 4²]",
          "Step 5: d = √[9 + 16]",
          "Step 6: d = √25",
          "Step 7: d = 5"
        ],
        options: ["4", "5", "6", "7"],
      },
      {
        id: "q2",
        text: `Solve the quadratic equation: 2x² - 5x + 3 = 0`,
        answer: "x = 1.5 or x = 1",
        steps: [
          "Step 1: Identify a, b, and c in the quadratic equation 2x² - 5x + 3 = 0",
          "Step 2: a = 2, b = -5, c = 3",
          "Step 3: Use the quadratic formula: x = [-b ± √(b² - 4ac)]/2a",
          "Step 4: x = [5 ± √((-5)² - 4(2)(3))]/2(2)",
          "Step 5: x = [5 ± √(25 - 24)]/4",
          "Step 6: x = [5 ± √1]/4",
          "Step 7: x = [5 ± 1]/4",
          "Step 8: x = 6/4 or x = 4/4",
          "Step 9: x = 1.5 or x = 1"
        ],
        options: ["x = 1.5 or x = 1", "x = 2 or x = 0.5", "x = 3 or x = -1", "x = 1.5 or x = -0.5"],
      },
      {
        id: "q3",
        text: `In a right triangle, one leg is 7 units long and the hypotenuse is 25 units long. What is the length of the other leg?`,
        answer: "24",
        steps: [
          "Step 1: Use the Pythagorean theorem: a² + b² = c²",
          "Step 2: Let a = 7 and c = 25, we need to find b",
          "Step 3: 7² + b² = 25²",
          "Step 4: 49 + b² = 625",
          "Step 5: b² = 625 - 49",
          "Step 6: b² = 576",
          "Step 7: b = √576",
          "Step 8: b = 24"
        ],
        options: ["24", "23", "26", "25"],
      },
    ];
    
    // Adjust the number of questions based on user selection
    const adjustedQuestions = sampleQuestions.slice(0, numQuestions);
    
    // Set difficulty (could modify questions based on difficulty)
    const difficultyFactors = {
      easy: { multiplier: 0.8, description: "Basic application of formulas" },
      medium: { multiplier: 1, description: "Standard application with some complexity" },
      hard: { multiplier: 1.2, description: "Complex applications requiring multiple steps" }
    };
    
    // Apply difficulty factor for demo purposes
    const difficultyAdjustedQuestions = adjustedQuestions.map(q => ({
      ...q,
      difficulty,
      difficultyDescription: difficultyFactors[difficulty as keyof typeof difficultyFactors].description
    }));
    
    setGeneratedQuestions(difficultyAdjustedQuestions);
    setCurrentStep(0);
    setShowAnswer(false);
    setUserAnswers({});
    setSubmittedAnswers({});
    
    toast({
      title: "Questions Generated",
      description: `${numQuestions} ${difficulty} questions have been created for practice.`,
    });
  };
  
  const handleAnswerChange = (questionId: string, value: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  
  const handleSubmitAnswer = (questionId: string) => {
    const question = generatedQuestions.find(q => q.id === questionId);
    if (!question) return;
    
    // Clean up answers (remove spaces, convert to lowercase) for comparison
    const userAnswerCleaned = (userAnswers[questionId] || "").toLowerCase().replace(/\s+/g, "");
    const correctAnswerCleaned = question.answer.toLowerCase().replace(/\s+/g, "");
    
    const isCorrect = userAnswerCleaned === correctAnswerCleaned;
    
    setSubmittedAnswers(prev => ({ ...prev, [questionId]: isCorrect }));
    
    toast({
      title: isCorrect ? "Correct Answer!" : "Incorrect Answer",
      description: isCorrect 
        ? "Great job! You got it right." 
        : "Try again or check the solution.",
      variant: isCorrect ? "default" : "destructive",
    });
  };
  
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded for answer verification.`,
      });
      setHasFileUploaded(true);
    }
  };
  
  const handleVerifyFromFile = () => {
    // In a real app, this would analyze the uploaded file against the expected answers
    toast({
      title: "File Verification Complete",
      description: "Your uploaded answers have been verified. See results below.",
    });
    
    // Simulate finding some correct answers in the file
    setSubmittedAnswers({
      q1: true,
      q2: false,
      q3: true
    });
  };
  
  const renderPracticeContent = () => {
    if (generatedQuestions.length === 0) {
      return (
        <div className="p-6 text-center">
          <div className="flex flex-col items-center mb-8 gap-4">
            <Card className="w-full">
              <CardHeader className="pb-3">
                <CardTitle>Configure Practice Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
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
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="questions">Number of Questions: {numQuestions}</Label>
                      <span className="text-muted-foreground text-sm">{numQuestions}</span>
                    </div>
                    <Slider
                      id="questions"
                      min={1}
                      max={10}
                      step={1}
                      value={[numQuestions]}
                      onValueChange={(value) => setNumQuestions(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Answer Format</Label>
                    <ToggleGroup type="single" value={answerFormat} onValueChange={(value) => value && setAnswerFormat(value as any)}>
                      <ToggleGroupItem value="text" aria-label="Text input">
                        Text
                      </ToggleGroupItem>
                      <ToggleGroupItem value="options" aria-label="Multiple choice">
                        Options
                      </ToggleGroupItem>
                      <ToggleGroupItem value="step-by-step" aria-label="Step by step">
                        Step-by-step
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={generatePracticeQuestions} className="w-full">
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Questions
                </Button>
              </CardFooter>
            </Card>
            
            {/* File Upload for Answer Verification */}
            <Card className="w-full">
              <CardHeader className="pb-3">
                <CardTitle>Upload Answers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a document with your answers for automatic verification.
                </p>
                <div className="flex justify-center">
                  <Button variant="outline" onClick={handleFileUpload} className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload File
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
    
    // Render practice questions
    const currentQuestion = generatedQuestions[currentStep];
    
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Badge>{difficulty.toUpperCase()}</Badge>
            <span className="ml-2">Question {currentStep + 1} of {generatedQuestions.length}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowAnswer(!showAnswer)}>
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </Button>
        </div>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">
              <MathJax>{currentQuestion.text}</MathJax>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {answerFormat === "text" && (
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your answer here"
                  value={userAnswers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                />
                {submittedAnswers[currentQuestion.id] !== undefined && (
                  <Alert variant={submittedAnswers[currentQuestion.id] ? "default" : "destructive"}>
                    {submittedAnswers[currentQuestion.id] ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>
                      {submittedAnswers[currentQuestion.id] ? "Correct!" : "Incorrect"}
                    </AlertTitle>
                    <AlertDescription>
                      {submittedAnswers[currentQuestion.id] 
                        ? "Well done! Your answer is correct." 
                        : `The correct answer is: ${currentQuestion.answer}`}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
            
            {answerFormat === "options" && (
              <div className="space-y-3">
                {currentQuestion.options.map((option: string) => (
                  <div key={option} className="flex items-center">
                    <Button
                      variant={userAnswers[currentQuestion.id] === option ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleAnswerChange(currentQuestion.id, option)}
                    >
                      {option}
                    </Button>
                  </div>
                ))}
                
                {submittedAnswers[currentQuestion.id] !== undefined && (
                  <Alert variant={submittedAnswers[currentQuestion.id] ? "default" : "destructive"}>
                    {submittedAnswers[currentQuestion.id] ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>
                      {submittedAnswers[currentQuestion.id] ? "Correct!" : "Incorrect"}
                    </AlertTitle>
                    <AlertDescription>
                      {submittedAnswers[currentQuestion.id]
                        ? "Well done! Your answer is correct."
                        : `The correct answer is: ${currentQuestion.answer}`}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
            
            {answerFormat === "step-by-step" && (
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-md">
                  <Label className="mb-2 block">Steps to solve:</Label>
                  <ScrollArea className="h-40">
                    <ol className="list-decimal pl-5 space-y-2">
                      {currentQuestion.steps.map((step: string, index: number) => (
                        <li key={index}>
                          <MathJax>{step}</MathJax>
                        </li>
                      ))}
                    </ol>
                  </ScrollArea>
                </div>
                
                <Textarea
                  placeholder="Enter your final answer here"
                  value={userAnswers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                />
              </div>
            )}
            
            {showAnswer && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="font-medium">Answer:</p>
                <MathJax>{currentQuestion.answer}</MathJax>
                
                {answerFormat !== "step-by-step" && currentQuestion.steps && (
                  <div className="mt-2">
                    <p className="font-medium">Solution steps:</p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      {currentQuestion.steps.map((step: string, index: number) => (
                        <li key={index}>
                          <MathJax>{step}</MathJax>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="ml-2"
                onClick={() => setCurrentStep(Math.min(generatedQuestions.length - 1, currentStep + 1))}
                disabled={currentStep === generatedQuestions.length - 1}
              >
                Next
              </Button>
            </div>
            <div>
              <Button
                onClick={() => handleSubmitAnswer(currentQuestion.id)}
                disabled={!userAnswers[currentQuestion.id]}
              >
                Check Answer
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* File upload section */}
        {!hasFileUploaded ? (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Upload your work for verification</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={handleFileUpload} className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">File uploaded</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleVerifyFromFile} className="w-full">
                <Check className="mr-2 h-4 w-4" />
                Verify Answers from File
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Generate new questions button */}
        <div className="mt-4">
          <Button variant="outline" onClick={() => setGeneratedQuestions([])}>
            Configure New Practice Session
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="explore" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="explore">Explore Formulas</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">{conceptName} Formulas</h3>
              <p className="text-sm text-muted-foreground">
                Explore the key formulas for this concept
              </p>
            </div>
            {onNavigateToFormulaPractice && (
              <Button onClick={onNavigateToFormulaPractice}>
                Go to Formula Lab
              </Button>
            )}
          </div>

          {formulaData.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="py-2 flex justify-center bg-muted rounded-md">
                  <MathJax className="text-lg md:text-xl">{item.formula}</MathJax>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("practice")}
                  className="w-full"
                >
                  Practice This Formula
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="practice">
          {renderPracticeContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormulaTabContent;
