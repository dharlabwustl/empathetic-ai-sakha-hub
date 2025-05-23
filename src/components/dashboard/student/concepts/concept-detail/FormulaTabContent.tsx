
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  FlaskConical, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown, 
  Calculator, 
  Download,
  BookOpen,
  Lightbulb
} from 'lucide-react';

export interface FormulaTabContentProps {
  conceptId: string;
  conceptTitle: string;
  handleOpenFormulaLab?: () => void;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ 
  conceptId, 
  conceptTitle,
  handleOpenFormulaLab 
}) => {
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mock formulas for Newton's Laws
  const formulas = [
    {
      id: 'formula-1',
      title: 'Newton\'s Second Law',
      latex: 'F = m \\cdot a',
      variables: [
        { symbol: 'F', name: 'Force', unit: 'N (Newton)' },
        { symbol: 'm', name: 'Mass', unit: 'kg (Kilogram)' },
        { symbol: 'a', name: 'Acceleration', unit: 'm/s² (Meters per second squared)' },
      ],
      description: 'This formula states that the force acting on an object is equal to the mass of that object multiplied by its acceleration.',
      applications: [
        'Calculating the force needed to accelerate a car',
        'Determining rocket thrust requirements',
        'Analyzing impact forces in collisions',
      ],
      examples: [
        {
          problem: 'A 2kg object experiences an acceleration of 5 m/s². What is the force acting on it?',
          solution: 'F = m × a = 2kg × 5 m/s² = 10N'
        }
      ]
    },
    {
      id: 'formula-2',
      title: 'Weight Formula',
      latex: 'W = m \\cdot g',
      variables: [
        { symbol: 'W', name: 'Weight', unit: 'N (Newton)' },
        { symbol: 'm', name: 'Mass', unit: 'kg (Kilogram)' },
        { symbol: 'g', name: 'Acceleration due to gravity', unit: 'm/s² (approx. 9.8 m/s² on Earth)' },
      ],
      description: 'Weight is the force exerted on an object due to gravity. It\'s calculated as the product of mass and the acceleration due to gravity.',
      applications: [
        'Calculating an object\'s weight on different planets',
        'Determining the load on structural supports',
        'Analyzing buoyancy forces'
      ],
      examples: [
        {
          problem: 'Calculate the weight of a 75kg person on Earth.',
          solution: 'W = m × g = 75kg × 9.8m/s² = 735N'
        }
      ]
    },
    {
      id: 'formula-3',
      title: 'Momentum',
      latex: 'p = m \\cdot v',
      variables: [
        { symbol: 'p', name: 'Momentum', unit: 'kg·m/s' },
        { symbol: 'm', name: 'Mass', unit: 'kg (Kilogram)' },
        { symbol: 'v', name: 'Velocity', unit: 'm/s (Meters per second)' },
      ],
      description: 'Momentum is a vector quantity that represents the product of an object\'s mass and velocity. It describes the quantity of motion an object has.',
      applications: [
        'Analyzing collisions between objects',
        'Understanding rocket propulsion',
        'Studying conservation of momentum in systems'
      ],
      examples: [
        {
          problem: 'A 1000kg car moves at 25 m/s. What is its momentum?',
          solution: 'p = m × v = 1000kg × 25m/s = 25,000 kg·m/s'
        }
      ]
    }
  ];

  const toggleExpandFormula = (formulaId: string) => {
    if (expandedFormula === formulaId) {
      setExpandedFormula(null);
    } else {
      setExpandedFormula(formulaId);
    }
  };

  const goToFormulaLab = () => {
    if (handleOpenFormulaLab) {
      handleOpenFormulaLab();
    } else {
      navigate(`/concepts/${conceptId}/formula-lab`);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <FlaskConical className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
        <h2 className="text-xl font-bold">Key Formulas</h2>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6 border border-blue-100 dark:border-blue-800/50">
        <div className="flex items-start">
          <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium mb-1">Why Formulas Matter</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Understanding the mathematical relationships in Physics helps you solve complex problems and develop a deeper grasp of concepts. Practice using these formulas in different scenarios to build your problem-solving skills.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {formulas.map((formula) => (
          <div 
            key={formula.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
              onClick={() => toggleExpandFormula(formula.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{formula.title}</h3>
                <Button variant="ghost" size="sm">
                  {expandedFormula === formula.id ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </Button>
              </div>
              
              <div className="text-lg font-mono mt-2 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded text-center">
                {formula.latex}
              </div>
            </div>
            
            {expandedFormula === formula.id && (
              <div className="px-4 pb-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-indigo-700 dark:text-indigo-400">Variables:</h4>
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/70 text-left">
                          <th className="px-3 py-2 rounded-tl">Symbol</th>
                          <th className="px-3 py-2">Name</th>
                          <th className="px-3 py-2 rounded-tr">Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formula.variables.map((variable, idx) => (
                          <tr key={idx} className="border-t border-gray-100 dark:border-gray-800">
                            <td className="px-3 py-2 font-mono font-medium">{variable.symbol}</td>
                            <td className="px-3 py-2">{variable.name}</td>
                            <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{variable.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-indigo-700 dark:text-indigo-400">Description:</h4>
                    <p className="text-sm">{formula.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-indigo-700 dark:text-indigo-400">Applications:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {formula.applications.map((app, idx) => (
                        <li key={idx}>{app}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-indigo-700 dark:text-indigo-400">Example:</h4>
                    {formula.examples.map((example, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded text-sm">
                        <p className="font-medium mb-1">{example.problem}</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Solution:</span> {example.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex space-x-3">
        <Button 
          variant="default" 
          size="sm" 
          className="bg-indigo-600 hover:bg-indigo-700"
          onClick={goToFormulaLab}
        >
          <Calculator className="h-4 w-4 mr-2" />
          Interactive Formula Lab
        </Button>
        
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download Formula Sheet
        </Button>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <BookOpen className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
          Further Reading
        </h3>
        
        <ul className="space-y-2">
          <li>
            <a 
              href="#" 
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
            >
              Understanding Newton's Laws of Motion 
              <ExternalLink className="h-3 w-3 ml-1 inline" />
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
            >
              Applications of Physics in Everyday Life
              <ExternalLink className="h-3 w-3 ml-1 inline" />
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
            >
              Advanced Problem Solving in Mechanics
              <ExternalLink className="h-3 w-3 ml-1 inline" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FormulaTabContent;
