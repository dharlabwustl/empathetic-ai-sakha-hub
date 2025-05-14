
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Beaker, FileSymlink, ArrowRight } from "lucide-react";

interface FormulaTabContentProps {
  conceptId: string;
  conceptTitle: string;
  handleOpenFormulaLab: () => void;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ 
  conceptId, 
  conceptTitle,
  handleOpenFormulaLab
}) => {
  const formulas = [
    {
      id: '1',
      name: 'Kinetic Energy',
      latex: 'KE = \\frac{1}{2}mv^2',
      description: 'Energy possessed by an object due to its motion',
      variables: [
        { symbol: 'KE', meaning: 'Kinetic Energy', unit: 'J (Joules)' },
        { symbol: 'm', meaning: 'Mass', unit: 'kg (kilograms)' },
        { symbol: 'v', meaning: 'Velocity', unit: 'm/s (meters per second)' }
      ]
    },
    {
      id: '2',
      name: 'Force',
      latex: 'F = ma',
      description: 'Newton\'s second law of motion',
      variables: [
        { symbol: 'F', meaning: 'Force', unit: 'N (Newtons)' },
        { symbol: 'm', meaning: 'Mass', unit: 'kg (kilograms)' },
        { symbol: 'a', meaning: 'Acceleration', unit: 'm/s² (meters per second squared)' }
      ]
    },
    {
      id: '3',
      name: 'Universal Gravitational Force',
      latex: 'F = G\\frac{m_1m_2}{r^2}',
      description: 'Force of attraction between two masses',
      variables: [
        { symbol: 'F', meaning: 'Force', unit: 'N (Newtons)' },
        { symbol: 'G', meaning: 'Gravitational constant', unit: 'N⋅m²/kg²' },
        { symbol: 'm₁', meaning: 'Mass of first object', unit: 'kg (kilograms)' },
        { symbol: 'm₂', meaning: 'Mass of second object', unit: 'kg (kilograms)' },
        { symbol: 'r', meaning: 'Distance between objects', unit: 'm (meters)' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Key Formulas</h3>
          <p className="text-sm text-muted-foreground">
            Important equations and formulas related to {conceptTitle}.
          </p>
        </div>
        <div className="space-x-2 flex">
          <Button variant="outline" size="sm" className="gap-1">
            <FileSymlink className="h-4 w-4" />
            Download
          </Button>
          <Button variant="default" size="sm" className="gap-1" onClick={handleOpenFormulaLab}>
            <Beaker className="h-4 w-4" />
            Formula Lab
          </Button>
        </div>
      </div>
      
      {formulas.map((formula) => (
        <Card key={formula.id} className="border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-2 bg-muted/50">
            <CardTitle className="text-base flex items-center justify-between">
              <span>{formula.name}</span>
              <Button variant="ghost" size="sm" className="h-7">
                <Calculator className="h-4 w-4 mr-1" />
                Calculate
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 pb-3">
            <div className="space-y-4">
              <div className="text-center py-3 px-4 bg-muted/30 rounded-md border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-math">{formula.latex}</div>
              </div>
              
              <div>
                <p className="text-sm">{formula.description}</p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Where:</h4>
                <div className="space-y-1">
                  {formula.variables.map((variable, i) => (
                    <div key={i} className="flex text-sm">
                      <div className="w-12 font-semibold font-math">{variable.symbol} =</div>
                      <div className="flex-1">{variable.meaning}</div>
                      <div className="text-muted-foreground">[{variable.unit}]</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400 flex items-center">
                  View examples
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FormulaTabContent;
