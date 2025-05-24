
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Eye, 
  Settings, MessageSquare, Lightbulb, Zap, Activity,
  MousePointer, Move, Hand
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIAssistantChat from './AIAssistantChat';

interface EnhancedInteractiveTabProps {
  conceptName: string;
}

const EnhancedInteractiveTab: React.FC<EnhancedInteractiveTabProps> = ({ conceptName }) => {
  const [currentVisualization, setCurrentVisualization] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState([1]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [interactiveElements, setInteractiveElements] = useState({
    forces: { x: 0, y: 0 },
    mass: 5,
    acceleration: 0
  });

  // Interactive visualizations data
  const visualizations = [
    {
      id: 'force-vectors',
      title: 'Force Vector Analysis',
      description: 'Interactive visualization of force vectors and their effects on motion',
      duration: 120,
      hasInteraction: true,
      audioScript: `Welcome to the Force Vector Analysis. Here you can see how different forces affect an object's motion. Click and drag the force arrows to change their magnitude and direction. Notice how the resultant force changes as you modify individual forces.`
    },
    {
      id: 'mass-acceleration',
      title: 'Mass vs Acceleration Relationship',
      description: 'Explore how mass affects acceleration with constant force',
      duration: 90,
      hasInteraction: true,
      audioScript: `This visualization demonstrates the inverse relationship between mass and acceleration. Use the slider to change the object's mass and observe how acceleration changes when force remains constant.`
    },
    {
      id: 'real-world-examples',
      title: 'Real-World Applications',
      description: 'See Newton\'s laws in everyday scenarios',
      duration: 150,
      hasInteraction: false,
      audioScript: `Let's explore real-world applications of Newton's Second Law. From car crashes to sports, this law governs motion everywhere around us.`
    },
    {
      id: 'problem-solving',
      title: 'Interactive Problem Solving',
      description: 'Step-by-step problem solving with guided assistance',
      duration: 180,
      hasInteraction: true,
      audioScript: `Now let's work through some problems together. I'll guide you through each step of solving Newton's Second Law problems.`
    },
    {
      id: 'misconceptions',
      title: 'Common Misconceptions',
      description: 'Address and clarify common misunderstandings',
      duration: 100,
      hasInteraction: false,
      audioScript: `Many students have misconceptions about force and motion. Let's address the most common ones and clarify the correct understanding.`
    }
  ];

  const currentViz = visualizations[currentVisualization];

  // Audio management
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = playbackSpeed[0];
      utterance.volume = isMuted ? 0 : 0.8;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        setAudioProgress(100);
      };
      
      // Track progress
      let progressInterval: NodeJS.Timeout;
      utterance.onstart = () => {
        setIsPlaying(true);
        setAudioProgress(0);
        const duration = currentViz.duration * 1000;
        const interval = duration / 100;
        
        progressInterval = setInterval(() => {
          setAudioProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + 1;
          });
        }, interval);
      };
      
      setCurrentUtterance(utterance);
      window.speechSynthesis.speak(utterance);
    }
  };

  const pauseAudio = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    }
  };

  const resumeAudio = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setAudioProgress(0);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else if (window.speechSynthesis.paused) {
      resumeAudio();
    } else {
      playAudio(currentViz.audioScript);
    }
  };

  // Interactive element handlers
  const handleForceChange = (axis: 'x' | 'y', value: number) => {
    setInteractiveElements(prev => ({
      ...prev,
      forces: { ...prev.forces, [axis]: value },
      acceleration: Math.sqrt(Math.pow(prev.forces.x, 2) + Math.pow(value, 2)) / prev.mass
    }));
  };

  const handleMassChange = (mass: number) => {
    setInteractiveElements(prev => ({
      ...prev,
      mass,
      acceleration: Math.sqrt(Math.pow(prev.forces.x, 2) + Math.pow(prev.forces.y, 2)) / mass
    }));
  };

  // Reset interaction
  const resetInteraction = () => {
    setInteractiveElements({
      forces: { x: 0, y: 0 },
      mass: 5,
      acceleration: 0
    });
    stopAudio();
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                Interactive Visualizations - {conceptName}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {currentViz.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {currentVisualization + 1} of {visualizations.length}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAIChat(true)}
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                AI Tutor
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Audio Controls */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePlayPause}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Play'} Audio Guide
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetInteraction}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <span>Speed:</span>
                <Slider
                  value={playbackSpeed}
                  onValueChange={setPlaybackSpeed}
                  min={0.5}
                  max={2}
                  step={0.25}
                  className="w-20"
                />
                <span>{playbackSpeed[0]}x</span>
              </div>
            </div>
            
            <Progress value={audioProgress} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Audio Progress</span>
              <span>{Math.round(audioProgress)}%</span>
            </div>
          </div>

          {/* Visualization Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {visualizations.map((viz, index) => (
              <Button
                key={viz.id}
                variant={currentVisualization === index ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentVisualization(index);
                  stopAudio();
                }}
                className="whitespace-nowrap"
              >
                {viz.hasInteraction && <Zap className="h-3 w-3 mr-1" />}
                {viz.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Visualization Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVisualization}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentVisualization === 0 && (
            <ForceVectorVisualization 
              forces={interactiveElements.forces}
              onForceChange={handleForceChange}
              isPlaying={isPlaying}
            />
          )}
          
          {currentVisualization === 1 && (
            <MassAccelerationVisualization
              mass={interactiveElements.mass}
              acceleration={interactiveElements.acceleration}
              onMassChange={handleMassChange}
              isPlaying={isPlaying}
            />
          )}
          
          {currentVisualization === 2 && (
            <RealWorldExamples isPlaying={isPlaying} />
          )}
          
          {currentVisualization === 3 && (
            <InteractiveProblemSolving isPlaying={isPlaying} />
          )}
          
          {currentVisualization === 4 && (
            <CommonMisconceptions isPlaying={isPlaying} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* AI Assistant Chat */}
      <AIAssistantChat
        conceptName={conceptName}
        context={`Interactive visualization: ${currentViz.title}`}
        isVisible={showAIChat}
        onClose={() => setShowAIChat(false)}
      />
    </div>
  );
};

// Individual Visualization Components
const ForceVectorVisualization: React.FC<{
  forces: { x: number; y: number };
  onForceChange: (axis: 'x' | 'y', value: number) => void;
  isPlaying: boolean;
}> = ({ forces, onForceChange, isPlaying }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Force Vector Analysis
          {isPlaying && <Badge variant="outline" className="animate-pulse">Audio Playing</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interactive Canvas */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg min-h-[400px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg shadow-lg"
                animate={{
                  x: forces.x * 2,
                  y: -forces.y * 2
                }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="w-full h-full flex items-center justify-center text-white font-bold">
                  Box
                </div>
              </motion.div>
              
              {/* Force Arrows */}
              {forces.x !== 0 && (
                <motion.div
                  className="absolute w-12 h-1 bg-red-500"
                  style={{
                    transformOrigin: 'left center',
                    transform: `rotate(${forces.x > 0 ? 0 : 180}deg) scaleX(${Math.abs(forces.x) / 10})`
                  }}
                />
              )}
              
              {forces.y !== 0 && (
                <motion.div
                  className="absolute w-1 h-12 bg-green-500"
                  style={{
                    transformOrigin: 'center bottom',
                    transform: `rotate(${forces.y > 0 ? 0 : 180}deg) scaleY(${Math.abs(forces.y) / 10})`
                  }}
                />
              )}
            </div>
            
            <div className="absolute top-4 left-4 text-sm text-gray-600">
              <div>Click and drag to apply forces</div>
              <div className="mt-2">
                <MousePointer className="h-4 w-4 inline mr-1" />
                Interactive mode enabled
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Horizontal Force (F<sub>x</sub>): {forces.x.toFixed(1)} N
              </label>
              <Slider
                value={[forces.x]}
                onValueChange={(value) => onForceChange('x', value[0])}
                min={-20}
                max={20}
                step={0.5}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Vertical Force (F<sub>y</sub>): {forces.y.toFixed(1)} N
              </label>
              <Slider
                value={[forces.y]}
                onValueChange={(value) => onForceChange('y', value[0])}
                min={-20}
                max={20}
                step={0.5}
                className="w-full"
              />
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Resultant Force:</h4>
              <div className="space-y-1 text-sm">
                <div>Magnitude: {Math.sqrt(forces.x ** 2 + forces.y ** 2).toFixed(2)} N</div>
                <div>Direction: {Math.atan2(forces.y, forces.x) * (180 / Math.PI).toFixed(1)}°</div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
              <Lightbulb className="h-4 w-4 text-blue-600 mb-2" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Try adjusting the forces to see how they combine vectorially. 
                Notice how the object moves in the direction of the net force!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MassAccelerationVisualization: React.FC<{
  mass: number;
  acceleration: number;
  onMassChange: (mass: number) => void;
  isPlaying: boolean;
}> = ({ mass, acceleration, onMassChange, isPlaying }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Move className="h-5 w-5 text-green-600" />
          Mass vs Acceleration Relationship
          {isPlaying && <Badge variant="outline" className="animate-pulse">Audio Playing</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg min-h-[400px] relative">
            <motion.div
              className="absolute left-8 top-1/2 transform -translate-y-1/2"
              animate={{
                x: acceleration * 20,
              }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold"
                style={{
                  width: `${20 + mass * 4}px`,
                  height: `${20 + mass * 4}px`
                }}
              >
                {mass}kg
              </div>
            </motion.div>
            
            <div className="absolute bottom-4 left-4 text-sm text-gray-600">
              Constant Force = 50N
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Mass: {mass} kg
              </label>
              <Slider
                value={[mass]}
                onValueChange={(value) => onMassChange(value[0])}
                min={1}
                max={20}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Results:</h4>
              <div className="space-y-1 text-sm">
                <div>Force: 50 N (constant)</div>
                <div>Mass: {mass} kg</div>
                <div>Acceleration: {(50 / mass).toFixed(2)} m/s²</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RealWorldExamples: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  const examples = [
    {
      title: "Car Braking",
      description: "When a car brakes, friction provides the force that decelerates it",
      visual: "🚗"
    },
    {
      title: "Rocket Launch",
      description: "Exhaust gases push down, rocket pushes up with equal force",
      visual: "🚀"
    },
    {
      title: "Walking",
      description: "Your foot pushes back on ground, ground pushes forward on you",
      visual: "🚶"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hand className="h-5 w-5 text-orange-600" />
          Real-World Applications
          {isPlaying && <Badge variant="outline" className="animate-pulse">Audio Playing</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 p-6 rounded-lg text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">{example.visual}</div>
              <h3 className="font-semibold mb-2">{example.title}</h3>
              <p className="text-sm text-gray-600">{example.description}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const InteractiveProblemSolving: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-indigo-600" />
          Interactive Problem Solving
          {isPlaying && <Badge variant="outline" className="animate-pulse">Audio Playing</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Problem: Find the acceleration</h3>
          <p className="mb-4">A 10 kg box is pushed with a force of 30 N. What is its acceleration?</p>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Step 1: Identify given values</h4>
              <div className="text-sm space-y-1">
                <div>Mass (m) = 10 kg</div>
                <div>Force (F) = 30 N</div>
                <div>Acceleration (a) = ?</div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Step 2: Apply Newton's Second Law</h4>
              <div className="text-sm">F = ma</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Step 3: Solve for acceleration</h4>
              <div className="text-sm space-y-1">
                <div>a = F/m</div>
                <div>a = 30 N / 10 kg</div>
                <div className="font-semibold text-green-600">a = 3 m/s²</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CommonMisconceptions: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  const misconceptions = [
    {
      wrong: "Heavier objects fall faster",
      correct: "All objects fall at the same rate in vacuum (ignoring air resistance)",
      explanation: "Mass doesn't affect acceleration due to gravity"
    },
    {
      wrong: "Force is needed to maintain motion",
      correct: "Force is needed to change motion, not maintain it",
      explanation: "Objects in motion stay in motion unless acted upon by a force"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          Common Misconceptions
          {isPlaying && <Badge variant="outline" className="animate-pulse">Audio Playing</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {misconceptions.map((item, index) => (
            <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ Common Misconception:</h4>
                  <p className="text-sm">{item.wrong}</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Correct Understanding:</h4>
                  <p className="text-sm">{item.correct}</p>
                </div>
              </div>
              <div className="mt-4 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">💡 {item.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedInteractiveTab;
