
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Search, Brain, Zap, Eye, BarChart3, ShoppingCart, Star, Sparkles, Send, Clock } from 'lucide-react';
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
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Enhanced24x7TutorView: React.FC = () => {
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
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const selectedFeatureData = features.find(f => f.id === selectedFeature);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Brain className="h-10 w-10 text-purple-600" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-purple-300"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.3, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              24/7 AI Tutor
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Your world-class exam preparation companion</p>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 text-sm font-semibold">
                <Star className="h-4 w-4 mr-2" />
                {userCredits} Credits
              </Badge>
              {userCredits < 5 && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none hover:from-orange-600 hover:to-red-600">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy Credits
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Feature Selection Panel */}
          <Card className="lg:col-span-1 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="text-lg flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
                Features
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={selectedFeature === feature.id ? "default" : "ghost"}
                      className={`w-full justify-start h-auto p-4 rounded-xl transition-all duration-300 ${
                        selectedFeature === feature.id 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                          : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50'
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
                          <motion.div
                            animate={selectedFeature === feature.id ? { rotate: 360 } : {}}
                            transition={{ duration: 2 }}
                          >
                            {feature.icon}
                          </motion.div>
                          <div className="text-left">
                            <div className="font-semibold text-sm">{feature.name}</div>
                            <div className="text-xs opacity-80">{feature.description}</div>
                            {feature.isPremium && (
                              <div className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                                {feature.credits} credits
                              </div>
                            )}
                          </div>
                        </div>
                        {feature.isPremium && (
                          <Badge variant="outline" className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-xs border-orange-300">
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
          <Card className="lg:col-span-3 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {selectedFeatureData?.icon}
                  </motion.div>
                  {selectedFeatureData?.name} Mode
                  {selectedFeatureData?.isPremium && (
                    <Badge className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 text-xs">
                      Premium Active
                    </Badge>
                  )}
                </CardTitle>
                
                {/* Enhanced Voice Controls */}
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant={isListening ? "default" : "outline"}
                      size="sm"
                      onClick={toggleListening}
                      className={`relative ${isListening ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white border-white/50'}`}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      {isListening && (
                        <motion.div
                          className="absolute inset-0 rounded-md border-2 border-red-300"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.3, 0.7] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant={isSpeaking ? "default" : "outline"}
                      size="sm"
                      onClick={toggleSpeaking}
                      className={`relative ${isSpeaking ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white border-white/50'}`}
                    >
                      {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      {isSpeaking && (
                        <motion.div
                          className="absolute inset-0 rounded-md border-2 border-green-300"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.4, 0.8] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              <p className="text-sm opacity-90 mt-2">
                {selectedFeatureData?.description}
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* Enhanced Chat Messages */}
              <div className="h-96 bg-gradient-to-b from-gray-50 to-white rounded-xl p-6 mb-6 overflow-y-auto border border-gray-100">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`mb-6 ${
                        message.role === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div className="flex items-end gap-2">
                        {message.role === 'assistant' && (
                          <motion.div
                            className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          >
                            <Brain className="h-4 w-4 text-white" />
                          </motion.div>
                        )}
                        
                        <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-xs lg:max-w-md`}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={`px-6 py-3 rounded-2xl shadow-lg ${
                              message.role === 'user'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : 'bg-white border border-gray-200 text-gray-800'
                            }`}
                          >
                            {message.content}
                          </motion.div>
                          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                        
                        {message.role === 'user' && (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">U</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 mb-4"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Enhanced Input Area */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question or use voice..."
                  className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={handleSendMessage} 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg"
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
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

export default Enhanced24x7TutorView;
