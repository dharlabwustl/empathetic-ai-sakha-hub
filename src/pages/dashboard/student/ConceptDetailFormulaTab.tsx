
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Beaker } from 'lucide-react';
import FormulaSection from '@/components/dashboard/student/concepts/concept-detail/FormulaSection';
import { useToast } from '@/hooks/use-toast';

interface ConceptDetailFormulaTabProps {
  concept: {
    id: string;
    title: string;
    formulas: {
      id: string;
      name: string;
      latex: string;
      description: string;
    }[];
  };
}

const ConceptDetailFormulaTab: React.FC<ConceptDetailFormulaTabProps> = ({ concept }) => {
  const { toast } = useToast();
  
  const handleOpenFormulaLab = () => {
    toast({
      title: "Formula Lab",
      description: "Opening formula lab for interactive practice"
    });
    // In a real app, this would navigate to or open the formula lab
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="h-6 w-6 text-blue-600" />
            Formulas for {concept.title}
          </h2>
          <p className="text-muted-foreground mt-1">
            Master the key formulas and practice with interactive problems
          </p>
        </div>
        
        <Button onClick={handleOpenFormulaLab} className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Beaker className="h-5 w-5" />
          Open Formula Lab
        </Button>
      </div>
      
      <FormulaSection 
        formulas={concept.formulas}
        conceptTitle={concept.title}
      />
    </div>
  );
};

export default ConceptDetailFormulaTab;
