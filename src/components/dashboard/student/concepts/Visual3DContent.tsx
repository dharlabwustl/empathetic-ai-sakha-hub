
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
          content: `This is a live simulation of ${conceptName} for ${activeSubject}. You can interact with the parameters to see real-time changes in the system behavior.`,
          component: <LiveSimulationTab conceptName={conceptName} subject={activeSubject} />
        };
      case 'analysis':
        return {
          title: 'Force Analysis',
          content: `Detailed force analysis for ${conceptName}. This shows how different forces interact and affect the system in ${activeSubject}.`,
          component: <ForceAnalysisTab conceptName={conceptName} subject={activeSubject} />
        };
      case 'examples':
        return {
          title: '3D Examples',
          content: `Interactive 3D examples demonstrating ${conceptName} concepts in ${activeSubject}. Click on different elements to explore.`,
          component: <Examples3DTab conceptName={conceptName} subject={activeSubject} />
        };
      case 'lab':
        return {
          title: 'Virtual Lab',
          content: `Welcome to the virtual laboratory for ${conceptName}. Conduct experiments and observe results in a safe, controlled environment.`,
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

// Individual Tab Components
const LiveSimulationTab: React.FC<{ conceptName: string; subject: string }> = ({ conceptName, subject }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState([50]);

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 p-6 rounded-lg min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center ${isRunning ? 'animate-spin' : ''}`}>
            <Atom className="h-16 w-16 text-white" />
          </div>
          <h3 className="text-xl font-bold">Live {subject} Simulation</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive simulation of {conceptName} running in real-time
          </p>
        </div>
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
        </div>
        <Button
          onClick={() => {
            setIsRunning(!isRunning);
            const explanation = isRunning ? 
              `Simulation paused. You can adjust the speed and restart when ready.` :
              `Simulation started. Watch how the ${conceptName} principles affect the model in real-time.`;
            playAudioExplanation(explanation);
          }}
          variant={isRunning ? "destructive" : "default"}
          className="flex items-center gap-2"
        >
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isRunning ? 'Stop' : 'Start'} Simulation
        </Button>
      </div>
    </div>
  );
};

const ForceAnalysisTab: React.FC<{ conceptName: string; subject: string }> = ({ conceptName, subject }) => {
  const playForceExplanation = () => {
    const explanation = `In this force analysis for ${conceptName}, we can see how the applied forces interact. 
    Force A exerts 25 Newtons while Force B exerts 15 Newtons. 
    The resultant force is 40 Newtons at an angle of 45 degrees. 
    As a result, the system is not in equilibrium and experiences an acceleration of 8 meters per second squared.`;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(explanation);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold">Force Analysis - {subject}</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={playForceExplanation}
            className="flex items-center gap-2"
          >
            <Volume2 className="h-4 w-4" />
            Explain
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Applied Forces</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Force A:</span>
                <span className="font-mono">25 N</span>
              </div>
              <div className="flex justify-between">
                <span>Force B:</span>
                <span className="font-mono">15 N</span>
              </div>
              <div className="flex justify-between">
                <span>Net Force:</span>
                <span className="font-mono font-bold">40 N</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Analysis Results</h4>
            <div className="space-y-2 text-sm">
              <p>• Resultant force direction: 45°</p>
              <p>• System equilibrium: No</p>
              <p>• Acceleration: 8 m/s²</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Examples3DTab: React.FC<{ conceptName: string; subject: string }> = ({ conceptName, subject }) => {
  const examples = [
    { title: 'Basic Example', description: `Simple ${conceptName} demonstration` },
    { title: 'Complex Example', description: `Advanced ${conceptName} scenario` },
    { title: 'Real-world Application', description: `${conceptName} in practical use` }
  ];

  const playExampleExplanation = (exampleIndex: number) => {
    const explanations = [
      `This basic example shows the fundamental principles of ${conceptName} in a simple scenario. It demonstrates the key concepts without complex interactions.`,
      `This complex example introduces multiple variables and interactions to demonstrate advanced ${conceptName} principles. Notice how the system behavior changes with different inputs.`,
      `This real-world application shows how ${conceptName} is used in practical situations. These principles apply to many systems we encounter in everyday life and industry.`
    ];
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(explanations[exampleIndex]);
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
              className="bg-white dark:bg-gray-800 p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => playExampleExplanation(index)}
            >
              <div className="w-full h-32 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-lg mb-3 flex items-center justify-center">
                <Box className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold">{example.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{example.description}</p>
              <Button 
                variant="outline"
                size="sm"
                className="mt-2 w-full flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  playExampleExplanation(index);
                }}
              >
                <Volume2 className="h-3 w-3" />
                Audio Explanation
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VirtualLabTab: React.FC<{ conceptName: string; subject: string }> = ({ conceptName, subject }) => {
  const [experimentRunning, setExperimentRunning] = useState(false);
  const [labResults, setLabResults] = useState<string[]>([]);

  const startExperiment = () => {
    setExperimentRunning(true);
    const newResult = `Experiment ${labResults.length + 1}: ${conceptName} test completed at ${new Date().toLocaleTimeString()}`;
    
    // Simulate experiment running
    setTimeout(() => {
      setLabResults(prev => [...prev, newResult]);
      setExperimentRunning(false);
      
      // Audio explanation for lab results
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Experiment completed. Results show the behavior of ${conceptName} in the virtual ${subject} laboratory.`);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    }, 3000);
  };

  const playLabIntroduction = () => {
    const labIntro = `Welcome to the virtual ${subject} laboratory. Here you can run experiments related to ${conceptName} in a safe, controlled environment. Use the available tools to set up your experiment, then click Start Experiment to see the results.`;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(labIntro);
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
              variant="outline"
              size="sm"
              onClick={playLabIntroduction}
              className="flex items-center gap-2"
            >
              <Volume2 className="h-4 w-4" />
              Lab Introduction
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lab Equipment */}
          <div className="space-y-4">
            <h4 className="font-semibold">Lab Equipment</h4>
            <div className="grid grid-cols-2 gap-2">
              {['Measuring Tools', 'Sensors', 'Controls', 'Data Logger'].map((tool, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                  <FlaskConical className="h-6 w-6 mx-auto mb-1 text-orange-600" />
                  <p className="text-xs">{tool}</p>
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
                    <div key={index} className="text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for audio explanations
const playAudioExplanation = (content: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.9;
    utterance.volume = 0.8;
    window.speechSynthesis.speak(utterance);
  }
};

export default Visual3DContent;
