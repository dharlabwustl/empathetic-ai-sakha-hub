
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronRight, Eye, RefreshCw } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

// Mock formulas for different subjects
const FORMULAS = {
  physics: [
    { id: 1, name: "Newton's Second Law", formula: "F = ma", description: "Force equals mass times acceleration" },
    { id: 2, name: "Kinetic Energy", formula: "KE = ½mv²", description: "Kinetic energy equals half mass times velocity squared" },
    { id: 3, name: "Gravitational Potential Energy", formula: "PE = mgh", description: "Potential energy equals mass times gravity times height" }
  ],
  chemistry: [
    { id: 1, name: "Ideal Gas Law", formula: "PV = nRT", description: "Pressure times volume equals moles times gas constant times temperature" },
    { id: 2, name: "pH", formula: "pH = -log[H+]", description: "pH equals negative log of hydrogen ion concentration" }
  ],
  math: [
    { id: 1, name: "Quadratic Formula", formula: "x = (-b ± √(b² - 4ac)) / 2a", description: "Solutions to quadratic equations" },
    { id: 2, name: "Pythagorean Theorem", formula: "a² + b² = c²", description: "In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides" }
  ]
};

// Mock questions
const MOCK_QUESTIONS = {
  easy: [
    { 
      id: 1, 
      question: "A 2 kg object accelerates at 5 m/s². What is the force applied?",
      answer: "10 N",
      steps: ["Identify the formula: F = ma", "Substitute: F = 2 kg × 5 m/s²", "Calculate: F = 10 N"]
    },
    { 
      id: 2, 
      question: "Calculate the kinetic energy of a 500g ball moving at 2 m/s.",
      answer: "1 J",
      steps: ["Identify the formula: KE = ½mv²", "Convert mass to kg: 500g = 0.5 kg", "Substitute: KE = ½ × 0.5 kg × (2 m/s)²", "Calculate: KE = 0.5 × 0.5 × 4 = 1 J"]
    }
  ],
  medium: [
    { 
      id: 1, 
      question: "A 75 kg person climbs stairs to a height of 15 m. What is the gravitational potential energy gained?",
      answer: "11025 J",
      steps: ["Identify the formula: PE = mgh", "Use g = 9.8 m/s²", "Substitute: PE = 75 kg × 9.8 m/s² × 15 m", "Calculate: PE = 11025 J"]
    }
  ],
  hard: [
    { 
      id: 1, 
      question: "A 1500 kg car accelerates from 0 to 27 m/s in 9 seconds. Calculate the force applied, assuming constant acceleration.",
      answer: "4500 N",
      steps: [
        "Find acceleration: a = Δv/t = (27 m/s - 0 m/s) / 9s = 3 m/s²",
        "Use Newton's Second Law: F = ma",
        "Substitute: F = 1500 kg × 3 m/s²",
        "Calculate: F = 4500 N"
      ]
    }
  ]
};

const FormulaLabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("formulas");
  const [subject, setSubject] = useState("physics");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [questionCount, setQuestionCount] = useState(3);
  const [generatedQuestions, setGeneratedQuestions] = useState<typeof MOCK_QUESTIONS.easy>([]);
  const [showAnswers, setShowAnswers] = useState<{[key: number]: boolean}>({});
  const [currentFormula, setCurrentFormula] = useState<(typeof FORMULAS.physics)[0] | null>(null);
  
  // Function to handle generating questions
  const handleGenerateQuestions = () => {
    // Simulate generating questions based on difficulty and count
    const availableQuestions = MOCK_QUESTIONS[selectedDifficulty as keyof typeof MOCK_QUESTIONS];
    const selected = [];
    
    // Select questions up to the requested count or all available questions
    for (let i = 0; i < Math.min(questionCount, availableQuestions.length); i++) {
      selected.push(availableQuestions[i]);
    }
    
    setGeneratedQuestions(selected);
    // Reset show answers state
    setShowAnswers({});
  };
  
  const toggleShowAnswer = (questionId: number) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  return (
    <SharedPageLayout 
      title="Formula Practice Lab" 
      subtitle="Master formulas through interactive practice"
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
          <TabsTrigger value="formulas">Formulas</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>
        
        <TabsContent value="formulas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Formula Reference</CardTitle>
                  <CardDescription>Select a subject to view relevant formulas</CardDescription>
                </div>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {FORMULAS[subject as keyof typeof FORMULAS].map(formula => (
                  <Card 
                    key={formula.id} 
                    className="border shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setCurrentFormula(formula)}
                  >
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{formula.name}</CardTitle>
                        <Badge>{subject}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="bg-muted p-3 rounded-md text-center font-mono text-lg">
                        {formula.formula}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {formula.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {currentFormula && (
            <Card>
              <CardHeader>
                <CardTitle>Formula Details: {currentFormula.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-center font-mono text-xl mb-4">
                  {currentFormula.formula}
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Description:</h3>
                    <p>{currentFormula.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Application Examples:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Calculate force in mechanical systems</li>
                      <li>Predict motion of objects</li>
                      <li>Analyze physical interactions</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Related Formulas:</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {FORMULAS[subject as keyof typeof FORMULAS]
                        .filter(f => f.id !== currentFormula.id)
                        .map(f => (
                          <Badge 
                            key={f.id} 
                            variant="outline" 
                            className="cursor-pointer hover:bg-accent"
                            onClick={() => setCurrentFormula(f)}
                          >
                            {f.name}
                          </Badge>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="practice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Practice Questions</CardTitle>
              <CardDescription>Generate practice questions based on your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="w-full md:w-1/3 space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger id="difficulty" className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-1/3 space-y-2">
                  <Label htmlFor="count">Number of Questions</Label>
                  <Input 
                    id="count" 
                    type="number" 
                    min="1" 
                    max="10" 
                    value={questionCount} 
                    onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)}
                  />
                </div>
                
                <div className="w-full md:w-1/3 flex items-end">
                  <Button onClick={handleGenerateQuestions} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Questions
                  </Button>
                </div>
              </div>
              
              {generatedQuestions.length > 0 ? (
                <div className="space-y-6">
                  {generatedQuestions.map((q, index) => (
                    <Card key={q.id} className="border shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                          <Badge>{selectedDifficulty}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{q.question}</p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => toggleShowAnswer(q.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              {showAnswers[q.id] ? 'Hide Answer' : 'Show Answer'}
                            </Button>
                          </div>
                          
                          {showAnswers[q.id] && (
                            <div className="rounded-lg border p-4 mt-2">
                              <div className="font-semibold">Answer: {q.answer}</div>
                              
                              <div className="mt-4">
                                <div className="font-semibold mb-2">Solution Steps:</div>
                                <ol className="space-y-2 list-decimal list-inside">
                                  {q.steps.map((step, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <span className="text-green-500"><Check className="h-4 w-4" /></span>
                                      <span>{step}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-muted-foreground">
                    Generate questions to start practicing
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default FormulaLabPage;
