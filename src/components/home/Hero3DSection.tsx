
import React, { useState, useEffect } from 'react';
import HeroContent from './hero/HeroContent';
import { motion, AnimatePresence } from 'framer-motion';

// Array of 3D animation paths
const animations = [
  "/animations/brain-animation.svg",
  "/animations/student-success.svg",
  "/animations/learning-journey.svg",
  "/animations/exam-prep.svg"
];

const Hero3DSection: React.FC = () => {
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  
  // Function to handle opening exam readiness analyzer
  const handleExamReadinessClick = () => {
    // Dispatch custom event to open analyzer
    window.dispatchEvent(new Event('open-exam-analyzer'));
  };
  
  // Setup auto-sliding for animations
  useEffect(() => {
    // Auto advance slides every 5 seconds
    const interval = setInterval(() => {
      setCurrentAnimationIndex(prev => (prev + 1) % animations.length);
    }, 5000);
    
    // Listen for custom event to advance slides
    const handleNextSlide = () => {
      setCurrentAnimationIndex(prev => (prev + 1) % animations.length);
    };
    
    document.addEventListener('hero-slider-next', handleNextSlide);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('hero-slider-next', handleNextSlide);
    };
  }, []);

  return (
    <section className="min-h-[85vh] relative overflow-hidden">
      {/* 3D Immersive Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 opacity-50"></div>
      
      {/* Floating elements for immersive background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className={`absolute rounded-full bg-gradient-to-r ${
              i % 3 === 0 ? "from-blue-400/30 to-purple-400/20" : 
              i % 3 === 1 ? "from-green-400/20 to-blue-400/10" : 
              "from-purple-400/20 to-pink-400/10"
            }`}
            style={{
              width: `${30 + Math.random() * 70}px`,
              height: `${30 + Math.random() * 70}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 1
            }}
            animate={{
              y: [Math.random() * 20, -Math.random() * 20, Math.random() * 20],
              x: [Math.random() * 20, -Math.random() * 20, Math.random() * 20],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 8 + Math.random() * 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Floating math symbols */}
        {['∫', '∑', 'π', '√', 'Δ', '∞', 'θ', 'μ'].map((symbol, i) => (
          <motion.div
            key={`symbol-${i}`}
            className="absolute text-lg md:text-xl lg:text-2xl text-purple-500/20 dark:text-purple-300/20 font-bold"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              zIndex: 1
            }}
            animate={{
              y: [Math.random() * 30, -Math.random() * 30, Math.random() * 30],
              x: [Math.random() * 30, -Math.random() * 30, Math.random() * 30],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {symbol}
          </motion.div>
        ))}
        
        {/* Blob shapes */}
        <motion.div
          className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-r from-purple-400/10 to-blue-400/5 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [-20, 20, -20],
            y: [-20, 20, -20]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute top-20 right-20 w-1/4 h-1/4 bg-gradient-to-r from-blue-400/10 to-green-400/5 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [20, -20, 20],
            y: [20, -20, 20]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Exam Readiness Indicator */}
        <motion.div
          className="absolute hidden md:block md:top-[20%] md:right-[30%] lg:top-[30%] lg:right-[15%] p-1 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-xl backdrop-blur-sm z-10 border border-indigo-200 dark:border-indigo-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="p-2">
            <div className="text-xs text-gray-600 dark:text-gray-300 mb-1 font-medium">Exam Readiness</div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" 
                  initial={{ width: "0%" }}
                  animate={{ width: "68%" }}
                  transition={{ delay: 2, duration: 1.5 }}
                />
              </div>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">68%</span>
            </div>
          </div>
        </motion.div>
        
        {/* Happy Student Avatar */}
        <motion.div
          className="absolute hidden md:block bottom-[15%] left-[20%] bg-white/90 dark:bg-gray-800/90 rounded-full overflow-hidden shadow-lg z-10 border-2 border-green-300 dark:border-green-700"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.5, type: "spring" }}
        >
          <img 
            src="/lovable-uploads/c22d3091-93f3-466d-ac2a-a871167e98e4.png" 
            alt="Happy student" 
            className="w-16 h-16 object-cover"
          />
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1.5 bg-green-500" 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          />
        </motion.div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center justify-between relative z-10">
        {/* Left side - Main content */}
        <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
        
        {/* Right side - 3D animation */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
          <div className="relative w-full max-w-xl aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={animations[currentAnimationIndex]}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img 
                  src={animations[currentAnimationIndex]} 
                  alt="Educational concept animation" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Animation indicator dots */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-4">
              {animations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAnimationIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentAnimationIndex 
                      ? "bg-indigo-600 w-6"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  aria-label={`View animation ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3DSection;
