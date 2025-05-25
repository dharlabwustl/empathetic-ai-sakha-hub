
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, Variable, Lightbulb } from 'lucide-react';

interface FormulaVariable {
  symbol: string;
  name: string;
  unit: string;
}

interface FormulaTabContentProps {
  formulaTitle?: string;
  formulaExpression?: string;
  variables?: FormulaVariable[];
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({
  formulaTitle = "Ohm's Law",
  formulaExpression = "V = I × R",
  variables = [
    { symbol: 'V', name: 'Voltage', unit: 'Volts (V)' },
    { symbol: 'I', name: 'Current', unit: 'Amperes (A)' },
    { symbol: 'R', name: 'Resistance', unit: 'Ohms (Ω)' }
  ]
}) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>('');

  const handleCalculate = () => {
    // Simple calculation logic for demo
    const v = parseFloat(inputValues['V'] || '0');
    const i = parseFloat(inputValues['I'] || '0');
    const r = parseFloat(inputValues['R'] || '0');

    if (i && r && !v) {
      setResult(`V = ${(i * r).toFixed(2)} V`);
    } else if (v && r && !i) {
      setResult(`I = ${(v / r).toFixed(2)} A`);
    } else if (v && i && !r) {
      setResult(`R = ${(v / i).toFixed(2)} Ω`);
    } else {
      setResult('Please fill in exactly two values to solve for the third');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            {formulaTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {formulaExpression}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {variables.map((variable) => (
              <div key={variable.symbol} className="space-y-2">
                <label className="font-medium flex items-center gap-2">
                  <Variable className="h-4 w-4" />
                  {variable.symbol} - {variable.name}
                </label>
                <Input
                  type="number"
                  placeholder={`Enter ${variable.name}`}
                  value={inputValues[variable.symbol] || ''}
                  onChange={(e) => setInputValues(prev => ({
                    ...prev,
                    [variable.symbol]: e.target.value
                  }))}
                />
                <p className="text-xs text-gray-500">{variable.unit}</p>
              </div>
            ))}
          </div>

          <Button onClick={handleCalculate} className="w-full mb-4">
            Calculate
          </Button>

          {result && (
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-5 w-5 text-green-600" />
                <span className="font-medium">Result:</span>
              </div>
              <p className="text-lg font-bold text-green-700 dark:text-green-300">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaTabContent;
