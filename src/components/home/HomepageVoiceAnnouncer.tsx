
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Subtitles, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface HomepageVoiceAnnouncerProps {
  autoPlay?: boolean;
  delayStart?: number; // milliseconds
}

const HomepageVoiceAnnouncer: React.FC<HomepageVoiceAnnouncerProps> = ({
  autoPlay = true,
  delayStart = 3000, // Default delay of 3 seconds
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Ref for speech synthesis utterance
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);
  
  // Welcome messages sequence
  const welcomeMessages = [
    "Welcome to PREPZR. I'm your AI study assistant.",
    "PREPZR helps students excel in competitive exams like NEET and IIT-JEE.",
    "Take our Exam Readiness Test to assess your current preparation level.",
    "Sign up for a free 7-day trial to access personalized study plans and practice tests.",
    "Our premium plans offer advanced features like AI tutoring and detailed performance analytics.",
    "We're your study partner throughout your exam preparation journey.",
    "Click the 'Get Started' button to begin, or explore our features to learn more."
  ];

  // Initialize speech synthesis
  useEffect(() => {
    // Check if browser supports speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Create utterance object only once
      utteranceRef.current = new SpeechSynthesisUtterance();
      utteranceRef.current.rate = 1.0;
      utteranceRef.current.pitch = 1.0;
      utteranceRef.current.volume = 1.0;
      
      // Select a friendly voice
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Female') || 
          voice.name.includes('Google') || 
          voice.name.includes('Samantha')
        );
        
        if (preferredVoice) {
          utteranceRef.current!.voice = preferredVoice;
        }
      };
      
      // Auto-play after delay if enabled
      if (autoPlay) {
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
  }, [autoPlay, delayStart]);
  
  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // If logged in, show different first message
    if (isLoggedIn && welcomeMessages.length > 0) {
      welcomeMessages[0] = "Welcome back to PREPZR. Ready to continue your study journey?";
    }
  }, []);
  
  const speakMessage = (message: string) => {
    if (utteranceRef.current && !isMuted) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      utteranceRef.current.text = message;
      window.speechSynthesis.speak(utteranceRef.current);
    }
    
    // Progress timing
    const messageDuration = message.length * 80; // Approximately 80ms per character
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
          }, 1000);
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
  
  const restartAnnouncement = () => {
    stopAnnouncement();
    setTimeout(startAnnouncement, 300);
  };
  
  // Hide component if user has dismissed it in this session
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
  
  if (isMinimized) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-80 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-r from-indigo-600 to-violet-500 p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-white" />
            <h3 className="text-white text-sm font-medium">PREPZR Guide</h3>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-white hover:bg-white/20"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-white hover:bg-white/20"
              onClick={() => setShowSubtitles(!showSubtitles)}
            >
              <Subtitles className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-white hover:bg-white/20"
              onClick={dismissComponent}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          {showSubtitles && hasStarted && (
            <div className="min-h-[80px] mb-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-100 dark:border-gray-800">
              <p className="text-sm">{welcomeMessages[currentMessageIndex]}</p>
              {isPlaying && (
                <Progress value={progress} className="h-1 mt-2" />
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center">
            {!hasStarted ? (
              <Button 
                onClick={startAnnouncement} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Start Guide
              </Button>
            ) : (
              <>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isPlaying ? stopAnnouncement : startAnnouncement}
                    className={isPlaying ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700" : ""}
                  >
                    {isPlaying ? "Pause" : "Resume"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={restartAnnouncement}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Restart
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500">
                  {currentMessageIndex + 1}/{welcomeMessages.length}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomepageVoiceAnnouncer;
