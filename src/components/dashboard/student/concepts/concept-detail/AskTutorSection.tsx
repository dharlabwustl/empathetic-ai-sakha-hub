
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, User, Bot, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: Date;
}

interface AskTutorSectionProps {
  conceptId: string;
  title: string;
  subject: string;
  topic: string;
}

const AskTutorSection: React.FC<AskTutorSectionProps> = ({
  conceptId,
  title,
  subject,
  topic
}) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSendQuestion = async () => {
    if (!question.trim()) return;
    
    // Create user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      // In a real app, this would be an API call to a backend AI service
      let aiResponse = '';
      
      if (question.toLowerCase().includes('difficult') || question.toLowerCase().includes('hard')) {
        aiResponse = `${title} can be challenging, but breaking it down helps! Focus on understanding the core principles first, then move to applications. What specific part are you struggling with?`;
      } else if (question.toLowerCase().includes('exam') || question.toLowerCase().includes('test')) {
        aiResponse = `For exam preparation on ${title}, practice with varied question types. I'd recommend first ensuring you understand all the formulas and concepts thoroughly, then doing timed practice to simulate exam conditions.`;
      } else if (question.toLowerCase().includes('explain') || question.toLowerCase().includes('what is')) {
        aiResponse = `${title} is a fundamental concept in ${subject}, particularly within ${topic}. It describes how objects interact with each other based on principles of physics. Would you like me to elaborate on a specific aspect of this concept?`;
      } else {
        aiResponse = `Great question about ${title}! This concept is important in ${subject} and helps explain many phenomena we observe. Can you tell me which part you'd like to explore further?`;
      }
      
      // Create tutor response
      const tutorMessage: Message = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, tutorMessage]);
      setQuestion('');
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  return (
    <div className="flex flex-col h-[500px] max-h-[500px] border rounded-lg overflow-hidden bg-white dark:bg-gray-800/50">
      {/* Chat header */}
      <div className="p-4 border-b flex items-center bg-gray-50 dark:bg-gray-800">
        <MessageCircle className="h-5 w-5 text-blue-500 mr-2" />
        <div>
          <h3 className="font-medium">AI Tutor Assistant</h3>
          <p className="text-xs text-muted-foreground">Ask questions about {title}</p>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
            <Bot className="h-12 w-12 mb-2 text-blue-500 opacity-50" />
            <h3 className="font-medium text-lg">AI Tutor Assistant</h3>
            <p className="max-w-sm text-sm mt-1">
              I can answer questions about {title} and help you understand concepts better. What would you like to know?
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-100 dark:bg-gray-700 rounded-bl-none'
                }`}
              >
                <div className="flex items-center mb-1 gap-1">
                  {message.sender === 'user' ? (
                    <>
                      <span className="text-xs font-medium">You</span>
                      <User className="h-3 w-3" />
                    </>
                  ) : (
                    <>
                      <Bot className="h-3 w-3" />
                      <span className="text-xs font-medium">AI Tutor</span>
                    </>
                  )}
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <div className="text-right mt-1">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
        
        {isLoading && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">AI Tutor is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about this concept..."
            className="min-h-12 resize-none"
          />
          <Button 
            onClick={handleSendQuestion} 
            disabled={!question.trim() || isLoading}
            className="flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Powered by AI Tutor • Responses may not be completely accurate
        </div>
      </div>
    </div>
  );
};

export default AskTutorSection;
