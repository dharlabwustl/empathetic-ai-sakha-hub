
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, TrendingUp, Award, Mic, Play } from 'lucide-react';

interface CleanHeroContentProps {
  onAnalyzeClick: () => void;
}

const CleanHeroContent: React.FC<CleanHeroContentProps> = ({ onAnalyzeClick }) => {
  const navigate = useNavigate();
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [isListening, setIsListening] = useState(false);
  
  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleNEETPrep = () => {
    navigate('/dashboard/student');
  };

  // Enhanced key benefits with improved wording
  const keyBenefits = [
    "Save Valuable Time",
    "Stress-Free Learning", 
    "Build Strong Habits",
    "Syllabus-Aligned Content",
    "Boost Your Confidence",
    "Smart Performance Analytics",
    "Exam-Ready Preparation"
  ];

  const stats = [
    { icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, value: "2M+", label: "Active Students" },
    { icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />, value: "95%", label: "Success Rate" },
    { icon: <Award className="w-4 h-4 md:w-5 md:h-5" />, value: "50K+", label: "Success Stories" }
  ];

  // Auto-rotate benefits every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % keyBenefits.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('Speech recognized:', transcript);
      
      // Intelligent context-aware responses for homepage
      if (transcript.includes('start') || transcript.includes('free trial') || transcript.includes('signup')) {
        const utterance = new SpeechSynthesisUtterance('Starting your free trial with PREPZR. You\'ll get access to personalized study plans and our AI tutor.');
        speechSynthesis.speak(utterance);
        handleGetStarted();
      } else if (transcript.includes('neet') || transcript.includes('preparation') || transcript.includes('prep')) {
        const utterance = new SpeechSynthesisUtterance('Opening NEET 2026 preparation dashboard with adaptive learning plans.');
        speechSynthesis.speak(utterance);
        handleNEETPrep();
      } else if (transcript.includes('test') || transcript.includes('analyze') || transcript.includes('readiness')) {
        const utterance = new SpeechSynthesisUtterance('Opening exam readiness analyzer to evaluate your preparation level.');
        speechSynthesis.speak(utterance);
        onAnalyzeClick();
      } else if (transcript.includes('features') || transcript.includes('about prepzr') || transcript.includes('about prep zer')) {
        const utterance = new SpeechSynthesisUtterance('PREPZR is the world\'s first emotionally intelligent exam platform. We provide adaptive learning, personalized study plans, and emotional support for competitive exams like NEET, JEE, and UPSC.');
        speechSynthesis.speak(utterance);
      } else if (transcript.includes('subscription') || transcript.includes('plans') || transcript.includes('pricing')) {
        const utterance = new SpeechSynthesisUtterance('We offer flexible subscription plans including free trial, monthly pro at 499 rupees, and annual pro at 2999 rupees with advanced features and unlimited access.');
        speechSynthesis.speak(utterance);
      } else if (transcript.includes('why prepzr') || transcript.includes('better') || transcript.includes('unique')) {
        const utterance = new SpeechSynthesisUtterance('PREPZR is unique because we understand your emotions and learning style. Our AI adapts to your mood and creates personalized study experiences that traditional platforms cannot offer. We combine academic excellence with emotional intelligence.');
        speechSynthesis.speak(utterance);
      } else if (transcript.includes('exam readiness') || transcript.includes('preparation level')) {
        const utterance = new SpeechSynthesisUtterance('Our exam readiness analyzer evaluates your current preparation level and provides detailed insights about your strengths and areas for improvement.');
        speechSynthesis.speak(utterance);
        onAnalyzeClick();
      } else {
        const utterance = new SpeechSynthesisUtterance('I can help you with "start free trial", "NEET prep", "analyze readiness", "about PREPZR", or "subscription plans" to explore our features.');
        speechSynthesis.speak(utterance);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-4 md:space-y-6 px-4 md:px-0"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border border-blue-200/50 dark:border-blue-800/50"
      >
        <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
        <span className="hidden sm:inline">India's #1 AI-Powered Exam Prep Platform</span>
        <span className="sm:hidden">#1 AI Exam Prep</span>
      </motion.div>

      {/* NEET 2026 Prep Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="inline-block"
      >
        <Button
          onClick={handleNEETPrep}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <Play className="w-4 h-4 mr-2" />
          NEET 2026 Prep is Live!
        </Button>
      </motion.div>

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-3 md:space-y-4"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
          <span className="text-gray-900 dark:text-gray-100">We understand your</span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            mindset, not just the exam
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
          Master JEE, NEET, UPSC, CAT and more with our emotionally intelligent AI that understands your learning style and adapts to your needs.
        </p>
      </motion.div>

      {/* Enhanced Key Benefits Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="space-y-3 md:space-y-4"
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">
          Key Benefits That Transform Your Journey
        </h3>
        
        <div className="relative h-12 md:h-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50 flex items-center justify-center overflow-hidden">
          <motion.div
            key={currentBenefit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center px-4"
          >
            <div className="text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {keyBenefits[currentBenefit]}
            </div>
          </motion.div>
          
          {/* Progress indicator */}
          <div className="absolute bottom-1 md:bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {keyBenefits.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors duration-300 ${
                  index === currentBenefit ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Buttons with Speech Recognition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-3 md:gap-4"
      >
        <Button
          onClick={handleGetStarted}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
        >
          Start Free Trial
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
        </Button>
        
        <Button
          onClick={onAnalyzeClick}
          variant="outline"
          size="lg"
          className="border-2 border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600 px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg w-full sm:w-auto"
        >
          Take Readiness Test
        </Button>

        {/* Speech Recognition Microphone */}
        <Button
          onClick={handleSpeechRecognition}
          variant="outline"
          size="lg"
          className={`border-2 px-4 py-3 md:px-6 md:py-4 rounded-xl font-semibold text-base md:text-lg w-full sm:w-auto transition-all duration-300 ${
            isListening 
              ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100 animate-pulse' 
              : 'border-orange-400 hover:border-orange-500 text-orange-600 hover:bg-orange-50'
          }`}
        >
          <Mic className={`w-4 h-4 md:w-5 md:h-5 ${isListening ? 'animate-pulse' : ''}`} />
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="grid grid-cols-3 gap-3 md:gap-6 pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-800"
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center mb-1 md:mb-2 text-blue-600 dark:text-blue-400">
              {stat.icon}
            </div>
            <div className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stat.value}
            </div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CleanHeroContent;
