
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Bot,
  User,
  Sparkles,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  feature?: string;
}

interface ChatInterfaceProps {
  selectedFeature: string;
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedFeature,
  onSendMessage,
  isProcessing
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI tutor. I\'m here to help you learn and understand complex concepts. What would you like to study today?',
      sender: 'ai',
      timestamp: new Date(),
      feature: 'chat'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          toast({
            title: "Voice Input",
            description: "Voice message transcribed successfully!",
          });
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current.onerror = () => {
          setIsListening(false);
          toast({
            title: "Voice Recognition Error",
            description: "Could not process voice input. Please try again.",
            variant: "destructive"
          });
        };
      }
    }
  }, [toast]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      feature: selectedFeature
    };

    setMessages(prev => [...prev, newMessage]);
    onSendMessage(inputMessage);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage, selectedFeature),
        sender: 'ai',
        timestamp: new Date(),
        feature: selectedFeature
      };
      setMessages(prev => [...prev, aiResponse]);
      
      // Trigger voice response if enabled
      if (isVoiceEnabled && !isSpeaking) {
        speakMessage(aiResponse.content);
      }
    }, 1500);
  };

  const getAIResponse = (message: string, feature: string) => {
    const responses = {
      'chat': "I understand your question. Let me help you with that concept. Based on your query, here are the key points you should focus on...",
      'search': "I found several relevant resources for your search. Here are the most important materials that match your query...",
      'insights': "Based on your learning pattern, I recommend focusing on these areas for maximum improvement...",
      '3d-models': "Let me show you an interactive 3D model to help visualize this concept better...",
      'interactive-visuals': "Here's an interactive visualization that will help you understand this topic more clearly...",
      'advanced-analysis': "After analyzing your performance data, here are my detailed insights and recommendations..."
    };
    return responses[feature as keyof typeof responses] || responses.chat;
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "Voice Input Active",
          description: "Speak now... I'm listening!",
        });
      }
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window && isVoiceEnabled) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  const toggleVoiceOutput = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getFeatureBadge = (feature: string) => {
    const featureConfig = {
      'chat': { label: 'AI Chat', color: 'bg-blue-100 text-blue-700' },
      'search': { label: 'Smart Search', color: 'bg-green-100 text-green-700' },
      'insights': { label: 'Insights', color: 'bg-yellow-100 text-yellow-700' },
      '3d-models': { label: '3D Models', color: 'bg-purple-100 text-purple-700' },
      'interactive-visuals': { label: 'Visuals', color: 'bg-pink-100 text-pink-700' },
      'advanced-analysis': { label: 'Analysis', color: 'bg-indigo-100 text-indigo-700' }
    };
    
    const config = featureConfig[feature as keyof typeof featureConfig] || featureConfig.chat;
    return <Badge className={`text-xs ${config.color}`}>{config.label}</Badge>;
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Tutor Chat</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getFeatureBadge(selectedFeature)} Active
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleVoiceOutput}
              className={isVoiceEnabled ? 'text-blue-600' : 'text-gray-400'}
            >
              {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            {isSpeaking && (
              <div className="flex items-center gap-1 text-blue-600">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span className="text-xs">Speaking...</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 space-y-4">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'bg-purple-100 dark:bg-purple-900'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                  <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="border-t pt-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Textarea
                placeholder="Ask me anything about your studies..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="min-h-[44px] max-h-[120px] resize-none pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVoiceInput}
                className={`absolute right-2 top-2 ${
                  isListening ? 'text-red-500 animate-pulse' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isProcessing}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {isListening && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1"
            >
              <Mic className="h-3 w-3 animate-pulse" />
              Listening... Speak now
            </motion.p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
