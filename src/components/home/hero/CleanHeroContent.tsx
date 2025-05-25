
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Users, Award, Clock, Shield, BookOpen, Target, BarChart3, Trophy } from 'lucide-react';

interface CleanHeroContentProps {
  onAnalyzeClick: () => void;
}

const CleanHeroContent: React.FC<CleanHeroContentProps> = ({ onAnalyzeClick }) => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/signup');
  };

  const keyBenefits = [
    { icon: <Clock className="w-5 h-5" />, text: "Save Your Time", color: "from-blue-500 to-blue-600" },
    { icon: <Shield className="w-5 h-5" />, text: "Stress Free", color: "from-green-500 to-green-600" },
    { icon: <BookOpen className="w-5 h-5" />, text: "Develop Study Habits", color: "from-purple-500 to-purple-600" },
    { icon: <Target className="w-5 h-5" />, text: "Syllabus Linked", color: "from-orange-500 to-orange-600" },
    { icon: <Trophy className="w-5 h-5" />, text: "Boost Your Confidence", color: "from-yellow-500 to-yellow-600" },
    { icon: <BarChart3 className="w-5 h-5" />, text: "Smart Analytics", color: "from-indigo-500 to-indigo-600" },
    { icon: <Award className="w-5 h-5" />, text: "Exam Ready", color: "from-pink-500 to-pink-600" }
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
          <span className="text-gray-900 dark:text-gray-100">We understand your</span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            mindset, not just the exam
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
          Master JEE, NEET, UPSC, CAT and more with our emotionally intelligent AI that understands your learning style and adapts to your needs.
        </p>
      </motion.div>

      {/* Key Benefits in a Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Key Benefits That Transform Your Journey
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {keyBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${benefit.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg">
                {benefit.icon}
              </div>
              <span className="font-medium text-sm">{benefit.text}</span>
            </motion.div>
          ))}
        </div>
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
