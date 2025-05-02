
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { UserProfileBase } from '@/types/user/base';
import { SendHorizontal, Smile } from 'lucide-react';

interface ChillChatTabProps {
  userProfile?: UserProfileBase;
}

const ChillChatTab: React.FC<ChillChatTabProps> = ({ userProfile }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Piyush',
      avatar: 'https://i.pravatar.cc/150?img=11',
      text: 'Hey everyone! How's your study going today?',
      time: '10:15 AM'
    },
    {
      id: 2,
      sender: 'Ananya',
      avatar: 'https://i.pravatar.cc/150?img=5',
      text: 'Pretty good! Just finished a chapter on organic chemistry. My brain hurts 😂',
      time: '10:17 AM'
    },
    {
      id: 3,
      sender: 'Rohan',
      avatar: 'https://i.pravatar.cc/150?img=8',
      text: 'I'm taking a break. Been studying for 3 hours straight!',
      time: '10:20 AM'
    },
    {
      id: 4,
      sender: 'Assistant',
      avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png',
      text: 'Remember to take breaks every 45-50 minutes for best productivity!',
      time: '10:22 AM',
      isAssistant: true
    },
  ]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: userProfile?.name || 'You',
      avatar: userProfile?.avatar || 'https://i.pravatar.cc/150?img=3',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate assistant response after a short delay
    if (message.toLowerCase().includes('help') || message.toLowerCase().includes('stuck')) {
      setTimeout(() => {
        const assistantResponse = {
          id: messages.length + 2,
          sender: 'Assistant',
          avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png',
          text: 'Need help with something specific? Feel free to ask!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAssistant: true
        };
        setMessages(prev => [...prev, assistantResponse]);
      }, 1000);
    }
  };
  
  return (
    <div className="flex flex-col h-[500px]">
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-3 rounded-t-lg">
        <h3 className="font-medium">Chill Chat Space</h3>
        <p className="text-xs text-muted-foreground">
          Chat with peers taking a break - no study talk required!
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/20">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.isAssistant ? 'bg-blue-50 dark:bg-blue-900/10 p-2 rounded-lg' : ''}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={msg.avatar} />
              <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-sm">{msg.sender}</span>
                <span className="text-xs text-muted-foreground">{msg.time}</span>
              </div>
              <p className="text-sm mt-1">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Card className="mt-auto rounded-t-none border-t-0">
        <CardContent className="p-3">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="button" variant="ghost" size="icon">
              <Smile className="h-5 w-5 text-gray-500" />
            </Button>
            <Button type="submit">
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChillChatTab;
