
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from 'lucide-react';

interface FormulaTabContentProps {
  conceptId: string;
  conceptTitle: string;
  handleOpenFormulaLab: () => void;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ 
  conceptId,
  conceptTitle,
  handleOpenFormulaLab
}) => {
  // Example formulas related to Newton's Laws (if conceptId is 1)
  const formulas = [
    {
      id: "f1",
      name: "Newton's Second Law",
      formula: "F = ma",
      variables: [
        { symbol: "F", name: "Force", unit: "N (Newton)" },
        { symbol: "m", name: "Mass", unit: "kg (Kilogram)" },
        { symbol: "a", name: "Acceleration", unit: "m/s² (Meter per second squared)" }
      ],
      description: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass."
    },
    {
      id: "f2",
      name: "Weight Formula",
      formula: "W = mg",
      variables: [
        { symbol: "W", name: "Weight", unit: "N (Newton)" },
        { symbol: "m", name: "Mass", unit: "kg (Kilogram)" },
        { symbol: "g", name: "Gravitational acceleration", unit: "m/s² (typically 9.8 m/s² on Earth)" }
      ],
      description: "Weight is the force exerted on an object due to gravity."
    }
  ];

  return (
    <Card className="border border-gray-100 dark:border-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            <span>Formula Lab</span>
          </div>
          <Button onClick={handleOpenFormulaLab} className="bg-blue-600 hover:bg-blue-700">
            Open Formula Lab
          </Button>
        </CardTitle>
        <CardDescription>
          Practice and master formulas related to {conceptTitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {formulas.map((formula, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg">
              <h3 className="text-lg font-medium mb-3">{formula.name}</h3>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-md flex items-center justify-center mb-4 shadow-sm">
                <span className="text-xl md:text-2xl font-serif">{formula.formula}</span>
              </div>
              <h4 className="font-medium text-sm mb-2">Variables:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {formula.variables.map((variable, vIndex) => (
                  <div key={vIndex} className="bg-white dark:bg-gray-800 p-3 rounded-md text-sm shadow-sm">
                    <span className="font-bold">{variable.symbol}</span>: {variable.name} ({variable.unit})
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{formula.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-3 border-t pt-4">
        <h4 className="font-medium">In the Formula Lab you can:</h4>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
          <li>Practice with interactive formula calculators</li>
          <li>See step-by-step solutions for different problems</li>
          <li>Get hints and explanations for each formula</li>
          <li>Track your understanding of each formula</li>
        </ul>
        <Button variant="outline" onClick={handleOpenFormulaLab} className="mt-3 w-full sm:w-auto">
          Start Formula Practice
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormulaTabContent;
