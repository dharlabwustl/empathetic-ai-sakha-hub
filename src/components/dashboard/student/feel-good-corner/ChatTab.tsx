
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Clock, MessageSquare, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const predefinedResponses: Record<string, string[]> = {
  default: [
    "I'm here to help! What's on your mind today?",
    "You're doing great! How can I support you with your studies?",
    "Taking breaks is important. What would you like to talk about?",
    "I'm your Sakha, here whenever you need a chat. How are you feeling?",
  ],
  stress: [
    "It sounds like you're feeling stressed. Remember to take deep breaths and break down your tasks into smaller steps.",
    "Stress is normal before exams. Try the 5-5-5 technique: breathe in for 5 seconds, hold for 5, exhale for 5.",
    "When you're feeling overwhelmed, take a moment to list 3 things you've accomplished today, no matter how small.",
    "It's okay to feel stressed. Would it help to talk about what's specifically causing you concern?",
  ],
  motivation: [
    "Remember why you started this journey. Your future self will thank you for pushing through today.",
    "Each minute you spend studying is bringing you closer to your goals. You've got this!",
    "Even small progress is still progress. Be proud of every step forward!",
    "You've overcome challenges before, and you'll overcome this one too. I believe in you!",
  ],
  tired: [
    "It sounds like you might need a break. Even a 10-minute walk can refresh your mind.",
    "Studying when tired isn't effective. Consider a short power nap (20 minutes) to recharge.",
    "Have you tried the Pomodoro technique? 25 minutes of focused study followed by a 5-minute break.",
    "Remember that rest is part of the learning process. Your brain needs time to consolidate information.",
  ],
  gratitude: [
    "Practicing gratitude is powerful! What's something small that brought you joy today?",
    "That's a wonderful perspective. Finding moments of gratitude can really shift our mindset.",
    "I appreciate you sharing that positive thought with me!",
    "Focusing on what we're thankful for can make challenging days feel more manageable.",
  ],
};

const ChatTab: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: "Hi there! I'm your Sakha companion. How can I support you today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking and typing
    setTimeout(() => {
      // Determine response type based on content
      let responseType = 'default';
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('stress') || lowerInput.includes('anxious') || lowerInput.includes('worried') || lowerInput.includes('overwhelm')) {
        responseType = 'stress';
      } else if (lowerInput.includes('motivat') || lowerInput.includes('inspire') || lowerInput.includes('encourage')) {
        responseType = 'motivation';
      } else if (lowerInput.includes('tired') || lowerInput.includes('exhaust') || lowerInput.includes('sleep') || lowerInput.includes('rest')) {
        responseType = 'tired';
      } else if (lowerInput.includes('thank') || lowerInput.includes('grateful') || lowerInput.includes('appreciate')) {
        responseType = 'gratitude';
      }
      
      // Get random response from appropriate category
      const responses = predefinedResponses[responseType];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      // Add AI response
      const aiResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-1 overflow-y-auto pr-2 mb-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center mr-2 flex-shrink-0">
                <Brain className="text-white w-4 h-4" />
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[85%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-tr-none'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <div className="text-xs opacity-70 flex items-center justify-end mt-1">
                <Clock className="w-3 h-3 inline mr-1" />
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </motion.div>
            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center ml-2 flex-shrink-0">
                <MessageSquare className="text-white w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center mt-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center mr-2">
                <Brain className="text-white w-4 h-4" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex items-center">
                <span className="typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* This div is for scrolling to the bottom */}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="mt-auto">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="resize-none"
            rows={2}
          />
          <Button 
            onClick={handleSend} 
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 flex-shrink-0 h-auto"
            disabled={!input.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-center text-gray-500 mt-2">
          Sakha is here to listen and provide support. For professional help, please reach out to a counselor.
        </p>
      </div>
      
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: rgba(107, 70, 193, 0.8);
          margin: 0 2px;
          animation: dot-pulse 1.5s infinite ease-in-out;
        }
        
        .dot:nth-child(1) {
          animation-delay: 0s;
        }
        
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes dot-pulse {
          0%, 60%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          30% {
            transform: scale(1.5);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatTab;
