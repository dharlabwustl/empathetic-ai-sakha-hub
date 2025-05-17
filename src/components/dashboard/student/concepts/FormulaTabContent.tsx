
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Lightbulb, FileText } from 'lucide-react';

export interface FormulaTabContentProps {
  conceptId: string;
  conceptTitle: string;
  handleOpenFormulaLab: () => void;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ 
  conceptId, 
  conceptTitle,
  handleOpenFormulaLab 
}) => {
  // Log that the component is mounted
  React.useEffect(() => {
    console.log("FormulaTabContent mounted for concept:", conceptId, conceptTitle);
  }, [conceptId, conceptTitle]);

  return (
    <div className="space-y-6 p-6">
      <Card className="border dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Key Formulas for {conceptTitle}</h3>
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={handleOpenFormulaLab}
            >
              <Calculator className="h-4 w-4 mr-1" /> Open Formula Lab
            </Button>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-medium">Force</h4>
                <div className="text-xl font-bold my-2">F = ma</div>
              </div>
              
              <Button variant="secondary" size="sm" onClick={handleOpenFormulaLab}>
                <Lightbulb className="h-4 w-4 mr-1" /> Practice
              </Button>
            </div>
            
            <div className="text-sm mt-3 pt-3 border-t dark:border-gray-700">
              <p className="mb-2"><strong>Where:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-mono">F</span> = Force (Newtons)</li>
                <li><span className="font-mono">m</span> = Mass (kilograms)</li>
                <li><span className="font-mono">a</span> = Acceleration (m/s²)</li>
              </ul>
            </div>
          </div>
          
          {conceptId === '1' && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-medium">Momentum</h4>
                  <div className="text-xl font-bold my-2">p = mv</div>
                </div>
                
                <Button variant="secondary" size="sm" onClick={handleOpenFormulaLab}>
                  <Lightbulb className="h-4 w-4 mr-1" /> Practice
                </Button>
              </div>
              
              <div className="text-sm mt-3 pt-3 border-t dark:border-gray-700">
                <p className="mb-2"><strong>Where:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><span className="font-mono">p</span> = Momentum (kg·m/s)</li>
                  <li><span className="font-mono">m</span> = Mass (kilograms)</li>
                  <li><span className="font-mono">v</span> = Velocity (m/s)</li>
                </ul>
              </div>
            </div>
          )}
          
          <div className="flex items-center text-sm mt-6">
            <FileText className="h-4 w-4 mr-1 text-blue-500" />
            <span>Access more related formulas in the Formula Lab</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaTabContent;
