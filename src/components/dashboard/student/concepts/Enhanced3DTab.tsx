
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Bot, CheckCircle2, Circle } from 'lucide-react';
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

interface SimulationStep {
  id: string;
  title: string;
  description: string;
  instruction: string;
  completed: boolean;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ 
  conceptName, 
  subject,
  globalAudioState 
}) => {
  const [currentSimulation, setCurrentSimulation] = useState('forces');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAITutor, setShowAITutor] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Simulation steps for different concepts
  const simulationSteps: { [key: string]: SimulationStep[] } = {
    forces: [
      {
        id: 'step1',
        title: 'Initialize Forces',
        description: 'Set up the force vectors and objects',
        instruction: 'Click to add force vectors to the object',
        completed: false
      },
      {
        id: 'step2',
        title: 'Apply Newton\'s Laws',
        description: 'Observe how forces affect motion',
        instruction: 'Adjust force magnitude and direction',
        completed: false
      },
      {
        id: 'step3',
        title: 'Analyze Results',
        description: 'Study the resulting motion patterns',
        instruction: 'Record observations and conclusions',
        completed: false
      }
    ],
    chemistry: [
      {
        id: 'step1',
        title: 'Molecular Setup',
        description: 'Arrange atoms and bonds',
        instruction: 'Click to build molecular structure',
        completed: false
      },
      {
        id: 'step2',
        title: 'Reaction Simulation',
        description: 'Observe chemical reactions',
        instruction: 'Start the reaction process',
        completed: false
      }
    ]
  };

  const currentSteps = simulationSteps[currentSimulation] || simulationSteps.forces;

  // Handle global audio state changes
  useEffect(() => {
    if (globalAudioState) {
      setIsPlaying(globalAudioState.isPlaying && globalAudioState.isEnabled);
    }
  }, [globalAudioState]);

  // Simulation progress tracking
  useEffect(() => {
    const completedCount = Array.from(completedSteps).length;
    const totalSteps = currentSteps.length;
    setSimulationProgress((completedCount / totalSteps) * 100);
  }, [completedSteps, currentSteps]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Broadcast to global controls
    window.dispatchEvent(new CustomEvent('labAudioToggle', { 
      detail: { isPlaying: !isPlaying } 
    }));
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSimulationProgress(0);
    setCompletedSteps(new Set());
    setIsPlaying(false);
  };

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    if (currentStep < currentSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleExperimentSuggestion = () => {
    setShowAITutor(true);
  };

  return (
    <div className="space-y-6">
      {/* Interactive Lab Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              Interactive 3D Lab - {conceptName}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                className="flex items-center gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'} Simulation
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <motion.div 
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${simulationProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Progress: {Math.round(simulationProgress)}% ({completedSteps.size}/{currentSteps.length} steps)
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 3D Simulation Viewport */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 h-96 flex items-center justify-center relative border-2 border-dashed border-blue-300">
                <motion.div 
                  className="text-center"
                  animate={{ 
                    scale: isPlaying ? [1, 1.05, 1] : 1,
                    rotate: isPlaying ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: isPlaying ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-24 h-24 bg-blue-600 rounded-lg mx-auto mb-4 shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-800 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">3D</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800">Interactive {conceptName} Simulation</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {isPlaying ? 'Simulation Running...' : 'Click Play to start simulation'}
                  </p>
                </motion.div>

                {/* Interactive Hotspots */}
                <AnimatePresence>
                  {isPlaying && (
                    <>
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                        onClick={() => handleStepComplete(currentSteps[currentStep]?.id)}
                        title="Force Vector"
                      />
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute bottom-4 left-4 w-8 h-8 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
                        onClick={() => handleStepComplete(currentSteps[currentStep]?.id)}
                        title="Motion Path"
                      />
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Simulation Steps & Controls */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Simulation Steps</h4>
              <div className="space-y-3">
                {currentSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className={`p-3 rounded-lg border transition-all ${
                      index === currentStep 
                        ? 'border-blue-500 bg-blue-50' 
                        : completedSteps.has(step.id)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {completedSteps.has(step.id) ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="font-medium text-sm">{step.title}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{step.description}</p>
                    <p className="text-xs text-blue-600 italic">{step.instruction}</p>
                    
                    {index === currentStep && !completedSteps.has(step.id) && (
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

              {/* AI Lab Assistant */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <h5 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  AI Lab Assistant
                </h5>
                <p className="text-sm text-purple-700 mb-3">
                  I can help explain the simulation, suggest experiments, and check your understanding!
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={handleExperimentSuggestion}
                  >
                    Suggest Experiment
                  </Button>
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
                    Check My Understanding
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
        context={`Interactive 3D simulation - Step ${currentStep + 1}: ${currentSteps[currentStep]?.title || 'Unknown'}`}
        subject={subject}
      />
    </div>
  );
};

export default Enhanced3DTab;
