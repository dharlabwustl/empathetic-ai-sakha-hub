
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Info, Mic, MicOff, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { findBestVoice } from '@/components/dashboard/student/voice/voiceUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HomepageVoiceAnnouncerProps {
  autoPlay?: boolean;
  delayStart?: number; // milliseconds
}

const HomepageVoiceAnnouncer: React.FC<HomepageVoiceAnnouncerProps> = ({
  autoPlay = true,
  delayStart = 5000, // Default delay of 5 seconds
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState('');

  // Ref for speech synthesis utterance
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesHistoryRef = useRef<string[]>([]);
  
  // Welcome messages sequence - optimized for clear PREP-EZER pronunciation
  const welcomeMessages = [
    "Welcome to PREP-EZER. I'm your AI study assistant from India.",
    "PREP-EZER is designed specifically for students preparing for competitive exams like NEET and IIT-JEE.",
    "Our personalized study plans adapt to your learning style and pace, making exam preparation more effective.",
    "Take our quick Exam Readiness Test to assess your current preparation level and get a customized study plan.",
    "Sign up for a free 7-day trial to access all our features including AI-powered practice tests and personalized feedback.",
    "Our premium plans offer advanced features like doubt resolution, detailed performance tracking, and specialized tutoring.",
    "We've helped thousands of students achieve their dream scores. Let us help you too!",
    "Click 'Get Started' to begin your journey with PREP-EZER today!"
  ];

  // Check if first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('prepzrHasVisited');
    
    // Only show for first-time visitors
    if (hasVisitedBefore === 'true') {
      setIsVisible(false);
    } else {
      localStorage.setItem('prepzrHasVisited', 'true');
    }
  }, []);

  // Initialize speech synthesis
  useEffect(() => {
    // Don't initialize if not visible
    if (!isVisible) return;
    
    // Check if browser supports speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Create utterance object only once
      utteranceRef.current = new SpeechSynthesisUtterance();
      
      // Set voice characteristics for pleasant Indian female voice
      utteranceRef.current.rate = 0.92; // Slightly slower for better clarity and calmer delivery
      utteranceRef.current.pitch = 1.05; // Slightly higher for female voice
      utteranceRef.current.volume = 1.0;
      utteranceRef.current.lang = 'en-IN'; // Set to Indian English
      
      // Find and set the Indian female voice
      window.speechSynthesis.onvoiceschanged = () => {
        if (utteranceRef.current) {
          const indianVoice = findBestVoice('en-IN');
          if (indianVoice) {
            utteranceRef.current.voice = indianVoice;
            console.log('Using voice for homepage:', indianVoice.name);
          }
        }
      };
      
      // Try to load voices immediately in case they're already available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0 && utteranceRef.current) {
        const indianVoice = findBestVoice('en-IN');
        if (indianVoice) {
          utteranceRef.current.voice = indianVoice;
          console.log('Immediately loaded voice for homepage:', indianVoice.name);
        }
      }
      
      // Auto-play after delay if enabled
      if (autoPlay && isVisible) {
        const timer = setTimeout(() => {
          startAnnouncement();
        }, delayStart);
        
        return () => clearTimeout(timer);
      }
    }
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [autoPlay, delayStart, isVisible]);
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Set to Indian English
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleVoiceInput(transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);
  
  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // If logged in, show different first message and fewer messages
    if (isLoggedIn && welcomeMessages.length > 0) {
      welcomeMessages[0] = "Welcome back to PREP-EZER. Ready to continue your study journey?";
      // Trim the welcome messages for returning users
      welcomeMessages.splice(3);
      welcomeMessages.push("Let's pick up where you left off with your exam preparation!");
    }
  }, []);
  
  const handleVoiceInput = (input: string) => {
    // Here you would normally process the voice input
    // For now, just respond with a simple message
    const lowerInput = input.toLowerCase();
    let response = "I'm sorry, I didn't understand that. How can I help you with PREP-EZER?";
    
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      response = "Hello! Welcome to PREP-EZER. How can I assist you today?";
    } else if (lowerInput.includes("about") || lowerInput.includes("what is")) {
      response = "PREP-EZER is an AI-powered study assistant designed to help students prepare for competitive exams.";
    } else if (lowerInput.includes("features")) {
      response = "PREP-EZER offers personalized study plans, practice tests, flashcards, and AI tutoring to help you succeed.";
    } else if (lowerInput.includes("login") || lowerInput.includes("sign in")) {
      response = "You can sign in using the button at the top right of the screen.";
    } else if (lowerInput.includes("register") || lowerInput.includes("sign up")) {
      response = "Click the 'Get Started' button to create your PREP-EZER account and begin your study journey.";
    }
    
    // Avoid repeating the same message
    if (!messagesHistoryRef.current.includes(response)) {
      speakMessage(response);
      messagesHistoryRef.current.push(response);
      if (messagesHistoryRef.current.length > 5) {
        messagesHistoryRef.current.shift();
      }
    }
  };
  
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (error) {
          console.error("Error starting speech recognition", error);
        }
      }
    }
  };
  
  const speakMessage = (message: string) => {
    if (utteranceRef.current && !isMuted) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      
      // Replace PREPZR with PREP-EZER for correct pronunciation
      const processedMessage = message
        .replace(/PREPZR/g, "PREP-EZER")
        .replace(/Prepzr/g, "PREP-EZER")
        .replace(/prepzr/g, "PREP-EZER");
      
      utteranceRef.current.text = processedMessage;
      window.speechSynthesis.speak(utteranceRef.current);
    }
    
    // Progress timing - increase duration for calmer speech
    const messageDuration = message.length * 90; // Slightly longer for better enunciation
    let startTime = Date.now();
    
    // Update progress
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressValue = Math.min(100, (elapsed / messageDuration) * 100);
      setProgress(progressValue);
      
      if (progressValue < 100 && isPlaying) {
        timerRef.current = window.setTimeout(updateProgress, 50);
      } else {
        // Move to next message
        if (currentMessageIndex < welcomeMessages.length - 1 && isPlaying) {
          timerRef.current = window.setTimeout(() => {
            setCurrentMessageIndex(prevIndex => prevIndex + 1);
            setProgress(0);
            speakMessage(welcomeMessages[currentMessageIndex + 1]);
          }, 1200); // Slightly longer pause between messages for a calmer pace
        } else if (currentMessageIndex >= welcomeMessages.length - 1) {
          setIsPlaying(false);
        }
      }
    };
    
    updateProgress();
  };
  
  const startAnnouncement = () => {
    setIsPlaying(true);
    setHasStarted(true);
    setCurrentMessageIndex(0);
    setProgress(0);
    speakMessage(welcomeMessages[0]);
  };
  
  const stopAnnouncement = () => {
    setIsPlaying(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (newMutedState) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } else if (isPlaying) {
      // Resume speaking the current message
      speakMessage(welcomeMessages[currentMessageIndex]);
    }
  };
  
  const dismissComponent = () => {
    stopAnnouncement();
    sessionStorage.setItem('hidePrepzrAnnouncer', 'true');
    // Use a dummy div with zero height to smoothly unmount
    setIsMinimized(true);
  };
  
  // Check if should be shown
  useEffect(() => {
    if (sessionStorage.getItem('hidePrepzrAnnouncer') === 'true') {
      setIsMinimized(true);
    }
  }, []);
  
  if (isMinimized || !isVisible) {
    return null;
  }

  return (
    <TooltipProvider>
      <AnimatePresence>
        <motion.div 
          className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Voice recognition button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleListening}
                className={`w-12 h-12 rounded-full ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'} shadow-lg border border-indigo-400`}
                size="icon"
                aria-label={isListening ? "Stop listening" : "Speak to PREP-EZER"}
              >
                {isListening ? (
                  <MicOff className="h-5 w-5 text-white" />
                ) : (
                  <Mic className="h-5 w-5 text-white" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              {isListening ? "Stop listening" : "Speak to PREP-EZER"}
            </TooltipContent>
          </Tooltip>

          {!hasStarted ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={startAnnouncement}
                  className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg border border-indigo-400"
                  size="icon"
                  aria-label="Get PREP-EZER introduction"
                >
                  <Info className="h-5 w-5 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Get PREP-EZER introduction
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={toggleMute}
                  className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg border border-indigo-400"
                  size="icon"
                  aria-label={isMuted ? "Unmute PREP-EZER" : "Mute PREP-EZER"}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5 text-white" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                {isMuted ? "Unmute PREP-EZER" : "Mute PREP-EZER"}
              </TooltipContent>
            </Tooltip>
          )}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => speakMessage("I am your PREP-EZER voice assistant. You can ask me questions about our features, how to sign up, or navigate through the platform. Just click the microphone button and speak to me.")}
                className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg border border-indigo-400"
                size="icon"
                aria-label="How to use PREP-EZER voice assistant"
              >
                <HelpCircle className="h-5 w-5 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              How to use PREP-EZER voice assistant
            </TooltipContent>
          </Tooltip>
        </motion.div>

        {/* Voice feedback panel */}
        {isListening && (
          <motion.div
            className="fixed bottom-20 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-80 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-indigo-600 to-violet-500 p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-white animate-pulse" />
                <h3 className="text-white text-sm font-medium">PREP-EZER Listening...</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-white hover:bg-white/20"
                onClick={() => setIsListening(false)}
              >
                <VolumeX className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4">
              <p className="text-sm mb-2">Speak to PREP-EZER...</p>
              {userInput && (
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-100 dark:border-gray-800">
                  <p className="text-sm italic">"{userInput}"</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Subtitles panel */}
        {hasStarted && showSubtitles && (
          <motion.div
            className="fixed bottom-20 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-80 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-indigo-600 to-violet-500 p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-white" />
                <h3 className="text-white text-sm font-medium">PREP-EZER Guide</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-white hover:bg-white/20"
                onClick={dismissComponent}
              >
                <VolumeX className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4">
              <div className="mb-2 bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-100 dark:border-gray-800">
                <p className="text-sm">{welcomeMessages[currentMessageIndex]}</p>
                <Progress value={progress} className="h-1 mt-2" />
                <div className="mt-2 text-xs text-right text-gray-500">
                  {currentMessageIndex + 1}/{welcomeMessages.length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default HomepageVoiceAnnouncer;
