
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
        className="mb-4 inline-block"
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

      {/* Updated Welcome Message */}
      <motion.div
        className="mb-4 text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Welcome to your <span className="font-bold">future success story</span> with PREPZR - World's first emotionally aware, hyper personalized adaptive exam prep platform
      </motion.div>

      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
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

      {/* Enhanced 5 Key Benefits - More Compact */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-6 p-3 rounded-2xl border border-blue-200/50 dark:border-blue-800/30 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 shadow-xl backdrop-blur-sm"
      >
        <motion.h3 
          className="text-center font-bold text-base text-blue-800 dark:text-blue-300 mb-3 flex items-center justify-center gap-2"
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Target className="w-4 h-4" />
          Five Success Accelerators
          <Zap className="w-4 h-4" />
        </motion.h3>
        
        <div className="grid grid-cols-5 gap-2">
          {[
            { icon: <Award className="w-4 h-4" />, label: "Confidence", color: "from-emerald-500 to-green-600" },
            { icon: <GraduationCap className="w-4 h-4" />, label: "Success", color: "from-blue-500 to-blue-700" },
            { icon: <Zap className="w-4 h-4" />, label: "Efficiency", color: "from-amber-500 to-yellow-600" },
            { icon: <Brain className="w-4 h-4" />, label: "Stress-Free", color: "from-purple-500 to-purple-700" },
            { icon: <Sparkles className="w-4 h-4" />, label: "Joy", color: "from-pink-500 to-rose-600" }
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -3
              }}
              className={`bg-gradient-to-br ${benefit.color} text-white rounded-xl py-2 px-1 flex flex-col items-center justify-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 text-center cursor-pointer border border-white/20`}
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: idx * 0.5
                }}
                className="bg-white/20 rounded-full p-1.5 backdrop-blur-sm"
              >
                {benefit.icon}
              </motion.div>
              <span className="font-bold text-xs">{benefit.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Success Mindset Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-950/30 rounded-xl p-3 border border-indigo-200/50 dark:border-indigo-800/30 shadow-lg backdrop-blur-sm"
      >
        <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-600" />
          Transform your exam journey with our <span className="font-semibold text-indigo-700 dark:text-indigo-400">AI-driven emotional intelligence</span> platform.
        </p>
      </motion.div>
      
      <ExamNamesBadge />

      {/* Enhanced Futuristic CTA Buttons - More Prominent */}
      <div className="space-y-3 mt-6">
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
          className="group w-full border-2 border-purple-400/50 hover:border-purple-500 dark:border-purple-700 dark:hover:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 py-3 px-6 rounded-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-base">AI Exam Readiness Analysis</span>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </div>
        </motion.button>
      </div>
      
      {/* Premium Success Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-4 text-center"
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
