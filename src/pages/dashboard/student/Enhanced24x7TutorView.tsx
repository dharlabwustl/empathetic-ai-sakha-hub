
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  Search, 
  Brain, 
  Zap, 
  Eye, 
  BarChart3, 
  ShoppingCart, 
  Star, 
  Sparkles,
  Send,
  Clock,
  User,
  Bot,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface TutorFeature {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isPremium: boolean;
  credits?: number;
  available: boolean;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Enhanced24x7TutorView: React.FC = () => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('chat');
  const [userCredits, setUserCredits] = useState(15);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your 24/7 AI Tutor powered by advanced AI technology. I can help you with studying, practice questions, and advanced learning features. What would you like to work on today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const features: TutorFeature[] = [
    {
      id: 'chat',
      name: 'Chat',
      icon: <MessageCircle className="h-4 w-4" />,
      description: 'Basic tutoring conversation with AI',
      isPremium: false,
      available: true
    },
    {
      id: 'search',
      name: 'Search',
      icon: <Search className="h-4 w-4" />,
      description: 'Search through study materials instantly',
      isPremium: false,
      available: true
    },
    {
      id: 'insights',
      name: 'Insights',
      icon: <Brain className="h-4 w-4" />,
      description: 'Get personalized study insights & analytics',
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
      description: 'Dynamic visual explanations & diagrams',
      isPremium: true,
      credits: 3,
      available: userCredits >= 3
    },
    {
      id: 'advanced-analysis',
      name: 'Advanced Analysis',
      icon: <BarChart3 className="h-4 w-4" />,
      description: 'Deep performance analysis & predictions',
      isPremium: true,
      credits: 5,
      available: userCredits >= 5
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFeatureSelect = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    if (feature?.isPremium && !feature.available) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${feature.credits} credits to use ${feature.name}. Purchase more credits to continue.`,
        variant: "destructive"
      });
      return;
    }
    
    if (feature?.isPremium && feature.credits) {
      setUserCredits(prev => prev - feature.credits!);
      toast({
        title: "Feature Activated",
        description: `${feature.name} mode activated. ${feature.credits} credits deducted.`,
      });
    }
    
    setSelectedFeature(featureId);
    
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Switched to ${feature?.name} mode. ${feature?.description}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response with delay
    setTimeout(() => {
      const responses = {
        'chat': [
          'I can help you understand this concept better. What specific part would you like me to explain?',
          'Great question! Let me break this down for you step by step.',
          'I understand you\'re working on this topic. Here\'s what I recommend focusing on...'
        ],
        'search': [
          'I found several relevant materials for your query. Let me show you the most important ones.',
          'Here are the top search results from our comprehensive study database.',
          'I\'ve located some excellent resources that match your search criteria.'
        ],
        'insights': [
          'Based on your study patterns, I recommend focusing on these weak areas first.',
          'Your performance data shows great improvement in this subject area.',
          'Here are some personalized insights based on your learning analytics.'
        ],
        '3d-models': [
          'Loading interactive 3D model... This will help visualize the molecular structure.',
          'Here\'s a 3D representation that will make this concept much clearer.',
          'Let me show you this concept through an interactive 3D visualization.'
        ],
        'interactive-visuals': [
          'Creating dynamic visual explanation... This diagram will show the process step by step.',
          'Here\'s an interactive visualization that breaks down this complex topic.',
          'Watch this animated diagram that explains the concept in detail.'
        ],
        'advanced-analysis': [
          'Performing deep analysis... Your performance indicates these specific improvement areas.',
          'Based on advanced analytics, here are your personalized recommendations.',
          'Deep learning analysis shows these patterns in your study behavior.'
        ]
      };
      
      const featureResponses = responses[selectedFeature as keyof typeof responses] || responses.chat;
      const randomResponse = featureResponses[Math.floor(Math.random() * featureResponses.length)];
      
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice Input Active",
        description: "Listening for your voice input...",
      });
    } else {
      toast({
        title: "Voice Input Stopped",
        description: "Voice input has been deactivated.",
      });
    }
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    if (!isSpeaking) {
      toast({
        title: "Voice Output Enabled",
        description: "AI responses will be spoken aloud.",
      });
    } else {
      toast({
        title: "Voice Output Disabled",
        description: "AI responses will be text-only.",
      });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const selectedFeatureData = features.find(f => f.id === selectedFeature);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 mb-6 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <motion.h1 
                className="text-4xl font-bold text-white flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"
                >
                  <Brain className="h-8 w-8 text-white" />
                </motion.div>
                24/7 AI Tutor
              </motion.h1>
              <motion.p 
                className="text-blue-100 mt-2 text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                World-class exam preparation with advanced AI technology
              </motion.p>
            </div>
            
            <div className="flex items-center gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Badge className="bg-white/20 text-white px-4 py-2 text-lg backdrop-blur-sm border border-white/30">
                  <Star className="h-4 w-4 mr-2" />
                  {userCredits} Credits
                </Badge>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Buy Credits
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Feature Selection Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center gap-3">
                  <Sparkles className="h-6 w-6" />
                  AI Features
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={selectedFeature === feature.id ? "default" : "ghost"}
                        className={`w-full justify-start h-auto p-4 text-left ${
                          selectedFeature === feature.id 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                            : 'hover:bg-purple-50'
                        } ${
                          feature.isPremium && !feature.available 
                            ? 'opacity-60 cursor-not-allowed' 
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
                                : feature.isPremium 
                                  ? 'bg-orange-100 text-orange-600'
                                  : 'bg-purple-100 text-purple-600'
                            }`}>
                              {feature.icon}
                            </div>
                            <div>
                              <div className="font-semibold text-sm">{feature.name}</div>
                              <div className={`text-xs ${
                                selectedFeature === feature.id ? 'text-white/80' : 'text-gray-500'
                              }`}>
                                {feature.description}
                              </div>
                              {feature.isPremium && (
                                <div className="text-xs text-orange-600 font-medium mt-1">
                                  {feature.credits} credits required
                                </div>
                              )}
                            </div>
                          </div>
                          {feature.isPremium && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                selectedFeature === feature.id 
                                  ? 'border-white/30 text-white/80' 
                                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-0'
                              }`}
                            >
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
          </motion.div>

          {/* Enhanced Main Chat Interface */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm h-[600px] flex flex-col">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    {selectedFeatureData?.icon}
                    {selectedFeatureData?.name} Mode
                    {selectedFeatureData?.isPremium && (
                      <Badge className="bg-orange-500 text-white text-xs ml-2">
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
                        variant={isListening ? "default" : "secondary"}
                        size="sm"
                        onClick={toggleListening}
                        className={`relative ${
                          isListening 
                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {isListening ? (
                          <>
                            <MicOff className="h-4 w-4" />
                            <motion.div
                              className="absolute inset-0 rounded border-2 border-red-300"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          </>
                        ) : (
                          <Mic className="h-4 w-4" />
                        )}
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant={isSpeaking ? "default" : "secondary"}
                        size="sm"
                        onClick={toggleSpeaking}
                        className={`relative ${
                          isSpeaking 
                            ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {isSpeaking ? (
                          <>
                            <Volume2 className="h-4 w-4" />
                            <motion.div
                              className="absolute inset-0 rounded border-2 border-green-300"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </>
                        ) : (
                          <VolumeX className="h-4 w-4" />
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </div>
                
                <p className="text-blue-100 text-sm mt-2">
                  {selectedFeatureData?.description}
                </p>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Enhanced Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start gap-3 max-w-[80%] ${
                          message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}>
                          <div className={`p-2 rounded-full shadow-lg ${
                            message.role === 'user' 
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                              : 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                          }`}>
                            {message.role === 'user' ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          
                          <div className={`flex flex-col ${
                            message.role === 'user' ? 'items-end' : 'items-start'
                          }`}>
                            <div
                              className={`px-4 py-3 rounded-2xl shadow-lg ${
                                message.role === 'user'
                                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                                  : 'bg-white border border-gray-200 text-gray-800'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Typing Indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-lg">
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                              <span className="text-sm text-gray-500">AI is thinking...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Enhanced Input Area */}
                <div className="p-6 bg-white border-t border-gray-200">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your question or use voice input..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 transition-all duration-200"
                        disabled={isTyping}
                      />
                      {isListening && (
                        <motion.div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        </motion.div>
                      )}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-emerald-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-emerald-800">Session Progress</span>
                <span className="text-sm text-emerald-600">{messages.length} messages exchanged</span>
              </div>
              <Progress value={(messages.length / 20) * 100} className="h-2" />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Enhanced24x7TutorView;
