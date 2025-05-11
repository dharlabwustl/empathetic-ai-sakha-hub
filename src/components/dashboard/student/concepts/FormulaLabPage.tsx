
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calculator, Lightbulb, Check, Refresh, Eye, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Formula {
  id: string;
  name: string;
  formula: string;
  variables: Array<{ symbol: string; name: string; unit: string; defaultValue?: number }>;
  description: string;
  steps: string[];
}

interface Concept {
  id: string;
  title: string;
  subject: string;
  formulas: Formula[];
}

const FormulaLabPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [concept, setConcept] = useState<Concept | null>(null);
  const [activeFormula, setActiveFormula] = useState<string>('');
  const [inputValues, setInputValues] = useState<Record<string, Record<string, number>>>({});
  const [results, setResults] = useState<Record<string, number>>({});
  const [showSteps, setShowSteps] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('calculator');
  const [practiceValues, setPracticeValues] = useState<Record<string, Record<string, number>>>({});
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number | null>>({});
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [checkResults, setCheckResults] = useState<Record<string, boolean | null>>({});

  // Mock data for formulas
  useEffect(() => {
    // Simulating API call to get formulas for this concept
    setTimeout(() => {
      const mockConcept: Concept = {
        id: conceptId || '1',
        title: "Newton's Laws of Motion",
        subject: "Physics",
        formulas: [
          {
            id: "f1",
            name: "Newton's Second Law",
            formula: "F = m × a",
            variables: [
              { symbol: "F", name: "Force", unit: "N (Newton)", defaultValue: 10 },
              { symbol: "m", name: "Mass", unit: "kg (Kilogram)", defaultValue: 5 },
              { symbol: "a", name: "Acceleration", unit: "m/s² (Meter per second squared)", defaultValue: 2 }
            ],
            description: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
            steps: [
              "Identify the mass (m) of the object in kilograms.",
              "Determine the acceleration (a) in meters per second squared.",
              "Multiply the mass by the acceleration to calculate the force (F = m × a).",
              "The result is the force in Newtons."
            ]
          },
          {
            id: "f2",
            name: "Weight Formula",
            formula: "W = m × g",
            variables: [
              { symbol: "W", name: "Weight", unit: "N (Newton)", defaultValue: 49 },
              { symbol: "m", name: "Mass", unit: "kg (Kilogram)", defaultValue: 5 },
              { symbol: "g", name: "Gravitational acceleration", unit: "m/s² (typically 9.8 m/s² on Earth)", defaultValue: 9.8 }
            ],
            description: "Weight is the force exerted on an object due to gravity.",
            steps: [
              "Identify the mass (m) of the object in kilograms.",
              "Use the gravitational acceleration (g) of the location (9.8 m/s² on Earth's surface).",
              "Multiply the mass by the gravitational acceleration (W = m × g).",
              "The result is the weight in Newtons."
            ]
          },
          {
            id: "f3",
            name: "Momentum Formula",
            formula: "p = m × v",
            variables: [
              { symbol: "p", name: "Momentum", unit: "kg·m/s", defaultValue: 20 },
              { symbol: "m", name: "Mass", unit: "kg (Kilogram)", defaultValue: 5 },
              { symbol: "v", name: "Velocity", unit: "m/s (Meter per second)", defaultValue: 4 }
            ],
            description: "Linear momentum is the product of an object's mass and its velocity.",
            steps: [
              "Identify the mass (m) of the object in kilograms.",
              "Determine the velocity (v) in meters per second.",
              "Multiply the mass by the velocity (p = m × v).",
              "The result is the momentum in kilogram meters per second."
            ]
          },
        ]
      };

      setConcept(mockConcept);
      setActiveFormula(mockConcept.formulas[0].id);
      
      // Initialize input values with defaults
      const initialInputs: Record<string, Record<string, number>> = {};
      const initialSteps: Record<string, boolean> = {};
      const initialPracticeValues: Record<string, Record<string, number>> = {};
      const initialPracticeAnswers: Record<string, number | null> = {};
      const initialUserAnswers: Record<string, string> = {};
      const initialCheckResults: Record<string, boolean | null> = {};
      
      mockConcept.formulas.forEach(formula => {
        initialInputs[formula.id] = {};
        initialPracticeValues[formula.id] = {};
        initialSteps[formula.id] = false;
        initialPracticeAnswers[formula.id] = null;
        initialUserAnswers[formula.id] = '';
        initialCheckResults[formula.id] = null;
        
        formula.variables.forEach(variable => {
          if (variable.defaultValue) {
            initialInputs[formula.id][variable.symbol] = variable.defaultValue;
          }
          
          // Generate random values for practice
          if (variable.symbol !== formula.variables[0].symbol) { // Skip the result variable
            initialPracticeValues[formula.id][variable.symbol] = Math.floor(Math.random() * 10) + 1;
          }
        });
      });
      
      setInputValues(initialInputs);
      setShowSteps(initialSteps);
      setPracticeValues(initialPracticeValues);
      setPracticeAnswers(initialPracticeAnswers);
      setUserAnswers(initialUserAnswers);
      setCheckResults(initialCheckResults);
      
      // Calculate initial results
      calculateAllResults(initialInputs, mockConcept.formulas);
      calculatePracticeAnswers(initialPracticeValues, mockConcept.formulas);
      
      setLoading(false);
    }, 1000);
  }, [conceptId]);

  const handleInputChange = (formulaId: string, symbol: string, value: string) => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) return;
    
    const updatedInputs = {
      ...inputValues,
      [formulaId]: {
        ...inputValues[formulaId],
        [symbol]: parsedValue
      }
    };
    
    setInputValues(updatedInputs);
    calculateResult(formulaId, updatedInputs[formulaId]);
  };

  const calculateResult = (formulaId: string, values: Record<string, number>) => {
    if (!concept) return;
    
    const formula = concept.formulas.find(f => f.id === formulaId);
    if (!formula) return;
    
    let result = 0;
    
    if (formula.name === "Newton's Second Law") {
      // F = m × a
      const m = values["m"] || 0;
      const a = values["a"] || 0;
      result = m * a;
    } 
    else if (formula.name === "Weight Formula") {
      // W = m × g
      const m = values["m"] || 0;
      const g = values["g"] || 9.8;
      result = m * g;
    }
    else if (formula.name === "Momentum Formula") {
      // p = m × v
      const m = values["m"] || 0;
      const v = values["v"] || 0;
      result = m * v;
    }
    
    setResults(prev => ({
      ...prev,
      [formulaId]: result
    }));
  };

  const calculateAllResults = (allInputs: Record<string, Record<string, number>>, formulas: Formula[]) => {
    const newResults: Record<string, number> = {};
    
    formulas.forEach(formula => {
      const values = allInputs[formula.id];
      if (!values) return;
      
      let result = 0;
      
      if (formula.name === "Newton's Second Law") {
        // F = m × a
        const m = values["m"] || 0;
        const a = values["a"] || 0;
        result = m * a;
      } 
      else if (formula.name === "Weight Formula") {
        // W = m × g
        const m = values["m"] || 0;
        const g = values["g"] || 9.8;
        result = m * g;
      }
      else if (formula.name === "Momentum Formula") {
        // p = m × v
        const m = values["m"] || 0;
        const v = values["v"] || 0;
        result = m * v;
      }
      
      newResults[formula.id] = result;
    });
    
    setResults(newResults);
  };

  const calculatePracticeAnswers = (practiceValues: Record<string, Record<string, number>>, formulas: Formula[]) => {
    const newAnswers: Record<string, number> = {};
    
    formulas.forEach(formula => {
      const values = practiceValues[formula.id];
      if (!values) return;
      
      let result = 0;
      
      if (formula.name === "Newton's Second Law") {
        // F = m × a
        const m = values["m"] || 0;
        const a = values["a"] || 0;
        result = m * a;
      } 
      else if (formula.name === "Weight Formula") {
        // W = m × g
        const m = values["m"] || 0;
        const g = values["g"] || 9.8;
        result = m * g;
      }
      else if (formula.name === "Momentum Formula") {
        // p = m × v
        const m = values["m"] || 0;
        const v = values["v"] || 0;
        result = m * v;
      }
      
      newAnswers[formula.id] = result;
    });
    
    setPracticeAnswers(newAnswers);
  };

  const toggleSteps = (formulaId: string) => {
    setShowSteps(prev => ({
      ...prev,
      [formulaId]: !prev[formulaId]
    }));
  };

  const generateNewPracticeValues = (formulaId: string) => {
    if (!concept) return;
    
    const formula = concept.formulas.find(f => f.id === formulaId);
    if (!formula) return;
    
    const newValues = { ...practiceValues };
    newValues[formulaId] = {};
    
    formula.variables.forEach(variable => {
      if (variable.symbol !== formula.variables[0].symbol) { // Skip the result variable
        newValues[formulaId][variable.symbol] = Math.floor(Math.random() * 10) + 1;
      }
    });
    
    setPracticeValues(newValues);
    setUserAnswers(prev => ({ ...prev, [formulaId]: '' }));
    setCheckResults(prev => ({ ...prev, [formulaId]: null }));
    
    // Recalculate practice answers
    const newAnswers = { ...practiceAnswers };
    let result = 0;
    
    if (formula.name === "Newton's Second Law") {
      // F = m × a
      const m = newValues[formulaId]["m"] || 0;
      const a = newValues[formulaId]["a"] || 0;
      result = m * a;
    } 
    else if (formula.name === "Weight Formula") {
      // W = m × g
      const m = newValues[formulaId]["m"] || 0;
      const g = newValues[formulaId]["g"] || 9.8;
      result = m * g;
    }
    else if (formula.name === "Momentum Formula") {
      // p = m × v
      const m = newValues[formulaId]["m"] || 0;
      const v = newValues[formulaId]["v"] || 0;
      result = m * v;
    }
    
    newAnswers[formulaId] = result;
    setPracticeAnswers(newAnswers);
  };

  const handleUserAnswerChange = (formulaId: string, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [formulaId]: value
    }));
    
    // Reset check result when user changes answer
    setCheckResults(prev => ({
      ...prev,
      [formulaId]: null
    }));
  };

  const checkAnswer = (formulaId: string) => {
    if (!practiceAnswers[formulaId]) return;
    
    const userAnswer = parseFloat(userAnswers[formulaId]);
    const correctAnswer = practiceAnswers[formulaId];
    
    if (isNaN(userAnswer)) {
      toast({
        title: "Invalid answer",
        description: "Please enter a number",
        variant: "destructive"
      });
      return;
    }
    
    // Check if the answer is within 0.1 of the correct answer to account for rounding
    const isCorrect = Math.abs(userAnswer - correctAnswer) < 0.1;
    
    setCheckResults(prev => ({
      ...prev,
      [formulaId]: isCorrect
    }));
    
    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect 
        ? "Great job! Your answer is correct." 
        : `The correct answer is ${correctAnswer.toFixed(2)}.`,
      variant: isCorrect ? "default" : "destructive"
    });
  };

  const showHint = (formulaId: string) => {
    if (!concept) return;
    
    const formula = concept.formulas.find(f => f.id === formulaId);
    if (!formula) return;
    
    toast({
      title: "Formula Hint",
      description: `For ${formula.name}, use the formula: ${formula.formula}`,
      variant: "default"
    });
  };

  const handleBack = () => {
    navigate(`/dashboard/student/concepts/card/${conceptId}`);
  };

  if (loading || !concept) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const getCurrentFormula = () => {
    return concept.formulas.find(f => f.id === activeFormula) || concept.formulas[0];
  };

  return (
    <div className="container py-6">
      <Button 
        variant="outline" 
        className="flex gap-2 items-center mb-4" 
        onClick={handleBack}
      >
        <ArrowLeft size={16} />
        Back to Concept
      </Button>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Calculator className="h-8 w-8 text-blue-600" />
            Formula Lab
          </h1>
          <p className="text-muted-foreground mt-1">
            Interactive formulas for {concept.title}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            {concept.subject}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Formula Selector Sidebar */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Formulas</CardTitle>
              <CardDescription>Select a formula to work with</CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-2">
                {concept.formulas.map((formula) => (
                  <Button
                    key={formula.id}
                    variant={activeFormula === formula.id ? "default" : "outline"}
                    className={`w-full justify-start ${activeFormula === formula.id ? "" : "bg-card hover:bg-accent"}`}
                    onClick={() => setActiveFormula(formula.id)}
                  >
                    <div className="truncate">{formula.name}</div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>{getCurrentFormula().name}</CardTitle>
              <CardDescription>{getCurrentFormula().description}</CardDescription>
              <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="text-xl md:text-2xl font-serif font-medium">{getCurrentFormula().formula}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="calculator">Calculator</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>
                
                <TabsContent value="calculator" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {getCurrentFormula().variables.map(variable => (
                      <div key={variable.symbol} className="space-y-1.5">
                        <Label htmlFor={`${activeFormula}-${variable.symbol}`}>
                          {variable.name} ({variable.symbol})
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`${activeFormula}-${variable.symbol}`}
                            value={variable.symbol === getCurrentFormula().variables[0].symbol 
                              ? results[activeFormula] !== undefined ? results[activeFormula].toFixed(2) : ""
                              : inputValues[activeFormula]?.[variable.symbol] || ""}
                            onChange={(e) => handleInputChange(activeFormula, variable.symbol, e.target.value)}
                            placeholder={`Enter ${variable.name.toLowerCase()}`}
                            type="number"
                            step="0.1"
                            disabled={variable.symbol === getCurrentFormula().variables[0].symbol}
                            className={variable.symbol === getCurrentFormula().variables[0].symbol 
                              ? "bg-blue-50 dark:bg-blue-900/20 font-medium" : ""}
                          />
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {variable.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toggleSteps(activeFormula)}
                  >
                    {showSteps[activeFormula] ? "Hide Steps" : "Show Steps"}
                  </Button>
                  
                  {showSteps[activeFormula] && (
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        Step-by-Step Solution
                      </h4>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        {getCurrentFormula().steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="practice" className="space-y-4 pt-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Solve for {getCurrentFormula().variables[0].symbol}</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {getCurrentFormula().variables.map(variable => {
                        if (variable.symbol === getCurrentFormula().variables[0].symbol) {
                          // This is the value the student needs to calculate
                          return (
                            <div key={variable.symbol} className="space-y-1.5">
                              <Label htmlFor={`practice-${activeFormula}-${variable.symbol}`}>
                                {variable.name} ({variable.symbol})
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  id={`practice-${activeFormula}-${variable.symbol}`}
                                  value={userAnswers[activeFormula] || ""}
                                  onChange={(e) => handleUserAnswerChange(activeFormula, e.target.value)}
                                  placeholder={`Calculate ${variable.name.toLowerCase()}`}
                                  type="number"
                                  step="0.1"
                                  className={checkResults[activeFormula] !== null 
                                    ? checkResults[activeFormula] 
                                      ? "border-green-500 bg-green-50" 
                                      : "border-red-500 bg-red-50"
                                    : ""}
                                />
                                <span className="text-sm text-muted-foreground whitespace-nowrap">
                                  {variable.unit}
                                </span>
                              </div>
                              {checkResults[activeFormula] !== null && (
                                <div className={`flex items-center gap-1 text-sm ${checkResults[activeFormula] ? "text-green-600" : "text-red-600"} mt-1`}>
                                  {checkResults[activeFormula] 
                                    ? <Check className="h-3 w-3" />
                                    : <Eye className="h-3 w-3" />
                                  }
                                  <span>
                                    {checkResults[activeFormula] 
                                      ? "Correct!"
                                      : `Correct answer: ${practiceAnswers[activeFormula]?.toFixed(2)}`
                                    }
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        } else {
                          // These are the given values
                          return (
                            <div key={variable.symbol} className="space-y-1.5">
                              <Label htmlFor={`practice-${activeFormula}-${variable.symbol}`}>
                                {variable.name} ({variable.symbol})
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  id={`practice-${activeFormula}-${variable.symbol}`}
                                  value={practiceValues[activeFormula]?.[variable.symbol]?.toString() || ""}
                                  disabled
                                  className="bg-muted"
                                />
                                <span className="text-sm text-muted-foreground whitespace-nowrap">
                                  {variable.unit}
                                </span>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button onClick={() => checkAnswer(activeFormula)}>
                        Check Answer
                      </Button>
                      <Button variant="outline" onClick={() => generateNewPracticeValues(activeFormula)}>
                        <Refresh className="h-4 w-4 mr-1" />
                        New Values
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => showHint(activeFormula)}
                        className="ml-auto"
                      >
                        <Lightbulb className="h-4 w-4 mr-1" />
                        Hint
                      </Button>
                      <Button
                        variant="ghost"
                        className="ml-auto"
                        onClick={() => {
                          setActiveTab('calculator');
                          setShowSteps({...showSteps, [activeFormula]: true});
                        }}
                      >
                        <Calculator className="h-4 w-4 mr-1" />
                        Show Calculator
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calculator className="h-4 w-4" />
                <span>Formula Lab</span>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                Share Formula
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormulaLabPage;
