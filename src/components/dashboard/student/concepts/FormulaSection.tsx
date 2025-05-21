
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Zap, ExternalLink, Download, Play, CheckCircle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface Formula {
  id: string;
  name: string;
  formula: string;
  variables: string;
  description?: string;
  example?: string;
}

interface FormulaSectionProps {
  formulas: Formula[];
  conceptTitle: string;
}

const FormulaSection: React.FC<FormulaSectionProps> = ({ formulas, conceptTitle }) => {
  const { toast } = useToast();
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null);
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null);

  const handleCopyFormula = (formula: string) => {
    navigator.clipboard.writeText(formula);
    toast({
      title: "Formula Copied",
      description: "Formula copied to clipboard"
    });
  };

  const toggleExpandFormula = (formulaId: string) => {
    if (expandedFormula === formulaId) {
      setExpandedFormula(null);
    } else {
      setExpandedFormula(formulaId);
    }
  };

  const handleOpenFormulaLab = () => {
    toast({
      title: "Formula Lab",
      description: "Opening formula lab for interactive practice"
    });
    // Implement navigation to formula lab
  };

  const handleDownloadFormulas = () => {
    // Create a text representation of the formulas
    let content = `${conceptTitle} - Key Formulas\n\n`;
    
    formulas.forEach(formula => {
      content += `${formula.name}\n`;
      content += `${formula.formula}\n`;
      content += `Variables: ${formula.variables}\n`;
      if (formula.description) {
        content += `Description: ${formula.description}\n`;
      }
      content += `\n`;
    });
    
    // Create and download the file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${conceptTitle.replace(/\s+/g, '-').toLowerCase()}-formulas.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Complete",
      description: "Formulas have been downloaded as a text file"
    });
  };

  // If no formulas are provided, use a default set
  const formulasToShow = formulas.length > 0 ? formulas : [
    {
      id: "f1",
      name: "Newton's Second Law",
      formula: "F = m × a",
      variables: "F = force (N), m = mass (kg), a = acceleration (m/s²)",
      description: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
      example: "A 2kg object accelerates at 4m/s² when a force of 8N is applied (8N = 2kg × 4m/s²)."
    },
    {
      id: "f2",
      name: "Potential Energy",
      formula: "PE = m × g × h",
      variables: "PE = potential energy (J), m = mass (kg), g = gravitational acceleration (9.8m/s²), h = height (m)",
      description: "The energy stored in an object due to its position in a gravitational field.",
      example: "A 5kg object 10m above the ground has PE = 5kg × 9.8m/s² × 10m = 490J."
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center">
          <Zap className="mr-2 h-5 w-5 text-amber-500 dark:text-amber-400" />
          Key Formulas
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownloadFormulas}>
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
          <Button onClick={handleOpenFormulaLab} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Play className="mr-2 h-4 w-4" />
            Practice Lab
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formulasToShow.map((formula, index) => (
          <motion.div
            key={formula.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card 
              className={`overflow-hidden transition-all duration-300 ${
                expandedFormula === formula.id ? 'shadow-md ring-1 ring-blue-200 dark:ring-blue-800' : ''
              } hover:shadow-md`}
            >
              <CardHeader className={`pb-3 ${
                expandedFormula === formula.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}>
                <CardTitle className="text-lg flex items-center">
                  {formula.name}
                  {selectedFormula === formula.id && (
                    <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 p-4 rounded-md font-mono text-lg text-center border border-blue-100 dark:border-blue-900/40"
                  onClick={() => handleCopyFormula(formula.formula)}
                >
                  {formula.formula}
                </div>
                
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <strong className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Variables:</strong> 
                  <p className="mt-1">{formula.variables}</p>
                </div>
                
                {expandedFormula === formula.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    {formula.description && (
                      <div className="text-sm mt-2">
                        <strong className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Description:</strong>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">{formula.description}</p>
                      </div>
                    )}
                    
                    {formula.example && (
                      <div className="text-sm p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-100 dark:border-amber-800/40">
                        <div className="flex items-start">
                          <Lightbulb className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                          <div>
                            <strong className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400">Example:</strong>
                            <p className="mt-1 text-gray-700 dark:text-gray-300">{formula.example}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-blue-600 dark:text-blue-400"
                  onClick={() => toggleExpandFormula(formula.id)}
                >
                  {expandedFormula === formula.id ? "Less details" : "More details"}
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-gray-600 dark:text-gray-400"
                    onClick={() => handleCopyFormula(formula.formula)}
                  >
                    <Copy className="mr-2 h-3 w-3" />
                    Copy
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${
                      selectedFormula === formula.id 
                        ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/40' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                    onClick={() => setSelectedFormula(formula.id === selectedFormula ? null : formula.id)}
                  >
                    {selectedFormula === formula.id ? (
                      <>
                        <CheckCircle className="mr-2 h-3 w-3" />
                        Selected
                      </>
                    ) : (
                      "Select"
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/50">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
              <Zap className="h-6 w-6 text-blue-700 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-300">Formula Lab</h3>
              <p className="text-sm text-blue-800/80 dark:text-blue-400 mt-1">
                Practice applying these formulas with interactive examples and solve related problems
                to strengthen your understanding.
              </p>
              <Button
                size="sm"
                className="mt-3 bg-blue-700 hover:bg-blue-800"
                onClick={handleOpenFormulaLab}
              >
                <ExternalLink className="mr-2 h-3 w-3" />
                Go to Formula Lab
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaSection;
