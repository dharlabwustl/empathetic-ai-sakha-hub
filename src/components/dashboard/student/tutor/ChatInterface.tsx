import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Clock, CheckCircle, Copy, ThumbsUp, ThumbsDown, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
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
      content: `Hello! I'm your 24/7 AI Tutor. I'm here to help you excel in your exam preparation. What would you like to study today?`,
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          
          if (finalTranscript) {
            setInputMessage(finalTranscript);
            setTranscript('');
          } else {
            setTranscript(interimTranscript);
          }
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
          setTranscript('');
        };
        
        recognitionRef.current.onerror = (event) => {
          setIsListening(false);
          setTranscript('');
          toast({
            title: "Voice Recognition Error",
            description: "Please try again or check your microphone permissions.",
            variant: "destructive"
          });
        };
      }
    }
  }, [toast]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Send to parent component
    onSendMessage(inputMessage);

    // Simulate AI response based on selected feature
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, selectedFeature);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleVoiceRecognition = async () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        recognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "Voice Recognition Started",
          description: "Speak now and I'll convert it to text!",
        });
      } catch (error) {
        toast({
          title: "Microphone Access Denied",
          description: "Please allow microphone access to use voice input.",
          variant: "destructive"
        });
      }
    }
  };

  const generateAIResponse = (userInput: string, feature: string): string => {
    const responses = {
      'chat': `I understand you're asking about "${userInput}". Let me provide you with a comprehensive explanation tailored for your exam preparation...`,
      'search': `I found relevant study materials for "${userInput}". Here are the key concepts and resources...`,
      'insights': `Based on your question about "${userInput}", here are personalized insights to improve your understanding...`,
      '3d-models': `I'll create an interactive 3D model to help visualize "${userInput}". This will make the concept much clearer!`,
      'interactive-visuals': `Let me generate interactive charts and diagrams for "${userInput}" to enhance your learning experience.`,
      'advanced-analysis': `Performing deep analysis on "${userInput}"... Here are advanced insights and performance correlations...`
    };

    return responses[feature as keyof typeof responses] || responses['chat'];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Message content copied successfully"
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getFeatureColor = (feature: string) => {
    const colors = {
      'chat': 'from-blue-500 to-cyan-500',
      'search': 'from-green-500 to-emerald-500',
      'insights': 'from-yellow-500 to-orange-500',
      '3d-models': 'from-purple-500 to-violet-500',
      'interactive-visuals': 'from-pink-500 to-rose-500',
      'advanced-analysis': 'from-indigo-500 to-purple-500'
    };
    return colors[feature as keyof typeof colors] || colors['chat'];
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Chat Header */}
      <div className={`p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r ${getFeatureColor(selectedFeature)} text-white rounded-t-lg`}>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white/20">
            <AvatarFallback className="bg-white/20 text-white">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">AI Tutor - {selectedFeature.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
            <p className="text-sm opacity-90">Ready to help you excel</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[70%] ${message.role === 'user' ? 'order-1' : ''}`}>
                  <div className={`p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white ml-auto'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(message.timestamp)}</span>
                    
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                          onClick={() => copyMessage(message.content)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 ml-2">AI is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {/* Voice Recognition Status */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
              <motion.div
                className="w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>Listening... {transcript && `"${transcript}"`}</span>
            </div>
          </motion.div>
        )}
        
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={isListening ? "default" : "outline"}
              size="icon"
              onClick={toggleVoiceRecognition}
              className={`flex-shrink-0 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {isListening ? (
                <Mic className="h-4 w-4" />
              ) : (
                <MicOff className="h-4 w-4" />
              )}
            </Button>
          </motion.div>
          
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isListening ? "Listening..." : `Ask about ${selectedFeature.replace('-', ' ')}...`}
            className="flex-1"
            disabled={isProcessing || isListening}
          />
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isProcessing}
            className={`bg-gradient-to-r ${getFeatureColor(selectedFeature)} hover:opacity-90 text-white`}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <CheckCircle className="h-3 w-3" />
          <span>Press Enter to send • Click mic for voice input • Shift+Enter for new line</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
