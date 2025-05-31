
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  Search, 
  Brain, 
  Box, 
  Eye, 
  TrendingUp,
  Volume2,
  VolumeX,
  CreditCard,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  feature?: string;
}

interface TutorFeature {
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
      text: 'Hello! I\'m your 24/7 AI Tutor. I can help you with concepts, create 3D models, interactive visuals, generate insights, and answer any questions you have about your studies.',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<string>('search');
  const [userCredits, setUserCredits] = useState(50);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const features: TutorFeature[] = [
    {
      id: 'search',
      name: 'Search & Chat',
      icon: <Search className="h-4 w-4" />,
      description: 'Ask questions and get instant answers',
      isPremium: false,
      credits: 0
    },
    {
      id: 'insights',
      name: 'Generate Insights',
      icon: <Brain className="h-4 w-4" />,
      description: 'Get personalized learning insights',
      isPremium: false,
      credits: 0
    },
    {
      id: '3d-models',
      name: '3D Models',
      icon: <Box className="h-4 w-4" />,
      description: 'Create interactive 3D visualizations',
      isPremium: true,
      credits: 5
    },
    {
      id: 'interactive-visual',
      name: 'Interactive Visuals',
      icon: <Eye className="h-4 w-4" />,
      description: 'Generate interactive learning materials',
      isPremium: true,
      credits: 3
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const selectedFeatureData = features.find(f => f.id === selectedFeature);
    
    // Check credits for premium features
    if (selectedFeatureData?.isPremium && userCredits < selectedFeatureData.credits) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${selectedFeatureData.credits} credits for this feature. Purchase more credits to continue.`,
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      feature: selectedFeature
    };

    setMessages(prev => [...prev, userMessage]);

    // Deduct credits for premium features
    if (selectedFeatureData?.isPremium) {
      setUserCredits(prev => prev - selectedFeatureData.credits);
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText, selectedFeature);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

      // Text-to-speech for AI responses
      if (isAudioEnabled) {
        speakText(aiResponse);
      }
    }, 1000);

    setInputText('');
  };

  const generateAIResponse = (input: string, feature: string): string => {
    switch (feature) {
      case 'search':
        return `I found information about "${input}". Here's what you need to know: This concept is fundamental to understanding the broader topic. Would you like me to explain it in more detail or provide examples?`;
      case 'insights':
        return `Based on your query about "${input}", here are some key insights: This topic connects to several other concepts in your syllabus. I recommend focusing on the practical applications and working through example problems.`;
      case '3d-models':
        return `I've created a 3D model for "${input}". You can now interact with the model to visualize the concept from different angles. This will help you understand the spatial relationships and structure better.`;
      case 'interactive-visual':
        return `I've generated an interactive visual for "${input}". You can manipulate the parameters to see how changes affect the outcome. This hands-on approach will deepen your understanding.`;
      default:
        return `I understand you're asking about "${input}". Let me help you with that concept.`;
    }
  };

  const speakText = (text: string) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Speech Recognition Error",
          description: "Please try again or check your microphone permissions.",
          variant: "destructive"
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="h-8 w-8" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-bold">24/7 AI Tutor</h1>
                    <p className="text-purple-100">Your intelligent learning companion</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="font-medium">{userCredits} Credits</span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Buy Credits
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Feature Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Feature</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {features.map((feature) => (
                  <motion.div
                    key={feature.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={selectedFeature === feature.id ? "default" : "outline"}
                      className={`w-full justify-start h-auto p-3 ${
                        selectedFeature === feature.id 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : ''
                      }`}
                      onClick={() => setSelectedFeature(feature.id)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        {feature.icon}
                        <div className="text-left flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{feature.name}</span>
                            {feature.isPremium && (
                              <Badge variant="secondary" className="text-xs">
                                {feature.credits} credits
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Chat with AI Tutor</span>
                    <Badge variant="outline">
                      {features.find(f => f.id === selectedFeature)?.name}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  >
                    {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        {message.feature && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {features.find(f => f.id === message.feature)?.name}
                          </Badge>
                        )}
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="flex-shrink-0 p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your studies..."
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={startListening}
                    disabled={isListening}
                    className={isListening ? 'bg-red-100' : ''}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTutorView;
