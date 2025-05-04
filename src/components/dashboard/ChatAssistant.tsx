
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Mic, Send, HelpCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUserProfile } from '@/hooks/useUserProfile';

interface ChatAssistantProps {
  userType: 'student' | 'teacher' | 'admin';
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { userProfile } = useUserProfile();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Here we would normally send the message to the backend
    console.log('Sending message:', message);
    
    // For demo purposes, we'll just clear the input
    setMessage('');
  };

  // Enhanced context for the AI assistant
  const getAssistantContext = () => {
    const studentContext = userProfile?.examPreparation 
      ? `You are preparing for ${userProfile.examPreparation}.` 
      : 'You are a student.';
      
    const studyPlanContext = 'You have access to your study plans, practice exams, and concept cards.';
    
    return `${studentContext} ${studyPlanContext}`;
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50">
        {isOpen ? (
          <div className="w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col border border-gray-200 dark:border-gray-700">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 rounded-t-lg">
              <h3 className="font-medium">AI Assistant</h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={toggleChat}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Close AI assistant</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="flex-1 p-4 h-80 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
              <div className="space-y-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">
                    Hi there! I'm your AI assistant. I can help you with your studies, 
                    answer questions about your courses, and provide guidance on your study plans.
                    {userProfile?.examPreparation && (
                      <> I see you're preparing for <strong>{userProfile.examPreparation}</strong>.</>
                    )}
                  </p>
                </div>
                
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">
                    How can I assist you today? You can ask me about:
                    <br />• Your study plan and progress
                    <br />• Concept explanations
                    <br />• Practice exam strategies
                    <br />• Time management tips
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full h-8 w-8"
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Use voice input (coming soon)</p>
                  </TooltipContent>
                </Tooltip>
                
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="min-h-0 h-9 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={handleSendMessage} 
                      size="icon" 
                      className="rounded-full h-8 w-8"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send message</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleChat}
                className="h-12 w-12 rounded-full shadow-lg"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Open AI assistant</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ChatAssistant;
