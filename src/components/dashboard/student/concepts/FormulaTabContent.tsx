
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, ArrowRight } from 'lucide-react';

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
  // In a real app, these formulas would come from an API
  const formulas = [
    {
      id: "f1",
      name: "Newton's Second Law",
      formula: "F = ma",
      description: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass."
    },
    {
      id: "f2",
      name: "Weight Formula",
      formula: "W = mg",
      description: "Weight is the force exerted on an object due to gravity."
    },
    {
      id: "f3",
      name: "Momentum Formula",
      formula: "p = mv",
      description: "Linear momentum is the product of an object's mass and its velocity."
    }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-500" />
            Formula Lab
          </CardTitle>
          <CardDescription>
            Practice and master formulas related to {conceptTitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {formulas.map((formula) => (
              <div key={formula.id} className="p-4 border rounded-lg bg-card">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{formula.name}</h3>
                </div>
                <div className="px-4 py-2 bg-muted rounded-md mb-3">
                  <p className="text-center font-mono text-lg">{formula.formula}</p>
                </div>
                <p className="text-sm text-muted-foreground">{formula.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleOpenFormulaLab}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Open Formula Lab
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            <p>Practice formulas with interactive calculator and step-by-step explanations</p>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Why Use Formula Lab?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <Calculator className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium">Interactive Practice</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Apply formulas with different values to see how they work
              </p>
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-medium">Step-by-Step Solutions</span>
              </div>
              <p className="text-sm text-muted-foreground">
                See the detailed steps to solve any problem
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full"
            variant="outline"
            onClick={handleOpenFormulaLab}
          >
            Start Practicing
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormulaTabContent;
