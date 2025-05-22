
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroContent from './hero/HeroContent';
import DashboardPreview from './hero/DashboardPreview';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Automatically cycle through dashboard features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 6); 
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Handler for exam readiness analyzer
  const handleExamReadinessClick = () => {
    // Dispatch event to open the exam readiness analyzer
    window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen py-12 md:py-16 lg:py-0 flex items-center"
    >
      {/* Enhanced Immersive 3D Background with interactive elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/50">
        {/* 3D Grid Pattern */}
        <div className="absolute inset-0 perspective-1000">
          <div 
            className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07]" 
            style={{
              backgroundImage: "linear-gradient(#5c6bc0 1px, transparent 1px), linear-gradient(to right, #5c6bc0 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              transform: "rotateX(60deg) scale(3) translateY(-10%)"
            }}
          />
        </div>
        
        {/* Large Knowledge Spheres (Background Gradient Bubbles) */}
        <motion.div 
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-400/5 dark:from-blue-700/10 dark:to-indigo-700/5 mix-blend-multiply filter blur-3xl"
          animate={{ 
            scale: [1, 1.05, 1], 
            x: [0, 30, 0], 
            y: [0, -20, 0] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        
        <motion.div 
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/5 dark:from-purple-700/10 dark:to-pink-700/5 mix-blend-multiply filter blur-3xl"
          animate={{ 
            scale: [1, 1.03, 1], 
            x: [0, -20, 0], 
            y: [0, 20, 0] 
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 2
          }}
        />
        
        <motion.div 
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-green-400/10 to-emerald-400/5 dark:from-green-700/10 dark:to-emerald-700/5 mix-blend-multiply filter blur-3xl"
          animate={{ 
            scale: [1, 1.05, 1], 
            x: [0, -30, 0], 
            y: [0, 30, 0] 
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 1
          }}
        />

        {/* Floating 3D Books */}
        <motion.div 
          className="hidden md:block absolute top-[15%] left-[15%] w-16 h-20"
          style={{ 
            transformStyle: "preserve-3d", 
            perspective: "1000px" 
          }}
          animate={{ 
            y: [0, -15, 0],
            rotateZ: [0, 5, 0], 
            rotateY: [0, 10, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut" 
          }}
        >
          <div 
            className="absolute inset-0 rounded-md"
            style={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(79, 70, 229, 0.2))",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(2px)",
              transform: "translateZ(5px)"
            }}
          >
            <div className="absolute inset-y-0 left-0 w-2 bg-indigo-700/50 rounded-l-md"></div>
          </div>
        </motion.div>

        <motion.div 
          className="hidden md:block absolute bottom-[25%] right-[20%] w-20 h-24"
          style={{ 
            transformStyle: "preserve-3d", 
            perspective: "1000px" 
          }}
          animate={{ 
            y: [0, 10, 0],
            rotateZ: [0, -3, 0], 
            rotateY: [0, -15, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2
          }}
        >
          <div 
            className="absolute inset-0 rounded-md"
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.5), rgba(5, 150, 105, 0.2))",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(2px)",
              transform: "translateZ(5px)"
            }}
          >
            <div className="absolute inset-y-0 left-0 w-2 bg-green-700/50 rounded-l-md"></div>
          </div>
        </motion.div>

        {/* Floating Formula Cards */}
        <motion.div
          className="hidden md:block absolute top-1/3 left-[8%] w-32 h-20 bg-white/30 dark:bg-gray-800/30 rounded-lg p-2 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
          animate={{ 
            y: [0, 10, 0],
            rotateZ: [0, -3, 0],
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{ 
            transformStyle: "preserve-3d",
            transform: "rotateX(10deg) rotateY(15deg)"
          }}
        >
          <motion.div className="text-xs text-indigo-800 dark:text-indigo-300 font-mono">
            E = mc<sup>2</sup>
          </motion.div>
          <motion.div className="text-xs text-purple-800 dark:text-purple-300 font-mono mt-2">
            F = ma
          </motion.div>
          <motion.div className="text-xs text-blue-800 dark:text-blue-300 font-mono mt-2">
            PV = nRT
          </motion.div>
        </motion.div>

        {/* Floating Chemistry Formula */}
        <motion.div
          className="hidden md:block absolute bottom-[30%] left-[20%] w-40 h-20 bg-white/30 dark:bg-gray-800/30 rounded-lg p-2 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
          animate={{ 
            y: [0, -8, 0],
            rotateZ: [0, 2, 0],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 3
          }}
          style={{ 
            transformStyle: "preserve-3d",
            transform: "rotateX(-5deg) rotateY(-5deg)"
          }}
        >
          <div className="text-xs text-purple-800 dark:text-purple-300 font-mono text-center">
            H<sub>2</sub>SO<sub>4</sub> + 2NaOH → Na<sub>2</sub>SO<sub>4</sub> + 2H<sub>2</sub>O
          </div>
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-2"></div>
          <div className="text-xs text-center text-gray-600 dark:text-gray-400">Acid-Base Neutralization</div>
        </motion.div>

        {/* Floating Exam Card */}
        <motion.div
          className="hidden md:block absolute bottom-[40%] right-[10%] w-40 h-24 bg-white/40 dark:bg-gray-800/40 rounded-lg shadow-lg p-3 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
          animate={{ 
            y: [0, -15, 0],
            rotateZ: [0, 2, 0],
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 1
          }}
          style={{ 
            transformStyle: "preserve-3d",
            transform: "rotateX(-5deg) rotateY(-10deg)"
          }}
        >
          <div className="text-xs font-medium text-gray-800 dark:text-gray-200 mb-2">
            Exam Readiness Score
          </div>
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
              initial={{ width: '30%' }}
              animate={{ width: '85%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-gray-400">
            <span>Day 1</span>
            <span>Day 30</span>
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 font-medium text-center mt-2">
            85% Ready for NEET!
          </div>
        </motion.div>

        {/* Floating Student Avatar with Happiness Indicator */}
        <motion.div
          className="hidden md:block absolute top-[40%] right-[18%] flex flex-col items-center"
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 3
          }}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500/50 shadow-lg">
            <img 
              src="/lovable-uploads/ffb2594e-ee5e-424c-92ff-417777e347c9.png" 
              alt="Happy Student" 
              className="w-full h-full object-cover" 
            />
          </div>
          <motion.div 
            className="mt-1 flex"
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
          >
            <span role="img" aria-label="happy">😄</span>
            <span role="img" aria-label="celebration">🎉</span>
          </motion.div>
        </motion.div>
        
        {/* Floating Brain Icon (representing AI) */}
        <motion.div
          className="hidden md:block absolute top-[15%] right-[25%] text-indigo-600/70 dark:text-indigo-400/70"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
          style={{ filter: "drop-shadow(0 0 8px rgba(79, 70, 229, 0.3))" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 1 7.92 12.446a9 9 0 1 1 -16.626 0a7.5 7.5 0 0 1 7.92 -12.445c.13 0 .262 0 .393 0z"></path>
            <path d="M10 8l1 -2l1 2"></path>
            <path d="M18 11l2 1l-2 1"></path>
            <path d="M11 18l-2 2l-2 -2"></path>
            <path d="M7 4l-2 2l2 2"></path>
          </svg>
        </motion.div>
        
        {/* Pulsing Success Indicators */}
        {[
          { top: '25%', left: '25%', delay: 0 },
          { top: '60%', left: '15%', delay: 2 },
          { top: '30%', right: '20%', delay: 4 },
          { top: '70%', right: '25%', delay: 1 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="hidden md:block absolute w-8 h-8"
            style={{ ...pos }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 1.5, 1],
              opacity: [0, 0.7, 0, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: pos.delay,
              repeatDelay: 5
            }}
          >
            <div className="w-full h-full rounded-full bg-green-500/30" />
          </motion.div>
        ))}
        
        {/* Animated light rays */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-[120%] pointer-events-none">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent"
            animate={{ 
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            style={{
              clipPath: "polygon(48% 0%, 52% 0%, 60% 100%, 40% 100%)"
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent"
            animate={{ 
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              repeatType: "reverse",
              delay: 2
            }}
            style={{
              clipPath: "polygon(45% 0%, 49% 0%, 35% 100%, 25% 100%)"
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent"
            animate={{ 
              opacity: [0.1, 0.25, 0.1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              repeatType: "reverse",
              delay: 1
            }}
            style={{
              clipPath: "polygon(51% 0%, 55% 0%, 75% 100%, 65% 100%)"
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-8 justify-between min-h-[85vh]">
          {/* Left Content: Title, description and buttons */}
          <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
          
          {/* Right Content: Enhanced 3D Dashboard Preview */}
          <DashboardPreview activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
