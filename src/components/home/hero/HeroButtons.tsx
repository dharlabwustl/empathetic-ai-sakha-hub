
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Sparkles, GraduationCap, Clock, Zap, Smile } from "lucide-react";
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
          <Zap size={20} className="text-yellow-300" />
          <span className="font-medium">Boost Your Exam Confidence</span>
          
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
          
          {/* Tech elements floating around button */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div 
              className="absolute h-1 w-1 bg-blue-300 rounded-full"
              style={{ top: '20%', left: '10%' }}
              animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute h-1 w-1 bg-purple-300 rounded-full"
              style={{ top: '70%', left: '80%' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div 
              className="absolute h-1 w-1 bg-yellow-300 rounded-full"
              style={{ top: '40%', left: '75%' }}
              animate={{ scale: [1, 2.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
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
            <GraduationCap size={20} className="text-violet-600 dark:text-violet-400" />
            <span>Begin Your Success Journey</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight size={18} />
            </motion.div>
            
            {/* Key benefits icons - floating around subtly */}
            <motion.div 
              className="absolute left-14 bottom-1"
              animate={{ y: [-3, 0, -3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Clock size={12} className="text-blue-500/60" />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="absolute right-14 top-1"
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <motion.div
                animate={{ rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Smile size={12} className="text-green-500/60" />
              </motion.div>
            </motion.div>
            
            {/* Radial gradient hover effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-violet-100/20 to-blue-100/5 dark:from-violet-900/20 dark:to-blue-900/5"></div>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroButtons;
