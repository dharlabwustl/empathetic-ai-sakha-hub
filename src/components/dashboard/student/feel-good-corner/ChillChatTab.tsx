
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, Clock } from 'lucide-react';
import { UserProfileBase } from '@/types/user/base';
import { Badge } from '@/components/ui/badge';

interface ChillChatTabProps {
  userProfile?: UserProfileBase;
}

interface ChatMessage {
  id: number;
  sender: 'user' | 'system';
  text: string;
  timestamp: string;
  avatar?: string;
  name?: string;
}

const ChillChatTab: React.FC<ChillChatTabProps> = ({ userProfile }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'system',
      text: 'Welcome to PREPZR Chill Mode! This is a space to chat about non-study topics. What\'s on your mind today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      name: 'PREPZR Bot',
      avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png',
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      name: userProfile?.name || 'You',
      avatar: userProfile?.avatar,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');

    // After a small delay, simulate the bot response
    setTimeout(() => {
      const botResponses = [
        "That's an interesting thought! Tell me more about it.",
        "I'm here to help you relax. What's your favorite way to unwind?",
        "Sometimes taking a break from studies is just what we need. What do you enjoy doing in your free time?",
        "Music can be great for relaxation! Do you have any favorite artists?",
        "Did you know taking short breaks actually improves your study efficiency?",
        "What's your favorite hobby outside of studying?",
        "If you could travel anywhere right now, where would you go?",
        "What's something that made you smile today?",
        "What's a movie or show you've enjoyed recently?",
        "Self-care is important! What's one thing you do for yourself regularly?"
      ];

      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: 'system',
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        name: 'PREPZR Bot',
        avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png',
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-lg">PREPZR Chill Mode</h3>
          <Badge className="bg-gradient-to-r from-blue-400 to-purple-400">Relaxation Zone</Badge>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>10 mins recommended</span>
        </Badge>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 pb-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png" />
              <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">PREPZR Chill Bot</CardTitle>
              <p className="text-xs text-muted-foreground">Let's chat about non-academic topics</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-3 max-h-[300px] overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}
              >
                {msg.sender === 'system' && (
                  <Avatar className="mt-1">
                    <AvatarImage src={msg.avatar} />
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-xs">{msg.name}</span>
                    <span className="text-xs opacity-70">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm">{msg.text}</p>
                </div>
                
                {msg.sender === 'user' && (
                  <Avatar className="mt-1">
                    <AvatarImage src={userProfile?.avatar} />
                    <AvatarFallback>
                      {userProfile?.name?.substring(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter className="p-3 border-t">
          <div className="flex w-full items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChillChatTab;
