
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, TrendingUp, BarChart3, PieChart as PieChartIcon, Activity,
  Zap, Target, ArrowRight, Play, Pause, RotateCcw
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, Area, AreaChart
} from 'recharts';
import { motion } from 'framer-motion';

interface EnhancedVisualTabProps {
  conceptName: string;
}

const EnhancedVisualTab: React.FC<EnhancedVisualTabProps> = ({ conceptName }) => {
  const [activeVisualization, setActiveVisualization] = useState('force-diagram');
  const [animationPlaying, setAnimationPlaying] = useState(false);

  // Sample data for various visualizations
  const forceVsAcceleration = [
    { force: 0, acceleration: 0, mass1: 0, mass2: 0, mass3: 0 },
    { force: 10, acceleration: 2, mass1: 5, mass2: 10, mass3: 20 },
    { force: 20, acceleration: 4, mass1: 10, mass2: 20, mass3: 40 },
    { force: 30, acceleration: 6, mass1: 15, mass2: 30, mass3: 60 },
    { force: 40, acceleration: 8, mass1: 20, mass2: 40, mass3: 80 },
    { force: 50, acceleration: 10, mass1: 25, mass2: 50, mass3: 100 },
  ];

  const massVsAcceleration = [
    { mass: 1, acceleration: 50, force10: 10, force20: 20, force30: 30 },
    { mass: 2, acceleration: 25, force10: 5, force20: 10, force30: 15 },
    { mass: 5, acceleration: 10, force10: 2, force20: 4, force30: 6 },
    { mass: 10, acceleration: 5, force10: 1, force20: 2, force30: 3 },
    { mass: 20, acceleration: 2.5, force10: 0.5, force20: 1, force30: 1.5 },
  ];

  const realWorldApplications = [
    { scenario: 'Car Braking', force: 85, mass: 1500, acceleration: 0.057 },
    { scenario: 'Rocket Launch', force: 75, mass: 500000, acceleration: 0.00015 },
    { scenario: 'Ball Throw', force: 95, mass: 0.15, acceleration: 633 },
    { scenario: 'Bike Pedaling', force: 60, mass: 80, acceleration: 0.75 },
    { scenario: 'Elevator Motion', force: 70, mass: 800, acceleration: 0.088 },
  ];

  const forceComponents = [
    { name: 'Applied Force', value: 100, color: '#3B82F6' },
    { name: 'Friction', value: 30, color: '#EF4444' },
    { name: 'Normal Force', value: 80, color: '#10B981' },
    { name: 'Weight', value: 80, color: '#F59E0B' },
  ];

  const toggleAnimation = () => {
    setAnimationPlaying(!animationPlaying);
  };

  const resetAnimation = () => {
    setAnimationPlaying(false);
  };

  return (
    <div className="space-y-6">
      {/* Visualization Controls */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Eye className="h-5 w-5 mr-2 text-purple-600" />
              Interactive Visualizations: {conceptName}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={toggleAnimation}
                size="sm"
                variant={animationPlaying ? "default" : "outline"}
              >
                {animationPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                {animationPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button onClick={resetAnimation} size="sm" variant="outline">
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeVisualization} onValueChange={setActiveVisualization}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="force-diagram">Force Diagram</TabsTrigger>
              <TabsTrigger value="graphs">Relationship Graphs</TabsTrigger>
              <TabsTrigger value="applications">Real World</TabsTrigger>
              <TabsTrigger value="interactive">Interactive Lab</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="force-diagram" className="space-y-6">
              {/* Force Diagram Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Force Vector Diagram</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full h-80 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                      {/* Interactive Force Diagram */}
                      <svg width="100%" height="100%" className="absolute inset-0">
                        {/* Grid Background */}
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        
                        {/* Object (Box) */}
                        <motion.rect
                          x="150"
                          y="140"
                          width="60"
                          height="40"
                          fill="#3B82F6"
                          rx="4"
                          animate={animationPlaying ? { x: [150, 250, 150] } : {}}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        
                        {/* Force Vectors */}
                        {/* Applied Force (Right) */}
                        <motion.g
                          animate={animationPlaying ? { opacity: [0.5, 1, 0.5] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <line x1="210" y1="160" x2="280" y2="160" stroke="#10B981" strokeWidth="3" markerEnd="url(#arrowgreen)"/>
                          <text x="245" y="150" fill="#10B981" fontSize="12" textAnchor="middle">F = 100N</text>
                        </motion.g>
                        
                        {/* Friction Force (Left) */}
                        <line x1="150" y1="160" x2="100" y2="160" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrowred)"/>
                        <text x="125" y="150" fill="#EF4444" fontSize="12" textAnchor="middle">f = 30N</text>
                        
                        {/* Weight (Down) */}
                        <line x1="180" y1="180" x2="180" y2="230" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrowyellow)"/>
                        <text x="190" y="210" fill="#F59E0B" fontSize="12">W = mg</text>
                        
                        {/* Normal Force (Up) */}
                        <line x1="180" y1="140" x2="180" y2="90" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrowpurple)"/>
                        <text x="190" y="110" fill="#8B5CF6" fontSize="12">N = mg</text>
                        
                        {/* Arrow markers */}
                        <defs>
                          <marker id="arrowgreen" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                          </marker>
                          <marker id="arrowred" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
                          </marker>
                          <marker id="arrowyellow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" />
                          </marker>
                          <marker id="arrowpurple" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#8B5CF6" />
                          </marker>
                        </defs>
                        
                        {/* Net Force Arrow */}
                        <motion.g
                          animate={animationPlaying ? { opacity: [0, 1, 0] } : { opacity: 1 }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <line x1="210" y1="200" x2="260" y2="200" stroke="#1F2937" strokeWidth="4" markerEnd="url(#arrowblack)"/>
                          <text x="235" y="215" fill="#1F2937" fontSize="14" fontWeight="bold" textAnchor="middle">F_net = 70N</text>
                        </motion.g>
                        
                        <defs>
                          <marker id="arrowblack" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
                            <polygon points="0 0, 12 4, 0 8" fill="#1F2937" />
                          </marker>
                        </defs>
                        
                        {/* Acceleration indicator */}
                        <motion.text
                          x="320"
                          y="160"
                          fill="#3B82F6"
                          fontSize="16"
                          fontWeight="bold"
                          animate={animationPlaying ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          a = F/m = 70/10 = 7 m/s²
                        </motion.text>
                      </svg>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Force Components Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={forceComponents}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          dataKey="value"
                          label={(entry) => `${entry.name}: ${entry.value}N`}
                        >
                          {forceComponents.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Formula Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Mathematical Relationship Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">F = ma</div>
                      <div className="text-sm text-blue-800 dark:text-blue-300">
                        Force equals mass times acceleration
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">a = F/m</div>
                      <div className="text-sm text-green-800 dark:text-green-300">
                        Acceleration equals force divided by mass
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">m = F/a</div>
                      <div className="text-sm text-purple-800 dark:text-purple-300">
                        Mass equals force divided by acceleration
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="graphs" className="space-y-6">
              {/* Relationship Graphs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                      Force vs Acceleration (Different Masses)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={forceVsAcceleration}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="force" label={{ value: 'Force (N)', position: 'insideBottom', offset: -10 }} />
                        <YAxis label={{ value: 'Acceleration (m/s²)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="mass1" stroke="#3B82F6" strokeWidth={2} name="m = 5kg" />
                        <Line type="monotone" dataKey="mass2" stroke="#10B981" strokeWidth={2} name="m = 2.5kg" />
                        <Line type="monotone" dataKey="mass3" stroke="#F59E0B" strokeWidth={2} name="m = 1.25kg" />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Linear relationship: Higher mass = lower slope (acceleration/force ratio)
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                      Mass vs Acceleration (Constant Force)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={massVsAcceleration}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mass" label={{ value: 'Mass (kg)', position: 'insideBottom', offset: -10 }} />
                        <YAxis label={{ value: 'Acceleration (m/s²)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="force10" stroke="#EF4444" strokeWidth={2} name="F = 10N" />
                        <Line type="monotone" dataKey="force20" stroke="#8B5CF6" strokeWidth={2} name="F = 20N" />
                        <Line type="monotone" dataKey="force30" stroke="#F59E0B" strokeWidth={2} name="F = 30N" />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Inverse relationship: As mass increases, acceleration decreases
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 3D Surface Plot Concept */}
              <Card>
                <CardHeader>
                  <CardTitle>Force-Mass-Acceleration Relationship Surface</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-80 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-semibold mb-4">3D Relationship Visualization</div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="bg-white dark:bg-gray-800 p-3 rounded">
                            <div className="font-medium">X-Axis: Force</div>
                            <div className="text-gray-600 dark:text-gray-400">0 - 100 N</div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded">
                            <div className="font-medium">Y-Axis: Mass</div>
                            <div className="text-gray-600 dark:text-gray-400">1 - 20 kg</div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded">
                            <div className="font-medium">Z-Axis: Acceleration</div>
                            <div className="text-gray-600 dark:text-gray-400">Calculated: F/m</div>
                          </div>
                        </div>
                        <Button className="mt-4" onClick={() => setActiveVisualization('interactive')}>
                          <ArrowRight className="h-4 w-4 mr-2" />
                          View Interactive 3D
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              {/* Real World Applications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-purple-600" />
                    Real-World Applications Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart data={realWorldApplications}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mass" scale="log" domain={['dataMin', 'dataMax']} label={{ value: 'Mass (kg)', position: 'insideBottom', offset: -10 }} />
                      <YAxis dataKey="acceleration" scale="log" domain={['dataMin', 'dataMax']} label={{ value: 'Acceleration (m/s²)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        formatter={(value, name) => [value, name]}
                        labelFormatter={(label) => `Scenario: ${realWorldApplications.find(app => app.mass === label)?.scenario || ''}`}
                      />
                      <Scatter dataKey="acceleration" fill="#8B5CF6" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {realWorldApplications.map((app, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-3">{app.scenario}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Force:</span>
                            <Badge variant="outline">{app.force} N</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Mass:</span>
                            <Badge variant="outline">{app.mass} kg</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Acceleration:</span>
                            <Badge variant="outline">{app.acceleration.toFixed(3)} m/s²</Badge>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                          F = ma: {app.force} = {app.mass} × {app.acceleration.toFixed(3)}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interactive" className="space-y-6">
              {/* Interactive Lab */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-orange-600" />
                    Interactive Physics Lab
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg">
                    <Zap className="h-16 w-16 mx-auto text-orange-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Advanced 3D Interactive Lab</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Manipulate force vectors, adjust mass, and observe real-time acceleration changes
                    </p>
                    <Button 
                      size="lg"
                      onClick={() => setActiveVisualization('3d')}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <ArrowRight className="h-5 w-5 mr-2" />
                      Launch 3D Lab
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              {/* Comparison Studies */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-indigo-600" />
                    Comparative Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Newton's Laws Comparison</h4>
                      <div className="space-y-3">
                        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
                          <div className="font-medium text-blue-800 dark:text-blue-300">First Law (Inertia)</div>
                          <div className="text-sm text-blue-600 dark:text-blue-400">Object at rest stays at rest, object in motion stays in motion</div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950 p-3 rounded border-2 border-green-300">
                          <div className="font-medium text-green-800 dark:text-green-300">Second Law (F=ma) ← Current</div>
                          <div className="text-sm text-green-600 dark:text-green-400">Force equals mass times acceleration</div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded">
                          <div className="font-medium text-purple-800 dark:text-purple-300">Third Law (Action-Reaction)</div>
                          <div className="text-sm text-purple-600 dark:text-purple-400">For every action, there is an equal and opposite reaction</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Different Mass Scenarios</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={[
                          { scenario: 'Feather', mass: 0.001, acceleration: 10000 },
                          { scenario: 'Ball', mass: 0.5, acceleration: 20 },
                          { scenario: 'Car', mass: 1500, acceleration: 0.0067 },
                          { scenario: 'Truck', mass: 10000, acceleration: 0.001 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="scenario" />
                          <YAxis scale="log" />
                          <Tooltip />
                          <Bar dataKey="acceleration" fill="#8B5CF6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedVisualTab;
