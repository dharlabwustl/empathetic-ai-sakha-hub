
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Volume2 } from "lucide-react";
import { MoodType } from "@/types/user/base";

interface SplashScreenProps {
  onComplete: () => void;
  mood?: MoodType;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, mood }) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(mood);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [welcomeSpoken, setWelcomeSpoken] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500); // Faster animation
    
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 2000); // Show button sooner
    
    return () => {
      clearTimeout(timer);
      clearTimeout(buttonTimer);
      
      // Cancel any ongoing speech when component unmounts
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  useEffect(() => {
    // Play welcome message when animations are complete
    if (animationComplete && !welcomeSpoken) {
      speakWelcomeMessage();
      setWelcomeSpoken(true);
    }
  }, [animationComplete, welcomeSpoken]);
  
  const speakWelcomeMessage = () => {
    if ('speechSynthesis' in window) {
      const { message } = getMoodSpecificContent();
      
      // More personalized welcome message
      const welcomeText = `Welcome to Prepzer! ${message} Let's make today's study session productive and rewarding.`;
      
      const utterance = new SpeechSynthesisUtterance(welcomeText);
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find an Indian English voice first
      let selectedVoice = voices.find(voice => 
        (voice.lang === 'en-IN' || voice.name.includes('Indian')) &&
        voice.name.toLowerCase().includes('female')
      );
      
      // If no Indian English voice, try to find any English female voice
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          voice.lang.includes('en') && 
          voice.name.toLowerCase().includes('female')
        );
      }
      
      // Fall back to any available voice if needed
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Improved voice parameters
      utterance.pitch = 1.1;
      utterance.rate = 1.0;
      utterance.volume = 0.9;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const greetingVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };
  
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
  };
  
  // Map mood to specific quotes and messages
  const getMoodSpecificContent = () => {
    const defaultQuote = "Study hard and be awesome!";
    const defaultMessage = "Let's achieve something great today!";
    
    const moodContent = {
      [MoodType.MOTIVATED]: {
        quote: "Success is the sum of small efforts, repeated day in and day out.",
        message: "You're motivated! Let's channel that energy into focused study."
      },
      [MoodType.HAPPY]: {
        quote: "A positive mindset brings positive results.",
        message: "Great to see you happy! Ready to learn something new?"
      },
      [MoodType.FOCUSED]: {
        quote: "Discipline is the bridge between goals and accomplishment.",
        message: "You're in the zone! Let's make progress on important concepts."
      },
      [MoodType.OKAY]: {
        quote: "Small progress is still progress.",
        message: "Let's build some momentum with your studies today."
      },
      [MoodType.STRESSED]: {
        quote: "Take a deep breath. You've got this.",
        message: "Let's break down your work into manageable chunks."
      },
      [MoodType.TIRED]: {
        quote: "Rest if you must, but don't quit.",
        message: "Let's focus on review and light learning today."
      }
    };
    
    if (!currentMood || !Object.prototype.hasOwnProperty.call(moodContent, currentMood)) {
      return { quote: defaultQuote, message: defaultMessage };
    }
    
    return moodContent[currentMood as keyof typeof moodContent];
  };
  
  const { quote, message } = getMoodSpecificContent();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 text-center">
          <motion.div 
            className="mb-6 flex justify-center"
            variants={logoVariants}
            initial="initial"
            animate="animate"
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png"
                alt="PREPZR Logo" 
                className="h-16 w-16"
              />
              
              {/* Animated sound waves around logo when speaking */}
              {isPlaying && (
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-blue-400 -m-2"
                  animate={{ 
                    scale: [1, 1.1, 1.2, 1.1, 1],
                    opacity: [0.7, 0.5, 0.3, 0.5, 0.7] 
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1.5
                  }}
                />
              )}
            </div>
          </motion.div>
          
          <motion.div
            variants={greetingVariants}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-2xl font-bold mb-2">Welcome to PREPZR</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your AI-powered study companion
            </p>
          </motion.div>
          
          {animationComplete && (
            <motion.div 
              className="mb-6"
              variants={quoteVariants}
              initial="initial"
              animate="animate"
            >
              <blockquote className="italic text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-4 py-2 text-left">
                "{quote}"
              </blockquote>
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                {message}
              </p>
              
              {/* Audio indicator */}
              <motion.div 
                className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400"
                animate={isPlaying ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Volume2 className="h-4 w-4" />
                <span>{isPlaying ? "Listening to welcome message..." : "Welcome message completed"}</span>
              </motion.div>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showButton ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3"
          >
            <Button 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              onClick={onComplete}
              disabled={isPlaying}
            >
              {isPlaying ? (
                "Listening to welcome message..."
              ) : (
                <>Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
            
            <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-md text-xs text-amber-800 dark:text-amber-300">
              <div className="flex items-center gap-1 justify-center mb-1">
                <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                <span className="font-medium">Support PREPZR</span>
              </div>
              <p>PREPZR is free for students. Consider a donation to help us keep improving and supporting students worldwide.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Background animations */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 dark:bg-blue-600 rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300 dark:bg-purple-600 rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1, 0.9, 1],
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </div>
  );
};

export default SplashScreen;
