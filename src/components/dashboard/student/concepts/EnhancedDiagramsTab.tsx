
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Play, Pause, Volume2, VolumeX, MessageSquare, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedDiagramsTabProps {
  conceptName: string;
  subject: string;
  isPlaying?: boolean;
  audioEnabled?: boolean;
  onPlayPause?: () => void;
}

const EnhancedDiagramsTab: React.FC<EnhancedDiagramsTabProps> = ({
  conceptName,
  subject,
  isPlaying = false,
  audioEnabled = true,
  onPlayPause
}) => {
  const [selectedDiagram, setSelectedDiagram] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [aiTutorActive, setAiTutorActive] = useState(false);

  // Subject-specific diagrams
  const getDiagramsForSubject = () => {
    switch (subject.toLowerCase()) {
      case 'physics':
        return [
          {
            id: 'force-diagram',
            title: 'Force Analysis Diagram',
            description: 'Interactive force vector visualization',
            type: 'interactive',
            audioScript: 'This diagram shows the force vectors acting on the object. Notice how each force has both magnitude and direction...'
          },
          {
            id: 'motion-graph',
            title: 'Motion Graphs',
            description: 'Position, velocity, and acceleration graphs',
            type: 'animated',
            audioScript: 'These graphs illustrate the relationship between position, velocity, and acceleration over time...'
          },
          {
            id: 'energy-flow',
            title: 'Energy Flow Diagram',
            description: 'Energy transformation visualization',
            type: 'flow',
            audioScript: 'Energy flows from one form to another in this system. Follow the arrows to see the transformation...'
          }
        ];
      case 'chemistry':
        return [
          {
            id: 'molecular-structure',
            title: 'Molecular Structure',
            description: 'Detailed molecular arrangement',
            type: 'interactive',
            audioScript: 'This molecular diagram shows the arrangement of atoms and bonds. Each color represents a different element...'
          },
          {
            id: 'reaction-mechanism',
            title: 'Reaction Mechanism',
            description: 'Step-by-step reaction process',
            type: 'sequential',
            audioScript: 'The reaction proceeds through several intermediate steps. Let me walk you through each one...'
          },
          {
            id: 'orbital-diagram',
            title: 'Electron Orbitals',
            description: 'Electron orbital shapes and orientations',
            type: 'animated',
            audioScript: 'These orbitals show the probability regions where electrons can be found around the nucleus...'
          }
        ];
      case 'biology':
        return [
          {
            id: 'cell-structure',
            title: 'Cell Structure',
            description: 'Detailed cellular components',
            type: 'interactive',
            audioScript: 'This cell diagram shows all the major organelles and their functions within the cell...'
          },
          {
            id: 'process-flow',
            title: 'Biological Process',
            description: 'Step-by-step biological process',
            type: 'sequential',
            audioScript: 'This process occurs in several stages. Each step builds upon the previous one...'
          }
        ];
      default:
        return [
          {
            id: 'concept-overview',
            title: 'Concept Overview',
            description: 'Visual representation of the concept',
            type: 'static',
            audioScript: `This diagram illustrates the key components of ${conceptName}...`
          }
        ];
    }
  };

  const diagrams = getDiagramsForSubject();
  const currentDiagram = diagrams[selectedDiagram];

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                Interactive Diagrams - {conceptName}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Visual explanations with synchronized audio
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAiTutorActive(!aiTutorActive)}
                className={aiTutorActive ? "bg-blue-50 text-blue-700" : ""}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Tutor
              </Button>
              <Badge variant={isPlaying ? "default" : "outline"}>
                {isPlaying ? "Playing" : "Paused"}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Diagram Selection Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Available Diagrams</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {diagrams.map((diagram, index) => (
                <motion.div
                  key={diagram.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={selectedDiagram === index ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => setSelectedDiagram(index)}
                  >
                    <div>
                      <div className="font-medium text-sm">{diagram.title}</div>
                      <div className="text-xs text-muted-foreground">{diagram.description}</div>
                      <Badge size="sm" variant="secondary" className="mt-1">
                        {diagram.type}
                      </Badge>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Controls */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">View Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium flex-1 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetZoom}
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAnnotations(!showAnnotations)}
                className={`w-full ${showAnnotations ? 'bg-blue-50 text-blue-700' : ''}`}
              >
                {showAnnotations ? 'Hide' : 'Show'} Annotations
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Diagram Display */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{currentDiagram.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onPlayPause}
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? 'Pause' : 'Play'} Explanation
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={audioEnabled ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
                  >
                    {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden min-h-96">
                {/* Diagram SVG/Canvas Area */}
                <div 
                  className="w-full h-96 flex items-center justify-center relative"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  {/* Subject-specific diagram rendering */}
                  {subject.toLowerCase() === 'physics' && (
                    <motion.div
                      className="relative w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Force Diagram Example */}
                      <svg viewBox="0 0 400 300" className="w-full h-full">
                        {/* Object */}
                        <rect x="180" y="140" width="40" height="20" fill="#3b82f6" rx="2" />
                        
                        {/* Force Vectors */}
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={{ opacity: showAnnotations ? 1 : 0.3 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Weight Force */}
                          <line x1="200" y1="160" x2="200" y2="200" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead)" />
                          {showAnnotations && (
                            <text x="210" y="185" fill="#ef4444" fontSize="12" fontWeight="bold">Weight (mg)</text>
                          )}
                          
                          {/* Normal Force */}
                          <line x1="200" y1="140" x2="200" y2="100" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead)" />
                          {showAnnotations && (
                            <text x="210" y="115" fill="#10b981" fontSize="12" fontWeight="bold">Normal (N)</text>
                          )}
                          
                          {/* Applied Force */}
                          <line x1="180" y1="150" x2="140" y2="150" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead)" />
                          {showAnnotations && (
                            <text x="90" y="145" fill="#f59e0b" fontSize="12" fontWeight="bold">Applied (F)</text>
                          )}
                        </motion.g>
                        
                        {/* Arrow marker definition */}
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                          </marker>
                        </defs>
                      </svg>
                    </motion.div>
                  )}

                  {subject.toLowerCase() === 'chemistry' && (
                    <motion.div
                      className="relative w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Molecular Diagram Example */}
                      <svg viewBox="0 0 400 300" className="w-full h-full">
                        {/* Bonds */}
                        <line x1="150" y1="150" x2="200" y2="120" stroke="#6b7280" strokeWidth="3" />
                        <line x1="200" y1="120" x2="250" y2="150" stroke="#6b7280" strokeWidth="3" />
                        <line x1="150" y1="150" x2="200" y2="180" stroke="#6b7280" strokeWidth="3" />
                        <line x1="200" y1="180" x2="250" y2="150" stroke="#6b7280" strokeWidth="3" />
                        
                        {/* Atoms */}
                        <circle cx="150" cy="150" r="15" fill="#ef4444" />
                        <circle cx="200" cy="120" r="12" fill="#3b82f6" />
                        <circle cx="250" cy="150" r="15" fill="#ef4444" />
                        <circle cx="200" cy="180" r="12" fill="#3b82f6" />
                        
                        {/* Labels */}
                        {showAnnotations && (
                          <g>
                            <text x="140" y="140" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">O</text>
                            <text x="200" y="115" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">H</text>
                            <text x="250" y="145" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">O</text>
                            <text x="200" y="185" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">H</text>
                          </g>
                        )}
                      </svg>
                    </motion.div>
                  )}

                  {/* Generic diagram for other subjects */}
                  {!['physics', 'chemistry'].includes(subject.toLowerCase()) && (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                      <div className="text-center">
                        <Eye className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Interactive Diagram</p>
                        <p className="text-sm">{currentDiagram.description}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive Hotspots */}
                {showAnnotations && (
                  <div className="absolute top-4 left-4 bg-black/70 text-white p-2 rounded text-xs">
                    Click on elements for detailed explanations
                  </div>
                )}
              </div>

              {/* Audio Explanation Panel */}
              <AnimatePresence>
                {isPlaying && audioEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-800">Audio Explanation</span>
                      </div>
                      <div className="flex-1 bg-blue-200 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          className="bg-blue-600 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: '60%' }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-blue-700 mt-2">
                      {currentDiagram.audioScript}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Tutor Panel */}
              <AnimatePresence>
                {aiTutorActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-purple-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-purple-800 mb-2">AI Tutor Analysis</h4>
                        <p className="text-sm text-purple-700">
                          I can see you're studying the {currentDiagram.title} for {conceptName}. 
                          This {currentDiagram.type} diagram shows the key relationships between the components. 
                          Would you like me to explain any specific part in more detail?
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="border-purple-300 text-purple-700">
                            Explain This Part
                          </Button>
                          <Button size="sm" variant="outline" className="border-purple-300 text-purple-700">
                            Ask Question
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDiagramsTab;
