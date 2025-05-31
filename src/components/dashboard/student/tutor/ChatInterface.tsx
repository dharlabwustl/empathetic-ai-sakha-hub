
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | '3d-model' | 'interactive-visual' | 'analysis';
}

interface ChatInterfaceProps {
  selectedFeature: string;
  onSendMessage: (message: string, feature: string) => void;
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedFeature,
  onSendMessage,
  isLoading
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI tutor. I\'m here to help you with your NEET preparation. What would you like to learn today?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    onSendMessage(message, selectedFeature);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(message, selectedFeature),
        sender: 'ai',
        timestamp: new Date(),
        type: selectedFeature === '3d-models' ? '3d-model' : 
              selectedFeature === 'interactive-visuals' ? 'interactive-visual' :
              selectedFeature === 'advanced-analysis' ? 'analysis' : 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string, feature: string) => {
    const responses = {
      'chat': 'Based on your question about NEET preparation, here\'s what I recommend...',
      'search': 'I found several relevant concepts and resources for your query...',
      'insights': 'Based on your study patterns, I suggest focusing on these areas...',
      '3d-models': 'Here\'s an interactive 3D model to help visualize this concept...',
      'interactive-visuals': 'I\'ve created an interactive visualization to explain this topic...',
      'advanced-analysis': 'Here\'s a detailed analysis of your performance and recommendations...'
    };
    return responses[feature as keyof typeof responses] || responses.chat;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getFeatureIcon = (type?: string) => {
    switch (type) {
      case '3d-model':
        return <Badge className="bg-purple-100 text-purple-700">3D Model</Badge>;
      case 'interactive-visual':
        return <Badge className="bg-blue-100 text-blue-700">Interactive</Badge>;
      case 'analysis':
        return <Badge className="bg-green-100 text-green-700">Analysis</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-500" />
          AI Tutor Chat
          <Sparkles className="h-4 w-4 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4 text-blue-500" />
                    )}
                    <span className="text-xs opacity-75">
                      {msg.sender === 'user' ? 'You' : 'AI Tutor'}
                    </span>
                    {getFeatureIcon(msg.type)}
                  </div>
                  <p className="text-sm">{msg.content}</p>
                  <div className="flex items-center gap-1 mt-2 opacity-60">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{formatTime(msg.timestamp)}</span>
                  </div>
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
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-blue-500" />
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about any NEET topic..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
