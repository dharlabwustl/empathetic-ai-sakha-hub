
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Search, Brain, Zap, Eye, BarChart3, ShoppingCart, Star, Sparkles, Send, BookOpen, Target, Users } from 'lucide-react';
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
      content: 'Hello! I\'m your 24/7 AI Tutor for world-class exam preparation. I can help you with studying, practice questions, and advanced features. What would you like to work on today?',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-30"></div>
                <Brain className="h-10 w-10 text-purple-600 relative z-10" />
              </motion.div>
              24/7 AI Tutor
              <Badge className="bg-gradient-to-r from-gold-400 to-yellow-500 text-black text-xs px-2 py-1">
                World Class
              </Badge>
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Your personal AI learning companion for exam excellence</p>
            
            {/* Key Features Preview */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1 text-sm text-purple-600">
                <BookOpen className="h-4 w-4" />
                <span>Comprehensive Study</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <Target className="h-4 w-4" />
                <span>Exam Focused</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <Users className="h-4 w-4" />
                <span>Expert Guidance</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 text-sm">
                <Star className="h-4 w-4 mr-1" />
                {userCredits} Credits
              </Badge>
            </motion.div>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Credits
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Feature Selection Panel */}
          <Card className="lg:col-span-1 border-2 border-purple-100 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
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
                          <div className="p-1 rounded bg-white/20">
                            {feature.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-sm">{feature.name}</div>
                            <div className="text-xs opacity-80">{feature.description}</div>
                            {feature.isPremium && (
                              <div className="text-xs text-orange-600 dark:text-orange-400">
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

          {/* Enhanced Main Chat Interface */}
          <Card className="lg:col-span-3 border-2 border-blue-100 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {selectedFeatureData?.icon}
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedFeatureData?.name} Mode
                      {selectedFeatureData?.isPremium && (
                        <Badge className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 text-xs">
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
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant={isListening ? "default" : "outline"}
                      size="sm"
                      onClick={toggleListening}
                      className={`relative ${
                        isListening 
                          ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white' 
                          : 'hover:bg-red-50'
                      }`}
                    >
                      {isListening && (
                        <motion.div 
                          className="absolute inset-0 bg-red-400 rounded opacity-30"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant={isSpeaking ? "default" : "outline"}
                      size="sm"
                      onClick={toggleSpeaking}
                      className={
                        isSpeaking 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white' 
                          : 'hover:bg-green-50'
                      }
                    >
                      {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* Enhanced Chat Messages */}
              <div className="h-[500px] bg-gradient-to-b from-gray-50 to-white rounded-xl p-6 mb-6 overflow-y-auto border shadow-inner">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`mb-6 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block max-w-md px-6 py-4 rounded-2xl shadow-lg ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-purple-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Enhanced Input Area */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your question or use voice..."
                    className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-lg"
                  />
                  {isListening && (
                    <motion.div 
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </motion.div>
                  )}
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={handleSendMessage} 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-4 rounded-xl shadow-lg"
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
