
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, MessageCircle, Send, X, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveVoiceAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
  assistantName?: string;
}

const InteractiveVoiceAssistant: React.FC<InteractiveVoiceAssistantProps> = ({
  userName = 'User',
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right',
  className = '',
  assistantName = 'PREPZR AI'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [conversation, setConversation] = useState<Array<{id: string, type: 'user' | 'assistant', message: string, timestamp: Date}>>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = language;
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
      };
      
      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        if (event.results[event.results.length - 1].isFinal) {
          handleUserInput(transcript);
          setIsListening(false);
        }
      };
      
      recognitionInstance.onerror = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [language]);

  const speakMessage = (message: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    
    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/gi, 'PREP-zer');
    speech.lang = language;
    speech.rate = 0.9;
    speech.pitch = 1.0;
    speech.volume = 0.8;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.includes('en') && 
      (voice.name.toLowerCase().includes('female') || !voice.name.toLowerCase().includes('male'))
    );
    
    if (preferredVoice) {
      speech.voice = preferredVoice;
    }

    speech.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  const handleUserInput = (input: string) => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      message: input,
      timestamp: new Date()
    };
    
    setConversation(prev => [...prev, userMessage]);
    
    // Process the command and generate response
    const response = processVoiceCommand(input);
    
    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant' as const,
      message: response,
      timestamp: new Date()
    };
    
    setConversation(prev => [...prev, assistantMessage]);
    speakMessage(response);
  };

  const processVoiceCommand = (command: string): string => {
    const lowerCommand = command.toLowerCase().trim();
    const currentPath = window.location.pathname;
    
    // Determine context based on current page
    if (currentPath === '/' || currentPath.includes('index')) {
      return processHomepageCommand(lowerCommand);
    } else if (currentPath.includes('dashboard')) {
      return processDashboardCommand(lowerCommand);
    }
    
    return "I'm here to help! How can I assist you today?";
  };

  const processHomepageCommand = (command: string): string => {
    // Homepage-specific commands
    if (command.includes('what is prepzr') || command.includes('about prepzr')) {
      return 'PREPZR is India\'s most advanced AI-powered exam preparation platform, revolutionizing how students prepare for competitive exams like NEET, JEE, and other entrance tests with personalized learning paths.';
    }
    
    if (command.includes('feature') || command.includes('capabilities')) {
      return 'PREPZR offers revolutionary features: AI-powered personalized study plans, interactive concept cards, smart flashcards, comprehensive practice exams, formula lab, real-time exam readiness analysis, and exclusive scholarship opportunities worth up to 10 lakh rupees!';
    }
    
    if (command.includes('free') || command.includes('trial') || command.includes('cost')) {
      return 'Absolutely! PREPZR offers a comprehensive free trial where you can experience our AI-powered features, take sample tests, and explore your personalized study dashboard. Premium plans start at just 199 rupees per month!';
    }
    
    if (command.includes('signup') || command.includes('register') || command.includes('start')) {
      if (onNavigationCommand) {
        onNavigationCommand('/register');
      }
      return 'Excellent decision! I\'m redirecting you to our quick signup process. Create your free account in under 2 minutes and immediately access our AI-powered study tools!';
    }
    
    if (command.includes('scholarship') || command.includes('prize')) {
      return 'PREPZR offers exclusive scholarship tests with prizes up to 10 lakh rupees! These merit-based opportunities reward your hard work while significantly reducing education costs.';
    }
    
    return 'Welcome to PREPZR! I can tell you about our AI-powered features, free trial opportunities, scholarship tests, pricing, or help you get started. What interests you most?';
  };

  const processDashboardCommand = (command: string): string => {
    // Dashboard-specific commands
    if (command.includes('study plan') || command.includes('academic advisor')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student');
      }
      return `${userName}, here's your personalized study plan crafted specifically for your exam goals and learning style.`;
    }
    
    if (command.includes('today') || command.includes('daily plan') || command.includes('tasks')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/today');
      }
      return `Let's review your daily learning agenda, ${userName}. Your tasks are optimized based on your progress and exam timeline.`;
    }
    
    if (command.includes('concept') || command.includes('study material')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/concepts');
      }
      return 'Your concept library contains comprehensive materials organized by subjects and difficulty. Perfect for deep learning and understanding.';
    }
    
    if (command.includes('flashcard') || command.includes('quick review')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/flashcards');
      }
      return 'Flashcard sessions boost memory retention significantly. Your personalized deck focuses on high-yield content for maximum impact.';
    }
    
    if (command.includes('practice') || command.includes('exam') || command.includes('test')) {
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/practice-exam');
      }
      return 'Practice testing is proven to enhance performance. Your mock exams simulate real exam conditions for better preparation.';
    }
    
    if (command.includes('readiness') || command.includes('performance')) {
      return `${userName}, your preparation journey is building momentum. Focus on consistent daily practice to boost your readiness score and exam confidence.`;
    }
    
    if (command.includes('motivation') || command.includes('encourage')) {
      return `${userName}, your commitment to daily learning is impressive! Each session strengthens your knowledge and builds exam confidence. Excellence is a habit you're developing beautifully.`;
    }
    
    return `${userName}, I'm here to enhance your learning experience! You can ask about study plans, today's tasks, concept reviews, practice tests, or study guidance. How can I support your preparation today?`;
  };

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleUserInput(textInput);
      setTextInput('');
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversation]);

  const positionClasses = position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6';

  return (
    <div className={`fixed ${positionClasses} z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4"
          >
            <Card className="w-80 h-96 shadow-2xl border-2 border-blue-200">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">{assistantName}</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                      className="text-white hover:bg-white/20 p-1"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-blue-100 text-sm mt-1">
                  {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Ready to help!'}
                </p>
              </div>
              
              <CardContent className="p-0 flex flex-col h-80">
                <div ref={conversationRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                  {conversation.length === 0 && (
                    <div className="text-center text-gray-500 text-sm">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      Start a conversation by typing or using voice!
                    </div>
                  )}
                  
                  {conversation.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.message}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex gap-2">
                    <Input
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleTextSubmit}
                      size="sm"
                      disabled={!textInput.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={isListening ? stopListening : startListening}
                      size="sm"
                      variant={isListening ? "destructive" : "outline"}
                      disabled={!recognition}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl border-2 border-white"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6 text-white" />
            {(isListening || isSpeaking) && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            )}
          </div>
        </Button>
      </motion.div>
    </div>
  );
};

export default InteractiveVoiceAssistant;
