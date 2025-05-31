
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, Sparkles, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  feature?: string;
}

interface ChatInterfaceProps {
  selectedFeature: string;
  isTyping: boolean;
  onSendMessage: (message: string, feature: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedFeature,
  isTyping,
  onSendMessage
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m your 24/7 AI Tutor. How can I help you with your exam preparation today?',
      timestamp: new Date(),
      feature: 'chat'
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      feature: selectedFeature
    };
    
    setMessages(prev => [...prev, userMessage]);
    onSendMessage(message, selectedFeature);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getFeatureResponse(selectedFeature, message),
        timestamp: new Date(),
        feature: selectedFeature
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const getFeatureResponse = (feature: string, userMessage: string) => {
    const responses = {
      'chat': `I understand your question about "${userMessage}". Let me help you with that concept...`,
      'search': `I found relevant information about "${userMessage}" in your study materials...`,
      'insights': `Based on your study pattern, here are personalized insights about "${userMessage}"...`,
      '3d-models': `I'm generating a 3D visualization for "${userMessage}". This will help you understand the concept better...`,
      'interactive-visuals': `Creating an interactive visual demonstration for "${userMessage}"...`,
      'advanced-analysis': `Performing advanced analysis on "${userMessage}" based on your performance data...`
    };
    return responses[feature as keyof typeof responses] || responses.chat;
  };

  const getFeatureName = (feature: string) => {
    const names = {
      'chat': 'AI Chat',
      'search': 'Smart Search',
      'insights': 'AI Insights',
      '3d-models': '3D Models',
      'interactive-visuals': 'Interactive Visuals',
      'advanced-analysis': 'Advanced Analysis'
    };
    return names[feature as keyof typeof names] || 'AI Chat';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-600 text-white p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="border-2 border-white/20">
              <AvatarImage src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" alt="AI Tutor" />
              <AvatarFallback className="bg-white text-blue-600">AI</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">PREPZR AI Tutor</CardTitle>
              <p className="text-sm text-blue-100">
                Mode: {getFeatureName(selectedFeature)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Sparkles className="h-4 w-4 mr-1" />
            New Chat
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] flex gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    {msg.type === 'ai' ? (
                      <>
                        <AvatarImage src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" alt="AI" />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <AvatarFallback className="bg-violet-100 text-violet-600">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className={`p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    <div className={`flex items-center gap-1 mt-2 text-xs ${
                      msg.type === 'user' ? 'text-violet-200' : 'text-gray-500'
                    }`}>
                      <Clock className="h-3 w-3" />
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex gap-2">
            <Input 
              placeholder={`Ask anything using ${getFeatureName(selectedFeature)}...`}
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedFeature === 'chat' && (
              <>
                <Button variant="outline" size="sm" onClick={() => setMessage("Explain photosynthesis")}>
                  Explain concepts
                </Button>
                <Button variant="outline" size="sm" onClick={() => setMessage("Help me solve this problem")}>
                  Problem solving
                </Button>
              </>
            )}
            {selectedFeature === 'search' && (
              <>
                <Button variant="outline" size="sm" onClick={() => setMessage("Find topics on organic chemistry")}>
                  Search topics
                </Button>
                <Button variant="outline" size="sm" onClick={() => setMessage("Show me NEET biology syllabus")}>
                  Browse syllabus
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
