
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FlaskConical, ArrowRight, Lightbulb, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null);
  
  // Mock formulas - in a real app this would come from an API
  const formulas = [
    {
      id: 'formula1',
      name: "Newton's Second Law",
      formula: "F = ma",
      description: "Force equals mass times acceleration.",
      variables: [
        { symbol: "F", name: "Force", unit: "N (Newtons)" },
        { symbol: "m", name: "Mass", unit: "kg (kilograms)" },
        { symbol: "a", name: "Acceleration", unit: "m/s² (meters per second squared)" }
      ]
    },
    {
      id: 'formula2',
      name: "Momentum",
      formula: "p = mv",
      description: "Momentum equals mass times velocity.",
      variables: [
        { symbol: "p", name: "Momentum", unit: "kg·m/s" },
        { symbol: "m", name: "Mass", unit: "kg (kilograms)" },
        { symbol: "v", name: "Velocity", unit: "m/s (meters per second)" }
      ]
    },
    {
      id: 'formula3',
      name: "Kinetic Energy",
      formula: "KE = ½mv²",
      description: "Kinetic energy equals half of mass times velocity squared.",
      variables: [
        { symbol: "KE", name: "Kinetic Energy", unit: "J (Joules)" },
        { symbol: "m", name: "Mass", unit: "kg (kilograms)" },
        { symbol: "v", name: "Velocity", unit: "m/s (meters per second)" }
      ]
    }
  ];
  
  const handleFormulaClick = (formulaId: string) => {
    setSelectedFormula(formulaId === selectedFormula ? null : formulaId);
  };

  return (
    <div className="p-4">
      <div className="mb-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-lg border border-indigo-100 dark:border-indigo-800/30 p-4">
        <div className="flex items-start gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-800/40 p-2 rounded-lg">
            <FlaskConical className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-indigo-900 dark:text-indigo-300 mb-1">
              Formula Reference for {conceptTitle}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Master these key formulas to fully understand this concept and solve related problems effectively.
            </p>
            <Button 
              onClick={handleOpenFormulaLab}
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
            >
              Open Formula Lab <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Key Formulas</h3>
      
      <div className="space-y-3">
        {formulas.map(formula => (
          <Card 
            key={formula.id}
            className={`border ${selectedFormula === formula.id ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'} overflow-hidden transition-all duration-200`}
          >
            <div 
              className="p-4 cursor-pointer"
              onClick={() => handleFormulaClick(formula.id)}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">{formula.name}</div>
                <div className="text-lg font-mono bg-white dark:bg-gray-800 px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700">
                  {formula.formula}
                </div>
              </div>
            </div>
            
            {selectedFormula === formula.id && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-4 pt-2 border-t border-indigo-200 dark:border-indigo-800/50"
              >
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <Lightbulb className="h-4 w-4 inline-block mr-2 text-amber-500" />
                  {formula.description}
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="font-medium mb-1 text-gray-700 dark:text-gray-300">Variables:</div>
                  {formula.variables.map((variable, idx) => (
                    <div key={idx} className="flex items-center text-gray-600 dark:text-gray-400 ml-1">
                      <div className="w-8 font-mono font-semibold text-indigo-600 dark:text-indigo-400">{variable.symbol}</div>
                      <div className="flex-1">{variable.name}</div>
                      <div className="text-gray-500 dark:text-gray-500 text-xs">{variable.unit}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400"
                  >
                    <BookOpen className="h-4 w-4" /> Learn More
                  </Button>
                </div>
              </motion.div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FormulaTabContent;
