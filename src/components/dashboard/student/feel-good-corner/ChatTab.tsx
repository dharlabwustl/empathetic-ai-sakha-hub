
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatTab = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Sakha, your friendly study buddy. I'm here to chat and help you relax. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Suggested messages for quick responses
  const suggestedMessages = [
    "I'm feeling stressed about exams",
    "I need motivation to study",
    "Tell me a joke",
    "I need a quick break activity"
  ];
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    
    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      let botReply = "";
      
      if (inputMessage.toLowerCase().includes('stress') || inputMessage.toLowerCase().includes('worried')) {
        botReply = "It's normal to feel stressed, especially during exam season. How about trying a 2-minute deep breathing exercise? Breathe in for 4 counts, hold for 4, and exhale for 6. This can help calm your nervous system.";
      } else if (inputMessage.toLowerCase().includes('motivation') || inputMessage.toLowerCase().includes('study')) {
        botReply = "You've got this! Remember why you started this journey. Break your study session into 25-minute focused blocks with 5-minute breaks. What specific subject are you working on right now?";
      } else if (inputMessage.toLowerCase().includes('joke') || inputMessage.toLowerCase().includes('funny')) {
        botReply = "Why don't scientists trust atoms? Because they make up everything! 😄 Would you like another one?";
      } else if (inputMessage.toLowerCase().includes('break') || inputMessage.toLowerCase().includes('rest')) {
        botReply = "Taking breaks is essential! Try the 5-5-5 technique: spend 5 minutes stretching, 5 minutes walking, and 5 minutes doing something you enjoy. This helps refresh your mind without losing focus completely.";
      } else {
        botReply = "That's interesting! Remember, I'm here to help you relax and stay motivated. Would you like to try a quick mindfulness exercise or hear something inspiring?";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleSuggestedMessage = (text: string) => {
    setInputMessage(text);
  };
  
  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex items-center gap-2 mb-3 p-2 bg-purple-50 dark:bg-purple-950/20 rounded-md">
        <Avatar>
          <AvatarImage src="/lovable-uploads/fdc1cebd-e35f-4f08-a45b-e839964fd590.png" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Sakha</h3>
            <Badge className="bg-purple-100 text-purple-700 border-purple-200">Chill Mode</Badge>
          </div>
          <p className="text-xs text-muted-foreground">Your friendly AI study buddy</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-3 border rounded-md p-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-100'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="flex items-center gap-1 mb-1 text-xs text-muted-foreground">
                  <Bot className="h-3 w-3" />
                  <span>Sakha</span>
                </div>
              )}
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {suggestedMessages.map((text, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              className="text-xs py-1 h-auto"
              onClick={() => handleSuggestedMessage(text)}
            >
              {text}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;
