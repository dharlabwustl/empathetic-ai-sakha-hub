
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Box, Play, Pause, RotateCcw, ZoomIn, ZoomOut, 
  Move3D, Settings, Download, Share2, Volume2,
  Atom, FlaskConical, Target, Activity, MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import AITutorDialog from './AITutorDialog';

interface Enhanced3DTabProps {
  conceptName: string;
  subject: string;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ conceptName, subject }) => {
  const [activeTab, setActiveTab] = useState('simulation');
  const [selectedModel, setSelectedModel] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState([50]);
  const [forceValue, setForceValue] = useState([20]);
  const [massValue, setMassValue] = useState([5]);
  const [isAudioPlaying, setIsAudioPlaying] = useState<string | null>(null);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState('');

  const subjects = ['Physics', 'Chemistry', 'Biology'];
  const [activeSubject, setActiveSubject] = useState(subject || 'Physics');

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

  const playAudioExplanation = (tabName: string, content: string) => {
    if (isAudioPlaying === tabName) {
      window.speechSynthesis.cancel();
      setIsAudioPlaying(null);
    } else {
      window.speechSynthesis.cancel();
      setIsAudioPlaying(tabName);
      
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      utterance.onend = () => setIsAudioPlaying(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const openAITutor = (context: string) => {
    setTutorContext(context);
    setIsTutorOpen(true);
  };

  const getTabContent = (tabName: string) => {
    const currentModels = models[activeSubject as keyof typeof models] || models.Physics;
    
    switch (tabName) {
      case 'simulation':
        return {
          title: 'Live Simulation',
          content: `This is a live 3D simulation of ${conceptName} for ${activeSubject}. You can interact with the parameters to see real-time changes in the system behavior and explore the concept in three dimensions.`,
          component: <LiveSimulationTab conceptName={conceptName} subject={activeSubject} isAudioPlaying={isAudioPlaying} onPlayAudio={playAudioExplanation} onOpenTutor={openAITutor} />
        };
      case 'analysis':
        return {
          title: 'Analysis',
          content: `Detailed 3D analysis for ${conceptName}. This shows how different forces and parameters interact and affect the system in ${activeSubject} using interactive 3D models.`,
          component: <AnalysisTab conceptName={conceptName} subject={activeSubject} isAudioPlaying={isAudioPlaying} onPlayAudio={playAudioExplanation} onOpenTutor={openAITutor} />
        };
      case 'examples':
        return {
          title: '3D Examples',
          content: `Interactive 3D examples demonstrating ${conceptName} concepts in ${activeSubject}. Click and rotate different elements to explore various scenarios and applications.`,
          component: <Examples3DTab conceptName={conceptName} subject={activeSubject} isAudioPlaying={isAudioPlaying} onPlayAudio={playAudioExplanation} onOpenTutor={openAITutor} />
        };
      case 'lab':
        return {
          title: 'Virtual Laboratory',
          content: `Welcome to the 3D virtual laboratory for ${conceptName}. Conduct experiments, manipulate 3D objects, and observe results in a comprehensive three-dimensional environment.`,
          component: <VirtualLab3DTab conceptName={conceptName} subject={activeSubject} isAudioPlaying={isAudioPlaying} onPlayAudio={playAudioExplanation} onOpenTutor={openAITutor} />
        };
      default:
        return {
          title: 'Live Simulation',
          content: `This is a live 3D simulation of ${conceptName}.`,
          component: <LiveSimulationTab conceptName={conceptName} subject={activeSubject} isAudioPlaying={isAudioPlaying} onPlayAudio={playAudioExplanation} onOpenTutor={openAITutor} />
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
            3D Subject Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {subjects.map((subj) => (
              <Button
                key={subj}
                variant={activeSubject === subj ? "default" : "outline"}
                onClick={() => setActiveSubject(subj)}
                className="flex items-center gap-2"
              >
                {subj === 'Physics' && <Atom className="h-4 w-4" />}
                {subj === 'Chemistry' && <FlaskConical className="h-4 w-4" />}
                {subj === 'Biology' && <Target className="h-4 w-4" />}
                {subj}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3D Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="simulation">Live Simulation</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="examples">3D Examples</TabsTrigger>
          <TabsTrigger value="lab">Virtual Laboratory</TabsTrigger>
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
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playAudioExplanation(tabName, tabContent.content)}
                        className="flex items-center gap-2"
                      >
                        {isAudioPlaying === tabName ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                        {isAudioPlaying === tabName ? 'Pause' : 'Play'} Audio
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAITutor(`3D ${tabContent.title} for ${conceptName} in ${activeSubject}`)}
                        className="flex items-center gap-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Ask AI Tutor
                      </Button>
                    </div>
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

      <AITutorDialog
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        conceptName={conceptName}
        context={tutorContext}
        subject={activeSubject}
      />
    </div>
  );
};

// Individual Tab Components
const LiveSimulationTab: React.FC<{
  conceptName: string;
  subject: string;
  isAudioPlaying: string | null;
  onPlayAudio: (type: string, content: string) => void;
  onOpenTutor: (context: string) => void;
}> = ({ conceptName, subject, isAudioPlaying, onPlayAudio, onOpenTutor }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState([50]);

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 p-6 rounded-lg min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center ${isRunning ? 'animate-spin' : ''}`}>
            <Atom className="h-16 w-16 text-white" />
          </div>
          <h3 className="text-xl font-bold">Live {subject} 3D Simulation</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive 3D simulation of {conceptName} running in real-time
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
          onClick={() => setIsRunning(!isRunning)}
          variant={isRunning ? "destructive" : "default"}
          className="flex items-center gap-2"
        >
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isRunning ? 'Stop' : 'Start'} 3D Simulation
        </Button>
      </div>
    </div>
  );
};

const AnalysisTab: React.FC<{
  conceptName: string;
  subject: string;
  isAudioPlaying: string | null;
  onPlayAudio: (type: string, content: string) => void;
  onOpenTutor: (context: string) => void;
}> = ({ conceptName, subject, isAudioPlaying, onPlayAudio, onOpenTutor }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 p-6 rounded-lg min-h-[400px]">
        <h3 className="text-xl font-bold mb-4">3D Analysis - {subject}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">3D Parameters</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>X-Axis Force:</span>
                <span className="font-mono">25 N</span>
              </div>
              <div className="flex justify-between">
                <span>Y-Axis Force:</span>
                <span className="font-mono">15 N</span>
              </div>
              <div className="flex justify-between">
                <span>Z-Axis Force:</span>
                <span className="font-mono">10 N</span>
              </div>
              <div className="flex justify-between">
                <span>Resultant:</span>
                <span className="font-mono font-bold">32.4 N</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">3D Analysis Results</h4>
            <div className="space-y-2 text-sm">
              <p>• Resultant direction: θ = 45°, φ = 30°</p>
              <p>• System equilibrium: No</p>
              <p>• 3D acceleration: 8 m/s²</p>
              <p>• Spatial distribution: Uniform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Examples3DTab: React.FC<{
  conceptName: string;
  subject: string;
  isAudioPlaying: string | null;
  onPlayAudio: (type: string, content: string) => void;
  onOpenTutor: (context: string) => void;
}> = ({ conceptName, subject, isAudioPlaying, onPlayAudio, onOpenTutor }) => {
  const examples = [
    { title: 'Basic 3D Example', description: `Simple ${conceptName} demonstration in 3D space` },
    { title: 'Complex 3D Scenario', description: `Advanced ${conceptName} scenario with multiple dimensions` },
    { title: 'Real-world 3D Application', description: `${conceptName} in practical 3D environments` }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900 p-6 rounded-lg min-h-[400px]">
        <h3 className="text-xl font-bold mb-4">3D Examples - {subject}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-full h-32 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-lg mb-3 flex items-center justify-center">
                <Box className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold">{example.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{example.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VirtualLab3DTab: React.FC<{
  conceptName: string;
  subject: string;
  isAudioPlaying: string | null;
  onPlayAudio: (type: string, content: string) => void;
  onOpenTutor: (context: string) => void;
}> = ({ conceptName, subject, isAudioPlaying, onPlayAudio, onOpenTutor }) => {
  const [experimentRunning, setExperimentRunning] = useState(false);
  const [labResults, setLabResults] = useState<string[]>([]);

  const startExperiment = () => {
    setExperimentRunning(true);
    const newResult = `3D Experiment ${labResults.length + 1}: ${conceptName} test completed at ${new Date().toLocaleTimeString()}`;
    
    setTimeout(() => {
      setLabResults(prev => [...prev, newResult]);
      setExperimentRunning(false);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-900 p-6 rounded-lg min-h-[400px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Virtual Laboratory - 3D</h3>
          <Badge variant="outline">{conceptName}</Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold">3D Lab Equipment</h4>
            <div className="grid grid-cols-2 gap-2">
              {['3D Measuring Tools', '3D Sensors', '3D Controls', '3D Data Logger'].map((tool, index) => (
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
                  Running 3D Experiment...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start 3D Experiment
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">3D Experiment Results</h4>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg min-h-[200px]">
              {labResults.length === 0 ? (
                <p className="text-gray-500 text-center">No 3D experiments run yet</p>
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

export default Enhanced3DTab;
