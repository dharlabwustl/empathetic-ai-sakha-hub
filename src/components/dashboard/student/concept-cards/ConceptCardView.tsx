
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookText, Image, Play, FileAudio2, AlertCircle, Target, Lightbulb } from 'lucide-react';

interface ConceptCardProps {
  title: string;
  subject: string;
  chapter: string;
}

const ConceptCardView = ({ title = "Newton's Laws of Motion", subject = "Physics", chapter = "Laws of Motion" }: ConceptCardProps) => {
  const [activeTab, setActiveTab] = useState("explanation");
  
  return (
    <Card className="w-full shadow-sm">
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
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Text</h3>
              <div className="prose dark:prose-invert max-w-none">
                <p>Newton's laws of motion are three physical laws that describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.</p>
                <ul>
                  <li><strong>First Law (Law of Inertia):</strong> An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</li>
                  <li><strong>Second Law:</strong> The acceleration of an object depends on the mass of the object and the amount of force applied. (F = ma)</li>
                  <li><strong>Third Law:</strong> For every action, there is an equal and opposite reaction.</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Image/Diagram</h3>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center h-48 border border-dashed border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
                  <Image className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500">Newton's Laws Diagram</span>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Image className="mr-2 h-4 w-4" />
                  View Fullscreen
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Audio</h3>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0">
                      <Play className="h-4 w-4" />
                    </Button>
                    <span className="ml-2 text-sm">Newton's Laws Explanation</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileAudio2 className="mr-2 h-4 w-4" />
                    Download Audio
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Video</h3>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-center h-48 border border-dashed border-gray-300 dark:border-gray-700 rounded bg-black">
                  <Play className="h-12 w-12 text-white opacity-80" />
                </div>
                <div className="mt-2 flex justify-end">
                  <Button variant="outline" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Play Video
                  </Button>
                </div>
              </div>
            </div>
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
