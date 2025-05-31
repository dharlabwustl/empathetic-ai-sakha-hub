
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Search, Brain, Zap, Eye, BarChart3, ShoppingCart, Star, Sparkles, Send, Bot, User } from 'lucide-react';
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
      content: 'Hello! I\'m your 24/7 AI Tutor powered by PREPZR AI. I can help you with studying, practice questions, and advanced features. What would you like to work on today?',
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
      description: 'Basic tutoring conversation and Q&A',
      isPremium: false,
      available: true
    },
    {
      id: 'search',
      name: 'Search',
      icon: <Search className="h-4 w-4" />,
      description: 'Search through study materials and concepts',
      isPremium: false,
      available: true
    },
    {
      id: 'insights',
      name: 'Insights',
      icon: <Brain className="h-4 w-4" />,
      description: 'Get personalized study insights and recommendations',
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
      description: 'Dynamic visual explanations and diagrams',
      isPremium: true,
      credits: 3,
      available: userCredits >= 3
    },
    {
      id: 'advanced-analysis',
      name: 'Advanced Analysis',
      icon: <BarChart3 className="h-4 w-4" />,
      description: 'Deep performance analysis and predictions',
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
        'chat': 'I can help you understand this concept better. What specific part would you like me to explain in detail?',
        'search': 'I found several relevant materials for your query. Here are the most important concepts and practice questions.',
        'insights': 'Based on your study patterns, I recommend focusing on these weak areas first. Your performance shows improvement opportunities in molecular chemistry.',
        '3d-models': '🔬 Loading interactive 3D model... This will help visualize the molecular structure and chemical bonds in detail.',
        'interactive-visuals': '📊 Creating dynamic visual explanation... This diagram will show the process step by step with interactive elements.',
        'advanced-analysis': '📈 Performing deep analysis... Your performance indicates specific improvement areas. Here\'s your detailed performance breakdown.'
      };
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[selectedFeature as keyof typeof responses] || 'How can I assist you with your studies today?',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Start voice recognition
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: '🎤 I\'m listening... Please speak your question.',
        timestamp: new Date()
      }]);
    }
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedFeatureData = features.find(f => f.id === selectedFeature);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            >
              <Brain className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                24/7 AI Tutor
                <Badge className="bg-green-100 text-green-800 text-sm">
                  PREPZR AI Powered
                </Badge>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Your intelligent learning companion with advanced AI capabilities</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-lg font-semibold">
                <Star className="h-4 w-4 mr-2" />
                {userCredits} Credits
              </Badge>
            </motion.div>
            <Button variant="outline" size="lg" className="hover:bg-purple-50">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Buy More Credits
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Enhanced Feature Selection Panel */}
          <Card className="xl:col-span-1 shadow-lg border-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-xl flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-purple-600" />
                AI Features
              </CardTitle>
              <p className="text-sm text-gray-600">Select your learning mode</p>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {features.map((feature) => (
                  <motion.div
                    key={feature.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={selectedFeature === feature.id ? "default" : "ghost"}
                      className={`w-full justify-start h-auto p-4 ${
                        selectedFeature === feature.id 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md' 
                          : 'hover:bg-gray-50'
                      } ${
                        feature.isPremium && !feature.available 
                          ? 'opacity-50 cursor-not-allowed' 
                          : ''
                      }`}
                      onClick={() => handleFeatureSelect(feature.id)}
                      disabled={feature.isPremium && !feature.available}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            selectedFeature === feature.id 
                              ? 'bg-white/20' 
                              : 'bg-gray-100'
                          }`}>
                            {feature.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-sm">{feature.name}</div>
                            <div className="text-xs opacity-80 mt-1">{feature.description}</div>
                            {feature.isPremium && (
                              <div className="text-xs mt-1 font-medium">
                                💎 {feature.credits} credits
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

          {/* Enhanced Main Chat Interface */}
          <Card className="xl:col-span-3 shadow-lg border-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    {selectedFeatureData?.icon}
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedFeatureData?.name} Mode
                      {selectedFeatureData?.isPremium && (
                        <Badge className="bg-orange-100 text-orange-800 text-xs">
                          Premium Active
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedFeatureData?.description}
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Voice Controls */}
                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={isListening ? "default" : "outline"}
                      size="lg"
                      onClick={toggleListening}
                      className={`${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'hover:bg-gray-50'}`}
                    >
                      {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={isSpeaking ? "default" : "outline"}
                      size="lg"
                      onClick={toggleSpeaking}
                      className={`${isSpeaking ? 'bg-blue-500 hover:bg-blue-600 animate-pulse' : 'hover:bg-gray-50'}`}
                    >
                      {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* Enhanced Chat Messages */}
              <div className="h-[500px] bg-gradient-to-b from-gray-50 to-white rounded-xl p-6 mb-6 overflow-y-auto border border-gray-100">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mb-6 ${
                        message.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                      }`}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <div className={`p-2 rounded-full ${
                          message.role === 'user' 
                            ? 'bg-purple-100' 
                            : 'bg-gradient-to-r from-blue-100 to-purple-100'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="h-5 w-5 text-purple-600" />
                          ) : (
                            <Bot className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div
                          className={`px-6 py-4 rounded-2xl shadow-sm ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                              : 'bg-white border border-gray-200'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start mb-6"
                  >
                    <div className="flex items-start gap-3 max-w-[80%]">
                      <div className="p-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100">
                        <Bot className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="px-6 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Enhanced Input Area */}
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your studies..."
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                  {isListening && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={handleSendMessage} 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg"
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Enhanced24x7TutorPage;
