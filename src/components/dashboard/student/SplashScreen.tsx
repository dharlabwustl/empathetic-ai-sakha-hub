
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Volume2, Brain, Sparkles } from "lucide-react";
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
  const [showStudentAvatar, setShowStudentAvatar] = useState(false);
  
  // Create refs for animated elements
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  useEffect(() => {
    // Faster animation sequence for better UX
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1200);
    
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 1800);
    
    // Show student avatar with slight delay
    const avatarTimer = setTimeout(() => {
      setShowStudentAvatar(true);
    }, 700);
    
    // Setup ambient animation
    setupWaveAnimation();
    
    return () => {
      clearTimeout(timer);
      clearTimeout(buttonTimer);
      clearTimeout(avatarTimer);
      cancelAnimationFrame(animationRef.current);
      
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
  
  // Setup canvas wave animation
  const setupWaveAnimation = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Wave parameters
    let waves = [];
    const waveCount = 3;
    const baseColors = [
      currentMood ? getMoodSpecificContent().color : 'rgba(99, 102, 241, 0.2)',
      currentMood ? getMoodSpecificContent().secondaryColor : 'rgba(129, 140, 248, 0.3)',
      'rgba(147, 197, 253, 0.15)'
    ];
    
    // Create waves
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        frequency: 0.005 + (i * 0.002),
        amplitude: 50 + (i * 30),
        speed: 0.03 - (i * 0.005),
        phase: 0,
        color: baseColors[i]
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw each wave
      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        
        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * wave.frequency + wave.phase) * wave.amplitude + (canvas.height / 2);
          ctx.lineTo(x, y);
        }
        
        // Complete wave path
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Fill wave
        ctx.fillStyle = wave.color;
        ctx.fill();
        
        // Update phase for animation
        wave.phase += wave.speed;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  };
  
  const speakWelcomeMessage = () => {
    if ('speechSynthesis' in window) {
      const { message } = getMoodSpecificContent();
      
      // More personalized welcome message with improved engagement
      const welcomeText = `Welcome to Prepzer! ${message} I'm here to adapt to your learning style and emotional state for a truly personalized study experience.`;
      
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
      
      // Improved voice parameters for more natural speech
      utterance.pitch = 1.1;
      utterance.rate = 0.98;
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
  
  const studentAvatarVariants = {
    initial: { opacity: 0, scale: 0.7 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: 0.5
      }
    }
  };
  
  // Particles animation for emotional representation
  const particleVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
      x: Math.sin(i * 0.8) * 10,
      y: Math.cos(i * 0.8) * 10,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 3 + i * 0.5,
        ease: "easeInOut",
      },
    }),
  };
  
  // Emotional representation
  const EmotionParticles = () => {
    const particleCount = 6;
    const moodTheme = getMoodSpecificContent();
    
    return (
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: particleCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: moodTheme.gradient,
              width: 20 + Math.random() * 30,
              height: 20 + Math.random() * 30,
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              filter: "blur(15px)",
            }}
            variants={particleVariants}
            custom={i}
            initial="hidden"
            animate="visible"
          />
        ))}
      </div>
    );
  };
  
  // Map mood to specific quotes, messages, and visual themes
  const getMoodSpecificContent = () => {
    const defaultQuote = "Study hard and be awesome!";
    const defaultMessage = "Let's achieve something great today!";
    const defaultColor = "rgba(79, 70, 229, 0.2)"; // Indigo default
    const defaultSecondaryColor = "rgba(99, 102, 241, 0.3)";
    const defaultGradient = "linear-gradient(120deg, rgba(129, 140, 248, 0.5), rgba(165, 180, 252, 0.3))";
    const defaultImage = "/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png";
    
    const moodContent = {
      [MoodType.MOTIVATED]: {
        quote: "Success is the sum of small efforts, repeated day in and day out.",
        message: "You're motivated! Let's channel that energy into focused study.",
        color: "rgba(79, 70, 229, 0.25)", // Indigo
        secondaryColor: "rgba(99, 102, 241, 0.3)",
        gradient: "linear-gradient(120deg, rgba(129, 140, 248, 0.5), rgba(165, 180, 252, 0.3))",
        image: "/lovable-uploads/1d4f90c6-4bcf-4265-89ba-b51ffa584307.png",
        avatarImage: "/lovable-uploads/f0722b8a-3f2f-499b-9bd9-fe9e07d94c41.png"
      },
      [MoodType.HAPPY]: {
        quote: "A positive mindset brings positive results.",
        message: "Great to see you happy! Ready to learn something new?",
        color: "rgba(245, 158, 11, 0.25)", // Amber
        secondaryColor: "rgba(252, 211, 77, 0.3)",
        gradient: "linear-gradient(120deg, rgba(251, 191, 36, 0.5), rgba(252, 211, 77, 0.3))",
        image: "/lovable-uploads/16da1ff5-9fab-4b4b-bd21-5977748acd16.png",
        avatarImage: "/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png"
      },
      [MoodType.FOCUSED]: {
        quote: "Discipline is the bridge between goals and accomplishment.",
        message: "You're in the zone! Let's make progress on important concepts.",
        color: "rgba(5, 150, 105, 0.25)", // Emerald
        secondaryColor: "rgba(16, 185, 129, 0.3)", 
        gradient: "linear-gradient(120deg, rgba(16, 185, 129, 0.5), rgba(110, 231, 183, 0.3))",
        image: "/lovable-uploads/c22d3091-93f3-466d-ac2a-a871167e98e4.png",
        avatarImage: "/lovable-uploads/9ca5a007-1086-4c37-81cc-cc869e880b5b.png"
      },
      [MoodType.OKAY]: {
        quote: "Small progress is still progress.",
        message: "Let's build some momentum with your studies today.",
        color: "rgba(37, 99, 235, 0.25)", // Blue
        secondaryColor: "rgba(59, 130, 246, 0.3)",
        gradient: "linear-gradient(120deg, rgba(59, 130, 246, 0.5), rgba(147, 197, 253, 0.3))",
        image: "/lovable-uploads/26a404be-3145-4a01-9204-8e74a5984c36.png",
        avatarImage: "/lovable-uploads/8b654e3b-59bb-4288-9e3c-b3299d9cdfb3.png"
      },
      [MoodType.STRESSED]: {
        quote: "Take a deep breath. You've got this.",
        message: "Let's break down your work into manageable chunks.",
        color: "rgba(220, 38, 38, 0.2)", // Red
        secondaryColor: "rgba(239, 68, 68, 0.25)",
        gradient: "linear-gradient(120deg, rgba(239, 68, 68, 0.5), rgba(252, 165, 165, 0.3))",
        image: "/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png",
        avatarImage: "/lovable-uploads/671c8cbb-4d23-4d74-afc5-5977b926a678.png"
      },
      [MoodType.TIRED]: {
        quote: "Rest if you must, but don't quit.",
        message: "Let's focus on review and light learning today.",
        color: "rgba(124, 58, 237, 0.2)", // Violet
        secondaryColor: "rgba(139, 92, 246, 0.25)",
        gradient: "linear-gradient(120deg, rgba(139, 92, 246, 0.5), rgba(196, 181, 253, 0.3))",
        image: "/lovable-uploads/0fa1cac6-aec8-4484-82f8-54739838449c.png",
        avatarImage: "/lovable-uploads/9296075b-86c2-49b6-84c1-2679c2d4ed94.png"
      }
    };
    
    if (!currentMood || !Object.prototype.hasOwnProperty.call(moodContent, currentMood)) {
      return { 
        quote: defaultQuote, 
        message: defaultMessage, 
        color: defaultColor, 
        secondaryColor: defaultSecondaryColor,
        gradient: defaultGradient,
        image: defaultImage,
        avatarImage: "/lovable-uploads/942253c5-380a-4285-85aa-06a90b045ade.png"
      };
    }
    
    return moodContent[currentMood as keyof typeof moodContent];
  };
  
  const { quote, message, image, avatarImage } = getMoodSpecificContent();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic canvas background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      {/* Emotion particles */}
      <EmotionParticles />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div 
          className="max-w-md w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8 text-center relative">
            {/* Animated avatar representation of student */}
            <AnimatePresence>
              {showStudentAvatar && (
                <motion.div
                  className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-20"
                  variants={studentAvatarVariants}
                  initial="initial"
                  animate="animate"
                >
                  <div className="relative">
                    <img 
                      src={avatarImage}
                      alt="Student Avatar" 
                      className="h-32 w-32 object-contain"
                    />
                    
                    {/* Animated thought bubble connecting to avatar */}
                    <motion.div 
                      className="absolute -right-6 -top-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Brain className="h-5 w-5 text-blue-500" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div 
              className="mb-6 flex justify-center"
              variants={logoVariants}
              initial="initial"
              animate="animate"
            >
              <div className="relative mt-6">
                <img 
                  src={image}
                  alt="PREPZR Logo" 
                  className="h-20 w-20"
                />
                
                {/* Animated sparkling effect around logo */}
                <motion.div
                  className="absolute -inset-4 rounded-full"
                  animate={{
                    background: [
                      "radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0) 70%)",
                      "radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(99,102,241,0) 70%)",
                      "radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0) 70%)"
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Animated pulsing effect */}
                <motion.div 
                  className="absolute inset-0"
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-20 w-20 text-blue-300 opacity-50" />
                </motion.div>
                
                {/* Audio indicator */}
                {isPlaying && (
                  <motion.div 
                    className="absolute inset-0 rounded-full border-4 border-blue-400 -m-2"
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
              <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome to PREPZR
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The world's first emotionally intelligent study companion
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
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 overflow-hidden relative"
                onClick={onComplete}
                disabled={isPlaying}
              >
                {isPlaying ? (
                  "Listening to welcome message..."
                ) : (
                  <>
                    Continue to Dashboard 
                    <ArrowRight className="ml-2 h-4 w-4" />
                    
                    {/* Animated shine effect */}
                    <motion.div 
                      className="absolute inset-0 bg-white opacity-20"
                      animate={{ 
                        x: ["100%", "-100%"],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2, 
                        ease: "easeInOut",
                        repeatDelay: 1
                      }}
                      style={{ clipPath: "polygon(0 0, 20% 0, 60% 100%, 40% 100%)" }}
                    />
                  </>
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
      </div>
    </div>
  );
};

export default SplashScreen;
