
import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Clock, Shield, Smile } from 'lucide-react';

const KeyBenefitsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mb-6 p-5 rounded-xl border-2 border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 shadow-sm"
    >
      <h3 className="text-center font-semibold text-lg text-blue-700 dark:text-blue-400 mb-4">
        Five Key Benefits For Your Success
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2">
        {[
          { icon: <Award size={24} />, label: "Confidence Builder", color: "bg-green-500" },
          { icon: <GraduationCap size={24} />, label: "Exam Success", color: "bg-blue-500" },
          { icon: <Clock size={24} />, label: "Save Time", color: "bg-amber-500" },
          { icon: <Shield size={24} />, label: "Stress-Free", color: "bg-purple-500" },
          { icon: <Smile size={24} />, label: "Happy Learning", color: "bg-pink-500" }
        ].map((benefit, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + idx * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`${benefit.color} text-white rounded-lg py-3 px-3 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 text-center`}
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0, -10, 0] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: idx * 0.5
              }}
              className="bg-white/20 rounded-full p-2 mb-1"
            >
              {benefit.icon}
            </motion.div>
            <span className="font-bold text-sm md:text-base">{benefit.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default KeyBenefitsSection;
