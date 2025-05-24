
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Play, RotateCcw, ZoomIn, Volume2, Eye, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface Visual3DContentProps {
  conceptName: string;
}

const Visual3DContent: React.FC<Visual3DContentProps> = ({ conceptName }) => {
  const [activeModel, setActiveModel] = useState('molecular');
  const [isRotating, setIsRotating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const models = [
    {
      id: 'structure',
      title: 'Structure Model',
      description: 'Explore the 3D structural arrangement',
      difficulty: 'Beginner',
      duration: '3-5 min'
    },
    {
      id: 'interactive',
      title: 'Interactive Model',
      description: 'Interactive visualization and exploration',
      difficulty: 'Intermediate',
      duration: '5-7 min'
    },
    {
      id: 'mechanism',
      title: 'Mechanism Model',
      description: 'Step-by-step process visualization',
      difficulty: 'Advanced',
      duration: '7-10 min'
    }
  ];

  const explanations = {
    structure: `This 3D model shows the structure of ${conceptName}. You can see how components are arranged in three-dimensional space, with different colors representing different elements. The connections between parts are shown as links, helping you understand the spatial relationships.`,
    interactive: `The interactive model demonstrates the internal workings with dynamic components. This visualization helps understand how different parts interact with each other and how the system functions as a whole.`,
    mechanism: `This interactive mechanism shows how ${conceptName} works in practice. Each step is animated to show the process flow and changes, helping you understand the underlying principles and transformations involved.`
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Brain className="h-6 w-6 text-purple-600" />
            3D Learning Laboratory
          </CardTitle>
          <p className="text-muted-foreground">
            Immersive 3D visualization for {conceptName}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeModel} onValueChange={setActiveModel} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              {models.map((model) => (
                <TabsTrigger key={model.id} value={model.id} className="text-sm">
                  {model.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {models.map((model) => (
              <TabsContent key={model.id} value={model.id} className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* 3D Viewport */}
                  <div className="lg:col-span-2">
                    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
                      <CardContent className="p-6">
                        <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-xl flex items-center justify-center border-2 border-dashed border-purple-300 dark:border-purple-600">
                          <div className="text-center">
                            <Brain className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2">
                              3D {model.title}
                            </h3>
                            <p className="text-purple-600 dark:text-purple-400 text-sm mb-4">
                              Interactive 3D model will load here
                            </p>
                            <motion.div 
                              animate={isRotating ? { rotate: 360 } : {}}
                              transition={{ duration: 2, repeat: isRotating ? Infinity : 0, ease: "linear" }}
                              className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center"
                            >
                              <Eye className="h-8 w-8 text-white" />
                            </motion.div>
                          </div>
                        </div>

                        {/* 3D Controls */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsRotating(!isRotating)}
                            className="flex items-center gap-2"
                          >
                            <RotateCcw className="h-4 w-4" />
                            {isRotating ? 'Stop' : 'Rotate'}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setZoomLevel(zoomLevel === 100 ? 150 : 100)}
                            className="flex items-center gap-2"
                          >
                            <ZoomIn className="h-4 w-4" />
                            Zoom {zoomLevel === 100 ? 'In' : 'Out'}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePlayAudio(explanations[model.id as keyof typeof explanations])}
                            className="flex items-center gap-2"
                          >
                            <Volume2 className="h-4 w-4" />
                            Audio Guide
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Model Information */}
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{model.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {model.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {model.description}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Play className="h-3 w-3 mr-1" />
                          Duration: {model.duration}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          Learning Tips
                        </h4>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          <li>• Rotate the model to see all angles</li>
                          <li>• Use zoom to focus on specific parts</li>
                          <li>• Listen to audio explanations</li>
                          <li>• Take notes on key observations</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3">Quick Actions</h4>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-left justify-start"
                            onClick={() => handlePlayAudio(`Starting 3D exploration of ${model.title} for ${conceptName}`)}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start Guided Tour
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-left justify-start"
                          >
                            <Brain className="h-4 w-4 mr-2" />
                            Take Quiz
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Text Explanation Section */}
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      Detailed Explanation
                    </h4>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        {explanations[model.id as keyof typeof explanations]}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePlayAudio(explanations[model.id as keyof typeof explanations])}
                        className="flex items-center gap-2"
                      >
                        <Volume2 className="h-4 w-4" />
                        Read Aloud
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Visual3DContent;
