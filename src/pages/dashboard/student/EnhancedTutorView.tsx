
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Mic, MicOff, Send, Search, Cube, BarChart3, Lightbulb, Volume2, VolumeX, Crown, CreditCard, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'search' | '3d-model' | 'visual' | 'insight';
}

const EnhancedTutorView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('text');
  const [userCredits, setUserCredits] = useState(50); // Mock user credits
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const features = [
    { id: 'text', label: 'Text Chat', icon: Brain, free: true, cost: 0 },
    { id: 'search', label: 'Smart Search', icon: Search, free: true, cost: 0 },
    { id: '3d-model', label: '3D Models', icon: Cube, free: false, cost: 5 },
    { id: 'visual', label: 'Interactive Visual', icon: BarChart3, free: false, cost: 3 },
    { id: 'insight', label: 'Deep Insights', icon: Lightbulb, free: true, cost: 0 }
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const selectedFeatureObj = features.find(f => f.id === selectedFeature);
    
    // Check credits for premium features
    if (!selectedFeatureObj?.free && userCredits < selectedFeatureObj?.cost!) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${selectedFeatureObj?.cost} credits for this feature. Purchase more credits to continue.`,
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      type: selectedFeature as any
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Deduct credits for premium features
    if (!selectedFeatureObj?.free) {
      setUserCredits(prev => prev - selectedFeatureObj?.cost!);
    }

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        text: "I understand your question about this concept. Let me break it down for you...",
        search: "Here are the most relevant study materials I found for your query...",
        '3d-model': "I've created an interactive 3D model to help visualize this concept. You can rotate and explore it below.",
        visual: "Here's an interactive visualization that shows the relationship between these variables...",
        insight: "Based on your learning pattern, here are some deep insights about this topic..."
      };

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[selectedFeature as keyof typeof responses],
        timestamp: new Date(),
        type: selectedFeature as any
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);

      // Text-to-speech for responses
      if (isSpeaking) {
        speakText(assistantMessage.content);
      }
    }, 1500);
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Failed to recognize speech. Please try again.",
          variant: "destructive"
        });
      };

      recognition.start();
    } else {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive"
      });
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      // Use a female voice if available
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Samantha'));
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const purchaseCredits = () => {
    // Simulate credit purchase
    setUserCredits(prev => prev + 100);
    toast({
      title: "Credits Purchased!",
      description: "100 credits have been added to your account.",
    });
  };

  const getFeatureIcon = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    const Icon = feature?.icon || Brain;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-blue-900/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Brain className="h-8 w-8" />
                  <div>
                    <h1 className="text-2xl font-bold">24/7 AI Tutor</h1>
                    <p className="text-purple-100">Your personal learning companion with advanced features</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    <span className="font-semibold">{userCredits} Credits</span>
                  </div>
                  <Button 
                    onClick={purchaseCredits}
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30"
                  >
                    <Crown className="h-4 w-4 mr-1" />
                    Buy Credits
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Feature Selection Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {features.map((feature) => (
                  <Button
                    key={feature.id}
                    variant={selectedFeature === feature.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedFeature(feature.id)}
                  >
                    <feature.icon className="h-4 w-4 mr-2" />
                    <span className="flex-1 text-left">{feature.label}</span>
                    {!feature.free && (
                      <Badge variant="secondary" className="ml-2">
                        {feature.cost} <Zap className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Audio Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Audio Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant={isSpeaking ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setIsSpeaking(!isSpeaking)}
                >
                  {isSpeaking ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
                  {isSpeaking ? "Audio On" : "Audio Off"}
                </Button>
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
                <CardTitle className="flex items-center gap-2">
                  {getFeatureIcon(selectedFeature)}
                  {features.find(f => f.id === selectedFeature)?.label} Mode
                  {!features.find(f => f.id === selectedFeature)?.free && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      Premium
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {message.type && message.type !== 'text' && (
                              <Badge variant="secondary" className="text-xs">
                                {getFeatureIcon(message.type)}
                                <span className="ml-1">{features.find(f => f.id === message.type)?.label}</span>
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm">{message.content}</p>
                          {message.type === '3d-model' && message.role === 'assistant' && (
                            <div className="mt-2 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded border">
                              <div className="text-center text-sm text-gray-600">
                                🎯 Interactive 3D Model would appear here
                              </div>
                            </div>
                          )}
                          {message.type === 'visual' && message.role === 'assistant' && (
                            <div className="mt-2 p-4 bg-gradient-to-r from-blue-100 to-green-100 rounded border">
                              <div className="text-center text-sm text-gray-600">
                                📊 Interactive Visualization would appear here
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent"></div>
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="flex-shrink-0 space-y-3">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Textarea
                        placeholder="Ask me anything about your studies..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-[60px] resize-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant={isListening ? "default" : "outline"}
                        size="icon"
                        onClick={startListening}
                        disabled={isListening}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isLoading}
                        size="icon"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTutorView;
