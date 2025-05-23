
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FlaskConical, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown, 
  Calculator, 
  Download,
  BookOpen,
  Lightbulb,
  BookMarked,
  BrainCircuit,
  FileText,
  BarChart3,
  Target,
  CheckCircle,
  Beaker,
  AlertTriangle
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
      ],
      expertAnalysis: "Newton's Second Law is fundamental to classical mechanics. It provides the direct relationship between force and motion, and explains why heavier objects require more force to accelerate at the same rate as lighter objects. This principle forms the foundation for analyzing dynamic systems in physics.",
      commonMisconceptions: [
        "Confusing force with mass or acceleration",
        "Forgetting that F=ma is a vector equation where force and acceleration have direction",
        "Not accounting for multiple forces acting on an object"
      ],
      performanceStats: {
        correctApplicationRate: 68,
        commonErrorArea: "Vector direction analysis",
        examFrequency: "Very High"
      }
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
      ],
      expertAnalysis: "The weight formula is a specific application of Newton's Second Law, where the force is gravitational. The distinction between mass and weight is crucial - mass is an intrinsic property of matter, while weight is a force that depends on the gravitational field an object is in.",
      commonMisconceptions: [
        "Confusing weight (a force) with mass (an intrinsic property)",
        "Assuming weight is constant regardless of location",
        "Using incorrect units (using kg for weight instead of Newtons)"
      ],
      performanceStats: {
        correctApplicationRate: 72,
        commonErrorArea: "Unit conversion issues",
        examFrequency: "High"
      }
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
      ],
      expertAnalysis: "Momentum is conserved in closed systems, making it one of the most powerful concepts in physics. While force causes instantaneous change, momentum provides insights into the overall motion of systems and is particularly useful for analyzing collisions and explosions.",
      commonMisconceptions: [
        "Confusing momentum with force or energy",
        "Forgetting momentum is a vector quantity with direction",
        "Overlooking conservation of momentum in collisions"
      ],
      performanceStats: {
        correctApplicationRate: 64,
        commonErrorArea: "Vector analysis in 2D momentum problems",
        examFrequency: "Medium-High"
      }
    }
  ];

  const toggleExpandFormula = (formulaId: string) => {
    if (expandedFormula === formulaId) {
      setExpandedFormula(null);
    } else {
      setExpandedFormula(formulaId);
    }
  };
  
  const handleFormulaLabClick = () => {
    if (handleOpenFormulaLab) {
      handleOpenFormulaLab();
    } else {
      navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">
            <Beaker className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Formula Explorer</h2>
            <p className="text-gray-600 dark:text-gray-400">Master the mathematical foundations of {conceptTitle}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
              <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Application Success</h3>
              <p className="text-2xl font-bold">73%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Correct formula usage rate</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <BookMarked className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Exam Relevance</h3>
              <p className="text-2xl font-bold">High</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Frequently appears in exams</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
              <BrainCircuit className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Mastery Level</h3>
              <p className="text-2xl font-bold">Intermediate</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Based on your performance</p>
            </div>
          </div>
        </div>
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
          <Card 
            key={formula.id}
            className={`overflow-hidden transition-all duration-200 ${
              expandedFormula === formula.id 
                ? 'ring-2 ring-indigo-300 dark:ring-indigo-700 shadow-lg' 
                : 'shadow-sm hover:shadow'
            }`}
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
              
              <div className="text-lg font-mono mt-2 px-3 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded text-center border border-indigo-100 dark:border-indigo-800/30">
                {formula.latex}
              </div>
              
              {/* Quick stats - visible even when collapsed */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3 text-blue-500" />
                  <span>Exam freq: {formula.performanceStats.examFrequency}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="h-3 w-3 text-green-500" />
                  <span>Success: {formula.performanceStats.correctApplicationRate}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3 text-red-500" />
                  <span>Challenge: {formula.performanceStats.commonErrorArea}</span>
                </div>
              </div>
            </div>
            
            {expandedFormula === formula.id && (
              <div className="px-4 pb-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 p-1 rounded text-indigo-600 dark:text-indigo-400 mr-2">
                        <FileText className="h-4 w-4" />
                      </span>
                      Variables
                    </h4>
                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                      <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800/70">
                            <th className="px-4 py-2 font-medium text-left">Symbol</th>
                            <th className="px-4 py-2 font-medium text-left">Name</th>
                            <th className="px-4 py-2 font-medium text-left">Unit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-800">
                          {formula.variables.map((variable, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                              <td className="px-4 py-3 font-mono font-medium">{variable.symbol}</td>
                              <td className="px-4 py-3">{variable.name}</td>
                              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{variable.unit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
                        <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded text-green-600 dark:text-green-400 mr-2">
                          <BookOpen className="h-4 w-4" />
                        </span>
                        Description
                      </h4>
                      <p className="text-sm bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">{formula.description}</p>
                      
                      <h4 className="text-sm font-medium mt-4 mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
                        <span className="bg-purple-100 dark:bg-purple-900/30 p-1 rounded text-purple-600 dark:text-purple-400 mr-2">
                          <BrainCircuit className="h-4 w-4" />
                        </span>
                        Expert Analysis
                      </h4>
                      <p className="text-sm bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                        {formula.expertAnalysis}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
                        <span className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-blue-600 dark:text-blue-400 mr-2">
                          <Target className="h-4 w-4" />
                        </span>
                        Applications
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                        {formula.applications.map((app, idx) => (
                          <li key={idx} className="ml-2">{app}</li>
                        ))}
                      </ul>
                      
                      <h4 className="text-sm font-medium mt-4 mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
                        <span className="bg-red-100 dark:bg-red-900/30 p-1 rounded text-red-600 dark:text-red-400 mr-2">
                          <AlertTriangle className="h-4 w-4" />
                        </span>
                        Common Misconceptions
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                        {formula.commonMisconceptions.map((item, idx) => (
                          <li key={idx} className="ml-2">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
                      <span className="bg-amber-100 dark:bg-amber-900/30 p-1 rounded text-amber-600 dark:text-amber-400 mr-2">
                        <Calculator className="h-4 w-4" />
                      </span>
                      Example
                    </h4>
                    {formula.examples.map((example, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/80 dark:to-gray-750 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
                        <p className="font-medium mb-3">{example.problem}</p>
                        <div className="flex items-start gap-2">
                          <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mt-0.5">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Solution:</span> {example.solution}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800/50">
                    <h4 className="text-sm font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Performance Analysis
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Success Rate</div>
                        <div className="text-lg font-bold mt-1">{formula.performanceStats.correctApplicationRate}%</div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full" 
                            style={{ width: `${formula.performanceStats.correctApplicationRate}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Exam Frequency</div>
                        <div className="text-lg font-bold mt-1">{formula.performanceStats.examFrequency}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Practice priority: High</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Improvement Area</div>
                        <div className="text-sm font-medium mt-1 line-clamp-2">{formula.performanceStats.commonErrorArea}</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">Focus on this area</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
      
      {/* Horizontal action buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <Button 
          variant="default" 
          size="lg" 
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md"
          onClick={handleFormulaLabClick}
        >
          <Calculator className="h-5 w-5 mr-2" />
          Interactive Formula Lab
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Formula Sheet
        </Button>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <BookOpen className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
          Further Reading
        </h3>
        
        <ul className="space-y-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          <li>
            <a 
              href="#" 
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-750 rounded"
            >
              Understanding Newton's Laws of Motion 
              <ExternalLink className="h-3 w-3 ml-1 inline" />
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-750 rounded"
            >
              Applications of Physics in Everyday Life
              <ExternalLink className="h-3 w-3 ml-1 inline" />
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-750 rounded"
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
