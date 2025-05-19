
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, MessageSquare, User, Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AskTutorSectionProps {
  conceptId: string;
  title: string;
  subject: string;
  topic: string;
}

const AskTutorSection: React.FC<AskTutorSectionProps> = ({ conceptId, title, subject, topic }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{ sender: 'user' | 'tutor', message: string }[]>([
    {
      sender: 'tutor',
      message: `Hi there! I'm your AI tutor for "${title}". How can I help you understand this concept better?`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const newUserMessage = { sender: 'user' as const, message };
    setConversation([...conversation, newUserMessage]);
    
    // Clear input
    setMessage('');
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      // Generate a contextual response based on the concept and question
      let response = '';
      
      if (message.toLowerCase().includes('explain')) {
        response = `"${title}" is a fundamental concept in ${subject}, specifically within the ${topic} area. It involves understanding how different elements interact and function together. Let me break it down for you step by step...`;
      } else if (message.toLowerCase().includes('example')) {
        response = `Here's a practical example of "${title}" in action: Imagine a scenario where... This demonstrates the key principles we discussed.`;
      } else if (message.toLowerCase().includes('difficult') || message.toLowerCase().includes('confus')) {
        response = `Many students find "${title}" challenging at first. The key is to focus on understanding the core principles: 1) First, grasp the basic definition... 2) Then, explore how it relates to other concepts... Does this help clarify things?`;
      } else {
        response = `That's an interesting question about "${title}". In ${subject}, this concept is approached by examining... Would you like me to elaborate on any specific aspect?`;
      }
      
      // Add AI message
      const newTutorMessage = { sender: 'tutor' as const, message: response };
      setConversation(prev => [...prev, newTutorMessage]);
      
      // End loading state
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full mr-3">
          <Bot className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">AI Tutor Chat</h2>
          <p className="text-sm text-muted-foreground">Ask any questions about "{title}" and get instant help</p>
        </div>
      </div>
      
      <Card className="mb-4 border shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-4 min-h-[300px] max-h-[350px] overflow-y-auto p-2">
            {conversation.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  flex items-start max-w-[80%] space-x-2
                  ${msg.sender === 'user' 
                    ? 'flex-row-reverse space-x-reverse' 
                    : 'flex-row'
                  }
                `}>
                  <div className={`
                    p-1 rounded-full 
                    ${msg.sender === 'user' 
                      ? 'bg-blue-100 dark:bg-blue-900/30' 
                      : 'bg-gray-100 dark:bg-gray-800'
                    }
                  `}>
                    {msg.sender === 'user' 
                      ? <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      : <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    }
                  </div>
                  <div className={`
                    py-2 px-3 rounded-lg text-sm
                    ${msg.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }
                  `}>
                    {msg.message}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800">
                    <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything about this concept..."
            className="w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
        </div>
        <Button 
          onClick={handleSendMessage} 
          disabled={isLoading || !message.trim()}
          className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
        Your conversation with AI Tutor will be saved for this study session
      </div>
    </div>
  );
};

export default AskTutorSection;
