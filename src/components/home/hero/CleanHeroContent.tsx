
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, TrendingUp, Award, Brain, Zap, Target, BookOpen, Trophy, Crown, Calculator } from 'lucide-react';

interface CleanHeroContentProps {
  onAnalyzeClick: () => void;
}

const CleanHeroContent: React.FC<CleanHeroContentProps> = ({ onAnalyzeClick }) => {
  const navigate = useNavigate();
  const [currentBenefit, setCurrentBenefit] = useState(0);
  
  const handleGetStarted = () => {
    navigate('/signup');
  };

  const keyBenefits = [
    { text: "AI Learns Your Unique Style", icon: <Brain className="w-5 h-5" /> },
    { text: "Personalized Daily Plans", icon: <Target className="w-5 h-5" /> },
    { text: "Smart Concept Mastery", icon: <BookOpen className="w-5 h-5" /> },
    { text: "Interactive Spaced Repetition", icon: <Zap className="w-5 h-5" /> },
    { text: "Formula Practice Lab", icon: <Calculator className="w-5 h-5" /> },
    { text: "Real Exam Simulation", icon: <Award className="w-5 h-5" /> },
    { text: "Daily Readiness Tracking", icon: <TrendingUp className="w-5 h-5" /> },
    { text: "Become Exam Champion", icon: <Crown className="w-5 h-5" /> }
  ];

  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "2M+", label: "AI-Powered Students" },
    { icon: <TrendingUp className="w-5 h-5" />, value: "95%", label: "Success Rate" },
    { icon: <Trophy className="w-5 h-5" />, value: "50K+", label: "Exam Champions" }
  ];

  // Auto-rotate benefits every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % keyBenefits.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* Enhanced Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-800/50"
      >
        <Sparkles className="w-4 h-4" />
        India's Most Advanced AI-Powered Exam Prep Platform
      </motion.div>

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="text-gray-900 dark:text-gray-100">Complete AI ecosystem that</span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            transforms exam preparation
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
          From personalized learning to exam mastery - experience the power of AI that understands your mindset, adapts to your pace, and guarantees results for JEE, NEET, UPSC, CAT and more.
        </p>
      </motion.div>

      {/* Dynamic Key Benefits Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          End-to-End AI Features That Guarantee Success
        </h3>
        
        <div className="relative h-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50 flex items-center justify-center overflow-hidden shadow-lg">
          <motion.div
            key={currentBenefit}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 0.8 }}
              className="text-blue-600 dark:text-blue-400"
            >
              {keyBenefits[currentBenefit].icon}
            </motion.div>
            <div className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {keyBenefits[currentBenefit].text}
            </div>
          </motion.div>
          
          {/* Progress indicator */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {keyBenefits.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentBenefit ? 'bg-blue-600 w-6' : 'bg-gray-300'
                }`}
                animate={index === currentBenefit ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Platform Features Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Brain className="w-6 h-6" />, label: "AI Tutor", desc: "24/7 Support" },
            { icon: <Target className="w-6 h-6" />, label: "Smart Plans", desc: "Adaptive Learning" },
            { icon: <Award className="w-6 h-6" />, label: "Mock Tests", desc: "Real Simulation" },
            { icon: <TrendingUp className="w-6 h-6" />, label: "Analytics", desc: "Progress Tracking" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md group-hover:shadow-lg transition-shadow"
                animate={{ 
                  rotate: [0, 5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                <div className="text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
              </motion.div>
              <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                {feature.label}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {feature.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          onClick={handleGetStarted}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          Experience AI-Powered Learning
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <Button
          onClick={onAnalyzeClick}
          variant="outline"
          size="lg"
          className="border-2 border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600 px-8 py-4 rounded-xl font-semibold text-lg group"
        >
          Test Your Readiness
          <Zap className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
        </Button>
      </motion.div>

      {/* Enhanced Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            className="text-center group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="flex items-center justify-center mb-2 text-blue-600 dark:text-blue-400"
              animate={{ 
                y: [0, -2, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
            >
              {stat.icon}
            </motion.div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CleanHeroContent;
