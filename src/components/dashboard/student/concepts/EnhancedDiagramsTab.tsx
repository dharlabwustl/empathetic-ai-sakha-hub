
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Bot, ZoomIn, ZoomOut, Info, CheckCircle2 } from 'lucide-react';
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
  completed: boolean;
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

  // Sample diagrams with annotations
  const diagrams = [
    {
      id: 'diagram1',
      title: 'Force Vectors',
      description: 'Understanding directional forces',
      image: '/lovable-uploads/diagram1.png',
      annotations: [
        {
          id: 'force1',
          x: 30,
          y: 20,
          title: 'Applied Force',
          description: 'The force applied to move the object forward',
          completed: false
        },
        {
          id: 'force2',
          x: 70,
          y: 60,
          title: 'Friction Force',
          description: 'The opposing force that resists motion',
          completed: false
        }
      ]
    },
    {
      id: 'diagram2',
      title: 'Motion Analysis',
      description: 'Analyzing object trajectory',
      image: '/lovable-uploads/diagram2.png',
      annotations: [
        {
          id: 'trajectory',
          x: 50,
          y: 30,
          title: 'Projectile Path',
          description: 'The curved path of the projectile motion',
          completed: false
        }
      ]
    }
  ];

  const currentDiagramData = diagrams[currentDiagram];

  // Handle global audio state changes
  useEffect(() => {
    if (globalAudioState) {
      setIsPlaying(globalAudioState.isPlaying && globalAudioState.isEnabled);
    }
  }, [globalAudioState]);

  // Auto-progress through diagrams during audio playback
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setAudioProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            if (currentDiagram < diagrams.length - 1) {
              setCurrentDiagram(prev => prev + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentDiagram, diagrams.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    window.dispatchEvent(new CustomEvent('diagramAudioToggle', { 
      detail: { isPlaying: !isPlaying } 
    }));
  };

  const handleReset = () => {
    setCurrentDiagram(0);
    setAudioProgress(0);
    setIsPlaying(false);
    setCompletedAnnotations(new Set());
    setSelectedAnnotation(null);
  };

  const handleAnnotationClick = (annotationId: string) => {
    setSelectedAnnotation(annotationId);
    setCompletedAnnotations(prev => new Set([...prev, annotationId]));
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="space-y-6">
      {/* Diagram Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-green-600" />
              Interactive Diagrams - {conceptName}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                className="flex items-center gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'} Audio
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

          {/* Audio Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <motion.div 
              className="bg-green-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${audioProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Diagram {currentDiagram + 1} of {diagrams.length} - {currentDiagramData.title}
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive Diagram Viewer */}
            <div className="lg:col-span-2">
              <div className="relative">
                {/* Zoom Controls */}
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

                {/* Diagram Canvas */}
                <div 
                  className="bg-white rounded-lg border-2 border-gray-200 h-96 relative overflow-hidden"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                >
                  {/* Sample Diagram Background */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-20 bg-blue-500 rounded-lg mx-auto mb-4 shadow-lg relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                          {currentDiagramData.title}
                        </span>
                      </div>
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
                        className={`absolute w-6 h-6 rounded-full shadow-lg transition-all transform hover:scale-110 ${
                          completedAnnotations.has(annotation.id)
                            ? 'bg-green-500'
                            : selectedAnnotation === annotation.id
                            ? 'bg-blue-600'
                            : 'bg-red-500'
                        }`}
                        style={{
                          left: `${annotation.x}%`,
                          top: `${annotation.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onClick={() => handleAnnotationClick(annotation.id)}
                        title={annotation.title}
                      >
                        {completedAnnotations.has(annotation.id) && (
                          <CheckCircle2 className="h-4 w-4 text-white m-1" />
                        )}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Diagram Navigation */}
              <div className="flex justify-center gap-2 mt-4">
                {diagrams.map((_, index) => (
                  <Button
                    key={index}
                    variant={index === currentDiagram ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentDiagram(index)}
                    disabled={isPlaying}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </div>

            {/* Annotation Details & AI Assistant */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Diagram Details</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900">{currentDiagramData.title}</h5>
                  <p className="text-sm text-gray-600 mt-1">{currentDiagramData.description}</p>
                </div>
              </div>

              {/* Selected Annotation Info */}
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
                      </>
                    ) : null;
                  })()}
                </motion.div>
              )}

              {/* Annotations Progress */}
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Annotations Progress</h5>
                <div className="space-y-2">
                  {currentDiagramData.annotations.map((annotation) => (
                    <div
                      key={annotation.id}
                      className={`flex items-center gap-2 text-sm p-2 rounded ${
                        completedAnnotations.has(annotation.id)
                          ? 'bg-green-50 text-green-800'
                          : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      {completedAnnotations.has(annotation.id) ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      )}
                      <span>{annotation.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Visual Assistant */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  AI Visual Assistant
                </h5>
                <p className="text-sm text-green-700 mb-3">
                  Ask me about any part of this diagram!
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowAITutor(true)}
                  >
                    Explain This Diagram
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowAITutor(true)}
                  >
                    Quiz My Understanding
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
        context={`Interactive diagram: ${currentDiagramData.title} - ${currentDiagramData.description}`}
        subject={subject}
      />
    </div>
  );
};

export default EnhancedDiagramsTab;
