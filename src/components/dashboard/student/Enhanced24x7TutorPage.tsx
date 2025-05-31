
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Search, Brain, Zap, Eye, BarChart3, ShoppingCart, Star, Sparkles, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface TutorFeature {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isPremium: boolean;
  credits?: number;
  available: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Enhanced24x7TutorPage: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('chat');
  const [userCredits, setUserCredits] = useState(15);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your 24/7 AI Tutor. I can help you with studying, practice questions, and advanced features. What would you like to work on today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const features: TutorFeature[] = [
    {
      id: 'chat',
      name: 'Chat',
      icon: <MessageCircle className="h-4 w-4" />,
      description: 'Basic tutoring conversation',
      isPremium: false,
      available: true
    },
    {
      id: 'search',
      name: 'Search',
      icon: <Search className="h-4 w-4" />,
      description: 'Search through study materials',
      isPremium: false,
      available: true
    },
    {
      id: 'insights',
      name: 'Insights',
      icon: <Brain className="h-4 w-4" />,
      description: 'Get personalized study insights',
      isPremium: false,
      available: true
    },
    {
      id: '3d-models',
      name: '3D Models',
      icon: <Zap className="h-4 w-4" />,
      description: 'Interactive 3D models for complex concepts',
      isPremium: true,
      credits: 2,
      available: userCredits >= 2
    },
    {
      id: 'interactive-visuals',
      name: 'Interactive Visuals',
      icon: <Eye className="h-4 w-4" />,
      description: 'Dynamic visual explanations',
      isPremium: true,
      credits: 3,
      available: userCredits >= 3
    },
    {
      id: 'advanced-analysis',
      name: 'Advanced Analysis',
      icon: <BarChart3 className="h-4 w-4" />,
      description: 'Deep performance analysis',
      isPremium: true,
      credits: 5,
      available: userCredits >= 5
    }
  ];

  const handleFeatureSelect = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    if (feature?.isPremium && !feature.available) {
      return;
    }
    
    if (feature?.isPremium && feature.credits) {
      setUserCredits(prev => prev - feature.credits!);
    }
    
    setSelectedFeature(featureId);
    
    const systemMessage: Message = {
      role: 'assistant',
      content: `Switched to ${feature?.name} mode. ${feature?.description}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    setTimeout(() => {
      const responses = {
        'chat': 'I can help you understand this concept better. What specific part would you like me to explain?',
        'search': 'I found several relevant materials for your query. Let me show you the most important ones.',
        'insights': 'Based on your study patterns, I recommend focusing on these weak areas first.',
        '3d-models': 'Loading interactive 3D model... This will help visualize the molecular structure.',
        'interactive-visuals': 'Creating dynamic visual explanation... This diagram will show the process step by step.',
        'advanced-analysis': 'Performing deep analysis... Your performance indicates these specific improvement areas.'
      };
      
      const botMessage: Message = {
        role: 'assistant',
        content: responses[selectedFeature as keyof typeof responses] || 'How can I assist you today?',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

  const selectedFeatureData = features.find(f => f.id === selectedFeature);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="h-8 w-8 text-purple-600" />
              </motion.div>
              24/7 AI Tutor
            </h1>
            <p className="text-gray-600 mt-1">Your personal AI learning companion</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
              <Star className="h-3 w-3 mr-1" />
              {userCredits} Credits
            </Badge>
            <Button variant="outline" size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Credits
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Feature Selection Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {features.map((feature) => (
                  <motion.div
                    key={feature.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={selectedFeature === feature.id ? "default" : "ghost"}
                      className={`w-full justify-start h-auto p-3 ${
                        feature.isPremium && !feature.available 
                          ? 'opacity-50 cursor-not-allowed' 
                          : ''
                      }`}
                      onClick={() => handleFeatureSelect(feature.id)}
                      disabled={feature.isPremium && !feature.available}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          {feature.icon}
                          <div className="text-left">
                            <div className="font-medium text-sm">{feature.name}</div>
                            {feature.isPremium && (
                              <div className="text-xs text-orange-600">
                                {feature.credits} credits
                              </div>
                            )}
                          </div>
                        </div>
                        {feature.isPremium && (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 text-xs">
                            Premium
                          </Badge>
                        )}
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Chat Interface */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {selectedFeatureData?.icon}
                  {selectedFeatureData?.name} Mode
                  {selectedFeatureData?.isPremium && (
                    <Badge className="bg-orange-100 text-orange-800 text-xs">
                      Premium Active
                    </Badge>
                  )}
                </CardTitle>
                
                {/* Voice Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={isListening ? "default" : "outline"}
                    size="sm"
                    onClick={toggleListening}
                    className={isListening ? 'bg-red-500 hover:bg-red-600' : ''}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant={isSpeaking ? "default" : "outline"}
                    size="sm"
                    onClick={toggleSpeaking}
                  >
                    {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                {selectedFeatureData?.description}
              </p>
            </CardHeader>
            
            <CardContent>
              {/* Chat Messages */}
              <div className="h-96 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-4 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Input Area */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question or use voice..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Enhanced24x7TutorPage;
