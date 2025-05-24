
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Lightbulb, Brain, Volume2, VolumeX, Play, Pause, CheckCircle, MessageSquare } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import ReadAloudSection from './concept-detail/ReadAloudSection';
import { motion } from 'framer-motion';

interface GlobalAudioState {
  isPlaying: boolean;
  isEnabled: boolean;
  progress: number;
}

interface EnhancedLearnTabProps {
  conceptName: string;
  globalAudioState?: GlobalAudioState;
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ 
  conceptName, 
  globalAudioState 
}) => {
  const [activeSubTab, setActiveSubTab] = useState('basic');
  const [readAloudActive, setReadAloudActive] = useState(false);
  const [currentReadingContent, setCurrentReadingContent] = useState('');
  const [sectionProgress, setSectionProgress] = useState<Record<string, boolean>>({});
  const [currentAudioProgress, setCurrentAudioProgress] = useState(0);
  const [showAITutor, setShowAITutor] = useState(false);

  // Listen to global audio events
  useEffect(() => {
    const handleGlobalAudioToggle = (event: CustomEvent) => {
      if (globalAudioState?.isEnabled) {
        if (event.detail.isPlaying && !readAloudActive) {
          startReadAloud(getContentForTab(activeSubTab));
        } else if (!event.detail.isPlaying && readAloudActive) {
          stopReadAloud();
        }
      }
    };

    const handleGlobalAudioReset = () => {
      setCurrentAudioProgress(0);
      stopReadAloud();
    };

    const handleGlobalAudioEnable = (event: CustomEvent) => {
      if (!event.detail.enabled) {
        stopReadAloud();
      }
    };

    window.addEventListener('globalAudioToggle', handleGlobalAudioToggle as EventListener);
    window.addEventListener('globalAudioReset', handleGlobalAudioReset);
    window.addEventListener('globalAudioEnable', handleGlobalAudioEnable as EventListener);

    return () => {
      window.removeEventListener('globalAudioToggle', handleGlobalAudioToggle as EventListener);
      window.removeEventListener('globalAudioReset', handleGlobalAudioReset);
      window.removeEventListener('globalAudioEnable', handleGlobalAudioEnable as EventListener);
    };
  }, [activeSubTab, readAloudActive, globalAudioState]);

  const startReadAloud = (content: string) => {
    setCurrentReadingContent(content);
    setReadAloudActive(true);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.95;
      utterance.volume = 0.8;
      utterance.onend = () => {
        setReadAloudActive(false);
        markSectionCompleted(activeSubTab);
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
    setSectionProgress(prev => ({ ...prev, [section]: true }));
  };

  const getContentForTab = (tab: string) => {
    switch (tab) {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Learn {conceptName}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAITutor(!showAITutor)}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            AI Tutor
          </Button>
        </div>
      </div>

      {/* AI Tutor Panel */}
      {showAITutor && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">AI Tutor Assistant</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                    I'm here to help explain {conceptName} concepts. Currently viewing: {activeSubTab} level content.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      Explain this section
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Ask a question
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Give examples
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Learning Progress</span>
            <span className="text-sm text-gray-500">
              {Object.values(sectionProgress).filter(Boolean).length}/3 sections completed
            </span>
          </div>
          <Progress 
            value={(Object.values(sectionProgress).filter(Boolean).length / 3) * 100} 
            className="h-2"
          />
        </CardContent>
      </Card>

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
              {sectionProgress.basic && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger value="detailed" className="relative">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Detailed
              {sectionProgress.detailed && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="relative">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Advanced
              {sectionProgress.advanced && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
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
                  onClick={() => startReadAloud(getContentForTab('basic'))}
                  disabled={!globalAudioState?.isEnabled}
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

              <Button 
                onClick={() => markSectionCompleted('basic')}
                className="w-full"
                disabled={sectionProgress.basic}
              >
                {sectionProgress.basic ? 'Section Completed' : 'Mark as Completed'}
              </Button>
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
                  onClick={() => startReadAloud(getContentForTab('detailed'))}
                  disabled={!globalAudioState?.isEnabled}
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

              <Button 
                onClick={() => markSectionCompleted('detailed')}
                className="w-full"
                disabled={sectionProgress.detailed}
              >
                {sectionProgress.detailed ? 'Section Completed' : 'Mark as Completed'}
              </Button>
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
                  onClick={() => startReadAloud(getContentForTab('advanced'))}
                  disabled={!globalAudioState?.isEnabled}
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

              <Button 
                onClick={() => markSectionCompleted('advanced')}
                className="w-full"
                disabled={sectionProgress.advanced}
              >
                {sectionProgress.advanced ? 'Section Completed' : 'Mark as Completed'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedLearnTab;
