
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, 
  Eye, Zap, Target, CheckCircle, MessageSquare,
  Activity, BarChart3, TrendingUp, Lightbulb
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

interface DiagramSection {
  id: string;
  title: string;
  description: string;
  audioText: string;
  interactiveElements: InteractiveElement[];
  completed: boolean;
  duration: number;
}

interface InteractiveElement {
  id: string;
  type: 'hotspot' | 'annotation' | 'animation';
  x: number;
  y: number;
  label: string;
  description: string;
  audioExplanation: string;
}

const EnhancedDiagramsTab: React.FC<EnhancedDiagramsTabProps> = ({
  conceptName,
  subject,
  globalAudioState
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [selectedElement, setSelectedElement] = useState<InteractiveElement | null>(null);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [showAITutor, setShowAITutor] = useState(false);
  const [aiContext, setAiContext] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Sample diagram sections for Newton's Laws
  const diagramSections: DiagramSection[] = [
    {
      id: 'force-diagram',
      title: 'Force Body Diagram',
      description: 'Understanding forces acting on objects',
      audioText: 'In this force body diagram, we can see how different forces interact with an object. The red arrows represent applied forces, while blue arrows show reaction forces. Notice how forces are balanced in equilibrium.',
      interactiveElements: [
        {
          id: 'applied-force',
          type: 'hotspot',
          x: 30,
          y: 20,
          label: 'Applied Force',
          description: 'The force being applied to the object',
          audioExplanation: 'This red arrow shows the applied force. Its magnitude and direction determine how the object will accelerate according to Newton\'s second law.'
        },
        {
          id: 'friction-force',
          type: 'hotspot',
          x: 70,
          y: 80,
          label: 'Friction Force',
          description: 'The resistance force opposing motion',
          audioExplanation: 'Friction always opposes the direction of motion. The magnitude depends on the surface materials and the normal force.'
        }
      ],
      completed: false,
      duration: 45
    },
    {
      id: 'motion-graph',
      title: 'Velocity-Time Graph',
      description: 'Analyzing motion through graphical representation',
      audioText: 'This velocity-time graph shows how an object\'s velocity changes over time. The slope represents acceleration, and the area under the curve represents displacement.',
      interactiveElements: [
        {
          id: 'slope-area',
          type: 'annotation',
          x: 50,
          y: 40,
          label: 'Slope = Acceleration',
          description: 'The steepness of the line indicates acceleration',
          audioExplanation: 'The slope of this line tells us the acceleration. A steeper positive slope means greater acceleration in the positive direction.'
        }
      ],
      completed: false,
      duration: 35
    },
    {
      id: 'energy-conservation',
      title: 'Energy Conservation',
      description: 'Visualizing energy transformations',
      audioText: 'This diagram illustrates energy conservation in a pendulum. As the pendulum swings, potential energy converts to kinetic energy and back again.',
      interactiveElements: [
        {
          id: 'potential-energy',
          type: 'animation',
          x: 25,
          y: 15,
          label: 'Potential Energy',
          description: 'Energy stored due to position',
          audioExplanation: 'At the highest points, the pendulum has maximum potential energy and minimum kinetic energy.'
        }
      ],
      completed: false,
      duration: 50
    }
  ];

  const [sections, setSections] = useState(diagramSections);

  // Audio synthesis function
  const speakText = (text: string) => {
    if (isMuted || !globalAudioState?.isEnabled) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      markSectionCompleted();
    };
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const currentSection = sections[activeSection];
      speakText(currentSection.audioText);
    }
  };

  const handleReset = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentProgress(0);
    setActiveSection(0);
  };

  const markSectionCompleted = () => {
    const currentSectionId = sections[activeSection].id;
    setCompletedSections(prev => new Set([...prev, currentSectionId]));
    
    setSections(prev => prev.map((section, index) => 
      index === activeSection ? { ...section, completed: true } : section
    ));
  };

  const handleElementClick = (element: InteractiveElement) => {
    setSelectedElement(element);
    speakText(element.audioExplanation);
  };

  const handleAskAI = (context: string) => {
    setAiContext(context);
    setShowAITutor(true);
  };

  const getSVGDiagram = (sectionId: string) => {
    switch (sectionId) {
      case 'force-diagram':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64 border rounded-lg bg-gray-50">
            {/* Object */}
            <rect x="175" y="125" width="50" height="50" fill="#4F46E5" stroke="#312E81" strokeWidth="2"/>
            <text x="200" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Object</text>
            
            {/* Applied Force */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <line x1="120" y1="150" x2="170" y2="150" stroke="#EF4444" strokeWidth="3" markerEnd="url(#arrowhead-red)"/>
              <text x="90" y="145" fill="#EF4444" fontSize="12" fontWeight="bold">Applied Force</text>
              <circle 
                cx="120" 
                cy="150" 
                r="8" 
                fill="#EF4444" 
                className="cursor-pointer hover:scale-110 transition-transform"
                onClick={() => handleElementClick(sections[0].interactiveElements[0])}
              />
            </motion.g>
            
            {/* Friction Force */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <line x1="280" y1="150" x2="230" y2="150" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#arrowhead-blue)"/>
              <text x="285" y="145" fill="#3B82F6" fontSize="12" fontWeight="bold">Friction</text>
              <circle 
                cx="280" 
                cy="150" 
                r="8" 
                fill="#3B82F6" 
                className="cursor-pointer hover:scale-110 transition-transform"
                onClick={() => handleElementClick(sections[0].interactiveElements[1])}
              />
            </motion.g>
            
            {/* Arrow markers */}
            <defs>
              <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444"/>
              </marker>
              <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6"/>
              </marker>
            </defs>
          </svg>
        );
      
      case 'motion-graph':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64 border rounded-lg bg-gray-50">
            {/* Axes */}
            <line x1="50" y1="250" x2="350" y2="250" stroke="#374151" strokeWidth="2"/>
            <line x1="50" y1="250" x2="50" y2="50" stroke="#374151" strokeWidth="2"/>
            
            {/* Labels */}
            <text x="200" y="280" textAnchor="middle" fontSize="14" fontWeight="bold">Time (s)</text>
            <text x="25" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" transform="rotate(-90 25 150)">Velocity (m/s)</text>
            
            {/* Graph line */}
            <motion.path
              d="M 50 200 Q 150 100 250 150 T 350 180"
              stroke="#8B5CF6"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            
            {/* Interactive point */}
            <motion.circle
              cx="200"
              cy="125"
              r="6"
              fill="#8B5CF6"
              className="cursor-pointer hover:scale-125 transition-transform"
              onClick={() => handleElementClick(sections[1].interactiveElements[0])}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5 }}
            />
          </svg>
        );
      
      default:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64 border rounded-lg bg-gray-50">
            <circle cx="200" cy="150" r="80" fill="#10B981" opacity="0.3"/>
            <text x="200" y="155" textAnchor="middle" fontSize="16" fontWeight="bold">Interactive Diagram</text>
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Interactive Visualizations - {conceptName}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Explore interactive diagrams with synchronized audio explanations
              </p>
            </div>
            
            {/* Audio Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                disabled={isMuted}
                className="flex items-center gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAskAI('interactive visualizations')}
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Ask AI
              </Button>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Section {activeSection + 1} of {sections.length}</span>
              <span>{completedSections.size}/{sections.length} completed</span>
            </div>
            <Progress value={(completedSections.size / sections.length) * 100} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Diagram Display */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {sections[activeSection].completed && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {sections[activeSection].title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {sections[activeSection].description}
                  </p>
                </div>
                <Badge variant="outline">
                  {sections[activeSection].duration}s
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {getSVGDiagram(sections[activeSection].id)}
                
                {/* Interactive Elements Overlay */}
                <AnimatePresence>
                  {sections[activeSection].interactiveElements.map((element) => (
                    <motion.div
                      key={element.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ 
                        left: `${element.x}%`, 
                        top: `${element.y}%` 
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-8 h-8 p-0 bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                        onClick={() => handleElementClick(element)}
                      >
                        <Zap className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Selected Element Info */}
              {selectedElement && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <h4 className="font-semibold text-blue-800">{selectedElement.label}</h4>
                  <p className="text-blue-700 mt-1">{selectedElement.description}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2"
                    onClick={() => speakText(selectedElement.audioExplanation)}
                  >
                    <Volume2 className="h-3 w-3 mr-1" />
                    Play Explanation
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Section Navigation */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    activeSection === index
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                  onClick={() => setActiveSection(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{section.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {section.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {section.completed && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <Badge variant="outline" className="text-xs">
                        {section.duration}s
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleAskAI('diagram explanation')}
              >
                <Lightbulb className="h-4 w-4" />
                Explain This Diagram
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleAskAI('interactive elements')}
              >
                <Target className="h-4 w-4" />
                Understand Elements
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleAskAI('practice questions')}
              >
                <Activity className="h-4 w-4" />
                Practice Questions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Tutor Dialog */}
      <AITutorDialog
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        conceptName={conceptName}
        context={aiContext}
        subject={subject}
      />
    </div>
  );
};

export default EnhancedDiagramsTab;
