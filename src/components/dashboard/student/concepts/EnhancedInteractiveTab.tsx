
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, Volume2, VolumeX, Lightbulb, Bot, 
  GitBranch, Globe, BarChart3, FlaskConical 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedInteractiveTabProps {
  conceptName: string;
}

const EnhancedInteractiveTab: React.FC<EnhancedInteractiveTabProps> = ({ conceptName }) => {
  const [activeSubTab, setActiveSubTab] = useState('diagram');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [showAITutor, setShowAITutor] = useState(false);

  const tabs = [
    { id: 'diagram', name: 'Diagram', icon: <Eye className="h-4 w-4" /> },
    { id: 'relationships', name: 'Relationships', icon: <GitBranch className="h-4 w-4" /> },
    { id: 'realworld', name: 'Real World', icon: <Globe className="h-4 w-4" /> },
    { id: 'comparison', name: 'Comparison', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'lab', name: 'Interactive Lab', icon: <FlaskConical className="h-4 w-4" /> }
  ];

  const getTabExplanation = (tabId: string) => {
    const explanations = {
      diagram: `Welcome to the ${conceptName} diagram visualization. This interactive diagram shows the fundamental forces and their relationships. You can see how Newton's laws apply with vector representations. The red arrows represent applied forces, blue arrows show reaction forces, and green indicates the net force. Click on any element to get detailed explanations.`,
      relationships: `This relationship graph demonstrates how ${conceptName} connects to other physics concepts. You can see the interconnected nature of force, acceleration, momentum, and energy. Each node represents a related concept, and the connections show how they influence each other in real physics problems.`,
      realworld: `Explore real-world applications of ${conceptName}. From car safety systems to rocket propulsion, this visualization shows practical examples. Each scenario demonstrates the same underlying principles working in everyday life, helping you understand why this concept matters beyond textbooks.`,
      comparison: `Compare different aspects of ${conceptName} with this interactive comparison tool. You can adjust parameters like mass, force, and acceleration to see how they affect each other. The side-by-side visualization helps you understand the mathematical relationships through visual feedback.`,
      lab: `Welcome to the virtual physics laboratory for ${conceptName}. Here you can conduct experiments, adjust variables, and observe results in real-time. This hands-on approach helps solidify your understanding through experimentation and discovery.`
    };
    return explanations[tabId as keyof typeof explanations] || '';
  };

  const playAudioExplanation = (content: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsAudioPlaying(true);
      setCurrentExplanation(content);
      
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      utterance.onend = () => setIsAudioPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsAudioPlaying(false);
    }
  };

  useEffect(() => {
    const explanation = getTabExplanation(activeSubTab);
    if (explanation) {
      playAudioExplanation(explanation);
    }
  }, [activeSubTab, conceptName]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-purple-600" />
              Interactive Visualizations - {conceptName}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAITutor(!showAITutor)}
                className="flex items-center gap-2"
              >
                <Bot className="h-4 w-4" />
                AI Tutor
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => isAudioPlaying ? stopAudio() : playAudioExplanation(getTabExplanation(activeSubTab))}
                className="flex items-center gap-2"
              >
                {isAudioPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {isAudioPlaying ? 'Stop' : 'Audio'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-50 data-[state=active]:to-blue-50"
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="diagram" className="mt-0">
              <DiagramVisualization conceptName={conceptName} onElementClick={playAudioExplanation} />
            </TabsContent>

            <TabsContent value="relationships" className="mt-0">
              <RelationshipGraph conceptName={conceptName} onNodeClick={playAudioExplanation} />
            </TabsContent>

            <TabsContent value="realworld" className="mt-0">
              <RealWorldExamples conceptName={conceptName} onExampleClick={playAudioExplanation} />
            </TabsContent>

            <TabsContent value="comparison" className="mt-0">
              <ComparisonTool conceptName={conceptName} onComparisonChange={playAudioExplanation} />
            </TabsContent>

            <TabsContent value="lab" className="mt-0">
              <InteractiveLab conceptName={conceptName} onExperimentStart={playAudioExplanation} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showAITutor && (
        <AITutorPanel
          conceptName={conceptName}
          currentTab={activeSubTab}
          onClose={() => setShowAITutor(false)}
          onAudioExplanation={playAudioExplanation}
        />
      )}
    </div>
  );
};

// Diagram Visualization Component
const DiagramVisualization: React.FC<{ conceptName: string; onElementClick: (text: string) => void }> = ({ conceptName, onElementClick }) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const diagramElements = [
    { id: 'object', label: 'Object (5kg)', position: { x: 250, y: 200 }, color: 'bg-blue-500' },
    { id: 'force1', label: 'Applied Force (20N)', position: { x: 150, y: 150 }, color: 'bg-red-500' },
    { id: 'force2', label: 'Friction (5N)', position: { x: 350, y: 150 }, color: 'bg-orange-500' },
    { id: 'net', label: 'Net Force (15N)', position: { x: 250, y: 100 }, color: 'bg-green-500' }
  ];

  const handleElementClick = (element: any) => {
    setSelectedElement(element.id);
    const explanation = `${element.label}: This represents ${element.id === 'object' ? 'the mass being acted upon by forces' : element.id.includes('force') ? 'a force vector showing magnitude and direction' : 'the resultant force after vector addition'}. In ${conceptName}, this demonstrates how forces interact according to Newton's laws.`;
    onElementClick(explanation);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg min-h-[400px] relative overflow-hidden">
        <svg className="w-full h-full absolute inset-0" viewBox="0 0 500 300">
          {/* Force vectors */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
            </marker>
          </defs>
          
          {/* Applied force arrow */}
          <line x1="150" y1="200" x2="230" y2="200" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead)" />
          
          {/* Friction force arrow */}
          <line x1="350" y1="200" x2="270" y2="200" stroke="#f97316" strokeWidth="3" markerEnd="url(#arrowhead)" />
          
          {/* Net force arrow */}
          <line x1="250" y1="180" x2="250" y2="120" stroke="#22c55e" strokeWidth="4" markerEnd="url(#arrowhead)" />
          
          {/* Object */}
          <rect x="225" y="180" width="50" height="40" fill="#3b82f6" rx="5" />
          
          {/* Ground line */}
          <line x1="0" y1="220" x2="500" y2="220" stroke="#666" strokeWidth="2" />
        </svg>

        {/* Interactive elements */}
        {diagramElements.map((element) => (
          <motion.div
            key={element.id}
            className={`absolute w-4 h-4 rounded-full ${element.color} cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${selectedElement === element.id ? 'ring-4 ring-yellow-300' : ''}`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={() => handleElementClick(element)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {diagramElements.map((element) => (
          <div
            key={element.id}
            className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${selectedElement === element.id ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}
            onClick={() => handleElementClick(element)}
          >
            <div className={`w-3 h-3 rounded-full ${element.color} mb-2`}></div>
            <p className="text-sm font-medium">{element.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Relationship Graph Component
const RelationshipGraph: React.FC<{ conceptName: string; onNodeClick: (text: string) => void }> = ({ conceptName, onNodeClick }) => {
  const nodes = [
    { id: 'force', label: 'Force', x: 250, y: 150, connections: ['mass', 'acceleration'] },
    { id: 'mass', label: 'Mass', x: 150, y: 250, connections: ['force'] },
    { id: 'acceleration', label: 'Acceleration', x: 350, y: 250, connections: ['force', 'velocity'] },
    { id: 'velocity', label: 'Velocity', x: 450, y: 150, connections: ['acceleration'] },
    { id: 'momentum', label: 'Momentum', x: 300, y: 50, connections: ['mass', 'velocity'] }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg min-h-[400px] relative">
      <svg className="w-full h-full absolute inset-0" viewBox="0 0 600 300">
        {/* Connection lines */}
        {nodes.map(node => 
          node.connections.map(connId => {
            const connNode = nodes.find(n => n.id === connId);
            if (connNode) {
              return (
                <line
                  key={`${node.id}-${connId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={connNode.x}
                  y2={connNode.y}
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              );
            }
            return null;
          })
        )}
        
        {/* Nodes */}
        {nodes.map(node => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="30"
              fill="#fff"
              stroke="#3b82f6"
              strokeWidth="3"
              className="cursor-pointer hover:fill-blue-50"
              onClick={() => onNodeClick(`${node.label} is a fundamental concept in ${conceptName}. It's connected to other physics principles and plays a crucial role in understanding motion and forces.`)}
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              className="text-sm font-medium fill-blue-900 pointer-events-none"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Real World Examples Component
const RealWorldExamples: React.FC<{ conceptName: string; onExampleClick: (text: string) => void }> = ({ conceptName, onExampleClick }) => {
  const examples = [
    { id: 'car', title: 'Car Safety', image: '🚗', description: 'Airbags and crumple zones' },
    { id: 'rocket', title: 'Space Travel', image: '🚀', description: 'Rocket propulsion systems' },
    { id: 'sports', title: 'Sports Physics', image: '⚽', description: 'Ball trajectory and impact' },
    { id: 'construction', title: 'Building Design', image: '🏗️', description: 'Structural force analysis' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {examples.map(example => (
          <motion.div
            key={example.id}
            className="bg-white p-4 rounded-lg border hover:shadow-lg cursor-pointer"
            onClick={() => onExampleClick(`${example.title}: ${example.description}. This real-world application of ${conceptName} shows how the same principles we study in physics class are used in practical engineering solutions that affect our daily lives.`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-2 text-center">{example.image}</div>
            <h3 className="font-semibold text-center">{example.title}</h3>
            <p className="text-sm text-gray-600 text-center">{example.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Comparison Tool Component
const ComparisonTool: React.FC<{ conceptName: string; onComparisonChange: (text: string) => void }> = ({ conceptName, onComparisonChange }) => {
  const [mass, setMass] = useState(5);
  const [force, setForce] = useState(20);
  
  const acceleration = force / mass;

  useEffect(() => {
    onComparisonChange(`With mass ${mass}kg and force ${force}N, the acceleration is ${acceleration.toFixed(2)} m/s². This demonstrates the relationship F = ma in ${conceptName}.`);
  }, [mass, force, acceleration, conceptName, onComparisonChange]);

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Mass (kg)</label>
            <input
              type="range"
              min="1"
              max="20"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-1 font-semibold">{mass} kg</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Force (N)</label>
            <input
              type="range"
              min="5"
              max="50"
              value={force}
              onChange={(e) => setForce(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-1 font-semibold">{force} N</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Acceleration (m/s²)</label>
            <div className="text-center text-2xl font-bold text-blue-600">
              {acceleration.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive Lab Component
const InteractiveLab: React.FC<{ conceptName: string; onExperimentStart: (text: string) => void }> = ({ conceptName, onExperimentStart }) => {
  const [isExperimentRunning, setIsExperimentRunning] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const startExperiment = () => {
    setIsExperimentRunning(true);
    onExperimentStart(`Starting virtual experiment for ${conceptName}. We'll apply different forces to objects of varying masses and observe the resulting accelerations. This hands-on approach helps you understand the mathematical relationships through direct observation.`);
    
    setTimeout(() => {
      const newResult = `Experiment ${results.length + 1}: Applied 15N force to 3kg object, resulting in 5 m/s² acceleration.`;
      setResults(prev => [...prev, newResult]);
      setIsExperimentRunning(false);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-4">Virtual Lab Equipment</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Force Meter', 'Mass Scale', 'Motion Sensor', 'Data Logger'].map((tool, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border text-center">
                  <FlaskConical className="h-6 w-6 mx-auto mb-1 text-purple-600" />
                  <p className="text-xs">{tool}</p>
                </div>
              ))}
            </div>
            
            <Button
              onClick={startExperiment}
              disabled={isExperimentRunning}
              className="w-full mt-4"
              variant={isExperimentRunning ? "secondary" : "default"}
            >
              {isExperimentRunning ? "Running Experiment..." : "Start New Experiment"}
            </Button>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Experiment Results</h3>
            <div className="bg-white p-4 rounded-lg border min-h-[200px]">
              {results.length === 0 ? (
                <p className="text-gray-500 text-center">No experiments conducted yet</p>
              ) : (
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <div key={index} className="text-sm p-2 bg-gray-50 rounded border-l-4 border-purple-400">
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

// AI Tutor Panel Component
const AITutorPanel: React.FC<{
  conceptName: string;
  currentTab: string;
  onClose: () => void;
  onAudioExplanation: (text: string) => void;
}> = ({ conceptName, currentTab, onClose, onAudioExplanation }) => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: `Hello! I'm your AI tutor for ${conceptName}. I'm here to help you understand the ${currentTab} visualization. What would you like to know about this concept?`
    }
  ]);
  const [question, setQuestion] = useState('');

  const handleSendQuestion = () => {
    if (!question.trim()) return;

    const userMessage = { type: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        content: `Great question about ${conceptName}! Based on the ${currentTab} visualization, I can explain that this concept demonstrates fundamental physics principles. The visual representation helps you understand how forces interact and affect motion according to Newton's laws.`
      };
      setMessages(prev => [...prev, aiResponse]);
      onAudioExplanation(aiResponse.content);
    }, 1000);
    
    setQuestion('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 w-96 max-h-96 bg-white rounded-lg shadow-xl border z-50"
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">AI Tutor</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </div>
      </div>
      
      <div className="p-4 max-h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg max-w-[80%] ${
              msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about this visualization..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendQuestion()}
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
          />
          <Button size="sm" onClick={handleSendQuestion}>Send</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedInteractiveTab;
