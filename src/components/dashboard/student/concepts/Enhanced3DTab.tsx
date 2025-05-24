
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Bot, CheckCircle2, Circle, Lightbulb, Beaker, Zap } from 'lucide-react';
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
  audioScript: string;
  interactionType: 'click' | 'drag' | 'adjust' | 'observe';
  duration: number;
  completed: boolean;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ 
  conceptName, 
  subject,
  globalAudioState 
}) => {
  const [currentExperiment, setCurrentExperiment] = useState('forces');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [showAITutor, setShowAITutor] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [isInteractionActive, setIsInteractionActive] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Comprehensive experiment steps with audio scripts
  const experimentSteps: { [key: string]: ExperimentStep[] } = {
    forces: [
      {
        id: 'setup',
        title: 'Experiment Setup',
        description: 'Initialize the force simulation environment',
        instruction: 'Click to set up objects and force vectors',
        audioScript: `Welcome to the forces experiment! We're going to explore how different forces affect object motion. First, let's set up our simulation environment with various objects and force vectors.`,
        interactionType: 'click',
        duration: 15,
        completed: false
      },
      {
        id: 'apply_force',
        title: 'Apply Forces',
        description: 'Apply different force vectors to objects',
        instruction: 'Drag to adjust force magnitude and direction',
        audioScript: `Now, let's apply forces to our objects. Notice how the force vectors change the object's acceleration. The longer the arrow, the stronger the force. Try adjusting both magnitude and direction.`,
        interactionType: 'drag',
        duration: 20,
        completed: false
      },
      {
        id: 'observe_motion',
        title: 'Observe Motion',
        description: 'Watch how forces create motion patterns',
        instruction: 'Observe the resulting motion and acceleration',
        audioScript: `Excellent! Now observe how the applied forces create different motion patterns. Notice the relationship between force direction and acceleration. This demonstrates Newton's second law: F equals m times a.`,
        interactionType: 'observe',
        duration: 18,
        completed: false
      },
      {
        id: 'equilibrium',
        title: 'Force Equilibrium',
        description: 'Balance forces to achieve equilibrium',
        instruction: 'Adjust forces to create equilibrium state',
        audioScript: `Let's explore equilibrium! When all forces balance out, the net force becomes zero, and the object maintains constant velocity. Try to balance the forces perfectly.`,
        interactionType: 'adjust',
        duration: 22,
        completed: false
      }
    ],
    chemistry: [
      {
        id: 'molecular_setup',
        title: 'Molecular Structure',
        description: 'Build and examine molecular bonds',
        instruction: 'Click to arrange atoms and create bonds',
        audioScript: `Welcome to molecular chemistry! Let's start by building molecular structures. Each atom has specific bonding properties that determine how molecules form.`,
        interactionType: 'click',
        duration: 16,
        completed: false
      },
      {
        id: 'reaction_dynamics',
        title: 'Chemical Reactions',
        description: 'Observe bond breaking and formation',
        instruction: 'Watch bonds break and form during reactions',
        audioScript: `Now we'll observe chemical reactions in real-time. Watch how bonds break in reactants and new bonds form in products. Energy changes drive these transformations.`,
        interactionType: 'observe',
        duration: 25,
        completed: false
      }
    ]
  };

  const currentSteps = experimentSteps[currentExperiment] || experimentSteps.forces;
  const currentStepData = currentSteps[currentStep];

  // Handle global audio state changes
  useEffect(() => {
    if (globalAudioState) {
      setIsPlaying(globalAudioState.isPlaying && globalAudioState.isEnabled && audioEnabled);
    }
  }, [globalAudioState, audioEnabled]);

  // Audio-synchronized step progression
  useEffect(() => {
    if (isPlaying && currentStepData && audioEnabled) {
      const interval = setInterval(() => {
        setStepProgress(prev => {
          const increment = 100 / currentStepData.duration;
          const newProgress = prev + increment;
          
          if (newProgress >= 100) {
            setCompletedSteps(prevCompleted => new Set([...prevCompleted, currentStepData.id]));
            if (currentStep < currentSteps.length - 1) {
              setCurrentStep(prev => prev + 1);
              setStepProgress(0);
              setIsInteractionActive(true);
            } else {
              setIsPlaying(false);
              setStepProgress(100);
            }
            return 100;
          }
          return newProgress;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentStep, currentStepData, currentSteps.length, audioEnabled]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setIsInteractionActive(true);
    }
    window.dispatchEvent(new CustomEvent('labAudioToggle', { 
      detail: { isPlaying: !isPlaying } 
    }));
  };

  const handleReset = () => {
    setCurrentStep(0);
    setStepProgress(0);
    setCompletedSteps(new Set());
    setIsPlaying(false);
    setIsInteractionActive(false);
  };

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    if (currentStep < currentSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setStepProgress(0);
    }
  };

  const handleInteraction = (type: string) => {
    console.log(`Performing ${type} interaction on ${currentStepData?.title}`);
    setIsInteractionActive(false);
    setTimeout(() => setIsInteractionActive(true), 1000);
  };

  const overallProgress = ((completedSteps.size + stepProgress / 100) / currentSteps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Interactive 3D Lab Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Beaker className="h-5 w-5 text-purple-600" />
              Interactive 3D Lab - {conceptName}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                disabled={!audioEnabled}
                className="flex items-center gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Start'} Experiment
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="flex items-center gap-2"
              >
                {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          {/* Experiment Progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div 
                className="bg-purple-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Step {currentStep + 1}: {currentStepData?.title} ({Math.round(stepProgress)}%)
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 3D Simulation Environment */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-purple-50 to-blue-100 rounded-lg border-2 border-dashed border-purple-300 h-96 relative overflow-hidden">
                {/* Main 3D Viewport */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <motion.div 
                    className="text-center"
                    animate={{ 
                      scale: isPlaying ? [1, 1.02, 1] : 1,
                      rotateY: isPlaying ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: isPlaying ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-32 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl mx-auto mb-4 shadow-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">3D Lab</span>
                    </div>
                    <h3 className="font-semibold text-gray-800">{currentStepData?.title || 'Ready to Start'}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {isPlaying ? 'Experiment in progress...' : 'Click Start to begin experiment'}
                    </p>
                  </motion.div>

                  {/* Interactive Elements */}
                  <AnimatePresence>
                    {isInteractionActive && currentStepData && (
                      <>
                        {/* Force Vectors */}
                        <motion.button
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute top-6 right-6 w-10 h-10 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-all transform hover:scale-110 flex items-center justify-center"
                          onClick={() => handleInteraction('force-vector')}
                          title="Force Vector Control"
                        >
                          <Zap className="h-5 w-5 text-white" />
                        </motion.button>

                        {/* Object Controls */}
                        <motion.button
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute bottom-6 left-6 w-10 h-10 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-110 flex items-center justify-center"
                          onClick={() => handleInteraction('object-control')}
                          title="Object Control"
                        >
                          <Circle className="h-5 w-5 text-white" />
                        </motion.button>

                        {/* Measurement Tools */}
                        <motion.button
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute top-6 left-6 w-10 h-10 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-all transform hover:scale-110 flex items-center justify-center"
                          onClick={() => handleInteraction('measurement')}
                          title="Measurement Tools"
                        >
                          <Lightbulb className="h-5 w-5 text-white" />
                        </motion.button>
                      </>
                    )}
                  </AnimatePresence>

                  {/* Audio Visualization */}
                  {isPlaying && audioEnabled && (
                    <motion.div
                      className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 rounded-lg px-3 py-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-purple-600 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                      <span className="text-xs text-purple-700">Audio Guide Active</span>
                    </motion.div>
                  )}
                </div>

                {/* Current Step Progress */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-purple-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${stepProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              </div>

              {/* Experiment Controls */}
              <div className="flex justify-center gap-2 mt-4">
                {Object.keys(experimentSteps).map((experiment, index) => (
                  <Button
                    key={experiment}
                    variant={experiment === currentExperiment ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentExperiment(experiment)}
                    disabled={isPlaying}
                    className="capitalize"
                  >
                    {experiment}
                  </Button>
                ))}
              </div>
            </div>

            {/* Experiment Steps & AI Assistant */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Experiment Steps</h4>
                <div className="space-y-3">
                  {currentSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className={`p-3 rounded-lg border transition-all ${
                        index === currentStep 
                          ? 'border-purple-500 bg-purple-50' 
                          : completedSteps.has(step.id)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {completedSteps.has(step.id) ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : index === currentStep ? (
                          <Circle className="h-4 w-4 text-purple-600" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="font-medium text-sm">{step.title}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{step.description}</p>
                      <p className="text-xs text-purple-600 italic mb-2">{step.instruction}</p>
                      
                      {/* Audio Script Preview */}
                      {index === currentStep && isPlaying && (
                        <div className="mt-2 p-2 bg-purple-100 rounded text-xs text-purple-800">
                          <strong>Audio:</strong> {step.audioScript.substring(0, 100)}...
                        </div>
                      )}
                      
                      {index === currentStep && !completedSteps.has(step.id) && !isPlaying && (
                        <Button
                          size="sm"
                          className="mt-2 w-full"
                          onClick={() => handleStepComplete(step.id)}
                        >
                          Complete Step
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Enhanced AI Lab Assistant */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <h5 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  AI Lab Assistant
                </h5>
                <p className="text-sm text-purple-700 mb-3">
                  I can explain the science behind this experiment, suggest variations, and check your understanding!
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowAITutor(true)}
                  >
                    Explain Current Step
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowAITutor(true)}
                  >
                    Suggest Experiment Variations
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowAITutor(true)}
                  >
                    Check My Understanding
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowAITutor(true)}
                  >
                    Real-World Applications
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Tutor Dialog */}
      <AITutorDialog
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        conceptName={conceptName}
        context={`Interactive 3D Lab - ${currentExperiment} experiment, Step: ${currentStepData?.title || 'Starting'}, Audio: ${currentStepData?.audioScript || 'Preparation'}`}
        subject={subject}
      />
    </div>
  );
};

export default Enhanced3DTab;
