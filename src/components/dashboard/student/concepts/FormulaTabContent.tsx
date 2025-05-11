
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

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
  // Formula data could be fetched based on concept ID in a real application
  const formulas = [
    {
      formula: "F = m×a",
      description: "Force equals mass times acceleration (Newton's Second Law)"
    },
    {
      formula: "a = F/m",
      description: "Acceleration equals force divided by mass"
    },
    {
      formula: "F₁ = -F₂",
      description: "For every action, there is an equal and opposite reaction (Newton's Third Law)"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Formula Lab</CardTitle>
        <CardDescription>Practice solving numeric problems with interactive formulas</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Strengthen your understanding of {conceptTitle} by practicing with formula-based problems.
        </p>
        
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 p-6 rounded-lg border border-blue-100 dark:border-blue-900/50 mb-6">
          <h3 className="font-medium text-lg mb-3 text-blue-800 dark:text-blue-300">Key Formulas for {conceptTitle}</h3>
          <div className="space-y-3">
            {formulas.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                  <span className="font-medium text-lg">{item.formula}</span>
                </div>
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={handleOpenFormulaLab} 
          className="w-full flex items-center justify-center gap-2"
        >
          <Calculator className="h-4 w-4" />
          <span>Open Interactive Formula Lab</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FormulaTabContent;
