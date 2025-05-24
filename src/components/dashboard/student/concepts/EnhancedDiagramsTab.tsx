
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, Play, Pause, Volume2, ZoomIn, ZoomOut, RotateCw, MessageSquare, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlobalAudioState {
  isPlaying: boolean;
  isEnabled: boolean;
  progress: number;
}

interface EnhancedDiagramsTabProps {
  conceptName: string;
  subject: string;
  globalAudioState?: GlobalAudioState;
}

interface DiagramData {
  id: number;
  title: string;
  description: string;
  svgContent: string;
  audioText: string;
  hotspots: Array<{
    x: number;
    y: number;
    label: string;
    info: string;
  }>;
  duration: number;
}

const EnhancedDiagramsTab: React.FC<EnhancedDiagramsTabProps> = ({ 
  conceptName, 
  subject,
  globalAudioState 
}) => {
  const [currentDiagram, setCurrentDiagram] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);
  const [showAITutor, setShowAITutor] = useState(false);
  const [annotations, setAnnotations] = useState<Array<{x: number, y: number, note: string}>>([]);

  // Sample diagram data
  const diagrams: DiagramData[] = [
    {
      id: 1,
      title: "Force Vector Diagram",
      description: "Understanding force directions and magnitudes",
      svgContent: `
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
          </defs>
          <rect width="400" height="300" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
          <circle cx="200" cy="150" r="20" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
          <text x="200" y="155" textAnchor="middle" className="text-sm font-medium fill-white">m</text>
          
          <line x1="200" y1="150" x2="300" y2="150" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          <text x="250" y="140" textAnchor="middle" className="text-sm font-medium fill-blue-600">F₁ = 50N</text>
          
          <line x1="200" y1="150" x2="200" y2="80" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          <text x="210" y="115" className="text-sm font-medium fill-red-600">F₂ = 30N</text>
          
          <line x1="200" y1="150" x2="150" y2="150" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          <text x="150" y="140" textAnchor="middle" className="text-sm font-medium fill-green-600">F₃ = 20N</text>
          
          <line x1="200" y1="150" x2="280" y2="100" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          <text x="240" y="125" className="text-sm font-medium fill-amber-600">F_net</text>
        </svg>
      `,
      audioText: "This diagram shows multiple forces acting on an object with mass m. Force F1 acts horizontally to the right with 50 Newtons, F2 acts vertically upward with 30 Newtons, and F3 acts horizontally to the left with 20 Newtons. The net force is shown in yellow, representing the vector sum of all forces.",
      hotspots: [
        { x: 200, y: 150, label: "Mass (m)", info: "The object experiencing forces" },
        { x: 300, y: 150, label: "F₁ (50N)", info: "Horizontal force to the right" },
        { x: 200, y: 80, label: "F₂ (30N)", info: "Vertical force upward" },
        { x: 150, y: 150, label: "F₃ (20N)", info: "Horizontal force to the left" },
        { x: 280, y: 100, label: "F_net", info: "Resultant net force vector" }
      ],
      duration: 25
    },
    {
      id: 2,
      title: "Free Body Diagram",
      description: "Isolated object showing all forces",
      svgContent: `
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <defs>
            <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#dc2626" />
            </marker>
          </defs>
          <rect width="400" height="300" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2"/>
          <rect x="180" y="130" width="40" height="40" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="200" y="155" textAnchor="middle" className="text-sm font-bold fill-white">Box</text>
          
          <line x1="200" y1="130" x2="200" y2="60" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead2)"/>
          <text x="210" y="95" className="text-sm font-medium fill-red-600">Normal (N)</text>
          
          <line x1="200" y1="170" x2="200" y2="240" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead2)"/>
          <text x="210" y="205" className="text-sm font-medium fill-red-600">Weight (mg)</text>
          
          <line x1="180" y1="150" x2="110" y2="150" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead2)"/>
          <text x="145" y="140" textAnchor="middle" className="text-sm font-medium fill-red-600">Friction (f)</text>
          
          <line x1="220" y1="150" x2="290" y2="150" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead2)"/>
          <text x="255" y="140" textAnchor="middle" className="text-sm font-medium fill-red-600">Applied (F)</text>
        </svg>
      `,
      audioText: "This free body diagram shows a box with all forces acting on it. The normal force N acts upward, balancing the weight mg acting downward. An applied force F pushes the box to the right, while friction force f opposes motion to the left. This isolated view helps analyze the net force and predict motion.",
      hotspots: [
        { x: 200, y: 150, label: "Box", info: "The object being analyzed" },
        { x: 200, y: 60, label: "Normal Force", info: "Upward force from surface" },
        { x: 200, y: 240, label: "Weight", info: "Gravitational force downward" },
        { x: 110, y: 150, label: "Friction", info: "Opposes motion" },
        { x: 290, y: 150, label: "Applied Force", info: "External force applied" }
      ],
      duration: 30
    },
    {
      id: 3,
      title: "Acceleration Visualization",
      description: "Object acceleration under net force",
      svgContent: `
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <defs>
            <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#059669" />
            </marker>
          </defs>
          <rect width="400" height="300" fill="#ecfdf5" stroke="#d1fae5" strokeWidth="2"/>
          
          <circle cx="120" cy="150" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
          <text x="120" y="155" textAnchor="middle" className="text-xs font-bold fill-white">t=0</text>
          
          <circle cx="200" cy="150" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="200" y="155" textAnchor="middle" className="text-xs font-bold fill-white">t=1</text>
          
          <circle cx="320" cy="150" r="15" fill="#10b981" stroke="#059669" strokeWidth="2"/>
          <text x="320" y="155" textAnchor="middle" className="text-xs font-bold fill-white">t=2</text>
          
          <line x1="135" y1="150" x2="185" y2="150" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
          <text x="160" y="140" textAnchor="middle" className="text-xs fill-green-600">v₁</text>
          
          <line x1="215" y1="150" x2="305" y2="150" stroke="#059669" strokeWidth="3" markerEnd="url(#arrowhead3)"/>
          <text x="260" y="140" textAnchor="middle" className="text-xs fill-green-600">v₂ > v₁</text>
          
          <text x="200" y="50" textAnchor="middle" className="text-lg font-bold fill-gray-700">F = ma → Increasing Velocity</text>
          <text x="200" y="280" textAnchor="middle" className="text-sm fill-gray-600">Constant force produces constant acceleration</text>
        </svg>
      `,
      audioText: "This diagram illustrates how Newton's Second Law creates acceleration. At time zero, the object starts from rest. After one second, it has gained velocity v1. After two seconds, the velocity v2 is greater than v1. The constant applied force produces constant acceleration, showing how F equals ma results in continuously increasing velocity.",
      hotspots: [
        { x: 120, y: 150, label: "t=0", info: "Starting position at rest" },
        { x: 200, y: 150, label: "t=1s", info: "After 1 second of acceleration" },
        { x: 320, y: 150, label: "t=2s", info: "After 2 seconds of acceleration" },
        { x: 160, y: 150, label: "v₁", info: "Velocity after 1 second" },
        { x: 260, y: 150, label: "v₂", info: "Greater velocity after 2 seconds" }
      ],
      duration: 28
    }
  ];

  // Listen to global audio events
  useEffect(() => {
    const handleGlobalAudioToggle = (event: CustomEvent) => {
      if (globalAudioState?.isEnabled) {
        setIsPlaying(event.detail.isPlaying);
        if (event.detail.isPlaying) {
          startAudioNarration();
        } else {
          stopAudioNarration();
        }
      }
    };

    const handleGlobalAudioReset = () => {
      setProgress(0);
      setIsPlaying(false);
      stopAudioNarration();
    };

    const handleGlobalAudioEnable = (event: CustomEvent) => {
      if (!event.detail.enabled) {
        setIsPlaying(false);
        stopAudioNarration();
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
  }, [globalAudioState]);

  const startAudioNarration = () => {
    const currentDiagramData = diagrams[currentDiagram];
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentDiagramData.audioText);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudioNarration = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const nextDiagram = () => {
    if (currentDiagram < diagrams.length - 1) {
      setCurrentDiagram(currentDiagram + 1);
      setProgress(0);
      setSelectedHotspot(null);
    }
  };

  const prevDiagram = () => {
    if (currentDiagram > 0) {
      setCurrentDiagram(currentDiagram - 1);
      setProgress(0);
      setSelectedHotspot(null);
    }
  };

  const currentDiagramData = diagrams[currentDiagram];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Visual Diagrams - {conceptName}</h2>
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
      <AnimatePresence>
        {showAITutor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Visual AI Tutor</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-400 mb-3">
                      I can explain the current diagram: "{currentDiagramData.title}" and help you understand the visual elements.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Explain this diagram
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        What does this show?
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Quiz me
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Diagram Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                {currentDiagramData.title}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {currentDiagramData.description}
              </p>
            </div>
            <Badge variant="outline">
              {currentDiagram + 1} of {diagrams.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Diagram Display */}
            <div className="lg:col-span-2">
              <div className="relative bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                <div 
                  className="relative"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                >
                  <div 
                    dangerouslySetInnerHTML={{ __html: currentDiagramData.svgContent }}
                    className="w-full h-80"
                  />
                  
                  {/* Interactive Hotspots */}
                  {currentDiagramData.hotspots.map((hotspot, index) => (
                    <motion.div
                      key={index}
                      className={`absolute w-4 h-4 rounded-full cursor-pointer ${
                        selectedHotspot === index 
                          ? 'bg-yellow-500 ring-4 ring-yellow-300' 
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                      style={{
                        left: `${(hotspot.x / 400) * 100}%`,
                        top: `${(hotspot.y / 300) * 100}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => setSelectedHotspot(selectedHotspot === index ? null : index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="w-full h-full rounded-full bg-white/20"></div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Zoom Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))}
                    className="bg-white/80 backdrop-blur-sm"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.5))}
                    className="bg-white/80 backdrop-blur-sm"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setZoomLevel(1)}
                    className="bg-white/80 backdrop-blur-sm"
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={prevDiagram}
                  disabled={currentDiagram === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={isPlaying ? "secondary" : "default"}
                    onClick={() => {
                      if (isPlaying) {
                        stopAudioNarration();
                      } else {
                        startAudioNarration();
                      }
                      setIsPlaying(!isPlaying);
                    }}
                    disabled={!globalAudioState?.isEnabled}
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? 'Pause' : 'Play'} Audio
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  onClick={nextDiagram}
                  disabled={currentDiagram === diagrams.length - 1}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Audio Progress */}
              {isPlaying && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <Volume2 className="h-4 w-4" />
                    <span>Audio Explanation</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>
            
            {/* Side Panel */}
            <div className="space-y-4">
              {/* Hotspot Information */}
              {selectedHotspot !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700"
                >
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">
                        {currentDiagramData.hotspots[selectedHotspot].label}
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                        {currentDiagramData.hotspots[selectedHotspot].info}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* All Hotspots List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Interactive Elements</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    {currentDiagramData.hotspots.map((hotspot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedHotspot(selectedHotspot === index ? null : index)}
                        className={`w-full text-left p-2 rounded text-sm transition-colors ${
                          selectedHotspot === index
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            selectedHotspot === index ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="font-medium">{hotspot.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Diagram List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">All Diagrams</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    {diagrams.map((diagram, index) => (
                      <button
                        key={diagram.id}
                        onClick={() => {
                          setCurrentDiagram(index);
                          setProgress(0);
                          setSelectedHotspot(null);
                        }}
                        className={`w-full text-left p-2 rounded text-sm transition-colors ${
                          currentDiagram === index
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="font-medium">{diagram.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{diagram.description}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDiagramsTab;
