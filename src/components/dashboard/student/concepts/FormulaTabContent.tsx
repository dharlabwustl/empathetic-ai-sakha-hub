
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, ChevronRight, Sigma } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  // Mock formulas based on concept title - in a real app, these would come from API
  const getFormulas = () => {
    if (conceptTitle.toLowerCase().includes('motion')) {
      return [
        { id: 'f1', name: 'v = u + at', description: 'Velocity equation', complexity: 'basic' },
        { id: 'f2', name: 's = ut + ½at²', description: 'Displacement equation', complexity: 'basic' },
        { id: 'f3', name: 'v² = u² + 2as', description: 'Velocity-displacement equation', complexity: 'intermediate' },
      ];
    }
    
    if (conceptTitle.toLowerCase().includes('force') || conceptTitle.toLowerCase().includes('newton')) {
      return [
        { id: 'f1', name: 'F = ma', description: 'Force equation', complexity: 'basic' },
        { id: 'f2', name: 'p = mv', description: 'Momentum equation', complexity: 'basic' },
        { id: 'f3', name: 'F = G(m₁m₂)/r²', description: 'Gravitational force', complexity: 'advanced' },
      ];
    }
    
    // Default formulas
    return [
      { id: 'f1', name: 'E = mc²', description: 'Energy-mass relationship', complexity: 'intermediate' },
      { id: 'f2', name: 'PV = nRT', description: 'Ideal gas law', complexity: 'intermediate' },
      { id: 'f3', name: 'F = kx', description: 'Hooke\'s law', complexity: 'basic' },
    ];
  };
  
  const formulas = getFormulas();
  
  const handlePracticeFormula = (formulaId: string, formulaName: string) => {
    toast({
      title: "Formula Practice",
      description: `Starting practice for ${formulaName}`,
    });
    // Navigate to formula practice page or open modal
    handleOpenFormulaLab();
  };
  
  return (
    <div className="p-6 space-y-6">
      {/* Header with interactive formula lab button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Key Formulas</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Master the mathematical foundations of this concept
          </p>
        </div>
        
        <Button 
          onClick={handleOpenFormulaLab} 
          size="lg"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md"
        >
          <Calculator className="mr-2 h-5 w-5" />
          Open Formula Lab
        </Button>
      </div>
      
      {/* Formulas list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {formulas.map((formula) => (
          <Card key={formula.id} className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="outline" className={
                  formula.complexity === 'basic' 
                    ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:border-green-800/30' 
                    : formula.complexity === 'intermediate'
                    ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30'
                    : 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:border-red-800/30'
                }>
                  {formula.complexity.charAt(0).toUpperCase() + formula.complexity.slice(1)}
                </Badge>
              </div>
              
              <div className="mb-4 py-2 px-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-100 dark:border-gray-800/30">
                <div className="text-xl font-mono text-center">
                  {formula.name}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{formula.description}</p>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between group hover:text-purple-600 hover:border-purple-300 dark:hover:text-purple-400 dark:hover:border-purple-700"
                onClick={() => handlePracticeFormula(formula.id, formula.name)}
              >
                <span className="flex items-center">
                  <Sigma className="w-4 h-4 mr-2" />
                  Practice Formula
                </span>
                <ChevronRight className="w-4 h-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Interactive elements section */}
      <Card className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800/30 mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-3">Interactive Formula Practice</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Solve problems using these formulas in our interactive Formula Lab. 
            Practice with step-by-step guidance and immediate feedback.
          </p>
          <Button 
            onClick={handleOpenFormulaLab}
            variant="default"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Enter Formula Lab
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaTabContent;
