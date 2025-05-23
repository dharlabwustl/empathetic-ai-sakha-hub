
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Eye, Image, BarChart, LineChart, Play, Lightbulb, ArrowRight, RotateCw, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';

interface Visual3DContentProps {
  conceptName: string;
}

const Visual3DContent: React.FC<Visual3DContentProps> = ({ conceptName }) => {
  const [activeVisualization, setActiveVisualization] = useState<string | null>(null);
  const [forceValue, setForceValue] = useState([50]);
  const [massValue, setMassValue] = useState([30]);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  const visualizations = {
    diagrams: [
      {
        title: "Force-Mass-Acceleration Relationship",
        description: "Interactive diagram showing how F = ma works with adjustable parameters",
        explanation: "This diagram illustrates the fundamental relationship between force, mass, and acceleration. As you increase the force applied to an object, its acceleration increases proportionally. However, if you increase the mass while keeping force constant, acceleration decreases."
      },
      {
        title: "Free Body Diagram",
        description: "Visualize all forces acting on an object in different scenarios",
        explanation: "Free body diagrams help identify all forces acting on an object. This is crucial for applying Newton's second law correctly, as you need to calculate the net force to determine acceleration."
      },
      {
        title: "Vector Addition",
        description: "See how multiple forces combine to create net force",
        explanation: "When multiple forces act on an object, they combine vectorially. The net force determines the acceleration according to F = ma. This visualization shows how forces in different directions add up."
      }
    ],
    charts: [
      {
        title: "Force vs Acceleration (Constant Mass)",
        description: "Linear relationship demonstrating F = ma with fixed mass",
        explanation: "This chart shows the direct proportional relationship between force and acceleration when mass remains constant. The slope of the line equals the mass of the object."
      },
      {
        title: "Mass vs Acceleration (Constant Force)",
        description: "Inverse relationship showing how mass affects acceleration",
        explanation: "With constant force, as mass increases, acceleration decreases. This inverse relationship is clearly visible in the hyperbolic curve, demonstrating that a = F/m."
      }
    ],
    graphs: [
      {
        title: "Real-time Motion Analysis",
        description: "Live graphs showing position, velocity, and acceleration over time",
        explanation: "These real-time graphs help you understand the relationship between acceleration (determined by F = ma) and the resulting motion. You can see how constant acceleration leads to linear velocity increase and parabolic position change."
      },
      {
        title: "Force Response Simulation",
        description: "Interactive graph showing how objects respond to varying forces",
        explanation: "This simulation allows you to apply different force patterns and observe the resulting acceleration and motion. It clearly demonstrates how the object's response is always governed by F = ma."
      }
    ]
  };

  const calculateAcceleration = () => {
    return (forceValue[0] / massValue[0]).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Visual Learning Experience</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Explore {conceptName} through interactive visual representations that make complex physics concepts easy to understand.
        </p>
      </div>

      <Card className="border-2 border-indigo-200 dark:border-indigo-800">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Interactive Visual Representations
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Different ways to visualize and understand {conceptName}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="diagrams">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="diagrams" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Interactive Diagrams
              </TabsTrigger>
              <TabsTrigger value="charts" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Dynamic Charts
              </TabsTrigger>
              <TabsTrigger value="graphs" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                Real-time Graphs
              </TabsTrigger>
            </TabsList>
            
            {/* Interactive 3D Physics Simulation (Added) */}
            <div className="mb-8 p-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <h4 className="font-medium text-lg mb-4 flex items-center">
                <RotateCw className="h-5 w-5 text-blue-600 mr-2" />
                Interactive 3D Physics Simulator
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="aspect-square bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/50 dark:to-blue-900/50 rounded-lg border-2 border-dashed border-indigo-300 dark:border-indigo-700 flex items-center justify-center relative overflow-hidden">
                  {/* 3D Simulation Visualization */}
                  <div className="text-center">
                    <motion.div
                      animate={isSimulationRunning ? { 
                        x: [0, 50, 0, -50, 0], 
                        scale: [1, 1.1, 1, 0.9, 1],
                        rotate: [0, 10, 0, -10, 0]
                      } : {}}
                      transition={{ duration: 2, repeat: isSimulationRunning ? Infinity : 0, ease: "linear" }}
                      className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-4"
                    />
                    <p className="text-indigo-600 dark:text-indigo-300 font-medium">
                      F = {forceValue[0]}N, m = {massValue[0]}kg
                    </p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      a = {calculateAcceleration()} m/s²
                    </p>
                  </div>
                  
                  {/* Control Overlay */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setIsSimulationRunning(!isSimulationRunning)}
                      className="bg-white text-indigo-600 hover:bg-indigo-50"
                    >
                      {isSimulationRunning ? 'Pause' : 'Run'} Simulation
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Simulation Controls */}
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Force (N)</label>
                        <span>{forceValue[0]} N</span>
                      </div>
                      <Slider
                        value={forceValue}
                        onValueChange={setForceValue}
                        max={100}
                        step={5}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Mass (kg)</label>
                        <span>{massValue[0]} kg</span>
                      </div>
                      <Slider
                        value={massValue}
                        onValueChange={setMassValue}
                        min={10}
                        max={100}
                        step={5}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/50">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-blue-900 dark:text-blue-300 mb-1">
                          Understanding Newton's 2nd Law
                        </h5>
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                          This simulation demonstrates how force and mass directly affect acceleration.
                          Increase the force to see faster acceleration, or increase the mass to see
                          slower acceleration, following the relationship F = ma.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={() => setActiveVisualization('fullscreen')}>
                    <ZoomIn className="h-4 w-4 mr-2" /> 
                    Enter Full 3D Experience
                  </Button>
                </div>
              </div>
            </div>
            
            <TabsContent value="diagrams" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {visualizations.diagrams.map((diagram, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                            {diagram.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            {diagram.description}
                          </p>
                          
                          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-start gap-2">
                              <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h5 className="font-medium text-blue-900 dark:text-blue-300 mb-1">
                                  Understanding the Concept
                                </h5>
                                <p className="text-blue-800 dark:text-blue-200 text-sm">
                                  {diagram.explanation}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Button 
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => setActiveVisualization(`diagram-${index}`)}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Launch Interactive Diagram
                          </Button>
                        </div>
                        
                        {/* Enhanced Diagram Preview */}
                        <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center border-2 border-dashed border-indigo-300 dark:border-indigo-700 relative overflow-hidden">
                          {index === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative">
                                <motion.div 
                                  animate={{ 
                                    x: [0, 50, 100],
                                  }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                  className="w-12 h-12 bg-blue-500 rounded-lg absolute opacity-80"
                                  style={{ top: '0px' }}
                                />
                                <div className="w-full flex justify-center mt-20">
                                  <div className="bg-gray-200 dark:bg-gray-700 h-1 w-32"></div>
                                </div>
                              </div>
                            </div>
                          )}
                          {index === 1 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative">
                                <motion.div 
                                  className="absolute"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                >
                                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-500"></div>
                                  <div className="w-4 h-4 bg-red-500 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                </motion.div>
                              </div>
                            </div>
                          )}
                          {index === 2 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative">
                                <div className="flex space-x-6">
                                  <motion.div 
                                    animate={{ rotate: 45 }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                    className="w-16 h-1 bg-red-500 origin-left"
                                  ></motion.div>
                                  <motion.div 
                                    animate={{ rotate: -45 }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                    className="w-16 h-1 bg-blue-500 origin-left"
                                  ></motion.div>
                                </div>
                                <motion.div 
                                  animate={{ rotate: 0 }}
                                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                  className="w-20 h-1 bg-green-500 mt-8 mx-auto"
                                ></motion.div>
                              </div>
                            </div>
                          )}
                          
                          <div className="text-center z-10">
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                              Interactive {diagram.title}
                            </p>
                            <p className="text-sm text-indigo-500 dark:text-indigo-300 mt-1">
                              Click to interact →
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="charts" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {visualizations.charts.map((chart, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-green-700 dark:text-green-300">
                            {chart.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            {chart.description}
                          </p>
                          
                          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border-l-4 border-green-500">
                            <div className="flex items-start gap-2">
                              <BarChart className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h5 className="font-medium text-green-900 dark:text-green-300 mb-1">
                                  Data Interpretation
                                </h5>
                                <p className="text-green-800 dark:text-green-200 text-sm">
                                  {chart.explanation}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Button 
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={() => setActiveVisualization(`chart-${index}`)}
                          >
                            <BarChart className="h-4 w-4 mr-2" />
                            View Interactive Chart
                          </Button>
                        </div>
                        
                        {/* Enhanced Chart Preview */}
                        <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg flex items-center justify-center border-2 border-dashed border-green-300 dark:border-green-700 relative overflow-hidden">
                          {index === 0 && (
                            <div className="w-full h-full flex items-center justify-center px-6">
                              <div className="w-full">
                                <div className="flex justify-between h-32 items-end">
                                  <motion.div
                                    initial={{ height: '20%' }}
                                    animate={{ height: '30%', backgroundColor: '#10B981' }}
                                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                    className="w-8 bg-green-500 rounded-t"
                                  ></motion.div>
                                  <motion.div
                                    initial={{ height: '40%' }}
                                    animate={{ height: '60%', backgroundColor: '#059669' }}
                                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                                    className="w-8 bg-green-600 rounded-t"
                                  ></motion.div>
                                  <motion.div
                                    initial={{ height: '60%' }}
                                    animate={{ height: '90%', backgroundColor: '#047857' }}
                                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
                                    className="w-8 bg-green-700 rounded-t"
                                  ></motion.div>
                                  <motion.div
                                    initial={{ height: '80%' }}
                                    animate={{ height: '100%', backgroundColor: '#065F46' }}
                                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 0.6 }}
                                    className="w-8 bg-green-800 rounded-t"
                                  ></motion.div>
                                </div>
                                <div className="h-0.5 w-full bg-green-800 mt-1"></div>
                              </div>
                            </div>
                          )}
                          {index === 1 && (
                            <div className="w-full h-full flex items-center justify-center px-6">
                              <div className="w-full">
                                <svg viewBox="0 0 100 60" className="w-full">
                                  <path
                                    d="M 0,60 C 20,50 40,20 60,10 S 80,5 100,0"
                                    fill="none"
                                    stroke="#10B981"
                                    strokeWidth="2"
                                  />
                                  <motion.circle 
                                    cx="20" 
                                    cy="50" 
                                    r="3" 
                                    fill="#065F46"
                                    animate={{ cx: [20, 40, 60, 80], cy: [50, 20, 10, 5] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                          
                          <div className="text-center z-10">
                            <p className="text-green-600 dark:text-green-400 font-medium">
                              {chart.title}
                            </p>
                            <p className="text-sm text-green-500 dark:text-green-300 mt-1">
                              Interactive data visualization
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="graphs" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {visualizations.graphs.map((graph, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                            {graph.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            {graph.description}
                          </p>
                          
                          <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border-l-4 border-purple-500">
                            <div className="flex items-start gap-2">
                              <LineChart className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h5 className="font-medium text-purple-900 dark:text-purple-300 mb-1">
                                  Motion Analysis
                                </h5>
                                <p className="text-purple-800 dark:text-purple-200 text-sm">
                                  {graph.explanation}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Button 
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            onClick={() => setActiveVisualization(`graph-${index}`)}
                          >
                            <LineChart className="h-4 w-4 mr-2" />
                            Start Real-time Analysis
                          </Button>
                        </div>
                        
                        {/* Enhanced Graph Preview */}
                        <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300 dark:border-purple-700 relative overflow-hidden">
                          {index === 0 && (
                            <div className="w-full h-full flex items-center justify-center px-6">
                              <div className="w-full">
                                <svg viewBox="0 0 100 60" className="w-full">
                                  <motion.path
                                    d="M 0,30 C 10,40 20,10 30,20 S 40,50 50,30 S 60,10 70,25 S 80,50 90,35 S 100,20 100,30"
                                    fill="none"
                                    stroke="#8B5CF6"
                                    strokeWidth="2"
                                    animate={{ 
                                      d: [
                                        "M 0,30 C 10,40 20,10 30,20 S 40,50 50,30 S 60,10 70,25 S 80,50 90,35 S 100,20 100,30",
                                        "M 0,35 C 10,45 20,15 30,25 S 40,55 50,35 S 60,15 70,30 S 80,55 90,40 S 100,25 100,35",
                                        "M 0,25 C 10,35 20,5 30,15 S 40,45 50,25 S 60,5 70,20 S 80,45 90,30 S 100,15 100,25",
                                        "M 0,30 C 10,40 20,10 30,20 S 40,50 50,30 S 60,10 70,25 S 80,50 90,35 S 100,20 100,30"
                                      ]
                                    }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                  />
                                  <motion.circle 
                                    cx="50" 
                                    cy="30" 
                                    r="3" 
                                    fill="#8B5CF6"
                                    animate={{ 
                                      cx: [50, 60, 70, 80, 90, 100],
                                      cy: [30, 10, 25, 50, 35, 30] 
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                          {index === 1 && (
                            <div className="w-full h-full flex items-center justify-center px-6">
                              <div className="w-full">
                                <div className="h-32 relative">
                                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-800"></div>
                                  <div className="absolute left-0 top-0 h-full w-0.5 bg-purple-800"></div>
                                  
                                  <motion.div
                                    animate={{ 
                                      x: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
                                      y: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25]
                                    }}
                                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                                    className="absolute bottom-0 left-0 w-3 h-3 bg-purple-500 rounded-full transform -translate-x-1.5 -translate-y-1.5"
                                  ></motion.div>
                                  
                                  <motion.div 
                                    className="absolute bottom-0 left-0 w-full h-full"
                                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                  >
                                    <svg viewBox="0 0 200 100" className="w-full h-full">
                                      <path
                                        d="M 0,100 Q 50,70 100,50 Q 150,30 200,20"
                                        fill="none"
                                        stroke="#D8B4FE"
                                        strokeWidth="2"
                                        strokeDasharray="4"
                                      />
                                    </svg>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="text-center z-10">
                            <p className="text-purple-600 dark:text-purple-400 font-medium">
                              {graph.title}
                            </p>
                            <p className="text-sm text-purple-500 dark:text-purple-300 mt-1">
                              Real-time data visualization
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-2">Master Visual Learning</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Visual representations help you understand abstract physics concepts by making them concrete and interactive.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                  Interactive Diagrams
                </Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                  Real-time Data
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                  Motion Analysis
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

export default Visual3DContent;
