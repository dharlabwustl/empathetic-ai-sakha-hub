
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Box, Atom, FlaskConical, Target, Mic, MicOff, Volume2, VolumeX,
  Play, Pause, Brain, MessageSquare, Lightbulb, Settings, RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Enhanced3DLabTabProps {
  conceptName: string;
  subject: string;
}

const Enhanced3DLabTab: React.FC<Enhanced3DLabTabProps> = ({ conceptName, subject }) => {
  const [activeTab, setActiveTab] = useState('simulation');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAIListening, setIsAIListening] = useState(false);
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const labTabs = {
    simulation: {
      name: 'Live Sim',
      tag: `${subject}`,
      description: 'Real-time simulation environment',
      audioExplanation: `This live simulation allows you to experiment with ${conceptName} in real-time. Adjust parameters and observe immediate results.`,
      icon: <Atom className="h-4 w-4" />
    },
    analysis: {
      name: 'Analysis',
      tag: `${subject}`,
      description: 'Detailed analysis tools',
      audioExplanation: `The analysis tab provides detailed breakdowns and measurements for understanding ${conceptName} behavior and patterns.`,
      icon: <Target className="h-4 w-4" />
    },
    examples: {
      name: '3D Models',
      tag: `${subject}`,
      description: 'Interactive 3D examples',
      audioExplanation: `Explore interactive 3D models that demonstrate key concepts of ${conceptName} from multiple perspectives.`,
      icon: <Box className="h-4 w-4" />
    },
    lab: {
      name: 'Virtual Lab',
      tag: `${subject}`,
      description: 'Controlled experimentation',
      audioExplanation: `Conduct virtual experiments in a safe environment to test hypotheses and observe ${conceptName} principles.`,
      icon: <FlaskConical className="h-4 w-4" />
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
      setTimeout(() => {
        setIsAIListening(false);
        playAudioExplanation(`I'm your 3D lab assistant. I can help explain any aspect of ${conceptName}. What would you like to explore?`);
      }, 3000);
    }
  };

  const markTabComplete = (tabName: string) => {
    if (!completedTabs.includes(tabName)) {
      setCompletedTabs([...completedTabs, tabName]);
      setProgress(prev => Math.min(100, prev + 25)); // 4 tabs total
    }
  };

  const currentTab = labTabs[activeTab as keyof typeof labTabs];

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <Card className="border-l-4 border-l-indigo-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Atom className="h-5 w-5 text-indigo-600" />
                3D Laboratory
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Interactive 3D environment for {conceptName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                {completedTabs.length}/4 Labs Complete
              </Badge>
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">{Math.round(progress)}%</div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2 mt-4" />
        </CardHeader>
      </Card>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Audio Guide</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => playAudioExplanation(currentTab.audioExplanation)}
                  disabled={isPlaying}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
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
              <h3 className="font-medium">AI Lab Assistant</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant={isAIListening ? "destructive" : "default"}
                  size="sm"
                  onClick={toggleAIAssistant}
                >
                  {isAIListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Lab Controls</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3D Lab Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {Object.entries(labTabs).map(([key, tab]) => (
            <TabsTrigger key={key} value={key} className="flex flex-col items-center gap-1 p-3">
              <div className="flex items-center gap-1">
                {tab.icon}
                <span className="font-medium">{tab.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {tab.tag}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(labTabs).map(([key, tab]) => (
          <TabsContent key={key} value={key} className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {tab.icon}
                      {tab.name}
                      <Badge variant="outline">{tab.tag}</Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{tab.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => playAudioExplanation(tab.audioExplanation)}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Explain
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* 3D Environment */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 p-8 rounded-lg min-h-[500px] flex items-center justify-center mb-6 border-2 border-dashed border-gray-300 dark:border-gray-700">
                  <div className="text-center space-y-4">
                    <motion.div 
                      className="w-40 h-40 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center"
                      animate={{ 
                        rotateY: isPlaying ? 360 : 0,
                        scale: isPlaying ? [1, 1.1, 1] : 1
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: isPlaying ? Infinity : 0,
                        repeatType: "loop"
                      }}
                    >
                      {tab.icon && React.cloneElement(tab.icon, { className: "h-20 w-20 text-white" })}
                    </motion.div>
                    <h3 className="text-2xl font-bold">{tab.name} Environment</h3>
                    <p className="text-muted-foreground max-w-md">
                      Interactive 3D {key} for {conceptName} - {tab.description}
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button 
                        onClick={() => {
                          markTabComplete(key);
                          playAudioExplanation(`Starting ${tab.name} for ${conceptName}`);
                        }}
                        className="flex items-center gap-2"
                      >
                        <Play className="h-4 w-4" />
                        Start Lab
                      </Button>
                      <Button variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Lab Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Lab Features</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-500" />
                        AI-guided exploration
                      </li>
                      <li className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-green-500" />
                        Voice explanations
                      </li>
                      <li className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-500" />
                        Interactive controls
                      </li>
                    </ul>
                  </Card>
                  
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Progress Tracking</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Lab Completion</span>
                        <span>{completedTabs.includes(key) ? '100%' : '0%'}</span>
                      </div>
                      <Progress value={completedTabs.includes(key) ? 100 : 0} className="h-2" />
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* AI Assistant Tips */}
      <Card className="border-dashed">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h3 className="font-medium">AI Lab Assistant Tips</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Ask me to explain any 3D model or simulation behavior</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Use voice commands to control lab experiments</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Complete all labs to unlock advanced simulations</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>I adapt explanations to your learning style</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Enhanced3DLabTab;
