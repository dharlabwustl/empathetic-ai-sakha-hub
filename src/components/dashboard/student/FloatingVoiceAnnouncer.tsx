
import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Volume } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { MoodType } from '@/types/user/base';
import { useLocation } from 'react-router-dom';

const moodMap = {
  "happy": MoodType.HAPPY,
  "motivated": MoodType.MOTIVATED,
  "focused": MoodType.FOCUSED,
  "tired": MoodType.TIRED,
  "exhausted": MoodType.TIRED,
  "stressed": MoodType.STRESSED,
  "anxious": MoodType.ANXIOUS,
  "okay": MoodType.OKAY,
  "alright": MoodType.OKAY,
  "so so": MoodType.OKAY,
  "overwhelmed": MoodType.OVERWHELMED,
  "swamped": MoodType.OVERWHELMED,
  "curious": MoodType.CURIOUS,
  "interested": MoodType.CURIOUS,
  "confused": MoodType.CONFUSED,
  "unsure": MoodType.CONFUSED
};

// Helper function to get context-specific responses
const getContextResponse = (pathname: string) => {
  if (pathname.includes('/welcome-flow')) {
    return "Welcome to PREPZR! We offer personalized study plans, AI tutoring, and progress tracking to help you succeed in your exams. Our adaptive learning system adjusts to your pace and learning style. Would you like to explore our features?";
  } else if (pathname.includes('/dashboard/student/today')) {
    return "This is your daily study plan. It shows concepts, flashcards, and practice tests scheduled for today. I've organized them based on your learning priorities and past performance.";
  } else if (pathname.includes('/dashboard/student/overview')) {
    return "This overview shows your study progress and key metrics. Your Exam Readiness score represents how prepared you are for your upcoming exams based on your performance and engagement.";
  } else if (pathname.includes('/dashboard/student/concepts')) {
    return "Here you can explore all the concepts you need to master. You can read detailed explanations, listen to audio guides, take notes, and practice with related flashcards.";
  } else if (pathname.includes('/dashboard/student/flashcards')) {
    return "These flashcards help you memorize key facts and formulas. They use spaced repetition algorithms to show you cards at optimal intervals for better retention.";
  } else if (pathname.includes('/dashboard/student/practice-exam')) {
    return "Practice exams help you prepare for the real thing. They simulate exam conditions and provide detailed analytics on your performance to identify areas for improvement.";
  } else if (pathname.includes('/dashboard/student/analytics')) {
    return "These analytics show your learning progress over time. You can track improvements in your scores, time spent studying, and concept mastery.";
  } else if (pathname.includes('/dashboard/student/create-study-plan')) {
    return "Let's create a personalized study plan based on your exam date, available study time, and topic preferences. Our AI will optimize your schedule for maximum learning efficiency.";
  }
  
  return "I'm your voice assistant. Ask me questions about your studies, and I'll guide you through PREPZR's features to help you prepare for your exams.";
};

const FloatingVoiceAnnouncer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [command, setCommand] = useState<string>('');
  const [mood, setMood] = useState<MoodType | null>(null);
  const [isListeningMode, setIsListeningMode] = useState<boolean>(false);
  const location = useLocation();
  
  const { 
    voiceSettings, 
    toggleMute, 
    isVoiceSupported, 
    isSpeaking, 
    isListening, 
    startListening, 
    stopListening, 
    transcript, 
    processVoiceCommand,
    speakMessage // Make sure this is imported correctly from useVoiceAnnouncer
  } = useVoiceAnnouncer();
  
  const handleClose = () => {
    onClose();
  };
  
  const handleMuteToggle = () => {
    toggleMute();
  };
  
  const handleStartListening = () => {
    startListening();
    setIsListeningMode(true);
  };
  
  const handleStopListening = () => {
    stopListening();
    setIsListeningMode(false);
  };

  // Speak context-specific information when the announcer is opened
  useEffect(() => {
    if (isOpen && !isSpeaking && voiceSettings && !voiceSettings.muted) {
      const contextResponse = getContextResponse(location.pathname);
      if (contextResponse && speakMessage) {
        speakMessage(contextResponse);
      }
    }
  }, [isOpen, location.pathname, speakMessage, isSpeaking, voiceSettings]);
  
  // Process transcript when it changes and listening mode is active
  useEffect(() => {
    if (transcript && isListeningMode) {
      setCommand(transcript);
      processVoiceCommand(transcript);
      handleStopListening();
    }
  }, [transcript, isListeningMode, processVoiceCommand]);
  
  // Mood detection logic
  useEffect(() => {
    if (command) {
      const lowerCommand = command.toLowerCase();
      
      // Iterate through moodMap to find a matching mood
      for (const key in moodMap) {
        if (lowerCommand.includes(key)) {
          setMood(moodMap[key]);
          toast({
            title: `Mood Detected: ${moodMap[key]}`,
            description: `You seem ${key}.`,
          });
          break;
        }
      }
    }
  }, [command, toast]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white border rounded-lg shadow-lg p-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Voice Assistant</h3>
        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isVoiceSupported ? 'Voice commands are supported.' : 'Voice commands are not supported in this browser.'}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isSpeaking ? 'Currently speaking...' : 'Ready for your command.'}
        </p>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <button 
          onClick={handleMuteToggle}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm transition-colors"
        >
          {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {voiceSettings.muted ? 'Unmute' : 'Mute'}
        </button>
        
        <button 
          onClick={isListening ? handleStopListening : handleStartListening}
          className={`px-4 py-2 rounded-md text-sm transition-colors ${isListening ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
          disabled={!isVoiceSupported}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>
      
      {command && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Last Command:</strong> {command}
          </p>
        </div>
      )}
      
      {mood && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Detected Mood:</strong> {mood}
          </p>
        </div>
      )}
      
      <div className="text-xs text-gray-500 dark:text-gray-400 border-t pt-2 mt-2">
        <p>Try saying: "Tell me about today's plan" or "I'm feeling tired"</p>
      </div>
    </div>
  );
};

export default FloatingVoiceAnnouncer;
