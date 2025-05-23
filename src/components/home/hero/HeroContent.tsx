
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles, GraduationCap, Award, TrendingUp, Zap, Brain, Target, Star, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExamNamesBadge from './ExamNamesBadge';
import HeroButtons from './HeroButtons';

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

      {/* Updated Main Title */}
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

      {/* Updated Welcome Message - One sentence description */}
      <motion.div
        className="mb-5 text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        From struggling to exam champion, with the world's first emotionally intelligent & hyper personalized exam prep platform for <span className="font-bold text-indigo-700 dark:text-indigo-400">JEE, NEET, UPSC, CAT</span> & beyond.
      </motion.div>

      {/* How PREPZR supports you - Streamlined Version */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-5"
      >
        <motion.h3 
          className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-3 flex items-center justify-start gap-2"
          animate={{ 
            textShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 10px rgba(59, 130, 246, 0.5)", "0 0 0px rgba(59, 130, 246, 0)"],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Target className="w-5 h-5 text-blue-600" />
          How PREPZR Supports You
          <Zap className="w-5 h-5 text-amber-500" />
        </motion.h3>
        
        <div className="flex flex-wrap gap-2">
          {[
            { icon: <Award className="w-4 h-4" />, label: "Confidence Builder", color: "from-emerald-500 to-green-600" },
            { icon: <GraduationCap className="w-4 h-4" />, label: "Exam Success", color: "from-blue-500 to-blue-700" },
            { icon: <Zap className="w-4 h-4" />, label: "Time Saver", color: "from-amber-500 to-yellow-600" },
            { icon: <Brain className="w-4 h-4" />, label: "Stress Relief", color: "from-purple-500 to-purple-700" },
            { icon: <Sparkles className="w-4 h-4" />, label: "Joyful Learning", color: "from-pink-500 to-rose-600" }
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
              className={`bg-gradient-to-r ${benefit.color} text-white rounded-xl py-1.5 px-3 flex items-center gap-2 shadow-md hover:shadow-lg transition-all text-sm`}
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: idx * 0.5
                }}
              >
                {benefit.icon}
              </motion.div>
              <span className="font-medium">{benefit.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      <ExamNamesBadge />

      {/* CTA Buttons - Fixed visibility issue */}
      <div className="space-y-3 mt-5">
        <HeroButtons onAnalyzeClick={handleExamReadinessClick} />
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
