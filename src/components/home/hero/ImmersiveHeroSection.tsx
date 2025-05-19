
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Award, Clock, Zap, Check, Star, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { toast } from '@/hooks/use-toast';

const ImmersiveHeroSection = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasPlayedGreeting, setHasPlayedGreeting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Journey progress animation
  useEffect(() => {
    controls.start({
      pathLength: 1,
      transition: { duration: 3, ease: "easeInOut" }
    });
  }, [controls]);

  // Welcome voice greeting
  useEffect(() => {
    if (!hasPlayedGreeting && !isMuted && 'speechSynthesis' in window) {
      // Use a timeout to ensure the component is fully mounted
      const timer = setTimeout(() => {
        try {
          const welcomeMessage = "Welcome to PREP-zer! The world's first emotionally intelligent exam preparation platform. NEET exam preparation is now live! We understand your mindset, not just the exam.";
          
          // Create speech synthesis utterance
          const speech = new SpeechSynthesisUtterance();
          
          // Correct PREPZR pronunciation
          speech.text = welcomeMessage.replace(/PREPZR/gi, 'PREP-zer').replace(/Prepzr/g, 'PREP-zer');
          speech.lang = 'en-US';
          speech.rate = 1.0; // Normal speed for clarity
          speech.pitch = 1.1; // Slightly higher pitch for a more vibrant tone
          speech.volume = 0.9;
          
          // Get available voices
          const voices = window.speechSynthesis.getVoices();
          
          // Try to find a vibrant, clear female voice
          const preferredVoiceNames = ['Google US English Female', 'Microsoft Zira', 'Samantha', 'Victoria', 'en-US Female', 'en-GB Female'];
          
          // Find best matching voice
          let selectedVoice = null;
          for (const name of preferredVoiceNames) {
            const voice = voices.find(v => 
              v.name?.toLowerCase().includes(name.toLowerCase()) || 
              v.lang?.toLowerCase().includes(name.toLowerCase())
            );
            if (voice) {
              selectedVoice = voice;
              console.log("Selected voice:", voice.name);
              break;
            }
          }
          
          // If no preferred voice found, try to find any female voice
          if (!selectedVoice) {
            const femaleVoice = voices.find(v => 
              v.name?.toLowerCase().includes('female') ||
              !v.name?.toLowerCase().includes('male')
            );
            if (femaleVoice) {
              selectedVoice = femaleVoice;
              console.log("Selected female voice:", femaleVoice.name);
            }
          }
          
          // If still no voice selected, use any available voice
          if (!selectedVoice && voices.length > 0) {
            selectedVoice = voices[0];
            console.log("Defaulted to voice:", voices[0].name);
          }
          
          // Set the selected voice if found
          if (selectedVoice) {
            speech.voice = selectedVoice;
          }
          
          // Handle events
          speech.onstart = () => console.log("Voice greeting started");
          speech.onend = () => {
            setHasPlayedGreeting(true);
            console.log("Voice greeting completed");
          };
          speech.onerror = (e) => {
            console.error("Speech synthesis error", e);
            setHasPlayedGreeting(true);
          };
          
          // Speak the message
          window.speechSynthesis.speak(speech);
          
          // Show toast notification
          toast({
            title: "Welcome to PREP-zer",
            description: "NEET exam preparation is now live!",
            duration: 5000,
          });
        } catch (error) {
          console.error("Error playing greeting:", error);
          setHasPlayedGreeting(true);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    // Cleanup function to cancel any ongoing speech when component unmounts
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [hasPlayedGreeting, isMuted]);

  const handleToggleMute = () => {
    if (!isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsMuted(!isMuted);
    
    toast({
      title: isMuted ? "Voice enabled" : "Voice muted",
      duration: 2000,
    });
  };

  const handleGetStarted = () => {
    navigate('/signup');
  };
  
  const handleExamReadiness = () => {
    navigate('/exam-readiness');
  };

  // Milestone data with icons and descriptions
  const milestones = useMemo(() => [
    { 
      title: "Confidence Builder",
      icon: <Award className="h-6 w-6 text-yellow-400" />,
      description: "Build your self-belief",
      delay: 0.2,
    },
    { 
      title: "Exam Success",
      icon: <Star className="h-6 w-6 text-orange-400" />,
      description: "Achieve your goals",
      delay: 0.4,
    },
    {
      title: "Time Saver",
      icon: <Clock className="h-6 w-6 text-blue-400" />,
      description: "Study efficiently",
      delay: 0.6,
    },
    {
      title: "Stress-Free",
      icon: <Zap className="h-6 w-6 text-green-400" />,
      description: "Reduce anxiety",
      delay: 0.8,
    },
    { 
      title: "Happy Learning",
      icon: <Check className="h-6 w-6 text-purple-400" />,
      description: "Enjoy the process",
      delay: 1.0,
    }
  ], []);

  return (
    <section className="relative pt-20 pb-16 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 -z-10" />
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[20%] w-48 h-48 bg-pink-300/20 rounded-full blur-3xl" />
      </div>
      
      {/* NEET Exam Live badge */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-4 right-4 z-10"
      >
        <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-purple-600 text-white px-3 py-1 rounded-full shadow-lg">
          <span className="h-2 w-2 bg-white rounded-full animate-pulse" />
          <span className="text-sm font-semibold">NEET Exam is Live Now!</span>
        </div>
      </motion.div>

      {/* Voice control button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.3 }}
        onClick={handleToggleMute}
        className="absolute top-4 left-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Volume2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        )}
      </motion.button>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left content area */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Main heading */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 leading-tight"
            >
              We understand your mindset, not just the Exam
            </motion.h1>
            
            {/* Supportive tagline with NEET mention */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-md"
            >
              Experience PREP-zer's revolutionary approach to NEET exam preparation that adapts to your unique learning style, emotional state, and personal journey.
            </motion.p>
            
            {/* CTA buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                7 Days Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                onClick={handleExamReadiness}
                variant="outline"
                size="lg"
                className="border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700"
              >
                Test Your Exam Readiness
              </Button>
            </motion.div>

            {/* Milestone benefits */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-xl">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: milestone.delay }}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700">
                      {milestone.icon}
                    </div>
                    <h3 className="font-medium text-sm">{milestone.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{milestone.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right side - 3D journey visualization */}
          <motion.div 
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            {/* 3D Journey Container */}
            <div className="absolute inset-0 perspective-1000">
              {/* Avatar Journey Path */}
              <div className="relative h-full w-full">
                {/* Journey path */}
                <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.path
                    d="M5,80 Q15,40 30,70 Q45,10 60,50 Q75,20 95,30"
                    stroke="url(#gradient)"
                    strokeWidth="0.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={controls}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#d946ef" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Student avatar */}
                <motion.div
                  initial={{ x: "0%", y: "80%" }}
                  animate={{
                    x: ["0%", "30%", "60%", "95%"],
                    y: ["80%", "70%", "50%", "30%"],
                  }}
                  transition={{
                    times: [0, 0.33, 0.66, 1],
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute z-30"
                >
                  <div className="relative">
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-xl"
                    >
                      <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-white">
                        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                          <mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
                            <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
                          </mask>
                          <g mask="url(#mask__beam)">
                            <rect width="36" height="36" fill="#5e6ad2"></rect>
                            <rect x="0" y="0" width="36" height="36" transform="translate(-4 8) rotate(288 18 18) scale(1)" fill="#d17150" rx="36"></rect>
                            <g transform="translate(-4 4) rotate(-8 18 18)">
                              <path d="M13,19 a1,0.75 0 0,0 10,0" fill="#FFFFFF"></path>
                              <rect x="12" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect>
                              <rect x="22" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect>
                            </g>
                          </g>
                        </svg>
                      </div>
                    </motion.div>
                    
                    {/* Avatar pulse effect */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1], 
                        opacity: [0.7, 0.3, 0.7] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="absolute inset-0 rounded-full bg-indigo-300/30 z-[-1]"
                    />
                    
                    {/* Thought bubble */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.1, 1],
                        opacity: [0, 1]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 5,
                        repeatType: "reverse"
                      }}
                      className="absolute top-0 right-0 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md border border-gray-100 dark:border-gray-700 w-28 transform -translate-y-full translate-x-1/4"
                    >
                      <div className="text-xs text-center font-medium">
                        <span className="text-green-500 font-bold">+32%</span> NEET Exam Score!
                      </div>
                      <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white dark:bg-gray-800 border-r border-b border-gray-100 dark:border-gray-700"></div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Milestone points along the path */}
                {[
                  { left: "5%", top: "80%", label: "Start" },
                  { left: "30%", top: "70%", label: "Concepts" },
                  { left: "60%", top: "50%", label: "Practice" },
                  { left: "95%", top: "30%", label: "Success" },
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.3 }}
                    className="absolute z-20"
                    style={{ left: point.left, top: point.top }}
                  >
                    <div className="relative">
                      <div className="w-4 h-4 bg-white dark:bg-gray-800 rounded-full border-2 border-purple-400 shadow-md" />
                      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="text-xs font-medium bg-white/80 dark:bg-gray-800/80 px-2 py-0.5 rounded shadow-sm">
                          {point.label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* PREPZR AI Guide */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="absolute right-5 bottom-10 z-40"
                >
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-800 max-w-[180px]">
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">AI</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">PREP-zer AI</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          I'll adapt to your learning style for NEET success
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "mirror" 
                      }}
                      className="absolute -top-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white dark:border-gray-800"
                    />
                  </div>
                </motion.div>
                
                {/* 3D elements - floating shapes */}
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 0 }}
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      duration: 3 + index,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: index * 0.2
                    }}
                    className="absolute z-10"
                    style={{
                      left: `${15 + index * 20}%`,
                      top: `${20 + (index % 3) * 25}%`,
                      transform: `rotate(${index * 30}deg)`
                    }}
                  >
                    <div 
                      className="opacity-40 dark:opacity-20"
                      style={{
                        width: `${20 + index * 5}px`,
                        height: `${20 + index * 5}px`,
                        backgroundColor: index % 2 ? '#8b5cf6' : '#ec4899',
                        borderRadius: index % 3 ? '50%' : '30%'
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImmersiveHeroSection;
