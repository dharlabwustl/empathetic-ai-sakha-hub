
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle, Calculator, RefreshCw, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface FormulaTabContentProps {
  conceptId: string;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ conceptId }) => {
  const { toast } = useToast();
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null);
  const [variables, setVariables] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  
  // Mock formulas for Newton's Laws
  const formulas = [
    { 
      id: 'newton-second-law', 
      name: "Newton's Second Law", 
      formula: 'F = m × a', 
      variables: ['m', 'a'],
      calculate: (vars: Record<string, number>) => vars.m * vars.a,
      unit: 'N',
      hint: 'Force equals mass times acceleration. Make sure your mass is in kg and acceleration in m/s².'
    },
    { 
      id: 'weight', 
      name: "Weight", 
      formula: 'W = m × g', 
      variables: ['m', 'g'],
      calculate: (vars: Record<string, number>) => vars.m * vars.g,
      unit: 'N',
      hint: 'Weight is the force of gravity acting on an object. g is approximately 9.8 m/s² on Earth.'
    },
    { 
      id: 'momentum', 
      name: "Momentum", 
      formula: 'p = m × v', 
      variables: ['m', 'v'],
      calculate: (vars: Record<string, number>) => vars.m * vars.v,
      unit: 'kg·m/s',
      hint: 'Momentum is the product of mass and velocity. It's a vector quantity with direction.'
    }
  ];

  // Find the currently selected formula object
  const currentFormula = formulas.find(f => f.id === selectedFormula);
  
  // Generate random values for practice problems
  const generateRandomProblem = () => {
    const randomVars: Record<string, number> = {};
    
    if (!currentFormula) return;
    
    currentFormula.variables.forEach(variable => {
      // Generate values that make sense for each variable
      if (variable === 'm') {
        randomVars[variable] = Math.round(Math.random() * 10 + 1); // 1-11 kg
      } else if (variable === 'a') {
        randomVars[variable] = Math.round((Math.random() * 20 + 1) * 10) / 10; // 1-21 m/s², rounded to 1 decimal
      } else if (variable === 'g') {
        randomVars[variable] = 9.8; // gravitational acceleration on Earth
      } else if (variable === 'v') {
        randomVars[variable] = Math.round((Math.random() * 30 + 1) * 10) / 10; // 1-31 m/s, rounded to 1 decimal
      }
    });
    
    setVariables(randomVars);
    setResult(null);
    setUserAnswer('');
    setShowHint(false);
    setShowSolution(false);
  };

  const handleFormulaSelect = (formulaId: string) => {
    setSelectedFormula(formulaId);
    setResult(null);
    setUserAnswer('');
    setShowHint(false);
    setShowSolution(false);
    
    // Generate random values for practice
    setTimeout(generateRandomProblem, 100);
  };

  const handleCalculate = () => {
    if (!currentFormula) return;
    
    const calculatedResult = currentFormula.calculate(variables);
    setResult(calculatedResult);
    
    // Also check if user's answer is correct
    const userNumericAnswer = parseFloat(userAnswer);
    if (!isNaN(userNumericAnswer)) {
      const isCorrect = Math.abs(userNumericAnswer - calculatedResult) < 0.1; // Allow small rounding differences
      
      if (isCorrect) {
        toast({
          title: "Correct!",
          description: "Your answer matches the calculated result.",
        });
      } else {
        toast({
          title: "Incorrect",
          description: "Your answer doesn't match the calculated result. Try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    toast({
      title: "Hint Revealed",
      description: "Use this hint to help you solve the problem.",
    });
  };

  // Handle changes to variable inputs
  const handleVariableChange = (variable: string, value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setVariables({
        ...variables,
        [variable]: numericValue
      });
    } else if (value === '') {
      const updatedVariables = { ...variables };
      delete updatedVariables[variable];
      setVariables(updatedVariables);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Formula Practice</CardTitle>
          <CardDescription>
            Practice applying formulas related to Newton's Laws of Motion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {formulas.map(formula => (
              <Button
                key={formula.id}
                variant={selectedFormula === formula.id ? "default" : "outline"}
                className="justify-start h-auto py-3"
                onClick={() => handleFormulaSelect(formula.id)}
              >
                <div className="text-left">
                  <div className="font-medium">{formula.name}</div>
                  <div className="text-sm mt-1 font-mono">{formula.formula}</div>
                </div>
              </Button>
            ))}
          </div>
          
          {selectedFormula && currentFormula && (
            <div className="mt-6">
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">Practice Problem:</h3>
                <p>
                  Calculate the {currentFormula.name.toLowerCase()} using the formula {currentFormula.formula}, with:
                </p>
                <ul className="space-y-1 mt-2">
                  {Object.entries(variables).map(([key, value]) => (
                    <li key={key} className="font-mono">
                      {key} = {value} {key === 'm' ? 'kg' : key === 'a' ? 'm/s²' : key === 'g' ? 'm/s²' : key === 'v' ? 'm/s' : ''}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="user-answer" className="block text-sm font-medium mb-1">
                    Your Answer:
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="user-answer"
                      type="number"
                      placeholder="Enter your answer"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                    />
                    <span className="flex items-center px-3 border rounded-md bg-slate-50 dark:bg-slate-800">
                      {currentFormula.unit}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleCalculate}>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate
                  </Button>
                  
                  <Button variant="outline" onClick={generateRandomProblem}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    New Problem
                  </Button>
                  
                  <Button variant="outline" onClick={handleShowHint}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Show Hint
                  </Button>
                </div>
                
                {result !== null && (
                  <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle>Result</AlertTitle>
                    <AlertDescription>
                      {currentFormula.name}: {result} {currentFormula.unit}
                    </AlertDescription>
                  </Alert>
                )}
                
                {showHint && currentFormula.hint && (
                  <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertTitle>Hint</AlertTitle>
                    <AlertDescription>
                      {currentFormula.hint}
                    </AlertDescription>
                  </Alert>
                )}
                
                {showSolution && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Solution</AlertTitle>
                    <AlertDescription>
                      <div className="font-mono">
                        {currentFormula.formula.split('=')[0]} = {
                          currentFormula.variables.map(v => `${variables[v] || '?'}`).join(' × ')
                        } = {result} {currentFormula.unit}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaTabContent;
