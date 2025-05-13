import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Brain, ArrowRight, Beaker } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface FormulaTabContentProps {
  conceptId: string;
  conceptTitle: string;
  handleOpenFormulaLab: () => void;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({
  conceptId,
  conceptTitle,
  handleOpenFormulaLab
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [showAnswer, setShowAnswer] = useState(false);
  const [showStepByStep, setShowStepByStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const maxSteps = 4; // Total number of steps in the solution

  // Step-by-step solution
  const steps = [
    {
      step: 1,
      title: "Identify the standard form",
      content: "First, ensure the quadratic equation is in standard form: ax² + bx + c = 0. For 2x² + 4x - 6 = 0, we have a = 2, b = 4, and c = -6."
    },
    {
      step: 2,
      title: "Apply the quadratic formula",
      content: "Use the quadratic formula: x = (-b ± √(b² - 4ac)) / (2a). Substitute a = 2, b = 4, c = -6."
    },
    {
      step: 3,
      title: "Calculate the discriminant",
      content: "Calculate b² - 4ac = 4² - 4(2)(-6) = 16 + 48 = 64. Since the discriminant is positive, we will have two real solutions."
    },
    {
      step: 4,
      title: "Solve for the roots",
      content: "x = (-4 ± √64) / (2×2) = (-4 ± 8) / 4. This gives us x₁ = (-4 + 8) / 4 = 1 and x₂ = (-4 - 8) / 4 = -3."
    },
  ];

  const handleGenerateNewProblem = () => {
    setShowAnswer(false);
    setShowStepByStep(false);
    setCurrentStep(0);
    setAttempts(0);
    // Logic to generate new problem based on difficulty would be implemented here
    console.log(`Generating new ${selectedDifficulty} problem for concept: ${conceptId}`);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setShowStepByStep(false);
    setCurrentStep(maxSteps);
  };

  const handleStartStepByStep = () => {
    setShowStepByStep(true);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (currentStep < maxSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowStepByStep(false);
      setShowAnswer(true);
    }
  };

  const handleTryAgain = () => {
    setAttempts(attempts + 1);
    // Logic to reset the problem but keep the same question
    console.log(`Attempt ${attempts + 1} for concept: ${conceptId}`);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold">Formula Practice</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleOpenFormulaLab}>
              <Beaker className="h-4 w-4 mr-2" />
              Open Formula Lab
            </Button>
            <Button variant="outline" size="sm" onClick={handleGenerateNewProblem}>
              <RefreshCw className="h-4 w-4 mr-2" />
              New Problem
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Label className="mb-2 block">Difficulty Level</Label>
          <RadioGroup
            defaultValue="medium"
            value={selectedDifficulty}
            onValueChange={(value) => setSelectedDifficulty(value as 'easy' | 'medium' | 'hard')}
            className="flex space-x-2"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="easy" id="easy" className="peer hidden" />
              <Label
                htmlFor="easy"
                className={`cursor-pointer px-3 py-1.5 rounded-md text-sm font-medium ${
                  selectedDifficulty === 'easy'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Easy
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="medium" id="medium" className="peer hidden" />
              <Label
                htmlFor="medium"
                className={`cursor-pointer px-3 py-1.5 rounded-md text-sm font-medium ${
                  selectedDifficulty === 'medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Medium
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="hard" id="hard" className="peer hidden" />
              <Label
                htmlFor="hard"
                className={`cursor-pointer px-3 py-1.5 rounded-md text-sm font-medium ${
                  selectedDifficulty === 'hard'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Hard
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-6">
          <div className="bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
            <h4 className="text-lg font-semibold mb-2">Problem</h4>
            <p>Solve for all values of x: 2x² + 4x - 6 = 0</p>
          </div>

          {attempts > 0 && !showAnswer && !showStepByStep && (
            <div className="text-yellow-600 dark:text-yellow-400 mb-4">
              <p>Attempt {attempts}: Try again! You're getting closer.</p>
            </div>
          )}
          
          {showStepByStep && currentStep < maxSteps && (
            <div className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <h4 className="text-md font-semibold text-blue-800 dark:text-blue-300 mb-2">
                Step {steps[currentStep].step}: {steps[currentStep].title}
              </h4>
              <p className="text-sm">{steps[currentStep].content}</p>
              <Button 
                onClick={handleNextStep} 
                variant="default" 
                size="sm" 
                className="mt-3"
              >
                {currentStep < maxSteps - 1 ? "Next Step" : "Show Final Answer"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
          
          {showAnswer && (
            <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="text-md font-semibold text-green-800 dark:text-green-300 mb-2">Solution</h4>
              <p>The solutions to 2x² + 4x - 6 = 0 are:</p>
              <div className="my-2 text-center">
                <span className="font-semibold">x₁ = 1</span> and <span className="font-semibold">x₂ = -3</span>
              </div>
              <p className="text-sm mt-2">
                Using the quadratic formula: x = (-b ± √(b² - 4ac)) / (2a) with a = 2, b = 4, c = -6.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {!showAnswer && !showStepByStep && (
            <>
              <Button variant="default" onClick={handleStartStepByStep}>
                <Brain className="mr-2 h-4 w-4" />
                Step-by-Step
              </Button>
              <Button variant="outline" onClick={handleTryAgain}>
                Try Again
              </Button>
              <Button variant="secondary" onClick={handleShowAnswer}>
                Show Answer
              </Button>
            </>
          )}
          
          {(showAnswer || showStepByStep) && (
            <Button variant="default" onClick={handleGenerateNewProblem}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try New Problem
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormulaTabContent;
