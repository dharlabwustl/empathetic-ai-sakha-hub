
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Eye, 
  Cube, 
  Calculator, 
  Video, 
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Play,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface EnhancedLearningTabsProps {
  conceptId: string;
  conceptTitle: string;
  onFormulaLabClick: () => void;
}

const EnhancedLearningTabs: React.FC<EnhancedLearningTabsProps> = ({
  conceptId,
  conceptTitle,
  onFormulaLabClick
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [learnSubTab, setLearnSubTab] = useState('basic');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        <Tabs defaultValue="learn" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-50 dark:bg-gray-900 p-1 rounded-t-lg">
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="visual" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="3d" className="flex items-center gap-2">
              <Cube className="h-4 w-4" />
              3D Sim
            </TabsTrigger>
            <TabsTrigger value="formula" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Formula
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video
            </TabsTrigger>
            <TabsTrigger value="mistakes" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Mistakes
            </TabsTrigger>
          </TabsList>

          {/* Learn Tab with Sub-tabs */}
          <TabsContent value="learn" className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Comprehensive Learning Content</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Master {conceptTitle} through structured learning paths
              </p>
            </div>

            <Tabs value={learnSubTab} onValueChange={setLearnSubTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="detailed">Detailed</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
                    Basic Understanding
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Newton's Laws of Motion form the foundation of classical mechanics, describing the relationship between forces and motion.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border-l-4 border-blue-500">
                      <h5 className="font-medium mb-2">First Law (Law of Inertia)</h5>
                      <p className="text-sm">An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an external force.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border-l-4 border-green-500">
                      <h5 className="font-medium mb-2">Second Law (F = ma)</h5>
                      <p className="text-sm">The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border-l-4 border-purple-500">
                      <h5 className="font-medium mb-2">Third Law (Action-Reaction)</h5>
                      <p className="text-sm">For every action, there is an equal and opposite reaction.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="space-y-6">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Detailed Analysis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium mb-2">Mathematical Formulation</h5>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded font-mono text-center text-lg">
                          ΣF = ma
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          Where ΣF is the net force, m is mass, and a is acceleration
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Vector Nature</h5>
                        <p className="text-sm">
                          Force and acceleration are vector quantities, meaning they have both magnitude and direction. The equation applies in all three dimensions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Real-World Applications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded">
                        <h6 className="font-medium">Automotive Safety</h6>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Seatbelts and airbags use Newton's laws to protect passengers during collisions.</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded">
                        <h6 className="font-medium">Rocket Propulsion</h6>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Rockets work by expelling mass at high velocity, creating thrust through Newton's third law.</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded">
                        <h6 className="font-medium">Sports Physics</h6>
                        <p className="text-sm text-gray-600 dark:text-gray-400">From baseball pitches to gymnastics, all sports movements follow Newton's laws.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-4">Advanced Concepts</h4>
                  <div className="space-y-4">
                    <div 
                      className="bg-white dark:bg-gray-800 p-4 rounded cursor-pointer"
                      onClick={() => toggleSection('reference-frames')}
                    >
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">Reference Frames & Relativity</h5>
                        {expandedSection === 'reference-frames' ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </div>
                      {expandedSection === 'reference-frames' && (
                        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                          <p>Newton's laws are only valid in inertial reference frames. In non-inertial frames, fictitious forces like centrifugal and Coriolis forces must be considered.</p>
                        </div>
                      )}
                    </div>

                    <div 
                      className="bg-white dark:bg-gray-800 p-4 rounded cursor-pointer"
                      onClick={() => toggleSection('limitations')}
                    >
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">Limitations & Modern Physics</h5>
                        {expandedSection === 'limitations' ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </div>
                      {expandedSection === 'limitations' && (
                        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                          <p>Newton's laws break down at very high speeds (approaching the speed of light) where special relativity takes over, and at quantum scales where quantum mechanics applies.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Visual Tab */}
          <TabsContent value="visual" className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Interactive Visual Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore concepts through interactive diagrams and visualizations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Force Vector Diagrams</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Interactive diagrams showing how multiple forces combine to create net force and resulting acceleration.
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Play className="h-4 w-4 mr-2" />
                    Launch Interactive Diagram
                  </Button>
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Free Body Diagrams</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Visualize all forces acting on objects in different scenarios with step-by-step construction.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Play className="h-4 w-4 mr-2" />
                    Create Free Body Diagram
                  </Button>
                </div>
              </div>

              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300 dark:border-blue-700">
                <div className="text-center">
                  <Eye className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Visual Learning Space</p>
                  <p className="text-sm text-blue-500 dark:text-blue-300 mt-1">Interactive content loads here</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 3D Simulation Tab */}
          <TabsContent value="3d" className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">3D Simulations</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Immersive 3D simulations for hands-on learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Collision Lab</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Experiment with elastic and inelastic collisions in a 3D environment.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Cube className="h-4 w-4 mr-2" />
                  Launch Simulation
                </Button>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Force Vectors</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Visualize force vectors in 3D space and see their effects on motion.
                </p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Cube className="h-4 w-4 mr-2" />
                  Explore Forces
                </Button>
              </div>

              <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Orbital Motion</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Understand planetary motion and gravitational forces in 3D.
                </p>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Cube className="h-4 w-4 mr-2" />
                  Start Orbit Sim
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Formula Tab */}
          <TabsContent value="formula" className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Formula Deep Dive</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Master the mathematical foundations with detailed explanations and examples
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">Newton's Second Law: F = ma</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-3">Formula Breakdown</h5>
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <span className="font-mono text-lg">F = </span>
                        <span className="text-sm">Net force (Newtons)</span>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <span className="font-mono text-lg">m = </span>
                        <span className="text-sm">Mass (Kilograms)</span>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <span className="font-mono text-lg">a = </span>
                        <span className="text-sm">Acceleration (m/s²)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-3">Worked Example</h5>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded">
                      <p className="text-sm mb-2"><strong>Problem:</strong> A 2kg object experiences a 10N force. Find its acceleration.</p>
                      <p className="text-sm mb-2"><strong>Given:</strong> m = 2kg, F = 10N</p>
                      <p className="text-sm mb-2"><strong>Formula:</strong> F = ma → a = F/m</p>
                      <p className="text-sm"><strong>Solution:</strong> a = 10N ÷ 2kg = 5 m/s²</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    onClick={onFormulaLabClick}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Open Formula Lab for Practice
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">Alternative Forms & Units</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded text-center">
                    <div className="font-mono text-lg mb-2">a = F/m</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Solving for acceleration</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded text-center">
                    <div className="font-mono text-lg mb-2">m = F/a</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Solving for mass</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded text-center">
                    <div className="font-mono text-lg mb-2">1N = 1kg⋅m/s²</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Unit definition</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Video Tab */}
          <TabsContent value="video" className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Video Tutorial Library</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn from expert explanations and visual demonstrations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Newton's Laws Explained", duration: "12:45", level: "Beginner" },
                { title: "Force and Motion Lab", duration: "18:30", level: "Intermediate" },
                { title: "Advanced Applications", duration: "25:15", level: "Advanced" }
              ].map((video, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-2">{video.title}</h4>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                      <span>{video.duration}</span>
                      <Badge variant="outline">{video.level}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Mistakes Tab */}
          <TabsContent value="mistakes" className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Common Mistakes & Misconceptions</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn from typical errors and previous year questions
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-red-50 dark:bg-red-950/30 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4 text-red-800 dark:text-red-300">
                  Top 5 Common Mistakes
                </h4>
                <div className="space-y-4">
                  {[
                    "Confusing mass and weight",
                    "Ignoring friction in calculations", 
                    "Mixing up action-reaction pairs",
                    "Forgetting vector nature of forces",
                    "Misapplying Newton's first law"
                  ].map((mistake, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded border-l-4 border-red-500">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium mb-1">{mistake}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Click to see detailed explanation and how to avoid this mistake.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4 text-amber-800 dark:text-amber-300">
                  Previous Year Questions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { year: "2023", difficulty: "Medium", topic: "Force calculations" },
                    { year: "2022", difficulty: "Hard", topic: "Collision problems" },
                    { year: "2021", difficulty: "Easy", topic: "Basic concepts" },
                    { year: "2020", difficulty: "Medium", topic: "Applications" }
                  ].map((question, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{question.year}</span>
                        <Badge 
                          variant="outline"
                          className={
                            question.difficulty === 'Easy' ? 'border-green-500 text-green-700' :
                            question.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                            'border-red-500 text-red-700'
                          }
                        >
                          {question.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{question.topic}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedLearningTabs;
