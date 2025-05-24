
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Lightbulb, Brain, Volume2, VolumeX, Play, Pause, CheckCircle, MessageSquare } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import ReadAloudSection from './concept-detail/ReadAloudSection';

interface EnhancedLearnTabProps {
  conceptName: string;
  isPlaying?: boolean;
  isAudioEnabled?: boolean;
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ 
  conceptName,
  isPlaying = false,
  isAudioEnabled = true
}) => {
  const [activeSubTab, setActiveSubTab] = useState('basic');
  const [readAloudActive, setReadAloudActive] = useState(false);
  const [currentReadingContent, setCurrentReadingContent] = useState('');
  const [sectionProgress, setSectionProgress] = useState({
    basic: 0,
    detailed: 0,
    advanced: 0
  });
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const startReadAloud = (content: string, section: string) => {
    if (!isAudioEnabled) return;
    
    setCurrentReadingContent(content);
    setReadAloudActive(true);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.95;
      utterance.volume = 0.8;
      
      // Track progress
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 2;
        setSectionProgress(prev => ({
          ...prev,
          [section]: Math.min(currentProgress, 100)
        }));
        
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          if (!completedSections.includes(section)) {
            setCompletedSections(prev => [...prev, section]);
          }
        }
      }, 100);
      
      utterance.onend = () => {
        setReadAloudActive(false);
        clearInterval(progressInterval);
        setSectionProgress(prev => ({
          ...prev,
          [section]: 100
        }));
        if (!completedSections.includes(section)) {
          setCompletedSections(prev => [...prev, section]);
        }
      };
      
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

  // Calculate overall progress
  const overallProgress = (sectionProgress.basic + sectionProgress.detailed + sectionProgress.advanced) / 3;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Learn {conceptName}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Structured learning with progress tracking and audio support
          </p>
        </div>
        
        {/* Progress Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-xs text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2 w-32" />
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <CheckCircle className="h-3 w-3" />
            {completedSections.length}/3 sections completed
          </div>
        </div>
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
          <TabsTrigger value="basic" className="relative">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Basic
              {completedSections.includes('basic') && (
                <CheckCircle className="h-3 w-3 text-green-600" />
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger value="detailed" className="relative">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Detailed
              {completedSections.includes('detailed') && (
                <CheckCircle className="h-3 w-3 text-green-600" />
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="relative">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Advanced
              {completedSections.includes('advanced') && (
                <CheckCircle className="h-3 w-3 text-green-600" />
              )}
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Basic Understanding
                  </CardTitle>
                  <CardDescription>
                    Fundamental concepts and definitions
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Progress</div>
                    <div className="text-sm font-medium">{Math.round(sectionProgress.basic)}%</div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => startReadAloud(basicContent, 'basic')}
                    disabled={readAloudActive || !isAudioEnabled}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Read Aloud
                  </Button>
                </div>
              </div>
              {sectionProgress.basic > 0 && (
                <Progress value={sectionProgress.basic} className="h-2 mt-2" />
              )}
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

              {/* AI Tutor Integration */}
              <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-purple-800 dark:text-purple-300">Need more help?</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Ask our AI tutor about basic concepts</p>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask AI Tutor
                  </Button>
                </div>
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
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    Detailed Explanation with Examples
                  </CardTitle>
                  <CardDescription>
                    In-depth understanding with real-world applications
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Progress</div>
                    <div className="text-sm font-medium">{Math.round(sectionProgress.detailed)}%</div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => startReadAloud(detailedContent, 'detailed')}
                    disabled={readAloudActive || !isAudioEnabled}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Read Aloud
                  </Button>
                </div>
              </div>
              {sectionProgress.detailed > 0 && (
                <Progress value={sectionProgress.detailed} className="h-2 mt-2" />
              )}
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

              {/* AI Tutor for Detailed Section */}
              <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-purple-800 dark:text-purple-300">Need examples explained?</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Get detailed explanations from our AI tutor</p>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Explain Examples
                  </Button>
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
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    Advanced Analysis
                  </CardTitle>
                  <CardDescription>
                    Complex applications and mathematical analysis
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Progress</div>
                    <div className="text-sm font-medium">{Math.round(sectionProgress.advanced)}%</div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => startReadAloud(advancedContent, 'advanced')}
                    disabled={readAloudActive || !isAudioEnabled}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Read Aloud
                  </Button>
                </div>
              </div>
              {sectionProgress.advanced > 0 && (
                <Progress value={sectionProgress.advanced} className="h-2 mt-2" />
              )}
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

              {/* Advanced AI Tutor Integration */}
              <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-purple-800 dark:text-purple-300">Complex problem solving?</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Get step-by-step guidance for advanced concepts</p>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Advanced Help
                  </Button>
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
