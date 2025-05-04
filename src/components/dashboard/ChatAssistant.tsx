
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Mic, X, Maximize2, Minimize2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatAssistantProps {
  userType: string;
}

const ChatAssistant = ({ userType }: ChatAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot',
      content: `Welcome to your ${userType} dashboard! I'm Sakha, your AI companion. How can I assist you today?`
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get user context from localStorage
  const getUserContext = () => {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        return JSON.parse(userData);
      }
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
    return {
      name: "Student",
      examPreparation: "NEET",
      subjects: ["Physics", "Chemistry", "Biology"]
    };
  };

  const userContext = getUserContext();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { type: 'user', content: input }]);
    
    // Generate contextual responses
    setTimeout(() => {
      let response;
      const query = input.toLowerCase();
      
      if (query.includes("help") || query.includes("assist")) {
        response = `I'd be happy to help! I can assist you with your ${userContext.examPreparation} preparation, provide study tips, or help you navigate the dashboard. What would you like to know?`;
      } 
      else if (query.includes("study plan") || query.includes("academic")) {
        response = `Your study plan for ${userContext.examPreparation} is designed to help you prepare effectively. You can view your active plan, track progress, and update it as needed from the Academic Advisor section.`;
      }
      else if (query.includes("exam") || query.includes("test") || query.includes(userContext.examPreparation?.toLowerCase())) {
        response = `I see you're preparing for ${userContext.examPreparation}. Based on your performance, I recommend focusing on ${userContext.subjects?.[0] || 'core subjects'} in your next study session. Would you like me to help you create a study schedule?`;
      }
      else if (query.includes("progress") || query.includes("how am i doing")) {
        response = "You're making steady progress! Your concept mastery has improved by 15% in the last two weeks. Keep up the good work and consider spending more time on practice questions.";
      }
      else if (query.includes("dashboard") || query.includes("navigate")) {
        response = "The dashboard has several key sections: Overview for your progress summary, Academic Advisor for study plans, Tutoring for getting help, Concept Cards for learning, Practice Exams for testing yourself, and the Feel Good Corner when you need a break.";
      }
      else if (query.includes("concept") || query.includes("cards")) {
        response = "Concept Cards help you master key topics through spaced repetition. They're organized by subject and difficulty. Would you like me to show you how to use them effectively?";
      }
      else if (query.includes("practice") || query.includes("mock")) {
        response = "Practice tests are essential for exam preparation. Our system adapts questions based on your performance to target your weak areas. Would you like to schedule a practice test?";
      }
      else if (query.includes("motivation") || query.includes("tired") || query.includes("stress")) {
        response = "It's normal to feel that way during exam preparation. Take short breaks, practice mindfulness, and remember your goals. The Feel Good Corner has resources to help you stay motivated.";
      }
      else {
        response = `I understand. Is there anything specific about your ${userContext.examPreparation} preparation I can help with? You can ask about your study plan, concept mastery, or practice tests.`;
      }
      
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    }, 1000);
    
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <TooltipProvider>
      {/* Floating Button */}
      {!isOpen && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="floating-avatar fixed bottom-4 right-4 z-50 flex items-center justify-center h-12 w-12 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setIsOpen(true)}
            >
              <div className="relative">
                <div className="absolute w-full h-full rounded-full animate-pulse bg-primary/50"></div>
                <MessageSquare className="h-6 w-6 text-white relative z-10" />
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Chat with Sakha AI Assistant</p>
          </TooltipContent>
        </Tooltip>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div 
          className={`fixed z-50 bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 ${
            isExpanded 
              ? "inset-4 md:inset-16" 
              : "bottom-4 right-4 w-80 md:w-96 h-[500px]"
          }`}
        >
          {/* Chat Header */}
          <div className="p-3 bg-gradient-to-r from-primary to-violet-500 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Sakha AI Assistant</h3>
                <p className="text-xs opacity-80">Your personal AI companion</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 h-8 w-8"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{isExpanded ? "Minimize" : "Maximize"} chat</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 h-8 w-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <X size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Close chat</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="h-[calc(100%-104px)] p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`mb-4 p-3 rounded-lg max-w-[85%] ${
                  msg.type === 'user' 
                    ? 'ml-auto bg-primary text-white' 
                    : 'bg-muted'
                }`}
              >
                <p>{msg.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                  >
                    <Mic size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Use voice input (coming soon)</p>
                </TooltipContent>
              </Tooltip>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Sakha anything..."
                className="flex-1"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="bg-primary text-white hover:bg-primary/90"
                    size="icon"
                    onClick={handleSendMessage}
                  >
                    <MessageSquare size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send message</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {input.length === 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setInput(`Help me with my ${userContext.examPreparation} study plan`)}
                >
                  Help with study plan
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setInput("What features do I have access to?")}
                >
                  Available features
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setInput("I need motivation")}
                >
                  I need motivation
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </TooltipProvider>
  );
};

export default ChatAssistant;
