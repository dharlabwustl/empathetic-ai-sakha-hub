
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, SendIcon, Sparkles } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    id: string;
    message: string;
    sender: 'user' | 'tutor';
    timestamp: Date;
  }>>([
    {
      id: '1',
      message: `Hello! I'm your AI tutor for ${subject}. Ask me anything about ${title} or related topics in ${topic}.`,
      sender: 'tutor',
      timestamp: new Date()
    }
  ]);

  const handleSendQuestion = () => {
    if (!question.trim()) return;
    
    // Add user message to conversation
    const userMessage = {
      id: Date.now().toString(),
      message: question,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        message: getSimulatedResponse(question, title),
        sender: 'tutor' as const,
        timestamp: new Date()
      };
      
      setConversation(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
    
    setQuestion('');
  };

  // Simple simulated AI response based on the question
  const getSimulatedResponse = (question: string, conceptTitle: string) => {
    if (question.toLowerCase().includes('example')) {
      return `Here's an example of ${conceptTitle}: If a 2kg object experiences a net force of 10N, its acceleration will be 5 m/s². This directly applies the formula F = ma, where F is force, m is mass, and a is acceleration.`;
    } else if (question.toLowerCase().includes('formula')) {
      return `The main formula for ${conceptTitle} is F = ma, where F represents the net force acting on an object, m is the mass of the object, and a is the acceleration produced.`;
    } else if (question.toLowerCase().includes('application') || question.toLowerCase().includes('use')) {
      return `${conceptTitle} has many practical applications! It's used in engineering to design vehicles, in sports to improve athletic performance, and even in space technology to calculate the thrust needed for rockets.`;
    } else {
      return `That's a great question about ${conceptTitle}! This concept is fundamental to understanding how forces affect motion. The key insight is that acceleration is directly proportional to force and inversely proportional to mass. Would you like me to explain a specific aspect in more detail?`;
    }
  };

  return (
    <div className="p-6 flex flex-col h-[500px]">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-bold">Ask Your AI Tutor</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
        {conversation.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 ${
              message.sender === 'user' 
                ? 'ml-auto max-w-[80%] bg-blue-600 text-white rounded-lg rounded-tr-none p-3' 
                : 'mr-auto max-w-[80%] bg-gray-100 dark:bg-gray-800 rounded-lg rounded-tl-none p-3'
            }`}
          >
            <p className="text-sm">{message.message}</p>
            <div 
              className={`text-xs mt-1 ${
                message.sender === 'user' 
                  ? 'text-blue-100' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="mr-auto max-w-[80%] bg-gray-100 dark:bg-gray-800 rounded-lg rounded-tl-none p-3 flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
            <span className="text-sm">AI Tutor is typing...</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-xs"
          onClick={() => setQuestion(`Can you explain ${title} with a simple example?`)}
        >
          <Sparkles className="h-3 w-3" />
          Example
        </Button>
        <Button 
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-xs"
          onClick={() => setQuestion(`What are the applications of ${title}?`)}
        >
          <Sparkles className="h-3 w-3" />
          Applications
        </Button>
        <Button 
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-xs"
          onClick={() => setQuestion(`What formulas are related to ${title}?`)}
        >
          <Sparkles className="h-3 w-3" />
          Formulas
        </Button>
      </div>
      
      <div className="flex gap-2 mt-2">
        <Textarea 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question about this concept..."
          className="resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendQuestion();
            }
          }}
        />
        <Button 
          onClick={handleSendQuestion}
          disabled={!question.trim() || isLoading}
          className="shrink-0"
        >
          <SendIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AskTutorSection;
