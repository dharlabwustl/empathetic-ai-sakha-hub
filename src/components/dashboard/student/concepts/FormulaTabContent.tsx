
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  FlaskConical, 
  Calculator,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface Variable {
  symbol: string;
  name: string;
  unit: string;
}

interface FormulaTabContentProps {
  formula: string;
  variables: Variable[];
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ formula, variables }) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [targetVariable, setTargetVariable] = useState<string>(variables[0]?.symbol || '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (variable: string, value: string) => {
    setValues({ ...values, [variable]: value });
    setError(null);
    setSuccess(false);
    setResult(null);
  };

  const calculateResult = () => {
    // This is a simplified example that only works for Ohm's law
    // In a real app, you'd want a more sophisticated formula parser
    
    try {
      let v, i, r;
      
      if (targetVariable === 'V') {
        i = parseFloat(values['I']);
        r = parseFloat(values['R']);
        
        if (isNaN(i) || isNaN(r)) {
          setError('Please enter valid values for current and resistance');
          return;
        }
        
        const result = i * r;
        setResult(`V = ${i} × ${r} = ${result.toFixed(2)} Volts`);
      }
      else if (targetVariable === 'I') {
        v = parseFloat(values['V']);
        r = parseFloat(values['R']);
        
        if (isNaN(v) || isNaN(r)) {
          setError('Please enter valid values for voltage and resistance');
          return;
        }
        
        if (r === 0) {
          setError('Resistance cannot be zero (would cause infinite current)');
          return;
        }
        
        const result = v / r;
        setResult(`I = ${v} ÷ ${r} = ${result.toFixed(2)} Amperes`);
      }
      else if (targetVariable === 'R') {
        v = parseFloat(values['V']);
        i = parseFloat(values['I']);
        
        if (isNaN(v) || isNaN(i)) {
          setError('Please enter valid values for voltage and current');
          return;
        }
        
        if (i === 0) {
          setError('Current cannot be zero (would cause infinite resistance)');
          return;
        }
        
        const result = v / i;
        setResult(`R = ${v} ÷ ${i} = ${result.toFixed(2)} Ohms`);
      }
      
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError('Error in calculation. Please check your inputs.');
      setSuccess(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-indigo-600" />
          Formula Lab: Interactive Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Formula</h3>
              <div className="text-2xl font-bold text-center my-6 text-indigo-700 dark:text-indigo-400">
                {formula}
              </div>
              <div className="space-y-2">
                <h3 className="font-medium mb-1">Variables</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {variables.map((v) => (
                    <li key={v.symbol} className="flex items-center">
                      <span className="font-bold mr-2">{v.symbol}</span>: {v.name} ({v.unit})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">What do you want to solve for?</h3>
              <div className="flex flex-wrap gap-2">
                {variables.map((v) => (
                  <Button
                    key={v.symbol}
                    variant={targetVariable === v.symbol ? "default" : "outline"}
                    onClick={() => {
                      setTargetVariable(v.symbol);
                      setError(null);
                      setResult(null);
                      setSuccess(false);
                    }}
                  >
                    {v.symbol} ({v.name})
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Enter Values</h3>
              
              {variables.filter(v => v.symbol !== targetVariable).map((v) => (
                <div key={v.symbol} className="grid grid-cols-3 items-center gap-4">
                  <label htmlFor={v.symbol} className="font-medium text-sm">
                    {v.name} ({v.symbol}):
                  </label>
                  <Input
                    id={v.symbol}
                    type="number"
                    placeholder={`Enter ${v.name}`}
                    value={values[v.symbol] || ''}
                    onChange={(e) => handleInputChange(v.symbol, e.target.value)}
                    className="col-span-2"
                  />
                </div>
              ))}
              
              <Button 
                onClick={calculateResult} 
                className="w-full mt-4"
                disabled={variables.filter(v => v.symbol !== targetVariable).some(v => !values[v.symbol])}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate {variables.find(v => v.symbol === targetVariable)?.name}
              </Button>
            </div>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-md p-4 flex gap-3">
                <XCircle className="h-5 w-5 text-red-600 shrink-0" />
                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            {success && result && (
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-md p-4 flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                <div>
                  <h4 className="font-medium text-green-700 dark:text-green-400">Result:</h4>
                  <p className="text-green-700 dark:text-green-400 text-lg font-semibold mt-1">{result}</p>
                </div>
              </div>
            )}
            
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-md p-4">
              <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Formula Applications</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <li>Calculating resistance in electrical circuits</li>
                <li>Determining voltage drops across components</li>
                <li>Designing circuits with specific power requirements</li>
                <li>Troubleshooting electrical problems in devices</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormulaTabContent;
