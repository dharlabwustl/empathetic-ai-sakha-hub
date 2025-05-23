
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const PremiumBadge: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="absolute -top-2 -right-2 md:top-0 md:-right-8 z-30 transform rotate-12"
    >
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 border border-yellow-400/30">
        <Star className="w-4 h-4 fill-current" />
        <span className="font-bold text-sm">AI POWERED</span>
      </div>
    </motion.div>
  );
};

export default PremiumBadge;
