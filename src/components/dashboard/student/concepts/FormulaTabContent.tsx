
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Calculator, CopyIcon, InfoIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface Formula {
  id: string;
  name: string;
  formula: string;
  description: string;
}

interface ConceptWithFormulas {
  id: string;
  title: string;
  formulas: Formula[];
  [key: string]: any;
}

interface FormulaTabContentProps {
  concept: ConceptWithFormulas;
}

const FormulaTabContent = ({ concept }: FormulaTabContentProps) => {
  const [activeFormula, setActiveFormula] = useState<Formula | null>(concept.formulas.length > 0 ? concept.formulas[0] : null);
  const [practiceMode, setPracticeMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { toast } = useToast();

  const copyFormula = (formula: string) => {
    navigator.clipboard.writeText(formula);
    toast({
      title: "Formula Copied",
      description: "The formula has been copied to your clipboard.",
    });
  };

  const startPractice = () => {
    setPracticeMode(true);
    setInputValue("");
    setIsCorrect(null);
    
    toast({
      title: "Practice Mode Activated",
      description: "Try to write the formula from memory.",
    });
  };

  const checkAnswer = () => {
    if (!activeFormula) return;
    
    // Simple check - in a real app, this would be more sophisticated
    const isUserCorrect = inputValue.replace(/\s+/g, '') === activeFormula.formula.replace(/\s+/g, '');
    setIsCorrect(isUserCorrect);
    
    toast({
      title: isUserCorrect ? "Correct!" : "Not Quite Right",
      description: isUserCorrect 
        ? "Great job! You've memorized this formula correctly."
        : "The formula isn't quite right. Check your answer and try again.",
      variant: isUserCorrect ? "default" : "destructive",
    });
  };

  const resetPractice = () => {
    setPracticeMode(false);
    setInputValue("");
    setIsCorrect(null);
  };

  const openCalculator = () => {
    toast({
      title: "Calculator Opened",
      description: "This would open a scientific calculator for your calculations.",
    });
    
    // Open system calculator if available
    try {
      window.open('calculator:///', '_blank');
    } catch (e) {
      console.log('Native calculator app could not be opened');
      // Fallback to a web calculator
      window.open('https://www.desmos.com/scientific', '_blank');
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-medium mb-4">Concept Formulas</h3>
          <div className="space-y-3">
            {concept.formulas.map((formula) => (
              <Card 
                key={formula.id}
                className={`cursor-pointer transition-all hover:border-primary ${formula.id === activeFormula?.id ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => {
                  setActiveFormula(formula);
                  setPracticeMode(false);
                  setIsCorrect(null);
                }}
              >
                <CardHeader className="py-3">
                  <CardTitle className="text-base font-medium">{formula.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
            
            {concept.formulas.length === 0 && (
              <div className="text-center p-6 text-muted-foreground">
                No formulas available for this concept.
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {activeFormula ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">{activeFormula.name}</h3>
                <div>
                  <Button variant="outline" size="sm" className="mr-2" onClick={openCalculator}>
                    <Calculator className="mr-1 h-4 w-4" />
                    Calculator
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="bg-muted/50 p-4 rounded-md text-center mb-4">
                    <div className="text-xl font-mono">{activeFormula.formula}</div>
                    <div className="flex justify-center mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyFormula(activeFormula.formula)}
                      >
                        <CopyIcon className="h-3.5 w-3.5 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1 flex items-center">
                        <InfoIcon className="h-4 w-4 mr-1 text-blue-500" />
                        Description
                      </h4>
                      <p className="text-muted-foreground">{activeFormula.description}</p>
                    </div>
                    
                    {practiceMode ? (
                      <div className="space-y-4 pt-4">
                        <Separator />
                        <h4 className="font-medium">Practice Mode</h4>
                        <p className="text-sm text-muted-foreground">
                          Try to write the formula from memory:
                        </p>
                        
                        <Input 
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Type the formula here..."
                          className="font-mono"
                        />
                        
                        <div className="flex space-x-2">
                          <Button onClick={checkAnswer} disabled={!inputValue}>Check Answer</Button>
                          <Button variant="outline" onClick={resetPractice}>Cancel</Button>
                        </div>
                        
                        {isCorrect !== null && (
                          <Alert variant={isCorrect ? "default" : "destructive"}>
                            <AlertTitle>{isCorrect ? "Correct!" : "Not Quite Right"}</AlertTitle>
                            <AlertDescription>
                              {isCorrect ? (
                                "You've memorized this formula correctly."
                              ) : (
                                <>
                                  <p>The correct formula is:</p>
                                  <p className="font-mono mt-1">{activeFormula.formula}</p>
                                </>
                              )}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    ) : (
                      <div className="pt-2">
                        <Button onClick={startPractice}>Practice This Formula</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div>
                <h4 className="font-medium mb-3">Common Applications</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Problem Solving</Badge>
                  <Badge variant="outline">Exam Questions</Badge>
                  <Badge variant="outline">Theoretical Analysis</Badge>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a formula to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormulaTabContent;
