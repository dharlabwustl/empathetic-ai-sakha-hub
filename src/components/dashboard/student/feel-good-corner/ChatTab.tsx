
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Music, Ghost, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'sakha';
  timestamp: Date;
};

const ChatTab = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm Sakha, your friendly chat companion. How are you feeling today?",
      sender: 'sakha',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateReply = (userMessage: string) => {
    setIsThinking(true);
    
    // Simulate AI thinking delay
    setTimeout(() => {
      let response = "";
      
      // Simple keyword-based responses
      if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
        response = "Hello there! How can I brighten your day?";
      }
      else if (userMessage.toLowerCase().includes('joke')) {
        response = "Why don't scientists trust atoms? Because they make up everything! 😄";
      }
      else if (userMessage.toLowerCase().includes('stress') || userMessage.toLowerCase().includes('anxious')) {
        response = "I'm sorry to hear that you're feeling stressed. Have you tried taking a few deep breaths? Sometimes stepping away for a 5-minute break can help reset your mind.";
      }
      else if (userMessage.toLowerCase().includes('tired')) {
        response = "Feeling tired is completely normal during intense study periods. Consider taking a 20-minute power nap or having a small healthy snack to restore your energy.";
      }
      else if (userMessage.toLowerCase().includes('music')) {
        response = "Music is a great way to relax! I can suggest some lo-fi beats or classical music that's great for studying. Just click the music button below!";
      }
      else if (userMessage.toLowerCase().includes('thank')) {
        response = "You're very welcome! I'm always here to chat whenever you need a break. 😊";
      }
      else {
        // Default responses if no keywords match
        const defaultResponses = [
          "That's interesting! Would you like to tell me more about that?",
          "I'm here to listen if you need to talk more about this.",
          "How does that make you feel?",
          "It's good to express your thoughts. Is there anything specific you'd like advice on?",
          "Sometimes just chatting can help lighten your mood. What else is on your mind?"
        ];
        response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
      }
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response,
        sender: 'sakha',
        timestamp: new Date()
      }]);
      
      setIsThinking(false);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Generate AI reply
    generateReply(userMessage.text);
  };

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Hi there! I'm Sakha. How can I help you today?",
        sender: 'sakha',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[400px]">
      {/* Chat area */}
      <Card className="flex-1 overflow-hidden mb-3">
        <div className="h-full flex flex-col">
          <div className="bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 p-3">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/avatars/sakha.png" />
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Sakha</h3>
                <p className="text-xs text-muted-foreground">Your friendly companion</p>
              </div>
              
              <div className="ml-auto flex gap-1">
                <Button 
                  size="sm" 
                  variant={musicPlaying ? "default" : "outline"} 
                  className="h-8 w-8 p-0" 
                  onClick={toggleMusic}
                >
                  <Music className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 w-8 p-0"
                  onClick={clearChat}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-end gap-2 max-w-[80%]">
                  {message.sender === 'sakha' && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/sakha.png" />
                      <AvatarFallback>SK</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div>
                    <div 
                      className={`rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/user.png" />
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isThinking && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/sakha.png" />
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <motion.div 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="h-2 w-2 bg-gray-400 rounded-full"
                      />
                      <motion.div 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                        className="h-2 w-2 bg-gray-400 rounded-full"
                      />
                      <motion.div 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                        className="h-2 w-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>
        </div>
      </Card>
      
      {/* Music player indicator */}
      {musicPlaying && (
        <div className="bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200 rounded p-2 mb-3 text-xs flex items-center">
          <Music className="h-3 w-3 mr-1 animate-pulse" />
          <div className="flex-1">
            Now playing: Lo-fi Study Beats
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={toggleMusic}>
            ✕
          </Button>
        </div>
      )}
      
      {/* Input area */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={isThinking}
        />
        <Button type="submit" disabled={!newMessage.trim() || isThinking}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatTab;
