
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FlaskConical, ChevronRight, ChevronDown, Copy, ExternalLink } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface Formula {
  id: string;
  name: string;
  latex: string;
  description: string;
}

interface FormulaReferenceProps {
  formulas: Formula[];
  conceptTitle: string;
  handleOpenFormulaLab?: () => void;
}

const FormulaReference: React.FC<FormulaReferenceProps> = ({ 
  formulas, 
  conceptTitle,
  handleOpenFormulaLab
}) => {
  const { toast } = useToast();
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null);
  
  const handleCopyFormula = (formula: string) => {
    navigator.clipboard.writeText(formula);
    toast({
      title: "Formula copied",
      description: "The formula has been copied to your clipboard"
    });
  };
  
  const toggleExpand = (id: string) => {
    setExpandedFormula(expandedFormula === id ? null : id);
  };
  
  React.useEffect(() => {
    // Attempt to render LaTeX if MathJax is available
    if (typeof window !== 'undefined') {
      try {
        // Check if MathJax is available and has the typeset function
        if (window.MathJax && typeof window.MathJax.typeset === 'function') {
          window.MathJax.typeset();
        }
      } catch (error) {
        console.error('Error rendering LaTeX:', error);
      }
    }
  }, [formulas, expandedFormula]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <FlaskConical className="mr-2 h-5 w-5 text-blue-500" />
          Formulas for {conceptTitle}
        </h3>
        
        <Button 
          onClick={handleOpenFormulaLab} 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          Open Formula Lab
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {formulas.map((formula) => (
          <motion.div
            key={formula.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-blue-100 dark:border-blue-900">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={formula.id} className="border-0">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4">
                    <AccordionTrigger className="hover:no-underline py-0">
                      <div className="flex-1 text-left">
                        <h4 className="text-md font-medium text-blue-800 dark:text-blue-300">{formula.name}</h4>
                      </div>
                    </AccordionTrigger>
                  </div>
                  
                  <AccordionContent>
                    <div className="p-4 space-y-4">
                      {/* LaTeX formula display */}
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <div className="latex-formula overflow-x-auto">
                          {/* Using raw text instead of LaTeX for compatibility (in real app, use LaTeX renderer) */}
                          <code className="text-lg font-mono">{formula.latex}</code>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleCopyFormula(formula.latex)}
                          className="ml-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Description */}
                      <div>
                        <h5 className="text-sm font-medium mb-2">Description:</h5>
                        <p className="text-gray-700 dark:text-gray-300">{formula.description}</p>
                      </div>
                      
                      {/* Practice problems link */}
                      <div className="pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            toast({
                              title: "Practice problems",
                              description: "Loading practice problems for this formula"
                            });
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Practice Problems Using This Formula
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Add a TypeScript interface to Window
declare global {
  interface Window {
    MathJax?: {
      typeset: () => void;
      [key: string]: any;
    }
  }
}

export default FormulaReference;
