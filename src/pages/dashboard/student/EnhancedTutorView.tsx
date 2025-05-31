
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Bot, User, Mic, MicOff, Volume2, VolumeX, Search, Brain, Cube, Eye, Lightbulb, CreditCard, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';

const EnhancedTutorView = () => {
  const [question, setQuestion] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('chat');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [credits, setCredits] = useState(15);
  const navigate = useNavigate();
  
  const mockMessages = [
    {
      role: 'assistant',
      content: 'Hi there! I\'m your enhanced AI tutor with voice capabilities. How can I help you with your NEET preparation today?',
      timestamp: '2:30 PM'
    }
  ];

  const features = [
    { id: 'chat', name: 'Chat', icon: MessageSquare, free: true },
    { id: 'search', name: 'Smart Search', icon: Search, free: true },
    { id: 'insights', name: 'AI Insights', icon: Lightbulb, free: true },
    { id: '3d-models', name: '3D Models', icon: Cube, free: false, cost: 2 },
    { id: 'interactive-visual', name: 'Interactive Visuals', icon: Eye, free: false, cost: 3 },
    { id: 'advanced-analysis', name: 'Advanced Analysis', icon: Brain, free: false, cost: 5 }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Check if feature requires credits
    const feature = features.find(f => f.id === selectedFeature);
    if (feature && !feature.free && credits < feature.cost) {
      alert('Insufficient credits! Please purchase more credits to use this feature.');
      return;
    }
    
    // Deduct credits for paid features
    if (feature && !feature.free) {
      setCredits(prev => prev - feature.cost);
    }
    
    console.log('Question submitted:', question, 'Feature:', selectedFeature);
    setQuestion('');
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real implementation, this would start/stop speech recognition
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // In a real implementation, this would start/stop text-to-speech
  };

  const getFeatureIcon = (feature: any) => {
    const IconComponent = feature.icon;
    return <IconComponent className="h-4 w-4" />;
  };

  const getFeatureColor = (feature: any) => {
    if (!feature.free) return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
    return selectedFeature === feature.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  };
  
  return (
    <SharedPageLayout
      title="24/7 Enhanced AI Tutor"
      subtitle="Get immediate help with voice interaction and premium features"
      showBackButton={true}
    >
      <div className="grid md:grid-cols-4 gap-6">
        {/* Feature Selection Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                AI Features
                <div className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4 text-orange-500" />
                  <span className="text-orange-600 font-bold">{credits}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {features.map((feature) => (
                <motion.button
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${getFeatureColor(feature)}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFeatureIcon(feature)}
                      <span className="text-sm font-medium">{feature.name}</span>
                    </div>
                    {!feature.free && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                        {feature.cost} credits
                      </Badge>
                    )}
                  </div>
                  {!feature.free && (
                    <p className="text-xs mt-1 opacity-80">Premium Feature</p>
                  )}
                </motion.button>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-none hover:from-orange-600 hover:to-red-600"
                onClick={() => navigate('/dashboard/student/subscription')}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Buy Credits
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Interface */}
        <div className="md:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  AI Tutor Chat - {features.find(f => f.id === selectedFeature)?.name}
                  {selectedFeature !== 'chat' && (
                    <Badge className="bg-blue-100 text-blue-800">
                      {features.find(f => f.id === selectedFeature)?.name} Mode
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSpeaking}
                    className={isSpeaking ? 'bg-green-100 text-green-800' : ''}
                  >
                    {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleListening}
                    className={isListening ? 'bg-red-100 text-red-800 animate-pulse' : ''}
                  >
                    {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-auto p-4 space-y-4">
              {mockMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${
                    message.role === 'assistant' 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' 
                      : 'bg-primary text-primary-foreground'
                  } p-4 rounded-lg shadow-sm`}>
                    <div className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white shadow-sm">
                      {message.role === 'assistant' ? 
                        <Bot className="h-5 w-5 text-blue-600" /> : 
                        <User className="h-5 w-5 text-gray-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className={message.role === 'assistant' ? 'text-gray-800' : 'text-white'}>
                        {message.content}
                      </div>
                      <div className="text-xs opacity-60 mt-1">{message.timestamp}</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Feature-specific content preview */}
              {selectedFeature === '3d-models' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center"
                >
                  <Cube className="h-12 w-12 mx-auto text-purple-600 mb-2" />
                  <p className="text-purple-800 font-medium">3D Models Feature Active</p>
                  <p className="text-purple-600 text-sm">Ask about molecular structures, anatomy, or physics concepts!</p>
                </motion.div>
              )}

              {selectedFeature === 'interactive-visual' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-pink-50 border border-pink-200 p-4 rounded-lg text-center"
                >
                  <Eye className="h-12 w-12 mx-auto text-pink-600 mb-2" />
                  <p className="text-pink-800 font-medium">Interactive Visuals Feature Active</p>
                  <p className="text-pink-600 text-sm">Get interactive diagrams, charts, and animations!</p>
                </motion.div>
              )}
            </CardContent>
            
            <div className="p-4 border-t bg-gray-50">
              {/* Voice status indicator */}
              {isListening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-3 flex items-center gap-2 text-red-600"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Mic className="h-4 w-4" />
                  </motion.div>
                  <span className="text-sm">Listening... Speak your question</span>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input 
                  value={question} 
                  onChange={(e) => setQuestion(e.target.value)} 
                  placeholder={`Ask anything using ${features.find(f => f.id === selectedFeature)?.name}...`}
                  className="flex-grow"
                  disabled={isListening}
                />
                <Button 
                  type="submit" 
                  disabled={!question.trim() && !isListening}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="h-4 w-4 mr-1" /> 
                  {isListening ? 'Listening...' : 'Send'}
                </Button>
              </form>
              
              {/* Feature cost warning */}
              {selectedFeature !== 'chat' && features.find(f => f.id === selectedFeature && !f.free) && (
                <p className="text-xs text-orange-600 mt-2 text-center">
                  This feature costs {features.find(f => f.id === selectedFeature)?.cost} credits per use
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedTutorView;
