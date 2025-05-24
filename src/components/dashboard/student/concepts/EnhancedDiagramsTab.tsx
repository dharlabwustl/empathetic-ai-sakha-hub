
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, Play, Pause, RotateCcw, Volume2, ZoomIn, ZoomOut, MessageSquare, Info, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedDiagramsTabProps {
  conceptName: string;
  subject: string;
  isPlaying?: boolean;
  audioEnabled?: boolean;
  onPlayStateChange?: (playing: boolean) => void;
}

const EnhancedDiagramsTab: React.FC<EnhancedDiagramsTabProps> = ({ 
  conceptName, 
  subject, 
  isPlaying, 
  audioEnabled, 
  onPlayStateChange 
}) => {
  const [currentDiagram, setCurrentDiagram] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [isPlaying3D, setIsPlaying3D] = useState(false);
  const [progress, setProgress] = useState(0);
  const [annotationsVisible, setAnnotationsVisible] = useState(true);

  const diagrams = [
    {
      id: 1,
      title: "Force Vector Diagram",
      description: "Understanding force vectors and their components in Newton's Second Law",
      imageUrl: "/api/placeholder/600/400",
      hotspots: [
        { x: 50, y: 30, label: "Applied Force", description: "The external force applied to the object" },
        { x: 50, y: 70, label: "Weight", description: "The gravitational force acting downward" },
        { x: 80, y: 50, label: "Acceleration", description: "The resulting acceleration of the object" }
      ],
      audioScript: "This diagram shows the force vectors acting on an object. The applied force and weight combine to produce a net force, which results in acceleration according to Newton's Second Law."
    },
    {
      id: 2,
      title: "Free Body Diagram",
      description: "Isolating the object and showing all forces acting upon it",
      imageUrl: "/api/placeholder/600/400",
      hotspots: [
        { x: 50, y: 50, label: "Object", description: "The object being analyzed" },
        { x: 30, y: 30, label: "Normal Force", description: "The force perpendicular to the surface" },
        { x: 70, y: 30, label: "Applied Force", description: "The external force applied" },
        { x: 50, y: 80, label: "Weight", description: "The gravitational force" }
      ],
      audioScript: "A free body diagram isolates the object and shows all forces acting upon it. This helps us apply Newton's Second Law by identifying the net force."
    },
    {
      id: 3,
      title: "Motion Analysis",
      description: "Showing the relationship between force, mass, and acceleration",
      imageUrl: "/api/placeholder/600/400",
      hotspots: [
        { x: 25, y: 50, label: "Initial State", description: "Object at rest or constant velocity" },
        { x: 50, y: 30, label: "Applied Force", description: "Force causing acceleration" },
        { x: 75, y: 50, label: "Final State", description: "Object with increased velocity" }
      ],
      audioScript: "This diagram demonstrates how applying a force changes the motion of an object, illustrating the direct relationship described in Newton's Second Law."
    }
  ];

  useEffect(() => {
    if (isPlaying && audioEnabled) {
      playDiagramAudio();
    } else {
      stopAudio();
    }
  }, [isPlaying, audioEnabled, currentDiagram]);

  const playDiagramAudio = () => {
    const diagram = diagrams[currentDiagram];
    if ('speechSynthesis' in window && audioEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(diagram.audioScript);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      utterance.onstart = () => setIsPlaying3D(true);
      utterance.onend = () => {
        setIsPlaying3D(false);
        onPlayStateChange?.(false);
        if (currentDiagram < diagrams.length - 1) {
          setTimeout(() => {
            setCurrentDiagram(prev => prev + 1);
            setProgress(((currentDiagram + 1) / diagrams.length) * 100);
          }, 1000);
        }
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying3D(false);
  };

  const handlePlayPause = () => {
    const newState = !isPlaying3D;
    setIsPlaying3D(newState);
    onPlayStateChange?.(newState);
    
    if (newState) {
      playDiagramAudio();
    } else {
      stopAudio();
    }
  };

  const handleReset = () => {
    setCurrentDiagram(0);
    setProgress(0);
    setActiveHotspot(null);
    setZoomLevel(100);
    stopAudio();
    onPlayStateChange?.(false);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(200, prev + 25));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(50, prev - 25));
  };

  const currentDiagramData = diagrams[currentDiagram];

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Interactive Diagrams - {conceptName}
        </h2>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayPause}
            className="flex items-center gap-2"
          >
            {isPlaying3D ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying3D ? 'Pause' : 'Play Tour'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            AI Tutor
          </Button>
        </div>
      </motion.div>

      {/* Progress and Controls */}
      <motion.div 
        className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-xl border"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Diagram Progress</span>
          <span className="text-sm text-gray-600">{currentDiagram + 1}/{diagrams.length}</span>
        </div>
        <Progress value={((currentDiagram + 1) / diagrams.length) * 100} className="h-2 mb-3" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {diagrams.map((_, index) => (
              <Button
                key={index}
                variant={index === currentDiagram ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentDiagram(index)}
                className="w-8 h-8 p-0"
              >
                {index + 1}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <span className="text-sm font-medium w-12 text-center">{zoomLevel}%</span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 200}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Audio Status */}
      {isPlaying3D && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3"
        >
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-green-600 animate-pulse" />
            <span className="text-sm font-medium text-green-800 dark:text-green-300">
              Audio explanation playing for: {currentDiagramData.title}
            </span>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Diagram Display */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                {currentDiagramData.title}
              </CardTitle>
              <p className="text-sm text-green-100">{currentDiagramData.description}</p>
            </CardHeader>
            <CardContent className="p-0 relative">
              <div 
                className="relative overflow-auto bg-gray-50 dark:bg-gray-900"
                style={{ height: '400px' }}
              >
                <motion.div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{ 
                    transform: `scale(${zoomLevel / 100})`,
                    transition: 'transform 0.3s ease'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={currentDiagram}
                >
                  {/* Diagram Placeholder */}
                  <div className="w-96 h-64 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center relative">
                    <div className="text-center">
                      <Eye className="h-16 w-16 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Interactive Diagram: {currentDiagramData.title}</p>
                    </div>
                    
                    {/* Interactive Hotspots */}
                    {annotationsVisible && currentDiagramData.hotspots.map((hotspot, index) => (
                      <motion.div
                        key={index}
                        className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all ${
                          activeHotspot === index 
                            ? 'bg-blue-500 ring-4 ring-blue-200' 
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                        style={{ 
                          left: `${hotspot.x}%`, 
                          top: `${hotspot.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onClick={() => setActiveHotspot(activeHotspot === index ? null : index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Diagram Controls */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setAnnotationsVisible(!annotationsVisible)}
                  className="bg-white/90 hover:bg-white"
                >
                  <Target className="h-4 w-4 mr-1" />
                  {annotationsVisible ? 'Hide' : 'Show'} Hotspots
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with Hotspot Info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Diagram Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentDiagramData.hotspots.map((hotspot, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    activeHotspot === index
                      ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveHotspot(activeHotspot === index ? null : index)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-2">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      activeHotspot === index ? 'bg-blue-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <h4 className="font-medium text-sm">{hotspot.label}</h4>
                      {activeHotspot === index && (
                        <motion.p 
                          className="text-xs text-gray-600 dark:text-gray-400 mt-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                        >
                          {hotspot.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setCurrentDiagram(Math.max(0, currentDiagram - 1))}
                disabled={currentDiagram === 0}
              >
                Previous Diagram
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setCurrentDiagram(Math.min(diagrams.length - 1, currentDiagram + 1))}
                disabled={currentDiagram === diagrams.length - 1}
              >
                Next Diagram
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDiagramsTab;
