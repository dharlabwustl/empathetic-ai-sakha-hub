
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { FlaskConical, Lightbulb, BookOpenCheck, ExternalLink } from 'lucide-react';

export interface FormulaTabContentProps {
  conceptId: string;
  conceptTitle: string;
  handleOpenFormulaLab: () => void;
}

// Sample formulas for the concept (in a real app, these would come from an API)
const demoFormulas = [
  {
    id: "f1",
    formula: "F = ma", 
    description: "Force equals mass times acceleration",
    variables: [
      { symbol: "F", name: "Force", unit: "newtons (N)" },
      { symbol: "m", name: "Mass", unit: "kilograms (kg)" },
      { symbol: "a", name: "Acceleration", unit: "meters per second squared (m/s²)" }
    ],
    examples: [
      "A 2 kg object experiencing 10 N of force will accelerate at 5 m/s².",
      "If a 1,000 kg car accelerates at 2 m/s², it experiences 2,000 N of force."
    ]
  },
  {
    id: "f2", 
    formula: "p = mv", 
    description: "Momentum equals mass times velocity",
    variables: [
      { symbol: "p", name: "Momentum", unit: "kilogram meters per second (kg⋅m/s)" },
      { symbol: "m", name: "Mass", unit: "kilograms (kg)" },
      { symbol: "v", name: "Velocity", unit: "meters per second (m/s)" }
    ],
    examples: [
      "A 0.5 kg ball moving at 20 m/s has a momentum of 10 kg⋅m/s.",
      "A 2,000 kg car traveling at 30 m/s has a momentum of 60,000 kg⋅m/s."
    ]
  }
];

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ 
  conceptId, 
  conceptTitle,
  handleOpenFormulaLab
}) => {
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null);
  
  // Toggle formula expansion
  const toggleFormula = (formulaId: string) => {
    if (expandedFormula === formulaId) {
      setExpandedFormula(null);
    } else {
      setExpandedFormula(formulaId);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Key Formulas: {conceptTitle}</h3>
        <Button 
          onClick={handleOpenFormulaLab} 
          className="bg-violet-600 hover:bg-violet-700 text-white"
        >
          <FlaskConical className="h-4 w-4 mr-2" />
          Open Formula Practice Lab
        </Button>
      </div>
      
      <div className="space-y-4">
        {demoFormulas.map(formula => (
          <motion.div
            key={formula.id}
            className={`border rounded-lg overflow-hidden ${
              expandedFormula === formula.id ? 'shadow-md' : ''
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className={`p-4 flex items-center justify-between cursor-pointer ${
                expandedFormula === formula.id 
                  ? 'bg-blue-50 dark:bg-blue-900/30' 
                  : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => toggleFormula(formula.id)}
            >
              <div className="flex items-center space-x-3">
                <Badge variant={expandedFormula === formula.id ? "default" : "outline"} className="px-2">
                  Formula
                </Badge>
                <span className="font-mono text-lg">{formula.formula}</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                  {expandedFormula === formula.id ? 'Hide details' : 'Show details'}
                </span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`transition-transform ${expandedFormula === formula.id ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            
            {expandedFormula === formula.id && (
              <CardContent className="border-t">
                <div className="py-3">
                  <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                    <Lightbulb size={16} className="text-amber-500" /> Description
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">{formula.description}</p>
                </div>
                
                <div className="py-3 border-t">
                  <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-blue-500"
                    >
                      <path d="M12 22v-5"></path>
                      <path d="M9 7V2.5"></path>
                      <circle cx="12" cy="17" r="1"></circle>
                      <path d="m9 11 3-9 3 9"></path>
                      <path d="M18 22v-5"></path>
                      <path d="M6 22v-5"></path>
                    </svg>
                    Variables
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-medium">Symbol</div>
                    <div className="font-medium">Name</div>
                    <div className="font-medium">Unit</div>
                    {formula.variables.map((variable, index) => (
                      <React.Fragment key={index}>
                        <div className="font-mono">{variable.symbol}</div>
                        <div>{variable.name}</div>
                        <div className="text-gray-600 dark:text-gray-400">{variable.unit}</div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                
                <div className="py-3 border-t">
                  <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                    <BookOpenCheck size={16} className="text-green-500" /> Examples
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    {formula.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-sm"
                    onClick={() => handleOpenFormulaLab()}
                  >
                    Practice this formula <ExternalLink size={14} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg mt-6 border border-violet-100 dark:border-violet-800">
        <div className="flex items-center gap-2 mb-2">
          <FlaskConical size={20} className="text-violet-600 dark:text-violet-400" />
          <h3 className="text-violet-700 dark:text-violet-300 font-medium">Formula Practice Lab</h3>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          Practice applying these formulas with our interactive lab. Try different values, see immediate results, and build your intuition!
        </p>
        <Button onClick={handleOpenFormulaLab} className="w-full bg-violet-600 hover:bg-violet-700 text-white">
          Launch Formula Practice Lab
        </Button>
      </div>
    </div>
  );
};

export default FormulaTabContent;
