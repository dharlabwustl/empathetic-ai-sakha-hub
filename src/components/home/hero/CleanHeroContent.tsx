
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Users, Award } from 'lucide-react';

interface CleanHeroContentProps {
  onAnalyzeClick: () => void;
}

const CleanHeroContent: React.FC<CleanHeroContentProps> = ({ onAnalyzeClick }) => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/signup');
  };

  const features = [
    "AI-powered personalized study plans",
    "Adaptive difficulty based on your progress", 
    "Interactive concept cards & flashcards",
    "Real-time performance analytics"
  ];

  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "2M+", label: "Active Students" },
    { icon: <TrendingUp className="w-5 h-5" />, value: "95%", label: "Success Rate" },
    { icon: <Award className="w-5 h-5" />, value: "50K+", label: "Success Stories" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-800/50"
      >
        <Sparkles className="w-4 h-4" />
        India's #1 AI-Powered Exam Prep Platform
      </motion.div>

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="text-gray-900 dark:text-gray-100">Transform Your</span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Exam Preparation
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
          Master JEE, NEET, UPSC, CAT and more with our emotionally intelligent AI that understands your learning style and adapts to your needs.
        </p>
      </motion.div>

      {/* Features List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="space-y-3"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          onClick={handleGetStarted}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Start Free Trial
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        <Button
          onClick={onAnalyzeClick}
          variant="outline"
          size="lg"
          className="border-2 border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600 px-8 py-4 rounded-xl font-semibold text-lg"
        >
          Take Readiness Test
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800"
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center mb-2 text-blue-600 dark:text-blue-400">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CleanHeroContent;
