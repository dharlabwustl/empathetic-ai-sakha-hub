
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

const HeroHeader = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-4 inline-block"
      >
        <motion.div 
          className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-2xl relative overflow-hidden border border-emerald-400/30"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(16, 185, 129, 0.5)", 
              "0 0 30px rgba(16, 185, 129, 0.8)", 
              "0 0 20px rgba(16, 185, 129, 0.5)"
            ] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="h-2 w-2 bg-white rounded-full"
            animate={{ 
              opacity: [1, 0.4, 1],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          <motion.span className="font-bold flex items-center gap-1">
            <Rocket className="w-4 h-4" />
            NEET 2026 PREP LIVE!
          </motion.span>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{
              left: ["-100%", "100%"],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="mb-6 text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Welcome to your <span className="font-bold">future success story</span> with PREPZR - World's first emotionally aware, hyper personalized adaptive exam prep platform
      </motion.div>
    </>
  );
};

export default HeroHeader;
