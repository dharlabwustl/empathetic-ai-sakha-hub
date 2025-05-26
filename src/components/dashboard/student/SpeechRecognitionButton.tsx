
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

    // Speak response
    const speak = (message: string) => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    };

    // Navigation commands
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      speak('Opening your dashboard');
      navigate('/dashboard/student');
    } else if (lowerCommand.includes('concept') || lowerCommand.includes('study material')) {
      speak('Opening concept cards');
      navigate('/dashboard/student/concepts');
    } else if (lowerCommand.includes('flashcard') || lowerCommand.includes('flash card')) {
      speak('Opening flashcards');
      navigate('/dashboard/student/flashcards');
    } else if (lowerCommand.includes('practice exam') || lowerCommand.includes('test')) {
      speak('Opening practice exams');
      navigate('/dashboard/student/practice-exam');
    } else if (lowerCommand.includes('study plan') || lowerCommand.includes('today')) {
      speak('Opening your study plan');
      navigate('/dashboard/student/today');
    } else if (lowerCommand.includes('tutor') || lowerCommand.includes('chat')) {
      speak('Opening AI tutor');
      navigate('/dashboard/student/tutor');
    } else if (lowerCommand.includes('profile') || lowerCommand.includes('account')) {
      speak('Opening your profile');
      navigate('/dashboard/student/profile');
    } else if (lowerCommand.includes('feel good') || lowerCommand.includes('motivation')) {
      speak('Opening Feel Good Corner');
      navigate('/dashboard/student/feel-good-corner');
    } else if (context === 'homepage') {
      // Homepage specific commands
      if (lowerCommand.includes('start') || lowerCommand.includes('sign up') || lowerCommand.includes('register')) {
        speak('Redirecting to sign up');
        navigate('/signup');
      } else if (lowerCommand.includes('login') || lowerCommand.includes('sign in')) {
        speak('Redirecting to login');
        navigate('/login');
      } else if (lowerCommand.includes('learn more') || lowerCommand.includes('about')) {
        speak('Here you can learn about PREPZR features and start your preparation journey');
      } else {
        speak(`Hello! I'm Sakha AI. You can say "start preparation", "learn more", or "sign up" to get started.`);
      }
    } else {
      // Dashboard context - provide helpful suggestions
      speak(`Hello ${userName}! You can say things like "open concepts", "show study plan", "practice exam", or "chat with tutor" to navigate.`);
    }
  };

  const handleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      return;
    }

    // Start listening
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
      
      // Speak greeting
      const greeting = context === 'homepage' 
        ? "Hi! I'm listening. You can ask me to navigate or get started with PREPZR."
        : `Hi ${userName}! I'm listening. What would you like to do?`;
      
      const utterance = new SpeechSynthesisUtterance(greeting);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
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
