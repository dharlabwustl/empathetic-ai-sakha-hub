
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageSquare, Send, Mic, MicOff, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabAIAssistantProps {
  tabName: string;
  context?: string;
  isMinimized?: boolean;
  onToggle?: () => void;
}

const TabAIAssistant: React.FC<TabAIAssistantProps> = ({
  tabName,
  context = '',
  isMinimized = false,
  onToggle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, text: string, isUser: boolean}>>([]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: `I understand you're working on ${tabName}. ${getContextualResponse(tabName, message)}`,
        isUser: false
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    setMessage('');
  };

  const getContextualResponse = (tab: string, userMessage: string) => {
    const responses = {
      'concepts': 'Let me help you understand this concept better. Would you like me to explain it in simpler terms or provide examples?',
      'flashcards': 'I can help you create better flashcards or suggest memory techniques. What specific topic are you studying?',
      'practice-exam': 'I can explain any questions you got wrong or suggest study strategies for better performance.',
      'today': 'I can help optimize your study schedule or suggest breaks based on your current mood.',
      'academic': 'I can provide personalized study recommendations or help with exam preparation strategies.'
    };
    return responses[tab.toLowerCase()] || 'How can I help you with your studies today?';
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
        >
          <Brain className="h-6 w-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-blue-600" />
          AI Assistant
          <Badge variant="outline" className="ml-auto text-xs">
            {tabName}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Messages */}
        <div className="max-h-40 overflow-y-auto space-y-2">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-muted-foreground py-4"
              >
                👋 Hi! I'm here to help with your {tabName.toLowerCase()} studies. Ask me anything!
              </motion.div>
            ) : (
              messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-2 rounded-lg text-sm ${
                    msg.isUser 
                      ? 'bg-blue-100 dark:bg-blue-900/30 ml-8' 
                      : 'bg-white dark:bg-gray-800 mr-8'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={toggleListening}
            variant="outline"
            size="sm"
            className={isListening ? 'bg-red-100 text-red-600' : ''}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button onClick={handleSendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="text-xs">
            Explain this topic
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Create quiz
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Study tips
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TabAIAssistant;
