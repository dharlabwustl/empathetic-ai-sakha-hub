
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, MessageCircle, Send, X } from 'lucide-react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SpeechRecognitionButtonProps {
  position?: 'homepage' | 'dashboard';
  onCommand?: (command: string) => void;
  className?: string;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({ 
  position = 'homepage', 
  onCommand,
  className = ''
}) => {
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('Processing voice command:', lowerCommand);

    // Add user message
    addMessage('user', command);

    // Homepage specific commands
    if (position === 'homepage') {
      if (lowerCommand.includes('what is prepzr') || lowerCommand.includes('tell me about prepzr')) {
        respondWithMessage('PREPZR is India\'s first emotionally aware, hyper-personalized adaptive exam preparation platform. We use artificial intelligence to understand your learning style, emotional state, and academic needs to create a completely customized study experience. Our platform adapts in real-time to help you achieve your best performance in exams like NEET, JEE, UPSC, and CAT.');
        return;
      }

      if (lowerCommand.includes('features') || lowerCommand.includes('what can you do')) {
        respondWithMessage('PREPZR offers AI-powered personalized learning, adaptive flashcards, interactive practice exams, mood-based study recommendations, real-time performance analytics, and 24/7 voice assistance. Our platform creates custom study plans based on your emotional state and learning patterns.');
        return;
      }

      if (lowerCommand.includes('free trial') || lowerCommand.includes('trial')) {
        respondWithMessage('Great! You can start your 7-day free trial right now. You\'ll get full access to all our features including personalized study plans, AI tutoring, and practice exams. Let me help you get started.');
        return;
      }

      if (lowerCommand.includes('exam readiness') || lowerCommand.includes('scholarship test') || lowerCommand.includes('analyze')) {
        window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
        respondWithMessage('Opening our exam readiness analyzer. This will evaluate your current preparation level and create a personalized study roadmap for you.');
        return;
      }

      if (lowerCommand.includes('signup') || lowerCommand.includes('sign up') || lowerCommand.includes('register')) {
        navigate('/signup');
        respondWithMessage('Taking you to the signup page. You can create your account and start your personalized exam preparation journey.');
        return;
      }

      if (lowerCommand.includes('benefits') || lowerCommand.includes('why prepzr')) {
        respondWithMessage('PREPZR helps you save valuable time with personalized learning, reduces exam stress through emotional support, builds strong study habits, provides syllabus-aligned content, boosts confidence with adaptive practice, and offers smart performance analytics. We\'re here to make your exam preparation journey smoother and more effective.');
        return;
      }
    }

    // Dashboard specific commands
    if (position === 'dashboard') {
      if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
        navigate('/dashboard/student');
        respondWithMessage('Navigating to your dashboard');
        return;
      }

      if (lowerCommand.includes('concepts') || lowerCommand.includes('learn')) {
        navigate('/dashboard/student/concepts');
        respondWithMessage('Opening concepts page');
        return;
      }

      if (lowerCommand.includes('flashcard') || lowerCommand.includes('flash card')) {
        navigate('/dashboard/student/flashcards');
        respondWithMessage('Opening flashcards');
        return;
      }

      if (lowerCommand.includes('practice exam') || lowerCommand.includes('test')) {
        navigate('/dashboard/student/practice-exam');
        respondWithMessage('Opening practice exams');
        return;
      }

      if (lowerCommand.includes('profile') || lowerCommand.includes('settings')) {
        navigate('/dashboard/student/profile');
        respondWithMessage('Opening profile settings');
        return;
      }

      if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule')) {
        respondWithMessage('Let me show you your personalized study plan');
        return;
      }

      if (lowerCommand.includes('how am i doing') || lowerCommand.includes('progress')) {
        respondWithMessage('Based on your recent activity, you\'re making great progress! You\'ve completed 68% of your Physics concepts and your practice exam scores are improving. Keep up the excellent work!');
        return;
      }
    }

    // Common commands for both positions
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      const helpMessage = position === 'homepage' 
        ? 'I am your PREPZR AI assistant. I can tell you about PREPZR features, help you start a free trial, analyze your exam readiness, explain our benefits, or help you sign up. Just ask me anything about exam preparation!'
        : 'I am your PREPZR AI assistant. I can help you navigate to different sections, check your progress, open your study plan, or answer questions about your preparation. What would you like to do?';
      respondWithMessage(helpMessage);
      return;
    }

    // Default response
    const defaultMessage = position === 'homepage'
      ? `I heard you say: ${command}. I'm your PREPZR AI assistant, here to help you explore PREPZR and start your exam preparation journey. You can ask me about our features, benefits, or start your free trial!`
      : `I heard you say: ${command}. I'm your PREPZR AI assistant, here to assist with your studies. You can ask me to navigate to different sections or check your progress.`;
    
    respondWithMessage(defaultMessage);
    
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
    userName: position === 'homepage' ? 'Visitor' : 'Student', 
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

  const respondWithMessage = (message: string) => {
    setIsTyping(true);
    setTimeout(() => {
      addMessage('assistant', message);
      speakMessage(message);
      setIsTyping(false);
    }, 1000);
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    handleVoiceCommand(textInput);
    setTextInput('');
  };

  // Request microphone permission
  useEffect(() => {
    const requestPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (error) {
        console.error('Microphone permission denied:', error);
        setHasPermission(false);
      }
    };

    if (isVoiceSupported) {
      requestPermission();
    }
  }, [isVoiceSupported]);

  const handleClick = () => {
    if (!hasPermission) {
      speakMessage('Please allow microphone access to use voice commands');
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
      // Only speak greeting once per session to avoid repetition
      const hasSpokenGreeting = sessionStorage.getItem('voice_button_greeted');
      if (!hasSpokenGreeting) {
        const greeting = position === 'homepage' 
          ? 'Hello! I\'m your PREPZR AI assistant. How can I help you explore our exam preparation platform today?'
          : 'Hi! I\'m your PREPZR AI assistant. I\'m listening. How can I help you with your studies today?';
        speakMessage(greeting);
        sessionStorage.setItem('voice_button_greeted', 'true');
      }
    }
  };

  if (!isVoiceSupported || !hasPermission) {
    return null;
  }

  return (
    <div className={className}>
      <AnimatePresence>
        {!showChat ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <Button
              onClick={() => setShowChat(true)}
              variant="outline"
              size="lg"
              className="bg-white/90 hover:bg-white border-2 border-blue-600 text-blue-600 rounded-full p-4 shadow-lg backdrop-blur-sm transition-all duration-300"
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
            className="w-96 max-h-[500px]"
          >
            <Card className="shadow-2xl border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">PREPZR AI</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowChat(false)}
                    className="text-white hover:bg-white/20 p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                {/* Chat Messages */}
                <div className="h-64 overflow-y-auto p-3 space-y-2 bg-gray-50">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-500 py-6">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                      <p className="text-sm">
                        {position === 'homepage' 
                          ? 'Ask me about PREPZR!' 
                          : 'How can I help you study?'}
                      </p>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-2 rounded-lg text-sm ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border text-gray-800'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border p-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Controls */}
                <div className="p-3 border-t">
                  <div className="flex gap-2 mb-2">
                    <Button
                      onClick={handleClick}
                      variant={isListening ? "destructive" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      {isListening ? (
                        <>
                          <MicOff className="h-4 w-4 mr-1" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-1" />
                          Voice
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                      className="flex-1 text-sm"
                    />
                    <Button onClick={handleTextSubmit} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpeechRecognitionButton;
