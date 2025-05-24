
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, Send, Bot, User, Volume2, Mic, 
  MicOff, Lightbulb, HelpCircle, BookOpen 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isAudio?: boolean;
}

interface AIAssistantChatProps {
  conceptName: string;
  context?: string;
  isVisible: boolean;
  onClose?: () => void;
}

const AIAssistantChat: React.FC<AIAssistantChatProps> = ({ 
  conceptName, 
  context, 
  isVisible,
  onClose 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<SpeechRecognition | null>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      type: 'assistant',
      content: `Hello! I'm your AI learning assistant. I'm here to help you understand ${conceptName}. Feel free to ask me any questions about this concept, request explanations, or ask for examples. How can I help you today?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [conceptName]);

  // Setup speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, conceptName);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (question: string, concept: string): string => {
    const responses = {
      default: `Great question about ${concept}! Let me explain that in detail. ${concept} is a fundamental concept that involves several key principles. Would you like me to break it down into simpler parts or provide a specific example?`,
      formula: `The mathematical relationship in ${concept} can be expressed through specific formulas. Let me walk you through the derivation and show you how each variable relates to the others.`,
      example: `Here's a practical example of ${concept}: Imagine you're pushing a shopping cart. The harder you push (more force), the faster it accelerates. But if the cart is loaded with groceries (more mass), it won't accelerate as much with the same push. This perfectly demonstrates ${concept}!`,
      application: `${concept} has many real-world applications! You can see it in action when driving a car, playing sports, or even in space missions. Would you like me to explain a specific application?`
    };

    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('formula') || lowerQuestion.includes('equation')) {
      return responses.formula;
    } else if (lowerQuestion.includes('example') || lowerQuestion.includes('real world')) {
      return responses.example;
    } else if (lowerQuestion.includes('application') || lowerQuestion.includes('use')) {
      return responses.application;
    }
    
    return responses.default;
  };

  const startListening = () => {
    if (recognition.current && !isListening) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current && isListening) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const speakMessage = (content: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const quickQuestions = [
    "Can you explain this concept simply?",
    "Show me a real-world example",
    "What's the mathematical formula?",
    "How is this used in practice?",
    "What are the key points to remember?"
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-4 z-50 flex items-center justify-center"
    >
      <div className="bg-black/20 absolute inset-0" onClick={onClose} />
      <Card className="relative w-full max-w-2xl h-[600px] shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              AI Learning Assistant
              <Badge variant="outline" className="ml-2">
                {conceptName}
              </Badge>
            </CardTitle>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                ×
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col h-[500px]">
          {/* Quick Questions */}
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Quick questions:</div>
            <div className="flex flex-wrap gap-1">
              {quickQuestions.slice(0, 3).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setInputMessage(question)}
                >
                  <HelpCircle className="h-3 w-3 mr-1" />
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    
                    <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      {message.type === 'assistant' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 h-6 px-2 text-xs"
                          onClick={() => speakMessage(message.content)}
                        >
                          <Volume2 className="h-3 w-3 mr-1" />
                          Read aloud
                        </Button>
                      )}
                    </div>

                    {message.type === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="flex gap-2 mt-4">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about this concept..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                className={`absolute right-1 top-1 h-8 w-8 p-0 ${
                  isListening ? 'text-red-600' : 'text-gray-400'
                }`}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIAssistantChat;
