
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroButtons from '@/components/home/hero/HeroButtons';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Star, BookOpen, Brain, GraduationCap, Smile, Trophy } from 'lucide-react';

const HeroSection: React.FC = () => {
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const storylineSteps = [
    {
      emoji: "😣",
      heading: "The Overwhelming Start",
      subheading: "Too many books. Endless syllabus. Where to begin?",
      color: "from-red-500 to-orange-500",
      animation: "scale",
      backgroundImage: "/img/student-overwhelmed.jpg"
    },
    {
      emoji: "🤔",
      heading: "The Search for Direction",
      subheading: "Standard methods aren't working. Need something different.",
      color: "from-orange-500 to-amber-500",
      animation: "slide",
      backgroundImage: "/img/student-searching.jpg"
    },
    {
      emoji: "✨",
      heading: "Discovering PREPZR",
      subheading: "The world's first emotionally aware exam prep platform.",
      color: "from-blue-500 to-violet-500",
      animation: "fade",
      backgroundImage: "/img/student-discovery.jpg"
    },
    {
      emoji: "🧠",
      heading: "Personalized Learning Path",
      subheading: "Adaptive to your learning style, mood, and strengths.",
      color: "from-indigo-500 to-purple-500",
      animation: "rise",
      backgroundImage: "/img/student-learning.jpg"
    },
    {
      emoji: "📈",
      heading: "Steady Progress",
      subheading: "Watching your confidence and scores improve each day.",
      color: "from-green-500 to-emerald-500",
      animation: "pulse",
      backgroundImage: "/img/student-progress.jpg"
    },
    {
      emoji: "🎯",
      heading: "Hitting Your Targets",
      subheading: "Weak areas transformed into strengths.",
      color: "from-teal-500 to-cyan-500",
      animation: "zoom",
      backgroundImage: "/img/student-success.jpg"
    },
    {
      emoji: "🏆",
      heading: "Exam Day Victory",
      subheading: "Calm, confident, and ready to succeed.",
      color: "from-purple-600 to-indigo-600",
      animation: "celebration",
      backgroundImage: "/img/student-victory.jpg"
    }
  ];
  
  const storyRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentStep((prev) => (prev + 1) % storylineSteps.length);
      }
    }, 4500); // 4.5 seconds per step
    
    return () => clearInterval(interval);
  }, [isPaused, storylineSteps.length]);
  
  const handleExamAnalyzer = () => {
    // Dispatch an event to open the exam analyzer
    const event = new Event('open-exam-analyzer');
    window.dispatchEvent(event);
  };
  
  const getAnimationVariants = (type: string) => {
    switch (type) {
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
        };
      case 'slide':
        return {
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
        };
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } }
        };
      case 'rise':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        };
      case 'pulse':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: [1, 1.05, 1], transition: { duration: 0.7 } }
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 1.2 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
        };
      case 'celebration':
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
              duration: 0.7,
              y: { type: "spring", stiffness: 300, damping: 10 }
            } 
          }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } }
        };
    }
  };
  
  const getIconForStep = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: return <BookOpen className="h-6 w-6" />;
      case 1: return <Brain className="h-6 w-6" />;
      case 2: return <Smile className="h-6 w-6" />;
      case 3: return <Brain className="h-6 w-6" />;
      case 4: return <Star className="h-6 w-6" />;
      case 5: return <GraduationCap className="h-6 w-6" />;
      case 6: return <Trophy className="h-6 w-6" />;
      default: return <Star className="h-6 w-6" />;
    }
  };
  
  const currentStep2 = storylineSteps[currentStep];
  const currentVariants = getAnimationVariants(currentStep2.animation);
  
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950 pt-16 md:pt-20">
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Intro Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mx-auto max-w-4xl mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <div className="text-gray-900 dark:text-gray-100">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                The Student's Journey
              </span>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl mt-2 text-gray-700 dark:text-gray-300">
              with PREPZR by your side
            </div>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            World's first emotionally aware, hyper-personalized adaptive exam prep platform
          </p>
        </motion.div>
        
        {/* Enhanced Student Journey Story */}
        <div 
          className="max-w-4xl mx-auto mb-12"
          ref={storyRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            className="relative rounded-xl overflow-hidden shadow-2xl min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
            initial={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            animate={{ boxShadow: "0 20px 35px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            {/* Progress Indicators */}
            <div className="absolute top-4 left-0 right-0 z-30 flex justify-center">
              <div className="flex space-x-2 bg-black/30 px-4 py-2 rounded-full">
                {storylineSteps.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentStep === index 
                        ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' 
                        : 'bg-white/40'
                    }`}
                    whileHover={{ scale: 1.5 }}
                    animate={{ scale: currentStep === index ? [1, 1.2, 1] : 1 }}
                    transition={{ repeat: currentStep === index ? Infinity : 0, duration: 2 }}
                  />
                ))}
              </div>
            </div>
            
            {/* Background Image with Gradient Overlay */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`bg-${currentStep}`}
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${currentStep2.backgroundImage})` }} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            </AnimatePresence>
            
            {/* Gradient Overlay Animation */}
            <motion.div 
              className="absolute inset-0 w-full h-full"
              animate={{
                background: `linear-gradient(to right, ${currentStep2.color.split(' ')[0].replace('from-', 'rgba(')}255, 0.7), ${currentStep2.color.split(' ')[1].replace('to-', 'rgba(')}255, 0.7))`
              }}
              transition={{ duration: 1.5 }}
            />
            
            {/* 3D Scene Elements - Abstract shapes floating in background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-10">
              <motion.div 
                className="absolute w-40 h-40 rounded-full bg-white/10 backdrop-blur-md"
                animate={{ 
                  x: ['0%', '60%', '20%', '80%', '0%'],
                  y: ['20%', '50%', '70%', '30%', '20%'],
                  scale: [1, 1.2, 0.9, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="absolute w-32 h-32 rounded-lg bg-white/5 backdrop-blur-sm rotate-45"
                animate={{ 
                  x: ['80%', '30%', '50%', '10%', '80%'],
                  y: ['10%', '40%', '60%', '30%', '10%'],
                  rotate: [45, 90, 180, 270, 45],
                  scale: [0.8, 1, 0.9, 1.2, 0.8]
                }}
                transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="absolute w-24 h-24 bg-white/10 backdrop-blur-lg"
                style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
                animate={{ 
                  x: ['20%', '70%', '40%', '60%', '20%'],
                  y: ['80%', '30%', '50%', '20%', '80%'],
                  rotate: [0, 120, 240, 360, 0],
                  borderRadius: [
                    "30% 70% 70% 30% / 30% 30% 70% 70%",
                    "70% 30% 30% 70% / 70% 70% 30% 30%",
                    "30% 30% 70% 70% / 70% 30% 70% 30%",
                    "50% 50% 50% 50% / 50% 50% 50% 50%",
                    "30% 70% 70% 30% / 30% 30% 70% 70%"
                  ]
                }}
                transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
            
            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                variants={currentVariants}
                className="relative z-20 w-full h-full flex flex-col items-center justify-center p-8 text-white"
              >
                <div className="text-center backdrop-blur-sm bg-black/10 p-6 rounded-xl max-w-lg">
                  <motion.div 
                    className="text-5xl sm:text-6xl md:text-8xl mb-6"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, 0, -5, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      repeatDelay: 2,
                      duration: 3
                    }}
                  >
                    {currentStep2.emoji}
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center justify-center mb-2 text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="bg-white/30 p-3 rounded-full mr-2 shadow-inner backdrop-blur-md">
                      {getIconForStep(currentStep)}
                    </div>
                    <span className="font-medium">Step {currentStep + 1}</span>
                  </motion.div>
                  
                  <motion.h2 
                    className="text-3xl sm:text-4xl font-bold mb-4 text-shadow-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {currentStep2.heading}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-lg sm:text-xl max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {currentStep2.subheading}
                  </motion.p>
                  
                  {/* Enhanced Student Avatar & Thought Bubble */}
                  <motion.div 
                    className="mt-8 flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="relative">
                      {/* Thought bubble with improved styling and animation */}
                      {[0, 1, 3, 6].includes(currentStep) && (
                        <motion.div 
                          className="absolute -top-20 -right-4 bg-white text-gray-800 dark:bg-gray-800 dark:text-white p-4 rounded-2xl shadow-xl max-w-[220px] text-sm backdrop-blur-lg border border-white/20"
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            y: 0,
                            boxShadow: ["0px 5px 15px rgba(0,0,0,0.1)", "0px 15px 25px rgba(0,0,0,0.2)", "0px 5px 15px rgba(0,0,0,0.1)"]
                          }}
                          transition={{ 
                            delay: 1, 
                            duration: 0.5,
                            boxShadow: {
                              repeat: Infinity,
                              repeatType: "reverse",
                              duration: 3
                            }
                          }}
                        >
                          <motion.p
                            animate={{
                              opacity: [0.8, 1, 0.8],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 3
                            }}
                          >
                            {currentStep === 0 && "There's so much to study. Will I ever make it?"}
                            {currentStep === 1 && "I need something different. Traditional methods aren't working."}
                            {currentStep === 3 && "This feels customized just for me!"}
                            {currentStep === 6 && "I did it! PREPZR made all the difference!"}
                          </motion.p>
                          <div className="absolute bottom-[-12px] right-8 w-5 h-5 bg-white dark:bg-gray-800 transform rotate-45 border-r border-b border-white/20"></div>
                        </motion.div>
                      )}
                      
                      {/* Enhanced student avatar with animation */}
                      <motion.div
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-xl z-20 relative"
                        whileHover={{ scale: 1.05 }}
                        animate={{ 
                          y: [0, -5, 0], 
                          boxShadow: [
                            "0 0 0 rgba(255,255,255,0.4)",
                            "0 0 20px rgba(255,255,255,0.6)",
                            "0 0 0 rgba(255,255,255,0.4)"
                          ]
                        }}
                        transition={{ 
                          y: { repeat: Infinity, duration: 2 },
                          boxShadow: { repeat: Infinity, duration: 2 }
                        }}
                      >
                        <img 
                          src="/img/student-avatar.png" 
                          alt="Student" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image doesn't load
                            const target = e.target as HTMLImageElement;
                            target.src = "https://ui-avatars.com/api/?name=Student&background=random";
                          }}
                        />
                        
                        {/* Animated emotion overlay based on step */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 flex items-end justify-center pb-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          <span className="text-xs font-bold text-white">
                            {currentStep === 0 && "NERVOUS"}
                            {currentStep === 1 && "CURIOUS"}
                            {currentStep === 2 && "EXCITED"}
                            {currentStep === 3 && "FOCUSED"}
                            {currentStep === 4 && "MOTIVATED"}
                            {currentStep === 5 && "CONFIDENT"}
                            {currentStep === 6 && "TRIUMPHANT"}
                          </span>
                        </motion.div>
                      </motion.div>
                      
                      {/* Animated emotional state indicators */}
                      <motion.div 
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, 0, -10, 0]
                        }}
                        transition={{ 
                          repeat: Infinity,
                          repeatDelay: 1,
                          duration: 2
                        }}
                      >
                        <span className="text-lg">
                          {currentStep === 0 && "😥"}
                          {currentStep === 1 && "🤔"}
                          {currentStep === 2 && "🤩"}
                          {currentStep === 3 && "🧠"}
                          {currentStep === 4 && "💪"}
                          {currentStep === 5 && "😎"}
                          {currentStep === 6 && "🎉"}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Enhanced Navigation Arrows */}
            <motion.button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 text-white z-20 backdrop-blur-sm border border-white/10"
              onClick={() => setCurrentStep((prev) => (prev - 1 + storylineSteps.length) % storylineSteps.length)}
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </motion.button>
            
            <motion.button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 text-white z-20 backdrop-blur-sm border border-white/10"
              onClick={() => setCurrentStep((prev) => (prev + 1) % storylineSteps.length)}
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>
          </motion.div>
        </div>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center"
        >
          <HeroButtons onAnalyzeClick={handleExamAnalyzer} />
          
          {/* Enhanced highlight feature badge */}
          <motion.div 
            className="mt-8 inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: ['0 0 0 rgba(124, 58, 237, 0)', '0 0 20px rgba(124, 58, 237, 0.5)', '0 0 0 rgba(124, 58, 237, 0)']
            }}
            transition={{ 
              delay: 1.2, 
              duration: 0.5,
              boxShadow: {
                repeat: Infinity,
                duration: 2
              }
            }}
          >
            <Smile className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
            <span className="text-base font-medium">World's First Emotionally Intelligent Learning</span>
          </motion.div>
        </motion.div>
        
        {/* Enhanced Dashboard Preview with dynamic elements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 sm:mt-24 relative max-w-5xl mx-auto"
        >
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800"
            animate={{
              boxShadow: [
                "0px 10px 30px rgba(0, 0, 0, 0.1)",
                "0px 30px 60px rgba(0, 0, 0, 0.2)",
                "0px 10px 30px rgba(0, 0, 0, 0.1)"
              ],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="bg-gray-100 dark:bg-gray-800 h-12 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <motion.div 
                  className="w-3 h-3 bg-red-500 rounded-full" 
                  whileHover={{ scale: 1.2 }}
                />
                <motion.div 
                  className="w-3 h-3 bg-yellow-500 rounded-full"
                  whileHover={{ scale: 1.2 }}
                />
                <motion.div 
                  className="w-3 h-3 bg-green-500 rounded-full"
                  whileHover={{ scale: 1.2 }}
                />
              </div>
              <div className="mx-auto text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 mr-2 text-indigo-500"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V2M12 22v-2M6.41 6.41L5 5M19 19l-1.41-1.41M4 12H2M22 12h-2M6.41 17.59L5 19M19 5l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                PREPZR Dashboard
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 aspect-[16/9] sm:aspect-[16/8] relative overflow-hidden">
              <img 
                src="/img/dashboard-preview.png" 
                alt="PREPZR Dashboard Preview" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Interactive Interface Elements - Animated overlays */}
              <motion.div
                className="absolute top-[20%] left-[10%] bg-indigo-600/90 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-lg border border-indigo-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <div className="text-xs font-bold mb-1">Personalized Study Path</div>
                <motion.div 
                  className="h-2 w-36 bg-indigo-300/50 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 2, duration: 8 }}
                >
                  <motion.div 
                    className="h-full bg-white"
                    animate={{ width: ["0%", "65%"] }}
                    transition={{ delay: 2, duration: 4 }}
                  />
                </motion.div>
              </motion.div>
              
              <motion.div
                className="absolute bottom-[30%] right-[15%] bg-green-600/90 backdrop-blur-md text-white p-3 rounded-lg shadow-lg border border-green-400 flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
              >
                <div className="text-xs">
                  <div className="font-bold">Mood Analysis</div>
                  <div className="text-green-200">Motivated today!</div>
                </div>
                <div className="text-xl">😊</div>
              </motion.div>
              
              {/* Enhanced Animated cursor with better effects */}
              <motion.div 
                className="absolute z-30"
                initial={{ x: "40%", y: "50%" }}
                animate={{ 
                  x: ["40%", "60%", "55%", "70%", "40%"],
                  y: ["50%", "30%", "70%", "45%", "50%"]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <motion.div 
                  className="relative"
                  animate={{ scale: [1, 1.1, 0.9, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div 
                    className="w-8 h-8 border-2 border-purple-600 rounded-full flex items-center justify-center"
                    animate={{ 
                      boxShadow: [
                        "0 0 0 rgba(124, 58, 237, 0)",
                        "0 0 10px rgba(124, 58, 237, 0.8)",
                        "0 0 0 rgba(124, 58, 237, 0)"
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <motion.div 
                      className="w-2 h-2 bg-purple-600 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -inset-1 rounded-full opacity-30"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      backgroundColor: ["rgba(124, 58, 237, 0.3)", "rgba(124, 58, 237, 0.1)", "rgba(124, 58, 237, 0.3)"]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  
                  <motion.div 
                    className="absolute -inset-3 rounded-full opacity-20"
                    animate={{ 
                      scale: [1, 1.8, 1],
                      backgroundColor: ["rgba(124, 58, 237, 0.2)", "rgba(124, 58, 237, 0.05)", "rgba(124, 58, 237, 0.2)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
              
              {/* Enhanced animated highlights showing key features */}
              <motion.div 
                className="absolute top-[30%] left-[20%] px-3 py-2 rounded-lg flex items-center space-x-2 bg-purple-600 text-white text-xs shadow-lg border border-purple-400 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1, 1, 0.8],
                  y: [10, 0, 0, -10]
                }}
                transition={{ 
                  duration: 4,
                  times: [0, 0.1, 0.9, 1], 
                  repeat: Infinity,
                  repeatDelay: 8,
                  delay: 1
                }}
              >
                <GraduationCap className="h-4 w-4" />
                <span>Adaptive Learning Path</span>
              </motion.div>
              
              <motion.div 
                className="absolute top-[60%] left-[70%] px-3 py-2 rounded-lg flex items-center space-x-2 bg-green-600 text-white text-xs shadow-lg border border-green-400 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1, 1, 0.8],
                  y: [10, 0, 0, -10]
                }}
                transition={{ 
                  duration: 4,
                  times: [0, 0.1, 0.9, 1], 
                  repeat: Infinity,
                  repeatDelay: 8,
                  delay: 5
                }}
              >
                <Star className="h-4 w-4" />
                <span>Progress Tracking</span>
              </motion.div>
              
              <motion.div 
                className="absolute top-[40%] right-[10%] px-3 py-2 rounded-lg flex items-center space-x-2 bg-blue-600 text-white text-xs shadow-lg border border-blue-400 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1, 1, 0.8],
                  y: [10, 0, 0, -10]
                }}
                transition={{ 
                  duration: 4,
                  times: [0, 0.1, 0.9, 1], 
                  repeat: Infinity,
                  repeatDelay: 8,
                  delay: 9
                }}
              >
                <Brain className="h-4 w-4" />
                <span>Emotion-Aware AI Tutor</span>
              </motion.div>
              
              {/* Interactive Student */}
              <motion.div
                className="absolute bottom-[15%] right-[25%] bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg shadow-lg backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                <motion.div
                  className="flex items-center space-x-2"
                  animate={{ 
                    scale: [1, 1.03, 1],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-300">
                    <img 
                      src="/img/student-avatar.png" 
                      alt="Student" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://ui-avatars.com/api/?name=Student&background=random";
                      }}
                    />
                  </div>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    transition={{ delay: 3, duration: 0.5 }}
                    className="overflow-hidden"
                  >
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200">I'm ready to study!</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Enhanced decorative background elements with realistic movement */}
          <div className="absolute -top-40 -left-40 h-80 w-80 bg-purple-300 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-soft-light animate-blob" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 bg-indigo-300 dark:bg-indigo-900/30 rounded-full filter blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-soft-light animate-blob animation-delay-2000" />
          <div className="absolute top-1/4 left-1/3 h-80 w-80 bg-pink-300 dark:bg-pink-900/30 rounded-full filter blur-3xl opacity-20 mix-blend-multiply dark:mix-blend-soft-light animate-blob animation-delay-4000" />
          
          {/* Extra floating elements for depth */}
          <motion.div 
            className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-yellow-200/20 dark:bg-yellow-500/10 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-1/4 w-60 h-60 rounded-full bg-blue-200/20 dark:bg-blue-500/10 blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.25, 0.2],
              rotate: [0, -90, -180, -270, -360]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </motion.div>
      </div>
      
      {/* Enhanced gradient background */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <motion.div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          animate={{
            rotate: [30, 60, 30],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      {/* Add custom styles for enhanced effects */}
      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 15px 2px rgba(255, 255, 255, 0.8);
        }
        
        .text-shadow-lg {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes blob {
          0% {
            transform: scale(1) translate(0px, 0px);
          }
          33% {
            transform: scale(1.1) translate(20px, -30px);
          }
          66% {
            transform: scale(0.9) translate(-20px, 30px);
          }
          100% {
            transform: scale(1) translate(0px, 0px);
          }
        }
        
        .animate-blob {
          animation: blob 15s infinite alternate;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
