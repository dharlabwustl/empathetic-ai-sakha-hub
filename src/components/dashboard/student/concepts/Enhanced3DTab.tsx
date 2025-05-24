
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Zap, Lightbulb, 
  Beaker, MousePointer, Eye, Brain, MessageSquare, Settings,
  Layers, Move3D, RotateCw, Target, FlaskConical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AITutorDialog from './AITutorDialog';

interface Enhanced3DTabProps {
  conceptName: string;
  subject: string;
  globalAudioState?: {
    isPlaying: boolean;
    isEnabled: boolean;
    progress: number;
  };
}

interface ExperimentStep {
  id: string;
  title: string;
  description: string;
  instruction: string;
  audioText: string;
  duration: number;
  interactive: boolean;
  variables?: string[];
}

interface ModelScene {
  id: string;
  title: string;
  description: string;
  audioExplanation: string;
  interactiveElements: string[];
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ 
  conceptName, 
  subject,
  globalAudioState 
}) => {
  // Audio and interaction states
  const [isLocalAudioPlaying, setIsLocalAudioPlaying] = useState(false);
  const [currentAudioProgress, setCurrentAudioProgress] = useState(0);
  const [activeExperiment, setActiveExperiment] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [interactionMode, setInteractionMode] = useState<'observe' | 'manipulate'>('observe');
  const [showAITutor, setShowAITutor] = useState(false);
  const [selectedContext, setSelectedContext] = useState('');
  
  // 3D Model controls
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [selectedLayer, setSelectedLayer] = useState('all');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock experiments data
  const experiments: ExperimentStep[] = [
    {
      id: 'setup',
      title: 'Laboratory Setup',
      description: 'Initialize the 3D physics simulation environment',
      instruction: 'Observe the initial setup and identify key components',
      audioText: `Welcome to the ${conceptName} interactive laboratory. In this 3D environment, you can manipulate objects and observe real-time physics calculations. Let's start by examining the basic setup.`,
      duration: 8000,
      interactive: false
    },
    {
      id: 'variables',
      title: 'Variable Identification',
      description: 'Identify and manipulate key variables',
      instruction: 'Click on different objects to see their properties',
      audioText: `Now, let's identify the key variables in our ${conceptName} simulation. You can interact with objects to see how changing mass, force, and acceleration affects the system.`,
      duration: 12000,
      interactive: true,
      variables: ['mass', 'force', 'acceleration', 'time']
    },
    {
      id: 'manipulation',
      title: 'Interactive Manipulation',
      description: 'Change parameters and observe results',
      instruction: 'Use the controls to modify object properties',
      audioText: `Excellent! Now you can manipulate the simulation parameters. Try changing the mass or applied force and watch how it affects the motion according to ${conceptName}.`,
      duration: 15000,
      interactive: true,
      variables: ['mass', 'force', 'velocity']
    },
    {
      id: 'analysis',
      title: 'Result Analysis',
      description: 'Analyze the experimental results',
      instruction: 'Review the data and draw conclusions',
      audioText: `Let's analyze the results of your experiment. Notice how the relationship between force, mass, and acceleration validates the principles of ${conceptName}.`,
      duration: 10000,
      interactive: false
    }
  ];

  // Mock 3D model scenes
  const modelScenes: ModelScene[] = [
    {
      id: 'basic',
      title: 'Basic Concept Visualization',
      description: 'Fundamental representation of the concept',
      audioExplanation: `This basic 3D model illustrates the core principles of ${conceptName}. You can rotate and zoom to examine different aspects.`,
      interactiveElements: ['rotation', 'zoom', 'highlighting'],
      difficulty: 'Basic'
    },
    {
      id: 'detailed',
      title: 'Detailed Component Analysis',
      description: 'Comprehensive breakdown of all components',
      audioExplanation: `In this detailed view, we can examine each component individually. Click on different parts to hear specific explanations about their role in ${conceptName}.`,
      interactiveElements: ['component-selection', 'layered-view', 'animation'],
      difficulty: 'Intermediate'
    },
    {
      id: 'advanced',
      title: 'Advanced Simulation',
      description: 'Real-time physics simulation with full controls',
      audioExplanation: `This advanced simulation allows you to modify parameters in real-time and observe immediate changes. Perfect for understanding the dynamic nature of ${conceptName}.`,
      interactiveElements: ['parameter-control', 'real-time-calculation', 'data-visualization'],
      difficulty: 'Advanced'
    }
  ];

  // Audio control functions
  const handleLocalAudioToggle = () => {
    const newPlayingState = !isLocalAudioPlaying;
    setIsLocalAudioPlaying(newPlayingState);
    
    if (newPlayingState) {
      startAudioNarration();
    } else {
      stopAudioNarration();
    }
  };

  const startAudioNarration = () => {
    const currentStep = experiments[activeStep];
    if (currentStep) {
      // Simulate audio playback
      const totalDuration = currentStep.duration;
      let elapsed = 0;
      
      intervalRef.current = setInterval(() => {
        elapsed += 100;
        const progress = Math.min((elapsed / totalDuration) * 100, 100);
        setCurrentAudioProgress(progress);
        
        if (progress >= 100) {
          setIsLocalAudioPlaying(false);
          setCompletedSteps(prev => new Set([...prev, currentStep.id]));
          clearInterval(intervalRef.current!);
        }
      }, 100);
    }
  };

  const stopAudioNarration = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetAudio = () => {
    stopAudioNarration();
    setCurrentAudioProgress(0);
    setIsLocalAudioPlaying(false);
  };

  // Global audio synchronization
  useEffect(() => {
    if (globalAudioState?.isPlaying && !globalAudioState.isEnabled) {
      stopAudioNarration();
      setIsLocalAudioPlaying(false);
    }
  }, [globalAudioState]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // 3D Model interaction handlers
  const handleRotationChange = (axis: 'x' | 'y' | 'z', value: number) => {
    setRotation(prev => ({ ...prev, [axis]: value }));
  };

  const handleScaleChange = (newScale: number) => {
    setScale(Math.max(0.5, Math.min(3, newScale)));
  };

  const handleStepNavigation = (direction: 'next' | 'prev') => {
    const currentIndex = activeStep;
    if (direction === 'next' && currentIndex < experiments.length - 1) {
      setActiveStep(currentIndex + 1);
      resetAudio();
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveStep(currentIndex - 1);
      resetAudio();
    }
  };

  const openAITutor = (context: string) => {
    setSelectedContext(context);
    setShowAITutor(true);
  };

  const currentStep = experiments[activeStep];
  const currentScene = modelScenes[activeExperiment];

  return (
    <div className="space-y-6">
      {/* Lab Header with Controls */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-purple-600" />
                3D Interactive Laboratory
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Hands-on experiments and 3D visualizations for {conceptName}
              </p>
            </div>
            
            {/* Audio Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLocalAudioToggle}
                className="flex items-center gap-2"
              >
                {isLocalAudioPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isLocalAudioPlaying ? 'Pause' : 'Play'} Guide
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={resetAudio}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => openAITutor('lab-assistance')}
                className="flex items-center gap-2"
              >
                <Brain className="h-4 w-4" />
                AI Lab Assistant
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Experiment Progress</span>
              <span>{Math.round(currentAudioProgress)}%</span>
            </div>
            <Progress value={currentAudioProgress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Visualization Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{currentScene.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className={`${
                    currentScene.difficulty === 'Basic' ? 'bg-green-100 text-green-800' :
                    currentScene.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentScene.difficulty}
                  </Badge>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openAITutor(currentScene.description)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="h-full">
              {/* 3D Model Container */}
              <div className="w-full h-[400px] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center text-white"
                    style={{
                      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg) scale(${scale})`,
                    }}
                    animate={{
                      rotateY: isLocalAudioPlaying ? [0, 360] : rotation.y,
                    }}
                    transition={{
                      duration: isLocalAudioPlaying ? 20 : 0,
                      repeat: isLocalAudioPlaying ? Infinity : 0,
                      ease: "linear"
                    }}
                  >
                    <div className="relative">
                      {/* Mock 3D Object */}
                      <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg shadow-2xl transform rotate-12">
                        <div className="absolute inset-2 bg-white/20 rounded border border-white/30"></div>
                        <div className="absolute top-1 left-1 w-4 h-4 bg-yellow-400 rounded-full"></div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-red-400 rounded"></div>
                      </div>
                      
                      {/* Interactive Hotspots */}
                      {interactionMode === 'manipulate' && (
                        <>
                          <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-400 rounded-full cursor-pointer animate-pulse"></div>
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full cursor-pointer animate-pulse"></div>
                          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-400 rounded-full cursor-pointer animate-pulse"></div>
                        </>
                      )}
                    </div>
                    
                    <p className="mt-4 text-sm opacity-80">{currentScene.description}</p>
                  </motion.div>
                </div>
                
                {/* 3D Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setInteractionMode(interactionMode === 'observe' ? 'manipulate' : 'observe')}
                          className="text-white hover:bg-white/20"
                        >
                          {interactionMode === 'observe' ? <Eye className="h-4 w-4" /> : <MousePointer className="h-4 w-4" />}
                          {interactionMode === 'observe' ? 'Observe' : 'Manipulate'}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setRotation({ x: 0, y: 0, z: 0 });
                            setScale(1);
                            setPosition({ x: 0, y: 0, z: 0 });
                          }}
                          className="text-white hover:bg-white/20"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <span className="text-white text-xs">Scale:</span>
                        <input
                          type="range"
                          min="0.5"
                          max="3"
                          step="0.1"
                          value={scale}
                          onChange={(e) => handleScaleChange(Number(e.target.value))}
                          className="w-16"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Scene Selection */}
              <div className="mt-4 flex gap-2">
                {modelScenes.map((scene, index) => (
                  <Button
                    key={scene.id}
                    variant={activeExperiment === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveExperiment(index)}
                    className="flex-1"
                  >
                    {scene.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lab Controls & Info */}
        <div className="space-y-4">
          {/* Current Experiment Step */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Beaker className="h-4 w-4" />
                Experiment Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">{currentStep.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentStep.description}
                </p>
                
                {currentStep.interactive && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Interactive Step
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                      {currentStep.instruction}
                    </p>
                  </div>
                )}
                
                {currentStep.variables && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium">Variables to explore:</p>
                    <div className="flex flex-wrap gap-1">
                      {currentStep.variables.map((variable, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Step Navigation */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStepNavigation('prev')}
                  disabled={activeStep === 0}
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStepNavigation('next')}
                  disabled={activeStep === experiments.length - 1}
                  className="flex-1"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Experiment Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Experiment Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {experiments.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                      index === activeStep ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      completedSteps.has(step.id) ? 'bg-green-500 text-white' :
                      index === activeStep ? 'bg-blue-500 text-white' :
                      'bg-gray-200 dark:bg-gray-700 text-gray-600'
                    }`}>
                      {completedSteps.has(step.id) ? '✓' : index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{step.title}</p>
                      {step.interactive && (
                        <div className="flex items-center gap-1 mt-1">
                          <Zap className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-yellow-600 dark:text-yellow-400">Interactive</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Help */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Lab Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => openAITutor('experiment-help')}
              >
                <Brain className="h-4 w-4 mr-2" />
                Explain Current Experiment
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => openAITutor('concept-understanding')}
              >
                <Target className="h-4 w-4 mr-2" />
                Check My Understanding
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => openAITutor('suggest-experiments')}
              >
                <FlaskConical className="h-4 w-4 mr-2" />
                Suggest New Experiments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Tutor Dialog */}
      <AITutorDialog
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        conceptName={conceptName}
        context={selectedContext}
        subject={subject}
      />
    </div>
  );
};

export default Enhanced3DTab;
