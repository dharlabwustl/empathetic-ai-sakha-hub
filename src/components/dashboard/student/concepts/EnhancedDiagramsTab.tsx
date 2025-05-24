
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Volume2, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface EnhancedDiagramsTabProps {
  conceptName: string;
  subject: string;
  isPlaying?: boolean;
  isAudioEnabled?: boolean;
}

const EnhancedDiagramsTab: React.FC<EnhancedDiagramsTabProps> = ({ 
  conceptName, 
  subject,
  isPlaying = false,
  isAudioEnabled = true
}) => {
  const [currentDiagram, setCurrentDiagram] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);
  const [diagramProgress, setDiagramProgress] = useState(0);
  const [localPlaying, setLocalPlaying] = useState(false);

  // Sample diagrams based on subject
  const getDiagrams = () => {
    switch (subject.toLowerCase()) {
      case 'physics':
        return [
          {
            id: 1,
            title: "Force Vectors Diagram",
            description: "Visual representation of force vectors and their components",
            svg: `
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                   refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                  </marker>
                </defs>
                <rect width="400" height="300" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
                <circle cx="200" cy="150" r="20" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="200" y="155" textAnchor="middle" className="text-sm font-bold">m</text>
                
                <line x1="200" y1="150" x2="300" y2="100" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                <text x="270" y="120" className="text-sm font-bold fill-blue-600">F₁</text>
                
                <line x1="200" y1="150" x2="320" y2="150" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                <text x="340" y="155" className="text-sm font-bold fill-emerald-600">F₂</text>
                
                <line x1="200" y1="150" x2="250" y2="200" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                <text x="230" y="190" className="text-sm font-bold fill-amber-600">F₃</text>
                
                <line x1="200" y1="150" x2="340" y2="120" stroke="#8b5cf6" strokeWidth="4" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
                <text x="350" y="130" className="text-sm font-bold fill-violet-600">F_net</text>
              </svg>
            `,
            hotspots: [
              { x: 50, y: 50, label: "Mass Object", description: "The object experiencing forces" },
              { x: 75, y: 30, label: "Force F₁", description: "Applied force at an angle" },
              { x: 85, y: 50, label: "Force F₂", description: "Horizontal force" },
              { x: 62, y: 70, label: "Force F₃", description: "Downward force" },
              { x: 90, y: 35, label: "Net Force", description: "Resultant of all forces" }
            ],
            audioContent: "This force diagram shows multiple forces acting on an object. Force F1 acts at an angle, F2 acts horizontally, and F3 acts downward. The net force is the vector sum of all individual forces."
          },
          {
            id: 2,
            title: "Free Body Diagram",
            description: "Isolated view of forces acting on the object",
            svg: `
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <rect width="400" height="300" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
                <rect x="170" y="120" width="60" height="60" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="200" y="155" textAnchor="middle" className="text-sm font-bold">m</text>
                
                <line x1="200" y1="120" x2="200" y2="50" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                <text x="210" y="85" className="text-sm font-bold fill-blue-600">N</text>
                
                <line x1="200" y1="180" x2="200" y2="250" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                <text x="210" y="215" className="text-sm font-bold fill-emerald-600">W</text>
                
                <line x1="170" y1="150" x2="100" y2="150" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                <text x="130" y="140" className="text-sm font-bold fill-amber-600">f</text>
                
                <line x1="230" y1="150" x2="300" y2="150" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                <text x="270" y="140" className="text-sm font-bold fill-violet-600">F</text>
              </svg>
            `,
            hotspots: [
              { x: 50, y: 50, label: "Normal Force", description: "Force perpendicular to surface" },
              { x: 50, y: 70, label: "Weight", description: "Gravitational force downward" },
              { x: 25, y: 50, label: "Friction", description: "Opposing force" },
              { x: 75, y: 50, label: "Applied Force", description: "External force applied" }
            ],
            audioContent: "A free body diagram isolates the object and shows all forces acting on it. The normal force N acts upward, weight W acts downward, friction f opposes motion, and an applied force F acts horizontally."
          }
        ];
      case 'chemistry':
        return [
          {
            id: 1,
            title: "Molecular Structure",
            description: "3D representation of molecular bonds and electron distribution",
            svg: `
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <rect width="400" height="300" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
                <circle cx="200" cy="150" r="25" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                <text x="200" y="155" textAnchor="middle" className="text-sm font-bold">C</text>
                
                <circle cx="150" cy="100" r="20" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="150" y="105" textAnchor="middle" className="text-sm font-bold">H</text>
                
                <circle cx="250" cy="100" r="20" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="250" y="105" textAnchor="middle" className="text-sm font-bold">H</text>
                
                <circle cx="150" cy="200" r="20" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="150" y="205" textAnchor="middle" className="text-sm font-bold">H</text>
                
                <circle cx="250" cy="200" r="20" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
                <text x="250" y="205" textAnchor="middle" className="text-sm font-bold">H</text>
                
                <line x1="175" y1="125" x2="175" y2="125" stroke="#000" strokeWidth="2"/>
                <line x1="225" y1="125" x2="225" y2="125" stroke="#000" strokeWidth="2"/>
                <line x1="175" y1="175" x2="175" y2="175" stroke="#000" strokeWidth="2"/>
                <line x1="225" y1="175" x2="225" y2="175" stroke="#000" strokeWidth="2"/>
              </svg>
            `,
            hotspots: [
              { x: 50, y: 50, label: "Carbon Atom", description: "Central carbon atom" },
              { x: 30, y: 30, label: "Hydrogen Bonds", description: "C-H covalent bonds" }
            ],
            audioContent: "This molecular diagram shows a methane molecule with one carbon atom bonded to four hydrogen atoms through covalent bonds."
          }
        ];
      case 'mathematics':
        return [
          {
            id: 1,
            title: "Coordinate System",
            description: "Cartesian coordinate plane with function plotting",
            svg: `
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <rect width="400" height="300" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
                <line x1="50" y1="250" x2="350" y2="250" stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <line x1="50" y1="250" x2="50" y2="50" stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                <text x="360" y="255" className="text-sm font-bold">x</text>
                <text x="45" y="40" className="text-sm font-bold">y</text>
                <text x="40" y="265" className="text-sm font-bold">O</text>
                
                <path d="M 70 230 Q 150 150 250 80" stroke="#ef4444" strokeWidth="3" fill="none"/>
                <text x="200" y="100" className="text-sm font-bold fill-red-600">y = f(x)</text>
                
                <circle cx="150" cy="150" r="4" fill="#3b82f6"/>
                <line x1="150" y1="150" x2="150" y2="250" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="150" y1="150" x2="50" y2="150" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
                <text x="155" y="200" className="text-xs fill-blue-600">(a, f(a))</text>
              </svg>
            `,
            hotspots: [
              { x: 25, y: 85, label: "Y-axis", description: "Vertical axis" },
              { x: 75, y: 85, label: "X-axis", description: "Horizontal axis" },
              { x: 50, y: 50, label: "Function", description: "Mathematical function plot" },
              { x: 38, y: 50, label: "Point", description: "Coordinate point (a, f(a))" }
            ],
            audioContent: "This coordinate system shows a mathematical function plotted on the Cartesian plane with x and y axes. The curve represents y equals f of x, and the blue point shows coordinates a, f of a."
          }
        ];
      default:
        return [];
    }
  };

  const diagrams = getDiagrams();

  const handlePlayPause = () => {
    setLocalPlaying(!localPlaying);
    if (!localPlaying && isAudioEnabled) {
      startAudioExplanation();
    } else {
      stopAudioExplanation();
    }
  };

  const startAudioExplanation = () => {
    if (!isAudioEnabled || diagrams.length === 0) return;
    
    const currentDiagramData = diagrams[currentDiagram];
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentDiagramData.audioContent);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      
      // Simulate progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        setDiagramProgress(Math.min(progress, 100));
        if (progress >= 100) {
          clearInterval(progressInterval);
        }
      }, 200);
      
      utterance.onend = () => {
        setLocalPlaying(false);
        setDiagramProgress(100);
        clearInterval(progressInterval);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudioExplanation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setLocalPlaying(false);
  };

  const handleReset = () => {
    setDiagramProgress(0);
    setSelectedHotspot(null);
    setZoomLevel(100);
    stopAudioExplanation();
  };

  const nextDiagram = () => {
    if (currentDiagram < diagrams.length - 1) {
      setCurrentDiagram(currentDiagram + 1);
      setDiagramProgress(0);
      setSelectedHotspot(null);
      if (localPlaying) {
        stopAudioExplanation();
        setTimeout(startAudioExplanation, 500);
      }
    }
  };

  const prevDiagram = () => {
    if (currentDiagram > 0) {
      setCurrentDiagram(currentDiagram - 1);
      setDiagramProgress(0);
      setSelectedHotspot(null);
      if (localPlaying) {
        stopAudioExplanation();
        setTimeout(startAudioExplanation, 500);
      }
    }
  };

  if (diagrams.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No diagrams available for {subject}</p>
        </CardContent>
      </Card>
    );
  }

  const currentDiagramData = diagrams[currentDiagram];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Interactive Diagrams for {conceptName}</h2>
          <p className="text-sm text-muted-foreground">Explore visual representations with synchronized audio explanations</p>
        </div>
        
        {/* Diagram Controls */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm border">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayPause}
            disabled={!isAudioEnabled}
          >
            {localPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
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
            onClick={() => setZoomLevel(Math.min(zoomLevel + 25, 200))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoomLevel(Math.max(zoomLevel - 25, 50))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevDiagram}
          disabled={currentDiagram === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Diagram {currentDiagram + 1} of {diagrams.length}
          </p>
          <p className="font-medium">{currentDiagramData.title}</p>
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

      {/* Progress Bar */}
      {localPlaying && (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Audio Progress</span>
            <span>{Math.round(diagramProgress)}%</span>
          </div>
          <Progress value={diagramProgress} className="h-2" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Diagram */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {currentDiagramData.title}
                <Badge variant="outline">{subject}</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{currentDiagramData.description}</p>
            </CardHeader>
            <CardContent>
              <div 
                className="relative border rounded-lg overflow-hidden bg-white"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center' }}
              >
                <div dangerouslySetInnerHTML={{ __html: currentDiagramData.svg }} />
                
                {/* Interactive Hotspots */}
                {currentDiagramData.hotspots.map((hotspot, index) => (
                  <button
                    key={index}
                    className={`absolute w-4 h-4 rounded-full border-2 transition-all ${
                      selectedHotspot === index
                        ? 'bg-blue-500 border-blue-600 scale-125'
                        : 'bg-white border-blue-400 hover:bg-blue-50'
                    }`}
                    style={{
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedHotspot(selectedHotspot === index ? null : index)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with Hotspot Info */}
        <div className="space-y-4">
          {/* AI Tutor Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-purple-600" />
                AI Diagram Tutor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-700">
                <p className="text-sm text-purple-800 dark:text-purple-300 mb-2">
                  Ask specific questions about this diagram
                </p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                  Explain This Diagram
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hotspot Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Interactive Elements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentDiagramData.hotspots.map((hotspot, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedHotspot === index
                      ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700'
                  }`}
                  onClick={() => setSelectedHotspot(selectedHotspot === index ? null : index)}
                >
                  <h4 className="font-medium text-sm">{hotspot.label}</h4>
                  {selectedHotspot === index && (
                    <p className="text-xs text-muted-foreground mt-1">{hotspot.description}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Audio Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Audio Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handlePlayPause}
                disabled={!isAudioEnabled}
                className="w-full mb-2"
                variant={localPlaying ? "destructive" : "default"}
              >
                {localPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Explanation
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Explanation
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                Listen to detailed explanations of diagram elements
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDiagramsTab;
