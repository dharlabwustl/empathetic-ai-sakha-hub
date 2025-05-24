
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Pause, Volume2, BarChart3, PieChart, LineChart, 
  Bot, Lightbulb, Eye, Info, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

interface InteractiveVisualizationTabProps {
  conceptName: string;
}

const InteractiveVisualizationTab: React.FC<InteractiveVisualizationTabProps> = ({ 
  conceptName 
}) => {
  const [activeGraph, setActiveGraph] = useState('force-diagram');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAIExplanation, setShowAIExplanation] = useState(false);

  const visualizations = [
    {
      id: 'force-diagram',
      title: 'Force Vector Diagram',
      type: 'diagram',
      icon: BarChart3,
      description: 'Interactive force vectors showing magnitude and direction',
      textExplanation: `This force vector diagram illustrates Newton's Laws of Motion. The arrows represent force vectors - their length shows magnitude (strength) and direction shows where the force is applied. When forces are balanced (equal and opposite), the object remains at rest or moves at constant velocity (Newton's First Law). When unbalanced, acceleration occurs in the direction of net force (Newton's Second Law).`,
      interactiveElements: [
        'Click arrows to change force magnitude',
        'Drag to change force direction', 
        'Observe net force calculation in real-time'
      ]
    },
    {
      id: 'velocity-graph',
      title: 'Velocity vs Time Graph',
      type: 'graph',
      icon: LineChart,
      description: 'Real-time velocity changes based on applied forces',
      textExplanation: `This velocity-time graph shows how an object's velocity changes when forces are applied. A horizontal line indicates constant velocity (zero acceleration). An upward slope shows positive acceleration, while a downward slope indicates deceleration. The steepness of the line represents the magnitude of acceleration - steeper lines mean greater acceleration.`,
      interactiveElements: [
        'Adjust applied force to see velocity changes',
        'Observe how mass affects acceleration',
        'Compare different force scenarios'
      ]
    },
    {
      id: 'energy-pie',
      title: 'Energy Distribution',
      type: 'chart',
      icon: PieChart,
      description: 'Energy conservation visualization',
      textExplanation: `This pie chart shows energy distribution in a mechanical system. Kinetic energy (motion) and potential energy (position) transform into each other while total energy remains constant (Conservation of Energy). As an object falls, potential energy converts to kinetic energy. When it rises, kinetic energy converts back to potential energy.`,
      interactiveElements: [
        'Change object height to see energy shifts',
        'Modify mass to observe energy scaling',
        'Track total energy conservation'
      ]
    }
  ];

  const currentVisualization = visualizations.find(v => v.id === activeGraph) || visualizations[0];

  const playAudioExplanation = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      
      utterance.onend = () => setIsPlaying(false);
    }
  };

  const handleAIExplanation = () => {
    setShowAIExplanation(!showAIExplanation);
    if (!showAIExplanation) {
      const aiText = `Let me explain ${currentVisualization.title} in detail. ${currentVisualization.textExplanation} This visualization helps you understand ${conceptName} by providing visual feedback for abstract physics concepts.`;
      playAudioExplanation(aiText);
    }
  };

  return (
    <div className="space-y-6">
      {/* Visualization Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-600" />
            Interactive Visualizations - {conceptName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visualizations.map((viz) => (
              <motion.div
                key={viz.id}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  activeGraph === viz.id 
                    ? 'border-purple-500 bg-purple-50 shadow-md' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setActiveGraph(viz.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <viz.icon className="h-6 w-6 text-purple-600" />
                  <h3 className="font-medium">{viz.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{viz.description}</p>
                <Badge variant="outline" className="mt-2 text-xs">
                  {viz.type}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Visualization Display */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <currentVisualization.icon className="h-5 w-5 text-purple-600" />
              {currentVisualization.title}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => playAudioExplanation(currentVisualization.textExplanation)}
                disabled={isPlaying}
                className="flex items-center gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {isPlaying ? 'Playing...' : 'Audio Explanation'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAIExplanation}
                className="flex items-center gap-2"
              >
                <Bot className="h-4 w-4" />
                AI Tutor
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visualization" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="visualization">Interactive View</TabsTrigger>
              <TabsTrigger value="explanation">Text Explanation</TabsTrigger>
              <TabsTrigger value="controls">Controls & Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="visualization" className="mt-6">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-lg min-h-[400px] relative">
                {/* Mock Interactive Visualization */}
                <div className="flex items-center justify-center h-full">
                  <motion.div
                    className="relative"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <currentVisualization.icon className="h-32 w-32 text-purple-600" />
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
                
                {/* Interactive Elements Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-medium mb-2">Interactive Elements:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      {currentVisualization.interactiveElements.map((element, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>{element}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="explanation" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <h3 className="font-medium text-lg">Detailed Explanation</h3>
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {currentVisualization.textExplanation}
                    </p>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        <h4 className="font-medium">Key Learning Points:</h4>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li>• Visual representations help understand abstract concepts</li>
                        <li>• Interactive elements allow you to test different scenarios</li>
                        <li>• Real-time feedback shows cause-and-effect relationships</li>
                        <li>• Multiple visualization types cater to different learning styles</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="controls" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Visualization Controls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Animation Speed</label>
                        <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Display Quality</label>
                        <select className="w-full mt-1 p-2 border rounded">
                          <option>High Quality</option>
                          <option>Standard</option>
                          <option>Performance Mode</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="show-labels" defaultChecked />
                        <label htmlFor="show-labels" className="text-sm">Show Labels</label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Audio Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Narration Speed</label>
                        <input type="range" min="0.5" max="1.5" step="0.1" defaultValue="0.9" className="w-full mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Voice</label>
                        <select className="w-full mt-1 p-2 border rounded">
                          <option>Default Voice</option>
                          <option>Educational Voice</option>
                          <option>Professional Voice</option>
                        </select>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => playAudioExplanation("This is a test of the audio explanation feature.")}
                      >
                        <Volume2 className="h-4 w-4 mr-2" />
                        Test Audio
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* AI Explanation Panel */}
      {showAIExplanation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Bot className="h-5 w-5" />
                AI Tutor Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-blue-700">
                  <strong>🤖 AI Tutor:</strong> I can see you're exploring {currentVisualization.title}! 
                  This visualization is excellent for understanding {conceptName}. 
                  {currentVisualization.textExplanation}
                </p>
                <div className="bg-white/70 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">💡 Study Tips:</h4>
                  <ul className="text-sm space-y-1 text-blue-800">
                    <li>• Try different parameter values to see how they affect the outcome</li>
                    <li>• Pay attention to the relationship between variables</li>
                    <li>• Use the audio explanation while interacting with the visualization</li>
                    <li>• Take notes on patterns you observe</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Ask Question</Button>
                  <Button size="sm" variant="outline">More Examples</Button>
                  <Button size="sm" variant="outline">Related Concepts</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveVisualizationTab;
