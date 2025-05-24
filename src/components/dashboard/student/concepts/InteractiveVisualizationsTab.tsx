
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Pause, Volume2, VolumeX, Eye, Zap, RotateCcw,
  CheckCircle, MessageSquare, Settings, Download, Share2,
  BarChart3, PieChart, LineChart, TrendingUp, Activity
} from 'lucide-react';
import AIAssistantChat from './AIAssistantChat';

interface InteractiveVisualizationsTabProps {
  conceptName: string;
}

interface Visualization {
  id: string;
  title: string;
  type: 'graph' | 'simulation' | 'diagram' | 'animation' | 'interactive';
  description: string;
  duration: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

const InteractiveVisualizationsTab: React.FC<InteractiveVisualizationsTabProps> = ({ conceptName }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentVisualization, setCurrentVisualization] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState([1]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [completedVisualizations, setCompletedVisualizations] = useState<Set<number>>(new Set());
  const [interactionCount, setInteractionCount] = useState(0);

  const visualizations: Visualization[] = [
    {
      id: '1',
      title: 'Force Vector Diagram',
      type: 'diagram',
      description: `Interactive visualization showing how forces act on objects in ${conceptName}`,
      duration: 120,
      completed: false,
      difficulty: 'easy'
    },
    {
      id: '2',
      title: 'Motion Simulation',
      type: 'simulation', 
      description: `Real-time simulation demonstrating the principles of ${conceptName}`,
      duration: 180,
      completed: false,
      difficulty: 'medium'
    },
    {
      id: '3',
      title: 'Interactive Graph Analysis',
      type: 'graph',
      description: `Dynamic graphs showing relationships in ${conceptName}`,
      duration: 150,
      completed: false,
      difficulty: 'medium'
    },
    {
      id: '4',
      title: 'Animated Explanation',
      type: 'animation',
      description: `Step-by-step animated breakdown of ${conceptName}`,
      duration: 200,
      completed: false,
      difficulty: 'easy'
    },
    {
      id: '5',
      title: 'Interactive Problem Solver',
      type: 'interactive',
      description: `Hands-on problem solving with ${conceptName}`,
      duration: 240,
      completed: false,
      difficulty: 'hard'
    }
  ];

  // Progress tracking
  useEffect(() => {
    const totalVisualizations = visualizations.length;
    const completed = completedVisualizations.size;
    const overallProgress = (completed / totalVisualizations) * 100;
    setProgress(overallProgress);
  }, [completedVisualizations, visualizations.length]);

  const handleVisualizationInteraction = () => {
    setInteractionCount(prev => prev + 1);
    
    // Audio feedback for interaction
    if (!isMuted) {
      const feedbackText = `Great! You've interacted with the ${visualizations[currentVisualization]?.title}. This helps reinforce your understanding of ${conceptName}.`;
      const utterance = new SpeechSynthesisUtterance(feedbackText);
      utterance.rate = speed[0];
      utterance.volume = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playAudioExplanation = (visualization: Visualization) => {
    if (!isMuted) {
      const explanationText = `${visualization.description}. Click on the interactive elements to explore how ${conceptName} works in this scenario.`;
      const utterance = new SpeechSynthesisUtterance(explanationText);
      utterance.rate = speed[0];
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const markVisualizationCompleted = (index: number) => {
    setCompletedVisualizations(prev => new Set([...prev, index]));
  };

  const getVisualizationIcon = (type: string) => {
    switch (type) {
      case 'graph': return <BarChart3 className="h-5 w-5 text-blue-500" />;
      case 'simulation': return <Activity className="h-5 w-5 text-green-500" />;
      case 'diagram': return <PieChart className="h-5 w-5 text-purple-500" />;
      case 'animation': return <Zap className="h-5 w-5 text-yellow-500" />;
      case 'interactive': return <TrendingUp className="h-5 w-5 text-red-500" />;
      default: return <Eye className="h-5 w-5" />;
    }
  };

  const completionPercentage = (completedVisualizations.size / visualizations.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900 p-6 rounded-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">
            Interactive Visualizations: {conceptName}
          </h2>
          <Badge variant="outline" className="bg-white/50">
            {Math.round(completionPercentage)}% Complete
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{completedVisualizations.size}</div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{interactionCount}</div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Interactions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {visualizations.reduce((total, viz) => total + viz.duration, 0)}s
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Total Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">92%</div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Engagement</div>
          </div>
        </div>
        
        <Progress value={completionPercentage} className="h-3" />
      </motion.div>

      {/* Visualization Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="graphs">Graphs</TabsTrigger>
          <TabsTrigger value="simulations">Simulations</TabsTrigger>
          <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-indigo-600" />
                All Visualizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visualizations.map((viz, index) => (
                  <motion.div
                    key={viz.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer"
                    onClick={() => setCurrentVisualization(index)}
                  >
                    <Card className={`transition-all ${
                      currentVisualization === index ? 'ring-2 ring-purple-500' : ''
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          {getVisualizationIcon(viz.type)}
                          {completedVisualizations.has(index) && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <h3 className="font-medium mb-2">{viz.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {viz.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {viz.difficulty}
                          </Badge>
                          <span className="text-xs text-gray-500">{viz.duration}s</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Individual visualization type tabs */}
        {['graphs', 'simulations', 'diagrams', 'interactive'].map((tabType) => (
          <TabsContent key={tabType} value={tabType}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 capitalize">
                    {getVisualizationIcon(tabType.slice(0, -1))}
                    {tabType} for {conceptName}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => playAudioExplanation(visualizations[currentVisualization])}
                      disabled={isPlaying}
                    >
                      <Volume2 className="h-4 w-4 mr-1" />
                      {isPlaying ? 'Playing...' : 'Audio Explanation'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAIAssistant(true)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Ask AI Tutor
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg min-h-[400px] flex items-center justify-center">
                  <motion.div
                    className="text-center space-y-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleVisualizationInteraction}
                    >
                      {getVisualizationIcon(tabType.slice(0, -1))}
                    </motion.div>
                    <h3 className="text-xl font-bold">Interactive {tabType}</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md">
                      Click on the visualization above to interact with {conceptName} concepts.
                      Each interaction provides immediate feedback and deeper understanding.
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleVisualizationInteraction}
                      >
                        Interact Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markVisualizationCompleted(currentVisualization)}
                      >
                        Mark Complete
                      </Button>
                    </div>
                  </motion.div>
                </div>

                {/* Audio Controls */}
                <div className="mt-4 bg-white dark:bg-gray-900 p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant={isPlaying ? "destructive" : "default"}
                        size="sm"
                        onClick={() => playAudioExplanation(visualizations[currentVisualization])}
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

                      <div className="flex items-center gap-2">
                        <span className="text-sm">Speed:</span>
                        <div className="w-20">
                          <Slider
                            value={speed}
                            onValueChange={setSpeed}
                            min={0.5}
                            max={2}
                            step={0.1}
                            className="w-full"
                          />
                        </div>
                        <span className="text-sm font-mono">{speed[0]}x</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* AI Assistant */}
      <AIAssistantChat
        conceptName={conceptName}
        context={`Interactive visualizations for ${conceptName}`}
        isVisible={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
      />
    </div>
  );
};

export default InteractiveVisualizationsTab;
