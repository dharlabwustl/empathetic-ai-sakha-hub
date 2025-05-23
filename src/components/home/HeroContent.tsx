
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles, GraduationCap, Award, TrendingUp, Zap, Brain, Target, Star, Rocket, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExamNamesBadge from './hero/ExamNamesBadge';

interface HeroContentProps {
  handleExamReadinessClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ handleExamReadinessClick }) => {
  const navigate = useNavigate();
  
  const handleFreeTrialClick = () => {
    navigate('/signup');
  };

  // Enhanced benefit items for the slider with Happy Learning added
  const benefitItems = [
    { icon: <Award className="w-5 h-5" />, label: "Confidence", color: "from-emerald-500 to-green-600" },
    { icon: <GraduationCap className="w-5 h-5" />, label: "Success", color: "from-blue-500 to-blue-700" },
    { icon: <Zap className="w-5 h-5" />, label: "Save Time", color: "from-amber-500 to-yellow-600" },
    { icon: <Brain className="w-5 h-5" />, label: "Stress-Free", color: "from-purple-500 to-purple-700" },
    { icon: <Sparkles className="w-5 h-5" />, label: "Analytics", color: "from-pink-500 to-rose-600" },
    { icon: <Smile className="w-5 h-5" />, label: "Happy Learning", color: "from-indigo-500 to-indigo-700" }
  ];

  const [currentBenefitIndex, setCurrentBenefitIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefitIndex((prev) => (prev + 1) % benefitItems.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [benefitItems.length]);

  const currentBenefit = benefitItems[currentBenefitIndex];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pr-8 relative z-20"
    >
      {/* Enhanced NEET Live Badge with vibrant styling */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-4 inline-block"
      >
        <motion.div 
          className="bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 text-white px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-2xl relative overflow-hidden border border-emerald-300/50"
          animate={{ 
            boxShadow: [
              "0 0 30px rgba(16, 185, 129, 0.6)", 
              "0 0 50px rgba(16, 185, 129, 0.9)", 
              "0 0 30px rgba(16, 185, 129, 0.6)"
            ] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="h-3 w-3 bg-white rounded-full"
            animate={{ 
              opacity: [1, 0.3, 1],
              scale: [1, 1.4, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          <motion.span className="font-bold flex items-center gap-2 text-shadow-lg">
            <Rocket className="w-5 h-5" />
            NEET 2026 PREP LIVE!
          </motion.span>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{
              left: ["-100%", "100%"],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced Welcome Message with vibrant text styling */}
      <motion.div
        className="mb-6 text-lg md:text-xl font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-700 drop-shadow-lg">
          Transform from struggling to exam champion with PREPZR - World's first emotionally intelligent, hyper-personalized exam prep platform for{' '}
        </span>
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 drop-shadow-xl">
          JEE, NEET, UPSC, CAT
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-700 drop-shadow-lg">
          {' '}and beyond.
        </span>
      </motion.div>

      {/* Enhanced Main Heading with vibrant gradients */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span className="relative inline-block">
          <motion.span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 drop-shadow-2xl"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              textShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
            }}
          >
            We understand your
          </motion.span>
        </span>
        <br />
        <motion.span 
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative drop-shadow-2xl"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
          }}
          transition={{ duration: 8, delay: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            textShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
          }}
        >
          mindset, not just the exam
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 rounded-full shadow-lg"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          />
        </motion.span>
      </motion.h1>

      {/* Enhanced Key Benefits Slider with rotating items */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-6 p-4 rounded-2xl border-2 border-blue-200/60 dark:border-blue-800/40 bg-gradient-to-br from-blue-50/90 via-indigo-50/90 to-purple-50/90 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 shadow-2xl backdrop-blur-md relative overflow-hidden"
      >
        {/* Enhanced background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl" />
        
        <motion.h3 
          className="text-center font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 mb-4 flex items-center justify-center gap-2 drop-shadow-lg relative z-10"
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Target className="w-5 h-5 text-blue-600" />
          How PREPZR Supports You
          <Zap className="w-5 h-5 text-purple-600" />
        </motion.h3>
        
        {/* Rotating benefit display */}
        <div className="flex justify-center relative z-10">
          <motion.div
            key={currentBenefitIndex}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-br ${currentBenefit.color} text-white rounded-2xl py-6 px-8 flex flex-col items-center justify-center gap-3 shadow-2xl border border-white/30 backdrop-blur-sm min-w-[200px] min-h-[120px]`}
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
              className="bg-white/30 rounded-full p-3 backdrop-blur-sm"
            >
              {currentBenefit.icon}
            </motion.div>
            <span className="font-bold text-xl drop-shadow-md text-center">{currentBenefit.label}</span>
          </motion.div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-4 relative z-10">
          {benefitItems.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentBenefitIndex 
                  ? 'bg-purple-600 w-6' 
                  : 'bg-purple-300'
              }`}
              animate={index === currentBenefitIndex ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.section>
      
      <ExamNamesBadge />

      {/* Enhanced CTA Buttons with vibrant styling */}
      <div className="space-y-4 mt-6 mb-6">
        <motion.button
          onClick={handleFreeTrialClick}
          className="group w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center relative overflow-hidden border border-purple-400/50"
          whileHover={{ scale: 1.02, y: -3 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            boxShadow: "0 0 40px rgba(139, 92, 246, 0.4)"
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative flex items-center gap-3">
            <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform drop-shadow-lg" />
            <span className="text-lg drop-shadow-lg">Launch Your Success Journey - 7 Days Free</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform drop-shadow-lg" />
          </div>
        </motion.button>
        
        <motion.button
          onClick={handleExamReadinessClick}
          className="group w-full border-2 border-purple-400/60 hover:border-purple-500 dark:border-purple-700 dark:hover:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50/80 dark:hover:bg-purple-900/40 py-4 px-6 rounded-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)"
          }}
        >
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 group-hover:scale-110 transition-transform drop-shadow-lg" />
            <span className="font-semibold text-lg drop-shadow-sm">AI Exam Readiness Analysis</span>
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform drop-shadow-lg" />
          </div>
        </motion.button>
      </div>
      
      {/* Enhanced Community Stats with vibrant styling */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2 drop-shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-green-500 drop-shadow-md" />
          Join <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 drop-shadow-lg">2M+ students</span> achieving exam success with AI
        </p>
      </div>
    </motion.div>
  );
};

export default HeroContent;
