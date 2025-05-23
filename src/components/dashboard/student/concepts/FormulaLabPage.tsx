
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Calculator, Download, RotateCw, Book, ChevronRight, Star, BarChart3, LineChart } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Line, LineChart as RechartLineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const FormulaLabPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState("calculator");

  // Sample data for charts
  const simulationData = [
    { time: 0, force: 0, acceleration: 0, distance: 0 },
    { time: 1, force: 10, acceleration: 5, distance: 2.5 },
    { time: 2, force: 20, acceleration: 10, distance: 10 },
    { time: 3, force: 30, acceleration: 15, distance: 22.5 },
    { time: 4, force: 40, acceleration: 20, distance: 40 },
    { time: 5, force: 50, acceleration: 25, distance: 62.5 },
    { time: 6, force: 60, acceleration: 30, distance: 90 },
    { time: 7, force: 70, acceleration: 35, distance: 122.5 },
    { time: 8, force: 80, acceleration: 40, distance: 160 }
  ];

  const performanceData = [
    { day: 'Mon', problems: 5, accuracy: 70, time: 25 },
    { day: 'Tue', problems: 8, accuracy: 75, time: 22 },
    { day: 'Wed', problems: 12, accuracy: 83, time: 20 },
    { day: 'Thu', problems: 10, accuracy: 90, time: 18 },
    { day: 'Fri', problems: 15, accuracy: 95, time: 15 },
    { day: 'Sat', problems: 20, accuracy: 92, time: 12 },
    { day: 'Sun', problems: 18, accuracy: 94, time: 13 },
  ];

  // State for the calculator
  const [values, setValues] = useState({
    mass: '',
    acceleration: '',
    force: '',
  });
  const [result, setResult] = useState<string | null>(null);
  const [solveFor, setSolveFor] = useState<'mass' | 'acceleration' | 'force'>('force');

  const handleInputChange = (field: keyof typeof values, value: string) => {
    setValues({
      ...values,
      [field]: value
    });
    setResult(null);
  };

  const handleSolve = () => {
    try {
      const m = solveFor === 'mass' ? null : parseFloat(values.mass);
      const a = solveFor === 'acceleration' ? null : parseFloat(values.acceleration);
      const f = solveFor === 'force' ? null : parseFloat(values.force);
      
      let calculatedValue: number | null = null;
      let unit = '';
      
      if (solveFor === 'force') {
        calculatedValue = m !== null && a !== null ? m * a : null;
        unit = 'N (Newtons)';
      } else if (solveFor === 'mass') {
        calculatedValue = f !== null && a !== null && a !== 0 ? f / a : null;
        unit = 'kg (Kilograms)';
      } else if (solveFor === 'acceleration') {
        calculatedValue = f !== null && m !== null && m !== 0 ? f / m : null;
        unit = 'm/s² (Meters per second squared)';
      }
      
      if (calculatedValue !== null) {
        setResult(`${solveFor.charAt(0).toUpperCase() + solveFor.slice(1)} = ${calculatedValue.toFixed(2)} ${unit}`);
      } else {
        setResult('Please enter values for all required fields');
      }
    } catch (error) {
      setResult('Error calculating result. Check your inputs.');
    }
  };

  const handleReset = () => {
    setValues({
      mass: '',
      acceleration: '',
      force: ''
    });
    setResult(null);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Newton's Second Law Formula Lab</h1>
          <p className="text-muted-foreground">
            Interactive tools to understand and apply F = m×a in different scenarios
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Book className="h-4 w-4 mr-2" />
            Concept Guide
          </Button>
          <Button variant="default">
            <Download className="h-4 w-4 mr-2" />
            Download Results
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="calculator" className="flex gap-2 items-center">
            <Calculator className="h-4 w-4" />
            Formula Calculator
          </TabsTrigger>
          <TabsTrigger value="simulation" className="flex gap-2 items-center">
            <LineChart className="h-4 w-4" />
            Data Simulation
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex gap-2 items-center">
            <BarChart3 className="h-4 w-4" />
            Learning Analytics
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex gap-2 items-center">
            <Star className="h-4 w-4" />
            Advanced Applications
          </TabsTrigger>
        </TabsList>

        {/* Formula Calculator Tab */}
        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-indigo-600" />
                Interactive Formula Lab: Newton's Second Law
              </CardTitle>
              <CardDescription>
                Experiment with F = m×a to understand how variables affect each other
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Choose variable to solve for:</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        key="force"
                        variant={solveFor === 'force' ? "default" : "outline"}
                        onClick={() => setSolveFor('force')}
                      >
                        Force (F)
                      </Button>
                      <Button
                        key="mass"
                        variant={solveFor === 'mass' ? "default" : "outline"}
                        onClick={() => setSolveFor('mass')}
                      >
                        Mass (m)
                      </Button>
                      <Button
                        key="acceleration"
                        variant={solveFor === 'acceleration' ? "default" : "outline"}
                        onClick={() => setSolveFor('acceleration')}
                      >
                        Acceleration (a)
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {solveFor !== 'mass' && (
                      <div className="space-y-2">
                        <Label htmlFor="input-mass">
                          Mass (m) [kg]
                        </Label>
                        <Input 
                          id="input-mass"
                          type="number"
                          placeholder="Enter mass"
                          value={values.mass}
                          onChange={(e) => handleInputChange('mass', e.target.value)}
                        />
                      </div>
                    )}
                    
                    {solveFor !== 'acceleration' && (
                      <div className="space-y-2">
                        <Label htmlFor="input-acceleration">
                          Acceleration (a) [m/s²]
                        </Label>
                        <Input 
                          id="input-acceleration"
                          type="number"
                          placeholder="Enter acceleration"
                          value={values.acceleration}
                          onChange={(e) => handleInputChange('acceleration', e.target.value)}
                        />
                      </div>
                    )}
                    
                    {solveFor !== 'force' && (
                      <div className="space-y-2">
                        <Label htmlFor="input-force">
                          Force (F) [N]
                        </Label>
                        <Input 
                          id="input-force"
                          type="number"
                          placeholder="Enter force"
                          value={values.force}
                          onChange={(e) => handleInputChange('force', e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" onClick={handleSolve}>
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                      <RotateCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Formula</h3>
                    <div className="bg-indigo-50 dark:bg-indigo-950/40 p-6 rounded-lg">
                      <p className="text-3xl font-bold text-indigo-600">F = m × a</p>
                    </div>
                  </div>
                  
                  {result && (
                    <div className="w-full mt-6">
                      <h3 className="text-lg font-medium mb-2 text-center">Result</h3>
                      <div className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 p-4 rounded-lg text-center">
                        <p className="text-xl font-semibold text-green-700 dark:text-green-400">{result}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Variables Explained</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-indigo-600 mb-1">Force (F)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Force is a push or pull upon an object resulting from its interaction with another object. It is measured in Newtons (N).
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-indigo-600 mb-1">Mass (m)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mass is the amount of matter in an object. It is measured in kilograms (kg) and remains constant regardless of location.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-indigo-600 mb-1">Acceleration (a)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Acceleration is the rate of change of velocity. It is measured in meters per second squared (m/s²).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Real-World Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>Calculating rocket thrust needed to launch a spacecraft</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>Designing vehicle braking systems to provide sufficient stopping force</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>Computing forces in structural engineering for building safety</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>Analyzing impacts in sports physics and equipment design</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>Planning space missions where different gravitational forces apply</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Data Simulation Tab */}
        <TabsContent value="simulation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Data Simulation</CardTitle>
              <CardDescription>
                Visualize how changing force affects acceleration and distance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={simulationData}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="force" stroke="#8884d8" strokeWidth={2} name="Force (N)" />
                    <Line type="monotone" dataKey="acceleration" stroke="#82ca9d" strokeWidth={2} name="Acceleration (m/s²)" />
                    <Line type="monotone" dataKey="distance" stroke="#ff7300" strokeWidth={2} name="Distance (m)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Force Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={simulationData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tick={{fontSize: 12}} />
                      <YAxis tick={{fontSize: 12}} />
                      <Tooltip />
                      <Area type="monotone" dataKey="force" stroke="#8884d8" fill="#8884d8" name="Force (N)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>As force increases linearly over time, we observe proportional changes in acceleration per Newton's Second Law.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Acceleration Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={simulationData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tick={{fontSize: 12}} />
                      <YAxis tick={{fontSize: 12}} />
                      <Tooltip />
                      <Area type="monotone" dataKey="acceleration" stroke="#82ca9d" fill="#82ca9d" name="Acceleration (m/s²)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>Acceleration shows direct correlation with force, demonstrating the F=ma relationship with constant mass.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Distance Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={simulationData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tick={{fontSize: 12}} />
                      <YAxis tick={{fontSize: 12}} />
                      <Tooltip />
                      <Area type="monotone" dataKey="distance" stroke="#ff7300" fill="#ff7300" name="Distance (m)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>Distance increases quadratically due to the relationship with acceleration, showing non-linear growth.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Learning Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Analytics</CardTitle>
              <CardDescription>
                Track your progress and performance with Newton's Second Law concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-indigo-600">87%</p>
                      <p className="text-sm text-gray-500 mt-2">Mastery Level</p>
                    </div>
                    <div className="mt-4">
                      <Progress value={87} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-indigo-600">45</p>
                      <p className="text-sm text-gray-500 mt-2">Problems Solved</p>
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                      <Badge className="bg-green-100 text-green-800">+12 this week</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-indigo-600">3.2</p>
                      <p className="text-sm text-gray-500 mt-2">Hours Studied</p>
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                      <Badge className="bg-blue-100 text-blue-800">90 minutes today</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="problems" stroke="#8884d8" name="Problems Solved" />
                    <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#82ca9d" name="Accuracy %" />
                    <Line yAxisId="right" type="monotone" dataKey="time" stroke="#ff7300" name="Avg. Time (min)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Concept Strength Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Force Calculation</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mass Isolation</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Acceleration Analysis</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Variable Relationships</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Unit Conversion</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Badge className="mt-0.5">1</Badge>
                    <div>
                      <p className="font-medium">Review Unit Conversions</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Focus on converting between N, kg, and m/s² accurately</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="mt-0.5">2</Badge>
                    <div>
                      <p className="font-medium">Practice Complex Scenarios</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Work on problems with multiple forces and objects</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="mt-0.5">3</Badge>
                    <div>
                      <p className="font-medium">Watch Advanced Video Tutorials</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Complete the video series on Newton's Laws applications</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge className="mt-0.5">4</Badge>
                    <div>
                      <p className="font-medium">Take Practice Quiz</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Test your understanding with the comprehensive assessment</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Advanced Applications Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Applications</CardTitle>
              <CardDescription>
                Explore complex scenarios where Newton's Second Law applies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="overflow-hidden">
                  <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold mb-2">Rocket Propulsion</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Analysis of thrust, mass changes, and velocity in spacecraft.
                    </p>
                    <Button variant="link" className="px-0 py-1">
                      Explore Case Study <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <div className="h-40 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold mb-2">Sports Physics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Analyzing forces in athletic movements and equipment design.
                    </p>
                    <Button variant="link" className="px-0 py-1">
                      Explore Case Study <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <div className="h-40 bg-gradient-to-r from-amber-500 to-orange-600"></div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold mb-2">Elevator Physics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Understanding apparent weight changes during acceleration.
                    </p>
                    <Button variant="link" className="px-0 py-1">
                      Explore Case Study <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium mb-4">Advanced Problem Sets</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                        <Star className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Multi-Body Problems</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">10 challenging questions</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Start
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                        <Star className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Variable Mass Systems</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">8 advanced problems</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Start
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                        <Star className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Friction Analysis</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">12 practical applications</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Start
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                        <Star className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Engineering Applications</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">15 design challenges</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Start
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormulaLabPage;
