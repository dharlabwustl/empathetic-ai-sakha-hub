
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

    // Navigation commands
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      navigate('/dashboard/student');
      speakMessage('Navigating to dashboard');
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

    // Study commands
    if (lowerCommand.includes('start studying') || lowerCommand.includes('begin study')) {
      speakMessage('Starting your study session. What would you like to focus on today?');
      return;
    }

    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('scholarship test')) {
      window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
      speakMessage('Opening exam readiness analyzer');
      return;
    }

    // Default response
    speakMessage('I heard you say: ' + command + '. How can I help you with your studies today?');
    
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
    userName: 'Student', 
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
      speakMessage('I am listening. How can I help you today?');
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
