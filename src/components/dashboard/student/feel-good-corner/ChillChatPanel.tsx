
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ThumbsUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ChatMessage } from './types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

export interface ChillChatPanelProps {
  onLike?: (id: number) => void;
}

const ChillChatPanel: React.FC<ChillChatPanelProps> = ({ onLike = () => {} }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hi there! I'm your chill chat buddy. What's on your mind today? Feel free to share anything that's stressing you out or just chat about your day!",
      isUser: false
    }
  ]);
  
  const isMobile = useIsMobile();

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { text: message, isUser: true }]);
    
    // Clear input
    setMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responses = [
        "That's interesting! Tell me more about that.",
        "I understand how you feel. It's perfectly normal to have ups and downs.",
        "Taking breaks is actually good for productivity. You're doing great!",
        "Remember to be kind to yourself - you're making progress even when it doesn't feel like it.",
        "What's something small you're looking forward to today?",
        "Have you tried taking a 5-minute mindfulness break? It can really help reset your mind.",
        "Sometimes just articulating how you feel can make a big difference. How are you feeling now?",
        "That's a great perspective! I appreciate you sharing that with me."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleLikeMessage = (index: number) => {
    onLike(index);
  };

  return (
    <div className="flex flex-col h-[60vh] md:h-[50vh]">
      <ScrollArea className="flex-1 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-t-md">
        <div className="space-y-4 p-2">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className={`h-8 w-8 ${msg.isUser ? 'bg-blue-500' : 'bg-green-500'}`}>
                  <AvatarFallback>{msg.isUser ? 'U' : 'AI'}</AvatarFallback>
                  {!msg.isUser && (
                    <AvatarImage src="/assets/feel-good/assistant-avatar.png" />
                  )}
                </Avatar>
                <Card className={`max-w-xs md:max-w-md p-3 ${
                  msg.isUser 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-100' 
                    : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-100'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  {!msg.isUser && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-1 mt-1 opacity-70 hover:opacity-100"
                      onClick={() => handleLikeMessage(index)}
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      <span className="text-xs">Helpful</span>
                    </Button>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-2 bg-white dark:bg-gray-800 border-t flex gap-2 rounded-b-md">
        <Input 
          placeholder="Send a message..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} size={isMobile ? "sm" : "default"}>
          <Send className="h-4 w-4" />
          {!isMobile && <span className="ml-2">Send</span>}
        </Button>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Conversation Starters</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMessage("I'm feeling stressed about my upcoming exam.")}
            className="text-xs justify-start h-auto py-2"
          >
            I'm feeling stressed about my upcoming exam.
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMessage("How can I stay motivated while studying?")}
            className="text-xs justify-start h-auto py-2"
          >
            How can I stay motivated while studying?
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMessage("I'm finding it hard to focus today.")}
            className="text-xs justify-start h-auto py-2"
          >
            I'm finding it hard to focus today.
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMessage("What's a good way to take effective breaks?")}
            className="text-xs justify-start h-auto py-2"
          >
            What's a good way to take effective breaks?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChillChatPanel;
