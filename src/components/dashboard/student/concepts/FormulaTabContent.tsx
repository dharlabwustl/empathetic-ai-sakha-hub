
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

interface FormulaVariable {
  symbol: string;
  name: string;
  unit: string;
}

interface FormulaTabContentProps {
  formula?: string;
  variables?: FormulaVariable[];
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({
  formula = "V = I × R",
  variables = [
    { symbol: 'V', name: 'Voltage', unit: 'Volts (V)' },
    { symbol: 'I', name: 'Current', unit: 'Amperes (A)' },
    { symbol: 'R', name: 'Resistance', unit: 'Ohms (Ω)' }
  ]
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Formula Reference
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Formula Display */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl text-center">
            <div className="text-2xl font-mono font-bold">{formula}</div>
          </div>
          
          {/* Variables Explanation */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Variables:</h3>
            <div className="grid gap-2">
              {variables.map((variable, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-mono font-bold">
                    {variable.symbol}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="font-medium">{variable.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Unit: {variable.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Practice Problems */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Try These Problems:</h3>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm">If V = 12V and I = 2A, what is R?</p>
              <div className="mt-2 text-xs text-green-600 dark:text-green-400 flex justify-between">
                <span>Click to solve</span>
                <span>Difficulty: Easy</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm">In a circuit with three 10Ω resistors in parallel, what is the total resistance?</p>
              <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400 flex justify-between">
                <span>Click to solve</span>
                <span>Difficulty: Medium</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormulaTabContent;
