import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Lightbulb, Brain, Volume2, VolumeX, Play, Pause, RotateCcw, CheckCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedLearnTabProps {
  conceptName: string;
  isPlaying?: boolean;
  audioEnabled?: boolean;
  onPlayStateChange?: (playing: boolean) => void;
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ 
  conceptName, 
  isPlaying, 
  audioEnabled, 
  onPlayStateChange 
}) => {
  const [activeSubTab, setActiveSubTab] = useState('basic');
  const [readAloudActive, setReadAloudActive] = useState(false);
  const [currentReadingContent, setCurrentReadingContent] = useState('');
  const [progress, setProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState({ basic: 0, detailed: 0, advanced: 0 });
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  useEffect(() => {
    if (isPlaying && audioEnabled) {
      startReadAloud(getCurrentContent());
    } else {
      stopReadAloud();
    }
  }, [isPlaying, audioEnabled, activeSubTab]);

  const getCurrentContent = () => {
    switch (activeSubTab) {
      case 'basic':
        return `What is ${conceptName}? Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass. This fundamental principle of physics helps us understand how forces affect motion in our everyday world.`;
      case 'detailed':
        return `Newton's Second Law is fundamental to understanding motion. It tells us that when a net force acts on an object, it will accelerate in the direction of that force. The greater the force, the greater the acceleration. However, the more massive an object is, the less it will accelerate for the same force. This relationship is expressed mathematically as F equals m times a, where F is force measured in Newtons, m is mass in kilograms, and a is acceleration in meters per second squared.`;
      case 'advanced':
        return `The advanced mathematical framework of Newton's Second Law extends beyond simple scalar equations to vector analysis. In vector form, the sum of all forces equals mass times acceleration vector. This allows us to analyze complex systems where forces act in multiple directions simultaneously. Component analysis becomes crucial when dealing with inclined planes, circular motion, and other complex scenarios where forces must be resolved into perpendicular components.`;
      default:
        return '';
    }
  };

  const startReadAloud = (content: string) => {
    setCurrentReadingContent(content);
    setReadAloudActive(true);
    
    if ('speechSynthesis' in window && audioEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.95;
      utterance.volume = 0.8;
      utterance.onend = () => {
        setReadAloudActive(false);
        onPlayStateChange?.(false);
        markSectionCompleted(activeSubTab);
      };
      utterance.onboundary = (event) => {
        const progress = (event.charIndex / content.length) * 100;
        setSectionProgress(prev => ({ ...prev, [activeSubTab]: progress }));
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

  const markSectionCompleted = (section: string) => {
    if (!completedSections.includes(section)) {
      setCompletedSections(prev => [...prev, section]);
    }
    setSectionProgress(prev => ({ ...prev, [section]: 100 }));
  };

  const handleLocalPlayPause = () => {
    const newPlayState = !readAloudActive;
    if (newPlayState) {
      startReadAloud(getCurrentContent());
    } else {
      stopReadAloud();
    }
    onPlayStateChange?.(newPlayState);
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Learn {conceptName}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLocalPlayPause}
            className="flex items-center gap-2"
          >
            {readAloudActive ? (
              <>
                <Pause className="h-4 w-4" />
                Pause Audio
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Play Audio
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              stopReadAloud();
              setSectionProgress(prev => ({ ...prev, [activeSubTab]: 0 }));
            }}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm text-gray-600">{completedSections.length}/3 sections completed</span>
        </div>
        <Progress value={(completedSections.length / 3) * 100} className="h-2" />
      </motion.div>

      {readAloudActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Reading Section</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={stopReadAloud}
              className="text-blue-600 hover:text-blue-800"
            >
              <VolumeX className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={sectionProgress[activeSubTab]} className="h-1" />
        </motion.div>
      )}

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 rounded-xl p-1">
          <TabsTrigger value="basic" className="relative">
            <BookOpen className="h-4 w-4 mr-2" />
            Basic
            {completedSections.includes('basic') && (
              <CheckCircle className="h-3 w-3 ml-1 text-green-500" />
            )}
          </TabsTrigger>
          <TabsTrigger value="detailed" className="relative">
            <Lightbulb className="h-4 w-4 mr-2" />
            Detailed
            {completedSections.includes('detailed') && (
              <CheckCircle className="h-3 w-3 ml-1 text-green-500" />
            )}
          </TabsTrigger>
          <TabsTrigger value="advanced" className="relative">
            <Brain className="h-4 w-4 mr-2" />
            Advanced
            {completedSections.includes('advanced') && (
              <CheckCircle className="h-3 w-3 ml-1 text-green-500" />
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Basic Understanding
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => startReadAloud(getCurrentContent())}
                    disabled={readAloudActive}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Read Aloud
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    AI Tutor
                  </Button>
                </div>
              </div>
              <CardDescription className="text-blue-100">
                Fundamental concepts and definitions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <motion.div 
                className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-bold text-lg mb-3 text-blue-800 dark:text-blue-300">What is {conceptName}?</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-green-50 dark:bg-green-950/30 p-6 rounded-xl border border-green-200 dark:border-green-800"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-bold text-lg mb-3 text-green-800 dark:text-green-300">Key Formula</h3>
                <div className="text-4xl font-bold text-center py-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-300 dark:border-green-700">
                  F = m × a
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                  Where F is force (N), m is mass (kg), and a is acceleration (m/s²)
                </p>
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { symbol: 'F', name: 'Force', unit: 'Newtons (N)', color: 'blue' },
                  { symbol: 'm', name: 'Mass', unit: 'Kilograms (kg)', color: 'green' },
                  { symbol: 'a', name: 'Acceleration', unit: 'm/s²', color: 'purple' }
                ].map((item, index) => (
                  <div key={index} className={`text-center p-6 bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-xl border border-${item.color}-200 dark:border-${item.color}-800`}>
                    <div className={`text-4xl font-bold text-${item.color}-600 mb-2`}>{item.symbol}</div>
                    <div className="text-lg font-medium text-gray-800 dark:text-gray-200">{item.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{item.unit}</div>
                  </div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="mt-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Detailed Explanation with Examples
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => startReadAloud(getCurrentContent())}
                    disabled={readAloudActive}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Read Aloud
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    AI Tutor
                  </Button>
                </div>
              </div>
              <CardDescription className="text-orange-100">
                In-depth understanding with real-world applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
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
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Advanced Analysis
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => startReadAloud(getCurrentContent())}
                    disabled={readAloudActive}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Read Aloud
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    AI Tutor
                  </Button>
                </div>
              </div>
              <CardDescription className="text-indigo-100">
                Complex applications and mathematical analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
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
