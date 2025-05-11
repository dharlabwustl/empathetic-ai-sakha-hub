
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CopyCheck, Calculator } from 'lucide-react';

interface Formula {
  id: string;
  name: string;
  formula: string;
  description?: string;
}

interface ConceptFormulaTabProps {
  formulas: Formula[];
}

const ConceptFormulaTab: React.FC<ConceptFormulaTabProps> = ({ formulas }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  return (
    <div className="space-y-4">
      {formulas.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No formulas available for this concept.</p>
        </div>
      ) : (
        formulas.map((formula) => (
          <div key={formula.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-start">
              <h3 className="font-medium mb-2">{formula.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => copyToClipboard(formula.formula)}
                title="Copy formula"
              >
                <CopyCheck className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-3 bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700 font-mono text-center">
              {formula.formula}
            </div>
            
            {formula.description && (
              <p className="text-sm text-muted-foreground mb-3">{formula.description}</p>
            )}
            
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Calculator className="h-3.5 w-3.5" />
                <span className="text-xs">Practice</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ConceptFormulaTab;
