
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { findBestIndianVoice } from '@/components/dashboard/student/voice/voiceUtils';

const FloatingVoiceAnnouncer = () => {
  const [visible, setVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const speakTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Marketing messages focused on Indian competitive exams
  const marketingMessages = [
    "Welcome to PREPZR! We're India's first emotionally intelligent study partner for competitive exam preparation.",
    "PREPZR creates hyperpersonalized study plans based on your learning style for exams like JEE, NEET, and UPSC.",
    "Our AI tailors content to your mood and energy level, maximizing your productivity for competitive exams.",
    "Sign up now for a 7-day free trial and experience personalized coaching for your exam preparation.",
    "PREPZR analyzes your strengths and weaknesses to create a focused study path for your competitive exam.",
    "Our adaptive system evolves with your progress, ensuring optimal preparation for Indian entrance exams.",
    "Join thousands of successful students who cracked competitive exams with PREPZR's personalized approach.",
    "PREPZR's digital assistant provides motivation and guidance throughout your exam preparation journey."
  ];

  const speakMessage = (message: string) => {
    if (isMuted) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    setIsSpeaking(true);
    
    const utterance = new SpeechSynthesisUtterance(message);
    
    // Try to find the best Indian female voice
    const bestVoice = findBestIndianVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    } else {
      utterance.lang = 'en-IN'; // Fallback to Indian English
    }
    
    // Configure voice for clarity
    utterance.volume = 1.0;
    utterance.rate = 1.0;
    utterance.pitch = 1.2;
    
    utterance.onend = () => {
      setIsSpeaking(false);
      
      // Queue the next message with a delay
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
      }
      
      speakTimeoutRef.current = setTimeout(() => {
        const nextIndex = (currentMessageIndex + 1) % marketingMessages.length;
        setCurrentMessageIndex(nextIndex);
        speakMessage(marketingMessages[nextIndex]);
      }, 20000); // 20 seconds between messages
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };
  
  const toggleMute = () => {
    if (!isMuted) {
      window.speechSynthesis.cancel();
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
        speakTimeoutRef.current = null;
      }
      setIsSpeaking(false);
    } else if (visible) {
      // If unmuting and the announcer is visible, start speaking again
      speakMessage(marketingMessages[currentMessageIndex]);
    }
    
    setIsMuted(!isMuted);
  };
  
  const handleOpen = () => {
    setVisible(true);
    
    if (!isMuted && !hasInteracted) {
      // First interaction delay to ensure the browser allows audio
      setTimeout(() => {
        speakMessage(marketingMessages[0]);
        setHasInteracted(true);
      }, 1000);
    } else if (!isMuted) {
      speakMessage(marketingMessages[currentMessageIndex]);
    }
  };
  
  const handleClose = () => {
    setVisible(false);
    window.speechSynthesis.cancel();
    
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
      speakTimeoutRef.current = null;
    }
  };
  
  const handleSignup = () => {
    window.speechSynthesis.cancel();
    navigate('/signup');
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
      }
    };
  }, []);

  // Check if we're on the homepage - only show on homepage
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
  
  if (!isHomePage) return null;
  
  return (
    <>
      {/* Floating Button */}
      {!visible ? (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-violet-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-bounce"
          aria-label="Voice Assistant"
        >
          <Volume2 className="h-6 w-6 text-white" />
          <span className="absolute hidden group-hover:block whitespace-nowrap right-full mr-3 bg-white px-2 py-1 rounded shadow-md text-sm font-medium">
            Listen to PREPZR
          </span>
        </button>
      ) : (
        <div className="fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Volume2 className={`h-5 w-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
              <div>
                <h3 className="font-medium">PREPZR Voice Assistant</h3>
                <p className="text-xs opacity-90">India's 1st Intelligent Study Partner</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6">
            <div className={`transition-opacity duration-500 ${isSpeaking ? 'opacity-100' : 'opacity-75'}`}>
              <p className="text-sm font-medium mb-4">{marketingMessages[currentMessageIndex]}</p>
              
              <div className="relative h-1 bg-gray-200 rounded overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300 ${
                    isSpeaking ? 'animate-progress' : ''
                  }`}
                  style={{width: `${(currentMessageIndex / marketingMessages.length) * 100}%`}}
                ></div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleSignup}
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
              >
                Try Free for 7 Days
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                No credit card required. Cancel anytime.
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-bold text-blue-600">100,000+</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-bold text-violet-600">90%</p>
                  <p className="text-xs text-gray-500">Exam Success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingVoiceAnnouncer;
