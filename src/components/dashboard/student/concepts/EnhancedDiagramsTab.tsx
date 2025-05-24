
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Eye, MousePointer,
  Layers, Zap, Brain, MessageSquare, Target, Search, Filter,
  BarChart3, PieChart, TrendingUp, Activity
} from 'lucide-react';
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

interface DiagramElement {
  id: string;
  type: 'shape' | 'arrow' | 'label' | 'formula';
  position: { x: number; y: number };
  content: string;
  explanation: string;
  audioText: string;
  isInteractive: boolean;
  connections?: string[];
}

interface VisualizationType {
  id: string;
  title: string;
  description: string;
  category: 'diagram' | 'graph' | 'chart' | 'simulation';
  elements: DiagramElement[];
  audioNarration: string;
  duration: number;
  interactiveFeatures: string[];
}

const EnhancedDiagramsTab: React.FC<EnhancedDiagramsTabProps> = ({ 
  conceptName, 
  subject,
  globalAudioState 
}) => {
  // Audio and interaction states
  const [isLocalAudioPlaying, setIsLocalAudioPlaying] = useState(false);
  const [currentAudioProgress, setCurrentAudioProgress] = useState(0);
  const [activeVisualization, setActiveVisualization] = useState(0);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [highlightedElements, setHighlightedElements] = useState<Set<string>>(new Set());
  const [interactionMode, setInteractionMode] = useState<'explore' | 'analyze'>('explore');
  const [showAITutor, setShowAITutor] = useState(false);
  const [selectedContext, setSelectedContext] = useState('');
  const [activeLayer, setActiveLayer] = useState('all');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock visualizations data
  const visualizations: VisualizationType[] = [
    {
      id: 'concept-diagram',
      title: 'Interactive Concept Diagram',
      description: `Visual breakdown of ${conceptName} components and relationships`,
      category: 'diagram',
      audioNarration: `This interactive diagram shows the key components of ${conceptName}. Click on any element to learn more about its role and how it connects to other parts.`,
      duration: 15000,
      interactiveFeatures: ['element-selection', 'connection-highlighting', 'layer-filtering'],
      elements: [
        {
          id: 'main-concept',
          type: 'shape',
          position: { x: 50, y: 40 },
          content: conceptName,
          explanation: `The central concept representing ${conceptName}`,
          audioText: `This is the main concept we're studying: ${conceptName}. It's the foundation that connects all other elements.`,
          isInteractive: true,
          connections: ['element-1', 'element-2', 'element-3']
        },
        {
          id: 'element-1',
          type: 'shape',
          position: { x: 20, y: 20 },
          content: 'Component A',
          explanation: 'First key component of the concept',
          audioText: 'Component A plays a crucial role in understanding the fundamental principles.',
          isInteractive: true,
          connections: ['main-concept']
        },
        {
          id: 'element-2',
          type: 'shape',
          position: { x: 80, y: 20 },
          content: 'Component B',
          explanation: 'Second key component of the concept',
          audioText: 'Component B demonstrates the practical applications and real-world relevance.',
          isInteractive: true,
          connections: ['main-concept']
        },
        {
          id: 'element-3',
          type: 'shape',
          position: { x: 50, y: 70 },
          content: 'Component C',
          explanation: 'Third key component showing relationships',
          audioText: 'Component C illustrates how different parts work together in the system.',
          isInteractive: true,
          connections: ['main-concept']
        }
      ]
    },
    {
      id: 'process-flow',
      title: 'Process Flow Visualization',
      description: `Step-by-step process flow for ${conceptName}`,
      category: 'diagram',
      audioNarration: `Follow this process flow to understand how ${conceptName} works step by step. Each stage builds upon the previous one.`,
      duration: 18000,
      interactiveFeatures: ['step-progression', 'timeline-scrubbing', 'detailed-explanations'],
      elements: [
        {
          id: 'step-1',
          type: 'shape',
          position: { x: 15, y: 50 },
          content: 'Step 1: Initialize',
          explanation: 'Starting point of the process',
          audioText: 'The process begins with initialization, where we set up the basic conditions.',
          isInteractive: true,
          connections: ['step-2']
        },
        {
          id: 'step-2',
          type: 'shape',
          position: { x: 40, y: 50 },
          content: 'Step 2: Process',
          explanation: 'Main processing phase',
          audioText: 'In the processing phase, the core transformations take place.',
          isInteractive: true,
          connections: ['step-1', 'step-3']
        },
        {
          id: 'step-3',
          type: 'shape',
          position: { x: 65, y: 50 },
          content: 'Step 3: Analyze',
          explanation: 'Analysis and evaluation phase',
          audioText: 'The analysis phase helps us understand the results and their implications.',
          isInteractive: true,
          connections: ['step-2', 'step-4']
        },
        {
          id: 'step-4',
          type: 'shape',
          position: { x: 85, y: 50 },
          content: 'Step 4: Conclude',
          explanation: 'Final conclusions and outcomes',
          audioText: 'Finally, we draw conclusions based on our analysis and observations.',
          isInteractive: true,
          connections: ['step-3']
        }
      ]
    },
    {
      id: 'data-visualization',
      title: 'Data & Graphs',
      description: `Quantitative analysis and graphical representation`,
      category: 'chart',
      audioNarration: `These graphs and charts provide quantitative insights into ${conceptName}. Explore different data representations to understand trends and patterns.`,
      duration: 12000,
      interactiveFeatures: ['data-filtering', 'chart-switching', 'value-inspection'],
      elements: [
        {
          id: 'chart-1',
          type: 'shape',
          position: { x: 25, y: 30 },
          content: 'Performance Chart',
          explanation: 'Shows performance metrics over time',
          audioText: 'This performance chart illustrates how the system behaves under different conditions.',
          isInteractive: true
        },
        {
          id: 'chart-2',
          type: 'shape',
          position: { x: 75, y: 30 },
          content: 'Comparison Graph',
          explanation: 'Comparative analysis between scenarios',
          audioText: 'The comparison graph helps identify optimal conditions and trade-offs.',
          isInteractive: true
        },
        {
          id: 'chart-3',
          type: 'shape',
          position: { x: 50, y: 70 },
          content: 'Trend Analysis',
          explanation: 'Long-term trends and predictions',
          audioText: 'Trend analysis reveals patterns that help predict future behavior.',
          isInteractive: true
        }
      ]
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
    const currentViz = visualizations[activeVisualization];
    if (currentViz) {
      const totalDuration = currentViz.duration;
      let elapsed = 0;
      
      intervalRef.current = setInterval(() => {
        elapsed += 100;
        const progress = Math.min((elapsed / totalDuration) * 100, 100);
        setCurrentAudioProgress(progress);
        
        // Highlight elements progressively
        const elementIndex = Math.floor((progress / 100) * currentViz.elements.length);
        if (elementIndex < currentViz.elements.length) {
          const elementToHighlight = currentViz.elements[elementIndex].id;
          setHighlightedElements(prev => new Set([...prev, elementToHighlight]));
        }
        
        if (progress >= 100) {
          setIsLocalAudioPlaying(false);
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
    setHighlightedElements(new Set());
  };

  // Element interaction handlers
  const handleElementClick = (elementId: string) => {
    const element = visualizations[activeVisualization].elements.find(e => e.id === elementId);
    if (element && element.isInteractive) {
      setSelectedElement(elementId);
      
      // Highlight connected elements
      if (element.connections) {
        setHighlightedElements(new Set([elementId, ...element.connections]));
      } else {
        setHighlightedElements(new Set([elementId]));
      }
      
      // Play element-specific audio
      if (element.audioText) {
        // In a real implementation, you would play the specific audio
        console.log('Playing audio:', element.audioText);
      }
    }
  };

  const openAITutor = (context: string) => {
    setSelectedContext(context);
    setShowAITutor(true);
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

  const currentVisualization = visualizations[activeVisualization];
  const selectedElementData = selectedElement 
    ? currentVisualization.elements.find(e => e.id === selectedElement)
    : null;

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Interactive Visualizations
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Explore interactive diagrams and visual explanations for {conceptName}
              </p>
            </div>
            
            {/* Audio & Interaction Controls */}
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
                {isLocalAudioPlaying ? 'Pause' : 'Play'} Explanation
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
                onClick={() => setInteractionMode(interactionMode === 'explore' ? 'analyze' : 'explore')}
              >
                {interactionMode === 'explore' ? <Eye className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                {interactionMode === 'explore' ? 'Explore' : 'Analyze'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => openAITutor('visual-explanation')}
                className="flex items-center gap-2"
              >
                <Brain className="h-4 w-4" />
                AI Visual Assistant
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Visualization Progress</span>
              <span>{Math.round(currentAudioProgress)}%</span>
            </div>
            <Progress value={currentAudioProgress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Visualization Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{currentVisualization.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {currentVisualization.description}
                  </p>
                </div>
                <Badge className={`${
                  currentVisualization.category === 'diagram' ? 'bg-blue-100 text-blue-800' :
                  currentVisualization.category === 'chart' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {currentVisualization.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="h-full">
              {/* Interactive Diagram Area */}
              <div className="w-full h-[450px] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-lg relative overflow-hidden border">
                {/* Render diagram elements */}
                {currentVisualization.elements.map((element) => (
                  <motion.div
                    key={element.id}
                    className={`absolute cursor-pointer transition-all duration-300 ${
                      highlightedElements.has(element.id) 
                        ? 'ring-4 ring-blue-400 ring-opacity-60 z-20' 
                        : 'hover:ring-2 hover:ring-blue-300 z-10'
                    } ${
                      selectedElement === element.id 
                        ? 'ring-4 ring-green-500 ring-opacity-80' 
                        : ''
                    }`}
                    style={{
                      left: `${element.position.x}%`,
                      top: `${element.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => handleElementClick(element.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: highlightedElements.has(element.id) ? 1.1 : 1,
                    }}
                  >
                    <div className={`px-4 py-3 rounded-lg shadow-lg text-center min-w-[120px] ${
                      element.type === 'shape' ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700' :
                      element.type === 'formula' ? 'bg-blue-100 dark:bg-blue-900 border border-blue-300' :
                      'bg-yellow-100 dark:bg-yellow-900 border border-yellow-300'
                    }`}>
                      <p className="text-sm font-medium">{element.content}</p>
                      {element.isInteractive && (
                        <div className="mt-1 flex justify-center">
                          <Zap className="h-3 w-3 text-blue-500" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {currentVisualization.elements.map((element) =>
                    element.connections?.map((connectionId) => {
                      const connectedElement = currentVisualization.elements.find(e => e.id === connectionId);
                      if (!connectedElement) return null;
                      
                      const x1 = (element.position.x / 100) * 100; // Convert percentage to actual position
                      const y1 = (element.position.y / 100) * 100;
                      const x2 = (connectedElement.position.x / 100) * 100;
                      const y2 = (connectedElement.position.y / 100) * 100;
                      
                      return (
                        <line
                          key={`${element.id}-${connectionId}`}
                          x1={`${x1}%`}
                          y1={`${y1}%`}
                          x2={`${x2}%`}
                          y2={`${y2}%`}
                          stroke={highlightedElements.has(element.id) || highlightedElements.has(connectionId) ? "#3B82F6" : "#D1D5DB"}
                          strokeWidth={highlightedElements.has(element.id) || highlightedElements.has(connectionId) ? "3" : "2"}
                          strokeDasharray={isLocalAudioPlaying ? "5,5" : "none"}
                          className="transition-all duration-300"
                        />
                      );
                    })
                  )}
                </svg>
                
                {/* Interaction Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">Mode:</span> {interactionMode}
                        {selectedElement && (
                          <span className="ml-3">
                            <span className="font-medium">Selected:</span> {selectedElementData?.content}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openAITutor(selectedElementData?.explanation || 'diagram-analysis')}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Visualization Selection */}
              <div className="mt-4 flex gap-2">
                {visualizations.map((viz, index) => (
                  <Button
                    key={viz.id}
                    variant={activeVisualization === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setActiveVisualization(index);
                      resetAudio();
                      setSelectedElement(null);
                      setHighlightedElements(new Set());
                    }}
                    className="flex-1"
                  >
                    {viz.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="space-y-4">
          {/* Element Details */}
          {selectedElementData && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Element Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm">{selectedElementData.content}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {selectedElementData.explanation}
                  </p>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => openAITutor(selectedElementData.explanation)}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Explain This Element
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* Visualization Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Visualization Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <label className="text-xs font-medium">Layer Filter</label>
                <select
                  value={activeLayer}
                  onChange={(e) => setActiveLayer(e.target.value)}
                  className="w-full text-sm border rounded px-2 py-1"
                >
                  <option value="all">All Elements</option>
                  <option value="main">Main Components</option>
                  <option value="details">Details Only</option>
                  <option value="connections">Connections</option>
                </select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setHighlightedElements(new Set())}
                  className="flex-1"
                >
                  Clear Selection
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const allIds = currentVisualization.elements.map(e => e.id);
                    setHighlightedElements(new Set(allIds));
                  }}
                  className="flex-1"
                >
                  Highlight All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Interactive Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentVisualization.interactiveFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Zap className="h-3 w-3 text-yellow-500" />
                  <span className="capitalize">{feature.replace('-', ' ')}</span>
                </div>
              ))}
              
              <div className="mt-4 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => openAITutor('visual-understanding')}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Check My Understanding
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => openAITutor('suggest-interactions')}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Suggest Interactions
                </Button>
              </div>
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

export default EnhancedDiagramsTab;
