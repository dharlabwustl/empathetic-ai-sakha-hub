
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SparklesIcon, BookOpen, ArrowRight, GraduationCap, Play } from "lucide-react";
import { motion } from 'framer-motion';

interface HeroButtonsProps {
  onAnalyzeClick?: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onAnalyzeClick }) => {
  const [showButtons, setShowButtons] = useState(false);
  
  // Automatically show buttons after a short delay to grab attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: showButtons ? 1 : 0, y: showButtons ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg flex items-center gap-2 px-6 py-6 border border-white/10 relative overflow-hidden"
          onClick={onAnalyzeClick}
        >
          <SparklesIcon size={20} />
          <span className="font-medium text-lg">Start Your NEET Journey</span>
          
          {/* Animated shine effect to draw attention */}
          <motion.div 
            className="absolute inset-0 bg-white opacity-20"
            animate={{ 
              x: ["100%", "-100%"],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut",
              repeatDelay: 1
            }}
            style={{ clipPath: "polygon(0 0, 20% 0, 60% 100%, 40% 100%)" }}
          />
        </Button>
        
        {/* Animated indicator that appears automatically */}
        <motion.div 
          className="absolute -right-2 -top-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 font-bold shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
            Try now
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-violet-200 hover:border-violet-300 hover:bg-violet-50 shadow-md dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/50 px-6 py-6 relative overflow-hidden"
        >
          <Link to="/signup" className="flex items-center gap-2">
            <Play size={18} className="text-green-600" />
            <span className="text-lg">Begin Preparation</span>
            <ArrowRight size={16} />
            
            {/* Subtle animation to draw secondary attention */}
            <motion.div 
              className="absolute inset-0 bg-violet-400 opacity-10"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroButtons;
