
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Pause, Volume2, VolumeX, Box, Atom, RotateCcw,
  CheckCircle, MessageSquare, Settings, Move3D, Zap,
  FlaskConical, Target, Activity, Eye, Brain
} from 'lucide-react';
import AIAssistantChat from './AIAssistantChat';

interface Enhanced3DLabsTabProps {
  conceptName: string;
}

interface Lab3D {
  id: string;
  name: string;
  topic: string;
  subject: string;
  type: 'simulation' | 'analysis' | 'examples' | 'lab';
  description: string;
  duration: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  interactiveElements: string[];
}

const Enhanced3DLabsTab: React.FC<Enhanced3DLabsTabProps> = ({ conceptName }) => {
  const [activeTab, setActiveTab] = useState('simulation');
  const [currentLab, setCurrentLab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState([1]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [completedLabs, setCompletedLabs] = useState<Set<string>>(new Set());
  const [interactionCount, setInteractionCount] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState([50]);
  const [isRotating, setIsRotating] = useState(false);

  const labs3D: Lab3D[] = [
    {
      id: 'sim-1',
      name: 'Force Dynamics',
      topic: conceptName,
      subject: 'Physics',
      type: 'simulation',
      description: 'Interactive 3D simulation of force vectors and motion',
      duration: 180,
      completed: false,
      difficulty: 'medium',
      interactiveElements: ['Force Vectors', 'Mass Objects', 'Acceleration Indicators']
    },
    {
      id: 'analysis-1',
      name: 'Vector Analysis',
      topic: conceptName,
      subject: 'Physics',
      type: 'analysis',
      description: 'Detailed force analysis with 3D visualization',
      duration: 150,
      completed: false,
      difficulty: 'hard',
      interactiveElements: ['Component Vectors', 'Resultant Forces', 'Equilibrium Points']
    },
    {
      id: 'examples-1',
      name: 'Real Examples',
      topic: conceptName,
      subject: 'Physics',
      type: 'examples',
      description: '3D examples of physics principles in action',
      duration: 120,
      completed: false,
      difficulty: 'easy',
      interactiveElements: ['Everyday Objects', 'Sports Scenarios', 'Vehicle Motion']
    },
    {
      id: 'lab-1',
      name: 'Virtual Lab',
      topic: conceptName,
      subject: 'Physics',
      type: 'lab',
      description: 'Hands-on 3D laboratory experiments',
      duration: 240,
      completed: false,
      difficulty: 'hard',
      interactiveElements: ['Lab Equipment', 'Measurements', 'Data Collection']
    }
  ];

  // Progress tracking
  useEffect(() => {
    const totalLabs = labs3D.length;
    const completed = completedLabs.size;
    const overallProgress = (completed / totalLabs) * 100;
    setProgress(overallProgress);
  }, [completedLabs, labs3D.length]);

  // Auto-rotation effect
  useEffect(() => {
    let interval: number | null = null;
    if (isRotating) {
      interval = window.setInterval(() => {
        // Simulate 3D rotation
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRotating, rotationSpeed]);

  const handleLabInteraction = (element: string) => {
    setInteractionCount(prev => prev + 1);
    
    // Voice explanation for interaction
    if (!isMuted) {
      const explanationText = `You've interacted with ${element} in the ${labs3D[currentLab]?.name} lab. This element demonstrates key aspects of ${conceptName}.`;
      const utterance = new SpeechSynthesisUtterance(explanationText);
      utterance.rate = speed[0];
      utterance.volume = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playLabAudioAnalysis = () => {
    if (!isMuted && labs3D[currentLab]) {
      const lab = labs3D[currentLab];
      const analysisText = `Welcome to the ${lab.name} 3D laboratory. This ${lab.type} focuses on ${lab.topic}. You can interact with ${lab.interactiveElements.join(', ')} to explore different aspects of the concept. Use the controls to rotate, zoom, and analyze the 3D models.`;
      const utterance = new SpeechSynthesisUtterance(analysisText);
      utterance.rate = speed[0];
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const markLabCompleted = (labId: string) => {
    setCompletedLabs(prev => new Set([...prev, labId]));
  };

  const getLabIcon = (type: string) => {
    switch (type) {
      case 'simulation': return <Activity className="h-5 w-5 text-blue-500" />;
      case 'analysis': return <Brain className="h-5 w-5 text-purple-500" />;
      case 'examples': return <Eye className="h-5 w-5 text-green-500" />;
      case 'lab': return <FlaskConical className="h-5 w-5 text-orange-500" />;
      default: return <Box className="h-5 w-5" />;
    }
  };

  const completionPercentage = (completedLabs.size / labs3D.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-50 to-cyan-100 dark:from-indigo-950 dark:to-cyan-900 p-6 rounded-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">
            3D Laboratory: {conceptName}
          </h2>
          <Badge variant="outline" className="bg-white/50">
            {Math.round(completionPercentage)}% Complete
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{completedLabs.size}</div>
            <div className="text-sm text-indigo-600 dark:text-indigo-400">Labs Done</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{interactionCount}</div>
            <div className="text-sm text-indigo-600 dark:text-indigo-400">Interactions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
              {labs3D.reduce((total, lab) => total + lab.duration, 0)}s
            </div>
            <div className="text-sm text-indigo-600 dark:text-indigo-400">Total Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">88%</div>
            <div className="text-sm text-indigo-600 dark:text-indigo-400">Mastery</div>
          </div>
        </div>
        
        <Progress value={completionPercentage} className="h-3" />
      </motion.div>

      {/* 3D Lab Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="simulation" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Live Sim
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Examples
          </TabsTrigger>
          <TabsTrigger value="lab" className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            Virtual Lab
          </TabsTrigger>
        </TabsList>

        {labs3D.map((lab) => (
          <TabsContent key={lab.id} value={lab.type}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getLabIcon(lab.type)}
                      {lab.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{lab.topic}</Badge>
                      <Badge variant="secondary">{lab.subject}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {lab.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={playLabAudioAnalysis}
                      disabled={isPlaying}
                    >
                      <Volume2 className="h-4 w-4 mr-1" />
                      {isPlaying ? 'Playing...' : 'Voice Analysis'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAIAssistant(true)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      AI Lab Assistant
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 3D Visualization Area */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-lg min-h-[400px] flex items-center justify-center mb-6">
                  <motion.div
                    className="text-center space-y-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                  >
                    <motion.div 
                      className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center cursor-pointer shadow-2xl"
                      whileHover={{ scale: 1.1, rotateY: 15 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ rotateY: isRotating ? 360 : 0 }}
                      transition={{ duration: isRotating ? rotationSpeed[0] / 10 : 0.3 }}
                      onClick={() => setIsRotating(!isRotating)}
                    >
                      <Atom className="h-16 w-16 text-white" />
                    </motion.div>
                    
                    <div className="text-white space-y-2">
                      <h3 className="text-2xl font-bold">{lab.name}</h3>
                      <p className="text-gray-300 max-w-md mx-auto">{lab.description}</p>
                    </div>

                    {/* Interactive Elements */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {lab.interactiveElements.map((element, index) => (
                        <motion.button
                          key={element}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLabInteraction(element)}
                          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white hover:bg-white/20 transition-all"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Target className="h-4 w-4" />
                            <span className="text-sm">{element}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* 3D Controls */}
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">3D Lab Controls</h4>
                    <div className="flex items-center gap-2">
                      {completedLabs.has(lab.id) ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markLabCompleted(lab.id)}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Rotation Controls */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rotation Speed</label>
                      <Slider
                        value={rotationSpeed}
                        onValueChange={setRotationSpeed}
                        min={10}
                        max={100}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Slow</span>
                        <span>{rotationSpeed[0]}%</span>
                        <span>Fast</span>
                      </div>
                    </div>

                    {/* Audio Controls */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Audio Speed</label>
                      <Slider
                        value={speed}
                        onValueChange={setSpeed}
                        min={0.5}
                        max={2}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0.5x</span>
                        <span>{speed[0]}x</span>
                        <span>2x</span>
                      </div>
                    </div>

                    {/* Interaction Stats */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Lab Progress</label>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Interactions: {interactionCount}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Duration: {lab.duration}s
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      variant={isPlaying ? "destructive" : "default"}
                      size="sm"
                      onClick={playLabAudioAnalysis}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className={isMuted ? "text-red-500" : ""}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsRotating(false);
                        setInteractionCount(0);
                      }}
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>

                    <div className="flex-1" />

                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* AI Lab Assistant */}
      <AIAssistantChat
        conceptName={conceptName}
        context={`3D Laboratory: ${labs3D.find(lab => lab.type === activeTab)?.name || 'Interactive 3D Lab'}`}
        isVisible={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
      />
    </div>
  );
};

export default Enhanced3DLabsTab;
