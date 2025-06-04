
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calculator, 
  BookOpen, 
  Target, 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Zap
} from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface ProblemStep {
  id: number;
  title: string;
  description: string;
  formula?: string;
  hint?: string;
  completed: boolean;
  userAnswer?: string;
  correctAnswer?: string;
}

const FormulaLabPage = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [generatedQuestion, setGeneratedQuestion] = useState<any>(null);

  // Sample problem steps for Newton's Second Law
  const [problemSteps, setProblemSteps] = useState<ProblemStep[]>([
    {
      id: 1,
      title: "Identify Given Values",
      description: "A 10 kg object accelerates at 5 m/s². Find the net force.",
      hint: "Look for mass (m) and acceleration (a) in the problem statement",
      completed: false
    },
    {
      id: 2,
      title: "Select the Correct Formula",
      description: "Choose the appropriate formula for this problem",
      formula: "F = ma",
      hint: "Newton's Second Law relates force, mass, and acceleration",
      completed: false
    },
    {
      id: 3,
      title: "Substitute Values",
      description: "Replace variables with the given values",
      hint: "m = 10 kg, a = 5 m/s²",
      completed: false
    },
    {
      id: 4,
      title: "Calculate the Result",
      description: "Perform the calculation to find the answer",
      correctAnswer: "50 N",
      completed: false
    }
  ]);

  const questionTemplates = {
    easy: [
      "A {mass} kg object has a force of {force} N applied to it. What is its acceleration?",
      "If an object accelerates at {acceleration} m/s² with a mass of {mass} kg, what force is applied?"
    ],
    medium: [
      "A {mass} kg box is pushed across a frictionless surface with a force of {force} N. Calculate the acceleration.",
      "Two forces of {force1} N and {force2} N act on a {mass} kg object in the same direction. Find the net acceleration."
    ],
    hard: [
      "A {mass} kg object is pulled by a force of {force} N at an angle of {angle}° to the horizontal. Find the horizontal acceleration (ignore friction).",
      "A {mass} kg block on an inclined plane of {angle}° has a force of {force} N applied parallel to the incline. Calculate the acceleration down the plane."
    ]
  };

  const handleStepComplete = (stepId: number, answer?: string) => {
    setProblemSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, completed: true, userAnswer: answer }
        : step
    ));
    
    if (currentStep < problemSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const generateQuestion = () => {
    const templates = questionTemplates[selectedDifficulty as keyof typeof questionTemplates];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Generate random values based on difficulty
    const values = {
      mass: selectedDifficulty === 'easy' ? Math.floor(Math.random() * 10) + 1 : Math.floor(Math.random() * 50) + 5,
      force: selectedDifficulty === 'easy' ? Math.floor(Math.random() * 50) + 10 : Math.floor(Math.random() * 200) + 50,
      force1: Math.floor(Math.random() * 100) + 20,
      force2: Math.floor(Math.random() * 80) + 10,
      acceleration: Math.floor(Math.random() * 10) + 2,
      angle: Math.floor(Math.random() * 60) + 15
    };

    let question = template;
    Object.entries(values).forEach(([key, value]) => {
      question = question.replace(`{${key}}`, value.toString());
    });

    setGeneratedQuestion({
      question,
      values,
      difficulty: selectedDifficulty,
      concept: conceptId
    });
  };

  const currentStepData = problemSteps[currentStep];

  return (
    <SharedPageLayout
      title={`Formula Lab - ${conceptId?.replace('%20', ' ')}`}
      subtitle="Interactive formula practice with step-by-step guidance"
      showBackButton={true}
      backButtonUrl={`/dashboard/student/concepts/${conceptId}`}
    >
      <Tabs defaultValue="practice" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="practice">Step-by-Step Practice</TabsTrigger>
          <TabsTrigger value="generator">Question Generator</TabsTrigger>
          <TabsTrigger value="formulas">Formula Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="space-y-6">
          {/* Progress Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-gray-600">{currentStep + 1} of {problemSteps.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / problemSteps.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Current Step */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">{currentStep + 1}</span>
                  </div>
                  {currentStepData?.title}
                </CardTitle>
                {currentStepData?.completed && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <CardDescription>{currentStepData?.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentStepData?.formula && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Formula</span>
                  </div>
                  <div className="text-xl font-mono text-blue-900">{currentStepData.formula}</div>
                </div>
              )}

              {currentStepData?.hint && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Hint</span>
                  </div>
                  <p className="text-yellow-900">{currentStepData.hint}</p>
                </div>
              )}

              {!currentStepData?.completed && (
                <div className="space-y-3">
                  <Label htmlFor="step-answer">Your Answer</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="step-answer"
                      placeholder="Enter your answer here..."
                      className="flex-1"
                    />
                    <Button onClick={() => handleStepComplete(currentStepData.id)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Step
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={() => setCurrentStep(Math.min(problemSteps.length - 1, currentStep + 1))}
                  disabled={currentStep === problemSteps.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Steps Overview */}
          <Card>
            <CardHeader>
              <CardTitle>All Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {problemSteps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      index === currentStep ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                      step.completed ? 'bg-green-100 text-green-600' : 
                      index === currentStep ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <span className={step.completed ? 'line-through text-gray-500' : ''}>{step.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Question Generator
              </CardTitle>
              <CardDescription>
                Generate practice questions based on concept and difficulty level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={generateQuestion} className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate Question
                  </Button>
                </div>
              </div>

              {generatedQuestion && (
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Generated Question</CardTitle>
                      <Badge variant="secondary">{generatedQuestion.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg mb-4">{generatedQuestion.question}</p>
                    <div className="space-y-3">
                      <Label htmlFor="generated-answer">Your Solution</Label>
                      <Textarea 
                        id="generated-answer"
                        placeholder="Work through the problem step by step..."
                        className="min-h-[100px]"
                      />
                      <Button className="w-full">Submit Solution</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formulas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Formula Reference - {conceptId?.replace('%20', ' ')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">Newton's Second Law</h3>
                  <div className="text-2xl font-mono text-blue-900 mb-2">F = ma</div>
                  <p className="text-blue-700">Where F is force (N), m is mass (kg), and a is acceleration (m/s²)</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">Related Formulas</h3>
                  <div className="space-y-2">
                    <div className="font-mono">a = F/m</div>
                    <div className="font-mono">m = F/a</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default FormulaLabPage;
