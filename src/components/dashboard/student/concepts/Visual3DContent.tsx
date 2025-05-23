import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Eye, Image, BarChart, LineChart, Play, Lightbulb, ArrowRight, RotateCw, ZoomIn, Settings, Activity, TrendingUp } from 'lucide-react';
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
        title: "Interactive Force Diagrams",
        description: "Real-time force vector visualization with adjustable parameters",
        explanation: "Manipulate force vectors in real-time to see how they combine and affect object motion. Adjust magnitude and direction to understand vector addition principles.",
        features: ["Vector manipulation", "Real-time calculation", "Multiple force sources", "Resultant force display"],
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
      },
      {
        title: "3D Newton's Cradle",
        description: "Interactive physics simulation showing momentum conservation",
        explanation: "Experience momentum and energy conservation through this interactive 3D model. Click and drag to lift spheres and observe the transfer of momentum.",
        features: ["3D interaction", "Physics simulation", "Energy tracking", "Collision detection"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
      },
      {
        title: "Mass-Acceleration Relationship",
        description: "Visual demonstration of F = ma with interactive sliders",
        explanation: "Adjust mass and force values to see real-time changes in acceleration. The 3D visualization shows object motion with actual physics calculations.",
        features: ["Parameter control", "Live calculations", "Motion tracking", "Formula validation"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"
      }
    ],
    charts: [
      {
        title: "Performance Analysis Chart",
        description: "Real-time performance tracking with interactive data points",
        explanation: "Track your understanding progress with detailed analytics. See how your mastery improves over time with interactive trend analysis.",
        data: [
          { time: "Week 1", score: 45, practice: 12 },
          { time: "Week 2", score: 62, practice: 18 },
          { time: "Week 3", score: 78, practice: 25 },
          { time: "Week 4", score: 85, practice: 32 }
        ]
      },
      {
        title: "Subject Breakdown Analysis",
        description: "Interactive pie chart showing concept mastery distribution",
        explanation: "Visualize your strengths and areas for improvement across different aspects of the concept.",
        data: [
          { category: "Theory", value: 85, color: "#3B82F6" },
          { category: "Application", value: 72, color: "#10B981" },
          { category: "Problem Solving", value: 68, color: "#F59E0B" },
          { category: "Formulas", value: 90, color: "#8B5CF6" }
        ]
      }
    ],
    graphs: [
      {
        title: "Learning Trend Analysis",
        description: "Interactive learning curve with predictive analytics",
        explanation: "Understand your learning pattern and get AI-powered predictions for your study progress.",
        features: ["Trend prediction", "Learning velocity", "Milestone tracking", "Performance forecast"]
      },
      {
        title: "Difficulty Progression Graph",
        description: "Visual representation of concept difficulty over time",
        explanation: "See how concept difficulty increases and track your readiness for advanced topics.",
        features: ["Difficulty mapping", "Readiness indicators", "Prerequisite tracking", "Adaptive learning path"]
      }
    ]
  };

  const simulationControls = [
    { label: "Force (N)", value: forceValue, setValue: setForceValue, min: 0, max: 100, step: 5 },
    { label: "Mass (kg)", value: massValue, setValue: setMassValue, min: 10, max: 100, step: 5 }
  ];

  const calculateAcceleration = () => {
    return (forceValue[0] / massValue[0]).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Advanced Interactive Visualizations</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Explore {conceptName} through cutting-edge 3D simulations, interactive charts, and real-time data analysis.
        </p>
      </div>

      <Card className="border-2 border-indigo-200 dark:border-indigo-800">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Interactive Visual Laboratory
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Immersive 3D models, real-time analytics, and physics simulations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="diagrams">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="diagrams" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                3D Simulations
              </TabsTrigger>
              <TabsTrigger value="charts" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Analytics Charts
              </TabsTrigger>
              <TabsTrigger value="graphs" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                Progress Graphs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="diagrams" className="space-y-6">
              {/* Interactive 3D Physics Simulation */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <RotateCw className="h-5 w-5 text-blue-600" />
                    Interactive Physics Laboratory
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-lg border-2 border-dashed border-indigo-300 dark:border-indigo-700 flex items-center justify-center relative overflow-hidden">
                        {/* Enhanced 3D Simulation Visualization */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <motion.div
                              animate={isSimulationRunning ? { 
                                x: [0, 50, -50, 0],
                                y: [0, -20, -20, 0],
                                rotate: [0, 90, 180, 360]
                              } : {}}
                              transition={{ 
                                duration: 3, 
                                repeat: isSimulationRunning ? Infinity : 0, 
                                ease: "easeInOut" 
                              }}
                              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-4 shadow-xl"
                            />
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                              F = {forceValue[0]}N, m = {massValue[0]}kg
                            </p>
                            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                              a = {calculateAcceleration()} m/s²
                            </p>
                            
                            {/* Physics Visualization Elements */}
                            <div className="mt-4 flex justify-center gap-2">
                              <motion.div 
                                className="w-2 h-8 bg-blue-500 rounded"
                                animate={{ height: forceValue[0] / 2 }}
                                transition={{ duration: 0.3 }}
                              />
                              <motion.div 
                                className="w-2 h-8 bg-green-500 rounded"
                                animate={{ height: massValue[0] / 2 }}
                                transition={{ duration: 0.3 }}
                              />
                              <motion.div 
                                className="w-2 h-8 bg-purple-500 rounded"
                                animate={{ height: parseFloat(calculateAcceleration()) * 5 }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced Control Overlay */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => setIsSimulationRunning(!isSimulationRunning)}
                            className="bg-white/90 text-indigo-600 hover:bg-white shadow-lg"
                          >
                            {isSimulationRunning ? 'Stop' : 'Start'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/90 border-indigo-200 text-indigo-600 hover:bg-white shadow-lg"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Enhanced Simulation Controls */}
                      <div className="space-y-4">
                        {simulationControls.map((control, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <label className="text-sm font-medium flex items-center gap-2">
                                <Activity className="h-4 w-4 text-blue-500" />
                                {control.label}
                              </label>
                              <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {control.value[0]}
                              </span>
                            </div>
                            <Slider
                              value={control.value}
                              onValueChange={control.setValue}
                              max={control.max}
                              min={control.min}
                              step={control.step}
                              className="w-full"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          Real-time Physics Analysis
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Watch how changing force and mass affects acceleration in real-time. This demonstrates Newton's Second Law: F = ma.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Applied Force:</span>
                            <span className="font-medium text-blue-600">{forceValue[0]} N</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Object Mass:</span>
                            <span className="font-medium text-green-600">{massValue[0]} kg</span>
                          </div>
                          <div className="flex justify-between text-sm border-t pt-2">
                            <span>Resulting Acceleration:</span>
                            <span className="font-bold text-purple-600">{calculateAcceleration()} m/s²</span>
                          </div>
                          <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950/30 rounded text-xs">
                            <strong>Formula:</strong> a = F/m = {forceValue[0]}/{massValue[0]} = {calculateAcceleration()} m/s²
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        <ZoomIn className="h-4 w-4 mr-2" />
                        Enter Full 3D Mode
                      </Button>
                      
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">Learning Progress</span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          You've mastered 78% of this concept through interactive simulations
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Other Enhanced 3D Visualizations */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visualizations.diagrams.map((diagram, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 h-full overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={diagram.image} 
                          alt={diagram.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-4 text-white">
                            <h4 className="font-semibold">{diagram.title}</h4>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                          {diagram.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {diagram.features.map((feature, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Launch Simulation
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="charts" className="space-y-6">
              {/* Performance Analytics Chart */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-green-600" />
                    Performance Analytics Dashboard
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {/* Simulated Chart Visualization */}
                      <div className="h-64 bg-white dark:bg-gray-800 rounded-lg p-4 border">
                        <h5 className="font-medium mb-3">Learning Progress Over Time</h5>
                        <div className="h-40 flex items-end justify-between gap-2">
                          {visualizations.charts[0].data.map((item, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${item.score}%` }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                className="bg-gradient-to-t from-blue-500 to-purple-600 rounded-t w-full max-h-32"
                              />
                              <span className="text-xs mt-1">{item.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Subject Breakdown */}
                      <div className="h-64 bg-white dark:bg-gray-800 rounded-lg p-4 border">
                        <h5 className="font-medium mb-3">Subject Mastery Breakdown</h5>
                        <div className="space-y-3">
                          {visualizations.charts[1].data.map((item, index) => (
                            <div key={index}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{item.category}</span>
                                <span className="font-medium">{item.value}%</span>
                              </div>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value}%` }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="h-2 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                        <h5 className="font-semibold mb-3">Key Insights</h5>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Strong performance in formula application</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span>Problem solving needs more practice</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Consistent improvement trend</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <BarChart className="h-4 w-4 mr-2" />
                        View Detailed Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="graphs" className="space-y-6">
              {/* Learning Trend Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visualizations.graphs.map((graph, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
                        {graph.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {graph.description}
                      </p>
                      
                      {/* Simulated Graph Visualization */}
                      <div className="h-32 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300 dark:border-purple-700 mb-4">
                        <div className="text-center">
                          <LineChart className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                          <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                            Interactive {graph.title}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {graph.features.map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                        <LineChart className="h-4 w-4 mr-2" />
                        Analyze Trends
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Summary Analytics Card */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-2">Visual Learning Mastery</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Advanced visualizations help you understand complex physics concepts through interactive exploration.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                  3D Simulations
                </Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                  Real-time Analytics
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                  Interactive Graphs
                </Badge>
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300">
                  Physics Laboratory
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Visual3DContent;
