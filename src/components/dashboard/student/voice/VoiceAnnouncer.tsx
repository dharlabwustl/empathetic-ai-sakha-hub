
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Subtitles, Mic, MicOff, HelpCircle, Loader2, Globe } from 'lucide-react';
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
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [language, setLanguage] = useState<string>('en-IN'); // Default to Indian English
  
  const navigate = useNavigate();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const lastAnnouncementRef = useRef<string>('');

  // Check if first time user for onboarding
  useEffect(() => {
    const hasSeenVoiceOnboarding = localStorage.getItem('voiceAnnouncerOnboardingSeen');
    
    if (isFirstTimeUser && !hasSeenVoiceOnboarding) {
      // Show onboarding dialog after a short delay
      const timer = setTimeout(() => {
        setShowOnboarding(true);
        localStorage.setItem('voiceAnnouncerOnboardingSeen', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser]);

  // Load saved language preference if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem('voiceAssistantLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

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
            // Set up enhanced voice settings with current language
            const enhancedSettings = { 
              ...DEFAULT_VOICE_SETTINGS,
              muted,
              pitch: 1.1, // Higher pitch for female voice
              rate: 0.95, // Slightly faster for energetic delivery
              language // Use the current language state
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

    // Set up event listeners for voice assistant
    document.addEventListener('voice-speaking-started', handleSpeakingStarted);
    document.addEventListener('voice-speaking-ended', handleSpeakingEnded);
    document.addEventListener('voice-study-plans', handleStudyPlanRequest);
    document.addEventListener('voice-concept-cards', handleConceptCardsRequest);
    document.addEventListener('voice-mood-change', handleMoodChangeRequest);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('voice-speaking-started', handleSpeakingStarted);
      document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
      document.removeEventListener('voice-study-plans', handleStudyPlanRequest);
      document.removeEventListener('voice-concept-cards', handleConceptCardsRequest);
      document.removeEventListener('voice-mood-change', handleMoodChangeRequest);
    };
  }, [muted, messageHistory, userName, mood, isFirstTimeUser, language]);

  // Handle speaking started event
  const handleSpeakingStarted = (event: any) => {
    setSpeaking(true);
    setCurrentMessage(event.detail.message);
  };

  // Handle speaking ended event
  const handleSpeakingEnded = () => {
    setSpeaking(false);
    setCurrentMessage('');
  };

  // Handle study plan request - navigate to study plan page
  const handleStudyPlanRequest = () => {
    navigate('/dashboard/student/today');
  };

  // Handle concept cards request - navigate to concepts page
  const handleConceptCardsRequest = () => {
    navigate('/dashboard/student/concepts');
  };

  // Handle mood change request
  const handleMoodChangeRequest = (event: any) => {
    const newMood = event.detail?.mood;
    if (newMood && typeof window !== 'undefined') {
      // Dispatch custom event that other components can listen for
      const moodEvent = new CustomEvent('mood-changed', { 
        detail: { mood: newMood }
      });
      window.dispatchEvent(moodEvent);
      
      // Announce the mood change
      speakMessage(`I've updated your mood to ${newMood}. Your study plan will adjust accordingly.`, {
        ...DEFAULT_VOICE_SETTINGS,
        muted
      });
    }
  };

  // Toggle mute state
  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    localStorage.setItem('voiceAssistantMuted', String(newMuted));
  };

  // Toggle subtitles state
  const toggleSubtitles = () => {
    const newShowSubtitles = !showSubtitles;
    setShowSubtitles(newShowSubtitles);
    localStorage.setItem('voiceAssistantSubtitles', String(newShowSubtitles));
  };

  // Start voice recognition
  const startListening = () => {
    if (!isListening && window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        speakMessage("I'm listening...", { ...DEFAULT_VOICE_SETTINGS, muted });
      };
      
      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        
        // Process the user query
        handleProcessQuery(speechResult);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        speakMessage("I couldn't hear you clearly. Could you try again?", { ...DEFAULT_VOICE_SETTINGS, muted });
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
      recognitionRef.current = recognition;
    } else {
      setCurrentMessage("Speech recognition is not supported in your browser.");
      console.error("Speech Recognition not supported");
    }
  };

  // Stop voice recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Process user query using voiceUtils helper
  const handleProcessQuery = async (query: string) => {
    setProcessing(true);
    
    try {
      // Get response from language model
      const response = await processUserQuery(query);
      
      if (response.action) {
        // Handle actions
        switch (response.action) {
          case 'navigate':
            if (response.destination) {
              speakMessage(`Taking you to ${response.destination}`, { ...DEFAULT_VOICE_SETTINGS, muted });
              setTimeout(() => navigate(response.destination as string), 1000);
            }
            break;
            
          case 'mood':
            if (response.mood) {
              // Dispatch mood change event
              const moodEvent = new CustomEvent('mood-changed', { 
                detail: { mood: response.mood }
              });
              window.dispatchEvent(moodEvent);
              
              speakMessage(`I've updated your mood to ${response.mood}. Your study plan will adjust accordingly.`, {
                ...DEFAULT_VOICE_SETTINGS, 
                muted
              });
            }
            break;
            
          case 'study_plan':
            speakMessage("Opening your study plan", { ...DEFAULT_VOICE_SETTINGS, muted });
            setTimeout(() => navigate('/dashboard/student/today'), 1000);
            break;
            
          case 'concepts':
            speakMessage("Opening concept cards", { ...DEFAULT_VOICE_SETTINGS, muted });
            setTimeout(() => navigate('/dashboard/student/concepts'), 1000);
            break;
            
          case 'formula_lab':
            speakMessage("Opening formula lab", { ...DEFAULT_VOICE_SETTINGS, muted });
            setTimeout(() => navigate('/dashboard/student/concepts/1/formula-lab'), 1000);
            break;
            
          case 'flashcards':
            speakMessage("Opening flashcards", { ...DEFAULT_VOICE_SETTINGS, muted });
            setTimeout(() => navigate('/dashboard/student/flashcards'), 1000);
            break;
            
          case 'practice_exam':
            speakMessage("Taking you to practice exams", { ...DEFAULT_VOICE_SETTINGS, muted });
            setTimeout(() => navigate('/dashboard/student/practice-exam'), 1000);
            break;
            
          default:
            // Just speak the response message
            speakMessage(response.message || "I'm not sure how to help with that.", {
              ...DEFAULT_VOICE_SETTINGS,
              muted
            });
        }
      } else if (response.message) {
        // Just speak the response message
        speakMessage(response.message, { ...DEFAULT_VOICE_SETTINGS, muted });
      }
    } catch (error) {
      console.error("Error processing query:", error);
      speakMessage("I'm sorry, I encountered an error. Please try again.", { 
        ...DEFAULT_VOICE_SETTINGS, 
        muted 
      });
    } finally {
      setProcessing(false);
    }
  };

  // Change language
  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('voiceAssistantLanguage', newLanguage);
  };

  // Get help content
  const getHelpContent = () => {
    return (
      <div className="space-y-4 text-sm">
        <h3 className="font-medium text-base">Voice Commands</h3>
        
        <div className="space-y-2">
          <div className="bg-violet-50 p-2 rounded-md">
            <p className="font-medium text-violet-800">Navigation</p>
            <ul className="list-disc list-inside text-xs">
              <li>"Take me to my study plan"</li>
              <li>"Show my concept cards"</li>
              <li>"Open the formula lab"</li>
              <li>"Go to flashcards"</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-2 rounded-md">
            <p className="font-medium text-blue-800">Mood Logging</p>
            <ul className="list-disc list-inside text-xs">
              <li>"I'm feeling motivated today"</li>
              <li>"Change my mood to focused"</li>
              <li>"I'm tired today"</li>
              <li>"Update my mood to stressed"</li>
            </ul>
          </div>
          
          <div className="bg-emerald-50 p-2 rounded-md">
            <p className="font-medium text-emerald-800">Assistance</p>
            <ul className="list-disc list-inside text-xs">
              <li>"What should I study today?"</li>
              <li>"How can I improve in physics?"</li>
              <li>"Give me a study tip"</li>
              <li>"How am I progressing?"</li>
            </ul>
          </div>
        </div>
        
        <p className="text-xs text-gray-500">
          Click the microphone button and speak one of these commands to get started.
        </p>
      </div>
    );
  };
  
  return (
    <>
      {showOnboarding && (
        <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
          <DialogContent className="sm:max-w-md">
            <DialogTitle>Meet Your Voice Assistant</DialogTitle>
            <DialogDescription>
              Your personal study companion is now voice-enabled! Ask questions, navigate the app, 
              log your mood, and get study tips - all with your voice.
            </DialogDescription>
            
            {getHelpContent()}
            
            <DialogFooter>
              <Button onClick={() => setShowOnboarding(false)}>
                Got it
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      <div className="flex flex-col items-end gap-2">
        {/* Voice controls */}
        <motion.div 
          className="flex p-1.5 rounded-full bg-white border shadow-sm gap-1"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Mute toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-full ${muted ? 'text-gray-400' : 'text-violet-600'}`}
                  onClick={toggleMute}
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{muted ? "Unmute voice" : "Mute voice"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Subtitles toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-full ${showSubtitles ? 'text-violet-600' : 'text-gray-400'}`}
                  onClick={toggleSubtitles}
                >
                  <Subtitles size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{showSubtitles ? "Hide subtitles" : "Show subtitles"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Language picker */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-violet-600"
                  onClick={() => {
                    // Toggle between English and Hindi
                    if (language === 'en-IN') {
                      changeLanguage('hi-IN');
                    } else {
                      changeLanguage('en-IN');
                    }
                  }}
                >
                  <Globe size={16} />
                  <span className="sr-only">Change language</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Change language: {language === 'en-IN' ? 'English' : 'Hindi'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Help button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-gray-500"
                  onClick={() => setShowOnboarding(true)}
                >
                  <HelpCircle size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Voice assistant help</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
        
        {/* Voice capture button */}
        <motion.div
          initial={{ scale: 0.9, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex justify-center"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="lg"
                  className={`rounded-full p-3 w-12 h-12 flex items-center justify-center ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                      : 'bg-violet-600 hover:bg-violet-700'
                  }`}
                  onClick={isListening ? stopListening : startListening}
                  disabled={processing}
                >
                  {processing ? (
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  ) : isListening ? (
                    <MicOff className="h-6 w-6 text-white" />
                  ) : (
                    <Mic className="h-6 w-6 text-white" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{isListening ? "Stop listening" : "Start voice command"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
        
        {/* Speech caption */}
        {showSubtitles && (currentMessage || transcript || speaking) && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="bg-white/80 backdrop-blur-sm border border-gray-200 p-2 rounded-md shadow-md max-w-xs"
          >
            {transcript ? (
              <p className="text-xs text-gray-600 italic">"{transcript}"</p>
            ) : currentMessage ? (
              <p className="text-xs text-violet-600">{currentMessage}</p>
            ) : (
              <p className="text-xs text-gray-400">Voice assistant ready</p>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default VoiceAnnouncer;
