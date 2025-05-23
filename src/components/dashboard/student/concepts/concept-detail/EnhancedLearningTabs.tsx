
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Eye, 
  Box, 
  Calculator, 
  Play, 
  AlertTriangle,
  Volume2,
  VolumeX,
  ExternalLink,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface EnhancedLearningTabsProps {
  conceptData: any;
  activeReadAloud: string | null;
  onReadAloud: (content: string, sectionId: string) => void;
}

const EnhancedLearningTabs: React.FC<EnhancedLearningTabsProps> = ({
  conceptData,
  activeReadAloud,
  onReadAloud
}) => {
  const navigate = useNavigate();
  const [activeLearnTab, setActiveLearnTab] = useState('basic');

  const learnContent = {
    basic: {
      title: "Basic Understanding",
      content: `Newton's Laws of Motion are three fundamental principles that describe the relationship between forces acting on a body and its motion. These laws form the foundation of classical mechanics and help us understand how objects move in our everyday world.

The three laws are:
1. First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.
2. Second Law: The force acting on an object equals its mass times its acceleration (F = ma).
3. Third Law: For every action, there is an equal and opposite reaction.`,
      examples: [
        "A ball rolling on the ground eventually stops due to friction (First Law)",
        "Pushing a heavy box requires more force than a light box (Second Law)",
        "When you walk, you push against the ground, and the ground pushes back (Third Law)"
      ]
    },
    detailed: {
      title: "Detailed Explanation",
      content: `Newton's Laws provide a comprehensive framework for understanding motion and forces in classical mechanics.

**First Law (Inertia):** This law defines the concept of inertia - the tendency of objects to resist changes in their state of motion. In the absence of external forces, an object's velocity remains constant. This includes being at rest (zero velocity) or moving in a straight line at constant speed.

**Second Law (F = ma):** This quantitative law relates force, mass, and acceleration. It tells us that acceleration is directly proportional to the net force and inversely proportional to mass. This law allows us to calculate unknown quantities when others are known.

**Third Law (Action-Reaction):** Forces always occur in pairs. When object A exerts a force on object B, object B simultaneously exerts an equal magnitude force in the opposite direction on object A. These forces act on different objects, so they don't cancel each other out.`,
      examples: [
        "A car's seatbelt demonstrates the first law during sudden stops",
        "Rockets work by expelling gas downward, and the reaction force pushes the rocket upward",
        "The force needed to accelerate a truck is much greater than for a bicycle"
      ]
    },
    advanced: {
      title: "Advanced Applications",
      content: `Newton's Laws have profound implications in advanced physics and engineering applications.

**Non-inertial Reference Frames:** Newton's laws are strictly valid only in inertial reference frames. In accelerating frames, fictitious forces (like centrifugal force) appear to act on objects.

**System of Particles:** For a system of particles, Newton's second law can be applied to the center of mass, treating the entire system as a single particle with total mass located at the center of mass.

**Limitations:** Newton's laws break down at very high speeds (approaching the speed of light) where relativistic effects become significant, and at atomic scales where quantum mechanics governs behavior.

**Engineering Applications:** These laws are fundamental in designing everything from bridges and buildings to spacecraft trajectories and automotive safety systems.`,
      examples: [
        "GPS satellites must account for relativistic effects that violate classical mechanics",
        "Gyroscopes in smartphones use rotational inertia for orientation sensing",
        "Space missions use gravitational slingshots based on conservation of momentum"
      ]
    }
  };

  const ReadAloudButton = ({ content, sectionId }: { content: string; sectionId: string }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onReadAloud(content, sectionId)}
      className={`flex items-center gap-2 ${activeReadAloud === sectionId ? 'bg-blue-100 border-blue-300' : ''}`}
    >
      {activeReadAloud === sectionId ? (
        <>
          <VolumeX className="h-4 w-4" />
          Stop Reading
        </>
      ) : (
        <>
          <Volume2 className="h-4 w-4" />
          Read Aloud
        </>
      )}
    </Button>
  );

  return (
    <Card className="border-2 border-blue-100 dark:border-blue-800">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Enhanced Learning Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="learn">
          <TabsList className="grid grid-cols-6 w-full rounded-none border-b">
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="visual" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="3d" className="flex items-center gap-2">
              <Box className="h-4 w-4" />
              3D
            </TabsTrigger>
            <TabsTrigger value="formula" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Formula
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Video
            </TabsTrigger>
            <TabsTrigger value="mistakes" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Mistakes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Comprehensive Learning Content</h3>
                <ReadAloudButton content={learnContent[activeLearnTab as keyof typeof learnContent].content} sectionId="learn-main" />
              </div>
              
              <Tabs value={activeLearnTab} onValueChange={setActiveLearnTab}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                {Object.entries(learnContent).map(([key, content]) => (
                  <TabsContent key={key} value={key} className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                              {content.title}
                            </h4>
                            <ReadAloudButton content={content.content} sectionId={`learn-${key}`} />
                          </div>
                          <div className="prose dark:prose-invert max-w-none">
                            {content.content.split('\n\n').map((paragraph, idx) => (
                              <p key={idx} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="h-5 w-5 text-yellow-500" />
                            <h4 className="text-lg font-semibold">Real-World Examples</h4>
                          </div>
                          <div className="grid gap-3">
                            {content.examples.map((example, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                                <Target className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-700 dark:text-gray-300">{example}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="visual" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Interactive Visual Diagrams</h3>
                <ReadAloudButton content="Visual representations help understand the concepts through interactive diagrams and simulations." sectionId="visual-main" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Force Vectors",
                    description: "Interactive diagram showing force vectors and their resultants",
                    content: "Visualize how different forces combine to create net force, demonstrating vector addition principles."
                  },
                  {
                    title: "Free Body Diagrams",
                    description: "Create and analyze free body diagrams for various scenarios",
                    content: "Practice identifying all forces acting on objects in different situations."
                  },
                  {
                    title: "Motion Graphs",
                    description: "Real-time position, velocity, and acceleration graphs",
                    content: "See how Newton's laws relate to motion through dynamic graphical representations."
                  },
                  {
                    title: "Action-Reaction Pairs",
                    description: "Visualize Newton's third law with interactive examples",
                    content: "Understand how action-reaction pairs work in various physical situations."
                  }
                ].map((visual, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                        <Eye className="h-12 w-12 text-indigo-500" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{visual.title}</h4>
                          <ReadAloudButton content={visual.content} sectionId={`visual-${index}`} />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{visual.description}</p>
                        <Button className="w-full">Launch Interactive Diagram</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="3d" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">3D Simulations</h3>
                <ReadAloudButton content="Immersive 3D simulations bring physics concepts to life with interactive experiments." sectionId="3d-main" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-2">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center mb-4">
                      <Box className="h-16 w-16 text-purple-500" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Collision Laboratory</h4>
                        <ReadAloudButton content="Experiment with elastic and inelastic collisions to understand momentum conservation and Newton's laws in action." sectionId="3d-collision" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Experiment with elastic and inelastic collisions to understand momentum conservation
                      </p>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Launch 3D Collision Lab
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="formula" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Formula Deep Dive</h3>
                <div className="flex gap-2">
                  <ReadAloudButton content="Newton's second law F equals ma is fundamental to understanding motion and forces." sectionId="formula-main" />
                  <Button 
                    onClick={() => navigate(`/dashboard/student/concepts/${conceptData.id}/formula-lab`)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Formula Lab
                  </Button>
                </div>
              </div>
              
              <Card className="border-2 border-green-200 dark:border-green-800">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-green-600" />
                    Newton's Second Law: F = ma
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                      F = ma
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Force equals mass times acceleration</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-2">F</div>
                        <h4 className="font-semibold mb-1">Force</h4>
                        <p className="text-sm text-gray-600">Measured in Newtons (N)</p>
                        <p className="text-xs text-gray-500 mt-1">Push or pull on object</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-red-600 mb-2">m</div>
                        <h4 className="font-semibold mb-1">Mass</h4>
                        <p className="text-sm text-gray-600">Measured in kilograms (kg)</p>
                        <p className="text-xs text-gray-500 mt-1">Amount of matter</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-2">a</div>
                        <h4 className="font-semibold mb-1">Acceleration</h4>
                        <p className="text-sm text-gray-600">Measured in m/s²</p>
                        <p className="text-xs text-gray-500 mt-1">Rate of velocity change</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      Worked Example
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Problem:</strong> A 10 kg box is pushed with a force of 50 N. What is its acceleration?</p>
                      <p><strong>Given:</strong> m = 10 kg, F = 50 N</p>
                      <p><strong>Find:</strong> a = ?</p>
                      <p><strong>Solution:</strong> F = ma → a = F/m = 50 N ÷ 10 kg = 5 m/s²</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="video" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Video Tutorial Library</h3>
                <ReadAloudButton content="Comprehensive video tutorials explain Newton's laws with visual demonstrations and real-world examples." sectionId="video-main" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Introduction to Newton's Laws", duration: "12:30", level: "Beginner" },
                  { title: "Advanced Applications", duration: "18:45", level: "Advanced" },
                  { title: "Real-World Examples", duration: "15:20", level: "Intermediate" },
                  { title: "Problem Solving Techniques", duration: "22:10", level: "Advanced" }
                ].map((video, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                        <Play className="h-12 w-12 text-red-500" />
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold">{video.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{video.level}</Badge>
                          <span className="text-sm text-gray-600">{video.duration}</span>
                        </div>
                        <Button className="w-full">Watch Video</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mistakes" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Common Mistakes & Previous Year Questions</h3>
                <ReadAloudButton content="Learn from common mistakes and practice with previous year examination questions." sectionId="mistakes-main" />
              </div>
              
              <Card className="border-2 border-red-200 dark:border-red-800">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Common Mistakes to Avoid
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        mistake: "Confusing mass and weight",
                        explanation: "Mass is measured in kg and is constant everywhere. Weight is a force (mg) and varies with gravity.",
                        tip: "Remember: Weight = mg, where g changes based on location"
                      },
                      {
                        mistake: "Misunderstanding Newton's Third Law",
                        explanation: "Action-reaction pairs act on different objects, not the same object.",
                        tip: "Always identify which object each force acts upon"
                      },
                      {
                        mistake: "Ignoring friction in calculations",
                        explanation: "Real-world problems often involve friction forces that must be considered.",
                        tip: "Draw free-body diagrams to identify all forces"
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border-l-4 border-red-500">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-red-900 dark:text-red-100">{item.mistake}</h4>
                          <ReadAloudButton content={`${item.mistake}. ${item.explanation}. ${item.tip}`} sectionId={`mistake-${index}`} />
                        </div>
                        <p className="text-red-800 dark:text-red-200 mb-2">{item.explanation}</p>
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">{item.tip}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Previous Year Questions Practice</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-16 justify-start">
                      <div className="text-left">
                        <div className="font-semibold">JEE Main 2023</div>
                        <div className="text-sm text-gray-600">15 questions available</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-16 justify-start">
                      <div className="text-left">
                        <div className="font-semibold">NEET 2023</div>
                        <div className="text-sm text-gray-600">12 questions available</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedLearningTabs;
