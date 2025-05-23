
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Eye, Image, BarChart, LineChart, Play, Lightbulb, ArrowRight } from 'lucide-react';

interface Visual3DContentProps {
  conceptName: string;
}

const Visual3DContent: React.FC<Visual3DContentProps> = ({ conceptName }) => {
  const [activeVisualization, setActiveVisualization] = useState<string | null>(null);

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
                        
                        <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center border-2 border-dashed border-indigo-300 dark:border-indigo-700">
                          <div className="text-center">
                            <Eye className="h-12 w-12 mx-auto mb-2 text-indigo-500" />
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                              {diagram.title}
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
                        
                        <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg flex items-center justify-center border-2 border-dashed border-green-300 dark:border-green-700">
                          <div className="text-center">
                            <BarChart className="h-12 w-12 mx-auto mb-2 text-green-500" />
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
                        
                        <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300 dark:border-purple-700">
                          <div className="text-center">
                            <LineChart className="h-12 w-12 mx-auto mb-2 text-purple-500" />
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
