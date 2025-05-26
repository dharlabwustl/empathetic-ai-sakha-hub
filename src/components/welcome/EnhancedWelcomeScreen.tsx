
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EnhancedWelcomeScreenProps {
  userName: string;
  isReturningUser?: boolean;
  lastActivity?: string;
  onComplete: () => void;
}

const EnhancedWelcomeScreen: React.FC<EnhancedWelcomeScreenProps> = ({
  userName,
  isReturningUser = false,
  lastActivity,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const navigate = useNavigate();

  const welcomeSteps = isReturningUser ? [
    {
      title: `Welcome Back, ${userName}!`,
      subtitle: "Your learning journey continues",
      message: `Hello ${userName}! Welcome back to PREPZR. I'm your AI learning companion, and I'm excited to help you continue your exam preparation journey. ${lastActivity ? `I see you were last working on ${lastActivity}.` : ''} Let's pick up where you left off and make today even more productive than before.`
    },
    {
      title: "Ready to Continue Learning?",
      subtitle: "Your personalized dashboard awaits",
      message: `I've prepared your personalized study plan and daily activities based on your progress. I'm here to guide you through your exam preparation with confidence and support. Let's achieve your goals together!`
    }
  ] : [
    {
      title: `Welcome to PREPZR, ${userName}!`,
      subtitle: "Your AI-powered learning journey begins",
      message: `Congratulations ${userName} on joining PREPZR! I'm your AI learning companion, and I'm thrilled to guide you on your exam preparation journey. PREPZR is designed to adapt to your learning style and help you achieve your academic goals with confidence.`
    },
    {
      title: "Your Personalized Learning Experience",
      subtitle: "Tailored just for you",
      message: `I've created a completely personalized study plan just for you. From concept cards to practice exams, from daily plans to progress tracking - everything is designed to help you succeed. I'll be with you every step of the way, providing guidance and motivation.`
    },
    {
      title: "Ready to Begin Your Success Story?",
      subtitle: "Let's start achieving your dreams",
      message: `Your journey to exam success starts now! I'm here to support you with intelligent study plans, mood-adaptive learning, and personalized guidance. Together, we'll turn your preparation into achievement. Let's make it happen!`
    }
  ];

  useEffect(() => {
    // Auto-start speaking the current step
    speakMessage(welcomeSteps[currentStep].message);
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentStep]);

  const speakMessage = (text: string) => {
    if (isAudioMuted || !('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    speechRef.current = new SpeechSynthesisUtterance();
    speechRef.current.text = text;
    speechRef.current.rate = 0.9;
    speechRef.current.pitch = 1.1; // Higher pitch for female voice
    speechRef.current.volume = 0.8;
    
    // Select female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoices = voices.filter(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('samantha') ||
      (!voice.name.toLowerCase().includes('male') && voice.lang.includes('en'))
    );
    
    if (femaleVoices.length > 0) {
      speechRef.current.voice = femaleVoices[0];
    }
    
    speechRef.current.onstart = () => setIsSpeaking(true);
    speechRef.current.onend = () => setIsSpeaking(false);
    speechRef.current.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(speechRef.current);
  };

  const handleNext = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Cancel speech before completing
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      onComplete();
    }
  };

  const toggleAudio = () => {
    if (isAudioMuted) {
      setIsAudioMuted(false);
      speakMessage(welcomeSteps[currentStep].message);
    } else {
      setIsAudioMuted(true);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* 3D Background Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-indigo-600/20" />
        
        {/* Floating 3D Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-25 blur-lg"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute bottom-32 left-1/3 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-30 blur-lg"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardContent className="p-8">
            {/* Audio Control */}
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleAudio}
                className="text-white hover:bg-white/20"
              >
                {isAudioMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {welcomeSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index <= currentStep ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Icon */}
                <motion.div
                  className="flex justify-center mb-6"
                  animate={isSpeaking ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{
                    duration: 1,
                    repeat: isSpeaking ? Infinity : 0
                  }}
                >
                  <div className="p-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {welcomeSteps[currentStep].title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className="text-xl text-white/80 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {welcomeSteps[currentStep].subtitle}
                </motion.p>

                {/* Message */}
                <motion.p
                  className="text-lg text-white/90 leading-relaxed mb-8 max-w-lg mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {welcomeSteps[currentStep].message}
                </motion.p>

                {/* Continue Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
                  >
                    {currentStep < welcomeSteps.length - 1 ? (
                      <>
                        Continue <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    ) : (
                      isReturningUser ? "Go to Dashboard" : "Start Learning"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* Speaking Indicator */}
      {isSpeaking && (
        <motion.div
          className="absolute bottom-6 left-6 flex items-center space-x-2 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          />
          <span className="text-sm">Sakha AI speaking...</span>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedWelcomeScreen;
