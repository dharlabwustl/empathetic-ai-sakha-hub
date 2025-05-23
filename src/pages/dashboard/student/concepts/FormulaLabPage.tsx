
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, FlaskConical, Calculator, RotateCw, 
  BookOpen, Lightbulb, Play, Pause, BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const FormulaLabPage = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [values, setValues] = useState({
    F: '',
    m: '',
    a: ''
  });
  const [result, setResult] = useState<string | null>(null);
  const [solveFor, setSolveFor] = useState('F');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleInputChange = (variable: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [variable]: value
    }));
    setResult(null);
  };

  const handleCalculate = () => {
    try {
      const F = solveFor === 'F' ? null : parseFloat(values.F);
      const m = solveFor === 'm' ? null : parseFloat(values.m);
      const a = solveFor === 'a' ? null : parseFloat(values.a);
      
      let calculatedValue: number | null = null;
      let unit = '';
      
      if (solveFor === 'F') {
        calculatedValue = m !== null && a !== null ? m * a : null;
        unit = 'N (Newtons)';
      } else if (solveFor === 'm') {
        calculatedValue = F !== null && a !== null ? F / a : null;
        unit = 'kg (Kilograms)';
      } else if (solveFor === 'a') {
        calculatedValue = F !== null && m !== null ? F / m : null;
        unit = 'm/s² (Acceleration)';
      }
      
      if (calculatedValue !== null) {
        setResult(`${solveFor} = ${calculatedValue.toFixed(2)} ${unit}`);
      } else {
        setResult('Please enter values for all required fields');
      }
    } catch (error) {
      setResult('Error calculating result. Check your inputs.');
    }
  };

  const handleReset = () => {
    setValues({ F: '', m: '', a: '' });
    setResult(null);
  };

  const handleSimulation = () => {
    setIsSimulating(!isSimulating);
    toast({
      title: isSimulating ? "Simulation Stopped" : "Simulation Started",
      description: isSimulating ? "3D simulation paused" : "Watch the force vectors in action!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/dashboard/student/concepts/${conceptId}`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Concept
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Interactive Formula Lab
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Experiment with Newton's Second Law: F = ma
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calculator Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Formula Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Solve For Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Choose variable to solve for:</Label>
                  <div className="flex gap-2">
                    {['F', 'm', 'a'].map(variable => (
                      <Button
                        key={variable}
                        variant={solveFor === variable ? "default" : "outline"}
                        onClick={() => {
                          setSolveFor(variable);
                          setResult(null);
                        }}
                        className="flex-1"
                      >
                        {variable}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  {solveFor !== 'F' && (
                    <div className="space-y-2">
                      <Label htmlFor="force">Force (F) [Newtons]</Label>
                      <Input
                        id="force"
                        type="number"
                        placeholder="Enter force value"
                        value={values.F}
                        onChange={(e) => handleInputChange('F', e.target.value)}
                      />
                    </div>
                  )}
                  
                  {solveFor !== 'm' && (
                    <div className="space-y-2">
                      <Label htmlFor="mass">Mass (m) [Kilograms]</Label>
                      <Input
                        id="mass"
                        type="number"
                        placeholder="Enter mass value"
                        value={values.m}
                        onChange={(e) => handleInputChange('m', e.target.value)}
                      />
                    </div>
                  )}
                  
                  {solveFor !== 'a' && (
                    <div className="space-y-2">
                      <Label htmlFor="acceleration">Acceleration (a) [m/s²]</Label>
                      <Input
                        id="acceleration"
                        type="number"
                        placeholder="Enter acceleration value"
                        value={values.a}
                        onChange={(e) => handleInputChange('a', e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* Control Buttons */}
                <div className="flex gap-2">
                  <Button onClick={handleCalculate} className="flex-1">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Result Display */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 p-4 rounded-lg"
                  >
                    <h3 className="font-medium mb-2 text-green-800 dark:text-green-400">Result:</h3>
                    <p className="text-xl font-semibold text-green-700 dark:text-green-300">{result}</p>
                  </motion.div>
                )}

                {/* Formula Reference */}
                <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
                  <div className="text-center">
                    <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-400">Formula</h3>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">F = m × a</div>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-2">
                      Force equals Mass times Acceleration
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3D Visualization Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5" />
                  3D Interactive Simulation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Simulation Controls */}
                <div className="flex justify-center mb-4">
                  <Button
                    onClick={handleSimulation}
                    className={`${isSimulating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                  >
                    {isSimulating ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause Simulation
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Simulation
                      </>
                    )}
                  </Button>
                </div>

                {/* 3D Visualization Area */}
                <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-lg aspect-square flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-white">
                    <motion.div
                      animate={isSimulating ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: isSimulating ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                      className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center"
                    >
                      <span className="text-2xl font-bold text-gray-900">m</span>
                    </motion.div>
                    
                    {isSimulating && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-center">
                          <motion.div
                            animate={{ x: [0, 50, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-8 h-1 bg-red-400 rounded"
                          />
                        </div>
                        <p className="text-sm">Force Vector</p>
                      </motion.div>
                    )}
                    
                    <p className="text-lg font-semibold mb-2">Newton's Second Law</p>
                    <p className="text-sm opacity-80">
                      {isSimulating ? 'Observing force and acceleration relationship' : 'Click Start to see the simulation'}
                    </p>
                  </div>

                  {/* Force indicators */}
                  {isSimulating && (
                    <div className="absolute top-4 left-4 space-y-2">
                      <div className="flex items-center gap-2 text-white text-xs">
                        <div className="w-3 h-3 bg-red-400 rounded" />
                        <span>Applied Force</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-xs">
                        <div className="w-3 h-3 bg-yellow-400 rounded" />
                        <span>Object Mass</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-xs">
                        <div className="w-3 h-3 bg-green-400 rounded" />
                        <span>Acceleration</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Analysis Panel */}
                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    Real-time Analysis
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-red-50 dark:bg-red-950/40 p-3 rounded border border-red-200 dark:border-red-900">
                      <div className="text-sm font-medium text-red-700 dark:text-red-400">Force</div>
                      <div className="text-lg font-bold text-red-600">{values.F || '--'} N</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded border border-blue-200 dark:border-blue-900">
                      <div className="text-sm font-medium text-blue-700 dark:text-blue-400">Mass</div>
                      <div className="text-lg font-bold text-blue-600">{values.m || '--'} kg</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/40 p-3 rounded border border-green-200 dark:border-green-900">
                      <div className="text-sm font-medium text-green-700 dark:text-green-400">Acceleration</div>
                      <div className="text-lg font-bold text-green-600">{values.a || '--'} m/s²</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Educational Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-600" />
                Key Insights & Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-amber-800 dark:text-amber-400">Understanding the Relationship</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  As mass increases, more force is needed to achieve the same acceleration. 
                  This explains why it's harder to push a heavy object than a light one.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-amber-800 dark:text-amber-400">Real-World Applications</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Car engine power requirements</li>
                  <li>• Rocket thrust calculations</li>
                  <li>• Sports performance analysis</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-amber-800 dark:text-amber-400">Problem-Solving Tips</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Always identify known variables first</li>
                  <li>• Check units for consistency</li>
                  <li>• Consider the direction of forces</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FormulaLabPage;
