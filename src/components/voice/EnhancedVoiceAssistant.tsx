
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Send, MessageCircle, X, Volume2, VolumeX, Settings } from 'lucide-react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface EnhancedVoiceAssistantProps {
  position?: 'homepage' | 'dashboard';
  onCommand?: (command: string) => void;
  className?: string;
  userName?: string;
}

const EnhancedVoiceAssistant: React.FC<EnhancedVoiceAssistantProps> = ({ 
  position = 'homepage', 
  onCommand,
  className = '',
  userName = 'Student'
}) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('Processing voice command:', lowerCommand);

    // Add user message to chat
    addMessage('user', command);

    // Process command based on position
    if (position === 'homepage') {
      handleHomepageCommands(lowerCommand);
    } else if (position === 'dashboard') {
      handleDashboardCommands(lowerCommand);
    }

    if (onCommand) {
      onCommand(command);
    }
  };

  const {
    voiceSettings,
    isVoiceSupported,
    isListening,
    startListening,
    stopListening,
    speakMessage,
    transcript
  } = useVoiceAnnouncer({ 
    userName: userName, 
    autoStart: false,
    onCommand: handleVoiceCommand
  });

  const addMessage = (type: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleHomepageCommands = (command: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';

      if (command.includes('what is prepzr') || command.includes('tell me about prepzr')) {
        response = 'PREPZR is India\'s first emotionally aware, hyper-personalized adaptive exam preparation platform. We use AI to understand your learning style, emotional state, and academic needs to create a completely customized study experience for exams like NEET, JEE, UPSC, and CAT.';
      } else if (command.includes('features') || command.includes('what can you do')) {
        response = 'PREPZR offers AI-powered personalized learning, adaptive flashcards, interactive practice exams, mood-based study recommendations, real-time performance analytics, and 24/7 voice assistance. Our platform creates custom study plans based on your emotional state and learning patterns.';
      } else if (command.includes('free trial') || command.includes('trial')) {
        response = 'Great! You can start your 7-day free trial right now. You\'ll get full access to all our features including personalized study plans, AI tutoring, and practice exams. Let me help you get started.';
      } else if (command.includes('exam readiness') || command.includes('scholarship test') || command.includes('analyze')) {
        window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
        response = 'Opening our exam readiness analyzer. This will evaluate your current preparation level and create a personalized study roadmap for you.';
      } else if (command.includes('signup') || command.includes('sign up') || command.includes('register')) {
        navigate('/signup');
        response = 'Taking you to the signup page. You can create your account and start your personalized exam preparation journey.';
      } else if (command.includes('benefits') || command.includes('why prepzr')) {
        response = 'PREPZR helps you save valuable time with personalized learning, reduces exam stress through emotional support, builds strong study habits, provides syllabus-aligned content, boosts confidence with adaptive practice, and offers smart performance analytics.';
      } else {
        response = `I heard you say: "${command}". I'm your PREPZR AI assistant! I can help you explore PREPZR features, start a free trial, analyze your exam readiness, or guide you through our platform. What would you like to know?`;
      }

      addMessage('assistant', response);
      speakMessage(response);
      setIsTyping(false);
    }, 1000);
  };

  const handleDashboardCommands = (command: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';

      if (command.includes('dashboard') || command.includes('home')) {
        navigate('/dashboard/student');
        response = 'Navigating to your dashboard';
      } else if (command.includes('concepts') || command.includes('learn')) {
        navigate('/dashboard/student/concepts');
        response = 'Opening concepts page';
      } else if (command.includes('flashcard') || command.includes('flash card')) {
        navigate('/dashboard/student/flashcards');
        response = 'Opening flashcards';
      } else if (command.includes('practice exam') || command.includes('test')) {
        navigate('/dashboard/student/practice-exam');
        response = 'Opening practice exams';
      } else if (command.includes('profile') || command.includes('settings')) {
        navigate('/dashboard/student/profile');
        response = 'Opening profile settings';
      } else if (command.includes('study plan') || command.includes('schedule')) {
        response = 'Let me show you your personalized study plan based on your current progress and goals.';
      } else if (command.includes('how am i doing') || command.includes('progress')) {
        response = 'Based on your recent activity, you\'re making excellent progress! You\'ve completed 68% of your Physics concepts and your practice exam scores are improving. Keep up the great work!';
      } else {
        response = `I heard you say: "${command}". I'm your PREPZR AI assistant! I can help you navigate to different sections, check your progress, open your study plan, or answer questions about your preparation. What would you like to do?`;
      }

      addMessage('assistant', response);
      speakMessage(response);
      setIsTyping(false);
    }, 1000);
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    
    handleVoiceCommand(textInput);
    setTextInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  if (!isVoiceSupported) {
    return null;
  }

  return (
    <div className={`fixed ${className} z-50`}>
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <Button
              onClick={() => setIsExpanded(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full p-4 shadow-lg backdrop-blur-sm"
              size="lg"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="sr-only">Open AI Assistant</span>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="w-96 max-h-[600px]"
          >
            <Card className="shadow-2xl border-2 border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">
                    PREPZR AI Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                    className="text-white hover:bg-white/20 p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-purple-100 text-sm">
                  {position === 'homepage' 
                    ? 'Ask me about PREPZR features and get started!' 
                    : 'Your intelligent study companion'}
                </p>
              </CardHeader>
              
              <CardContent className="p-0">
                {/* Chat Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 text-purple-300" />
                      <p className="text-sm">
                        {position === 'homepage' 
                          ? 'Hi! Ask me about PREPZR or use voice commands'
                          : 'Hello! How can I help with your studies today?'}
                      </p>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Voice Controls */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2 mb-3">
                    <Button
                      onClick={isListening ? stopListening : startListening}
                      variant={isListening ? "destructive" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      {isListening ? (
                        <>
                          <MicOff className="h-4 w-4 mr-2" />
                          Stop Listening
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-2" />
                          Voice Command
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {/* Text Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleTextSubmit} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {transcript && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
                      <strong>Heard:</strong> {transcript}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedVoiceAssistant;
