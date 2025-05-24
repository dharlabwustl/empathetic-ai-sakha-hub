
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  Zap,
  Eye,
  MousePointer,
  Move3D,
  Lightbulb,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Enhanced3DTabProps {
  conceptName: string;
  subject: string;
  mode?: '3d' | 'diagrams';
  isAudioPlaying?: boolean;
  audioEnabled?: boolean;
  onAudioStateChange?: (playing: boolean) => void;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ 
  conceptName, 
  subject, 
  mode = '3d',
  isAudioPlaying = false,
  audioEnabled = true,
  onAudioStateChange
}) => {
  const [localAudioPlaying, setLocalAudioPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [selectedVisualization, setSelectedVisualization] = useState(0);
  const [showAITutor, setShowAITutor] = useState(false);
  const [parameters, setParameters] = useState({
    speed: 1,
    angle: 45,
    force: 10,
    mass: 2
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Get subject-specific visualizations
  const getVisualizations = () => {
    if (mode === 'diagrams') {
      return [
        {
          id: 1,
          title: 'Force Vector Diagram',
          description: 'Interactive diagram showing force vectors',
          duration: 120,
          audioText: `This force vector diagram illustrates how multiple forces act on an object. The arrows represent force vectors, with their length indicating magnitude and direction showing the force direction.`,
          hotspots: [
            { x: 30, y: 40, label: 'Applied Force', info: 'The external force applied to the object' },
            { x: 70, y: 60, label: 'Normal Force', info: 'The support force perpendicular to the surface' },
            { x: 50, y: 80, label: 'Weight', info: 'The gravitational force acting downward' }
          ]
        },
        {
          id: 2,
          title: 'Free Body Diagram',
          description: 'Isolated view of forces acting on the object',
          duration: 90,
          audioText: `A free body diagram isolates the object and shows all forces acting on it. This helps us analyze the net force and predict motion.`,
          hotspots: [
            { x: 50, y: 30, label: 'Tension', info: 'Force transmitted through a rope or cable' },
            { x: 50, y: 70, label: 'Friction', info: 'Force opposing motion along the surface' }
          ]
        },
        {
          id: 3,
          title: 'Motion Analysis',
          description: 'Visual representation of acceleration and velocity',
          duration: 150,
          audioText: `This diagram shows how velocity and acceleration vectors change over time as forces are applied to the object.`,
          hotspots: [
            { x: 40, y: 50, label: 'Velocity Vector', info: 'Shows the speed and direction of motion' },
            { x: 60, y: 50, label: 'Acceleration Vector', info: 'Shows the rate of change of velocity' }
          ]
        }
      ];
    } else {
      // 3D visualizations
      return [
        {
          id: 1,
          title: '3D Force Simulation',
          description: 'Interactive 3D model demonstrating force application',
          duration: 180,
          audioText: `In this 3D simulation, we can observe how forces in three dimensions affect object motion. Adjust the parameters to see real-time changes.`,
          controls: ['Rotate', 'Zoom', 'Pan', 'Reset View']
        },
        {
          id: 2,
          title: 'Molecular Dynamics',
          description: 'Atomic-level visualization of molecular forces',
          duration: 200,
          audioText: `This molecular dynamics simulation shows how atoms interact through various forces at the microscopic level.`,
          controls: ['Play/Pause', 'Speed Control', 'Temperature', 'Pressure']
        },
        {
          id: 3,
          title: 'Electromagnetic Field',
          description: '3D visualization of electromagnetic interactions',
          duration: 160,
          audioText: `Visualize electromagnetic fields in three dimensions and see how charges interact with the field lines.`,
          controls: ['Field Strength', 'Charge Value', 'View Angle', 'Time Control']
        }
      ];
    }
  };

  const visualizations = getVisualizations();
  const currentVisualization = visualizations[selectedVisualization];

  // Audio playback management
  useEffect(() => {
    if (isAudioPlaying && audioEnabled) {
      startAudioExplanation();
    } else {
      stopAudioExplanation();
    }
  }, [isAudioPlaying, audioEnabled, selectedVisualization]);

  const startAudioExplanation = () => {
    if (!audioEnabled) return;

    // Stop any existing audio
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(currentVisualization.audioText);
    utterance.rate = 0.9;
    utterance.volume = 0.8;
    utterance.onstart = () => {
      setLocalAudioPlaying(true);
      startProgressTracking();
    };
    utterance.onend = () => {
      setLocalAudioPlaying(false);
      onAudioStateChange?.(false);
      stopProgressTracking();
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopAudioExplanation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setLocalAudioPlaying(false);
    stopProgressTracking();
  };

  const startProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    
    setCurrentProgress(0);
    const duration = currentVisualization.duration * 1000; // Convert to milliseconds
    const intervalDuration = 100; // Update every 100ms
    const increment = (intervalDuration / duration) * 100;

    progressInterval.current = setInterval(() => {
      setCurrentProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval.current!);
          return 100;
        }
        return prev + increment;
      });
    }, intervalDuration);
  };

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const handleParameterChange = (param: string, value: number) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                {mode === 'diagrams' ? (
                  <Eye className="h-5 w-5 text-blue-600" />
                ) : (
                  <Move3D className="h-5 w-5 text-purple-600" />
                )}
                {mode === 'diagrams' ? 'Interactive Diagrams' : 'Advanced 3D Interactive Lab'}
              </CardTitle>
              <CardDescription>
                {mode === 'diagrams' 
                  ? 'Explore interactive diagrams with synchronized audio explanations' 
                  : 'Experience immersive 3D simulations with real-time parameter control'
                }
              </CardDescription>
            </div>
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
        </CardHeader>
      </Card>

      {/* Visualization Selector */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {visualizations.map((viz, index) => (
              <motion.div
                key={viz.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    selectedVisualization === index 
                      ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/30' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedVisualization(index)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{viz.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {viz.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">
                        {Math.floor(viz.duration / 60)}:{(viz.duration % 60).toString().padStart(2, '0')}
                      </Badge>
                      {selectedVisualization === index && (
                        <Badge className="bg-blue-500">Active</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Audio Progress */}
          {(localAudioPlaying || isAudioPlaying) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Audio Explanation Playing
                </span>
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  {Math.floor(currentProgress)}%
                </span>
              </div>
              <Progress value={currentProgress} className="h-2" />
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Main Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization Display */}
        <div className="lg:col-span-2">
          <Card className="h-96">
            <CardContent className="p-0 h-full">
              <div className="relative h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
                {mode === 'diagrams' ? (
                  // Diagram View
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <Eye className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            {currentVisualization.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-2">
                            Interactive diagram visualization
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Interactive Hotspots */}
                    {mode === 'diagrams' && currentVisualization.hotspots?.map((hotspot, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer shadow-lg"
                        style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                        whileHover={{ scale: 1.5 }}
                        title={hotspot.info}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                          {hotspot.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // 3D View
                  <div className="text-center">
                    <Move3D className="h-16 w-16 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {currentVisualization.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      3D Interactive Simulation
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm">
                        <MousePointer className="h-4 w-4 mr-2" />
                        Interact
                      </Button>
                      <Button variant="outline" size="sm">
                        <Maximize className="h-4 w-4 mr-2" />
                        Fullscreen
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          {/* Parameter Controls for 3D mode */}
          {mode === '3d' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Simulation Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(parameters).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium capitalize">{key}</label>
                      <span className="text-sm text-gray-500">{value}</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="10"
                      step="0.1"
                      value={value}
                      onChange={(e) => handleParameterChange(key, parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Interactive Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Interactive Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mode === 'diagrams' ? (
                <>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Zoom & Pan
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MousePointer className="h-4 w-4 mr-2" />
                    Hotspot Info
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Annotations
                  </Button>
                </>
              ) : (
                currentVisualization.controls?.map((control, index) => (
                  <Button key={index} variant="outline" size="sm" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    {control}
                  </Button>
                ))
              )}
            </CardContent>
          </Card>

          {/* Visualization Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Current Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium mb-2">{currentVisualization.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {currentVisualization.description}
              </p>
              <div className="text-xs text-gray-500">
                Duration: {Math.floor(currentVisualization.duration / 60)}:{(currentVisualization.duration % 60).toString().padStart(2, '0')}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Tutor Panel */}
      <AnimatePresence>
        {showAITutor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <MessageSquare className="h-5 w-5" />
                  AI Tutor - {currentVisualization.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    I'm here to help explain this {mode === 'diagrams' ? 'diagram' : '3D simulation'}. 
                    {mode === 'diagrams' 
                      ? ' Click on the hotspots to learn about different elements, or ask me specific questions about the forces and interactions shown.'
                      : ' Adjust the parameters to see how they affect the simulation, and I\'ll explain what\'s happening in real-time.'
                    }
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Explain Current View
                  </Button>
                  <Button variant="outline" size="sm">
                    Ask Question
                  </Button>
                  <Button variant="outline" size="sm">
                    Show Key Concepts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Enhanced3DTab;
