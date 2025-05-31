
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Search, 
  Brain, 
  Cube, 
  Image, 
  BarChart3,
  Coins,
  ShoppingCart,
  Zap,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useToast } from '@/hooks/use-toast';

const EnhancedTutorView = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi there! I\'m your enhanced AI tutor with advanced capabilities. How can I help you with your NEET preparation today?'
    }
  ]);
  const [selectedFeature, setSelectedFeature] = useState('chat');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [credits, setCredits] = useState(10);
  const { toast } = useToast();
  const speechRecognition = useRef<any>(null);

  const features = [
    { 
      id: 'chat', 
      name: 'Chat', 
      icon: MessageSquare, 
      cost: 0, 
      description: 'Basic AI conversation',
      color: 'text-blue-600'
    },
    { 
      id: 'search', 
      name: 'Search', 
      icon: Search, 
      cost: 0, 
      description: 'Search NEET topics',
      color: 'text-green-600'
    },
    { 
      id: 'insights', 
      name: 'Insights', 
      icon: Brain, 
      cost: 1, 
      description: 'Deep learning insights',
      color: 'text-purple-600'
    },
    { 
      id: '3d-models', 
      name: '3D Models', 
      icon: Cube, 
      cost: 2, 
      description: 'Interactive 3D visualizations',
      color: 'text-orange-600',
      premium: true
    },
    { 
      id: 'interactive-visuals', 
      name: 'Interactive Visuals', 
      icon: Image, 
      cost: 3, 
      description: 'Dynamic visual explanations',
      color: 'text-pink-600',
      premium: true
    },
    { 
      id: 'advanced-analysis', 
      name: 'Advanced Analysis', 
      icon: BarChart3, 
      cost: 5, 
      description: 'Comprehensive performance analysis',
      color: 'text-red-600',
      premium: true
    }
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      speechRecognition.current = new (window as any).webkitSpeechRecognition();
      speechRecognition.current.continuous = false;
      speechRecognition.current.interimResults = false;
      speechRecognition.current.lang = 'en-US';

      speechRecognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(transcript);
        setIsListening(false);
      };

      speechRecognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (speechRecognition.current) {
      setIsListening(true);
      speechRecognition.current.start();
    }
  };

  const stopListening = () => {
    if (speechRecognition.current) {
      speechRecognition.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleFeatureSelect = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    if (!feature) return;

    if (feature.cost > 0 && credits < feature.cost) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${feature.cost} credits to use ${feature.name}. Purchase more credits to continue.`,
        variant: "destructive",
      });
      return;
    }

    setSelectedFeature(featureId);
    
    if (feature.cost > 0) {
      setCredits(prev => prev - feature.cost);
      toast({
        title: "Feature Activated",
        description: `${feature.name} activated! ${feature.cost} credits used.`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const selectedFeatureData = features.find(f => f.id === selectedFeature);
    
    const newMessage = {
      role: 'user' as const,
      content: question
    };

    const response = {
      role: 'assistant' as const,
      content: `Using ${selectedFeatureData?.name}: ${getFeatureResponse(selectedFeature, question)}`
    };

    setMessages(prev => [...prev, newMessage, response]);
    setQuestion('');

    // Auto-speak the response
    if (isSpeaking === false) {
      speakText(response.content);
    }
  };

  const getFeatureResponse = (feature: string, question: string) => {
    switch (feature) {
      case 'search':
        return `I found comprehensive information about "${question}" in our NEET database. Here are the key concepts...`;
      case 'insights':
        return `Based on deep analysis, here are personalized insights for "${question}": This topic requires focus on conceptual understanding and practice...`;
      case '3d-models':
        return `Generating 3D molecular model for "${question}". You can now interact with the 3D visualization to better understand the structure...`;
      case 'interactive-visuals':
        return `Creating interactive visual explanation for "${question}". The dynamic diagram shows step-by-step process with animations...`;
      case 'advanced-analysis':
        return `Advanced performance analysis for "${question}": Your understanding level is 78%, recommended study time is 45 minutes, weakness detected in sub-topic XYZ...`;
      default:
        return `Here's a detailed explanation of "${question}" based on NEET syllabus...`;
    }
  };

  const purchaseCredits = () => {
    toast({
      title: "Credit Purchase",
      description: "Redirecting to credit purchase page...",
    });
    // In a real app, this would redirect to payment page
    setTimeout(() => {
      setCredits(prev => prev + 20);
      toast({
        title: "Credits Added",
        description: "20 credits have been added to your account!",
      });
    }, 2000);
  };

  return (
    <SharedPageLayout
      title="Enhanced 24/7 AI Tutor"
      subtitle="Advanced AI tutoring with voice interaction and premium features"
      showBackButton={true}
    >
      <div className="space-y-6">
        {/* Credit Display and Feature Selection */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                <span>Credits</span>
                <Coins className="h-4 w-4 text-yellow-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{credits}</div>
                <Button 
                  size="sm" 
                  className="mt-2 w-full"
                  onClick={purchaseCredits}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Buy Credits
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feature Selection */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Select AI Feature</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {features.map(feature => {
                    const Icon = feature.icon;
                    const canAfford = credits >= feature.cost;
                    const isSelected = selectedFeature === feature.id;
                    
                    return (
                      <motion.div
                        key={feature.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          className={`h-auto p-3 flex flex-col items-center gap-1 relative ${
                            !canAfford && feature.cost > 0 ? 'opacity-50' : ''
                          }`}
                          onClick={() => handleFeatureSelect(feature.id)}
                          disabled={!canAfford && feature.cost > 0}
                        >
                          <Icon className={`h-4 w-4 ${feature.color}`} />
                          <span className="text-xs font-medium">{feature.name}</span>
                          {feature.cost > 0 && (
                            <Badge variant="secondary" className="text-xs absolute -top-1 -right-1">
                              {feature.cost}
                            </Badge>
                          )}
                          {feature.premium && (
                            <Sparkles className="h-3 w-3 text-yellow-500 absolute top-0 left-0" />
                          )}
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Chat Interface */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    AI Tutor Chat
                    <Badge variant="outline" className="ml-2">
                      {features.find(f => f.id === selectedFeature)?.name}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isListening ? stopListening : startListening}
                      className={isListening ? 'bg-red-100' : ''}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isSpeaking ? stopSpeaking : () => {}}
                      className={isSpeaking ? 'bg-blue-100' : ''}
                    >
                      {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow overflow-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${
                      message.role === 'assistant' 
                        ? 'bg-secondary' 
                        : 'bg-primary text-primary-foreground'
                    } p-3 rounded-lg`}>
                      <div className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                        {message.role === 'assistant' ? 
                          <Bot className="h-4 w-4" /> : 
                          <User className="h-4 w-4" />
                        }
                      </div>
                      <div className="space-y-2">
                        <div>{message.content}</div>
                        {message.role === 'assistant' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => speakText(message.content)}
                            className="h-6 w-6 p-0"
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
              <div className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                    placeholder={`Ask using ${features.find(f => f.id === selectedFeature)?.name}...`}
                    className="flex-grow"
                  />
                  <Button type="submit" disabled={!question.trim()}>
                    <Send className="h-4 w-4 mr-1" /> Send
                  </Button>
                </form>
              </div>
            </Card>
          </div>
          
          {/* Sidebar with Resources */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "Explain DNA Replication",
                  "Newton's Laws of Motion",
                  "Chemical Bonding Types",
                  "Mock Test Analysis"
                ].map((topic, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    className="w-full justify-start text-left text-sm h-auto py-2"
                    onClick={() => setQuestion(topic)}
                  >
                    {topic}
                  </Button>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Feature Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                {features.map(feature => (
                  <div key={feature.id} className="p-2 bg-gray-50 rounded">
                    <div className="font-medium flex items-center gap-1">
                      <feature.icon className={`h-3 w-3 ${feature.color}`} />
                      {feature.name}
                      {feature.cost > 0 && (
                        <Badge variant="secondary" className="text-xs ml-1">
                          {feature.cost} credits
                        </Badge>
                      )}
                    </div>
                    <div className="text-gray-600 mt-1">{feature.description}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedTutorView;
