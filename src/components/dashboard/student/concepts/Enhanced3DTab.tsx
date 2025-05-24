
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Box, Play, Pause, RotateCcw, ZoomIn, ZoomOut, 
  Move3D, Settings, Download, Share2, Eye,
  Atom, FlaskConical, Target, Activity, Volume2, Mic,
  MessageSquare, Lightbulb, Brain, VolumeX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIAssistantChat from './AIAssistantChat';

interface Enhanced3DTabProps {
  conceptName: string;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ conceptName }) => {
  const [activeTab, setActiveTab] = useState('simulation');
  const [selectedModel, setSelectedModel] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState([50]);
  const [forceValue, setForceValue] = useState([20]);
  const [massValue, setMassValue] = useState([5]);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState([1]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const subjects = ['Physics', 'Chemistry', 'Biology'];
  const [activeSubject, setActiveSubject] = useState('Physics');

  const models = {
    Physics: [
      {
        id: 'force-vectors',
        title: 'Force Vector Visualization',
        description: 'Interactive 3D representation of force vectors and their effects',
        type: 'Interactive',
        difficulty: 'Beginner',
        audioScript: 'This 3D model shows force vectors in three-dimensional space. You can rotate, zoom, and interact with the vectors to understand their magnitude and direction.'
      },
      {
        id: 'mass-acceleration',
        title: 'Mass-Acceleration Relationship',
        description: 'Visual demonstration of how mass affects acceleration',
        type: 'Simulation',
        difficulty: 'Intermediate',
        audioScript: 'Observe how changing mass affects acceleration when force remains constant. This 3D simulation demonstrates Newton\'s Second Law in action.'
      }
    ],
    Chemistry: [
      {
        id: 'molecular-structure',
        title: 'Molecular Structure',
        description: '3D visualization of molecular bonds and structures',
        type: 'Interactive',
        difficulty: 'Intermediate',
        audioScript: 'Explore molecular structures in 3D space. Rotate and examine chemical bonds, electron clouds, and molecular geometry.'
      },
      {
        id: 'reaction-dynamics',
        title: 'Chemical Reaction Dynamics',
        description: 'Real-time chemical reaction simulation',
        type: 'Simulation',
        difficulty: 'Advanced',
        audioScript: 'Watch chemical reactions unfold in real-time. See how molecules collide, bond formation and breaking occurs.'
      }
    ],
    Biology: [
      {
        id: 'cell-structure',
        title: 'Cell Structure',
        description: '3D exploration of cellular components',
        type: 'Interactive',
        difficulty: 'Beginner',
        audioScript: 'Take a journey inside a cell. Explore organelles, their functions, and how they work together in this 3D environment.'
      },
      {
        id: 'dna-replication',
        title: 'DNA Replication',
        description: 'Step-by-step DNA replication process',
        type: 'Animation',
        difficulty: 'Advanced',
        audioScript: 'Witness DNA replication at the molecular level. See how the double helix unwinds and new strands are synthesized.'
      }
    ]
  };

  const tabs = [
    {
      id: 'simulation',
      label: 'Live Simulation',
      icon: Activity,
      description: 'Real-time 3D simulation with physics'
    },
    {
      id: 'analysis',
      label: 'Force Analysis',
      icon: Brain,
      description: 'Detailed force and motion analysis'
    },
    {
      id: 'examples',
      label: '3D Examples',
      icon: Box,
      description: 'Interactive examples and scenarios'
    },
    {
      id: 'lab',
      label: 'Virtual Lab',
      icon: FlaskConical,
      description: 'Hands-on virtual experiments'
    }
  ];

  // Audio management with progress tracking
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const playAudioExplanation = (content: string, duration: number = 30) => {
    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = playbackSpeed[0];
      utterance.volume = 0.8;
      
      utterance.onstart = () => {
        setIsAudioPlaying(true);
        setAudioProgress(0);
        
        // Simulate progress tracking
        const progressInterval = setInterval(() => {
          setAudioProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + (100 / (duration * 10)); // Approximate progress
          });
        }, 100);
      };
      
      utterance.onend = () => {
        setIsAudioPlaying(false);
        setAudioProgress(100);
      };
      
      setCurrentUtterance(utterance);
      window.speechSynthesis.speak(utterance);
    }
  };

  const pauseAudio = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsAudioPlaying(false);
    }
  };

  const resumeAudio = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsAudioPlaying(true);
    }
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsAudioPlaying(false);
    setAudioProgress(0);
  };

  const getTabContent = (tabName: string) => {
    const currentModels = models[activeSubject as keyof typeof models] || models.Physics;
    const currentModel = currentModels[selectedModel] || currentModels[0];
    
    return {
      title: tabs.find(t => t.id === tabName)?.label || '',
      description: tabs.find(t => t.id === tabName)?.description || '',
      audioScript: currentModel.audioScript,
      component: renderTabComponent(tabName, currentModel)
    };
  };

  const renderTabComponent = (tabName: string, model: any) => {
    switch (tabName) {
      case 'simulation':
        return <LiveSimulation3D model={model} isAnimating={isAnimating} forceValue={forceValue[0]} massValue={massValue[0]} />;
      case 'analysis':
        return <ForceAnalysis3D model={model} />;
      case 'examples':
        return <Examples3D model={model} />;
      case 'lab':
        return <VirtualLab3D model={model} />;
      default:
        return <LiveSimulation3D model={model} isAnimating={isAnimating} forceValue={forceValue[0]} massValue={massValue[0]} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Audio Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Move3D className="h-5 w-5 text-indigo-600" />
                3D Interactive Laboratory - {conceptName}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Immersive 3D learning with synchronized audio explanations
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAIChat(true)}
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                AI Lab Assistant
              </Button>
              <Badge variant="outline">
                3D Lab
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Enhanced Audio Controls */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isAudioPlaying) {
                      pauseAudio();
                    } else if (window.speechSynthesis.paused) {
                      resumeAudio();
                    } else {
                      const tabContent = getTabContent(activeTab);
                      playAudioExplanation(tabContent.audioScript);
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  {isAudioPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isAudioPlaying ? 'Pause' : 'Play'} 3D Guide
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className={isMuted ? 'bg-red-50 border-red-200' : ''}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    stopAudio();
                    setIsAnimating(false);
                    setRotationSpeed([50]);
                    setForceValue([20]);
                    setMassValue([5]);
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <span>Speed:</span>
                <Slider
                  value={playbackSpeed}
                  onValueChange={setPlaybackSpeed}
                  min={0.5}
                  max={2}
                  step={0.25}
                  className="w-20"
                />
                <span>{playbackSpeed[0]}x</span>
              </div>
            </div>
            
            <Progress value={audioProgress} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Audio Progress</span>
              <span>{Math.round(audioProgress)}%</span>
            </div>
          </div>

          {/* Subject Selector */}
          <div className="flex gap-2 mb-4">
            {subjects.map((subject) => (
              <Button
                key={subject}
                variant={activeSubject === subject ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setActiveSubject(subject);
                  setSelectedModel(0);
                  stopAudio();
                }}
                className="flex items-center gap-2"
              >
                {subject === 'Physics' && <Atom className="h-4 w-4" />}
                {subject === 'Chemistry' && <FlaskConical className="h-4 w-4" />}
                {subject === 'Biology' && <Target className="h-4 w-4" />}
                {subject}
              </Button>
            ))}
          </div>

          {/* Model Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {(models[activeSubject as keyof typeof models] || []).map((model, index) => (
              <Button
                key={model.id}
                variant={selectedModel === index ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedModel(index);
                  stopAudio();
                }}
                className="whitespace-nowrap"
              >
                <Badge variant="outline" className="mr-2 text-xs">
                  {model.type}
                </Badge>
                {model.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced 3D Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value);
        stopAudio();
      }} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => {
          const tabContent = getTabContent(tab.id);
          return (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSubject}-${selectedModel}-${tab.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <tab.icon className="h-5 w-5 text-indigo-600" />
                            {tabContent.title} - {activeSubject}
                            {isAudioPlaying && activeTab === tab.id && (
                              <Badge variant="outline" className="animate-pulse">
                                Audio Active
                              </Badge>
                            )}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {tabContent.description}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => playAudioExplanation(tabContent.audioScript)}
                          className="flex items-center gap-2"
                        >
                          <Volume2 className="h-4 w-4" />
                          Explain
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {tabContent.component}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Global Controls */}
      {activeTab === 'simulation' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Simulation Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Rotation Speed: {rotationSpeed[0]}%
                </label>
                <Slider
                  value={rotationSpeed}
                  onValueChange={setRotationSpeed}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Force Value: {forceValue[0]} N
                </label>
                <Slider
                  value={forceValue}
                  onValueChange={setForceValue}
                  min={0}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Mass Value: {massValue[0]} kg
                </label>
                <Slider
                  value={massValue}
                  onValueChange={setMassValue}
                  min={1}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <Button
                onClick={() => setIsAnimating(!isAnimating)}
                variant={isAnimating ? "destructive" : "default"}
                className="flex items-center gap-2"
              >
                {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isAnimating ? 'Stop' : 'Start'} Animation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Assistant Chat */}
      <AIAssistantChat
        conceptName={`${conceptName} - 3D Lab`}
        context={`3D Lab: ${activeTab}, Subject: ${activeSubject}`}
        isVisible={showAIChat}
        onClose={() => setShowAIChat(false)}
      />
    </div>
  );
};

// Enhanced Individual Tab Components with 3D Visuals
const LiveSimulation3D: React.FC<{
  model: any;
  isAnimating: boolean;
  forceValue: number;
  massValue: number;
}> = ({ model, isAnimating, forceValue, massValue }) => {
  const acceleration = forceValue / massValue;
  
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 p-6 rounded-lg min-h-[500px] relative overflow-hidden">
        {/* 3D Scene Simulation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className={`relative w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl ${
              isAnimating ? 'animate-spin' : ''
            }`}
            animate={{
              scale: isAnimating ? [1, 1.1, 1] : 1,
              rotateY: isAnimating ? 360 : 0,
            }}
            transition={{
              duration: 2,
              repeat: isAnimating ? Infinity : 0,
              ease: "linear"
            }}
          >
            <Atom className="h-16 w-16 text-white" />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-bold">
              {massValue} kg
            </div>
          </motion.div>
          
          {/* Force Vectors */}
          {forceValue > 0 && (
            <motion.div
              className="absolute flex items-center"
              animate={{
                scale: forceValue / 25,
                rotate: isAnimating ? [0, 360] : 0
              }}
              transition={{ duration: 2, repeat: isAnimating ? Infinity : 0 }}
            >
              <div className="w-20 h-1 bg-red-500 shadow-lg"></div>
              <div className="w-0 h-0 border-l-4 border-l-red-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
            </motion.div>
          )}
        </div>
        
        {/* 3D Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-blue-300"></div>
            ))}
          </div>
        </div>
        
        {/* Live Data Display */}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Live Physics Data</h4>
          <div className="space-y-1 text-sm">
            <div>Force: {forceValue} N</div>
            <div>Mass: {massValue} kg</div>
            <div>Acceleration: {acceleration.toFixed(2)} m/s²</div>
            <div>Status: {isAnimating ? '🔄 Running' : '⏸️ Paused'}</div>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 text-white/80">
          <div className="text-lg font-bold">{model.title}</div>
          <div className="text-sm">{model.description}</div>
        </div>
      </div>
    </div>
  );
};

const ForceAnalysis3D: React.FC<{ model: any }> = ({ model }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 p-6 rounded-lg min-h-[500px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* 3D Force Diagram */}
          <div className="relative">
            <h3 className="text-xl font-bold mb-4">3D Force Analysis</h3>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 h-64 flex items-center justify-center">
              <motion.div
                className="relative"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                {/* Central Object */}
                <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Box className="h-8 w-8 text-white" />
                </div>
                
                {/* Force Vectors in 3D */}
                <motion.div
                  className="absolute -left-12 top-1/2 transform -translate-y-1/2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-8 h-1 bg-red-500"></div>
                  <div className="text-xs text-red-500 mt-1">Fx</div>
                </motion.div>
                
                <motion.div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="w-1 h-8 bg-green-500"></div>
                  <div className="text-xs text-green-500 mt-1">Fy</div>
                </motion.div>
                
                <motion.div
                  className="absolute -right-12 top-1/2 transform -translate-y-1/2"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <div className="w-8 h-1 bg-blue-500"></div>
                  <div className="text-xs text-blue-500 mt-1">Fz</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Analysis Results */}
          <div>
            <h3 className="text-xl font-bold mb-4">Force Calculations</h3>
            <div className="space-y-4">
              {[
                { label: "Force X", value: "25 N", color: "red" },
                { label: "Force Y", value: "15 N", color: "green" },
                { label: "Force Z", value: "10 N", color: "blue" },
                { label: "Resultant", value: "32.02 N", color: "purple" }
              ].map((force, index) => (
                <motion.div
                  key={force.label}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-semibold text-${force.color}-600`}>
                      {force.label}:
                    </span>
                    <span className="font-mono">{force.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Examples3D: React.FC<{ model: any }> = ({ model }) => {
  const examples = [
    { title: "Basic Force", visual: "🎯", color: "from-blue-400 to-blue-600" },
    { title: "Complex Motion", visual: "🌪️", color: "from-purple-400 to-purple-600" },
    { title: "Real Application", visual: "🚀", color: "from-green-400 to-green-600" }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900 p-6 rounded-lg min-h-[500px]">
        <h3 className="text-xl font-bold mb-6">Interactive 3D Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${example.color} p-6 rounded-xl text-white cursor-pointer relative overflow-hidden`}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="text-6xl mb-4 text-center"
                animate={{
                  rotateZ: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {example.visual}
              </motion.div>
              <h4 className="text-lg font-bold text-center mb-2">{example.title}</h4>
              <p className="text-sm text-center opacity-90">
                Click to explore this 3D example
              </p>
              
              {/* Interactive Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-50"
                    animate={{
                      x: [0, 100, 0],
                      y: [0, -50, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${60 + i * 5}%`
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VirtualLab3D: React.FC<{ model: any }> = ({ model }) => {
  const [experimentRunning, setExperimentRunning] = useState(false);
  const [labResults, setLabResults] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState('measuring');

  const labTools = [
    { id: 'measuring', name: 'Measuring Tools', icon: '📏', color: 'blue' },
    { id: 'sensors', name: 'Force Sensors', icon: '📡', color: 'green' },
    { id: 'controls', name: 'Control Panel', icon: '🎛️', color: 'purple' },
    { id: 'analyzer', name: 'Data Analyzer', icon: '📊', color: 'orange' }
  ];

  const startExperiment = () => {
    setExperimentRunning(true);
    const newResult = `Experiment ${labResults.length + 1}: ${model.title} analysis completed at ${new Date().toLocaleTimeString()}`;
    
    setTimeout(() => {
      setLabResults(prev => [...prev, newResult]);
      setExperimentRunning(false);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          `Experiment completed successfully. The 3D analysis shows clear relationships between the variables in ${model.title}.`
        );
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-900 p-6 rounded-lg min-h-[500px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Virtual 3D Laboratory</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{model.title}</Badge>
            <Badge variant="outline" className={experimentRunning ? 'animate-pulse' : ''}>
              {experimentRunning ? '🔬 Running' : '⚗️ Ready'}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Lab Environment */}
          <div className="lg:col-span-2 bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 relative">
            <div className="h-64 relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              {/* 3D Lab Table */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gradient-to-r from-brown-400 to-brown-600 rounded-lg"></div>
              
              {/* Equipment */}
              <motion.div
                className="absolute bottom-8 left-1/4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                animate={{
                  y: experimentRunning ? [-2, 2, -2] : 0,
                  scale: experimentRunning ? [1, 1.1, 1] : 1
                }}
                transition={{
                  duration: 1,
                  repeat: experimentRunning ? Infinity : 0
                }}
              >
                📏
              </motion.div>
              
              <motion.div
                className="absolute bottom-8 right-1/4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                animate={{
                  rotate: experimentRunning ? 360 : 0,
                  scale: experimentRunning ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: 2,
                  repeat: experimentRunning ? Infinity : 0
                }}
              >
                📡
              </motion.div>
              
              {/* Data Visualization */}
              <div className="absolute top-4 left-4 bg-white/80 dark:bg-gray-800/80 p-2 rounded text-xs">
                3D Lab Environment
              </div>
            </div>
            
            {/* Lab Controls */}
            <div className="mt-4 flex gap-2">
              <Button
                onClick={startExperiment}
                disabled={experimentRunning}
                className="flex-1 flex items-center gap-2"
                variant={experimentRunning ? "secondary" : "default"}
              >
                {experimentRunning ? (
                  <>
                    <Activity className="h-4 w-4 animate-spin" />
                    Running 3D Analysis...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Start 3D Experiment
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Lab Tools & Results */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Lab Tools</h4>
              <div className="grid grid-cols-2 gap-2">
                {labTools.map((tool) => (
                  <motion.button
                    key={tool.id}
                    className={`p-3 rounded-lg text-center transition-all ${
                      selectedTool === tool.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white/50 dark:bg-gray-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                    }`}
                    onClick={() => setSelectedTool(tool.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-1">{tool.icon}</div>
                    <div className="text-xs">{tool.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Experiment Results</h4>
              <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg min-h-[150px] max-h-[200px] overflow-y-auto">
                {labResults.length === 0 ? (
                  <p className="text-gray-500 text-center text-sm">
                    No experiments completed yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {labResults.map((result, index) => (
                      <motion.div
                        key={index}
                        className="text-xs p-2 bg-green-50 dark:bg-green-900/30 rounded border-l-2 border-green-500"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        ✅ {result}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enhanced3DTab;
