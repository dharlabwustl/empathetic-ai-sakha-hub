import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Subtitles, Mic, MicOff, HelpCircle } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { 
  speakMessage, 
  getGreeting,
  getReminderAnnouncement,
  getMotivationalMessage,
  DEFAULT_VOICE_SETTINGS,
  processUserQuery,
  fixPronunciation
} from './voiceUtils';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

interface VoiceAnnouncerProps {
  userName?: string;
  mood?: MoodType;
  isFirstTimeUser?: boolean;
  pendingTasks?: Array<{title: string, due?: string}>;
  examGoal?: string;
  onStartTest?: () => void;
  onShowFlashcards?: () => void;
}

const VoiceAnnouncer: React.FC<VoiceAnnouncerProps> = ({ 
  userName,
  mood,
  isFirstTimeUser = false,
  pendingTasks = [],
  examGoal,
  onStartTest,
  onShowFlashcards
}) => {
  const [muted, setMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const navigate = useNavigate();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const lastAnnouncementRef = useRef<string>('');

  // Set up voice announcement on first load
  useEffect(() => {
    // Initialize from localStorage if available
    const savedMuted = localStorage.getItem('voiceAssistantMuted');
    const savedSubtitles = localStorage.getItem('voiceAssistantSubtitles');
    
    if (savedMuted) {
      setMuted(savedMuted === 'true');
    }
    
    if (savedSubtitles) {
      setShowSubtitles(savedSubtitles === 'true');
    }

    // Initial greeting with a small delay for better UX
    const timer = setTimeout(() => {
      if (!muted) {
        const greeting = getGreeting(userName, mood?.toString(), isFirstTimeUser);
        
        // Check if this greeting is the same as the last announcement
        if (greeting !== lastAnnouncementRef.current) {
          // Check if this message was already spoken recently
          if (!messageHistory.includes(greeting)) {
            // Set up happy, energetic voice settings
            const enhancedSettings = { 
              ...DEFAULT_VOICE_SETTINGS,
              muted,
              pitch: 1.1, // Higher pitch for female voice
              rate: 0.95, // Slightly faster for energetic delivery
              language: 'en-IN'
            };
            
            speakMessage(greeting, enhancedSettings);
            setCurrentMessage(greeting);
            setSpeaking(true);
            lastAnnouncementRef.current = greeting;
            
            // Add to message history
            setMessageHistory(prev => [...prev.slice(-2), greeting]); // Keep only last 3 messages
          }
        }
      }
    }, 1000);

    // Set up listeners for speaking events
    const handleSpeakingStarted = (event: CustomEvent) => {
      setSpeaking(true);
      setCurrentMessage(event.detail.message);
    };

    const handleSpeakingEnded = () => {
      setSpeaking(false);
    };

    document.addEventListener('voice-speaking-started', handleSpeakingStarted as EventListener);
    document.addEventListener('voice-speaking-ended', handleSpeakingEnded);

    // Initialize speech recognition
    initializeSpeechRecognition();

    return () => {
      clearTimeout(timer);
      document.removeEventListener('voice-speaking-started', handleSpeakingStarted as EventListener);
      document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
      
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [userName, mood, isFirstTimeUser, muted, messageHistory]);

  // Initialize speech recognition
  const initializeSpeechRecognition = () => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported by this browser');
      return;
    }
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    try {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Use Indian English
      
      recognitionRef.current.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        console.log('Speech recognized:', result);
        
        // Process the query and get a response
        const response = processUserQuery(
          result,
          navigate,
          {
            startTest: onStartTest,
            showFlashcards: onShowFlashcards,
            examGoal: examGoal
          }
        );
        
        // Handle special commands
        if (response === "MUTE_COMMAND") {
          toggleMute(true);
          // Use energetic, happy voice
          speakMessage("Voice assistant muted. I'll still listen for your commands!", { 
            ...DEFAULT_VOICE_SETTINGS, 
            muted: false,
            pitch: 1.1,
            rate: 0.95
          });
          return;
        } else if (response === "UNMUTE_COMMAND") {
          toggleMute(false);
          // Use energetic, happy voice
          speakMessage("Voice assistant unmuted! I'm ready to chat with you again!", { 
            ...DEFAULT_VOICE_SETTINGS, 
            muted: false,
            pitch: 1.1,
            rate: 0.95 
          });
          return;
        }
        
        // Speak the response if not muted
        if (!muted) {
          const enhancedSettings = { 
            ...DEFAULT_VOICE_SETTINGS,
            muted,
            pitch: 1.1, // Higher pitch for female voice
            rate: 0.95, // Slightly faster for energetic delivery  
          };
          
          speakMessage(response, enhancedSettings);
          
          // Add to message history if not already there
          if (!messageHistory.includes(response)) {
            setMessageHistory(prev => [...prev.slice(-2), response]);
          }
        }
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
    }
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      initializeSpeechRecognition();
    }
    
    try {
      recognitionRef.current?.start();
      setIsListening(true);
      setTranscript('');
    } catch (e) {
      console.error('Error starting speech recognition:', e);
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.abort();
      setIsListening(false);
    } catch (e) {
      console.error('Error stopping speech recognition:', e);
    }
  };

  const toggleMute = (force?: boolean) => {
    const newMuted = force !== undefined ? force : !muted;
    setMuted(newMuted);
    
    if (speaking && !newMuted) {
      // Cancel current speech if unmuting
      window.speechSynthesis?.cancel();
    }
    
    // Save mute preference
    localStorage.setItem('voiceAssistantMuted', newMuted.toString());
  };

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
    // Save subtitle preference
    localStorage.setItem('voiceAssistantSubtitles', (!showSubtitles).toString());
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 relative">
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <motion.div
              animate={speaking ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: speaking ? Infinity : 0, duration: 1.5, ease: "easeInOut" }}
            >
              <Button
                size="sm"
                variant={speaking ? "default" : "ghost"}
                className={`h-8 w-8 p-0 ${speaking ? "bg-indigo-600 hover:bg-indigo-700" : ""}`}
                onClick={toggleMute}
                aria-label={muted ? "Unmute voice assistant" : "Mute voice assistant"}
              >
                {muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            {muted ? "Unmute voice assistant" : "Mute voice assistant"}
          </TooltipContent>
        </Tooltip>
        
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={isListening ? "default" : "ghost"}
              className={`h-8 w-8 p-0 ${isListening ? "bg-red-500 hover:bg-red-600" : ""}`}
              onClick={toggleListening}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isListening ? "Stop voice input" : "Speak to voice assistant"}
          </TooltipContent>
        </Tooltip>
        
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className={`h-8 w-8 p-0 ${showSubtitles ? 'text-primary' : ''}`}
              onClick={toggleSubtitles}
              aria-label={showSubtitles ? "Hide subtitles" : "Show subtitles"}
            >
              <Subtitles className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {showSubtitles ? "Hide subtitles" : "Show subtitles"}
          </TooltipContent>
        </Tooltip>
        
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => speakMessage("I am your voice assistant. You can ask me questions about your study plan, practice tests, or navigation help. Just click the microphone button and speak to me.", { ...DEFAULT_VOICE_SETTINGS, muted })}
              aria-label="Voice assistant help"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Learn how to use the voice assistant
          </TooltipContent>
        </Tooltip>
        
        {/* Fixed subtitle positioning to always appear at the bottom of the screen */}
        {speaking && showSubtitles && currentMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-border z-50 text-sm max-w-md">
            {currentMessage}
          </div>
        )}
        
        {/* Voice input feedback */}
        {isListening && (
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-border z-50 text-sm max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <Mic className="h-4 w-4 text-red-500 animate-pulse" />
              <span className="font-medium">Listening...</span>
            </div>
            {transcript && <p className="text-sm italic">"{transcript}"</p>}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default VoiceAnnouncer;
