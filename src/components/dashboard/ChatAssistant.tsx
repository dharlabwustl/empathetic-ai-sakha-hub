
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Headphones, Loader, Maximize2, Minimize2, Send, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import PrepzrLogo from '@/components/common/PrepzrLogo';

interface ChatAssistantProps {
  userType?: string;
  initialPrompt?: string;
}

const ChatAssistant = ({ userType = 'student', initialPrompt = '' }: ChatAssistantProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState(initialPrompt);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open, minimized]);

  // Simulate sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const responses = {
        'student': 'I can help you with your studies! What subject are you working on?',
        'employee': 'How can I assist with your work today?',
        'default': 'How can I assist you today?'
      };
      
      const responseText = responses[userType as keyof typeof responses] || responses.default;
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
      setLoading(false);
    }, 1000);
  };
  
  const toggleMinimize = () => {
    setMinimized(!minimized);
  };
  
  const toggleOpen = () => {
    setOpen(!open);
    if (!open) {
      setMinimized(false);
    }
  };

  return (
    <>
      {/* Floating button to open chat */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              onClick={toggleOpen}
              className="rounded-full h-14 w-14 bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 p-0 shadow-lg flex items-center justify-center"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col",
              minimized ? "w-64 h-16" : "w-80 md:w-96 h-[600px] max-h-[80vh]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-sky-500/10 to-violet-500/10 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8">
                  <PrepzrLogo width={32} height={32} />
                </div>
                <div className="font-semibold text-lg bg-gradient-to-r from-sky-500 to-violet-500 text-transparent bg-clip-text">
                  PREPZR Assistant
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={toggleMinimize}>
                  {minimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleOpen}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Minimized state only shows a prompt */}
            {minimized ? (
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm">Have a question?</span>
                <Button variant="link" size="sm" onClick={() => setMinimized(false)}>
                  Ask now
                </Button>
              </div>
            ) : (
              <>
                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center py-8 px-4">
                      <Headphones className="h-12 w-12 mx-auto text-sky-500 mb-4" />
                      <h3 className="font-semibold text-lg mb-2">PREPZR Assistant</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        I'm your personal AI assistant for learning. Ask me anything about your studies!
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => setInput("Help me create a study plan")}
                        >
                          Create study plan
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => setInput("Explain a difficult concept")}
                        >
                          Explain a concept
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex flex-col rounded-lg p-3 max-w-[85%]",
                        message.role === "user"
                          ? "ml-auto bg-gradient-to-r from-sky-500 to-violet-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      )}
                    >
                      {message.content}
                    </div>
                  ))}
                  
                  {loading && (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span className="text-sm">PREPZR is thinking...</span>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input area */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex gap-2"
                  >
                    <Textarea
                      placeholder="Ask PREPZR anything..."
                      className="min-h-[40px] max-h-[120px] resize-none"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
