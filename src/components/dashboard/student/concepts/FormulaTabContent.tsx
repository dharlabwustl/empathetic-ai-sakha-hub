
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
    <Card className="border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700 pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300">Formula Lab</span>
          </div>
          <Button 
            onClick={handleOpenFormulaLab} 
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Open Formula Lab
          </Button>
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Practice and master formulas related to {conceptTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8">
          {formulas.map((formula, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">{formula.name}</h3>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-md mb-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-serif text-blue-700 dark:text-blue-400">{formula.formula}</span>
              </div>
              <h4 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-300">Variables:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                {formula.variables.map((variable, vIndex) => (
                  <div 
                    key={vIndex} 
                    className="bg-white dark:bg-gray-800 p-3 rounded-md text-sm shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
                  >
                    <span className="font-bold text-blue-600 dark:text-blue-400">{variable.symbol}</span>: 
                    <span className="text-gray-700 dark:text-gray-300"> {variable.name}</span> 
                    <span className="text-gray-500 dark:text-gray-400 text-xs block mt-1">({variable.unit})</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">{formula.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-3 border-t pt-5 pb-5 px-6 bg-gray-50 dark:bg-gray-800/30">
        <h4 className="font-medium text-gray-800 dark:text-gray-200">In the Formula Lab you can:</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li>Practice with interactive formula calculators</li>
          <li>See step-by-step solutions for different problems</li>
          <li>Get hints and explanations for each formula</li>
          <li>Track your understanding of each formula</li>
        </ul>
        <Button 
          variant="outline" 
          onClick={handleOpenFormulaLab} 
          className="mt-4 w-full sm:w-auto border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/20 transition-all duration-300"
        >
          Start Formula Practice
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormulaTabContent;
