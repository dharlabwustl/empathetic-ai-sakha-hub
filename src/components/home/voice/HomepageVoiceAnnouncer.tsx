import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HomepageVoiceAnnouncerProps {
  autoPlay?: boolean;
}

const HomepageVoiceAnnouncer: React.FC<HomepageVoiceAnnouncerProps> = ({ autoPlay = false }) => {
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [currentScript, setCurrentScript] = useState("");
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  
  // Scripts for the voice announcer
  const scripts = {
    welcome: "Welcome to PREPZR! India's first emotionally intelligent study partner for competitive exam preparation.",
    introduction: "At PREPZR, we understand the challenges students face while preparing for exams like JEE, NEET, and other competitive tests.",
    features: "Our platform is designed to adapt to your learning style, mood, and study habits, providing personalized guidance every step of the way.",
    invitation: "I invite you to take our exam readiness test to get a personalized assessment of your preparation level.",
    trial: "We offer a free 7-day trial so you can experience how PREPZR can transform your study routine.",
    premium: "Our premium plan includes unlimited access to AI tutoring, personalized study plans, and academic advising to maximize your success.",
    conclusion: "We're not just another study platform - we're your study partner committed to helping you crack your exams. Let's achieve your goals together!"
  };
  
  // Initialize speech synthesis
  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Create speech utterance
      speechRef.current = new SpeechSynthesisUtterance();
      
      // Set properties
      speechRef.current.rate = 1;
      speechRef.current.pitch = 1;
      speechRef.current.volume = 0.9;
      
      // Get voices and set a good one
      const getVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log("Available voices:", voices.length);
        
        // Prefer Indian English voice if available or any English voice
        const indianVoice = voices.find(voice => voice.lang === 'en-IN');
        const englishVoice = voices.find(voice => voice.lang.startsWith('en-'));
        const anyVoice = voices.find(voice => voice.lang.startsWith('en'));
        
        voiceRef.current = indianVoice || englishVoice || anyVoice || voices[0];
        
        if (voiceRef.current) {
          console.log(`Selected voice: ${voiceRef.current.name} (${voiceRef.current.lang})`);
          if (speechRef.current) {
            speechRef.current.voice = voiceRef.current;
          }
        }
      };
      
      // Chrome needs a timeout for voices to load
      setTimeout(() => {
        getVoices();
      }, 100);
      
      // Setup event handler in case voices load later
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = getVoices;
      }
      
      // Set up events
      speechRef.current.onstart = () => {
        setIsSpeaking(true);
      };
      
      speechRef.current.onend = () => {
        setIsSpeaking(false);
        setCurrentScript("");
      };
      
      speechRef.current.onerror = (event) => {
        console.error('Speech error:', event.error);
        setIsSpeaking(false);
      };
    }
    
    // Cleanup
    return () => {
      if (window.speechSynthesis && speechRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  // Handle auto-playing the introduction after a delay
  useEffect(() => {
    if (autoPlay && !hasPlayedIntro && speechRef.current) {
      const timer = setTimeout(() => {
        setIsMuted(false); // Unmute
        speakIntroduction();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [autoPlay, hasPlayedIntro, speechRef.current]);
  
  // Speak all scripts in sequence
  const speakIntroduction = () => {
    if (window.speechSynthesis && speechRef.current && !isMuted) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Set first script
      setCurrentScript(scripts.welcome);
      speechRef.current.text = scripts.welcome;
      
      // Keep track of current script index
      let currentIndex = 0;
      const scriptKeys = Object.keys(scripts) as Array<keyof typeof scripts>;
      
      // Handle script completion and chain to next script
      speechRef.current.onend = () => {
        currentIndex++;
        
        // If there are more scripts, continue
        if (currentIndex < scriptKeys.length) {
          const nextKey = scriptKeys[currentIndex];
          const nextScript = scripts[nextKey];
          
          // Set new script
          setCurrentScript(nextScript);
          
          if (speechRef.current) {
            speechRef.current.text = nextScript;
            
            // Small delay between scripts
            setTimeout(() => {
              if (!isMuted) {
                window.speechSynthesis.speak(speechRef.current!);
              }
            }, 300);
          }
        } else {
          // All scripts completed
          setIsSpeaking(false);
          setCurrentScript("");
          setHasPlayedIntro(true);
        }
      };
      
      // Start speaking
      window.speechSynthesis.speak(speechRef.current);
      setIsSpeaking(true);
      setHasPlayedIntro(true);
      setShowSubtitles(true);
    }
  };
  
  // Toggle mute state
  const toggleMute = () => {
    // If currently speaking and unmuting, continue from where it left off
    if (isMuted && isSpeaking) {
      window.speechSynthesis.resume();
    }
    
    // If unmuted and speaking, pause the speech
    if (!isMuted && isSpeaking) {
      window.speechSynthesis.pause();
    }
    
    setIsMuted(!isMuted);
    
    // If toggling to unmuted and not already speaking, start speaking
    if (isMuted && !isSpeaking && !hasPlayedIntro) {
      setTimeout(() => {
        speakIntroduction();
      }, 300);
    }
  };
  
  // Toggle subtitles
  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
  };
  
  // Restart the introduction
  const restartIntroduction = () => {
    if (!isMuted) {
      speakIntroduction();
    }
  };
  
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMute}
              className={`fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 shadow-lg ${
                isSpeaking && !isMuted ? 'bg-indigo-100 dark:bg-indigo-900/30 animate-pulse' : ''
              }`}
            >
              {isMuted ? (
                <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <VolumeX className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isMuted ? "Enable voice guide" : "Disable voice guide"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* Subtitles */}
      {showSubtitles && currentScript && (
        <div className="fixed bottom-24 right-6 max-w-xs bg-black/80 text-white p-3 rounded-lg z-50 animate-fade-in">
          <div className="text-sm">{currentScript}</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleSubtitles} 
            className="text-xs text-white/70 hover:text-white mt-2"
          >
            Hide subtitles
          </Button>
        </div>
      )}
      
      {/* Controls that show when speaking */}
      {isSpeaking && !isMuted && (
        <div className="fixed bottom-6 right-20 z-50 flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={restartIntroduction}
            className="bg-white dark:bg-gray-800"
          >
            Restart
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleSubtitles}
            className="bg-white dark:bg-gray-800"
          >
            {showSubtitles ? "Hide subtitles" : "Show subtitles"}
          </Button>
        </div>
      )}
    </>
  );
};

export default HomepageVoiceAnnouncer;
