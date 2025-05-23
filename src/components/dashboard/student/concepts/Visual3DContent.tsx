
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Box, Play, Pause, RotateCcw, ZoomIn, ZoomOut, 
  Move3D, Settings, Download, Share2, Eye,
  Atom, FlaskConical, Target, Activity, Volume2, Mic
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Visual3DContentProps {
  conceptName: string;
}

const Visual3DContent: React.FC<Visual3DContentProps> = ({ conceptName }) => {
  const [activeTab, setActiveTab] = useState('simulation');
  const [selectedModel, setSelectedModel] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState([50]);
  const [forceValue, setForceValue] = useState([20]);
  const [massValue, setMassValue] = useState([5]);
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
        difficulty: 'Beginner'
      },
      {
        id: 'mass-acceleration',
        title: 'Mass-Acceleration Relationship',
        description: 'Visual demonstration of how mass affects acceleration',
        type: 'Simulation',
        difficulty: 'Intermediate'
      }
    ],
    Chemistry: [
      {
        id: 'molecular-structure',
        title: 'Molecular Structure',
        description: '3D visualization of molecular bonds and structures',
        type: 'Interactive',
        difficulty: 'Intermediate'
      },
      {
        id: 'reaction-dynamics',
        title: 'Chemical Reaction Dynamics',
        description: 'Real-time chemical reaction simulation',
        type: 'Simulation',
        difficulty: 'Advanced'
      }
    ],
    Biology: [
      {
        id: 'cell-structure',
        title: 'Cell Structure',
        description: '3D exploration of cellular components',
        type: 'Interactive',
        difficulty: 'Beginner'
      },
      {
        id: 'dna-replication',
        title: 'DNA Replication',
        description: 'Step-by-step DNA replication process',
        type: 'Animation',
        difficulty: 'Advanced'
      }
    ]
  };

  const playAudioExplanation = (content: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getTabContent = (tabName: string) => {
    const currentModels = models[activeSubject as keyof typeof models] || models.Physics;
    
    switch (tabName) {
      case 'simulation':
        return {
          title: 'Live Simulation',
          content: `This is a live simulation of ${conceptName} for ${activeSubject}. You can interact with the parameters to see real-time changes in the system behavior. Watch how different forces interact and affect motion in this dynamic environment.`,
          component: <LiveSimulationTab conceptName={conceptName} subject={activeSubject} />
        };
      case 'analysis':
        return {
          title: 'Force Analysis',
          content: `Detailed force analysis for ${conceptName}. This shows how different forces interact and affect the system in ${activeSubject}. You can analyze force vectors, calculate resultant forces, and understand equilibrium conditions.`,
          component: <ForceAnalysisTab conceptName={conceptName} subject={activeSubject} />
        };
      case 'examples':
        return {
          title: '3D Examples',
          content: `Interactive 3D examples demonstrating ${conceptName} concepts in ${activeSubject}. Click on different elements to explore. Each example shows real-world applications and helps visualize abstract concepts.`,
          component: <Examples3DTab conceptName={conceptName} subject={activeSubject} />
        };
      case 'lab':
        return {
          title: 'Virtual Lab',
          content: `Welcome to the virtual laboratory for ${conceptName}. Conduct experiments and observe results in a safe, controlled environment. This lab allows you to manipulate variables and see immediate results.`,
          component: <VirtualLabTab conceptName={conceptName} subject={activeSubject} />
        };
      default:
        return {
          title: 'Live Simulation',
          content: `This is a live simulation of ${conceptName}.`,
          component: <LiveSimulationTab conceptName={conceptName} subject={activeSubject} />
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Subject Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Atom className="h-5 w-5 text-indigo-600" />
            Subject Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {subjects.map((subject) => (
              <Button
                key={subject}
                variant={activeSubject === subject ? "default" : "outline"}
                onClick={() => setActiveSubject(subject)}
                className="flex items-center gap-2"
              >
                {subject === 'Physics' && <Atom className="h-4 w-4" />}
                {subject === 'Chemistry' && <FlaskConical className="h-4 w-4" />}
                {subject === 'Biology' && <Target className="h-4 w-4" />}
                {subject}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3D Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="simulation">Live Simulation</TabsTrigger>
          <TabsTrigger value="analysis">Force Analysis</TabsTrigger>
          <TabsTrigger value="examples">3D Examples</TabsTrigger>
          <TabsTrigger value="lab">Virtual Lab</TabsTrigger>
        </TabsList>

        {(['simulation', 'analysis', 'examples', 'lab'] as const).map((tabName) => {
          const tabContent = getTabContent(tabName);
          return (
            <TabsContent key={tabName} value={tabName} className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Move3D className="h-5 w-5 text-indigo-600" />
                      {tabContent.title}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => playAudioExplanation(tabContent.content)}
                      className="flex items-center gap-2"
                    >
                      <Volume2 className="h-4 w-4" />
                      Audio Explanation
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {tabContent.component}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

// Enhanced Individual Tab Components
const LiveSimulationTab: React.FC<{ conceptName: string; subject: string }> = ({ conceptName, subject }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const playSimulationAudio = () => {
    const audioContent = `This live simulation demonstrates ${conceptName} in ${subject}. You can control the simulation speed and observe how the system behaves over time. The animated elements show real-time physics calculations.`;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(audioContent);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 p-6 rounded-lg min-h-[400px] flex flex-col items-center justify-center">
        <div className="text-center space-y-4 mb-6">
          <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center relative ${isRunning ? 'animate-pulse' : ''}`}>
            <Atom className={`h-16 w-16 text-white ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning && (
              <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping"></div>
            )}
          </div>
          <h3 className="text-xl font-bold">Live {subject} Simulation</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive simulation of {conceptName} running in real-time
          </p>
          <div className="text-lg font-mono">Time: {time.toFixed(1)}s</div>
        </div>
        
        {/* Simulation visualization */}
        {isRunning && (
          <div className="w-full max-w-md">
            <svg className="w-full h-32" viewBox="0 0 300 100">
              <circle 
                cx={50 + (time * speed[0] % 200)} 
                cy="50" 
                r="8" 
                fill="#ef4444"
                className="animate-bounce"
              />
              <text x="150" y="80" textAnchor="middle" className="text-sm fill-current">
                Position: {((time * speed[0]) % 200).toFixed(1)}px
              </text>
            </svg>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1 mr-4">
          <label className="text-sm font-medium">Simulation Speed</label>
          <Slider
            value={speed}
            onValueChange={setSpeed}
            min={1}
            max={100}
            step={1}
            className="w-full"
          />
          <span className="text-xs text-gray-500">Speed: {speed[0]}%</span>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={playSimulationAudio}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Volume2 className="h-4 w-4" />
            Explain
          </Button>
          <Button
            onClick={() => setIsRunning(!isRunning)}
            variant={isRunning ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isRunning ? 'Stop' : 'Start'} Simulation
          </Button>
        </div>
      </div>
    </div>
  );
};

const ForceAnalysisTab: React.FC<{ conceptName: string; subject: string }> = ({ conceptName, subject }) => {
  const [forceA, setForceA] = useState([25]);
  const [forceB, setForceB] = useState([15]);
  
  const netForce = forceA[0] + forceB[0];
  const resultantAngle = Math.atan2(forceB[0], forceA[0]) * (180 / Math.PI);

  const playAnalysisAudio = () => {
    const audioContent = `This force analysis shows how ${conceptName} applies to ${subject}. The current forces are ${forceA[0]} Newtons and ${forceB[0]} Newtons, resulting in a net force of ${netForce} Newtons at an angle of ${resultantAngle.toFixed(1)} degrees.`;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(audioContent);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Force Analysis - {subject}</h3>
          <Button 
            onClick={playAnalysisAudio}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Volume2 className="h-4 w-4" />
            Explain Analysis
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-4">Force Controls</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Force A: {forceA[0]} N</label>
                  <Slider
                    value={forceA}
                    onValueChange={setForceA}
                    min={0}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Force B: {forceB[0]} N</label>
                  <Slider
                    value={forceB}
                    onValueChange={setForceB}
                    min={0}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Analysis Results</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Force A:</span>
                  <span className="font-mono">{forceA[0]} N</span>
                </div>
                <div className="flex justify-between">
                  <span>Force B:</span>
                  <span className="font-mono">{forceB[0]} N</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Net Force:</span>
                  <span className="font-mono font-bold">{netForce} N</span>
                </div>
                <div className="flex justify-between">
                  <span>Resultant Angle:</span>
                  <span className="font-mono">{resultantAngle.toFixed(1)}°</span>
                </div>
                <div className="flex justify-between">
                  <span>System Equilibrium:</span>
                  <span className={netForce === 0 ? "text-green-600" : "text-red-600"}>
                    {netForce === 0 ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Force Vector Visualization */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Vector Diagram</h4>
            <svg className="w-full h-64" viewBox="0 0 300 200">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                        refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                </marker>
              </defs>
              
              {/* Origin */}
              <circle cx="150" cy="100" r="5" fill="#ef4444"/>
              
              {/* Force A */}
              <line 
                x1="150" y1="100" 
                x2={150 + forceA[0] * 2} y2="100" 
                stroke="#3b82f6" strokeWidth="3" 
                markerEnd="url(#arrowhead)"
              />
              <text x={150 + forceA[0]} y="90" textAnchor="middle" className="fill-blue-600 text-sm">
                F₁
              </text>
              
              {/* Force B */}
              <line 
                x1="150" y1="100" 
                x2="150" y2={100 - forceB[0] * 2} 
                stroke="#10b981" strokeWidth="3" 
                markerEnd="url(#arrowhead)"
              />
              <text x="160" y={100 - forceB[0]} className="fill-green-600 text-sm">
                F₂
              </text>
              
              {/* Resultant */}
              <line 
                x1="150" y1="100" 
                x2={150 + forceA[0] * 2} y2={100 - forceB[0] * 2} 
                stroke="#f59e0b" strokeWidth="3" 
                markerEnd="url(#arrowhead)"
                strokeDasharray="5,5"
              />
              <text x={150 + forceA[0]} y={100 - forceB[0] - 10} className="fill-amber-600 text-sm">
                Resultant
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const Examples3DTab: React.FC<{ conceptName: string; subject: string }> = ({ conceptName, subject }) => {
  const [selectedExample, setSelectedExample] = useState(0);
  
  const examples = [
    { 
      title: 'Basic Example', 
      description: `Simple ${conceptName} demonstration`,
      details: `This basic example shows the fundamental principles of ${conceptName} in ${subject}. It demonstrates the core concepts without complex variables.`
    },
    { 
      title: 'Complex Example', 
      description: `Advanced ${conceptName} scenario`,
      details: `This advanced example explores complex scenarios involving ${conceptName} in ${subject}. Multiple forces and variables interact simultaneously.`
    },
    { 
      title: 'Real-world Application', 
      description: `${conceptName} in practical use`,
      details: `This real-world application shows how ${conceptName} applies to everyday situations in ${subject}. See practical examples and applications.`
    }
  ];

  const playExampleAudio = (example: typeof examples[0]) => {
    const audioContent = `${example.title}: ${example.details}`;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(audioContent);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900 p-6 rounded-lg min-h-[400px]">
        <h3 className="text-xl font-bold mb-4">3D Examples - {subject}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-gray-800 p-4 rounded-lg hover:shadow-lg transition-all cursor-pointer border-2 ${
                selectedExample === index ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedExample(index)}
            >
              <div className="w-full h-32 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                <Box className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                {selectedExample === index && (
                  <div className="absolute inset-0 bg-blue-500 opacity-20 animate-pulse"></div>
                )}
              </div>
              <h4 className="font-semibold">{example.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{example.description}</p>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  playExampleAudio(example);
                }}
                className="flex items-center gap-1 text-xs"
              >
                <Volume2 className="h-3 w-3" />
                Explain
              </Button>
            </div>
          ))}
        </div>
        
        {/* Selected example details */}
        <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">{examples[selectedExample].title} - Details</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {examples[selectedExample].details}
          </p>
          
          {/* Interactive 3D visualization placeholder */}
          <div className="bg-gray-100 dark:bg-gray-700 h-48 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Atom className="h-12 w-12 mx-auto mb-2 text-blue-600 animate-spin" />
              <p className="text-sm">3D Visualization Active</p>
              <p className="text-xs text-gray-500">Rendering {examples[selectedExample].title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VirtualLabTab: React.FC<{ conceptName: string; subject: string }> = ({ conceptName, subject }) => {
  const [experimentRunning, setExperimentRunning] = useState(false);
  const [labResults, setLabResults] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState('');
  const [experimentProgress, setExperimentProgress] = useState(0);

  const labTools = {
    Physics: ['Force Meter', 'Accelerometer', 'Mass Scale', 'Timer'],
    Chemistry: ['pH Meter', 'Thermometer', 'Burette', 'Spectroscope'],
    Biology: ['Microscope', 'pH Strips', 'Thermometer', 'Measuring Cylinder']
  };

  const currentTools = labTools[subject as keyof typeof labTools] || labTools.Physics;

  const startExperiment = () => {
    if (!selectedTool) {
      alert('Please select a tool first!');
      return;
    }
    
    setExperimentRunning(true);
    setExperimentProgress(0);
    
    const progressInterval = setInterval(() => {
      setExperimentProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    const newResult = `Experiment ${labResults.length + 1}: ${conceptName} test using ${selectedTool} completed at ${new Date().toLocaleTimeString()}`;
    
    // Simulate experiment running
    setTimeout(() => {
      setLabResults(prev => [...prev, newResult]);
      setExperimentRunning(false);
      setExperimentProgress(0);
      
      // Audio explanation for lab results
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Experiment completed successfully. Results show the behavior of ${conceptName} in the virtual ${subject} laboratory using ${selectedTool}. The data has been recorded for analysis.`);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    }, 3000);
  };

  const playLabIntroAudio = () => {
    const audioContent = `Welcome to the virtual ${subject} laboratory for ${conceptName}. You can select different tools, conduct experiments, and observe real-time results. This safe environment allows you to explore concepts without any physical limitations.`;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(audioContent);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Virtual {subject} Lab</h3>
          <div className="flex gap-2">
            <Badge variant="outline">{conceptName}</Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={playLabIntroAudio}
              className="flex items-center gap-1"
            >
              <Volume2 className="h-3 w-3" />
              Lab Intro
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lab Equipment */}
          <div className="space-y-4">
            <h4 className="font-semibold">Lab Equipment</h4>
            <div className="grid grid-cols-2 gap-2">
              {currentTools.map((tool, index) => (
                <div 
                  key={index} 
                  className={`bg-white dark:bg-gray-800 p-3 rounded-lg text-center cursor-pointer transition-all hover:shadow-md border-2 ${
                    selectedTool === tool ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedTool(tool)}
                >
                  <FlaskConical className="h-6 w-6 mx-auto mb-1 text-orange-600" />
                  <p className="text-xs">{tool}</p>
                  {selectedTool === tool && (
                    <div className="text-xs text-orange-600 mt-1">Selected</div>
                  )}
                </div>
              ))}
            </div>
            
            {selectedTool && (
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <h5 className="font-medium text-sm mb-2">Selected Tool: {selectedTool}</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  This tool will be used to measure and analyze {conceptName} properties.
                </p>
              </div>
            )}
            
            {experimentRunning && (
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <h5 className="font-medium text-sm mb-2">Experiment Progress</h5>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${experimentProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-center mt-1">{experimentProgress}%</p>
              </div>
            )}
            
            <Button
              onClick={startExperiment}
              disabled={experimentRunning || !selectedTool}
              className="w-full flex items-center gap-2"
              variant={experimentRunning ? "secondary" : "default"}
            >
              {experimentRunning ? (
                <>
                  <Activity className="h-4 w-4 animate-spin" />
                  Running Experiment...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start Experiment
                </>
              )}
            </Button>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h4 className="font-semibold">Experiment Results</h4>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg min-h-[200px]">
              {labResults.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <FlaskConical className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No experiments run yet</p>
                  <p className="text-xs">Select a tool and start your first experiment</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h5 className="font-medium text-sm mb-3">Recorded Data:</h5>
                  {labResults.map((result, index) => (
                    <div key={index} className="text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded border-l-4 border-orange-500">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {result}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {labResults.length > 0 && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium text-sm mb-2">Analysis Summary</h5>
                <div className="text-xs space-y-1">
                  <p>• Total experiments: {labResults.length}</p>
                  <p>• Success rate: 100%</p>
                  <p>• Average completion time: 3.0s</p>
                  <p>• Data quality: Excellent</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visual3DContent;
