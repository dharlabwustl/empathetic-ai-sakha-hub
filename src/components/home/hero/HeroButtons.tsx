
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { motion } from 'framer-motion';

interface HeroButtonsProps {
  onAnalyzeClick?: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onAnalyzeClick }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl flex items-center gap-2 px-6 py-6 relative overflow-hidden group"
          onClick={onAnalyzeClick}
        >
          <Sparkles size={20} />
          <span className="font-medium">Test Your Future Readiness</span>
          
          {/* Animated shine effect */}
          <motion.div 
            className="absolute inset-0 bg-white opacity-20 w-12"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "linear",
              repeatDelay: 1
            }}
            style={{ 
              clipPath: "polygon(0 0, 30% 0, 70% 100%, 40% 100%)"
            }}
          />
          
          {/* Futuristic particle effect */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="absolute h-1 w-1 bg-white rounded-full top-1/4 left-1/4" style={{ boxShadow: '0 0 6px 2px rgba(255,255,255,0.5)' }}></div>
            <div className="absolute h-1 w-1 bg-white rounded-full top-3/4 left-1/2" style={{ boxShadow: '0 0 6px 2px rgba(255,255,255,0.5)' }}></div>
            <div className="absolute h-1 w-1 bg-white rounded-full top-1/2 left-3/4" style={{ boxShadow: '0 0 6px 2px rgba(255,255,255,0.5)' }}></div>
          </motion.div>
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-violet-200 hover:border-violet-300 hover:bg-violet-50 shadow-md hover:shadow-lg transition-all dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/50 px-6 py-6 relative overflow-hidden group"
        >
          <Link to="/signup" className="flex items-center gap-2">
            <Star size={20} />
            <span>Start Your NEET Journey</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight size={18} />
            </motion.div>
            
            {/* Futuristic pulse effect */}
            <motion.div
              className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-violet-200 dark:bg-violet-700/50 opacity-0 group-hover:opacity-100"
              animate={{ scale: [0.8, 1.5, 0.8], opacity: [0, 0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ width: "20px", height: "20px" }}
            />
            
            {/* Radial gradient hover effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-violet-100/20 to-blue-100/5 dark:from-violet-900/20 dark:to-blue-900/5"></div>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroButtons;
