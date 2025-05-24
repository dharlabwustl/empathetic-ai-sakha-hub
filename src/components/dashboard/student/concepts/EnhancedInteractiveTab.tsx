
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Pause, Volume2, MessageSquare, Brain, 
  Network, Globe, BarChart3, FlaskConical,
  Lightbulb, Target, Settings, HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedInteractiveTabProps {
  conceptName: string;
}

const EnhancedInteractiveTab: React.FC<EnhancedInteractiveTabProps> = ({ conceptName }) => {
  const [activeTab, setActiveTab] = useState('diagrams');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [showAITutor, setShowAITutor] = useState(false);
  const [currentDiagram, setCurrentDiagram] = useState<string | null>(null);

  const playAudioExplanation = (content: string, diagramId: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      utterance.onstart = () => setIsPlaying(diagramId);
      utterance.onend = () => setIsPlaying(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudioExplanation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(null);
    }
  };

  const openAITutor = (diagramType: string) => {
    setCurrentDiagram(diagramType);
    setShowAITutor(true);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
          <TabsTrigger value="real-world">Real World</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="lab">Interactive Lab</TabsTrigger>
        </TabsList>

        <TabsContent value="diagrams" className="mt-6">
          <DiagramsTab 
            conceptName={conceptName}
            isPlaying={isPlaying}
            onPlayAudio={playAudioExplanation}
            onStopAudio={stopAudioExplanation}
            onOpenAITutor={openAITutor}
          />
        </TabsContent>

        <TabsContent value="relationships" className="mt-6">
          <RelationshipsTab 
            conceptName={conceptName}
            isPlaying={isPlaying}
            onPlayAudio={playAudioExplanation}
            onStopAudio={stopAudioExplanation}
            onOpenAITutor={openAITutor}
          />
        </TabsContent>

        <TabsContent value="real-world" className="mt-6">
          <RealWorldTab 
            conceptName={conceptName}
            isPlaying={isPlaying}
            onPlayAudio={playAudioExplanation}
            onStopAudio={stopAudioExplanation}
            onOpenAITutor={openAITutor}
          />
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <ComparisonTab 
            conceptName={conceptName}
            isPlaying={isPlaying}
            onPlayAudio={playAudioExplanation}
            onStopAudio={stopAudioExplanation}
            onOpenAITutor={openAITutor}
          />
        </TabsContent>

        <TabsContent value="lab" className="mt-6">
          <InteractiveLabTab 
            conceptName={conceptName}
            isPlaying={isPlaying}
            onPlayAudio={playAudioExplanation}
            onStopAudio={stopAudioExplanation}
            onOpenAITutor={openAITutor}
          />
        </TabsContent>
      </Tabs>

      {/* AI Tutor Dialog */}
      {showAITutor && (
        <AITutorDialog 
          conceptName={conceptName}
          diagramType={currentDiagram || ''}
          isOpen={showAITutor}
          onClose={() => setShowAITutor(false)}
        />
      )}
    </div>
  );
};

// Individual Tab Components
interface TabProps {
  conceptName: string;
  isPlaying: string | null;
  onPlayAudio: (content: string, id: string) => void;
  onStopAudio: () => void;
  onOpenAITutor: (diagramType: string) => void;
}

const DiagramsTab: React.FC<TabProps> = ({ conceptName, isPlaying, onPlayAudio, onStopAudio, onOpenAITutor }) => {
  const diagrams = [
    {
      id: 'force-diagram',
      title: 'Force Diagram',
      description: `Interactive force diagram showing how forces interact in ${conceptName}`,
      audioContent: `This force diagram illustrates the fundamental principles of ${conceptName}. You can see how different forces are represented by vectors, their magnitude shown by arrow length, and direction indicated by arrow orientation. The resultant force is calculated by vector addition of all individual forces acting on the object.`
    },
    {
      id: 'system-diagram',
      title: 'System Overview',
      description: `Complete system representation of ${conceptName}`,
      audioContent: `This system diagram provides a comprehensive overview of ${conceptName}. It shows all components, their interconnections, and how energy or information flows through the system. Each element plays a crucial role in the overall functionality.`
    },
    {
      id: 'process-diagram',
      title: 'Process Flow',
      description: `Step-by-step process visualization for ${conceptName}`,
      audioContent: `This process flow diagram breaks down ${conceptName} into sequential steps. You can follow the logical progression from input to output, understanding each transformation or operation that occurs along the way.`
    }
  ];

  return (
    <div className="space-y-4">
      {diagrams.map((diagram) => (
        <Card key={diagram.id} className="border-2 hover:border-blue-300 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                {diagram.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isPlaying === diagram.id) {
                      onStopAudio();
                    } else {
                      onPlayAudio(diagram.audioContent, diagram.id);
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  {isPlaying === diagram.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {isPlaying === diagram.id ? 'Stop' : 'Play'} Audio
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenAITutor(`diagram-${diagram.id}`)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask AI Tutor
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg min-h-[300px] flex items-center justify-center mb-4">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-blue-200 rounded-full flex items-center justify-center">
                  <Target className="h-16 w-16 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">{diagram.title}</h3>
                <p className="text-gray-600">{diagram.description}</p>
                {isPlaying === diagram.id && (
                  <Badge variant="secondary" className="animate-pulse">
                    <Volume2 className="h-3 w-3 mr-1" />
                    Audio Playing
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const RelationshipsTab: React.FC<TabProps> = ({ conceptName, isPlaying, onPlayAudio, onStopAudio, onOpenAITutor }) => {
  const relationships = [
    {
      id: 'concept-map',
      title: 'Concept Relationship Map',
      description: `Visual network showing how ${conceptName} connects to other concepts`,
      audioContent: `This concept map demonstrates the interconnected nature of ${conceptName} with related topics. You can see primary connections, secondary relationships, and how understanding this concept helps with learning others. The thickness of connections indicates the strength of relationships.`
    },
    {
      id: 'dependency-graph',
      title: 'Learning Dependencies',
      description: `Prerequisites and follow-up concepts for ${conceptName}`,
      audioContent: `This dependency graph shows what you need to know before learning ${conceptName} and what becomes accessible after mastering it. Following this path ensures a logical learning progression and helps identify knowledge gaps.`
    }
  ];

  return (
    <div className="space-y-4">
      {relationships.map((relationship) => (
        <Card key={relationship.id} className="border-2 hover:border-purple-300 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5 text-purple-600" />
                {relationship.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isPlaying === relationship.id) {
                      onStopAudio();
                    } else {
                      onPlayAudio(relationship.audioContent, relationship.id);
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  {isPlaying === relationship.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {isPlaying === relationship.id ? 'Stop' : 'Play'} Audio
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenAITutor(`relationship-${relationship.id}`)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask AI Tutor
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-lg min-h-[300px] flex items-center justify-center mb-4">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-purple-200 rounded-full flex items-center justify-center">
                  <Network className="h-16 w-16 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">{relationship.title}</h3>
                <p className="text-gray-600">{relationship.description}</p>
                {isPlaying === relationship.id && (
                  <Badge variant="secondary" className="animate-pulse">
                    <Volume2 className="h-3 w-3 mr-1" />
                    Audio Playing
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const RealWorldTab: React.FC<TabProps> = ({ conceptName, isPlaying, onPlayAudio, onStopAudio, onOpenAITutor }) => {
  const realWorldExamples = [
    {
      id: 'practical-application',
      title: 'Practical Applications',
      description: `Real-world uses of ${conceptName} in daily life and industry`,
      audioContent: `These practical applications show how ${conceptName} is used in everyday life and various industries. From simple household items to complex engineering systems, this concept plays a crucial role in making our modern world function efficiently.`
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      description: `Detailed examples of ${conceptName} in action`,
      audioContent: `These case studies provide detailed analysis of how ${conceptName} is applied in real scenarios. Each case demonstrates problem-solving approaches, decision-making processes, and outcomes, helping you understand practical implementation.`
    }
  ];

  return (
    <div className="space-y-4">
      {realWorldExamples.map((example) => (
        <Card key={example.id} className="border-2 hover:border-green-300 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                {example.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isPlaying === example.id) {
                      onStopAudio();
                    } else {
                      onPlayAudio(example.audioContent, example.id);
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  {isPlaying === example.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {isPlaying === example.id ? 'Stop' : 'Play'} Audio
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenAITutor(`realworld-${example.id}`)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask AI Tutor
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-lg min-h-[300px] flex items-center justify-center mb-4">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-green-200 rounded-full flex items-center justify-center">
                  <Globe className="h-16 w-16 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">{example.title}</h3>
                <p className="text-gray-600">{example.description}</p>
                {isPlaying === example.id && (
                  <Badge variant="secondary" className="animate-pulse">
                    <Volume2 className="h-3 w-3 mr-1" />
                    Audio Playing
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ComparisonTab: React.FC<TabProps> = ({ conceptName, isPlaying, onPlayAudio, onStopAudio, onOpenAITutor }) => {
  const comparisons = [
    {
      id: 'concept-comparison',
      title: 'Concept Comparison',
      description: `Compare ${conceptName} with similar concepts`,
      audioContent: `This comparison analyzes the similarities and differences between ${conceptName} and related concepts. Understanding these distinctions helps you avoid common misconceptions and apply the right concept in appropriate situations.`
    },
    {
      id: 'approach-comparison',
      title: 'Solution Approaches',
      description: `Different methods for applying ${conceptName}`,
      audioContent: `These different approaches show various ways to apply ${conceptName} in problem-solving. Each method has its advantages and is suitable for specific scenarios. Learning multiple approaches makes you more versatile in tackling problems.`
    }
  ];

  return (
    <div className="space-y-4">
      {comparisons.map((comparison) => (
        <Card key={comparison.id} className="border-2 hover:border-orange-300 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                {comparison.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isPlaying === comparison.id) {
                      onStopAudio();
                    } else {
                      onPlayAudio(comparison.audioContent, comparison.id);
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  {isPlaying === comparison.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {isPlaying === comparison.id ? 'Stop' : 'Play'} Audio
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenAITutor(`comparison-${comparison.id}`)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask AI Tutor
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-orange-50 to-red-100 p-6 rounded-lg min-h-[300px] flex items-center justify-center mb-4">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-orange-200 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold">{comparison.title}</h3>
                <p className="text-gray-600">{comparison.description}</p>
                {isPlaying === comparison.id && (
                  <Badge variant="secondary" className="animate-pulse">
                    <Volume2 className="h-3 w-3 mr-1" />
                    Audio Playing
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const InteractiveLabTab: React.FC<TabProps> = ({ conceptName, isPlaying, onPlayAudio, onStopAudio, onOpenAITutor }) => {
  const [experimentRunning, setExperimentRunning] = useState(false);
  const [labResults, setLabResults] = useState<string[]>([]);

  const labExperiments = [
    {
      id: 'virtual-experiment',
      title: 'Virtual Experiment',
      description: `Interactive simulation of ${conceptName} principles`,
      audioContent: `This virtual experiment allows you to manipulate variables and observe how they affect ${conceptName}. You can change parameters in real-time and see immediate results, helping you understand cause-and-effect relationships.`
    },
    {
      id: 'parameter-analysis',
      title: 'Parameter Analysis',
      description: `Analyze different parameters affecting ${conceptName}`,
      audioContent: `This parameter analysis tool lets you explore how different variables influence ${conceptName}. By systematically changing one parameter at a time, you can understand the individual contribution of each factor.`
    }
  ];

  const runExperiment = (experimentId: string) => {
    setExperimentRunning(true);
    const newResult = `Experiment ${labResults.length + 1}: ${conceptName} analysis completed at ${new Date().toLocaleTimeString()}`;
    
    setTimeout(() => {
      setLabResults(prev => [...prev, newResult]);
      setExperimentRunning(false);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Experiment completed successfully. The results demonstrate key principles of ${conceptName}.`);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    }, 3000);
  };

  return (
    <div className="space-y-4">
      {labExperiments.map((experiment) => (
        <Card key={experiment.id} className="border-2 hover:border-indigo-300 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-indigo-600" />
                {experiment.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isPlaying === experiment.id) {
                      onStopAudio();
                    } else {
                      onPlayAudio(experiment.audioContent, experiment.id);
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  {isPlaying === experiment.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {isPlaying === experiment.id ? 'Stop' : 'Play'} Audio
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenAITutor(`lab-${experiment.id}`)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask AI Tutor
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-6 rounded-lg min-h-[300px] mb-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Experiment Controls</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg">
                      <label className="text-sm font-medium">Parameter A</label>
                      <input type="range" className="w-full mt-1" min="0" max="100" defaultValue="50" />
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <label className="text-sm font-medium">Parameter B</label>
                      <input type="range" className="w-full mt-1" min="0" max="100" defaultValue="30" />
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => runExperiment(experiment.id)}
                    disabled={experimentRunning}
                    className="w-full flex items-center gap-2"
                  >
                    {experimentRunning ? (
                      <>
                        <Settings className="h-4 w-4 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Run Experiment
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Results</h4>
                  <div className="bg-white p-4 rounded-lg min-h-[200px]">
                    {labResults.length === 0 ? (
                      <p className="text-gray-500 text-center">No experiments run yet</p>
                    ) : (
                      <div className="space-y-2">
                        {labResults.map((result, index) => (
                          <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                            {result}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {isPlaying === experiment.id && (
                <div className="mt-4 text-center">
                  <Badge variant="secondary" className="animate-pulse">
                    <Volume2 className="h-3 w-3 mr-1" />
                    Audio Playing
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// AI Tutor Dialog Component
interface AITutorDialogProps {
  conceptName: string;
  diagramType: string;
  isOpen: boolean;
  onClose: () => void;
}

const AITutorDialog: React.FC<AITutorDialogProps> = ({ conceptName, diagramType, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Initialize with context-specific greeting
      const greeting = `Hello! I'm your AI tutor for ${conceptName}. I can help you understand the ${diagramType.replace('-', ' ')} and answer any questions you have about this concept. What would you like to know?`;
      setMessages([{type: 'ai', content: greeting}]);
    }
  }, [isOpen, conceptName, diagramType]);

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage;
    setMessages(prev => [...prev, {type: 'user', content: userMessage}]);
    setCurrentMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `That's a great question about ${conceptName}! Let me explain: This concept involves understanding the fundamental principles that govern ${diagramType.replace('-', ' ')}. The key insight is how different elements interact and influence each other. Would you like me to elaborate on any specific aspect?`;
      setMessages(prev => [...prev, {type: 'ai', content: aiResponse}]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              AI Tutor - {conceptName}
            </h3>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask a question about this concept..."
              className="flex-1 p-2 border rounded-lg"
            />
            <Button onClick={sendMessage} className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedInteractiveTab;
