
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles, GraduationCap, Award, TrendingUp, Zap, Brain, Target, Star, Rocket, Clock, Shield, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExamNamesBadge from './ExamNamesBadge';

interface HeroContentProps {
  handleExamReadinessClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ handleExamReadinessClick }) => {
  const navigate = useNavigate();
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  
  const handleFreeTrialClick = () => {
    navigate('/signup');
  };

  const benefits = [
    { icon: <Award className="w-6 h-6" />, label: "Confidence Builder", color: "from-emerald-500 to-green-600", description: "Build unshakeable confidence" },
    { icon: <GraduationCap className="w-6 h-6" />, label: "Exam Success", color: "from-blue-500 to-blue-700", description: "Achieve your target scores" },
    { icon: <Clock className="w-6 h-6" />, label: "Time Saver", color: "from-amber-500 to-yellow-600", description: "Study smarter, not harder" },
    { icon: <Shield className="w-6 h-6" />, label: "Stress-Free", color: "from-purple-500 to-purple-700", description: "Learn without anxiety" },
    { icon: <Smile className="w-6 h-6" />, label: "Happy Learning", color: "from-pink-500 to-rose-600", description: "Enjoy your study journey" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefitIndex((prev) => (prev + 1) % benefits.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pr-8 relative z-20 flex flex-col justify-center"
    >
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-20 -right-5 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-lg"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-10 left-5 w-20 h-20 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-lg"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Premium Success Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute -top-2 -right-2 md:top-0 md:-right-8 z-30 transform rotate-12"
      >
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 border border-yellow-400/30">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-bold text-sm">AI POWERED</span>
        </div>
      </motion.div>

      {/* Enhanced NEET Live Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-3 inline-block"
      >
        <motion.div 
          className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-2xl relative overflow-hidden border border-emerald-400/30"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(16, 185, 129, 0.5)", 
              "0 0 30px rgba(16, 185, 129, 0.8)", 
              "0 0 20px rgba(16, 185, 129, 0.5)"
            ] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="h-2 w-2 bg-white rounded-full"
            animate={{ 
              opacity: [1, 0.4, 1],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          <motion.span className="font-bold flex items-center gap-1">
            <Rocket className="w-4 h-4" />
            NEET 2026 PREP LIVE!
          </motion.span>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{
              left: ["-100%", "100%"],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Updated Welcome Message - Enhanced contrast and readability */}
      <motion.div
        className="mb-4 text-lg md:text-xl font-bold text-white bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        From struggling to exam champion with the world's first emotionally intelligent & hyper-personalized exam prep platform for <span className="font-bold text-blue-300">JEE, NEET, UPSC, CAT</span> & beyond.
      </motion.div>

      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white drop-shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)',
        }}
      >
        <span className="relative inline-block">
          <motion.span 
            className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            We understand your
          </motion.span>
        </span>
        <br />
        <motion.span 
          className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent relative"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
          }}
          transition={{ duration: 8, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          mindset, not just the exam
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          />
        </motion.span>
      </motion.h1>

      {/* Animated Benefits Slider */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-6 p-4 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/30"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <motion.h3 
          className="text-center font-bold text-lg text-slate-800 mb-4 flex items-center justify-center gap-2"
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Target className="w-5 h-5 text-blue-600" />
          How PREPZR Supports You
          <Zap className="w-5 h-5 text-amber-500" />
        </motion.h3>
        
        <div className="relative h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBenefitIndex}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className={`bg-gradient-to-br ${benefits[currentBenefitIndex].color} text-white rounded-xl py-4 px-6 flex flex-col items-center justify-center gap-2 shadow-lg border border-white/20 min-w-[200px]`}
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
                className="bg-white/20 rounded-full p-2 backdrop-blur-sm"
              >
                {benefits[currentBenefitIndex].icon}
              </motion.div>
              <span className="font-bold text-lg text-center">{benefits[currentBenefitIndex].label}</span>
              <span className="text-sm text-center opacity-90">{benefits[currentBenefitIndex].description}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {benefits.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentBenefitIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
              }`}
              animate={{
                scale: index === currentBenefitIndex ? 1.2 : 1
              }}
            />
          ))}
        </div>
      </motion.section>
      
      <ExamNamesBadge />

      {/* Enhanced Futuristic CTA Buttons - Compact spacing for visibility */}
      <div className="space-y-3 mt-4 mb-4">
        <motion.button
          onClick={handleFreeTrialClick}
          className="group w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center relative overflow-hidden border border-purple-400/30"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative flex items-center gap-3">
            <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="text-lg">Launch Your Success Journey - 7 Days Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>
        
        <motion.button
          onClick={handleExamReadinessClick}
          className="group w-full border-2 border-white/70 hover:border-white bg-white/20 hover:bg-white/30 backdrop-blur-md text-white hover:text-white py-4 px-6 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-lg">AI Exam Readiness Analysis - Try Now</span>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </div>
        </motion.button>
      </div>
      
      {/* Premium Success Community Stats - Enhanced contrast */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-4 text-center"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/30">
          <p className="text-sm text-slate-700 flex items-center justify-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Join <span className="font-bold text-indigo-700">2M+ students</span> achieving exam success with AI
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
