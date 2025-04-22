import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserProfileType, ExamPreparation } from '@/types/user/base';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const AIChatTutor: React.FC<{ userProfile: UserProfileType }> = ({ userProfile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Helper function to safely check if a subject is included
  const isSubjectIncluded = (subject: string): boolean => {
    if (!userProfile.examPreparation) return false;
    
    const examPrep = userProfile.examPreparation as ExamPreparation;
    return examPrep.subjects?.includes(subject) || false;
  };
  
  useEffect(() => {
    // Generate a relevant greeting based on the user's exam preparation
    let greeting = `Hello ${userProfile.name}! How can I help you today with your studies?`;
    
    if (userProfile.examPreparation) {
      const examPrep = userProfile.examPreparation as ExamPreparation;
      greeting = `Hello ${userProfile.name}! I'm your AI tutor for ${examPrep.target}. What would you like to learn today?`;
      
      // Add subject-specific greeting
      if (isSubjectIncluded('Physics')) {
        greeting += " I can help with physics problems, explain concepts, or review your solutions.";
      } else if (isSubjectIncluded('Mathematics')) {
        greeting += " I can help with math problems, explain concepts, or walk through solution steps.";
      }
    }
    
    // Add initial message to chat
    setMessages([
      { 
        id: '1', 
        content: greeting, 
        sender: 'ai', 
        timestamp: new Date().toISOString() 
      }
    ]);
  }, [userProfile]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    const newMessage: ChatMessage = {
      id: String(messages.length + 1),
      content: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: String(messages.length + 2),
        content: `AI response to "${input}"... This is a simulated response.`,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 500);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            className={`mb-2 p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 dark:bg-blue-800 text-right self-end' : 'bg-gray-100 dark:bg-gray-800 text-left self-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-sm">{msg.content}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {msg.sender === 'user' ? 'You' : 'AI Tutor'} - {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Type your question..."
            className="flex-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} className="ml-2">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatTutor;
