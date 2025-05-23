
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles, GraduationCap, Award, TrendingUp, Zap, Brain, Target, Star, Rocket } from 'lucide-react';
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pr-8 relative z-20"
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

      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
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
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            We understand your
          </motion.span>
        </span>
        <br />
        <motion.span 
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
          }}
          transition={{ duration: 8, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          mindset, not just the exam
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          />
        </motion.span>
      </motion.h1>

      {/* Updated Subtitle */}
      <motion.div
        className="mb-4 text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        From struggling to exam champion, with the world's first emotionally intelligent & hyper personalized exam prep platform for <span className="font-bold text-indigo-700 dark:text-indigo-400">JEE, NEET, UPSC, CAT & beyond</span>.
      </motion.div>

      {/* How PREPZR Supports You - Compact Text Version */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-6 p-4 rounded-xl border border-blue-200/50 dark:border-blue-800/30 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 shadow-lg backdrop-blur-sm"
      >
        <motion.h3 
          className="text-center font-bold text-lg text-blue-800 dark:text-blue-300 mb-3 flex items-center justify-center gap-2"
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Target className="w-5 h-5" />
          How PREPZR Supports You
          <Sparkles className="w-5 h-5" />
        </motion.h3>
        
        <div className="text-center space-y-2">
          {[
            { text: "Build Unshakeable Confidence", color: "text-emerald-600", icon: "🚀" },
            { text: "Guarantee Exam Success", color: "text-blue-600", icon: "🎯" },
            { text: "Save 50% Study Time", color: "text-amber-600", icon: "⚡" },
            { text: "Eliminate Stress & Anxiety", color: "text-purple-600", icon: "🧘‍♀️" },
            { text: "Discover Joy in Learning", color: "text-pink-600", icon: "✨" }
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              className={`${benefit.color} font-semibold text-sm md:text-base flex items-center justify-center gap-2`}
            >
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: idx * 0.3
                }}
              >
                {benefit.icon}
              </motion.span>
              {benefit.text}
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      <ExamNamesBadge />

      {/* Enhanced Futuristic CTA Buttons - Both Visible with Fixed Z-index */}
      <div className="space-y-3 mt-4 mb-4 relative z-30">
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
            <span className="text-base">Launch Your Success Journey - 7 Days Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>
        
        <motion.button
          onClick={handleExamReadinessClick}
          className="group w-full border-2 border-purple-400/50 hover:border-purple-500 dark:border-purple-700 dark:hover:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 py-3 px-6 rounded-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 z-40"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{ position: 'relative', zIndex: 50 }}
        >
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-base">AI Exam Readiness Analysis - Try Now</span>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </div>
        </motion.button>
      </div>
      
      {/* Premium Success Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-3 text-center"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          Join <span className="font-bold text-indigo-600 dark:text-indigo-400">2M+ students</span> achieving exam success with AI
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
