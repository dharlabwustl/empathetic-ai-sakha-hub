
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CleanHeroContentProps {
  onAnalyzeClick: () => void;
}

const CleanHeroContent: React.FC<CleanHeroContentProps> = ({ onAnalyzeClick }) => {
  const navigate = useNavigate();

  const keyBenefits = [
    { 
      icon: "🎯", 
      title: "Personalized Learning Path", 
      description: "AI adapts to your unique learning style and pace"
    },
    { 
      icon: "⚡", 
      title: "Accelerated Progress", 
      description: "Learn 3x faster with smart study techniques"
    },
    { 
      icon: "🧠", 
      title: "Cognitive Enhancement", 
      description: "Strengthen memory and analytical thinking"
    },
    { 
      icon: "🎖️", 
      title: "Exam Mastery", 
      description: "Achieve top scores with proven strategies"
    },
    { 
      icon: "💪", 
      title: "Confidence Building", 
      description: "Overcome exam anxiety and boost self-belief"
    },
    { 
      icon: "🚀", 
      title: "Career Transformation", 
      description: "Open doors to your dream opportunities"
    },
    { 
      icon: "🌟", 
      title: "Lifelong Success", 
      description: "Develop skills that last beyond exams"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
          <Sparkles className="h-4 w-4" />
          AI-Powered Exam Success Platform
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-100 dark:to-blue-100 bg-clip-text text-transparent">
            We understand your mindset,
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            not just the exam
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Transform your exam preparation journey with AI that adapts to your learning style, 
          builds confidence, and delivers guaranteed results for NEET, JEE, and beyond.
        </p>
      </motion.div>

      {/* Key Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          7 Key Benefits That Transform Your Journey
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-2xl mb-2">{benefit.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          onClick={() => navigate('/signup')}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          Start Your Journey
          <ArrowRight className="h-5 w-5" />
        </Button>
        
        <Button
          onClick={onAnalyzeClick}
          variant="outline"
          size="lg"
          className="border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-600 dark:hover:bg-purple-900/20 transition-all duration-300 flex items-center gap-2"
        >
          <Play className="h-5 w-5" />
          See How It Works
        </Button>
      </motion.div>

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex items-center gap-6 pt-4"
      >
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Trusted by 50,000+ students
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold"
            >
              {i}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CleanHeroContent;
