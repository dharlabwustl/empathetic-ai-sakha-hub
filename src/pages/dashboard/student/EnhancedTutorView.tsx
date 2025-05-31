
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  Search, 
  Brain, 
  Zap, 
  Eye, 
  CreditCard,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'audio' | '3d' | 'visual' | 'insight';
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
      content: "Hi! I'm your 24/7 AI Tutor. I can help you with concepts, create 3D models, generate interactive visuals, and provide insights. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<string>('search');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userCredits, setUserCredits] = useState(50); // Mock credits
  const [isTyping, setIsTyping] = useState(false);
  
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const tutorFeatures: TutorFeature[] = [
    {
      id: 'search',
      name: 'Search',
      icon: <Search className="h-4 w-4" />,
      description: 'Search through concepts and topics',
      isPremium: false,
      credits: 0
    },
    {
      id: 'insights',
      name: 'Create Insights',
      icon: <Brain className="h-4 w-4" />,
      description: 'Generate learning insights and analysis',
      isPremium: false,
      credits: 0
    },
    {
      id: '3d-models',
      name: 'Create 3D Models',
      icon: <Zap className="h-4 w-4" />,
      description: 'Generate interactive 3D models',
      isPremium: true,
      credits: 5
    },
    {
      id: 'interactive-visual',
      name: 'Interactive Visuals',
      icon: <Eye className="h-4 w-4" />,
      description: 'Create interactive visual explanations',
      isPremium: true,
      credits: 3
    }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
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
        toast({
          title: "Voice recognition error",
          description: "Please try speaking again",
          variant: "destructive"
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      toast({
        title: "Voice recognition not supported",
        description: "Please type your message instead",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleFeatureSelect = (featureId: string) => {
    setSelectedFeature(featureId);
    const feature = tutorFeatures.find(f => f.id === featureId);
    
    if (feature?.isPremium && userCredits < feature.credits) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${feature.credits} credits for this feature. Purchase more credits to continue.`,
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: `Feature Selected: ${feature?.name}`,
      description: feature?.description,
    });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const feature = tutorFeatures.find(f => f.id === selectedFeature);
    
    // Check credits for premium features
    if (feature?.isPremium && userCredits < feature.credits) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${feature.credits} credits for this feature.`,
        variant: "destructive"
      });
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Deduct credits for premium features
    if (feature?.isPremium) {
      setUserCredits(prev => prev - feature.credits);
    }

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      
      let aiResponse = '';
      let responseType: Message['type'] = 'text';
      
      switch (selectedFeature) {
        case 'search':
          aiResponse = `I found several concepts related to "${inputMessage}". Here are the key points: 1) Definition and basic principles, 2) Real-world applications, 3) Common misconceptions. Would you like me to elaborate on any of these?`;
          break;
        case 'insights':
          aiResponse = `Based on your question about "${inputMessage}", here are some insights: This topic connects to your weaker areas in chemistry. I recommend focusing on the fundamental concepts first, then moving to applications. Your learning pattern suggests you understand this better with visual examples.`;
          break;
        case '3d-models':
          aiResponse = `I'm generating a 3D model for "${inputMessage}". This interactive model will help you visualize the molecular structure and understand the spatial relationships. You can rotate, zoom, and explore different perspectives to enhance your understanding.`;
          responseType = '3d';
          break;
        case 'interactive-visual':
          aiResponse = `Creating an interactive visual explanation for "${inputMessage}". This will include animated diagrams, step-by-step breakdowns, and interactive elements you can manipulate to see how changes affect the outcome.`;
          responseType = 'visual';
          break;
        default:
          aiResponse = `I understand you're asking about "${inputMessage}". Let me provide a comprehensive explanation with examples and practice questions to help you master this concept.`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: responseType
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the AI response
      speakMessage(aiResponse);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-6xl mx-auto p-4">
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              24/7 AI Tutor
            </CardTitle>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <CreditCard className="h-3 w-3" />
                {userCredits} Credits
              </Badge>
              <Button variant="outline" size="sm">
                Buy Credits
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Feature Selection */}
      <Card className="mb-4">
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {tutorFeatures.map((feature) => (
              <Button
                key={feature.id}
                variant={selectedFeature === feature.id ? "default" : "outline"}
                size="sm"
                className={`flex items-center gap-2 ${feature.isPremium ? 'border-purple-300' : ''}`}
                onClick={() => handleFeatureSelect(feature.id)}
                disabled={feature.isPremium && userCredits < feature.credits}
              >
                {feature.icon}
                {feature.name}
                {feature.isPremium && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {feature.credits} credits
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          {tutorFeatures.find(f => f.id === selectedFeature) && (
            <p className="text-sm text-gray-600 mt-2">
              {tutorFeatures.find(f => f.id === selectedFeature)?.description}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="flex-1 mb-4">
        <CardContent className="h-full p-4">
          <div className="h-full overflow-y-auto space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
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
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.sender === 'ai' && (
                      <div className="flex items-center gap-1">
                        {message.type && message.type !== 'text' && (
                          <Badge variant="outline" className="text-xs">
                            {message.type}
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => speakMessage(message.content)}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Input Area */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your studies..."
                className="min-h-[60px] resize-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant={isListening ? "destructive" : "outline"}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant={isSpeaking ? "destructive" : "outline"}
                onClick={isSpeaking ? stopSpeaking : () => {}}
                disabled={!isSpeaking}
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button size="sm" onClick={sendMessage} disabled={!inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedTutorView;
