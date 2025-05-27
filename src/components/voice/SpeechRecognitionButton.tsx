
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from 'lucide-react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useNavigate } from 'react-router-dom';

interface SpeechRecognitionButtonProps {
  position?: 'homepage' | 'dashboard';
  onCommand?: (command: string) => void;
  className?: string;
}

const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({ 
  position = 'homepage', 
  onCommand,
  className = ''
}) => {
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState(false);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('Processing voice command:', lowerCommand);

    // Homepage specific commands
    if (position === 'homepage') {
      if (lowerCommand.includes('what is prepzr') || lowerCommand.includes('tell me about prepzr')) {
        speakMessage('PREPZR is India\'s first emotionally aware, hyper-personalized adaptive exam preparation platform. We use artificial intelligence to understand your learning style, emotional state, and academic needs to create a completely customized study experience. Our platform adapts in real-time to help you achieve your best performance in exams like NEET, JEE, UPSC, and CAT.');
        return;
      }

      if (lowerCommand.includes('features') || lowerCommand.includes('what can you do')) {
        speakMessage('PREPZR offers AI-powered personalized learning, adaptive flashcards, interactive practice exams, mood-based study recommendations, real-time performance analytics, and 24/7 voice assistance. Our platform creates custom study plans based on your emotional state and learning patterns.');
        return;
      }

      if (lowerCommand.includes('free trial') || lowerCommand.includes('trial')) {
        speakMessage('Great! You can start your 7-day free trial right now. You\'ll get full access to all our features including personalized study plans, AI tutoring, and practice exams. Let me help you get started.');
        // Trigger free trial signup
        return;
      }

      if (lowerCommand.includes('exam readiness') || lowerCommand.includes('scholarship test') || lowerCommand.includes('analyze')) {
        window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
        speakMessage('Opening our exam readiness analyzer. This will evaluate your current preparation level and create a personalized study roadmap for you.');
        return;
      }

      if (lowerCommand.includes('signup') || lowerCommand.includes('sign up') || lowerCommand.includes('register')) {
        navigate('/signup');
        speakMessage('Taking you to the signup page. You can create your account and start your personalized exam preparation journey.');
        return;
      }

      if (lowerCommand.includes('benefits') || lowerCommand.includes('why prepzr')) {
        speakMessage('PREPZR helps you save valuable time with personalized learning, reduces exam stress through emotional support, builds strong study habits, provides syllabus-aligned content, boosts confidence with adaptive practice, and offers smart performance analytics. We\'re here to make your exam preparation journey smoother and more effective.');
        return;
      }

      if (lowerCommand.includes('take break') || lowerCommand.includes('break time')) {
        speakMessage('It\'s important to take smart breaks! Research shows that taking a 10-15 minute break every hour improves retention and focus. Would you like me to remind you when it\'s time for your next break?');
        return;
      }
    }

    // Dashboard specific commands
    if (position === 'dashboard') {
      if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
        navigate('/dashboard/student');
        speakMessage('Navigating to your dashboard');
        return;
      }

      if (lowerCommand.includes('concepts') || lowerCommand.includes('learn')) {
        navigate('/dashboard/student/concepts');
        speakMessage('Opening concepts page');
        return;
      }

      if (lowerCommand.includes('flashcard') || lowerCommand.includes('flash card')) {
        navigate('/dashboard/student/flashcards');
        speakMessage('Opening flashcards');
        return;
      }

      if (lowerCommand.includes('practice exam') || lowerCommand.includes('test')) {
        navigate('/dashboard/student/practice-exam');
        speakMessage('Opening practice exams');
        return;
      }

      if (lowerCommand.includes('profile') || lowerCommand.includes('settings')) {
        navigate('/dashboard/student/profile');
        speakMessage('Opening profile settings');
        return;
      }

      if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule')) {
        speakMessage('Let me show you your personalized study plan');
        // Trigger study plan view
        return;
      }

      if (lowerCommand.includes('how am i doing') || lowerCommand.includes('progress')) {
        speakMessage('Based on your recent activity, you\'re making great progress! You\'ve completed 68% of your Physics concepts and your practice exam scores are improving. Keep up the excellent work!');
        return;
      }
    }

    // Common commands for both positions
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      const helpMessage = position === 'homepage' 
        ? 'I can tell you about PREPZR features, help you start a free trial, analyze your exam readiness, explain our benefits, or help you sign up. Just ask me anything about exam preparation!'
        : 'I can help you navigate to different sections, check your progress, open your study plan, or answer questions about your preparation. What would you like to do?';
      speakMessage(helpMessage);
      return;
    }

    // Default response
    const defaultMessage = position === 'homepage'
      ? `I heard you say: ${command}. I'm here to help you explore PREPZR and start your exam preparation journey. You can ask me about our features, benefits, or start your free trial!`
      : `I heard you say: ${command}. I'm here to assist with your studies. You can ask me to navigate to different sections or check your progress.`;
    
    speakMessage(defaultMessage);
    
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
      const greeting = position === 'homepage' 
        ? 'Hello! I\'m your PREPZR voice assistant. How can I help you explore our exam preparation platform today?'
        : 'Hi! I\'m listening. How can I help you with your studies today?';
      speakMessage(greeting);
    }
  };

  if (!isVoiceSupported || !hasPermission) {
    return null;
  }

  return (
    <Button
      onClick={handleClick}
      variant={isListening ? "default" : "outline"}
      size="lg"
      className={`${className} ${
        isListening 
          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
          : 'bg-white/90 hover:bg-white border-2 border-blue-600 text-blue-600'
      } rounded-full p-4 shadow-lg backdrop-blur-sm transition-all duration-300`}
    >
      {isListening ? (
        <MicOff className="h-6 w-6" />
      ) : (
        <Mic className="h-6 w-6" />
      )}
      <span className="sr-only">
        {isListening ? 'Stop listening' : 'Start voice command'}
      </span>
    </Button>
  );
};

export default SpeechRecognitionButton;
