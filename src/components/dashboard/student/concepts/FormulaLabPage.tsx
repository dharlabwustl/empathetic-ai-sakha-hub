
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Play, BookOpen, Brain, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FormulaLabPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formula, setFormula] = useState("F = ma");
  const [variables, setVariables] = useState<Record<string, string>>({
    F: '',
    m: '',
    a: ''
  });
  const [result, setResult] = useState<string | null>(null);
  const [solveFor, setSolveFor] = useState<string>('a');
  
  const handleInputChange = (variable: string, value: string) => {
    setVariables({
      ...variables,
      [variable]: value
    });
    setResult(null); // Clear previous result
  };
  
  const calculateResult = () => {
    try {
      // This is a simple implementation - in a real app, you'd use a proper formula parser
      switch(formula) {
        case "F = ma":
          if (solveFor === 'F' && variables.m && variables.a) {
            const m = parseFloat(variables.m);
            const a = parseFloat(variables.a);
            setResult(`F = ${m} × ${a} = ${(m * a).toFixed(2)} N`);
          } else if (solveFor === 'm' && variables.F && variables.a) {
            const F = parseFloat(variables.F);
            const a = parseFloat(variables.a);
            setResult(`m = ${F} ÷ ${a} = ${(F / a).toFixed(2)} kg`);
          } else if (solveFor === 'a' && variables.F && variables.m) {
            const F = parseFloat(variables.F);
            const m = parseFloat(variables.m);
            setResult(`a = ${F} ÷ ${m} = ${(F / m).toFixed(2)} m/s²`);
          } else {
            setResult("Please fill in the required variables");
          }
          break;
        default:
          setResult("Formula not supported yet");
      }
    } catch (error) {
      setResult("Error in calculation. Please check your inputs.");
    }
  };
  
  const handleReset = () => {
    setVariables({
      F: '',
      m: '',
      a: ''
    });
    setResult(null);
  };
  
  const formulaVariables = {
    "F = ma": [
      { symbol: "F", name: "Force", unit: "N" },
      { symbol: "m", name: "Mass", unit: "kg" },
      { symbol: "a", name: "Acceleration", unit: "m/s²" }
    ],
    "W = mg": [
      { symbol: "W", name: "Weight", unit: "N" },
      { symbol: "m", name: "Mass", unit: "kg" },
      { symbol: "g", name: "Gravity", unit: "m/s²" }
    ],
    "E = mc²": [
      { symbol: "E", name: "Energy", unit: "J" },
      { symbol: "m", name: "Mass", unit: "kg" },
      { symbol: "c", name: "Speed of light", unit: "m/s" }
    ]
  };
  
  const availableFormulas = [
    "F = ma",
    "W = mg",
    "E = mc²"
  ];
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(`/dashboard/student/concepts/card/${conceptId}`)} className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Concept Card
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold">Formula Lab</h1>
        <p className="text-muted-foreground mt-1">
          Explore, experiment, and visualize physics formulas
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Interactive Formula Lab</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="calculator">
                <TabsList className="mb-4">
                  <TabsTrigger value="calculator">Calculator</TabsTrigger>
                  <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>
                
                <TabsContent value="calculator" className="space-y-6">
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <Label className="text-sm text-muted-foreground mb-2 block">Select Formula</Label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {availableFormulas.map((f) => (
                        <Button
                          key={f}
                          variant={formula === f ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setFormula(f);
                            handleReset();
                          }}
                        >
                          {f}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="bg-card p-6 rounded-lg border shadow-sm mb-4">
                      <p className="text-center font-mono text-2xl mb-4">{formula}</p>
                      
                      <div className="mb-4">
                        <Label className="text-sm mb-2 block">Solve for</Label>
                        <div className="flex flex-wrap gap-2">
                          {formulaVariables[formula as keyof typeof formulaVariables]?.map(({ symbol }) => (
                            <Button
                              key={symbol}
                              variant={solveFor === symbol ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                setSolveFor(symbol);
                                setResult(null);
                              }}
                            >
                              {symbol}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {formulaVariables[formula as keyof typeof formulaVariables]?.map(({ symbol, name, unit }) => (
                          symbol !== solveFor && (
                            <div key={symbol}>
                              <Label htmlFor={`var-${symbol}`} className="text-sm mb-1 block">
                                {name} ({symbol}) [{unit}]
                              </Label>
                              <Input
                                id={`var-${symbol}`}
                                type="number"
                                value={variables[symbol] || ''}
                                onChange={(e) => handleInputChange(symbol, e.target.value)}
                                placeholder={`Enter ${name}`}
                              />
                            </div>
                          )
                        ))}
                      </div>
                      
                      <div className="flex gap-3">
                        <Button onClick={calculateResult} className="flex-1">
                          Calculate
                        </Button>
                        <Button variant="outline" onClick={handleReset} className="gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Reset
                        </Button>
                      </div>
                    </div>
                    
                    {result && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                        <h3 className="font-medium mb-1">Result:</h3>
                        <p className="font-mono text-xl">{result}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Formula Explanation</h3>
                    {formula === "F = ma" && (
                      <div className="space-y-2">
                        <p>Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li><strong>F</strong>: Force in Newtons (N)</li>
                          <li><strong>m</strong>: Mass in kilograms (kg)</li>
                          <li><strong>a</strong>: Acceleration in meters per second squared (m/s²)</li>
                        </ul>
                      </div>
                    )}
                    {formula === "W = mg" && (
                      <div className="space-y-2">
                        <p>The weight of an object is the force of gravity acting on it and is calculated as the product of its mass and the acceleration due to gravity.</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li><strong>W</strong>: Weight in Newtons (N)</li>
                          <li><strong>m</strong>: Mass in kilograms (kg)</li>
                          <li><strong>g</strong>: Acceleration due to gravity (approximately 9.8 m/s² on Earth)</li>
                        </ul>
                      </div>
                    )}
                    {formula === "E = mc²" && (
                      <div className="space-y-2">
                        <p>Einstein's famous equation establishes the equivalence of mass and energy, showing that the energy of an object is equal to its mass multiplied by the square of the speed of light.</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li><strong>E</strong>: Energy in Joules (J)</li>
                          <li><strong>m</strong>: Mass in kilograms (kg)</li>
                          <li><strong>c</strong>: Speed of light (approximately 3 × 10⁸ m/s)</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="visualizer">
                  <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <Button>Launch Formula Visualization</Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Interactive visualization coming soon
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="practice">
                  <div className="space-y-4">
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h3 className="font-medium mb-3">Practice Problems</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-card p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">Problem 1</h4>
                          <p className="mb-3">A 5kg object experiences a force of 20N. Calculate its acceleration.</p>
                          <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                              <Brain className="h-4 w-4 mr-1" /> Show Solution
                            </Button>
                            <Button size="sm">
                              <BookOpen className="h-4 w-4 mr-1" /> Solve Step by Step
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-card p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">Problem 2</h4>
                          <p className="mb-3">A 1500kg car accelerates from 0 to 27 m/s in 10 seconds. Calculate the net force acting on the car.</p>
                          <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                              <Brain className="h-4 w-4 mr-1" /> Show Solution
                            </Button>
                            <Button size="sm">
                              <BookOpen className="h-4 w-4 mr-1" /> Solve Step by Step
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-card p-4 rounded-lg border">
                          <h4 className="font-medium mb-2">Problem 3</h4>
                          <p className="mb-3">A net force of 400N produces an acceleration of 8 m/s². What is the mass of the object?</p>
                          <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                              <Brain className="h-4 w-4 mr-1" /> Show Solution
                            </Button>
                            <Button size="sm">
                              <BookOpen className="h-4 w-4 mr-1" /> Solve Step by Step
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Related Formulas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formula === "F = ma" && (
                  <>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="font-mono text-center mb-1">W = mg</div>
                      <p className="text-sm">Weight equals mass times gravity</p>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="font-mono text-center mb-1">p = mv</div>
                      <p className="text-sm">Momentum equals mass times velocity</p>
                    </div>
                  </>
                )}
                {formula === "W = mg" && (
                  <>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="font-mono text-center mb-1">F = ma</div>
                      <p className="text-sm">Force equals mass times acceleration</p>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="font-mono text-center mb-1">PE = mgh</div>
                      <p className="text-sm">Potential energy equals mass times gravity times height</p>
                    </div>
                  </>
                )}
                {formula === "E = mc²" && (
                  <>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="font-mono text-center mb-1">p = E/c</div>
                      <p className="text-sm">Momentum equals energy divided by the speed of light</p>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="font-mono text-center mb-1">λ = h/p</div>
                      <p className="text-sm">De Broglie wavelength equals Planck's constant divided by momentum</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Exam Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Always check your units when applying formulas</li>
                <li>Practice rearranging equations to solve for different variables</li>
                <li>Remember to convert units when necessary (e.g., kg to g, km to m)</li>
                <li>Draw free-body diagrams to identify all forces acting on an object</li>
                <li>Common mistakes include forgetting to square the speed of light in E=mc²</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormulaLabPage;
