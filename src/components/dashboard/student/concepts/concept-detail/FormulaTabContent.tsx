
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Beaker, Brain, Calculator, ArrowLeft, ArrowRight } from 'lucide-react';
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
  const [activeFormulaIndex, setActiveFormulaIndex] = useState(0);
  
  // Simulated formulas (in a real app, these would come from an API)
  const formulas = [
    {
      id: 'formula-1',
      name: 'Force',
      formula: 'F = m * a',
      description: 'Force equals mass times acceleration',
      units: 'Newtons (N)',
      variables: [
        { symbol: 'F', description: 'Force', unit: 'N' },
        { symbol: 'm', description: 'Mass', unit: 'kg' },
        { symbol: 'a', description: 'Acceleration', unit: 'm/s²' }
      ]
    },
    {
      id: 'formula-2',
      name: 'Kinetic Energy',
      formula: 'KE = (1/2) * m * v²',
      description: 'Kinetic energy equals half of mass times velocity squared',
      units: 'Joules (J)',
      variables: [
        { symbol: 'KE', description: 'Kinetic Energy', unit: 'J' },
        { symbol: 'm', description: 'Mass', unit: 'kg' },
        { symbol: 'v', description: 'Velocity', unit: 'm/s' }
      ]
    },
    {
      id: 'formula-3',
      name: 'Gravitational Potential Energy',
      formula: 'PE = m * g * h',
      description: 'Potential energy equals mass times gravity times height',
      units: 'Joules (J)',
      variables: [
        { symbol: 'PE', description: 'Potential Energy', unit: 'J' },
        { symbol: 'm', description: 'Mass', unit: 'kg' },
        { symbol: 'g', description: 'Gravitational acceleration', unit: 'm/s²' },
        { symbol: 'h', description: 'Height', unit: 'm' }
      ]
    }
  ];

  // Auto rotate formulas
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFormulaIndex(prevIndex => (prevIndex + 1) % formulas.length);
    }, 5000); // Change formula every 5 seconds
    
    return () => clearInterval(interval);
  }, [formulas.length]);
  
  const nextFormula = () => {
    setActiveFormulaIndex(prevIndex => (prevIndex + 1) % formulas.length);
  };

  const prevFormula = () => {
    setActiveFormulaIndex(prevIndex => (prevIndex - 1 + formulas.length) % formulas.length);
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="h-6 w-6 text-blue-600" />
            Formulas for {conceptTitle}
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
      
      {/* Formula carousel */}
      <div className="relative pt-10 pb-14">
        <div className="absolute top-0 left-0 w-full flex justify-center gap-2 mb-4">
          {formulas.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === activeFormulaIndex
                  ? 'bg-blue-600'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
        
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 z-10"
            onClick={prevFormula}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="overflow-hidden w-full">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeFormulaIndex * 100}%)` }}
            >
              {formulas.map((formula, index) => (
                <motion.div 
                  key={formula.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: index === activeFormulaIndex ? 1 : 0,
                    scale: index === activeFormulaIndex ? 1 : 0.95
                  }}
                  transition={{ duration: 0.4 }}
                  className="min-w-full px-4"
                >
                  <Card className="overflow-hidden border-t-4 border-t-blue-500">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-blue-700">{formula.name}</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {formula.units}
                        </Badge>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-4 flex items-center justify-center">
                        <div className="text-2xl font-mono text-center">
                          {formula.formula}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{formula.description}</p>
                      
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Variables:</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {formula.variables.map((variable, idx) => (
                          <div key={idx} className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">
                            <span className="font-mono font-semibold">{variable.symbol}</span>: {variable.description} ({variable.unit})
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm" className="flex items-center gap-2 mr-2">
                          <Brain className="h-4 w-4" />
                          Practice
                        </Button>
                        <Button size="sm" className="flex items-center gap-2">
                          <Calculator className="h-4 w-4" />
                          Solve
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 z-10"
            onClick={nextFormula}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Auto-rotation indicator */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700">
            <motion.div 
              className="h-full bg-blue-600"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Additional formulas grid (abbreviated view) */}
      <div className="mt-10">
        <h3 className="font-medium text-lg mb-4">All Related Formulas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formulas.map(formula => (
            <Card 
              key={formula.id}
              className="hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-colors"
              onClick={() => setActiveFormulaIndex(formulas.findIndex(f => f.id === formula.id))}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{formula.name}</h4>
                  <Badge variant="outline">{formula.units}</Badge>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-center font-mono">
                  {formula.formula}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormulaTabContent;
