
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, Play, Pause, Volume2, VolumeX, RotateCcw, ZoomIn, ZoomOut,
  BarChart3, PieChart, LineChart, TrendingUp, Activity, Brain,
  Lightbulb, MessageSquare, Mic, MicOff, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveVisualizationsTabProps {
  conceptName: string;
}

const InteractiveVisualizationsTab: React.FC<InteractiveVisualizationsTabProps> = ({ conceptName }) => {
  const [activeVisual, setActiveVisual] = useState('graphs');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAIListening, setIsAIListening] = useState(false);
  const [completedVisuals, setCompletedVisuals] = useState<string[]>([]);

  const visualizations = {
    graphs: {
      title: 'Interactive Graphs',
      description: `Dynamic graph visualization for ${conceptName}`,
      audioExplanation: `These interactive graphs show the relationship between different variables in ${conceptName}. You can hover over data points to see detailed information.`,
      components: [
        { name: 'Bar Chart', description: 'Comparative data visualization', completed: false },
        { name: 'Line Graph', description: 'Trend analysis over time', completed: false },
        { name: 'Scatter Plot', description: 'Correlation visualization', completed: false }
      ]
    },
    diagrams: {
      title: 'Interactive Diagrams',
      description: `Detailed diagrams explaining ${conceptName}`,
      audioExplanation: `These interactive diagrams break down the complex concepts of ${conceptName} into digestible visual components.`,
      components: [
        { name: 'Process Flow', description: 'Step-by-step process visualization', completed: false },
        { name: 'System Overview', description: 'Complete system diagram', completed: false },
        { name: 'Component Analysis', description: 'Individual component breakdown', completed: false }
      ]
    },
    animations: {
      title: 'Dynamic Animations',
      description: `Animated sequences for ${conceptName}`,
      audioExplanation: `These animations demonstrate the dynamic aspects of ${conceptName}, showing how different elements interact over time.`,
      components: [
        { name: 'Motion Graphics', description: 'Animated motion sequences', completed: false },
        { name: 'Transformation', description: 'State change animations', completed: false },
        { name: 'Interactive Timeline', description: 'Time-based progression', completed: false }
      ]
    },
    simulations: {
      title: 'Live Simulations',
      description: `Real-time simulations of ${conceptName}`,
      audioExplanation: `These live simulations allow you to experiment with different parameters and see real-time results for ${conceptName}.`,
      components: [
        { name: 'Parameter Control', description: 'Adjustable simulation parameters', completed: false },
        { name: 'Real-time Results', description: 'Live calculation display', completed: false },
        { name: 'Scenario Testing', description: 'Multiple scenario comparison', completed: false }
      ]
    }
  };

  const playAudioExplanation = (text: string) => {
    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleAIAssistant = () => {
    setIsAIListening(!isAIListening);
    if (!isAIListening) {
      // Simulate AI listening
      setTimeout(() => {
        setIsAIListening(false);
        playAudioExplanation(`I'm here to help you understand ${conceptName}. What specific aspect would you like me to explain?`);
      }, 3000);
    }
  };

  const markVisualComplete = (visualType: string, componentName: string) => {
    const key = `${visualType}-${componentName}`;
    if (!completedVisuals.includes(key)) {
      setCompletedVisuals([...completedVisuals, key]);
      setProgress(prev => Math.min(100, prev + 8.33)); // 12 components total
    }
  };

  const currentVisual = visualizations[activeVisual as keyof typeof visualizations];

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                Interactive Visualizations
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Explore {conceptName} through interactive visual elements
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                {completedVisuals.length}/12 Complete
              </Badge>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{Math.round(progress)}%</div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2 mt-4" />
        </CardHeader>
      </Card>

      {/* Audio Controls and AI Assistant */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Audio Controls</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => playAudioExplanation(currentVisual.audioExplanation)}
                  disabled={isPlaying}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Playing...' : 'Play Explanation'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">AI Tutor Assistant</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant={isAIListening ? "destructive" : "default"}
                  size="sm"
                  onClick={toggleAIAssistant}
                  className="flex items-center gap-2"
                >
                  {isAIListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  {isAIListening ? 'Listening...' : 'Ask AI'}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visualization Tabs */}
      <Tabs value={activeVisual} onValueChange={setActiveVisual} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="graphs" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Graphs
          </TabsTrigger>
          <TabsTrigger value="diagrams" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Diagrams
          </TabsTrigger>
          <TabsTrigger value="animations" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Animations
          </TabsTrigger>
          <TabsTrigger value="simulations" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Simulations
          </TabsTrigger>
        </TabsList>

        {Object.entries(visualizations).map(([key, visual]) => (
          <TabsContent key={key} value={key} className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{visual.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{visual.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => playAudioExplanation(visual.audioExplanation)}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Explain
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Visualization Area */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-8 rounded-lg min-h-[400px] flex items-center justify-center mb-6">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      {key === 'graphs' && <BarChart3 className="h-16 w-16 text-white" />}
                      {key === 'diagrams' && <PieChart className="h-16 w-16 text-white" />}
                      {key === 'animations' && <Activity className="h-16 w-16 text-white" />}
                      {key === 'simulations' && <TrendingUp className="h-16 w-16 text-white" />}
                    </div>
                    <h3 className="text-xl font-bold">{visual.title}</h3>
                    <p className="text-muted-foreground">Interactive {key} for {conceptName}</p>
                  </div>
                </div>

                {/* Interactive Components */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {visual.components.map((component, index) => {
                    const isCompleted = completedVisuals.includes(`${key}-${component.name}`);
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          isCompleted 
                            ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                            : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                        }`}
                        onClick={() => {
                          markVisualComplete(key, component.name);
                          playAudioExplanation(`${component.name}: ${component.description}`);
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{component.name}</h4>
                          {isCompleted && <Brain className="h-4 w-4 text-green-600" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{component.description}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            markVisualComplete(key, component.name);
                          }}
                        >
                          {isCompleted ? 'Completed' : 'Explore'}
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Help Section */}
      <Card className="border-dashed">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h3 className="font-medium">Quick Tips</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Click on any visual component to hear its explanation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Use the AI assistant for detailed concept clarification</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Complete all components to unlock advanced features</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Audio explanations adapt to your learning pace</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveVisualizationsTab;
