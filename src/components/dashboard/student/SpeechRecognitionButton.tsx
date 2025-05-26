
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface SpeechRecognitionButtonProps {
  context?: 'homepage' | 'dashboard';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  userName?: string;
}

const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({
  context = 'dashboard',
  className = '',
  size = 'md',
  userName = 'Student'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 w-8';
      case 'lg':
        return 'h-12 w-12';
      default:
        return 'h-10 w-10';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'h-3 w-3';
      case 'lg':
        return 'h-6 w-6';
      default:
        return 'h-4 w-4';
    }
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    console.log('Processing command:', lowerCommand);

    // Speak response function
    const speak = (message: string) => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    };

    if (context === 'homepage') {
      // Homepage intelligent responses
      if (lowerCommand.includes('start') || lowerCommand.includes('free trial') || lowerCommand.includes('signup')) {
        speak('Starting your free trial with PREPZR. You will get access to personalized study plans and our AI tutor.');
        navigate('/signup');
      } else if (lowerCommand.includes('login') || lowerCommand.includes('sign in')) {
        speak('Taking you to login page');
        navigate('/login');
      } else if (lowerCommand.includes('readiness') || lowerCommand.includes('analyze')) {
        speak('Opening exam readiness analyzer to evaluate your preparation level');
        window.dispatchEvent(new Event('open-exam-analyzer'));
      } else if (lowerCommand.includes('features') || lowerCommand.includes('about prepzr')) {
        speak('PREPZR is the world\'s first emotionally intelligent exam platform providing adaptive learning and emotional support');
      } else if (lowerCommand.includes('subscription') || lowerCommand.includes('plans')) {
        speak('We offer flexible subscription plans including free trial, monthly pro, and annual pro with advanced features');
      } else {
        speak('You can say "start free trial", "analyze readiness", "about PREPZR", or "subscription plans" to explore our features');
      }
    } else {
      // Dashboard intelligent responses with academic guidance
      if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
        speak('Opening your personalized dashboard with today\'s study plan');
        navigate('/dashboard/student');
      } else if (lowerCommand.includes('today') || lowerCommand.includes('study plan') || lowerCommand.includes('todays plan')) {
        speak('Opening today\'s adaptive study plan based on your learning profile');
        navigate('/dashboard/student/today');
      } else if (lowerCommand.includes('concept') || lowerCommand.includes('concept card')) {
        speak('Opening concept cards for comprehensive topic understanding');
        navigate('/dashboard/student/concepts');
      } else if (lowerCommand.includes('flashcard') || lowerCommand.includes('flash card')) {
        speak('Opening interactive flashcards for quick revision');
        navigate('/dashboard/student/flashcards');
      } else if (lowerCommand.includes('practice exam') || lowerCommand.includes('mock test') || lowerCommand.includes('test')) {
        speak('Opening practice exams to test your preparation level');
        navigate('/dashboard/student/practice-exam');
      } else if (lowerCommand.includes('formula') || lowerCommand.includes('formula practice')) {
        speak('Opening formula practice for mathematical concepts');
        navigate('/dashboard/student/formula-practice');
      } else if (lowerCommand.includes('tutor') || lowerCommand.includes('ai tutor') || lowerCommand.includes('chat')) {
        speak('Opening AI tutor for personalized academic support');
        navigate('/dashboard/student/tutor');
      } else if (lowerCommand.includes('feel good') || lowerCommand.includes('motivation') || lowerCommand.includes('wellness')) {
        speak('Opening Feel Good Corner for emotional support and motivation');
        navigate('/dashboard/student/feel-good-corner');
      } else if (lowerCommand.includes('profile') || lowerCommand.includes('account')) {
        speak('Opening your profile and academic settings');
        navigate('/dashboard/student/profile');
      } else if (lowerCommand.includes('advisor') || lowerCommand.includes('academic advisor')) {
        speak('Connecting you with academic advisor for guidance');
      } else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
        speak('I can help you navigate your studies. Say "today\'s plan", "concept cards", "practice exam", "AI tutor", or "feel good corner"');
      } else {
        speak(`Hello ${userName}! I can help you with "today\'s plan", "concept cards", "flashcards", "practice exams", "AI tutor", or "feel good corner"`);
      }
    }
  };

  const handleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setShowTranscript(true);
      setTranscript('Listening...');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);

      if (finalTranscript) {
        processVoiceCommand(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setShowTranscript(false);
      setTranscript('');
    };

    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => {
        setShowTranscript(false);
        setTranscript('');
      }, 2000);
    };

    recognition.start();
  };

  return (
    <div className="relative">
      <Button
        onClick={handleSpeechRecognition}
        variant={isListening ? "default" : "outline"}
        size="icon"
        className={`${getSizeClasses()} rounded-full transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse shadow-lg shadow-red-500/25' 
            : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 border-orange-300'
        } ${className}`}
      >
        {isListening ? (
          <MicOff className={getIconSize()} />
        ) : (
          <Mic className={getIconSize()} />
        )}
      </Button>

      {/* Transcript Display */}
      <AnimatePresence>
        {showTranscript && transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-xs z-50"
          >
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              {isListening ? 'Listening...' : 'You said:'}
            </div>
            <div className="text-sm text-gray-900 dark:text-gray-100">
              "{transcript}"
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listening indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-ping"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpeechRecognitionButton;
