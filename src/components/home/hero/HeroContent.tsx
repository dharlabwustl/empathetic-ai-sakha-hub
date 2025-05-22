
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExamNamesBadge from './ExamNamesBadge';

interface HeroContentProps {
  handleExamReadinessClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ handleExamReadinessClick }) => {
  const navigate = useNavigate();
  
  const handleFreeTrialClick = () => {
    navigate('/signup');
  };

  // Effect to clean up any active voice recognition when component unmounts
  useEffect(() => {
    return () => {
      // Cancel any active speech synthesis
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Cancel any active speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        // This is a cleanup function, we don't need to check if recognition exists
        try {
          const recognitionInstance = window.SpeechRecognition ? 
            new window.SpeechRecognition() : 
            new window.webkitSpeechRecognition();
          recognitionInstance.abort();
        } catch (e) {
          console.log("Error cleaning up speech recognition:", e);
        }
      }
    };
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pr-8 relative z-20"
    >
      {/* Enhanced 3D Immersive Background Elements for entire hero section */}
      <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic flowing gradients with continuous movement - similar to dashboard */}
        <motion.div
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%]" 
          style={{
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, rgba(79, 70, 229, 0.03) 25%, rgba(99, 102, 241, 0.02) 50%, transparent 70%)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            x: ['-5%', '5%', '-5%'],
            y: ['-5%', '5%', '-5%'],
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -right-[25%] -bottom-[25%] w-[150%] h-[150%]" 
          style={{
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.03) 25%, rgba(6, 182, 212, 0.02) 50%, transparent 70%)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            x: ['5%', '-5%', '5%'],
            y: ['5%', '-5%', '5%'],
            scale: [1.05, 1, 1.05],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Flowing 3D Cards with continuous left-to-right motion */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`card-${i}`}
            className="absolute rounded-xl"
            style={{
              width: Math.random() * 80 + 120,
              height: Math.random() * 60 + 80,
              background: `linear-gradient(135deg, 
                rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, ${Math.random() * 0.07 + 0.03}) 0%, 
                rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, ${Math.random() * 0.05 + 0.02}) 100%)`,
              border: `1px solid rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, ${Math.random() * 0.08 + 0.05})`,
              boxShadow: `0 4px 30px rgba(0, 0, 0, 0.05)`,
              backdropFilter: `blur(${Math.random() * 5 + 2}px)`,
              top: `${Math.random() * 100}%`,
              left: `-20%`,
              transform: `translateZ(${Math.random() * 200 - 100}px) rotateX(${Math.random() * 40 - 20}deg) rotateY(${Math.random() * 40 - 20}deg)`,
              transformStyle: "preserve-3d",
              zIndex: Math.floor(Math.random() * 10) - 5,
            }}
            animate={{
              x: ['0%', '120%'],
              rotate: [Math.random() * 10 - 5, Math.random() * 10 - 5],
              y: [Math.random() * 30 - 15, Math.random() * 30 - 15],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          >
            {/* Card content simulation */}
            <div className="absolute top-2 left-2 w-2/3 h-2 rounded bg-white/10"></div>
            <div className="absolute top-8 left-2 w-1/3 h-2 rounded bg-white/10"></div>
            <div className="absolute bottom-4 right-4 w-1/4 h-4 rounded-full bg-purple-500/10"></div>
            <div className="absolute top-1/2 left-1/2 w-1/2 h-1/4 -translate-x-1/2 -translate-y-1/2 rounded bg-blue-500/5"></div>
          </motion.div>
        ))}
        
        {/* Dynamic floating particles with continuous movement */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-gradient-radial"
            style={{
              width: Math.random() * 12 + 4,
              height: Math.random() * 12 + 4,
              background: `radial-gradient(circle, rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, ${Math.random() * 0.7 + 0.3}) 0%, rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, 0) 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() * 2}px)`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 255}, 0.${Math.floor(Math.random() * 8 + 2)})`,
              zIndex: Math.floor(Math.random() * 20) - 10,
              transform: `translateZ(${Math.random() * 50 - 25}px)`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, Math.random() * 0.5 + 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}

        {/* 3D Rotating educational symbols with continuous movement */}
        {[
          { icon: "➕", color: "rgba(147, 51, 234, 0.4)", size: 1.2 }, // Math symbol
          { icon: "🧪", color: "rgba(79, 70, 229, 0.4)", size: 1.3 },  // Science symbol
          { icon: "📝", color: "rgba(59, 130, 246, 0.4)", size: 1.1 }, // Notes symbol
          { icon: "🔬", color: "rgba(16, 185, 129, 0.4)", size: 1.4 }, // Research symbol
          { icon: "📊", color: "rgba(245, 158, 11, 0.4)", size: 1.2 }, // Analysis symbol
          { icon: "📚", color: "rgba(236, 72, 153, 0.4)", size: 1.3 }, // Books symbol
          { icon: "🧠", color: "rgba(139, 92, 246, 0.4)", size: 1.2 }, // Brain/knowledge symbol
          { icon: "⚗️", color: "rgba(6, 182, 212, 0.4)", size: 1.1 },  // Chemistry symbol
          { icon: "🔢", color: "rgba(124, 58, 237, 0.4)", size: 1.3 }, // Numbers symbol
          { icon: "🪐", color: "rgba(220, 38, 38, 0.4)", size: 1.4 },  // Planet/physics symbol
          { icon: "🧬", color: "rgba(5, 150, 105, 0.4)", size: 1.2 },  // DNA/biology symbol
          { icon: "📐", color: "rgba(245, 158, 11, 0.4)", size: 1.3 }  // Geometry symbol
        ].map((item, i) => (
          <motion.div
            key={`symbol-${i}`}
            className="absolute text-2xl md:text-4xl font-bold"
            style={{
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              color: item.color,
              textShadow: `0 0 15px ${item.color.replace('0.4', '0.7')}`,
              zIndex: -5,
              transformStyle: "preserve-3d",
              perspective: "1000px",
              scale: item.size,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [0, 360],
              scale: [item.size * 0.9, item.size * 1.1, item.size * 0.9],
              opacity: [0.5, 0.9, 0.5],
              textShadow: [
                `0 0 15px ${item.color.replace('0.4', '0.4')}`,
                `0 0 25px ${item.color.replace('0.4', '0.8')}`,
                `0 0 15px ${item.color.replace('0.4', '0.4')}`
              ],
            }}
            transition={{
              duration: Math.random() * 45 + 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            {item.icon}
          </motion.div>
        ))}

        {/* Pulsating glow orbs with continuous movement */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, 0.3) 0%, rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, 0) 70%)`,
              width: `${Math.random() * 40 + 20}%`,
              height: `${Math.random() * 40 + 20}%`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              filter: "blur(60px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}

        {/* Flowing educational formulas with physics appearance */}
        {[
          "E = mc²", 
          "F = ma", 
          "PV = nRT", 
          "a² + b² = c²", 
          "ΔG = ΔH - TΔS",
          "∫f(x)dx"
        ].map((formula, i) => (
          <motion.div
            key={`formula-${i}`}
            className="absolute text-xl md:text-2xl font-mono opacity-20"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              color: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, 0.7)`,
              textShadow: `0 0 10px rgba(255,255,255,0.5)`,
              zIndex: -3
            }}
            animate={{
              y: [0, Math.random() * 70 - 35],
              x: [0, Math.random() * 70 - 35],
              opacity: [0.1, 0.25, 0.1],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            {formula}
          </motion.div>
        ))}
      </div>
      
      {/* Premium Experience Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute -top-2 -right-2 md:top-0 md:-right-8 z-30 transform rotate-12"
      >
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-lg shadow-lg flex items-center gap-2">
          <span className="font-bold text-sm">PREMIUM</span>
        </div>
      </motion.div>

      {/* Enhanced NEET Live Now Glowing Badge with improved animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-4 inline-block"
      >
        <motion.div 
          className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg relative overflow-hidden"
          animate={{ 
            boxShadow: ["0 0 10px rgba(16, 185, 129, 0.5)", "0 0 25px rgba(16, 185, 129, 0.8)", "0 0 10px rgba(16, 185, 129, 0.5)"] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))" // Extra glow effect
          }}
        >
          {/* Enhanced pulsating dot */}
          <motion.span 
            className="h-2.5 w-2.5 bg-white rounded-full"
            animate={{ 
              opacity: [1, 0.4, 1],
              scale: [1, 1.3, 1],
              boxShadow: ["0 0 0px rgba(255,255,255,0.8)", "0 0 10px rgba(255,255,255,0.9)", "0 0 0px rgba(255,255,255,0.8)"]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Glowing text */}
          <motion.span
            animate={{ 
              textShadow: [
                "0 0 5px rgba(255,255,255,0.5)",
                "0 0 10px rgba(255,255,255,0.8)",
                "0 0 5px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-bold"
          >
            NEET is live now!
          </motion.span>
          
          {/* Enhanced glowing overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25"
            animate={{
              left: ["-100%", "100%"],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Welcome Message - New Position */}
      <motion.div
        className="mb-4 text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Welcome to PREPZR - We are world's first emotionally aware, hyper personalized an adaptive exam prep platform.
      </motion.div>

      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span className="relative inline-block">
          <motion.span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          >
            We understand your mindset,
          </motion.span>
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          />
        </span>
        <br />
        <motion.span 
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
          }}
          transition={{ duration: 15, delay: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          not just the exam
        </motion.span>
      </motion.h1>

      {/* Emotional Connection Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-950/30 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800/30 shadow-inner"
      >
        <p className="text-base text-gray-700 dark:text-gray-300">
          Our <span className="font-semibold text-indigo-700 dark:text-indigo-400">AI-driven platform</span> is specifically designed for Indian competitive exams like 
          <span className="font-semibold text-purple-700 dark:text-purple-400"> NEET, JEE, UPSC, and CAT</span>.
        </p>
      </motion.div>
      
      {/* Improved Exam Names Badge */}
      <ExamNamesBadge />

      {/* CTA Buttons */}
      <div className="space-y-4 mt-6">
        {/* Primary CTA */}
        <motion.button
          onClick={handleFreeTrialClick}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="mr-2">Your first 7 days of free exam preparation are on us</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
        
        {/* Secondary CTA */}
        <motion.button
          onClick={handleExamReadinessClick}
          className="w-full border-2 border-purple-300 hover:border-purple-400 dark:border-purple-700 dark:hover:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 py-3 px-6 rounded-xl flex items-center justify-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Analyze Your Exam Readiness
        </motion.button>
      </div>
      
      {/* Active Users */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Join <span className="font-medium text-indigo-600 dark:text-indigo-400">2 million+</span> students already on their path to success
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
