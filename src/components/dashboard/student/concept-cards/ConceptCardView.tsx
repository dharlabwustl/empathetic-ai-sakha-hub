
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookText, 
  Image, 
  Play, 
  FileAudio2, 
  AlertCircle, 
  Target, 
  Lightbulb,
  BookOpen,
  PenLine,
  Zap,
  Icons,
  Tablet
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ConceptCardProps {
  title: string;
  subject: string;
  chapter: string;
}

const ConceptCardView = ({ title = "Newton's Laws of Motion", subject = "Physics", chapter = "Laws of Motion" }: ConceptCardProps) => {
  const [activeTab, setActiveTab] = useState("explanation");
  const [activeExplanationSubTab, setActiveExplanationSubTab] = useState("text");
  
  return (
    <Card className="w-full shadow-sm border-indigo-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{subject} • {chapter}</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="w-full grid grid-cols-4 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="explanation" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
              <BookText className="mr-2 h-4 w-4" />
              Explanation
            </TabsTrigger>
            <TabsTrigger value="real-world-example" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
              <Lightbulb className="mr-2 h-4 w-4" />
              Real-world Example
            </TabsTrigger>
            <TabsTrigger value="common-mistake" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
              <AlertCircle className="mr-2 h-4 w-4" />
              Common Mistake
            </TabsTrigger>
            <TabsTrigger value="exam-relevance" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
              <Target className="mr-2 h-4 w-4" />
              Exam Relevance
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6">
          <TabsContent value="explanation" className="space-y-4">
            {/* Sub-tabs for different explanation types */}
            <Tabs value={activeExplanationSubTab} onValueChange={setActiveExplanationSubTab}>
              <TabsList className="mb-4 bg-gray-50">
                <TabsTrigger value="text" className="text-sm">
                  <PenLine className="mr-1 h-3 w-3" /> Text
                </TabsTrigger>
                <TabsTrigger value="visual" className="text-sm">
                  <Image className="mr-1 h-3 w-3" /> Visual
                </TabsTrigger>
                <TabsTrigger value="audio" className="text-sm">
                  <FileAudio2 className="mr-1 h-3 w-3" /> Audio
                </TabsTrigger>
                <TabsTrigger value="video" className="text-sm">
                  <Play className="mr-1 h-3 w-3" /> Video
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-0">
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm"
                >
                  <h3 className="text-sm font-medium text-indigo-600 uppercase tracking-wide mb-2">Text Explanation</h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>Newton's laws of motion are three physical laws that describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.</p>
                    <ul>
                      <li><strong>First Law (Law of Inertia):</strong> An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</li>
                      <li><strong>Second Law:</strong> The acceleration of an object depends on the mass of the object and the amount of force applied. (F = ma)</li>
                      <li><strong>Third Law:</strong> For every action, there is an equal and opposite reaction.</li>
                    </ul>
                    <p className="mt-4 text-sm text-gray-600 italic">Tip: Try creating your own examples to understand these principles in everyday situations.</p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="visual" className="mt-0">
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm"
                >
                  <h3 className="text-sm font-medium text-indigo-600 uppercase tracking-wide mb-2">Visual Explanation</h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="flex flex-col items-center justify-center h-48 border border-dashed border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
                      <Image className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-gray-500">Newton's Laws Diagram</span>
                      <p className="text-sm text-gray-400 mt-2 px-4">Interactive visual representation of Newton's three laws with examples</p>
                    </div>
                    <div className="mt-4 flex justify-center gap-2">
                      <Button variant="outline" size="sm">
                        <Image className="mr-2 h-4 w-4" />
                        View Fullscreen
                      </Button>
                      <Button variant="outline" size="sm">
                        <Zap className="mr-2 h-4 w-4" />
                        Interactive Mode
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="audio" className="mt-0">
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm"
                >
                  <h3 className="text-sm font-medium text-indigo-600 uppercase tracking-wide mb-2">Audio Explanation</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0">
                          <Play className="h-4 w-4" />
                        </Button>
                        <div className="ml-3">
                          <span className="text-sm font-medium block">Newton's Laws Explanation</span>
                          <span className="text-xs text-gray-500">5:23 • Narrated by Dr. Roberts</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <FileAudio2 className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    {/* Audio player control */}
                    <div className="mt-4">
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1:50</span>
                        <span>5:23</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Audio Transcript</h4>
                      <div className="bg-white p-3 border border-gray-200 rounded-md max-h-24 overflow-y-auto text-sm text-gray-600">
                        <p>In this audio lesson, we'll explore Newton's three laws of motion, which form the foundation of classical mechanics. First proposed by Sir Isaac Newton in his work "Principia Mathematica" in 1687, these laws explain...</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="video" className="mt-0">
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm"
                >
                  <h3 className="text-sm font-medium text-indigo-600 uppercase tracking-wide mb-2">Video Explanation</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="relative">
                      <div className="flex items-center justify-center h-48 border border-dashed border-gray-300 dark:border-gray-700 rounded bg-black">
                        <Play className="h-12 w-12 text-white opacity-80" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                        4:32
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="font-medium text-sm">Understanding Newton's Laws of Motion</h4>
                      <p className="text-xs text-gray-500">by Prof. Sarah Johnson • 23K views</p>
                    </div>
                    <div className="mt-3 flex justify-between">
                      <Button variant="outline" size="sm">
                        <Tablet className="mr-2 h-4 w-4" />
                        Notes
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Full Video
                      </Button>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Video Description</h4>
                      <div className="bg-white p-3 border border-gray-200 rounded-md max-h-24 overflow-y-auto text-sm text-gray-600">
                        <p>This video provides a comprehensive explanation of Newton's three laws of motion with visual demonstrations and real-world examples to help you understand and remember these fundamental principles of physics.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="real-world-example">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Real-world Example</h3>
              <p><strong>Rocket Launch:</strong> When a rocket takes off, it expels gas downwards (action) and experiences an upward thrust (reaction), demonstrating Newton's Third Law.</p>
              <p><strong>Car Braking:</strong> When you apply brakes in a moving car, your body tends to continue moving forward due to inertia (Newton's First Law).</p>
              <p><strong>Pushing a Shopping Cart:</strong> The same force will accelerate a lighter shopping cart more than a heavier one, illustrating Newton's Second Law (F = ma).</p>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg mt-4">
                <h4 className="text-indigo-800 dark:text-indigo-300 font-medium mb-2">Try This Yourself</h4>
                <p className="text-sm">Place a coin on a card over a glass, then quickly flick the card horizontally. The coin will drop into the glass due to inertia (Newton's First Law).</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="common-mistake">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Common Mistakes to Avoid</h3>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4">
                <h4 className="text-red-700 dark:text-red-300 font-medium">Misconception: No Force Means No Motion</h4>
                <p className="text-sm">Students often think an object needs a constant force to keep moving. According to Newton's First Law, an object will continue moving at constant velocity without any net force.</p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4">
                <h4 className="text-red-700 dark:text-red-300 font-medium">Misconception: Mass and Weight are the Same</h4>
                <p className="text-sm">Mass is the amount of matter (constant), while weight is a force due to gravity (varies with location). Using these interchangeably in Newton's Second Law calculations leads to errors.</p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h4 className="text-red-700 dark:text-red-300 font-medium">Calculation Error: Force Direction</h4>
                <p className="text-sm">When solving problems, forgetting that forces are vectors and have direction often leads to incorrect answers. Always consider both magnitude and direction.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="exam-relevance">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Exam Relevance</h3>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                <h4 className="text-green-700 dark:text-green-300 font-medium">Importance in JEE/NEET</h4>
                <p className="text-sm">Newton's Laws are considered fundamental concepts and typically account for 6-8 marks in JEE Main and 3-4 questions in NEET Physics.</p>
              </div>
              
              <div className="space-y-3 mt-4">
                <h4 className="font-medium">Common Exam Question Types</h4>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <p className="text-sm font-medium">Numerical Problem Solving</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Calculating force, acceleration, or mass using F = ma.</p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <p className="text-sm font-medium">Conceptual Understanding</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Identifying forces acting in a given situation.</p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <p className="text-sm font-medium">Application Based</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Applying Newton's laws to real-world scenarios.</p>
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-4">
                <h4 className="text-purple-700 dark:text-purple-300 font-medium">Tips for Exam Success</h4>
                <ul className="text-sm space-y-1">
                  <li>Practice problems with varying complexities.</li>
                  <li>Focus on free-body diagrams for force analysis.</li>
                  <li>Remember the specific conditions for each law.</li>
                  <li>Master the units and dimensions for force calculations.</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default ConceptCardView;
