
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Calculator, Book, Lock } from 'lucide-react';
import FormulaCalculator from '../formula/FormulaCalculator';

interface FormulaTabContentProps {
  conceptId: string;
  conceptTitle: string;
  onOpenFormulaLab?: () => void;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({
  conceptId,
  conceptTitle,
  onOpenFormulaLab
}) => {
  const navigate = useNavigate();
  
  const handleOpenFormulaLab = () => {
    if (onOpenFormulaLab) {
      onOpenFormulaLab();
    } else {
      navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
    }
  };
  
  // Sample formulas for different concept IDs
  const getFormulas = () => {
    switch (conceptId) {
      case "1": // Newton's Laws
        return [
          {
            id: "f1",
            name: "Newton's Second Law",
            formula: "F = m * a",
            variables: [
              { name: "force", symbol: "F", unit: "Newtons" },
              { name: "mass", symbol: "m", unit: "kg" },
              { name: "acceleration", symbol: "a", unit: "m/s²" }
            ],
            description: "Force equals mass times acceleration",
            hint: "Make sure to keep units consistent. If you're using kg for mass, use m/s² for acceleration."
          },
          {
            id: "f2",
            name: "Gravitational Force",
            formula: "F = G * (m1 * m2) / r²",
            variables: [
              { name: "force", symbol: "F", unit: "Newtons" },
              { name: "gravitationalConstant", symbol: "G", unit: "Nm²/kg²" },
              { name: "mass1", symbol: "m₁", unit: "kg" },
              { name: "mass2", symbol: "m₂", unit: "kg" },
              { name: "distance", symbol: "r", unit: "m" }
            ],
            description: "Newton's law of universal gravitation",
            hint: "The gravitational constant G is approximately 6.674 × 10⁻¹¹ N⋅m²/kg²"
          }
        ];
      case "2": // Chemistry concept
        return [
          {
            id: "f1",
            name: "pH Calculation",
            formula: "pH = -log([H⁺])",
            variables: [
              { name: "hydrogenIonConcentration", symbol: "[H⁺]", unit: "mol/L" }
            ],
            description: "Calculate pH from hydrogen ion concentration",
            hint: "pH ranges from 0 to 14, with 7 being neutral. Lower values are acidic, higher values are basic."
          }
        ];
      default:
        // Default formula for all other concepts
        return [
          {
            id: "f1",
            name: "Example Formula",
            formula: "y = m * x + b",
            variables: [
              { name: "y", symbol: "y", unit: "" },
              { name: "slope", symbol: "m", unit: "" },
              { name: "x", symbol: "x", unit: "" },
              { name: "yIntercept", symbol: "b", unit: "" }
            ],
            description: "Linear equation in slope-intercept form",
            hint: "The slope m represents the rate of change, while b is the y-value when x = 0."
          }
        ];
    }
  };
  
  const formulas = getFormulas();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 p-6 rounded-lg border border-blue-100 dark:border-blue-900/50">
        <h3 className="font-medium text-lg mb-3 text-blue-800 dark:text-blue-300">
          Key Formulas for {conceptTitle}
        </h3>
        
        <div className="space-y-4">
          {formulas.map((formula) => (
            <div key={formula.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h4 className="font-medium">{formula.name}</h4>
                <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                  Formula
                </Badge>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-center font-medium mb-4">
                {formula.formula}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{formula.description}</p>
              
              <FormulaCalculator 
                formula={formula.formula.replace(/\*/g, '*').replace(/²/g, '**2')}
                variables={formula.variables}
                description={formula.description}
                hint={formula.hint}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleOpenFormulaLab} 
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
          >
            <Calculator className="h-4 w-4" />
            <span>Open Interactive Formula Lab</span>
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={() => window.open('/dashboard/student/formula-practice', '_blank')}
          >
            <Book className="h-4 w-4" />
            <span>Browse All Formulas</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 p-4 rounded-lg">
        <h4 className="flex items-center gap-2 font-medium text-yellow-800 dark:text-yellow-500 mb-2">
          <Lock className="h-4 w-4" />
          Premium Feature
        </h4>
        <p className="text-sm text-muted-foreground">
          Upgrade to unlock advanced formula features including step-by-step solutions, formula derivations, and personalized practice problems.
        </p>
      </div>
    </div>
  );
};

export default FormulaTabContent;
