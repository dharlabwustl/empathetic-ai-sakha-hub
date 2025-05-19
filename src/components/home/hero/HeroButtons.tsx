
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Zap, Brain } from "lucide-react";
import { motion } from 'framer-motion';

interface HeroButtonsProps {
  onAnalyzeClick?: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onAnalyzeClick }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 relative">
      {/* 3D floating particles around buttons */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-violet-400/30 to-blue-300/30"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
              opacity: [0.7, 0.3, 0.7],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative"
        initial={{ z: 0 }}
        whileHover={{ z: 20, scale: 1.03 }}
        whileTap={{ z: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl flex items-center gap-2 px-6 py-6 relative overflow-hidden group"
          onClick={onAnalyzeClick}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <motion.div className="rounded-full bg-yellow-300 p-1 relative z-10"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <Zap size={18} className="text-blue-700" />
          </motion.div>
          
          <span className="font-medium relative z-10">Test Your Exam Readiness</span>
          
          {/* 3D depth elements */}
          <motion.div 
            className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-gradient-to-r from-violet-500/10 to-blue-500/10 blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ transform: "translateZ(-10px)" }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute h-1 w-1 bg-white rounded-full"
                style={{ 
                  top: `${20 + Math.random() * 60}%`, 
                  left: `${20 + Math.random() * 60}%`,
                  opacity: 0.6
                }}
                animate={{ 
                  scale: [1, 2, 1], 
                  opacity: [0.4, 0.8, 0.4],
                  y: [0, -10, 0] 
                }}
                transition={{ 
                  duration: 2 + Math.random() * 3, 
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
          
          {/* Simulated 3D hover effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            animate={{ 
              background: [
                "linear-gradient(45deg, rgba(124, 58, 237, 0) 0%, rgba(124, 58, 237, 0.1) 100%)",
                "linear-gradient(45deg, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0) 100%)"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </Button>
      </motion.div>

      <motion.div
        className="relative"
        initial={{ z: 0 }}
        whileHover={{ z: 20, scale: 1.03 }}
        whileTap={{ z: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      >
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-violet-200 hover:border-violet-300 hover:bg-violet-50 shadow-md hover:shadow-lg transition-all dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/50 px-6 py-6 relative overflow-hidden group"
        >
          <Link to="/signup" className="flex items-center gap-2">
            <motion.div 
              className="rounded-full bg-violet-100 dark:bg-violet-900/70 p-1 relative z-10"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <Brain size={18} className="text-violet-600 dark:text-violet-400" />
            </motion.div>
            
            <span className="relative z-10">7 Days Free Trial</span>
            
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight size={18} />
            </motion.div>
            
            {/* 3D floating icons with depth */}
            <motion.div 
              className="absolute left-12 top-2 z-20"
              animate={{ y: [-4, 0, -4], rotateZ: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Brain size={14} className="text-blue-500/70 transform" />
            </motion.div>
            
            {/* 3D layered background effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-violet-100/10 to-blue-100/5 dark:from-violet-900/20 dark:to-blue-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ transform: "translateZ(-5px)" }}
            />
            
            <motion.div 
              className="absolute inset-0 z-0"
              style={{ transform: "translateZ(-10px)" }}
            >
              {[...Array(15)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    background: `rgba(${124 + Math.random() * 50}, ${58 + Math.random() * 50}, ${237 + Math.random() * 20}, ${Math.random() * 0.3})`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [Math.random() * -10, Math.random() * 10, Math.random() * -10],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroButtons;
