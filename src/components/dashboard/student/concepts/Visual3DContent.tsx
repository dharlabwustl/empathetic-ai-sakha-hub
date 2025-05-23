
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
          content: `This live simulation demonstrates ${conceptName} in ${activeSubject}. You can adjust parameters like force and mass to see real-time changes in acceleration according to Newton's Second Law. The simulation shows how different forces affect object motion, allowing you to experiment with various scenarios.`,
          component: <LiveSimulationTab conceptName={conceptName} subject={activeSubject} forceValue={forceValue} massValue={massValue} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
        };
      case 'analysis':
        return {
          title: 'Force Analysis',
          content: `This detailed force analysis for ${conceptName} shows how different forces interact in ${activeSubject}. The visualization breaks down force components, shows resultant forces, and demonstrates how they relate to acceleration. You can see force vectors, magnitude calculations, and directional analysis.`,
          component: <ForceAnalysisTab conceptName={conceptName} subject={activeSubject} forceValue={forceValue} />
        };
      case 'examples':
        return {
          title: '3D Examples',
          content: `These interactive 3D examples demonstrate ${conceptName} concepts in ${activeSubject}. Each example shows real-world applications where you can manipulate variables and observe the effects. The models help visualize abstract concepts through concrete, interactive demonstrations.`,
          component: <Examples3DTab conceptName={conceptName} subject={activeSubject} />
        };
      case 'lab':
        return {
          title: 'Virtual Lab',
          content: `Welcome to the virtual ${activeSubject} laboratory for ${conceptName}. Here you can conduct experiments safely, collect data, and analyze results. The lab includes measurement tools, data logging, and experimental controls that help you understand the practical applications of this concept.`,
          component: <VirtualLabTab conceptName={conceptName} subject={activeSubject} />
        };
      default:
        return {
          title: 'Live Simulation',
          content: `This is a live simulation of ${conceptName}.`,
          component: <LiveSimulationTab conceptName={conceptName} subject={activeSubject} forceValue={forceValue} massValue={massValue} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
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

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-600" />
            Simulation Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Applied Force (N)</label>
              <Slider
                value={forceValue}
                onValueChange={setForceValue}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-gray-500">Current: {forceValue[0]}N</div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mass (kg)</label>
              <Slider
                value={massValue}
                onValueChange={setMassValue}
                min={1}
                max={20}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-gray-500">Current: {massValue[0]}kg</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <div className="text-sm font-medium mb-1">Calculated Acceleration:</div>
            <div className="text-lg font-bold text-blue-600">
              a = {(forceValue[0] / massValue[0]).toFixed(2)} m/s²
            </div>
            <div className="text-xs text-gray-600 mt-1">F = ma → a = F/m</div>
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
const LiveSimulationTab: React.FC<{ 
  conceptName: string; 
  subject: string; 
  forceValue: number[]; 
  massValue: number[]; 
  isAnimating: boolean; 
  setIsAnimating: (value: boolean) => void; 
}> = ({ conceptName, subject, forceValue, massValue, isAnimating, setIsAnimating }) => {
  const [simulationData, setSimulationData] = useState({ velocity: 0, distance: 0 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnimating) {
      interval = setInterval(() => {
        setSimulationData(prev => {
          const acceleration = forceValue[0] / massValue[0];
          const newVelocity = prev.velocity + acceleration * 0.1;
          const newDistance = prev.distance + newVelocity * 0.1;
          return {
            velocity: Math.min(newVelocity, 50), // Cap at 50 m/s
            distance: newDistance
          };
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAnimating, forceValue, massValue]);

  const resetSimulation = () => {
    setIsAnimating(false);
    setSimulationData({ velocity: 0, distance: 0 });
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Live {subject} Simulation</h3>
          <Button
            onClick={() => {
              const explanation = `This simulation shows a real-time demonstration of ${conceptName}. The blue object represents a mass of ${massValue[0]} kilograms. When a force of ${forceValue[0]} Newtons is applied, it accelerates at ${(forceValue[0] / massValue[0]).toFixed(2)} meters per second squared according to Newton's Second Law.`;
              if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(explanation);
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
              }
            }}
            variant="outline"
            size="sm"
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Explain Simulation
          </Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg relative overflow-hidden">
          {/* Simulation Area */}
          <div className="relative h-64 border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            {/* Ground line */}
            <div className="absolute bottom-0 w-full h-1 bg-green-500"></div>
            
            {/* Moving object */}
            <motion.div
              className="absolute bottom-1 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold"
              animate={{
                x: Math.min(simulationData.distance * 2, 400), // Scale distance for display
              }}
              transition={{ duration: 0.1, ease: "linear" }}
            >
              {massValue[0]}kg
            </motion.div>
            
            {/* Force arrow */}
            {isAnimating && (
              <motion.div
                className="absolute bottom-14 flex items-center"
                animate={{
                  x: Math.min(simulationData.distance * 2, 400),
                }}
                transition={{ duration: 0.1, ease: "linear" }}
              >
                <div className="bg-red-500 h-1 w-16 relative">
                  <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-red-500 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                </div>
                <span className="text-red-500 text-sm font-bold ml-2">{forceValue[0]}N</span>
              </motion.div>
            )}
          </div>
          
          {/* Data Display */}
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <div className="text-sm font-medium text-blue-600">Velocity</div>
              <div className="text-lg font-bold">{simulationData.velocity.toFixed(1)} m/s</div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
              <div className="text-sm font-medium text-green-600">Distance</div>
              <div className="text-lg font-bold">{simulationData.distance.toFixed(1)} m</div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
              <div className="text-sm font-medium text-purple-600">Acceleration</div>
              <div className="text-lg font-bold">{(forceValue[0] / massValue[0]).toFixed(2)} m/s²</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={() => setIsAnimating(!isAnimating)}
          variant={isAnimating ? "destructive" : "default"}
          className="flex items-center gap-2"
        >
          {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isAnimating ? 'Stop' : 'Start'} Simulation
        </Button>
        <Button onClick={resetSimulation} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};

const ForceAnalysisTab: React.FC<{ conceptName: string; subject: string; forceValue: number[]; }> = ({ conceptName, subject, forceValue }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Force Analysis - {subject}</h3>
          <Button
            onClick={() => {
              const explanation = `This force analysis breaks down the components of ${conceptName}. The diagram shows force vectors, their magnitudes, and directions. The applied force creates acceleration according to F equals m times a. You can see how forces combine and affect the motion of objects.`;
              if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(explanation);
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
              }
            }}
            variant="outline"
            size="sm"
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Explain Analysis
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Force Vector Diagram */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-4 text-center">Force Vector Diagram</h4>
            <svg width="100%" height="250" viewBox="0 0 300 250">
              {/* Object */}
              <rect x="125" y="100" width="50" height="50" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" rx="5"/>
              <text x="150" y="130" textAnchor="middle" className="text-sm font-medium fill-white">Object</text>
              
              {/* Force vectors */}
              <defs>
                <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                </marker>
                <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                </marker>
              </defs>
              
              {/* Applied Force */}
              <line x1="50" y1="125" x2="120" y2="125" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead-red)"/>
              <text x="85" y="115" textAnchor="middle" className="text-sm font-medium fill-red-600">F = {forceValue[0]}N</text>
              
              {/* Acceleration */}
              <line x1="180" y1="125" x2="250" y2="125" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead-green)"/>
              <text x="215" y="115" textAnchor="middle" className="text-sm font-medium fill-green-600">a</text>
              
              {/* Labels */}
              <text x="150" y="200" textAnchor="middle" className="text-lg font-bold fill-gray-700 dark:fill-gray-300">F = ma</text>
            </svg>
          </div>

          {/* Analysis Results */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Force Analysis Results</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/30 rounded">
                <span className="font-medium">Applied Force:</span>
                <span className="font-mono text-red-600">{forceValue[0]} N</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                <span className="font-medium">Mass:</span>
                <span className="font-mono text-blue-600">5 kg</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/30 rounded">
                <span className="font-medium">Acceleration:</span>
                <span className="font-mono text-green-600">{(forceValue[0] / 5).toFixed(2)} m/s²</span>
              </div>
              <div className="border-t pt-4">
                <h5 className="font-semibold mb-2">Analysis Notes:</h5>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• Force and acceleration are directly proportional</li>
                  <li>• Doubling force doubles acceleration</li>
                  <li>• Direction of acceleration matches force direction</li>
                  <li>• Mass acts as resistance to acceleration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Examples3DTab: React.FC<{ conceptName: string; subject: string; }> = ({ conceptName, subject }) => {
  const examples = [
    { 
      title: 'Basic Example', 
      description: `Simple ${conceptName} demonstration`,
      scenario: 'A ball rolling down a ramp',
      explanation: 'Shows how gravity provides force causing acceleration down the slope'
    },
    { 
      title: 'Complex Example', 
      description: `Advanced ${conceptName} scenario`,
      scenario: 'Car turning a corner',
      explanation: 'Demonstrates centripetal force and how it creates acceleration toward the center'
    },
    { 
      title: 'Real-world Application', 
      description: `${conceptName} in practical use`,
      scenario: 'Rocket launch',
      explanation: 'Shows how thrust force overcomes gravity to accelerate the rocket upward'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">3D Examples - {subject}</h3>
          <Button
            onClick={() => {
              const explanation = `These 3D examples demonstrate ${conceptName} in various real-world scenarios. Each example shows how forces create acceleration in different situations, from simple rolling balls to complex rocket launches. The interactive models help you understand how Newton's Second Law applies universally.`;
              if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(explanation);
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
              }
            }}
            variant="outline"
            size="sm"
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Explain Examples
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="w-full h-32 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                <Box className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                {/* Animation indicators */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
              <h4 className="font-semibold mb-2">{example.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{example.description}</p>
              <div className="text-xs bg-blue-50 dark:bg-blue-900/30 p-2 rounded">
                <div className="font-medium text-blue-700 dark:text-blue-300">{example.scenario}</div>
                <div className="text-blue-600 dark:text-blue-400 mt-1">{example.explanation}</div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(`${example.scenario}: ${example.explanation}`);
                    utterance.rate = 0.9;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Explain This Example
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VirtualLabTab: React.FC<{ conceptName: string; subject: string; }> = ({ conceptName, subject }) => {
  const [experimentRunning, setExperimentRunning] = useState(false);
  const [labResults, setLabResults] = useState<string[]>([]);
  const [selectedExperiment, setSelectedExperiment] = useState('force-measurement');

  const experiments = {
    'force-measurement': {
      name: 'Force Measurement',
      description: 'Measure forces and observe resulting acceleration',
      duration: 3000
    },
    'mass-variation': {
      name: 'Mass Variation Study',
      description: 'Study how changing mass affects acceleration',
      duration: 4000
    },
    'friction-analysis': {
      name: 'Friction Force Analysis',
      description: 'Analyze the effect of friction on motion',
      duration: 5000
    }
  };

  const startExperiment = () => {
    const experiment = experiments[selectedExperiment as keyof typeof experiments];
    setExperimentRunning(true);
    
    const explanation = `Starting ${experiment.name} experiment. This will demonstrate ${conceptName} by ${experiment.description.toLowerCase()}. Please observe the measurements and data collection process.`;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(explanation);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    
    // Simulate experiment running
    setTimeout(() => {
      const force = Math.random() * 20 + 10;
      const mass = Math.random() * 5 + 2;
      const acceleration = force / mass;
      
      const newResult = `${experiment.name}: Force=${force.toFixed(1)}N, Mass=${mass.toFixed(1)}kg, Acceleration=${acceleration.toFixed(2)}m/s² at ${new Date().toLocaleTimeString()}`;
      setLabResults(prev => [...prev, newResult]);
      setExperimentRunning(false);
      
      // Audio explanation for lab results
      const resultExplanation = `Experiment completed. With a force of ${force.toFixed(1)} Newtons applied to a mass of ${mass.toFixed(1)} kilograms, the resulting acceleration was ${acceleration.toFixed(2)} meters per second squared. This confirms Newton's Second Law where F equals m times a.`;
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(resultExplanation);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    }, experiment.duration);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Virtual {subject} Lab</h3>
          <div className="flex gap-2">
            <Badge variant="outline">{conceptName}</Badge>
            <Button
              onClick={() => {
                const explanation = `Welcome to the virtual ${subject} laboratory for studying ${conceptName}. Here you can conduct controlled experiments to verify Newton's Second Law. Select different experiments to measure forces, vary masses, and observe how these changes affect acceleration.`;
                if ('speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  const utterance = new SpeechSynthesisUtterance(explanation);
                  utterance.rate = 0.9;
                  window.speechSynthesis.speak(utterance);
                }
              }}
              variant="outline"
              size="sm"
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Lab Introduction
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lab Equipment & Controls */}
          <div className="space-y-4">
            <h4 className="font-semibold">Experiment Selection</h4>
            <div className="space-y-2">
              {Object.entries(experiments).map(([key, experiment]) => (
                <div 
                  key={key}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedExperiment === key 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setSelectedExperiment(key)}
                >
                  <div className="font-medium">{experiment.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{experiment.description}</div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 pt-4">
              <h4 className="font-semibold">Lab Equipment</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Force Sensor', 'Mass Scale', 'Motion Detector', 'Data Logger', 'Timer', 'Calculator'].map((tool, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center border">
                    <FlaskConical className="h-6 w-6 mx-auto mb-1 text-orange-600" />
                    <p className="text-xs font-medium">{tool}</p>
                  </div>
                ))}
              </div>
              
              <Button
                onClick={startExperiment}
                disabled={experimentRunning}
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
                    Start {experiments[selectedExperiment as keyof typeof experiments].name}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Results & Data */}
          <div className="space-y-4">
            <h4 className="font-semibold">Experiment Results</h4>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border min-h-[300px]">
              {labResults.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <FlaskConical className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No experiments run yet</p>
                  <p className="text-sm">Select an experiment and click start to begin</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Data Log</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const explanation = `The experimental data shows various measurements confirming Newton's Second Law. Each entry demonstrates how force divided by mass equals acceleration, validating the relationship F equals m times a across different conditions.`;
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          const utterance = new SpeechSynthesisUtterance(explanation);
                          utterance.rate = 0.9;
                          window.speechSynthesis.speak(utterance);
                        }
                      }}
                    >
                      <Volume2 className="h-4 w-4 mr-1" />
                      Explain Results
                    </Button>
                  </div>
                  {labResults.map((result, index) => (
                    <div key={index} className="text-sm p-3 bg-gray-50 dark:bg-gray-700 rounded border-l-4 border-l-blue-500">
                      <div className="font-mono">{result}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {labResults.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">Lab Conclusion</h5>
                <p className="text-sm text-green-600 dark:text-green-400">
                  All experimental data confirms Newton's Second Law: F = ma. 
                  The relationship between force, mass, and acceleration remains consistent across all trials.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visual3DContent;
