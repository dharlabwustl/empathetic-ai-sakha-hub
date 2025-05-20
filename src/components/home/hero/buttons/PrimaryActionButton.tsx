
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface PrimaryActionButtonProps {
  onClick?: () => void;
}

const PrimaryActionButton: React.FC<PrimaryActionButtonProps> = ({ onClick }) => {
  return (
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
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <motion.div className="rounded-full bg-yellow-300 p-1 relative z-10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <Zap size={18} className="text-blue-700" />
        </motion.div>
        
        <span className="font-medium relative z-10">Check Your Exam Readiness</span>
        
        {/* 3D depth elements */}
        <motion.div 
          className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-gradient-to-r from-violet-500/10 to-blue-500/10 blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </Button>
    </motion.div>
  );
};

export default PrimaryActionButton;
