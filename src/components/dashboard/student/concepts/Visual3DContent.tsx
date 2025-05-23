
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
          content: `This is a live simulation of ${conceptName} for ${activeSubject}. You can interact with the parameters to see real-time changes in the system behavior. Adjust the controls to explore different scenarios and observe how the variables affect the outcome.`,
          component: <LiveSimulationTab conceptName={conceptName} subject={activeSubject} />
        };
      case 'analysis':
        return {
          title: 'Force Analysis',
          content: `Detailed force analysis for ${conceptName}. This shows how different forces interact and affect the system in ${activeSubject}. The visualization breaks down complex force interactions into understandable components.`,
          component: <ForceAnalysisTab conceptName={conceptName} subject={activeSubject} />
        };
      case 'examples':
        return {
          title: '3D Examples',
          content: `Interactive 3D examples demonstrating ${conceptName} concepts in ${activeSubject}. Click on different elements to explore various aspects of the concept in a three-dimensional environment.`,
          component: <Examples3DTab conceptName={conceptName} subject={activeSubject} />
        };
      case 'lab':
        return {
          title: 'Virtual Lab',
          content: `Welcome to the virtual laboratory for ${conceptName}. Conduct experiments and observe results in a safe, controlled environment. This lab provides hands-on experience with the concept.`,
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

// Enhanced Individual Tab Components with Functional Models
const LiveSimulationTab: React.FC<{ conceptName: string; subject: string }> = ({ conceptName, subject }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [force, setForce] = useState([25]);
  const [mass, setMass] = useState([10]);

  const getSimulationExplanation = () => {
    return `This live ${subject} simulation demonstrates ${conceptName}. When you start the simulation, you can observe how changing the force value from ${force[0]} Newtons and mass from ${mass[0]} kilograms affects the acceleration. The acceleration equals force divided by mass, following Newton's second law.`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 p-6 rounded-lg min-h-[400px] flex flex-col">
        <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
          <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center ${isRunning ? 'animate-spin' : ''}`}>
            <Atom className="h-16 w-16 text-white" />
          </div>
          <h3 className="text-xl font-bold">Live {subject} Simulation</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive simulation of {conceptName} running in real-time
          </p>
          <div className="text-sm bg-white dark:bg-gray-800 p-3 rounded">
            <p><strong>Current Values:</strong></p>
            <p>Force: {force[0]} N | Mass: {mass[0]} kg | Acceleration: {(force[0] / mass[0]).toFixed(2)} m/s²</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Force (N): {force[0]}</label>
              <Slider
                value={force}
                onValueChange={setForce}
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mass (kg): {mass[0]}</label>
              <Slider
                value={mass}
                onValueChange={setMass}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Simulation Speed: {speed[0]}%</label>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              min={1}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <Button
              onClick={() => {
                if ('speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance(getSimulationExplanation());
                  utterance.rate = 0.9;
                  window.speechSynthesis.speak(utterance);
                }
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Volume2 className="h-4 w-4" />
              Explain Model
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
    </div>
  );
};

const ForceAnalysisTab: React.FC<{ conceptName: string; subject: string }> = ({ conceptName, subject }) => {
  const [selectedForce, setSelectedForce] = useState<number | null>(null);

  const forceData = [
    { name: 'Applied Force', value: 25, direction: '0°', color: 'blue' },
    { name: 'Friction Force', value: 15, direction: '180°', color: 'red' },
    { name: 'Normal Force', value: 50, direction: '90°', color: 'green' },
    { name: 'Weight', value: 50, direction: '270°', color: 'orange' }
  ];

  const getForceExplanation = (force: typeof forceData[0]) => {
    return `The ${force.name} has a magnitude of ${force.value} Newtons and acts in the ${force.direction} direction. This force ${force.name === 'Applied Force' ? 'propels the object forward' : force.name === 'Friction Force' ? 'opposes motion' : force.name === 'Normal Force' ? 'supports the object vertically' : 'pulls the object downward due to gravity'}.`;
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 p-6 rounded-lg min-h-[400px]">
        <h3 className="text-xl font-bold mb-4">Force Analysis - {subject}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Force Components</h4>
            {forceData.map((force, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedForce === index 
                    ? 'bg-white dark:bg-gray-800 shadow-lg border-2 border-blue-500' 
                    : 'bg-white dark:bg-gray-800 hover:shadow-md'
                }`}
                onClick={() => {
                  setSelectedForce(index);
                  if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(getForceExplanation(force));
                    utterance.rate = 0.9;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{force.name}</span>
                  <span className="font-mono">{force.value} N</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Direction: {force.direction}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Force Diagram</h4>
            <div className="h-64 flex items-center justify-center border rounded">
              <div className="relative w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded">
                {/* Visual representation of forces */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-green-500"></div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-orange-500"></div>
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 h-0.5 w-8 bg-blue-500"></div>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-0.5 w-8 bg-red-500"></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs">Object</div>
              </div>
            </div>
            <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">
              Click on force components to hear detailed explanations
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <Button
            onClick={() => {
              const explanation = `This force analysis diagram shows all forces acting on the object for ${conceptName}. The net force is calculated by adding all force vectors, considering both magnitude and direction. This determines the object's acceleration according to Newton's laws.`;
              if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(explanation);
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
              }
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Volume2 className="h-4 w-4" />
            Explain Complete Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

const Examples3DTab: React.FC<{ conceptName: string; subject: string }> = ({ conceptName, subject }) => {
  const [selectedExample, setSelectedExample] = useState<number | null>(null);

  const examples = [
    { 
      title: 'Basic Example', 
      description: `Simple ${conceptName} demonstration`,
      explanation: `This basic example shows the fundamental principles of ${conceptName}. It demonstrates the core concept in its simplest form, making it easy to understand the underlying physics.`
    },
    { 
      title: 'Complex Example', 
      description: `Advanced ${conceptName} scenario`,
      explanation: `This complex example involves multiple variables and forces acting simultaneously. It shows how ${conceptName} applies in more realistic, multi-component systems.`
    },
    { 
      title: 'Real-world Application', 
      description: `${conceptName} in practical use`,
      explanation: `This real-world application demonstrates how ${conceptName} is used in everyday situations, from engineering to natural phenomena, showing its practical importance.`
    }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900 p-6 rounded-lg min-h-[400px]">
        <h3 className="text-xl font-bold mb-4">3D Examples - {subject}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-gray-800 p-4 rounded-lg cursor-pointer transition-all ${
                selectedExample === index ? 'shadow-lg border-2 border-purple-500' : 'hover:shadow-lg'
              }`}
              onClick={() => {
                setSelectedExample(index);
                if ('speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance(example.explanation);
                  utterance.rate = 0.9;
                  window.speechSynthesis.speak(utterance);
                }
              }}
            >
              <div className="w-full h-32 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-lg mb-3 flex items-center justify-center">
                <Box className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold">{example.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{example.description}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(example.explanation);
                    utterance.rate = 0.9;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                <Volume2 className="h-3 w-3 mr-1" />
                Explain
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button
            onClick={() => {
              const explanation = `These 3D examples demonstrate different aspects of ${conceptName} in ${subject}. Each example builds upon the previous one, from basic principles to complex real-world applications, helping you understand the concept from multiple perspectives.`;
              if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(explanation);
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
              }
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Volume2 className="h-4 w-4" />
            Overview of All Examples
          </Button>
        </div>
      </div>
    </div>
  );
};

const VirtualLabTab: React.FC<{ conceptName: string; subject: string }> = ({ conceptName, subject }) => {
  const [experimentRunning, setExperimentRunning] = useState(false);
  const [labResults, setLabResults] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const labTools = [
    { name: 'Force Meter', description: 'Measures applied forces', icon: '⚖️' },
    { name: 'Accelerometer', description: 'Detects acceleration changes', icon: '📊' },
    { name: 'Timer', description: 'Records time intervals', icon: '⏱️' },
    { name: 'Scale', description: 'Measures mass', icon: '⚖️' }
  ];

  const startExperiment = () => {
    setExperimentRunning(true);
    const experimentSteps = [
      `Setting up ${subject} experiment for ${conceptName}...`,
      `Measuring initial conditions...`,
      `Applying test parameters...`,
      `Recording data points...`,
      `Analyzing results...`
    ];
    
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < experimentSteps.length) {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(experimentSteps[stepIndex]);
          utterance.rate = 0.9;
          window.speechSynthesis.speak(utterance);
        }
        stepIndex++;
      } else {
        clearInterval(interval);
        
        const newResult = `Experiment ${labResults.length + 1}: ${conceptName} test completed at ${new Date().toLocaleTimeString()}. Force applied: 25N, Mass: 5kg, Resulting acceleration: 5.0 m/s²`;
        setLabResults(prev => [...prev, newResult]);
        setExperimentRunning(false);
        
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(`Experiment completed successfully. Results show the behavior of ${conceptName} in the virtual ${subject} laboratory. The data confirms theoretical predictions.`);
          utterance.rate = 0.9;
          window.speechSynthesis.speak(utterance);
        }
      }
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Virtual {subject} Lab</h3>
          <Badge variant="outline">{conceptName}</Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lab Equipment */}
          <div className="space-y-4">
            <h4 className="font-semibold">Lab Equipment</h4>
            <div className="grid grid-cols-2 gap-2">
              {labTools.map((tool, index) => (
                <div 
                  key={index} 
                  className={`bg-white dark:bg-gray-800 p-3 rounded-lg text-center cursor-pointer transition-all ${
                    selectedTool === tool.name ? 'shadow-lg border-2 border-orange-500' : 'hover:shadow-md'
                  }`}
                  onClick={() => {
                    setSelectedTool(tool.name);
                    if ('speechSynthesis' in window) {
                      const utterance = new SpeechSynthesisUtterance(`${tool.name}: ${tool.description}. This tool is essential for measuring and analyzing ${conceptName} in laboratory conditions.`);
                      utterance.rate = 0.9;
                      window.speechSynthesis.speak(utterance);
                    }
                  }}
                >
                  <div className="text-2xl mb-1">{tool.icon}</div>
                  <p className="text-xs font-medium">{tool.name}</p>
                  <p className="text-xs text-gray-500">{tool.description}</p>
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
                  Start Experiment
                </>
              )}
            </Button>
            
            <Button
              onClick={() => {
                const explanation = `Welcome to the virtual ${subject} laboratory. Here you can safely conduct experiments related to ${conceptName}. Use the lab equipment to measure different variables and observe how they interact. This hands-on approach helps reinforce theoretical knowledge with practical experience.`;
                if ('speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance(explanation);
                  utterance.rate = 0.9;
                  window.speechSynthesis.speak(utterance);
                }
              }}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Volume2 className="h-4 w-4" />
              Lab Introduction
            </Button>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h4 className="font-semibold">Experiment Results</h4>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg min-h-[200px]">
              {labResults.length === 0 ? (
                <p className="text-gray-500 text-center">No experiments run yet</p>
              ) : (
                <div className="space-y-2">
                  {labResults.map((result, index) => (
                    <div 
                      key={index} 
                      className="text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => {
                        if ('speechSynthesis' in window) {
                          const utterance = new SpeechSynthesisUtterance(result);
                          utterance.rate = 0.9;
                          window.speechSynthesis.speak(utterance);
                        }
                      }}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {labResults.length > 0 && (
              <Button
                onClick={() => {
                  const explanation = `Analysis of experimental results: The data shows consistent behavior according to the principles of ${conceptName}. The measurements confirm theoretical predictions and demonstrate the practical applications of this concept in ${subject}.`;
                  if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(explanation);
                    utterance.rate = 0.9;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Volume2 className="h-4 w-4" />
                Analyze Results
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visual3DContent;
