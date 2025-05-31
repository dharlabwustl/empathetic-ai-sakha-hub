
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  Search, 
  Cube, 
  Eye, 
  BarChart3,
  CreditCard,
  VolumeX,
  Volume2,
  Sparkles,
  Zap,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  feature?: string;
}

interface Feature {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isPremium: boolean;
  credits: number;
}

const EnhancedTutorView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your 24/7 AI Tutor. I can help you with search, create 3D models, interactive visuals, and provide insights. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [userCredits, setUserCredits] = useState(50);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const features: Feature[] = [
    {
      id: 'search',
      name: 'Search',
      icon: <Search className="h-4 w-4" />,
      description: 'Search through study materials and concepts',
      isPremium: false,
      credits: 0
    },
    {
      id: 'insights',
      name: 'Insights',
      icon: <BarChart3 className="h-4 w-4" />,
      description: 'Get personalized study insights and analytics',
      isPremium: false,
      credits: 0
    },
    {
      id: '3d-models',
      name: '3D Models',
      icon: <Cube className="h-4 w-4" />,
      description: 'Create interactive 3D models for complex concepts',
      isPremium: true,
      credits: 5
    },
    {
      id: 'interactive-visual',
      name: 'Interactive Visuals',
      icon: <Eye className="h-4 w-4" />,
      description: 'Generate interactive visualizations and diagrams',
      isPremium: true,
      credits: 3
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      feature: selectedFeature || undefined
    };

    setMessages(prev => [...prev, userMessage]);

    // Check if feature requires credits
    const feature = features.find(f => f.id === selectedFeature);
    if (feature?.isPremium && userCredits < feature.credits) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Sorry, you need ${feature.credits} credits to use ${feature.name}. You currently have ${userCredits} credits. Please purchase more credits to continue.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setInputMessage('');
      return;
    }

    // Deduct credits for premium features
    if (feature?.isPremium) {
      setUserCredits(prev => prev - feature.credits);
    }

    // Simulate AI response based on selected feature
    let aiResponse = '';
    switch (selectedFeature) {
      case 'search':
        aiResponse = `I found several resources related to "${inputMessage}". Here are the most relevant study materials and concepts.`;
        break;
      case 'insights':
        aiResponse = `Based on your query about "${inputMessage}", here are personalized insights: Your performance in this area shows room for improvement. I recommend focusing on practice problems.`;
        break;
      case '3d-models':
        aiResponse = `I'm creating a 3D model for "${inputMessage}". This interactive model will help you visualize the concept better. The model is being generated...`;
        break;
      case 'interactive-visual':
        aiResponse = `Generating interactive visualization for "${inputMessage}". This will include diagrams, animations, and interactive elements to enhance your understanding.`;
        break;
      default:
        aiResponse = `I understand you're asking about "${inputMessage}". Let me help you with that.`;
    }

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the AI response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
      }
    }, 1000);

    setInputMessage('');
  };

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        setIsListening(true);
        recognitionRef.current.start();
      }
    }
  };

  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleFeatureSelect = (featureId: string) => {
    setSelectedFeature(selectedFeature === featureId ? null : featureId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-purple-200 to-blue-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Brain className="h-6 w-6 text-purple-600" />
                </motion.div>
                <motion.span
                  animate={{ 
                    color: ["#7c3aed", "#2563eb", "#7c3aed"]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-xl font-bold"
                >
                  24/7 AI Tutor
                </motion.span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  <CreditCard className="h-3 w-3 mr-1" />
                  {userCredits} Credits
                </Badge>
                {isSpeaking && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStopSpeaking}
                    className="bg-red-50 hover:bg-red-100"
                  >
                    <VolumeX className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Feature Selection */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Select Feature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={selectedFeature === feature.id ? "default" : "outline"}
                    className={`w-full h-auto p-4 flex flex-col items-center gap-2 ${
                      selectedFeature === feature.id 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'hover:bg-purple-50'
                    }`}
                    onClick={() => handleFeatureSelect(feature.id)}
                  >
                    <div className="flex items-center gap-2">
                      {feature.icon}
                      {feature.isPremium && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                          {feature.credits} credits
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-medium">{feature.name}</span>
                    <span className="text-xs text-center opacity-75">
                      {feature.description}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="h-96">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-600" />
              Chat
              {selectedFeature && (
                <Badge className="bg-purple-100 text-purple-800">
                  Using: {features.find(f => f.id === selectedFeature)?.name}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-75 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={handleVoiceInput}
                className={`${isListening ? 'bg-red-100 hover:bg-red-200' : 'hover:bg-purple-50'}`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnhancedTutorView;
