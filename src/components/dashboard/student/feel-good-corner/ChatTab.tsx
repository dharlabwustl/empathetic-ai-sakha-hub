
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Smile, FileImage, Mic, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'sakha';
  text: string;
  timestamp: Date;
}

const ChatTab: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Initial greeting message
  useEffect(() => {
    setTimeout(() => {
      setChatHistory([{
        id: '1',
        sender: 'sakha',
        text: "Hey there! 👋 I'm Sakha, your study buddy! How are you feeling today? Want to chat about anything fun?",
        timestamp: new Date()
      }]);
    }, 500);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: message,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate Sakha typing...
    setIsTyping(true);
    
    // Generate a response
    setTimeout(() => {
      const sakhaResponse = generateResponse(message);
      setChatHistory(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'sakha',
        text: sakhaResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple response generator
  const generateResponse = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase();
    
    if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi') || normalizedMessage.includes('hey')) {
      return "Hello there! How can I brighten your day? 😊";
    }
    
    if (normalizedMessage.includes('how are you')) {
      return "I'm feeling fantastic! Thanks for asking. How about you?";
    }
    
    if (normalizedMessage.includes('tired') || normalizedMessage.includes('exhausted')) {
      return "Sounds like you need a break! Have you tried the 5-minute energizing break technique? It involves stretching and deep breathing.";
    }
    
    if (normalizedMessage.includes('stress') || normalizedMessage.includes('stressed')) {
      return "Study stress is totally normal! Want to talk about what's causing it? Sometimes just talking helps clear our minds.";
    }
    
    if (normalizedMessage.includes('movie') || normalizedMessage.includes('film') || normalizedMessage.includes('watch')) {
      return "I love movies! Have you seen any good ones lately? I'd recommend something light and funny after intense study sessions!";
    }
    
    if (normalizedMessage.includes('music') || normalizedMessage.includes('song')) {
      return "Music is great for mood boosting! What kind of music do you enjoy when you're not studying?";
    }
    
    if (normalizedMessage.includes('joke') || normalizedMessage.includes('funny')) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything! 😄",
        "What did the ocean say to the beach? Nothing, it just waved! 🌊",
        "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    if (normalizedMessage.includes('thank')) {
      return "You're very welcome! I'm always here when you need a chat break from studying! 💫";
    }
    
    // Default responses
    const defaultResponses = [
      "That's interesting! Tell me more about it.",
      "I see! How does that make you feel?",
      "Interesting perspective! What else is on your mind today?",
      "I'm here to chat about anything that helps you take a break from studying!",
      "Cool! What else would you like to talk about?",
      "That's awesome! Would you like to discuss something else for a bit?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* Chat messages area */}
      <div 
        ref={chatContainerRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-md"
      >
        {chatHistory.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] ${
                msg.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                  : 'bg-white border border-gray-200 rounded-tl-lg rounded-tr-lg rounded-br-lg'
              } p-3 shadow-sm`}
            >
              {msg.sender === 'sakha' && (
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/avatars/sakha.png" alt="Sakha" />
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">Sakha</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              <div 
                className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}
              >
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-gray-500">Sakha is typing...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Message input area */}
      <div className="p-3 bg-white border-t">
        <div className="flex gap-2">
          <div className="flex-1">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message to chat with Sakha..."
              className="min-h-[60px] resize-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleSendMessage} 
              disabled={!message.trim()} 
              className="px-3"
            >
              <Send className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="px-3">
              <Smile className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Button variant="ghost" size="sm" className="text-gray-500">
            <FileImage className="h-4 w-4 mr-1" />
            <span className="text-xs">Upload Image</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Mic className="h-4 w-4 mr-1" />
            <span className="text-xs">Voice Message</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Chat with Sakha about anything non-academic to take a break from studying
        </p>
      </div>
    </div>
  );
};

export default ChatTab;
