
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FlaskConical, RotateCw, Calculator, Sliders, ChevronDown, ChevronUp } from 'lucide-react';

interface FormulaTabContentProps {
  conceptName?: string;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ conceptName = "Newton's Second Law" }) => {
  // Default formula data based on the concept
  const formula = "F = m × a";
  const variables = [
    { symbol: "F", name: "Force", unit: "Newtons (N)" },
    { symbol: "m", name: "Mass", unit: "kilograms (kg)" },
    { symbol: "a", name: "Acceleration", unit: "m/s²" }
  ];

  const initialValues = variables.reduce((acc, variable) => {
    acc[variable.symbol] = '';
    return acc;
  }, {} as Record<string, string>);
  
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [result, setResult] = useState<string | null>(null);
  const [solveFor, setSolveFor] = useState<string>(variables[0].symbol);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);
  
  const handleInputChange = (symbol: string, value: string) => {
    setValues({
      ...values,
      [symbol]: value
    });
    setResult(null);
  };
  
  const handleReset = () => {
    setValues(initialValues);
    setResult(null);
  };
  
  const handleSolve = () => {
    try {
      const F = solveFor === 'F' ? null : parseFloat(values['F']);
      const m = solveFor === 'm' ? null : parseFloat(values['m']);
      const a = solveFor === 'a' ? null : parseFloat(values['a']);
      
      let calculatedValue: number | null = null;
      let unit = '';
      
      if (solveFor === 'F') {
        calculatedValue = m !== null && a !== null ? m * a : null;
        unit = 'Newtons (N)';
      } else if (solveFor === 'm') {
        calculatedValue = F !== null && a !== null && a !== 0 ? F / a : null;
        unit = 'kilograms (kg)';
      } else if (solveFor === 'a') {
        calculatedValue = F !== null && m !== null && m !== 0 ? F / m : null;
        unit = 'm/s²';
      }
      
      if (calculatedValue !== null) {
        setResult(`${solveFor} = ${calculatedValue.toFixed(2)} ${unit}`);
      } else {
        setResult('Please enter values for all required fields');
      }
    } catch (error) {
      setResult('Error calculating result. Check your inputs.');
    }
  };
  
  const toggleAdvancedSettings = () => {
    setShowAdvancedSettings(!showAdvancedSettings);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Interactive Formula Analysis</h2>
        <div className="text-sm text-muted-foreground">
          Experiment with formulas and visualize relationships
        </div>
      </div>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FlaskConical className="h-5 w-5 text-indigo-600" />
            Formula Explorer
          </CardTitle>
          <CardDescription>
            Understand how {conceptName} works by manipulating variables
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Solve for:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {variables.map(variable => (
                    <Button
                      key={variable.symbol}
                      variant={solveFor === variable.symbol ? "default" : "outline"}
                      onClick={() => {
                        setSolveFor(variable.symbol);
                        setResult(null);
                      }}
                    >
                      {variable.symbol}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {variables.filter(v => v.symbol !== solveFor).map(variable => (
                  <div key={variable.symbol} className="space-y-2">
                    <Label htmlFor={`input-${variable.symbol}`} className="text-sm font-medium">
                      {variable.name} ({variable.symbol}) [{variable.unit}]
                    </Label>
                    <Input 
                      id={`input-${variable.symbol}`}
                      type="number"
                      placeholder={`Enter ${variable.name}`}
                      value={values[variable.symbol]}
                      onChange={(e) => handleInputChange(variable.symbol, e.target.value)}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={handleSolve}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="text-sm flex items-center justify-center"
                  onClick={toggleAdvancedSettings}
                >
                  <Sliders className="h-3.5 w-3.5 mr-2" />
                  Advanced Settings
                  {showAdvancedSettings ? (
                    <ChevronUp className="h-3.5 w-3.5 ml-2" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 ml-2" />
                  )}
                </Button>
                
                {showAdvancedSettings && (
                  <div className="border rounded-md p-3 space-y-3 mt-2 bg-slate-50 dark:bg-slate-900">
                    <div className="text-sm font-medium mb-2">Precision Settings</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="decimal-places" className="text-xs">Decimal Places</Label>
                        <Input id="decimal-places" type="number" defaultValue="2" min="0" max="10" className="h-8 text-sm" />
                      </div>
                      <div>
                        <Label htmlFor="unit-system" className="text-xs">Unit System</Label>
                        <select id="unit-system" className="w-full h-8 text-sm rounded-md border border-input bg-background px-3">
                          <option value="metric">Metric (SI)</option>
                          <option value="imperial">Imperial</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="text-center w-full">
                <h3 className="text-lg font-medium mb-3">Formula Representation</h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 p-6 rounded-lg border border-blue-100 dark:border-blue-900/50 shadow-sm">
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{formula}</p>
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="mb-2">
                    {conceptName === "Newton's Second Law" && 
                      "Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass."}
                  </p>
                  <p>
                    {conceptName === "Newton's Second Law" && 
                      "This equation is fundamental to classical mechanics and governs the motion of objects with constant mass."}
                  </p>
                </div>
              </div>
              
              {result && (
                <div className="w-full mt-2">
                  <h3 className="text-lg font-medium mb-2 text-center">Result</h3>
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40 border border-emerald-200 dark:border-emerald-900/50 p-6 rounded-lg text-center shadow-sm">
                    <p className="text-2xl font-semibold text-emerald-700 dark:text-emerald-400">{result}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Visualization Section */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Data Visualization</CardTitle>
          <CardDescription>
            See how variables relate to each other in {conceptName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-[2/1] bg-slate-50 dark:bg-slate-900 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Interactive graph visualization</p>
              <p className="text-xs text-muted-foreground">Displays relationship between force, mass, and acceleration</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-world Applications */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Real-world Examples</CardTitle>
          <CardDescription>
            Applications of {conceptName} in everyday scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h3 className="font-medium mb-2">Rocket Propulsion</h3>
              <p className="text-sm text-muted-foreground">
                The thrust (force) of a rocket engine accelerates the rocket in the opposite direction,
                demonstrating Newton's Second Law in action.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h3 className="font-medium mb-2">Vehicle Braking</h3>
              <p className="text-sm text-muted-foreground">
                When a vehicle brakes, the deceleration (negative acceleration) is directly related to
                the braking force and the mass of the vehicle.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaTabContent;
