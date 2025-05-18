
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Zap, ExternalLink, Download } from 'lucide-react';

interface Formula {
  id: string;
  name: string;
  formula: string;
  variables: string;
  description?: string;
}

interface FormulaSectionProps {
  formulas: Formula[];
  conceptTitle: string;
}

const FormulaSection: React.FC<FormulaSectionProps> = ({ formulas, conceptTitle }) => {
  const { toast } = useToast();
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Key Formulas</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownloadFormulas}>
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
          <Button onClick={handleOpenFormulaLab}>
            <Zap className="mr-2 h-4 w-4" />
            Open Formula Lab
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formulas.map(formula => (
          <Card key={formula.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{formula.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md font-mono text-lg text-center">
                {formula.formula}
              </div>
              
              <div className="text-sm text-muted-foreground">
                <strong>Variables:</strong> {formula.variables}
              </div>
              
              {formula.description && expandedFormula === formula.id && (
                <div className="text-sm mt-2">
                  <strong>Description:</strong> {formula.description}
                </div>
              )}
              
              <div className="flex justify-between pt-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => toggleExpandFormula(formula.id)}
                >
                  {expandedFormula === formula.id ? "Less details" : "More details"}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCopyFormula(formula.formula)}
                >
                  <Copy className="mr-2 h-3 w-3" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
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
