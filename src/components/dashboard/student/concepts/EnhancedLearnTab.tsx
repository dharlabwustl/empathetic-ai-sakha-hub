
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Lightbulb, Brain, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import ReadAloudSection from './concept-detail/ReadAloudSection';

interface EnhancedLearnTabProps {
  conceptName: string;
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ conceptName }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('basic');
  const [readAloudActive, setReadAloudActive] = useState(false);
  const [currentReadingContent, setCurrentReadingContent] = useState('');

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  const startReadAloud = (content: string) => {
    setCurrentReadingContent(content);
    setReadAloudActive(true);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.95;
      utterance.volume = 0.8;
      utterance.onend = () => setReadAloudActive(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopReadAloud = () => {
    setReadAloudActive(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const basicContent = `What is ${conceptName}? Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass. This fundamental principle of physics helps us understand how forces affect motion in our everyday world.`;

  const detailedContent = `Newton's Second Law is fundamental to understanding motion. It tells us that when a net force acts on an object, it will accelerate in the direction of that force. The greater the force, the greater the acceleration. However, the more massive an object is, the less it will accelerate for the same force. This relationship is expressed mathematically as F equals m times a, where F is force measured in Newtons, m is mass in kilograms, and a is acceleration in meters per second squared.`;

  const advancedContent = `The advanced mathematical framework of Newton's Second Law extends beyond simple scalar equations to vector analysis. In vector form, the sum of all forces equals mass times acceleration vector. This allows us to analyze complex systems where forces act in multiple directions simultaneously. Component analysis becomes crucial when dealing with inclined planes, circular motion, and other complex scenarios where forces must be resolved into perpendicular components.`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Learn {conceptName}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleAudio}
          className="flex items-center gap-2"
        >
          {isAudioPlaying ? (
            <>
              <VolumeX className="h-4 w-4" />
              Mute Audio
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4" />
              Enable Audio
            </>
          )}
        </Button>
      </div>

      {readAloudActive && (
        <ReadAloudSection 
          text={currentReadingContent}
          isActive={readAloudActive}
          onStop={stopReadAloud}
        />
      )}

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">
            <BookOpen className="h-4 w-4 mr-2" />
            Basic
          </TabsTrigger>
          <TabsTrigger value="detailed">
            <Lightbulb className="h-4 w-4 mr-2" />
            Detailed with Examples
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Brain className="h-4 w-4 mr-2" />
            Advanced Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Basic Understanding
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => startReadAloud(basicContent)}
                  disabled={readAloudActive}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Read Aloud
                </Button>
              </div>
              <CardDescription>
                Fundamental concepts and definitions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">What is {conceptName}?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Key Formula</h3>
                <div className="text-2xl font-bold text-center py-4 bg-white dark:bg-gray-800 rounded-lg">
                  F = m × a
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Where F is force (N), m is mass (kg), and a is acceleration (m/s²)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">F</div>
                  <div className="text-sm font-medium">Force</div>
                  <div className="text-xs text-gray-500">Newtons (N)</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">m</div>
                  <div className="text-sm font-medium">Mass</div>
                  <div className="text-xs text-gray-500">Kilograms (kg)</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">a</div>
                  <div className="text-sm font-medium">Acceleration</div>
                  <div className="text-xs text-gray-500">m/s²</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Detailed Explanation with Examples
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => startReadAloud(detailedContent)}
                  disabled={readAloudActive}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Read Aloud
                </Button>
              </div>
              <CardDescription>
                In-depth understanding with real-world applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Detailed Concept</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Newton's Second Law is fundamental to understanding motion. It tells us that when a net force acts on an object, 
                  it will accelerate in the direction of that force. The greater the force, the greater the acceleration. 
                  However, the more massive an object is, the less it will accelerate for the same force.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2 text-blue-600">Direct Proportionality</h4>
                    <p className="text-sm">If force increases, acceleration increases (assuming constant mass)</p>
                    <div className="mt-2 text-xs bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                      Example: Pushing a shopping cart harder makes it accelerate faster
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2 text-red-600">Inverse Proportionality</h4>
                    <p className="text-sm">If mass increases, acceleration decreases (assuming constant force)</p>
                    <div className="mt-2 text-xs bg-red-100 dark:bg-red-900/30 p-2 rounded">
                      Example: Same push on a full vs empty cart - empty cart accelerates more
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Practical Examples</h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-green-600 mb-2">Example 1: Car Acceleration</h4>
                    <p className="text-sm mb-2">A 1000 kg car experiences a 3000 N force from its engine.</p>
                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-sm">
                      a = F/m = 3000 N / 1000 kg = 3 m/s²
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-green-600 mb-2">Example 2: Falling Objects</h4>
                    <p className="text-sm mb-2">A 2 kg object falls under gravity (9.8 m/s²).</p>
                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-sm">
                      F = m × a = 2 kg × 9.8 m/s² = 19.6 N
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Advanced Analysis
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => startReadAloud(advancedContent)}
                  disabled={readAloudActive}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Read Aloud
                </Button>
              </div>
              <CardDescription>
                Complex applications and mathematical analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Advanced Mathematical Framework</h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Vector Form</h4>
                    <div className="text-center text-lg font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      ∑F⃗ = ma⃗
                    </div>
                    <p className="text-sm mt-2">The net force vector equals mass times acceleration vector</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">Component Analysis</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      <div>Fx = max</div>
                      <div>Fy = may</div>
                    </div>
                    <p className="text-sm mt-2">Forces and accelerations can be analyzed in components</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Complex Applications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-indigo-600 mb-2">Inclined Planes</h4>
                    <p className="text-sm mb-2">Force components on an incline:</p>
                    <div className="text-xs font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                      F∥ = mg sin θ<br/>
                      F⊥ = mg cos θ
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-indigo-600 mb-2">Circular Motion</h4>
                    <p className="text-sm mb-2">Centripetal force application:</p>
                    <div className="text-xs font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                      Fc = mac = mv²/r
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Problem-Solving Strategy</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Identify all forces acting on the object</li>
                  <li>Draw a free-body diagram</li>
                  <li>Choose a coordinate system</li>
                  <li>Apply Newton's Second Law in component form</li>
                  <li>Solve the resulting equations</li>
                  <li>Check units and reasonableness</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedLearnTab;
