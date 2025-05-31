
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Search, 
  Lightbulb, 
  Cube, 
  Image as ImageIcon, 
  BarChart3,
  MessageCircle,
  Coins,
  ShoppingCart,
  Sparkles,
  Bot,
  User,
  Headphones,
  Speaker
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feature?: string;
}

interface Feature {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  credits: number;
  isPremium: boolean;
}

const EnhancedTutorView: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userCredits, setUserCredits] = useState(15);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const features: Feature[] = [
    {
      id: 'chat',
      name: 'Chat',
      icon: <MessageCircle className="h-5 w-5" />,
      description: 'Basic AI conversation',
      credits: 0,
      isPremium: false
    },
    {
      id: 'search',
      name: 'Search',
      icon: <Search className="h-5 w-5" />,
      description: 'Advanced search capabilities',
      credits: 1,
      isPremium: false
    },
    {
      id: 'insights',
      name: 'Insights',
      icon: <Lightbulb className="h-5 w-5" />,
      description: 'Personalized study insights',
      credits: 1,
      isPremium: false
    },
    {
      id: '3d-models',
      name: '3D Models',
      icon: <Cube className="h-5 w-5" />,
      description: 'Interactive 3D visualizations',
      credits: 2,
      isPremium: true
    },
    {
      id: 'interactive-visuals',
      name: 'Interactive Visuals',
      icon: <ImageIcon className="h-5 w-5" />,
      description: 'Dynamic interactive diagrams',
      credits: 3,
      isPremium: true
    },
    {
      id: 'advanced-analysis',
      name: 'Advanced Analysis',
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Deep performance analytics',
      credits: 5,
      isPremium: true
    }
  ];

  useEffect(() => {
    // Add welcome message
    setMessages([{
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI tutor. I can help you with various learning tasks. Select a feature from above to get started!',
      timestamp: new Date()
    }]);
  }, []);

  const handleFeatureSelect = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    if (!feature) return;

    if (feature.isPremium && userCredits < feature.credits) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${feature.credits} credits for this feature. Purchase more credits to continue.`,
        variant: "destructive"
      });
      return;
    }

    setSelectedFeature(featureId);
    
    if (feature.credits > 0) {
      setUserCredits(prev => prev - feature.credits);
      toast({
        title: "Feature Activated",
        description: `${feature.name} activated. ${feature.credits} credits used.`,
      });
    }

    // Add system message about feature activation
    const systemMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: `${feature.name} feature activated! ${feature.description}. How can I help you with this?`,
      timestamp: new Date(),
      feature: featureId
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const selectedFeatureObj = features.find(f => f.id === selectedFeature);
      let responseContent = '';

      switch (selectedFeature) {
        case 'chat':
          responseContent = `I understand your question about "${inputMessage}". Let me help you with that...`;
          break;
        case 'search':
          responseContent = `Searching for information about "${inputMessage}"... Here are the most relevant results and explanations.`;
          break;
        case 'insights':
          responseContent = `Based on your learning patterns, here are personalized insights about "${inputMessage}"...`;
          break;
        case '3d-models':
          responseContent = `Generating 3D model for "${inputMessage}"... [Interactive 3D visualization would appear here]`;
          break;
        case 'interactive-visuals':
          responseContent = `Creating interactive visual for "${inputMessage}"... [Dynamic diagram would appear here]`;
          break;
        case 'advanced-analysis':
          responseContent = `Performing advanced analysis on "${inputMessage}"... [Detailed analytics would appear here]`;
          break;
        default:
          responseContent = `Processing your request about "${inputMessage}"...`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        feature: selectedFeature
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice Recognition Started",
        description: "Speak now, I'm listening...",
      });
    }
  };

  const handleSpeakerToggle = () => {
    setIsSpeaking(!isSpeaking);
    toast({
      title: isSpeaking ? "Speech Disabled" : "Speech Enabled",
      description: isSpeaking ? "AI responses will be silent" : "AI responses will be spoken",
    });
  };

  const handlePurchaseCredits = () => {
    toast({
      title: "Credit Purchase",
      description: "Redirecting to credit purchase page...",
    });
  };

  const getFeatureBadgeColor = (feature: Feature) => {
    if (!feature.isPremium) return 'bg-green-100 text-green-800';
    return 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6" />
                  <span>24/7 AI Tutor - Enhanced Experience</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5" />
                    <span className="font-bold">{userCredits} Credits</span>
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={handlePurchaseCredits}
                      className="ml-2"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Buy More
                    </Button>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Feature Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Select Feature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
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
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'hover:bg-blue-50'
                      }`}
                      onClick={() => handleFeatureSelect(feature.id)}
                      disabled={feature.isPremium && userCredits < feature.credits}
                    >
                      {feature.icon}
                      <span className="text-xs font-medium">{feature.name}</span>
                      <Badge className={getFeatureBadgeColor(feature)}>
                        {feature.credits === 0 ? 'Free' : `${feature.credits} credits`}
                      </Badge>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Messages */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-blue-600" />
                    <span>AI Tutor Chat</span>
                    <Badge variant="outline">
                      {features.find(f => f.id === selectedFeature)?.name}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={isListening ? "default" : "outline"}
                      onClick={handleVoiceToggle}
                      className={isListening ? "bg-red-600 hover:bg-red-700" : ""}
                    >
                      {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant={isSpeaking ? "default" : "outline"}
                      onClick={handleSpeakerToggle}
                    >
                      {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex gap-3 ${
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.type === 'assistant' && (
                          <Avatar>
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          {message.feature && (
                            <Badge variant="secondary" className="mt-2">
                              {features.find(f => f.id === message.feature)?.name}
                            </Badge>
                          )}
                        </div>
                        {message.type === 'user' && (
                          <Avatar>
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <Avatar>
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                          <span className="text-sm text-gray-600">AI is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
              
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isProcessing}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Audio Controls */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Headphones className="h-4 w-4" />
                  Audio Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Voice Input</span>
                  <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Voice Output</span>
                  <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm">Current Feature</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const currentFeature = features.find(f => f.id === selectedFeature);
                  return currentFeature ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {currentFeature.icon}
                        <span className="font-medium">{currentFeature.name}</span>
                      </div>
                      <p className="text-xs text-gray-600">{currentFeature.description}</p>
                      <Badge className={getFeatureBadgeColor(currentFeature)}>
                        {currentFeature.credits === 0 ? 'Free' : `${currentFeature.credits} credits`}
                      </Badge>
                    </div>
                  ) : null;
                })()}
              </CardContent>
            </Card>

            {/* Premium Features */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  Premium Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {features.filter(f => f.isPremium).map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between text-xs">
                    <span>{feature.name}</span>
                    <Badge variant="outline">{feature.credits} credits</Badge>
                  </div>
                ))}
                <Button 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={handlePurchaseCredits}
                >
                  Purchase Credits
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTutorView;
