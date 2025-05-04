
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { findBestVoice } from '@/components/dashboard/student/voice/voiceUtils';

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

  // Ref for speech synthesis utterance
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);
  
  // Welcome messages sequence - optimized for clear PREPZR pronunciation and conversion
  const welcomeMessages = [
    "Welcome to PREP-EEZER. I'm your AI study assistant from India.",
    "PREP-EEZER is designed specifically for students preparing for competitive exams like NEET and IIT-JEE.",
    "Our personalized study plans adapt to your learning style and pace, making exam preparation more effective.",
    "Take our quick Exam Readiness Test to assess your current preparation level and get a customized study plan.",
    "Sign up for a free 7-day trial to access all our features including AI-powered practice tests and personalized feedback.",
    "Our premium plans offer advanced features like doubt resolution, detailed performance tracking, and specialized tutoring.",
    "We've helped thousands of students achieve their dream scores. Let us help you too!",
    "Click 'Get Started' to begin your journey with PREP-EEZER today!"
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
  
  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // If logged in, show different first message and fewer messages
    if (isLoggedIn && welcomeMessages.length > 0) {
      welcomeMessages[0] = "Welcome back to PREP-EEZER. Ready to continue your study journey?";
      // Trim the welcome messages for returning users
      welcomeMessages.splice(3);
      welcomeMessages.push("Let's pick up where you left off with your exam preparation!");
    }
  }, []);
  
  const speakMessage = (message: string) => {
    if (utteranceRef.current && !isMuted) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      
      // Format message for better pronunciation, especially for "PREPZR"
      const formattedMessage = message.replace(/PREPZR/g, "PREP EEZER")
                                       .replace(/PREP-ZR/g, "PREP EEZER")
                                       .replace(/PREP-EEZER/g, "PREP EEZER");
      
      utteranceRef.current.text = formattedMessage;
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
    <AnimatePresence>
      <motion.div 
        className="fixed bottom-4 right-4 z-50 w-12 h-12"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        {!hasStarted ? (
          <Button
            onClick={startAnnouncement}
            className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg border border-indigo-400"
            size="icon"
          >
            <Info className="h-5 w-5 text-white" />
          </Button>
        ) : (
          <Button
            onClick={toggleMute}
            className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg border border-indigo-400"
            size="icon"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-white" />
            ) : (
              <Volume2 className="h-5 w-5 text-white" />
            )}
          </Button>
        )}
      </motion.div>

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
              <h3 className="text-white text-sm font-medium">PREP-EEZER Guide</h3>
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
  );
};

export default HomepageVoiceAnnouncer;
