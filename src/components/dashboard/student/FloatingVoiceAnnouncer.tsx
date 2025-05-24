
import React, { useState } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Settings, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { MoodType } from '@/types/user/base';
import { useLocation } from 'react-router-dom';

// Map of text terms to mood types
const moodMap: Record<string, MoodType> = {
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
    return "Hello! I'm Sakha AI, the core AI engine of Prepzer. We offer personalized study plans, AI tutoring, and progress tracking to help you succeed in your exams. Our adaptive learning system adjusts to your pace and learning style. Would you like to explore our features?";
  } else if (pathname.includes('/dashboard/student/today')) {
    return "I'm Sakha AI, your exam assistant. This is your daily study plan. It shows concepts, flashcards, and practice tests scheduled for today. I've organized them based on your learning priorities and past performance.";
  } else if (pathname.includes('/dashboard/student/overview')) {
    return "Sakha AI here. This overview shows your study progress and key metrics. Your Exam Readiness score represents how prepared you are for your upcoming exams based on your performance and engagement.";
  } else if (pathname.includes('/dashboard/student/concepts')) {
    return "Sakha AI at your service. Here you can explore all the concepts you need to master. You can read detailed explanations, listen to audio guides, take notes, and practice with related flashcards.";
  } else if (pathname.includes('/dashboard/student/flashcards')) {
    return "This is Sakha AI. These flashcards help you memorize key facts and formulas. They use spaced repetition algorithms to show you cards at optimal intervals for better retention.";
  } else if (pathname.includes('/dashboard/student/practice-exam')) {
    return "Sakha AI here to help. Practice exams help you prepare for the real thing. They simulate exam conditions and provide detailed analytics on your performance to identify areas for improvement.";
  } else if (pathname.includes('/dashboard/student/analytics')) {
    return "Sakha AI at your service. These analytics show your learning progress over time. You can track improvements in your scores, time spent studying, and concept mastery.";
  } else if (pathname.includes('/dashboard/student/create-study-plan')) {
    return "Sakha AI here. Let's create a personalized study plan based on your exam date, available study time, and topic preferences. Our AI will optimize your schedule for maximum learning efficiency.";
  }
  
  return "I'm Sakha AI, Prepzer's core AI engine. Ask me questions about your studies, and I'll guide you through Prepzer's features to help you prepare for your exams.";
};

interface FloatingVoiceAnnouncerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [command, setCommand] = useState<string>('');
  const [mood, setMood] = useState<MoodType | null>(null);
  const [isListeningMode, setIsListeningMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const location = useLocation();
  
  // Function to handle voice commands
  const processVoiceCommand = (command: string) => {
    console.log("Processing command:", command);
    
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      speakMessage("Hello! I'm Sakha AI, Prepzer's core AI engine. How can I help you with your exam preparation today?");
      return;
    }
    
    if (lowerCommand.includes('today') || lowerCommand.includes('plan')) {
      speakMessage("Your study plan for today includes reviewing biology concepts, practicing chemistry flashcards, and taking a short physics quiz. Would you like me to open your daily plan?");
      return;
    }
    
    if (lowerCommand.includes('exam') || lowerCommand.includes('test')) {
      speakMessage("Based on your current progress, your exam readiness score is 72%. To improve, focus on the weak areas I've identified in your analytics.");
      return;
    }
    
    speakMessage("I'm not sure how to help with that specific request. You can ask me about your study plan, exam readiness, or available learning resources.");
  };
  
  const handleClose = () => {
    onClose();
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    
    if (!isMuted) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  };
  
  const speakMessage = (text: string) => {
    if (!('speechSynthesis' in window) || isMuted) return;
    
    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    
    const correctedText = text
      .replace(/PREPZR/gi, 'Prepzer')
      .replace(/prepzr/gi, 'Prepzer')
      .replace(/Prepzr/g, 'Prepzer');
    
    const utterance = new SpeechSynthesisUtterance(correctedText);
    
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;
    
    const preferredVoiceNames = [
      'Google English India', 'Microsoft Kajal', 'en-IN',
      'Indian', 'India'
    ];
    
    for (const name of preferredVoiceNames) {
      const voice = voices.find(v => 
        v.name?.toLowerCase().includes(name.toLowerCase()) || 
        v.lang?.toLowerCase().includes(name.toLowerCase())
      );
      if (voice) {
        selectedVoice = voice;
        break;
      }
    }
    
    if (!selectedVoice) {
      selectedVoice = voices.find(v => 
        v.name?.toLowerCase().includes('female')
      );
    }
    
    if (!selectedVoice && voices.length > 0) {
      selectedVoice = voices[0];
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    utterance.lang = 'en-IN';
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };
  
  const startListening = () => {
    setIsListeningMode(true);
    toast({
      title: "Sakha AI Listening...",
      description: "Say something like 'Tell me about my study plan'",
    });
    
    setTimeout(() => {
      setCommand("Tell me about today's plan");
      processVoiceCommand("Tell me about today's plan");
      setIsListeningMode(false);
    }, 3000);
  };
  
  const stopListening = () => {
    setIsListeningMode(false);
  };

  React.useEffect(() => {
    if (isOpen && !isSpeaking && !isMuted) {
      const contextResponse = getContextResponse(location.pathname);
      if (contextResponse) {
        speakMessage(contextResponse);
      }
    }
  }, [isOpen, location.pathname, isMuted]);
  
  React.useEffect(() => {
    if (command) {
      const lowerCommand = command.toLowerCase();
      
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
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Sakha AI Voice Assistant</h3>
        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {'speechSynthesis' in window ? 'Voice commands are supported.' : 'Voice commands are not supported in this browser.'}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isSpeaking ? 'Currently speaking...' : 'Ready for your command.'}
        </p>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <button 
          onClick={handleMuteToggle}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm transition-colors flex items-center gap-2"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        
        <button 
          onClick={isListeningMode ? stopListening : startListening}
          className={`px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${isListeningMode ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
          disabled={!('speechSynthesis' in window)}
        >
          {isListeningMode ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          {isListeningMode ? 'Stop Listening' : 'Start Listening'}
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
