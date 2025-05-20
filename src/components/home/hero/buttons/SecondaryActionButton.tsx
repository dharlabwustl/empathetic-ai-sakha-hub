
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

const SecondaryActionButton: React.FC = () => {
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
            <BookOpen size={18} className="text-violet-600 dark:text-violet-400" />
          </motion.div>
          
          <span className="relative z-10">Start Free 7-Day Trial</span>
          
          <motion.div
            className="relative z-10"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight size={18} />
          </motion.div>
        </Link>
      </Button>
    </motion.div>
  );
};

export default SecondaryActionButton;
