
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Zap, Brain, MessageSquare, Volume2, VolumeX } from 'lucide-react';
import AITutorDialog from './AITutorDialog';

interface Enhanced3DTabProps {
  conceptName: string;
  subject: string;
}

interface SimulationState {
  isPlaying: boolean;
  progress: number;
  speed: number;
  audioEnabled: boolean;
  audioPlaying: boolean;
}

const Enhanced3DTab: React.FC<Enhanced3DTabProps> = ({ conceptName, subject }) => {
  const [activeVisualization, setActiveVisualization] = useState('3d-model');
  const [simulationState, setSimulationState] = useState<SimulationState>({
    isPlaying: false,
    progress: 0,
    speed: 1,
    audioEnabled: true,
    audioPlaying: false
  });
  const [showAITutor, setShowAITutor] = useState(false);
  const [tutorContext, setTutorContext] = useState('');
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handlePlayPause = () => {
    setSimulationState(prev => {
      const newIsPlaying = !prev.isPlaying;
      
      if (newIsPlaying) {
        // Start simulation and audio
        intervalRef.current = setInterval(() => {
          setSimulationState(current => ({
            ...current,
            progress: current.progress >= 100 ? 0 : current.progress + (2 * current.speed)
          }));
        }, 100);
        
        // Simulate audio playback
        if (prev.audioEnabled) {
          setSimulationState(current => ({ ...current, audioPlaying: true }));
          // Simulate audio explanation
          console.log(`Playing audio explanation for ${conceptName} 3D visualization`);
        }
      } else {
        // Stop simulation and audio
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setSimulationState(current => ({ ...current, audioPlaying: false }));
      }
      
      return { ...prev, isPlaying: newIsPlaying };
    });
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setSimulationState(prev => ({
      ...prev,
      isPlaying: false,
      progress: 0,
      audioPlaying: false
    }));
  };

  const handleSpeedChange = (value: number[]) => {
    setSimulationState(prev => ({
      ...prev,
      speed: value[0]
    }));
  };

  const toggleAudio = () => {
    setSimulationState(prev => {
      const newAudioEnabled = !prev.audioEnabled;
      if (!newAudioEnabled && prev.audioPlaying) {
        return { ...prev, audioEnabled: newAudioEnabled, audioPlaying: false };
      }
      return { ...prev, audioEnabled: newAudioEnabled };
    });
  };

  const openAITutor = (context: string) => {
    setTutorContext(context);
    setShowAITutor(true);
  };

  const get3DVisualizations = () => {
    const baseVisualizations = [
      {
        id: '3d-model',
        title: '3D Interactive Model',
        description: 'Explore the concept in three dimensions with interactive controls',
        content: 'Interactive 3D model visualization'
      },
      {
        id: 'simulation',
        title: 'Live Simulation',
        description: 'Real-time simulation showing concept behavior and dynamics',
        content: 'Dynamic simulation with parameter controls'
      },
      {
        id: 'virtual-lab',
        title: 'Virtual Laboratory',
        description: 'Conduct virtual experiments and observe results',
        content: 'Hands-on virtual laboratory experience'
      },
      {
        id: 'molecular-view',
        title: 'Molecular/Structural View',
        description: 'Detailed view of molecular or structural components',
        content: 'Detailed molecular structure visualization'
      },
      {
        id: 'process-flow',
        title: 'Process Flow 3D',
        description: 'Step-by-step 3D process visualization',
        content: '3D process flow and sequence visualization'
      }
    ];

    // Customize visualizations based on subject
    switch (subject.toLowerCase()) {
      case 'physics':
        return baseVisualizations.map(viz => {
          if (viz.id === 'molecular-view') {
            return { ...viz, title: 'Force Field View', description: 'Visualize force fields and interactions' };
          }
          return viz;
        });
      case 'chemistry':
        return baseVisualizations.map(viz => {
          if (viz.id === 'molecular-view') {
            return { ...viz, title: 'Molecular Structure', description: 'Explore molecular bonds and electron clouds' };
          }
          return viz;
        });
      case 'biology':
        return baseVisualizations.map(viz => {
          if (viz.id === 'molecular-view') {
            return { ...viz, title: 'Cellular Structure', description: 'Detailed cellular and organ system view' };
          }
          return viz;
        });
      default:
        return baseVisualizations;
    }
  };

  const renderVisualization = (viz: any) => (
    <Card key={viz.id} className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{viz.title}</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAudio}
              className="flex items-center gap-2"
            >
              {simulationState.audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              Audio
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openAITutor(`${viz.title} for ${conceptName}: ${viz.description}`)}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              Ask AI Tutor
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{viz.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 3D Visualization Area */}
        <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 border-dashed border-blue-200 dark:border-gray-600 flex items-center justify-center relative overflow-hidden">
          <div className="text-center p-6">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative">
              <div 
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center transform transition-transform duration-300"
                style={{ 
                  transform: `rotate(${simulationState.progress * 3.6}deg) scale(${0.8 + (simulationState.progress / 500)})`,
                  opacity: 0.9 + (simulationState.progress / 1000)
                }}
              >
                <Zap className="h-12 w-12 text-blue-600" />
              </div>
              {simulationState.isPlaying && (
                <div className="absolute inset-0 border-4 border-yellow-400 rounded-full animate-pulse" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{viz.content}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {conceptName} - {subject}
            </p>
            {simulationState.audioPlaying && (
              <div className="mt-2">
                <Badge variant="secondary" className="animate-pulse">
                  🔊 Audio Explanation Playing
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Button onClick={handlePlayPause} variant="outline">
              {simulationState.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {simulationState.isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(simulationState.progress)}%</span>
            </div>
            <Progress value={simulationState.progress} className="w-full" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Speed</span>
              <span>{simulationState.speed}x</span>
            </div>
            <Slider
              value={[simulationState.speed]}
              onValueChange={handleSpeedChange}
              max={3}
              min={0.5}
              step={0.5}
              className="w-full"
            />
          </div>
        </div>

        {/* Interactive Parameters */}
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium">Interactive Parameters</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Parameter A</label>
              <Slider defaultValue={[50]} max={100} step={1} className="mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Parameter B</label>
              <Slider defaultValue={[75]} max={100} step={1} className="mt-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">3D Analysis & Laboratory</h2>
          <p className="text-muted-foreground">
            Interactive 3D visualizations for {conceptName} with audio explanations
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {subject}
        </Badge>
      </div>

      <Tabs value={activeVisualization} onValueChange={setActiveVisualization}>
        <TabsList className="grid w-full grid-cols-5">
          {get3DVisualizations().map((viz) => (
            <TabsTrigger key={viz.id} value={viz.id} className="text-xs">
              {viz.title.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {get3DVisualizations().map((viz) => (
          <TabsContent key={viz.id} value={viz.id} className="mt-6">
            {renderVisualization(viz)}
          </TabsContent>
        ))}
      </Tabs>

      <AITutorDialog
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        conceptName={conceptName}
        context={tutorContext}
        subject={subject}
      />
    </div>
  );
};

export default Enhanced3DTab;
