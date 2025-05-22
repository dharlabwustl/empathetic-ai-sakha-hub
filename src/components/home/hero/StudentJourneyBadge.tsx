
import React from 'react';
import { motion } from 'framer-motion';

const StudentJourneyBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative flex items-center"
    >
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
        <motion.span 
          className="inline-block h-2 w-2 rounded-full bg-white"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        NEET is live now!
      </div>
      
      {/* Glowing effect around the badge */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-green-500 -z-10 blur-md"
        animate={{ 
          opacity: [0.3, 0.7, 0.3],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
};

export default StudentJourneyBadge;
