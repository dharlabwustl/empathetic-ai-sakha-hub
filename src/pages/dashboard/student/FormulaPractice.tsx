
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  BookOpen, 
  Target, 
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import FormulaPracticeVoiceAssistant from '@/components/voice/FormulaPracticeVoiceAssistant';

const FormulaPractice: React.FC = () => {
  const [selectedFormula, setSelectedFormula] = useState(0);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState('practice');

  // Mock formula data
  const formulas = [
    {
      id: 1,
      name: "Quadratic Formula",
      subject: "Mathematics",
      formula: "x = (-b ± √(b² - 4ac)) / 2a",
      description: "Solves quadratic equations of the form ax² + bx + c = 0",
      variables: [
        { symbol: 'a', name: 'Coefficient of x²', unit: '' },
        { symbol: 'b', name: 'Coefficient of x', unit: '' },
        { symbol: 'c', name: 'Constant term', unit: '' }
      ],
      example: {
        problem: "Solve: 2x² + 5x - 3 = 0",
        values: { a: 2, b: 5, c: -3 },
        solution: "x = (-5 ± √(25 + 24)) / 4 = (-5 ± 7) / 4",
        answers: ["x₁ = 0.5", "x₂ = -3"]
      },
      memoryTip: "Remember: 'ax squared plus bx plus c equals zero, use negative b plus or minus...'",
      difficulty: "Medium"
    },
    {
      id: 2,
      name: "Newton's Second Law",
      subject: "Physics",
      formula: "F = ma",
      description: "Relates force, mass, and acceleration",
      variables: [
        { symbol: 'F', name: 'Force', unit: 'N (Newtons)' },
        { symbol: 'm', name: 'Mass', unit: 'kg (kilograms)' },
        { symbol: 'a', name: 'Acceleration', unit: 'm/s² (meters per second squared)' }
      ],
      example: {
        problem: "Find the force needed to accelerate a 10 kg mass at 5 m/s²",
        values: { m: 10, a: 5 },
        solution: "F = ma = 10 × 5 = 50 N",
        answers: ["F = 50 N"]
      },
      memoryTip: "Force equals Mass times Acceleration - think of pushing a heavy object!",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Ideal Gas Law",
      subject: "Chemistry",
      formula: "PV = nRT",
      description: "Describes the relationship between pressure, volume, amount, and temperature of an ideal gas",
      variables: [
        { symbol: 'P', name: 'Pressure', unit: 'Pa (Pascals)' },
        { symbol: 'V', name: 'Volume', unit: 'm³ (cubic meters)' },
        { symbol: 'n', name: 'Amount of substance', unit: 'mol (moles)' },
        { symbol: 'R', name: 'Gas constant', unit: '8.314 J/(mol·K)' },
        { symbol: 'T', name: 'Temperature', unit: 'K (Kelvin)' }
      ],
      example: {
        problem: "Find pressure when V=0.5m³, n=2mol, T=300K",
        values: { V: 0.5, n: 2, R: 8.314, T: 300 },
        solution: "P = nRT/V = (2 × 8.314 × 300) / 0.5 = 9976.8 Pa",
        answers: ["P = 9976.8 Pa"]
      },
      memoryTip: "Please Visit Nice Restaurants Tonight - P, V, n, R, T",
      difficulty: "Hard"
    }
  ];

  const currentFormula = formulas[selectedFormula];

  const handleInputChange = (variable: string, value: string) => {
    setUserInputs(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const calculateResult = () => {
    // This would contain actual calculation logic based on the formula
    setShowSolution(true);
  };

  const resetPractice = () => {
    setUserInputs({});
    setShowSolution(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SharedPageLayout
      title="Formula Practice"
      subtitle="Master mathematical and scientific formulas with interactive practice"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Formula Practice - PREPZR</title>
      </Helmet>
      
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Voice Assistant */}
        <div className="flex justify-end">
          <FormulaPracticeVoiceAssistant 
            formulaData={currentFormula}
            userName="Student"
            isEnabled={true}
          />
        </div>

        {/* Header */}
        <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Calculator className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Formula Practice</h2>
                <p className="text-orange-100">
                  Practice and master essential formulas across Mathematics, Physics, and Chemistry
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formula Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Select Formula to Practice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {formulas.map((formula, index) => (
                <Card 
                  key={formula.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedFormula === index 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedFormula(index)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{formula.name}</h4>
                        <Badge className={getDifficultyColor(formula.difficulty)}>
                          {formula.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{formula.subject}</p>
                      <div className="text-lg font-mono bg-gray-100 p-2 rounded text-center">
                        {formula.formula}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Formula Details and Practice */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="theory">Theory</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="memory">Memory Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="practice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Practice: {currentFormula.name}
                  </span>
                  <Button variant="outline" size="sm" onClick={resetPractice}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Formula Display */}
                <div className="text-center">
                  <div className="text-3xl font-mono bg-gray-100 p-6 rounded-lg mb-4">
                    {currentFormula.formula}
                  </div>
                  <p className="text-gray-600">{currentFormula.description}</p>
                </div>

                {/* Variable Inputs */}
                <div className="grid gap-4 md:grid-cols-2">
                  {currentFormula.variables.map((variable) => (
                    <div key={variable.symbol} className="space-y-2">
                      <Label htmlFor={variable.symbol} className="font-medium">
                        {variable.symbol} - {variable.name}
                        {variable.unit && (
                          <span className="text-sm text-gray-500 ml-1">({variable.unit})</span>
                        )}
                      </Label>
                      <Input
                        id={variable.symbol}
                        type="number"
                        placeholder={`Enter ${variable.symbol} value`}
                        value={userInputs[variable.symbol] || ''}
                        onChange={(e) => handleInputChange(variable.symbol, e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  ))}
                </div>

                {/* Calculate Button */}
                <div className="flex justify-center">
                  <Button 
                    onClick={calculateResult}
                    className="bg-orange-600 hover:bg-orange-700"
                    disabled={Object.keys(userInputs).length === 0}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Result
                  </Button>
                </div>

                {/* Solution Display */}
                {showSolution && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-800 mb-2">Solution Steps:</h4>
                          <div className="space-y-2">
                            <p className="text-green-700 font-mono">
                              {currentFormula.example.solution}
                            </p>
                            <div className="space-y-1">
                              {currentFormula.example.answers.map((answer, index) => (
                                <p key={index} className="text-green-800 font-semibold">
                                  {answer}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theory">
            <Card>
              <CardHeader>
                <CardTitle>Formula Theory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">{currentFormula.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Variables:</h4>
                    <div className="space-y-2">
                      {currentFormula.variables.map((variable) => (
                        <div key={variable.symbol} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <span className="font-mono font-bold text-lg w-8">{variable.symbol}</span>
                          <span>{variable.name}</span>
                          {variable.unit && (
                            <Badge variant="outline" className="text-xs">
                              {variable.unit}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <Card>
              <CardHeader>
                <CardTitle>Worked Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Problem:</h4>
                    <p className="text-blue-700">{currentFormula.example.problem}</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Solution:</h4>
                    <p className="text-green-700 font-mono mb-2">{currentFormula.example.solution}</p>
                    {currentFormula.example.answers.map((answer, index) => (
                      <p key={index} className="text-green-800 font-semibold">{answer}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="memory">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Memory Techniques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Memory Tip:</h4>
                      <p className="text-yellow-700">{currentFormula.memoryTip}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FormulaPractice;
