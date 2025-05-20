
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, SendIcon, ArrowRight } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai'; content: string; timestamp: string}[]>([]);
  const { toast } = useToast();
  
  const handleSubmit = () => {
    if (!question.trim()) return;
    
    setIsSubmitting(true);
    
    // Add user message
    const userMessage = {
      role: 'user' as const,
      content: question,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      // Sample AI tutor response
      const aiResponse = {
        role: 'ai' as const,
        content: `I'd be happy to help you understand ${title}. This is an important concept in ${subject}, especially when studying ${topic}. Could you tell me what specific aspect you're finding challenging?`,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setQuestion('');
      setIsSubmitting(false);
      
      toast({
        title: "Tutor Response",
        description: "Your AI tutor has responded to your question"
      });
    }, 1500);
  };
  
  return (
    <div className="p-6 h-[500px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-bold">Ask Your AI Tutor</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
            <MessageCircle className="h-10 w-10 mb-2 opacity-50" />
            <p className="font-medium">No messages yet</p>
            <p className="text-sm">Ask your AI tutor anything about this concept</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="flex gap-2">
        <Textarea
          placeholder="Ask a question about this concept..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <Button 
          onClick={handleSubmit} 
          disabled={!question.trim() || isSubmitting}
          className="h-full"
        >
          {isSubmitting ? (
            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <SendIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Suggested questions
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {["How is this applied in real life?", "What are common mistakes?", "How does this connect to other concepts?"].map((q, i) => (
            <Button 
              key={i} 
              variant="outline" 
              size="sm" 
              className="text-xs flex items-center gap-1"
              onClick={() => setQuestion(q)}
            >
              {q} <ArrowRight className="h-3 w-3" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AskTutorSection;
