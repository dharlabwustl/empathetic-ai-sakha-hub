
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
      animation: "scale"
    },
    {
      emoji: "🤔",
      heading: "The Search for Direction",
      subheading: "Standard methods aren't working. Need something different.",
      color: "from-orange-500 to-amber-500",
      animation: "slide"
    },
    {
      emoji: "✨",
      heading: "Discovering PREPZR",
      subheading: "The world's first emotionally aware exam prep platform.",
      color: "from-blue-500 to-violet-500",
      animation: "fade"
    },
    {
      emoji: "🧠",
      heading: "Personalized Learning Path",
      subheading: "Adaptive to your learning style, mood, and strengths.",
      color: "from-indigo-500 to-purple-500",
      animation: "rise"
    },
    {
      emoji: "📈",
      heading: "Steady Progress",
      subheading: "Watching your confidence and scores improve each day.",
      color: "from-green-500 to-emerald-500",
      animation: "pulse"
    },
    {
      emoji: "🎯",
      heading: "Hitting Your Targets",
      subheading: "Weak areas transformed into strengths.",
      color: "from-teal-500 to-cyan-500",
      animation: "zoom"
    },
    {
      emoji: "🏆",
      heading: "Exam Day Victory",
      subheading: "Calm, confident, and ready to succeed.",
      color: "from-purple-600 to-indigo-600",
      animation: "celebration"
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
        
        {/* Student Journey Story */}
        <div 
          className="max-w-4xl mx-auto mb-12"
          ref={storyRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl min-h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Progress Indicators */}
            <div className="absolute top-4 left-0 right-0 z-20 flex justify-center">
              <div className="flex space-x-2">
                {storylineSteps.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-2 h-2 rounded-full ${
                      currentStep === index 
                        ? 'bg-white shadow-glow' 
                        : 'bg-white/40'
                    }`}
                    whileHover={{ scale: 1.5 }}
                    animate={{ scale: currentStep === index ? [1, 1.2, 1] : 1 }}
                    transition={{ repeat: currentStep === index ? Infinity : 0, duration: 2 }}
                  />
                ))}
              </div>
            </div>
            
            {/* Background Gradient Animation */}
            <motion.div 
              className="absolute inset-0 w-full h-full"
              animate={{
                background: `linear-gradient(to right, ${currentStep2.color.split(' ')[0].replace('from-', '')}, ${currentStep2.color.split(' ')[1].replace('to-', '')})`
              }}
              transition={{ duration: 1.5 }}
            />
            
            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                variants={currentVariants}
                className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-white"
              >
                <div className="text-center">
                  <motion.div 
                    className="text-5xl sm:text-6xl md:text-8xl mb-6"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      repeat: Infinity,
                      repeatDelay: 2,
                      duration: 2
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
                    <div className="bg-white/20 p-2 rounded-full mr-2">
                      {getIconForStep(currentStep)}
                    </div>
                    <span className="font-medium">Step {currentStep + 1}</span>
                  </motion.div>
                  
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    {currentStep2.heading}
                  </h2>
                  
                  <p className="text-lg sm:text-xl max-w-2xl mx-auto">
                    {currentStep2.subheading}
                  </p>
                  
                  {/* Student Avatar & Thought Bubble */}
                  <motion.div 
                    className="mt-8 flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="relative">
                      {/* Only show thought bubble in certain steps */}
                      {[0, 1, 3, 6].includes(currentStep) && (
                        <motion.div 
                          className="absolute -top-16 -right-4 bg-white text-gray-800 dark:bg-gray-800 dark:text-white p-3 rounded-lg shadow-lg max-w-[200px] text-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1, duration: 0.5 }}
                        >
                          {currentStep === 0 && "There's so much to study. Will I ever make it?"}
                          {currentStep === 1 && "I need something different. Traditional methods aren't working."}
                          {currentStep === 3 && "This feels customized just for me!"}
                          {currentStep === 6 && "I did it! PREPZR made all the difference!"}
                          <div className="absolute bottom-[-8px] right-8 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45"></div>
                        </motion.div>
                      )}
                      
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-xl">
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
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Arrows */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white z-20"
              onClick={() => setCurrentStep((prev) => (prev - 1 + storylineSteps.length) % storylineSteps.length)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white z-20"
              onClick={() => setCurrentStep((prev) => (prev + 1) % storylineSteps.length)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center"
        >
          <HeroButtons onAnalyzeClick={handleExamAnalyzer} />
          
          {/* Added highlight feature badge */}
          <motion.div 
            className="mt-8 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: ['0 0 0 rgba(124, 58, 237, 0)', '0 0 15px rgba(124, 58, 237, 0.5)', '0 0 0 rgba(124, 58, 237, 0)']
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
            <span className="text-sm font-medium">Emotionally Intelligent Learning</span>
          </motion.div>
        </motion.div>
        
        {/* Dashboard Preview (modified with student activity) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 sm:mt-24 relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
            <div className="bg-gray-100 dark:bg-gray-800 h-12 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="mx-auto text-sm text-gray-500 dark:text-gray-400">
                PREPZR Dashboard
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 aspect-[16/9] sm:aspect-[16/8] relative">
              <img 
                src="/img/dashboard-preview.png" 
                alt="PREPZR Dashboard Preview" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Animated cursor indicating student interaction */}
              <motion.div 
                className="absolute w-6 h-6"
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
                <div className="relative">
                  <div className="w-6 h-6 border-2 border-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <motion.div 
                    className="absolute inset-0 w-full h-full rounded-full bg-purple-400"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity 
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Animated highlights showing key features */}
              <motion.div 
                className="absolute top-[30%] left-[20%] bg-purple-600 text-white text-xs px-2 py-1 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1, 1, 0.8],
                }}
                transition={{ 
                  duration: 4,
                  times: [0, 0.1, 0.9, 1], 
                  repeat: Infinity,
                  repeatDelay: 8,
                  delay: 1
                }}
              >
                Adaptive Learning Path
              </motion.div>
              
              <motion.div 
                className="absolute top-[60%] left-[70%] bg-green-600 text-white text-xs px-2 py-1 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1, 1, 0.8],
                }}
                transition={{ 
                  duration: 4,
                  times: [0, 0.1, 0.9, 1], 
                  repeat: Infinity,
                  repeatDelay: 8,
                  delay: 5
                }}
              >
                Progress Tracking
              </motion.div>
              
              <motion.div 
                className="absolute top-[40%] right-[10%] bg-blue-600 text-white text-xs px-2 py-1 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1, 1, 0.8],
                }}
                transition={{ 
                  duration: 4,
                  times: [0, 0.1, 0.9, 1], 
                  repeat: Infinity,
                  repeatDelay: 8,
                  delay: 9
                }}
              >
                AI Tutor
              </motion.div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute -top-40 -left-40 h-80 w-80 bg-purple-300 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-soft-light animate-blob" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 bg-indigo-300 dark:bg-indigo-900/30 rounded-full filter blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-soft-light animate-blob animation-delay-2000" />
          <div className="absolute top-1/4 left-1/3 h-80 w-80 bg-pink-300 dark:bg-pink-900/30 rounded-full filter blur-3xl opacity-20 mix-blend-multiply dark:mix-blend-soft-light animate-blob animation-delay-4000" />
        </motion.div>
      </div>
      
      {/* Gradient background */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      
      {/* Add custom styles for shadow glow */}
      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.6);
        }
        
        @keyframes blob {
          0% {
            transform: scale(1);
          }
          33% {
            transform: scale(1.1) translate(5%, -5%);
          }
          66% {
            transform: scale(0.9) translate(-5%, 5%);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 10s infinite alternate;
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
