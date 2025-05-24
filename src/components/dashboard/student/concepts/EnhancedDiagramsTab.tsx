
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Brain, Volume2, VolumeX, Network, Lightbulb, GitBranch, Zap } from 'lucide-react';
import AITutorDialog from './AITutorDialog';

interface EnhancedDiagramsTabProps {
  conceptName: string;
  subject: string;
}

interface AudioState {
  isPlaying: boolean;
  progress: number;
  audioEnabled: boolean;
  currentSegment: string;
}

const EnhancedDiagramsTab: React.FC<EnhancedDiagramsTabProps> = ({ conceptName, subject }) => {
  const [activeTab, setActiveTab] = useState('diagrams');
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    progress: 0,
    audioEnabled: true,
    currentSegment: ''
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

  const handlePlayPause = (diagramType: string) => {
    setAudioState(prev => {
      const newIsPlaying = !prev.isPlaying;
      
      if (newIsPlaying) {
        intervalRef.current = setInterval(() => {
          setAudioState(current => ({
            ...current,
            progress: current.progress >= 100 ? 0 : current.progress + 2
          }));
        }, 100);
        
        if (prev.audioEnabled) {
          console.log(`Playing audio explanation for ${conceptName} ${diagramType}`);
          setAudioState(current => ({ 
            ...current, 
            currentSegment: `Explaining ${diagramType} for ${conceptName}...`
          }));
        }
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setAudioState(current => ({ ...current, currentSegment: '' }));
      }
      
      return { ...prev, isPlaying: newIsPlaying };
    });
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setAudioState(prev => ({
      ...prev,
      isPlaying: false,
      progress: 0,
      currentSegment: ''
    }));
  };

  const toggleAudio = () => {
    setAudioState(prev => ({
      ...prev,
      audioEnabled: !prev.audioEnabled,
      currentSegment: !prev.audioEnabled ? '' : prev.currentSegment
    }));
  };

  const openAITutor = (context: string) => {
    setTutorContext(context);
    setShowAITutor(true);
  };

  const renderDiagramSection = (
    title: string,
    description: string,
    icon: React.ReactNode,
    content: string,
    diagramType: string
  ) => (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAudio}
              className="flex items-center gap-2"
            >
              {audioState.audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              Audio
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openAITutor(`${title} for ${conceptName}: ${description}`)}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              Ask AI Tutor
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Diagram Visualization Area */}
        <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 border-dashed border-blue-200 dark:border-gray-600 flex items-center justify-center relative overflow-hidden">
          <div className="text-center p-6">
            <div className="w-40 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center relative">
              <div 
                className="w-32 h-24 bg-white rounded-md flex items-center justify-center transform transition-all duration-300"
                style={{ 
                  transform: `scale(${0.9 + (audioState.progress / 1000)})`,
                  opacity: 0.9 + (audioState.progress / 1000)
                }}
              >
                {icon}
              </div>
              {audioState.isPlaying && (
                <div className="absolute inset-0 border-4 border-yellow-400 rounded-lg animate-pulse" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{content}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {conceptName} - {subject}
            </p>
            {audioState.isPlaying && audioState.currentSegment && (
              <div className="mt-2">
                <Badge variant="secondary" className="animate-pulse">
                  🔊 {audioState.currentSegment}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Audio Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Button 
              onClick={() => handlePlayPause(diagramType)} 
              variant="outline"
              className="flex items-center gap-2"
            >
              {audioState.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {audioState.isPlaying ? 'Pause' : 'Play'} Explanation
            </Button>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          {audioState.isPlaying && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Audio Progress</span>
                <span>{Math.round(audioState.progress)}%</span>
              </div>
              <Progress value={audioState.progress} className="w-full" />
            </div>
          )}
        </div>

        {/* Interactive Elements */}
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium">Interactive Features</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">Zoom In</Button>
            <Button variant="outline" size="sm">Zoom Out</Button>
            <Button variant="outline" size="sm">Highlight Key Parts</Button>
            <Button variant="outline" size="sm">Show Annotations</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Interactive Diagrams</h2>
          <p className="text-muted-foreground">
            Visual diagrams for {conceptName} with audio explanations and AI guidance
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {subject}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="comparisons">Comparisons</TabsTrigger>
          <TabsTrigger value="lab">Interactive Lab</TabsTrigger>
        </TabsList>

        <TabsContent value="diagrams" className="mt-6">
          {renderDiagramSection(
            'Core Diagrams',
            'Visual representations and schematic diagrams',
            <Network className="h-6 w-6 text-blue-600" />,
            'Interactive concept diagrams with detailed annotations',
            'core-diagrams'
          )}
        </TabsContent>

        <TabsContent value="relationships" className="mt-6">
          {renderDiagramSection(
            'Relationship Graphs',
            'Network visualizations showing concept connections',
            <GitBranch className="h-6 w-6 text-green-600" />,
            'Network graphs showing how concepts relate to each other',
            'relationships'
          )}
        </TabsContent>

        <TabsContent value="applications" className="mt-6">
          {renderDiagramSection(
            'Real-World Applications',
            'Practical examples and use cases',
            <Lightbulb className="h-6 w-6 text-yellow-600" />,
            'Real-world examples and practical applications',
            'applications'
          )}
        </TabsContent>

        <TabsContent value="comparisons" className="mt-6">
          {renderDiagramSection(
            'Comparison Tools',
            'Side-by-side analysis and comparisons',
            <GitBranch className="h-6 w-6 text-purple-600" />,
            'Comparative analysis tools and side-by-side comparisons',
            'comparisons'
          )}
        </TabsContent>

        <TabsContent value="lab" className="mt-6">
          {renderDiagramSection(
            'Interactive Laboratory',
            'Hands-on experiments and simulations',
            <Zap className="h-6 w-6 text-red-600" />,
            'Interactive laboratory with functional experiments',
            'interactive-lab'
          )}
        </TabsContent>
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

export default EnhancedDiagramsTab;
