
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Search, Brain, Zap, Eye, BarChart3, ShoppingCart, Star, Sparkles, Send, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  id: string;
}

const Enhanced24x7TutorPage: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('chat');
  const [userCredits, setUserCredits] = useState(15);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your 24/7 AI Tutor. I can help you with studying, practice questions, and advanced features. What would you like to work on today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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
      id: Date.now().toString(),
      role: 'assistant',
      content: `Switched to ${feature?.name} mode. ${feature?.description}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response
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
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[selectedFeature as keyof typeof responses] || 'How can I assist you today?',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

  const selectedFeatureData = features.find(f => f.id === selectedFeature);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
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
            <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Credits
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Feature Selection Panel */}
          <Card className="lg:col-span-1 h-fit">
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
                      } ${selectedFeature === feature.id ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-purple-50'}`}
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
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 text-xs border-orange-200">
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
                    variant={isListening ? "destructive" : "outline"}
                    size="sm"
                    onClick={toggleListening}
                    className={isListening ? 'animate-pulse' : ''}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    {isListening ? 'Listening...' : 'Voice'}
                  </Button>
                  
                  <Button
                    variant={isSpeaking ? "default" : "outline"}
                    size="sm"
                    onClick={toggleSpeaking}
                    className={isSpeaking ? 'animate-pulse' : ''}
                  >
                    {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    {isSpeaking ? 'Mute' : 'Audio'}
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
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mb-4 ${
                        message.role === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-1">
                        {message.role === 'assistant' && (
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <Bot className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div
                            className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.role === 'user'
                                ? 'bg-purple-600 text-white ml-auto'
                                : 'bg-white border border-gray-200 shadow-sm'
                            }`}
                          >
                            {message.content}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                        {message.role === 'user' && (
                          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                            <User className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 mb-4"
                  >
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Input Area */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question or use voice..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Audio Status Indicators */}
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  {isListening && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span>Voice input active</span>
                    </div>
                  )}
                  {isSpeaking && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Audio output enabled</span>
                    </div>
                  )}
                </div>
                <div>
                  Press Enter to send or use voice commands
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Enhanced24x7TutorPage;
