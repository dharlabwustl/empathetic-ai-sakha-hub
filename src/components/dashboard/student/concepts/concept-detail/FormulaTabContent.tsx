
import React from 'react';
import { Button } from "@/components/ui/button";
import { BeakerIcon, Calculator, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";

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
  console.log("FormulaTabContent - Rendering with conceptId:", conceptId);
  
  // Sample formulas for this concept (in a real app, these would come from API)
  const formulas = [
    { id: "f1", formula: "F = ma", description: "Force equals mass times acceleration", variables: [
      { symbol: "F", name: "Force", unit: "N (newtons)" },
      { symbol: "m", name: "Mass", unit: "kg (kilograms)" },
      { symbol: "a", name: "Acceleration", unit: "m/s² (meters per second squared)" },
    ]},
    { id: "f2", formula: "a = F/m", description: "Acceleration equals force divided by mass", variables: [
      { symbol: "a", name: "Acceleration", unit: "m/s² (meters per second squared)" },
      { symbol: "F", name: "Force", unit: "N (newtons)" },
      { symbol: "m", name: "Mass", unit: "kg (kilograms)" },
    ]}
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Key Formulas for {conceptTitle}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Practice using these formulas to master the concept
          </p>
        </div>
        <Button 
          onClick={handleOpenFormulaLab} 
          className="flex items-center gap-2"
          variant="outline"
        >
          <FlaskConical className="h-4 w-4" />
          Open Formula Lab
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {formulas.map((formula, index) => (
          <motion.div
            key={formula.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm"
          >
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{formula.description}</h3>
                <Calculator className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-center py-4 px-6 mb-4 bg-gray-50 dark:bg-gray-900/30 rounded text-xl font-mono text-center">
                {formula.formula}
              </div>
              
              <div className="space-y-2 mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Variables:</h4>
                <ul className="space-y-1">
                  {formula.variables.map(variable => (
                    <li key={variable.symbol} className="text-sm flex items-start">
                      <span className="font-semibold w-8">{variable.symbol}:</span> 
                      <span className="text-gray-600 dark:text-gray-400">
                        {variable.name} ({variable.unit})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
              <Button variant="outline" size="sm" className="text-xs">
                <Calculator className="h-3 w-3 mr-1" /> Practice with this formula
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <div className="flex items-start">
          <FlaskConical className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium text-blue-700 dark:text-blue-300">Interactive Formula Lab</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              Try out these formulas with different values in our interactive Formula Lab. 
              See how changing variables affects the outcome and build intuition.
            </p>
            <Button 
              onClick={handleOpenFormulaLab}
              className="mt-3 bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              Open Formula Lab
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaTabContent;
