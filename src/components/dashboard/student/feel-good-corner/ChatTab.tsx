
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Send, Smile, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const ChatTab: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string; timestamp: Date }[]>([
    {
      sender: 'ai',
      text: "Hi there! I'm Sakha, your friendly AI companion. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      sender: 'user' as const,
      text: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    // Simulate AI thinking and then responding
    setTimeout(() => {
      const aiResponse = getAIResponse(message);
      
      setMessages(prev => [
        ...prev, 
        {
          sender: 'ai',
          text: aiResponse,
          timestamp: new Date()
        }
      ]);
      
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase();
    
    if (normalizedMessage.includes('joke') || normalizedMessage.includes('funny')) {
      return "Why don't scientists trust atoms? Because they make up everything! 😄";
    }
    
    if (normalizedMessage.includes('sad') || normalizedMessage.includes('depressed') || normalizedMessage.includes('unhappy')) {
      return "I'm sorry to hear you're feeling down. Remember that it's okay to have ups and downs. Would you like me to suggest some mood-lifting activities?";
    }
    
    if (normalizedMessage.includes('stress') || normalizedMessage.includes('worried') || normalizedMessage.includes('anxiety')) {
      return "It sounds like you might be feeling stressed. Deep breathing can help: try inhaling for 4 counts, holding for 4, and exhaling for 6. Would you like more stress management tips?";
    }
    
    if (normalizedMessage.includes('happy') || normalizedMessage.includes('good') || normalizedMessage.includes('great')) {
      return "I'm glad to hear you're feeling positive! That's wonderful. Would you like to discuss what's making you feel good today?";
    }
    
    if (normalizedMessage.includes('tired') || normalizedMessage.includes('exhausted') || normalizedMessage.includes('sleepy')) {
      return "Feeling tired is natural, especially during intense study periods. Have you considered taking a short 20-minute power nap? It can help refresh your mind!";
    }
    
    const genericResponses = [
      "That's interesting! Would you like to tell me more?",
      "I'm here to listen and help. How can I support you today?",
      "Thank you for sharing. How does that make you feel?",
      "I understand. Is there something specific you'd like to talk about?",
      "I appreciate you opening up. Would you like some suggestions or just someone to listen?"
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col h-96"
    >
      <div className="flex flex-col space-y-2 overflow-y-auto mb-4 flex-grow pr-2">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-start gap-2 max-w-[80%]">
              {msg.sender === 'ai' && (
                <Avatar className="w-8 h-8 bg-violet-100 border-violet-200">
                  <Bot className="h-4 w-4 text-violet-600" />
                </Avatar>
              )}
              
              <Card className={`p-3 text-sm ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-800' 
                  : 'bg-white border border-gray-100'
              }`}>
                {msg.text}
                <div className="text-[10px] text-gray-400 mt-1 text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </Card>
              
              {msg.sender === 'user' && (
                <Avatar className="w-8 h-8 bg-violet-500">
                  <Smile className="h-4 w-4 text-white" />
                </Avatar>
              )}
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-1 text-xs text-gray-500 ml-10"
          >
            <div className="flex space-x-1">
              <span className="animate-bounce delay-0">•</span>
              <span className="animate-bounce delay-100">•</span>
              <span className="animate-bounce delay-200">•</span>
            </div>
            <span>Sakha is typing</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex space-x-2 mt-auto">
        <Input
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-grow"
        />
        <Button 
          onClick={handleSendMessage} 
          size="sm" 
          className="bg-violet-600 hover:bg-violet-700"
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      <style>
        {`
          .delay-100 {
            animation-delay: 0.1s;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
        `}
      </style>
    </motion.div>
  );
};

export default ChatTab;
