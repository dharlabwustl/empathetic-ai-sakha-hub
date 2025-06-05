
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, BookOpen, Target, Lightbulb, ArrowRight, ArrowLeft, CheckCircle, X } from 'lucide-react';

const FormulaPracticePage = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // Mock formula practice data
  const formulaPractice = {
    id: conceptId || 'newtons-second-law',
    title: "Newton's Second Law Practice",
    formula: "F = ma",
    description: "Practice solving problems using Newton's Second Law of Motion",
    difficulty: 'medium',
    estimatedTime: 30,
    totalSteps: 4,
    currentProblem: {
      id: 1,
      question: "A 5 kg object is accelerating at 2 m/s². What is the net force acting on it?",
      formula: "F = ma",
      steps: [
        {
          id: 1,
          instruction: "Identify the given values",
          hint: "Look for mass (m) and acceleration (a) in the problem",
          content: "Given: m = 5 kg, a = 2 m/s²",
          isCorrect: null
        },
        {
          id: 2,
          instruction: "Write down the formula",
          hint: "Use Newton's Second Law formula",
          content: "F = ma",
          isCorrect: null
        },
        {
          id: 3,
          instruction: "Substitute the values",
          hint: "Replace m and a with their given values",
          content: "F = (5 kg)(2 m/s²)",
          isCorrect: null
        },
        {
          id: 4,
          instruction: "Calculate the result",
          hint: "Multiply mass by acceleration",
          content: "F = 10 N",
          isCorrect: null
        }
      ],
      multipleChoice: {
        question: "What is the net force acting on the object?",
        options: ["8 N", "10 N", "12 N", "15 N"],
        correctAnswer: "10 N"
      }
    }
  };

  const handleNextStep = () => {
    if (currentStep < formulaPractice.currentProblem.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowHint(false);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowHint(false);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleAnswerSubmit = () => {
    setIsAnswerSubmitted(true);
  };

  const handleGenerateNewProblem = () => {
    // This would generate a new problem in a real implementation
    setCurrentStep(0);
    setShowHint(false);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
  };

  const currentStepData = formulaPractice.currentProblem.steps[currentStep];
  const isCorrectAnswer = selectedAnswer === formulaPractice.currentProblem.multipleChoice.correctAnswer;

  return (
    <SharedPageLayout
      title="Formula Practice"
      subtitle={`Practice solving problems with ${formulaPractice.title}`}
      showBackButton={true}
      backButtonUrl={`/dashboard/student/concepts/${conceptId}`}
    >
      <div className="space-y-6">
        {/* Header Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calculator className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle>{formulaPractice.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Formula: <code className="bg-gray-100 px-2 py-1 rounded">{formulaPractice.formula}</code>
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {formulaPractice.difficulty}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Practice Tabs */}
        <Tabs defaultValue="practice" className="space-y-4">
          <TabsList>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="generator">Question Generator</TabsTrigger>
          </TabsList>

          <TabsContent value="practice" className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Step {currentStep + 1} of {formulaPractice.totalSteps}</span>
                <span>{Math.round(((currentStep + 1) / formulaPractice.totalSteps) * 100)}% Complete</span>
              </div>
              <Progress value={((currentStep + 1) / formulaPractice.totalSteps) * 100} />
            </div>

            {/* Problem Statement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Problem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{formulaPractice.currentProblem.question}</p>
              </CardContent>
            </Card>

            {/* Current Step */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Step {currentStep + 1}: {currentStepData.instruction}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-1"
                  >
                    <Lightbulb className="h-4 w-4" />
                    {showHint ? 'Hide' : 'Show'} Hint
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {showHint && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <Lightbulb className="h-4 w-4 inline mr-1" />
                      {currentStepData.hint}
                    </p>
                  </div>
                )}

                <div className="p-4 bg-gray-50 rounded-lg">
                  <code className="text-lg font-mono">{currentStepData.content}</code>
                </div>

                {/* Multiple Choice for final step */}
                {currentStep === formulaPractice.totalSteps - 1 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">{formulaPractice.currentProblem.multipleChoice.question}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {formulaPractice.currentProblem.multipleChoice.options.map((option) => (
                        <Button
                          key={option}
                          variant={selectedAnswer === option ? "default" : "outline"}
                          className={`p-3 h-auto ${
                            isAnswerSubmitted
                              ? option === formulaPractice.currentProblem.multipleChoice.correctAnswer
                                ? "bg-green-100 border-green-500 text-green-700"
                                : selectedAnswer === option && !isCorrectAnswer
                                ? "bg-red-100 border-red-500 text-red-700"
                                : ""
                              : ""
                          }`}
                          onClick={() => setSelectedAnswer(option)}
                          disabled={isAnswerSubmitted}
                        >
                          <div className="flex items-center gap-2">
                            {isAnswerSubmitted && option === formulaPractice.currentProblem.multipleChoice.correctAnswer && (
                              <CheckCircle className="h-4 w-4" />
                            )}
                            {isAnswerSubmitted && selectedAnswer === option && !isCorrectAnswer && (
                              <X className="h-4 w-4" />
                            )}
                            {option}
                          </div>
                        </Button>
                      ))}
                    </div>
                    {selectedAnswer && !isAnswerSubmitted && (
                      <Button onClick={handleAnswerSubmit} className="w-full">
                        Submit Answer
                      </Button>
                    )}
                    {isAnswerSubmitted && (
                      <div className={`p-3 rounded-lg ${isCorrectAnswer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {isCorrectAnswer ? '🎉 Correct! Well done!' : '❌ Incorrect. The correct answer is ' + formulaPractice.currentProblem.multipleChoice.correctAnswer}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous Step
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={currentStep === formulaPractice.totalSteps - 1}
                className="flex items-center gap-1"
              >
                Next Step
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="generator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Question Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Generate new practice problems based on concept difficulty level
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant="outline"
                      className="h-20 flex flex-col gap-2"
                      onClick={handleGenerateNewProblem}
                    >
                      <span className="font-medium">{difficulty}</span>
                      <span className="text-xs text-muted-foreground">
                        {difficulty === 'Easy' ? 'Basic concepts' : 
                         difficulty === 'Medium' ? 'Standard problems' : 
                         'Advanced applications'}
                      </span>
                    </Button>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Next Problem Preview</h4>
                  <p className="text-sm text-muted-foreground">
                    "A 3 kg object experiences a net force of 15 N. Calculate its acceleration using Newton's Second Law."
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FormulaPracticePage;
