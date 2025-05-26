
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Bot,
  User,
  Sparkles
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface InteractiveVoiceAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
}

const InteractiveVoiceAssistant: React.FC<InteractiveVoiceAssistantProps> = ({
  userName = "User",
  language = "en-US",
  onNavigationCommand,
  position = 'bottom-right',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hi ${userName}! I'm PREPZR AI, your intelligent study companion. I can help you navigate, answer questions about your study plan, or provide exam preparation guidance. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  // Sample responses from PREPZR AI
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('dashboard') || lowerMessage.includes('home')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student');
      }
      return "I'm taking you to your dashboard where you can see your study progress and today's plan.";
    }
    
    if (lowerMessage.includes('study plan') || lowerMessage.includes('today')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/today');
      }
      return "Here's your personalized study plan for today. I've organized it based on your learning patterns and goals.";
    }
    
    if (lowerMessage.includes('concept') || lowerMessage.includes('learn')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/concepts');
      }
      return "Let's explore key concepts! I'll help you understand topics with interactive explanations.";
    }
    
    if (lowerMessage.includes('practice') || lowerMessage.includes('exam') || lowerMessage.includes('test')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/practice-exam');
      }
      return "Great! Practice makes perfect. I'll guide you through mock exams tailored to your preparation level.";
    }
    
    if (lowerMessage.includes('flashcard') || lowerMessage.includes('revision')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/flashcards');
      }
      return "Flashcards are excellent for quick revision! I've prepared smart flashcards based on your weak areas.";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello ${userName}! I'm PREPZR AI, ready to help you ace your exams. What would you like to work on today?`;
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return "I can help you with: navigation to different sections, study planning, concept explanations, practice tests, progress tracking, and motivation. Just ask me anything!";
    }
    
    if (lowerMessage.includes('motivation') || lowerMessage.includes('encourage')) {
      return "You're doing great! Every study session brings you closer to your goals. Remember, consistency beats perfection. Keep pushing forward! 🌟";
    }
    
    return "I understand you're asking about exam preparation. As PREPZR AI, I'm here to provide personalized guidance. Could you be more specific about what you'd like help with - study planning, concepts, practice tests, or navigation?";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(inputText),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      
      // Speak the response if not muted
      if (!isMuted) {
        speakText(aiResponse.content);
      }
    }, 1000);
    
    setInputText('');
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && !isMuted) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className={cn("fixed z-40", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <Card className="w-80 h-96 bg-white dark:bg-gray-900 border-2 border-purple-200 dark:border-purple-800 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold">PREPZR AI Assistant</CardTitle>
                      <p className="text-xs opacity-90">Always here to help</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                      className="h-6 w-6 p-0 text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-6 w-6 p-0 text-white hover:bg-white/20"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col h-80 p-0">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-2",
                        message.type === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.type === 'assistant' && (
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Sparkles className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[70%] p-2 rounded-lg text-sm",
                          message.type === 'user'
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        )}
                      >
                        {message.content}
                      </div>
                      {message.type === 'user' && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isSpeaking && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 p-2 rounded-lg">
                        <Volume2 className="h-3 w-3 animate-pulse" />
                        <span className="text-xs">PREPZR AI is speaking...</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Input Area */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask PREPZR AI anything..."
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="sm"
                      className="px-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      disabled={!inputText.trim()}
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 relative",
            isOpen && "shadow-xl"
          )}
        >
          <MessageCircle className="h-5 w-5" />
          {!isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default InteractiveVoiceAssistant;
