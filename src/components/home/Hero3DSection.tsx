
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
    <section className="min-h-[85vh] relative overflow-hidden preserve-3d perspective-2000">
      {/* Enhanced 3D Immersive Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-indigo-50/60 to-blue-50/80 dark:from-gray-900/80 dark:via-purple-900/20 dark:to-blue-900/30 z-0"></div>
      
      {/* Dynamic 3D particles and elements - matching dashboard experience */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Animated 3D floating elements - similar to dashboard */}
        <div className="absolute w-full h-full">
          {/* 3D Floating geometric shapes */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`geo-${i}`}
              className={`absolute rounded-lg bg-gradient-to-r ${
                i % 4 === 0 ? "from-blue-400/10 to-purple-400/5" : 
                i % 4 === 1 ? "from-green-400/10 to-blue-400/5" : 
                i % 4 === 2 ? "from-purple-400/10 to-pink-400/5" :
                "from-indigo-400/10 to-violet-400/5"
              }`}
              style={{
                width: `${20 + Math.random() * 80}px`,
                height: `${20 + Math.random() * 80}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                borderRadius: `${Math.random() > 0.5 ? '12px' : '50%'}`,
                filter: 'blur(1px)',
                zIndex: 1,
                transformStyle: 'preserve-3d',
                transform: `translateZ(${-50 + Math.random() * 100}px)`
              }}
              animate={{
                y: [Math.random() * 40, -Math.random() * 40, Math.random() * 40],
                x: [Math.random() * 40, -Math.random() * 40, Math.random() * 40],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 15 + Math.random() * 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Enhanced floating math symbols with 3D depth */}
          {['∫', '∑', 'π', '√', 'Δ', '∞', 'θ', 'μ', 'Ω', 'α', 'β', 'γ'].map((symbol, i) => (
            <motion.div
              key={`symbol-${i}`}
              className="absolute text-2xl md:text-3xl lg:text-4xl font-bold"
              style={{
                color: `rgba(${100 + Math.random() * 100}, ${50 + Math.random() * 100}, ${200 + Math.random() * 50}, 0.15)`,
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
                zIndex: 1,
                transformStyle: 'preserve-3d',
                transform: `translateZ(${-30 + Math.random() * 60}px) rotateX(${Math.random() * 45}deg) rotateY(${Math.random() * 45}deg)`
              }}
              animate={{
                y: [Math.random() * 50, -Math.random() * 50, Math.random() * 50],
                x: [Math.random() * 50, -Math.random() * 50, Math.random() * 50],
                rotateX: [0, Math.random() * 360],
                rotateY: [0, Math.random() * 360],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>
        
        {/* 3D dynamic blob shapes with animation */}
        <motion.div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full filter blur-[80px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(129,140,248,0.2) 0%, rgba(168,85,247,0.1) 80%)',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-50px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [-50, 50, -50],
            y: [-50, 50, -50]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute top-10 right-10 w-1/3 h-1/3 rounded-full filter blur-[60px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.05) 90%)',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-30px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [30, -30, 30],
            y: [30, -30, 30]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-1/4 h-1/4 rounded-full filter blur-[50px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(139,92,246,0.05) 80%)',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-40px)'
          }}
          animate={{
            scale: [1, 1.4, 1],
            x: [20, -20, 20],
            y: [20, -20, 20]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* 3D Grid lines in background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          perspective: '1000px',
          transform: 'rotateX(60deg) scale(3) translateZ(-200px)',
          transformStyle: 'preserve-3d',
          opacity: 0.4
        }} />
        
        {/* Exam Readiness Indicator with 3D effect */}
        <motion.div
          className="absolute hidden md:block md:top-[15%] md:right-[28%] lg:top-[25%] lg:right-[18%] p-2 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-xl backdrop-blur-sm z-10 border border-indigo-200 dark:border-indigo-900"
          initial={{ opacity: 0, y: -20, rotateX: -25, rotateY: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
          transition={{ delay: 1.5, duration: 1, type: "spring" }}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px)'
          }}
        >
          <div className="p-2">
            <div className="text-xs text-gray-600 dark:text-gray-300 mb-1 font-medium">Exam Readiness</div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-28 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
          
          {/* 3D glow effect */}
          <motion.div 
            className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-sm -z-10"
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [0.98, 1.01, 0.98],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Happy Student Avatar with 3D effect */}
        <motion.div
          className="absolute hidden md:block bottom-[20%] left-[18%] bg-white/95 dark:bg-gray-800/95 rounded-full overflow-hidden shadow-lg z-10 border-2 border-green-300 dark:border-green-700"
          initial={{ scale: 0, opacity: 0, rotateY: -30 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ delay: 2, duration: 0.8, type: "spring" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.img 
            src="/lovable-uploads/c22d3091-93f3-466d-ac2a-a871167e98e4.png" 
            alt="Happy student" 
            className="w-16 h-16 object-cover"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1.5 bg-green-500" 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          />
          
          {/* Glowing effect */}
          <motion.div
            className="absolute -inset-1 rounded-full bg-green-400/30 blur-md -z-10"
            animate={{ 
              opacity: [0.4, 0.7, 0.4],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col-reverse lg:flex-row items-center justify-between relative z-10">
        {/* Left side - Main content */}
        <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
        
        {/* Right side - 3D animation */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
          <div className="relative w-full max-w-xl aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={animations[currentAnimationIndex]}
                initial={{ opacity: 0, x: 100, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: 15 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <motion.img 
                  src={animations[currentAnimationIndex]} 
                  alt="Educational concept animation" 
                  className="w-full h-full object-contain"
                  animate={{
                    rotateY: [0, 5, 0, -5, 0],
                    rotateX: [0, 3, 0, -3, 0],
                    z: [0, 10, 0, -10, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* 3D Glow effect behind animation */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 360]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
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
