
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
  Info, 
  Download, 
  BookOpen, 
  Brain, 
  ArrowLeft,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Search,
  Cube,
  Eye,
  BarChart3,
  Crown,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const EnhancedTutorView = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string; type?: string }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Speech Recognition Error",
          description: "Could not process speech. Please try again.",
          variant: "destructive"
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Add initial welcome message
    setMessages([{
      role: 'assistant',
      content: 'Hi there! I\'m your enhanced AI tutor with advanced capabilities. I can help you with studies, create 3D models, generate interactive visuals, and provide deep insights. What would you like to explore today?'
    }]);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      toast({
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support speech recognition.",
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

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: question };
    setMessages(prev => [...prev, userMessage]);
    
    const currentQuestion = question;
    setQuestion('');
    setIsLoading(true);
    
    // Simulate AI response based on selected feature
    setTimeout(() => {
      let response = '';
      let responseType = 'text';
      
      if (selectedFeature === 'search') {
        response = `I found comprehensive information about "${currentQuestion}". Here are the key concepts and related topics you should focus on...`;
      } else if (selectedFeature === '3d') {
        response = `I'll create a 3D model for "${currentQuestion}". This is a premium feature that uses 1 credit. The interactive 3D model will help you visualize complex structures.`;
        responseType = '3d';
      } else if (selectedFeature === 'visual') {
        response = `Creating an interactive visual explanation for "${currentQuestion}". This premium feature uses 1 credit and provides dynamic diagrams and animations.`;
        responseType = 'visual';
      } else if (selectedFeature === 'insights') {
        response = `Based on your learning pattern and "${currentQuestion}", here are personalized insights: Your understanding is strong in this area, but focus on practical applications.`;
        responseType = 'insights';
      } else {
        response = `Great question about "${currentQuestion}"! Let me explain this concept step by step with examples and practice problems.`;
      }
      
      const assistantMessage = { 
        role: 'assistant' as const, 
        content: response,
        type: responseType
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      setSelectedFeature(null);
      
      // Speak the response
      speakText(response);
    }, 1500);
  };

  const handleFeatureSelect = (feature: string) => {
    setSelectedFeature(feature);
    
    if (feature === '3d' || feature === 'visual') {
      toast({
        title: "Premium Feature Selected",
        description: "This feature requires 1 credit. Continue to use.",
        duration: 3000
      });
    }
  };

  const premiumFeatures = [
    {
      id: 'search',
      name: 'Smart Search',
      icon: <Search className="h-4 w-4" />,
      description: 'Advanced topic search',
      isPremium: false,
      color: 'blue'
    },
    {
      id: '3d',
      name: '3D Models',
      icon: <Cube className="h-4 w-4" />,
      description: 'Interactive 3D visualizations',
      isPremium: true,
      color: 'purple'
    },
    {
      id: 'visual',
      name: 'Interactive Visuals',
      icon: <Eye className="h-4 w-4" />,
      description: 'Dynamic diagrams & animations',
      isPremium: true,
      color: 'green'
    },
    {
      id: 'insights',
      name: 'AI Insights',
      icon: <BarChart3 className="h-4 w-4" />,
      description: 'Personalized learning analytics',
      isPremium: false,
      color: 'orange'
    }
  ];

  const getFeatureColor = (color: string, selected: boolean) => {
    const colors = {
      blue: selected ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      purple: selected ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      green: selected ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200',
      orange: selected ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <SharedPageLayout
      title="24/7 Enhanced AI Tutor"
      subtitle="Advanced AI tutoring with audio, 3D models, and interactive features"
      showBackButton={true}
    >
      <div className="grid md:grid-cols-4 gap-6">
        {/* Main Chat Area */}
        <div className="md:col-span-3">
          <Card className="h-[700px] flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Enhanced AI Tutor Chat
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isSpeaking ? stopSpeaking : () => {}}
                    disabled={!isSpeaking}
                  >
                    {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Badge variant="secondary">Credits: 25</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            
            {/* Feature Selection */}
            <div className="p-4 border-b bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">Select a feature to enhance your question:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {premiumFeatures.map((feature) => (
                  <Button
                    key={feature.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeatureSelect(feature.id)}
                    className={`${getFeatureColor(feature.color, selectedFeature === feature.id)} transition-all`}
                  >
                    {feature.icon}
                    <span className="ml-1">{feature.name}</span>
                    {feature.isPremium && <Crown className="h-3 w-3 ml-1" />}
                  </Button>
                ))}
              </div>
              {selectedFeature && (
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {premiumFeatures.find(f => f.id === selectedFeature)?.description}
                </p>
              )}
            </div>
            
            <CardContent className="flex-grow overflow-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${
                    message.role === 'assistant' 
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  } p-4 rounded-lg`}>
                    <div className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                      {message.role === 'assistant' ? 
                        <Bot className="h-4 w-4 text-indigo-600" /> : 
                        <User className="h-4 w-4" />
                      }
                    </div>
                    <div className="space-y-2">
                      <div>{message.content}</div>
                      {message.type === '3d' && (
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Cube className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-700">3D Model Generated</span>
                          </div>
                          <div className="bg-purple-200 h-32 rounded-lg flex items-center justify-center">
                            <span className="text-purple-600">Interactive 3D Model Placeholder</span>
                          </div>
                        </div>
                      )}
                      {message.type === 'visual' && (
                        <div className="bg-green-100 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Eye className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-700">Interactive Visual</span>
                          </div>
                          <div className="bg-green-200 h-32 rounded-lg flex items-center justify-center">
                            <span className="text-green-600">Dynamic Visualization Placeholder</span>
                          </div>
                        </div>
                      )}
                      {message.role === 'assistant' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakText(message.content)}
                          className="text-xs"
                        >
                          <Volume2 className="h-3 w-3 mr-1" />
                          Play Audio
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-500">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="h-4 w-4" />
                  </motion.div>
                  <span className="text-sm">AI is thinking...</span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>
            
            {/* Enhanced Input Area */}
            <div className="p-4 border-t bg-gray-50">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                    placeholder="Ask any question or describe what you want to learn..." 
                    className="flex-grow"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={isListening ? stopListening : startListening}
                    className={isListening ? 'bg-red-100 border-red-300' : ''}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button type="submit" disabled={!question.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {selectedFeature && (
                  <div className="text-xs text-gray-600">
                    Using {premiumFeatures.find(f => f.id === selectedFeature)?.name} feature
                    {premiumFeatures.find(f => f.id === selectedFeature)?.isPremium && " (Premium - 1 credit)"}
                  </div>
                )}
              </form>
            </div>
          </Card>
        </div>
        
        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Explain Newton's Laws with 3D visualization",
                "Create DNA structure interactive model",
                "Solve this organic chemistry mechanism",
                "Generate study plan for Thermodynamics"
              ].map((action, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="w-full justify-start text-left text-sm h-auto py-2"
                  onClick={() => setQuestion(action)}
                >
                  {action}
                </Button>
              ))}
            </CardContent>
          </Card>
          
          {/* Credits and Premium */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Crown className="h-4 w-4 text-purple-600" />
                Premium Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">25</p>
                <p className="text-xs text-gray-600">Credits Remaining</p>
              </div>
              <Button 
                size="sm" 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate('/dashboard/student/credits')}
              >
                <CreditCard className="h-3 w-3 mr-1" />
                Buy More Credits
              </Button>
              <div className="space-y-1 text-xs text-gray-600">
                <p>• 3D Models: 1 credit each</p>
                <p>• Interactive Visuals: 1 credit each</p>
                <p>• Advanced Search: Free</p>
                <p>• AI Insights: Free</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Learning Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Learning Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" /> NEET Biology Guide
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Brain className="mr-2 h-4 w-4" /> Physics Formula Sheet
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" /> Chemistry Quick Notes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Info className="mr-2 h-4 w-4" /> NEET Exam Pattern
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedTutorView;
