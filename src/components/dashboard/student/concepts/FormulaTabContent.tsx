import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FlaskConical, RotateCw, Calculator } from 'lucide-react';

interface Variable {
  symbol: string;
  name: string;
  unit: string;
}

interface FormulaTabContentProps {
  formula: string;
  variables: Variable[];
}

export const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ formula, variables }) => {
  const initialValues = variables.reduce((acc, variable) => {
    acc[variable.symbol] = '';
    return acc;
  }, {} as Record<string, string>);
  
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [result, setResult] = useState<string | null>(null);
  const [solveFor, setSolveFor] = useState<string>(variables[0].symbol);
  
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
      const V = solveFor === 'V' ? null : parseFloat(values['V']);
      const I = solveFor === 'I' ? null : parseFloat(values['I']);
      const R = solveFor === 'R' ? null : parseFloat(values['R']);
      
      let calculatedValue: number | null = null;
      let unit = '';
      
      if (solveFor === 'V') {
        calculatedValue = I !== null && R !== null ? I * R : null;
        unit = 'Volts (V)';
      } else if (solveFor === 'I') {
        calculatedValue = V !== null && R !== null ? V / R : null;
        unit = 'Amperes (A)';
      } else if (solveFor === 'R') {
        calculatedValue = V !== null && I !== null ? V / I : null;
        unit = 'Ohms (Ω)';
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
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-indigo-600" />
            Interactive Formula Lab
          </CardTitle>
          <CardDescription>
            Experiment with {formula} to understand how variables affect each other
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Choose variable to solve for:</Label>
                <div className="flex gap-2 mt-2">
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
                    <Label htmlFor={`input-${variable.symbol}`}>
                      {variable.name} ({variable.symbol}) [{variable.unit}]
                    </Label>
                    <Input 
                      id={`input-${variable.symbol}`}
                      type="number"
                      placeholder={`Enter ${variable.name}`}
                      value={values[variable.symbol]}
                      onChange={(e) => handleInputChange(variable.symbol, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button className="flex-1" onClick={handleSolve}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <RotateCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Formula</h3>
                <div className="bg-indigo-50 dark:bg-indigo-950/40 p-6 rounded-lg">
                  <p className="text-3xl font-bold text-indigo-600">{formula}</p>
                </div>
              </div>
              
              {result && (
                <div className="w-full mt-6">
                  <h3 className="text-lg font-medium mb-2 text-center">Result</h3>
                  <div className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 p-4 rounded-lg text-center">
                    <p className="text-xl font-semibold text-green-700 dark:text-green-400">{result}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Interactive Circuit Simulator</CardTitle>
          <CardDescription>
            Drag and adjust components to see Ohm's Law in action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center p-6">
              <p className="text-slate-500 dark:text-slate-400">Interactive circuit simulator would be displayed here</p>
              <p className="text-sm text-slate-400 mt-2">Adjust voltage, resistance, and see how current changes in real-time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaTabContent;
