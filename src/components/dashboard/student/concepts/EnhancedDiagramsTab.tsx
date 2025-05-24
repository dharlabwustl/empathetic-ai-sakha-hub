
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Bot, ZoomIn, ZoomOut, Info, CheckCircle2, Eye, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AITutorDialog from './AITutorDialog';

interface EnhancedDiagramsTabProps {
  conceptName: string;
  subject: string;
  globalAudioState?: {
    isPlaying: boolean;
    isEnabled: boolean;
    progress: number;
  };
}

interface DiagramAnnotation {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  audioExplanation: string;
  duration: number;
  completed: boolean;
}

interface DiagramData {
  id: string;
  title: string;
  description: string;
  audioIntro: string;
  totalDuration: number;
  annotations: DiagramAnnotation[];
}

const EnhancedDiagramsTab: React.FC<EnhancedDiagramsTabProps> = ({ 
  conceptName, 
  subject,
  globalAudioState 
}) => {
  const [currentDiagram, setCurrentDiagram] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showAITutor, setShowAITutor] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [completedAnnotations, setCompletedAnnotations] = useState<Set<string>>(new Set());
  const [currentAnnotationIndex, setCurrentAnnotationIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Comprehensive diagrams with detailed audio explanations
  const diagrams: DiagramData[] = [
    {
      id: 'force_vectors',
      title: 'Force Vector Analysis',
      description: 'Understanding directional forces and their components',
      audioIntro: `Welcome to force vector analysis! This diagram shows how forces act in different directions and how we can break them down into components. Let's explore each element systematically.`,
      totalDuration: 60,
      annotations: [
        {
          id: 'applied_force',
          x: 25,
          y: 30,
          title: 'Applied Force Vector',
          description: 'The primary force applied to the object',
          audioExplanation: `This red vector represents the applied force. Notice its magnitude shown by the arrow length and direction. In physics, we represent forces as vectors because they have both magnitude and direction. The longer the arrow, the stronger the force.`,
          duration: 15,
          completed: false
        },
        {
          id: 'friction_force',
          x: 70,
          y: 65,
          title: 'Friction Force',
          description: 'The opposing force that resists motion',
          audioExplanation: `Here we see the friction force, always opposing the direction of motion or intended motion. Friction depends on the surface materials and the normal force pressing the surfaces together. This is why it's harder to push a heavy box than a light one.`,
          duration: 18,
          completed: false
        },
        {
          id: 'normal_force',
          x: 50,
          y: 20,
          title: 'Normal Force',
          description: 'The perpendicular force from the surface',
          audioExplanation: `The normal force acts perpendicular to the surface, supporting the object against gravity. On a level surface, it equals the object's weight. On an inclined plane, it's less than the weight because some weight component acts parallel to the surface.`,
          duration: 16,
          completed: false
        },
        {
          id: 'resultant',
          x: 45,
          y: 50,
          title: 'Resultant Force',
          description: 'The net effect of all forces combined',
          audioExplanation: `The resultant force is the vector sum of all individual forces. When forces are balanced, the resultant is zero and the object maintains constant velocity. When unbalanced, the resultant causes acceleration according to Newton's second law.`,
          duration: 20,
          completed: false
        }
      ]
    },
    {
      id: 'motion_analysis',
      title: 'Motion Trajectory Analysis',
      description: 'Analyzing projectile motion and velocity components',
      audioIntro: `Now let's examine projectile motion, one of the most beautiful examples of physics in action. We'll see how an object moves under the influence of gravity alone.`,
      totalDuration: 50,
      annotations: [
        {
          id: 'launch_angle',
          x: 15,
          y: 40,
          title: 'Launch Angle',
          description: 'The initial angle of projection',
          audioExplanation: `The launch angle determines the trajectory shape. At 45 degrees, we get maximum range in a vacuum. Lower angles give flatter trajectories, while higher angles create steeper, shorter paths.`,
          duration: 14,
          completed: false
        },
        {
          id: 'velocity_components',
          x: 35,
          y: 25,
          title: 'Velocity Components',
          description: 'Horizontal and vertical velocity components',
          audioExplanation: `Velocity has horizontal and vertical components. The horizontal component remains constant in the absence of air resistance, while the vertical component changes due to gravity, starting positive and becoming negative.`,
          duration: 18,
          completed: false
        },
        {
          id: 'trajectory_path',
          x: 60,
          y: 35,
          title: 'Parabolic Path',
          description: 'The curved path of projectile motion',
          audioExplanation: `The trajectory forms a parabola because gravity acts only vertically while horizontal motion continues unchanged. This creates the characteristic curved path we see in thrown balls, water from fountains, and artillery shells.`,
          duration: 18,
          completed: false
        }
      ]
    }
  ];

  const currentDiagramData = diagrams[currentDiagram];
  const currentAnnotation = currentDiagramData.annotations[currentAnnotationIndex];

  // Handle global audio state changes
  useEffect(() => {
    if (globalAudioState) {
      setIsPlaying(globalAudioState.isPlaying && globalAudioState.isEnabled && audioEnabled);
    }
  }, [globalAudioState, audioEnabled]);

  // Audio-synchronized progression through annotations
  useEffect(() => {
    if (isPlaying && currentAnnotation && audioEnabled) {
      const interval = setInterval(() => {
        setAudioProgress(prev => {
          const increment = 100 / currentAnnotation.duration;
          const newProgress = prev + increment;
          
          if (newProgress >= 100) {
            // Mark current annotation as completed
            setCompletedAnnotations(prevCompleted => 
              new Set([...prevCompleted, currentAnnotation.id])
            );
            
            // Move to next annotation or next diagram
            if (currentAnnotationIndex < currentDiagramData.annotations.length - 1) {
              setCurrentAnnotationIndex(prev => prev + 1);
              setSelectedAnnotation(currentDiagramData.annotations[currentAnnotationIndex + 1].id);
              setAudioProgress(0);
            } else if (currentDiagram < diagrams.length - 1) {
              setCurrentDiagram(prev => prev + 1);
              setCurrentAnnotationIndex(0);
              setSelectedAnnotation(diagrams[currentDiagram + 1].annotations[0].id);
              setAudioProgress(0);
            } else {
              setIsPlaying(false);
              setAudioProgress(100);
            }
            
            return newProgress >= 100 ? 100 : newProgress;
          }
          return newProgress;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentAnnotation, currentAnnotationIndex, currentDiagram, currentDiagramData, diagrams, audioEnabled]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && !selectedAnnotation && currentDiagramData.annotations.length > 0) {
      setSelectedAnnotation(currentDiagramData.annotations[0].id);
      setCurrentAnnotationIndex(0);
    }
    window.dispatchEvent(new CustomEvent('diagramAudioToggle', { 
      detail: { isPlaying: !isPlaying } 
    }));
  };

  const handleReset = () => {
    setCurrentDiagram(0);
    setCurrentAnnotationIndex(0);
    setAudioProgress(0);
    setIsPlaying(false);
    setCompletedAnnotations(new Set());
    setSelectedAnnotation(null);
  };

  const handleAnnotationClick = (annotationId: string) => {
    const index = currentDiagramData.annotations.findIndex(a => a.id === annotationId);
    if (index !== -1) {
      setSelectedAnnotation(annotationId);
      setCurrentAnnotationIndex(index);
      setCompletedAnnotations(prev => new Set([...prev, annotationId]));
      if (!isPlaying) {
        setAudioProgress(0);
      }
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const overallProgress = currentDiagram === 0 
    ? (currentAnnotationIndex + audioProgress / 100) / currentDiagramData.annotations.length * 50
    : 50 + (currentAnnotationIndex + audioProgress / 100) / currentDiagramData.annotations.length * 50;

  return (
    <div className="space-y-6">
      {/* Interactive Visualizations Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              Interactive Visualizations - {conceptName}
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
                {isPlaying ? 'Pause' : 'Play'} Audio Guide
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

          {/* Progress Tracking */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div 
                className="bg-green-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Diagram {currentDiagram + 1}: {currentDiagramData.title} - {currentAnnotation?.title || 'Starting'}
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive Diagram Viewer */}
            <div className="lg:col-span-2">
              <div className="relative">
                {/* Zoom and View Controls */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomIn}
                    className="bg-white shadow-lg"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomOut}
                    className="bg-white shadow-lg"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </div>

                {/* Enhanced Diagram Canvas */}
                <div 
                  className="bg-white rounded-lg border-2 border-gray-200 h-96 relative overflow-hidden"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                >
                  {/* Diagram Background */}
                  <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div 
                        className="w-40 h-28 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mx-auto mb-4 shadow-lg relative flex items-center justify-center"
                        animate={{
                          rotateY: isPlaying ? [0, 5, -5, 0] : 0,
                          scale: isPlaying ? [1, 1.02, 1] : 1
                        }}
                        transition={{ duration: 3, repeat: isPlaying ? Infinity : 0 }}
                      >
                        <span className="text-white font-bold">{currentDiagramData.title}</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Interactive Annotations */}
                  <AnimatePresence>
                    {currentDiagramData.annotations.map((annotation) => (
                      <motion.button
                        key={annotation.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className={`absolute w-8 h-8 rounded-full shadow-lg transition-all transform hover:scale-125 flex items-center justify-center ${
                          completedAnnotations.has(annotation.id)
                            ? 'bg-green-500'
                            : selectedAnnotation === annotation.id
                            ? 'bg-blue-600 ring-4 ring-blue-200'
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                        style={{
                          left: `${annotation.x}%`,
                          top: `${annotation.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onClick={() => handleAnnotationClick(annotation.id)}
                        title={annotation.title}
                      >
                        {completedAnnotations.has(annotation.id) ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : selectedAnnotation === annotation.id ? (
                          <Target className="h-5 w-5 text-white" />
                        ) : (
                          <Info className="h-4 w-4 text-white" />
                        )}
                      </motion.button>
                    ))}
                  </AnimatePresence>

                  {/* Audio Progress Indicator */}
                  {isPlaying && selectedAnnotation && audioEnabled && (
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-lg p-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div
                          className="w-2 h-2 bg-green-600 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        />
                        <span className="text-sm font-medium">Audio Explanation</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${audioProgress}%` }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Diagram Navigation */}
              <div className="flex justify-center gap-2 mt-4">
                {diagrams.map((diagram, index) => (
                  <Button
                    key={index}
                    variant={index === currentDiagram ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setCurrentDiagram(index);
                      setCurrentAnnotationIndex(0);
                      setSelectedAnnotation(diagrams[index].annotations[0]?.id || null);
                      setAudioProgress(0);
                    }}
                    disabled={isPlaying}
                    className="min-w-[100px]"
                  >
                    {diagram.title.split(' ')[0]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Annotation Details & AI Assistant */}
            <div className="space-y-4">
              {/* Current Diagram Info */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Diagram Overview</h4>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h5 className="font-medium text-green-900">{currentDiagramData.title}</h5>
                  <p className="text-sm text-green-700 mt-1">{currentDiagramData.description}</p>
                  {isPlaying && currentAnnotationIndex === 0 && audioProgress < 20 && (
                    <div className="mt-2 p-2 bg-green-100 rounded text-xs text-green-800">
                      <strong>Audio:</strong> {currentDiagramData.audioIntro.substring(0, 80)}...
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Annotation Details */}
              {selectedAnnotation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 rounded-lg p-4 border border-blue-200"
                >
                  {(() => {
                    const annotation = currentDiagramData.annotations.find(a => a.id === selectedAnnotation);
                    return annotation ? (
                      <>
                        <h5 className="font-medium text-blue-900">{annotation.title}</h5>
                        <p className="text-sm text-blue-700 mt-1">{annotation.description}</p>
                        {isPlaying && selectedAnnotation === currentAnnotation?.id && (
                          <div className="mt-2 p-2 bg-blue-100 rounded text-xs text-blue-800">
                            <strong>Audio:</strong> {annotation.audioExplanation.substring(0, 100)}...
                          </div>
                        )}
                      </>
                    ) : null;
                  })()}
                </motion.div>
              )}

              {/* Annotations Progress */}
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Element Progress</h5>
                <div className="space-y-2">
                  {currentDiagramData.annotations.map((annotation, index) => (
                    <div
                      key={annotation.id}
                      className={`flex items-center gap-2 text-sm p-2 rounded cursor-pointer transition-all ${
                        selectedAnnotation === annotation.id
                          ? 'bg-blue-100 border border-blue-300'
                          : completedAnnotations.has(annotation.id)
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => handleAnnotationClick(annotation.id)}
                    >
                      {completedAnnotations.has(annotation.id) ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : selectedAnnotation === annotation.id ? (
                        <Target className="h-4 w-4 text-blue-600" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      )}
                      <span className="flex-1">{annotation.title}</span>
                      <span className="text-xs opacity-70">{annotation.duration}s</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced AI Visual Assistant */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  AI Visual Assistant
                </h5>
                <p className="text-sm text-green-700 mb-3">
                  I can explain any diagram element, provide deeper insights, and test your understanding!
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowAITutor(true)}
                  >
                    Explain Selected Element
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowAITutor(true)}
                  >
                    How Does This Apply?
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowAITutor(true)}
                  >
                    Quiz My Understanding
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowAITutor(true)}
                  >
                    Show Similar Examples
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
        context={`Interactive visualization: ${currentDiagramData.title}, Current element: ${currentAnnotation?.title || 'Overview'}, Audio explanation: ${currentAnnotation?.audioExplanation || currentDiagramData.audioIntro}`}
        subject={subject}
      />
    </div>
  );
};

export default EnhancedDiagramsTab;
